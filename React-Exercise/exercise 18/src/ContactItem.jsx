import React from 'react';

const ContactItem = ({item,dispatch, setEditingContact }) => {
   const { id, name, email, phone, favorite } = item
  return (
    <li>
    <strong>{name}</strong> {favorite && '★'}
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <button onClick={() => dispatch({ type: 'toggle', payload: id })}>
          {favorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <button onClick={() => setEditingContact(item)}>Edit</button>

        <button onClick={() => dispatch({ type: 'delete', payload: id })}>
          Delete
        </button>
   
    </li>
  );
}

export default ContactItem;
