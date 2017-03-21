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
          $("#streaming").append("<div class='offline row'><div class='streamer col-sm-5'>" + channel + "</div> <div class='status col-sm-7'>Doesn't exist</div></div>");
        } else {
          $("#streaming").append("<div class='offline row'><div class='col-sm-5 streamer'><a target='blank' href='https://twitch.tv/"+channelData.name+"'><img class='streamerImg' src='"+channelData.logo+"'>"+channelData.name+"</a></div> <div class='status col-sm-7'>Offline</div></div>");
        }
      });
    }  else {
      $("#streaming").append("<div class='online row'><div class=' streamer col-sm-5'><a target='blank' href='https://twitch.tv/"+data.stream.channel.name+"'><img class='streamerImg' src='"+data.stream.channel.logo+"'>"+data.stream.channel.name+"</a></div> <div class='status col-sm-7'>"+data.stream.game + ": "+data.stream.channel.status+"</div></div>");
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
