<template>
  <footer class="footer-nav">
    <ul class="footer-links">
      <li>
        <button @click="$router.push('/usuario')">
          <span class="icon">
            <!-- Usuario: user icon -->
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
          </span>
          <span class="label">Perfil</span>
        </button>
      </li>
      <li>
        <button @click="$router.push('/saldo')">
          <span class="icon">
            <!-- Saldo: dollar icon -->
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
          </span>
          <span class="label">Saldo</span>
        </button>
      </li>
      <li>
        <button @click="$router.push('/puntos')">
          <span class="icon">
            <!-- Puntos: star icon -->
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>
          </span>
          <span class="label">Puntos</span>
        </button>
      </li>
      <li>
        <button @click="$router.push('/principal')">
          <span class="icon">
            <!-- Inicio: home icon -->
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
          </span>
          <span class="label">Inicio</span>
        </button>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'HeaderView',
};
</script>

<style scoped>
/* Barra de navegación inferior tipo menú de app */
.footer-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fff;
  color: #222;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
  z-index: 100;
  height: 60px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-links {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}
.footer-links li {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
}
.footer-links button {
  background: none;
  border: none;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 0;
  transition: background 0.2s, color 0.2s;
}
.footer-links button.active,
.footer-links button:focus {
  background: #ededed;
}
.footer-links .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-bottom: 0px;
  color: #888;
}
.footer-links .icon svg {
  width: 18px;
  height: 18px;
}
.footer-links .label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #888;
  margin-top: 0px;
}
.footer-links .label.active {
  color: #c2185b;
  font-weight: 700;
}
@media (max-width: 600px) {
  .footer-nav {
    height: 54px;
  }
  .footer-links .icon svg {
    width: 15px;
    height: 15px;
  }
  .footer-links .label {
    font-size: 0.65rem;
  }
}
</style>
