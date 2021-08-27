"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

let web3Modal
let provider;
let selectedAccount;

let web3

window.addEventListener('load', async () => {
  init()
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
});

function run(){
  if(typeof initContract === 'function') 
    initContract()

  if(typeof runFarm === 'function')
    runFarm()

}

function init() {

  //console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
  provider = window.web3.currentProvider ? window.web3.currentProvider : undefined

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    }
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
  fetchAccountData()
}

let chainId
let chainData
async function fetchAccountData() {

  try{
    web3 = new Web3(provider);
    console.log("Web3 \n", web3);
    
    chainId = await web3.eth.getChainId();
    chainData = evmChains.getChain(chainId);
    let res = await web3.eth.getAccounts()
    if(res[0]){
      selectedAccount = res[0];
      run()
    }else
      onConnect()
  }catch(e){
    console.log(e)
    onConnect()
  }
}

async function refreshAccountData() {

  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled")
}

async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    console.log("oNConnect Provider: " ,provider)
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  document.querySelector("#btn-connect").removeEventListener("click", onDisconnect);
  document.querySelector("#btn-connect").addEventListener("click", onConnect);

  selectedAccount = null;
}