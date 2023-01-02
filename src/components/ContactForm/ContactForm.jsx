import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import MainButtonStyle from 'components/Common/styled-components/MainButton';
import Label from 'components/Common/styled-components/Label';
import Form from 'components/Common/styled-components/Form';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInput = ev => {
    const input = ev.currentTarget;
    if (input.name === 'name') {
      setName(input.value);
    } else if (input.name === 'number') {
      setNumber(input.value);
    }
  };

  const onFormSubmit = ev => {
    ev.preventDefault();

    addContact({ name: name, number: number });
    ev.currentTarget.reset();
    setName('');
    setNumber('');
  };
  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        <p>Name</p>
        <input
          onChange={onInput}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        <p>Number</p>
        <input
          onChange={onInput}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <MainButtonStyle type="submit">Add to contact</MainButtonStyle>
    </Form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
