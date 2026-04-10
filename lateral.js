// ===============================
// VALIDAR SESIÓN (SEGURIDAD)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    // NOMBRE
    const nombre = document.getElementById("nombreCompleto");
    if (nombre) {
        nombre.textContent = data.nombreCompleto || data.nombre;
    }

    // CURSO
    const curso = document.getElementById("course-name");
    if (curso) {
        curso.textContent = data.curso || "No asignado";
    }
});

// ==============================
// MOSTRAR CONTENIDO (PDF)
// ===============================
function mostrarContenido(curso, e) {

    const titulo = document.getElementById('tituloCurso');
    const contenido = document.getElementById('infoCurso');

    // BOTÓN ACTIVO
    document.querySelectorAll(".sidebar button").forEach(btn => {
        btn.classList.remove("activo");
    });

    if (e) e.target.classList.add("activo");

    // RUTA PDF (IMPORTANTE)
    const archivoPDF = `contenido/${curso}.pdf`;

    // TITULO
    titulo.textContent = curso;

    // CONTENIDO
    contenido.innerHTML = `
        <p>📚 Visualizando: <strong>${curso}</strong></p>

        <iframe src="${archivoPDF}" width="100%" height="600px" style="border:none;"></iframe>

        <p style="margin-top:10px;">
            <a href="${archivoPDF}" target="_blank">🔗 Abrir en nueva pestaña</a>
        </p>
    `;
}

// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");
    window.location.href = "index.html";
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
// LIMPIAR HISTORIAL EN LATERAL
// ===============================
history.replaceState(null, null, location.href);
  
