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

    const data = JSON.parse(localStorage.getItem("estudiante"));
    const titulo = document.getElementById('tituloCurso');
    const contenido = document.getElementById('infoCurso');

    // BOTÓN ACTIVO
    document.querySelectorAll(".sidebar button").forEach(btn => {
        btn.classList.remove("activo");
    });

    if (e) e.target.classList.add("activo");

    // ===============================
    // 🔒 VALIDAR ACCESO
    // ===============================

    const mapaCursos = {
        "1ro de Primaria": "1roPrimaria",
        "2do de Primaria": "2doPrimaria",
        "3ro de Primaria": "3roPrimaria",
        "4to de Primaria": "4toPrimaria",
        "5to de Primaria": "5toPrimaria",
        "6to de Primaria": "6toPrimaria"
    };

    const cursoEstudiante = mapaCursos[data?.curso];

    // 👇 contenido libre
    const contenidoLibre = ["himnos", "partituras"];

    if (curso !== cursoEstudiante && !contenidoLibre.includes(curso)) {

        titulo.textContent = "Acceso restringido";
        contenido.innerHTML = `
            <div style="padding:20px; text-align:center; color:#b30000;">
                <h3>🚫 No tienes acceso a este curso</h3>
                <p>Solo puedes ingresar a tu curso asignado:</p>
                <strong>${data.curso}</strong>
            </div>
        `;
        return;
    }

    // ===============================
    // ✅ SI TIENE ACCESO
    // ===============================

    const archivoPDF = `contenido/${curso}.pdf`;

    titulo.textContent = curso;

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

    // 👇 marcar que cerró sesión
    sessionStorage.setItem("logout", "true");
   // 👇 IMPORTANTE: replace (no permite volver atrás)
    window.location.replace("index.html");
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
  
