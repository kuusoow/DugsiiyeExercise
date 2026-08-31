import React,{useState} from 'react'
import  LanguageContext from './LanguageContext.jsx'
import Transleter from './Transleter'

const App = () => {
  const [language,setLanguage]=useState('eng')
  return (
    <LanguageContext.Provider value={language}>
      <Transleter/>
      <button onClick={()=>setLanguage(prev=>prev==='eng'? 'spanish' : 'eng')}>Switch To {language === 'eng' ? "English" : 'Spanish'}</button>
    </LanguageContext.Provider>
  )
}

export default App
