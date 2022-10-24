import * as admin from "firebase-admin";

const params = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
};

const apps = admin.apps;
let app: admin.app.App;

if (apps.length !== 0 && apps[0]) {
  app = apps[0];
} else {
  app = admin.initializeApp({ credential: admin.credential.cert(params) });
}

export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
