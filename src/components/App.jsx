import React from 'react';
import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './FIlter';
import Box from './Common/Box';

import css from './Common/Common.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('savedContacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('savedContacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddingContact = ({ name, number }) => {
    const isExist = contacts.filter(contact => contact.name === name).length;

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(state => [
      ...state,
      { id: nanoid(), name: name, number: number },
    ]);
  };

  const onFilter = ev => {
    setFilter(ev.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const regNormolize = sentence => {
      return sentence.toLowerCase().trim();
    };

    return contacts.filter(contact => {
      return (
        regNormolize(contact.name).includes(regNormolize(filter)) ||
        regNormolize(contact.number).includes(regNormolize(filter))
      );
    });
  };

  const onDelete = id => {
    setContacts(state =>
      state.filter(contact => {
        return contact.id !== id;
      })
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Box mt={40} ml={40}>
      <Box mb={32} fontSize={18} width={380}>
        <h1 className={css.heading}>Phonebook</h1>
        <ContactForm addContact={onAddingContact} />
      </Box>

      <Box fontSize={18} width={360}>
        <h2 className={css.heading}>Contacts</h2>
        <Filter filter={filter} onFilter={onFilter} />
        <ContactList contacts={visibleContacts} onDelete={onDelete} />
      </Box>
    </Box>
  );
};
