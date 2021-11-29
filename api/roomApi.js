import axiosClient from './axiosClient';
const roomApi = {
  create: (formData, token) => {
    const url = `/rooms`;
    // console.log(formData.values(), 'formData.....');
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });
  },
  update: (formData, token, id) => {
    const url = `/rooms/${id}`;
    return axiosClient.patch(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (id, token) => {
    const url = `/rooms/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default roomApi;
