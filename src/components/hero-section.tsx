import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type HeroSectionProps = {
  tourCount: number;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
};

export default function HeroSection({ tourCount, searchKeyword, onSearchChange }: HeroSectionProps) {
  const handleScrollToTours = () => {
    const toursSection = document.getElementById("tours-section");
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://a-us.storyblok.com/f/1021279/1440x568/a5663ad932/collections-divider.png/m/1920x757/filters:quality(70)')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Discover Your Perfect Tour</h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          Filter tours by your preferences and find the adventure that&apos;s right for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tours..."
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full sm:w-80 bg-white text-black rounded-lg"
            />
          </div>
          {/* Button */}
          <Button size="lg" onClick={handleScrollToTours}>
            Explore {tourCount} Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
