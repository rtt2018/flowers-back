// import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
// import HttpError from 'http-errors';
// import { THIRTY_DAYS } from '../constants/constants.js';
import { loginUserService, sendLoginLinkService } from '../services/auth.js';

export const sendLoginLinkController = async (req, res) => {
  const result = await sendLoginLinkService(req.body.email);
  console.log('🚀 ~ sendLoginLinkController ~ result:', result);

  res.status(200).json({
    message: `Link for authorisation will be send to email: ${result}`,
  });
};

export const loginUserController = async (req, res) => {
  const result = await loginUserService(req.query.token);

  res.status(200).json({
    message: 'Login complete!',
    data: result,
  });
};
