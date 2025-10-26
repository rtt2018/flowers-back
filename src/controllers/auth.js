// import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
// import HttpError from 'http-errors';
// import { THIRTY_DAYS } from '../constants/constants.js';
import {
  loginUserService,
  sendLoginLinkService,
  refreshUserService,
} from '../services/auth.js';

export const sendLoginLinkController = async (req, res) => {
  const result = await sendLoginLinkService(req.body.email);

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

export const refreshAuthController = async (req, res) => {
  const result = await refreshUserService(req.query.token);

  res.status(200).json({
    message: 'Refresh user complete!',
    data: result,
  });
};
