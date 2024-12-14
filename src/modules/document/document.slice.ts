import { IDocumentState } from './document.typeDefs';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@utils/store';
import { INotarizationService } from '@modules/notarizationService';
import { INotarizationField } from '@modules/notarizationField';

const initialState: IDocumentState = {
  notarizationService: undefined,
  notarizationField: undefined,
  requesterInfo: {
    fullName: undefined,
    citizenId: undefined,
    phoneNumber: undefined,
    email: undefined,
  },
  files: [],
  amount: 0,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setServiceAndField: (
      state,
      { payload }: PayloadAction<{ service: INotarizationService; field: INotarizationField }>,
    ) => {
      state.notarizationService = payload.service;
      state.notarizationField = payload.field;
    },
    setRequesterInfo: (
      state,
      {
        payload,
      }: PayloadAction<{
        fullName: string;
        citizenId: string;
        phoneNumber: string;
        email: string;
        amount: number;
      }>,
    ) => {
      state.requesterInfo.fullName = payload.fullName;
      state.requesterInfo.citizenId = payload.citizenId;
      state.requesterInfo.phoneNumber = payload.phoneNumber;
      state.requesterInfo.email = payload.email;
      state.amount = payload.amount;

      console.log('Requester Info:', state.requesterInfo, state.amount);
    },
    addFile: (state, { payload }: PayloadAction<any>) => {
      state.files.push(payload);
    },
    resetDocumentState: () => {
      console.log('Resetting state to initialState', initialState);
      return initialState;
    },
    clearFiles: state => {
      console.log('Clearing files...');
      state.files = [];
    },
  },
});

export function useDocumentSlice() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ document }: State) => document);
  return { dispatch, ...state, ...documentSlice.actions };
}

export default documentSlice.reducer;
