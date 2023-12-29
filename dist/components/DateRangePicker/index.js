"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("../../styles"));
var _utils = require("../../utils");
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class DateRangePicker extends _react.Component {
  constructor(props) {
    super(props);
    const ranges = (0, _utils.restrictMinMaxDate)(props.ranges, props.minDate, props.maxDate);
    this.state = {
      focusedRange: [(0, _utils.findNextRangeIndex)(ranges), 0]
    };
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
  }
  render() {
    const {
      focusedRange
    } = this.state;
    const ranges = (0, _utils.restrictMinMaxDate)(this.props.ranges, this.props.minDate, this.props.maxDate);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.dateRangePickerWrapper, this.props.className)
    }, /*#__PURE__*/_react.default.createElement(_DefinedRange.default, _extends({
      focusedRange: focusedRange,
      onPreviewChange: value => this.dateRange.updatePreview(value ? this.dateRange.calcNewSelection(value, typeof value === 'string') : null)
    }, this.props, {
      range: ranges[focusedRange[0]],
      className: undefined
    })), /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({
      onRangeFocusChange: focusedRange => this.setState({
        focusedRange
      }),
      focusedRange: focusedRange
    }, this.props, {
      ranges: ranges,
      ref: t => this.dateRange = t,
      className: undefined
    })));
  }
}
DateRangePicker.defaultProps = {};
DateRangePicker.propTypes = {
  ..._DateRange.default.propTypes,
  ..._DefinedRange.default.propTypes,
  className: _propTypes.default.string
};
var _default = exports.default = DateRangePicker;