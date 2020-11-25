module.exports = {
  // Environment
  environment: 'local',

  // MongoDB
  mongo: {
    uri: 'mongodb://localhost/user-management',
    settings: {
      //   db: {native_parser: true},
    },
  },

  port: 5000,

  // keys for authentication
  jwtKeys: {
    privateKey: './config/secret-keys/private.key',
    publicKey: './config/secret-keys/public.key',
  },
};
