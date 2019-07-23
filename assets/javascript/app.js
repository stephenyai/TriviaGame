var timer;
var newQ;
var counter = 30;
var correctAnswers = 0;
var wrongAnswers = 0;
var thisQ = 0;

var questions = [
	{
		question: 'What is the capital of South Korea?',
		choices: ['Busan', 'Seoul', 'Pyongyang', 'Incheon'],
		answer: 'Seoul'
	}, 
	{
		question: 'Seaweed question',
              choices: ['Rice', 'Salt', 'Seaweed', 'Beef'],
		answer: 'Seaweed'
	},
       {
              question: 'Independence Day',
              choices: ['date', 'efefee', 'gogog', 'adada'],
              answer: 'date'
       }
];

function defaultPage() {
	$('.questionScreen').hide();
}

function gameStart() {
	$('.main').fadeOut(500, function() {
	      $('main').empty();
	      $('.questionScreen').show();
	      $('.main').addClass('.questionScreen');
             $('#timer').text("Time Remaining: " + counter)
             questionPage();
	})
}

function decreaseCounter() { 
       counter--;
       $('#timer').html("<h1>Time Remaining: " + counter + "</h1>")

	if (counter == 0) {
	      timesUp();
	}
}

function questionPage() {     
       timer = setInterval(decreaseCounter, 1*1000);
       clearInterval(newQ);

	$('#choices').html("<h2>" + questions[thisQ].question + "</h2>")

	for (i=0; i<questions[thisQ].choices.length; i++) {
              var button = $("<button id='button' value='" + questions[thisQ].choices[i] + "'>");
		button.text(questions[thisQ].choices[i]);
		$('#choices').append(button);
	}
}

function rightAnswer() {
       clearInterval(timer);
       correctAnswers++;

       $('#choices').html("<h2>Great Job!</h2>");
       //$('#choices').append("<h3> correct answer is ..." )

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 3*1000);
       } else {
              newQ = setInterval(newQuestion, 3*1000);
       }
}

function wrongAnswer() {
       clearInterval(timer);
       wrongAnswers++;

       $('#choices').html("<h2>Incorrect!</h2>")
       $('#choices').append("<h3>The correct answer was: " + questions[thisQ].answer + "</h3>")

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 3*1000);
       } else {
              newQ = setInterval(newQuestion, 3*1000);
       }
}

function timesUp() {
       clearInterval(timer);

       $('#choices').html("<h2>Time's Up!</h2>");
       $('#choices').append("<h3>The correct answer was: " + questions[thisQ].answer + "</h3>")

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 3*1000);
       } else {
              newQ = setInterval(newQuestion, 3*1000);
       }
}

function newQuestion() {
       counter = 30;
       $('#timer').text("Time Remaining: " + counter);       
       thisQ++;
       questionPage();
}

function totalScore() {
       clearInterval(timer);

       $('#choices').html("<h2>Hope you had fun! How did you do?</h2>")
       $('#choices').append("<h3 class='results'> Correct answers: " + correctAnswers + "</h3>");
       $('#choices').append("<h3 class='results'> Wrong answers: " + wrongAnswers + "</h3>");
       $('#choices').append("<h3 class='results'> Questions unanswered: " + (questions.length - (correctAnswers + wrongAnswers)) + "</h3>");

       $('#choices').append("<button id='reset' type='submit' value='reset'>Play Again</button>")
}      

function reset() {
       counter = 30;
       correctAnswers = 0;
       wrongAnswers = 0;
       thisQ = 0;
       $('#timer').text("Time Remaining: " + counter)
       questionPage();
}

defaultPage();

$(document).on('click', '#button', function(event) {
       if ($(event.target).attr("value") === questions[thisQ].answer) {
              rightAnswer();
       } else {
              wrongAnswer();
       }
})

$(document).on('click', '#reset', function() {
       reset();
})




