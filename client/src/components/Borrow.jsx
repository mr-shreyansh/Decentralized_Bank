import React from "react";

const Borrow = ({ state }) => {
  const [amount, setAmount] = React.useState(0);
  const [loading,setLoading] = React.useState(false);
  const handleLoan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      state.contract.on("LoanBorrowed", (account, amount) => {
        console.log(account, amount);
        setLoading(false);
      });
      
      const tx = await state.contract.borrow(amount);

      // Wait for the transaction to be mined
      await tx.wait();
    } catch (err) {
      setLoading(false);
      alert(err.reason);
      console.log(err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleLoan}
        className="flex flex-col gap-3 p-2 my-2 border bg-black/20 drop-shadow-sm"
      >
        <label className="text-center">Borrow Money</label>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 outline-none bg-amber-50"
        />
        <button
          type="submit"
          className=' p-2 outline outline-1 text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit'        >
          {loading ? 'Loading...' : 'Borrow'}
        </button>
      </form>
    </div>
  );
};

export default Borrow;
