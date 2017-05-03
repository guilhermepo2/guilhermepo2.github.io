// selecting sections
var workingSection = $("#working-section");
var whatSection = $("#what-section");
var projectsSection = $("#projects-section");
var hobbiesSection = $("#hobbies-section");
// selecting buttons
var working = $("#working");
var what = $("#what");
var projects = $("#projects");
var hobbies = $("#hobbies");

working.click(function(){
  workingSection.toggle();
  whatSection.hide();
  projectsSection.hide();
  hobbiesSection.hide();
});

what.click(function() {
  workingSection.hide();
  whatSection.toggle();
  projectsSection.hide();
  hobbiesSection.hide();
});

projects.click(function() {
  workingSection.hide();
  whatSection.hide();
  projectsSection.toggle();
  hobbiesSection.hide();
});

hobbies.click(function() {
  workingSection.hide();
  whatSection.hide();
  projectsSection.hide();
  hobbiesSection.toggle();
});

var init = function() {
  workingSection.hide();
  whatSection.hide();
  projectsSection.hide();
  hobbiesSection.hide();
}

init();
