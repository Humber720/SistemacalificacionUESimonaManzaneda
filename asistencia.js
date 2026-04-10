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
    //1ro de Primaria
    "16103032": { // CANTUTA HUANCA ISAMAR ALEYDA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17855221": { // CONDORI AJAHUANA HILDA NEYDA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "3", atrasos: "", licencias: "", presentes: "7" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16235752": { // CONDORI QUISPE CIELO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16450562": { // FALCON CRUZ IGOR ALEJANDRO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "2", atrasos: "", licencias: "", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16415828": { // MAMANI USNAYO JASMINE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "2", atrasos: "", licencias: "2", presentes: "6" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17663300": { // MAYO RAMALLO YULER EZLID
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16225325": { // MONTAÑO CONDORI DAYANA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16882382": { // PAUCARA TORREZ LYCEL ABRIL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17612197": { // RODRIGUEZ ERGUETA EMELETH
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16439814": { // VENTURA QUISPE MATIAS ANTONI
        asistencia: [
            { trimestre: "1er Trim.", faltas: "3", atrasos: "", licencias: "", presentes: "7" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },

    //2do de Primaria
    "15505305": { // CANTUTA LIMACHI YAMILE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17614196": { // CHOQUE MENA HEYDAN KALEB
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15325697": { // FERNANDEZ CASTILLO MARISOL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15735347": { // FERNANDEZ FERNANDEZ DANIEL LUIS
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16372545": { // HUANCA QUISPE CARMEN VIRGINIA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15538197": { // HUISA MADANI MATIAS CALEB
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15574544": { // MOLLO RODRIGUEZ YESSENIA SARAHY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16217781": { // PEREZ HUANCA CAMILA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    //3ro de Primaria
    "15383976": { // CANTUTA MADANI FRANCO GAEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15098838": { // CARLO CASTILLO SEBASTIAN ZABDIEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15200288": { // CHOQUE TOLA DIEGO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16916466": { // CONDORI MARCOCHAPI EDYLSON
        asistencia: [
            { trimestre: "1er Trim.", faltas: "4", atrasos: "", licencias: "", presentes: "5" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16782741": { // CONDORI QUISPE DANITS JHANE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16789062": { // CONDORI AJAHUANA SHIOMARA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "2", atrasos: "", licencias: "", presentes: "7" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15099063": { // ERGUETA AMARU IKER ASAD
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16787132": { // ESPINOZA LUNA JUAN MATEO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15310814": { // GUTIERREZ SEPULVEDA LEILA SCARLETT
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17389914": { // LOPES VALLEJOS NATALY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17310778": { // MAMANI QUISPE LUZ EVELIN
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17893355": { // MAMANI YUPANQUI CANDY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15041299": { // MIRANDA MAMANI YARELY LUZ
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15171572": { // QUISPE ALANOCA ASTRID ZOE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "7", atrasos: "", licencias: "", presentes: "2" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16786439": { // QUISPE MENA BIANCA MAYTE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15275310": { // TOLA QUISPE EMILY KEYLY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15530203": { // TOLA QUISPE DIEGO ALEXANDER
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },

    //4to de Primaria
    "17259685": { // ARHUIRI THAIS DANIELA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16297349": { // ADUVIRI QUISPE SHARELA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16653592": { // CANAZA CASTILLO ABNER ZENON
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16689391": { // CASTILLO FLORES NADIA WARA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17414259": { // FERNANDEZ CHOQUE DANNA AVRIL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17118554": { // FLORES CHOQUE SAMI VALERIA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16959941": { // HUANCA QUISPE EUSEBIA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15790869": { // ILLANES FALCON HANS ANTHONY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17310758": { // MAMANI QUISPE LUZ CAMILA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15027286": { // MAMANI RAMIREZ RUZENA ESDENKA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17272587": { // MOLLINEDO MAMANI DANY JAIL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15680683": { // PAUCARA TORREZ YUAN EDUARDO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15960112": { // QUISPE VILA SHEYLA LUCIANA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16911786": { // VENEGAS FLORES ISMAEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },

    //5to de Primaria
    "16176647": { // NINA GUSTAVO ANTHONY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14427120": { // ZENTENO CALLISAYA ARIANA ALESSANDRA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "11" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15605576": { // CANTUTA LIMACHI ANDERSON VLADIMIR
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17265383": { // CONDORI QUISPE SIMON SANTIAGO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17118549": { // FLORES CHOQUE SAHARA SHAYA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16160305": { // GUTIERREZ CHOQUE YASIT MILAN
        asistencia: [
            { trimestre: "1er Trim.", faltas: "3", atrasos: "", licencias: "", presentes: "8" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14480516": { // LEON PEREZ GAEL OMAR
        asistencia: [
            { trimestre: "1er Trim.", faltas: "1", atrasos: "", licencias: "", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17893281": { // MAMANI YUPANQUI URIEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15141072": { // MAYTA CONDORI DAMIAN NOEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "11" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16324027": { // MAYTA ALI LILIANA ITCEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "11" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17173764": { // PEÑALOZA LUNA BEYMAR ANGEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "11", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16217837": { // PEREZ HUANCA DANIELA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "11" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14802040": { // PEREZ FUNES CORALAIN AYDEE
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "1", presentes: "10" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16700337": { // QUISPE ALANOCA JACIEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "2", atrasos: "", licencias: "", presentes: "9" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15204952": { // QUISPE MAMANI NEYMAR
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "11" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },

    //6to de Primaria
    "16297336": { // ADUVIRI QUISPE SHARAI
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14479026": { // ALVAREZ FLORES ALISON MAYA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15645677": { // CANTUTA HUANCA YADIEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16789053": { // CONDORI AJAHUANA JHOSTIN
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17451940": { // ERGUETA AMARU MAIRYN ZULAMI
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17414278": { // FERNANDEZ CHOQUE ANYHELO MATEO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16789847": { // FERNANDEZ FERNANDEZ MARY LUZ
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16883745": { // HUANCA QUISPE MAXIMILIANO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14047775": { // MAMANI USNAYO ALEJANDRO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14304209": { // ORELLANA SILVA ISABELLA ANABEL
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "14801125": { // PARICAHUA CASTILLO ANDREI GEMIO
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15333051": { // PAUCARA ERGUETA HAROL JHONNATAN
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "15960084": { // QUISPE VILA SERGIO ANDREW
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16220469": { // QUISPE FERNANDEZ NOEMI YESICA
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16166926": { // QUISPE QUISPE THIAGO ZHAIR
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "17184594": { // TERRAZAS RIOS CAMILA SHELLY
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
        ]
    },
    "16960822": { // VENEGAS FLORES MAGALI
        asistencia: [
            { trimestre: "1er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "2do Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" },
            { trimestre: "3er Trim.", faltas: "", atrasos: "", licencias: "", presentes: "" }
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

    // 🔹 Variables para acumular totales
    let totalFaltas = 0;
    let totalAtrasos = 0;
    let totalLicencias = 0;
    let totalPresentes = 0;

    asistenciaEstudiante.forEach(item => {

        // Convertir a número (si está vacío = 0)
        const faltas = parseInt(item.faltas) || 0;
        const atrasos = parseInt(item.atrasos) || 0;
        const licencias = parseInt(item.licencias) || 0;
        const presentes = parseInt(item.presentes) || 0;

        // 🔹 Sumar
        totalFaltas += faltas;
        totalAtrasos += atrasos;
        totalLicencias += licencias;
        totalPresentes += presentes;

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

    // 🔻 FILA TOTAL
    const filaTotal = document.createElement("tr");
    filaTotal.style.fontWeight = "bold";
    filaTotal.style.backgroundColor = "#e8f0fe";

    // 👉 Función para mostrar "-" si el total es 0
    const mostrar = (valor) => valor === 0 ? "-" : valor;

    filaTotal.innerHTML = `
        <td>TOTAL / ANUAL</td>
        <td>${mostrar(totalFaltas)}</td>
        <td>${mostrar(totalAtrasos)}</td>
        <td>${mostrar(totalLicencias)}</td>
        <td>${mostrar(totalPresentes)}</td>
    `;

    tabla.appendChild(filaTotal);
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
