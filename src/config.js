export const apiBaseUrl = ''; // including trailing slash
export const passwordStrengthThreshold = 3; // between 1 and 5
export const hostingUrl = '';
export const recaptchaSiteKey = ''; // obtain from google console
export const stripeApiKey = ''; // obtain from stripe dashboard
export const dateFormat = 'ddd MM MMMM YYYY HH:mm:ss'; // see moment.js docs
export const fontFamily = 'Lato'; // update src/index.scss accordining
export const primaryColor = 'rgb(190, 5, 117)'; // see above
export const primaryTranslucent = 'rgba(190, 5, 117, 0.6)'; // see above
export const plans = [
  {
    id: '', // should match server config
    name: '',
    price: 0, // usd
    features: [], // use strings or jsx
  },
];
