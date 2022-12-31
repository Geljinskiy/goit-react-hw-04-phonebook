import React from 'react';

import { nanoid } from 'nanoid';

import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './FIlter';
import Box from './Common/Box';

import css from './Common/Common.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = JSON.parse(localStorage.getItem('savedContacts'));
      if (!savedContacts) {
        return;
      }
      this.setState({ contacts: savedContacts });
    } catch (error) {
      console.log('error :', error);
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('savedContacts', JSON.stringify(contacts));
  }

  onAddingContact = ({ name, number }) => {
    const isExist = this.state.contacts.filter(
      contact => contact.name === name
    ).length;

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: name, number: number },
        ],
      };
    });
  };

  onFilter = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

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

  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => {
          return contact.id !== id;
        }),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Box mt={40} ml={40}>
        <Box mb={32} fontSize={18} width={380}>
          <h1 className={css.heading}>Phonebook</h1>
          <ContactForm addContact={this.onAddingContact} />
        </Box>

        <Box fontSize={18} width={360}>
          <h2 className={css.heading}>Contacts</h2>
          <Filter filter={this.state.filter} onFilter={this.onFilter} />
          <ContactList contacts={visibleContacts} onDelete={this.onDelete} />
        </Box>
      </Box>
    );
  }
}
