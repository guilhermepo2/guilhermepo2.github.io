// selecting sections
var workingSection = $("#working-section");
var whatSection = $("#what-section");
var portfolioSection = $("#portfolio-section");
var hobbiesSection = $("#hobbies-section");
// selecting buttons
var working = $("#working");
var what = $("#what");
var portfolio = $("#portfolio");
var hobbies = $("#hobbies");

working.click(function(){
  workingSection.toggle();
  whatSection.hide();
  portfolioSection.hide();
  hobbiesSection.hide();
});

what.click(function() {
  workingSection.hide();
  whatSection.toggle();
  portfolioSection.hide();
  hobbiesSection.hide();
});

portfolio.click(function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.toggle();
  hobbiesSection.hide();
});

hobbies.click(function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.hide();
  hobbiesSection.toggle();
});

var init = function() {
  workingSection.hide();
  whatSection.hide();
  portfolioSection.hide();
  hobbiesSection.hide();
}

init();
