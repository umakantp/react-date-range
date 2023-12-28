"use strict";

var _dateFns = _interopRequireDefault(require("date-fns"));
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const endDate = new Date();
const startDate = _dateFns.default.subDays(endDate, 7);
const commonProps = {
  ranges: [{
    startDate,
    endDate,
    key: 'selection'
  }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
  focusedRange: [(0, _utils.findNextRangeIndex)([{
    startDate,
    endDate,
    key: 'selection'
  }]), 0],
  disabledDates: []
};
const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect(_dateFns.default.isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};
describe('DateRange', () => {
  test('Should resolve', () => {
    expect(_DateRange.default).toEqual(expect.anything());
  });
  test('calculate new selection by resetting end date', () => {
    const methodResult = (0, _utils.calcNewSelection)(_dateFns.default.subDays(endDate, 10), true, commonProps.focusedRange, commonProps.ranges, commonProps.onChange, undefined, commonProps.moveRangeOnFirstSelection, false, commonProps.disabledDates);
    compareRanges(methodResult.range, {
      startDate: _dateFns.default.subDays(endDate, 10),
      endDate: _dateFns.default.subDays(endDate, 10)
    });
  });
  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = (0, _utils.calcNewSelection)(_dateFns.default.addDays(endDate, 2), true, commonProps.focusedRange, commonProps.ranges, commonProps.onChange, undefined, commonProps.moveRangeOnFirstSelection, false, commonProps.disabledDates);
    compareRanges(methodResult.range, {
      startDate: _dateFns.default.addDays(endDate, 2),
      endDate: _dateFns.default.addDays(endDate, 2)
    });
  });
  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    const methodResult = (0, _utils.calcNewSelection)(_dateFns.default.subDays(endDate, 10), true, commonProps.focusedRange, commonProps.ranges, commonProps.onChange, undefined, true, false, commonProps.disabledDates);
    compareRanges(methodResult.range, {
      startDate: _dateFns.default.subDays(endDate, 10),
      endDate: _dateFns.default.subDays(endDate, 3)
    });
  });
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    const methodResult = (0, _utils.calcNewSelection)(_dateFns.default.subDays(endDate, 10), true, commonProps.focusedRange, commonProps.ranges, commonProps.onChange, undefined, commonProps.moveRangeOnFirstSelection, true, commonProps.disabledDates);
    compareRanges(methodResult.range, {
      startDate: _dateFns.default.subDays(endDate, 10),
      endDate
    });
  });
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    const methodResult = (0, _utils.calcNewSelection)(_dateFns.default.subDays(endDate, 10), true, [(0, _utils.findNextRangeIndex)([{
      ...commonProps.ranges[0],
      endDate: null
    }]), 0], [{
      ...commonProps.ranges[0],
      endDate: null
    }], commonProps.onChange, undefined, commonProps.moveRangeOnFirstSelection, true, commonProps.disabledDates);
    compareRanges(methodResult.range, {
      startDate: _dateFns.default.subDays(endDate, 10),
      endDate: null
    });
  });
});