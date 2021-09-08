import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

const Authentication = ({ user, loading }) => {
  if (loading) return null;
  
  return (
    <div>
      {user ? <CurrentUser {...user._delegate} /> : <SignInAndSignUp />}
    </div>
  );
};

export default Authentication;