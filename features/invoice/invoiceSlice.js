import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import invoiceApi from "../../api/invoiceApi";

export const getAllInvoices = createAsyncThunk(
    'invoices/getAll',
    async (params) => {
        try {
            const res = await invoiceApi.getAll(params)
            if (res.data.data) {
                return res.data.data
            }
        } catch (error) {
            console.log(error);
        }
    },
)

export const getAllInvoicesByStatus = createAsyncThunk(
    'invoices/getAllByStatus',
    async ({ hotelId, status }) => {
        try {
            const res = await invoiceApi.getInvoiceByStatus(status, hotelId)
            if (res.data.data) {
                return res.data.data
            }
        } catch (error) {
            console.log(error);
        }
    },
)

const invoiceAdapter = createEntityAdapter({
    selectId: (invoice) => invoice.invoice_id,
});

export const invoiceSelectors = invoiceAdapter.getSelectors((state) => state.invoice);

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: invoiceAdapter.getInitialState({
        status: "",
        check: false,
    }),
    reducers: {
        removeInvoices(state) {
            invoiceAdapter.removeAll(state);
            // state.status = "loading";
        },
        setCheck(state, action) {
            state.check = action.payload
        }

    },
    extraReducers: {
        [getAllInvoices.pending](state) {
            state.status = "loading";
        },
        [getAllInvoices.rejected](state) {
            state.status = "reject";
        },
        [getAllInvoices.fulfilled](state, action) {
            state.status = "success";
            invoiceAdapter.setAll(state, action.payload);
        },
        [getAllInvoicesByStatus.pending](state) {
            state.status = "loading";
        },
        [getAllInvoicesByStatus.rejected](state) {
            state.status = "reject";
        },
        [getAllInvoicesByStatus.fulfilled](state, action) {
            state.status = "success";
            invoiceAdapter.setAll(state, action.payload);
        },
    },
});
export const { removeInvoices,setCheck } = invoiceSlice.actions;
export default invoiceSlice.reducer