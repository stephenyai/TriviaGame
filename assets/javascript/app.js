var timer;
var newQ;
var counter = 3;
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
       $('#timer').text("Time Remaining: " + counter)

	if (counter == 0) {
	      timesUp();
	}
}

function questionPage() {     
       timer = setInterval(decreaseCounter, 1*1000);
       clearInterval(newQ);

	$('#questions').text(questions[thisQ].question)

	for (i=0; i<questions[thisQ].choices.length; i++) {
              var button = $("<button id='button' value='" + questions[thisQ].choices[i] + "'>");
		button.text(questions[thisQ].choices[i]);
		$('#choices').append(button);
	}
}

function rightAnswer() {
       clearInterval(timer);
       correctAnswers++;

       $('#questions').html("<h2>Correct</h2>");
       $('#choices').html("<h3> correct answer is ..." )

       newQ = setInterval(newQuestion, 3*1000);
}

function wrongAnswer() {
       clearInterval(timer);
       wrongAnswers++;

       $('#questions').html("<h2>Nice try</h2>")
       $('#choices').html("<h3> correct answer is ..." )

}

function timesUp() {
       clearInterval(timer);

       $('#questions').html("<h2>Time's Up!</h2>");
       $('#choices').html("<h3> correct answer is ..." )

       newQ = setInterval(newQuestion, 3*1000);
}

function newQuestion() {
       counter = 30;
       $('#timer').text("Time Remaining: " + counter);       
       thisQ++;
       questionPage();
}

function totalScore() {
       clearInterval(timer);
}

function reset() {

}

defaultPage();

$(document).on('click', '#button', function(event) {
       if ($(event.target).attr("value") === questions[thisQ].answer) {
              rightAnswer();
       } else {
              wrongAnswer();
       }
})






