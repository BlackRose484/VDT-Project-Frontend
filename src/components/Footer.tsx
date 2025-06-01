import * as React from "react";

interface LinkGroupProps {
  title: string; // The title of the link group.
  links: string[]; //An array of links under the link group.
}


const LinkGroup: React.FC<LinkGroupProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col">
      {/* Link Group Title */}
      {title}
      <div className="flex flex-col mt-4 font-medium">
        {links.map((link, index) => (
          <div key={index} className={index > 0 ? "mt-3" : ""}>
            {link}
          </div>
        ))}
      </div>
    </div>
  );
};


const Footer: React.FC = () => {
  // Array of link groups to be displayed in the footer
  const linkGroups = [
    {
      title: "Product",
      links: ["About", "Career", "Blog", "Special Offers"],
    },
    {
      title: "Help",
      links: ["FAQ", "Help Center", "Privacy Policy"],
    },
    {
      title: "Partner",
      links: ["Partner Hub", "Affiliate", "Advertise"],
    },
  ];

  return (
    <footer className="flex flex-col px-28 py-12 bg-slate-700 max-md:px-5">
      <div className="flex flex-wrap gap-20 items-start w-full text-white max-md:max-w-full">
        {/* Left section with logo and description */}
        <section className="flex flex-col text-xs font-medium min-w-[150px] w-[250px]">
          <div className="flex flex-col max-w-full w-[150px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3603a43a6741f0b32be76937b4e6bd5b92a11c2a04469c48351cadb5d030c82?placeholderIfAbsent=true&apiKey=cdf4ef6bf30f4b36bc29a527c8e3e010"
              alt="Lift Media Logo"
              className="object-contain aspect-[1.68] w-[84px]"
            />
            <p className="mt-5 opacity-75">
              Hello, we are QAirline! Our goal is to construct a new height of
              travel experience by providing exceptional service and comfort.
            </p>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/25c8d60067fc0f313fa8f668b89ecc61a56f5be4b3e2f574bb1a02283343722e?placeholderIfAbsent=true&apiKey=cdf4ef6bf30f4b36bc29a527c8e3e010"
            alt="Social Media Icons"
            className="object-contain mt-10 max-w-full aspect-[3.86] w-[135px]"
          />
        </section>

        {/* Right section with link groups */}
        <div className="flex flex-wrap flex-1 shrink gap-x-20 items-start pl-2.5 text-base basis-0 min-w-[240px] max-md:max-w-full">
          {linkGroups.map((group, index) => (
            <LinkGroup key={index} title={group.title} links={group.links} />
          ))}
        </div>

        {/* Subscription section */}
        <section className="flex flex-col rounded-none min-w-[240px] w-[337px]">
          <div className="flex flex-col justify-center px-9 py-10 rounded-3xl bg-white bg-opacity-10 max-md:px-5">
            <div className="flex flex-col">
              <div className="flex flex-col max-w-full text-base font-bold leading-7 whitespace-nowrap w-[248px]">
                <h3>Subscribe</h3>
                {/* Subscription form */}
                <form>
                  <label htmlFor="subscribe-email" className="sr-only">
                    Subscribe to our newsletter
                  </label>
                  <input
                    type="email"
                    id="subscribe-email"
                    placeholder="Enter your email"
                    className="mt-4 w-full rounded-none aspect-[4.95] bg-white bg-opacity-10 p-2"
                    aria-label="Subscribe to our newsletter"
                  />
                </form>
              </div>
              <p className="mt-5 text-xs font-medium opacity-75">
                Hello, we are QAirline! Our goal is to construct a new height of
                travel experience by providing exceptional service and comfort.
              </p>
            </div>
          </div>
        </section>
      </div>


      <hr className="mt-11 w-full bg-white bg-opacity-20 min-h-[1px] max-md:mt-10 max-md:max-w-full" />

      {/* Footer links */}
      <nav className="flex flex-wrap gap-8 justify-center items-center mt-11 w-full text-sm text-center text-white whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        <a
          href="#terms"
          className="self-stretch my-auto hover:opacity-75 transition-opacity"
        >
          Terms
        </a>
        <a
          href="#privacy"
          className="self-stretch my-auto hover:opacity-75 transition-opacity"
        >
          Privacy
        </a>
        <a
          href="#cookies"
          className="self-stretch my-auto hover:opacity-75 transition-opacity"
        >
          Cookies
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
