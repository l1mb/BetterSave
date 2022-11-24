const apiPreffix = "api";

const signInRoute = `${apiPreffix}/auth/sign-in`;
const signUpRoute = `${apiPreffix}/auth/sign-up`;
const getInfo = `${apiPreffix}/user`;

// cards
const cardsPostfix = `${apiPreffix}/card`;
const myCards = `${cardsPostfix}/my`;

// spendings
const spendings = `${apiPreffix}/spending`;

export default { signInRoute, signUpRoute, getInfo, myCards, spendings };
