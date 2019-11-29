import { role } from './payroll.enum';

const baseUrl = 'http://192.168.0.105:8000/api';

export const apiRoutes = {

  // all routes without params

  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  user: `${baseUrl}/user`,
  userMe: `${baseUrl}/user-me`,
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
  leaveApprove: `${baseUrl}/leave/approve`,
  leaveCancel: `${baseUrl}/leave/cancel`,

  workingDay: `${baseUrl}/working-day`,

  fileUploadCreateUser: `${baseUrl}/file-upload/create/user`,
  uploadUserProfilePicture: `${baseUrl}/upload/user/profile-picture`,

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

  attendance: `/attendance`,
  attendanceReport: `/attendance/report`,

  leaveManagement: `/leave/management`,
  leaveApplication: `/leave/application`,

  salaryManagement: `/salary/management`,
  salaryUpdate: `/salary/update`,

  settings: `/settings`,
};

export const genericNavConstants = {
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
      icon: 'home',
      role: [role.ADMIN],
      mini_name: 'Employees'
    },
    {
      name: 'Department',
      url: urlRoutes.departmentsList,
      icon: 'home',
      role: [role.ADMIN, role.USER],
      mini_name: 'Department'
    },
    {
      name: 'Leave Management',
      url: urlRoutes.leaveManagement,
      icon: 'home',
      role: [role.ADMIN],
      mini_name: 'Leave',
    },
    {
      name: 'Leave Application',
      url: urlRoutes.leaveApplication,
      icon: 'home',
      role: [role.USER],
      mini_name: 'Leave',
    },
    {
      name: 'Salary Management',
      url: urlRoutes.salaryManagement,
      icon: 'home',
      role: [role.ADMIN],
      mini_name: 'Salary',
    },
    {
      name: 'Genaral Setting',
      url: urlRoutes.settings,
      icon: 'home',
      role: [role.ADMIN, role.USER],
      mini_name: 'Settings',
    },

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

