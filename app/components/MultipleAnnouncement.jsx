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
    <div className="swiper-wrapper-custom">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="mySwiper"
      >
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
                      {item?.icon && (
                        <img
                          alt="icon"
                          src={
                            typeof item?.icon === "object"
                              ? URL.createObjectURL(item?.icon)
                              : item?.icon
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
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

      {/* ✅ Custom Prev Button */}
      <button className="custom-prev">
        {/* LEFT SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 18l-6-6 6-6"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      {/* ✅ Custom Next Button */}
      <button className="custom-next">
        {/* RIGHT SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </button>
    </div>
  );
};

export default MultipleAnnouncement;
