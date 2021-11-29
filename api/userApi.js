import axiosClient from './axiosClient';
const userApi = {
  login: (email, password) => {
    const url = '/login';
    return axiosClient.post(url, {
      user_email: email,
      user_password: password,
    });
  },
  logout: token => {
    const url = '/logout';
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  getUserById: (id,token) => {
    const url = `/users/${id}`;
    return axiosClient.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  refreshToken: refreshToken => {
    const url = "/refresh-token"
    return axiosClient.post(url, { refreshToken: refreshToken })
  },
  getUsers: (token) => {
    const url = `/users?sort=updatedAt:desc`;
    return axiosClient.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  create: (userName,userEmail,userPhone,userRole,token) => {
    const url = `/users`;
    return axiosClient.post(
      url,
      {
        user_name: userName,
        user_email: userEmail,
        user_password: '123123',
        user_phone: userPhone,
        user_role: userRole,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  update: (id, formData,token) => {
    const url = `/users/${id}`
    return axiosClient.patch(
      url,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token}`
        }
      })
  },
  delete: (id,token) => {
    const url = `/users/${id}`
    return axiosClient.delete(
      url,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token}`
        }
      })
  },
};
export default userApi;
