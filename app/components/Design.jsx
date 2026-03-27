import RangeSlider from "react-range-slider-input";

import useStore from "../zustand/store";
import { Templates } from "../constant";
import ColorPicker from "./ColorPicker";
import PixelFieldInput from "./PixelFieldInput";
import { styles } from "../styles/appStyles1";

import "react-range-slider-input/dist/style.css";

const Design = ({setSelectedTab}) => {
  const { designSettings, updateDesign } = useStore();

  const handleFileBg = async (e) => {
    const file = e.target.files[0];

    updateDesign("bgImageUrl", file);
  };

  return (
    <>
      <div style={styles.section}>
        <s-stack>
          <s-select
            label="Positioning"
            value={designSettings?.position}
            onChange={(e) => updateDesign("position", e.target.value)}
          >
            <s-option value="top-page">Top page</s-option>
            <s-option value="bottom-page">Bottom page</s-option>
          </s-select>
        </s-stack>
      </div>

      {/* <div style={styles.divider} /> */}

      {/* <div style={styles.section}>
        <s-stack>
          <s-select
            label="Template"
            value={designSettings?.template}
            onChange={(e) => updateDesign("template", Number(e.target.value))}
          >
            {Templates.map((template) => (
              <s-option key={template.id} value={template.id}>
                {template.name}
              </s-option>
            ))}
          </s-select>
        </s-stack>
      </div> */}

      <div style={styles.divider} />

      <div style={{ ...styles.section }}>
        <s-stack gap="base large">
          <p style={styles.mainTitle}>Card</p>
          <s-choice-list
            label=""
            name="Card"
            details=""
            values={[designSettings?.cardBg]}
            onChange={(event) =>
              updateDesign("cardBg", event.currentTarget.values[0])
            }
          >
            <s-choice value="single-bg">Single color background</s-choice>
            <s-choice value="gradient-bg">Gradient background</s-choice>
            <s-choice value="image-bg">Background image</s-choice>
          </s-choice-list>
        </s-stack>

        <s-stack gap="base large">
          {/* Single Background card color  */}
          {designSettings?.cardBg === "single-bg" && (
            <>
              <ColorPicker
                label="Single background color"
                color={designSettings?.singleBgColor}
                onChange={(color) => updateDesign("singleBgColor", color)}
                popoverId="single-bg-color-picker"
              />
            </>
          )}

          <div
            style={{
              display:
                designSettings?.cardBg === "gradient-bg" ? "block" : "none",
            }}
          >
            <s-stack gap="base large">
              <s-stack gap="small">
                <s-paragraph>Gradient angle degree</s-paragraph>
                <RangeSlider
                  value={designSettings?.gradientRange}
                  onInput={(val) => updateDesign("gradientRange", val)}
                  thumbsDisabled={[true, false]}
                  rangeSlideDisabled={true}
                  min={0}
                  max={360}
                />
              </s-stack>

              <s-stack gap="small">
                <ColorPicker
                  label=""
                  color={designSettings?.gradeintColor1}
                  onChange={(color) => updateDesign("gradeintColor1", color)}
                  popoverId="gradient-start-color-picker"
                />
                <ColorPicker
                  label=""
                  color={designSettings?.gradeintColor2}
                  onChange={(color) => updateDesign("gradeintColor2", color)}
                  popoverId="gradient-end-color-picker"
                />
              </s-stack>
            </s-stack>
          </div>

          {/* Image card Bg change and blur option  */}
          <s-stack gap="base large">
            {designSettings?.cardBg === "image-bg" && (
              <>
                <div style={styles.bgImageBoxContainer}>
                  <img
                    style={styles.bgImageBox}
                    src={
                      typeof designSettings?.bgImageUrl === "object"
                        ? URL.createObjectURL(designSettings?.bgImageUrl)
                        : designSettings?.bgImageUrl ||
                          "https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg"
                    }
                    alt="image"
                  />

                  <div style={{ position: "relative", width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <input
                        type="file"
                        style={styles.file}
                        onChange={handleFileBg}
                      />
                      <button type="button" style={styles.btn}>
                        Change Image
                      </button>
                    </div>
                    <s-checkbox
                      label="Blur background"
                      value={designSettings?.blurBackground}
                      onChange={(e) =>
                        updateDesign("blurBackground", e.target.checked)
                      }
                    />
                  </div>
                </div>
                <ColorPicker
                  label="Background overlay color"
                  color={designSettings?.singleBgColor}
                  onChange={(color) => updateDesign("singleBgColor", color)}
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
                <PixelFieldInput
                  label="Corner radius"
                  value={designSettings?.cornerRadius}
                  onChange={(value) => updateDesign("cornerRadius", value)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2"></s-grid-item>
            </s-grid>

            {/* Border size and border color  */}
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput
                  label="Border size"
                  onChange={(val) => updateDesign("borderSize", val)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label="Border color"
                  color={designSettings?.borderColor}
                  onChange={(color) => updateDesign("borderColor", color)}
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
                <PixelFieldInput
                  label=""
                  value={designSettings?.textSize}
                  onChange={(val) => updateDesign("textSize", val)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={designSettings?.textColor}
                  onChange={(color) => updateDesign("textColor", color)}
                  popoverId="text-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-box>

          <s-box>
            <s-paragraph>Subheading size and color</s-paragraph>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput
                  label=""
                  value={designSettings?.subheadingSize}
                  onChange={(val) => updateDesign("subheadingSize", val)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={designSettings?.subheadingColor}
                  onChange={(color) => updateDesign("subheadingColor", color)}
                  popoverId="subheading-color-picker"
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
              color={designSettings?.btnColor}
              onChange={(color) => updateDesign("btnColor", color)}
              popoverId="btnBg-color-picker"
            />
          </s-box>

          <s-box>
            <s-paragraph>Button text size and color</s-paragraph>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <PixelFieldInput
                  label=""
                  value={designSettings?.btnTextSize}
                  onChange={(val) => updateDesign("btnTextSize", val)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label=""
                  color={designSettings?.btnTextColor}
                  onChange={(color) => updateDesign("btnTextColor", color)}
                  popoverId="btnText-color-picker"
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
              <PixelFieldInput
                label="Corner radius"
                value={designSettings?.btnRadius}
                onChange={(val) => updateDesign("btnRadius", val)}
              />
            </s-grid-item>
            <s-grid-item gridColumn="span 2"></s-grid-item>
          </s-grid>
        </s-stack>
      </div>

      <div style={styles.continueBtn}>
        <s-button full-width onClick={() => setSelectedTab("placement")}>
          Continue to placement
        </s-button>
      </div>
    </>
  );
};

export default Design;
