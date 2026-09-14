Create a complete and production-ready IBM Operational Decision Manager (ODM) rule project
designed to validate financial transactions based on geolocation data.
Place ALL generated project files inside a new subfolder named
`Geolocation_Fraud_Detection/` relative to the current workspace root.

The project must include the following components:

### Business Object Model (BOM)
Define a comprehensive data model with the following classes and attributes:

| Class       | Key Attributes                                                                                      |
|-------------|-----------------------------------------------------------------------------------------------------|
| Transaction | transactionId, amount, currency, timestamp, merchantLocation, fraudDecision, riskScore, reasonCode |
| Customer    | customerId, homeCountry, previousTransactionLocation, transactionHistory                           |
| Location    | latitude, longitude, country, city, ipAddress                                                      |
| DeviceInfo  | deviceFingerprint, isVpn, isProxy, isTor, deviceType                                              |
| RiskScore   | score, confidenceLevel, triggeredRules, recommendedAction                                          |

### Rule Artifacts
Develop business rules and decision tables covering these fraud detection scenarios:

1. **Impossible Travel Detection** — flag transactions where the geographic distance between
   two consecutive transactions cannot be physically covered within the elapsed time.
2. **High-Risk Country Validation** — cross-reference transaction origin against a configurable
   list of high-risk or sanctioned countries.
3. **IP Address / Physical Location Mismatch** — detect discrepancies between IP geolocation
   and the point-of-sale or merchant location.
4. **Unusual Transaction Corridor** — identify transactions in geographic regions where the
   customer has no prior transaction history.
5. **Velocity Checks** — detect multiple transactions originating from different countries
   within a configurable time window.
6. **Card-Present vs. Card-Not-Present Location Anomaly** — validate whether the physical
   card location aligns with the transaction origin.

### Rule Flow
Design a sequential and conditional ruleflow with these four phases:

| Step | Task                      | Execution Mode | Rule Package               |
|------|---------------------------|----------------|----------------------------|
| 1    | Data Enrichment           | Fastpath       | `data-enrichment`          |
| 2    | Geolocation Pre-Screening | RetePlus       | `geolocation-prescreening` |
| 3    | Risk Scoring              | RetePlus       | `risk-scoring`             |
| 4    | Fraud Decision            | Fastpath       | `fraud-decision`           |

### Decision Service
Expose the rule project as a deployable RuleApp with a RESTful decision service endpoint.
The service accepts a JSON transaction payload and returns:
- fraud decision (`APPROVE` / `REVIEW` / `DECLINE`)
- risk score and confidence level
- triggered rule names
- reason code and recommended action

### Verbalization & Governance
Write all rules using ODM Business Action Language (BAL) natural-language verbalization so
that business analysts can read, modify, and govern rules without developer intervention.
Include rule documentation, metadata tags, and version control annotations.

### Testing
Provide a complete test suite covering:
- True positive fraud cases
- True negative legitimate transactions
- Edge cases (e.g. border-crossing transactions)
- Regression tests for each geolocation rule category

### Build Validation
After generating all project files, validate the project using the ODM Build Command CLI.

**The rules-compiler.jar is already present at:**
```
files/buildcommand/rules-compiler/rules-compiler.jar
```
Do NOT search for it elsewhere and do NOT download it via Docker.

Create the build properties file at:
```
Geolocation_Fraud_Detection/buildcommand/samples/config-files/Geolocation_Fraud_Detection.properties
```
with this content:
```
project = ../../../Geolocation_Fraud_Detection
output = ../../../Geolocation_Fraud_Detection/output
dep = Geolocation_Fraud_Detection
xom-classpath = ../../../geolocation-fraud-xom/geolocation-fraud-xom-1.0.0.jar
```

Then run the build from inside the `Geolocation_Fraud_Detection/` subfolder:
```
cd Geolocation_Fraud_Detection/buildcommand/samples/config-files && \
  java -jar ../../../../files/buildcommand/rules-compiler/rules-compiler.jar \
  -config Geolocation_Fraud_Detection.properties
```

Repeat the fix-and-rebuild cycle until exit code is 0.
