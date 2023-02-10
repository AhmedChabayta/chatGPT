"use client";

import { LandingConstants } from "@ui/constants";
import {
  SunIcon,
  ExclamationTriangleIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { LandingExamples } from "@ui/components";

const Home = () => (
  <div className="h-screen w-full overflow-y-scroll ">
    <div className="relative flex min-h-screen flex-col items-center justify-center space-y-12 px-2">
      <h1 className="text-5xl font-bold">{LandingConstants.title}</h1>
      <div className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll pb-44 lg:flex-row lg:pb-0">
        <LandingExamples Icon={SunIcon} constants={LandingConstants.examples} />
        <LandingExamples
          Icon={ExclamationTriangleIcon}
          constants={LandingConstants.capabilities}
        />
        <LandingExamples
          Icon={BoltIcon}
          constants={LandingConstants.limitations}
        />
      </div>
    </div>
  </div>
);

export default Home;
