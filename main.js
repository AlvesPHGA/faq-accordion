class Main extends HTMLElement {
   constructor() {
      super();
      this.build();
   }

   build() {
      const shadow = this.attachShadow({ mode: 'open' });

      shadow.appendChild(this.styles());

      const main = this.createMain();

      shadow.appendChild(main);
   }

   createMain() {
      const main = document.createElement('main');

      main.classList.add('main-component');

      return main;
   }

   styles() {
      const style = document.createElement('style');

      style.textContent = `
         .main-component{
            width: 50vw;
            height: 50vh;
            border-radius: 2.5rem;
            background: white;
            margin: auto;
            padding: 5rem 2.5rem
         }
      `;

      return style;
   }
}

customElements.define('main-component', Main);
