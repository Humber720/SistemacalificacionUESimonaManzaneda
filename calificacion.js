// ===============================
// CARGAR DATOS DEL ESTUDIANTE Y VALIDAR SESIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    const nombreCompleto = data.nombre + " " + data.apellido;

    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;

    const nombreCompletoDropdown = document.getElementById("nombreCompleto");
    if (nombreCompletoDropdown) nombreCompletoDropdown.textContent = nombreCompleto;

    const courseNameDropdown = document.getElementById("course-name");
    if (courseNameDropdown) courseNameDropdown.textContent = data.curso;

    cargarNotas(data);
});

// ===============================
// BASE DE DATOS CON NOTAS (manual)
// ===============================
const estudiantesNotas = {
    "1234567": {
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: 24, autoevaluacion: 5, calificacion: 29, observacion: "Debe mejorar tareas" },
            { trimestre: "2do Trim.", puntaje: 40, autoevaluacion: 5, calificacion: 45, observacion: "Buen desempeño" },
            { trimestre: "3er Trim.", puntaje: 50, autoevaluacion: 5, calificacion: 55, observacion: "Bien" }
        ]
    },
    "7654321": {
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: 55, autoevaluacion: 5, calificacion: 60, observacion: "Excelente" },
            { trimestre: "2do Trim.", puntaje: 50, autoevaluacion: 5, calificacion: 55, observacion: "Muy bien" },
            { trimestre: "3er Trim.", puntaje: 45, autoevaluacion: 5, calificacion: 50, observacion: "Regular" }
        ]
    }
};

// ===============================
// CARGAR NOTAS EN LA TABLA
// ===============================
function cargarNotas(data) {
    const tabla = document.getElementById("grades-table");
    if (!tabla) return;

    tabla.innerHTML = ""; // limpiar tabla

    const notasEstudiante = estudiantesNotas[data.ci]?.calificaciones || [];

    let suma = 0;
    let contador = 0;

    notasEstudiante.forEach(nota => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nota.trimestre}</td>
            <td>${nota.puntaje}</td>
            <td>${nota.autoevaluacion}</td>
            <td class="${obtenerClaseEstado(nota.calificacion)}">${nota.calificacion}</td>
            <td class="${obtenerClaseEstado(nota.calificacion)}">${obtenerEstado(nota.calificacion)}</td>
            <td>${nota.observacion}</td>
        `;
        tabla.appendChild(fila);

        suma += nota.calificacion;
        contador++;
    });

    // Calcular promedio de las calificaciones
    const promedio = contador > 0 ? Math.round(suma / contador) : 0;
    const estadoFinal = obtenerEstado(promedio);

    // Fila final de PROMEDIO
    const filaPromedio = document.createElement("tr");
    filaPromedio.innerHTML = `
        <td><strong>PROMEDIO</strong></td>
        <td>-</td>
        <td>-</td>
        <td class="${obtenerClaseEstado(promedio)}"><strong>${promedio}</strong></td>
        <td class="${obtenerClaseEstado(promedio)}"><strong>${estadoFinal}</strong></td>
        <td>-</td>
    `;
    tabla.appendChild(filaPromedio);
}

// ===============================
// FUNCIONES DE ESTADO
// ===============================
function obtenerEstado(calificacion) {
    return calificacion >= 51 ? "APROBADO(A)" : "REPROBADO(A)";
}

function obtenerClaseEstado(calificacion) {
    return calificacion >= 51 ? "aprobado" : "reprobado";
}

// ===============================
// NOTAS DE CALIFICACIÓN EN PDF
// ===============================
function verNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }
    const ci = estudiante.ci;
    document.getElementById("visorPDF").src = `notas/${ci}.pdf`;
}

function descargarNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }
    const ci = estudiante.ci;
    const link = document.createElement("a");
    link.href = `notas/${ci}.pdf`;
    link.download = `${ci}.pdf`;
    link.click();
}

// ===============================
// MENÚ LATERAL (MÓVIL)
// ===============================
function toggleMenu() {
    const paginaActual = window.location.pathname;
    if (paginaActual.includes("lateral.html")) {
        window.history.back();
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
