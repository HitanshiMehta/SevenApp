import { ThemeContext } from './Context'
import DisplayData from './DisplayData'


function FormComponent() {
    const [userName, SetUserName] = useState()
    const age = React.useRef()
    const file = React.useRef()
    const [bgColor, setBgColor] = useState('Red')
    const handleFormSubmit = (e) => {
        e.preventDefault()
        alert(age.current.value + " You file name is " + file.current.files[0].name)
    }
    const Checking = (data) => {
        console.log(data)
    }
    let header = 'Hello'
    if (userName) {
        header = 'Hello ' + userName
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <h1>{header}</h1>
            <input
                type='text'
                name='username'
                value={userName}
                onChange={(e) => SetUserName(e.target.value)}
            />
            <input
                ref={age}
                type="number" />
            <input
                type="file"
                ref={file}
            />
            <input
                type="submit"
            />
            <ThemeContext.Provider value={bgColor}>
                <DisplayData Checking={Checking}/>
            </ThemeContext.Provider>
        </form>
    )
}

export default FormComponent