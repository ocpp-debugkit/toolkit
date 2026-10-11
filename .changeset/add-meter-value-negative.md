---
'@ocpp-debugkit/toolkit': patch
---

meter-value-negative: add a scenario that drives the negative branch of METER_VALUE_ANOMALY. The register reads -50 Wh, which is physically impossible, so the rule fires. meter-anomaly only covers the decreasing branch, so this is the missing half.
