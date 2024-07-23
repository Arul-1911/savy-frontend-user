import React from "react";
import ModalWindow from "../../../../components/modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ExcludeTransaction = ({ show, hide }) => {
  return (
    <ModalWindow show={show} onHide={hide}>
      <div className="d-flex">
        <IoArrowBackCircleOutline
          color="rgba(92, 182, 249, 1)"
          cursor={"pointer"}
          size={28}
          onClick={() => hide(false)}
        />
        <div
          style={{
            margin: "auto",
            fontWeight: 600,
            fontSize: "16px",
            color: "rgba(55, 73, 87, 1)",
          }}
          className="text-center"
        >
          How to excluded transactions work ?
        </div>
      </div>

      <div className="px-3 text-center mt-3">
        <p
          style={{
            color: "rgba(55, 73, 87, 1)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          Excluded transactions are still visible to see in the Transactions
          screen and in the Cashflow area.
        </p>

        <p
          style={{
            color: "rgba(55, 73, 87, 1)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          However, because they are excluded from tracking as well as from
          budgeting, they are not contributing to any features in the app such
          as: Expenses graph, Goals, Budgets, Bills.
        </p>

        <p
          style={{
            color: "var(--primary-color)",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          All internal transfers between your accounts have been excluded from
          your Cashflow.
        </p>

        <p
          style={{
            color: "rgba(55, 73, 87, 1)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          We believe that internal transfer between accounts doesn't change a
          person's financial position because money is just going around their
          bank accounts, it doesn't increase their money in or money out.
        </p>

        <p
          style={{
            color: "rgba(55, 73, 87, 1)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          Imagine if you count transfer between accounts transactions in your
          cashflow, you will see double or triple money in as well as double or
          triple money out, which is not accurate to report your real personal
          finances.
        </p>

        <p
          style={{
            color: "rgba(55, 73, 87, 1)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          If you want to see your transfer between accounts transactions, you
          still can see them in the Transactions screen or
          Account details screen.
        </p>
      </div>
    </ModalWindow>
  );
};

export default ExcludeTransaction;
