import React from "react";

const CustomRadioGroup = ({
  options,
  name,
  selectedValue,
  onChange,
  details = "",
}) => {
  return (
    <div className="radio-group-container">
      {options.map((option) => (
        <label key={option.value} className="radio-option">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="radio-custom-circle"></span>
          <span className="radio-label-text">{option.label}</span>
        </label>
      ))}

      {details && <s-text variant="subdued">{details}</s-text>}
    </div>
  );
};

export default CustomRadioGroup;
