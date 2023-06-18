import { Header, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({onNameTransfer}) => {
  const [inputTitle, setInputTitle] = useState('');

  const handleSetstate = (e) => {
    setInputTitle(e.target.value);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (inputTitle.trim() === "") {
      alert('Should be valid request')
      return
    }

    onNameTransfer(inputTitle);
    setInputTitle('');
  }

  return (
      <Header >
        <SearchForm
          onSubmit={handleSubmitForm}>
          <SearchFormButton type="submit">
            <span>Search</span>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={inputTitle}
            onChange={handleSetstate}
          />
        </SearchForm>
      </Header>
    )
}