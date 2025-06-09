const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const os = require('os');
const process = require('process');  // import the logger

let activeRequests = 0;
let memoryLoad = false;
let cpuLoad = false;

const app = express();
app.use(cors());
app.use(express.json());

// Logger middleware for incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

  // Capture response body for logging
  const oldSend = res.send;
  res.send = function (data) {
    logger.info(`Response to ${req.method} ${req.originalUrl}: ${data}`);
    oldSend.apply(res, arguments);
  };

  next();
});

app.post('/api/stress', (req, res) => {
  logger.info(`POST /api/stress with body: ${JSON.stringify(req.body)}`);

  const { requests = 1, memory = false, cpu = false } = req.body;
  memoryLoad = memory;
  cpuLoad = cpu;

  for (let i = 0; i < requests; i++) {
    activeRequests++;
    simulateLoad().finally(() => {
      activeRequests--;
    });
  }

  const response = { message: `Started ${requests} simulated load requests` };
  logger.info(`Responding with: ${JSON.stringify(response)}`);
  res.json(response);
});

function simulateLoad() {
  return new Promise((resolve) => {
    if (memoryLoad) {
      const memoryArray = Array(1000000).fill("leak" + Math.random());
    }

    if (cpuLoad) {
      const start = Date.now();
      while (Date.now() - start < 1000) {
        Math.sqrt(Math.random() * Math.random());
      }
    }

    setTimeout(resolve, 200);
  });
}

// app.get('/api/status', (req, res) => {
//   res.json({ activeRequests, memoryLoad, cpuLoad });
// });



app.get('/api/status', (req, res) => {
  // Get current process CPU and memory info
  const memoryUsage = process.memoryUsage(); // returns bytes
  const cpuUsage = process.cpuUsage(); // returns microseconds since process start

  // Calculate CPU usage % roughly
  // Note: process.cpuUsage() gives CPU time used by the process since start,
  // To get usage %, you need to measure over intervals (advanced).
  // For simplicity, just send raw values here.

  res.json({
    activeRequests,
    memoryLoad,
    cpuLoad,
    memoryUsage: {
      rssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),       // Resident Set Size
      heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
      heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      externalMB: (memoryUsage.external / 1024 / 1024).toFixed(2),
    },
    cpuUsage: {
      userMicroSec: cpuUsage.user,
      systemMicroSec: cpuUsage.system
    },
    systemLoadAvg: os.loadavg()  // 1, 5, 15 min load average
  });
});

app.listen(4000, () => {
  logger.info('Server running on http://localhost:4000');
});
