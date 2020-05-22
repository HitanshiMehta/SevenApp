import React from "react"
import { home } from "../Common/AppConfig"
const max = 6
const min = 1

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diceOne: null,
            diceTwo: null
        }
    }
    handleRollDice = () => {
        const diceOne = Math.floor(Math.random() * (max - min + 1)) + min;
        const diceTwo = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({
            diceOne, diceTwo
        })

    }
    render() {
        return (
            <>
                <button onClick={this.handleRollDice}>{home.rollDice}</button>
                <span>Result is {this.state.diceOne}-{this.state.diceTwo}</span>
            </>
        )
    }
}

export default Home