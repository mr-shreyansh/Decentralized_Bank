import React from "react";
import { ethers } from "ethers";

const LendMoney = ({ state, CheckAccount, CheckPool }) => {
  const [amount, setAmount] = React.useState(0);
  const [loading,setLoading] = React.useState(false);
  const handleLending = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      state.contract.on("MoneyLended", (account, amount) => {
        console.log(account, amount);
        setLoading(false);
      });
      const tx = await state.contract.lendMoney(amount);

      // Wait for the transaction to be mined
      await tx.wait();

      console.log("Money added to the pool successfully!");

      //    event MoneyLended(address indexed lender, uint256 amount);
      CheckPool();
      CheckAccount();
      
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleLending}
        className="flex flex-col gap-3 p-2 my-3 border bg-black/20"
      >
        <label className="text-center">Lend Money</label>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 outline-none bg-amber-50"
        />
        <button
          type="submit"
          className=' p-2 outline outline-1 text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit'        >
          {loading ? 'Loading...' : 'Lend'}
        </button>
      </form>
    </div>
  );
};

export default LendMoney;
