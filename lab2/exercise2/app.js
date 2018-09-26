var Comparer = require('./Comparer');
var Calculator = require('./Calculator');

//set module property

var num1 = 10;
var num2 = 10;

//call module method
Comparer.AreNumberEqual(num1, num2) ? Calculator.Add(num1, num2) : 
Calculator.Subtract(num1, num2);

