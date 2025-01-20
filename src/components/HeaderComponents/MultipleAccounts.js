// src/components/MultipleAccounts.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectAccountId, selectAuth } from "../../features/authSlice";
import { Dropdown } from "react-bootstrap";
import { Col } from "react-bootstrap";

const MultipleAccounts = () => {
  const { user, selectAccountId } = useSelector(selectAuth); // Using selectAccountId here
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (user && user?.accounts && user?.accounts?.length > 0) {
      setAccounts(user?.accounts);
      if (isFirstRender.current && !selectAccountId) {
        const defaultAccount = user?.accounts[0].account_id;
        dispatch(setSelectAccountId(defaultAccount));
        isFirstRender.current = false;
      }
    }
  }, [user, dispatch, selectAccountId]);

  const handleAccountChange = (accountId) => {
    dispatch(setSelectAccountId(accountId));
  };

  return (
    <Col>
      <div
        className="p-1 d-flex align-items-center"
        style={{
          backgroundColor: "rgba(235, 241, 248, 1)",
          borderRadius: "22px",
          fontSize: "1.5rem",
          color: "var(--primary-color)",
          fontWeight: 400,
          cursor: "pointer",
          width: "fit-content",
          transition: "background-color 0.3s ease",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "12px",
              fontWeight: 400,
              color: "var(--primary-color)",
            }}
          >
            {accounts?.find((acc) => acc.account_id === selectAccountId)
              ?.user_name || "Select Account"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: "13px" }}>
            {accounts?.map((acc) => (
              <Dropdown.Item
                key={acc._id}
                onClick={() => handleAccountChange(acc.account_id)}
                style={{
                  color: "var(--primary-color)",
                }}
              >
                {acc.user_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Col>
  );
};

export default MultipleAccounts;
