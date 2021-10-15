import firebase from 'firebase-admin';

// Best practice: Get the credential file and db url from environment varible
const serviceAccount = require('../../good-habits-79e11-firebase-adminsdk-ivczh-43fd051544.json');
const dbUrl = 'https://good-habits-79e11-default-rtdb.firebaseio.com/'; //You’ll get the DB Url from Firebase Console

const init = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: dbUrl,
  });
  console.info('Initialized Firebase SDK');
};

export default init;