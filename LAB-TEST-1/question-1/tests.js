var calc = require('./calculator.js');
var should = require('should');

describe('Calculator', function () {
    
    describe('when multiplying two numbers', function () {
        
        it('should multiply two numbers correctly', function () {
            calc.multiplyTwoNumbers(4,4).should.equal(16);
        });
        it('should multiply two numbers correctly', function () {
            calc.multiplyTwoNumbers(2,5).should.equal(10);
        });
        it('multiply two numbers should not equal', function () {
            calc.multiplyTwoNumbers(2,2).should.not.equal(5);
        });
        it('should throw an error', function () {
           (function(){
                 calc.multiplyTwoNumbers("a","b");
          }).should.throw();
        });
    })
    describe('even doubler', function () {
        
        it('even double when even', function () {
            calc.evenDoubler(2).should.equal(4);
        });
        it('should not double when odd', function () {
            calc.evenDoubler(3).should.not.equal(9);
        });
        it('should equal zero when odd', function () {
            calc.evenDoubler(9).should.equal(0);
        });
    });
});