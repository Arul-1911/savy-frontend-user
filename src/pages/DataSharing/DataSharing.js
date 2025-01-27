import React, { useState } from "react";
// import ModalWindow from "../modals/ModalWindow";

import { AccountConnected, AllMyAccount, AvailableBank, ChooseBank, ConfirmAccount, ConfirmDetails, ConnectingAccount, InternetBanking, OneTimePassword } from '../startScreen/index'
import ModalWindow from "../../components/modals/ModalWindow";
const DataSharing = ({ show, hide, active, activeLink }) => {



  const handleSubmit = (e) => {
    e.preventDefault();
    hide(false);
  };

  

  
  return (
    <>
      <ModalWindow show={show} onHide={hide} mainClass={'p-0 offcanvas-modal px-0 m-0 border-0 bg-transparent'} bodyClass={'p-0 m-0 px-0 bg-transparent border-0 d-flex justify-content-center'} >
        {active === 1 && (
         <InternetBanking containerDiv={false} goBack={()=>hide(false)} next={()=>activeLink(2)}/>
        )}
{/* 
        {active === 2 && (
          <OneTimePassword containerDiv={false} goBack={()=>activeLink(1)} next={()=>activeLink(3)} />
        )}

         {active === 3 && (
         <AvailableBank containerDiv={false} goBack={()=>activeLink(2)} infoNext={()=>activeLink(9)} next={()=>activeLink(4)} />
        )}
         {active === 4 && (
         <ConfirmAccount containerDiv={false} goBack={()=>activeLink(3)} next={()=>activeLink(5)} />
        )}
         {active === 5 && (
         <ConfirmDetails containerDiv={false} goBack={()=>activeLink(4)} next={()=>activeLink(6)} />
        )}
         {active === 6 && (
         <ConnectingAccount containerDiv={false} goBack={()=>activeLink(5)} next={()=>activeLink(7)} />
        )}
         {active === 7 && (
         <AccountConnected containerDiv={false} goBack={()=>activeLink(6)} next={()=>hide(false)} />
        )}
         {active === 9 && (
         <AllMyAccount containerDiv={false} goBack={()=>activeLink(3)} />
        )} */}

        {/* {active === 4 && (
         
        )}  */}
      </ModalWindow>
    </>
  );
};

export default DataSharing;
