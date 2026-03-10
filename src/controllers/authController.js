const mailService = require('../services/mailService');
const otpTemplate = require('../templates/otpTemplates');
exports.sendOTP = async (data) => {
    const { email, otp, token, userId } = data;
    
    await mailService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        html: otpTemplate(otp, token, userId)
    });
    console.log(`OTP ${otp} sent to ${email}`);
    return { success: true, message: 'OTP sent successfully' };


}