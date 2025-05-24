import { useState } from 'react';

import listData from './data.jsx';
import cartIcon from './assets/images/icon-add-to-cart.svg';
import cartImage from './assets/images/illustration-empty-cart.svg';
import decrementIcon from './assets/images/icon-decrement-quantity.svg';
import incrementIcon from './assets/images/icon-increment-quantity.svg';
import removeItemIcon from './assets/images/icon-remove-item.svg';
import carbonNeutralIcon from './assets/images/icon-carbon-neutral.svg';

export function CartCard({selectedItems, onRemoveItem}){

    //calculate total cost
    const totalcost = selectedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0)
    return(
        <div className='flex flex-col items-center bg-white w-96 h-fit p-6 rounded-2xl'>
            <h1 className='text-[1.5rem] font-bold mb-10 text-Red'>
                Your Cart ({selectedItems.length})
                </h1>
                {selectedItems.length === 0 ? (
                    <>
            <img className='w-31 mb-6' src={cartImage} alt="empty cart" />
            <p className='text-Rose_500'>Your added items will appear here</p>
              </>
              ) : (
                <ul 
                className='w-full'>
                  {selectedItems.map(item => (
                    <li
                        key={item.name}
                    >
                        <div className='flex justify-between'>
                        <span>
                        <p className='font-medium text-Rose_900 mb-2'
                        >{item.name}
                        </p>
                        <span className='flex gap-4'>
                            <p className='text-Red font-medium'>{`${item.quantity}x`}</p> 
                            <span className='flex gap-2'>
                             <p className='text-Rose_400'>{`@$${item.price}`}</p>
                            <p className='text-Rose_500 font-medium'>
                                {`$${(item.quantity * item.price).toFixed(2)}`}
                                
                            </p>
                            </span>
                        </span>
                        </span>
                        <img 
                            onClick={()=> onRemoveItem(item.name)}
                            className='outline-[2px] outline-Rose_500 w-5 h-5 p-[2px] rounded-full'
                            src={removeItemIcon} alt="" />
                             </div>
                             <hr className='text-Rose_100 my-4' />
                    </li>
                  ))}
                    <span className="flex justify-between">
                        <p className='text-Rose_500'>Order Total</p>
                  <p className='text-[1.5rem] font-bold text-Rose_900'>{`$${totalcost}`}</p>
                    </span>
                  <div className='full bg-Rose_100 flex justify-center mt-8 py-5 rounded-lg'>
                    <img src={carbonNeutralIcon} alt="carbon neutral" />
                   <p>This is  a<b className='text-Rose_900'> carbon-neutral </b> delivery</p> 
                  </div>
                  <button
                  className='bg-Red w-full text-white font-bold py-3 rounded-full mt-6 cursor-pointer'>
                    Confirm-Order</button>
                </ul>
              )}
        </div>
    )
}

function Card({name, descrip, desktopImage, price, onUpdateCart}){
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateCart({ name, price }, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onUpdateCart({ name, price }, newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      const newQuantity = 1;
      setQuantity(newQuantity);
      onUpdateCart({ name, price }, newQuantity);
    }
  };

    return(
        <div className="w-82 sm:w-62.5">
            <img className='w-full rounded-lg' src={desktopImage} alt="waffle" />
            <button
                onClick={quantity === 0 ? handleAddToCart : undefined}
                className={`${quantity > 0 ? 'bg-Red justify-around' : 'bg-white justify-center'}  flex  items-center gap-2 relative z-20 outline-1 w-40 h-11  rounded-full outline-Red mx-auto -mt-6`}> 
                {quantity > 0 ?  (
                    <>
                 <img
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDecrement();
                    }}
                    className='outline outline-white px-1 py-2 rounded-full'
                    src={decrementIcon} 
                    alt="decrement" />
                 <p className='text-white'>{quantity}</p>
                 <img 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleIncrement();
                    }}
                    className='outline outline-white p-1 rounded-full' 
                    src={incrementIcon} 
                    alt="" />
                    </>
                ) : (
                    <>
                <img className='w-5' src={cartIcon} alt="cart icon" />
                <p className='text-Rose_900 font-medium text-[0.9rem]'>Add to Cart</p>
                    </>
                )}
            </button>
            <p className='text-Rose_500 text-[0.9rem]'>{name}</p>
            <p className='text-Rose_900 font-bold'>{descrip}</p>
            <p className='text-Red font-medium'>${price}</p>
        </div>
    )
}

export default function List({onUpdateCart}){
    
    return (
        <div>
            <h1 className='text-[2rem] mb-9 font-bold'>Desserts</h1>
        <div className='flex flex-col sm:grid sm:grid-cols-3 gap-6'>
            {listData.map(card => (
                <Card 
                    name = {card.name} 
                    descrip={card.descrip} 
                    desktopImage={card.imageDesktop} 
                    price={card.price}
                    onUpdateCart ={onUpdateCart}
                />
            ))}
        </div>
        </div>
    )
    
}