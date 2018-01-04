$("body").keydown(function(event) {
  if(event.which === 13) {
    $("#char").attr("src","imgs/awkwardguy_idleok.gif");
  }
});

$("body").keyup(function(event) {
  if(event.which === 13) {
    $("#char").attr("src","imgs/running.gif");
  }
});

var marginLeftValue = 0;

var moveCharacter = function() {
  $(".running").css("marginLeft", marginLeftValue);
  marginLeftValue += 1;
}

$(document).ready(function() {
  setInterval(moveCharacter,10);
});
