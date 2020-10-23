import { Calculator } from './calculator.js';
import { State } from './state.js';
import { Screen } from './screen.js';
import { InputStyle } from './style.js';
import { KeyboardListener, ClickListener } from './inputLayer.js';


(()=>{

    const screen = new Screen()
    const state = new State()
    const inputStyle = new InputStyle()

    const calculator = new Calculator(state)
    const keyboardListener = new KeyboardListener()
    const clickListener = new ClickListener()

    
    clickListener.subscribe(calculator)
    clickListener.subscribe(inputStyle)
    
    keyboardListener.subscribe(calculator)
    keyboardListener.subscribe(inputStyle)

    state.subscribe(screen)


})()