import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  username: string
  avatar_url?: string
  bio?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  async function initialize() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    if (user.value) {
      await fetchProfile()
    }
  }

  async function signIn(email: string, password: string) {
    try {
      loading.value = true
      error.value = null
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      user.value = data.user
      await fetchProfile()
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function signUp(email: string, password: string, username: string) {
    try {
      loading.value = true
      error.value = null
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
      })
      if (err) throw err

      if (data.user) {
        // Vytvorenie profilu používateľa
        const { error: profileError } = await supabase.from('user_profiles').insert({
          id: data.user.id,
          username,
          avatar_url: null,
          bio: null,
        })
        if (profileError) throw profileError
        user.value = data.user
        await fetchProfile()
      }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    try {
      loading.value = true
      error.value = null
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
      user.value = null
      profile.value = null
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    try {
      if (!user.value) return

      const { data, error: err } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()

      if (err) throw err
      profile.value = data
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    try {
      loading.value = true
      error.value = null
      if (!user.value) throw new Error('No user logged in')

      const { error: err } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.value.id)

      if (err) throw err
      await fetchProfile()
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated,
    initialize,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }
})
