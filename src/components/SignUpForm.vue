<template>
  <v-form @submit.prevent="handleSubmit" class="sign-up-form">
    <v-card class="pa-4">
      <div class="text-center mb-4">
        <h2 class="text-h4">Sign Up</h2>
      </div>

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        required
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ]"
      ></v-text-field>

      <v-text-field
        v-model="username"
        label="Username"
        required
        :rules="[
          (v) => !!v || 'Username is required',
          (v) => v.length >= 3 || 'Username must be at least 3 characters',
        ]"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="[
          (v) => !!v || 'Password is required',
          (v) => v.length >= 6 || 'Password must be at least 6 characters',
        ]"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        :rules="[
          (v) => !!v || 'Please confirm your password',
          (v) => v === password || 'Passwords must match',
        ]"
      ></v-text-field>

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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
  name: 'SignUpForm',

  data() {
    return {
      router: useRouter(),
      authStore: useAuthStore(),
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  },

  computed: {
    isValid(): boolean {
      return !!(
        this.email &&
        this.username &&
        this.password &&
        this.confirmPassword &&
        /.+@.+\..+/.test(this.email) &&
        this.username.length >= 3 &&
        this.password.length >= 6 &&
        this.password === this.confirmPassword
      )
    },
  },

  methods: {
    async handleSubmit() {
      if (!this.isValid) return

      await this.authStore.signUp(this.email, this.password, this.username)
      if (!this.authStore.error) {
        this.router.push('/')
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
