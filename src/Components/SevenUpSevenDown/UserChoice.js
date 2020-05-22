import React from "react"

class UserChoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: 0
        }
    }
    render() {
        return (
            <>
                <button >
                    <span >
                        <div ></div>
                        <div ></div>
                    </span>
                </button>
                <button >
                    <span>
                        <div ></div>
                        <div ></div>
                    </span>
                </button>
                <button >
                    <span>
                        <div ></div>
                        <div ></div>
                    </span>
                </button>

            </>
        )
    }
}
export default UserChoice