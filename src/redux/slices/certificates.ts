import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/types';
import { useApi } from '../../api/useApi';
import { GetCertificatesDTO } from '../../types/dto/get-certificates.dto';
import { CheckoutDTO } from '../../types/dto/checkout.dto';

const { certificates } = useApi();

type InitialState = {
  list: GetCertificatesDTO[];
  selectedId: string | null;
  certNumber: string | null;
  status: Status;
  error: string | null;
};

const initialState: InitialState = {
  list: [],
  selectedId: null,
  certNumber: null,
  status: 'idle',
  error: null,
};

const sliceName = 'certificates';

export const fetchCertificates = createAsyncThunk(
  `${sliceName}/fetchCertificates`,
  async (apiKey: string) => {
    return certificates.getCertificates(apiKey);
  }
);

export const checkoutUser = createAsyncThunk(
  `${sliceName}/checkoutUser`,
  async (body: CheckoutDTO) => {
    const response = await certificates.postCertificates(body);
    return response.data[0].CERTNUMBER;
  }
);

export const certificatesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.data;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Unknown error';
      })
      .addCase(checkoutUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.certNumber = action.payload;
      })
      .addCase(checkoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Unknown error';
      }),
});

export const { selectProduct } = certificatesSlice.actions;

export default certificatesSlice.reducer;
