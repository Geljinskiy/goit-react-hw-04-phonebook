import PropTypes from 'prop-types';

import css from './ContactList.module.css';

import MainButtonStyle from 'components/Common/styled-components/MainButton';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.listItem} key={id}>
            <div className={css.listWrapper}>
              <span className={css.contactItem}>
                {name}: {number}
              </span>
              <MainButtonStyle onClick={() => onDelete(id)} type="button">
                Delete
              </MainButtonStyle>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propsTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
