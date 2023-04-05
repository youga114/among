import { NextApiResponse, NextApiRequest } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const mainPhotoPath = Data.mainPhoto.get();

            res.statusCode = 200;
            return res.send(mainPhotoPath);
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            return res.send(e);
        }
    }

    res.statusCode = 405;

    return res.end();
};
