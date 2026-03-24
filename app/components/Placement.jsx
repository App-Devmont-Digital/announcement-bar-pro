import React from "react";
import { styles } from "../styles/appStyles1";
import useStore from "../zustand/store";

const Placement = () => {
  const { setPlacement, placement } = useStore();

  const handleSelectProducts = async () => {
    const selected = await shopify.resourcePicker({type: 'product' ,multiple: true});
   
    console.log({selected});
    
  }
  return (
    <div style={styles.section}>
      <s-stack gap="large">
        <s-stack gap="base">
          <s-heading>Select pages to display the bar</s-heading>

          <s-choice-list
            label=""
            name="placement"
            details="Select the placement of the announcement bar. You can choose to show it on all pages, or only on specific pages."
            // onChange={handleChange}
            values={[placement]}
            onChange={(event) =>
              setPlacement(event.currentTarget.values[0])
            }
          >
            <s-choice value="every">Every Page</s-choice>
            <s-choice value="every-page-excludes">Every Page Excludes</s-choice>
            <s-choice value="home">Home Page only</s-choice>
            <s-choice value="products">All products pages</s-choice>
            <s-choice value="specific-products">Specific product pages</s-choice>
          </s-choice-list>
        </s-stack>

        <s-box>
          <s-button onClick={handleSelectProducts}>Select Products</s-button>
        </s-box>

        <s-box>
          <s-heading>Geolocation targeting</s-heading>
          <s-choice-list
            label=""
            name="placement"
            details="Select the geolocation targeting for the announcement bar."
            // onChange={handleChange}
          >
            <s-choice value="every">All world</s-choice>
            <s-choice value="Specific countries">Specific countries</s-choice>
          </s-choice-list>
        </s-box>
      </s-stack>
    </div>
  );
};

export default Placement;
