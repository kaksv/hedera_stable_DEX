import React from "react";
import Logo from "../hbarlogo2.svg";
import hb from "../hb.png";
import { Link } from "react-router-dom";
// import walletConnectFcn from "./hedera/walletConnect.js";

function Header(props) {

  const {
    address, 
    isConnected, 
    connect
  } = props;

  

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={hb} alt="eth" className="eth" />
          Hedera
        </div>
        <div className={`${  isConnected ? "connectedButton" : "connectButton"}`} onClick={connect} style={{cursor: "pointer"}} >
          {isConnected ?
          "Connected"
          // (address)
          //  (address.slice(0,4) +"..." +address.slice(38)) 
           : "Connect"}
        </div>
      </div>
    </header>
  );
}

export default Header;
