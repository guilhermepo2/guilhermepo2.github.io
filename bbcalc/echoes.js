// getting the paragraph from single level calculator
var p_single = document.querySelector(".single .result");
// getting the paragraph from the multiple level calculator
var p_multiple = document.querySelector(".multiple .result");

// setting them to empty.
p_single.textContent = "";
p_multiple.textContent = "";

var echoes_to_level = function(x) {
  return Math.round(((0.02 * x * x * x) + (3.06 * x * x) + (105.6 * x) - 895));
}

var calculate_single = function() {
  var current = parseInt(document.querySelector(".single #clevel").value);
  var echoes_needed = echoes_to_level((current+1));
  p_single.textContent = ("You need " + echoes_needed + " echoes to level " + (current+1));
}

var calculate_multiple = function() {
  var total_echoes = 0;
  var from = parseInt(document.querySelector("#m_from").value);
  var to = parseInt(document.querySelector("#m_to").value);
  for (var i = (from+1); i <= to; i++) {
    total_echoes += echoes_to_level(i);
  }
  p_multiple.textContent = "You need " + total_echoes +" echoes from level " + from + " to level " + to + ".";
}
