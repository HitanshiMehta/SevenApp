import React from 'react'
import { ThemeContext } from './Context'
function DisplayData({ Checking }) {
    const context = React.useContext(ThemeContext)
    return (
        <div>
            Hello {context}
            <label onClick={() => { Checking("HelloHI") }}>Helllooo</label>
        </div>
    )
}

export default DisplayData