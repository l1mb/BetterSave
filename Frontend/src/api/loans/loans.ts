import { Loan } from "../../../types/User/loans/loans";
import { apiDelete, apiGet, apiPost } from "../api";
import routes from "../routes";

const createLoan = (body: Loan) => apiPost<Loan>(routes.loans, body);

const completeLoan = (body: Loan) => apiPost<Loan>(routes.loans, body);

const getUserLoans = (id: string) => apiGet(`${routes.userLoans}/${id}`);
const deleteLoan = (id: string) => apiDelete(`${routes.loans}/${id}`);

export default { createLoan, completeLoan, getUserLoans, deleteLoan };
