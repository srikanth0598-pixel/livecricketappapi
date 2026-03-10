const otpTemplate = (otp, token, userId) => {
  return `
    <div>
      <h2>Your OTP Code</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p><b>Token:</b> ${token}</p>
      <p><b>UserID:</b> ${userId}</p>
    </div>
  `;
};

module.exports = otpTemplate;