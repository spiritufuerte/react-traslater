const {
  chooseCoefficientSpeed,
  calculatePercent,
  calculatePrice,
  calculateWorkDuration,
  calculateResultDate,
} = require('./calculateResultDate');

const moment = require('moment-timezone');

describe('chooseCoefficientSpeed', () => {
  test.each`
    language     | result
    ${'ru'}      | ${{ coefficient: 0.05, speed: 1333 }}
    ${'uk'}      | ${{ coefficient: 0.05, speed: 1333 }}
    ${'en'}      | ${{ coefficient: 0.12, speed: 333 }}
    ${undefined} | ${{}}
  `('chooseCoefficientSpeed__table', ({ language, result }) => {
    expect(chooseCoefficientSpeed(language)).toMatchObject(result);
  });
});

describe('calculatePercent', () => {
  test.each`
    value  | format       | result
    ${100} | ${'doc'}     | ${100}
    ${100} | ${'docx'}    | ${100}
    ${100} | ${'rtf'}     | ${100}
    ${100} | ${undefined} | ${100}
    ${100} | ${'pdf'}     | ${120}
  `('calculatePercent__table', ({ value, format, result }) => {
    expect(calculatePercent(value, format)).toBe(result);
  });
});

describe('calculatePrice', () => {
  test.each`
    length   | language | coefficient | format       | result
    ${1000}  | ${'ru'}  | ${0.05}     | ${undefined} | ${'50.00'}
    ${1000}  | ${'uk'}  | ${0.05}     | ${undefined} | ${'50.00'}
    ${1000}  | ${'en'}  | ${0.12}     | ${undefined} | ${'120.00'}
    ${10000} | ${'en'}  | ${0.12}     | ${undefined} | ${'1200.00'}
    ${10000} | ${'en'}  | ${0.12}     | ${'pdf'}     | ${'1440.00'}
    ${10000} | ${'uk'}  | ${0.05}     | ${'pdf'}     | ${'600.00'}
    ${10000} | ${'uk'}  | ${0.05}     | ${undefined} | ${'500.00'}
  `(
    'calculatePrice__table',
    ({ length, language, coefficient, format, result }) => {
      expect(calculatePrice(length, language, coefficient, format)).toBe(
        result,
      );
    },
  );
});

describe('calculateWorkDuration', () => {
  test.each`
    length   | speed   | format       | duration
    ${999}   | ${333}  | ${undefined} | ${'3:30'}
    ${10000} | ${1000} | ${undefined} | ${'10:30'}
    ${10000} | ${1000} | ${'doc'}     | ${'10:30'}
    ${10000} | ${1000} | ${'pdf'}     | ${'12:36'}
  `('calculateWorkDuration__table', ({ length, speed, format, duration }) => {
    const [h, m] = duration.split(':');
    const durationMs = (+h * 60 * 60 + +m * 60) * 1000;
    expect(calculateWorkDuration(length, speed, format)).toBe(durationMs);
  });
});

describe('calculateResultDate', () => {
  test.each`
    startTime                        | durationHours | expectedResult
    ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
    ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
    ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
    ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
    ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
    ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
    ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
    ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
    ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
    ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
    ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
    ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
    ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
    ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
  `(
    'calculateResultDate__table',
    ({ startTime, durationHours, expectedResult }) => {
      const startTimeMs = moment(startTime, 'DD/MM/YYYY HH:mm dddd').valueOf();
      const durationMs = 60 * 60 * 1000 * durationHours;
      const expectedResult_ms = moment(
        expectedResult,
        'DD/MM/YYYY HH:mm dddd',
      ).valueOf();

      expect(calculateResultDate(startTimeMs, durationMs)).toBe(
        expectedResult_ms,
      );
    },
  );
});
