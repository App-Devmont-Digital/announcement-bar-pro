import React from "react";

import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";

const LineAnnouncement = () => {
  const { designSettings, content } = useStore();

  const {
    textSize,
    textColor,
    btnTextColor,
    btnTextSize,
    btnColor,
    btnRadius,
  } = designSettings;

  return (
    <div style={styles.previewInnerWrapper}>
      <div style={styles.previewBarContent}>
        <div style={styles.previewTextContent}>
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First half */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={`a-${i}`}
                  className="announcement-text"
                  style={{
                    color: textColor,
                    fontSize: textSize + "px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {content?.title ||
                    "Enjoy a 40% discount on all our products!"}
                  
                </span>
              ))}

              {/* Second half — exact duplicate for seamless loop */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={`b-${i}`}
                  className="announcement-text"
                  style={{
                    color: textColor,
                    fontSize: textSize + "px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {content?.title ||
                    "Enjoy a 40% discount on all our products!"}
                  
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close icon button  */}
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
  );
};

export default LineAnnouncement;
