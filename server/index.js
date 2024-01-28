import express from "express";
import config from "config";
import chalk from "chalk";
import sequelize from "./db.js";
import cors from "cors";

import "@shopify/shopify-api/adapters/node";
import { shopifyApi } from "@shopify/shopify-api";
import Products from "./models/models.js";
import router from "./routes/index.js";

const shopify = shopifyApi({
  apiSecretKey: "App_API_secret_key", // Note: this is the API Secret Key, NOT the API access token
  isCustomStoreApp: true, // this MUST be set to true (default is false)
  adminApiAccessToken: "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", // Note: this is the API access token, NOT the API Secret Key
  isEmbeddedApp: false,
  hostName: "cpb-new-developer.myshopify.com",
  // restResources,
});
let session = shopify.session.customAppSession(
  "cpb-new-developer.myshopify.com"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    // initDatabase();

    const client = new shopify.clients.Graphql({ session });
    const data = await client.query({
      data: `query {
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          title
          bodyHtml          
          images(first:10, reverse: true){
            nodes{
              src
            }
            
          }
        }
      }
    }
  }`,
    });

    app.get("/", async (req, res) => {
      try {
        const data = await client.query({
          data: `query {
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          title
          bodyHtml          
          images(first:1,, reverse: true){
            nodes{
              src
            }
            
          }
        }
      }
    }
  }`,
        });

        // res.status(200).send(data.body.data.products.edges);
      } catch (error) {}
    });

    await sequelize.authenticate();
    await sequelize.sync();

    // console.log(data.body.data.products.edges);
    // console.log(node.node.id);
    data.body.data.products.edges.map((node) =>
      Products.create({
        idProduct: node.node.id,
        title: node.node.title,
        bodyHtml: node.node.bodyHtml,
        imageSource: node.node.images.nodes[0].src,
      })
    );

    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log(chalk.bgRed(error.message));
  }
}

start();
