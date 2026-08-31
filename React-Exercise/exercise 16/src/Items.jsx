import React from 'react';
import { useContext } from 'react';
import ItemsContext from './ItemsContext.jsx'
const Items = ({item , handleClick}) => {
    const {AddTo} =useContext(ItemsContext)
  return (
    <>
    
      <h2>{item.name}</h2>
    <h2><strong>Price: $</strong>{item.price}</h2>
    <button onClick={()=>AddTo(item)}>Add To Cart</button> 
    </>
  );
}

export default Items;
 
