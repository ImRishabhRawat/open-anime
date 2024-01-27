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
				filter: {
					text: title,
				},
				page: {
					limit: 1,
					offset: 0,
				},
				// page[limit]: 1,
				// page[offset]: 0,
				// q: title,
				// zoom:0,
				// api: process.env.BOOK_API_KEY,
			},
		});
		// console.log(result.data);
		for (let item of result.data.data) {
			// Access the attributes object
			let attributes = item.attributes.posterImage;
			// let imgUrl = attributes.posterImage.original;
			// Now you can work with the attributes object
			let imgUrl = attributes.large;
			res.status(200).json({photo: imgUrl});
		}
		// const selfLink = result.data.items[0].selfLink;
		// const val = await axios.get(selfLink);
		// const imgUrl = val.data.volumeInfo.imageLinks.thumbnail;
		// console.log(imgUrl);
        // res.status(200).json({ photo: imgUrl });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(
				error?.response.data.error.message.error.response.data.error.message
			);
	}
});
export default router;
