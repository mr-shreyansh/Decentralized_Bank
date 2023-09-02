import React from "react";
import { ethers } from "ethers";

const Deposite = ({ state,CheckAmount, CheckPool  }) => {
  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const setDeposite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      state.contract.on("CollateralDeposited", (account, amount) => {
        console.log(account, amount);
        setLoading(false);
      });

      // Call the deposit function in the contract
      const tx = await state.contract.deposit({ value: amount });

      // Wait for the transaction to be mined
      await tx.wait();

      CheckAmount();
      CheckPool();



      console.log("Collateral deposited successfully!");
    } catch (err) {
      setLoading(false);
      alert(err.reason)
    }
  };
  return (
    <div>
      <form
        onSubmit={setDeposite}
        className="flex flex-col gap-3 p-2 my-3 border bg-black/20 backdrop-blur-lg"
      >
        <label className="text-center">Deposite Collateral</label>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 outline-none bg-amber-50"
        />
        <button
          type="submit"
          className=" p-2 outline outline-1 text-white hover:bg-green-400 transition-all outline-green-400 min-w-[150px] text-center rounded-sm w-fit"
        >
          {loading ? "Loading..." : "Deposite"}
        </button>
      </form>
    </div>
  );
};

export default Deposite;
