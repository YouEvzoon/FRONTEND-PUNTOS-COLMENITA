<template>
  <div class="perfil-container">
    <h2>Perfil de Usuario</h2>
    <div v-if="usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <button class="logout-btn" @click="cerrarSesion">Cerrar sesión</button>
    </div>
    <div v-else>
      <p>Cargando datos de usuario...</p>
    </div>

    <h3>Resumen de Puntos por Juego</h3>
    <table v-if="resumen.length">
      <thead>
        <tr>
          <th>Juego</th>
          <th>Total de Puntos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in resumen" :key="i">
          <td>{{ item.nombre_juego }}</td>
          <td>{{ item.total_puntos }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No hay puntos registrados.</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { API_BASE_URL } from '../constants';

export default {
  name: 'PerfilUsuario',
  data() {
    return {
      usuario: null,
      resumen: [],
      error: null,
      id_usuario: localStorage.getItem('id_usuario') || ''
    };
  },
  mounted() {
    this.cargarPerfil();
    this.cargarResumen();
  },
  methods: {
    cerrarSesion() {
      localStorage.clear();
      this.$router.push('/');
    },
    async cargarPerfil() {
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/usuarios/${this.id_usuario}`);
        const data = await res.json();
        if (res.ok) {
          this.usuario = data;
        } else {
          this.error = data.error || 'Error al cargar usuario';
        }
      } catch (e) {
        this.error = 'Error de conexión al cargar usuario';
      }
    },
    async cargarResumen() {
      this.error = null;
      try {
        const res = await fetch(`${API_BASE_URL}/puntos-juego/historial/${this.id_usuario}`);
        const data = await res.json();
        if (res.ok) {
          this.resumen = data.resumen;
        } else {
          this.error = data.error || 'Error al cargar resumen';
        }
      } catch (e) {
        this.error = 'Error de conexión al cargar resumen';
      }
    }
  }
};
</script>

<style scoped>
.perfil-container {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  padding: 32px 24px;
  font-family: 'Montserrat', Arial, sans-serif;
  width: 95vw;
  min-width: 0;
}
h2 {
  text-align: center;
  color: #c2185b;
  margin-bottom: 18px;
}
h3 {
  color: #c2185b;
  margin-top: 32px;
  margin-bottom: 12px;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 18px;
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
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
.error {
  color: #d32f2f;
  text-align: center;
  margin-top: 18px;
  font-weight: 600;
}
  .logout-btn {
    margin-top: 18px;
    background: #c2185b;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 24px;
    font-size: 1rem;
    font-family: 'Montserrat', Arial, sans-serif;
    cursor: pointer;
    transition: background 0.2s;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .logout-btn:hover {
    background: #a31548;
  }
  @media (max-width: 600px) {
    .perfil-container {
      padding: 16px 4vw;
      font-size: 0.97rem;
    }
    h2, h3 {
      font-size: 1.1rem;
    }
    .logout-btn {
      font-size: 0.97rem;
      padding: 8px 12px;
    }
  }
</style>
