//Alternativos
//1.	Un avión emplea 10 minutos para despegar del aeropuerto internacional “Mariscal Sucre”, vuela de forma estable  durante n minutos y emplea 15 segundos en aterrizar. Confecciona un programa para imprimir en qué fase del vuelo se encuentra el avión a los t minutos del despegue. Imprima , además, la duración del vuelo en horas, minutos y segundos.

function readNums6() {
  let TiempoVuelo, TiempoTranscurrido;
  let f = true;
  TiempoVuelo = document.getElementById("n1").value;
  if (TiempoVuelo >= 1140) {
    alert("No existe un vuelo con ese tiempo");
    document.getElementById("n1").value = "";
    f = false;
  } else {
    if (isNaN(TiempoVuelo)) {
      alert("Ingrese el Tiempo de Vuelo");
      document.getElementById("n1").value = "";
      f = false;
    } else {
      if (TiempoVuelo < 0 || TiempoVuelo == "-0") {
        alert("El Tiempo de Vuelo debe ser positivo");
        document.getElementById("n1").value = "";
        f = false;
      }
    }
    TiempoTranscurrido = document.getElementById("n2").value;
    if (isNaN(TiempoTranscurrido)) {
      alert("Ingrese el Tiempo Transcurrido");
      document.getElementById("n2").value = "";
      f = false;
    } else {
      if (TiempoTranscurrido < 0 || TiempoTranscurrido == "-0") {
        alert("El Tiempo Transcurrido debe ser positivo");
        document.getElementById("n2").value = "";
        f = false;
      }
    }
  }
  return { f, TiempoVuelo, TiempoTranscurrido };
}

function flightPhase(t, n) {
  const mIni = 10;
  const mFin = 15 / 60;
  let phase = "";
  // The different phases of flight
  const phases = ["despegando", "volando", "aterrizando", "en tierra"];

  // The total time of the flight
  const totalTime = n + mIni;

  // The current phase of flight
  if (t > totalTime + mFin) {
    phase = phases[3];
  } else {
    if (t == 0) {
      phase = phases[3];
    } else if (t <= mIni) {
      phase = phases[0];
    } else if (t >= n && t <= totalTime) {
      phase = phases[2];
    } else {
      phase = phases[1];
    }
  }

  //duración del vuelo
  const duration = {
    hours: Math.floor(t / 60),
    minutes: Math.floor(t % 60) + 10,
    seconds: (t % 60) + 15 / 60,
  };

  return { phase, duration };
}

function ej6() {
  document.getElementById("ans").innerHTML = "";
  const { f, TiempoVuelo, TiempoTranscurrido } = readNums6();
  const { phase, duration } = flightPhase(TiempoTranscurrido, TiempoVuelo);
  if (f) {
    document.getElementById("ans").innerHTML = `El avión está ${phase} \n
    Horas: ${duration.hours}, Minutos: ${
      duration.minutes
    }, Segundos: ${duration.seconds.toFixed(2)}`;
  }
}

//2.	Crear un programa en js para un ejemplo de un  Web component.

class MyInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Crea un shadow DOM para encapsular el componente
    this.value = ""; // Propiedad para almacenar el valor del input
    this.textContent = this.textContent;
  }

  connectedCallback() {
    this.render(); // Renderiza el componente
    this.addEventListeners(); // Agrega los listeners de eventos

    if (this.hasAttribute("id")) {
      const input = this.shadowRoot.querySelector("input");
      const id = this.getAttribute("id");
      input.setAttribute("id", id);
    }

    if (this.hasAttribute("class-i")) {
      const input = this.shadowRoot.querySelector("input");
      const customClass = this.getAttribute("class-i");
      input.classList.add(customClass); // Utiliza classList.add() para agregar la clase
    }

    if (this.hasAttribute("class-l")) {
      const label = this.shadowRoot.querySelector("label");
      const customClass = this.getAttribute("class-l");
      label.classList.add(customClass); // Utiliza classList.add() para agregar la clase
    }

    if (this.hasAttribute("class-d")) {
      const div = this.shadowRoot.querySelector("div");
      const customClass = this.getAttribute("class-d");
      div.classList.add(customClass); // Utiliza classList.add() para agregar la clase
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .input-group {
        position: relative;
        margin: 0 0 20px 0;
      }

      .input {
        border: solid 1.5px #9e9e9e;
        border-radius: 1rem;
        background: none;
        padding: 1rem;
        font-size: 1rem;
        color: #f5f5f5;
        transition: border 150ms cubic-bezier(0.4,0,0.2,1);
      }

      .user-label {
        position: absolute;
        left: 15px;
        color: #e8e8e8;
        pointer-events: none;
        transform: translateY(1rem);
        transition: 150ms cubic-bezier(0.4,0,0.2,1);
      }

      .input:focus, input:valid {
        outline: none;
        border: 1.5px solid #1a73e8;
      }

      .input:focus ~ label, input:valid ~ label {
        transform: translateY(-85%) scale(0.8);
        background-color: transparent;
        padding: 0 .2em;
        color: #2196f3;
      }
    </style>
      <div>
        <input type="text" required="" value="${this.value}">
        <label>${this.textContent}</label>
      </div>
      `;
  }

  addEventListeners() {
    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("input", this.handleInput.bind(this));
  }

  handleInput(event) {
    this.value = event.target.value; // Actualiza el valor del input en la propiedad del componente
  }

  static get observedAttributes() {
    return ["value"]; // Define los atributos que se observarán
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      const input = this.shadowRoot.querySelector("input");
      input.value = newValue; // Actualiza el valor del input cuando cambia el atributo
    }
  }
}

customElements.define("my-input", MyInput);

function eja() {
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  const value = parseInt(input.value);

  if (isNaN(value)) {
    alert("Ingrese un número");
    input.value = ""; // Limpiar el valor del input si es NaN
  } else {
    input.value = ""; // Limpiar el valor del input
    document.getElementById(
      "ans"
    ).innerHTML = `El número ingresado es: ${value}`;
  }
}

//3.	Confeccione un programa para calcular las raíces reales de una ecuación de la forma ax2 + bx +c

function readNums7() {
  let a, b, c;
  let f = true;
  a = parseInt(document.getElementById("a").value);
  if (isNaN(a)) {
    alert("Ingrese el valor de a");
    document.getElementById("a").value = "";
    f = false;
  }
  b = parseInt(document.getElementById("b").value);
  if (isNaN(b)) {
    alert("Ingrese el valor de b");
    document.getElementById("b").value = "";
    f = false;
  }
  c = parseInt(document.getElementById("c").value);
  if (isNaN(c)) {
    alert("Ingrese el valor de c");
    document.getElementById("c").value = "";
    f = false;
  }
  return { f, a, b, c };
}

function calcularRaices(a, b, c) {
  const discriminante = b ** 2 - 4 * a * c;
  if (a == 0) {
    return -1 * (c / b);
  } else {
    if (discriminante < 0) {
      return "Raíces imaginarias";
    } else {
      if (discriminante > 0) {
        const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        return [raiz1, raiz2];
      } else if (discriminante === 0) {
        const raiz = -b / (2 * a);
        return raiz;
      } else {
        return "No existen raíces reales";
      }
    }
  }
}

function ej7() {
  const { f, a, b, c } = readNums7();
  if (f) {
    const raices = calcularRaices(a, b, c);
    if (raices.length == 2) {
      const r1 = raices[0];
      const r2 = raices[1];
      document.getElementById("ans").innerHTML = `Las raíces son: ${r1.toFixed(
        2
      )} y ${r2.toFixed(2)}`;
    } else {
      document.getElementById("ans").innerHTML = `La raíz es: ${raices.toFixed(
        2
      )}`;
    }
  }
}

// 4.	Una compañía dedicada al alquiler de automóviles cobra un monto fijo de $300000 para los primeros 300 km de recorrido. Para más de 300 km y hasta 1000 km, cobra un monto adicional de $ 15.000 por cada kilómetro en exceso sobre 300. Para más de 1000 km cobra un monto adicional de $ 10.000 por cada kilómetro en exceso sobre 1000. Los precios ya incluyen el 20% del impuesto general a las ventas, IVA. Diseñe un programa que determine el monto a pagar por el alquiler de un vehículo y el monto incluido del impuesto.

function readNums8() {
  let km = 0;
  let f = true;
  const myInput = document.getElementById("km");
  const input = myInput.shadowRoot.querySelector("input");
  km = input.value;

  if (isNaN(km)) {
    alert("Ingrese los kilómetros recorridos");
    input.value = "";
    f = false;
  } else if (km == 0) {
    alert("Los kilómetros deben ser mayor a 0");
    input.value = "";
    f = false;
  } else if (km < 0) {
    alert("Ingrese datos positivos");
    input.value = "";
    f = false;
  }
  return { f, km };
}

function calcMonto(kms) {
  const TARIFA = 300000;
  const EXCESO_300 = 15000;
  const EXCESO_1000 = 10000;
  let monto = 0;
  if (kms > 300) {
    if (kms <= 1000) {
      monto = TARIFA + EXCESO_300 * (kms - 300);
    } else {
      monto = TARIFA + EXCESO_1000 * (kms - 1000) + EXCESO_300 * 700;
    }
  } else {
    monto = TARIFA;
  }

  return `El monto a pagar es: $${monto}`;
}

function ej8() {
  const { f, km } = readNums8();
  if (f) {
    document.getElementById("ans").innerHTML = calcMonto(km);
  }
}

// 5.	Calcule la edad de una persona conociendo su fecha de nacimiento en día, mes y año

let day, month, year;

function readNums9() {
  let f = true;
  const fechaInput = document.getElementById("date").value;
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener la fecha de nacimiento a partir del campo de entrada
  let fechaNacimiento = new Date(fechaInput);
  fechaNacimiento = new Date(
    fechaNacimiento.getFullYear(),
    fechaNacimiento.getMonth(),
    fechaNacimiento.getDate() + 1
  );

  let msj = "";

  fechaNacimiento.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  if (isNaN(fechaNacimiento)) {
    msj = "Ingrese una edad";
  } else if (fechaNacimiento.getTime() == fechaActual.getTime()) {
    msj = "Fechas iguales";
  } else if (fechaNacimiento.getTime() > fechaActual.getTime()) {
    msj = "Fechas de nacimiento mayor a la actual";
  } else {
    msj = calcularEdad(
      fechaNacimiento.getDate(),
      fechaNacimiento.getMonth(),
      fechaNacimiento.getFullYear()
    );
  }
  return { f, msj };
}

function calcularEdad(day, month, year) {
  let edad = {};
  const fechaActual = new Date();
  let msj = "";
  if (year > fechaActual.getFullYear()) {
    alert("Ingrese un año correcto");
    input.value = "";
  } else {
    edad.anios = fechaActual.getFullYear() - year;
    edad.meses = fechaActual.getMonth() - month;
    edad.dias = fechaActual.getDate() - day;

    if (edad.meses < 0 || (edad.meses === 0 && edad.dias < 0)) {
      edad.anios--;
      edad.meses += 12;
    }
    if (edad.dias < 0) {
      const ultimoDiaMesAnterior = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        0
      ).getDate();
      edad.meses--;
      edad.dias += ultimoDiaMesAnterior;
    }

    msj = `La edad es: ${edad.anios} años, ${edad.meses} meses y ${edad.dias} días`;
  }
  return msj;
}

function ej9() {
  const { f, msj } = readNums9();
  if (f) {
    document.getElementById("ans").innerHTML = `${msj}`;
  }
}

// 6.	Calificación de un examen: Escribe un programa que le pide al usuario ingresar la calificación de un examen (un número entre 0 y 100) e imprime su equivalente en letras según la siguiente escala:
// •	90-100 A
// •	80-89  B
// •	70-79 C
// •	60-69 D
// •	0-59 F

function readNums10() {
  let nota = 0;
  let f = true;
  const input = document.getElementById("n1");
  nota = input.value;
  if (isNaN(nota)) {
    alert("Ingrese la calificación");
    input.value = "";
    f = false;
  } else if (nota > 100 || nota < 0 || nota == "-0") {
    alert("La calificación debe estar entre 0 y 100");
    input.value = "";
    f = false;
  }
  return { f, nota };
}

function calcEscala(calf) {
  if (calf > 59) {
    if (calf < 70) {
      return `La equivalencia es: D`;
    } else {
      if (calf < 90) {
        return `La equivalencia es: C`;
      } else {
        return `La equivalencia es: A`;
      }
    }
  } else {
    return `La equivalencia es: F`;
  }
}

function ej10() {
  const { f, nota } = readNums10();
  if (f) {
    document.getElementById("ans").innerHTML = calcEscala(nota);
  }
}
