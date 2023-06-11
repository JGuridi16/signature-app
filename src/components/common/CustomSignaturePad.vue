<template>
  <div @touchmove.prevent>
    <canvas
      :id="id"
      class="canvas w-100"
      :class="{
        'rounded': isRounded,
        'border': isBordered,
        canvasClass
      }"
      :data-uid="id"
      :disabled="disabled"
    ></canvas>
  </div>
</template>
<script setup>
import SignaturePad from "signature_pad";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { signatureColorOption } from '@/utils/constants/signature-color-option.js';

const props = defineProps({
  id: {
    type: String,
    default: () => `signature-pad-${Math.random()}`,
    required: false,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  colorOption: {
    type: Number,
    default: () => 0,
  },
  clearOnResize: {
    type: Boolean,
    default: false,
  },
  watermark: {
    type: Object,
    default: () => {},
  },
  defaultUrl: {
    type: String,
    default: '',
  },
  isRounded: {
    type: Boolean,
    default: false,
  },
  isBordered: {
    type: Boolean,
    default: false,
  },
  canvasClass: {
    type: String,
    default: '',
  },
})

const sig = ref({});

watch(
  () => props.disabled,
  (val) => {
    if (val) sig.value.off();
    else sig.value.on();
  }
);

onMounted(() => {
  draw();
})

//computed
const getSignatureOption = computed(() => {
  switch(props.colorOption) {
    case signatureColorOption.Primary:
    default:
      return {
        backgroundColor: 'whitesmoke',
        penColor: 'rgb(0, 0, 0)',
      }
  }
});
const isEmptySignature = computed(() => sig.value._isEmpty);
const fromDataURL = computed(() => (url) => sig.value.fromDataURL(url));

//methods
const draw = () => {
  let canvas = document.getElementById(props.id);
  sig.value = new SignaturePad(canvas, getSignatureOption.value);

  window.addEventListener("resize", resizeCanvas(canvas));
  resizeCanvas(canvas);
  if (props.defaultUrl !== "") {
    fromDataURL(props.defaultUrl);
  }
  if (props.disabled) sig.value.off();
  else sig.value.on();
};
const resizeCanvas = (c) => {
  let url;
  if (!isEmptySignature.value) url = save();
  let ratio = Math.max(window.devicePixelRatio || 1, 1);
  const reg = RegExp(/px/);
  c.width = reg.test(props.width) ? props.width.replace(/px/g, "") * ratio : c.offsetWidth * ratio;
  c.height = reg.test(props.height) ? props.height.replace(/px/g, "") * ratio : c.offsetHeight * ratio;
  c.getContext("2d").scale(ratio, ratio);
  clear();
  !props.clearOnResize && url !== undefined && fromDataURL.value(url);
  if(props.watermark) Object.keys(props.watermark)?.length && addWaterMark(props.watermark);
}
const clear = () => {
  sig.value.clear();
};
const save = (format) => {
  return format ? sig.value.toDataURL(format) : sig.value.toDataURL();
  // signaturePad.toDataURL(); // save image as PNG
  // signaturePad.toDataURL("image/jpeg"); // save image as JPEG
  // signaturePad.toDataURL("image/svg+xml"); // save image as SVG
};
const undo = () => {
  let data = sig.value.toData();
  if (!data) return;

  data.pop();
  sig.value.fromData(data);
};
const addWaterMark = (data) => {
  if (!(Object.prototype.toString.call(data) == "[object Object]")) {
    throw new Error("Expected Object, got " + typeof data + ".");
  }
  let vCanvas = document.getElementById(props.id);
  let textData = {
    text: data.text || "",
    x: data.x || 20,
    y: data.y || 20,
    sx: data.sx || 40,
    sy: data.sy || 40,
  };

  let ctx = vCanvas.getContext("2d");
  ctx.font = data.font || "20px sans-serif";
  ctx.fillStyle = data.fillStyle || "#333";
  ctx.strokeStyle = data.strokeStyle || "#333";
  if (data.style == "all") {
    ctx.fillText(textData.text, textData.x, textData.y);
    ctx.strokeText(textData.text, textData.sx, textData.sy);
  } else if (data.style == "stroke") {
    ctx.strokeText(textData.text, textData.sx, textData.sy);
  } else {
    ctx.fillText(textData.text, textData.x, textData.y);
  }
  sig.value._isEmpty = false;
};

defineExpose({
  save,
  clear,
  isEmpty: isEmptySignature.value,
  undo,
  addWaterMark,
  fromDataURL: fromDataURL.value,
})
</script>