import express from 'express';
import autoCompleteAPI from './autoComplete';
import weatherAPI from './weather';

const router = express.Router();

router.get('/autoComplete', autoCompleteAPI);
router.get('/weather', weatherAPI);

export default router;