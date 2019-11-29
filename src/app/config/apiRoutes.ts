// import { urlRoutes } from './apiRoutes';
import { role } from './payroll.enum';

const baseUrl = 'http://192.168.0.105:8000/api';

export const apiRoutes = {

  // all routes without params

  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  user: `${baseUrl}/user`,
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
      name: 'departmentsList',
      url: urlRoutes.departmentsList,
      icon: 'home',
      role: [role.ADMIN, role.USER],
      mini_name: 'List'
    },
    {
      name: 'departmentsAdd',
      url: urlRoutes.departmentsAdd,
      icon: 'home',
      role: [role.ADMIN, role.USER],
      mini_name: 'Add'
    },

  ],

  siteName: {
    name: 'Company Payroll'
  },

  menu: {
    // profile: {
    //   name: 'My Profile',
    //   url: 'user/profile'
    // },
    logout: {
      name: 'Logout',
      url: 'sign-in'
    }
  },

};


