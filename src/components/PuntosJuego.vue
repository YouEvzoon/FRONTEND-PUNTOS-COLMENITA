<template>
  <div class="puntos-juego-form">
    <h2>Registrar Puntos de Juego</h2>
    <form @submit.prevent="registrarPuntos">
      <div class="form-group">
        <label for="nombre_juego">Juego</label>
        <select v-model="form.nombre_juego" id="nombre_juego" required>
          <option disabled value="">Selecciona un juego</option>
          <option value="free_fire">Free Fire</option>
          <option value="blood_strike">Blood Strike</option>
          <option value="cod_mobile">Call of Duty Mobile</option>
          <option value="pubg_mobile">PUBG Mobile</option>
        </select>
      </div>
      <div class="form-group">
        <label for="codigo_jugador">UID/Código de Jugador</label>
        <input type="text" v-model="form.codigo_jugador" id="codigo_jugador" maxlength="100" required />
      </div>
      <div class="form-group">
        <label for="codigo_puntos">Código de Puntos</label>
        <input type="text" v-model="form.codigo_puntos" id="codigo_puntos" maxlength="50" required />
      </div>
      <!-- El campo de puntos_obtenidos se elimina, los puntos los asigna el backend -->
      <button type="submit" :disabled="cargando">Registrar</button>
    </form>
    <div v-if="mensaje" :class="['mensaje', error ? 'error' : '']">{{ mensaje }}</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../constants.js';
export default {
  name: 'RegistrarPuntosJuegoView',
  data() {
    return {
      form: {
        id_usuario: null,
        nombre_juego: '',
        codigo_jugador: '',
        codigo_puntos: ''
      },
      mensaje: '',
      error: false,
      cargando: false
    };
  },
  mounted() {
    const id = localStorage.getItem('id_usuario');
    if (id) {
      this.form.id_usuario = Number(id);
    }
  },
  methods: {
    async registrarPuntos() {
      this.mensaje = '';
      this.error = false;
      this.cargando = true;
      if (!this.form.id_usuario) {
        const id = localStorage.getItem('id_usuario');
        if (id) {
          this.form.id_usuario = Number(id);
        } else {
          this.mensaje = 'No se encontró el ID de usuario. Inicia sesión nuevamente.';
          this.error = true;
          this.cargando = false;
          return;
        }
      }
      try {
        const response = await fetch(`${API_BASE_URL}/puntos-juego`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_usuario: this.form.id_usuario,
            nombre_juego: this.form.nombre_juego,
            codigo_jugador: this.form.codigo_jugador,
            codigo_puntos: this.form.codigo_puntos
          })
        });
        if (!response.ok) throw new Error('Error en la petición');
        const data = await response.json();
        this.mensaje = `Puntos registrados correctamente. Obtuviste ${data.puntos_obtenidos} punto(s)!`;
        this.form.nombre_juego = '';
        this.form.codigo_jugador = '';
        this.form.codigo_puntos = '';
      } catch (e) {
        this.mensaje = 'Error al registrar los puntos.';
        this.error = true;
      }
      this.cargando = false;
      setTimeout(() => { this.mensaje = ''; this.error = false; }, 2500);
    }
  }
};
</script>

<style scoped>
/* Moderno formulario de registro de puntos de juego */
.puntos-juego-form {
  max-width: 420px;
  margin: 48px auto;
  padding: 32px 28px 24px 28px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 22px;
  color: #2c3e50;
  font-weight: 700;
  letter-spacing: 1px;
}
.form-group {
  width: 100%;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}
label {
  font-size: 1rem;
  margin-bottom: 7px;
  color: #444;
  font-weight: 500;
}
input, select {
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
input:focus, select:focus {
  border: 1.5px solid #42b983;
}
button {
  width: 100%;
  padding: 10px 0;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
button:disabled {
  background: #b2dfdb;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background: #369870;
}
.mensaje {
  margin-top: 18px;
  color: #42b983;
  font-weight: 500;
  font-size: 1rem;
}
.mensaje.error {
  color: #c2185b;
}
</style>
