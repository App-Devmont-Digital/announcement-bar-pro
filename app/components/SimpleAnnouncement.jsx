import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";

const SimpleAnnouncement = () => {
  const { designSettings, content } = useStore();

  const {
    textSize,
    textColor,
    btnTextColor,
    btnTextSize,
    btnColor,
    btnRadius,
    subheadingSize,
    subheadingColor,
  } = designSettings;

  return (
    <div style={styles.previewInnerWrapper}>
      <div style={styles.previewBarContent}>
        <div style={styles.previewTextContent}>
          {/* ======== Heading of Preview Text =========== */}
          <h2
            style={{
              ...styles.previewText,
              color: textColor,
              fontSize: textSize + "px",
            }}
          >
            {content?.title || "Enjoy a 20% discount on all our products!"}
          </h2>
          {/* Subheading content  */}
          <p
            style={{
              ...styles.subHeading,
              fontSize: subheadingSize + "px",
              color: subheadingColor,
            }}
          >
            {content?.subheading}
          </p>
        </div>

        {/* ========= Button Preview ========== */}
        <a
          href={content?.buttonLink}
          style={{
            ...styles.previewButton,
            color: btnTextColor,
            backgroundColor: btnColor,
            padding: "8px 16px",
            borderRadius: btnRadius + "px",
            border: "0",
            fontSize: btnTextSize + "px",
          }}
        >
          {content?.buttonText}
        </a>
      </div>

      {/* Close icon button  */}
      {content?.showCloseIcon ? (
        <button type="button" style={styles.closeIcon}>
          <svg
            width="12"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m7.414 6 4.293-4.293A.999.999 0 1 0 10.293.293L6 4.586 1.707.293A.999.999 0 1 0 .293 1.707L4.586 6 .293 10.293a.999.999 0 1 0 1.414 1.414L6 7.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L7.414 6Z"
              fill="#6d7175"
            ></path>
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default SimpleAnnouncement;
