import { Transforms } from './transforms.js'
import { Operators } from './operators.js'

class Calculator {
    constructor(state){
        this.state = state
        this.screen = document.querySelector('.screen')
    }

    inputHandler(event){
        if(event.type == 'click' || event.type == 'keydown'){
            this.valueHandler(event)
            this.operatorHandler(event)
            this.transformHandler(event)
            this.execOperation(event)
        }
    }

    operatorHandler(event){
        const key = event.key.toString()
        if(key.match(/([-+*/])/)){
            
            if(this.state.value2 && this.state.operator){
                const notification = {
                    type: "click",
                    key: "Enter",
                    target: {},
                    buttonType: "equal"
                }
                this.execOperation(notification)
                this.state.setOperator(event.key)
                return
            }

            if(this.state.value1 && !this.operator){
                this.state.setOperator(event.key)
                return 
            }
        }
    }

    valueHandler(event){
        const key = event.key.toString()
        if(key.match(/([0-9])/)){
            this.state.setCurrentValue(event.key)
            return 
        }
    }

    transformHandler(event){
        const key = event.key.toString()

        if(key == 'Delete'){
            this.state.clearValues()
            this.state.clearOperator()
            this.state.setCurrentValue(0)

        } else if(key.match(/([.%i])|Backspace/)){
            
            const transform = Transforms[event.key]
            const value = transform(this.state.getCurrentValue())
            this.state.clearCurrentValue()
            this.state.setCurrentValue(value)
            return 
        }
    }

    execOperation(event){
        const key = event.key.toString()
        if(key == 'Enter' && this.state.operator && this.state.value1 && this.state.value2){  
            const operation = Operators[this.state.operator]
            const a = parseFloat(this.state.getValues()[0])
            const b = parseFloat(this.state.getValues()[1])
            
            this.state.clearValues()
            this.state.clearOperator()

            if(a && b){
                this.state.setCurrentValue(operation(a, b))
            }else if(a){
                this.state.setCurrentValue(a)
            } else {     
                this.state.setCurrentValue(b)
            }
            return 
        } 
    }

    update(notification){
        //console.log(`>> Calculator: Receveid notification`, notification)
        this.inputHandler(notification)
    }
}

export { Calculator }
