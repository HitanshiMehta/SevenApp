import React from "react"
import { home } from "../../Common/AppConfig"
const max = 6
const min = 1

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diceOne: null,
            diceTwo: null
        }
    }
    handleRollDice = () => {
        const { diceOne, diceTwo } = this.state;
        const RandomOne = Math.floor(Math.random() * (max - min + 1)) + min;
        const RandomTwo = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({
            diceOne: RandomOne,
            diceTwo: RandomTwo
        }, () => {
            this.props.onResult(diceOne, diceTwo)
        })

    }
    render() {
        return (
            <center>
                <button
                    className={home.btn}
                    onClick={this.handleRollDice}>
                    {home.rollDice}
                </button><br />
                <span>{this.state.diceOne} {this.state.diceTwo}</span>
            </center>
        )
    }
}

export default Result