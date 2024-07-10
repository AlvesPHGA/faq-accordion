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

      this.list = this.shadow.querySelector('dl');
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

   createQuestion(question) {
      let dt = document.createElement('dt');

      question?.map((item) => console.log(item));

      dt.classList.add('question');
      dt.innerHTML = `${question}`;

      return dt;
   }

   clickQuestion() {
      const element = this.nextSibling;

      this.classList.toggle('__active');
      element.classList.toggle('__active-answer');
   }

   contentFAQs(data) {
      data.map(({ question, answer }) => {
         this.list = this.shadow.querySelector('dl');

         const dt = document.createElement('dt');
         dt.classList.add('question');
         dt.innerHTML = `${question}`;

         dt.addEventListener('click', this.clickQuestion);

         const dd = document.createElement('dd');
         dd.classList.add('answer');
         dd.innerHTML = `${answer}`;

         const div = document.createElement('div');
         div.classList.add('faq-item');
         div.appendChild(dt);
         div.appendChild(dd);

         this.list.appendChild(div);
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
            margin: 0 0 0 2rem;
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

         .faq-item{
            position: relative;
            border-bottom: 1px solid hsl(275, 100%, 97%);
            height: fit-content;
            padding: 1.25rem 0;
         }

         .faq-item:first-child{
            padding-top: 0;
         }

         .faq-item:last-child{
            border: 0px;
            padding-bottom: 0;
         }

         .question{
            position: relative;
            z-index: 10;
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
            color: #311437;
            display: flex;
            justify-content: space-between;
            align-items: center;
         }

         .question:hover{
            color: #8738BD;
         }

         .question::after{
            content: url('../images/icon-plus.svg')
         }

         .question.__active::after{
            content: url('../images/icon-minus.svg')
         }

         .answer{
            display: none;
            font-size: 1rem;
            line-height: 1.5rem;
            text-align: left;
            margin: .75rem 0;
            color: #7F7380;
            }

         .__active-answer{
            display: block;
            animation: show-answer .8s forwards
         }

         @keyframes show-answer{
            from{
               opacity: 0;
               max-height: 0;
            }

            to{
               opacity: 1;
               max-height: 100px;
            }
         }
      `;

      return style;
   }
}

customElements.define('faq-accordion', FAQAccordionComponent);
