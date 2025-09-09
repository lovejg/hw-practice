let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; // url 뒤에 나오는 경로(localhost:8080/경로)
    let queryData = url.parse(request.url, true).query; // 쿼리 파라미터에서 id 추출
    route(pathname, handle, response, queryData.productId);
  }

  http.createServer(onRequest).listen(8080);
}

exports.start = start;
