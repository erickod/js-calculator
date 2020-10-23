const Transforms = {
}

Transforms['.'] = (value) => {
    if(!value){
        value = '0.'
        return value
    }

    value =!`${value}`.match(/\./) ? `${value}.` : `${value}`
    return value
}


Transforms['%'] = (value) => {
    if(value == 0 || value == null){
        return 0
    }
    return value / 100
}


Transforms['Backspace'] = (value) => {
    value = `${value}`
    if(value.length > 1){
        value = value.slice(0,-1)
        return value
    }
    return 0
}


Transforms['Delete'] = (value) => {
    value = 0
    return value
}


Transforms['i'] = (value) => {
    return value * -1
}

export {Transforms}