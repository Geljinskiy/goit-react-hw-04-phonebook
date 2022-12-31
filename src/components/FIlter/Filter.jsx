import PropTypes from 'prop-types';

import Label from 'components/Common/styled-components/Label';

const Filter = ({ onFilter, filter }) => {
  return (
    <Label>
      <p>Find contatcts by name</p>
      <input onChange={onFilter} value={filter} type="text" name="filter" />
    </Label>
  );
};

export default Filter;

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
