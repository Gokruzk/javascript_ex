//Evita que la página se recargue al dar clic en el botón de calcular
document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
});

function adaptarAnchoInput() {
  const myInput = document.getElementById("km");
  const input = myInput.shadowRoot.querySelector("input");
  const label = myInput.shadowRoot.querySelector("label");
  const texto = label.textContent;
  const longitudTexto = texto.length;
  const ancho = longitudTexto * 10; // Ajusta el factor de escala según tus necesidades
  input.style.width = `${ancho}px`;
}

function adaptarAnchoBtn() {
  const btn = document.querySelector("button");
  const texto = btn.textContent;
  const longitudTexto = texto.length;
  const ancho = longitudTexto * 12; // Ajusta el factor de escala según tus necesidades
  console.log(texto);
  btn.style.width = `${ancho}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  adaptarAnchoInput();
  adaptarAnchoBtn();
});
