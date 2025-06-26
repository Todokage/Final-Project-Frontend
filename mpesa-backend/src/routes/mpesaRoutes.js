import express from 'express';
import MpesaController from '../controllers/mpesaController.js';

const setMpesaRoutes = (app) => {
    const router = express.Router();
    const mpesaController = new MpesaController();

    router.post('/stkpush', mpesaController.initiateSTKPush.bind(mpesaController));
    router.post('/callback', mpesaController.handleCallback.bind(mpesaController));

    app.use('/api/mpesa', router);
};

export default setMpesaRoutes;