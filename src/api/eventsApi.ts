import {getAuthToken, request} from '../helpers/axiosHelper.ts';
import axios from 'axios';

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

export const generateReport = async (eventId) => {
  const token = getAuthToken();
  let headers = {};
  if(token !==null && token !== "null") {
    headers = {'Authorization': `Bearer ${token}`}
  }
  axios
    .get(`events/${eventId}/export`,
      { responseType: 'blob', headers })
    .then(response => {
      const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event_${eventId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }).catch(e => {
    console.error("Error exporting event details", e);
  });
};


