"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var dateFns = _interopRequireWildcard(require("date-fns"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DateInput extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "isValid", value => {
      return {
        isValidFormat: dateFns.isValid(value),
        isInRange: this.props.isDateInRange(value)
      };
    });
    _defineProperty(this, "onKeyDown", e => {
      const {
        value
      } = this.state;
      if (e.key === 'Enter') {
        this.update(value);
      }
    });
    _defineProperty(this, "onChange", e => {
      this.setState({
        value: e.target.value,
        changed: true,
        invalid: {
          invalidFormat: false,
          outOfRange: false
        }
      });
    });
    _defineProperty(this, "onBlur", () => {
      const {
        value
      } = this.state;
      this.update(value);
    });
    this.state = {
      invalid: {
        invalidFormat: false,
        outOfRange: false
      },
      changed: false,
      value: this.formatDate(props)
    };
  }
  componentDidUpdate(prevProps) {
    const {
      value
    } = prevProps;
    if (!dateFns.isEqual(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props)
      });
    }
  }
  formatDate(_ref) {
    let {
      value,
      dateDisplayFormat,
      dateOptions
    } = _ref;
    if (value) {
      const {
        isInRange,
        isValidFormat
      } = this.isValid(value);
      if (isInRange && isValidFormat) {
        return dateFns.format(value, dateDisplayFormat, dateOptions);
      }
    }
    return '';
  }
  update(value) {
    const {
      invalid: {
        invalidFormat,
        outOfRange
      },
      changed
    } = this.state;
    if (invalidFormat || outOfRange || !changed || !value) {
      return;
    }
    const {
      onChange,
      dateDisplayFormat,
      dateOptions
    } = this.props;
    const parsed = dateFns.parse(value, dateDisplayFormat, new Date(), dateOptions);
    const {
      isInRange,
      isValidFormat
    } = this.isValid(parsed);
    if (isInRange && isValidFormat) {
      this.setState({
        changed: false
      }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: {
          invalidFormat: !isValidFormat,
          outOfRange: !isInRange
        }
      });
    }
  }
  render() {
    const {
      className,
      readOnly,
      placeholder,
      ariaLabel,
      disabled,
      onFocus
    } = this.props;
    const {
      value,
      invalid: {
        invalidFormat,
        outOfRange
      }
    } = this.state;
    const tooltipWarningMessage = invalidFormat ? 'The date format is invalid' : outOfRange ? 'The date is out of range' : '';
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)({
        rdrInvalidDateInput: invalidFormat || outOfRange
      }, 'rdrDateInput', className)
    }, /*#__PURE__*/_react.default.createElement("input", {
      readOnly: readOnly,
      disabled: disabled,
      value: value,
      placeholder: placeholder,
      "aria-label": ariaLabel,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: onFocus
    }), (invalidFormat || outOfRange) && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrWarning"
    }, "\u26A0"), tooltipWarningMessage && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrTooltipWarning"
    }, tooltipWarningMessage));
  }
}
DateInput.propTypes = {
  value: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dateOptions: _propTypes.default.object,
  dateDisplayFormat: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  isDateInRange: _propTypes.default.func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = exports.default = DateInput;