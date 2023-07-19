let cont = 0;
let rss = [];
let newChart = null;
let isRecording = false;

function adaptarAnchoInput() {
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  const label = myInput.shadowRoot.querySelector("label");
  const texto = label.textContent;
  const longitudTexto = texto.length;
  const ancho = longitudTexto * 10; // Ajusta el factor de escala según tus necesidades
  input.style.width = `${ancho}px`;
}

function adaptarAnchoBtn() {
  const btn = document.querySelectorAll("button");
  btn.forEach((element) => {
    const texto = element.textContent;
    const longitudTexto = texto.length;
    const ancho = longitudTexto * 7; // Ajusta el factor de escala según tus necesidades
    element.style.width = `${ancho}px`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  adaptarAnchoBtn();
  adaptarAnchoInput();
});

//Implementar reconocimiento de voz

function record() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.onresult = (event) => {
    let texto = "";

    for (const result of event.results) {
      texto = result[0].transcript;
    }

    let textoAux = "";

    for (let i = 0; i < texto.length; i++) {
      textoAux += texto[i];
      if (i % 20 === 0 && i > 0) {
        if (texto !== " ") {
          textoAux += "_<br>";
        } else {
          textoAux += "<br>";
        }
      }
    }
    let resultado = document.getElementById("texto-dictado");
    if (resultado != "") {
      const ans = document.getElementById("card");
      ans.style.display = "flex";
      resultado.innerHTML = textoAux;
    }
  };

  toggleRecording(recognition);
}

function toggleRecording(recognition) {
  let spanBoton = document.getElementById("btn-voz");

  if (isRecording) {
    // Detener la grabación
    recognition.stop();
    spanBoton.innerHTML = "Iniciar";
    isRecording = false;
  } else {
    // Iniciar la grabación
    recognition.start();
    spanBoton.innerHTML = "Detener";
    isRecording = true;
  }
}

// Crear una ruleta rusa de colores con random

function cleanInput() {
  const input = document.getElementById("n0");
  const val = input.shadowRoot.querySelector("input");
  val.value = "";
}

function readNums() {
  let f = true;
  const input = document.getElementById("n0");
  let val = input.shadowRoot.querySelector("input").value;
  const c = [
    "Celeste",
    "Azul",
    "Morado",
    "Rosa",
    "Amarillo",
    "Negro",
    "Verde claro",
    "Verde",
    "Naranja",
    "Rojo",
    "Café",
    "Gris",
  ];
  if (!patt(val)) {
    alert("Ingrese un color");
    f = false;
  } else {
    let color = "";
    color = val[0].toUpperCase();
    for (let i = 1; i < val.length; i++) {
      color += val[i].toLowerCase();
    }
    val = color;
    const index = c.indexOf(val);
    if (index !== -1) {
    } else {
      alert("Ingrese un color de la ruleta");
      f = false;
    }
  }
  return { f, val };
}

const roulette = document.querySelector("#roulette");
const spinButton = document.querySelector(".spin");
const resetButton = document.querySelector(".reset");

const maxSpins = 10;
const minSpins = 1;

const maxDegrees = 360;
const minDegrees = 1;

const randomColor = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let deg = 0;
let timeoutId = 0;

spinButton.addEventListener("click", () => {
  const { f, val } = readNums();
  if (f) {
    const res = document.getElementById("ans");
    const spins = randomColor(minSpins, maxSpins);
    const degrees = randomColor(minDegrees, maxDegrees);

    const fullSpins = (spins - 1) * 360;
    const spin = fullSpins + degrees;

    const animationTime = spins;

    roulette.style.transform = `rotate(${spin}deg)`;
    roulette.style.transitionDuration = `${animationTime}s`;

    spinButton.style.display = "none";
    resetButton.style.display = "inline-block";
    deg = spin;
    while (deg > 360) {
      deg -= 360;
    }
    console.log(`Grados: ${deg}`);
    console.log(`Animación: ${animationTime}`);
    let time = animationTime * 1000;

    setTimeout(() => {
      if (colors(deg) == val) {
        res.innerHTML = "FELICIDADES, HAS GANADO";
      } else {
        res.innerHTML = "PERDISTE";
      }
    }, time);
  }
});

function colors(deg) {
  if (deg >= 0 && deg <= 30) {
    return "Celeste";
  } else if (deg >= 31 && deg <= 60) {
    return "Azul";
  } else if (deg >= 61 && deg <= 90) {
    return "Morado";
  } else if (deg >= 91 && deg <= 120) {
    return "Rosa";
  } else if (deg >= 121 && deg <= 150) {
    return "Amarillo";
  } else if (deg >= 151 && deg <= 180) {
    return "Negro";
  } else if (deg >= 181 && deg <= 210) {
    return "Verde claro";
  } else if (deg >= 211 && deg <= 240) {
    return "Verde";
  } else if (deg >= 241 && deg <= 270) {
    return "Naranja";
  } else if (deg >= 271 && deg <= 300) {
    return "Rojo";
  } else if (deg >= 301 && deg <= 330) {
    return "Café";
  } else if (deg >= 331 && deg <= 360) {
    return "Gris";
  }
}

resetButton.addEventListener("click", () => {
  const ans = document.getElementById("ans");
  ans.innerHTML = "";
  roulette.style.transform = "rotate(0deg)";
  roulette.style.transitionDuration = "2s";
  spinButton.style.display = "inline-block";
  resetButton.style.display = "none";
  cleanInput();
});

// 14. Un laboratorio de Física de la atmósfera trabajan N investigadores.
// Cada uno de ellos realiza mediciones de temperatura los días lunes, martes, miércoles, jueves y viernes, dichos valores varían entre 0 y 10.
// Confeccione un programa para:
// Imprimir una tabla en la que aparezca, el nombre, la cantidad de mediciones y la temperatura media de cada investigador.
// Imprimir la temperatura media en el laboratorio y cuántas mediciones de las realizadas por cada investigador fueron superiores a la media.
// Mostrar un gráfico de barras que representen la temperatura media determinada por cada investigador

//verificar patrón
function patt(text) {
  const patron = /[A-Za-z]+/;
  return patron.test(text);
}

function readNums2() {
  let f = true;
  let styleF = `transform: translateY(-85%) scale(0.8);
  background-color: transparent;
  padding: 0 0.2em;
  color: #2196f3;`;

  const myInputn = document.getElementById("name");
  const inputn = myInputn.shadowRoot.querySelector("input");
  const lbn = myInputn.shadowRoot.querySelector("label");
  let name = inputn.value;

  if (!patt(name)) {
    lbn.style = styleF;
    alert("Ingrese el nombre");
    f = false;
  } else if (name == "") {
    lbn.style = styleF;
    alert("Ingrese el nombre");
    f = false;
  }

  const myInputm = document.getElementById("monday");
  const inputm = myInputm.shadowRoot.querySelector("input");
  const lbm = myInputm.shadowRoot.querySelector("label");
  let monday = inputm.value;

  if (isNaN(monday)) {
    alert(`Ingrese la medición del lunes`);
    f = false;
  } else if (
    parseFloat(monday) < inputm.min ||
    parseFloat(monday) > inputm.max ||
    monday == "-0"
  ) {
    alert("1 Las mediciones deben estar entre 0 y 10");
    lbm.style = styleF;
    f = false;
  }

  const myInputt = document.getElementById("tuesday");
  const inputt = myInputt.shadowRoot.querySelector("input");
  const lbt = myInputt.shadowRoot.querySelector("label");
  let tuesday = inputt.value;

  if (isNaN(tuesday)) {
    alert(`Ingrese la medición del martes`);
    f = false;
  } else if (
    parseFloat(tuesday) < inputt.min ||
    parseFloat(tuesday) > inputt.max ||
    tuesday == "-0"
  ) {
    alert("2 Las mediciones deben estar entre 0 y 10");
    lbt.style = styleF;
    f = false;
  }

  const myInputw = document.getElementById("wednesday");
  const inputw = myInputw.shadowRoot.querySelector("input");
  const lbw = myInputw.shadowRoot.querySelector("label");
  let wednesday = inputw.value;

  if (isNaN(wednesday)) {
    alert(`Ingrese la medición del miércoles`);
    f = false;
  } else if (
    parseFloat(wednesday) < inputw.min ||
    parseFloat(wednesday) > inputw.max ||
    wednesday == "-0"
  ) {
    alert("3 Las mediciones deben estar entre 0 y 10");
    lbw.style = styleF;
    f = false;
  }

  const myInputh = document.getElementById("thursday");
  const inputh = myInputh.shadowRoot.querySelector("input");
  const lbh = myInputh.shadowRoot.querySelector("label");
  let thursday = inputh.value;

  if (isNaN(thursday)) {
    alert(`Ingrese la medición del jueves`);
    f = false;
  } else if (
    parseFloat(thursday) < inputh.min ||
    parseFloat(thursday) > inputh.max ||
    thursday == "-0"
  ) {
    alert("4 Las mediciones deben estar entre 0 y 10");
    lbh.style = styleF;
    f = false;
  }

  const myInputf = document.getElementById("friday");
  const inputf = myInputf.shadowRoot.querySelector("input");
  const lbf = myInputf.shadowRoot.querySelector("label");
  let friday = inputf.value;

  if (isNaN(friday)) {
    alert(`Ingrese la medición del viernes`);
    f = false;
  } else if (
    parseFloat(friday) < inputf.min ||
    parseFloat(friday) > inputf.max ||
    friday == "-0"
  ) {
    alert("5 Las mediciones deben estar entre 0 y 10");
    lbf.style = styleF;
    f = false;
  }

  let ms = [monday, tuesday, wednesday, thursday, friday];
  let cont = 0;
  let sum = 0;
  ms.forEach((e) => {
    if (e > 0) {
      sum += parseFloat(e);
      cont++;
    }
  });

  let m = sum / cont; //cantidad de mediciones
  // se crea un objeto con la información del investigador
  const obj = {
    name: name,
    mediciones: ms,
    mediaMediciones: m,
    cantMediciones: cont,
  };
  return { f, obj };
}

function exe1() {
  const { f, obj } = readNums2();
  if (f) {
    let existe = rss.find((element) => element.name === obj.name);
    if (existe) alert("El investigador ya existe");
    else {
      rss.push(obj);
      generarTabla(rss);
      showField("field");
      showBtn("temp");
      showBtn("graph");
    }
  }
}

function showField(id) {
  const fieldset = document.getElementById(id);
  fieldset.style.display = "flex";
}

function showBtn(id) {
  const btn = document.querySelectorAll("button");
  btn.forEach((element) => {
    if (element.classList == id) element.style.display = "inline";
  });
}

//1. Nombre investigador, media de mediciones, cantidad de mediciones
function generarTabla(datos) {
  const tabla = document.createElement("table");
  tabla.classList.add("tabla-estilos"); // Agrega una clase para aplicar los estilos

  // Crea la fila de encabezado
  const encabezado = tabla.createTHead().insertRow();
  encabezado.insertCell().textContent = "Nombre";
  encabezado.insertCell().textContent = "Media de mediciones";
  encabezado.insertCell().textContent = "Cantidad de mediciones";

  // Itera sobre los datos y crea las filas de datos
  datos.forEach((objeto) => {
    const fila = tabla.insertRow();
    fila.insertCell().textContent = objeto.name;
    fila.insertCell().textContent = objeto.mediaMediciones;
    fila.insertCell().textContent = objeto.cantMediciones;
  });

  // Agrega la tabla al elemento HTML deseado
  const contenedorTabla = document.getElementById("tabla-container");
  contenedorTabla.innerHTML = "";
  contenedorTabla.appendChild(tabla);
}

//2. Media de laboratorio, cantidad de mediciones por investigadores mayor a la media
function lit2() {
  const lb = document.getElementById("ans");
  let mc = {};
  let lab = [];
  let tm = 0; //mediciones
  let medialab = 0; // media del laboratorio
  let cont = rss.length;
  rss.forEach((obj) => {
    tm += parseFloat(obj.mediaMediciones); // sumatoria mediciones
  });

  medialab = tm / cont; //Media del laboratorio

  //cantidad de mediciones por investigadores mayor a la medía
  rss.forEach((element) => {
    let contm = 0;
    element.mediciones.forEach((element) => {
      if (element > medialab) {
        contm++;
      }
    });
    //se crea un objeto
    mc = {
      name: element.name, // nombre de investigador
      cantMe: contm, //  cantidad de mediciones mayor a la media
    };
    //y se guarda en un array
    lab.push(mc);
  });

  lb.innerHTML = `Temperatura media del laboratorio ${medialab}`;
  //se genera la tabla
  generarTabla2(lab);
  showField("field2");
}

function generarTabla2(datos) {
  const tabla = document.createElement("table");
  tabla.classList.add("tabla-estilos"); // Agrega una clase para aplicar los estilos

  // Crea la fila de encabezado
  const encabezado = tabla.createTHead().insertRow();
  encabezado.insertCell().textContent = "Nombre";
  encabezado.insertCell().textContent =
    "Cantidad de mediciones mayor a la media";

  // Itera sobre los datos y crea las filas de datos
  datos.forEach((objeto) => {
    const fila = tabla.insertRow();
    fila.insertCell().textContent = objeto.name;
    fila.insertCell().textContent = objeto.cantMe;
  });

  // Agrega la tabla al elemento HTML deseado
  const contenedorTabla = document.getElementById("tabla-container2");
  contenedorTabla.innerHTML = "";
  contenedorTabla.appendChild(tabla);
}

// gráfico de barras

function graph() {
  const div = document.getElementById("cnv");
  div.style.display = "flex";

  if (newChart) {
    newChart.clear();
    newChart.destroy();
  }

  const names = rss.map((element) => {
    return element.name;
  });

  const media = rss.map((element) => {
    return element.mediaMediciones;
  });

  const data = {
    labels: names,
    datasets: [
      {
        label: "Mediciones",
        data: media,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  let cnv = document.getElementById("mychart");
  newChart = new Chart(cnv, config);
}
