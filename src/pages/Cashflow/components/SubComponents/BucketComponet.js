import React from "react";
import ModalWindow from "../../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BucketComponet = ({ show, hide, onChange }) => {
  const handleChange = (list) => {
    onChange(list);
    hide(false);
  };

  return (
    <ModalWindow show={show} onHide={hide}>
      <div className="d-flex align-items-center">
        <IoArrowBackCircleOutline
          color="rgba(92, 182, 249, 1)"
          cursor={"pointer"}
          size={28}
          onClick={() => hide(false)}
        />
        <div
          style={{
            margin: "auto 150px",
            fontWeight: 600,
            fontSize: "16px",
            color: "rgba(55, 73, 87, 1)",
          }}
          className="text-center"
        >
          Select Section
        </div>
      </div>

      <div className="mt-4">
        <div
          onClick={() => handleChange("Bucket")}
          style={{
            fontWeight: 600,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
        >
          Bucket
        </div>
        <hr />
        <div
          onClick={() => handleChange("Categories")}
          style={{
            fontWeight: 600,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
        >
          Categories
        </div>
        <hr />
        <div
          onClick={() => handleChange("Transactions")}
          style={{
            fontWeight: 600,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
        >
          Transactions
        </div>
        <hr />
        <div
          onClick={() => handleChange("Merchant")}
          style={{
            fontWeight: 600,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
        >
          Merchant
        </div>
        <hr />
        <div
          onClick={() => handleChange("Tags")}
          style={{
            fontWeight: 600,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
        >
          Tags
        </div>
        <hr />
      </div>
    </ModalWindow>
  );
};

export default BucketComponet;
