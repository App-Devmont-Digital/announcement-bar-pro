import React from "react";
import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";

import SimpleAnnoucement from "../components/SimpleAnnouncement";
import LineAnnouncement from "../components/LineAnnouncement";
import MultipleAnnouncement from "../components/MultipleAnnouncement";

const LivePreview = () => {
  const { designSettings, content } = useStore();

  const {
    cardBg,
    singleBgColor,
    gradeintColor1,
    gradeintColor2,
    gradientRange,
    blurBackground,
    cornerRadius,
    borderColor,
    borderSize,
  } = designSettings;

  const getBackgroundStyle = () => {
    if (cardBg === "single-bg") {
      return singleBgColor;
    }

    if (cardBg === "gradient-bg") {
      return `linear-gradient(${gradientRange[1]}deg, ${gradeintColor1}, ${gradeintColor2})`;
    }

    const image = designSettings?.bgImageUrl;
    // Default: image background
    if (image && typeof image === "object") {
      // image is a File object → create temporary URL
      return `url(${URL.createObjectURL(image)}) center center / cover`;
    }

    // bgFile is a string URL
    return `url(${image || "https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg"}) center center / cover`;
  };

  const renderAnnoucementPreview = () => {
    switch (content?.announcementType) {
      case "simple-announce":
        return <SimpleAnnoucement />;
      case "line-announce":
        return <LineAnnouncement />;
      case "multiple-announce":
        return <MultipleAnnouncement />;
      default:
        return <SimpleAnnoucement />;
    }
  };

  return (
    <>
      <div
        style={{
          ...styles.previewBar,
          background: getBackgroundStyle(),
          border: `${borderSize}px solid ${borderColor}`,
          borderRadius: `${cornerRadius}px`,
          padding:
            content?.announcementType === "multiple-announce"
              ? "10px 0px"
              : "10px 16px",
        }}
      >
        {/* ===== Blur Backround Feature ===== */}
        {blurBackground ? <div style={styles.blurBackground}></div> : null}

        {renderAnnoucementPreview()}
      </div>
    </>
  );
};

export default LivePreview;
