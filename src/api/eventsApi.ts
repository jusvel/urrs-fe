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
      "eventType": eventType.toUpperCase()
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

export const updateEvent = async (eventId, title, description, location, eventDate, eventType) => {
  try {
    return request("PUT", `/events/${eventId}`, {
      "title": title,
      "description": description,
      "location": location,
      "eventDate": eventDate,
      "eventType": eventType.toUpperCase()
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

  try {
    const response = await request("GET", "/events/types", {})
    const eventTypesUnprocessed = response.data;
    return eventTypesUnprocessed.map((type) => {
      const firstLetter = type.substring(0, 1);
      const remainingWord = type.substring(1).toLowerCase();
      return firstLetter + remainingWord;
    })
  } catch (error) {
    return []
    // return error.response?.data?.message || 'An error occurred';
  }
}
export const getEventsByFilter = async (filter: { title?: string, eventDate?: string, eventType?: string }) => {
  try {
    console.log("Filter used for request:", filter);
    const response = await request("POST", "/events/filter", filter);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error response:", error);
    return error.response?.data?.message || 'An error occurred';
  }
};




