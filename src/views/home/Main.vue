<template>
  <div class="container-fluid row mx-auto p-0">
    <Form v-slot="{ validate, resetForm, values }" :validation-schema="schema" class="form bg-light row mx-auto px-0 py-3 col-12 col-md-6 offset-md-3 my-3 fs-14 shadow rounded">
      <div class="header mb-4 col-12">
        <h6 class="text-muted">Los datos suministrados deben ser del titular o dueño de la tarjeta de crédito</h6>
      </div>
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
      <div class="reservation-input mb-2 col-12 col-md-6">
        <label for="reservation" class="form-label">Número de Reservación:</label>
        <Field type="number" class="form-control" id="reservation" v-model="reservationNumber" name="reservationNumber" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="reservationNumber">
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
      <div class="address-input mb-2 col-12 col-md-6">
        <label for="address" class="form-label">Dirección:</label>
        <Field type="text" class="form-control" id="address" v-model="address" name="address" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="address">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="phone-input mb-2 col-12 col-md-6">
        <label for="phone" class="form-label">Teléfono:</label>
        <Field max="10" type="phone" class="form-control" id="phone" v-model="phone" name="phone" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="phone">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="zip-area-input mb-2 col-12 col-md-6">
        <label for="zipArea" class="form-label">Código Postal:</label>
        <Field type="text" class="form-control" id="zipArea" v-model="zipArea" name="zipArea" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="zipArea">
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
      <div class="expiration-date-input mb-2 col-12 col-md-6">
        <label for="expirationDate" class="form-label">Fecha de Expiración:</label>
        <Field type="date" class="form-control" id="expirationDate" v-model="expirationDate" name="expirationDate" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="expirationDate">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="security-code-input mb-2 col-12 col-md-6">
        <label for="securityCode" class="form-label">Código de Seguridad:</label>
        <Field type="number" class="form-control" id="securityCode" v-model="securityCode" name="securityCode" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="securityCode">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="amount-input mb-2 col-12 col-md-6">
        <label for="amount" class="form-label">Monto:</label>
        <Field type="number" class="form-control" id="amount" v-model="amount" name="amount" />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="amount">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
      </div>
      <div class="identification-photo mb-2 col-12 col-md-6">
        <label for="identification-photo" class="form-label">Documento de Identificación:</label>
        <Field type="file" class="form-control" id="identification-photo" v-model="identificationPhoto"
          name="identificationPhoto" accept="image/*"
        />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="identificationPhoto">
          <div class="invalid-message text-danger"><i class="fa fa-info-circle text-danger me-1"></i>{{ message }}</div>
        </ErrorMessage>
        {{ message }}
      </div>
      <div class="card-info-image mb-2 col-12 col-md-6">
        <label for="card-info-image" class="form-label">Foto de Tarjeta:</label>
        <Field type="file" class="form-control" id="card-info-image" v-model="cardInfoImage"
          name="cardInfoImage" accept="image/*"
        />
        <ErrorMessage v-slot="{ message }" class="invalid-message text-danger" name="cardInfoImage">
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
          Guardar
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
import Swal from 'sweetalert2';

const MAX_FILE_SIZE = 2097152; //2 MB

const signatureRef = ref(null);
const isEmptySignature = ref(true);
const wasValidated = ref(false);
const signatureKey = ref(0);
const bindedMask = reactive({});

const schema = Yup.object({
  name: Yup.string().min(3, 'Mínimo tres caracteres.').required('El nombre es requerido.'),
  lastname: Yup.string().min(3, 'Mínimo tres caracteres.').required('El apellido es requerido.'),
  phone: Yup.number().typeError('El teléfono debe ser un número válido.').required('El número de teléfono es requerido.'),
  email: Yup.string().email('Correo inválido.').required('El correo electrónico es requerido.'),
  address: Yup.string().min(3, 'Mínimo tres caracteres.').required('La dirección es requerida.'),
  creditCard: Yup.string().required('La tarjeta de crédito es requerida.'),
  reservationNumber: Yup.number().required('El número de reservación es requerido.'),
  zipArea: Yup.string().required('El número de de área es requerido.')
    .test("is-area-code", "El número de de área solo contiene números.", 
      value => value && !isNaN(value)),
  securityCode: Yup.number().required('El código de seguridad es requerido.'),
  expirationDate: Yup.string().required('La fecha de expiración es requerida.'),
  amount: Yup.number().required('El monto es requerido.'),
  identificationPhoto: Yup.mixed().required('La foto de identificación es requerida.')
    .test("is-valid-size", "El tamaño máximo permitido por archivo es 2MB.", 
      value => value && value.size <= MAX_FILE_SIZE),
  cardInfoImage: Yup.mixed().required('La foto de la tarjeta es requerida.')
    .test("is-valid-size", "El tamaño máximo permitido por archivo es 2MB.", 
      value => value && value.size <= MAX_FILE_SIZE),
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

  const data = new FormData();
  data.append('identificationPhoto', values.identificationPhoto);
  data.append('cardInfoImage', values.cardInfoImage);
  data.append('name', values.name);
  data.append('lastname', values.lastname);
  data.append('phone', values.phone);
  data.append('email', values.email);
  data.append('address', values.address);
  data.append('expirationDate', values.expirationDate);
  data.append('creditCard', bindedMask.unmasked);
  data.append('reservationNumber', Number(values.reservationNumber));
  data.append('signature', signatureRef.value.save());
  data.append('amount', Number(values.amount));
  data.append('securityCode', Number(values.securityCode));
  data.append('zipCode', values.zipArea);

  try {
    const { data: isSaved } = await _saveSignatureData(data);

    // ++signatureKey.value;
    // await resetForm();

    if (!isSaved) return; 

    await Swal.fire({
      title: '¡Datos guardados exitosamente!',
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      html: '&nbsp;'
    });
  } catch (e) {
    console.error(e);
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