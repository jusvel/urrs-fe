import {request} from '../helpers/axiosHelper.ts';

export const isRegisteredToEvent = async (eventId: string) => {
  try {
    return request('GET', `/attendees/registered/${eventId}`, {});
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const registerToEvent = async (eventId: string) => {
  try {
    return request('POST', `/attendees/register/${eventId}`, {});
  } catch (error: any) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const unregisterFromEvent = async (eventId: string) => {
  try {
    return request('DELETE', `/attendees/register/${eventId}`, {});
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getAttendeeCount = async (eventId: string) => {
  try {
    return request('GET', `/attendees/${eventId}/count`, {});
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getAttendees = async (eventId: string) => {
  try {
    return request('GET', `/attendees/${eventId}`, {});
  } catch (error: any) {
    return error.response?.data?.message || 'An error occurred';
  }
};

