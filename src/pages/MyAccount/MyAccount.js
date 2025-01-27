import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { MotionDiv } from "../../components";
import "./MyAccount.css";
import NetWorth from "./Components/NetWorth";
import TransactionsComponent from "./Components/TransactionComponent";
import AccountComponent from "./Components/AccountComponent";
import ConnectedBanks from "./Components/ConnectedBank";

const MyAccount = () => {
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(3);

  return (
    <MotionDiv>
      <Container>
        <div className="d-flex justify-content-between flex-wrap">
          <h3
            style={{
              fontWeight: 600,
            }}
          >
            My Account
          </h3>
        </div>

        <ul className="my_account_portfolio mt-2">
          <li
            onClick={() => setAccountPortfolioActive(1)}
            style={{
              borderBottom:
                accountPortfolioActive === 1
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 1
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Accounts
          </li>
          <li
            onClick={() => setAccountPortfolioActive(4)}
            style={{
              borderBottom:
                accountPortfolioActive === 4
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 4
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Connected Banks
          </li>
          <li
            onClick={() => setAccountPortfolioActive(2)}
            style={{
              borderBottom:
                accountPortfolioActive === 2
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 2
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Transactions
          </li>
          <li
            onClick={() => setAccountPortfolioActive(3)}
            style={{
              borderBottom:
                accountPortfolioActive === 3
                  ? "2px solid rgba(0, 74, 173, 1)"
                  : "none",
              color:
                accountPortfolioActive === 3
                  ? "rgba(0, 74, 173, 1)"
                  : "rgba(55, 73, 87, 0.7)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Net worth
          </li>
        </ul>
        {accountPortfolioActive === 1 && <AccountComponent />}
        {accountPortfolioActive === 2 && <TransactionsComponent />}
        {accountPortfolioActive === 3 && <NetWorth />}
        {accountPortfolioActive === 4 && <ConnectedBanks />}
      </Container>
    </MotionDiv>
  );
};

export default MyAccount;
