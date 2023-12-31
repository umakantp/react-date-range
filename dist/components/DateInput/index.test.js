"use strict";

var _react = require("@testing-library/react");
var _react2 = _interopRequireDefault(require("react"));
var _index = _interopRequireDefault(require("./index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const date = new Date('01/01/2021');
describe('DateInput tests', () => {
  const onChange = jest.fn();
  const onFocus = jest.fn();
  test('Should set invalidFormat in state to true', () => {
    const isDateInRange = jest.fn();
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy',
      placeholder: "Date input"
    }));
    _react.fireEvent.change(_react.screen.getByPlaceholderText('Date input'), {
      target: {
        value: 'fooo'
      }
    });
    _react.fireEvent.keyDown(_react.screen.getByPlaceholderText('Date input'), {
      key: 'Enter'
    });
    expect(_react.screen.getByText('The date format is invalid')).toBeInTheDocument();
  });
  test('Should set outOfRange in state to true', () => {
    const isDateInRange = jest.fn(() => false);
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy',
      placeholder: "Date input"
    }));
    _react.fireEvent.change(_react.screen.getByPlaceholderText('Date input'), {
      target: {
        value: 'Dec 8, 2021'
      }
    });
    _react.fireEvent.keyDown(_react.screen.getByPlaceholderText('Date input'), {
      key: 'Enter'
    });
    expect(_react.screen.getByText('The date is out of range')).toBeInTheDocument();
  });
  test('Should call this.props.onChange if valid date', () => {
    const isDateInRange = jest.fn(() => true);
    (0, _react.render)( /*#__PURE__*/_react2.default.createElement(_index.default, {
      readOnly: false,
      disabled: false,
      value: date,
      onChange: onChange,
      onFocus: onFocus,
      isDateInRange: isDateInRange,
      dateDisplayFormat: 'MMM d, yyyy',
      placeholder: "Date input"
    }));
    _react.fireEvent.change(_react.screen.getByPlaceholderText('Date input'), {
      target: {
        value: 'Dec 8, 2021'
      }
    });
    _react.fireEvent.keyDown(_react.screen.getByPlaceholderText('Date input'), {
      key: 'Enter'
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});