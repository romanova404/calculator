import './App.css';
import { React, useState, useEffect } from 'react';



function App() {

  const [screenValue, setScreenValue] = useState('0');

  const [clickedValue, setClickedValue] = useState (0);

  const [history, setHistory] = useState([]);

  const [calcArray,setCalcArray] = useState([]);


  const handleClick = (event) => { 
    setClickedValue(event.target.innerText);

    if (clickedValue === 'AC') {
      setHistory([]);
    } else {
      setHistory(history.concat([event.target.innerText]));
    }
  }
 

  useEffect(() => {
    setScreenValue(showScreen(clickedValue));
  }, [ history ])



  return (
    <div className="page">
      <div className="app__container">
        <button className="app__history">{calcArray.join(" ")} </button>
        <button className="app__screen">{screenValue} </button>
        <div className="app__keyboard">
          <div className="keyboard__line">
            <button className="button__short" onClick={handleClick}>C</button>
            <button className="button__short" onClick={handleClick}>7</button>
            <button className="button__short" onClick={handleClick}>8</button>
            <button className="button__short" onClick={handleClick}>9</button>
            <button className="button__short" onClick={handleClick}>+</button>
          </div>

          <div className="keyboard__line">
            <button className="button__short" onClick={handleClick}>AC</button>
            <button className="button__short" onClick={handleClick}>4</button>
            <button className="button__short" onClick={handleClick}>5</button>
            <button className="button__short" onClick={handleClick}>6</button>
            <button className="button__short" onClick={handleClick}>-</button>

          </div>

          <div className="keyboard__line">
            <button className="button__short" onClick={handleClick}>+/-</button>
            <button className="button__short" onClick={handleClick}>1</button>
            <button className="button__short" onClick={handleClick}>2</button>
            <button className="button__short" onClick={handleClick}>3</button>
            <button className="button__short" onClick={handleClick}>/</button>
          </div>

          <div className="keyboard__line">
            <button className="button__long" onClick={handleClick}>=</button>
            <button className="button__long" onClick={handleClick}>0</button>
            <button className="button__short" onClick={handleClick} id="point">.</button>      
          </div>
        </div>
      </div>
    </div>
  );



  function showScreen(input) {

    if ( !isNaN(input)) {  //if input = number

      if (screenValue === '0') { //if we have now 0

        if (input === 0) { // if we click 0 while 0
          return screenValue;
        } else {
          return input + ''; // if we click non-zero while 0
        } 

      } else if (isNaN(screenValue)) { // if we  have operator and input = number
        
        return input;

      } else { //if we have non-zero number

        if (screenValue.length < 8) { //if  we have number < 8 digits
          return screenValue + input;
        } else {
          return screenValue; //if we have length 8 already
        }
        
      }
    } else if (input === 'AC') {                               //AC
        setCalcArray([]);
      return '0'; 
    } else if (input === 'C') {                                //C - это не backspace!

      if ( !isNaN(screenValue) ) { //если number
        if (calcArray.length == 2) {
          return calcArray[calcArray.length - 1] 
        } else {
          setCalcArray([]);
          return 0;
        }
    
      } else {                     //если operator
        calcArray.pop();
        return calcArray[calcArray.length - 1]; //стереть посл oper и показать number перед ним
      }

    } else if (input === '.') {                                 // точечка

      return (!isNaN(screenValue)) ? (screenValue + input) : '0.';

    } else if (input === '+/-') {                                //+/-

      return (!isNaN(screenValue)) ? (screenValue * -1) : screenValue;

    } else {                                            // if input operator => trigger calc OR change oper
      const helpArray = calcArray.concat(screenValue, input); 
      return considerArr(helpArray);
       
    }
  } 

  function considerArr (arr) { 

    if (arr.length === 2) {
      if (arr[1] === '=')  {
        setCalcArray (arr.slice(0, 1));
        return arr[0];
      } else {
        setCalcArray(arr);
        return arr[1];
      }

    } else if (arr.length === 4) {
    
      if (arr[1] == arr[2]) {
        arr.splice(1, 2);
        return considerArr(arr);
      } else {
        const operator = arr[arr.length -1];
        const result = mathing(arr.slice(0, arr.length));
        if (result.toString().length > 8) { return 'error'};
  
        if (operator === '=') {
          setCalcArray([]);
          return result;
        } else {
          setCalcArray([result, operator]);
          return operator;
        }
      }

    } 
  }

  function mathing (arr) {
    let a = arr[0];
    let b = arr[2];
    let operator = arr[1];
    switch (operator) {
      case '+':
        return Number(a) + Number(b);
      case '-':
        return Number(a) - Number(b);
      case '/':
        return Number(a) / Number(b);
      default:
        return 'Error';
    }
  }
}

export default App;

