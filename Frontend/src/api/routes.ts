const apiPreffix = "api";

const signInRoute = `${apiPreffix}/auth/sign-in`;
const signUpRoute = `${apiPreffix}/auth/sign-up`;
const getInfo = `${apiPreffix}/user`;

// cards
const cardsPostfix = `${apiPreffix}/card`;
const myCards = `${cardsPostfix}/my`;

// spendings
const spendings = `${apiPreffix}/spending`;

// loans
const loans = `${apiPreffix}/loan`;
const userLoans = `${apiPreffix}/loan/user`;

// aims
const aims = `${apiPreffix}/aim`;
const userAim = `${apiPreffix}/aim/user`;

//
const category = `${apiPreffix}/category`;
const userCategories = `${apiPreffix}/category/getCategories`;

export default {
  signInRoute,
  signUpRoute,
  getInfo,
  myCards,
  spendings,
  cardsPostfix,
  loans,
  userLoans,
  aims,
  userAim,
  category,
  userCategories,
};
