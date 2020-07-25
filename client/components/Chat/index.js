import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authFromLocalStorage } from '@c/Auth/actions';
import Chat from './Chat';

const mapStateToProps = (state) => ({
  name: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      authFromLocalStorage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
