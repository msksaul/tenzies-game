import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstVAlue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstVAlue)
        if(allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function allNewDice() {
        const newDice = []
        for(let i=0; i<10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random()*6), 
            isHeld: false,
            id: nanoid()
        }
    }

    function rollDice() {
        if(!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld === true
                    ? die
                    : generateNewDie()
            }))
        }else {
            setTenzies(false)
            setDice(allNewDice())
        }

        
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id
                ? {...die, isHeld: !die.isHeld}
                : die
        }))
    }

    const diceElements = dice.map(die => <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />)

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
               {diceElements} 
            </div>
            <button className='roll-dice' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
        </main>
    )
}