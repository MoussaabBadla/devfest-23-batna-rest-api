import admin from 'firebase-admin';
import serviceAccount from './firebase.json' assert { type: 'json' };
admin.initializeApp({
  credential: admin.credential.cert({
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientX509CertUrl: serviceAccount.client_x509_cert_url 
    
  })
});
export default admin;