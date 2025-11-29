<template>
  <div class="puntos-juego-container">
    <h2>Puntos por Juego</h2>
    <form @submit.prevent="enviarCodigo">
      <div class="form-group">
        <label for="codigo">Código de Puntos:</label>
        <input v-model="codigo" id="codigo" required />
      </div>
      <div class="form-group">
        <label for="nombre_juego">Juego:</label>
        <select v-model="nombre_juego" id="nombre_juego" required>
          <option value="free_fire">Free Fire</option>
          <option value="blood_strike">Blood Strike</option>
          <option value="cod_mobile">COD Mobile</option>
          <option value="pubg_mobile">PUBG Mobile</option>
        </select>
      </div>
      <div class="form-group">
        <label for="codigo_jugador">UID Jugador:</label>
        <input v-model="codigo_jugador" id="codigo_jugador" required />
      </div>
      <button type="submit">Canjear</button>
    </form>
    <div v-if="puntos !== null" class="mensaje">
      <p>Puntos obtenidos: <input :value="puntos" readonly /></p>
    </div>
    <div v-if="error" class="mensaje" style="color:red">
      <p>{{ error }}</p>
    </div>
    <!-- Historial de registros eliminado -->
  </div>
</template>

<script>
import { API_BASE_URL } from '../constants';

export default {
  name: 'PuntosJuego',
  data() {
    return {
      codigo: '',
      nombre_juego: 'free_fire',
      codigo_jugador: '',
      puntos: null,
      error: null,
      id_usuario: localStorage.getItem('id_usuario') || ''
    };
  },
  methods: {
    async enviarCodigo() {
      this.error = null;
      this.puntos = null;
      try {
        const res = await fetch(`${API_BASE_URL}/codigos-puntos/usar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codigo: this.codigo,
            id_usuario: this.id_usuario,
            nombre_juego: this.nombre_juego,
            codigo_jugador: this.codigo_jugador
          })
        });
        const data = await res.json();
        if (res.ok) {
          this.puntos = data.puntos;
        } else {
          this.error = data.error || "Error al canjear el código";
        }
      } catch (e) {
        this.error = "Error de conexión";
      }
    }
  }
};
</script>

<style scoped>
.puntos-juego-container {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
  padding: 32px 24px;
  font-family: 'Montserrat', Arial, sans-serif;
  width: 95vw;
  min-width: 0;
}
h2, h3 {
  text-align: center;
  color: #c2185b;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 4px;
  color: #333;
  font-weight: 500;
}
input, select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #c2185b;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
button:hover {
  background: #a31548;
}
.mensaje {
  margin: 12px 0;
  color: #388e3c;
  text-align: center;
}
@media (max-width: 600px) {
  .puntos-juego-container {
    padding: 16px 4vw;
    font-size: 0.97rem;
  }
  h2, h3 {
    font-size: 1.1rem;
  }
  button {
    font-size: 0.97rem;
    padding: 8px;
  }
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f6f6f6;
  margin-bottom: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 0.98rem;
}
</style>
