import React from "react"
import styles from "../../Style/HomeStyle.module.css"

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
                <button className={styles.btn}>7 DOWN</button>
                <button className={styles.btn}>7</button>
                <button className={styles.btn}>7 Up</button>
            </>
        )
    }
}
export default UserChoice