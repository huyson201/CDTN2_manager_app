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
};
export default userApi;
