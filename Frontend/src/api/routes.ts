const apiPreffix = "api";

const account = `${apiPreffix}/Account/`;
const getAccounts = `${account}getAccountsList`;
const createAccount = `${account}createAccount`;
const deleteAccount = `${account}DeleteAccount`;
const updateAccount = `${account}updateAccount`;

const signInRoute = `${apiPreffix}/auth/sign-in`;
const signUpRoute = `${apiPreffix}/auth/sign-up`;
const getInfo = `${apiPreffix}/user/GetInfoAboutUser`;

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

// categories
const category = `${apiPreffix}/category`;
const userCategories = `${apiPreffix}/category/getCategories`;

// users
const user = `${apiPreffix}/User`;

// operations
const operations = `${apiPreffix}/Operation/`;
const createOperation = `${operations}/CreateOperation`;
const getOperations = `${operations}/GetOperationsByUserId`;

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
  user,
  getAccounts,
  createAccount,
  updateAccount,
  operations,
  getOperations,
  deleteAccount,
  createOperation,
};
