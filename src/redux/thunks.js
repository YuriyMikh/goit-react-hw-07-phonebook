import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts } from 'API/api';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  //в первый параметр придет то, что передаём через dispatch. Если в диспатче ничего не будем передавать - тогда пропускаем первый параметр просто подчёркиванием
  async (_, thunkAPI) => {
    try {
      const response = await fetchContacts();
      return response; //то, что возвращаем из thunk мы поймаем в slice в экшене в качестве payload (проще говоря response станет payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); //rejectWithValue - метод thunkAPI, который позволяет слайсу поймать ошибку. Также в thunkAPI есть например dispatch, getState
    }
  }
);
