import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AdminProtectedRoute } from "./routes";
import { Header, SideNavBar, NotFound } from "./components";
import { useDispatch, useSelector } from "react-redux";
import GetStart from "./pages/GetStart";
import {
  LoginScreen,
  Dashboard,
  ForgetPassword,
  SignupScreen,
  Passcode,
} from "./pages";
import {
  AccountConnected,
  AllMyAccount,
  AvailableBank,
  ChooseBank,
  ConfirmAccount,
  ConfirmDetails,
  ConnectBank,
  ConnectingAccount,
  FinancialPolicy,
  InternetBanking,
  OneTimePassword,
  QuickAccessPasscode,
} from "./pages/startScreen";
import ResetPassword from "./pages/ResetPassword";
import { MyAccount } from "./pages/MyAccount";
import { Transactions } from "./pages/Transactions";
import {
  CashFlow,
  TopBucket,
  TopCategory,
  TopMerchant,
  TopTransaction,
} from "./pages/Cashflow";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import { selectAuth } from "./features/authSlice";

function App() {
  const { accessToken } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const pageLocation = useLocation();

  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  useEffect(async () => {
    //  await getOptions({dispatch:dispatch ,token:isLoggedIn});
    console.log(accessToken);
  }, [accessToken]);

  const routeList = [
    { path: "/user/connect-bank", comp: <ConnectBank /> },
    { path: "/user/financial-policy", comp: <FinancialPolicy /> },
    { path: "/user/choose-bank", comp: <ChooseBank /> },
    { path: "/user/internet-banking", comp: <InternetBanking /> },
    { path: "/user/one-time-password", comp: <OneTimePassword /> },
    { path: "/user/available-bank", comp: <AvailableBank /> },
    { path: "/user/confirm-account", comp: <ConfirmAccount /> },
    { path: "/user/confirm-account-details", comp: <ConfirmDetails /> },
    { path: "/user/all-my-account", comp: <AllMyAccount /> },
    { path: "/user/account-connected", comp: <ConnectingAccount /> },
    { path: "/user/subscription", comp: <SubscriptionPage /> },
    {
      path: "/user/account-successfully-connected",
      comp: <AccountConnected />,
    },

    { path: "/user/dashboard", comp: <Dashboard /> },
    { path: "/user/my-account", comp: <MyAccount /> },
    { path: "/user/transactions", comp: <Transactions /> },
    { path: "/user/cashflow", comp: <CashFlow /> },
    { path: "/user/cashflow/top-category", comp: <TopCategory /> },
    { path: "/user/cashflow/top-bucket", comp: <TopBucket /> },
    { path: "/user/cashflow/top-merchant", comp: <TopMerchant /> },
    { path: "/user/cashflow/top-transactions", comp: <TopTransaction /> },
  ];
  return (
    <div className="main-wrapper">
      {accessToken && isExpanded && (
        <div className="sidebar-overlay" onClick={sidebarHandler}></div>
      )}
      <div className="sidebar-wrapper">
        <SideNavBar isExpanded={isExpanded} />
      </div>
      <div
        className={`body-wrapper ${isExpanded ? "mini-body" : "full-body"} 
        ${accessToken ? "" : "m-0"} d-flex flex-column`}
      >
        <Header sidebarHandler={sidebarHandler} />
        <Routes location={pageLocation} key={pageLocation.pathname}>
          <Route path="/" element={<GetStart />} />
          <Route path="/user/login" element={<LoginScreen />} />
          <Route path="/user/signup" element={<SignupScreen />} />
          <Route path="/user/forget-password" element={<ForgetPassword />} />
          <Route path="/user/reset-password" element={<ResetPassword />} />
          <Route path="/user/passcode" element={<Passcode />} />
          <Route
            path="/user/quick-access-passcode"
            element={<QuickAccessPasscode />}
          />

          {routeList.map(({ path, comp }) => (
            <Route
              key={path}
              path={path}
              element={<AdminProtectedRoute>{comp}</AdminProtectedRoute>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
