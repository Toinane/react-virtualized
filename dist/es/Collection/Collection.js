import _objectDestructuringEmpty from "@babel/runtime/helpers/objectDestructuringEmpty";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
import PropTypes from 'prop-types';
import * as React from 'react';
import CollectionView from './CollectionView';
import _calculateSizeAndPositionData from './utils/calculateSizeAndPositionData';
import getUpdatedOffsetForIndex from '../utils/getUpdatedOffsetForIndex';
/*:: import type {ScrollPosition, SizeInfo} from './types';*/
/**
 * Renders scattered or non-linear data.
 * Unlike Grid, which renders checkerboard data, Collection can render arbitrarily positioned- even overlapping- data.
 */
var Collection = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Collection, _React$PureComponent);
  var _super = _createSuper(Collection);
  function Collection(props, context) {
    var _this;
    _classCallCheck(this, Collection);
    _this = _super.call(this, props, context);
    _this._cellMetadata = [];
    _this._lastRenderedCellIndices = [];

    // Cell cache during scroll (for performance)
    _this._cellCache = [];
    _this._isScrollingChange = _this._isScrollingChange.bind(_assertThisInitialized(_this));
    _this._setCollectionViewRef = _this._setCollectionViewRef.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Collection, [{
    key: "forceUpdate",
    value: function forceUpdate() {
      if (this._collectionView !== undefined) {
        this._collectionView.forceUpdate();
      }
    }

    /** See Collection#recomputeCellSizesAndPositions */
  }, {
    key: "recomputeCellSizesAndPositions",
    value: function recomputeCellSizesAndPositions() {
      this._cellCache = [];
      this._collectionView.recomputeCellSizesAndPositions();
    }

    /** React lifecycle methods */
  }, {
    key: "render",
    value: function render() {
      var props = _extends({}, (_objectDestructuringEmpty(this.props), this.props));
      return /*#__PURE__*/React.createElement(CollectionView, _extends({
        cellLayoutManager: this,
        isScrollingChange: this._isScrollingChange,
        ref: this._setCollectionViewRef
      }, props));
    }

    /** CellLayoutManager interface */
  }, {
    key: "calculateSizeAndPositionData",
    value: function calculateSizeAndPositionData() {
      var _this$props = this.props,
        cellCount = _this$props.cellCount,
        cellSizeAndPositionGetter = _this$props.cellSizeAndPositionGetter,
        sectionSize = _this$props.sectionSize;
      var data = _calculateSizeAndPositionData({
        cellCount: cellCount,
        cellSizeAndPositionGetter: cellSizeAndPositionGetter,
        sectionSize: sectionSize
      });
      this._cellMetadata = data.cellMetadata;
      this._sectionManager = data.sectionManager;
      this._height = data.height;
      this._width = data.width;
    }

    /**
     * Returns the most recently rendered set of cell indices.
     */
  }, {
    key: "getLastRenderedIndices",
    value: function getLastRenderedIndices() {
      return this._lastRenderedCellIndices;
    }

    /**
     * Calculates the minimum amount of change from the current scroll position to ensure the specified cell is (fully) visible.
     */
  }, {
    key: "getScrollPositionForCell",
    value: function getScrollPositionForCell(_ref) /*: ScrollPosition*/{
      var align = _ref.align,
        cellIndex = _ref.cellIndex,
        height = _ref.height,
        scrollLeft = _ref.scrollLeft,
        scrollTop = _ref.scrollTop,
        width = _ref.width;
      var cellCount = this.props.cellCount;
      if (cellIndex >= 0 && cellIndex < cellCount) {
        var cellMetadata = this._cellMetadata[cellIndex];
        scrollLeft = getUpdatedOffsetForIndex({
          align: align,
          cellOffset: cellMetadata.x,
          cellSize: cellMetadata.width,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: cellIndex
        });
        scrollTop = getUpdatedOffsetForIndex({
          align: align,
          cellOffset: cellMetadata.y,
          cellSize: cellMetadata.height,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: cellIndex
        });
      }
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }
  }, {
    key: "getTotalSize",
    value: function getTotalSize() /*: SizeInfo*/{
      return {
        height: this._height,
        width: this._width
      };
    }
  }, {
    key: "cellRenderers",
    value: function cellRenderers(_ref2) {
      var _this2 = this;
      var height = _ref2.height,
        isScrolling = _ref2.isScrolling,
        width = _ref2.width,
        x = _ref2.x,
        y = _ref2.y;
      var _this$props2 = this.props,
        cellGroupRenderer = _this$props2.cellGroupRenderer,
        cellRenderer = _this$props2.cellRenderer;

      // Store for later calls to getLastRenderedIndices()
      this._lastRenderedCellIndices = this._sectionManager.getCellIndices({
        height: height,
        width: width,
        x: x,
        y: y
      });
      return cellGroupRenderer({
        cellCache: this._cellCache,
        cellRenderer: cellRenderer,
        cellSizeAndPositionGetter: function cellSizeAndPositionGetter(_ref3) {
          var index = _ref3.index;
          return _this2._sectionManager.getCellMetadata({
            index: index
          });
        },
        indices: this._lastRenderedCellIndices,
        isScrolling: isScrolling
      });
    }
  }, {
    key: "_isScrollingChange",
    value: function _isScrollingChange(isScrolling) {
      if (!isScrolling) {
        this._cellCache = [];
      }
    }
  }, {
    key: "_setCollectionViewRef",
    value: function _setCollectionViewRef(ref) {
      this._collectionView = ref;
    }
  }]);
  return Collection;
}(React.PureComponent);
_defineProperty(Collection, "defaultProps", {
  'aria-label': 'grid',
  cellGroupRenderer: defaultCellGroupRenderer
});
export { Collection as default };
Collection.propTypes = process.env.NODE_ENV !== "production" ? {
  'aria-label': PropTypes.string,
  /**
   * Number of cells in Collection.
   */
  cellCount: PropTypes.number.isRequired,
  /**
   * Responsible for rendering a group of cells given their indices.
   * Should implement the following interface: ({
   *   cellSizeAndPositionGetter:Function,
   *   indices: Array<number>,
   *   cellRenderer: Function
   * }): Array<PropTypes.node>
   */
  cellGroupRenderer: PropTypes.func.isRequired,
  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ index: number, key: string, style: object }): PropTypes.element
   */
  cellRenderer: PropTypes.func.isRequired,
  /**
   * Callback responsible for returning size and offset/position information for a given cell (index).
   * ({ index: number }): { height: number, width: number, x: number, y: number }
   */
  cellSizeAndPositionGetter: PropTypes.func.isRequired,
  /**
   * Optionally override the size of the sections a Collection's cells are split into.
   */
  sectionSize: PropTypes.number
} : {};
function defaultCellGroupRenderer(_ref4) {
  var cellCache = _ref4.cellCache,
    cellRenderer = _ref4.cellRenderer,
    cellSizeAndPositionGetter = _ref4.cellSizeAndPositionGetter,
    indices = _ref4.indices,
    isScrolling = _ref4.isScrolling;
  return indices.map(function (index) {
    var cellMetadata = cellSizeAndPositionGetter({
      index: index
    });
    var cellRendererProps = {
      index: index,
      isScrolling: isScrolling,
      key: index,
      style: {
        height: cellMetadata.height,
        left: cellMetadata.x,
        position: 'absolute',
        top: cellMetadata.y,
        width: cellMetadata.width
      }
    };

    // Avoid re-creating cells while scrolling.
    // This can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
    // If a scroll is in progress- cache and reuse cells.
    // This cache will be thrown away once scrolling complets.
    if (isScrolling) {
      if (!(index in cellCache)) {
        cellCache[index] = cellRenderer(cellRendererProps);
      }
      return cellCache[index];
    } else {
      return cellRenderer(cellRendererProps);
    }
  }).filter(function (renderedCell) {
    return !!renderedCell;
  });
}