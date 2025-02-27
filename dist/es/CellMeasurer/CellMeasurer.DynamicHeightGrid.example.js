import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import CellMeasurer from './CellMeasurer';
import CellMeasurerCache from './CellMeasurerCache';
import Grid from '../Grid';
import styles from './CellMeasurer.example.css';
var DynamicHeightGrid = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DynamicHeightGrid, _React$PureComponent);
  var _super = _createSuper(DynamicHeightGrid);
  function DynamicHeightGrid(props, context) {
    var _this;
    _classCallCheck(this, DynamicHeightGrid);
    _this = _super.call(this, props, context);
    _this._cache = new CellMeasurerCache({
      defaultWidth: 150,
      fixedWidth: true
    });
    _this._cellRenderer = _this._cellRenderer.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(DynamicHeightGrid, [{
    key: "render",
    value: function render() {
      var width = this.props.width;
      return /*#__PURE__*/React.createElement(Grid, {
        className: styles.BodyGrid,
        columnCount: 50,
        columnWidth: 150,
        deferredMeasurementCache: this._cache,
        height: 400,
        overscanColumnCount: 0,
        overscanRowCount: 2,
        cellRenderer: this._cellRenderer,
        rowCount: 1000,
        rowHeight: this._cache.rowHeight,
        width: width
      });
    }
  }, {
    key: "_cellRenderer",
    value: function _cellRenderer(_ref) {
      var columnIndex = _ref.columnIndex,
        key = _ref.key,
        parent = _ref.parent,
        rowIndex = _ref.rowIndex,
        style = _ref.style;
      var _this$props = this.props,
        getClassName = _this$props.getClassName,
        getContent = _this$props.getContent,
        list = _this$props.list;
      var datum = list.get((rowIndex + columnIndex) % list.size);
      var classNames = getClassName({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });
      var content = getContent({
        index: rowIndex,
        datum: datum
      });
      return /*#__PURE__*/React.createElement(CellMeasurer, {
        cache: this._cache,
        columnIndex: columnIndex,
        key: key,
        parent: parent,
        rowIndex: rowIndex
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames,
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: 150
        })
      }, content));
    }
  }]);
  return DynamicHeightGrid;
}(React.PureComponent);
export { DynamicHeightGrid as default };
DynamicHeightGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  getClassName: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  width: PropTypes.number.isRequired
} : {};