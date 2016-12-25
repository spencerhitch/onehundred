// An Alarm Clock in Javascript

var Alarm = function(stopwatch, alarm){
  var self = this;
  this.stopwatch = stopwatch;

  this.stopwatch.on("click", "#stopwatch_btn", function(){
    console.log($("#stopwatch_inp").val());
  });
}

Alarm.prototype = {
}

