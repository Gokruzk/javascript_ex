let counter = 0;
let intervalId;
let lit = [];
let running = false;

// 7. Escriba un programa que despliegue todos los subconjuntos no vacíos del
//       conjunto de los números del 1 a n. Por ejemplo, si n = 3, debe obtenerse:
//       [ [1] [2] [3] [1 2] [1 3] [2 3] [1 2 3] ]

const readNums1 = () => {
  let f = true;
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  let n = input.value;
  let nsplit = n.split(".");
  if (nsplit.length > 1) {
    alert("ingrese un número entero");
    input.value = "";
    f = false;
  } else {
    if (isNaN(n)) {
      alert("Ingrese un número");
      input.value = "";
      f = false;
    } else if (n <= 0) {
      alert("Ingrese datos positivos y mayor que 0");
      input.value = "";
      f = false;
    } else if (n >= 13) {
      alert("Ingrese un número menor a 13");
      input.value = "";
      f = false;
    }
  }
  return { f, n };
};

const exe = () => {
  const result = document.getElementById("sets");
  result.textContent = "";
  const { f, n } = readNums1();
  if (f) {
    showCard();
    let numbers = [];
    for (let i = 1; i <= n; i++) {
      numbers.push(i);
    }
    subSets(numbers, [], result);
    adaptarCard(n);
  }
};

const showCard = () => {
  const card = document.getElementById("card");
  card.style.display = "flex";
};

const hideCard = () => {
  const card = document.getElementById("card");
  card.style.display = "none";
};

const refresh = () => {
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  const result = document.getElementById("sets");

  result.innerHTML = "";
  input.value = "";
  hideCard();
};

function adaptarCard(n) {
  const p = document.getElementById("sets");
  const card = document.getElementById("card");
  const texto = p.textContent;
  let longitudTexto = texto.length;
  if (n > 5) {
    longitudTexto /= 2; // Ajusta el factor de escala según tus necesidades
  }
  card.style.height = `${longitudTexto}px`;
}

const subSets = (numbers, subset, result) => {
  if (subset.length > 0) result.innerHTML += "[" + subset.join(" ") + "] ";

  loop(0, numbers, subset, result);
};

const loop = (i, n, subset, result) => {
  if (i < n.length) {
    let newNumbers = n.slice(i + 1);
    let newSubset = subset.concat(n[i]);
    subSets(newNumbers, newSubset, result);
    loop(i + 1, n, subset, result);
  }
};

// 8. En una gasolinera se instala un detector para controlar la cantidad de litros de gasolina que va despachando el pistero. Se conoce que al comenzar el turno de trabajo en el tanque de gasolina hay N litros.
// Confeccione un programa para conocer constantemente.
//     La cantidad de vehículos atendidos.
//     La cantidad de dinero recaudado si cada litro de gasolina especial cuesta $1,25 ctvos. de dólar.
//     Cuál es la mayor cantidad de gasolina despachada a un vehículo

function readNums2() {
  let f = true;
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  let gas = input.value;
  let nsplit = gas.split(".");

  if (nsplit.length > 1) {
    alert("ingrese un número entero");
    input.value = "";
    f = false;
  } else {
    if (isNaN(gas)) {
      alert("Ingrese un número");
      input.value = "";
      f = false;
    } else if (gas <= 0) {
      alert("Ingrese datos positivos y mayor que 0");
      input.value = "";
      f = false;
    }
  }
  return { f, gas };
}

function showBtn() {
  const btn = document.getElementById("calc");
  btn.style.display = "inline";
}

function hideBtn() {
  const btn = document.getElementById("calc");
  btn.style.display = "none";
}

function increment() {
  let counterElement = document.getElementById("ans");
  const input = document.getElementById("n0");
  const gas = input.shadowRoot.querySelector("input");
  if (gas.value == 0) {
    alert("Se acabó la gasolina");
    stop();
  } else {
    counterElement.innerHTML = `Litros: ${counter + 1}`;
    gas.value -= 1;
    counter++;
  }
  return counter;
}

function startCounter() {
  intervalId = setInterval(increment, 200); // Incrementa cada 200 milisegundos
}

function stopCounter() {
  clearInterval(intervalId);
}

function start() {
  const { f, gas } = readNums2();
  if (f) {
    console.log(gas);
    if (running) {
      alert("Antes de empezar a llenar de nuevo, detenga el llenado");
    } else {
      counter = 0;
      running = true;
      startCounter();
      hideBtn();
    }
  }
}

function stop() {
  if (running) {
    running = false;
    stopCounter();
    lit.push(increment());
    showBtn();
  }
}

function calcGas(lit) {
  let n = 0;
  lit.forEach((element) => {
    n += element;
  });
  let recaudado = n * 1.25;
  let l = lit.length;
  return { recaudado, l };
}

function exe1() {
  let recaudado = calcGas(lit).recaudado;
  let cars = calcGas(lit).l;
  let counterElement = document.getElementById("ans2");
  counterElement.innerHTML = `Cantidad de vehículos atendidos: ${cars} <br> Cantidad de dinero recaudado: $${recaudado}`;
}

//9. De dos matrices, encontrar el mensaje oculto

function printM(matriz, id) {
  const tabla = document.getElementById(id);
  tabla.classList.add("tabla-estilos");
  // Generar el contenido HTML de la tabla
  let contenidoTabla = "";
  for (let i = 0; i < matriz.length; i++) {
    contenidoTabla += "<tr>";
    for (let j = 0; j < matriz[i].length; j++) {
      contenidoTabla += "<td>" + matriz[i][j] + "</td>";
    }
    contenidoTabla += "</tr>";
  }

  // Asignar el contenido a la tabla
  tabla.innerHTML = contenidoTabla;
}

function printMensaje(matriz1, matriz2) {
  const ans = document.getElementById("ans");
  let msj = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (matriz2[i][j] == 1) {
        msj += matriz1[i][j];
      }
    }
  }
  ans.innerHTML = `Mensaje encontrado: ${msj}`;
}

function ej9() {
  const letras = [
    ["e", "s", "n", "u", "l", "d", "s", "h"],
    ["a", "s", "a", "e", "p", "r", "v", "l"],
    ["e", "o", "n", "e", "i", "s", "d", "g"],
    ["d", "s", "i", "a", "e", "a", "o", "i"],
    ["d", "l", "e", "o", "n", "a", "g", "a"],
    ["r", "a", "l", "a", "e", "l", "a", "g"],
    ["p", "d", "u", "u", "o", "o", "n", "s"],
    ["d", "i", "l", "i", "e", "i", "n", "o"],
  ];

  const nums = [
    [0, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
  ];

  printM(letras, "table");
  printM(nums, "table2");
  printMensaje(letras, nums);
}

// 10. Confeccione un programa para hallar e imprimir los números naturales que cumplan simultáneamente las condiciones siguientes:
// Se encuentren entre 1200 y 2000.
// Tengan exactamente 4 divisores enteros positivos que son 1,5, otro número primo y el propio número.

function naturales() {
  let nums = [];

  for (let num = 1200; num <= 2000; num++) {
    let divisores = getDiv(num);

    if (
      divisores.length === 4 &&
      divisores.includes(1) &&
      divisores.includes(5) &&
      esPrimo(divisores[2])
    ) {
      nums.push(num);
    }
  }
  showResult(nums);
}

function getDiv(n) {
  let div = [];

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      div.push(i);

      if (n / i !== i) {
        div.push(n / i);
      }
    }
  }
  return div;
}

function esPrimo(n) {
  if (n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function showResult(numeros) {
  const result = document.getElementById("sets");
  showCard();
  let msj = "";
  if (numeros.length > 0) {
    let numerosHTML = "";
    numeros.forEach((numero) => {
      numerosHTML += numero + ", ";
      let divisores = getDiv(numero);
      console.log(numero);
      msj += `${numero}: (${divisores.join(", ")}) </br>`;
    });
    result.innerHTML = msj;
  } else {
    result.innerHTML = "No se encontraron números que cumplan las condiciones";
  }
}

// 11. Confeccione un programa que imprima las k filas del triángulo de Pascal

function readNums3() {
  let f = true;
  const myInput = document.getElementById("n0");
  const input = myInput.shadowRoot.querySelector("input");
  let rows = input.value;
  let rsplit = rows.split(".");

  if (rsplit.length > 1) {
    alert("ingrese un número entero");
    input.value = "";
    f = false;
  } else {
    if (isNaN(rows)) {
      alert("Ingrese las filas");
      input.value = "";
      f = false;
    } else if (rows <= 0) {
      alert("Ingrese datos positivos y mayor que 0");
      input.value = "";
      f = false;
    }
  }
  return { f, rows };
}

function setHeightCard(rows) {
  const card = document.getElementById("card");
  const height = rows * 40; // Ajusta el factor de escala según tus necesidades
  card.style.height = `${height}px`;
}

function pascalTriangle() {
  const { f, rows } = readNums3();
  if (f) {
    showCard();
    const result = document.getElementById("sets");
    let triangle = [];

    for (let i = 0; i < rows; i++) {
      triangle[i] = [];
      triangle[i][0] = 1;

      for (let j = 1; j < i; j++) {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
      if (i > 0) {
        triangle[i][i] = 1;
      }
    }
    result.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      let fila = triangle[i].join(" ");
      result.innerHTML += `${fila} <br>`;
    }
    setHeightCard(rows);
  }
}

function cProp() {
  let nums = {
    f1: [],
    f2: [],
  };
  const { f1, f2 } = nums;
  const result = document.getElementById("sets");
  for (let i = 11; i < 100; i++) {
    for (let j = i; j < 100; j++) {
      let n = i * j;
      let k = voltearNum(i);
      let l = voltearNum(j);
      let m = k * l;
      if (n == m) {
        result.innerHTML += `(${i} * ${j} = ${n}) = (${k} * ${l} = ${m}) </br>`;
      }
    }
  }
  showCard();
}

function separarCifras(numero) {
  if (typeof numero !== "number" || !Number.isInteger(numero) || numero < 0) {
    throw new Error("Por favor, ingresa un número entero positivo.");
  }

  const cifras = [];
  const numeroStr = String(numero);

  for (let i = 0; i < numeroStr.length; i++) {
    cifras.push(Number(numeroStr.charAt(i)));
  }

  return cifras;
}

function voltearNum(i) {
  let cifr = separarCifras(i);
  return cifr[1] * 10 + cifr[0];
}
