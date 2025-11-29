<template>
  <div class="histopunto-container">
    <h2>Historial de puntos por juego</h2>
    <table v-if="historial.length">
      <thead>
        <tr>
          <th>Juego</th>
          <th>Puntos Obtenidos</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in historial" :key="i">
          <td>{{ item.nombre_juego }}</td>
          <td>{{ item.puntos_obtenidos }}</td>
          <td>{{ new Date(item.fecha_registro).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No hay historial.</p>
    </div>

    <h2>Resumen total por juego</h2>
    <table v-if="resumen.length">
      <thead>
        <tr>
          <th>Juego</th>
          <th>Total de Puntos</th>
          <th>Recompensa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in resumen" :key="i">
          <td>{{ item.nombre_juego }}</td>
          <td>{{ item.total_puntos }}</td>
          <td>
            <button
              class="recompensa-btn"
              @click="solicitarRecompensaJuego(item.nombre_juego)"
              :disabled="item.total_puntos < 100"
            >
              Solicitar (100 pts)
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No hay resumen.</p>
    </div>
    <div v-if="error" style="color:red">{{ error }}</div>
    <div v-if="mensajeRecompensa" class="mensaje-recompensa" style="text-align:center; margin-top:18px;">{{ mensajeRecompensa }}</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../constants';

export default {
  name: 'HistoPunto',
  data() {
    return {
      historial: [],
      resumen: [],
      error: null,
      mensajeRecompensa: '',
      id_usuario: localStorage.getItem('id_usuario') || ''
    };
  },
  mounted() {
    this.cargarHistorial();
  },
  methods: {
    async cargarHistorial() {
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/puntos-juego/historial/${this.id_usuario}`);
        const data = await res.json();
        if (res.ok) {
          this.historial = data.historial;
          this.resumen = data.resumen;
        } else {
          this.error = data.error || 'Error al cargar historial';
        }
      } catch (e) {
        this.error = 'Error de conexión';
      }
    },
    async solicitarRecompensaJuego(nombre_juego) {
      this.mensajeRecompensa = '';
      try {
        const res = await fetch(`${API_BASE_URL}/puntos-juego/solicitar-recompensa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_usuario: this.id_usuario, nombre_juego })
        });
        const data = await res.json();
        if (res.ok) {
          this.mensajeRecompensa = data.mensaje || 'Recompensa solicitada.';
          this.cargarHistorial();
        } else {
          this.mensajeRecompensa = data.error || 'No se pudo solicitar la recompensa.';
        }
      } catch (e) {
        this.mensajeRecompensa = 'Error de conexión al solicitar recompensa.';
      }
    }
  },
  // Computed eliminado, ya no es necesario
};
</script>

<style scoped>
.histopunto-container {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
  padding: 32px 24px;
  font-family: 'Montserrat', Arial, sans-serif;
  width: 98vw;
  min-width: 0;
}
h2 {
  text-align: center;
  color: #c2185b;
  margin-bottom: 18px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  overflow-x: auto;
  display: block;
}
th, td {
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  text-align: center;
}
th {
  background: #f6d365;
  color: #222;
}
.recompensa-btn {
  background: #c2185b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 1rem;
  font-family: 'Montserrat', Arial, sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}
.recompensa-btn:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}
.mensaje-recompensa {
  margin-top: 12px;
  color: #388e3c;
  font-weight: 500;
}
@media (max-width: 600px) {
  .histopunto-container {
    padding: 12px 2vw;
    font-size: 0.97rem;
  }
  h2 {
    font-size: 1.1rem;
  }
  table {
    font-size: 0.95rem;
  }
  .recompensa-btn {
    font-size: 0.95rem;
    padding: 7px 10px;
  }
}
</style>
