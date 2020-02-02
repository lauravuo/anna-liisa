import { connect } from 'react-redux';

import { selectIndex } from '../store/actions';
import SearchComponent from '../components/search';

const mapStateToProps = ({ challenges, model }) => ({
  model,
  books: Object.keys(challenges.current.books).reduce(
    (result, item) => [...result, ...challenges.current.books[item]],
    []
  )
});

const mapDispatchToProps = dispatch => ({
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
