const stateNotification = () => {
    return {
            type:'stateNotification',
            key: null,
            target: null,
            buttonType: null
            }
}



class State {
    screen = 0;
    value1 = null;
    value2 = null;
    operator = null;
    observers = []

    setOperator(operator){
        this.operator = operator
    }

    clearOperator(){
        this.operator = null
    }

    getCurrentValue(){
        return this[this.getCurrentValueKey()]
    }

    getCurrentValueKey(){
        if(this.operator){
            return 'value2'
        } else {
            return 'value1'
        }
    }

    getValues(){
        return [this.value1, this.value2]
    }

    clearValues(){
        this.value1 = ''
        this.value2 = ''
    }

    clearCurrentValue(){
        const currentValueKey = this.getCurrentValueKey()
        this[currentValueKey] = null

        const notification = {
            type:'screenShowValue',
            value:0
        }

        this.notifyAll(notification)

    }

    setCurrentValue(value){

        if(this.operator){
            if(this.value2 == null){
                this.value2 = ''
            }
            this.value2 += value

        } else {
            if(this.value1 == null){
                this.value1 = ''
            }
            this.value1 += value
        }

        const notification = {
            type:'screenShowValue',
            value:this.getCurrentValue()
        }
        this.notifyAll(notification)

        
    }

    subscribe(observer){
        if(!this.observers.includes(observer)){
            this.observers.push(observer)
        }
    }

    unsubscribe(observer){
        if(!this.observers.includes(observer)){
            const index = this.observers.indexOf(observer)
            delete this.observers[index]
        }
    }

    notifyAll(notification){
        //console.log(`> State: Notifying ${this.observers.length} observer(s)`)
        this.observers.forEach((observer) => {
            observer.update(notification)
            
        })
    }
}

export { State }