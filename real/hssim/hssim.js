var rankDisplay = document.getElementById("rank");
var starsDisplay = document.getElementById("stars");
var winButton = document.getElementById("win");
var lossButton = document.getElementById("loss");
var winStreakButton = document.getElementById("winStreak");
var totalStarsCount, actualRank, relativeStars, rankCeilingStars;

var init = function() {
  actualRank = 25;
  totalStarsCount = 0;
  relativeStars = 0;
  updateDisplays();
}

var reachedLegend = function() {
  winButton.disabled = true;
  lossButton.disabled = true;
  winStreakButton.disabled = true;

  actualRank = "Legend";
  relativeStars = "N/A";
}

var updateDisplays = function() {
  if (actualRank >= 21) {
    rankCeilingStars = 2;
  } else if(actualRank >= 16) {
    rankCeilingStars = 3;
  } else if (actualRank >= 11) {
    rankCeilingStars = 4;
  } else {
    rankCeilingStars = 5;
  }

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

  if(actualRank <= 5) {
    winStreakButton.disabled = true;
  }
  if(actualRank === 0) {
    reachedLegend();
  }

  rankDisplay.textContent = actualRank;
  starsDisplay.textContent = relativeStars;
}

winButton.addEventListener("click", function() {
  relativeStars += 1;
  updateDisplays();
});

lossButton.addEventListener("click", function() {

  if(actualRank < 21) {
    relativeStars -= 1;
    updateDisplays();
  }
});

winStreakButton.addEventListener("click", function() {
  relativeStars += 2;
  updateDisplays();
});

init();
