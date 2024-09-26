import React, { useEffect, useState } from "react";
import { MotionDiv } from "../../components";
import { Container } from "react-bootstrap";
import { IoSettingsOutline } from "react-icons/io5";
import OverView from "./components/OverView";
import MoneyIn from "./components/MoneyIn";
import MoneyOut from "./components/MoneyOut";
import NetWorth from "./components/NetWorth";
import CashFlowSettings from "./components/SubComponents/CashFlowSettings";
import { useGetCashflowMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";

const CashFlow = () => {
  const [getCashflow, { isLoading }] = useGetCashflowMutation();

  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);

  const [settingModal, setSettingModal] = useState(false);

  const [overView, setOverview] = useState({});

  useEffect(() => {
    getCashflowData();
  }, []);

  const getCashflowData = async () => {
    try {
      const { data } = await getCashflow();
      setOverview(data?.cashFlowData);
    } catch (error) {
      getError(error);
    }
  };

  return (
    <MotionDiv>
      <Container>
        <div className="d-flex justify-content-between flex-wrap">
          <h3
            style={{
              fontWeight: 600,
            }}
          >
            Cashflow
          </h3>
          <button
            onClick={() => setSettingModal(true)}
            style={{
              padding: "10px",
              fontSize: "12px",
              backgroundColor: "rgba(242, 249, 255, 1)",
              borderRadius: "22px",
              color: "var(--primary-color)",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(224, 234, 255, 1)",
            }}
          >
            <IoSettingsOutline size={18} /> Settings
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
            Overview
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
            In
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
            Out
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
            Net
          </li>
        </ul>

        {accountPortfolioActive === 1 && (
          <OverView data={overView} loading={isLoading} />
        )}
        {accountPortfolioActive === 2 && (
          <MoneyIn accountPortfolioActive={accountPortfolioActive} />
        )}
        {accountPortfolioActive === 3 && (
          <MoneyOut accountPortfolioActive={accountPortfolioActive} />
        )}
        {accountPortfolioActive === 4 && (
          <NetWorth accountPortfolioActive={accountPortfolioActive} />
        )}

        {/* Settings  */}
        <CashFlowSettings show={settingModal} hide={setSettingModal} />
      </Container>
    </MotionDiv>
  );
};

export default CashFlow;
