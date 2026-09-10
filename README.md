!\[API Tests](https://github.com/xfxradeon/PostAir-Weather-API-postair-api-error-handling-suite/actions/workflows/api-tests.yml/badge.svg)

PostAir Weather API – Automated Error Handling \& Negative Test Suite
===

An automated API test suite built in Postman, featuring hierarchical baseline validation, RFC 7807 Problem Details contract assertions, and local Node.js mock emulation for positive and negative API response paths.

# Key Highlights

* Hierarchical Test Architecture: Universal operational constraints (response time SLA < 500ms, generic JSON content negotiation) run at the Collection level, while endpoint-specific logic dynamically asserts response status and structure.
* RFC 7807 Compliance: Granular contract checks on error payloads ensuring structured problem details (type, title, status, detail, instance, correlationId) and media type compliance (application/problem+json).
* Comprehensive Negative Scenario Coverage: Emulates and validates specific failure modes including 401 Unauthorized, 403 Forbidden, 404 Not Found, and 500 Internal Server Error.
* Isolated Local Mock Engine: Built an independent Node.js mock server that mirrors the PostAir API contract, supporting query and header triggers without cloud service dependencies.
* Sensitive Data Protection: Verifies security controls by confirming that authentication headers and internal runtime traces are never exposed in error responses.

# Project Structure

* Local Node.js API mock engine
mock-server.js
* Postman test collection with hierarchical scripts
PostAir\_Weather\_API.postman\_collection.json
* Postman environment configuration
PostAirTesting.postman\_environment.json

# How to Run Locally

* node mock-server.js
* npm install -g newman
* newman run PostAir\_Weather\_API.postman\_collection.json -e PostAirTesting.postman\_environment.json

