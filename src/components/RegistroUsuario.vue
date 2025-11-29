<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="register-logo">Registro de Usuario</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <input type="text" v-model="nombre" placeholder="Nombre completo" required />
        </div>
        <div class="form-group">
          <input type="email" v-model="correo" placeholder="Correo electrónico" required />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Contraseña" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="telefono" placeholder="Teléfono (opcional)" />
        </div>
        <button type="submit" class="register-button">Registrar</button>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../constants";
import axios from "axios";

export default {
  name: "RegistroUsuarioComponent",
  data() {
    return {
      nombre: "",
      correo: "",
      password: "",
      telefono: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post(`${API_BASE_URL}/usuarios`, {
          nombre: this.nombre,
          correo: this.correo,
          password: this.password,
          telefono: this.telefono,
        });

        // Mostrar la respuesta completa en consola para depuración
        console.log("Respuesta del backend:", response.data);

        // Ajustar la lógica para mostrar mensajes según la respuesta real del backend
        if (response.data && (response.data.success === true || response.data.inserted || response.status === 201)) {
          this.successMessage = response.data.message || "Usuario registrado exitosamente.";
          this.errorMessage = "";
          // Limpiar los campos del formulario
          this.nombre = "";
          this.correo = "";
          this.password = "";
          this.telefono = "";
        } else {
          this.errorMessage = response.data.message || "Error al registrar el usuario.";
          this.successMessage = "";
        }
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || JSON.stringify(error.response.data);
        } else {
          this.errorMessage = error.message || "Ocurrió un error al intentar registrar el usuario. Intente más tarde.";
        }
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.register-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.register-logo {
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
  height: 48px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #0070ba;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background: #0070ba;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  height: 48px;
  box-sizing: border-box;
}

.register-button:hover {
  background: #005ea6;
}

.success-message {
  color: green;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>