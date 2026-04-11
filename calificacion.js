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

    document.getElementById("student-name-main").textContent = nombreCompleto;
    document.getElementById("course-name-main").textContent = data.curso;

    cargarNotas(data);
});

// ===============================
// BASE DE DATOS (SIN CALIFICACIÓN)
// ===============================
const estudiantesNotas = {
    //1ro de Primaria
    "16103032": { // CANTUTA HUANCA ISAMAR ALEYDA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "92", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17855221": { // CONDORI AJAHUANA HILDA NEYDA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "40", autoevaluacion: "", observacion: "No cuenta con material de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16235752": { // CONDORI QUISPE CIELO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "71", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16450562": { // FALCON CRUZ IGOR ALEJANDRO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16415828": { // MAMANI USNAYO JASMINE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17663300": { // MAYO RAMALLO YULER EZLID
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16225325": { // MONTAÑO CONDORI DAYANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "65", autoevaluacion: "", observacion: "No presento algunas tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16882382": { // PAUCARA TORREZ LYCEL ABRIL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17612197": { // RODRIGUEZ ERGUETA EMELETH
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "77", autoevaluacion: "", observacion: "Falta completar algunas tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16439814": { // VENTURA QUISPE MATIAS ANTONI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "30", autoevaluacion: "", observacion: "No presento tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //2do de Primaria
    "15505305": { // CANTUTA LIMACHI YAMILE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "57", autoevaluacion: "", observacion: "Falta presentar ultimas tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17614196": { // CHOQUE MENA HEYDAN KALEB
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "10", autoevaluacion: "", observacion: "No cuenta con material escolar y no asiste a la clase de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15325697": { // FERNANDEZ CASTILLO MARISOL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "30", autoevaluacion: "", observacion: "Incompleto las tareas y la inasistencia a las clases de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15735347": { // FERNANDEZ FERNANDEZ DANIEL LUIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16372545": { // HUANCA QUISPE CARMEN VIRGINIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "88", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15538197": { // HUISA MADANI MATIAS CALEB
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "92", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15574544": { // MOLLO RODRIGUEZ YESSENIA SARAHY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "30", autoevaluacion: "", observacion: "No cuenta con material escolar de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16217781": { // PEREZ HUANCA CAMILA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "42", autoevaluacion: "", observacion: "No presento algunos tareas y no cuenta material escolar de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //3ro de Primaria
    "15383976": { // CANTUTA MADANI FRANCO GAEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "75", autoevaluacion: "", observacion: "Debe mejorar la conducta" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15098838": { // CARLO CASTILLO SEBASTIAN ZABDIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "75", autoevaluacion: "", observacion: "No presento parcha Naval" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15200288": { // CHOQUE TOLA DIEGO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "73", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16916466": { // CONDORI MARCOCHAPI EDYLSON
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "25", autoevaluacion: "", observacion: "No presento tareas de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16782741": { // CONDORI QUISPE DANITS JHANE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "", observacion: "No presento Himno Nacional, Exaltación al Padre, Canto Avaroa.." },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16789062": { // CONDORI AJAHUANA SHIOMARA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "28", autoevaluacion: "", observacion: "No cuenta conn material de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15099063": { // ERGUETA AMARU IKER ASAD
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "73", autoevaluacion: "", observacion: "No presento Himno Nacional y Marcha Naval" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16787132": { // ESPINOZA LUNA JUAN MATEO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "35", autoevaluacion: "", observacion: "No cuenta con material escolar de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15310814": { // GUTIERREZ SEPULVEDA LEILA SCARLETT
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "89", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17389914": { // LOPES VALLEJOS NATALY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "", observacion: "No presento algunos tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17310778": { // MAMANI QUISPE LUZ EVELIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "44", autoevaluacion: "", observacion: "No cuenta con material escolar y no realiza tareas de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17893355": { // MAMANI YUPANQUI CANDY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "31", autoevaluacion: "", observacion: "No cuenta con material de música y no realizo tareas." },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15041299": { // MIRANDA MAMANI YARELY LUZ
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "41", autoevaluacion: "", observacion: "No cuenta con material de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15171572": { // QUISPE ALANOCA ASTRID ZOE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "10", autoevaluacion: "", observacion: "No asistio a las clases de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16786439": { // QUISPE MENA BIANCA MAYTE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15275310": { // TOLA QUISPE EMILY KEYLY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "23", autoevaluacion: "", observacion: "No presento tareas de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15530203": { // TOLA QUISPE DIEGO ALEXANDER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "34", autoevaluacion: "", observacion: "No presento tareas de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //4to de Primaria
    "17259685": { // ARHUIRI THAIS DANIELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "51", autoevaluacion: "", observacion: "No presento algunas tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16297349": { // ADUVIRI QUISPE SHARELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "20", autoevaluacion: "", observacion: "NO presento tareas de música y no cuenta con material de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16653592": { // CANAZA CASTILLO ABNER ZENON
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "88", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16689391": { // CASTILLO FLORES NADIA WARA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "79", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17414259": { // FERNANDEZ CHOQUE DANNA AVRIL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "40", autoevaluacion: "", observacion: "No cuenta con material de música y no presento tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17118554": { // FLORES CHOQUE SAMI VALERIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "46", autoevaluacion: "", observacion: "No presento tareas de Himnos" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16959941": { // HUANCA QUISPE EUSEBIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "54", autoevaluacion: "", observacion: "NO presento algunos Himnos" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15790869": { // ILLANES FALCON HANS ANTHONY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "75", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17310758": { // MAMANI QUISPE LUZ CAMILA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "1", autoevaluacion: "", observacion: "No asiste a la clase de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15027286": { // MAMANI RAMIREZ RUZENA ESDENKA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "", observacion: "No presento tareas de Himnos" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17272587": { // MOLLINEDO MAMANI DANY JAIL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "77", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15680683": { // PAUCARA TORREZ YUAN EDUARDO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "58", autoevaluacion: "", observacion: "No presento Himnos Nacional, Canción Vivir color canela, Himno Nacional en Aymara y la identificación de Himnos y Marchas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15960112": { // QUISPE VILA SHEYLA LUCIANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "", observacion: "No presento la canción Vivir color canela (Zampoña) y Identificación de Himnos y Marchas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16911786": { // VENEGAS FLORES ISMAEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "", observacion: "No participo en la entonación de Canto a Avaroa y no presento identificación de Himnos y Marchas en música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //5to de Primaria
    "16176647": { // NINA GUSTAVO ANTHONY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "", observacion: "No presento algunos tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14427120": { // ZENTENO CALLISAYA ARIANA ALESSANDRA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "86", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15605576": { // CANTUTA LIMACHI ANDERSON VLADIMIR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "59", autoevaluacion: "", observacion: "No presento ultimas actividades" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17265383": { // CONDORI QUISPE SIMON SANTIAGO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "47", autoevaluacion: "", observacion: "Esta incompleto su cuaderno de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17118549": { // FLORES CHOQUE SAHARA SHAYA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "50", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16160305": { // GUTIERREZ CHOQUE YASIT MILAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "47", autoevaluacion: "", observacion: "No cuenta con material escolar" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14480516": { // LEON PEREZ GAEL OMAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "60", autoevaluacion: "", observacion: "Esta desordenado su cuaderno de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17893281": { // MAMANI YUPANQUI URIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "", observacion: "No realiza actividades en el curso" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15141072": { // MAYTA CONDORI DAMIAN NOEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "73", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16324027": { // MAYTA ALI LILIANA ITCEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "", observacion: "No presento los primeros tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17173764": { // PEÑALOZA LUNA BEYMAR ANGEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "0", autoevaluacion: "", observacion: "No asiste a la clase de música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16217837": { // PEREZ HUANCA DANIELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "", observacion: "No cuenta con material de música y no realiza actividades en el curso" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14802040": { // PEREZ FUNES CORALAIN AYDEE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "70", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16700337": { // QUISPE ALANOCA JACIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "", observacion: "No presento algunos tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15204952": { // QUISPE MAMANI NEYMAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "", observacion: "No presento algunos tareas" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //6to de Primaria
    "16297336": { // ADUVIRI QUISPE SHARAI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "45", autoevaluacion: "", observacion: "No presento Himno Nacional, Investigación de danzas, Marcha Naval y Cancion Pretenciosa(tarka) " },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14479026": { // ALVAREZ FLORES ALISON MAYA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "83", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15645677": { // CANTUTA HUANCA YADIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "76", autoevaluacion: "", observacion: "No entono Exaltación al padre" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16789053": { // CONDORI AJAHUANA JHOSTIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "", observacion: "No resondió el cuestionario" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17451940": { // ERGUETA AMARU MAIRYN ZULAMI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "93", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17414278": { // FERNANDEZ CHOQUE ANYHELO MATEO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "48", autoevaluacion: "", observacion: "No presento algunos tareas y no cuenta con material de Música" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16789847": { // FERNANDEZ FERNANDEZ MARY LUZ
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "87", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16883745": { // HUANCA QUISPE MAXIMILIANO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "", observacion: "Mejorar la conducta" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14047775": { // MAMANI USNAYO ALEJANDRO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "83", autoevaluacion: "", observacion: "No demostro entonación de Himno a Exaltación al padre" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14304209": { // ORELLANA SILVA ISABELLA ANABEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "92", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14801125": { // PARICAHUA CASTILLO ANDREI GEMIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "39", autoevaluacion: "", observacion: "No cuenta con material de música, No realizo cuestionario, Himno Nacional, Canto a Avaroa, Investigación de la danza, canción pretenciosa(tarka) y Marcha Naval" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15333051": { // PAUCARA ERGUETA HAROL JHONNATAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15960084": { // QUISPE VILA SERGIO ANDREW
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "91", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16220469": { // QUISPE FERNANDEZ NOEMI YESICA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "66", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16166926": { // QUISPE QUISPE THIAGO ZHAIR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "42", autoevaluacion: "", observacion: "No realizo cuestionario, Himno Nacional, Canto a Avaroa, Recuperemos nuestro mar y Marcha Naval " },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17184594": { // TERRAZAS RIOS CAMILA SHELLY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "94", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16960822": { // VENEGAS FLORES MAGALI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "", observacion: "No entono Canto a Avaroa, No presento Himno Nacional, no investigo danzas, No presento recuperemos nuestro mar.  " },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    }

};

// ===============================
// CARGAR NOTAS (AUTOMÁTICO)
// ===============================
function cargarNotas(data) {
    const tabla = document.getElementById("grades-table");
    if (!tabla) return;

    tabla.innerHTML = "";

    const notasEstudiante = estudiantesNotas[data.ci]?.calificaciones || [];

    let suma = 0;
    let contador = 0;

    notasEstudiante.forEach(nota => {

        const puntaje = nota.puntaje === "" ? "" : Number(nota.puntaje);
        const auto = nota.autoevaluacion === "" ? "" : Number(nota.autoevaluacion);

        // ✅ CALCULAR AUTOMÁTICO
        let calif = "";

        // 👉 Si hay ambos, suma
        if (puntaje !== "" && auto !== "") {
            calif = puntaje + auto;
        }
        // 👉 Si solo hay puntaje, usar puntaje
        else if (puntaje !== "") {
            calif = puntaje;
        }

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nota.trimestre}</td>
            <td>${nota.puntaje || ""}</td>
            <td>${nota.autoevaluacion || ""}</td>
            <td class="${obtenerClaseEstado(calif)}">${calif}</td>
            <td class="${obtenerClaseEstado(calif)}">${obtenerEstado(calif)}</td>
            <td>${nota.observacion || ""}</td>
        `;
        tabla.appendChild(fila);

        // ✅ sumar solo si hay nota
        if (calif !== "" && !isNaN(calif)) {
            suma += calif;
            contador++;
        }
    });

    // ===============================
    // PROMEDIO
    // ===============================
    let promedio = "";
    let estadoFinal = "";

    if (contador > 0) {
        promedio = Math.round(suma / contador);
        estadoFinal = obtenerEstado(promedio);
    }

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
// ESTADO
// ===============================
function obtenerEstado(calificacion) {
    if (calificacion === "" || calificacion === null || isNaN(calificacion)) {
        return "";
    }
    return calificacion >= 51 ? "APROBADO(A)" : "REPROBADO(A)";
}

function obtenerClaseEstado(calificacion) {
    if (calificacion === "" || calificacion === null || isNaN(calificacion)) {
        return "";
    }
    return calificacion >= 51 ? "aprobado" : "reprobado";
}

// ===============================
// PDF
// ===============================
function verNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) return alert("No hay sesión activa");

    document.getElementById("visorPDF").src = `notas/${estudiante.ci}.pdf`;
}

function descargarNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) return alert("No hay sesión activa");

    const link = document.createElement("a");
    link.href = `notas/${estudiante.ci}.pdf`;
    link.download = `${estudiante.ci}.pdf`;
    link.click();
}

// ===============================
// MENÚ
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

    // 👇 marcar que cerró sesión
    sessionStorage.setItem("logout", "true");

    window.location.replace("index.html");
}
