import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import { createReadStream } from "fs";
import mainPhoto from "../../../lib/data/mainPhoto";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            const url = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    const s3 = new aws.S3({
                        accessKeyId: process.env.ACCESSKEY_ID,
                        secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
                    });

                    const file = files.file as formidable.File;
                    const stream = createReadStream(file.filepath);

                    const fileName =
                        file.mtime?.toISOString() ?? file.originalFilename;

                    await s3
                        .upload({
                            Bucket: process.env.S3_BUCKET_NAME!,
                            Key: fileName!,
                            ACL: "public-read",
                            Body: stream,
                        })
                        .promise()
                        .then((res) => {
                            if (fields.from === "main") {
                                mainPhoto.write({ name: res.Location });
                            }
                            resolve(res.Location);
                        })
                        .catch((e) => reject(e));
                });
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
