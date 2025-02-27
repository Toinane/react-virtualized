import _createClass from "@babel/runtime/helpers/createClass";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
import PropTypes from 'prop-types';
import * as React from 'react';
import defaultHeaderRenderer from './defaultHeaderRenderer';
import defaultCellRenderer from './defaultCellRenderer';
import defaultCellDataGetter from './defaultCellDataGetter';
import SortDirection from './SortDirection';

/**
 * Describes the header and cell contents of a table column.
 */
var Column = /*#__PURE__*/function (_React$Component) {
  _inherits(Column, _React$Component);
  var _super = _createSuper(Column);
  function Column() {
    _classCallCheck(this, Column);
    return _super.apply(this, arguments);
  }
  return _createClass(Column);
}(React.Component);
_defineProperty(Column, "defaultProps", {
  cellDataGetter: defaultCellDataGetter,
  cellRenderer: defaultCellRenderer,
  defaultSortDirection: SortDirection.ASC,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: defaultHeaderRenderer,
  style: {}
});
export { Column as default };
Column.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Optional aria-label value to set on the column header */
  'aria-label': PropTypes.string,
  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * ({ columnData: any, dataKey: string, rowData: any }): any
   */
  cellDataGetter: PropTypes.func,
  /**
   * Callback responsible for rendering a cell's contents.
   * ({ cellData: any, columnData: any, dataKey: string, rowData: any, rowIndex: number }): node
   */
  cellRenderer: PropTypes.func,
  /** Optional CSS class to apply to cell */
  className: PropTypes.string,
  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: PropTypes.object,
  /** Uniquely identifies the row-data attribute corresponding to this cell */
  dataKey: PropTypes.any.isRequired,
  /** Optional direction to be used when clicked the first time */
  defaultSortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC]),
  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: PropTypes.bool,
  /** Flex grow style; defaults to 0 */
  flexGrow: PropTypes.number,
  /** Flex shrink style; defaults to 1 */
  flexShrink: PropTypes.number,
  /** Optional CSS class to apply to this column's header */
  headerClassName: PropTypes.string,
  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: node, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: PropTypes.func.isRequired,
  /** Optional inline style to apply to this column's header */
  headerStyle: PropTypes.object,
  /** Optional id to set on the column header */
  id: PropTypes.string,
  /** Header label for this column */
  label: PropTypes.node,
  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: PropTypes.number,
  /** Minimum width of column. */
  minWidth: PropTypes.number,
  /** Optional inline style to apply to cell */
  style: PropTypes.object,
  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: PropTypes.number.isRequired
} : {};