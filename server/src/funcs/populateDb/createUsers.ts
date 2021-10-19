import User from '../../models/user';
import bcrypt from 'bcrypt';

const createUsers = async () => {
  const tim = await User.create({
    userName: 'nerdinator',
    firstName: 'Tim',
    lastName: 'Hunter',
    email: 'bigBoy@gmail.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 575,
    pfp: 'https://i.imgur.com/0uxkXws.jpg'
  });
  const steve = await User.create({
    userName: 'Schvtr',
    firstName: 'Steven',
    lastName: 'Rigby',
    email: 'oldMan@netscape.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 850,
    pfp: 'https://i.imgur.com/1dhHIkV.png'
  });
  const juan = await User.create({
    userName: 'juan92',
    firstName: 'The',
    lastName: 'Flash',
    email: 'stinkybum@garbage.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 830,
    pfp: 'https://i.imgur.com/QBKrw28.png'
  });
  const sean = await User.create({
    userName: 'Araujo93',
    email: 'sean@sean.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 625,
    pfp: 'https://i.imgur.com/MsjUpS8.png'
  });
  const victor = await User.create({
    userName: 'Derppey',
    email: 'dogshitTunic@gmail.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 750,
    pfp: 'https://i.imgur.com/NLdt0RX.png'
  });
  const javi = await User.create({
    userName: 'Javier',
    email: 'javier@javier.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 310,
    pfp: 'https://images-ext-1.discordapp.net/external/Vp_uB9ViLcEP3xQQERZjyFv96If-4IyxkEDbnYSo9RE/https/yt3.ggpht.com/a/AATXAJzuxdWhwZ_qNKVZARPTd-CAVGG2D1E3a0Bq4g%3Ds900-c-k-c0xffffffff-no-rj-mo'
  });
  const santi = await User.create({
    userName: 'Santiago',
    email: 'bitcoin@bitcoint.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 520,
    pfp: 'https://i.imgur.com/kHVb7US.png'
  });
  const bezoz = await User.create({
    userName: 'DaddyBezos',
    email: 'money@amazon.com',
    password: bcrypt.hashSync('password123', 10),
    exp: 950,
    pfp: 'https://i.imgur.com/nSIoi9t.png'
  });
  const fefe = await User.create({
    userName: 'fefe',
    firstName: 'fefe',
    lastName: 'fefe',
    email: 'fefe',
    password: bcrypt.hashSync('fefe', 10),
    exp: 1234,
    pfp: 'https://i.imgur.com/k4DoxCB.png' 
  });
  
  
  
  // give user things (3 active quests, 2 completed quests, 3 achievements)
  // quests index 1 - 7, achievements 1 - 9
  await giveUserThings(bezoz, [1, 7, 5, 3, 2, 5, 9, 3]);
  await giveUserThings(tim, [2, 1, 3, 5, 8, 1, 3, 4]);
  await giveUserThings(juan, [1, 2, 3, 4, 5, 9, 8, 7]);
  await giveUserThings(steve, [1, 7, 5, 3, 2, 5, 9, 3]);
  await giveUserThings(victor, [3, 6, 7, 2, 1, 5, 9, 3]);
  await giveUserThings(sean, [3, 7, 5, 2, 6, 8, 1, 5]);
  await giveUserThings(santi, [3, 4, 5, 6, 7, 3, 5, 7]);
  await giveUserThings(javi, [3, 1, 7, 6, 5, 5, 9, 3]);
  await giveUserThings(fefe, [1, 7, 5, 3, 2, 5, 9, 3]);
};

const giveUserThings = async (user: User, nums: number[]) => {
  await user.createActiveQuest({ questId: nums[0] });
  await user.createActiveQuest({ questId: nums[1] });
  await user.createActiveQuest({ questId: nums[2] });

  await user.createCompletedQuest({
    questId: nums[3],
    startDate: Date.now(),
  });
  await user.createCompletedQuest({
    questId: nums[4],
    startDate: Date.now(),
  });
  
  await user.createAchievement({
    templateId: nums[5] 
  });
  await user.createAchievement({
    templateId: nums[6] 
  });
  await user.createAchievement({
    templateId: nums[7] 
  });
};

export default createUsers;
