import React from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowForward } from "react-icons/io";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../features/authSlice";

const AccountComponent = () => {
  const { user } = useSelector(selectAuth);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  };

  return (
    <div className="mt-4">
      <DashboardCard>
        {user?.accounts?.map((account, idx) => (
          <div
            key={account?._id}
            style={{
              backgroundColor: "rgba(245, 247, 248, 1)",
              borderRadius: "10px",
              padding: "10px",
            }}
            className="mt-3 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex gap-2 align-items-center">
              <Image
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
                src={account?.bank_logo || "/images/bank-acc-logo.jpg"}
                alt={account?.account_name}
              />
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "rgba(55, 73, 87, 1)",
                    fontSize: "12px",
                  }}
                >
                  {account?.bank_name} {"->"} {account?.account_name} -{" "}
                  {account?.user_name}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "rgba(159, 175, 198, 1)",
                    fontSize: "12px",
                  }}
                >
                  {/* Updated 4 minutes ago  */}
                </div>
              </div>
            </div>

            <div
              style={{
                color: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {/* {formatCurrency(account?.balance)} <IoIosArrowForward size={16} /> */}
              {formatCurrency(account?.balance)}
            </div>
          </div>
        ))}
      </DashboardCard>
    </div>
  );
};

export default AccountComponent;
