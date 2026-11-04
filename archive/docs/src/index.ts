import { renderApp } from "rasengan/client";
import App from "./main";
import appRouter from "./app/app.router";

renderApp(App, appRouter, { reactStrictMode: true });
