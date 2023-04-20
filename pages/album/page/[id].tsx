import { NextPage } from "next";
import Page from "../../../components/album/page/Page";

const page: NextPage<{ id: number }> = ({ id }) => {
    return <Page id={id} />;
};

page.getInitialProps = async ({ query }) => {
    const idStr = query.id as string;
    let id = 0;
    if (idStr) {
        id = parseInt(idStr);
    }

    return { id };
};

export default page;
