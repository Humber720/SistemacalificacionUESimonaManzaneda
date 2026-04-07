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

    // Mostrar perfil en central y cabecera
    const nombreCompleto = data.nombre + " " + data.apellido;

    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;

    // Mostrar datos en dropdown
    const nombreCompletoDropdown = document.getElementById("nombreCompleto");
    if (nombreCompletoDropdown) nombreCompletoDropdown.textContent = nombreCompleto;

    const courseNameDropdown = document.getElementById("course-name");
    if (courseNameDropdown) courseNameDropdown.textContent = data.curso;

    // Cargar asistencia
    cargarAsistencia(data);
});

// ===============================
// BASE DE DATOS CON ASISTENCIA (manual)
// ===============================
const estudiantesAsistencia = {
    "1234567": {
        asistencia: [
            { trimestre: "1er Trim.", faltas: 2, atrasos: 1, licencias: 0, presentes: 50 },
            { trimestre: "2do Trim.", faltas: 0, atrasos: 0, licencias: 1, presentes: 52 },
            { trimestre: "3er Trim.", faltas: 1, atrasos: 2, licencias: 0, presentes: 49 }
        ]
    },
    "7654321": {
        asistencia: [
            { trimestre: "1er Trim.", faltas: 0, atrasos: 1, licencias: 0, presentes: 55 },
            { trimestre: "2do Trim.", faltas: 1, atrasos: 0, licencias: 0, presentes: 54 },
            { trimestre: "3er Trim.", faltas: 2, atrasos: 1, licencias: 1, presentes: 50 }
        ]
    }
};

// ===============================
// CARGAR ASISTENCIA EN LA TABLA
// ===============================
function cargarAsistencia(data) {
    const tabla = document.getElementById("grades-table");
    if (!tabla) return;

    tabla.innerHTML = ""; // limpiar tabla

    const asistenciaEstudiante = estudiantesAsistencia[data.ci]?.asistencia || [];

    asistenciaEstudiante.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.trimestre}</td>
            <td>${item.faltas}</td>
            <td>${item.atrasos}</td>
            <td>${item.licencias}</td>
            <td>${item.presentes}</td>
        `;
        tabla.appendChild(fila);
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

// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");
    window.location.href = "lateral.html";
}
