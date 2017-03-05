/* Deactivated for the simulation
var rankDisplay = document.getElementById("rank");
var starsDisplay = document.getElementById("stars");
var winButton = document.getElementById("win");
var lossButton = document.getElementById("loss");
var winStreakButton = document.getElementById("winStreak");
*/

var totalStarsCount = 0, actualRank = 25, relativeStars = 0, rankCeilingStars = 2;
var feedbackText = document.getElementById("feedbackString");
var winRate = document.getElementById("winrate");

/* Dealing with getting the rank and stars input from the user */
var starsSelect = document.getElementById("starsSelect");
var rankSelect = document.getElementById("rankSelect");

var check = function() {
  if(relativeStars > rankCeilingStars) {
    simulateButton.disabled = true;
    feedbackText.textContent = ("Rank " + actualRank + " has a maximum of " + rankCeilingStars + " stars.");
  } else {
    simulateButton.disabled = false;
    feedbackText.textContent = ("Ready to Go!");
  }
}

rankSelect.addEventListener("change", function() {
  var myValue = Number(this.value);
  actualRank = myValue;
  calculateStarsCeiling();
  check();
});

starsSelect.addEventListener("change", function() {
  relativeStars = Number(this.value);
  check();
});

/* End of dealing with getting the rank and stars input */

/* Simulation HTML stuff */

var simulateButton = document.getElementById("simulate");

simulateButton.addEventListener("click", function() {
  simulate(Number(winRate.value));
  console.log("Starting a Simulation on rank " + actualRank + " with " + relativeStars + " stars.");
});

/* End of Simulation HTML stuff */

var calculateStarsCeiling = function() {
  if (actualRank >= 21) {
    rankCeilingStars = 2;
  } else if(actualRank >= 16) {
    rankCeilingStars = 3;
  } else if (actualRank >= 11) {
    rankCeilingStars = 4;
  } else {
    rankCeilingStars = 5;
  }
}

var init = function(rank, stars) {
  actualRank = rank;
  totalStarsCount = stars;
  relativeStars = stars;
  updateDisplays();
}

var reachedLegend = function() {
  /*
  winButton.disabled = true;
  lossButton.disabled = true;
  winStreakButton.disabled = true;
  */

  actualRank = "Legend";
  relativeStars = "N/A";
}

var updateDisplays = function() {

  calculateStarsCeiling(actualRank);

  if(relativeStars === -1) {
    if(actualRank === 20 || actualRank === 15 || actualRank === 10 || actualRank === 5) {
      starsCount = 0;
      relativeStars = 0;
    } else {
      actualRank += 1;
      starsCount = rankCeilingStars - 1;
      relativeStars = starsCount;
    }
  } else if(relativeStars > rankCeilingStars) {
    actualRank -= 1;
    starsCount = 1;
    relativeStars = 1;
  }

  /*
  if(actualRank <= 5) {
    winStreakButton.disabled = true;
  }
  */

  if(actualRank === 0) {
    reachedLegend();
  }

  //rankDisplay.textContent = actualRank;
  //starsDisplay.textContent = relativeStars;
}

var winGame = function() {
  relativeStars += 1;
  updateDisplays();
}

var winStreak = function() {
  relativeStars += 2;
  updateDisplays();
}

var loseGame = function() {
  if(actualRank < 21) {
    relativeStars -= 1;
    updateDisplays();
  }
}

/* Deactivated for the simulation
winButton.addEventListener("click", winGame);
lossButton.addEventListener("click", loseGame);
winStreakButton.addEventListener("click", winStreak);
*/

var simulate = function(winRate) {
  init(Number(rankSelect.value),Number(starsSelect.value));

  var gamesInARow = 0;
  var games = 0;
  var wins = 0;
  var loss = 0;

  while(actualRank !== "Legend") {
    games += 1;
    var random = Math.floor((Math.random() * 100) + 1);

    if(random <= winRate) {
      wins += 1;
      if(gamesInARow > 2 && actualRank > 5) {
        winStreak();
        gamesInARow += 1;
      } else {
        winGame();
        gamesInARow += 1;
      }
    } else {
      loss += 1;
      loseGame();
      gamesInARow = 0;
    }

    if(games > 10000) {
      break
    }
  }

  if(games > 10000) {
      feedbackText.textContent = "Uh Oh. I calculated " + games + " and you didn't reach legend. Maybe you should consider getting better at the game.";
  } else {
      feedbackText.textContent = "You reached Legend! It took you " + games + " games with a total of " + wins + " wins and " + loss + " losses. ";
  }

}
