import express from "express";
import config from "config";
import chalk from "chalk";
import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiKey: "APIKeyFromPartnersDashboard",
  apiSecretKey: "APISecretFromPartnersDashboard",
  scopes: ["read_products"],
  hostName: "ngrok-tunnel-address",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    app.get("/auth", async (req, res) => {
      // The library will automatically redirect the user
      await shopify.auth.begin({
        shop: shopify.utils.sanitizeShop(req.query.shop, true),
        callbackPath: "/auth/callback",
        isOnline: false,
        rawRequest: req,
        rawResponse: res,
      });
    });

    app.get("/auth/callback", async (req, res) => {
      // The library will automatically set the appropriate HTTP headers
      const callback = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      // You can now use callback.session to make API requests

      // res.redirect("/my-apps-entry-page");
    });
    const session = Session;

    // console.log(chalk.green(shopify.session.getCurrentId()));
    const client = new shopify.clients.Graphql({ session });
    const response = await client.query({
      data: `query {
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          title
          handle
          resourcePublicationOnCurrentPublication {
            publication {
              name
              id
            }
            publishDate
            isPublished
          }
        }
      }
    }
  }`,
    });
    console.log(client);

    // initDatabase();
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log(chalk.bgRed(error.message));
  }
}

start();
