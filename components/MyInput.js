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

    if (this.hasAttribute("min")) {
      const input = this.shadowRoot.querySelector("input");
      const min = this.getAttribute("min");
      input.setAttribute("min", min); // Agregar el atributo "min" al input
    }

    if (this.hasAttribute("max")) {
      const input = this.shadowRoot.querySelector("input");
      const max = this.getAttribute("max");
      input.setAttribute("max", max); // Agregar el atributo "max" al input
    }

    if (this.hasAttribute("pattern")) {
      const input = this.shadowRoot.querySelector("input");
      const pattern = this.getAttribute("pattern");
      input.setAttribute("pattern", pattern); // Agregar el atributo "pattern" al input
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
