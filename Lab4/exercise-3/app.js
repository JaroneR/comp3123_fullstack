var should = require('should')
var calc = require('./calculator')

calc.AddTwoNumbers("a","b")

describe('Calculator', function(){
    describe('When used synchronously', function (){
        it('should add two numbers correctly', function (){
            calc.AddTwoNumbers(2,2).should.equal(4)
        })
    })
    describe('When used synchronously', function (){
        it('should not add two numbers correctly', function (){
            calc.AddTwoNumbers(6,2).should.notEqual(4)
        })
    })
})

