const fs = require("fs");
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know abbout the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{ProductName}/g, product.productName);
  output = output.replace(/{ProductImage}/g, product.image);
  output = output.replace(/{ProductPrice}/g, product.price);
  output = output.replace(/{ProductFrom}/g, product.from);
  output = output.replace(/{ProductNutrients}/g, product.nutrients);
  output = output.replace(/{ProductQuantity}/g, product.quantity);
  output = output.replace(/{ProductDescription}/g, product.description);
  output = output.replace(/{ProductId}/g, product.id);

  if (!product.organic) output = output.replace(/{NotOrganic}/g, "not-organic");

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj.map((e) => replaceTemplate(tempCard, e)).join("");
    const output = tempOverview.replace("{ProductCards}", cardsHtml);
    res.end(output);

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "Wow-mali": "Mali ka boss",
    });
    res.end("<h1>Mali route mo boss</h1>");
  }
});

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listnening to request on port 8000");
// });

server.listen(8000, "localhost");
