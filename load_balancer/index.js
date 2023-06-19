const http = require('http');
const httpProxy = require('http-proxy');

// Cấu hình danh sách server chứa dữ liệu video
let servers = [
  { url: 'http://server1:5000', weight: 1, alive: true },
  { url: 'http://server2:5000', weight: 1, alive: true }
];

// Khởi tạo proxy server
const proxy = httpProxy.createProxyServer({});

// Hàm chọn server dựa trên trọng số và thuật toán Round Robin
let currentServerIndex = 0;

function getNextServer() {
  let aliveServers = servers.filter(server => server.alive);
  if (aliveServers.length === 0) {
    // Nếu không có server nào còn sống, trả về null
    return null;
  }

  const server = aliveServers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % aliveServers.length;
  return server;
}

// Kiểm tra tính khả dụng của server
function checkServerAvailability(server) {
  http.get(server.url, res => {
    server.alive = true;
  }).on('error', err => {
    server.alive = false;
  });
}

// Kiểm tra tính khả dụng của tất cả các server
function checkAllServerAvailabilities() {
  servers.forEach(server => {
    checkServerAvailability(server);
  });
}

// Tạo HTTP server để lắng nghe các yêu cầu từ client
const server = http.createServer((req, res) => {
  const server = getNextServer();
  if (server) {
    proxy.web(req, res, { target: server.url });
  } else {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('No available server.');
  }
});

// Bắt lỗi khi proxy server không thể kết nối tới server chứa dữ liệu video
proxy.on('error', (err, req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. Please try again later.');
});

// Kiểm tra tính khả dụng của server mỗi khoảng thời gian nhất định (ví dụ: 5 giây)
setInterval(() => {
  checkAllServerAvailabilities();
}, 5000);

// Khởi động load balancer server
server.listen(8080, () => {
  console.log('Load Balancer is running on port 8080');
});
