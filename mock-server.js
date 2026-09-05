const http = require("http");
const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/airports")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify([
            {
                country: "United States",
                airports: [
                    { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson Atlanta International Airport", latitude: 33.6407, longitude: -84.4277 },
                    { code: "LAX", city: "Los Angeles", name: "Los Angeles International Airport", latitude: 33.9416, longitude: -118.4085 }
                ]
            }
        ]));
    }

    if (req.url.startsWith("/turbulence")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify([]));
    }

    if (req.url.startsWith("/forecast")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify([
            { city: "Ocala", country: "United States", humidity: 84.6, weatherCondition: "Fog" }
        ]));
    }

    if (req.url.startsWith("/metars")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify([
            { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport" }
        ]));
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not defined" }));
});

server.listen(PORT, () => {
    console.log(`Mock server running on port ${PORT}`);
});