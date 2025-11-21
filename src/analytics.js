import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-9TT4MFRG54"); // replace with your Measurement ID
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackClick = (label) => {
  ReactGA.event({
    category: "CTR",
    action: "click",
    label: label
  });
};