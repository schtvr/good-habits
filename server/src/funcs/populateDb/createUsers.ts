import User from '../../models/user';
import bcrypt from 'bcrypt';

const createUsers = async () => {
  await User.create({
    userName: 'timbo',
    firstName: 'timbo',
    lastName: 'slice',
    email: 'bigBoy@gmail.com',
    password: bcrypt.hashSync('password123', 10) ,
  });
  await User.create({
    userName: 'dummy',
    firstName: 'victor',
    lastName: 'dumdum',
    email: 'dummy@dummy.com',
    password: bcrypt.hashSync('password123', 10) 
  });
  await User.create({
    userName: 'dogShit',
    firstName: 'dogShit',
    lastName: 'tunic',
    email: 'stinkybum@garbage.com',
    password: bcrypt.hashSync('password123', 10),
    exp: -50
  });
  await User.create({
    userName: 'fefe',
    firstName: 'fefe',
    lastName: 'fefe',
    email: 'fefe',
    password: bcrypt.hashSync('fefe', 10),
    exp: 1234
  });
};

export default createUsers;
