import { useState } from "react";
import { styles } from "../styles/appStyles1";

const Content = ({
  announcementName,
  title,
  setAnnouncementName,
  setTitle,
}) => {
  const [announcementType, setAnnouncementType] = useState("simple");

  const [subheading, setSubheading] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [callToAction, setCallToAction] = useState("no_cta");
  const [closeIcon, setCloseIcon] = useState(false);
  const [startOption, setStartOption] = useState("right_now");
  const [endOption, setEndOption] = useState("never");
  const [showCombineBanner, setShowCombineBanner] = useState(true);
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
              onChange={(event) =>
                setAnnouncementType(event.currentTarget.values)
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

        <div style={styles.divider} />
      </div>

      <div style={styles.divider} />

      {/* ── Announcement Content ── */}
      <div style={styles.section}>
        <p style={styles.mainTitle}>Announcement content</p>

        {/* Announcement Name */}
        <s-text-field
          label="Announcement name"
          value={announcementName}
          help-text="Only visible to you. For your own internal reference."
          onInput={(e) => setAnnouncementName(e.target.value)}
        />

        {/* Title */}
        <s-text-field
          label="Title"
          value={title}
          multiline="2"
          onInput={(e) => setTitle(e.target.value)}
        />

        {/* Subheading */}
        <s-text-field
          label="Subheading"
          value={subheading}
          onInput={(e) => setSubheading(e.target.value)}
        />

        {/* Coupon Code */}
        <s-text-field
          label="Coupon code"
          value={couponCode}
          onInput={(e) => setCouponCode(e.target.value)}
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
      </div>

      <div style={styles.divider} />

      {/* ── Call to Action ── */}
      <div style={styles.section}>
        <s-text variant="headingSm" as="h2" font-weight="semibold">
          Call to action
        </s-text>

        <s-select
          label="Date range"
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value)}
        >
          <s-option value="no_cta">No call to action</s-option>
          <s-option value="button">Button</s-option>
          <s-option value="link">Link</s-option>
        </s-select>

        <s-checkbox
          label="Close icon"
          checked={closeIcon}
          onChange={(e) => setCloseIcon(e.target.checked)}
        />
      </div>

      <div style={styles.divider} />

      {/* ── Scheduling ── */}
      <div style={styles.section}>
        <div style={styles.rowWithBadge}>
          <s-text variant="headingSm" as="h2" font-weight="semibold">
            Scheduling
          </s-text>
          <s-badge tone="info">Essential plan</s-badge>
        </div>

        {/* Starts */}
        <div style={styles.scheduleBlock}>
          <s-text variant="bodySm" font-weight="medium">
            Starts
          </s-text>
          <s-choice-list
            label=""
            name="start"

            // onChange={handleChange}
          >
            <s-choice value="right-now">Right now</s-choice>
            <s-choice value="start-date">Specific date</s-choice>
          </s-choice-list>
        </div>

        {/* Ends */}
        <div style={styles.scheduleBlock}>
          <s-text variant="bodySm" font-weight="medium">
            Ends
          </s-text>
          <s-choice-list
            label=""
            name="end"
            // onChange={handleChange}
          >
            <s-choice value="never">Never</s-choice>
            <s-choice value="end-date">Specific date</s-choice>
          </s-choice-list>
        </div>
      </div>

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
