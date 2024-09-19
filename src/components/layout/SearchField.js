import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchField = ({
  label,
  onSearch,
  // setQuery,
  // query,
  placeholder = "Search",
  disabled = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form
      inline
      onSubmit={handleSubmit}
      style={{ display: "inline-block", borderRadius: "10px" }}
      className="w-100"
    >
      <Form.Group
        style={{
          backgroundColor: "rgba(245, 247, 248, 1) ",
          borderRadius: "40px",
        }}
      >
        {label && <Form.Label className="">{label}</Form.Label>}
        <InputGroup className="py-1 w-100">
          {/* <InputGroup.Prepend> */}

          {/* </InputGroup.Prepend> */}
          <FormControl
            style={{
              backgroundColor: "rgba(245, 247, 248, 1)",
              borderRadius: "10px",
            }}
            type="text"
            placeholder={placeholder}
            className="mr-sm-2 border-0"
            value={query}
            disabled={disabled}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <InputGroup.Text
            color="rgba(92, 182, 249, 1)"
            // style={{
            //   backgroundColor: "rgba(92, 182, 249, 1)",
            //   color: "white",
            //   borderRadius: "50%",
            //   zIndex: 2,
            // }}
            className="border-0"
          > */}
          <Button variant="outline-success" type="submit">
            <FaSearch type="submit" size={14} />
          </Button>
          {/* </InputGroup.Text> */}
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchField;
