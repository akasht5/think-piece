import React,{ useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

const Authentication = ({ loading }) => {
  const user = useContext(UserContext);

  if (loading) return null;

  return (
    <div>
      {user ? <CurrentUser {...user} /> : <SignInAndSignUp />}
    </div>
  );
};

export default Authentication;