import User from '../models/user';

const stripPassword = (user: User) => {
  return {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
};

export default stripPassword;
