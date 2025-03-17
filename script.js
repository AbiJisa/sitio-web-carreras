import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (usa la configuración que obtuviste de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyD3IztuFtARFAcYocUtaAA4bL4CWPB6J1s",
    authDomain: "sitiowebcecyt12.firebaseapp.com",
    projectId: "sitiowebcecyt12",
    storageBucket: "sitiowebcecyt12.firebasestorage.app",
    messagingSenderId: "332248615042",
    appId: "1:332248615042:web:3b373f14f77e3adc0b8c9b"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👉 Función para redirigir a otra página
function redirigir(carrera) {
  window.location.href = `carrera.html?nombre=${encodeURIComponent(carrera)}`;
}

// 👉 Función para registrar datos en Firebase usando la boleta como ID
const formulario = document.getElementById('formulario-registro');
const mensajeExito = document.getElementById('mensaje-exito'); // Mensaje de confirmación

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const boleta = document.getElementById('boleta').value.trim();
  const carreraSeleccionada = document.getElementById('carrera-seleccionada').value.trim();

  // ✅ Validación de campos
  if (!nombre || !boleta || !carreraSeleccionada) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // ✅ Verificar si la boleta ya existe
    const registroExistente = await getDoc(doc(db, "registros", boleta));
    if (registroExistente.exists()) {
      alert(`La boleta ${boleta} ya está registrada.`);
      return;
    }

    // ✅ Guardar datos en Firestore usando la boleta como ID
    await setDoc(doc(db, "registros", boleta), {
      nombre: nombre,
      boleta: boleta,
      carrera: carreraSeleccionada
    });

    // ✅ Mostrar mensaje de éxito y limpiar el formulario
    mostrarMensajeExito(`Registro exitoso para la boleta ${boleta}`);
    formulario.reset();
  } catch (error) {
    console.error("Error al registrar:", error);
    alert('Hubo un error al registrar los datos.');
  }
});

// 👉 Función para mostrar mensaje de éxito
function mostrarMensajeExito(mensaje) {
  mensajeExito.innerText = mensaje;
  mensajeExito.style.display = "block"; // Mostrar mensaje
  setTimeout(() => {
    mensajeExito.style.display = "none"; // Ocultar mensaje después de 3 segundos
  }, 3000);
}

// 👉 Crear botones dinámicamente para redirigir a cada carrera
const carreras = [
  { nombre: 'Técnico en informática', url: "./carreras/tecnico-informatica.html" },
  { nombre: "Técnico en administración", url: "./carreras/tecnico-administracion.html" },
  { nombre: "Técnico en contaduría", url: "./carreras/tecnico-contaduria.html" },
  { nombre: "Técnico en mercadotecnia", url: "./carreras/tecnico-mercadotecnia.html" }
];

const contenedor = document.getElementById('carreras-container');

carreras.forEach(carrera => {
  const button = document.createElement('button');
  button.innerText = carrera.nombre;
  button.className = 'boton-carrera'; // Clase para diseño en CSS
  button.onclick = () => window.location.href = carrera.url; // Redirige al hacer clic
  contenedor.appendChild(button);
});