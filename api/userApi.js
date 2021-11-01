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
};
export default userApi;
