<template>
  <v-form @submit.prevent="handleSubmit" class="sign-in-form">
    <v-card class="pa-4">
      <div class="text-center mb-4">
        <h2 class="text-h4">Sign In</h2>
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
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="[(v) => !!v || 'Password is required']"
      ></v-text-field>

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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export default defineComponent({
  name: 'SignInForm',

  data() {
    return {
      router: useRouter(),
      authStore: useAuthStore(),
      email: '',
      password: '',
    }
  },

  computed: {
    isValid(): boolean {
      return !!(this.email && this.password && /.+@.+\..+/.test(this.email))
    },
  },

  methods: {
    async handleSubmit() {
      if (!this.isValid) return

      await this.authStore.signIn(this.email, this.password)
      if (!this.authStore.error) {
        this.router.push('/')
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
