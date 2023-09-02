import React, { useEffect, useState } from 'react'

const Repay = ({state}) => {
  const [amount,setAmount] = useState(0);
  const [repayAmount,setrepayAmount] = useState(0);
  const [loading,setLoading] = useState(false);
  const handleRepay =async (e) => {
    e.preventDefault()
    try{
      setLoading(true);
      state.contract.on("LoanRepaid", (account, amount) => {
        console.log(account, amount);
        setLoading(false);
      });

      const tx = await state.contract.repayLoan(amount);
    
      // Wait for the transaction to be mined
      await tx.wait();

      console.log('loan repaid successfully!');


    } catch(err){
      setLoading(false);
      alert(err.reason)

      console.log(err)
    }
  }

  const getAmount = async () => {
    const repay = await state.contract?.repayAmount();
    if(repay){
      setrepayAmount(repay?.toString());
      console.log(repay?.toString())
    }
  }

  useEffect(()=>{
    getAmount();
  })

  return (
    <div>
      <div>
        
      </div>
       <div>
         <button onClick={getAmount}>Show Repay Amount</button>
       </div>
      <form onSubmit={handleRepay} className='flex flex-col gap-3 p-2 my-3 border bg-black/20'>
        <h1 className="text-center">Repay amount</h1>
         <div className='p-2 bg-white/20'>
           Amount to be Repaid: {
             repayAmount
           }
         </div>
        <input type="number" placeholder='Enter amount'  onChange={(e) => setAmount(e.target.value)} className='p-2 outline-none bg-amber-50'/>
<div className='flex justify-between w-full'>
          <button onClick={getAmount} className=' p-2 outline-1 outline text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit'>Show Amount</button>
          <button type='submit' className=' p-2 outline outline-1 text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit'>
            {loading ? 'Loading...' : 'Repay'}
          </button>
</div>
      </form>
    </div>
  )
}

export default Repay