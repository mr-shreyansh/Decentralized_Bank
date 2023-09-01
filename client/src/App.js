import abi from './contract/Dbank.json';
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Deposite from './components/Deposite';
import Borrow from './components/Borrow';
import Repay from './components/Repay';
import LendMoney from './components/LendMoney';
import Withdraw from './components/Withdraw';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

  const CheckAccount = async () => {
    console.log(state.provider)
    try{
      if(state.signer) {
        const account = await state.contract.getAccountDetails();

        setAccount(account);
      }
      console.log(account);
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x9e4E06610a8C8C4643FadcB73619D9b92958DC29'
      const contractABI = abi.abi;
      try{
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({method: 'eth_requestAccounts'});
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({
          provider,
          signer,
          contract,
        });
        console.log(contract)
      }catch(err){
        console.log(err);
      }
    }
    connectWallet();
    CheckAccount();
  
  }, []);


  return (
    <div className="">
      <div className='bg-amber-300 mb-3 drop-shadow-md'>
        <h1 className='text-xl text-stone-700 font-semibold text-center'>
          Decentralized Bank
        </h1>
        <p className='text-sm text-stone-500 text-center'>
        Lend, borrow, and repay anonymously without the intervention of any central authority!
        </p>
      </div>
        <div className='flex flex-col items-center gap-4 bg-stone-50 drop-shadow-sm p-2'>
          <button onClick={CheckAccount} className='bg-blue-400 p-2 rounded-sm text-white'>Show account details</button>
          < div className='flex flex-col bg-blue-400/10 p-2'>
            <div className=''>
              Collateral: {
              account?.balance.toString()
            }
            </div>
            
            <div>
              Lent Money: {
              account?.money.toString()
            }
            </div>
            <div>
              current Loan: {
              account?.borrowedAmount.toString()
              }
            </div>
          </ div>
        </div>
        <div className='flex flex-col gap-3 min-h-[80vh]'>
          <Deposite state={state} />
          <Borrow state={state} />
          <Repay state={state} />
          <LendMoney state={state} />
          <Withdraw state={state} />
        </div>
    </div>
  );
}

export default App;
