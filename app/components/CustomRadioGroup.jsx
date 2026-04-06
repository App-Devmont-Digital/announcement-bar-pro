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
        <label
          key={option.value}
          className={`radio-option ${!option?.desc && "no-desc-radio"} ${selectedValue === option.value ? "selected-radio" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="radio-custom-circle"></span>
          {option?.desc ? (
            <div style={{}}>
              <p className="radio-label-text" style={{ margin: 0 }}>
                {option?.label}
              </p>
              <p style={{ margin: 0, fontSize: "10px", marginTop: "-3px" }}>
                {option?.desc}
              </p>
            </div>
          ) : (
            <span className="radio-label-text">{option.label}</span>
          )}
        </label>
      ))}

      {details && <s-text variant="subdued">{details}</s-text>}
    </div>
  );
};

export default CustomRadioGroup;
