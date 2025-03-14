import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// 👉 Función para registrar datos en Firebase
const formulario = document.getElementById('formulario-registro');
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const boleta = document.getElementById('boleta').value;
  const carreraSeleccionada = document.getElementById('carrera-seleccionada').value;

  if (!nombre || !boleta || !carreraSeleccionada) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // 🔥 Si quieres que Firebase genere el ID automáticamente:
    const docRef = await addDoc(collection(db, 'registros'), {
      nombre: nombre,
      boleta: boleta,
      carrera: carreraSeleccionada
    });

    formulario.reset(); // Limpia el formulario después de registrar
  } catch (error) {
    console.error("Error al registrar:", error);
    alert('Hubo un error al registrar los datos.');
  }
});

// 👉 Crear botones dinámicamente para redirigir a cada carrera
const carreras = [
  { nombre: 'Tecnico en informatica', url: "./carreras/tecnico-informatica.html" },
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