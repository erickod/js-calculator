class InputStyle {

    update( notification ) {
        this.inputStyle(notification)
        this.keyupStyle(notification)
    }

    keyupStyle(notification){
        const inputType = notification.type

        if(inputType && inputType == 'keyup'){
            const element = notification.target
            let cssClasses = ''

            for(let cssClass of element.classList){
                if ( cssClass != 'input' && !cssClasses.match(cssClass)) {
                    cssClasses = `${cssClasses} ${cssClass}`
                }
            }

            element.classList = cssClasses
        }
    }

    inputStyle(notification){
        const inputType = notification.type

        if(inputType && inputType == 'keydown'){
            const element = notification.target
            let cssClasses = element.getAttribute('class')
            element.classList = !cssClasses.match('input') ? `${cssClasses} input` : cssClasses

            //console.log(cssClasses)

        }
    }
}

export { InputStyle }