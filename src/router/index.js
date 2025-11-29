import { createRouter, createWebHistory } from "vue-router";



import Login from "../components/Login.vue";
import RegistroUsuario from "../components/RegistroUsuario.vue";
import Principal from "../components/Principal.vue";
import Configuracion from "../components/Principal.vue";
import Puntos from "../components/puntos.vue";
import HistoPunto from "../components/histopunto.vue";
import Perfil from "../components/perfil.vue";
import RestablecerContrasena from "../components/RestablecerContrasena.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/registro",
    name: "RegistroUsuario",
    component: RegistroUsuario,
  },
  {
    path: "/principal",
    name: "PrincipalView",
    component: Principal,
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: Configuracion,
  },
  {
    path: "/puntos",
    name: "Puntos",
    component: Puntos,
  },
  {
    path: "/saldo",
    name: "Saldo",
    component: HistoPunto,
  },
  {
    path: "/usuario",
    name: "Perfil",
    component: Perfil,
  },
  {
    path: "/restablecer-contrasena",
    name: "RestablecerContrasena",
    component: RestablecerContrasena
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;