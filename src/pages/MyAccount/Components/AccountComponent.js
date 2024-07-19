import React from "react";
import DashboardCard from "../../../components/layout/DasboardCard";
import { IoIosArrowForward } from "react-icons/io";
import { Image } from "react-bootstrap";

const AccountComponent = () => {
  const arr = [
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
    {
      icons: "/icons/image 3.png",
      text: "ING Australia Orange Bank Accounts",
      subText: "Updated 4 minutes ago",
    },
  ];

  return (
    <div className="mt-4">
      <DashboardCard>
        {arr?.map((data, idx) => {
          return (
            <div
              key={idx}
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
                  src={data?.icons}
                  alt="..."
                />
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "rgba(55, 73, 87, 1)",
                      fontSize: "12px",
                    }}
                  >
                    {data?.text}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "rgba(159, 175, 198, 1)",
                      fontSize: "12px",
                    }}
                  >
                    {data?.subText}
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
                $100,000.00 <IoIosArrowForward size={16} />
              </div>
            </div>
          );
        })}
      </DashboardCard>
    </div>
  );
};

export default AccountComponent;
