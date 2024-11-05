import { request, setAuthToken } from '../helpers/axiosHelper.js';

export const login = async (email, password) => {
  try {
    const response = await request('POST', '/login', {
      login: email,
      password: password,
    });
    setAuthToken(response.data.token);
    return null;
  } catch (error) {
    setAuthToken(null);
    return error.response?.data?.message || 'An error occurred';
  }
};
