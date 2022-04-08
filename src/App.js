import React, { useState } from 'react';
import Button from './components/Button';
import './App.css'

function App() {

    const [current, setCurrent] = useState('0');
    const [prev, setPrev] = useState([]);
    const [nextIsReset, setNextIsReset] = useState(false);

    const reset = () => {
        setCurrent('0');
        setPrev([]);
        setNextIsReset(false)
    }

    const addToCurrent = (symbol) => {
        if (['/', '*', '-', '+'].indexOf(symbol) > -1) {
            setPrev([...prev, current + symbol]);
            setNextIsReset(true)
            console.log(prev);
        }
        else {
            if ((current === "0" && symbol !== ".") || nextIsReset) {
                setCurrent(symbol)
                setNextIsReset(false)
            }
            else {
                setCurrent(current + symbol)
            }
        }
    }

    const solve = () => {
        if (prev.length > 0) {
            let prevItem = prev.reduce((acc, item) => acc + item, '')
            console.log(prevItem, current)
            let newCurrent = eval(String(prevItem + current));
            setCurrent(newCurrent);
            setPrev([])
            setNextIsReset(true)
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
                <div className="float-last">{prev[prev.length - 1]}</div>
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
