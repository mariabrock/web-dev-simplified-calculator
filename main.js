class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if(number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand + number

	}

	chooseOperation(operation) {
		if(this.currentOperand === '') return
		if(this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		console.log('Compute has fired.')
		let computation
		const previous = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		console.log(parseFloat(this.previousOperand))
		console.log(this.operation)
		console.log(current)
		if(isNaN(previous) || isNaN(current)) return
		switch (this.operation) {
			case '&plus;':
				computation = previous + current
				console.log('Addition has computed.')
				break
			case '&minus;':
				computation = previous - current
				console.log('Subtraction has computed.')
				break
			case '&times;':
				computation = previous * current
				console.log('Multiplication has computed.')
				break
			case '&divide;':
				computation = previous / current
				console.log('Division has computed.')
				break
			default:
				return "Something broke."
		}
		console.log('Compute has completed')
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand
		this.previousOperandTextElement.innerText = this.previousOperand
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber((button.innerText))
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation((button.innerText))
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	console.log('You pressed the equals button.')
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})
