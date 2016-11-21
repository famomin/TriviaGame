$(document).ready(function() {

	//variables for the game
	var correctAnswers = 0;
	var wrongAnswers = 0;
	var totalAnswered = correctAnswers + wrongAnswers;
	var unanswered = 0;
	var questionNum = 0;

	//question Bank
	var questionBank = [
		{'questionNumber' : 1,
		'question' : 'Who finished third in 2015 F1 Drivers Championship?',
		'answerChoices' : ['Nico Roseberg', 'Daniel Ricciardo', 'Sebastian Vettel', 'Kimi Raikkonen'],
		'correctAnswer' : 'Sebastian Vettel',
		'answerGif' : 'Assets/Images/Vettel.jpeg',
		'answerDetails' : 'Roseberg finished 2nd, Vettel finished 3rd, Raikkonen finisehd 4th, Ricciardo finised 8th.'
		}, 

		{'questionNumber' : 2,
		'question' : 'Which female olympian finised her career with most medals?',
		'answerChoices' : ['Larisa Latynina', 'Birgit Fischer', 'Dara Torres', 'Birgit Fischer'],
		'correctAnswer' : 'Larisa Latynina',
		'answerGif' : 'Assets/Images/Latynina.jpeg',
		'answerDetails' : 'Latynina won 18 medals. Fischer, Torres and  Fischer won 12 medals.'
		}, 
		
		{'questionNumber' : 3,		
		'question' : "Which country has featured in every FIFA World Cup?",
		'answerChoices' : ['England', 'Germany', 'France', 'Brazil'],
		'correctAnswer' : "Brazil",
		'answerGif' : 'Assets/Images/Brazil.jpeg',
		'answerDetails' : "When George examines his mother's bra, he gets ketchup on it"
		}, 

		{'questionNumber' : 4,
		'question' : 'What famous baseball curse ended in 2016 after Chicago Cubs won the World Series?',
		'answerChoices' : ['Curse of Bambino', 'Curse of Billy Goat', 'Curse of Rocky Colavito', 'Curse of 1908'],
		'correctAnswer' : 'Curse of Billy Goat',
		'answerGif' : 'Assets/Images/Cubs.jpeg',
		'answerDetails' : 'Curse of Billy Goat started in 1945 after Cubs did not allow a fan to bring his goat in the stadium.'
		},

		{'questionNumber' : 5,
		'question' : 'Which NFL team was based in Houston before Houston Texans?',
		'answerChoices' : ['Titans', 'Patriots', 'Rams', 'Saints'],
		'correctAnswer' : 'Titans',
		'answerGif' : 'Assets/Images/Oilers.jpeg',
		'answerDetails' : 'Titans were called Houston Oilers, when team was based in Houston.' 
		}
	];

	var timer = {
		time : 16,
		reset: function(){
			timer.time = 16;
		},
		start: function(){
			counter = setInterval(timer.count, 1000);
		},
		stop: function(){
			clearInterval(counter);
		},
		count: function(){
			timer.time --;
			$('#timeLeft').html(timer.time);
			timer.check();

		},

	  	check: function(){
	  	if (timer.time == 0) {
	  		setTimeout(timesUp, 500);
			setTimeout(startGame, 4000);
	  	}
	  }
	};

	function RestartGame () {
		correctAnswers = 0;
		wrongAnswers = 0;
		unanswered = 0;
		questionNum = 0;
		getready();
	}

	$('.startGame').on("click", function(){
		$(this).hide();
		getready();
	});

	//$('#startGame').click(function() 
	function getready() {
		$('.container-fluid').empty();
		$('.opensGame').removeClass().addClass('container-fluid game text-center');
		$('.container-fluid').append('<div class="row"> <div class="timeRemaining">Time Left: <span id="timeLeft">15</span> seconds left </div> </div>');
		$('.container-fluid').append('<div class="row"> <div class="col-sm-10 col-sm-offset-1 questionShowBox"><div id="questionAsked"></div> <div> <ul id="answerChoices2"></ul></div></div></div>');
		$('.container-fluid').append('<div class="row"> <div class="questionInfo"></div> <div class="questionsRemaining">Question # <span id="questionShowing">1</span></div> </div>');	
		startGame();
	}



	function startGame() {
		// if statement to check if game coninues or ends	
		if (questionNum == questionBank.length) {
			endOfGame();
		} 

		else {
			timer.reset();
			timer.start();


			$('.questionShowing').html(questionNum); //showing question number
			$('.questionShowBox').empty(); //emptying questions
			$('.questionInfo').empty(); //emptying the inforation about last question

			//creating divs for questions
			$('.questionShowBox').html('<div id="questionAsked"></div>' + '<ul id="answerChoices2"></ul>')
			
			//writting question on browser
			$("#questionAsked").html(questionBank[questionNum].question);
			console.log(questionBank[questionNum].question);

			//writting answer choices one by one on browser	
			for(var i =0; i<questionBank[questionNum].answerChoices.length; i++){
				$("#answerChoices2").append('<li> <button class="spacingOutAnswer">' + questionBank[questionNum].answerChoices[i] + '</button></li>');
				console.log(questionBank[questionNum].answerChoices[i]);
			}

			//storing the answer choice selected by user
			$("#answerChoices2 li").click(function(){
				var userSelectedAnswer = $(this).text();

				//checking if user is right or wrong
				if (userSelectedAnswer === questionBank[questionNum].correctAnswer) {
					setTimeout(correctlyAnswered, 10);
					setTimeout(startGame, 5000);
				}

				else {
					setTimeout(incorrectlyAnswered, 10);
					setTimeout(startGame, 5000);
				}

			});	
		}

	}

	function correctlyAnswered(){
		timer.stop();
		$('.questionShowBox').html('<div class="text-center"><img src"" id="answerImage"> </div>');
		$('#answerImage').attr('src', questionBank[questionNum].answerGif);
		$('.questionInfo').html('<div id="answerInfo">You are correct! ' + questionBank[questionNum].answerDetails + '</div>');

		correctAnswers++;
		questionNum++
	}

	function incorrectlyAnswered () {
		timer.stop();
		$('.questionShowBox').html('<div class="text-center"><img src"" id="answerImage"> </div>');
		$('#answerImage').attr('src', questionBank[questionNum].answerGif);
		$('.questionInfo').html('<div id="answerInfo">Sorry, that is not the right answer. ' + questionBank[questionNum].answerDetails + '</div>');
		wrongAnswers++;
		questionNum++
	}

	function timesUp() {
		timer.stop();
		$('.questionShowBox').html('<div> <div class="text-center"><img src"" id="answerImage"> </div>');
		$('#answerImage').attr('src', questionBank[questionNum].answerGif);
		$('.questionInfo').html('<div id="answerInfo">You ran out of time. ' + questionBank[questionNum].answerDetails + '</div>');
		unanswered++;
		questionNum++;
	}


	function endOfGame() {
		$('.timeRemaining').html('<div class="text-center"> Sports Trivia Over </div>');			
		$('.questionInfo').empty();
		$('#answerImage').attr('src',"");
		$('.questionsRemaining').html('<div class="text-center"> Sports Trivia Over </div>');
		$('.questionShowBox').append('<div class="text-center score">You answered ' + correctAnswers + ' questions correctly.</div>');
		$('.questionShowBox').append('<div class="text-center score">You answered ' + wrongAnswers + ' questions incorrectly.</div>');
		$('.questionShowBox').append('<div class="text-center score">You did not answer ' + unanswered + ' questions.</div>');
		$('.questionShowBox').append('<div><button class="startGame"> Play Again</button></div>');
		$('.startGame').click(function(){
			RestartGame();
		});
	}

});