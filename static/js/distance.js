// An Distance Clock in Javascript

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


var Distance = function($city1, $city2, $calculate, $result){
  var self = this;
  console.log("City1: " ,$city1);
  this.$city1 = $city1;
  this.$city2 = $city2;
  this.$calculate = $calculate;
  this.$result = $result;
  this.cities = {};

  $.getJSON("../static/js/cities.json", function(cities){
    self.cities = cities;
		$('.typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		},
		{
			name: 'cities',
			source: substringMatcher(Object.keys(cities))
		});
  })

  this.$calculate.on("click", function(){
    var from =  self.$city1.val();
    var to  = self.$city2.val();
    var fromLat = self.cities[from]["latitude"];
    var fromLong = self.cities[from]["longitude"];
    var toLat = self.cities[to]["latitude"];
    var toLong = self.cities[to]["longitude"];

    console.log("Calculating distance from: ", from, " to: ", to);
    var distance = self.haversine(fromLat, fromLong, toLat, toLong);
    self.$result.text(distance);
  });

}

Distance.prototype = {
  haversine(lat1, lon1, lat2, lon2){
    lat1 = this.toDecimalDegrees(lat1);
    lon1 = this.toDecimalDegrees(lon1);
    lat2 = this.toDecimalDegrees(lat2);
    lon2 = this.toDecimalDegrees(lon2);

    var R = 6371e3; //meters
    var phi1 = this.toRadians(lat1);
    var phi2 = this.toRadians(lat2);
    var delta_phi = this.toRadians(lat2 - lat1);
    var delta_lambda = this.toRadians(lon2 - lon1);

    var a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * 
      Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
    var c = Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    console.log("Distance is: ", d);
    return d; 
  },
  toDecimalDegrees(dms){
    // W is -1 as is S
    var re = /(\d+)°(\d+)′([NEWS])/;
    var matches = re.exec(dms);
    var degree = parseInt(matches[1]);
    var minutes = parseInt(matches[2]);
    var direction = matches[3];
    var decimal =  degree + (minutes/60);
    if (direction == "W" || direction == "S"){
      decimal = decimal * -1
    }
    return decimal
  },
  toRadians(deg){
    return deg * Math.PI / 180
  }
}

