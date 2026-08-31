import React from 'react';
import ItemsContext from './ItemsContext.jsx'
import Items from './Items';
import CartSummery from './CartSummery.jsx'
const App = () => {

  const [items,setItems]=React.useState([]);

  const AddTo =(item)=>{
    setItems(prev=>([...prev ,item]))

  }
const RemoveTo =(id)=>{
setItems(prev => prev.filter(item =>(item.id !==id)))

}
 const value ={ AddTo, RemoveTo , items}

  

  return (
    <ItemsContext.Provider value={value}>
      <Items item={{name:"Widget" , price:90 , id:1}}/>
      <Items item={{name:"Laptop" , price:300 , id:2}}/>
    <CartSummery/>
    </ItemsContext.Provider>
  );
}

export default App;

