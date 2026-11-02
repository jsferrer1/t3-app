import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export interface HomePageHeroProps {
  /** Where the call-to-action button navigates to. */
  ctaHref?: string;
}

const HomePageHeroSection = ({
  ctaHref = "/api/auth/signin",
}: HomePageHeroProps) => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-between gap-12 bg-white px-6 py-12 lg:flex-row lg:gap-8 lg:py-0 lg:pl-24 lg:pr-0">
      <div className="flex w-full max-w-2xl flex-col items-start gap-8">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter text-gray-800 md:text-7xl lg:text-8xl">
          Meet the New Landingfolio Kit
        </h1>
        <p className="text-lg text-gray-600">
          Clarity gives you the blocks &amp; components you need to create a
          truly professional website, landing page or admin panel for your SaaS.
        </p>
        <Link
          href={ctaHref}
          className="flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 px-6 text-center text-lg leading-7 text-white transition hover:bg-blue-700 sm:w-64"
        >
          Start using LandingFolio
        </Link>
      </div>
      <div
        className="flex aspect-[4/5] w-full max-w-lg items-center justify-center rounded-3xl bg-blue-200 lg:self-end lg:rounded-r-none"
        role="img"
        aria-label="Product preview placeholder"
      >
        <FontAwesomeIcon
          icon={faImage}
          className="text-8xl text-white"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default HomePageHeroSection;
