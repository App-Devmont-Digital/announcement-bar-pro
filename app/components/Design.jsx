import { useState } from "react";

import { styles } from "../styles/appStyles1";
import { Templates } from "../constant";
import ColorPicker from "./ColorPicker";
import PixelFieldInput from "./PixelFieldInput";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Design = () => {
  const [position, setPosition] = useState("top-page");
  const [template, setTemplate] = useState(1);
  const [card, setCard] = useState("single-bg");
  const [singleBgColor, setsingleBgColor] = useState("#dddddd");

  const [value, setValue] = useState([0, 50]);

  return (
    <>
      <div style={styles.section}>
        <s-stack>
          <s-select
            label="Positioning"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <s-option value="top-page">Top page</s-option>
            <s-option value="bottom-page">Bottom page</s-option>
          </s-select>
        </s-stack>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <s-stack>
          <s-select
            label="Template"
            value={template}
            onChange={(e) => setTemplate(Number(e.target.value))}
          >
            {Templates.map((template) => (
              <s-option key={template.id} value={template.id}>
                {template.name}
              </s-option>
            ))}
          </s-select>
        </s-stack>
      </div>

      <div style={styles.divider} />

      <div style={{ ...styles.section }}>
        <s-stack gap="base large">
          <p style={styles.mainTitle}>Card</p>
          <s-choice-list
            label=""
            name="Card"
            details=""
            values={[card]}
            onChange={(event) => setCard(event.currentTarget.values[0])}
          >
            <s-choice value="single-bg">Single color background</s-choice>
            <s-choice value="gradient-bg">Gradient background</s-choice>
            <s-choice value="image-bg">Background image</s-choice>
          </s-choice-list>
        </s-stack>

        <s-stack gap="base large">
          {/* Single Background card color  */}
          {card === "single-bg" && (
            <>
              <ColorPicker
                label="Single background color"
                color={singleBgColor}
                onChange={setsingleBgColor}
                popoverId="single-bg-color-picker"
              />
            </>
          )}

          <div style={{ display: card === "gradient-bg" ? "block" : "none" }}>
            <s-stack gap="base large">
              <s-stack gap="small">
                <s-paragraph>Gradient angle degree</s-paragraph>
                <RangeSlider
                  value={value}
                  onInput={setValue}
                  thumbsDisabled={[true, false]}
                  rangeSlideDisabled={true}
                  min={0}
                  max={100}
                />
              </s-stack>

              <s-stack gap="small">
                <ColorPicker
                  label=""
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="gradient-start-color-picker"
                />
                <ColorPicker
                  label=""
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="gradient-end-color-picker"
                />
              </s-stack>
            </s-stack>
          </div>

          {/* Image card Bg change and blur option  */}
          <s-stack gap="base large">
            {card === "image-bg" && (
              <>
                <div style={styles.bgImageBoxContainer}>
                  <img
                    style={styles.bgImageBox}
                    src="https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg"
                    alt="image"
                  />

                  <div style={{ position: "relative", width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <input type="file" style={styles.file} />
                      <button type="button" style={styles.btn}>
                        Change Image
                      </button>
                    </div>
                    <s-checkbox label="Blur background" />
                  </div>
                </div>
                <ColorPicker
                  label="Background overlay color"
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="bg-overlay-color-picker"
                />
              </>
            )}

            {/* Corner radius  */}
            <s-grid
              gridTemplateColumns="repeat(3, 1fr)"
              gap="small"
              justifyContent="center"
            >
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput label="Corner radius" />
              </s-grid-item>
              <s-grid-item gridColumn="span 2"></s-grid-item>
            </s-grid>

            {/* Border size and border color  */}
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput label="Border size" />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label="Border color"
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="border-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-stack>
        </s-stack>
      </div>

      <div style={styles.divider} />

      {/* Typography section  */}
      <div style={styles.section}>
        <s-heading>Typography</s-heading>

        <s-stack gap="large">
          {/* Title size and color  */}
          <s-box>
            <s-paragraph>Title size and color</s-paragraph>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput label="" />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="border-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-box>

          <s-box>
            <s-paragraph>Subheading size and color</s-paragraph>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput label="" />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="border-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-box>
        </s-stack>
      </div>

      {/* Button Style  ==== */}
      <div style={styles.divider} />

      <div style={styles.section}>
        <s-heading>Button Style</s-heading>

        <s-stack gap="large">
          {/* Title size and color  */}
          <s-box>
            <ColorPicker
              label="Button color"
              color={singleBgColor}
              onChange={setsingleBgColor}
              popoverId="border-color-picker"
            />
          </s-box>

          <s-box>
            <s-paragraph>Button text size and color</s-paragraph>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput label="" />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={singleBgColor}
                  onChange={setsingleBgColor}
                  popoverId="border-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-box>
          {/* Corner radius  */}
          <s-grid
            gridTemplateColumns="repeat(3, 1fr)"
            gap="small"
            justifyContent="center"
          >
            <s-grid-item gridColumn="span 1">
              <PixelFieldInput label="Corner radius" />
            </s-grid-item>
            <s-grid-item gridColumn="span 2"></s-grid-item>
          </s-grid>
        </s-stack>
      </div>

      <div style={styles.continueBtn}>
        <s-button full-width onClick={() => setSelectedTab("design")}>
          Continue to placement
        </s-button>
      </div>
    </>
  );
};

export default Design;
