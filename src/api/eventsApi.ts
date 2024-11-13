import {request} from '../helpers/axiosHelper.ts';

export const getAllEvents = async () => {
  try {
    const response = request('GET', '/events', {});
    return response;
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const createEvent = async (title, description, location, eventDate) => {
  try{
    return request("POST", "/events", {
      "title": title,
      "description": description,
      "location": location,
      "eventDate": eventDate
    });
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
}

export const getRegisteredEvents = async () => {
  try {
    const response = request('GET', '/events/registered', {});
    return response;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const isRegisteredToEvent = async (eventId: string) => {
  try {
    const response = request('GET', `/events/registered/${eventId}`, {});
    return response;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const registerToEvent = async (eventId: string) => {
  try {
    const response = request('POST', `events/register/${eventId}`, {});
    return response;
  } catch (error: any) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const unregisterFromEvent = async (eventId: string) => {
  try {
    const resposne = request('DELETE', `events/register/${eventId}`, {});
    return resposne;
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};
