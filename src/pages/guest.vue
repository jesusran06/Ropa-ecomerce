<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

import { useRouter } from 'vue-router'
import fondoSesion from '@images/pages/fondo-sesion.jpg'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { alphaDashValidator, requiredValidator } from '@validators'

const router = useRouter()
const route = useRoute()

const goToHome = () => {
  router.push({ name: 'login' })
}

// Form Errors
const errors = ref([])
const refVForm = ref<VForm>()
const name = ref('acwedding')

// const login = async () => {
//   await loginApiGuest(
//     {
//       name: name.value,
//     },
//   ).then(r => {
//     console.log('r.ok', r.ok)
//     if (r.ok === 0) {
//       errors.value = []
//       errors.value.push(r.message.text)

//       return null
//     }
//     console.log('paso por aca')
//     router.replace(route.query.to ? String(route.query.to) : '/index')
//   }).catch(e => {
//     errors.value = []
//     errors.value.push(e.message.text)
//   })
// }

const login = async () => {
  router.replace(route.query.to ? String(route.query.to) : '/index')
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="6" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg id="img-register" max-width="100%" cover :src="fondoSesion" class="auth-illustration h-100 pb-0 w-100" />
        </div>
      </div>
    </VCol>

    <VCol cols="12" lg="6" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="600" class="mt-12 mt-sm-0 pa-6">
        <div class="d-flex justify-end">
          <VNodeRenderer :nodes="themeConfig.app.logo" class="d-flex justify-end align-center" />
        </div>
        <VCardText class=" pt-0">
          <IconBtn class="back-home" @click="goToHome">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l4 4" />
              <path d="M5 12l4 -4" />
            </svg>
          </IconBtn>
          <h5 h5 class="text-h1 mb-1 text-black">
            Continúa como invitado
          </h5>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow v-if="errors.length" class="bg-errorbg text-errortx">
              <VCol cols="12">
                <ul>
                  <li v-for="(error, index) in errors" :key="index" class="mx-6">
                    {{ error }}
                  </li>
                </ul>
              </VCol>
            </VRow>
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="name"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="Nombre Completo"
                />

                <VBtn block type="submit" rounded="pill" class="mt-10">
                  <a class="font-weight-bold text-black">ACEPTAR</a>
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';

.back-home {
  position: relative;
  top: 2.7rem;
  right: 3rem;
  margin-right: 2rem;
  color:#C7A557;
}

#img-register {
  .v-responsive__sizer{
    padding-bottom: 0px !important;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
