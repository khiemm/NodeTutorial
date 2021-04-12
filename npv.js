function randomString(length) {
    const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; --i)
      result += alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
    return result;
  }