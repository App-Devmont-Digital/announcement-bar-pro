import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import useStore from "../zustand/store";

import { styles } from "../styles/appStyles1";

const MultipleAnnouncement = () => {
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
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div
            style={{
              ...styles.previewInnerWrapper,
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
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
                  {content?.title ||
                    "Enjoy a 20% discount on all our products!"}
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              ...styles.previewInnerWrapper,
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
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
                  {content?.title ||
                    "Enjoy a 20% discount on all our products!"}
                </h2>
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
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MultipleAnnouncement;
