import Router from 'express'

import UserRoutes from './users/userRoutes';

const router = Router();
new UserRoutes(router);

export default router;
