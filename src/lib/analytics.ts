import ReactGA from "react-ga4";

export const initGA = () => {
  const trackingId = process.env.GA_TRACKING_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};
