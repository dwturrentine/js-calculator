// Class to store information for typed numbers and operations

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) { // Takes input and functions for calculator
        this.previousOperandTextElement = previousOperandTextElement // Variables set in class 
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // Called after creation function to clear inputs and set to default when the calculator is created
        
    }
// Operations of the Calculator Class

    // Clears the different variables

    clear() {

        // Properties stored in the calculator

        this.currentOperand = '' // Default
        this.previousOperand = ''
        this.operation = undefined // No operation because the properites are cleared
        

    }
    // Removes a single number

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // Removes last character/number 

    }

    // Click the number and add to screen - passes the number the user selected

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // Sets only one ne period in the calculation
        this.currentOperand = this.currentOperand.toString() + number.toString() // Converts to string to append and not add numbers
    }
    // User clicks on operation - takes the operation user selected

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') { // Checks to compute input
            this.compute()
        }
        this.operation = operation // Set to operation passed in - calculator selects operation for computing
        this.previousOperand = this.currentOperand // Recycles number to previous operand
        this.currentOperand = '' // Clears new current operand

    }
    
    // Take values inside of calculator and compute single value needed to display on calculator

    compute() {
        let computation // Variable to be result of the compute function
    const prev = parseFloat(this.previousOperand) // Number version - string to number
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return // Check if user does not enter number - will cancel function
    switch (this.operation) { // Computing user inputs
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation // Sets result of computation
    this.operation = undefined
    this.previousOperand = ''
}

    getDisplayNumber(number) {
        const stringNumber = number.toString() // String to split number and decimal
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // Splits on period character - turns into array
        const decimalDigits = stringNumber.split('.')[1] // Places integer first
        let integerDisplay
        if (isNaN(integerDigits)) { // When input is nothing or just decimal
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) // After string with commas - no decimal after value after the conversion to a string with commas
        }
        if (decimalDigits != null) { // Decimal with digits after
          return `${integerDisplay}.${decimalDigits}` // Appends
        } else {
          return integerDisplay // No decimal digits
        }
      
    }
    // Update the values inside of output

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    
}

// Selects HTML elements

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Create calculator - connecting variables to work on calculator

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) // Pass in elements from constructor

// To use - select buttons

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Calls compute button

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

// Clears calculator input/output

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

// Deletes single character from end of input

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })