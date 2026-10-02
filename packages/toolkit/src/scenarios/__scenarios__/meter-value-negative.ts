export default {
  name: 'meter-value-negative',
  description:
    'Cumulative energy register goes negative during a transaction. A negative reading is physically impossible and triggers METER_VALUE_ANOMALY.',
  trace: {
    traceId: 'scenario-meter-value-negative',
    metadata: {
      stationId: 'CS-SYNTHETIC-025',
      ocppVersion: '1.6',
      source: 'synthetic-scenario',
      description:
        'Station reports a negative cumulative register (-50 Wh) — the register can never go below zero.',
    },
    events: [
      {
        timestamp: '2026-03-01T09:00:00.000Z',
        direction: 'CS_TO_CSMS',
        message: [
          2,
          'msg-001',
          'BootNotification',
          {
            chargePointVendor: 'SyntheticVendor',
            chargePointModel: 'SM-100',
            chargePointSerialNumber: 'CS-SYNTHETIC-025',
            firmwareVersion: '1.0.0',
          },
        ],
      },
      {
        timestamp: '2026-03-01T09:00:00.500Z',
        direction: 'CSMS_TO_CS',
        message: [3, 'msg-001', { currentTime: '2026-03-01T09:00:00.500Z', interval: 300, status: 'Accepted' }],
      },
      {
        timestamp: '2026-03-01T09:00:30.000Z',
        direction: 'CS_TO_CSMS',
        message: [2, 'msg-002', 'Authorize', { idTag: 'SYNTHETIC-TAG-025' }],
      },
      {
        timestamp: '2026-03-01T09:00:30.500Z',
        direction: 'CSMS_TO_CS',
        message: [3, 'msg-002', { idTagInfo: { status: 'Accepted' } }],
      },
      {
        timestamp: '2026-03-01T09:01:00.000Z',
        direction: 'CS_TO_CSMS',
        message: [
          2,
          'msg-003',
          'StartTransaction',
          { connectorId: 1, idTag: 'SYNTHETIC-TAG-025', meterStart: 0 },
        ],
      },
      {
        timestamp: '2026-03-01T09:01:00.500Z',
        direction: 'CSMS_TO_CS',
        message: [3, 'msg-003', { idTagInfo: { status: 'Accepted' }, transactionId: 100025 }],
      },
      {
        timestamp: '2026-03-01T09:02:00.000Z',
        direction: 'CS_TO_CSMS',
        message: [
          2,
          'msg-004',
          'MeterValues',
          {
            connectorId: 1,
            transactionId: 100025,
            meterValue: [
              {
                sampledValue: [
                  { value: '-50', measurand: 'Energy.Active.Import.Register', unit: 'Wh' },
                ],
              },
            ],
          },
        ],
      },
      {
        timestamp: '2026-03-01T09:02:00.500Z',
        direction: 'CSMS_TO_CS',
        message: [3, 'msg-004', {}],
      },
      {
        timestamp: '2026-03-01T09:05:00.000Z',
        direction: 'CS_TO_CSMS',
        message: [
          2,
          'msg-005',
          'StopTransaction',
          {
            transactionId: 100025,
            idTag: 'SYNTHETIC-TAG-025',
            meterStop: 0,
            reason: 'Local',
          },
        ],
      },
      {
        timestamp: '2026-03-01T09:05:00.500Z',
        direction: 'CSMS_TO_CS',
        message: [3, 'msg-005', { idTagInfo: { status: 'Accepted' } }],
      },
    ],
  },
  expectedFailures: ['METER_VALUE_ANOMALY'],
  assertions: [
    {
      type: 'failure_count',
      params: { code: 'METER_VALUE_ANOMALY', min: 1 },
    },
  ],
};
