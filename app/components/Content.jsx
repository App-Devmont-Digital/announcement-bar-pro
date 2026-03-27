import { useState } from "react";
import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";

import AddMultiAnnouncement from "../components/AddMultiAnnouncement";
import SelectIcons from "../components/SelectIcons";

const Content = ({ setSelectedTab }) => {
  const [openModal, setOpenModal] = useState(false);

  const { designSettings, updateDesign, content, updateContent } = useStore();

  const handleIcon = (e) => {
    const file = e.target.files[0];

    updateContent("icon", file);
  };

  return (
    <>
      {/* ── Announcement Type ── */}
      <div style={styles.section}>
        <div style={styles.radioGroup}>
          <s-stack gap="base large">
            <p style={styles.mainTitle}>Announcement type</p>
            <s-choice-list
              label=""
              name="Announcement type"
              details=""
              values={[content?.announcementType]}
              onChange={(event) =>
                // setAnnouncementType(event.currentTarget.values)
                updateContent("announcementType", event.currentTarget.values[0])
              }
            >
              <s-choice value="simple-announce">Simple announcement</s-choice>
              <s-choice value="line-announce">
                Running line announcement
              </s-choice>
              <s-choice value="multiple-announce">
                Multiple rotating announcements
              </s-choice>
            </s-choice-list>
          </s-stack>
        </div>

        {/* <div style={styles.divider} /> */}
      </div>

      <div style={styles.divider} />

      {content?.announcementType !== "multiple-announce" ? (
        <>
          {/* ── Announcement Content ── */}
          <div style={styles.section}>
            <p style={styles.mainTitle}>Announcement content</p>

            {/* Announcement Name */}
            <s-text-field
              label="Announcement name"
              value={content?.name}
              details={"Only visible to you. For your own internal reference."}
              help-text="Only visible to you. For your own internal reference."
              onInput={(e) => updateContent("name", e.target.value)}
            />

            {/* Title */}
            <s-text-field
              label="Title"
              value={content?.title}
              multiline="2"
              onInput={(e) => updateContent("title", e.target.value)}
            />

            {/* Subheading */}
            <s-text-field
              label="Subheading"
              value={content?.subheading}
              onInput={(e) => updateContent("subheading", e.target.value)}
            />

            {/* Icon — no Polaris component for icon picker, keep custom layout */}
            {content?.announcementType !== "line-announce" && (
              <div style={styles.fieldGroup}>
                <div style={styles.rowWithBadge}>
                  <s-text variant="bodyMd" font-weight="medium">
                    Icon
                  </s-text>
                </div>
                <div style={styles.iconRow}>
                  <div style={styles.iconPreviewBox}>
                    {content?.icon ? (
                      <img
                        src={
                          typeof content?.icon === "object"
                            ? URL.createObjectURL(content?.icon)
                            : content?.icon
                        }
                        style={{
                          width: "26px",
                          height: "26px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="#c9cccf"
                      >
                        <path d="M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V6zM4 15a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3z" />
                      </svg>
                    )}
                  </div>
                  <div style={styles.iconButtons}>
                    <s-button
                      commandFor="modal"
                      onClick={() => setOpenModal(true)}
                    >
                      Select Icon
                    </s-button>

                    <div style={{ width: "100%", position: "relative" }}>
                      <input
                        type="file"
                        style={styles.file}
                        onChange={handleIcon}
                      />
                      <button
                        type="button"
                        style={{
                          ...styles.btn,
                          width: "fit-content",
                          backgroundColor: "#303030",
                          color: "#fff",
                          boxShadow: "none",
                        }}
                      >
                        Upload Icon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={styles.divider} />

          {/* ── Call to Action ── */}
          <div style={styles.section}>
            <p style={styles.mainTitle}>Call to action</p>

            <s-stack gap="base">
              <s-select
                label=""
                value={content?.callToAction}
                onChange={(e) => updateContent("callToAction", e.target.value)}
              >
                <s-option value="no_cta">No call to action</s-option>
                <s-option value="button">Button</s-option>
                <s-option value="link">Make entire bar clickable</s-option>
              </s-select>

              {/* Button Text  */}
              {content?.callToAction === "button" && (
                <s-text-field
                  label="Button Text"
                  value={content?.buttonText}
                  onInput={(e) => updateContent("buttonText", e.target.value)}
                />
              )}

              {/* Link of button  */}

              {content?.callToAction !== "no_cta" ? (
                <s-text-field
                  label="Button Link"
                  value={content?.buttonLink}
                  onInput={(e) => updateContent("buttonLink", e.target.value)}
                />
              ) : null}
            </s-stack>

            <s-checkbox
              label="Close icon"
              checked={content?.showCloseIcon}
              onChange={(e) => updateContent("showCloseIcon", e.target.checked)}
            />
          </div>
        </>
      ) : (
        <AddMultiAnnouncement />
      )}

      {content?.announcementType == "simple-announce" && (
        <SelectIcons isOpen={openModal} />
      )}

      {/* Continue to Design */}
      <div style={styles.continueBtn}>
        <s-button full-width onClick={() => setSelectedTab("design")}>
          Continue to Design
        </s-button>
      </div>
    </>
  );
};

export default Content;
