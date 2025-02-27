import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
/*:: import type {Index, SizeAndPositionInfo} from './types';*/
/**
 * A section of the Window.
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * Sections have a fixed size and contain 0 to many cells (tracked by their indices).
 */
var Section = /*#__PURE__*/function () {
  function Section(_ref /*:: */) {
    var height = _ref /*:: */.height,
      width = _ref /*:: */.width,
      x = _ref /*:: */.x,
      y = _ref /*:: */.y;
    _classCallCheck(this, Section);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this._indexMap = {};
    this._indices = [];
  }

  /** Add a cell to this section. */
  _createClass(Section, [{
    key: "addCellIndex",
    value: function addCellIndex(_ref2 /*:: */) {
      var index = _ref2 /*:: */.index;
      if (!this._indexMap[index]) {
        this._indexMap[index] = true;
        this._indices.push(index);
      }
    }

    /** Get all cell indices that have been added to this section. */
  }, {
    key: "getCellIndices",
    value: function getCellIndices() /*: Array<number>*/{
      return this._indices;
    }

    /** Intended for debugger/test purposes only */
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.x, ",").concat(this.y, " ").concat(this.width, "x").concat(this.height);
    }
  }]);
  return Section;
}();
export { Section as default };