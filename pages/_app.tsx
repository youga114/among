import App, { AppContext, AppProps } from "next/app";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { Provider } from "react-redux";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const app = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <GlobalStyle />
            <Header />
            <Component {...props.pageProps} />
            <div id="root-modal" />
        </Provider>
    );
};

app.getInitialProps = wrapper.getInitialAppProps(
    (store) => async (context: AppContext) => {
        const appInitialProps = await App.getInitialProps(context);
        const req = context.ctx.req as any;

        console.log(context.ctx);
        console.log(req.cookies);

        const cookieObject = cookieStringToObject(
            context.ctx.req?.headers.cookie
        );
        try {
            if (cookieObject.access_token) {
                axios.defaults.headers.cookie = cookieObject.access_token;
                const { data } = await meAPI();
                store.dispatch(userActions.setLoggedUser(data));
            }
        } catch (e) {
            console.log(e);
        }

        return { ...appInitialProps };
    }
);

export default app;
