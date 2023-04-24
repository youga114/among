import { NextApiResponse, NextApiRequest } from "next";
import aws from "aws-sdk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const data = await new Promise(async (resolve, reject) => {
                const s3 = new aws.S3({
                    accessKeyId: process.env.ACCESSKEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESSKEY_ID
                });

                const data = await s3
                    .getObject({
                        Bucket: process.env.S3_BUCKET_NAME!,
                        Key: "album.json"
                    })
                    .promise()
                    .then((res) => {
                        resolve(res.Body?.toString("utf-8"));
                    })
                    .catch((e) => reject(e));

                resolve(data);
            });
            res.statusCode = 200;
            return res.send(data);
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            return res.send(e);
        }
    }

    res.statusCode = 405;

    return res.end();
};
