import React, { useEffect, useState } from "react";
import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";
import { PAGES } from "../constant/index";
import CustomRadioGroup from "./CustomRadioGroup";

const Placement = () => {
  const { setPlacement, placement, placementRules, setPlacementRules } =
    useStore();

  const [clonePlacement, setClonePlacement] = useState(null);

  useEffect(() => {
    if (placementRules) {
      setClonePlacement(placementRules);
    }
  }, [placementRules]);

  const handleSelectProducts = async () => {
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: true,

      selectionIds: placementRules?.include_templates?.map((id) => ({
        id: `gid://shopify/Product/${id}`,
      })),
    });

    if (selected) {
      let ids = [];
      for (let i = 0; i < selected.length; i++) {
        const id = selected[i]?.id;
        const productId = id.split("/").pop();
        ids.push(productId);
      }

      setPlacementRules({
        exclude_templates: [],
        include_templates: [...ids],
      });
    }
  };

  const handlePlacement = (value) => {
    setPlacement(value);
  };

  // Exclude pages onchange
  const handleChange = (value, checked) => {
    let excludepages = [...(clonePlacement?.exclude_templates || [])];

    if (!checked && excludepages.includes(value) == true) {
      let filtred = excludepages.filter((x) => x !== value);

      setClonePlacement({
        include_templates: [],
        exclude_templates: [...filtred],
      });
    } else {
      excludepages.push(value);
      setClonePlacement({
        include_templates: [],
        exclude_templates: [...excludepages],
      });
    }
  };

  const handleSaveExcludepages = () => {
    if (clonePlacement) {
      setPlacementRules(clonePlacement);
    }
  };

  const visibilityOptions = [
    { label: "Every Page", value: "every" },
    { label: "Every Page Excludes", value: "page-excludes" },
    { label: "Home Page only", value: "index" },
    { label: "All products pages", value: "all-products" },
    { label: "Specific product pages", value: "specific-products" },
  ];

  return (
    <div style={styles.section}>
      <s-stack gap="large">
        <s-stack gap="base">
          <s-heading>Select pages to display the bar</s-heading>

          <CustomRadioGroup
            name="placement-config"
            options={visibilityOptions}
            selectedValue={placement}
            onChange={(value) => handlePlacement(value)}
            details="Select the placement of the announcement bar. You can choose to show it on all pages, or only on specific pages."
          />
        </s-stack>

        {placement === "specific-products" && (
          <s-box>
            <s-button onClick={handleSelectProducts}>Select Products</s-button>
          </s-box>
        )}

        {placement == "page-excludes" && (
          <>
            <s-heading>Exclude the pages you want.</s-heading>
            <s-button commandFor="modal">Exlude Pages</s-button>
          </>
        )}

        <s-modal id="modal" heading="Exlude Pages">
          <s-stack>
            {PAGES.map((page) => (
              <s-checkbox
                key={page?.value}
                label={page?.label}
                checked={clonePlacement?.exclude_templates?.includes(
                  page?.value,
                )}
                onChange={(e) => handleChange(page?.value, e.target.checked)}
              />
            ))}
          </s-stack>
          <s-button
            slot="secondary-actions"
            commandFor="modal"
            command="--hide"
            onClick={() =>
              setClonePlacement({
                ...placementRules,
                exclude_templates: [...placementRules?.exclude_templates],
              })
            }
          >
            Close
          </s-button>
          <s-button
            slot="primary-action"
            variant="primary"
            commandFor="modal"
            command="--hide"
            disabled={!clonePlacement?.exclude_templates}
            onClick={handleSaveExcludepages}
          >
            Save
          </s-button>
        </s-modal>
      </s-stack>
    </div>
  );
};

export default Placement;
