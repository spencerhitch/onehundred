//
//Add listeners for each of the button types
//attach listeners to methods
//create calculator object
//

// Define a log function
var Calculator = function(inputs, output){
  var self = this;
  this.result;
  this.display = "0";
  this.inputs = inputs;
  this.output = output;
  this.newInput = true;

  //Instantiate empty computeQueue
  this.computeQueue = [];
  
  // Set content of output to result
  $(this.output).text(this.display);

  // Add click listeners
  $(this.inputs).find(".num").click(function(){
    var numValue =  $(this).attr("value");
    self.numberInput(numValue);
  });

  $(this.inputs).find(".op").click(function(){
    var opValue =  $(this).attr("value");
    self.operator(opValue);
  });
  
}

Calculator.prototype = {
  constructor: Calculator,
  // methods of operation
  updateOutput(){
    $(this.output).text(this.display);
  },
  numberInput(n) {
    if (this.newInput){
      this.display = n.toString();
      this.newInput = false;
    } else {
      this.display += n.toString();
    }
    this.updateOutput();
  },
  operator(op) {
    switch(this.computeQueue.length) {
      case 0:
        this.computeQueue.push(parseInt(this.display));
        this.computeQueue.push(op);
        this.display = "0";
        this.updateOutput();
        this.newInput = true;
        break;
      case 2:
        if (this.newInput){
          this.computeQueue[1] = op;
        } else{
          this.computeQueue.push(parseInt(this.display));
          this.compute();
          this.computeQueue.push(this.result);
          this.computeQueue.push(op);
        }
        break;
      default:
        break;
    }
  },
  compute(){
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
        return function(op1, op2){return op1 + op2}
        break;
      case "sub":
        return function(op1, op2){return op1 - op2}
        break;
      case "mul":
        return function(op1, op2){return op1 * op2}
        break;
      case "div":
        return function(op1, op2){return op1 / op2}
        break;
    }
  }
}
