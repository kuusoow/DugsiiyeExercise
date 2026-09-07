import ContactItem from './ContactItem'


function ContactList({state,dispatch,setEditingContact}) {
  return (
    <div>
      <h1>Contacts</h1>
     {state.length > 0 ? (
   <ul>
        {state.map((item) => (
          <ContactItem
            key={item.id}
            item={item}
            dispatch={dispatch}
            setEditingContact={setEditingContact}
          />
        ))}
      </ul> ): (  <p>No contacts available.</p>)
      
}
    </div>
      
     
  )
}

export default ContactList
