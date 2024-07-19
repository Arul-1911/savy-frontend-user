import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { MotionDiv } from "../../components";
import "./MyAccount.css";
import NetWorth from "./Components/NetWorth";
import TransactionsComponent from "./Components/TransactionComponent";
import AccountComponent from "./Components/AccountComponent";

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
          <button
            className="d-flex align-items-center"
            style={{
              paddingLeft: "120px",
              backgroundColor: "rgba(242, 249, 255, 1)",
              height: "40px",
              width: "25%",
              borderRadius: "22px",
              fontSize: "12px",
              color: "var(--primary-color)",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(224, 234, 255, 1)",
            }}
          >
            All banks
          </button>
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
      </Container>
    </MotionDiv>
  );
};

export default MyAccount;
