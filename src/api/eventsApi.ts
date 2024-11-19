import {request} from '../helpers/axiosHelper.ts';

export const getAllEvents = async () => {
  try {
    const response = request('GET', '/events', {});
    return response;
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const createEvent = async (title, description, location, eventDate, eventType) => {
  try{
    return request("POST", "/events", {
      "title": title,
      "description": description,
      "location": location,
      "eventDate": eventDate,
      "eventType": eventType
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

export const updateEvent = async (eventId, title, description, location, eventDate) => {
  try {
    return request("PUT", `/events/${eventId}`, {
      "title": title,
      "description": description,
      "location": location,
      "eventDate": eventDate
    })
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
}

export const deleteEvent = async (eventId) => {
  try {
    return request("DELETE", `/events/${eventId}`, {})
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
}

export const getEventTypes = async () => {
  try{
    return request("GET", "/events/types", {})
  } catch (error) {
    return error.response?.data?.message || 'An error occurred';
  }
}


