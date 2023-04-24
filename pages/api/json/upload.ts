import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const url = await new Promise(async (resolve, reject) => {
                const s3 = new aws.S3({
                    accessKeyId: process.env.ACCESSKEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESSKEY_ID
                });

                const buf = Buffer.from(JSON.stringify(req.body.data));

                await s3
                    .upload({
                        Bucket: process.env.S3_BUCKET_NAME!,
                        Key: req.body.fileName,
                        ACL: "public-read",
                        Body: buf
                    })
                    .promise();

                resolve("");
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
