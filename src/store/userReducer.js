const INITIAL_STATE = {
  usuarioEmail: '',
  token: '',
  usuarioLogado: 0,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, token: action.token };
    case 'LOG_OUT':
      return { ...state, usuarioLogado: 0, usuarioEmail: null, token: null };
    default:
      return state;
  }
}

export default userReducer;