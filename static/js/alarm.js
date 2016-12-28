// An Alarm Clock in Javascript

var Alarm = function(timer, alarm){
  var self = this;
  this.timer = timer;
  this.alarm = alarm;

  this.timer.on("click", "#timer_btn", function(){
    var time = $("#timer_inp");
    console.log("Time: ", time);
    setTimeout(function(){
       document.getElementById("alarm").play();
       alert("Time is up!");
    }, time * 1000);
  });

  this.alarm.on("click", "#alarm_btn", function(){
    var time = $("#alarm_inp").val();
    setTimeout(function(){
     document.getElementById("alarm").play();
      alert("Time is up!");
    }, time * 1000);
  });
}

Alarm.prototype = {
}

