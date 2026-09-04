import { useState } from "react";

import HeroSection from "../../components/common/HeroSection";
import PropertyCategories from "../../components/property/PropertyCategories";
import FeaturedProperties from "../../components/property/FeaturedProperties";
import WhyNestora from "../../components/property/WhyNestora";
import StatsSection from "../../components/common/StatsSection";
import AboutPreview from "../../components/common/AboutPreview";
import OwnerCTA from "../../components/common/OwnerCTA";


function Home() {
  const [filters, setFilters] =
    useState({
      location: "",
      listingType: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });

  const handleSearch = () => {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(
      ([key, value]) => {
        if (value) {
          query.set(key, value);
        }
      }
    );

    window.location.href = `/properties?${query.toString()}`};

  return (
    <>
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />

      <PropertyCategories />

      <FeaturedProperties />

      <WhyNestora />

      <StatsSection />

      <AboutPreview />

      <OwnerCTA />

    </>
  );
}

export default Home;