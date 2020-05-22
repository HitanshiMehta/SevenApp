import React from "react"
import Result from "./Result"
import UserChoice from "./UserChoice"

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diceOne: null,
            diceTwo: null
        }
    }
    getResult = (diceOne, diceTwo) => {
        this.setState({
            diceOne, diceTwo
        }
            //    , () => { console.log(this.state.diceOne, this.state.diceTwo) }
        )
    }
    render() {
        return (
            <center>
                <UserChoice />
                <Result onResult={this.getResult} />
            </center>
        )
    }
}

export default Home