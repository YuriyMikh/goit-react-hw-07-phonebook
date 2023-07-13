import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
// import { deleteContact } from 'redux/contactsSlice';
import { StyledDeleteButton, StyledLi, StyledUl } from './ContactList.styled';
import { useEffect } from 'react';
import { deleteContactThunk, getContactsThunk } from 'redux/thunks';

export const ContactList = () => {
  const dispatch = useDispatch(); //получаем ссылку на функцию отправки экшенов
  const contacts = useSelector(selectContacts); //из файла contactsSlice.js (состояния Redux) вытягиваем наши контакты (из state.contacts.items)

  //при первой загрузке страницы через useEffect получаем наши контакты с сервера (get-запрос)
  useEffect(() => {
    dispatch(getContactsThunk()); //через диспатч отправляем вызов thunk, в свою очередь thunk делает gеt-запрос
  }, [dispatch]);

  //функция отрисовки контактов (после фильтрации)
  // const getFilterContacts = () => {
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(visibleContacts.toLowerCase())
  //   );
  // };

  const handleDelete = id => dispatch(deleteContactThunk(id)); //отправляем результат - экшен для удаления

  // const filterContacts = getFilterContacts(); //в переменную записыаем вызов функции

  return (
    <StyledUl>
      {contacts.map(item => (
        <StyledLi key={item.id}>
          {item.name}: {item.phone}
          <StyledDeleteButton
          onClick={() => handleDelete(item.id)}
          >
            Delete
          </StyledDeleteButton>
        </StyledLi>
      ))}
    </StyledUl>
  );
};
