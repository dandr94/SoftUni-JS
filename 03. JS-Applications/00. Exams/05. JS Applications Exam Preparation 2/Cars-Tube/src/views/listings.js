import { html } from "../../node_modules/lit-html/lit-html.js";
import { getListings } from "../api/main.js";

const listingsTemplate = (listings) => html`
  <section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
      ${listings.length > 0
        ? listings.map(listingTemplate)
        : html`<p class="no-cars">No cars in database.</p>`}
    </div>
  </section>
`;

export const listingTemplate = (listing) => html`
  <div class="listing">
    <div class="preview">
      <img src=${listing.imageUrl} />
    </div>
    <h2>${listing.brand} ${listing.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>${listing.year}</h3>
        <h3>Price: ${listing.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${listing._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;

async function listingsPage(ctx) {
  const listings = await getListings();
  ctx.render(listingsTemplate(listings));
}

export { listingsPage };
