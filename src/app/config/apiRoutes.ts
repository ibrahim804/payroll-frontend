import { role } from './payroll.enum';

const baseUrl = 'http://localhost:8000/api';

export const apiRoutes = {

  // all routes without params

  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  checkUniqueMail: `${baseUrl}/exists/email`,
  user: `${baseUrl}/user`,
  userMe: `${baseUrl}/user-me`,
  userDeptDesgIds: `${baseUrl}/user-dept-desg`,
  update: `${baseUrl}/update`,
  delete: `${baseUrl}/delete/user`,
  logout: `${baseUrl}/logout`,
  updatePassword: `${baseUrl}/update-password`,
  forgotPassword: `${baseUrl}/forgot/password`,
  verifyVerificationCode: `${baseUrl}/verify/verification-code`,
  setNewPassword: `${baseUrl}/set/new-password`,
  users: `${baseUrl}/users`,

  companies: `${baseUrl}/companies`,
  company: `${baseUrl}/company`,

  salaries: `${baseUrl}/salaries`,
  salary: `${baseUrl}/salary`,

  entry: `${baseUrl}/entry`,
  exit: `${baseUrl}/exit`,

  departments: `${baseUrl}/departments`,
  department: `${baseUrl}/department`,

  designations: `${baseUrl}/designations`,
  designation: `${baseUrl}/designation`,

  leaveCategories: `${baseUrl}/leave-categories`,
  leaveCategory: `${baseUrl}/leave-category`,

  leaveCounts: `${baseUrl}leave-counts`,
  leaveCount: `${baseUrl}/leave-count`,

  leaves: `${baseUrl}/leaves`,
  leave: `${baseUrl}/leave`,
  leaveAvailableAndDuration: `${baseUrl}/leave/available-duration`,
  leaveApprove: `${baseUrl}/leave/approve`,
  leaveCancel: `${baseUrl}/leave/cancel`,

  workingDay: `${baseUrl}/working-day`,

  payment: `${baseUrl}/payment`,
  payments: `${baseUrl}/payments`,

  providentFund: `${baseUrl}/provident-fund`,

  loanRequest: `${baseUrl}/loan-request`,
  loanRequests: `${baseUrl}/loan-requests`,
  loanPendingRequest: `${baseUrl}/loan-pending-request`,

  loanHistory: `${baseUrl}/loan-history`,
  loanHistories: `${baseUrl}/loan-histories`,

  fileUploadCreateUser: `${baseUrl}/file-upload/create/user`,
  uploadUserProfilePicture: `${baseUrl}/upload/user/profile-picture`,
  getUserProfilePicture: `${baseUrl}/get-profile-picture`,

};

export const urlRoutes = {
  login: `/login`,
  register: `/register`,

  dashboard: `/dashboard`,    // Dashboard

  departmentsList: `/departments/list`,   // Department
  departmentsAdd: `/departments/add`,

  employeesList: `/employees/list`,   // Employee
  employeesAdd: `/employees/add`,
  employeesDetails: `/employees/details`,

  attendance: `/attendance`,    // Attendance
  attendanceReport: `/attendance/report`,

  leaveManagement: `/leave/management`,   // leave
  leaveApplication: `/leave/application`, // leave

  salaryManagement: `/salary/management`,   // Salary
  salaryUpdate: `/salary/update`,

  payment: `/payment`,    // Payment

  loanRequests: `/loan/requests`, // Loan Requests, Admin
  loanHistories: `/loan/histories`,
  applyForLoan: `/loan/application`, // Apply For Loan, User

  settings: `/settings`,    // Company
};

export const genericNavConstants = {  // Route Flow: sidebar->urlRoute->appRouting->apiRoute
  sideBar: [
    {
      name: 'Dashboard',
      url: urlRoutes.dashboard,
      icon: 'home',
      role: [role.ADMIN, role.USER],
      mini_name: 'Dashboard'
    },
    {
      name: 'Employees',
      url: urlRoutes.employeesList,
      icon: 'supervisor_account',
      role: [role.ADMIN],
      mini_name: 'Employees'
    },
    {
      name: 'Department',
      url: urlRoutes.departmentsList,
      icon: 'group_work',
      role: [role.ADMIN],
      mini_name: 'Department'
    },
    {
      name: 'Leave Management',
      url: urlRoutes.leaveManagement,
      icon: 'directions_boat',
      role: [role.ADMIN],
      mini_name: 'Leave',
    },
    {
      name: 'Leave Application',
      url: urlRoutes.leaveApplication,
      icon: 'directions_boat',
      role: [role.USER],
      mini_name: 'Leave',
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
      mini_name: 'Loan',
    },
    {
      name: 'Loan History',
      url: urlRoutes.loanHistories,
      icon: 'monetization_on',
      role: [role.USER],
      mini_name: 'Loan',
    },
    // {
    //   name: 'Genaral Settings',
    //   url: urlRoutes.settings,
    //   icon: 'build',
    //   role: [role.ADMIN, role.USER],
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
/*
{
      name:
      url:
      icon:
      role:
      mini_name:
    },
*/

