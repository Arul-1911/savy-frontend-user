import React from "react";
import ModalWindow from "../modals/ModalWindow";
import {
  ConnectBank,
  FinancialPolicy,
  AccountConnected,
  AllMyAccount,
  AvailableBank,
  ChooseBank,
  ConfirmAccount,
  ConfirmDetails,
  ConnectingAccount,
  InternetBanking,
  OneTimePassword,
} from "../../pages/startScreen/index";

const AddAccount = ({ show, hide, active, activeLink }) => {
  return (
    <ModalWindow
      show={show}
      onHide={hide}
      mainClass={"p-0 offcanvas-modal px-0 m-0 border-0 bg-transparent"}
      bodyClass={
        "p-0 m-0 px-0 bg-transparent border-0 d-flex justify-content-center"
      }
    >
      {active === 1 && (
        <ConnectBank
          startScreen={true}
          containerDiv={false}
          goBack={() => hide(false)}
          next={() => activeLink(2)}
          bankDetails={true}
        />
      )}

      {/* {active === 2 && (
        <FinancialPolicy
          containerDiv={false}
          goBack={() => activeLink(1)}
          next={() => activeLink(3)}
        />
      )}

      {active === 3 && (
        <ChooseBank
          containerDiv={false}
          goBack={() => activeLink(2)}
          next={() => activeLink(4)}
        />
      )}

      {active === 4 && (
        <InternetBanking
          containerDiv={false}
          goBack={() => activeLink(3)}
          next={() => activeLink(5)}
        />
      )}

      {active === 5 && (
        <OneTimePassword
          containerDiv={false}
          goBack={() => activeLink(4)}
          next={() => activeLink(6)}
        />
      )}

      {active === 6 && (
        <AvailableBank
          containerDiv={false}
          goBack={() => activeLink(5)}
          infoNext={() => activeLink(9)}
          next={() => activeLink(7)}
        />
      )}
      {active === 7 && (
        <ConfirmAccount
          containerDiv={false}
          goBack={() => activeLink(6)}
          next={() => activeLink(8)}
        />
      )}
      {active === 8 && (
        <ConfirmDetails
          containerDiv={false}
          goBack={() => activeLink(7)}
          next={() => activeLink(9)}
        />
      )}
      {active === 9 && (
        <ConnectingAccount
          containerDiv={false}
          goBack={() => activeLink(8)}
          next={() => activeLink(10)}
        />
      )}
      {active === 10 && (
        <AccountConnected
          containerDiv={false}
          goBack={() => activeLink(9)}
          next={() => activeLink(11)}
        />
      )}
      {active === 11 && (
        <AllMyAccount
          containerDiv={false}
          goBack={() => activeLink(10)}
          next={() => hide(false)}
        />
      )} */}
    </ModalWindow>
  );
};

export default AddAccount;
