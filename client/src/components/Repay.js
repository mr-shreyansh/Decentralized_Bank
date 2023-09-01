import React, { useEffect, useState } from 'react'

const Repay = ({state}) => {
  const [amount,setAmount] = useState(0);
  const [repayAmount,setrepayAmount] = useState(0);
  const handleRepay =async (e) => {
    e.preventDefault()
    try{
      
      const tx = await state.contract.repayLoan(amount);
    
      // Wait for the transaction to be mined
      await tx.wait();

      console.log('loan repaid successfully!');


    } catch(err){
      console.log(err)
    }
  }

  const getAmount = async () => {
    const repay = await state.contract.repayAmount();
    if(repay){
      setrepayAmount(repay?.toString());
      console.log(repay?.toString())
    }
  }

  return (
    <div>
      <div>
        
      </div>
       <div>
         <button onClick={getAmount}>Show Repay Amount</button>
         <div>
           {
             repayAmount
           }
         </div>
       </div>
      <form onSubmit={handleRepay} className='p-2 flex my-3 border flex-col gap-3'>
        <lable className="text-center">Repay amount</lable>
        <input type="number" placeholder='Enter amount'  onChange={(e) => setAmount(e.target.value)} className='outline-none p-2 bg-amber-50'/>
        <button type='submit' className='flex w-fit bg-green-400 p-2 rounded-sm'>Pay</button>
      </form>
    </div>
  )
}

export default Repay