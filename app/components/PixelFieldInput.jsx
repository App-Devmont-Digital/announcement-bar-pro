import React, { useEffect, useState } from "react";

const PixelFieldInput = ({
  label = "",
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  suffix = "px",
  onChange,
}) => {
  const [numberValue, setNumberValue] = useState(value);

  useEffect(() => {
    setNumberValue(value);
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <s-paragraph>{label}</s-paragraph>

      <s-number-field
        value={numberValue}
        min={min}
        max={max}
        step={step}
        suffix={suffix}
        onInput={(e) => {
          const newValue = e.target.value;
          setNumberValue(newValue);
          onChange?.(Number(newValue));
        }}
      />
    </div>
  );
};

export default PixelFieldInput;
