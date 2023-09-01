import React from 'react';
import { ethers } from 'ethers';

const LendMoney = ({state}) => {
  const [amount, setAmount] = React.useState(0);
  const handleLending =async (e) => {
    e.preventDefault()
    try{
      
      const tx = await state.contract.lendMoney(amount);
    
      // Wait for the transaction to be mined
      await tx.wait();

      console.log('Money added to the pool successfully!');


    } catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={handleLending} className='p-2 bg-stone-50 border my-3 flex flex-col gap-3'>
        <label className='text-center'>Lend Money</label>
        <input type="number" placeholder='Enter amount'  onChange={(e) => setAmount(e.target.value)} className='outline-none p-2 bg-amber-50'/>
        <button type='submit' className='flex w-fit bg-green-400 p-2 rounded-sm'>Lend</button>
      </form>
    </div>
  )
}

export default LendMoney