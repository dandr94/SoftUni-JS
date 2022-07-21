import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteById, getById } from "../api/games.js";
import { commentFormView } from "./commentForm.js";
import { commentsView } from "./comments.js";

const detailsTemplate = (
  game,
  commentsSection,
  commentFormSection,
  onDelete
) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      ${commentsSection}
      ${game.isOwner
        ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button"
              >Delete</a
            >
          </div>`
        : nothing}
    </div>
    ${commentFormSection}
  </section>
`;

async function detailsPage(ctx) {
  const id = ctx.params.id;

  const [game, commentsSection] = await Promise.all([
    getById(id),
    commentsView(id),
  ]);

  if (ctx.user) {
    game.isOwner = ctx.user._id == game._ownerId;
  }

  const commentFormSection = commentFormView(ctx, game);
  ctx.render(
    detailsTemplate(game, commentsSection, commentFormSection, onDelete)
  );

  async function onDelete() {
    const choice = confirm("Are you sure?");
    if (choice) {
      await deleteById(id);
      ctx.page.redirect("/");
    }
  }
}

export { detailsPage };