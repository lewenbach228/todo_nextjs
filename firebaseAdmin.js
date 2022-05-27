const admin = require("firebase-admin");
const serviceAccount = require("./next-todos-app-firebase-adminsdk-l0rvf-4d8e33aa6c.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err;
    });
};
