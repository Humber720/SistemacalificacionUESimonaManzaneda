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
// BASE DE DATOS CON NOTAS (manual)
// ===============================
const estudiantesNotas = {
    "1234567": {
        calificaciones: [
            { trimestre: "1er Trim.", calificacion: 24, observacion: "Debe mejorar tareas" },
            { trimestre: "2do Trim.", calificacion: 45, observacion: "Buen desempeño" },
            { trimestre: "3er Trim.", calificacion: 55, observacion: "Bien" }
        ]
    },
    "7654321": {
        calificaciones: [
            { trimestre: "1er Trim.", calificacion: 60, observacion: "Excelente" },
            { trimestre: "2do Trim.", calificacion: 55, observacion: "Muy bien" },
            { trimestre: "3er Trim.", calificacion: 50, observacion: "Regular" }
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

    // Obtener notas del estudiante logueado
    const notasEstudiante = estudiantesNotas[data.ci]?.calificaciones || [];

    let suma = 0;
    let contador = 0;

    notasEstudiante.forEach(nota => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nota.trimestre}</td>
            <td>${nota.calificacion}</td>
            <td class="${obtenerClaseEstado(nota.calificacion)}">${obtenerEstado(nota.calificacion)}</td>
            <td>${nota.observacion}</td>
        `;
        tabla.appendChild(fila);

        suma += nota.calificacion;
        contador++;
    });

    // Calcular promedio
    const promedio = contador > 0 ? Math.round(suma / contador) : 0;
    const estadoFinal = obtenerEstado(promedio);

    // Fila final de PROMEDIO
    const filaPromedio = document.createElement("tr");
    filaPromedio.innerHTML = `
        <td><strong>PROMEDIO</strong></td>
        <td><strong>${promedio}</strong></td>
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
// NOTAS DE CALIFICACIÓN EN PDF PARA CADA ESTUDIANTE
// ===============================
function verNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    const ci = estudiante.ci;
    const filePath = `notas/${ci}.pdf`;

    document.getElementById("visorPDF").src = filePath;
}

function descargarNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    const ci = estudiante.ci;
    const filePath = `notas/${ci}.pdf`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${ci}.pdf`;
    link.click();
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