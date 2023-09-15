require('dotenv').config(); 

module.exports = {
    jwtAccessSecret: process.env.JWT_ACCESSKEY,
    jwtRefreshSecret: process.env.JWT_REFRESHKEY,
    NODE_ENV : process.env.NODE_ENV,
    PORT:process.env.PORT,
    accessTokenExpiresIn : process.env.ACCESSTOKENTIME,
    refreshTokenExpiresIn : process.env.REFRESHTOKENTIME,
    databaseURI:process.env.DATABASE_LOCAL
  };

