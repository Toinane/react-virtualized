"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateScrollIndexHelper;
var _ScalingCellSizeAndPositionManager = _interopRequireDefault(require("./ScalingCellSizeAndPositionManager.js"));
/*:: import type {Alignment, CellSize} from '../types';*/
function updateScrollIndexHelper(_ref /*:: */) {
  var cellSize = _ref /*:: */.cellSize,
    cellSizeAndPositionManager = _ref /*:: */.cellSizeAndPositionManager,
    previousCellsCount = _ref /*:: */.previousCellsCount,
    previousCellSize = _ref /*:: */.previousCellSize,
    previousScrollToAlignment = _ref /*:: */.previousScrollToAlignment,
    previousScrollToIndex = _ref /*:: */.previousScrollToIndex,
    previousSize = _ref /*:: */.previousSize,
    scrollOffset = _ref /*:: */.scrollOffset,
    scrollToAlignment = _ref /*:: */.scrollToAlignment,
    scrollToIndex = _ref /*:: */.scrollToIndex,
    size = _ref /*:: */.size,
    sizeJustIncreasedFromZero = _ref /*:: */.sizeJustIncreasedFromZero,
    updateScrollIndexCallback = _ref /*:: */.updateScrollIndexCallback;
  var cellCount = cellSizeAndPositionManager.getCellCount();
  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || sizeJustIncreasedFromZero || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToAlignment !== previousScrollToAlignment || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
    // We need to ensure that the current scroll offset is still within the collection's range.
    // To do this, we don't need to measure everything; CellMeasurer would perform poorly.
    // Just check to make sure we're still okay.
    // Only adjust the scroll position if we've scrolled below the last set of rows.
    if (scrollOffset > cellSizeAndPositionManager.getTotalSize() - size) {
      updateScrollIndexCallback(cellCount - 1);
    }
  }
}