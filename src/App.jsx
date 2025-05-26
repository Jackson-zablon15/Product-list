import { useState } from 'react'
import List from './components'
import { CartCard, OrderConfirmation } from './components';

export default function App(){
      const [selectedItems, setSelectedItems] = useState([]);
      const [confirmStatus, setConfirmStatus] = useState(false);

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
          //Add new item if quantity > 0
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

    const handleConfirm = () => {
      setConfirmStatus(true);
    }

    const handleNewOrder = () => {
      setSelectedItems([]);
      setConfirmStatus(false);
    }
  
  
  return (
    <div className='body'>
      <OrderConfirmation 
        selectedItems={selectedItems}
        showOrderConfirmation ={confirmStatus} 
        startNewOrder = {handleNewOrder}
        />

      <List
        onUpdateCart = {handleUpdateCart} 
        />

      < CartCard 
        selectedItems={selectedItems} 
        onRemoveItem={handleRemoveItem} 
        onConfirm={handleConfirm}
          />
    </div>
  )
}