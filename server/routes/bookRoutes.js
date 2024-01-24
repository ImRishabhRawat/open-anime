import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();

router.route("/").get((req, res) => {
	res.send("Hello from Books");
});

router.route("/").post(async (req, res) => {
	try {
		const { title } = req.body;
		console.log(req.body);
		const result = await axios.get(process.env.API_URL, {
			params: {
                q: title,
                zoom:0,
				api: process.env.BOOK_API_KEY,
			},
        });
        const selfLink = result.data.items[0].selfLink;
        const val = await axios.get(selfLink);
        const imgUrl = val.data.volumeInfo.imageLinks.thumbnail;
        console.log(imgUrl);
        res.status(200).json({ photo: imgUrl });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message.error.response.data.error.message)
    }
});
export default router;
