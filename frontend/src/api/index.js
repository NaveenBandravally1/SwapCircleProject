import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8081' });

export const getItems = () => api.get('/api/items').then(r => r.data);
export const getItem = (id) => api.get(`/api/items/${id}`).then(r => r.data);
export const createItem = (data) => api.post('/api/items', data).then(r => r.data);
export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/api/items/upload', fd).then(r => r.data);
};

export const sendMessage = (data) => api.post('/api/messages/send', data).then(r => r.data);
export const getMessagesByItem = (itemId) => api.get(`/api/messages/item/${itemId}`).then(r => r.data);

export const createOffer = (data) => api.post('/api/offers', data).then(r => r.data);
export const getOffersByItem = (itemId) => api.get(`/api/offers/item/${itemId}`).then(r => r.data);
export const updateOfferStatus = (id, status) => api.put(`/api/offers/${id}/status`, null, { params: { status } }).then(r => r.data);
