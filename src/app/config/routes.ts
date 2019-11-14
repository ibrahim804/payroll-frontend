
const baseUrl = 'http://localhost:8000/api';

export const routes = {

  // all routes without params

  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
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

  workingDay: `${baseUrl}/working-day`,

  fileUploadCreateUser: `${baseUrl}/file-upload/create/user`,
  uploadUserProfilePicture: `${baseUrl}/upload/user/profile-picture`,

};
