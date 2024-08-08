import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex lg:flex-row flex-col justify-between bg-gradient-to-r from-[#0E1630] to-purple-900 px-10  overflow-hidden text-white ">
      <div className="2xl:max-w-3xl xl:max-w-2xl lg:max-w-lg 2xl:pr-20 2xl:pl-10 pt-20 lg:pb-10">
        <h1 className="xl:text-7xl lg:text-6xl text-5xl font-bold xl:leading-tight leading-snug overflow-y-hidden">
          Find Your Dream Job Today
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          Bridging the gap between skilled professionals and the top companies
          nationwide, we provide a platform where talent meets opportunity,
          ensuring every individual finds the perfect match for their career
          growth and aspirations.
        </p>
        <button
          onClick={() => navigate("/jobs")}
          className="tracking-wide mt-6 font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md hover:rounded-xl py-2 px-8 text-white hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Find Jobs
        </button>
      </div>
      <div className="block overflow-y-hidden min-w-96 pt-10">
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
