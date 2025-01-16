<template>
  <!-- Hlavný kontajner pre prihlásenie -->
  <div class="auth-view">
    <SignInForm />
  </div>
</template>

<script lang="ts">
// Importy komponentov
import { defineComponent } from 'vue'
import SignInForm from '@/components/SignInForm.vue'

export default defineComponent({
  name: 'SignInView',

  // Registrácia komponentu pre prihlasovací formulár
  components: {
    SignInForm,
  },
})
</script>

<style scoped>
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--v-primary-darken1) 0%, var(--v-primary-base) 100%);
}
</style>
