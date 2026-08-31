import React from 'react';
import { useContext } from 'react';
import ItemsContext from './ItemsContext.jsx'
const CartSummery = () => {
      const {items , RemoveTo} =useContext(ItemsContext)
  return (
    <div>
      <h1>Cart Summery</h1>
      <h2>Total Items : {items.length}</h2>
      <ul>
        {items.map(item=>(<li>{item.name} _ $ {item.price}
            <button onClick={()=>RemoveTo(item.id)}>Remove</button>
        </li>))}
      </ul>
    </div>
  );
}

export default CartSummery;
