import React, { useState, useEffect } from "react";
import Icons from "../constant/icons.json";
import useStore from "../zustand/store";

const CHUNK_SIZE = 10; // Load 24 icons at a time

const SelectIcons = ({ id = "modal", activeIndex, isOpen = false }) => {
  const { updateContent, updateContentAt } = useStore();
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  // Reset or start loading when modal opens
  useEffect(() => {
    if (isOpen) {
      // Logic to gradually increase count
      if (visibleCount < Icons.length) {
        const timer = setTimeout(() => {
          setVisibleCount((prev) => prev + CHUNK_SIZE);
        }, 100); // 100ms delay between chunks for a smooth "pop-in" effect
        return () => clearTimeout(timer);
      }
    } else {
      // Reset when closed so next open is fast
      setVisibleCount(CHUNK_SIZE);
    }
  }, [isOpen, visibleCount]);

  // Slice the full list based on current visibleCount
  const visibleIcons = Icons.slice(0, visibleCount);

  return (
    <s-modal id={id} heading="Change Icon">
      <s-grid gridTemplateColumns="repeat(6, 1fr)" gap="small" justifyContent="center">
        {isOpen && visibleIcons.map((icon, index) => (
          <s-grid-item key={index}>
            <div
              className="icon-box-grid"
              onClick={() => {
                // Use strict check for 0 index
                if (typeof activeIndex === "number") {
                  updateContentAt(activeIndex, "icon", icon?.imageUrl);
                } else {
                  updateContent("icon", icon?.imageUrl);
                }
              }}
            >
              <s-button variant="tertiary" commandFor={id} command="--hide">
                <img
                  src={icon.imageUrl}
                  loading="lazy"
                  style={{ width: "30px", height: "30px" }}
                />
              </s-button>
            </div>
          </s-grid-item>
        ))}
      </s-grid>
      
      {/* Optional: Simple indicator if still loading chunks */}
      {isOpen && visibleCount < Icons.length && (
        <div style={{ textAlign: "center", padding: "10px", fontSize: "12px", color: "#666" }}>
          Loading more icons...
        </div>
      )}
    </s-modal>
  );
};

export default SelectIcons;