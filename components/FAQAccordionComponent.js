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

      const questions = this.createListAsks();
      faqBox.appendChild(questions);

      return faqBox;
   }

   title() {
      const title = document.createElement('h1');

      title.classList.add('title');
      title.innerHTML = 'FAQs';

      return title;
   }

   createListAsks() {
      const list = document.createElement('dl');
      list.classList.add('list');

      const question = this.questions();
      list.appendChild(question);

      const answer = this.answers();
      list.appendChild(answer);

      return list;
   }

   questions() {
      const question = document.createElement('dt');
      question.classList.add('question');

      question.innerHTML = 'What is Frontend Mentor, and how will it help me?';

      return question;
   }

   answers() {
      const answer = document.createElement('dd');
      answer.classList.add('answer');

      answer.innerHTML =
         "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.";

      return answer;
   }

   styles() {
      const style = document.createElement('style');

      style.textContent = `
         .faq-box{
            width: 70vw;
            height: 70vh;
            background: #fff;
            border-radius: 1.25rem;
            padding: 1.5rem 2rem;
         }

         .title{
            position: relative;
            font-size: 5rem;
            margin-left: 2rem;
            display: flex;
            gap: 1.5rem;
            font-weight: bolder;
            color: #311437;
         }

         .title::before{
            position: relative;
            content: url('../images/icon-star.svg');
            bottom: 5px;
         }

         .list{
            margin: 1.5rem 0;
         }

         .question{
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
            display: block;
            width: fit-content;
            color: #311437;
         }

         .question::after{
            position: relative;
            display: inline-block;
            top: 7px;
            left: 1rem;
            content: url('../images/icon-plus.svg')
         }

         .question:hover{
            color: #8738BD;
         }

         .answer{
            font-size: 1.25rem;
            text-align: left;
            margin: .75rem 0;
            color: #7F7380;
         }
      `;

      return style;
   }
}

customElements.define('faq-accordion', FAQAccordionComponent);
