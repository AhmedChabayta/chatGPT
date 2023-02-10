import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const LandingConstants = {
  title: "ChatGpt",
  examples: {
    Icon: SunIcon,
    title: "Examples",
    examples: [
      "Explain quantum computing in simple terms",
      "Got any creative ideas for a 10 year old’s birthday?",
      "How do I make an HTTP request in Javascript?",
    ],
  },
  capabilities: {
    Icon: BoltIcon,
    title: "Capabilities",
    examples: [
      "Remembers what user said earlier in the conversation",
      "Allows user to provide follow-up corrections",
      "Trained to decline inappropriate requests",
    ],
  },
  limitations: {
    Icon: ExclamationTriangleIcon,
    title: "Limitations",
    examples: [
      "May occasionally generate incorrect information",
      "May occasionally produce harmful instructions or biased content",
      "Limited knowledge of world and events after 2021",
    ],
  },
};

export default LandingConstants;
