<script setup>
import { VForm } from 'vuetify/components/VForm'
import fondoSesion from '@images/pages/fondo-sesion.jpg'

// import { useAppAbility } from '@/plugins/casl/useAppAbility'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { alphaDashValidator, emailValidator, passwordValidator, requiredValidator } from '@validators'
import { registerUser } from '@/api/modules'

const refVForm = ref()
const username = ref('johnDoe')
const email = ref('john@example.com')
const password = ref('john@VUEXY#123')
const privacyPolicies = ref(true)

// Router
const route = useRoute()
const router = useRouter()

const goToHome = () => {
  router.push({ name: 'login' })
}

// Ability
// const ability = useAppAbility()

// Form Errors
const errors = ref([])

const register = async () => {
  await registerUser(
    {
      name: username.value,
      email: email.value,
      password: password.value,
    },
  ).then(r => {
    if (r.ok === 0) {
      errors.value = []
      errors.value.push(r.message.text)

      return null
    }

    router.replace(route.query.to ? String(route.query.to) : '/index')
  }).catch(e => {
    errors.value = []
    errors.value.push(e.message.text)
  })
}

const imageVariant = useGenerateImageVariant(
  fondoSesion,
  true,
)

const isPasswordVisible = ref(false)

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      register()
  })
}
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="6" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg id="img-register" max-width="100%" cover :src="imageVariant" class="auth-illustration h-100 pb-0 w-100" />
        </div>
      </div>
    </VCol>

    <VCol cols="12" lg="6" class="d-flex align-center justify-center">
      <VCard flat :max-width="600" class="mt-12 mt-sm-0 pa-6">
        <div class="d-flex justify-center">
          <VCardText class="py-0">
            <IconBtn class="back-home" @click="goToHome">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l4 4" />
                <path d="M5 12l4 -4" />
              </svg>
            </IconBtn>
            <h1 class="d-flex justify-begin text-h1 text-black">
              Crear Cuenta
            </h1>
          </VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="d-flex justify-end align-center" />
        </div>
        <VCardText class="pt-0">
          <VCol cols="12" class="px-0 py-0">
            <span class="text-black">Ya tienes cuenta?</span>

            <RouterLink class="text-gold ms-2" :to="{ name: 'login' }">
              Iniciar sesión
            </RouterLink>

            <RouterLink class="text-black ms-2" :to="{ name: 'wholesaler-register' }">
              ¿Quiero ser mayorista?
            </RouterLink>
          </VCol>
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
                  v-model="username"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Correo electrónico"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator, passwordValidator]"
                  label="Contraseña"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  placeholder="Ingresa tu contraseña"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center justify-space-between mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <a href="javascript:void(0)" class="text-black">Aviso de Privacidad</a>
                    </template>
                  </VCheckbox>
                  <RouterLink class="text-black ms-2" :to="{ name: 'guest' }">
                    Continuar como invitado
                  </RouterLink>
                </div>

                <VBtn block type="submit">
                  <a class="font-weight-bold text-black">REGISTRARSE</a>
                </VBtn>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-black font-weight-100" style="flex:none">O registrate con</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
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
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
