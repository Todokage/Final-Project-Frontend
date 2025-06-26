import express from 'express';
import EmailController from '../controllers/emailController';

const setEmailRoutes = (app) => {
  const router = express.Router();
  const emailController = new EmailController();

  router.post('/send-feedback', emailController.sendFeedback);

  app.use('/api/email', router);
};

export default setEmailRoutes;