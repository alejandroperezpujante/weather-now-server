import { serve } from "./deps.ts";
import router from "./router/index.ts";

serve(async (req) => await router.route(req));
