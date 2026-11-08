/* =========================================================
   DATOS INICIALES — Mente Serena (servicios, especialistas y ajustes de ejemplo).
   Si conectaste Firebase, todo esto se edita desde el PANEL.
   Este archivo solo se usa como respaldo mientras la base de datos esté vacía.
   ========================================================= */
window.DATOS = {
 "ajustes": {
  "whatsapp": "51987654321",
  "telefono": "+51 987 654 321",
  "direccion": "Av. Del Ejército 1180, Miraflores, Lima",
  "correo": "citas@menteserena.pe",
  "abre": "8:00",
  "cierra": "21:00",
  "domingoCierra": "",
  "delivery": 0,
  "deliveryGratis": 0,
  "capacidad": 3,
  "turno": 60,
  "razonSocial": "",
  "ruc": "",
  "reciboPie": "",
  "crisisLinea": "113",
  "crisisOpcion": "5",
  "tiempoReal": true,
  "enlaceFijo": "",
  "pagoYape": true,
  "yapeQR": "data:image/png;base64,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",
  "yapeNum": "987 654 321",
  "yapeTitular": "Mente Serena SAC",
  "pagoPlin": true,
  "plinQR": "data:image/png;base64,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",
  "plinNum": "987 654 321",
  "plinTitular": "Mente Serena SAC",
  "pagoTransf": true,
  "cuentas": [
   {
    "id": "bcp",
    "banco": "BCP",
    "tipo": "Ahorros",
    "moneda": "Soles",
    "num": "191-12345678-0-12",
    "cci": "002-191-112345678012-55",
    "titular": "Mente Serena SAC",
    "url": "https://www.viabcp.com",
    "logo": ""
   },
   {
    "id": "interbank",
    "banco": "Interbank",
    "tipo": "Ahorros",
    "moneda": "Soles",
    "num": "200-3012345678",
    "cci": "003-200-013012345678-41",
    "titular": "Mente Serena SAC",
    "url": "https://interbank.pe",
    "logo": ""
   },
   {
    "id": "bbva",
    "banco": "BBVA",
    "tipo": "Ahorros",
    "moneda": "Soles",
    "num": "0011-0123-0201234567",
    "cci": "011-123-000201234567-89",
    "titular": "Mente Serena SAC",
    "url": "https://www.bbva.pe",
    "logo": ""
   }
  ],
  "adelantoTipo": "fijo",
  "adelantoValor": 50,
  "adelantoObligatorio": false,
  "adelantoOCR": true
 },
 "servicios": [
  {
   "id": "orientacion",
   "cat": "psicologia",
   "area": "psicologia",
   "n": "Primera consulta de orientación",
   "d": "Si no sabes por dónde empezar, conversamos y te recomendamos el tipo de ayuda y el profesional ideal.",
   "p": 60,
   "icon": "compass",
   "img": "1758273241078-8eec353836be",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "1 sesión",
   "duracion": "30 min",
   "larga": "Es una primera conversación, sin compromiso, para entender lo que estás viviendo. Te escuchamos con calma y al final te recomendamos qué tipo de ayuda te conviene: psicoterapia, una evaluación o una consulta con psiquiatría.\n\nPuedes hacerla presencial o por videollamada.",
   "beneficios": [
    "Te orientamos sin compromiso",
    "Te recomendamos el profesional ideal para ti",
    "Presencial u online",
    "Si inicias terapia, se descuenta de tu primer paquete"
   ],
   "faq": [
    {
     "q": "¿Es una sesión de terapia?",
     "a": "Es una primera entrevista para orientarte. Si decides iniciar terapia, empezamos en la siguiente sesión."
    },
    {
     "q": "¿Puedo hacerla online?",
     "a": "Sí, por videollamada desde tu celular o computadora."
    }
   ],
   "orden": 1,
   "visible": true
  },
  {
   "id": "terapia-individual",
   "cat": "psicologia",
   "area": "psicologia",
   "n": "Terapia individual para adultos",
   "d": "Un espacio seguro para trabajar ansiedad, tristeza, estrés, duelo, autoestima o lo que te preocupe.",
   "p": 110,
   "icon": "chat",
   "img": "1758273240631-59d44c8f5b66",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "Semanal o quincenal",
   "duracion": "50 min",
   "larga": "Trabajamos contigo de forma personalizada, con enfoques basados en evidencia como la terapia cognitivo-conductual (TCC) y la terapia de aceptación y compromiso (ACT).\n\nDefinimos juntos objetivos claros y revisamos tu avance cada cierto tiempo, para que sientas que la terapia te está ayudando.",
   "beneficios": [
    "Enfoques con respaldo científico (TCC, ACT)",
    "Objetivos claros y medición de tu avance",
    "Presencial u online",
    "Paquetes de sesiones con descuento"
   ],
   "faq": [
    {
     "q": "¿Cuántas sesiones voy a necesitar?",
     "a": "Depende de cada persona. Muchos procesos duran entre 8 y 16 sesiones; lo vamos revisando juntos."
    },
    {
     "q": "¿Lo que cuento es confidencial?",
     "a": "Sí. Todo lo que conversas en sesión es confidencial y está protegido por el secreto profesional."
    }
   ],
   "orden": 2,
   "visible": true
  },
  {
   "id": "consulta-psiquiatrica",
   "cat": "psiquiatria",
   "area": "psiquiatria",
   "n": "Consulta psiquiátrica",
   "d": "Evaluación médica de la salud mental: diagnóstico y, si hace falta, tratamiento con medicación.",
   "p": 180,
   "icon": "brain",
   "img": "1714976694810-85add1a29c96",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "1 consulta",
   "duracion": "60 min",
   "larga": "El psiquiatra es un médico especialista. En la primera consulta revisa tus síntomas, tu historia y tu salud general para llegar a un diagnóstico.\n\nSi es necesario indica tratamiento con medicación y coordina con tu psicólogo para que el tratamiento sea integral.",
   "beneficios": [
    "Médicos psiquiatras colegiados",
    "Diagnóstico y plan de tratamiento",
    "Trabajo en equipo con tu psicólogo",
    "Indicaciones y receta en Mi Espacio"
   ],
   "faq": [
    {
     "q": "¿Cuál es la diferencia entre psicólogo y psiquiatra?",
     "a": "El psiquiatra es médico: diagnostica y puede indicar medicación. El psicólogo acompaña con psicoterapia. Muchas veces lo ideal es combinar ambos."
    },
    {
     "q": "¿Siempre me van a dar pastillas?",
     "a": "No. La medicación solo se indica cuando realmente es necesaria, y siempre te explicamos por qué."
    }
   ],
   "orden": 3,
   "visible": true
  },
  {
   "id": "control-psiquiatrico",
   "cat": "psiquiatria",
   "area": "psiquiatria",
   "n": "Control psiquiátrico",
   "d": "Seguimiento de tu tratamiento: cómo te sientes, ajuste de dosis y nueva receta si corresponde.",
   "p": 120,
   "icon": "pill",
   "img": "1714976694756-28bf07af3758",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "Mensual o según indicación",
   "duracion": "30 min",
   "larga": "En los controles revisamos cómo vas, los efectos del tratamiento y ajustamos lo necesario. Es importante no suspender la medicación sin hablar antes con tu psiquiatra.",
   "beneficios": [
    "Seguimiento cercano",
    "Ajuste de tratamiento",
    "Presencial u online"
   ],
   "faq": [],
   "orden": 4,
   "visible": true
  },
  {
   "id": "terapia-pareja",
   "cat": "pareja",
   "area": "psicologia",
   "n": "Terapia de pareja",
   "d": "Mejoren la comunicación, resuelvan conflictos y reconecten como pareja, con un terapeuta imparcial.",
   "p": 160,
   "icon": "couple",
   "img": "1604881991720-f91add269bed",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "Semanal o quincenal",
   "duracion": "60 min",
   "larga": "Un espacio para que ambos puedan hablar y ser escuchados. Trabajamos comunicación, manejo de discusiones, confianza, acuerdos y crianza compartida.",
   "beneficios": [
    "Terapeuta imparcial",
    "Herramientas prácticas de comunicación",
    "Sesiones conjuntas e individuales si hace falta"
   ],
   "faq": [
    {
     "q": "¿Tenemos que ir los dos?",
     "a": "Lo ideal es que asistan ambos, pero también puedes empezar tú y luego se suma tu pareja."
    }
   ],
   "orden": 5,
   "visible": true
  },
  {
   "id": "terapia-familiar",
   "cat": "pareja",
   "area": "psicologia",
   "n": "Terapia familiar",
   "d": "Para familias que atraviesan cambios, conflictos, duelos o dificultades con los hijos.",
   "p": 170,
   "icon": "family",
   "img": "1758598737516-ffd38ba74838",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "Quincenal",
   "duracion": "60 min",
   "larga": "Trabajamos con la familia como un equipo: mejoramos la comunicación, los límites y la forma de resolver problemas en casa.",
   "beneficios": [
    "Toda la familia participa",
    "Pautas de crianza y convivencia",
    "Acompañamiento en duelos y separaciones"
   ],
   "faq": [],
   "orden": 6,
   "visible": true
  },
  {
   "id": "terapia-infantil",
   "cat": "ninos",
   "area": "psicologia",
   "n": "Terapia infantil",
   "d": "Acompañamos a niños de 4 a 11 años con juego terapéutico y orientación a los padres.",
   "p": 110,
   "icon": "kid",
   "img": "1758273240331-745ccab011a2",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": false,
   "sesiones": "Semanal",
   "duracion": "45 min",
   "larga": "Los niños se expresan jugando. Con juego terapéutico trabajamos emociones, conducta, miedos, adaptación escolar o cambios en la familia, y orientamos a los padres sobre cómo ayudar en casa.",
   "beneficios": [
    "Juego terapéutico",
    "Orientación a los padres",
    "Coordinación con el colegio si hace falta"
   ],
   "faq": [
    {
     "q": "¿Los padres entran a la sesión?",
     "a": "Parte de la sesión es con el niño y otra parte con los padres, para darles pautas."
    }
   ],
   "orden": 7,
   "visible": true
  },
  {
   "id": "terapia-adolescentes",
   "cat": "ninos",
   "area": "psicologia",
   "n": "Terapia para adolescentes",
   "d": "Un espacio de confianza para jóvenes de 12 a 17 años: ansiedad, ánimo, autoestima, redes y familia.",
   "p": 110,
   "icon": "spark",
   "img": "1758273240403-052b3c99f636",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "Semanal",
   "duracion": "50 min",
   "larga": "Acompañamos a los adolescentes con respeto y confidencialidad, y trabajamos con los padres cuando es necesario.",
   "beneficios": [
    "Psicólogas especializadas en adolescentes",
    "Confidencialidad adaptada a su edad",
    "Orientación a los padres"
   ],
   "faq": [],
   "orden": 8,
   "visible": true
  },
  {
   "id": "psiquiatria-infantil",
   "cat": "ninos",
   "area": "psiquiatria",
   "n": "Psiquiatría infantil y del adolescente",
   "d": "Evaluación médica para niños y jóvenes: TDAH, ansiedad, ánimo, sueño y conducta.",
   "p": 200,
   "icon": "brain",
   "img": "",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": false,
   "sesiones": "1 consulta + controles",
   "duracion": "60 min",
   "larga": "Evaluamos al niño o adolescente junto con su familia y coordinamos con su psicólogo y su colegio para un tratamiento integral.",
   "beneficios": [
    "Especialista en niños y adolescentes",
    "Trabajo con la familia y el colegio"
   ],
   "faq": [],
   "orden": 9,
   "visible": true
  },
  {
   "id": "evaluacion-psicologica",
   "cat": "evaluacion",
   "area": "psicologia",
   "n": "Evaluación psicológica",
   "d": "Psicodiagnóstico con pruebas estandarizadas e informe escrito.",
   "p": 380,
   "icon": "clipboard",
   "img": "1714976694895-d38078c1a3c0",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": false,
   "sesiones": "3 a 4 sesiones",
   "duracion": "1 a 2 semanas",
   "larga": "Aplicamos entrevistas y pruebas psicológicas para conocer a fondo la personalidad, las emociones o las capacidades de la persona. Al final entregamos un informe escrito y una sesión de resultados.",
   "beneficios": [
    "Pruebas estandarizadas",
    "Informe escrito",
    "Sesión de devolución de resultados"
   ],
   "faq": [],
   "orden": 10,
   "visible": true
  },
  {
   "id": "orientacion-vocacional",
   "cat": "evaluacion",
   "area": "psicologia",
   "n": "Orientación vocacional",
   "d": "Descubre qué carrera va contigo con pruebas de intereses y aptitudes.",
   "p": 300,
   "icon": "target",
   "img": "1573497491208-6b1acb260507",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "3 sesiones",
   "duracion": "2 semanas",
   "larga": "Para estudiantes de 4.° y 5.° de secundaria o jóvenes que quieren cambiar de carrera. Combinamos pruebas, entrevistas e información sobre carreras.",
   "beneficios": [
    "Pruebas de intereses y aptitudes",
    "Informe con carreras recomendadas",
    "Sesión con los padres"
   ],
   "faq": [],
   "orden": 11,
   "visible": true
  },
  {
   "id": "certificado",
   "cat": "evaluacion",
   "area": "psicologia",
   "n": "Certificado de salud mental",
   "d": "Para trabajo, estudios, licencia o trámites",
   "p": 90,
   "icon": "file",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "online": false,
   "sesiones": "1 cita",
   "duracion": "40 min",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 12,
   "visible": true
  },
  {
   "id": "taller-estres",
   "cat": "psicologia",
   "area": "psicologia",
   "n": "Taller grupal de manejo del estrés",
   "d": "4 encuentros en grupo pequeño",
   "p": 60,
   "icon": "wave",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "4 sesiones",
   "duracion": "90 min",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 13,
   "visible": true
  },
  {
   "id": "mindfulness",
   "cat": "psicologia",
   "area": "psicologia",
   "n": "Programa de mindfulness",
   "d": "8 semanas para aprender a vivir con más calma",
   "p": 350,
   "icon": "leaf",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "online": true,
   "sesiones": "8 sesiones",
   "duracion": "60 min",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 14,
   "visible": true
  },
  {
   "id": "informe",
   "cat": "evaluacion",
   "area": "psicologia",
   "n": "Informe psicológico",
   "d": "Para colegio, trabajo o trámites",
   "p": 150,
   "icon": "clipboard",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "online": false,
   "sesiones": "",
   "duracion": "",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 15,
   "visible": true
  },
  {
   "id": "empresas",
   "cat": "psicologia",
   "area": "psicologia",
   "n": "Bienestar para empresas",
   "d": "Charlas y atención para colaboradores",
   "p": 0,
   "icon": "building",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "domicilio": false,
   "online": true,
   "sesiones": "",
   "duracion": "",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 16,
   "visible": true
  }
 ],
 "productos": [],
 "web": {
  "marca": {
   "logo": "",
   "nombre1": "Mente",
   "nombre2": " Serena",
   "eslogan": "Psiquiatría y Psicología",
   "color1": "#3d6b63",
   "color2": "#c77b5d"
  },
  "portada": {
   "etiqueta": "Psiquiatría y psicología · Miraflores y online",
   "titulo": "Un lugar seguro para",
   "tituloColor": "sentirte mejor",
   "texto": "Psiquiatras y psicólogos trabajando en equipo para cuidar tu salud mental. Sesiones presenciales u online, con total confidencialidad, y tu proceso siempre a la mano en Mi Espacio.",
   "foto": "1758273241086-f3585ef8c2f8",
   "cifras": [
    {
     "n": "12 años",
     "t": "acompañando personas"
    },
    {
     "n": "Online",
     "t": "desde todo el Perú"
    },
    {
     "n": "100%",
     "t": "confidencial"
    }
   ]
  },
  "nosotros": {
   "titulo": "Salud mental con",
   "tituloColor": "calidez y ciencia",
   "foto": "1464029902023-f42eba355bde",
   "texto": "Mente Serena nació en 2014 con una idea simple: que pedir ayuda sea fácil y que cada persona se sienta escuchada. Psiquiatría y psicología trabajan juntas para que tu tratamiento sea integral y coordinado.",
   "puntos": [
    "Psiquiatras y psicólogos colegiados, trabajando en equipo",
    "Enfoques con respaldo científico: TCC, ACT, terapia sistémica",
    "Sesiones presenciales u online con la misma calidad",
    "Tu historia clínica protegida: solo la ve tu profesional"
   ]
  },
  "equipo": [
   {
    "id": "valeria",
    "n": "Dra. Valeria Montes",
    "cargo": "Psiquiatra de adultos",
    "area": "psiquiatria",
    "d": "Médica psiquiatra con 15 años de experiencia en ansiedad, depresión y trastornos del sueño.",
    "enfoque": "Ansiedad · Depresión · Sueño",
    "online": true,
    "foto": ""
   },
   {
    "id": "ricardo",
    "n": "Dr. Ricardo Salinas",
    "cargo": "Psiquiatra infantil y del adolescente",
    "area": "psiquiatria",
    "d": "Psiquiatra infantil: TDAH, ansiedad y conducta en niños y adolescentes, siempre de la mano de la familia.",
    "enfoque": "TDAH · Ansiedad infantil · Conducta",
    "online": false,
    "foto": ""
   },
   {
    "id": "camila",
    "n": "Ps. Camila Ortega",
    "cargo": "Psicóloga clínica · ansiedad y depresión",
    "area": "psicologia",
    "d": "Psicóloga clínica especialista en ansiedad, ataques de pánico y depresión con terapia cognitivo-conductual.",
    "enfoque": "TCC · Ansiedad · Pánico · Duelo",
    "online": true,
    "foto": ""
   },
   {
    "id": "andres",
    "n": "Ps. Andrés Villanueva",
    "cargo": "Terapia de pareja y familia",
    "area": "psicologia",
    "d": "Terapeuta de pareja y familia. Ayuda a mejorar la comunicación y a superar crisis y separaciones.",
    "enfoque": "Terapia sistémica · Pareja · Familia",
    "online": true,
    "foto": ""
   },
   {
    "id": "mariana",
    "n": "Ps. Mariana Ríos",
    "cargo": "Psicóloga infantil y de adolescentes",
    "area": "psicologia",
    "d": "Psicóloga infantil: juego terapéutico, emociones, conducta y orientación a padres.",
    "enfoque": "Juego terapéutico · Crianza · Adolescentes",
    "online": true,
    "foto": ""
   }
  ],
  "testimonios": [
   {
    "q": "Llegué con ataques de pánico y sin saber qué me pasaba. Con la terapia aprendí a manejarlos y hoy vuelvo a hacer mi vida normal.",
    "n": "Lucía F.",
    "r": "Terapia individual"
   },
   {
    "q": "Hago mis sesiones online desde Arequipa y en Mi Espacio veo mis citas, mis tareas y cuántas sesiones me quedan. Súper práctico.",
    "n": "Jorge M.",
    "r": "Terapia online"
   },
   {
    "q": "Mi hijo tenía mucha ansiedad en el colegio. La psicóloga y el psiquiatra trabajaron juntos y nos dieron pautas claras como padres.",
    "n": "Carmen R.",
    "r": "Mamá de Joaquín"
   }
  ],
  "redes": {
   "facebook": "",
   "instagram": "",
   "tiktok": ""
  },
  "emergencias": true
 },
 "categorias": {
  "productos": [],
  "servicios": [
   {
    "id": "psicologia",
    "n": "Psicoterapia",
    "icon": "chat",
    "orden": 1,
    "visible": true
   },
   {
    "id": "psiquiatria",
    "n": "Psiquiatría",
    "icon": "brain",
    "orden": 2,
    "visible": true
   },
   {
    "id": "pareja",
    "n": "Pareja y familia",
    "icon": "couple",
    "orden": 3,
    "visible": true
   },
   {
    "id": "ninos",
    "n": "Niños y adolescentes",
    "icon": "kid",
    "orden": 4,
    "visible": true
   },
   {
    "id": "evaluacion",
    "n": "Evaluaciones",
    "icon": "clipboard",
    "orden": 5,
    "visible": true
   }
  ]
 },
 "paginas": {
  "menu": [
   {
    "id": "inicio",
    "n": "Inicio",
    "visible": true
   },
   {
    "id": "servicios",
    "n": "Servicios",
    "visible": true
   },
   {
    "id": "especialistas",
    "n": "Especialistas",
    "visible": true
   },
   {
    "id": "citas",
    "n": "Reservar",
    "visible": true
   },
   {
    "id": "mi-espacio",
    "n": "Mi Espacio",
    "visible": true
   },
   {
    "id": "nosotros",
    "n": "Nosotros",
    "visible": true
   },
   {
    "id": "contacto",
    "n": "Contacto",
    "visible": true
   }
  ],
  "encabezados": {
   "servicios": {
    "pill": "Servicios",
    "titulo": "¿Cómo podemos",
    "tituloColor": "ayudarte?",
    "texto": "Psicoterapia, psiquiatría y evaluaciones para adultos, parejas, familias, niños y adolescentes. Presencial u online."
   },
   "especialistas": {
    "pill": "Especialistas",
    "titulo": "Un equipo que",
    "tituloColor": "trabaja unido",
    "texto": "Psiquiatras y psicólogos colegiados. Elige con quién quieres atenderte o déjanos recomendarte."
   },
   "citas": {
    "pill": "Reservar",
    "titulo": "Agenda tu",
    "tituloColor": "primera sesión",
    "texto": "Elige el servicio, la modalidad (presencial u online), el día y un horario libre. Tu cita queda confirmada al instante."
   },
   "nosotros": {
    "pill": "Nosotros",
    "titulo": "Cuidamos tu salud mental",
    "tituloColor": "desde 2014",
    "texto": "Un equipo cálido, profesional y confidencial."
   },
   "contacto": {
    "pill": "Contacto",
    "titulo": "Estamos para",
    "tituloColor": "escucharte",
    "texto": "Escríbenos por WhatsApp, llámanos o visítanos. Si estás en crisis, usa los números de ayuda inmediata."
   },
   "privacidad": {
    "pill": "Privacidad",
    "titulo": "Tu información,",
    "tituloColor": "protegida",
    "texto": "Cómo cuidamos tus datos personales y de salud."
   }
  },
  "inicio": [
   {
    "id": "accesos",
    "n": "Accesos rápidos",
    "visible": true
   },
   {
    "id": "temas",
    "n": "¿Cómo te sientes? (temas)",
    "pill": "Te podemos ayudar",
    "titulo": "¿Te sientes",
    "tituloColor": "así?",
    "texto": "No tienes que estar \"muy mal\" para pedir ayuda. Estos son algunos temas que acompañamos todos los días.",
    "visible": true
   },
   {
    "id": "servicios",
    "n": "Servicios",
    "pill": "Servicios",
    "titulo": "Psiquiatría y psicología",
    "tituloColor": "en un solo lugar",
    "texto": "Para adultos, parejas, familias, niños y adolescentes.",
    "visible": true
   },
   {
    "id": "equipo",
    "n": "Especialistas",
    "pill": "Especialistas",
    "titulo": "Conoce a",
    "tituloColor": "nuestro equipo",
    "texto": "Profesionales colegiados que coordinan entre sí para cuidarte mejor.",
    "visible": true
   },
   {
    "id": "online",
    "n": "Terapia online",
    "pill": "Online",
    "titulo": "Tu sesión desde",
    "tituloColor": "donde estés",
    "texto": "La misma calidad que en el consultorio, por videollamada segura desde tu celular o computadora.",
    "visible": true
   },
   {
    "id": "portal",
    "n": "Portal Mi Espacio",
    "pill": "Mi Espacio",
    "titulo": "Tu proceso,",
    "tituloColor": "en tu celular",
    "texto": "Con tu código personal ves tus sesiones, entras a la videollamada, registras tu ánimo, cumples tus retos del día con ejercicios guiados y descargas recibos y constancias.",
    "visible": true
   },
   {
    "id": "paquetes",
    "n": "Paquetes de sesiones",
    "pill": "Paquetes",
    "titulo": "Ahorra con",
    "tituloColor": "paquetes de sesiones",
    "texto": "La terapia funciona mejor con constancia. Elige un paquete y paga menos por sesión.",
    "visible": true
   },
   {
    "id": "emergencias",
    "n": "Aviso de crisis",
    "titulo": "¿Estás pasando por una crisis ahora?",
    "texto": "Si piensas en hacerte daño o sientes que no puedes más, no esperes una cita: llama gratis a la Línea 113, opción 5 (Minsa, las 24 horas) o acude a la emergencia más cercana.",
    "visible": true
   },
   {
    "id": "pasos",
    "n": "Cómo empezar (pasos)",
    "pill": "Así de fácil",
    "titulo": "Empezar es",
    "tituloColor": "más fácil de lo que crees",
    "texto": "",
    "visible": true
   },
   {
    "id": "testimonios",
    "n": "Testimonios",
    "pill": "Historias",
    "titulo": "Personas que",
    "tituloColor": "volvieron a sentirse bien",
    "texto": "Compartido con permiso. Usamos solo iniciales para cuidar su privacidad.",
    "visible": true
   },
   {
    "id": "faq",
    "n": "Preguntas frecuentes",
    "pill": "Dudas",
    "titulo": "Preguntas",
    "tituloColor": "frecuentes",
    "texto": "",
    "visible": true
   },
   {
    "id": "cta",
    "n": "Llamado final",
    "titulo": "Dar el primer paso es lo más difícil",
    "texto": "Y no tienes que darlo solo. Agenda una primera consulta de orientación, presencial u online.",
    "visible": true
   }
  ],
  "pie": {
   "texto": "Centro de psiquiatría y psicología. Atención presencial en Miraflores y online para todo el Perú, con calidez y total confidencialidad."
  },
  "extras": []
 },
 "doctores": [
  {
   "id": "valeria",
   "n": "Dra. Valeria Montes",
   "esp": "Psiquiatra de adultos",
   "area": "psiquiatria",
   "color": "#3d6b63",
   "dias": [
    1,
    2,
    3,
    4,
    5
   ],
   "desde": "14:00",
   "hasta": "20:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "ricardo",
   "n": "Dr. Ricardo Salinas",
   "esp": "Psiquiatra infantil y del adolescente",
   "area": "psiquiatria",
   "color": "#6b5ca5",
   "dias": [
    2,
    4,
    6
   ],
   "desde": "9:00",
   "hasta": "14:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "camila",
   "n": "Ps. Camila Ortega",
   "esp": "Psicóloga clínica · ansiedad y depresión",
   "area": "psicologia",
   "color": "#c77b5d",
   "dias": [
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "desde": "8:00",
   "hasta": "21:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "andres",
   "n": "Ps. Andrés Villanueva",
   "esp": "Terapia de pareja y familia",
   "area": "psicologia",
   "color": "#4d7ea8",
   "dias": [
    1,
    3,
    5,
    6
   ],
   "desde": "10:00",
   "hasta": "21:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "mariana",
   "n": "Ps. Mariana Ríos",
   "esp": "Psicóloga infantil y de adolescentes",
   "area": "psicologia",
   "color": "#d39b3a",
   "dias": [
    1,
    2,
    4,
    5,
    6
   ],
   "desde": "9:00",
   "hasta": "18:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  }
 ],
 "paquetes": [
  {
   "id": "pk4",
   "n": "4 sesiones",
   "ses": 4,
   "p": 400,
   "servicio": "terapia-individual"
  },
  {
   "id": "pk8",
   "n": "8 sesiones",
   "ses": 8,
   "p": 760,
   "servicio": "terapia-individual"
  },
  {
   "id": "pk12",
   "n": "12 sesiones",
   "ses": 12,
   "p": 1080,
   "servicio": "terapia-individual"
  }
 ],
 "textos": [
  {
   "k": "cr.t",
   "pag": "general",
   "g": "Ventana de ayuda inmediata",
   "l": "Título",
   "v": "No estás solo. Pide ayuda ahora"
  },
  {
   "k": "cr.p",
   "pag": "general",
   "g": "Ventana de ayuda inmediata",
   "l": "Texto",
   "v": "Si piensas en hacerte daño, en quitarte la vida o estás en peligro, no esperes una cita. Comunícate ya con alguno de estos servicios:"
  },
  {
   "k": "cr.n",
   "pag": "general",
   "g": "Ventana de ayuda inmediata",
   "l": "Nota final",
   "v": "Nuestro WhatsApp es para citas y consultas: no es un servicio de emergencias. Si puedes, avisa también a alguien de confianza para que te acompañe."
  },
  {
   "k": "pie.c1",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 1",
   "v": "Servicios"
  },
  {
   "k": "pie.c1a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Terapia individual"
  },
  {
   "k": "pie.c1b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Psiquiatría"
  },
  {
   "k": "pie.c1c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Terapia de pareja"
  },
  {
   "k": "pie.c1d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Niños y adolescentes"
  },
  {
   "k": "pie.c2",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 2",
   "v": "Pacientes"
  },
  {
   "k": "pie.c2a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Reservar cita"
  },
  {
   "k": "pie.c2b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Mi Espacio"
  },
  {
   "k": "pie.c2c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Especialistas"
  },
  {
   "k": "pie.c2d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Aviso de privacidad"
  },
  {
   "k": "pie.c3",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 3",
   "v": "Visítanos"
  },
  {
   "k": "em.btn",
   "pag": "inicio",
   "g": "Aviso de crisis",
   "l": "Texto del botón",
   "v": "Llamar a la Línea 113"
  },
  {
   "k": "cta.b1",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 1",
   "v": "Agendar orientación"
  },
  {
   "k": "cta.b2",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 2",
   "v": "Entrar a Mi Espacio"
  },
  {
   "k": "top.emerg",
   "pag": "general",
   "g": "Barra superior",
   "l": "Texto de ayuda en crisis",
   "v": "¿En crisis? Llama gratis:"
  },
  {
   "k": "top.online",
   "pag": "general",
   "g": "Barra superior",
   "l": "Texto de la derecha",
   "v": "Sesiones online para todo el Perú"
  },
  {
   "k": "nav.cta",
   "pag": "general",
   "g": "Menú",
   "l": "Botón del menú",
   "v": "Agendar cita"
  },
  {
   "k": "ini.b1",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 1",
   "v": "Agendar mi primera cita"
  },
  {
   "k": "ini.b2",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 2",
   "v": "Conocer al equipo"
  },
  {
   "k": "ini.f1t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · título",
   "v": "Consulta de orientación"
  },
  {
   "k": "ini.f1s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · texto",
   "v": "Desde S/ 60 · 30 min"
  },
  {
   "k": "ini.f2t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · título",
   "v": "Sesión online"
  },
  {
   "k": "ini.f2s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · texto",
   "v": "Hoy · 19:00 h · desde casa"
  },
  {
   "k": "ini.f3t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · título",
   "v": "100% confidencial"
  },
  {
   "k": "ini.f3s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · texto",
   "v": "Secreto profesional"
  },
  {
   "k": "ini.a1t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · título",
   "v": "Agendar cita"
  },
  {
   "k": "ini.a1s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · texto",
   "v": "Presencial u online"
  },
  {
   "k": "ini.a2t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · título",
   "v": "Mi Espacio"
  },
  {
   "k": "ini.a2s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · texto",
   "v": "Tus sesiones con tu código"
  },
  {
   "k": "ini.a3t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · título",
   "v": "Especialistas"
  },
  {
   "k": "ini.a3s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · texto",
   "v": "Elige con quién atenderte"
  },
  {
   "k": "ini.a4t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · título",
   "v": "Ayuda inmediata"
  },
  {
   "k": "ini.a4s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · texto",
   "v": "Si estás en crisis"
  },
  {
   "k": "tema.1",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 1",
   "v": "Ansiedad y ataques de pánico"
  },
  {
   "k": "tema.2",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 2",
   "v": "Tristeza o depresión"
  },
  {
   "k": "tema.3",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 3",
   "v": "Estrés y agotamiento laboral"
  },
  {
   "k": "tema.4",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 4",
   "v": "Duelo y pérdidas"
  },
  {
   "k": "tema.5",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 5",
   "v": "Autoestima e inseguridad"
  },
  {
   "k": "tema.6",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 6",
   "v": "Problemas de pareja"
  },
  {
   "k": "tema.7",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 7",
   "v": "Insomnio y sueño"
  },
  {
   "k": "tema.8",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 8",
   "v": "Crianza y conducta infantil"
  },
  {
   "k": "tema.9",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 9",
   "v": "TDAH y concentración"
  },
  {
   "k": "tema.10",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 10",
   "v": "Adicciones"
  },
  {
   "k": "tema.11",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 11",
   "v": "Relación con la comida"
  },
  {
   "k": "tema.12",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Tema 12",
   "v": "Trauma y experiencias difíciles"
  },
  {
   "k": "tema.cta",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Texto inferior",
   "v": "¿No sabes qué tipo de ayuda necesitas?"
  },
  {
   "k": "tema.ctaL",
   "pag": "inicio",
   "g": "¿Cómo te sientes? (temas)",
   "l": "Enlace inferior",
   "v": "Agenda una consulta de orientación"
  },
  {
   "k": "ini.svbtn",
   "pag": "inicio",
   "g": "Servicios",
   "l": "Texto del botón",
   "v": "Ver todos los servicios"
  },
  {
   "k": "ini.eqbtn",
   "pag": "inicio",
   "g": "Especialistas",
   "l": "Texto del botón",
   "v": "Ver a todo el equipo"
  },
  {
   "k": "ini.on1",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Punto 1",
   "v": "Atención para todo el Perú y peruanos en el extranjero"
  },
  {
   "k": "ini.on2",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Punto 2",
   "v": "El enlace de la videollamada aparece en Mi Espacio"
  },
  {
   "k": "ini.on3",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Punto 3",
   "v": "Pagas con Yape, Plin, transferencia o tarjeta"
  },
  {
   "k": "ini.on4",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Punto 4",
   "v": "Sin tráfico ni sala de espera"
  },
  {
   "k": "ini.onbtn",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Texto del botón",
   "v": "Agendar sesión online"
  },
  {
   "k": "ini.p1t",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 1 · título",
   "v": "Próximas sesiones y videollamada"
  },
  {
   "k": "ini.p1s",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 1 · texto",
   "v": "Con cuenta regresiva y el botón para entrar a tu sesión online."
  },
  {
   "k": "ini.p2t",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 2 · título",
   "v": "Paquetes de sesiones"
  },
  {
   "k": "ini.p2s",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 2 · texto",
   "v": "Cuántas sesiones usaste y cuántas te quedan."
  },
  {
   "k": "ini.p3t",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 3 · título",
   "v": "Retos del día y ejercicios guiados"
  },
  {
   "k": "ini.p3s",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 3 · texto",
   "v": "Registra tu ánimo, cumple los retos que te deja tu terapeuta, respira con ejercicios guiados y mira tu avance."
  },
  {
   "k": "ini.p4t",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 4 · título",
   "v": "Recibos, recetas y constancias"
  },
  {
   "k": "ini.p4s",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Punto 4 · texto",
   "v": "Descárgalos en PDF cuando los necesites."
  },
  {
   "k": "ini.plock",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Nota de privacidad",
   "v": "Tus notas de sesión nunca se muestran en Mi Espacio: solo las ve tu profesional."
  },
  {
   "k": "ini.pbtn",
   "pag": "inicio",
   "g": "Portal Mi Espacio",
   "l": "Texto del botón",
   "v": "Probar con un código demo"
  },
  {
   "k": "ini.q1t",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 1 · nombre",
   "v": "4 sesiones"
  },
  {
   "k": "ini.q1p",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 1 · precio",
   "v": "S/ 400"
  },
  {
   "k": "ini.q1s",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 1 · detalle del precio",
   "v": " total"
  },
  {
   "k": "ini.q1d",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 1 · texto",
   "v": "S/ 100 por sesión · vence en 2 meses"
  },
  {
   "k": "ini.q2tag",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 2 · etiqueta",
   "v": "Más elegido"
  },
  {
   "k": "ini.q2t",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 2 · nombre",
   "v": "8 sesiones"
  },
  {
   "k": "ini.q2p",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 2 · precio",
   "v": "S/ 760"
  },
  {
   "k": "ini.q2s",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 2 · detalle del precio",
   "v": " total"
  },
  {
   "k": "ini.q2d",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 2 · texto",
   "v": "S/ 95 por sesión · vence en 4 meses"
  },
  {
   "k": "ini.q3t",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 3 · nombre",
   "v": "12 sesiones"
  },
  {
   "k": "ini.q3p",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 3 · precio",
   "v": "S/ 1,080"
  },
  {
   "k": "ini.q3s",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 3 · detalle del precio",
   "v": " total"
  },
  {
   "k": "ini.q3d",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Paquete 3 · texto",
   "v": "S/ 90 por sesión · vence en 6 meses"
  },
  {
   "k": "ini.qnota",
   "pag": "inicio",
   "g": "Paquetes de sesiones",
   "l": "Nota inferior",
   "v": "Válido para terapia individual. Pregunta por paquetes de terapia de pareja, infantil y psiquiatría + terapia."
  },
  {
   "k": "ini.s1t",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 1 · título",
   "v": "Elige el servicio"
  },
  {
   "k": "ini.s1s",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 1 · texto",
   "v": "O una consulta de orientación si no sabes por dónde empezar."
  },
  {
   "k": "ini.s2t",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 2 · título",
   "v": "Presencial u online"
  },
  {
   "k": "ini.s2s",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 2 · texto",
   "v": "Escoge cómo te sientes más cómodo."
  },
  {
   "k": "ini.s3t",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 3 · título",
   "v": "Día y hora libre"
  },
  {
   "k": "ini.s3s",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 3 · texto",
   "v": "Tu cita queda confirmada al instante."
  },
  {
   "k": "ini.s4t",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 4 · título",
   "v": "Sigue todo en Mi Espacio"
  },
  {
   "k": "ini.s4s",
   "pag": "inicio",
   "g": "Cómo empezar (pasos)",
   "l": "Paso 4 · texto",
   "v": "Sesiones, tareas, paquetes y documentos."
  },
  {
   "k": "faq.q1",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 1",
   "v": "¿Psicólogo o psiquiatra: a quién debo ir?"
  },
  {
   "k": "faq.a1",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 1",
   "v": "El psicólogo te acompaña con psicoterapia; el psiquiatra es médico y puede diagnosticar e indicar medicación. Si no sabes, agenda una consulta de orientación y te recomendamos lo mejor para ti."
  },
  {
   "k": "faq.q2",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 2",
   "v": "¿La terapia online funciona igual?"
  },
  {
   "k": "faq.a2",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 2",
   "v": "Sí. Para la mayoría de personas la terapia por videollamada es tan efectiva como la presencial. Solo necesitas un lugar privado e internet."
  },
  {
   "k": "faq.q3",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 3",
   "v": "¿Lo que cuento es confidencial?"
  },
  {
   "k": "faq.a3",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 3",
   "v": "Sí. Todo lo que conversas está protegido por el secreto profesional. Tus notas clínicas solo las ve tu profesional; Mi Espacio nunca muestra notas de sesión."
  },
  {
   "k": "faq.q4",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 4",
   "v": "¿Cuánto dura una sesión y cada cuánto?"
  },
  {
   "k": "faq.a4",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 4",
   "v": "Una sesión de terapia dura 50 minutos. Al inicio suele ser semanal y luego quincenal, según tu avance."
  },
  {
   "k": "faq.q5",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 5",
   "v": "¿Qué hago si estoy en crisis?"
  },
  {
   "k": "faq.a5",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 5",
   "v": "No esperes una cita: llama gratis a la Línea 113, opción 5 (Minsa, 24 horas), al SAMU 106 o acude a la emergencia más cercana."
  },
  {
   "k": "sv.nota",
   "pag": "servicios",
   "g": "Nota de precios",
   "l": "Nota debajo de los servicios",
   "v": "Precios por sesión. Consulta por nuestros paquetes con descuento. Aceptamos Yape, Plin, transferencia y tarjeta, y emitimos boleta o factura para tu seguro."
  },
  {
   "k": "sv.masP",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Etiqueta",
   "v": "Y además"
  },
  {
   "k": "sv.masT",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Título",
   "v": "Talleres, programas"
  },
  {
   "k": "sv.masC",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Continuación (en color)",
   "v": "y documentos"
  },
  {
   "k": "es.difP",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Etiqueta",
   "v": "¿Con quién empiezo?"
  },
  {
   "k": "es.difT",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Título",
   "v": "Psicólogo y psiquiatra:"
  },
  {
   "k": "es.difC",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Título (en color)",
   "v": "mejor juntos"
  },
  {
   "k": "es.d1t",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 1 · título",
   "v": "Psicólogo(a)"
  },
  {
   "k": "es.d1p",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 1 · texto",
   "v": "Te acompaña con psicoterapia: entiendes lo que te pasa, aprendes herramientas y cambias patrones que te hacen daño."
  },
  {
   "k": "es.d2t",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 2 · título",
   "v": "Psiquiatra"
  },
  {
   "k": "es.d2p",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 2 · texto",
   "v": "Es médico: diagnostica, revisa tu salud general y, si hace falta, indica medicación y hace controles."
  },
  {
   "k": "es.d3t",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 3 · título",
   "v": "En Mente Serena"
  },
  {
   "k": "es.d3p",
   "pag": "especialistas",
   "g": "Psicólogo o psiquiatra",
   "l": "Tarjeta 3 · texto",
   "v": "Ambos trabajan en equipo y coordinan tu tratamiento. Si no sabes con quién empezar, agenda una orientación."
  },
  {
   "k": "ci.l1",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 1",
   "v": "1. ¿Qué servicio necesitas? *"
  },
  {
   "k": "ci.lm",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso de modalidad",
   "v": "2. ¿Cómo prefieres atenderte? *"
  },
  {
   "k": "ci.l2",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 3",
   "v": "3. ¿Quién es el paciente? *"
  },
  {
   "k": "ci.pref",
   "pag": "citas",
   "g": "Formulario",
   "l": "Opción de profesional",
   "v": "Cualquier profesional disponible"
  },
  {
   "k": "ci.l3",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 4",
   "v": "4. Elige el día y la hora *"
  },
  {
   "k": "ci.l4",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 5",
   "v": "5. Tus datos de contacto *"
  },
  {
   "k": "ci.btn",
   "pag": "citas",
   "g": "Formulario",
   "l": "Botón de confirmar",
   "v": "Confirmar mi cita"
  },
  {
   "k": "ci.crisis",
   "pag": "citas",
   "g": "Formulario",
   "l": "Aviso de crisis",
   "v": "Si estás en crisis o piensas en hacerte daño, no esperes la cita:"
  },
  {
   "k": "ci.sumT",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Título",
   "v": "Resumen de tu cita"
  },
  {
   "k": "ci.pnota",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota del precio",
   "v": "Pagas en el consultorio o, si es online, por Yape, Plin o transferencia antes de la sesión."
  },
  {
   "k": "ci.note",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota",
   "v": "Tu información es confidencial. Te enviaremos un recordatorio por WhatsApp y, si es online, el enlace de la videollamada."
  },
  {
   "k": "ci.codeBtn",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Botón inferior",
   "v": "¿Ya tienes código? Ver tus sesiones"
  },
  {
   "k": "mm.pill",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Etiqueta",
   "v": "Portal de pacientes"
  },
  {
   "k": "mm.t1",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Título",
   "v": "Mi"
  },
  {
   "k": "mm.t2",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Título (en color)",
   "v": "Espacio"
  },
  {
   "k": "mm.txt",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Texto",
   "v": "Ingresa tu código de paciente para ver tus próximas sesiones, entrar a tu videollamada, revisar tus paquetes y tareas, y descargar recibos, recetas y constancias."
  },
  {
   "k": "mm.btn",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Botón",
   "v": "Entrar"
  },
  {
   "k": "mm.lock",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Nota de privacidad",
   "v": "Por tu privacidad, aquí no se muestran notas de sesión. No compartas tu código."
  },
  {
   "k": "mm.help",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Ayuda",
   "v": "¿No tienes código? Te lo damos en tu primera sesión o"
  },
  {
   "k": "mm.helpL",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Enlace de ayuda",
   "v": "pídelo por WhatsApp"
  },
  {
   "k": "mm.c6",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Paquetes",
   "v": "Mis paquetes"
  },
  {
   "k": "mm.c7",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Tareas",
   "v": "Tareas entre sesiones"
  },
  {
   "k": "mm.c1",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Próximas sesiones",
   "v": "Próximas sesiones"
  },
  {
   "k": "mm.c8",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Mi avance",
   "v": "Mi avance"
  },
  {
   "k": "mm.c2",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Pagos",
   "v": "Pagos y recibos"
  },
  {
   "k": "mm.c4",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Recordatorios",
   "v": "Recordatorios"
  },
  {
   "k": "mm.c5",
   "pag": "mi-espacio",
   "g": "Panel del paciente (títulos)",
   "l": "Historial",
   "v": "Mis sesiones"
  },
  {
   "k": "no.pill",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Etiqueta",
   "v": "Nuestra historia"
  },
  {
   "k": "no.btn",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Texto del botón",
   "v": "Agendar una cita"
  },
  {
   "k": "no.vaP",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Etiqueta",
   "v": "Lo que nos mueve"
  },
  {
   "k": "no.vaT",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Título",
   "v": "Nuestros"
  },
  {
   "k": "no.vaC",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Título (en color)",
   "v": "valores"
  },
  {
   "k": "no.v1t",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 1 · título",
   "v": "Confidencialidad"
  },
  {
   "k": "no.v1p",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 1 · texto",
   "v": "Lo que compartes se queda entre tú y tu profesional."
  },
  {
   "k": "no.v2t",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 2 · título",
   "v": "Calidez"
  },
  {
   "k": "no.v2p",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 2 · texto",
   "v": "Te escuchamos sin juzgar, a tu ritmo."
  },
  {
   "k": "no.v3t",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 3 · título",
   "v": "Ciencia"
  },
  {
   "k": "no.v3p",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 3 · texto",
   "v": "Usamos tratamientos con respaldo científico."
  },
  {
   "k": "no.v4t",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 4 · título",
   "v": "Trabajo en equipo"
  },
  {
   "k": "no.v4p",
   "pag": "nosotros",
   "g": "Valores",
   "l": "Valor 4 · texto",
   "v": "Psiquiatría y psicología coordinan tu tratamiento."
  },
  {
   "k": "no.gaP",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Etiqueta",
   "v": "Nuestro espacio"
  },
  {
   "k": "no.gaT",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Título",
   "v": "Un lugar"
  },
  {
   "k": "no.gaC",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Título (en color)",
   "v": "cálido y privado"
  },
  {
   "k": "no.ga1",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 1",
   "v": "Consultorios con luz natural"
  },
  {
   "k": "no.ga2",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 2",
   "v": "Ambientes tranquilos"
  },
  {
   "k": "no.ga3",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 3",
   "v": "Privacidad en cada sesión"
  },
  {
   "k": "co.dir",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Dirección",
   "v": "Dirección"
  },
  {
   "k": "co.tel",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Teléfono",
   "v": "WhatsApp y teléfono"
  },
  {
   "k": "co.mail",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Correo",
   "v": "Correo"
  },
  {
   "k": "co.hor",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Horarios",
   "v": "Horarios"
  },
  {
   "k": "co.ls",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Días de semana",
   "v": "Lunes a sábado"
  },
  {
   "k": "co.dom",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Domingo",
   "v": "Domingos"
  },
  {
   "k": "co.em",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Crisis",
   "v": "En crisis"
  },
  {
   "k": "co.em24",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Línea de crisis",
   "v": "Línea 113, opción 5 (24 h)"
  },
  {
   "k": "co.fT",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Título",
   "v": "Escríbenos"
  },
  {
   "k": "co.fP",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Texto",
   "v": "Te respondemos por WhatsApp en horario de atención."
  },
  {
   "k": "co.btn",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Botón",
   "v": "Enviar por WhatsApp"
  },
  {
   "k": "co.crisis",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Aviso de crisis",
   "v": "Este WhatsApp no es un servicio de emergencias."
  },
  {
   "k": "pr.1t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Responsable · título",
   "v": "¿Quién es responsable de tus datos?"
  },
  {
   "k": "pr.1",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Responsable · texto",
   "v": "Mente Serena, con dirección indicada en esta web, es responsable del tratamiento de los datos personales que nos brindas."
  },
  {
   "k": "pr.2t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Datos que recopilamos · título",
   "v": "¿Qué datos usamos?"
  },
  {
   "k": "pr.2",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Datos que recopilamos · texto",
   "v": "Nombre, celular, correo, documento de identidad, edad y la información de salud necesaria para atenderte (historia clínica, evaluaciones y tratamiento)."
  },
  {
   "k": "pr.3t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Para qué los usamos · título",
   "v": "¿Para qué los usamos?"
  },
  {
   "k": "pr.3",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Para qué los usamos · texto",
   "v": "Para agendar tus citas, brindarte atención psicológica o psiquiátrica, enviarte recordatorios por WhatsApp, emitir recibos y constancias, y mostrarte tu información en Mi Espacio."
  },
  {
   "k": "pr.4t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Secreto profesional · título",
   "v": "Secreto profesional"
  },
  {
   "k": "pr.4",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Secreto profesional · texto",
   "v": "Lo que compartes en sesión está protegido por el secreto profesional. Tus notas clínicas solo las ve el profesional que te atiende; el personal administrativo solo ve tus citas y pagos. Mi Espacio nunca muestra notas de sesión."
  },
  {
   "k": "pr.5t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Menores de edad · título",
   "v": "Menores de edad"
  },
  {
   "k": "pr.5",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Menores de edad · texto",
   "v": "Para atender a menores de edad se necesita la autorización de su madre, padre o apoderado. Cuidamos su confidencialidad según su edad e informamos a los padres lo necesario para su bienestar."
  },
  {
   "k": "pr.6t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Tus derechos · título",
   "v": "Tus derechos"
  },
  {
   "k": "pr.6",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Tus derechos · texto",
   "v": "Conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, puedes pedir acceso, rectificación, cancelación u oposición al uso de tus datos escribiéndonos por WhatsApp o al correo del centro."
  }
 ],
 "imagenesFijas": [
  {
   "k": "cta",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Imagen del llamado final",
   "src": "https://images.unsplash.com/photo-1566815974688-89f997e0fccf?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "on.img",
   "pag": "inicio",
   "g": "Terapia online",
   "l": "Foto de terapia online",
   "src": "https://images.unsplash.com/photo-1681052184483-c2de90f56ca6?auto=format&fit=crop&w=900&q=80"
  },
  {
   "k": "mm.img",
   "pag": "mi-espacio",
   "g": "Ingreso con código",
   "l": "Imagen del ingreso",
   "src": "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?auto=format&fit=crop&w=900&q=80"
  },
  {
   "k": "ga.1",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 1",
   "src": "https://images.unsplash.com/photo-1541533260371-b8fc9b596d84?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "ga.2",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 2",
   "src": "https://images.unsplash.com/photo-1546387903-6d82d96ccca6?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "ga.3",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 3",
   "src": "https://images.unsplash.com/photo-1581284943246-0eb528155992?auto=format&fit=crop&w=700&q=80"
  }
 ],
 "iconos": {
  "leaf": "<path d=\"M11 20A7 7 0 0 1 4 13c0-6 6-10 16-10 0 10-4 16-10 16\"/><path d=\"M4 21c3-6 7-9 12-11\"/>",
  "brain": "<path d=\"M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4 2 2 0 0 0 3-1V5a2 2 0 0 0-3-2z\"/><path d=\"M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4 2 2 0 0 1-3-1\"/>",
  "chat": "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z\"/><path d=\"M8.5 11h.01M12 11h.01M15.5 11h.01\"/>",
  "couple": "<circle cx=\"8\" cy=\"7\" r=\"3\"/><circle cx=\"16\" cy=\"7\" r=\"3\"/><path d=\"M2 21a6 6 0 0 1 12 0M10 21a6 6 0 0 1 12 0\"/>",
  "family": "<circle cx=\"7\" cy=\"6\" r=\"2.5\"/><circle cx=\"17\" cy=\"6\" r=\"2.5\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M3 21v-5a4 4 0 0 1 8 0M13 21v-5a4 4 0 0 1 8 0M9.5 21v-2a2.5 2.5 0 0 1 5 0v2\"/>",
  "kid": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01\"/>",
  "clipboard": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 2h6v4H9zM9 11h6M9 15h4\"/>",
  "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M16 8l-2 6-6 2 2-6z\"/>",
  "video": "<rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\"/><path d=\"M16 10l6-3v10l-6-3z\"/>",
  "pill": "<path d=\"M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z\"/><path d=\"M8.5 8.5l7 7\"/>",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/>",
  "moon": "<path d=\"M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z\"/>",
  "wave": "<path d=\"M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0\"/>",
  "lifebuoy": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M4.9 4.9l4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3\"/>",
  "spark": "<path d=\"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z\"/>",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>",
  "flame": "<path d=\"M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7z\"/>",
  "bolt": "<path d=\"M13 2L4 14h7l-1 8 9-12h-7z\"/>",
  "cloud": "<path d=\"M17.5 19H8a6 6 0 1 1 1.3-11.9A5 5 0 0 1 19 9a5 5 0 0 1-1.5 10z\"/>",
  "anchor": "<circle cx=\"12\" cy=\"5\" r=\"3\"/><path d=\"M12 8v14M5 12H2a10 10 0 0 0 20 0h-3\"/>",
  "mug": "<path d=\"M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z\"/><path d=\"M6 1v3M10 1v3M14 1v3\"/>",
  "building": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><path d=\"M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01\"/>",
  "chart": "<path d=\"M3 3v18h18\"/><path d=\"M7 15l4-4 3 3 5-6\"/>",
  "task": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"/><path d=\"M8 12l3 3 5-6\"/>",
  "box": "<path d=\"M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4.3-4.3\"/>",
  "shield": "<path d=\"M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z\"/><path d=\"M9 12l2 2 4-4\"/>",
  "cal": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\"/>",
  "key": "<circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\"/><path d=\"M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3\"/>",
  "phone": "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z\"/>",
  "pin": "<path d=\"M12 22s8-7.6 8-13a8 8 0 0 0-16 0c0 5.4 8 13 8 13z\"/><circle cx=\"12\" cy=\"9\" r=\"3\"/>",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>",
  "mail": "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"M22 6l-10 7L2 6\"/>",
  "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
  "x": "<path d=\"M18 6L6 18M6 6l12 12\"/>",
  "arrow": "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
  "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.9 1.9 0 0 0 3.4 0\"/>",
  "file": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><path d=\"M14 2v6h6\"/>",
  "heart": "<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z\"/>",
  "star": "<path d=\"M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z\"/>",
  "users": "<circle cx=\"9\" cy=\"8\" r=\"4\"/><path d=\"M1 21a8 8 0 0 1 16 0M17 4a4 4 0 0 1 0 8M23 21a8 8 0 0 0-5-7.4\"/>",
  "award": "<circle cx=\"12\" cy=\"8\" r=\"6\"/><path d=\"M8.2 13.4L7 22l5-3 5 3-1.2-8.6\"/>",
  "card": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M2 10h20\"/>",
  "print": "<path d=\"M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"/>",
  "out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9\"/>",
  "history": "<path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5M12 7v5l4 2\"/>",
  "check": "<path d=\"M5 12l5 5L20 7\"/>",
  "lock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>",
  "smile": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14a5 5 0 0 0 8 0M9 9h.01M15 9h.01\"/>",
  "home": "<path d=\"M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"/>",
  "chair": "<path d=\"M6 10V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4M4 10h16v5H4zM6 15v6M18 15v6\"/>",
  "paw": "<path d=\"M11 20A7 7 0 0 1 4 13c0-6 6-10 16-10 0 10-4 16-10 16\"/><path d=\"M4 21c3-6 7-9 12-11\"/>"
 }
};
