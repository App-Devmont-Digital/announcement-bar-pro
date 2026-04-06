import { styles } from "../styles/appStyles1";
import React, { useEffect, useState } from "react";

const ColorPicker = ({
  onChange,
  color,
  label = "",
  popoverId = "color-picker-popover",
}) => {
  const [colorValue, setColorValue] = useState("#000000");

  useEffect(() => {
    if (color) {
      setColorValue(color);
    }
  }, [color]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <p style={styles.label}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Trigger Button (Color Box) */}
        <s-button commandFor={popoverId} variant="tertiary" type="button">
          <div
            style={{
              width: 44,
              height: 32,
              backgroundColor: colorValue,
              borderRadius: 4,
              border: "1px solid #dcdcdc",
              margin: "-12px",
            }}
          />
        </s-button>

        {/* Polaris Popover */}
        <s-popover id={popoverId}>
          <div style={{ padding: "12px" }}>
            <s-color-picker
              value={colorValue}
              onChange={(e) => {
                setColorValue(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
            />
          </div>
        </s-popover>

        {/* Hex Input Field */}
        <s-text-field
          label=""
          value={colorValue}
          onInput={(e) => {
            const newColor = e.target.value;
            setColorValue(newColor);
            if (onChange) onChange(newColor);
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
