<template>
  <div>
    <custom-signature-pad
      ref="signature1"
      :width="'1280px'"
      :height="'400px'"
      :disabled="isDisabled"
      class="example border"
    />

    <button @click="save('image/jpeg')">Save</button>
    <button @click="clear">Clear</button>
    <button @click="undo">Undo</button>
    <button @click="addWaterMark">addWaterMark</button>
    <button @click="fromDataURL">fromDataURL</button>
    <button @click="handleToggleDisabled">ToggleDisabled</button>
  </div>
</template>
<script setup>
import { CustomSignaturePad } from '@/components/common';

import { reactive, ref } from 'vue'

const signature1 = ref(null);
const isDisabled = ref(false);

const save = (t) => console.log(signature1.value.save(t))

const clear = () => signature1.value.clear()

const undo = () => signature1.value.undo();

const addWaterMark = () => {
  signature1.value.addWaterMark({
    text: "Ferries del Caribe", // watermark text, > default ''
    font: "20px Arial",         // mark font, > default '20px sans-serif'
    style: 'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
    fillStyle: "red",           // fillcolor, > default '#333'
    strokeStyle: "blue",	      // strokecolor, > default '#333'
    x: 100,                     // fill positionX, > default 20
    y: 200,                     // fill positionY, > default 20
    sx: 100,                    // stroke positionX, > default 40
    sy: 200                     // stroke positionY, > default 40
  });
}

const fromDataURL = (url) => signature1.value.fromDataURL('');
// const fromDataURL = (url) => signature1.value.fromDataURL("https://avatars2.githubusercontent.com/u/17644818?s=460&v=4");

const handleToggleDisabled = () => isDisabled.value = !isDisabled.value
</script>
