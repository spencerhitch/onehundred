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
    var now = new Date().toTimeString();
    console.log('time: ', time);
    console.log('now : ', now);
    var alarm_time = ((parseInt(time.substring(0,2)) -  parseInt(now.substring(0,2))) 
      * 60  + (parseInt(time.substring(3,5)) - parseInt(now.substring(3,5)))) * 60
      - now.substring(6,8);
      ;
    console.log("alarm_time: ", alarm_time);
    setTimeout(function(){
     document.getElementById("alarm").play();
      alert("Time is up!");
    }, alarm_time * 1000);
  });
}

Alarm.prototype = {
}

