import { readFileSync } from "fs";
import { StoredUserType } from "../../types/user";

const getList = () => {
    const usersBuffer = readFileSync("data/users.json");
    const usersString = usersBuffer.toString();
    if (!usersString) {
        return [];
    }

    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
};

const exist = ({ email }: { email: string }) => {
    const users = getList();
    return users.some((user) => user.email === email);
};

const find = ({ email, id }: { email?: string; id?: number }) => {
    const users = getList();
    return users.find((user) => user.email === email || user.id === id);
};

export default { getList, exist, find };
