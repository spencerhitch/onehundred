// An Distance Clock in Javascript


var CardValidator = function($type_selector, $card_number, $validate, $result) {
  var self = this;
  this.$type_selector = $type_selector;
  this.$card_number = $card_number; this.$validate = $validate;
  this.$result = $result;

  $.each(Object.keys(self.CardTypes), function(i,cardType) {
    self.$type_selector.append("<option>" + cardType + "</option>");
  })

  this.$validate.on("click", function() {
    var cardType = self.$type_selector.find(":selected").val();
    var cardNumber = self.$card_number.val();
    self.validate(cardType, cardNumber, self.$result);
  });
}

CardValidator.prototype = {
  CardTypes: {
    "Mastercard": {
       "prefix": ["51","52","53","54","55"],
       "length": ["16"]
     },
    "Visa": {
       "prefix": ["4"],
       "length": ["13","14","15","16"]
     },
    "American Express": {
       "prefix": ["34","37"],
       "length": ["15"]
     },
    "Diners Club/Carte Blanche": {
       "prefix": ["300","301","302","303","304","305","36","38"],
       "length": ["14"]
     },
    "Discover": {
       "prefix": ["6011"],
       "length": ["16"]
     }
  },
  validate(type, number, $result) {
    if (this.validType(type, number) && this.luhn(number)) {
      $result.html("Card is valid."); 
    } else {
      $result.html("Card is invalid.");
    }
  },
  validType(type, number) {
    var prefixes = this.CardTypes[type]["prefix"];
    var goodSoFar = false;
    for (i = 0; i < prefixes.length; i++) {
      if (number.substring(0, prefixes[i].length) == prefixes[i]) {
        goodSoFar = true;
        break;
      }
    }
    if (goodSoFar) {
      goodSoFar = false;
      var lengths = this.CardTypes[type]["length"];
      console.log("lengths: ", lengths);
      for (i = 0; i < lengths.length; i++) {
        if (number.length == parseInt(lengths[i])) {
          return true;
        }
      }
    }
    return false;
  },
  luhn(number) {
    number = number.split("").reverse().join("");
    var total = 0;
    for (i = 0; i < number.length; i++) {
      if (this.isOddIndex(i)) {
        var doubledStr = (parseInt(number[i]) * 2).toString()
        for (j = 0; j < doubledStr.length; j++){
          total += parseInt(doubledStr[j]);
        }
      } else {
        total += parseInt(number[i])
      }
    }
    return total % 10 == 0)
  },
  isOddIndex(i) {
    return (i + 1) % 2 == 0
  }
}

