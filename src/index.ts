import App from "@/app";
import HealthRoute from "@route/health";
import UserRoute from "@route/user";

export const app = new App([new HealthRoute(), new UserRoute()]);

app.listen();
