<template>
  <div class="principal-container">
    <h1>Bienvenido al Sistema de Puntos de La Colmenita</h1>
    <p>
      ¡Acumula puntos cada vez que compras y canjea increíbles recompensas!<br><br>
      <b>¿Cómo funciona?</b><br>
      Por cada compra de Q10 en adelante en productos de la tienda, recibirás un código.<br>
      Cada código cuenta como una visita y te permite acumular puntos.<br>
      Las compras no se suman en una sola transacción; cada visita genera un código independiente.<br><br>
      <b>¿Cuántos puntos puedes obtener?</b><br>
      Por cada código puedes recibir entre 1 y 5 puntos, el valor es aleatorio.<br><br>
      <b>¿Qué puedes ganar?</b><br>
      Diamantes y oro para Blood Strike.<br>
      CPs para Call of Duty.<br>
      Entre más puntos acumules, mejores serán tus recompensas.<br><br>
      <b>Importante:</b> Solicita tu código al propietario cada vez que realices una compra para que tus puntos se registren.
    </p>
    <!-- Puedes agregar aquí otros componentes o contenido principal -->
    <HeaderView class="footer-header" />
    <div v-if="$route.path === '/puntos'" class="modal-fondo">
      <PuntosJuego />
    </div>
  </div>
</template>

<script>
import HeaderView from './Header.vue';
import PuntosJuego from './PuntosJuego.vue';
export default {
  name: 'PrincipalView',
  components: {
    HeaderView,
    PuntosJuego
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Notable&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bit+Mono&display=swap');

.principal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 50%, #a1c4fd 100%);
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  border-radius: 0;
  font-family: 'Notable', Arial, sans-serif;
}

.principal-container h1 {
  font-family: 'Bangers', cursive;
  font-size: 2.3rem;
  font-weight: 400;
  color: #222;
  margin-top: 60px;
  margin-bottom: 18px;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.25);
  border-radius: 12px;
  padding: 8px 24px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.04);
}

.principal-container p {
  font-family: 'Bit Mono', monospace;
  font-size: 1.18rem;
  color: #333;
  background: rgba(255,255,255,0.18);
  border-radius: 10px;
  padding: 14px 22px;
  margin-bottom: 32px;
  text-align: center;
  max-width: 95vw;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.03);
}
@media (max-width: 600px) {
  .principal-container h1 {
    font-size: 1.3rem;
    padding: 6px 8vw;
  }
  .principal-container p {
    font-size: 0.97rem;
    padding: 10px 4vw;
  }
}

.principal-container b {
  color: #c2185b;
  font-weight: 600;
}

.footer-header {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 100;
}
</style>
/* Fondo semitransparente para formularios tipo modal */
.modal-fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
