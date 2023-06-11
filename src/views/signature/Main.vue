<template>
  <div class="container-fluid row mx-auto p-0">
    <div class="form bg-light row mx-auto px-0 py-3 col-12 col-md-6 offset-md-3 my-3 fs-14 shadow rounded">
      <div class="name-input mb-2 col-12 col-md-6">
        <label for="name" class="form-label">Nombre:</label>
        <input type="text" class="form-control" id="name" v-model="form.name" />
      </div>
      <div class="lastname-input mb-2 col-12 col-md-6">
        <label for="lastname" class="form-label">Apellido:</label>
        <input type="text" class="form-control" id="lastname" v-model="form.lastname" />
      </div>
      <div class="email-input mb-2 col-12 col-md-6">
        <label for="email" class="form-label">Correo:</label>
        <input type="email" class="form-control" id="email" v-model="form.email" />
      </div>
      <div class="credit-card-input mb-2 col-12 col-md-6">
        <label for="credit-card" class="form-label">Tarjeta de Crédito:</label>
        <input v-maska="bindedMask" data-maska="#### #### #### ####" type="text" class="form-control" id="credit-card" v-model="form.creditCard" />
      </div>
      <div class="col-12 signature-container mt-3">
        <div class="h5">Pad de Firma</div>
        <custom-signature-pad
          ref="signature1"
          :height="'300px'"
          :disabled="isDisabled"
          is-rounded
          is-bordered
        />
        <div class="toolbar d-flex bg-white rounded">
          <button class="btn btn-outline-secondary" @click="clear">
            <i class="fas fa-broom" />
            <span class="ms-2">Limpiar</span>
          </button>
          <button class="btn btn-secondary ms-2" @click="undo">
            <i class="fas fa-undo" />
            <span class="ms-2">Rehacer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CustomSignaturePad } from '@/components/common';
import { vMaska } from 'maska';
import { reactive, ref } from 'vue';

const signature1 = ref(null);
const isDisabled = ref(false);
const bindedMask = reactive({});
const form = reactive({
  name: '',
  lastname: '',
  email: '',
  creditCard: '',
  signature: null,
});
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

const handleToggleDisabled = () => isDisabled.value = !isDisabled.value
</script>
<style scoped>

</style>