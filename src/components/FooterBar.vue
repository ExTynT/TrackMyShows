<template>
  <v-footer class="footer">
    <v-container>
      <div class="footer-content">
        <span class="copyright">© Ivan Klopček 2025</span>
      </div>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterBar',
})
</script>

<style scoped>
.footer {
  background: var(--v-surface-base);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
}
</style>
