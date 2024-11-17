import {request} from '../helpers/axiosHelper.ts';

export const createReview = async (eventId: number, text: string, rating: number) => {
  try {
    const response = request('POST', `/reviews/${eventId}`, {
      "text": text,
      "rating": rating
    });
    return response;
  } catch (error: unknown) {
    return error.response?.data?.message || 'An error occurred';
  }
};

export const getReviews = async (eventId) => {
  try {
    const response = request("GET", `reviews/${eventId}`, {});
    return response;
  } catch (error: unknown) {
    return error.response?.data?.message || "An error occurred"
  }
}

