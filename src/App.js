import React, { useState } from 'react';
import Button from './components/Button';
import './App.css'

function App() {

    const [current, setCurrent] = useState('0');
    const [prev, setPrev] = useState('');
    const [nextIsReset, setNextIsReset] = useState(false);
    const [inpSym, setInpSym] = useState('')
    const [inpNum, setInpNum] = useState(false)

    const reset = () => {
        setCurrent('0');
        setPrev('');
        setNextIsReset(false)
    }

    const addToCurrent = (symbol) => {
        if (['/', '*', '-', '+'].indexOf(symbol) > -1) {
            if (inpSym === '' || inpNum) {
                setInpSym(symbol)
                setPrev(eval(prev + current) + symbol);
                setNextIsReset(true)
                setInpNum(false)
            } else {
                let newVal = prev.split(inpSym);
                setPrev(newVal[0] + symbol);
                console.log(newVal)
                setInpSym(symbol)
                setNextIsReset(true)
            }

        }
        else {
            if ((current === "0" && symbol !== ".") || nextIsReset) {
                setCurrent(symbol)
                setNextIsReset(false)
                setInpNum(true)
            }
            else {
                setCurrent(current + symbol)
                setInpNum(true)
            }
        }
    }

    const solve = () => {
        if (prev.length > 0) {
            let newCurrent = eval(String(prev + current));
            setCurrent(newCurrent);
            setPrev('')
            setNextIsReset(true)
            setInpSym('')
        }
    }


    const buttons = [
        { symbol: 'C', cols: 3, action: reset },
        { symbol: '/', cols: 1, action: addToCurrent },
        { symbol: '7', cols: 1, action: addToCurrent },
        { symbol: '8', cols: 1, action: addToCurrent },
        { symbol: '9', cols: 1, action: addToCurrent },
        { symbol: '*', cols: 1, action: addToCurrent },
        { symbol: '4', cols: 1, action: addToCurrent },
        { symbol: '5', cols: 1, action: addToCurrent },
        { symbol: '6', cols: 1, action: addToCurrent },
        { symbol: '-', cols: 1, action: addToCurrent },
        { symbol: '1', cols: 1, action: addToCurrent },
        { symbol: '2', cols: 1, action: addToCurrent },
        { symbol: '3', cols: 1, action: addToCurrent },
        { symbol: '+', cols: 1, action: addToCurrent },
        { symbol: '0', cols: 2, action: addToCurrent },
        { symbol: '.', cols: 1, action: addToCurrent },
        { symbol: '=', cols: 1, action: solve },
    ]
    return (
        <div className="App">
            {prev.length > 0 ?
                <div className="float-last">{prev}</div>
                : null

            }
            <input className="result" type="text" value={current} onChange={(e) => setCurrent(e.target.value)}></input>

            {buttons.map((btn, i) => {
                return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
            })}

        </div>
    );

}

export default App;
