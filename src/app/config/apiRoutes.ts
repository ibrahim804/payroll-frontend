import { role } from './payroll.enum';

const baseUrl = 'http://localhost:8000/api';

export const apiRoutes = {

  // all routes without params

  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  userMe: `${baseUrl}/user-me`,
  userDeptDesgIds: `${baseUrl}/user-dept-desg`,
  update: `${baseUrl}/update-user`,
  logout: `${baseUrl}/logout`,
  updatePassword: `${baseUrl}/update-password`,
  forgotPassword: `${baseUrl}/forgot/password`,
  verifyVerificationCode: `${baseUrl}/verify/verification-code`,
  setNewPassword: `${baseUrl}/set/new-password`,
  users: `${baseUrl}/users`,

  roles: `${baseUrl}/roles`,
  leaders: `${baseUrl}/roles/leaders`,

  salary: `${baseUrl}/salary`,
  salaryMine: `${baseUrl}/salary-mine`,

  departments: `${baseUrl}/departments`,
  department: `${baseUrl}/department`,

  designations: `${baseUrl}/designations`,

  leaveCategories: `${baseUrl}/leave-categories`,

  leaveCountsOfAUser: `${baseUrl}/leave-counts-of-user`,

  leaves: `${baseUrl}/leaves`,
  leave: `${baseUrl}/leave`,
  leavesOfAUser: `${baseUrl}/leavesOfAUser`,
  leaveAvailableAndDuration: `${baseUrl}/leave/available-duration`,
  leaveApprove: `${baseUrl}/leave/approve`,
  leaveCancel: `${baseUrl}/leave/cancel`,
  leaveRemove: `${baseUrl}/leave/remove`,

  workingDay: `${baseUrl}/working-day`,

  payment: `${baseUrl}/payment`,
  payments: `${baseUrl}/payments`,
  paymentInMail: `${baseUrl}/payment/send-payment-to-mail`,
  exportSalarySheet: `${baseUrl}/payment/generate-salary-sheet`,

  providentFund: `${baseUrl}/provident-fund`,

  loanRequest: `${baseUrl}/loan-request`,
  loanRequests: `${baseUrl}/loan-requests`,
  loanPendingRequest: `${baseUrl}/loan-pending-request`,
  loanableAmount: `${baseUrl}/loan-request/loanable-amount`,

  loanHistory: `${baseUrl}/loan-history`,
  loanHistories: `${baseUrl}/loan-histories`,
  loanLatestHistoryOfEach: `${baseUrl}/loan-history/user/latest`,

};

export const urlRoutes = {

  login: `/login`,
  register: `/register`,

  dashboard: `/dashboard`,

  departmentsList: `/departments/list`,
  departmentsAdd: `/departments/add`,

  employeesList: `/employees/list`,
  employeesAdd: `/employees/add`,
  employeesDetails: `/employees/details`,
  employeeUpdate: `/employees/update`,

  attendance: `/attendance`,
  attendanceReport: `/attendance/report`,

  leaveManagement: `/leave/management`,
  leaveApplication: `/leave/application`,

  salaryManagement: `/salary/management`,
  salaryUpdate: `/salary/update`,

  payment: `/payment`,

  loanRequests: `/loan/requests`,
  payBackRequest: `/loan/paybacks`,
  loanHistories: `/loan/histories`,
  applyForLoan: `/loan/application`,

  settings: `/settings`,

};

export const genericNavConstants = {  // Route Flow: sidebar->urlRoute->appRouting->apiRoute
  sideBar: [
    {
      name: 'Home',
      url: urlRoutes.dashboard,
      icon: 'home',
      role: [role.ADMIN, role.LEADER, role.USER],
      mini_name: 'Home'
    },
    {
      name: 'Employees',
      url: urlRoutes.employeesList,
      icon: 'supervisor_account',
      role: [role.ADMIN],
      mini_name: 'Employees'
    },
    // {
    //   name: 'Department',
    //   url: urlRoutes.departmentsList,
    //   icon: 'group_work',
    //   role: [role.ADMIN],
    //   mini_name: 'Department'
    // },
    {
      name: 'Leave Management',
      url: urlRoutes.leaveManagement,
      icon: 'directions_boat',
      role: [role.ADMIN, role.LEADER],
      mini_name: 'Leaves',
    },
    {
      name: 'Leave Application',
      url: urlRoutes.leaveApplication,
      icon: 'directions_boat',
      role: [role.LEADER, role.USER],
      mini_name: 'Take-Leave',
    },
    {
      name: 'Salary Management',
      url: urlRoutes.salaryManagement,
      icon: 'money',
      role: [role.ADMIN],
      mini_name: 'Salary',
    },
    {
      name: 'Payment',
      url: urlRoutes.payment,
      icon: 'payment',
      role: [role.ADMIN],
      mini_name: 'Payment',
    },
    {
      name: 'Loan Requests',
      url: urlRoutes.loanRequests,
      icon: 'monetization_on',
      role: [role.ADMIN],
      mini_name: 'Requests',
    },
    {
      name: 'Loan Histories',   // Pay Back Requests
      url: urlRoutes.payBackRequest,
      icon: 'sync_alt',
      role: [role.ADMIN],
      mini_name: 'Histories',
    },
    {
      name: 'Loan Histories',   // after request accepted
      url: urlRoutes.loanHistories,
      icon: 'monetization_on',
      role: [role.LEADER, role.USER],
      mini_name: 'Loan',
    },
    // {
    //   name: 'General Settings',
    //   url: urlRoutes.settings,
    //   icon: 'build',
    //   role: [role.ADMIN],
    //   mini_name: 'Settings',
    // },

  ],

  siteName: {
    name: 'Company Payroll'
  },

  menu: {
    logout: {
      name: 'Logout',
      url: 'sign-in'
    }
  },
};


