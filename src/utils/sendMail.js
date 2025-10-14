// import nodemailer from 'nodemailer';

// import { getEnvVar } from './getEnvVar.js';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: getEnvVar('EMAIL_USER'),
//     pass: getEnvVar('EMAIL_PASS'),
//   },
// });

// export function sendMail(mail) {
//   mail.from = getEnvVar('EMAIL_USER');

//   return transporter.sendMail(mail);
// }

import { Resend } from 'resend';
import { getEnvVar } from './getEnvVar.js';

const mailPass = getEnvVar('RESEND_PASS');
console.log('🚀 ~ mailPass:', mailPass);

export const resend = new Resend(mailPass);
