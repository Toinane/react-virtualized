"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _intervalTree = _interopRequireDefault(require("../vendor/intervalTree"));
// Position cache requirements:
//   O(log(n)) lookup of cells to render for a given viewport size
//   O(1) lookup of shortest measured column (so we know when to enter phase 1)
var PositionCache = /*#__PURE__*/function () {
  function PositionCache() {
    (0, _classCallCheck2["default"])(this, PositionCache);
    // Tracks the height of each column
    (0, _defineProperty2["default"])(this, "_columnSizeMap", {});
    // Store tops and bottoms of each cell for fast intersection lookup.
    (0, _defineProperty2["default"])(this, "_intervalTree", (0, _intervalTree["default"])());
    // Maps cell index to x coordinates for quick lookup.
    (0, _defineProperty2["default"])(this, "_leftMap", {});
  }
  (0, _createClass2["default"])(PositionCache, [{
    key: "estimateTotalHeight",
    value: function estimateTotalHeight(cellCount /*: number*/, columnCount /*: number*/, defaultCellHeight /*: number*/) /*: number*/{
      var unmeasuredCellCount = cellCount - this.count;
      return this.tallestColumnSize + Math.ceil(unmeasuredCellCount / columnCount) * defaultCellHeight;
    }

    // Render all cells visible within the viewport range defined.
  }, {
    key: "range",
    value: function range(scrollTop /*: number*/, clientHeight /*: number*/, renderCallback /*: RenderCallback*/) /*: void*/{
      var _this = this;
      this._intervalTree.queryInterval(scrollTop, scrollTop + clientHeight, function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 3),
          top = _ref2[0],
          _ = _ref2[1],
          index = _ref2[2];
        return renderCallback(index, _this._leftMap[index], top);
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(index /*: number*/, left /*: number*/, top /*: number*/, height /*: number*/) /*: void*/{
      this._intervalTree.insert([top, top + height, index]);
      this._leftMap[index] = left;
      var columnSizeMap = this._columnSizeMap;
      var columnHeight = columnSizeMap[left];
      if (columnHeight === undefined) {
        columnSizeMap[left] = top + height;
      } else {
        columnSizeMap[left] = Math.max(columnHeight, top + height);
      }
    }
  }, {
    key: "count",
    get: function get() /*: number*/{
      return this._intervalTree.count;
    }
  }, {
    key: "shortestColumnSize",
    get: function get() /*: number*/{
      var columnSizeMap = this._columnSizeMap;
      var size = 0;
      for (var i in columnSizeMap) {
        var height = columnSizeMap[(i /*: any*/)];
        size = size === 0 ? height : Math.min(size, height);
      }
      return size;
    }
  }, {
    key: "tallestColumnSize",
    get: function get() /*: number*/{
      var columnSizeMap = this._columnSizeMap;
      var size = 0;
      for (var i in columnSizeMap) {
        var height = columnSizeMap[(i /*: any*/)];
        size = Math.max(size, height);
      }
      return size;
    }
  }]);
  return PositionCache;
}();
exports["default"] = PositionCache;