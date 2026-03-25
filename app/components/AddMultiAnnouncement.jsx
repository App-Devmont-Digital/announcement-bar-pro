import React from "react";
import useStore from "../zustand/store";

import { styles } from "../styles/appStyles1";

const AddMultiAnnouncement = () => {
  const {
    multiContent,
    updateContentAt,
    addContent,
    removeContent,
    updateContent,
    content,
  } = useStore();

  return (
    <>
      <div style={{ padding: "16px 16px 0" }}>
        <p style={{ ...styles.mainTitle, paddingBottom: "16px" }}>
          Announcement content
        </p>

        {/* Announcement Name */}
        <s-text-field
          label="Announcement name"
          value={content?.name}
          details={"Only visible to you. For your own internal reference."}
          help-text="Only visible to you. For your own internal reference."
          onInput={(e) => updateContent("name", e.target.value)}
        />
      </div>
      {multiContent?.map((item, index) => (
        <div key={item.id} style={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={styles.mainTitle}>Announcement {index + 1}</p>
            {multiContent?.length > 2 && (
              <s-button tone="critical" onClick={() => removeContent(index)}>
                Remove
              </s-button>
            )}
          </div>

          {/* Title */}
          <s-text-field
            label="Title"
            value={item.title}
            multiline="2"
            onInput={(e) => updateContentAt(index, "title", e.target.value)}
          />

          {/* Subheading */}
          <s-text-field
            label="Subheading"
            value={item?.subheading}
            onInput={(e) => updateContentAt(index, "subheading", e.target.value)}
          />

          {/* Icon — no Polaris component for icon picker, keep custom layout */}
          <div style={styles.fieldGroup}>
            <div style={styles.rowWithBadge}>
              <s-text variant="bodyMd" font-weight="medium">
                Icon
              </s-text>
              <s-badge tone="info">Starter plan</s-badge>
            </div>
            <div style={styles.iconRow}>
              <div style={styles.iconPreviewBox}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#c9cccf">
                  <path d="M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V6zM4 15a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3z" />
                </svg>
              </div>
              <div style={styles.iconButtons}>
                <s-button full-width onClick={() => {}}>
                  Select Icon
                </s-button>
                <s-button full-width disabled onClick={() => {}}>
                  Upload Icon
                </s-button>
              </div>
            </div>
            <s-text variant="bodySm" tone="subdued">
              Available with Starter plan.{" "}
              <a href="#" style={styles.link}>
                Upgrade now.
              </a>
            </s-text>
          </div>

          {/* Call to Action Select */}
          <s-select
            value={item?.callToAction}
            onChange={(e) =>
              updateContentAt(index, "callToAction", e.target.value)
            }
          >
            <s-option value="no_cta">No call to action</s-option>
            <s-option value="button">Button</s-option>
            <s-option value="link">Make entire bar clickable</s-option>
          </s-select>

          {item?.callToAction === "button" && (
            <s-text-field
              label="Button Text"
              value={item.buttonText}
              onInput={(e) =>
                updateContentAt(index, "buttonText", e.target.value)
              }
            />
          )}
        </div>
      ))}
      <div style={styles.section}>
        <s-button full-width onClick={addContent}>
          Add another announcement
        </s-button>
      </div>
    </>
  );
};

export default AddMultiAnnouncement;
