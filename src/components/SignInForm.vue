<!-- Formulár pre prihlásenie -->
<template>
  <v-form @submit.prevent="handleSubmit" class="sign-in-form">
    <v-card class="pa-4">
      <!-- Nadpis formulára -->
      <div class="text-center mb-4">
        <h2 class="text-h4">Sign In</h2>
      </div>

      <!-- Vstupné pole pre email -->
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        :rules="emailRules"
      ></v-text-field>

      <!-- Vstupné pole pre heslo -->
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="passwordRules"
      ></v-text-field>

      <!-- Tlačidlo pre prihlásenie -->
      <v-btn
        type="submit"
        color="primary"
        block
        :loading="authStore.loading"
        :disabled="!isValid"
        class="mt-4"
      >
        Sign In
      </v-btn>

      <!-- Odkaz na registráciu -->
      <div class="text-center mt-4">
        <span class="text-grey">Don't have an account?</span>
        <v-btn
          variant="text"
          color="primary"
          class="ms-2"
          :disabled="authStore.loading"
          @click="router.push('/signup')"
        >
          Sign Up
        </v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script lang="ts">
// Importy potrebných závislostí
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import type { Router } from 'vue-router'

// Rozhranie pre stav formulára
interface SignInFormState {
  router: Router
  authStore: ReturnType<typeof useAuthStore>
  email: string
  password: string
  emailRules: ((v: string) => boolean | string)[]
  passwordRules: ((v: string) => boolean | string)[]
}

export default defineComponent({
  name: 'SignInForm',

  // Základný stav komponentu
  data(): SignInFormState {
    const store = useAuthStore()
    return {
      router: useRouter(),
      authStore: store,
      email: '',
      password: '',
      // Pravidlá pre validáciu emailu
      emailRules: [
        (v: string) => !!v || 'Email is required',
        (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      // Pravidlá pre validáciu hesla
      passwordRules: [(v: string) => !!v || 'Password is required'],
    }
  },

  // Kontrola platnosti formulára
  computed: {
    isValid(): boolean {
      return !!(
        this.email &&
        this.password &&
        /.+@.+\..+/.test(this.email) &&
        !this.authStore.loading
      )
    },
  },

  methods: {
    // Spracovanie odoslania formulára
    async handleSubmit(): Promise<void> {
      if (!this.isValid) return

      try {
        await this.authStore.signIn(this.email, this.password)
        if (!this.authStore.error) {
          await this.router.push('/')
        }
      } catch (error) {
        console.error('Sign in error:', error)
      }
    },
  },
})
</script>

<style scoped>
.sign-in-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
