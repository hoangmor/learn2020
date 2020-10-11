var startGame = document.getElementById('startGame');
var footerScore = document.getElementById('footerScore');
var footerStart = document.getElementById('footerStart');
var showScore = document.getElementById('showScore');
var rowContainQuestion = document.getElementById('rowContainQuestion');
var rowContainMain = document.getElementById('rowContainMain');
var totalQuestion = document.getElementById('totalQuestion');
var currentScore = document.getElementById('currentScore');
var rowContainResultSuccess = document.getElementById('rowContainResultSuccess');
var totalScoreSuccess = document.getElementById('totalScoreSuccess');
var showResultSuccess = document.getElementById('showResultSuccess');
var footerResultReplay = document.getElementById('footerResultReplay');
var textResult = document.getElementById('textResult');
var replayGame = document.getElementById('replayGame');
var divshowResultSuccess = document.getElementById('divshowResultSuccess');
(function() {
    const myQuestions = [
      {
        question: "1. Teint Idole Ultra Wear được tạo nên từ bao nhiêu sắc tố?",
        answers: {
          A: "4 sắc tố.",
          B: "5 sắc tố.",
          C: "6 sắc tố."
         },
        correctAnswer: "B" 
      
      },
      {
        question: "2. Teint Idole Ultra Wear chống có khả năng trôi lên đến bao lâu?",
        answers: {
          A: "8 giờ.",
          B: "16 giờ.",
          C: "24 giờ."
        },
        correctAnswer: "C"
      },
      {
        question: "3. Teint Idole Ultra Wear có bao nhiêu tone màu ở Việt Name?",
        answers: {
          A: "8 tone.",
          B: "9 tone.",
          C: "10 tone.",
         
        },
        correctAnswer: "C"
      },
      {
        question: "4. Teint Idole Ultra Wear có dung tích nào?",
        answers: {
          A: "15ml.",
          B: "30ml.",
          C: "Cả 2 đều đúng.",
         
        },
        correctAnswer: "C"
      },
      {
        question: "5. Độ mưu cầu hoàn mỹ của sản phẩm thể hiện qua yếu tố nào?",
        answers: {
          A: "Độ che phủ hoàn hảo.",
          B: "Độ chuẩn sắc da.",
          C: "Cả 2 đều đúng.",
         
        },
        correctAnswer: "C"
      },
    ];
    var noQuestion = Object.keys(myQuestions).length;
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label class="label-question-${questionNumber} label-question-${questionNumber}${letter}">
                <div class="question${questionNumber}${letter}">
                <input type="radio" class="question${questionNumber}" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </div>
             </label>`
          );
        }

  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> <div>${currentQuestion.question}</div></div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResultSpecific (no, correctAns, tt)
    {
        var el =document.getElementsByClassName('question'+no+correctAns);
        var label = document.getElementsByClassName('label-question-'+no);
        const answerContainers = quizContainer.querySelectorAll(".answers");
        const answerContainer = answerContainers[no];
        const selector = `input[name=question${no}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        for (var n=0; n < label.length; n++) {
            label[n].classList.add("label-hidden");
        }
        document.getElementsByClassName('label-question-'+no+correctAns)[0].classList.add("not-label-hidden");
        var intCurrentScore = parseInt(currentScore.innerHTML);
        if (userAnswer === correctAns) {
            currentScore.innerHTML = intCurrentScore+1;
            el[0].classList.add("mystyle");
        }else{
            document.getElementsByClassName('label-question-'+no+userAnswer)[0].style.opacity = '1';
            document.getElementsByClassName('question'+no+userAnswer)[0].classList.add("mystyleNot");
            document.getElementsByClassName('question'+no+correctAns)[0].classList.add("mystyle");
        }
        setTimeout(function(){
            if(no == 4){
                // rowContainQuestion.style.display = 'none';
                // rowContainResultSuccess.style.display = 'flex';
                // footerScore.style.display = 'none';
                // footerResultSuccess.style.display = 'flex';
                // showResultSuccess.innerHTML = randomString();
                showResults(intCurrentScore);
            }else{
                showNextSlide();
            }
        }, 3000);
    }
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        // console.log(answerContainer);
        const selector = `input[name=question${questionNumber}]:checked`;
        // console.log(selector);
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        // console.log(userAnswer);
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
        }
      });
      rowContainQuestion.style.display = 'none';
      rowContainResultSuccess.style.display = 'flex';
      totalScoreSuccess.innerHTML = `${numCorrect}/${myQuestions.length}`;
      if(myQuestions.length - numCorrect <= numCorrect){
        footerScore.style.display = 'none';
        // footerResultSuccess.style.display = 'flex';
        divshowResultSuccess.style.display = 'block';
        showResultSuccess.innerHTML = randomString();
      }else{
        textResult.innerHTML = 'CHỈ MỘT CHÚT NỮA LÀ NHẬN ĐƯỢC QUÀ, THỬ LẠI NHÉ.'
        footerScore.style.display = 'none';
        footerResultReplay.style.display = 'flex';
      }
  
      // show number of correct answers out of total
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    // display quiz right away
    buildQuiz();
  
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    startGame.addEventListener('click', function(){
        rowContainMain.style.display = 'none';
        rowContainQuestion.style.display = 'flex';
        footerStart.style.display = 'none';
        footerScore.style.display = 'flex';
        totalQuestion.innerHTML = noQuestion;
    });


    const ques1 = document.getElementsByName("question0");
    clickerFn = function() {
        setTimeout(function(){
            showNextSlide();
        }, 3000);
    }
    
    
    myQuestions.forEach((currentQuestion, questionNumber) => {
        var correctAns = currentQuestion.correctAnswer;
        var el =document.getElementsByClassName('question'+questionNumber);
        for (var i=0; i < el.length; i++) {
            el[i].addEventListener('click', function() {
                var tt = this;
                showResultSpecific(questionNumber,correctAns, tt);
            });
        }
    });

    function randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 6;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    replayGame.addEventListener('click', function(){
        location.reload();
    });

  })();
  
  
          
          
     
      
      
      
      
          
  
      

