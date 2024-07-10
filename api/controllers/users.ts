import express from "express";
import type { NextFunction, Request, Response } from "express";
import { octokit } from "../utils";

const userRouter = express.Router();

/*export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect(process.env.CLIENT_BASE_URL + "/login");
}*/

userRouter.get("/profile/:username", async (req, res) => {
	const { username } = req.params;
	try {
        const userProfile = await octokit.rest.users.getByUsername({ username });

        const repoRes = await octokit.rest.repos.listForUser({ username, sort: "updated" });
        repoRes

		res.status(200).json({ userProfile: userProfile.data, repos: repoRes.data });
	} catch (error) {
		res.status(500).json({ error });
	}
});

/*userRouter.get("/likes", async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString());
		res.status(200).json({ likedBy: user.likedBy });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});*/

export default userRouter;

