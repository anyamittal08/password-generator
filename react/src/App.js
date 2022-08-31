import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'


const LOWERCASE = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const UPPERCASE = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const SYMBOLS = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '<', ',', '>', '.', '?', '/']

function App() {

  let [password, setPassword] = useState('Your randomly generated password will be displayed here')
  let [length, setLength] = useState('16')
  let [lowercaseIsChecked, setLowercaseIsChecked] = useState(true)
  let [uppercaseIsChecked, setUppercaseIsChecked] = useState(true)
  let [numbersIsChecked, setNumbersIsChecked] = useState(false)
  let [symbolsIsChecked, setSymbolsIsChecked] = useState(false)

  const generatePassword = (e) => {
    e.preventDefault()

    let randomPassword = ''
    let temp = [];

    if (lowercaseIsChecked) temp = temp.concat(LOWERCASE)
    if (uppercaseIsChecked) temp = temp.concat(UPPERCASE) 
    if (numbersIsChecked) temp = temp.concat(NUMBERS)
    if (symbolsIsChecked) temp = temp.concat(SYMBOLS)
    
    for (let i=0; i < length; i++) {
      randomPassword += temp[Math.floor(Math.random() * temp.length)]
    }

    if (temp.length === 0 ) {
      alert('please select at least one parameter')
      return
    }
    setPassword(randomPassword)
    
  }

  const copyToClipboard = async (e) => {
    e.preventDefault()
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(password);
    }

    //add errr boundary here
};

  return (
    <div className="card text-center" style={{width: '50%', margin: "auto"}}>
      <div className="card-header"> Random Password Generator </div>
      <div className="card-body">
        <div className="card-text">
          <form>
            <div style={{textAlign: 'center'}}>
              <div style={{display: "inline-block", textAlign: "left"}}>
                <label htmlFor="pwLength"> Password Length: </label>
                <input id="pwLength"
                type="number" 
                defaultValue={length} 
                onChange={(e) => {
                  setLength(e.target.value)
                  }}/> <br/> 
                <input id="lowercase" type="checkbox" checked={lowercaseIsChecked} onChange={() => setLowercaseIsChecked(!lowercaseIsChecked)}/>
                <label htmlFor="lowercase"> Include lowercase characters </label> <br/>
                <input id="uppercase" type="checkbox" checked={uppercaseIsChecked} onChange={() => setUppercaseIsChecked(!uppercaseIsChecked)}/> 
                <label htmlFor="uppercase"> Include uppercase characters </label> <br/>
                <input id="numbers" type="checkbox" checked={numbersIsChecked} onChange={() => setNumbersIsChecked(!numbersIsChecked)}/> 
                <label htmlFor="numbers"> Include numbers </label> <br/>
                <input id="symbols" type="checkbox" checked={symbolsIsChecked} onChange={() => setSymbolsIsChecked(!symbolsIsChecked)}/> 
                <label htmlFor="symbols"> Include symbols </label> <br/>
              </div>
              </div>
            <button className="btn btn-outline-primary" onClick={generatePassword} style={{marginTop: '10px'}}> Generate Password </button> <br/> <br/>

            <div className="input-group mb-3">
              <label htmlFor="result"> </label>
              <input className="form-control" id='result' type="text" value={password} />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button" onClick={copyToClipboard}>
                  <FontAwesomeIcon icon={faCopy} /> 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }
export default App;


