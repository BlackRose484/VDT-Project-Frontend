import * as React from "react";

export const WhyChooseUs = () => {
  interface FeatureItemProps {
    text: string;
  }

  // List of features to be displayed in the "Why Choose Us" section.
  const features = [
    "Enjoy spacious seating, enhanced legroom, and a relaxing atmosphere for a truly restful journey.",
    "We prioritize punctuality, ensuring you arrive at your destination on schedule, every time.",
    "Our friendly, attentive crew is here to make your experience smooth and enjoyable from start to finish.",
    "From gourmet meals to onboard entertainment, we cater to all your travel needs."
  ];

  // FeatureItem component displays an individual feature with a bullet point.
  const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
    <div className="flex flex-wrap gap-3.5 items-center w-full max-md:max-w-full">
      <div className="w-[25px] h-[25px] bg-blue-400 transform rotate-45"></div>
      <p className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full text-base font-bold tracking-wider text-slate-800">
        {text}
      </p>
    </div>
  );

  return (
    <section className="flex flex-col md:flex-row gap-20 items-center my-[100px] w-[90%] mx-auto">
      {/* QAirline travel experience illustration */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d2bca20508a599eebcf197f0bf74f3ce7bf36184819ff6b3af0a020dc4a2aff?placeholderIfAbsent=true&apiKey=cdf4ef6bf30f4b36bc29a527c8e3e010"
        alt="QAirline travel experience illustration"
        className="object-contain self-stretch my-auto rounded-none aspect-[1.08] min-w-[240px] w-1/2 max-md:max-w-full"
      />
      
      <article className="flex flex-col bg-gray-100 bg-opacity-[80%] border-t-[10px] border-[#223A60] flex-1 shrink self-stretch p-5 my-auto rounded-[20px] basis-0 bg-blue-400 bg-opacity-20 min-w-[200px] max-md:max-w-full">
        
        {/* Header section */}
        <header className="flex flex-col w-full max-md:max-w-full">
          {/* Title for the section */}
          <h2 className="self-start text-6xl font-bold text-center text-slate-800 max-md:text-4xl">
            <span className="text-indigo-400">Why</span> choose us
          </h2>
          
          {/* Subtitle description */}
          <p className="text-base font-medium tracking-wider leading-loose text-slate-800 text-opacity-60 max-md:max-w-full">
            Experience the skies like never before with QAirline.
          </p>
        </header>

        {/* Features List */}
        <div className="flex flex-col mt-10 w-full max-md:max-w-full">
          {features.map((feature, index) => (
            <div key={index} className={index > 0 ? "mt-5" : ""}>
              <FeatureItem text={feature} />
            </div>
          ))}
        </div>

        {/* Final statement */}
        <p className="mt-10 text-base font-medium tracking-wider leading-7 text-slate-800 text-opacity-60 max-md:max-w-full">
          Fly with us and discover why thousands of travelers around the world
          choose QAirline as their preferred airline, where every journey is
          marked by comfort, convenience, and an exceptional level of service
          that redefines your travel experience.
        </p>
      </article>
    </section>
  );
};

export default WhyChooseUs;
