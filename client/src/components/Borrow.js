import React from 'react'

const Borrow = ({state}) => {
  const [amount, setAmount] = React.useState(0);
  const handleLoan =async (e) => {
    e.preventDefault()
    try{

      const tx = await state.contract.borrow(amount);
    
      // Wait for the transaction to be mined
      await tx.wait();

    } catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={handleLoan} className='p-2 flex flex-col my-3 border bg-stone-50 gap-3 drop-shadow-sm my-2'>
        <label className='text-center'>Borrow Money</label>
        <input type="number" placeholder='Enter amount' onChange={e=>setAmount(e.target.value)} className='outline-none p-2 bg-amber-50'/>
        <button type='submit' className='flex w-fit bg-green-400 p-2 rounded-sm'>Borrow</button>
      </form>
    </div>
  )
}

export default Borrow