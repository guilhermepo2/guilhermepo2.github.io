var lastSmile = new Date();
lastSmile.setFullYear(2017);
lastSmile.setMonth(4);
lastSmile.setDate(28);
lastSmile.setHours(10);
lastSmile.setMilliseconds(0);
lastSmile.setMinutes(5);
lastSmile.setSeconds(0);

var now = new Date();
var diffTime = (now - lastSmile);

var diffYear = 0, diffMonth = 0, diffDays = 0, diffHours = 0, diffMinutes = 0, diffSeconds = 0, diffMs = 0;

if(diffTime >= 31536000000) {
  console.log("year");
  diffYear = Math.floor((diffTime / 31536000000));
  diffTime -= (diffYear * 31536000000);
}
if(diffTime >= (4*604800000)) {
  console.log("month");
  diffMonth =  Math.floor((difftime / (4*604800000)));
  diffTime -= (diffMonth * (4*604800000));
}
if(diffTime >= 86400000) {
  console.log("days");
  diffDays =  Math.floor((diffTime / 86400000));
  diffTime -= (diffDays * 86400000);
}
if(diffTime >= 3600000) {
  console.log("hours");
  diffHours =  Math.floor((diffTime / 3600000));
  diffTime -= (diffHours * 3600000);
}
if(diffTime >= 60000) {
  console.log("minutes");
  diffMinutes =  Math.floor((diffTime / 60000));
  diffTime -= (diffMinutes * 60000);
}
if(diffTime >= 1000) {
  console.log("seconds");
  diffSeconds =  Math.floor((diffTime / 1000));
  diffTime -= (diffSeconds * 1000);
}
diffMs = diffTime;

document.getElementById("date").innerHTML = ("I'm "+diffYear+" year "+diffMonth+" months "+diffDays+" days "+diffHours+" hours "+diffMinutes+" minutes "+diffSeconds+" seconds and "+diffMs+" milliseconds without smiling");
