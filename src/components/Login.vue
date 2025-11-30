<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-logo">CODEBIT</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Correo electrónico o número de celular" required />
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Contraseña" required />
        </div>
        <a href="#" class="forgot-password">¿Ha olvidado su contraseña?</a>
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="isLoading">Autenticando, espere...</span>
          <span v-else>Iniciar sesión</span>
        </button>
        <div class="divider">
          <span>o</span>
        </div>
        <button type="button" class="register-button" @click="goToRegister">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
// Importar la constante global
import { API_BASE_URL } from "../constants";
// Importar axios para realizar solicitudes HTTP
import axios from "axios";

export default {
  name: "LoginComponent",
  // components: {},
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // Para manejar errores
      isLoading: false, // Estado de carga para autenticación
    };
  },
  methods: {
    async handleLogin() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        // Enviar solicitud al backend para verificar credenciales
        const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
          correo: this.email,
          password: this.password,
        });

        // Mostrar los datos enviados al servidor
        console.log("Datos enviados al servidor:", {
          correo: this.email,
          password: this.password,
        });

        // Mostrar la respuesta completa del servidor
        console.log("Respuesta completa del servidor:", response.data);

        // Manejar la respuesta del servidor
        if (response.data.usuario) {
          console.log("Inicio de sesión exitoso");
          // Guardar el id_usuario en localStorage
          localStorage.setItem('id_usuario', response.data.usuario.id_usuario);
          alert(`Inicio de sesión exitoso. Bienvenido, ${response.data.usuario.nombre}`); // Mostrar alerta de éxito con el nombre del usuario
          // Redirigir al componente principal
          this.$router.push({ name: "PrincipalView" });
        } else {
          this.errorMessage = response.data.message || "Credenciales incorrectas. Por favor, intente nuevamente.";
          alert(this.errorMessage); // Mostrar alerta de error
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        this.errorMessage = "Ocurrió un error al intentar iniciar sesión. Intente más tarde.";
        alert(this.errorMessage); // Mostrar alerta de error
      } finally {
        this.isLoading = false;
      }
    },
    goToRegister() {
      this.$router.push({ name: "RegistroUsuario" }); // Navegar al componente de registro
    },
    goToResetPassword() {
      this.$router.push({ name: "RestablecerContrasena" });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.login-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-logo {
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
  height: 48px; /* Match the height of the button */
  box-sizing: border-box; /* Ensure padding and border are included in the height */
}

.form-group input:focus {
  border-color: #0070ba;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #0070ba;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  height: 48px; /* Ensure consistent height */
  box-sizing: border-box; /* Ensure padding and border are included in the height */
}

.login-button:hover {
  background: #005ea6;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #aaa;
}

.divider span {
  margin: 0 0.5rem;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.register-button:hover {
  background: #000;
  color: #fff;
}

.forgot-password {
  display: block;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #0070ba;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>

