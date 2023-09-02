import abi from "./contract/Dbank.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Deposite from "./components/Deposite";
import Borrow from "./components/Borrow";
import Repay from "./components/Repay";
import LendMoney from "./components/LendMoney";
import Withdraw from "./components/Withdraw";
import Navbar from "./components/Navbar";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  const [pool, setPool] = useState(null);

  const CheckAccount = async () => {
    console.log(state.provider);
    try {
      if (state.signer) {
        const account = await state.contract.getAccountDetails();

        setAccount(account);
      }
      console.log(account);
    } catch (err) {
      console.log(err);
    }
  };

  const CheckPool = async () => {
    try {
      const pool = await state.contract.pool();
      setPool(pool.toString());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x9e4E06610a8C8C4643FadcB73619D9b92958DC29";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({
          provider,
          signer,
          contract,
        });
        console.log(contract);
      } catch (err) {
        console.log(err);
      }
    };
    connectWallet();
    CheckAccount();
    CheckPool();
  }, []);

  useEffect(()=>{
    CheckAccount();
    CheckPool();
    console.log(account)
  },[state])

  return (
    <div className="">
      <Navbar />
      
      <div className="flex flex-col items-center gap-4 p-2 bg-stone-50 drop-shadow-sm">
        <div className="flex flex-col w-full border rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">
          <div className="p-2 bg-white/20">
            Collateral:    
            {account?.balance.toString()}
            </div>
          <div className="p-2 bg-white/20">
            Lent Money: 
            {account?.money.toString()}
            </div>
          <div className="p-2 bg-white/20">
            current Loan: 
            {account?.borrowedAmount.toString()}
            </div>
        <button
          onClick={CheckAccount}
          className="p-2 text-white rounded-sm rounded-b-lg hover:bg-black/10 outline-1"
        >
          Show account details
        </button>
        </div>
      </div>
      <div className="flex gap-3 m-2">
        <div className="flex-grow p-2 rounded-lg bg-gradient-to-r bg-opacity-40 from-indigo-400 to-purple-500 drop-shadow-lg">
          <div>
            <h1 className="text-xl font-semibold text-center text-stone-700">
              Borrow Money
            </h1>
          </div>
          <Deposite state={state} CheckAccount={CheckAccount} />
          <Borrow state={state} CheckAccount={CheckAccount} CheckPool={CheckPool} />
          <Repay state={state} CheckAccount={CheckAccount} CheckPool={CheckPool} />
        </div>
        <div className="flex-grow p-2 rounded-lg bg-gradient-to-r drop-shadow-lg bg-opacity-20 from-purple-500 to-pink-500">
        <div>
            <h1 className="text-xl font-semibold text-center text-stone-700">
              Lend Money
            </h1>
          </div>
          <LendMoney
            state={state}
            CheckAccount={CheckAccount}
            CheckPool={CheckPool}
          />
          <Withdraw state={state} account={account} CheckAccount={CheckAccount} CheckPool={CheckPool} />
        </div>
      </div>
    </div>
  );
}

export default App;
