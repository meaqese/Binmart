import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
});
