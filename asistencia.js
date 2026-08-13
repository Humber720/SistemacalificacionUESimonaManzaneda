// ======================================================
// CONFIGURACIÓN
// ======================================================

// URL del nuevo Google Apps Script de ASISTENCIA PRIMARIA
const URL_ASISTENCIA =
    "https://script.google.com/macros/s/AKfycbzxjIqJNszIyyrDGvM4spnYsmRTUX-PPLm95ZhgqTQYOZc15h1UjXHeZq6uOuiwm21ZYw/exec";


// ======================================================
// CARGAR DATOS DEL ESTUDIANTE Y VALIDAR SESIÓN
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const datosGuardados =
        localStorage.getItem("estudiante");

    if (!datosGuardados) {

        window.location.href = "lateral.html";

        return;
    }

    const data =
        JSON.parse(datosGuardados);


    // ==================================================
    // NOMBRE COMPLETO
    // ==================================================

    const nombreCompleto =
        `${data.nombre || ""} ${data.apellido || ""}`.trim();


    // ==================================================
    // MOSTRAR PERFIL PRINCIPAL
    // ==================================================

    const studentNameMain =
        document.getElementById("student-name-main");

    if (studentNameMain) {

        studentNameMain.textContent =
            nombreCompleto;

    }


    const courseNameMain =
        document.getElementById("course-name-main");

    if (courseNameMain) {

        courseNameMain.textContent =
            data.curso || "";

    }


    // ==================================================
    // MOSTRAR DATOS EN DROPDOWN
    // ==================================================

    const nombreCompletoDropdown =
        document.getElementById("nombreCompleto");

    if (nombreCompletoDropdown) {

        nombreCompletoDropdown.textContent =
            nombreCompleto;

    }


    const courseNameDropdown =
        document.getElementById("course-name");

    if (courseNameDropdown) {

        courseNameDropdown.textContent =
            data.curso || "";

    }


    // ==================================================
    // CARGAR ASISTENCIA
    // ==================================================

    cargarAsistencia(data);

});


// ======================================================
// CARGAR ASISTENCIA DESDE GOOGLE SHEETS
// ======================================================

async function cargarAsistencia(data) {

    const tabla =
        document.getElementById("grades-table");

    if (!tabla) return;


    // ==================================================
    // VERIFICAR CI
    // ==================================================

    const ci =
        String(data.ci || "").trim();


    if (!ci) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5">
                    No se encontró el CI del estudiante.
                </td>
            </tr>
        `;

        return;
    }


    // ==================================================
    // MENSAJE DE CARGA
    // ==================================================

    tabla.innerHTML = `
        <tr>
            <td colspan="5">
                Cargando asistencia...
            </td>
        </tr>
    `;


    try {

        // ==================================================
        // CREAR URL DE CONSULTA
        // ==================================================

        const url =
            URL_ASISTENCIA +
            "?ci=" +
            encodeURIComponent(ci);


        console.log(
            "Consultando asistencia:",
            url
        );


        // ==================================================
        // CONSULTAR APPS SCRIPT
        // ==================================================

        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP: " +
                respuesta.status
            );

        }


        // ==================================================
        // CONVERTIR RESPUESTA A JSON
        // ==================================================

        const resultado =
            await respuesta.json();


        console.log(
            "Respuesta de asistencia:",
            resultado
        );


        // ==================================================
        // VERIFICAR ERROR
        // ==================================================

        if (resultado.error) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        ${resultado.mensaje || "Error al cargar asistencia."}
                    </td>
                </tr>
            `;

            return;
        }


        // ==================================================
        // VERIFICAR SI EXISTE EL ESTUDIANTE
        // ==================================================

        if (!resultado.existe) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        No se encontró el estudiante.
                    </td>
                </tr>
            `;

            return;
        }


        // ==================================================
        // OBTENER ASISTENCIA
        // ==================================================

        const asistencia =
            resultado.asistencia || [];


        if (asistencia.length === 0) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        No existen registros de asistencia.
                    </td>
                </tr>
            `;

            return;
        }


        // ==================================================
        // LIMPIAR TABLA
        // ==================================================

        tabla.innerHTML = "";


        // ==================================================
        // VARIABLES PARA TOTALES
        // ==================================================

        let totalFaltas = 0;
        let totalAtrasos = 0;
        let totalPermisos = 0;
        let totalAsistencias = 0;


        // ==================================================
        // MOSTRAR LOS 3 TRIMESTRES
        // ==================================================

        asistencia.forEach(item => {


            const faltas =
                parseInt(item.faltas) || 0;


            const atrasos =
                parseInt(item.atrasos) || 0;


            const permisos =
                parseInt(item.permisos) || 0;


            const asistencias =
                parseInt(item.asistencias) || 0;


            // ==============================================
            // SUMAR TOTALES
            // ==============================================

            totalFaltas += faltas;

            totalAtrasos += atrasos;

            totalPermisos += permisos;

            totalAsistencias += asistencias;


            // ==============================================
            // CREAR FILA
            // ==============================================

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>
                    ${item.trimestre || ""}
                </td>

                <td>
                    ${item.faltas || ""}
                </td>

                <td>
                    ${item.atrasos || ""}
                </td>

                <td>
                    ${item.permisos || ""}
                </td>

                <td>
                    ${item.asistencias || ""}
                </td>

            `;


            tabla.appendChild(fila);

        });


        // ==================================================
        // FUNCIÓN PARA MOSTRAR "-"
        // ==================================================

        const mostrar =
            (valor) => valor === 0 ? "-" : valor;


        // ==================================================
        // FILA TOTAL
        // ==================================================

        const filaTotal =
            document.createElement("tr");


        filaTotal.style.fontWeight =
            "bold";


        filaTotal.style.backgroundColor =
            "#e8f0fe";


        filaTotal.innerHTML = `

            <td>
                TOTAL / ANUAL
            </td>

            <td>
                ${mostrar(totalFaltas)}
            </td>

            <td>
                ${mostrar(totalAtrasos)}
            </td>

            <td>
                ${mostrar(totalPermisos)}
            </td>

            <td>
                ${mostrar(totalAsistencias)}
            </td>

        `;


        tabla.appendChild(filaTotal);


    } catch (error) {

        // ==================================================
        // ERROR DE CONEXIÓN
        // ==================================================

        console.error(
            "Error al cargar asistencia:",
            error
        );


        tabla.innerHTML = `

            <tr>

                <td colspan="5">

                    No se pudo conectar con
                    Google Sheets.

                </td>

            </tr>

        `;

    }

}


// ======================================================
// MENÚ LATERAL
// ======================================================

function toggleMenu() {

    const paginaActual =
        window.location.pathname;


    if (
        paginaActual.includes("lateral.html")
    ) {

        window.history.back();

    } else {

        window.location.href =
            "lateral.html";

    }

}


// ======================================================
// CERRAR SESIÓN
// ======================================================

function cerrarSesion() {

    localStorage.removeItem(
        "estudiante"
    );


    sessionStorage.setItem(
        "logout",
        "true"
    );


    window.location.replace(
        "index.html"
    );

}
