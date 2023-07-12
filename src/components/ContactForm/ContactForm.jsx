import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
} from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const [state, setState] = useState({ //в локальном стейте будем хранить объект с именем и номером телефона контакта
    name: '',
    phone: '',
  });

  const handleChange = event => {
    setState(prev => ({ ...prev, [event.target.name]: event.target.value })); //так как стейт - это объект, то чтоб не перезаписывались все значения ключей объекта, мы используем prev, то есть каждый раз учитываем предыдущее значение каждого отдельного свойства
  };

  const handleSubmit = event => {
    event.preventDefault();
    // dispatch()
    //проверяем чтоб такого имени не было в contacts
    // if (contacts.find(contact => contact.name === name)) {
    //   alert(`${name} is already in contacts`);
    //   return;
    // }

    // dispatch(addContact(name, number)); //через диспатч в файл contactsSlice.js передаем name и number
    reset(); //очищаем инпуты
  };

  //функция для сброса формы
  const reset = () => {
    // setName('');
    // setNumber('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        Name
        <StyledInput
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+((?:'[a-zA-Zа-яА-Я\s])?(?:-[a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я\s]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </StyledLabel>

      <StyledLabel>
        Number
        <StyledInput
          type="tel"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}[\s]?[\-]?\(?\d{1,3}?\)?[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </StyledLabel>
      <StyledButton type="submit">Add contact</StyledButton>
    </StyledForm>
  );
};
