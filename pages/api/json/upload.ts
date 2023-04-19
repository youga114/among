import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import { createReadStream } from "fs";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const url = await new Promise(async (resolve, reject) => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(req);

                // const s3 = new aws.S3({
                //     accessKeyId: process.env.ACCESSKEY_ID,
                //     secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
                // });

                // await s3
                //     .upload({
                //         Bucket: process.env.S3_BUCKET_NAME!,
                //         Key: req.jsonFileName,
                //         ACL: "public-read",
                //         Body: req.body,
                //     })
                //     .promise()
                //     .then((res) => {
                //         resolve("");
                //     })
                //     .catch((e) => reject(e));
            });
            res.statusCode = 201;
            res.send(url);
        } catch (e) {
            console.log(e);
            res.end();
        }
    }
    res.statusCode = 405;

    return res.end();
};
