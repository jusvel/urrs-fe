import { request } from '../helpers/axiosHelper.ts';

export const getUsers = async () => {
  try {
    return request('GET', `/users`, {});
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getRoles = async () => {
  try {
    return request('GET', '/users/roles', {});
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const updateRole = async (roleName, userId) => {
  try {
    return request('PUT', `/users/${userId}`, {
      roleName
    });
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};
