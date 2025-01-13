import React from "react";
import ProductCategorySection from "./product-category";

function TopSelling() {
  return (
    <section>
      <h1>Top Selling Medicines</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ProductCategorySection />
      </div>
    </section>
  );
}

export default TopSelling;
