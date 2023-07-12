import { createSlice, nanoid } from '@reduxjs/toolkit';
import { getContactsThunk } from './thunks';

const contactsInitialState = {
  contacts: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    isLoading: false,
    error: null,
  },
};

const contactsSlice = createSlice({
  name: 'contacts', //имя слайса
  initialState: contactsInitialState, //начальное состояние редюсера слайса (ссылка)

  //объект редюсеров
  reducers: {
    //первый редюсер
    deleteContact(state, action) {
      state.contacts = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
  
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts = action.payload; //в state записываем результат работы thunk в случае успеха (fulfilled)
        state.isLoading = false; //меняем индикатор на false, чтобы не крутился после успеха (fulfilled)
        state.error = null; //чистим информацию об ошибке, чтоб при следующем запросе не висела информация из прошлого неуспешного результата работы thunk
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.error = action.payload; //в state записываем результат работы thunk в случае rejected
        state.isLoading = false;
      })
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true; //action не будет использоваться, поэтому в state просто записываем isLoading = true
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions; //генераторы экшенов
// export const contactsReducer = contactsSlice.reducer; //редюсер слайса

export default contactsSlice.reducer;
