"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCROLL_DIRECTION_VERTICAL = exports.SCROLL_DIRECTION_HORIZONTAL = exports.SCROLL_DIRECTION_FORWARD = exports.SCROLL_DIRECTION_BACKWARD = void 0;
exports["default"] = defaultOverscanIndicesGetter;
/*:: import type {OverscanIndicesGetterParams, OverscanIndices} from './types';*/
var SCROLL_DIRECTION_BACKWARD = -1;
exports.SCROLL_DIRECTION_BACKWARD = SCROLL_DIRECTION_BACKWARD;
var SCROLL_DIRECTION_FORWARD = 1;
exports.SCROLL_DIRECTION_FORWARD = SCROLL_DIRECTION_FORWARD;
var SCROLL_DIRECTION_HORIZONTAL = 'horizontal';
exports.SCROLL_DIRECTION_HORIZONTAL = SCROLL_DIRECTION_HORIZONTAL;
var SCROLL_DIRECTION_VERTICAL = 'vertical';

/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 */
exports.SCROLL_DIRECTION_VERTICAL = SCROLL_DIRECTION_VERTICAL;
function defaultOverscanIndicesGetter(_ref /*:: */) /*: OverscanIndices*/{
  var cellCount = _ref /*:: */.cellCount,
    overscanCellsCount = _ref /*:: */.overscanCellsCount,
    scrollDirection = _ref /*:: */.scrollDirection,
    startIndex = _ref /*:: */.startIndex,
    stopIndex = _ref /*:: */.stopIndex;
  if (scrollDirection === SCROLL_DIRECTION_FORWARD) {
    return {
      overscanStartIndex: Math.max(0, startIndex),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
  } else {
    return {
      overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex)
    };
  }
}