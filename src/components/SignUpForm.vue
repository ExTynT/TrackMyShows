<!-- Formulár pre registráciu -->
<template>
  <v-form @submit.prevent="handleSubmit" class="sign-up-form">
    <v-card class="pa-4">
      <!-- Nadpis formulára -->
      <div class="text-center mb-4">
        <h2 class="text-h4">Sign Up</h2>
      </div>

      <!-- Vstupné pole pre email -->
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        :rules="emailRules"
      ></v-text-field>

      <!-- Vstupné pole pre používateľské meno -->
      <v-text-field
        v-model="username"
        label="Username"
        required
        :rules="usernameRules"
      ></v-text-field>

      <!-- Vstupné pole pre heslo -->
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="passwordRules"
      ></v-text-field>

      <!-- Vstupné pole pre potvrdenie hesla -->
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        :rules="confirmPasswordRules"
      ></v-text-field>

      <!-- Tlačidlo pre registráciu -->
      <v-btn
        type="submit"
        color="primary"
        block
        :loading="authStore.loading"
        :disabled="!isValid"
        class="mt-4"
      >
        Sign Up
      </v-btn>

      <!-- Odkaz na prihlásenie -->
      <div class="text-center mt-4">
        <span class="text-grey">Already have an account?</span>
        <v-btn
          variant="text"
          color="primary"
          class="ms-2"
          :disabled="authStore.loading"
          @click="router.push('/signin')"
        >
          Sign In
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
interface SignUpFormState {
  router: Router
  authStore: ReturnType<typeof useAuthStore>
  email: string
  username: string
  password: string
  confirmPassword: string
  emailRules: ((v: string) => boolean | string)[]
  usernameRules: ((v: string) => boolean | string)[]
  passwordRules: ((v: string) => boolean | string)[]
}

export default defineComponent({
  name: 'SignUpForm',

  // Základný stav komponentu
  data(): SignUpFormState {
    const store = useAuthStore()
    return {
      router: useRouter(),
      authStore: store,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      // Pravidlá pre validáciu emailu
      emailRules: [
        (v: string) => !!v || 'Email is required',
        (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      // Pravidlá pre validáciu používateľského mena
      usernameRules: [
        (v: string) => !!v || 'Username is required',
        (v: string) => v.length >= 3 || 'Username must be at least 3 characters',
      ],
      // Pravidlá pre validáciu hesla
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    }
  },

  computed: {
    // Pravidlá pre validáciu potvrdenia hesla
    confirmPasswordRules(): ((v: string) => boolean | string)[] {
      return [
        (v: string) => !!v || 'Please confirm your password',
        (v: string) => v === this.password || 'Passwords must match',
      ]
    },
    // Kontrola platnosti formulára
    isValid(): boolean {
      return !!(
        this.email &&
        this.username &&
        this.password &&
        this.confirmPassword &&
        /.+@.+\..+/.test(this.email) &&
        this.username.length >= 3 &&
        this.password.length >= 6 &&
        this.password === this.confirmPassword &&
        !this.authStore.loading
      )
    },
  },

  methods: {
    // Spracovanie odoslania formulára
    async handleSubmit(): Promise<void> {
      if (!this.isValid) return

      try {
        await this.authStore.signUp(this.email, this.password, this.username)
        if (!this.authStore.error) {
          await this.router.push('/')
        }
      } catch (error) {
        console.error('Sign up error:', error)
      }
    },
  },
})
</script>

<style scoped>
.sign-up-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
