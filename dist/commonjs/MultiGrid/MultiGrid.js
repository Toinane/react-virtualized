"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _reactLifecyclesCompat = require("react-lifecycles-compat");
var _CellMeasurerCacheDecorator = _interopRequireDefault(require("./CellMeasurerCacheDecorator"));
var _Grid = _interopRequireDefault(require("../Grid"));
var _excluded = ["rowIndex"],
  _excluded2 = ["columnIndex", "rowIndex"],
  _excluded3 = ["columnIndex"],
  _excluded4 = ["onScroll", "onSectionRendered", "onScrollbarPresenceChange", "scrollLeft", "scrollToColumn", "scrollTop", "scrollToRow"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SCROLLBAR_SIZE_BUFFER = 20;

/**
 * Renders 1, 2, or 4 Grids depending on configuration.
 * A main (body) Grid will always be rendered.
 * Optionally, 1-2 Grids for sticky header rows will also be rendered.
 * If no sticky columns, only 1 sticky header Grid will be rendered.
 * If sticky columns, 2 sticky header Grids will be rendered.
 */
var MultiGrid = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(MultiGrid, _React$PureComponent);
  var _super = _createSuper(MultiGrid);
  function MultiGrid(props, context) {
    var _this;
    (0, _classCallCheck2["default"])(this, MultiGrid);
    _this = _super.call(this, props, context);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      scrollLeft: 0,
      scrollTop: 0,
      scrollbarSize: 0,
      showHorizontalScrollbar: false,
      showVerticalScrollbar: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_deferredInvalidateColumnIndex", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_deferredInvalidateRowIndex", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_bottomLeftGridRef", function (ref) {
      _this._bottomLeftGrid = ref;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_bottomRightGridRef", function (ref) {
      _this._bottomRightGrid = ref;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_cellRendererBottomLeftGrid", function (_ref) {
      var rowIndex = _ref.rowIndex,
        rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
      var _this$props = _this.props,
        cellRenderer = _this$props.cellRenderer,
        fixedRowCount = _this$props.fixedRowCount,
        rowCount = _this$props.rowCount;
      if (rowIndex === rowCount - fixedRowCount) {
        return /*#__PURE__*/React.createElement("div", {
          key: rest.key,
          style: _objectSpread(_objectSpread({}, rest.style), {}, {
            height: SCROLLBAR_SIZE_BUFFER
          })
        });
      } else {
        return cellRenderer(_objectSpread(_objectSpread({}, rest), {}, {
          parent: (0, _assertThisInitialized2["default"])(_this),
          rowIndex: rowIndex + fixedRowCount
        }));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_cellRendererBottomRightGrid", function (_ref2) {
      var columnIndex = _ref2.columnIndex,
        rowIndex = _ref2.rowIndex,
        rest = (0, _objectWithoutProperties2["default"])(_ref2, _excluded2);
      var _this$props2 = _this.props,
        cellRenderer = _this$props2.cellRenderer,
        fixedColumnCount = _this$props2.fixedColumnCount,
        fixedRowCount = _this$props2.fixedRowCount;
      return cellRenderer(_objectSpread(_objectSpread({}, rest), {}, {
        columnIndex: columnIndex + fixedColumnCount,
        parent: (0, _assertThisInitialized2["default"])(_this),
        rowIndex: rowIndex + fixedRowCount
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_cellRendererTopRightGrid", function (_ref3) {
      var columnIndex = _ref3.columnIndex,
        rest = (0, _objectWithoutProperties2["default"])(_ref3, _excluded3);
      var _this$props3 = _this.props,
        cellRenderer = _this$props3.cellRenderer,
        columnCount = _this$props3.columnCount,
        fixedColumnCount = _this$props3.fixedColumnCount;
      if (columnIndex === columnCount - fixedColumnCount) {
        return /*#__PURE__*/React.createElement("div", {
          key: rest.key,
          style: _objectSpread(_objectSpread({}, rest.style), {}, {
            width: SCROLLBAR_SIZE_BUFFER
          })
        });
      } else {
        return cellRenderer(_objectSpread(_objectSpread({}, rest), {}, {
          columnIndex: columnIndex + fixedColumnCount,
          parent: (0, _assertThisInitialized2["default"])(_this)
        }));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_columnWidthRightGrid", function (_ref4) {
      var index = _ref4.index;
      var _this$props4 = _this.props,
        columnCount = _this$props4.columnCount,
        fixedColumnCount = _this$props4.fixedColumnCount,
        columnWidth = _this$props4.columnWidth;
      var _this$state = _this.state,
        scrollbarSize = _this$state.scrollbarSize,
        showHorizontalScrollbar = _this$state.showHorizontalScrollbar;

      // An extra cell is added to the count
      // This gives the smaller Grid extra room for offset,
      // In case the main (bottom right) Grid has a scrollbar
      // If no scrollbar, the extra space is overflow:hidden anyway
      if (showHorizontalScrollbar && index === columnCount - fixedColumnCount) {
        return scrollbarSize;
      }
      return typeof columnWidth === 'function' ? columnWidth({
        index: index + fixedColumnCount
      }) : columnWidth;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScroll", function (scrollInfo) {
      var scrollLeft = scrollInfo.scrollLeft,
        scrollTop = scrollInfo.scrollTop;
      _this.setState({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      });
      var onScroll = _this.props.onScroll;
      if (onScroll) {
        onScroll(scrollInfo);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScrollbarPresenceChange", function (_ref5) {
      var horizontal = _ref5.horizontal,
        size = _ref5.size,
        vertical = _ref5.vertical;
      var _this$state2 = _this.state,
        showHorizontalScrollbar = _this$state2.showHorizontalScrollbar,
        showVerticalScrollbar = _this$state2.showVerticalScrollbar;
      if (horizontal !== showHorizontalScrollbar || vertical !== showVerticalScrollbar) {
        _this.setState({
          scrollbarSize: size,
          showHorizontalScrollbar: horizontal,
          showVerticalScrollbar: vertical
        });
        var onScrollbarPresenceChange = _this.props.onScrollbarPresenceChange;
        if (typeof onScrollbarPresenceChange === 'function') {
          onScrollbarPresenceChange({
            horizontal: horizontal,
            size: size,
            vertical: vertical
          });
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScrollLeft", function (scrollInfo) {
      var scrollLeft = scrollInfo.scrollLeft;
      _this._onScroll({
        scrollLeft: scrollLeft,
        scrollTop: _this.state.scrollTop
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScrollTop", function (scrollInfo) {
      var scrollTop = scrollInfo.scrollTop;
      _this._onScroll({
        scrollTop: scrollTop,
        scrollLeft: _this.state.scrollLeft
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_rowHeightBottomGrid", function (_ref6) {
      var index = _ref6.index;
      var _this$props5 = _this.props,
        fixedRowCount = _this$props5.fixedRowCount,
        rowCount = _this$props5.rowCount,
        rowHeight = _this$props5.rowHeight;
      var _this$state3 = _this.state,
        scrollbarSize = _this$state3.scrollbarSize,
        showVerticalScrollbar = _this$state3.showVerticalScrollbar;

      // An extra cell is added to the count
      // This gives the smaller Grid extra room for offset,
      // In case the main (bottom right) Grid has a scrollbar
      // If no scrollbar, the extra space is overflow:hidden anyway
      if (showVerticalScrollbar && index === rowCount - fixedRowCount) {
        return scrollbarSize;
      }
      return typeof rowHeight === 'function' ? rowHeight({
        index: index + fixedRowCount
      }) : rowHeight;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_topLeftGridRef", function (ref) {
      _this._topLeftGrid = ref;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_topRightGridRef", function (ref) {
      _this._topRightGrid = ref;
    });
    var deferredMeasurementCache = props.deferredMeasurementCache,
      _fixedColumnCount = props.fixedColumnCount,
      _fixedRowCount = props.fixedRowCount;
    _this._maybeCalculateCachedStyles(true);
    if (deferredMeasurementCache) {
      _this._deferredMeasurementCacheBottomLeftGrid = _fixedRowCount > 0 ? new _CellMeasurerCacheDecorator["default"]({
        cellMeasurerCache: deferredMeasurementCache,
        columnIndexOffset: 0,
        rowIndexOffset: _fixedRowCount
      }) : deferredMeasurementCache;
      _this._deferredMeasurementCacheBottomRightGrid = _fixedColumnCount > 0 || _fixedRowCount > 0 ? new _CellMeasurerCacheDecorator["default"]({
        cellMeasurerCache: deferredMeasurementCache,
        columnIndexOffset: _fixedColumnCount,
        rowIndexOffset: _fixedRowCount
      }) : deferredMeasurementCache;
      _this._deferredMeasurementCacheTopRightGrid = _fixedColumnCount > 0 ? new _CellMeasurerCacheDecorator["default"]({
        cellMeasurerCache: deferredMeasurementCache,
        columnIndexOffset: _fixedColumnCount,
        rowIndexOffset: 0
      }) : deferredMeasurementCache;
    }
    return _this;
  }
  (0, _createClass2["default"])(MultiGrid, [{
    key: "forceUpdateGrids",
    value: function forceUpdateGrids() {
      this._bottomLeftGrid && this._bottomLeftGrid.forceUpdate();
      this._bottomRightGrid && this._bottomRightGrid.forceUpdate();
      this._topLeftGrid && this._topLeftGrid.forceUpdate();
      this._topRightGrid && this._topRightGrid.forceUpdate();
    }

    /** See Grid#invalidateCellSizeAfterRender */
  }, {
    key: "invalidateCellSizeAfterRender",
    value: function invalidateCellSizeAfterRender() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref7$columnIndex = _ref7.columnIndex,
        columnIndex = _ref7$columnIndex === void 0 ? 0 : _ref7$columnIndex,
        _ref7$rowIndex = _ref7.rowIndex,
        rowIndex = _ref7$rowIndex === void 0 ? 0 : _ref7$rowIndex;
      this._deferredInvalidateColumnIndex = typeof this._deferredInvalidateColumnIndex === 'number' ? Math.min(this._deferredInvalidateColumnIndex, columnIndex) : columnIndex;
      this._deferredInvalidateRowIndex = typeof this._deferredInvalidateRowIndex === 'number' ? Math.min(this._deferredInvalidateRowIndex, rowIndex) : rowIndex;
    }

    /** See Grid#measureAllCells */
  }, {
    key: "measureAllCells",
    value: function measureAllCells() {
      this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells();
      this._bottomRightGrid && this._bottomRightGrid.measureAllCells();
      this._topLeftGrid && this._topLeftGrid.measureAllCells();
      this._topRightGrid && this._topRightGrid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */
  }, {
    key: "recomputeGridSize",
    value: function recomputeGridSize() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref8$columnIndex = _ref8.columnIndex,
        columnIndex = _ref8$columnIndex === void 0 ? 0 : _ref8$columnIndex,
        _ref8$rowIndex = _ref8.rowIndex,
        rowIndex = _ref8$rowIndex === void 0 ? 0 : _ref8$rowIndex;
      var _this$props6 = this.props,
        fixedColumnCount = _this$props6.fixedColumnCount,
        fixedRowCount = _this$props6.fixedRowCount;
      var adjustedColumnIndex = Math.max(0, columnIndex - fixedColumnCount);
      var adjustedRowIndex = Math.max(0, rowIndex - fixedRowCount);
      this._bottomLeftGrid && this._bottomLeftGrid.recomputeGridSize({
        columnIndex: columnIndex,
        rowIndex: adjustedRowIndex
      });
      this._bottomRightGrid && this._bottomRightGrid.recomputeGridSize({
        columnIndex: adjustedColumnIndex,
        rowIndex: adjustedRowIndex
      });
      this._topLeftGrid && this._topLeftGrid.recomputeGridSize({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });
      this._topRightGrid && this._topRightGrid.recomputeGridSize({
        columnIndex: adjustedColumnIndex,
        rowIndex: rowIndex
      });
      this._leftGridWidth = null;
      this._topGridHeight = null;
      this._maybeCalculateCachedStyles(true);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props,
        scrollLeft = _this$props7.scrollLeft,
        scrollTop = _this$props7.scrollTop;
      if (scrollLeft > 0 || scrollTop > 0) {
        var newState = {};
        if (scrollLeft > 0) {
          newState.scrollLeft = scrollLeft;
        }
        if (scrollTop > 0) {
          newState.scrollTop = scrollTop;
        }
        this.setState(newState);
      }
      this._handleInvalidatedGridSize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._handleInvalidatedGridSize();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
        onScroll = _this$props8.onScroll,
        onSectionRendered = _this$props8.onSectionRendered,
        onScrollbarPresenceChange = _this$props8.onScrollbarPresenceChange,
        scrollLeftProp = _this$props8.scrollLeft,
        scrollToColumn = _this$props8.scrollToColumn,
        scrollTopProp = _this$props8.scrollTop,
        scrollToRow = _this$props8.scrollToRow,
        rest = (0, _objectWithoutProperties2["default"])(_this$props8, _excluded4);
      this._prepareForRender();

      // Don't render any of our Grids if there are no cells.
      // This mirrors what Grid does,
      // And prevents us from recording inaccurage measurements when used with CellMeasurer.
      if (this.props.width === 0 || this.props.height === 0) {
        return null;
      }

      // scrollTop and scrollLeft props are explicitly filtered out and ignored

      var _this$state4 = this.state,
        scrollLeft = _this$state4.scrollLeft,
        scrollTop = _this$state4.scrollTop;
      return /*#__PURE__*/React.createElement("div", {
        style: this._containerOuterStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: this._containerTopStyle
      }, this._renderTopLeftGrid(rest), this._renderTopRightGrid(_objectSpread(_objectSpread({}, rest), {}, {
        onScroll: onScroll,
        scrollLeft: scrollLeft
      }))), /*#__PURE__*/React.createElement("div", {
        style: this._containerBottomStyle
      }, this._renderBottomLeftGrid(_objectSpread(_objectSpread({}, rest), {}, {
        onScroll: onScroll,
        scrollTop: scrollTop
      })), this._renderBottomRightGrid(_objectSpread(_objectSpread({}, rest), {}, {
        onScroll: onScroll,
        onSectionRendered: onSectionRendered,
        scrollLeft: scrollLeft,
        scrollToColumn: scrollToColumn,
        scrollToRow: scrollToRow,
        scrollTop: scrollTop
      }))));
    }
  }, {
    key: "_getBottomGridHeight",
    value: function _getBottomGridHeight(props) {
      var height = props.height;
      var topGridHeight = this._getTopGridHeight(props);
      return height - topGridHeight;
    }
  }, {
    key: "_getLeftGridWidth",
    value: function _getLeftGridWidth(props) {
      var fixedColumnCount = props.fixedColumnCount,
        columnWidth = props.columnWidth;
      if (this._leftGridWidth == null) {
        if (typeof columnWidth === 'function') {
          var leftGridWidth = 0;
          for (var index = 0; index < fixedColumnCount; index++) {
            leftGridWidth += columnWidth({
              index: index
            });
          }
          this._leftGridWidth = leftGridWidth;
        } else {
          this._leftGridWidth = columnWidth * fixedColumnCount;
        }
      }
      return this._leftGridWidth;
    }
  }, {
    key: "_getRightGridWidth",
    value: function _getRightGridWidth(props) {
      var width = props.width;
      var leftGridWidth = this._getLeftGridWidth(props);
      return width - leftGridWidth;
    }
  }, {
    key: "_getTopGridHeight",
    value: function _getTopGridHeight(props) {
      var fixedRowCount = props.fixedRowCount,
        rowHeight = props.rowHeight;
      if (this._topGridHeight == null) {
        if (typeof rowHeight === 'function') {
          var topGridHeight = 0;
          for (var index = 0; index < fixedRowCount; index++) {
            topGridHeight += rowHeight({
              index: index
            });
          }
          this._topGridHeight = topGridHeight;
        } else {
          this._topGridHeight = rowHeight * fixedRowCount;
        }
      }
      return this._topGridHeight;
    }
  }, {
    key: "_handleInvalidatedGridSize",
    value: function _handleInvalidatedGridSize() {
      if (typeof this._deferredInvalidateColumnIndex === 'number') {
        var columnIndex = this._deferredInvalidateColumnIndex;
        var rowIndex = this._deferredInvalidateRowIndex;
        this._deferredInvalidateColumnIndex = null;
        this._deferredInvalidateRowIndex = null;
        this.recomputeGridSize({
          columnIndex: columnIndex,
          rowIndex: rowIndex
        });
        this.forceUpdate();
      }
    }

    /**
     * Avoid recreating inline styles each render; this bypasses Grid's shallowCompare.
     * This method recalculates styles only when specific props change.
     */
  }, {
    key: "_maybeCalculateCachedStyles",
    value: function _maybeCalculateCachedStyles(resetAll) {
      var _this$props9 = this.props,
        columnWidth = _this$props9.columnWidth,
        enableFixedColumnScroll = _this$props9.enableFixedColumnScroll,
        enableFixedRowScroll = _this$props9.enableFixedRowScroll,
        height = _this$props9.height,
        fixedColumnCount = _this$props9.fixedColumnCount,
        fixedRowCount = _this$props9.fixedRowCount,
        rowHeight = _this$props9.rowHeight,
        style = _this$props9.style,
        styleBottomLeftGrid = _this$props9.styleBottomLeftGrid,
        styleBottomRightGrid = _this$props9.styleBottomRightGrid,
        styleTopLeftGrid = _this$props9.styleTopLeftGrid,
        styleTopRightGrid = _this$props9.styleTopRightGrid,
        width = _this$props9.width;
      var sizeChange = resetAll || height !== this._lastRenderedHeight || width !== this._lastRenderedWidth;
      var leftSizeChange = resetAll || columnWidth !== this._lastRenderedColumnWidth || fixedColumnCount !== this._lastRenderedFixedColumnCount;
      var topSizeChange = resetAll || fixedRowCount !== this._lastRenderedFixedRowCount || rowHeight !== this._lastRenderedRowHeight;
      if (resetAll || sizeChange || style !== this._lastRenderedStyle) {
        this._containerOuterStyle = _objectSpread({
          height: height,
          overflow: 'visible',
          // Let :focus outline show through
          width: width
        }, style);
      }
      if (resetAll || sizeChange || topSizeChange) {
        this._containerTopStyle = {
          height: this._getTopGridHeight(this.props),
          position: 'relative',
          width: width
        };
        this._containerBottomStyle = {
          height: height - this._getTopGridHeight(this.props),
          overflow: 'visible',
          // Let :focus outline show through
          position: 'relative',
          width: width
        };
      }
      if (resetAll || styleBottomLeftGrid !== this._lastRenderedStyleBottomLeftGrid) {
        this._bottomLeftGridStyle = _objectSpread({
          left: 0,
          overflowX: 'hidden',
          overflowY: enableFixedColumnScroll ? 'auto' : 'hidden',
          position: 'absolute'
        }, styleBottomLeftGrid);
      }
      if (resetAll || leftSizeChange || styleBottomRightGrid !== this._lastRenderedStyleBottomRightGrid) {
        this._bottomRightGridStyle = _objectSpread({
          left: this._getLeftGridWidth(this.props),
          position: 'absolute'
        }, styleBottomRightGrid);
      }
      if (resetAll || styleTopLeftGrid !== this._lastRenderedStyleTopLeftGrid) {
        this._topLeftGridStyle = _objectSpread({
          left: 0,
          overflowX: 'hidden',
          overflowY: 'hidden',
          position: 'absolute',
          top: 0
        }, styleTopLeftGrid);
      }
      if (resetAll || leftSizeChange || styleTopRightGrid !== this._lastRenderedStyleTopRightGrid) {
        this._topRightGridStyle = _objectSpread({
          left: this._getLeftGridWidth(this.props),
          overflowX: enableFixedRowScroll ? 'auto' : 'hidden',
          overflowY: 'hidden',
          position: 'absolute',
          top: 0
        }, styleTopRightGrid);
      }
      this._lastRenderedColumnWidth = columnWidth;
      this._lastRenderedFixedColumnCount = fixedColumnCount;
      this._lastRenderedFixedRowCount = fixedRowCount;
      this._lastRenderedHeight = height;
      this._lastRenderedRowHeight = rowHeight;
      this._lastRenderedStyle = style;
      this._lastRenderedStyleBottomLeftGrid = styleBottomLeftGrid;
      this._lastRenderedStyleBottomRightGrid = styleBottomRightGrid;
      this._lastRenderedStyleTopLeftGrid = styleTopLeftGrid;
      this._lastRenderedStyleTopRightGrid = styleTopRightGrid;
      this._lastRenderedWidth = width;
    }
  }, {
    key: "_prepareForRender",
    value: function _prepareForRender() {
      if (this._lastRenderedColumnWidth !== this.props.columnWidth || this._lastRenderedFixedColumnCount !== this.props.fixedColumnCount) {
        this._leftGridWidth = null;
      }
      if (this._lastRenderedFixedRowCount !== this.props.fixedRowCount || this._lastRenderedRowHeight !== this.props.rowHeight) {
        this._topGridHeight = null;
      }
      this._maybeCalculateCachedStyles();
      this._lastRenderedColumnWidth = this.props.columnWidth;
      this._lastRenderedFixedColumnCount = this.props.fixedColumnCount;
      this._lastRenderedFixedRowCount = this.props.fixedRowCount;
      this._lastRenderedRowHeight = this.props.rowHeight;
    }
  }, {
    key: "_renderBottomLeftGrid",
    value: function _renderBottomLeftGrid(props) {
      var enableFixedColumnScroll = props.enableFixedColumnScroll,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        rowCount = props.rowCount,
        hideBottomLeftGridScrollbar = props.hideBottomLeftGridScrollbar;
      var showVerticalScrollbar = this.state.showVerticalScrollbar;
      if (!fixedColumnCount) {
        return null;
      }
      var additionalRowCount = showVerticalScrollbar ? 1 : 0,
        height = this._getBottomGridHeight(props),
        width = this._getLeftGridWidth(props),
        scrollbarSize = this.state.showVerticalScrollbar ? this.state.scrollbarSize : 0,
        gridWidth = hideBottomLeftGridScrollbar ? width + scrollbarSize : width;
      var bottomLeftGrid = /*#__PURE__*/React.createElement(_Grid["default"], (0, _extends2["default"])({}, props, {
        cellRenderer: this._cellRendererBottomLeftGrid,
        className: this.props.classNameBottomLeftGrid,
        columnCount: fixedColumnCount,
        deferredMeasurementCache: this._deferredMeasurementCacheBottomLeftGrid,
        height: height,
        onScroll: enableFixedColumnScroll ? this._onScrollTop : undefined,
        ref: this._bottomLeftGridRef,
        rowCount: Math.max(0, rowCount - fixedRowCount) + additionalRowCount,
        rowHeight: this._rowHeightBottomGrid,
        style: this._bottomLeftGridStyle,
        tabIndex: null,
        width: gridWidth
      }));
      if (hideBottomLeftGridScrollbar) {
        return /*#__PURE__*/React.createElement("div", {
          className: "BottomLeftGrid_ScrollWrapper",
          style: _objectSpread(_objectSpread({}, this._bottomLeftGridStyle), {}, {
            height: height,
            width: width,
            overflowY: 'hidden'
          })
        }, bottomLeftGrid);
      }
      return bottomLeftGrid;
    }
  }, {
    key: "_renderBottomRightGrid",
    value: function _renderBottomRightGrid(props) {
      var columnCount = props.columnCount,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        rowCount = props.rowCount,
        scrollToColumn = props.scrollToColumn,
        scrollToRow = props.scrollToRow;
      return /*#__PURE__*/React.createElement(_Grid["default"], (0, _extends2["default"])({}, props, {
        cellRenderer: this._cellRendererBottomRightGrid,
        className: this.props.classNameBottomRightGrid,
        columnCount: Math.max(0, columnCount - fixedColumnCount),
        columnWidth: this._columnWidthRightGrid,
        deferredMeasurementCache: this._deferredMeasurementCacheBottomRightGrid,
        height: this._getBottomGridHeight(props),
        onScroll: this._onScroll,
        onScrollbarPresenceChange: this._onScrollbarPresenceChange,
        ref: this._bottomRightGridRef,
        rowCount: Math.max(0, rowCount - fixedRowCount),
        rowHeight: this._rowHeightBottomGrid,
        scrollToColumn: scrollToColumn - fixedColumnCount,
        scrollToRow: scrollToRow - fixedRowCount,
        style: this._bottomRightGridStyle,
        width: this._getRightGridWidth(props)
      }));
    }
  }, {
    key: "_renderTopLeftGrid",
    value: function _renderTopLeftGrid(props) {
      var fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount;
      if (!fixedColumnCount || !fixedRowCount) {
        return null;
      }
      return /*#__PURE__*/React.createElement(_Grid["default"], (0, _extends2["default"])({}, props, {
        className: this.props.classNameTopLeftGrid,
        columnCount: fixedColumnCount,
        height: this._getTopGridHeight(props),
        ref: this._topLeftGridRef,
        rowCount: fixedRowCount,
        style: this._topLeftGridStyle,
        tabIndex: null,
        width: this._getLeftGridWidth(props)
      }));
    }
  }, {
    key: "_renderTopRightGrid",
    value: function _renderTopRightGrid(props) {
      var columnCount = props.columnCount,
        enableFixedRowScroll = props.enableFixedRowScroll,
        fixedColumnCount = props.fixedColumnCount,
        fixedRowCount = props.fixedRowCount,
        scrollLeft = props.scrollLeft,
        hideTopRightGridScrollbar = props.hideTopRightGridScrollbar;
      var _this$state5 = this.state,
        showHorizontalScrollbar = _this$state5.showHorizontalScrollbar,
        scrollbarSize = _this$state5.scrollbarSize;
      if (!fixedRowCount) {
        return null;
      }
      var additionalColumnCount = showHorizontalScrollbar ? 1 : 0,
        height = this._getTopGridHeight(props),
        width = this._getRightGridWidth(props),
        additionalHeight = showHorizontalScrollbar ? scrollbarSize : 0;
      var gridHeight = height,
        style = this._topRightGridStyle;
      if (hideTopRightGridScrollbar) {
        gridHeight = height + additionalHeight;
        style = _objectSpread(_objectSpread({}, this._topRightGridStyle), {}, {
          left: 0
        });
      }
      var topRightGrid = /*#__PURE__*/React.createElement(_Grid["default"], (0, _extends2["default"])({}, props, {
        cellRenderer: this._cellRendererTopRightGrid,
        className: this.props.classNameTopRightGrid,
        columnCount: Math.max(0, columnCount - fixedColumnCount) + additionalColumnCount,
        columnWidth: this._columnWidthRightGrid,
        deferredMeasurementCache: this._deferredMeasurementCacheTopRightGrid,
        height: gridHeight,
        onScroll: enableFixedRowScroll ? this._onScrollLeft : undefined,
        ref: this._topRightGridRef,
        rowCount: fixedRowCount,
        scrollLeft: scrollLeft,
        style: style,
        tabIndex: null,
        width: width
      }));
      if (hideTopRightGridScrollbar) {
        return /*#__PURE__*/React.createElement("div", {
          className: "TopRightGrid_ScrollWrapper",
          style: _objectSpread(_objectSpread({}, this._topRightGridStyle), {}, {
            height: height,
            width: width,
            overflowX: 'hidden'
          })
        }, topRightGrid);
      }
      return topRightGrid;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.scrollLeft !== prevState.scrollLeft || nextProps.scrollTop !== prevState.scrollTop) {
        return {
          scrollLeft: nextProps.scrollLeft != null && nextProps.scrollLeft >= 0 ? nextProps.scrollLeft : prevState.scrollLeft,
          scrollTop: nextProps.scrollTop != null && nextProps.scrollTop >= 0 ? nextProps.scrollTop : prevState.scrollTop
        };
      }
      return null;
    }
  }]);
  return MultiGrid;
}(React.PureComponent);
(0, _defineProperty2["default"])(MultiGrid, "defaultProps", {
  classNameBottomLeftGrid: '',
  classNameBottomRightGrid: '',
  classNameTopLeftGrid: '',
  classNameTopRightGrid: '',
  enableFixedColumnScroll: false,
  enableFixedRowScroll: false,
  fixedColumnCount: 0,
  fixedRowCount: 0,
  scrollToColumn: -1,
  scrollToRow: -1,
  style: {},
  styleBottomLeftGrid: {},
  styleBottomRightGrid: {},
  styleTopLeftGrid: {},
  styleTopRightGrid: {},
  hideTopRightGridScrollbar: false,
  hideBottomLeftGridScrollbar: false
});
MultiGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  classNameBottomLeftGrid: _propTypes["default"].string.isRequired,
  classNameBottomRightGrid: _propTypes["default"].string.isRequired,
  classNameTopLeftGrid: _propTypes["default"].string.isRequired,
  classNameTopRightGrid: _propTypes["default"].string.isRequired,
  enableFixedColumnScroll: _propTypes["default"].bool.isRequired,
  enableFixedRowScroll: _propTypes["default"].bool.isRequired,
  fixedColumnCount: _propTypes["default"].number.isRequired,
  fixedRowCount: _propTypes["default"].number.isRequired,
  onScrollbarPresenceChange: _propTypes["default"].func,
  style: _propTypes["default"].object.isRequired,
  styleBottomLeftGrid: _propTypes["default"].object.isRequired,
  styleBottomRightGrid: _propTypes["default"].object.isRequired,
  styleTopLeftGrid: _propTypes["default"].object.isRequired,
  styleTopRightGrid: _propTypes["default"].object.isRequired,
  hideTopRightGridScrollbar: _propTypes["default"].bool,
  hideBottomLeftGridScrollbar: _propTypes["default"].bool
} : {};
(0, _reactLifecyclesCompat.polyfill)(MultiGrid);
var _default = MultiGrid;
exports["default"] = _default;