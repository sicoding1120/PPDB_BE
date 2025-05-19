export const jwt_config = {
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || 'ppdbkaryasantri2025',
  expired: 3600,
  refresh_token_secret:
    process.env.REFRESH_TOKEN_SECRET || 'ppdbkaryasantri2025',
};
