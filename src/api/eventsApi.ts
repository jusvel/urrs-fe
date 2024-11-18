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
    return request('GET', '/events/registered', {});
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
};


