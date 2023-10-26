<script setup>
import fondoSesion from '@images/pages/fondo-sesion.jpg'

const email = ref('')

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <VRow
    class="auth-wrapper bg-surface"
    no-gutters
  >
    <VCol
      lg="6"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg id="img-register" max-width="100%" cover :src="fondoSesion" class="auth-illustration h-100 pb-0 w-100" />
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="6"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="600"
        class="mt-12 mt-sm-0 pa-6"
      >
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
            Recupera tu contraseña
          </h5>
          <!-- create account -->
          <VCol cols="12" class="px-0 py-0">
            <span>Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña</span>
          </VCol>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="Ingresa tu correo eletrónico"
                />
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  <a class="font-weight-bold text-black">ENVIAR</a>
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
@use "@core/scss/template/pages/page-auth.scss";

#img-register {
  .v-responsive__sizer{
    padding-bottom: 0px !important;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
