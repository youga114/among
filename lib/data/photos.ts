import { readFileSync, writeFileSync } from "fs";
// import { StoredRoomType } from "../../types/room";
import path from "path";

// const getList = () => {
//     const jsonDirectory = path.join(process.cwd(), "data");
//     const photosBuffer = readFileSync(jsonDirectory + "/photos.json", "utf8");
//     const photosString = photosBuffer.toString();
//     if (!photosString) {
//         return [];
//     }
//     const photos: StoredRoomType[] = JSON.parse(photosString);
//     return photos;
// };

// const exist = (photoId: number) => {
//     const photos = getList();
//     return photos.some((photo) => photo.id === photoId);
// };

// const find = (photoId: number) => {
//     const photos = getList();
//     return photos.find((photo) => photo.id === photoId);
// };

// const write = (photos: StoredRoomType[]) => {
//     writeFileSync("data/rooms.json", JSON.stringify(photos));
// };

// export default { getList, exist, write, find };
export default {};
