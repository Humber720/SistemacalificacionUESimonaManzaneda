// =====================================================
// GOOGLE APPS SCRIPT - PRIMARIA
// =====================================================

const URL_CALIFICACIONES_PRIMARIA =
    "https://script.google.com/macros/s/AKfycbzzDk-Pl6tIeUmQzjgpGBSEUtnDVe5aSSkbWiSFUYh6Q3dGwN3aPC8bvwz3J0NDbWeFJg/exec";


// =====================================================
// CARGAR DATOS DEL ESTUDIANTE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const estudianteGuardado =
        localStorage.getItem("estudiante");

    if (!estudianteGuardado) {

        window.location.href = "lateral.html";

        return;
    }


    let data;

    try {

        data =
            JSON.parse(estudianteGuardado);

    } catch (error) {

        console.error(
            "Error leyendo estudiante:",
            error
        );

        window.location.href = "lateral.html";

        return;
    }


    // =================================================
    // MOSTRAR NOMBRE
    // =================================================

    const nombreElemento =
        document.getElementById(
            "student-name-main"
        );


    const nombreCompleto =
        (
            data.nombre || ""
        ) +
        " " +
        (
            data.apellido || ""
        );


    if (nombreElemento) {

        nombreElemento.textContent =
            nombreCompleto.trim();

    }


    // =================================================
    // MOSTRAR CURSO
    // =================================================

    const cursoElemento =
        document.getElementById(
            "course-name-main"
        );


    if (cursoElemento) {

        cursoElemento.textContent =
            data.curso || "";

    }


    // =================================================
    // CARGAR NOTAS
    // =================================================

    cargarNotas(data);

});


// =====================================================
// CARGAR NOTAS DESDE GOOGLE SHEETS
// =====================================================

async function cargarNotas(data) {

    const tabla =
        document.getElementById(
            "grades-table"
        );


    if (!tabla) {

        console.error(
            "No existe grades-table"
        );

        return;
    }


    tabla.innerHTML = `
        <tr>
            <td colspan="6">
                Cargando calificaciones...
            </td>
        </tr>
    `;


    // =================================================
    // VERIFICAR CI
    // =================================================

    const ci =
        String(
            data.ci || ""
        ).trim();


    if (!ci) {

        tabla.innerHTML = `
            <tr>
                <td colspan="6">
                    No se encontró el CI del estudiante.
                </td>
            </tr>
        `;

        return;
    }


    console.log(
        "CI enviado a Apps Script:",
        ci
    );


    try {

        // =============================================
        // CONSULTAR GOOGLE APPS SCRIPT
        // =============================================

        const url =
            URL_CALIFICACIONES_PRIMARIA +
            "?ci=" +
            encodeURIComponent(ci);


        console.log(
            "Consultando:",
            url
        );


        const respuesta =
            await fetch(url);


        // =============================================
        // VERIFICAR RESPUESTA
        // =============================================

        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP: " +
                respuesta.status
            );

        }


        const resultado =
            await respuesta.json();


        console.log(
            "Respuesta Apps Script:",
            resultado
        );


        // =============================================
        // ERROR DEL SERVIDOR
        // =============================================

        if (resultado.error) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6">
                        ${
                            resultado.mensaje ||
                            "Error del servidor."
                        }
                    </td>
                </tr>
            `;

            return;
        }


        // =============================================
        // ESTUDIANTE NO EXISTE
        // =============================================

        if (!resultado.existe) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6">
                        No se encontró el estudiante.
                    </td>
                </tr>
            `;

            return;
        }


        // =============================================
        // MOSTRAR CALIFICACIONES
        // =============================================

        mostrarCalificaciones(
            resultado.calificaciones || []
        );


    } catch (error) {

        console.error(
            "Error cargando calificaciones:",
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="6">
                    No se pudieron cargar las calificaciones.
                </td>
            </tr>
        `;

    }

}


// =====================================================
// MOSTRAR CALIFICACIONES
// =====================================================

function mostrarCalificaciones(
    calificaciones
) {

    const tabla =
        document.getElementById(
            "grades-table"
        );


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    let suma = 0;

    let contador = 0;


    // =================================================
    // RECORRER TRIMESTRES
    // =================================================

    calificaciones.forEach(
        function (nota) {

            let puntaje = "";

            let autoevaluacion = "";

            let calificacion = "";


            // =========================================
            // PUNTAJE
            // =========================================

            if (
                nota.puntaje !== "" &&
                nota.puntaje !== null &&
                nota.puntaje !== undefined
            ) {

                puntaje =
                    Number(
                        nota.puntaje
                    );

            }


            // =========================================
            // AUTOEVALUACIÓN
            // =========================================

            if (
                nota.autoevaluacion !== "" &&
                nota.autoevaluacion !== null &&
                nota.autoevaluacion !== undefined
            ) {

                autoevaluacion =
                    Number(
                        nota.autoevaluacion
                    );

            }


            // =========================================
            // CALIFICACIÓN
            // =========================================

            if (
                puntaje !== "" &&
                autoevaluacion !== ""
            ) {

                calificacion =
                    puntaje +
                    autoevaluacion;

            }

            else if (
                puntaje !== ""
            ) {

                calificacion =
                    puntaje;

            }


            // =========================================
            // ESTADO
            // =========================================

            const estado =
                obtenerEstado(
                    calificacion
                );


            const clase =
                obtenerClaseEstado(
                    calificacion
                );


            // =========================================
            // CREAR FILA
            // =========================================

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>
                    ${nota.trimestre || ""}
                </td>

                <td>
                    ${
                        puntaje !== ""
                            ? puntaje
                            : ""
                    }
                </td>

                <td>
                    ${
                        autoevaluacion !== ""
                            ? autoevaluacion
                            : ""
                    }
                </td>

                <td class="${clase}">
                    ${
                        calificacion !== ""
                            ? calificacion
                            : ""
                    }
                </td>

                <td class="${clase}">
                    ${estado}
                </td>

                <td>
                    ${
                        nota.observacion || ""
                    }
                </td>

            `;


            tabla.appendChild(
                fila
            );


            // =========================================
            // PROMEDIO
            // =========================================

            if (
                calificacion !== "" &&
                !isNaN(calificacion)
            ) {

                suma +=
                    Number(
                        calificacion
                    );

                contador++;

            }

        }
    );


    // =================================================
    // CALCULAR PROMEDIO
    // =================================================

    let promedio = "";

    let estadoFinal = "";


    if (contador > 0) {

        promedio =
            Math.round(
                suma / contador
            );


        estadoFinal =
            obtenerEstado(
                promedio
            );

    }


    // =================================================
    // FILA PROMEDIO
    // =================================================

    const filaPromedio =
        document.createElement("tr");


    filaPromedio.innerHTML = `

        <td>
            <strong>PROMEDIO</strong>
        </td>

        <td>-</td>

        <td>-</td>

        <td class="${obtenerClaseEstado(promedio)}">

            <strong>
                ${
                    promedio !== ""
                        ? promedio
                        : ""
                }
            </strong>

        </td>

        <td class="${obtenerClaseEstado(promedio)}">

            <strong>
                ${
                    estadoFinal || ""
                }
            </strong>

        </td>

        <td>-</td>

    `;


    tabla.appendChild(
        filaPromedio
    );

}


// =====================================================
// ESTADO
// =====================================================

function obtenerEstado(
    calificacion
) {

    if (
        calificacion === "" ||
        calificacion === null ||
        calificacion === undefined ||
        isNaN(calificacion)
    ) {

        return "";

    }


    if (
        Number(calificacion) >= 51
    ) {

        return "APROBADO(A)";

    }


    return "REPROBADO(A)";

}


// =====================================================
// CLASE CSS
// =====================================================

function obtenerClaseEstado(
    calificacion
) {

    if (
        calificacion === "" ||
        calificacion === null ||
        calificacion === undefined ||
        isNaN(calificacion)
    ) {

        return "";

    }


    if (
        Number(calificacion) >= 51
    ) {

        return "aprobado";

    }


    return "reprobado";

}


// =====================================================
// PDF
// =====================================================

function verNota() {

    const estudiante =
        JSON.parse(
            localStorage.getItem(
                "estudiante"
            )
        );


    if (!estudiante) {

        alert(
            "No hay sesión activa"
        );

        return;
    }


    const visor =
        document.getElementById(
            "visorPDF"
        );


    if (visor) {

        visor.src =
            "notas/" +
            estudiante.ci +
            ".pdf";

    }

}


function descargarNota() {

    const estudiante =
        JSON.parse(
            localStorage.getItem(
                "estudiante"
            )
        );


    if (!estudiante) {

        alert(
            "No hay sesión activa"
        );

        return;
    }


    const link =
        document.createElement(
            "a"
        );


    link.href =
        "notas/" +
        estudiante.ci +
        ".pdf";


    link.download =
        estudiante.ci +
        ".pdf";


    link.click();

}


// =====================================================
// MENÚ
// =====================================================

function toggleMenu() {

    const paginaActual =
        window.location.pathname;


    if (
        paginaActual.includes(
            "lateral.html"
        )
    ) {

        window.history.back();

    }

    else {

        window.location.href =
            "lateral.html";

    }

}


// =====================================================
// CERRAR SESIÓN
// =====================================================

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
