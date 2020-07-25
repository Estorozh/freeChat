import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from './actions';
import Auth from './Auth';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  name: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
