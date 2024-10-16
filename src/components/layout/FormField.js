import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import Select from "react-select";

function FormField({
  label,
  type,
  placeholder,
  id,
  onChange,
  name,
  value,
  disabled = false,
  loading = false,
  required = true,
  options,
  maxLength,
  as,
  rows,
  defaultValue,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getFormattedPastDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(45, 49, 166, 1)" : "transparent",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "rgba(45, 49, 166, 1)",
        color: "#fff",
      },
    }),
  };

  return (
    <Form.Group className="mb-3 " controlId={id}>
      {label && <Form.Label className="">{label}</Form.Label>}

      {loading ? (
        <Skeleton height={"2rem"} />
      ) : type === "select" ? (
        <Select
          className="form-fid "
          name={name}
          value={options.find((option) => option.value === value) || null}
          options={options}
          isSearchable
          onChange={(selectedOption) =>
            onChange &&
            onChange({
              target: {
                name,
                value: selectedOption ? selectedOption.value : "",
                label: selectedOption ? selectedOption.label : "",
              },
            })
          }
          isDisabled={disabled}
          placeholder={placeholder}
          required={required}
          styles={customStyles}
        />
      ) : type === "dropdown" ? (
        <Form.Select
          className="drop-option"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {options?.map((option, index) => (
            <option
              key={option?._id}
              value={option?._id}
              className="custom-drop"
              defaultValue={defaultValue}
            >
              {option?.category?.name
                ? option?.category?.name
                : option?.name
                ? option?.name
                : option?.source}
            </option>
          ))}
        </Form.Select>
      ) : type === "password" ? (
        <InputGroup>
          <Form.Control
            className={" form-field "}
            required={required}
            type={showPassword ? "text" : "password"}
            aria-label={showPassword ? "Show password" : "Hide password"}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          <Button
            variant="transparent"
            className="form-field-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <HiOutlineEye color="rgba(150, 150, 150, 1)" />
            ) : (
              <HiOutlineEyeOff color="rgba(150, 150, 150, 1)" />
            )}
          </Button>
        </InputGroup>
      ) : type === "tel" ? (
        <Form.Control
          className={"form-field  "}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => {
            const inputValue = e.target.value;
            const isValidNumber = /^-?\d*\.?\d*$/.test(inputValue);

            if (isValidNumber) {
              onChange({ target: { name, value: inputValue } });
            }
          }}
          pattern="[-]?\d*\.?\d+"
          disabled={disabled}
        />
      ) : (
        <Form.Control
          className={"form-field "}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          as={as}
          rows={rows}
          onChange={onChange}
          disabled={disabled}
          max={type === "date" ? getFormattedPastDate() : null}
          maxLength={maxLength}
        />
      )}
    </Form.Group>
  );
}

export default FormField;
