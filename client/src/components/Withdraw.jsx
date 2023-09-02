import React from 'react'

const Withdraw = ({state, CheckAccount, CheckPool, account}) => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleWithdraw =async (e) => {
    e.preventDefault()
    try{
      setLoading(true);
      state.contract.on("BalanceWithdrawn", (account, amount) => {
        console.log(account, amount);
        setLoading(false);
      });
      
      const tx = await state.contract.withdrawBalance();
    
      await tx.wait();

      console.log('Money withdrawn successfully!');

      CheckPool();
      CheckAccount();

    } catch(err){
      setError(err.reason)
      alert(err.reason)
      console.log(err.reason)
      setLoading(false)

    }
  }
  return (
    <div className=''>
      <form className='flex flex-col gap-3 p-2 my-3 border bg-black/20'>
      <h1 className="text-center">Withdraw Money</h1>
      <p className='p-2 bg-white/20'>{account?.money?.toString()}</p>
      <button onClick={handleWithdraw} className=' p-2 outline outline-1 text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit'>
        {loading ? 'Loading...' : 'Withdraw'}
      </button>
      </form>
    </div>
  )
}

export default Withdraw