import page from "../node_modules/page/page.mjs";
import { logout } from "./api/user.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/season.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { memesPage } from "./views/memes.js";
import { profilePage } from "./views/profile.js";
import { registerPage } from "./views/register.js";

page(addSession);
page(addRender);
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/memes", memesPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/logout", onLogout);
page("/profile/:id", profilePage);

page.start();

function onLogout(ctx) {
  logout();
  ctx.page.redirect("/");
}
