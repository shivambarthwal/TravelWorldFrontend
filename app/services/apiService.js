import api from "../utils/api.js";

// Helper to extract response data directly
const responseBody = (response) => response.data;

/**
 * Generic API Actions Wrapper for GET, POST, PUT, DELETE, and PATCH.
 * Handles Axios configuration and formats responses in accordance with
 * the backend's ApiResponse schema (success, message, data, errors).
 */
export const apiActions = {
  get: (url, config = {}) => api.get(url, config).then(responseBody),
  post: (url, data = {}, config = {}) => api.post(url, data, config).then(responseBody),
  put: (url, data = {}, config = {}) => api.put(url, data, config).then(responseBody),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config).then(responseBody),
  delete: (url, config = {}) => api.delete(url, config).then(responseBody),
};

/**
 * Endpoint-specific Services
 */
export const authService = {
  // Register a new user
  register: (registerData) => apiActions.post("/auth/register", registerData),
  
  // Login a user (returns { user, accessToken, refreshToken })
  login: (credentials) => apiActions.post("/auth/login", credentials),
  
  // Logout a user (invalidates session on backend)
  logout: (refreshToken) => apiActions.post("/auth/logout", { refreshToken }),
  
  // Refresh authorization tokens (manually triggered, though auto-handled by Axios)
  refreshTokens: (refreshToken) => apiActions.post("/auth/refresh", { refreshToken }),
  
  // Fetch current user details
  getMe: () => apiActions.get("/auth/me"),
};

export const tripService = {
  // Retrieve list of trips (optionally pass query filters like pagination, search)
  getTrips: (params = {}) => apiActions.get("/trips", { params }),
  
  // Retrieve a specific trip by its ID
  getTripById: (tripId) => apiActions.get(`/trips/${tripId}`),
  
  // Create a new trip
  createTrip: (tripData) => apiActions.post("/trips", tripData),
  
  // Update a trip by ID
  updateTrip: (tripId, tripData) => apiActions.put(`/trips/${tripId}`, tripData),
  
  // Delete a trip by ID
  deleteTrip: (tripId) => apiActions.delete(`/trips/${tripId}`),
};

export const destinationService = {
  // Add destination to a trip
  addDestination: (tripId, destinationData) => 
    apiActions.post(`/trips/${tripId}/destinations`, destinationData),
  
  // Update destination details
  updateDestination: (tripId, destinationId, destinationData) => 
    apiActions.put(`/trips/${tripId}/destinations/${destinationId}`, destinationData),
  
  // Delete destination from a trip
  deleteDestination: (tripId, destinationId) => 
    apiActions.delete(`/trips/${tripId}/destinations/${destinationId}`),
};

export const memberService = {
  // Get members list of a trip
  getMembers: (tripId) => apiActions.get(`/trips/${tripId}/members`),
  
  // Add a new member to a trip
  addMember: (tripId, memberData) => 
    apiActions.post(`/trips/${tripId}/members`, memberData),
  
  // Update roles of a member (e.g. Editor, Viewer)
  updateMemberRole: (tripId, memberId, roleData) => 
    apiActions.put(`/trips/${tripId}/members/${memberId}`, roleData),
  
  // Remove a member from a trip
  removeMember: (tripId, memberId) => 
    apiActions.delete(`/trips/${tripId}/members/${memberId}`),
};

export const itineraryService = {
  // Fetch all itineraries associated with a trip
  getItineraries: (tripId) => apiActions.get(`/trips/${tripId}/itineraries`),
  
  // Create itinerary for a trip
  createItinerary: (tripId, itineraryData) => 
    apiActions.post(`/trips/${tripId}/itineraries`, itineraryData),
  
  // Fetch details of a specific itinerary
  getItineraryById: (tripId, itineraryId) => 
    apiActions.get(`/trips/${tripId}/itineraries/${itineraryId}`),
  
  // Update itinerary details
  updateItinerary: (tripId, itineraryId, itineraryData) => 
    apiActions.put(`/trips/${tripId}/itineraries/${itineraryId}`, itineraryData),
  
  // Delete itinerary
  deleteItinerary: (tripId, itineraryId) => 
    apiActions.delete(`/trips/${tripId}/itineraries/${itineraryId}`),
};

export const dayPlanService = {
  // Update a specific day plan under an itinerary
  updateDayPlan: (tripId, itineraryId, dayPlanId, dayPlanData) => 
    apiActions.put(`/trips/${tripId}/itineraries/${itineraryId}/dayplans/${dayPlanId}`, dayPlanData),
};

export const activityService = {
  // Add a new activity to a day plan
  addActivity: (tripId, itineraryId, dayPlanId, activityData) => 
    apiActions.post(`/trips/${tripId}/itineraries/${itineraryId}/dayplans/${dayPlanId}/activities`, activityData),
  
  // Update activity details
  updateActivity: (tripId, itineraryId, dayPlanId, activityId, activityData) => 
    apiActions.put(`/trips/${tripId}/itineraries/${itineraryId}/dayplans/${dayPlanId}/activities/${activityId}`, activityData),
  
  // Delete activity from a day plan
  deleteActivity: (tripId, itineraryId, dayPlanId, activityId) => 
    apiActions.delete(`/trips/${tripId}/itineraries/${itineraryId}/dayplans/${dayPlanId}/activities/${activityId}`),
};
