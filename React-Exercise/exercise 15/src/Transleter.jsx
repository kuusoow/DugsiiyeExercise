

import { useContext } from 'react'
import  LanguageContext from './LanguageContext.jsx'

function Transleter() {
    const language =useContext(LanguageContext)
  return (
    <>
    {language === "eng" ?( <h1>Hello !</h1>) :   <h1>¡Hola!</h1>
        
    
    }
</>
  )
}

export default Transleter
