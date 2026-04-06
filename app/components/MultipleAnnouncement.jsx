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

        <svg
          width={22}
          height={22}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
        </svg>
      </button>

      {/* ✅ Custom Next Button */}
      <button className="custom-next">
        {/* RIGHT SVG */}
        <svg
          width={22}
          height={22}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
        </svg>
      </button>
    </div>
  );
};

export default MultipleAnnouncement;
