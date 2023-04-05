import path from "path";
import { readFileSync, writeFileSync } from "fs";

type mainPhotoType = { name: string };

const get = () => {
    const jsonDirectory = path.join(process.cwd(), "data");
    const mainPhotoBuffer = readFileSync(
        jsonDirectory + "/mainPhoto.json",
        "utf8"
    );
    const mainPhotoString = mainPhotoBuffer.toString();
    if (!mainPhotoString) {
        return "";
    }
    const mainPhoto: mainPhotoType = JSON.parse(mainPhotoString);
    return mainPhoto.name;
};

const exist = () => {
    const mainPhotoName = get();
    return mainPhotoName != "";
};

const write = (mainPhoto: mainPhotoType) => {
    writeFileSync("data/mainPhoto.json", JSON.stringify(mainPhoto));
};

export default { get, exist, write };
