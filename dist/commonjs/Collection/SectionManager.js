"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _Section = _interopRequireDefault(require("./Section"));
/**
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * 
 */

var SECTION_SIZE = 100;
/*:: type RegisterCellParams = {
  cellMetadatum: SizeAndPositionInfo,
  index: number,
};*/
/**
 * Contains 0 to many Sections.
 * Grows (and adds Sections) dynamically as cells are registered.
 * Automatically adds cells to the appropriate Section(s).
 */
var SectionManager = /*#__PURE__*/function () {
  function SectionManager() {
    var sectionSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SECTION_SIZE;
    (0, _classCallCheck2["default"])(this, SectionManager);
    this._sectionSize = sectionSize;
    this._cellMetadata = [];
    this._sections = {};
  }

  /**
   * Gets all cell indices contained in the specified region.
   * A region may encompass 1 or more Sections.
   */
  (0, _createClass2["default"])(SectionManager, [{
    key: "getCellIndices",
    value: function getCellIndices(_ref /*:: */) /*: Array<number>*/{
      var height = _ref /*:: */.height,
        width = _ref /*:: */.width,
        x = _ref /*:: */.x,
        y = _ref /*:: */.y;
      var indices = {};
      this.getSections({
        height: height,
        width: width,
        x: x,
        y: y
      }).forEach(function (section) {
        return section.getCellIndices().forEach(function (index) {
          indices[index] = index;
        });
      });

      // Object keys are strings; this function returns numbers
      return Object.keys(indices).map(function (index) {
        return indices[index];
      });
    }

    /** Get size and position information for the cell specified. */
  }, {
    key: "getCellMetadata",
    value: function getCellMetadata(_ref2 /*:: */) /*: SizeAndPositionInfo*/{
      var index = _ref2 /*:: */.index;
      return this._cellMetadata[index];
    }

    /** Get all Sections overlapping the specified region. */
  }, {
    key: "getSections",
    value: function getSections(_ref3 /*:: */) /*: Array<Section>*/{
      var height = _ref3 /*:: */.height,
        width = _ref3 /*:: */.width,
        x = _ref3 /*:: */.x,
        y = _ref3 /*:: */.y;
      var sectionXStart = Math.floor(x / this._sectionSize);
      var sectionXStop = Math.floor((x + width - 1) / this._sectionSize);
      var sectionYStart = Math.floor(y / this._sectionSize);
      var sectionYStop = Math.floor((y + height - 1) / this._sectionSize);
      var sections = [];
      for (var sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
        for (var sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
          var key = "".concat(sectionX, ".").concat(sectionY);
          if (!this._sections[key]) {
            this._sections[key] = new _Section["default"]({
              height: this._sectionSize,
              width: this._sectionSize,
              x: sectionX * this._sectionSize,
              y: sectionY * this._sectionSize
            });
          }
          sections.push(this._sections[key]);
        }
      }
      return sections;
    }

    /** Total number of Sections based on the currently registered cells. */
  }, {
    key: "getTotalSectionCount",
    value: function getTotalSectionCount() {
      return Object.keys(this._sections).length;
    }

    /** Intended for debugger/test purposes only */
  }, {
    key: "toString",
    value: function toString() {
      var _this = this;
      return Object.keys(this._sections).map(function (index) {
        return _this._sections[index].toString();
      });
    }

    /** Adds a cell to the appropriate Sections and registers it metadata for later retrievable. */
  }, {
    key: "registerCell",
    value: function registerCell(_ref4 /*:: */) {
      var cellMetadatum = _ref4 /*:: */.cellMetadatum,
        index = _ref4 /*:: */.index;
      this._cellMetadata[index] = cellMetadatum;
      this.getSections(cellMetadatum).forEach(function (section) {
        return section.addCellIndex({
          index: index
        });
      });
    }
  }]);
  return SectionManager;
}();
exports["default"] = SectionManager;