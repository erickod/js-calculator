const inputNotification = () => {
    return {
            type:'click',
            key: null,
            target: null,
            buttonType: null,
            }
}



class KeyboardListener{
    observers = []

    constructor(inputNotificationObject = inputNotification){
        this.inputNotification = inputNotificationObject
        this.stopDefaultBehaviour()
        this.keyDownConfig()
        this.keyupConfig()

    }

    keyDownConfig(){
        document.addEventListener('keydown', (event, listenerContext=this) => {

            const notification = listenerContext.inputNotification()
            const key = event.key

            notification.key = key
            notification.type = 'keydown'
            notification.target = document.querySelector(`[data-value="${key}"]`)
            
            if(notification.target){
                const elementType = notification.target.getAttribute('data-type')
                
                notification.buttonType = elementType
                listenerContext.notifyAll(notification)
            }
            
        })
    }

    keyupConfig(){
        document.addEventListener('keyup', (event, listenerContext=this) => {

            const notification = listenerContext.inputNotification()
            const key = event.key

            notification.key = key
            notification.type = 'keyup'
            notification.target = document.querySelector(`[data-value="${key}"]`)
            
            if(notification.target){
                const elementType = notification.target.getAttribute('data-type')
                
                notification.buttonType = elementType
                listenerContext.notifyAll(notification)
            }
            
        })
    }

    stopDefaultBehaviour() {

        const stopEvent = (eventObejct) => {
            /*
            https://stackoverflow.com/questions/1495219/
            how-can-i-prevent-the-backspace-key-from-navigating-back
            */
            let event = eventObejct || window.event;
            if (event.keyCode == 8 || event.keyCode == 111 || event.keyCode == 191) { // Backspace and NumpadDivid
                let elements = "HTML, BODY, TABLE, TBODY, TR, TD, DIV";
                let d = event.srcElement || event.target;
                let regex = new RegExp(d.tagName.toUpperCase());
                
                //it's not REALLY true, checking the boolean value (!== true) 
                //always passes, so we can use != 'true' rather than !== true/
                if (d.contentEditable != 'true') { 
                    if (regex.test(elements)) {
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    }
                }
            }}
        
            document.onkeydown = (e) => {stopEvent(e)}
            document.onkeypress = (e) => {stopEvent(e)}
    }

    subscribe(callable){
        if(!this.observers.includes(callable)){
            this.observers.push(callable)
        }
    }

    unsubscribe(callable){
        if(this.observers.includes(callable)){
            const index = this.observers.indexOf(callable)
            delete this.observers[index]
        }
    }

    notifyAll(notification){
        //console.log(`KeyboardListerner: Notifying ${this.observers.length} observer(s)`)
        this.observers.forEach((observer) => {
            observer.update(notification)
        })
    }
}


class ClickListener{
    observers = []

    constructor(inputNotificationObject = inputNotification){
        this.inputNotification = inputNotificationObject

        document.addEventListener('click', (event, listenerContext=this) => {
            const elementKey = event.target.getAttribute('data-value')
            const elementType = event.target.getAttribute('data-type')

            const notification = listenerContext.inputNotification()
            notification.key = elementKey
            notification.target = event.target
            notification.buttonType = elementType

            if(elementKey){
                listenerContext.notifyAll(notification)
            }
        })
    }

    subscribe(observer){
        if(!this.observers.includes(observer)){
            this.observers.push(observer)
        }
    }

    unsubscribe(callable){
        if(this.observers.includes(callable)){
            const index = this.observers.indexOf(callable)
            delete this.observers[index]
        }
    }

    notifyAll(notification){
        //console.log(`> ClickListener: Notifying ${this.observers.length} observer(s)`)
        for(let observer of this.observers){
            observer.update(notification)
        }
    }
}

export { KeyboardListener, ClickListener }