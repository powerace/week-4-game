var game = {
	stage : "choose character",
	clickCounter: 0,
	taylor : {
		healthPoints : 160,
		origAttackPower : 8,
		attackPower : 8,
		counterAttackPower : 15,
		fullName: "Taylor Vaughan"
	},
	regina: {
		healthPoints : 150,
		origAttackPower : 6,
		attackPower : 6,
		counterAttackPower : 10,
		fullName: "Regina George"
	},
	sharpay : {
		healthPoints : 140,
		origAttackPower : 4,
		attackPower : 4,
		counterAttackPower : 7,
		fullName : "Sharpay Evans"
	}, 
	kathryn : {
		healthPoints : 240,
		origAttackPower : 10,
		attackPower : 10,
		counterAttackPower : 45,
		fullName: "Kathryn Merteuil"
	},
	chooseCharacter : function(){
		var self = this;
		$(document).on('click', '.character', function(){
			if (self.stage === "choose character"){
				console.log(self.stage);
				$(this).addClass('you');
				$(this).siblings('.character').appendTo('#enemies').addClass('enemies');
				self.stage = "choose opponent";
				console.log(self.stage);
				//suggestion from Brian 
			}
			self.chooseOpponent();
		});

	},
	chooseOpponent : function(){
		var self = this;
		$(document).on('click', '.enemies', function(){
			if (self.stage === "choose opponent"){
				$(this).appendTo('#ring').addClass('opponent');
				console.log(this);
				self.stage = "fight";
			}
		});
	}, 
	winBattle : function(){
		$('.opponent').hide().removeClass('opponent');
			if ($('.enemies').is(':visible')){
				alert ("Battle Won. Choose Another Opponent");
				this.newRound();
			} else {
				alert("You're the Mean Queen. Game Over");
				$('.reset').show();
			}
		 	
		 	
	},
	loseBattle : function(){
		alert("You're no match for these top mean girls. Game Over");
		$('.reset').show();
	},
	newRound : function(){
		this.stage = "choose opponent";
		$('.report').html("");
	},
	reset : function(){
		this.chooseCharacter();
		$('.report').html("");
		this.clickCounter = 0;
		this.stage = "choose character";
		$('.character').show().appendTo('#choose-character').removeClass('enemies you opponent');
		console.log(this.stage);
		this.regina.healthPoints = 150;
		this.kathryn.healthPoints = 200;
		this.taylor.healthPoints = 175;
		this.sharpay.healthPoints = 140;

		$("*[data-name = 'regina']").find('.health').html(this.regina.healthPoints);
		$("*[data-name = 'kathryn']").find('.health').html(this.kathryn.healthPoints);
		$("*[data-name = 'taylor']").find('.health').html(this.taylor.healthPoints);
		$("*[data-name = 'sharpay']").find('.health').html(this.sharpay.healthPoints);
	}
}	
	game.reset();

	$(document).on('click', '.reset', function(){
			$(this).hide();
			game.reset();
		});

	$('.attack').on('click', function(){
		var characterName = $('.you').attr('data-name');
		var opponentName = $('.opponent').attr('data-name');

		//update character health points
		game[characterName]['healthPoints']-= game[opponentName]['counterAttackPower'];
		console.log("character healthPoints " + game[characterName]['healthPoints']);
		$('.you').find('.health').html(game[characterName]['healthPoints']);

		//attack calculation
		game[characterName]['attackPower'] = game[characterName]['origAttackPower'] * game.clickCounter + game[characterName]['attackPower'] ;
		console.log("character attackPower " + game[characterName]['attackPower']);

		//update opponent health points
		game[opponentName]['healthPoints']-= game[characterName]['attackPower'];
		console.log("opponent health " + game[opponentName]['healthPoints']);
		$('.opponent').find('.health').html(game[opponentName]['healthPoints']); 

		//update game status report
		$('.report').html("You attacked " + game[opponentName]['fullName'] + " for " + game[characterName]['attackPower'] + " damage.<br/>" + game[opponentName]['fullName'] + " attacked you back for " + game[opponentName]['counterAttackPower']+ " damage.")

		 if(game[opponentName]['healthPoints'] <= 0){
		 	game.winBattle();
		 } else if (game[characterName]['healthPoints'] <= 0){
		 	game.loseBattle();
		 }
		 game.clickCounter++
		 console.log("Click Counter " + game.clickCounter);

	});






