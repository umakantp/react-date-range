"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const styles = {
  inputRange: 'range',
  inputRangeInput: 'input',
  inputRangeLabel: 'label'
};
const toChangeEvent = value => ({
  target: {
    value
  }
});
describe('InputRangeField tests', () => {
  test('Should parse input value to number', () => {
    const onChange = jest.fn();
    const wrapper = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      label: "Input label",
      placeholder: "Placeholder",
      styles: styles,
      onChange: onChange,
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText('Placeholder'), toChangeEvent('3'));
    expect(onChange).lastCalledWith(3);
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText('Placeholder'), toChangeEvent(12));
    expect(onChange).lastCalledWith(12);
    // fireEvent.change(screen.getByPlaceholderText('Placeholder'), toChangeEvent(''));
    // expect(onChange).lastCalledWith(0);
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText('Placeholder'), toChangeEvent('invalid number'));
    expect(onChange).lastCalledWith(0);
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText('Placeholder'), toChangeEvent(-12));
    expect(onChange).lastCalledWith(0);
    _react2.fireEvent.change(_react2.screen.getByPlaceholderText('Placeholder'), toChangeEvent(99999999));
    expect(onChange).lastCalledWith(99999);
    expect(onChange).toHaveBeenCalledTimes(5);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should rerender when props change', () => {
    const wrapper = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 12,
      placeholder: "Placeholder",
      label: "Input label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    expect(_react2.screen.getByPlaceholderText('Placeholder').className).toEqual(styles.inputRangeInput);
    expect(_react2.screen.getByText('Input label').className).toEqual(styles.inputRangeLabel);
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('12');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('Input label')).toBeInTheDocument();
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "Placeholder",
      label: "Input label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('Input label')).toBeInTheDocument();
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "-",
      label: "Input label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('-').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('-').placeholder).toEqual('-');
    expect(_react2.screen.getByText('Input label')).toBeInTheDocument();
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "Placeholder",
      label: "Label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('Label')).toBeInTheDocument();
  });
  test('Should render the label as a Component', () => {
    const Label = () => /*#__PURE__*/_react.default.createElement("span", {
      className: "input-range-field-label"
    }, "Input label 2");
    const wrapper = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 12,
      placeholder: "Placeholder",
      label: /*#__PURE__*/_react.default.createElement(Label, null),
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('12');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('Input label 2')).toBeInTheDocument();
    expect(_react2.screen.getByText('Input label 2')).toBeInTheDocument();
    expect(_react2.screen.getByText('Input label 2').className).toEqual('input-range-field-label');
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "Placeholder",
      label: /*#__PURE__*/_react.default.createElement(Label, null),
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('Input label 2')).toBeInTheDocument();
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "-",
      label: /*#__PURE__*/_react.default.createElement(Label, null),
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('-').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('-').placeholder).toEqual('-');
    expect(_react2.screen.getByText('Input label 2')).toBeInTheDocument();
    wrapper.rerender( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 32,
      placeholder: "Placeholder",
      label: "New label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }), {
      container: wrapper.container
    });
    expect(_react2.screen.getByPlaceholderText('Placeholder').value).toEqual('32');
    expect(_react2.screen.getByPlaceholderText('Placeholder').placeholder).toEqual('Placeholder');
    expect(_react2.screen.getByText('New label')).toBeInTheDocument();
  });
});