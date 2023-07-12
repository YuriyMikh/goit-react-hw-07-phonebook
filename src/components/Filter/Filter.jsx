import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/filterSlice';
import { StyledInput, StyledLabel } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <StyledLabel>
      Find contacts by name
      <StyledInput
        type="text"
        onChange={event => {
          dispatch(addFilter(event.target.value)); //через диспатч передаем информацию из инпута в filterSlice.js
        }}
        name="find"
      />
    </StyledLabel>
  );
};
