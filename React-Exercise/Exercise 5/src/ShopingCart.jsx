import {useState} from 'react'

export default function ShopingCart() {

    
    const [product,setProduct]=useState('')
    const[price,setPrice]=useState('')
    const[productItem,setProductItem]=useState([])





    function handleClick(){
        if (product.trim() !== '' && price.trim() !== ''  ) {
        const newProduct = {
            id:Date.now(),
            name:product,
            price:price,
            quantity:1
        }
        setProductItem((prev)=> [...prev,newProduct])
        setPrice('')
        setProduct('')
    }}
    
function minus(id){
setProductItem(prev => prev.map(product =>
      product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
   ))

}
function plus(id){
    setProductItem(prev => 
        prev.map(product =>       product.id === id
? { ...product, quantity: product.quantity + 1 }
           : product
   ))
}
function handleRemove(id){
    setProductItem(prev=>{
       return  prev.filter(product =>{
          return  product.id !== id 
                

            
        })
    })
}

       const total =productItem.reduce((sum,product) =>{
          return   sum + (product.price * product.quantity)
       },0)
    const productLists=productItem.map(product =>{
        const price = product.price * product.quantity
     
       return  <div key={product.id}>
           <h2>{product.name} - ${price}</h2>
        
            <h2>Quantity:<button onClick={()=>minus(product.id)}>-</button>{product.quantity}<button onClick={()=>plus(product.id)}>+</button>
           
            </h2>
         <button onClick={()=>handleRemove(product.id)}>Remove</button>

        
        </div>



        
    })
    


    return (
        <>
        <h1> Simple Shoping Cart</h1>
        <h3>Add  a product</h3>
        
     <input type="text"
      placeholder='Product Name'
        name='product'
         value={product}
      onChange={(e)=>setProduct(e.currentTarget.value)}
    
     
     
     /> 
     <input type="number" 
     placeholder='Price'
      value={price}
     onChange={(e)=>setPrice(e.currentTarget.value)}
     name='price'
   
     />

     <button onClick={handleClick}>Add To Cart</button>

   {productItem.length > 0 &&  <div>
        <h3>Products in Cart</h3>
        { productLists }
        <h2>Total prices:{total}</h2>
     </div>}
     {productItem.length === 0 && <h1>The Cart is Embty</h1>}
        </>
     )

}