import { useState } from 'react'
import List from './components'
import { CartCard } from './components'

export default function App(){
      const [selectedItems, setSelectedItems] = useState([]);

    function handleUpdateCart(item, newQuantity) {
        setSelectedItems(prevItems => {
            // Check if the item already exists
        const existingItemIndex = prevItems.findIndex(i => i.name === item.name);

        if(existingItemIndex !== -1) {
            // if quantity is 0, remove the item
            if(newQuantity === 0) {
                return prevItems.filter((_, index) => index !== existingItemIndex);
            }

            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {...item, quantity:newQuantity}
            return updatedItems;
        } else {
            if(newQuantity > 0) {
                return [...prevItems, {...item, quantity:newQuantity}];
            }
            return prevItems;
        }
        });
    }

    const handleRemoveItem = (name) => {
      setSelectedItems(prevItems => prevItems.filter(item => item.name !== name));
    }
  
  return (
    <div className='body'>
      < List onUpdateCart = {handleUpdateCart} />
      < CartCard selectedItems={selectedItems} onRemoveItem={handleRemoveItem}/>
    </div>
  )
}