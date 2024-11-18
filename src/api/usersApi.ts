import {request} from '../helpers/axiosHelper.ts';

export const getUsers = async () => {
  try {
    return request('GET', `/users`, {});
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};
