import  {useReducer, useState}from 'react';
import {UseRreducer , initialState} from './UseReducer'
import Context from './Context'
import ContactForm from './ContactForm.jsx'
import ContactList from './ContactList.jsx'
function ContactApp() {
    const [state,dispatch]=useReducer(UseRreducer,initialState)
     const [editingContact, setEditingContact] = useState(null);
  return (
  <Context.Provider value={{state , dispatch}}>
    <ContactForm 
    dispatch={dispatch}
      editingContact={editingContact}
      setEditingContact={setEditingContact}
    
    />
    <ContactList state={state}
      dispatch={dispatch}
      setEditingContact={setEditingContact}
    />
  </Context.Provider>
  );
}

export default ContactApp;
