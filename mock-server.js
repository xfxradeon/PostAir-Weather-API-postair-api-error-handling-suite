const http = require("http");
const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  // 1. Health check MUST be evaluated first
  if (req.method === "GET" && (req.url === "/health" || req.url.startsWith("/health"))) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  const sendProblemJson = (status, title, detail) => {
    res.writeHead(status, { "Content-Type": "application/problem+json" });
    return res.end(JSON.stringify({
      type: `https://en.wikipedia.org/wiki/HTTP_${status}`,
      title: title,
      status: status,
      detail: detail,
      instance: req.url,
      correlationId: "bac5ae09-a65a-4b7b-9442-83b5dfbeec23"
    }));
  };

  // 2. Airports endpoint
  if (req.url.startsWith("/airports")) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost:3001"}`);
    const code = parsedUrl.searchParams.get("airportCode");

    if (code === "ZZZ" || code === "ADFRE") {
      return sendProblemJson(404, "Not Found", "The requested resource was not found.");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify([
      {
        country: "United States",
        airports: [
          {
            code: "ATL",
            city: "Atlanta",
            name: "Hartsfield-Jackson Atlanta International Airport",
            latitude: 33.6407,
            longitude: -84.4277
          },
          {
            code: "LAX",
            city: "Los Angeles",
            name: "Los Angeles International Airport",
            latitude: 33.9416,
            longitude: -118.4085
          }
        ]
      }
    ]));
  }

  // 3. Turbulence endpoint
  if (req.url.startsWith("/turbulence")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify([]));
  }

  // 4. Forecast endpoint
  if (req.url.startsWith("/forecast")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify([
      {
        city: "Ocala",
        country: "United States",
        humidity: 84.6,
        weatherCondition: "Fog"
      }
    ]));
  }

  // 5. Metars endpoint
  if (req.url.startsWith("/metars")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify([
      {
        code: "ATL",
        name: "Hartsfield-Jackson Atlanta International Airport"
      }
    ]));
  }

  // Fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint not defined" }));
});

server.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
