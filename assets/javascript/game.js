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
			} else {
				alert("You're the Mean Queen. Game Over");
			}
		 	
		 	this.newRound();
	},
	loseBattle : function(){
		alert("You're no match for these top mean girls. Game Over");
		this.reset();
	},
	newRound : function(){
		this.stage = "choose opponent";
		$('.report').html("");
	},
	reset : function(){
		var self = this;
		$(".reset").show();
		$(document).on('click', '.reset', function(){
			$(this).hide();
			self.clickCounter = 0;
			self.stage = "choose character";
			$('.character').show().appendTo('#choose-character').removeClass('enemies you opponent');
			console.log(self.stage);
			self.regina.healthPoints = 150;
			self.kathryn.healthPoints = 200;
			self.taylor.healthPoints = 175;
			self.sharpay.healthPoints = 140;
			
		});
		self.chooseCharacter();
		$('.report').html("");
	}
}


	game.chooseCharacter();

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
		$('.report').html("You attacked " + game[characterName]['fullName'] + " for " + game[characterName]['attackPower'] + " damage.<br/>" + game[opponentName]['fullName'] + " attacked you back for " + game[opponentName]['counterAttackPower']+ " damage.")

		 if(game[opponentName]['healthPoints'] <= 0){
		 	game.winBattle();
		 } else if (game[characterName]['healthPoints'] <= 0){
		 	game.loseBattle();
		 }
		 game.clickCounter++
		 console.log("Click Counter " + game.clickCounter);

	});






