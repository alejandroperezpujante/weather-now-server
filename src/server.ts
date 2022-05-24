import { Application, oakCors } from "./deps.ts";
import router from "./router/index.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
