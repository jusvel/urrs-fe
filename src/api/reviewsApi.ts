import {request} from '../helpers/axiosHelper.ts';

export const createReview = async (eventId: number, text: string, rating: number) => {
  try {
    return request('POST', `/reviews/${eventId}`, {
      "text": text,
      "rating": rating
    });
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getReviews = async (eventId) => {
  try {
    return request("GET", `reviews/${eventId}`, {});
  } catch (error: unknown) {
    return error.response?.data?.message || "An error occurred"
  }
}

