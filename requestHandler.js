const fs = require("fs"); // file sync
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  response.writeHead(200, { "Content-Type": "text/html;" });
  response.write(main_view);
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html;" });
  mariadb.query("SELECT * FROM orderlist", (err, rows) => {
    let orderRows = "";
    rows.forEach((element) => {
      orderRows +=
        "<tr>" +
        "<td>" +
        element.product_id +
        "</td>" +
        "<td>" +
        element.order_date +
        "</td>" +
        "</tr>";
    });

    const html = orderlist_view.replace("<!-- 주문 데이터 -->", orderRows);

    response.write(html);
    response.end();
  });
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "image/png;" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "image/png;" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", (err, data) => {
    response.writeHead(200, { "Content-Type": "image/png;" });
    response.write(data);
    response.end();
  });
}

function mainCss(response) {
  fs.readFile("./main.css", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/css;" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      response.writeHead(302, { Location: "/orderlist" });
      response.end();
    }
  );
}

function favicon() {}

let handle = {}; // key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;
handle["/favicon.ico"] = favicon;

handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;
handle["/main.css"] = mainCss;

exports.handle = handle;
