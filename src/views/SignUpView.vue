<template>
  <!-- Hlavný kontajner pre registráciu -->
  <div class="auth-view">
    <SignUpForm />
  </div>
</template>

<script lang="ts">
// Importy komponentov
import { defineComponent } from 'vue'
import SignUpForm from '@/components/SignUpForm.vue'

export default defineComponent({
  name: 'SignUpView',

  // Registrácia komponentu pre registračný formulár
  components: {
    SignUpForm,
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
