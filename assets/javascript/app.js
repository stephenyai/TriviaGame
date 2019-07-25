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
		answer: 'Seoul',
              funFact: 'Along with the great city that is Seoul, South Korea is home to other great landscapes such as Busan and Jeju Island.'
	}, 
	{
		question: 'South Korea harvests more than 90% of the world\'s consumption for this item.',
              choices: ['Rice', 'Salt', 'Seaweed', 'Beef'],
		answer: 'Seaweed',
              funFact: 'Nutritious, delicious, and vegan: Good source of calcium, iodine, iron, and vitamin B12. Less than 70 calories per snack pack.'
	},
       {
              question: 'The Korean Demilitarized Zone, the buffer zone that divides the Korean Peninsula roughly in half, was created in: ',
              choices: ['1952', '1949', '1957', '1953'],
              answer: '1953',
              funFact: 'The DMZ is still an active war zone and runs 150 miles long.'
       },
       {
              question: 'This Olympic sport originated from South Korea.',
              choices: ['Wrestling', 'Archery', 'Ice Skating', 'Tae Kwon Do'],
              answer: 'Tae Kwon Do',
              funFact: 'Translates to \'Way of the Foot and Fist\'. Tae Kwon Do is the national sport of South Korea.'
       },
       {
              question: 'What is the Korean word for \'side dishes\' commonly served at Korean establishments?',
              choices: ['kimchi', 'soju', 'banchan', 'galbi'],
              answer: 'banchan',
              funFact: 'Make sure to greet your server with \'Annyeong haseyo\' at Korean restaurants! (The formal greeting for Hello!)'
       },
       {
              question: 'This South Korean film, considered a modern masterpiece, was remade by the great Spike Lee.',
              choices: ['Train to Busan', 'Old Boy', 'Burning', 'Taegukgi'],
              answer: 'Old Boy',
              funFact: 'Directed by Cho Young-wuk. The other choices are great Korean movies as well. Highly recommended.'
       },
       {
              question: 'Select the K-Pop band that is NOT real.',
              choices: ['H.O.T', 'Big Bang', 'BTS', 'Buster Buster'],
              answer: 'Buster Buster',
              funFact: 'Yes you know K-Pop, but there are talented artists in different genres such as Busker Busker (the real band name) which is indie/alternative.'
       },
       {
              question: 'In the U.S., the Korean War is often called the _____________ due to coverage being censored and overshadowed by World War II and the Vietnam War.',
              choices: ['Great War', 'Forgotten War', 'Tragic War', 'Unnecessary War'],
              answer: 'Forgotten War', 
              funFact: 'The war devestated Korea with a reported 3-4 million deaths, mostly citizens. A formal peace treaty has yet to be signed.'
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
       $('#choices').append("<h4> Fun Fact: " + questions[thisQ].funFact + "</h4>");

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 5*1000);
       } else {
              newQ = setInterval(newQuestion, 5*1000);
       }
}

function wrongAnswer() {
       clearInterval(timer);
       wrongAnswers++;

       $('#choices').html("<h2>Incorrect!</h2>")
       $('#choices').append("<h3>The correct answer is: " + questions[thisQ].answer + "</h3>")
       $('#choices').append("<h4> Fun Fact: " + questions[thisQ].funFact + "</h4>");

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 5*1000);
       } else {
              newQ = setInterval(newQuestion, 5*1000);
       }
}

function timesUp() {
       clearInterval(timer);

       $('#choices').html("<h2>Time's Up!</h2>");
       $('#choices').append("<h3>The correct answer is: " + questions[thisQ].answer + "</h3>")
       $('#choices').append("<h4> Fun Fact: " + questions[thisQ].funFact + "</h4>");

       if (thisQ === questions.length-1) {
              newQ = setInterval(totalScore, 5*1000);
       } else {
              newQ = setInterval(newQuestion, 5*1000);
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

       $('#choices').html("<h2>Hope you had fun and learned a little something! How did you do?</h2>")
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
});

$(document).on('click', '#reset', function() {
       reset();
});

$(document).on('click', '#start', function() {
       gameStart();
});



