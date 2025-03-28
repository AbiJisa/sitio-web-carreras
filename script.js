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

// Función para redirigir a las otras páginas
 function redirigir(carrera) {
  window.location.href = `carrera.html?nombre=${encodeURIComponent(carrera)}`;
 }

// Función para registrar datos en Firebase usando la boleta como ID
const formulario = document.getElementById('formulario-registro');
const mensajeExito = document.getElementById('mensaje-exito'); 

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  console.log("¿Existe carrera-1?", document.getElementById('carrera-1'));
console.log("¿Existe carrera-2?", document.getElementById('carrera-2')); 

  // Obtener valores del formulario
  const boleta = document.getElementById("boleta").value.trim();
  const paterno = document.getElementById("apellido-paterno").value.trim();
  const materno = document.getElementById("apellido-materno").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const carrera1 = document.getElementById("carrera-1").value.trim();
  const carrera2 = document.getElementById("carrera-2").value.trim();
  // const carreraSeleccionada = document.getElementById('carrera-seleccionada').value.trim();

  // Validación de la boleta
  const boletaRegex = /^\d{10}$/; // Debe ser exactamente 10 dígitos numéricos
  if (!boletaRegex.test(boleta)) {
    alert("La boleta debe contener exactamente 10 números.");
    return;
  }

  // Validación de campos
  if (!boleta || !paterno || !materno || !nombres || !carrera1 || !carrera2) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // Verificar si la boleta ya existe
    const registroExistente = await getDoc(doc(db, "registros", boleta));
    if (registroExistente.exists()) {
      alert(`La boleta ${boleta} ya está registrada.`);
      return;
    }

    // Obtener la fecha y hora actual
    const fechaRegistro = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    // Guardar datos en Firestore usando la boleta como ID
    await setDoc(doc(db, "registros", boleta), {
      boleta: boleta,
      apellidopaterno: paterno,
      apellidomaterno: materno,
      nombres: nombres,
      primeraopcion: carrera1,
      segundaopcion: carrera2,
      // carrera: carreraSeleccionada,
      fechaRegistro: fechaRegistro
    });

    // Mostrar mensaje de éxito y limpiar el formulario
    mostrarMensajeExito(`Registro exitoso para la boleta ${boleta}`, fechaRegistro);
    formulario.reset();
  } catch (error) {
    console.error("Error al registrar:", error);
    alert('Hubo un error al registrar los datos.');
  }
});

// Función para mostrar mensaje de éxito
function mostrarMensajeExito(mensaje, fecha) {
  mensajeExito.innerHTML = `${mensaje}<br><strong>Fecha y hora:</strong> ${fecha}`;
  mensajeExito.style.display = "block"; // Mostrar mensaje
  setTimeout(() => {
    mensajeExito.style.display = "none"; // Ocultar mensaje después de 3 segundos
  }, 3000);
}

// Crear botones dinámicamente para redirigir a cada carrera
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
