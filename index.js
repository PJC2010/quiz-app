const myQuestions = [
  {
    number: 1,
    ask: `What is J Dilla's birth name?`,
    choice1: `John Robert Doe`,
    choice2: `James Romeo Duckett`,
    choice3: `James Dewitt Yancy`,
    choice4: `Jordan Michael Dilla`,
    


  },
  {
    number: 2,
    ask: `As a prolific beat maker, Dilla has produced for many high profile artists except for which of the following?`,
    choice1: `Erykah Badu`,
    choice2: `The Roots`,
    choice3: `A Tribe Called Quest`,
    choice4: `Rick Ross`,
    


  },
  {
    number: 3,
    ask: `J Dillas father (Beverly Dewitt Yancey) ghost wrote a song for which 1970's soul music group?`,
    choice1: `The Temptations`,
    choice2: `The Spinners`,
    choice3: `ZZ Top`,
    choice4: `The Four Tops`,
    correct: `The Spinners`


  },
  {
    number: 4,
    ask: `Which of the following beat machines was Dilla's machine of choice?`,
    choice1: `Akai MPC 3000`,
    choice2: `ASR-10`,
    choice3: `Akai MPD 32`,
    choice4: `Native Instruments Maschine`,
    


  },
  {
    number: 5,
    ask: `Which posthumous album  was created by Dilla while he was on his deathbed?`,
    choice1: `Jay Stay Paid`,
    choice2: `Donuts`,
    choice3: `The Shining`,
    choice4: `Pay Jay`,
    


  },
  {
    number: 6,
    ask: `In which American Midwest city was J Dilla born and raised`,
    choice1: `Milwaukee, WI`,
    choice2: `Detroit, MI`,
    choice3: `Columbus, OH`,
    choice4: `Chicago, IL`,
    


  },
  {
    number: 7,
    ask: `Who was the other producer that made the album "Champion Sound" with Dilla?`,
    choice1: `Kanye West`,
    choice2: `Dr. Dre`,
    choice3: `Q-Tip (Tribe Called Quest)`,
    choice4: `Madlib`,
    


  },
  {
    number: 8,
    ask: `How many posthumous albums does Dilla have?`,
    choice1: `Four`,
    choice2: `Seven`,
    choice3: `Two`,
    choice4: `Eight`,
    
    //answers: [a,b,c]
    //set answers in array


  },
  
];

const ANSWERS = [
  `James Dewitt Yancy`,
  `Rick Ross`,
  `The Spinners`,
  `Akai MPC 3000`,
  `Donuts`,
  `Detroit, MI`,
  `Madlib`,
  `Four`

]


let questionNumber = 0;
let correctAnswers = 0;

function renderQuestions(correctAnswers, question, questionsAnswered){
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.ask}</h2>

    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.choice1}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice2}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice3}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.choice4}</span>
        </label>
      </fieldset>
      <button id="js-submit-button">Submit</button>
    </form>
    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/8</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
    </section>

  `;

}

function handleStartButton(){
  $("#js-start-button").click(function(event){
    questionNumber=1;
    displayNextQuestion();

  })
}

function displayNextQuestion(){
  const question = myQuestions[questionNumber-1];
  const questionsAnswered=questionNumber-1;

  $('#container').html(renderQuestions(correctAnswers, question, questionsAnswered))

}

function handleSubmitButton(){
  $("#container").on('click', '#js-submit-button', function(event){
    event.preventDefault()

    const answer=$('input:checked').siblings('span');

    const isCorrect = checkAnswer(answer);
    if(isCorrect){
      handleCorrectFeedback()
    } else{
      handleIncorrectFeedback() 
    }

  })

}

function checkAnswer(answer){
  if(answer.text() === ANSWERS[questionNumber - 1]){
    return true
  } else {
    return false
  }
  
}

const correctFeedback = `
  <section class="feedback-page">
    <h2>Correct!</h2>
    <img src="https://media1.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif?cid=790b76115cedf2ae626272736f71c650&rid=giphy.gif" width="200px" height="200px">
    <button id="js-next-button">Next</button>
    
  </section>
`;

function handleCorrectFeedback(){
  $('#container').html(correctFeedback);
  updateScore()
}


function handleIncorrectFeedback(){
  $('#container').html(incorrectFeedbackPage(questionNumber))
}

function incorrectFeedbackPage(questionNumber){
  return `
    <section class="feedback-page">
      <h2>Wrong! The correct answer is: ${ANSWERS[questionNumber-1]} </h2>
      <button id="js-next-button">Next</button>
    </section>
  `
}





function handleNextButton(){
  $('#container').on('click', '#js-next-button', function(event){
    if(questionNumber === 8){
      handleResultsPage(correctAnswers)
    }else{
      updateQuestionNumber();
      displayNextQuestion();
    } 
  })
}

function updateQuestionNumber(){
  questionNumber++;
}

function updateScore(){
  correctAnswers++
}

function handleResultsPage(correctAnswers){
  $('#container').html(`
  <section id="result-page">
    <h2>Final Score: ${correctAnswers} out of 8</h2>
    <button id="js-restart-button">Play Again?</button>
  </section>
  `)
}

function handleRestartButton(){
  $('#container').on('click', '#js-restart-button', function(event){
    questionNumber = 1;
    correctAnswers = 0;
    displayNextQuestion();
  })
}





function handleButtons(){
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();

}
$(handleButtons);











