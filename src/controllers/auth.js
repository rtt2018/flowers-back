import {
  loginUser,
  // logoutUser,
  // refreshUsersSession,
} from '../services/auth.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import HttpError from 'http-errors';
import { THIRTY_DAYS } from '../constants/constants.js';

// export const findUserController = async (req, res) => {
//   const { error } = registerUserSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.details[0].message);
//   }

//   const user = await addOrder(req.body);

//   const currentUser = {
//     name: user.name,
//     email: user.email,
//   };

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully registered a user!',
//     data: {
//       user: currentUser,
//     },
//   });
// };

export const loginUserController = async (req, res) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }

  const { session, user } = await loginUser(req.body);

  const currentUser = {
    name: user.name,
    email: user.email,
  };

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: currentUser,
      accessToken: session.accessToken,
    },
  });
};

// export const logoutUserController = async (req, res) => {
//   if (req.cookies.sessionId) {
//     await logoutUser(req.cookies.sessionId);
//   }

//   res.clearCookie('sessionId');
//   res.clearCookie('refreshToken');

//   res.status(204).send();
// };

// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(Date.now() + THIRTY_DAYS),
//   });
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + THIRTY_DAYS),
//   });
// };

// export const refreshUserSessionController = async (req, res) => {
//   const session = await refreshUsersSession({
//     sessionId: req.cookies.sessionId,
//     refreshToken: req.cookies.refreshToken,
//   });

//   setupSession(res, session);

//   res.json({
//     status: 200,
//     message: 'Successfully refreshed a session!',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
