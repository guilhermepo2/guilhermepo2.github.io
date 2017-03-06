//var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var streams = ["disguisedtoasths", "savjz", "trumpsc", "playhearthstone", "esl_hearthstone", "itshafu", "lifecoach1981", "amazhs", "kolento", "strifecro", "reynad27", "ratsmah", "bmkibler", "forsenlol", "nl_kripp", "tesdey"]

var makeUrl = function(type, channel) {
  return ('https://wind-bow.gomix.me/twitch-api/'+type+'/'+channel+'?callback=?');
}

var makeObject = function(channel) {
  var url = makeUrl("streams", channel);

  $.getJSON(url, function(data) {
    var infoString = ""
    console.log(data);

    if(data.stream === null) {
      $.getJSON(makeUrl("channels", channel), function(channelData) {
        if(channelData.name === undefined) {
          $("#streaming").append("<p class='offline'><span class='streamer'>" + channel + "</span> <span class='status'>Doesn't exist</span></p>");
        } else {
          $("#streaming").append("<p class='offline'><a target='blank' href='https://twitch.tv/"+channelData.name+"'><img class='streamerImg' src='"+channelData.logo+"'><span class='streamer'>"+channelData.name+"</span></a> <span class='status'>Offline</span></p>");
        }
      });
    }  else {
      $("#streaming").append("<p class='online'><a target='blank' href='https://twitch.tv/"+data.stream.channel.name+"'><img class='streamerImg' src='"+data.stream.channel.logo+"'><span class='streamer'>"+data.stream.channel.name+"</span></a> <span class='status'> "+data.stream.game + ": "+data.stream.channel.status+"</span></p>");
    }
  });
}

var showStreams = function() {
  for(var i = 0; i < streams.length; i++) {
    makeObject(streams[i]);
  }
}

$(document).ready(function()  {
  showStreams();
});
