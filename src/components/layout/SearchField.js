import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchField = ({
  label,
  onSearch,
  placeholder = "Search",
  disabled = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          <FormControl
            style={{
              backgroundColor: "rgba(245, 247, 248, 1)",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
            type="text"
            placeholder={placeholder}
            className="border-0"
            value={query}
            disabled={disabled}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroup.Text
            style={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              backgroundColor: "rgba(245, 247, 248, 1)",
            }}
            className="border-0"
          >
            <button
              style={{
                backgroundColor: "rgba(92, 182, 249, 1)",
                color: "white",
                borderRadius: "50%",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              type="submit"
            >
              <FaSearch color="rgba(0, 74, 173, 1)" size={14} />
            </button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchField;
