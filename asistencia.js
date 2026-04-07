// ===============================
// CARGAR DATOS DEL ESTUDIANTE Y VALIDAR SESIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        // Si no hay sesión, redirigir
        window.location.href = "lateral.html";
        return;
    }

    // Mostrar perfil en central y cabecera (menu.js ya lo hace, pero aseguramos que funcione)
    const nombreCompleto = data.nombre + " " + data.apellido;

    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;

    // Cargar notas
    cargarNotas(data);
});

// ===============================
// BASE DE DATOS (SOLO ASISTENCIA POR CI)
// ===============================
const estudiantesAsistencia = {
    "1234567": {
        asistencia: [
            { trimestre: "1er Trimestre", faltas: 2, atrasos: 1, licencias: 0, presentes: 55 },
            { trimestre: "2do Trimestre", faltas: 1, atrasos: 0, licencias: 1, presentes: 58 },
            { trimestre: "3er Trimestre", faltas: 0, atrasos: 2, licencias: 0, presentes: 60 }
        ]
    },
    "7654321": {
        asistencia: [
            { trimestre: "1er Trimestre", faltas: 3, atrasos: 2, licencias: 1, presentes: 50 },
            { trimestre: "2do Trimestre", faltas: 0, atrasos: 1, licencias: 0, presentes: 60 },
            { trimestre: "3er Trimestre", faltas: 1, atrasos: 0, licencias: 0, presentes: 59 }
        ]
    }
};

// ===============================
// OBTENER DATOS DEL LOGIN
// ===============================
const data = JSON.parse(localStorage.getItem("estudiante"));

// ===============================
// VALIDAR SESIÓN
// ===============================
if (!data) {
    window.location.href = "index.html";
}

// ===============================
// DATOS DEL ESTUDIANTE
// ===============================
const ci = data.ci;
const estudianteBD = estudiantesAsistencia[ci];

// Si no tiene datos registrados
if (!estudianteBD) {
    alert("No hay datos de asistencia para este estudiante");
}

// ===============================
// MOSTRAR DATOS (YA COMPATIBLE CON TU HEADER)
// ===============================
document.getElementById("student-name").textContent = data.nombre;
document.getElementById("nombreCompleto").textContent = data.nombreCompleto;
document.getElementById("course-name").textContent = data.curso;

document.getElementById("student-name-main").textContent = data.nombreCompleto;
document.getElementById("course-name-main").textContent = data.curso;

// ===============================
// GENERAR TABLA
// ===============================
const tabla = document.getElementById("grades-table");

if (estudianteBD) {
    estudianteBD.asistencia.forEach(dato => {
        const fila = `
            <tr>
                <td>${dato.trimestre}</td>
                <td>${dato.faltas}</td>
                <td>${dato.atrasos}</td>
                <td>${dato.licencias}</td>
                <td>${dato.presentes}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// ===============================
// DROPDOWN PERFIL (POR SI NO SE EJECUTA EN MENU.JS)
// ===============================
const toggle = document.getElementById("dropdownToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.getElementById("dropdownMenu").classList.toggle("active");
    });
}
// ===============================
// MENÚ LATERAL (MÓVIL)
// ===============================
function toggleMenu() {

    const paginaActual = window.location.pathname;

    if (paginaActual.includes("lateral.html")) {
        window.history.back(); // vuelve a la página anterior
    } else {
        window.location.href = "lateral.html";
    }
}