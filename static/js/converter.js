// A Unit Converter in Javascript

var Converter = function(type, value, from, to, result, submit){
  var self = this;
  this.type = type;
  this.value = value;
  this.from = from;
  this.to = to;
  this.result = result;
  this.submit =  submit

  // Add selected change listener
  $(this.type).change(function(){
    self.updateUnits($(this).find(":selected").attr("value"));
  });

  $(this.submit).click(function(){
    self.convert();
  });

  self.updateUnits($(this.type).find(":selected").attr("value"));
}

Converter.prototype = {
  unitsTable:{
    temp : {
      fahrenheit : 32,
      centigrade : 1
    },
    curr : {
      USD: 1,
      EUR: 0.96,
      CNY: 6.95,
      RUB: 61.89
    },
    vol : { 
      milliliters : 1000,
      liters : 1,
      ounces : 33.814,
      cups : 4.22675,
      gallons : 0.264172, 
      quarts: 1.05669,
      pints: 2.11338
    },
    mass : {
      grams : 1,
      kilograms : 0.001,
      milligrams : 1000,
      micrograms : 1000000,
      ounces : 0.035274,
      pounds : 0.00220462,
      tonnes : 1e-6,
      tons : 1.10231e-6 
    },
    len : {
      inches : 39.3701,
      feet : 3.28084,
      yards : 1.09361,
      miles : 0.000621371,
      furlongs : 0.00497096,
      meters : 1,
      kilometers : 0.001,
      centimeters : 100,
      millimeter : 1000
    },
    vel : {
      mph : 0.621371,
      kph : 1,
      fps : 0.911344,
      mps : 0.277778
    }
  },
  updateUnits(type){
    var from = $(this.from).empty();
    var to = $(this.to).empty();
    $.each(this.unitsTable[type], function(unit, ratio){
      $(from).append("<option>" + unit + "</option>");
      $(to).append("<option>" + unit + "</option>");
    });
  },
  convert(){
    var type = $(this.type).find(":selected").attr("value");
    var from = $(this.from).find(":selected").val();
    var to = $(this.to).find(":selected").val();
    var value = $(this.value).val()
    var result;
    if (type == "temp"){
      if (from == "fahrenheit"){
        result = (value - 32) * 5/9;
      } else {
        result = value * 9/5 + 32;
      }
    } else {
      var num = this.unitsTable[type][to];
      var denom = this.unitsTable[type][from];
      result =  parseInt(value)  *  num / denom;
    }
    console.log("RESULT: ", result);
    $(this.result).text(result.toString()); 
  }
    
}

