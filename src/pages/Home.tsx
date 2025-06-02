import { useQuery } from "@tanstack/react-query";
import { getPopularPlaces } from "@/apis/flight.api";
import Hero from "@/components/base/Hero";
import LatestNews from "@/components/utils/blogs/LatestNews";
import SearchBar from "@/components/utils/search/SearchBar";
import SearchBarSimple from "@/components/utils/search/SearchBarSimple";
import WhyChooseUs from "@/components/base/WhyChooseUs";
import PopularLocationCard from "@/components/PopularLocationCard";
import { PopularPlace } from "@/types/flight.type";
import { fetchCurrentUser } from "@/apis/user.api";
import { useContext } from "react";
import { AppContext } from "@/context/app.context";

const Home = () => {
  const { data: popularPlaces = { data: [] } } = useQuery({
    queryKey: ["popularPlaces"],
    queryFn: () => getPopularPlaces(),
  });

  const { isAuthenticated } = useContext(AppContext);
  const { data: user } = useQuery({
    queryKey: ["nums_book_changed", isAuthenticated],
    queryFn: () => fetchCurrentUser(),
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
  });

  return (
    <div className="scroll-smooth">
      {/* Background */}

      <div className="fixed inset-0 -z-10 h-screen">
        {/* <video
          src="./cloud_animation_2.mp4"
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        ></video> */}
      </div>

      <Hero nums_booking_changed={user?.nums_booking_changed || 0}>
        <SearchBar />
      </Hero>

      <div className="relative top-[-20px] z-50 md:sticky">
        <SearchBarSimple />
      </div>

      <div className="flex flex-col mx-auto items-center justify-center">
        <div id="news"></div>
        <LatestNews />
      </div>

      <div id="why-choose-us"></div>
      <WhyChooseUs />

      <div className="text-center text-[#223A60] text-[52px] font-bold my-[50px]">
        Popular Locations
      </div>

      <div
        id="popular-flights"
        className="flex flex-col md:flex-row items-center gap-[50px] px-[50px] mb-[100px]"
      >
        {popularPlaces.data.map((place: PopularPlace) => (
          <PopularLocationCard
            key={place.city}
            image={`./${place.city}.jpg`}
            location={place.city}
            price={place.cheapest_price}
            description=""
            country={place.country}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
