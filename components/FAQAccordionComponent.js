class FAQAccordionComponent extends HTMLElement {
   constructor() {
      super();
      this.build();
   }

   build() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(this.styles());

      const faqBox = this.createFAQBox();
      shadow.appendChild(faqBox);

      return shadow;
   }

   createFAQBox() {
      const faqBox = document.createElement('div');

      faqBox.classList.add('faq-box');
      faqBox.appendChild(this.title());

      return faqBox;
   }

   title() {
      const title = document.createElement('h1');

      title.classList.add('title');
      title.innerHTML = 'FAQs';

      return title;
   }

   styles() {
      const style = document.createElement('style');

      style.textContent = `
         .faq-box{
            border: 1px solid red;
            width: 70vw;
            height: 70vh;
            background: #fff;
            border-radius: 1.25rem;
            padding: 1.5rem;
            display: flex;
         }

         .title{
            position: relative;
            font-size: 5rem;
            margin-left: 2rem;
            display: flex;
            gap: 1.5rem;
            font-weight: bolder;
         }

         .title::before{
            position: relative;
            content: url('../images/icon-star.svg');
            bottom: 5px;
         }
      `;

      return style;
   }
}

customElements.define('faq-accordion', FAQAccordionComponent);
