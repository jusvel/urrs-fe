import { request, setAuthToken } from '../helpers/axiosHelper.ts';

export const login = async (email : string, password: string) => {
  try {
    const response = await request('POST', '/login', {
      login: email,
      password: password,
    });
    setAuthToken(response.data.token);
    return null;
  } catch (error: any) {
    setAuthToken(null);
    return error.response?.data?.message || 'An error occurred';
  }
};