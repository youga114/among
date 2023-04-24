import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import aws from "aws-sdk";
import { createReadStream } from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm({ multiples: true });
            const url = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    let file = files["file"];
                    const promises = [];

                    const s3 = new aws.S3({
                        accessKeyId: process.env.ACCESSKEY_ID,
                        secretAccessKey: process.env.SECRET_ACCESSKEY_ID
                    });

                    if (!Array.isArray(file)) {
                        file = [file];
                    }

                    const locations: string[] = [];

                    for (let i = 0; i < file.length; ++i) {
                        let fileName =
                            file[i].mtime?.toISOString() ??
                            file[i].originalFilename;

                        if (fields.from === "main") {
                            fileName = "main.png";
                        }

                        promises.push(
                            s3
                                .upload({
                                    Bucket: process.env.S3_BUCKET_NAME!,
                                    Key: fileName!,
                                    ACL: "public-read",
                                    Body: createReadStream(file[i].filepath)
                                })
                                .promise()
                                .then((res) => {
                                    const location = decodeURI(res.Location);
                                    locations.push(location);
                                })
                                .catch((e) => reject(e))
                        );
                    }

                    await Promise.all(promises);
                    resolve(locations);
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
