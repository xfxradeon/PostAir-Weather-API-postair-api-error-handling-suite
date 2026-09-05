# PostAir Weather API - Automated Baseline Test Suite

An automated API regression test suite built in Postman, featuring hierarchical test inheritance, local mock service emulation, and batch execution via Postman Collection Runner and Newman CLI.

## Key Highlights
- **Hierarchical Script Architecture:** Implemented universal baseline assertions (HTTP 200, SLA < 500ms, Content-Type verification) at the Collection level to run automatically across all endpoints without redundancy.
- **Contract & Payload Validation:** Granular schema checks on targeted endpoints (`/airports`) verifying nested JSON structures, country properties, and query-match data integrity.
- **Independent Mock Server:** Configured a lightweight Node.js mock service to simulate API responses for isolated regression verification.
- **Automated Execution:** 100% test pass rate across all suite iterations.

## Test Architecture
- `GET /airports` - Status, SLA, Content-Type, nested array structure, query param matching (`ATL`)
- `GET /turbulence` - Status, SLA, Content-Type validation
- `GET /forecast` - Status, SLA, Content-Type validation
- `GET /metars` - Status, SLA, Content-Type validation

## How to Run Locally

### 1. Start the Mock Server
```bash
node mock-server.js

Run via Newman (CLI Automation)

npm install -g newman
newman run PostAir_Weather_API.postman_collection.json -e PostAirTesting.postman_environment.json