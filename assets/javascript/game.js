var game = {
	stage : "choose character",
	clickCounter: 1,
	taylor : {
		healthPoints : 160,
		attackPower : 8,
		counterAttackPower : 15,
		fullName: "Taylor Vaughan"
	},
	regina: {
		healthPoints : 150,
		attackPower : 6,
		counterAttackPower : 10,
		fullName: "Regina George"
	},
	sharpay : {
		healthPoints : 140,
		attackPower : 4,
		counterAttackPower : 7,
		fullName : "Sharpay Evans"
	}, 
	kathryn : {
		healthPoints : 240,
		attackPower : 10,
		counterAttackPower : 45,
		fullName: "Kathryn Merteuil"
	},
	chooseCharacter : function(){
		var outerScope = this;
		$('.character').on('click', function(){
			if (outerScope.stage === "choose character"){
				$(this).addClass('you');
				$(this).siblings('.character').appendTo('#enemies').addClass('enemies');
				outerScope.stage = "choose opponent";
				window.selectedCharacter = $(this).attr('data-name');
			}
			outerScope.chooseOpponent();
		});

	},
	chooseOpponent : function(){
		var outerScope = this;
		$('.enemies').on('click', function(){
			if (outerScope.stage === "choose opponent"){
				$(this).appendTo('#ring').addClass('opponent');
				outerScope.stage = "fight";
				window.selectedOpponent = $(this).attr('data-name');
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
		this.clickCounter = 1;
		this.stage = "choose character";
		$('.character').show().appendTo('#choose-character').removeClass('enemies you opponent');
		this.regina.healthPoints = 150;
		this.kathryn.healthPoints = 200;
		this.taylor.healthPoints = 175;
		this.sharpay.healthPoints = 140;

		$("*[data-name = 'regina']").find('.health').html(this.regina.healthPoints);
		$("*[data-name = 'kathryn']").find('.health').html(this.kathryn.healthPoints);
		$("*[data-name = 'taylor']").find('.health').html(this.taylor.healthPoints);
		$("*[data-name = 'sharpay']").find('.health').html(this.sharpay.healthPoints);
	},
	updateCharacterHealth : function (){
		this[selectedCharacter]['healthPoints']-= this[selectedOpponent]['counterAttackPower'];
		$('.you').find('.health').html(this[selectedCharacter]['healthPoints']);
	},
	updateOpponentHealth : function (){
		window.attackPower = this[selectedCharacter]['attackPower'] * this.clickCounter; 
		this[selectedOpponent]['healthPoints']-= attackPower;
		$('.opponent').find('.health').html(this[selectedOpponent]['healthPoints']); 
	},
	updateGameStatusReport : function (){
	$('.report').html("You attacked " + this[selectedOpponent]['fullName'] + " for " + attackPower + " damage.<br/>" + this[selectedOpponent]['fullName'] + " attacked you back for " + this[selectedOpponent]['counterAttackPower']+ " damage.")
	}
}	

game.reset();

$('.reset').on('click', function(){
		$(this).hide();
		game.reset();
	});

$('.attack').on('click', function(){

	game.updateCharacterHealth();
	game.updateOpponentHealth();
	game.updateGameStatusReport();

	 if(game[selectedOpponent]['healthPoints'] <= 0){
	 	game.winBattle();
	 } else if (game[selectedCharacter]['healthPoints'] <= 0){
	 	game.loseBattle();
	 }
	 game.clickCounter++

});






	





