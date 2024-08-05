"use client";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const router = useNavigate();
  return (
    <section className="relative flex lg:flex-row flex-col justify-between bg-white px-10 pt-10  overflow-hidden">
      <div className="max-w-3xl py-20 2xl:pr-20 2xl:pl-10">
        <h1 className="xl:text-7xl lg:text-6xl text-5xl font-bold xl:leading-tight leading-snug overflow-y-hidden upp">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Bridging the gap between skilled professionals and the top companies
          nationwide, we provide a platform where talent meets opportunity,
          ensuring every individual finds the perfect match for their career
          growth and aspirations.
        </p>
        <button
          onClick={() => router("/jobs")}
          className="mt-4 font-semibold text-xl bg-[#0e1630] rounded-lg py-2 px-6 text-white hover:bg-blue-950 transition-all"
        >
          Find Jobs
        </button>
      </div>
      <div className="block overflow-y-hidden min-w-96">
        <img
          src="/heroimagenew.png"
          alt="Professional"
          className="h-auto max-w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
