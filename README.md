# PostAir Weather API – Automated Error Handling & Regression Suite

![API Tests](https://github.com/xfxradeon/PostAir-Weather-API-postair-api-error-handling-suite/actions/workflows/api-tests.yml/badge.svg)

An automated API test suite built in Postman, featuring hierarchical baseline assertions, RFC 7807 Problem Details schema validation, local Node.js mock service emulation, and a headless CI/CD execution pipeline powered by GitHub Actions and Newman.

---

### Key Highlights

* **Hierarchical Test Architecture:** Universal operational constraints (response SLA < 500ms, JSON content-type verification) run automatically at the Collection level, while endpoint-level scripts conditionally evaluate granular payload structures.
* **RFC 7807 Error Contract Compliance:** Validates problem detail schemas (`type`, `title`, `status`, `detail`, `instance`, `correlationId`) and enforces the standard `application/problem+json` media type across negative test paths.
* **Negative Scenario Coverage:** Evaluates negative client and server behaviors including `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, and `500 Internal Server Error`.
* **Isolated Mock Server:** Implements an independent, zero-dependency Node.js mock service with `/health` diagnostic endpoints and dynamic query/header-based failure triggers.
* **Data Leakage & Security Checks:** Explicitly validates that authentication keys (`x-api-key`) and server internals (`node_modules`, stack traces) are not exposed in error bodies.
* **Continuous Integration:** Fully automated headless testing pipeline via GitHub Actions using Newman and `htmlextra` report generation.

---

### Test Coverage Matrix

| HTTP Status | Scenario Trigger | Key Assertions & Validations |
| :--- | :--- | :--- |
| **`200 OK`** | Standard query (`airportCode=ATL`) | SLA verification, nested array traversal, airport code validation |
| **`401 Unauthorized`** | Missing or invalid `x-api-key` header | `application/problem+json`, credentials message, no credential leakage |
| **`403 Forbidden`** | Restricted header or `role=restricted` | Problem Details schema validation, permission denial detail check |
| **`404 Not Found`** | Missing airport (`airportCode=ZZZ`) | Schema keys validation, resource-missing descriptive message |
| **`500 Server Error`** | Diagnostic trigger (`TRIGGER_500`) | Internal error masking, stack trace exclusion, non-empty `correlationId` |

---

### Repository Structure

```text
├── .github/workflows/
│   └── api-tests.yml                            # GitHub Actions CI/CD automation workflow
├── mock-server.js                               # Local Node.js API mock engine with /health
├── PostAir Weather API.postman_collection.json  # Postman test collection with assertion scripts
├── PostAirTesting.postman_environment.json      # Environment configuration file
└── README.md                                    # Project documentation
