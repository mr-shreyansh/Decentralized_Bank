import React from 'react'

const Withdraw = ({state}) => {
  const handleWithdraw =async (e) => {
    e.preventDefault()
    try{
      
      const tx = await state.contract.withdrawBalance();
    
      // Wait for the transaction to be mined
      await tx.wait();

      console.log('Money withdrawn successfully!');


    } catch(err){
      console.log(err)
    }
  }
  return (
    <div className='p-2 flex flex-col gap-3'>
      <button onClick={handleWithdraw} className='flex w-fit bg-green-400 p-2 rounded-sm'>Withdraw</button>
    </div>
  )
}

export default Withdraw