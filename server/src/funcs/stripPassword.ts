import User from '../models/user';

const stripPassword = (user: User) => {
  return {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    exp: user.exp,
    level: user.level,
    pfp: user.pfp
  };
};

export default stripPassword;
