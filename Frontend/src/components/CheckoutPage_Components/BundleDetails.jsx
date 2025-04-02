import React from "react";
import { Bundles } from "../../data/BundlesData.jsx"; 

function BundleDetails({ id }) {
  // Find the bundle with the matching id
  const selectedBundle = Bundles.find((bundle) => bundle.id === id);

  // // If no bundle is found, display a fallback message
  // if (!selectedBundle) {
  //   return <div className={styles.error}>Bundle not found</div>;
  // }

  return (
    <div style={{color:'white'}}>
      <h2 >{selectedBundle.title}</h2>
      <p>{selectedBundle.shipping}</p>
      <p>Price: {selectedBundle.price}</p>
      <p>{selectedBundle.discountText}</p>
      <p>Discount: {selectedBundle.discountAmount}</p>
    </div>
  );
}

export default BundleDetails;