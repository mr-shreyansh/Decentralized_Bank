import React from 'react'
import { ethers } from 'ethers';

const Deposite = ({state}) => {
    const [amount, setAmount] = React.useState(0);
    const setDeposite = async (e) => {
        e.preventDefault()
        try {
            // Convert the amount to Wei (if not already)
    
            // Call the deposit function in the contract
            const tx = await state.contract.deposit({ value: amount });
    
            // Wait for the transaction to be mined
            await tx.wait();
    
            console.log('Collateral deposited successfully!');
          } catch (error) {
            console.error('Error depositing collateral:', error);
          }
    }
  return (
    <div>
        <form onSubmit={setDeposite} className='p-2 flex my-3 border flex-col gap-3'>
            <label className='text-center'>Deposite Collateral</label>
           <input type="number" placeholder='Enter amount' onChange={(e) => setAmount(e.target.value)} className='outline-none p-2 bg-amber-50'/>
           <button type='submit' className='flex w-fit bg-green-400 p-2 rounded-sm'>Deposite</button>
        </form>
    </div>
  )
}

export default Deposite