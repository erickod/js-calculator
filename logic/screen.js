class Screen {
    constructor(){
        this.htmlNode = document.querySelector('.screen > div')
    }

    showValue(notification){
        if(notification.type === 'screenShowValue'){
            const value = parseFloat(notification.value)
            this.htmlNode.innerText = `${value}`
        }
    }

    update(notification){
        //console.log(`>> Screen: Receveid notification`, notification)
        this.showValue(notification)
        
    }

}

export { Screen }