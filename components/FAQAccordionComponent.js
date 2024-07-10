class FAQAccordionComponent extends HTMLElement {
   constructor() {
      super();
      this.build();
   }

   build() {
      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.appendChild(this.styles());

      this.getQuestionsAnswerFaqs('http://127.0.0.1:5500/faq.json');

      const faqBox = this.createFAQBox();
      this.shadow.appendChild(faqBox);
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

      return list;
   }

   answers() {
      const answer = document.createElement('dd');
      answer.classList.add('answer');

      answer.innerHTML =
         "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.";

      return answer;
   }

   createQuestion(question) {
      let dt = document.createElement('dt');

      question?.map((item) => console.log(item));

      dt.classList.add('question');
      dt.innerHTML = `${question}`;

      return dt;
   }

   clickQuestion(ev) {
      const element = ev.currentTarget;
      const nextElement = element.nextSibling;
      console.log(nextElement.classList.toggle('show-answer'));
   }

   contentFAQs(data) {
      data.map(({ question, answer }) => {
         const list = this.shadow.querySelector('dl');

         const dt = document.createElement('dt');
         dt.classList.add('question');
         dt.innerHTML = `${question}`;

         dt.addEventListener('click', this.clickQuestion);

         const dd = document.createElement('dd');
         dd.classList.add('answer');
         dd.innerHTML = `${answer}`;

         list.appendChild(dt);
         list.appendChild(dd);
      });
   }

   async getQuestionsAnswerFaqs(json) {
      const res = await fetch(json);
      const data = await res.json();
      const faqData = data.faq_questions;

      this.contentFAQs(faqData);
   }

   styles() {
      const style = document.createElement('style');

      style.textContent = `
         .faq-box{
            width: 700px;
            height: fit-content;
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
            position: relative;
            z-index: 10;
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
            visibility: hidden;
            position: relative;
            bottom: 100px;
            font-size: 1.25rem;
            text-align: left;
            margin: .75rem 0;
            color: #7F7380;
            height: 0;
            transition: 3s ease-in-out;
         }

         .show-answer{
            visibility: visible;
            bottom: initial;
            height: initial;
            transition: 3s ease;
         }
      `;

      return style;
   }
}

customElements.define('faq-accordion', FAQAccordionComponent);
