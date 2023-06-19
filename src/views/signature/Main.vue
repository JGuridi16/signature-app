<template>
  <div class="container-fluid row mx-auto p-0">
    <Form v-slot="{ validate, resetForm, values }" :validation-schema="schema" class="form bg-light row mx-auto px-0 py-3 col-12 col-md-6 offset-md-3 my-3 fs-14 shadow rounded">
      <div class="name-input mb-2 col-12 col-md-6">
        <label for="name" class="form-label">Nombre:</label>
        <Field type="text" class="form-control" id="name" v-model="name" name="name" />
        <ErrorMessage v-slot="{ message }" name="name">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="lastname-input mb-2 col-12 col-md-6">
        <label for="lastname" class="form-label">Apellido:</label>
        <Field type="text" class="form-control" id="lastname" v-model="lastname" name="lastname" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="lastname">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="email-input mb-2 col-12 col-md-6">
        <label for="email" class="form-label">Correo:</label>
        <Field type="email" class="form-control" id="email" v-model="email" name="email" placeholder="example@gmail.com"/>
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="email">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="credit-card-input mb-2 col-12 col-md-6">
        <label for="credit-card" class="form-label">Tarjeta de Crédito:</label>
        <Field v-maska="bindedMask" data-maska="#### #### #### ####" type="text" class="form-control" id="credit-card" v-model="creditCard" name="creditCard" placeholder="#### #### #### ####" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="creditCard">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="reservation-input mb-2 col-12 col-md-6">
        <label for="reservation" class="form-label">Número de Reservación:</label>
        <Field type="number" class="form-control" id="reservation" v-model="reservationNumber" name="reservationNumber" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="reservationNumber">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="col-12 signature-container mt-3">
        <div class="h5">Pad de Firma</div>
        <custom-signature-pad
          ref="signatureRef"
          :key="signatureKey"
          :height="'300px'"
          is-rounded
          is-bordered
        />
        <div class="toolbar d-flex justify-content-end bg-white rounded">
          <button type="button" class="btn btn-outline-secondary" @click="onClear">
            <i class="fas fa-broom" />
            <span class="ms-2">Limpiar</span>
          </button>
          <button type="button" class="btn btn-secondary ms-2" @click="onUndo">
            <i class="fas fa-undo" />
            <span class="ms-2">Rehacer</span>
          </button>
        </div>
        <p class="invalid-message text-danger" v-if="signatureError"><i class="fa fa-info-circle text-danger me-1"></i>{{ signatureError }}</p>
      </div>
      <div class="row mx-auto col-12 mt-3">
        <button
          class="col-12 btn btn-success"
          type="button"
          @click="onSubmit({ validate, resetForm, values })"
        >
          Guardar Firma
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup>
import { CustomSignaturePad } from '@/components/common';
import { vMaska } from 'maska';
import { computed, reactive, ref, watch } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { saveSignatureData as _saveSignatureData } from '@/services/signature.api.js';

const signatureRef = ref(null);
const isEmptySignature = ref(true);
const wasValidated = ref(false);
const signatureKey = ref(0);
const bindedMask = reactive({});

const schema = Yup.object({
  name: Yup.string().min(3, 'Mínimo tres caracteres.').required('El nombre es requerido.'),
  lastname: Yup.string().min(3, 'Mínimo tres caracteres.').required('El apellido es requerido.'),
  email: Yup.string().email('Correo inválido.').required('El correo electrónico es requerido.'),
  creditCard: Yup.string().required('La tarjeta de crédito es requerida.'),
  reservationNumber: Yup.number().required('El número de reservación es requerido.'),
});

const signatureError = computed(() => (isEmptySignature.value && wasValidated.value ? 'La firma es requerida.': ''));

const validateSignature = () => {
  isEmptySignature.value = signatureRef.value.isEmpty();
};

const onSubmit = async ({ validate, resetForm, values }) => {
  const { valid } = await validate();
  wasValidated.value = true;
  isEmptySignature.value = signatureRef.value.isEmpty();

  if(isEmptySignature.value || !valid) return;
  
  const payload = {
    ...values,
    creditCard: bindedMask.unmasked,
    reservationNumber: Number(values.reservationNumber),
    signature: signatureRef.value.save(),
  };

  try {
    await _saveSignatureData(payload);

    // ++signatureKey.value;
    // await resetForm();
  } catch (e) {
    console.error(e)
  }
};

const onClear = () => signatureRef.value.clear();

const onUndo = () => signatureRef.value.undo();

</script>
<style scoped>

input {
  font-size: 14px;
}
.invalid-message {
  font-size: 12px;
  margin: 0;
}
</style>