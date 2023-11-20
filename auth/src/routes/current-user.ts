import express from 'express';
import { currentUser } from '@myappsack/common-features';

const router = express.Router();

router.get('/api/users/currentuser',currentUser, async (req, res) => {
    console.log(req.currentUser);
    console.log(req.cookies);
    res.send({ currentUser: req.currentUser || null});
});

export { router as currentUserRouter }
