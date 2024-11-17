import { request } from '../helpers/axiosHelper.ts';

export const isRegisteredToEvent = async (eventId: string) => {
  try {
    const response = request('GET', `/attendees/registered/${eventId}`, {});
    return response;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const registerToEvent = async (eventId: string) => {
  try {
    const response = request('POST', `/attendees/register/${eventId}`, {});
    return response;
  } catch (error: any) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const unregisterFromEvent = async (eventId: string) => {
  try {
    const resposne = request('DELETE', `/attendees/register/${eventId}`, {});
    return resposne;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getAttendeeCount = async (eventId: string) => {
  try {
    const response = request('GET', `/attendees/${eventId}/count`, {});
    return response;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getAttendees = async (eventId: string) => {
  try {
    const response = request('GET', `/attendees/${eventId}`, {});
    return response;
  } catch (error: any) {
    return error.response?.data?.message || 'An error occurred';
  }
};

