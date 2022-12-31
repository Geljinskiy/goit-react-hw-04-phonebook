import React from 'react';
import PropTypes from 'prop-types';

import MainButtonStyle from 'components/Common/styled-components/MainButton';
import Label from 'components/Common/styled-components/Label';
import Form from 'components/Common/styled-components/Form';

export default class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  onInput = ev => {
    this.setState({ [ev.currentTarget.name]: ev.currentTarget.value });
  };

  onFormSubmit = ev => {
    ev.preventDefault();
    const { addContact } = this.props;

    addContact({ name: this.state.name, number: this.state.number });

    ev.currentTarget.reset();
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Label>
          <p>Name</p>
          <input
            onChange={this.onInput}
            value={this.state.name}
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
            onChange={this.onInput}
            value={this.state.number}
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
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
