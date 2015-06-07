// The List
var tList = {
  controllers: {
    answer: {
      loadAnswer: function() {
        var a = localStorage.getItem("answer");
        if (a === null) {
          a = tList.models.getAnswer();
          this.saveAnswer(a);
        }
        else {
          a = JSON.parse(a);
        }
        return a;
      },
      saveAnswer: function(a) {
        localStorage.setItem("answer", JSON.stringify(a));
      },
      setCurrentAnswer: function(score) {
        var a = this.loadAnswer();
        a.answers[a.currentQuestion] = score;
        this.saveAnswer(a);
      },
      getCurrentQuestion: function() {
        return this.loadAnswer().currentQuestion;
      },
      setCurrentQuestion: function(n) {
        var a = this.loadAnswer();
        a.currentQuestion = n;
        this.saveAnswer(a);
      }
    },
    quiz: {
      getQuestion: function(n) {
        return tList.models.getQuiz().questions[n];
      },
      getQuestionsLength: function() {
        return tList.models.getQuiz().questions.length;
      }
    }
  },

  models: {
    getAnswer: function() {
      return {
        currentQuestion: 0,
        answers: []
      };
    },

    getQuiz: function() {
      return {
        questions: [
          "Is fun to be with."
          ,"Is able to admit his/her feelings toward me."
          ,"Actively seeks to be in a relationship with me."
          ,"Understands me and finds me interesting."
          ,"Is attractive to me and attracted to me."
          ,"Knows and is honest with himself/herself."
          ,"Is able to acknowledge and express his/her feelings."
          ,"Is honest and straightforward with me."
          ,"Is protective of me."
          ,"Makes an effort to meet my needs and meets them most of the time."
          ,"Makes me laugh."
          ,"Honors his/her commitments."
          ,"Has a healthy relationship with drugs and alcohol."
          ,"Is willing to work on our relationship."
          ,"Is in control of his/her emotions."
          ,"Is ruled by his/her own mind."
          ,"Makes me feel secure in our relationship."
          ,"Has a similar set of values."
          ,"Is sexually compatible with me."
          ,"Shows he/she is crazy about me."
        ]
      };
    }
  },

  views: {
    question: {
      onNextQuestion: function() {
        // Get value of selected answer
        tList.controllers.answer.setCurrentAnswer($("input:radio[name=answer]:checked").val());
        $("input:radio[name=answer]:checked").prop("checked",false);

        var nextQuestionIndex = tList.controllers.answer.getCurrentQuestion() + 1;

        if (nextQuestionIndex >= tList.controllers.quiz.getQuestionsLength()) {
          window.location = "results.html";
        }

        tList.controllers.answer.setCurrentQuestion(nextQuestionIndex);

        this.update();

      },
      update: function() {
        var currentQuestionIndex = tList.controllers.answer.getCurrentQuestion();
        var currentQuestion = tList.controllers.quiz.getQuestion(currentQuestionIndex);
        $("#question").html(currentQuestion);

        $("#previous").prop("disabled",false);
        $("#next").prop("disabled",false);
        if (currentQuestionIndex === 0) {
          $("#previous").prop("disabled",true);
        }
        if ($("input:radio[name=answer]:checked").val() === undefined) {
          $("#next").prop("disabled",true);
        }
      }
    },

    getResult: {

    }
  }
};

tList.views.question.update();
