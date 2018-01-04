// selecting sections
var workingSection = $("#working-section");
var whatSection = $("#what-section");
var portfolioSection = $("#portfolio-section");
var randomSection = $("#random-section");
// selecting buttons
var working = $("#working");
var what = $("#what");
var portfolio = $("#portfolio");
var random = $("#random");

working.click(function(){
  workingSection.toggle();
  whatSection.hide();
  portfolioSection.hide();
  randomSection.hide();
});

what.click(function() {
  workingSection.hide();
  whatSection.toggle();
  portfolioSection.hide();
  randomSection.hide();
});

portfolio.click(function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.toggle();
  randomSection.hide();
});

random.click(function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.hide();
  randomSection.toggle();
});

var init = function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.hide();
  randomSection.hide();
}

init();
