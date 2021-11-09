import axiosClient from "./axiosClient";
const invoiceApi = {
    getAll: (hotelId) => {
        const url = `/hotels/${hotelId}/invoices`;
        return axiosClient.get(url);
    },
    getInvoiceByStatus: (status, hotelId) => {
        const url = `/hotels/${hotelId}/invoices?status=${status}`;
        return axiosClient.get(url);
    },
    update: (id, status, room_quantity, token) => {
        const url = `/invoices/${id}`;
        return axiosClient.patch(url, { status: status, room_quantity: room_quantity }, { headers: { Authorization: `Bearer ${token}` } });
    },
    delete: (id, token) => {
        const url = `/invoices/${id}`;
        return axiosClient.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    },

};
export default invoiceApi;
