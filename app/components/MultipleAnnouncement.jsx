import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import useStore from "../zustand/store";

import { styles } from "../styles/appStyles1";

const MultipleAnnouncement = () => {
  const { designSettings, content, multiContent } = useStore();

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
        {multiContent?.length
          ? multiContent?.map((item) => (
              <SwiperSlide key={item?.id}>
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
                        {item?.title ||
                          "Enjoy a 20% discount on all our products!"}
                      </h2>
                      {/* Subheading content  */}
                      {item?.subheading && (
                        <p
                          style={{
                            ...styles.subHeading,
                            fontSize: subheadingSize + "px",
                            color: subheadingColor,
                          }}
                        >
                          {item?.subheading}
                        </p>
                      )}
                    </div>

                    {/* ========= Button Preview ========== */}

                    {item?.callToAction === "button" && (
                      <a
                        href={item?.buttonLink || "#"}
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
                        {item?.buttonText || "Shop Now!"}
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default MultipleAnnouncement;
