import RangeSlider from "react-range-slider-input";

import useStore from "../zustand/store";
import { Templates } from "../constant";
import ColorPicker from "./ColorPicker";
import PixelFieldInput from "./PixelFieldInput";
import CustomRadioGroup from "./CustomRadioGroup";
import { styles } from "../styles/appStyles1";

import "react-range-slider-input/dist/style.css";

const Design = ({ setSelectedTab }) => {
  const { designSettings, updateDesign } = useStore();

  const handleFileBg = async (e) => {
    const file = e.target.files[0];

    updateDesign("bgImageUrl", file);
  };

  const backgroundOptions = [
    { label: "Solid background", value: "single-bg" },
    { label: "Gradient background", value: "gradient-bg" },
    { label: "Background image", value: "image-bg" },
  ];

  return (
    <>
      <div style={styles.section}>
        <s-stack>
          <p style={{ ...styles.label, paddingBottom: "10px" }}>
            Layout position
          </p>
          <CustomRadioGroup
            name="layout-position"
            options={[
              { label: "Top of the page", value: "top-page" },
              { label: "Bottom of the page", value: "bottom-page" },
            ]}
            selectedValue={designSettings?.position}
            onChange={(value) => updateDesign("position", value)}
          />
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
        <s-stack gap="small">
          <p style={{ ...styles.mainTitle }}>Background type</p>
          <CustomRadioGroup
            name="background-config"
            options={backgroundOptions}
            selectedValue={designSettings?.cardBg}
            onChange={(value) => updateDesign("cardBg", value)}
          />
        </s-stack>

        <s-stack gap="small" paddingBlockStart="small">
          {/* Single Background card color  */}
          {designSettings?.cardBg === "single-bg" && (
            <>
              <p style={{ ...styles.label }}>Solid background</p>
              <ColorPicker
                label=""
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
                <p style={styles.label}>Gradient angle degree</p>
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

            {/* Border radius  */}
            <s-grid
              gridTemplateColumns="repeat(3, 1fr)"
              gap="small"
              justifyContent="center"
            >
              <s-grid-item gridColumn="span 1">
                <s-box>
                  <p style={styles.label}>Border radius</p>
                  <PixelFieldInput
                    label=""
                    value={designSettings?.cornerRadius}
                    onChange={(value) => updateDesign("cornerRadius", value)}
                  />
                </s-box>
              </s-grid-item>
              <s-grid-item gridColumn="span 1">
                <p style={styles.label}>Border size</p>
                <PixelFieldInput
                  label=""
                  onChange={(val) => updateDesign("borderSize", val)}
                />
              </s-grid-item>
            </s-grid>

            {/* Border size and border color  */}
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 2">
                <p style={styles.label}>Border color</p>
                <ColorPicker
                  label=""
                  color={designSettings?.borderColor}
                  onChange={(color) => updateDesign("borderColor", color)}
                  popoverId="border-color-picker"
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 1"></s-grid-item>
            </s-grid>
          </s-stack>
        </s-stack>
      </div>

      <div style={styles.divider} />

      {/* Typography section  */}
      <div style={styles.section}>
        <p style={styles.mainTitle}>Typography style</p>

        <s-stack gap="large" paddingBlockStart="small-100">
          {/* Title size and color  */}
          <s-box>
            <s-grid gridTemplateColumns="repeat(3, 1fr)" gap="small">
              <s-grid-item gridColumn="span 1">
                <p style={styles.mainTitle}>Title size</p>
                <PixelFieldInput
                  label=""
                  value={designSettings?.textSize}
                  onChange={(val) => updateDesign("textSize", val)}
                />
              </s-grid-item>
              <s-grid-item gridColumn="span 2">
                <ColorPicker
                  label="Title color"
                  color={designSettings?.textColor}
                  onChange={(color) => updateDesign("textColor", color)}
                  popoverId="text-color-picker"
                />
              </s-grid-item>
            </s-grid>
          </s-box>

          <s-box>
            <p style={styles.label}>Subheading size and color</p>
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
        <p style={styles.mainTitle}>Button Style</p>

        <s-stack gap="large" paddingBlockStart="small">
          {/* Title size and color  */}
          <s-box>
            <p style={{...styles.label}}>Button color</p>
            <ColorPicker
              label=""
              color={designSettings?.btnColor}
              onChange={(color) => updateDesign("btnColor", color)}
              popoverId="btnBg-color-picker"
            />
          </s-box>

          <s-box>
            <p style={{...styles.label}}>Button text size and color</p>
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
          {/* Border radius  */}
          <s-grid
            gridTemplateColumns="repeat(3, 1fr)"
            gap="small"
            justifyContent="center"
          >
            <s-grid-item gridColumn="span 1">
              <p style={{...styles.label}}>Button radius</p>
              <PixelFieldInput
                label=""
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
