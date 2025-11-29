<template>
  <div class="reset-container">
    <div class="reset-card">
      <h2>Restablecer contraseña</h2>
      <form @submit.prevent="handleReset">
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Correo electrónico" required />
        </div>
        <button type="submit" class="reset-button">Enviar enlace de restablecimiento</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
      <button class="back-button" @click="goBack">Volver al inicio de sesión</button>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../constants";
import axios from "axios";

export default {
  name: "RestablecerContrasena",
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    async handleReset() {
      try {
        const response = await axios.post(`${API_BASE_URL}/usuarios/restablecer-contrasena`, {
          correo: this.email,
        });
        if (response.data.success) {
          this.message = "Se ha enviado un enlace de restablecimiento a su correo electrónico.";
        } else {
          this.message = response.data.message || "No se pudo enviar el enlace. Verifique el correo.";
        }
      } catch (error) {
        this.message = "Ocurrió un error. Intente más tarde.";
      }
    },
    goBack() {
      this.$router.push({ name: "LoginComponent" });
    },
  },
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}
.reset-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
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
.reset-button {
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
  margin-bottom: 1rem;
}
.reset-button:hover {
  background: #005ea6;
}
.message {
  color: #0070ba;
  margin-bottom: 1rem;
}
.back-button {
  background: none;
  border: none;
  color: #0070ba;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
}
.back-button:hover {
  color: #005ea6;
}
</style>
