// 👇 VARIABLE GLOBAL (AQUÍ)
let navegacionInterna = false;
// ===============================
// VERIFICAR SESIÓN AL CARGAR PÁGINA (Previene volver atrás)
// ===============================
(function() {
    function verificarSesion() {
        const estudiante = localStorage.getItem("estudiante");
        const currentPage = window.location.pathname.split("/").pop();

        // Si no hay sesión y no estamos en index.html, redirige al login
        if (!estudiante && currentPage !== "index.html") {
            window.location.href = "index.html";
        }
    }

    // Ejecutar inmediatamente al cargar
    verificarSesion();

    // Ejecutar también cuando la página se vuelve visible (botón atrás en móviles)
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") {
            verificarSesion();
        }
    });
})();

// ===============================
// BASE DE DATOS DE ESTUDIANTES
// ===============================
const estudiantes = {
    // 1ro de Primaria
    "16103032": { nombre: "ISAMAR ALEYDA", apellido: "HUANCA CANTUTA", curso: "1ro de Primaria" },
    "17855221": { nombre: "HILDA NEYDA", apellido: "AJAHUANA CONDORI", curso: "1ro de Primaria" },
    "16235752": { nombre: "CIELO", apellido: "QUISPE CONDORI", curso: "1ro de Primaria" },
    "16450562": { nombre: "IGOR ALEJANDRO", apellido: "CRUZ FALCON", curso: "1ro de Primaria" },
    "16415828": { nombre: "JASMINE", apellido: "USNAYO MAMANI", curso: "1ro de Primaria" },
    "17663300": { nombre: "YULER EZLID", apellido: "RAMALLO MAYO", curso: "1ro de Primaria" },
    "16225325": { nombre: "DAYANA", apellido: "CONDORI MONTAÑO", curso: "1ro de Primaria" },
    "16882382": { nombre: "LYCEL ABRIL", apellido: "TORREZ PAUCARA", curso: "1ro de Primaria" },
    "17612197": { nombre: "EMELETH", apellido: "ERGUETA RODRIGUEZ", curso: "1ro de Primaria" },
    "16439814": { nombre: "MATIAS ANTONI", apellido: "QUISPE VENTURA", curso: "1ro de Primaria" },

    // 2do de Primaria
    "15505305": { nombre: "YAMILE", apellido: "LIMACHI CANTUTA", curso: "2do de Primaria" },
    "17614196": { nombre: "HEYDAN KALEB", apellido: "MENA CHOQUE", curso: "2do de Primaria" },
    "15325697": { nombre: "MARISOL", apellido: "CASTILLO FERNANDEZ", curso: "2do de Primaria" },
    "15735347": { nombre: "DANIEL LUIS", apellido: "FERNANDEZ FERNANDEZ", curso: "2do de Primaria" },
    "16372545": { nombre: "CARMEN VIRGINIA", apellido: "QUISPE HUANCA", curso: "2do de Primaria" },
    "15538197": { nombre: "MATIAS CALEB", apellido: "MADANI HUISA", curso: "2do de Primaria" },
    "15574544": { nombre: "YESSENIA SARAHY", apellido: "RODRIGUEZ MOLLO", curso: "2do de Primaria" },
    "16217781": { nombre: "CAMILA", apellido: "HUANCA PEREZ", curso: "2do de Primaria" },

    // 3ro de Primaria
    "15383976": { nombre: "FRANCO GAEL", apellido: "MADANI CANTUTA", curso: "3ro de Primaria" },
    "15098838": { nombre: "SEBASTIAN ZABDIEL", apellido: "CASTILLO CARLO", curso: "3ro de Primaria" },
    "15200288": { nombre: "DIEGO", apellido: "TOLA CHOQUE", curso: "3ro de Primaria" },
    "16916466": { nombre: "EDYLSON", apellido: "MARCOCHAPI CONDORI", curso: "3ro de Primaria" },
    "16782741": { nombre: "DANITS JHANE", apellido: "QUISPE CONDORI", curso: "3ro de Primaria" },
    "16789062": { nombre: "SHIOMARA", apellido: "AJAHUANA CONDORI", curso: "3ro de Primaria" },
    "15099063": { nombre: "IKER ASAD", apellido: "AMARU ERGUETA", curso: "3ro de Primaria" },
    "16787132": { nombre: "JUAN MATEO", apellido: "LUNA ESPINOZA", curso: "3ro de Primaria" },
    "15310814": { nombre: "LEILA SCARLETT", apellido: "SEPULVEDA GUTIERREZ", curso: "3ro de Primaria" },
    "17389914": { nombre: "NATALY", apellido: "VALLEJOS LOPES", curso: "3ro de Primaria" },
    "17310778": { nombre: "LUZ EVELIN", apellido: "QUISPE MAMANI", curso: "3ro de Primaria" },
    "17893355": { nombre: "CANDY", apellido: "YUPANQUI MAMANI", curso: "3ro de Primaria" },
    "15041299": { nombre: "YARELY LUZ", apellido: "MAMANI MIRANDA", curso: "3ro de Primaria" },
    "15171572": { nombre: "ASTRID ZOE", apellido: "ALANOCA QUISPE", curso: "3ro de Primaria" },
    "16786439": { nombre: "BIANCA MAYTE", apellido: "MENA QUISPE", curso: "3ro de Primaria" },
    "15275310": { nombre: "EMILY KEYLY", apellido: "QUISPE TOLA", curso: "3ro de Primaria" },
    "15530203": { nombre: "DIEGO ALEXANDER", apellido: "QUISPE TOLA", curso: "3ro de Primaria" },

    // 4to de Primaria
    "17259685": { nombre: "THAIS DANIELA", apellido: "ARHUIRI", curso: "4to de Primaria" },
    "16297349": { nombre: "SHARELA", apellido: "QUISPE ADUVIRI", curso: "4to de Primaria" },
    "16653592": { nombre: "ABNER ZENON", apellido: "CASTILLO CANAZA", curso: "4to de Primaria" },
    "16689391": { nombre: "NADIA WARA", apellido: "FLORES CASTILLO", curso: "4to de Primaria" },
    "17414259": { nombre: "DANNA AVRIL", apellido: "CHOQUE FERNANDEZ", curso: "4to de Primaria" },
    "17118554": { nombre: "SAMI VALERIA", apellido: "CHOQUE FLORES", curso: "4to de Primaria" },
    "16959941": { nombre: "EUSEBIA", apellido: "QUISPE HUANCA", curso: "4to de Primaria" },
    "15790869": { nombre: "HANS ANTHONY", apellido: "FALCON ILLANES", curso: "4to de Primaria" },
    "17310758": { nombre: "LUZ CAMILA", apellido: "QUISPE MAMANI", curso: "4to de Primaria" },
    "15027286": { nombre: "RUZENA ESDENKA", apellido: "RAMIREZ MAMANI", curso: "4to de Primaria" },
    "17272587": { nombre: "DANY JAIL", apellido: "MAMANI MOLLINEDO", curso: "4to de Primaria" },
    "15680683": { nombre: "YUAN EDUARDO", apellido: "TORREZ PAUCARA", curso: "4to de Primaria" },
    "15960112": { nombre: "SHEYLA LUCIANA", apellido: "VILA QUISPE", curso: "4to de Primaria" },
    "16911786": { nombre: "ISMAEL", apellido: "FLORES VENEGAS", curso: "4to de Primaria" },

    // 5to de Primaria
    "16176647": { nombre: "GUSTAVO ANTHONY", apellido: "NINA", curso: "5to de Primaria" },
    "14427120": { nombre: "ARIANA ALESSANDRA", apellido: "CALLISAYA ZENTENO", curso: "5to de Primaria" },
    "15605576": { nombre: "ANDERSON VLADIMIR", apellido: "LIMACHI CANTUTA", curso: "5to de Primaria" },
    "17265383": { nombre: "SIMON SANTIAGO", apellido: "QUISPE CONDORI", curso: "5to de Primaria" },
    "17118549": { nombre: "SAHARA SHAYA", apellido: "CHOQUE FLORES", curso: "5to de Primaria" },
    "16160305": { nombre: "YASIT MILAN", apellido: "CHOQUE GUTIERREZ", curso: "5to de Primaria" },
    "14480516": { nombre: "GAEL OMAR", apellido: "PEREZ LEON", curso: "5to de Primaria" },
    "17893281": { nombre: "URIEL", apellido: "YUPANQUI MAMANI", curso: "5to de Primaria" },
    "15141072": { nombre: "DAMIAN NOEL", apellido: "CONDORI MAYTA", curso: "5to de Primaria" },
    "16324027": { nombre: "LILIANA ITCEL", apellido: "ALI MAYTA", curso: "5to de Primaria" },
    "17173764": { nombre: "BEYMAR ANGEL", apellido: "LUNA PEÑALOZA", curso: "5to de Primaria" },
    "16217837": { nombre: "DANIELA", apellido: "HUANCA PEREZ", curso: "5to de Primaria" },
    "14802040": { nombre: "CORALAIN AYDEE", apellido: "FUNES PEREZ", curso: "5to de Primaria" },
    "16700337": { nombre: "JACIEL", apellido: "ALANOCA QUISPE", curso: "5to de Primaria" },
    "15204952": { nombre: "NEYMAR", apellido: "MAMANI QUISPE", curso: "5to de Primaria" },
 
    // 6to de Primaria
    "16297336": { nombre: "SHARAI", apellido: "QUISPE ADUVIRI", curso: "6to de Primaria" },
    "14479026": { nombre: "ALISON MAYA", apellido: "FLORES ALVAREZ", curso: "6to de Primaria" },
    "15645677": { nombre: "YADIEL", apellido: "HUANCA CANTUTA", curso: "6to de Primaria" },
    "16789053": { nombre: "JHOSTIN", apellido: "AJAHUANA CONDORI", curso: "6to de Primaria" },
    "17451940": { nombre: "MAIRYN ZULAMI", apellido: "AMARU ERGUETA", curso: "6to de Primaria" },
    "17414278": { nombre: "ANYHELO MATEO", apellido: "CHOQUE FERNANDEZ", curso: "6to de Primaria" },
    "16789847": { nombre: "MARY LUZ", apellido: "FERNANDEZ FERNANDEZ", curso: "6to de Primaria" },
    "16883745": { nombre: "MAXIMILIANO", apellido: "QUISPE HUANCA", curso: "6to de Primaria" },
    "14047775": { nombre: "ALEJANDRO", apellido: "USNAYO MAMANI", curso: "6to de Primaria" },
    "14304209": { nombre: "ISABELLA ANABEL", apellido: "SILVA ORELLANA", curso: "6to de Primaria" },
    "14801125": { nombre: "ANDREI GEMIO", apellido: "CASTILLO PARICAHUA", curso: "6to de Primaria" },
    "15333051": { nombre: "HAROL JHONNATAN", apellido: "ERGUETA PAUCARA", curso: "6to de Primaria" },
    "15960084": { nombre: "SERGIO ANDREW", apellido: "VILA QUISPE", curso: "6to de Primaria" },
    "16220469": { nombre: "NOEMI YESICA", apellido: "FERNANDEZ QUISPE", curso: "6to de Primaria" },
    "16166926": { nombre: "THIAGO ZHAIR", apellido: "QUISPE QUISPE", curso: "6to de Primaria" },
    "17184594": { nombre: "CAMILA SHELLY", apellido: "RIOS TERRAZAS", curso: "6to de Primaria" },
    "16960822": { nombre: "MAGALI", apellido: "FLORES VENEGAS", curso: "6to de Primaria" },

};

// ===============================
// INICIALIZAR EVENTOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // LOGIN FORM
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            login();
        });
    }

    // AUTOLOGIN (si ya inició sesión y está en index.html)
    const data = localStorage.getItem("estudiante");
    if (data && window.location.pathname.includes("index.html")) {
        window.location.href = "menu.html";
    }

    // MOSTRAR DATOS SI HAY SESIÓN
    if (data) {
        mostrarPerfilHeader();
    }

    // DROPDOWN PERFIL
    const toggle = document.getElementById("dropdownToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.getElementById("dropdownMenu").classList.toggle("active");
        });
    }

});

// ===============================
// LOGIN
// ===============================
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    limpiarMensaje();

    if (!username || !password) return mostrarMensaje("Complete todos los campos", "red");
    if (!/^[0-9]+$/.test(username)) return mostrarMensaje("Solo números en el CI", "red");
    if (username !== password) return mostrarMensaje("El usuario y contraseña deben ser iguales", "red");

    const estudiante = estudiantes[username];
    if (!estudiante) return mostrarMensaje("CI no registrado", "red");

    // GUARDAR DATOS EN LOCALSTORAGE
    const datos = {
        ci: username,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        nombreCompleto: estudiante.nombre + " " + estudiante.apellido,
        curso: estudiante.curso
    };
    localStorage.setItem("estudiante", JSON.stringify(datos));

    mostrarMensaje("Ingreso correcto...", "green");

    setTimeout(() => window.location.href = "menu.html", 800);
}

// ===============================
// MOSTRAR PERFIL EN HEADER Y DROPDOWN
// ===============================
function mostrarPerfilHeader() {
    const data = JSON.parse(localStorage.getItem("estudiante"));
    if (!data) {
        if (!window.location.pathname.includes("index.html")) window.location.href = "index.html";
        return;
    }

    const nombreCompleto = data.nombre + " " + data.apellido;

    // PERFIL HEADER
    const studentName = document.getElementById("student-name");
    if (studentName) studentName.textContent = data.nombre;

    const nombreSpan = document.getElementById("nombreCompleto");
    if (nombreSpan) nombreSpan.textContent = nombreCompleto;

    const cursoHeader = document.getElementById("course-name");
    if (cursoHeader) cursoHeader.textContent = data.curso;

    // BIENVENIDA O CONTENIDO CENTRAL
    const nombrePrincipal = document.getElementById("nombrePrincipal");
    if (nombrePrincipal) nombrePrincipal.textContent = "Estudiante: " + nombreCompleto;

    const cursoPrincipal = document.getElementById("cursoPrincipal");
    if (cursoPrincipal) cursoPrincipal.textContent = data.curso;

    // EN CALIFICACION O OTRAS PÁGINAS CON OTROS ELEMENTOS
    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;
}

// ===============================
// MENSAJES
// ===============================
function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
    }
}
function limpiarMensaje() {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.textContent = "";
}

// ===============================
// LIMPIAR INPUTS
// ===============================
function limpiarInputs() {
    const password = document.getElementById("password");
    if (password) password.value = "";
}

// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");
    window.location.href = "index.html";
}

// ===============================
// MOSTRAR / OCULTAR CONTRASEÑA
// ===============================
function togglePasswordVisibility() {
    const input = document.getElementById("password");
    const eyeOpen = document.getElementById("eyeOpen");
    const eyeClose = document.getElementById("eyeClose");

    if (input.type === "password") {
        input.type = "text";
        eyeOpen.style.display = "none";
        eyeClose.style.display = "inline";
    } else {
        input.type = "password";
        eyeOpen.style.display = "inline";
        eyeClose.style.display = "none";
    }
}

// ===============================
// SCROLL MENÚ
// ===============================
function scrollMenu(valor) {
    const menu = document.getElementById("menuScroll");
    if (menu) menu.scrollLeft += valor;
}

// ===============================
// CARRUSEL PUBLICIDAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".publicidad img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;
    let interval = setInterval(showNext, 4000);

    function showSlide(n) {
        slides.forEach((img, i) => {
            img.classList.remove("active");
            if (i === n) img.classList.add("active");
        });
    }

    function showNext() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function showPrev() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    nextBtn.addEventListener("click", () => {
        showNext();
        resetTimer();
    });

    prevBtn.addEventListener("click", () => {
        showPrev();
        resetTimer();
    });

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(showNext, 4000);
    }
});

// ===============================
// RESALTAR PÁGINA ACTIVA EN MENU
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#menuScroll a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("activo");
        } else {
            link.classList.remove("activo");
        }
    });
});
// ===============================
// MENÚ LATERAL (MÓVIL)
// ===============================
function toggleMenu() {

    const paginaActual = window.location.pathname;

    if (paginaActual.includes("lateral.html")) {
        // 👇 MARCAR antes de retroceder
        navegacionInterna = true;

        window.history.back();
    } else {
        window.location.href = "lateral.html";
    }
}
//PARA SALIR CON TECLADO
// ===============================
// BLOQUEAR BOTÓN ATRÁS (MEJORADO)
// ===============================
(function () {

    const data = localStorage.getItem("estudiante");
    const currentPage = window.location.pathname.split("/").pop();

    if (!data || currentPage === "index.html") return;

    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {

        // 👇 SI ES NAVEGACIÓN INTERNA → NO HACER NADA
        if (navegacionInterna) {
            navegacionInterna = false;
            return;
        }

        // 👇 SOLO AQUÍ bloquea
        const salir = confirm("¿Estás seguro que deseas salir del sistema?");

        if (salir) {
            localStorage.removeItem("estudiante");
            window.location.href = "index.html";
        } else {
            history.pushState(null, null, location.href);
        }
    });

})();
