// Add $s in front of JQuery variables
// Shouldn't need the find operations

var Calculator = function($inputs, $output){
  var self = this;
  this.result;
  this.memory = 0;
  this.display = "0";
  this.$inputs = $inputs;
  this.$output = $output;
  this.newInput = true;
  this.recentEqualsCall = false;

  //Instantiate empty computeQueue
  this.computeQueue = [];
  
  // Set content of $output to result
  this.$output.text(this.display);

  // Add click listener for numbers
  this.$inputs
    .on("click", ".num", numClick)
    .on("click", ".op2", op2Click)
    .on("click", ".op1", op1Click)
    .on("click", ".equals", equalsClick)
    .on("click", ".mod", modClick)
    .on("click", ".clear", clearClick)
    .on("click", ".mem", memClick);

  function numClick() {
    var numValue =  $(this).attr("value");
    self.numberInput(numValue);
  };

  function op2Click(){
    var opValue =  $(this).attr("value");
    self.operator2(opValue);
  };

  function op1Click(){
    var opValue =  $(this).attr("value");
    self.operator1(opValue);
  };

  function equalsClick(){
    self.equals();
  };

  function modClick(){
    var opValue =  $(this).attr("value");
    if (opValue == "negate"){
      self.negate();
    } else if (opValue == "float"){
      self.toFloat();
    }
  };

  function clearClick(){
    self.clear();
  };

  function memClick(){
    var opValue =  $(this).attr("value");
    if (opValue == "add"){
      self.memAdd();
    } else if (opValue == "sub"){
      self.memSub();
    } else if (opValue == "recall"){
      self.memRecall();
    } else if (opValue == "clear"){
      self.memClear();
    }
  };
};

Calculator.prototype = {
  // methods of operation
  updateOutput(){
    $(this.$output).text(this.display);
  },
  numberInput(n) {
    if (this.recentEqualsCall){
      this.computeQueue =  [];
      this.recentEqualsCall = false;
    }
    if (this.newInput){
      this.display = n.toString();
      this.newInput = false;
    } else {
      this.display += n.toString();
    }
    this.updateOutput();
  },
  operator2(op) {
    if (this.recentEqualsCall){
      this.recentEqualsCall = false;
    }
    switch(this.computeQueue.length) {
      case 0:
        this.computeQueue.push(parseInt(this.display));
        this.computeQueue.push(op);
        this.display = "0";
        this.updateOutput();
        this.newInput = true;
        break;
      case 1:
        this.computeQueue.push(op);
        this.display = "0";
        this.updateOutput();
        this.newInput = true;
      case 2:
        if (this.newInput){
          this.computeQueue[1] = op;
        } else{
          this.computeQueue.push(parseInt(this.display));
          this.compute2();
          this.computeQueue.push(this.result);
          this.computeQueue.push(op);
        }
        break;
      default:
        break;
    }
  },
  compute2(){
    var operand2 = this.computeQueue.pop();
    var operatorFunction = this.selectOperator(this.computeQueue.pop());
    var operand1 = this.computeQueue.pop();
    this.result = operatorFunction(operand1, operand2);
    this.display = this.result.toString();
    this.updateOutput();
    this.newInput = true;
  },
  selectOperator(op){
    switch(op){
      case "add":
        return function(op1, op2){return op1 + op2};
        break;
      case "sub":
        return function(op1, op2){return op1 - op2};
        break;
      case "mul":
        return function(op1, op2){return op1 * op2};
        break;
      case "div":
        return function(op1, op2){return op1 / op2};
        break;
      case "sqrt":
        return function(op1){return Math.sqrt(op1)};
        break;
      case "percent":
        return function(op1){return op1 / 100};
        break;
      default:
        console.log("didn't find a match: " + op);
        break;
    }
  },
  operator1(op) {
    if (this.recentEqualsCall){
      this.recentEqualsCall = false;
    }
    switch(this.computeQueue.length) {
      case 0:
        this.computeQueue.push(parseInt(this.display));
        this.computeQueue.push(op);
        this.compute1();
        this.computeQueue.push(this.result);
        break;
      case 1:
        this.computeQueue.push(op);
        this.compute1();
        this.computeQueue.push(this.result);
        break;
      case 2:
        this.computeQueue[1] = op;
        this.compute1();
        this.computeQueue.push(this.result);
        break;
      default:
        break;
    }
  },
  compute1(){
    var operator = this.computeQueue.pop();
    var operand = this.computeQueue.pop();
    var operatorFunction = this.selectOperator(operator);
    this.result = operatorFunction(operand);
    this.display = this.result.toString();
    this.updateOutput();
    this.newInput = true;
  },
  equals(){
    switch(this.computeQueue.length) {
      case 0:
        break;
      case 2:
        this.computeQueue.push(parseInt(this.display));
        this.compute2();
        this.computeQueue.push(this.result);
        this.recentEqualsCall = true;
        break;
      default:
        break;
    }
  },
  negate(){
    if (this.display[0] != "-"){
      this.display = "-" + this.display;
    } else {
      this.display = this.display.substring(1);
    }
    this.updateOutput();
  },
  toFloat(){
    if (! this.display.includes(".")){  
      this.display += "."
    }
    this.updateOutput();
  },
  memClear(){
    this.memory = 0;
  },
  memRecall(){
    this.display = this.memory.toString();
    this.updateOutput();
  },
  memAdd(){
    this.memory += parseInt(this.display);
  },
  memSub(){
    this.memory -= parseInt(this.display);
  },
  clear(){
    this.computeQueue = [];
    this.display = "0";
    this.updateOutput();
    this.newInput = true;
  }
}
