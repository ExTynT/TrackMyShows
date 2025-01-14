<template>
  <div class="footer">
    <div class="footer-content">
      <span>© 2024</span>
      <div class="links">
        <a href="#">About</a>
        <span>·</span>
        <a href="#">Support</a>
        <span>·</span>
        <a href="#">Terms</a>
        <span>·</span>
        <a href="#">Privacy</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #666;
}

.footer-content {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.links {
  display: flex;
  gap: 4px;
}

.links a {
  color: #666;
  text-decoration: none;
}

.links a:hover {
  color: var(--link-hover-color);
}

@media (max-width: 600px) {
  .footer {
    height: auto;
    padding: 4px 0;
  }

  .footer-content {
    flex-direction: column;
    gap: 2px;
  }
}
</style>
