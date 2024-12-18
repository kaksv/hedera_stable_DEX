import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import { useState } from "react";

function App() {

  const [account, setAccount] = useState();
  const [connectTextSt, setConnectTextSt] = useState("🔌 Connect ");
  const [contractTextSt, setContractTextSt] = useState();
  const [connectLinkSt, setConnectLinkSt] = useState();
  const [walletData, setWalletData] = useState();
  const [network, setNetwork] = useState();
  const { address, isConnected } = useAccount();
  
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const connectWallet = async function() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
			}
		}
	}

  return (

    <div className="App">
      <Header connect={connectWallet} 
      isConnected={isConnected} 
      address={address}
       />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap isConnected={isConnected} address={address} />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;
