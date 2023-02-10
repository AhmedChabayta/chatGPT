"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface IProps {
  constants: {
    title: string;
    examples: string[];
  };
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const LandingExamples = (props: IProps) => {
  const { constants, Icon } = props;
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="flex flex-col items-center">
        <Icon className="w-7 text-white" />
        <h2 className="py-2"> {constants.title}</h2>
      </span>

      <div className="flex flex-col items-center space-y-4">
        {constants?.examples.map((example) => (
          <p
            className="flex cursor-pointer select-none items-center justify-center rounded-lg bg-gray-700/50 p-4 text-sm hover:bg-gray-500 md:max-w-[400px] md:text-base lg:max-w-[300px]"
            key={example}
          >
            {example}
            <ArrowRightIcon className="ml-2 w-3 object-contain lg:w-5" />
          </p>
        ))}
      </div>
    </div>
  );
};
export default LandingExamples;
