const timeUnitInMilliseconds = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000
};

export const getJwtExpiryDate = (expiresIn) => {
  if (typeof expiresIn === 'number') {
    return new Date(Date.now() + expiresIn * 1000);
  }

  const match = String(expiresIn).match(/^(\d+)([smhd])$/);

  if (!match) {
    return new Date(Date.now() + timeUnitInMilliseconds.d);
  }

  const [, amount, unit] = match;
  return new Date(Date.now() + Number(amount) * timeUnitInMilliseconds[unit]);
};
