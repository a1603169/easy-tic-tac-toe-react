const express = require("express");
const path = require("path");
const ReactDomServer = require("react-dom/server");
const React = require("react");
const fs = require("fs");

// <div>Hello</div>
console.log(
  ReactDomServer.renderToString(React.createElement("div", null, "Hello"))
);

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/test", (req, res) => {
  const ssr = ReactDomServer.renderToString(
    React.createElement("div", null, "Hello")
  );

  const indexHtml = fs
    .readFileSync(path.join(__dirname, "build", "index.html"))
    .toString()
    .replace('<div id="root"></div>', `<div id="root">${ssr}</div>`);

  console.log(indexHtml);

  res.send(indexHtml);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);
