// DISCLAIMER / TERMS & CONDITIONS / CREDITS
//     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

//     Pixel Measure v0 .04 - Photoshop script
// for adding pixel measurements to your mockups
// Copyright(C) 2009 Nikolaj Selvik

// This program is free software;
// you can redistribute it and / or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation;
// either version 2
//     of the License, or(at your option) any later version.

// This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY;
// without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
// GNU General Public License
// for more details.

// You should have received a copy of the GNU General Public License
// along with this program;
// if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110 - 1301, USA.

//     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

//     Updated by Bezzy Weitz(Magical Coder - a million thx
//         for his time) & Mycort(GUI Artist & Idea Man)
// Creators of functions 3 - > 7(4 / 15 / 2012 - v0 .05).Specifc code edits and additions include:
//     -4 measures using "L"
// shaped selection
//     -
//     2 measures using crosshair selections -
//     6 measures of inner / outer box -
//     Simultaneous Measure(Vert & Horiz - All at once) -
//     Arrow edge drawing(toggle
//         function) -
//     Adding "var"
// section
// for easier editing of toggled functions -
//     Long extended edge line(8 point Detection Function)

// Code snippets and advice help courtesy of (bb / ) -
//     Working code
// for converting selection to paths to detect values of simultaneous measures -
//     Centering of labels / cut line -
//     Making the code faster with the addition of Script Listener -
//     In multiple measures mode, new function to link both lines / label together
// for easier movement
//     -
//     Font analyzer, creation of text layer info, multiple selection

// Font - detection system updated by Maksim Izmaylov < me @kvakes.com > in 2012.

//     ===
//     === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
//     Got questions or suggestions
// for further improvement ?
//     -Contact me at : mycort @yahoo.com -
//     A little plug
// for my portfolio site: mycort.deviantart.com / gallery ===
//     === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===

//     Great many thanks to Nikolaj Selvik, the developer who first and initially created this time saving tool. -
//     Original creator of functions 1 & 2(Horizontal & vertical "single"
//         selection) -
//     Uncentered Label -
//     Line edge drawing

//     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -


#target photoshop

if (!documents.length) {
    alert('There are no documents open.', 'No Document');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Toggle functions (put true or false here to turn on/off features)
var make_arrows = true;
var make_centered_labels = true;
var make_bold_labels = true;
var use_fast_draw = false;
var LinkLayers = false;
var font_size = 10;
var arrow_size = 3;
var font_content_detection = false;
var font_content_detection_symbols = ['(', ')'];
var TextLeading = true;
var TextJustification = true;
var RetinaRoundup = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mainLayerSet;
var layerSetRef;
var rectInfo;
var rectangleList;
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
var myDocument = app.activeDocument;
var theLayer = myDocument.activeLayer;
var myDoc = app.activeDocument;
var myLayer = myDoc.activeLayer;


var origResolution = myDocument.resolution;
myDocument.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);

app.displayDialogs = DialogModes.NO;

if (validateState()) {
    app.activeDocument.suspendHistory("Pixel Specs", "pm();");
};
myDocument.resolution = origResolution;

function pm() {

    // =======================================================
    // Create Layer Sets
    // =======================================================

    try {
        mainLayerSet = app.activeDocument.layerSets.getByName("Pixel Specs");
    } catch (error) {
        mainLayerSet = app.activeDocument.layerSets.add();
        mainLayerSet.name = "Pixel Specs";
    }
    layerSetRef = mainLayerSet.layerSets.add();

    // Determine how many independent rectangles exist in the selection
    rectInfo = getRectangles();
    rectangleList = rectInfo.bounds;



    if (rectangleList.length == 2 && (is_inside(rectangleList[0], rectangleList[1]) || is_inside(rectangleList[1], rectangleList[0]))) createMeasure();
    else if (rectangleList.length == 1) {
        if (rectInfo.longinfo[0] === false) createMeasure();
        else createLongLabel(rectInfo.longinfo[0]);
    } else if (rectangleList.length > 1) createMultipleMeasures();

    app.activeDocument.selection.deselect();

    if (rectangleList.length > 1) {
        layerSetRef.name = "Multiple Measures";
    }
}

// Linking function of multiple measures
if (LinkLayers) {
    if (activeDocument.activeLayer.typename != "LayerSet") {
        if (activeDocument.activeLayer.parent.typename = "LayerSet") {
            activeDocument.activeLayer = activeDocument.activeLayer.parent;
        }
        if (rectangleList.length > 1) {
            var doc = activeDocument;
            var thisSet = doc.activeLayer;
            var LayerList = new Array();
            for (var a = 0; a < thisSet.layers.length; a++) {
                activeDocument.activeLayer = thisSet.layers[a];
                LayerList.push(getActiveLayerIndex());
            }
            while (LayerList.length > 0) {
                selectLayerByIndex(Number(LayerList.shift()));
                selectLayerByIndex(Number(LayerList.shift()), true);
                linkSelectedLayers();
            }

        }
    }

}

function validateState() {
    if (app.documents.length == 0) {
        alert("No document open");
        return false;
    }

    if (!hasSelection(app.activeDocument)) {
        if (myLayer.kind == LayerKind.TEXT) {
            multiselectfontreader();
            return false
        } else {
            //Turns off layer before making measurements
            //app.activeDocument.activeLayer.visible = !app.activeDocument.activeLayer.visible;
            loadTransparency()
        }

    }
    return true;
}

function is_inside(r1, r2) {
    return r1[0] <= r2[0] && r1[1] <= r2[1] && r1[2] >= r2[2] && r1[3] >= r2[3];
}

function createMultipleMeasures() {
    for (var i = 0; i < rectangleList.length; i++) {
        if (rectInfo.longinfo === false) {
            if (rectangleList[2] - rectangleList[0] > rectangleList[3] - rectangleList[1]) createLabel(rectangleList[0], parseInt(rectangleList[1] + (rectangleList[3] - rectangleList[1]) / 2) - 5, rectangleList[2], parseInt(rectangleList[i][1] + (rectangleList[i][3] - rectangleList[i][1]) / 2) + 5, true);
            else createLabel(parseInt(rectangleList[i][0] + (rectangleList[i][2] - rectangleList[i][0]) / 2) - 5, rectangleList[i][1], parseInt(rectangleList[i][0] + (rectangleList[i][2] - rectangleList[i][0]) / 2) + 5, rectangleList[i][3], false);
        } else {
            createLongLabel(rectInfo.longinfo[i]);
        }
    }
}

function createMeasure() {
    var docRef = app.activeDocument;
    var selRef = docRef.selection;
    var channelRef;
    var is_rect = false;

    // =======================================================
    // Set Up Selection
    // =======================================================

    var fx1 = selRef.bounds[0].value;
    var fy1 = selRef.bounds[1].value;
    var fx2 = selRef.bounds[2].value;
    var fy2 = selRef.bounds[3].value;



    try {
        channelRef = docRef.channels.getByName("Pixel Specs");
    } catch (error) {
        channelRef = docRef.channels.add();
        channelRef.name = "Pixel Specs";
        channelRef.kind = ChannelType.SELECTEDAREA;
    }

    docRef.selection.store(docRef.channels["Pixel Specs"], SelectionType.EXTEND);
    var shapeRef = [
        [fx1, fy1],
        [fx2, fy1],
        [fx2, fy2],
        [fx1, fy2]
    ];
    selRef.select(shapeRef, SelectionType.EXTEND);
    selRef.load(docRef.channels["Pixel Specs"], SelectionType.DIMINISH);
    channelRef.remove();

    try {
        var x1 = selRef.bounds[0].value;
        var y1 = selRef.bounds[1].value;
        var x2 = selRef.bounds[2].value;
        var y2 = selRef.bounds[3].value;
    } catch (error) {
        // No selection bound - this means getting the inverse resulted in no selection,
        // so assume negative shape did not exist (original selection was rectangle)
        selRef.select(shapeRef);
        is_rect = true;
        x1 = fx1;
        y1 = fy1;
        x2 = fx2;
        y2 = fy2;
    }

    rectInfo = getRectangles();
    var inverseRectList = rectInfo.bounds;


    docRef.selection.deselect();

    // =======================================================
    // Draw Labels
    // =======================================================

    var inner = {
        'top': false,
        'bottom': false,
        'left': false,
        'right': false
    };

    // Look for left measurement
    if (fx1 < x1) {
        inner.left = true;
        if (fy1 == y1) createLabel(fx1, fy1 - 11, x1, fy1, true);
        else if (fy2 == y2) createLabel(fx1, fy2, x1, fy2 + 10, true);
        else createLabel(fx1, parseInt(fy1 + (fy2 - fy1) / 2) - 5, x1, parseInt(fy1 + (fy2 - fy1) / 2) + 5, true);
    }

    // Look for right measurement
    if (fx2 > x2) {
        if (!inner.left) inner.right = true;
        if (fy1 == y1) createLabel(x2, fy1 - 11, fx2, fy1, true);
        else if (fy2 == y2) createLabel(x2, fy2, fx2, fy2 + 10, true);
        else createLabel(x2, parseInt(fy1 + (fy2 - fy1) / 2) - 5, fx2, parseInt(fy1 + (fy2 - fy1) / 2) + 5, true);

    }

    // Look for top measurement
    if (fy1 < y1) {
        inner.top = true;
        if (fx1 == x1) createLabel(fx1 - 11, fy1, fx1, y1, false);
        else if (fx2 == x2) createLabel(fx2, fy1, fx2 + 10, y1, false);
        else createLabel(parseInt(fx1 + (fx2 - fx1) / 2) - 5, fy1, parseInt(fx1 + (fx2 - fx1) / 2) + 5, y1, false);
    }

    // Look for bottom measurement
    if (fy2 > y2) {
        if (!inner.top) inner.bottom = true;
        if (fx1 == x1) createLabel(fx1 - 11, y2, fx1, fy2, false);
        else if (fx2 == x2) createLabel(fx2, y2, fx2 + 10, fy2, false);
        else createLabel(parseInt(fx1 + (fx2 - fx1) / 2) - 5, y2, parseInt(fx1 + (fx2 - fx1) / 2) + 5, fy2, false);
    }

    if (is_rect) {
        // Only label the longest dimension when selection is a single rectangle

        if (fx2 - fx1 > fy2 - fy1) createMultipleMeasures(true);
        else createMultipleMeasures(false);



        // Select containing folder (select was left on text layer, first item in folder)

        if (activeDocument.activeLayer.parent.typename = "LayerSet") {
            activeDocument.activeLayer = activeDocument.activeLayer.parent;
        }


    } else {
        // Label both dimensions of negative space when it exists
        if (inner.left) createLabel(x1, y1, x1 + 10, y2, false);
        if (inner.right) createLabel(x2 - 11, y1, x2, y2, false);
        if (inner.top) createLabel(x1, y1, x2, y1 + 10, true);
        if (inner.bottom) createLabel(x1, y2 - 11, x2, y2, true);


        if (!inner.left && !inner.right && !inner.top && !inner.bottom) {
            if (inverseRectList.length == 4) {
                // Horizontal bar: Q1.x2, Q1.y1, Q4.x1, Q4.y2
                createLabel(inverseRectList[0][0], inverseRectList[0][3], inverseRectList[3][2], inverseRectList[3][1], true);

                // Vertical bar: Q1.x1, Q1.y2, Q4.x2, Q4.y1
                createLabel(inverseRectList[0][2], inverseRectList[0][1], inverseRectList[3][0], inverseRectList[3][3], false);
            } else {
                // Normal rectangle (no negative inner space)
                createLabel(x1, y1, x2, y2, true);
                createLabel(x1, y1, x2, y2, false);
            }
        }
    }

    app.preferences.rulerUnits = originalUnit;
}

function getRectangles() {
    Array.prototype.numericSort = function() {
        return this.sort(function(a, b) {
            return a - b;
        });
    };
    makeWorkPath(.4);

    zWorkPath = localize("$$$/Actions/Key/Document/WorkPath=Work Path");
    // https://www.ps-scripts.com/viewtopic.php?f=66&t=8276
    var tempPath = app.activeDocument.pathItems.getByName(zWorkPath);
    // var tempPath = app.activeDocument.pathItems.getByName('Work Path');

    var subPathCount = tempPath.subPathItems.length;
    var subPathBounds = [];
    var dirs = [];
    for (sp = 0; sp < subPathCount; sp++) {
        var b = [];
        var xValues = [];
        var yValues = [];
        var pointCount = tempPath.subPathItems[sp].pathPoints.length;
        var points = [];
        for (var p = 0; p < pointCount; p++) {
            xValues.push(tempPath.subPathItems[sp].pathPoints[p].anchor[0]);
            yValues.push(tempPath.subPathItems[sp].pathPoints[p].anchor[1]);

            // Pull off the last point (x,y) and add to the list
            points.push([xValues[xValues.length - 1], yValues[yValues.length - 1]]);
        }
        xValues.numericSort();
        yValues.numericSort();
        var xMin = xValues[0];
        var xMax = xValues[xValues.length - 1];
        var yMin = yValues[0];
        var yMax = yValues[yValues.length - 1];
        subPathBounds.push([xMin, yMin, xMax, yMax]);

        // Special case for 8 points - assume it's a rect with a cutout on one side. Cutout indicates
        // we're in long side mode, and the label/line should be drawn on the opposing (to the cutout)
        // side.
        if (pointCount == 8) {
            var lines = [];
            var label;
            for (var p = 0; p < points.length; p++) {
                // Looking for a point that is along one side but not on a corner - that point is on the
                // side opposite where the label will be drawn.
                if ((points[p][0] == xMin || points[p][0] == xMax) && points[p][1] != yMin && points[p][1] != yMax) {
                    // Matching point is an x, so point is on a vertical side (either x1 or x2) and long lines are horizontal
                    lines.push([
                        [xMin, yMin],
                        [xMax - (use_fast_draw ? 0 : 1), yMin]
                    ]);
                    lines.push([
                        [xMin, yMax - 1],
                        [xMax - (use_fast_draw ? 0 : 1), yMax - 1]
                    ]);

                    if (points[p][0] == xMin) {
                        // Cut out is on the left line, so draw right line (inset for the arrow)
                        lines.push([
                            [xMax - arrow_size - 1, yMin],
                            [xMax - arrow_size - 1, yMax - 1]
                        ]);
                        label = [xMax - 9, yMin];
                    } else {
                        // Cut out is on the right line, so draw left line (inset for the arrow)
                        lines.push([
                            [xMin + arrow_size, yMin],
                            [xMin + arrow_size, yMax - 1]
                        ]);
                        if (yMax - yMin < 30) {
                            label = [xMin - 38, yMin];
                        } else {
                            label = [xMin - 2, yMin];
                        }
                    }
                    dirs.push({
                        'lines': lines,
                        'horizontal': false,
                        'label': label
                    });
                    break;
                } else if ((points[p][1] == yMin || points[p][1] == yMax) && points[p][0] != xMin && points[p][0] != xMax) {
                    // Matching point is a y, so point is on a horizontal side (either y1 or y2) and long lines are vertical
                    lines.push([
                        [xMin, yMin],
                        [xMin, yMax - (use_fast_draw ? 0 : 1)]
                    ]);
                    lines.push([
                        [xMax - 1, yMin],
                        [xMax - 1, yMax - (use_fast_draw ? 0 : 1)]
                    ]);

                    if (points[p][1] == yMin) {
                        // Cut out is on the top line, so draw bottom line (inset for the arrow)
                        lines.push([
                            [xMin, yMax - arrow_size - 1],
                            [xMax - 1, yMax - arrow_size - 1]
                        ]);
                        label = [xMin, yMax - 9];
                    } else {
                        // Cut out is on the bottom line, so draw top line (inset for the arrow)
                        lines.push([
                            [xMin, yMin + arrow_size],
                            [xMax - 1, yMin + arrow_size]
                        ]);

                        // Get the top left for the "region" for the label - this is used to plug into the old createLabel()
                        // style when calling drawTextLabels()
                        if (xMax - xMin < 45) {
                            label = [xMin, yMin - 24];
                        } else {
                            label = [xMin, yMin - 2];
                        }


                    }
                    dirs.push({
                        'lines': lines,
                        'horizontal': true,
                        'label': label
                    });
                    break;
                }
            }
        } else {
            dirs.push(false);
        }
    }
    tempPath.makeSelection(0);
    tempPath.remove();

    return {
        'bounds': subPathBounds,
        'longinfo': dirs
    };
}

function createLongLabel(info) {
    app.activeDocument.selection.deselect();

    var linesLayerRef = layerSetRef.artLayers.add();
    linesLayerRef.name = "Line ";

    drawLine(info.lines[0][0], info.lines[0][1], 1); // long side
    drawLine(info.lines[1][0], info.lines[1][1], 1); // long side
    drawLine(info.lines[2][0], info.lines[2][1], 1); // label side

    drawArrows(info.lines[2][0], info.lines[2][1], info.horizontal);

    drawTextLabels(info.horizontal, info.horizontal ? info.lines[2][1][0] - info.lines[2][0][0] + 1 : info.lines[2][1][1] - info.lines[2][0][1] + 1, info.label[0], info.label[1])
}

function drawArrows(p1, p2, horizontal) {
    if (!make_arrows) return true;

    for (var i = 1; i <= arrow_size; i++) {
        if (horizontal) {
            drawLine([p1[0] + 1 + i, p1[1] - i], [p1[0] + 1 + i, p1[1] + i + (use_fast_draw ? 1 : 0)], 1);
            drawLine([p2[0] - 1 - i, p1[1] - i], [p2[0] - 1 - i, p1[1] + i + (use_fast_draw ? 1 : 0)], 1);
        } else {
            drawLine([p1[0] - i, p1[1] + 1 + i], [p1[0] + i + (use_fast_draw ? 1 : 0), p1[1] + 1 + i], 1);
            drawLine([p1[0] - i, p2[1] - 1 - i], [p1[0] + i + (use_fast_draw ? 1 : 0), p2[1] - 1 - i], 1);
        }
    }
}

function createLabel(x1, y1, x2, y2, horizontal) {
    app.activeDocument.selection.deselect();

    var linesLayerRef = layerSetRef.artLayers.add();

    var width = x2 - x1;
    var height = y2 - y1;

    // =======================================================
    // Draw Lines
    // =======================================================

    if (horizontal) {
        linesLayerRef.name = "Line ";
        drawLine([x1, y1], [x1, y1 + 10 + (use_fast_draw ? 1 : 0)], 1);
        drawLine([x2 - 1, y1], [x2 - 1, y1 + 10 + (use_fast_draw ? 1 : 0)], 1);
        drawLine([x1, y1 + 5], [x2 - 1, y1 + 5], 1);

        if (make_arrows) {
            for (var i = 1; i <= arrow_size; i++) {
                drawLine([x1 + 1 + i, y1 + 5 - i], [x1 + 1 + i, y1 + 5 + i + (use_fast_draw ? 1 : 0)], 1);
                drawLine([x2 - 2 - i, y1 + 5 - i], [x2 - 2 - i, y1 + 5 + i + (use_fast_draw ? 1 : 0)], 1);
            }
        }
    } else {
        linesLayerRef.name = "Line ";
        drawLine([x1, y1], [x1 + 10 + (use_fast_draw ? 1 : 0), y1], 1);
        drawLine([x1, y2 - 1], [x1 + 10 + (use_fast_draw ? 1 : 0), y2 - 1], 1);
        drawLine([x1 + 5, y1], [x1 + 5, y2 - 1], 1);

        if (make_arrows) {
            for (var i = 1; i <= arrow_size; i++) {
                drawLine([x1 + 5 - i, y1 + 1 + i], [x1 + 5 + i + (use_fast_draw ? 1 : 0), y1 + 1 + i], 1);
                drawLine([x1 + 5 - i, y2 - 2 - i], [x1 + 5 + i + (use_fast_draw ? 1 : 0), y2 - 2 - i], 1);
            }
        }
    }

    drawTextLabels(horizontal, horizontal ? width : height, x1, y1);
}

function drawTextLabels(horizontal, size, x, y) {
    if (size % 2 == 1 && RetinaRoundup)
        size = size + 1;
    // =======================================================
    // Draw Text
    // =======================================================

    var textLayerRef = layerSetRef.artLayers.add();
    textLayerRef.kind = LayerKind.TEXT;
    var textItemRef = textLayerRef.textItem;


    if (rectangleList.length == 1) {
        textItemRef.contents = size + "px";
        layerSetRef.name = textItemRef.contents;
    }

    if (horizontal) {
        if (size < 45 || !make_centered_labels) {
            textItemRef.color = app.foregroundColor; {
                if (make_bold_labels) {
                    textItemRef.font = "Arial-BoldMT";
                } else {
                    textItemRef.font = "ArialMT";
                }
            }

            textItemRef.size = font_size;
            textItemRef.antiAliasMethod = AntiAlias.SHARP;
            textItemRef.autoKerning = AutoKernType.OPTICAL;
            textItemRef.justification = Justification.CENTER;
            textItemRef.position = Array(Math.floor(x + (size / 2)), y + 20);
            textItemRef.contents = size + "px";

        } else {
            textItemRef.color = app.foregroundColor; {
                if (make_bold_labels) {
                    textItemRef.font = "Arial-BoldMT";
                } else {
                    textItemRef.font = "ArialMT";
                }
            }
            textItemRef.size = font_size;
            textItemRef.antiAliasMethod = AntiAlias.SHARP;
            textItemRef.autoKerning = AutoKernType.OPTICAL;
            textItemRef.justification = Justification.CENTER;
            textItemRef.position = Array(Math.floor(x + (size / 2)), y + 8);
            textItemRef.contents = size + "px";

            loadTransparency();
            app.activeDocument.selection.expand(4);
            selectLayerBelow();
            app.activeDocument.selection.cut();

        }
    } else {
        if (size < 30 || !make_centered_labels) {
            textItemRef.color = app.foregroundColor; {
                if (make_bold_labels) {
                    textItemRef.font = "Arial-BoldMT";
                } else {
                    textItemRef.font = "ArialMT";
                }
            }
            textItemRef.size = font_size;
            textItemRef.antiAliasMethod = AntiAlias.SHARP;
            textItemRef.autoKerning = AutoKernType.OPTICAL;
            textItemRef.position = Array(x + 12, Math.floor(y + 4 + (size / 2)));
            textItemRef.contents = size + "px";

        } else {
            textItemRef.color = app.foregroundColor; {
                if (make_bold_labels) {
                    textItemRef.font = "Arial-BoldMT";
                } else {
                    textItemRef.font = "ArialMT";
                }
            }
            textItemRef.size = font_size;
            textItemRef.antiAliasMethod = AntiAlias.SHARP;
            textItemRef.autoKerning = AutoKernType.OPTICAL;

            textItemRef.justification = Justification.CENTER;
            textItemRef.position = Array(x + 5, Math.floor(y + 4 + (size / 2)));
            textItemRef.contents = size + "px";
            loadTransparency();
            app.activeDocument.selection.expand(4);
            selectLayerBelow();
            app.activeDocument.selection.cut();

        }
    }
}

function makeWorkPath(tolerance) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(charIDToTypeID('Path'));
    desc.putReference(charIDToTypeID('null'), ref);
    var ref2 = new ActionReference();
    ref2.putProperty(charIDToTypeID('csel'), charIDToTypeID('fsel'));
    desc.putReference(charIDToTypeID('From'), ref2);
    desc.putUnitDouble(charIDToTypeID('Tlrn'), charIDToTypeID('#Pxl'), tolerance);
    executeAction(charIDToTypeID('Mk  '), desc, DialogModes.NO);
}

function makeSelectionF() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Chnl'), charIDToTypeID('fsel'));
    desc.putReference(charIDToTypeID('null'), ref);
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Path'), charIDToTypeID('WrPt'));
    desc.putReference(charIDToTypeID('T   '), ref);
    desc.putInteger(charIDToTypeID('Vrsn'), 1);
    desc.putBoolean(stringIDToTypeID('vectorMaskParams'), true);
    executeAction(charIDToTypeID('setd'), desc, DialogModes.NO);
};

function drawLine_slower(x1, y1, x2, y2) {
    var pointArray = new Array();

    var pointA = new PathPointInfo();
    pointA.kind = PointKind.CORNERPOINT;
    pointA.anchor = Array(x1, y1);
    pointA.leftDirection = pointA.anchor;
    pointA.rightDirection = pointA.anchor;
    pointArray.push(pointA);

    var pointB = new PathPointInfo();
    pointB.kind = PointKind.CORNERPOINT;
    pointB.anchor = Array(x2, y2);
    pointB.leftDirection = pointB.anchor;
    pointB.rightDirection = pointB.anchor;
    pointArray.push(pointB);

    var line = new SubPathInfo();
    line.operation = ShapeOperation.SHAPEXOR;
    line.closed = false;
    line.entireSubPath = pointArray;

    var lineSubPathArray = new Array();
    lineSubPathArray.push(line);
    var linePath = app.activeDocument.pathItems.add("TempPath", lineSubPathArray);
    linePath.strokePath(ToolType.PENCIL, false);

    app.activeDocument.pathItems.removeAll();
};

function drawLine(startXY, endXY, width) {
    if (!use_fast_draw) return drawLine_slower(startXY[0], startXY[1], endXY[0], endXY[1]);

    var desc = new ActionDescriptor();
    var lineDesc = new ActionDescriptor();
    var startDesc = new ActionDescriptor();
    startDesc.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), startXY[0]);
    startDesc.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), startXY[1]);
    lineDesc.putObject(charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc);
    var endDesc = new ActionDescriptor();
    endDesc.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), endXY[0]);
    endDesc.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), endXY[1]);
    lineDesc.putObject(charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc);
    lineDesc.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width);
    desc.putObject(charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc);
    desc.putBoolean(charIDToTypeID('AntA'), false);
    executeAction(charIDToTypeID('Draw'), desc, DialogModes.NO);
};

function hasSelection(doc) {
    var res = false;
    var as = doc.activeHistoryState;
    doc.selection.deselect();
    if (as != doc.activeHistoryState) {
        res = true;
        doc.activeHistoryState = as;
    }
    return res;
}

function selectLayerBelow() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Bckw"));
    desc.putReference(charIDToTypeID("null"), ref);
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
};

function selectLayerAbove() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Frwr"));
    desc.putReference(charIDToTypeID("null"), ref);
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
};

function loadTransparency(Invert) {
    if (Invert == undefined) Invert = false;
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc.putReference(charIDToTypeID("null"), ref);
    var ref1 = new ActionReference();
    ref1.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Trsp"));
    desc.putReference(charIDToTypeID("T   "), ref1);
    desc.putBoolean(charIDToTypeID('Invr'), Invert);
    executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
};

function selectLayerByIndex(index, add) {
    add = (add == undefined) ? add = false : add;
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("Lyr "), index);
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID("null"), ref);
    if (add) desc.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    try {
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    } catch (e) {}
};

function getActiveLayerIndex() {
    var ref = new ActionReference();
    ref.putProperty(1349677170, 1232366921);
    ref.putEnumerated(1283027488, 1332896878, 1416783732);
    try {
        activeDocument.backgroundLayer;
        var res = executeActionGet(ref)
            .getInteger(1232366921) - 1;
    } catch (e) {
        var res = executeActionGet(ref)
            .getInteger(1232366921);
    }
    return res;
};

function linkSelectedLayers() {
    var desc221 = new ActionDescriptor();
    var ref142 = new ActionReference();
    ref142.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc221.putReference(charIDToTypeID('null'), ref142);
    executeAction(stringIDToTypeID('linkSelectedLayers'), desc221, DialogModes.NO);
};

function loadVectorMask() {
    // =======================================================
    var idsetd = charIDToTypeID("setd");
    var desc14 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref9 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref9.putProperty(idChnl, idfsel);
    desc14.putReference(idnull, ref9);
    var idT = charIDToTypeID("T   ");
    var ref10 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    var idPath = charIDToTypeID("Path");
    var idvectorMask = stringIDToTypeID("vectorMask");
    ref10.putEnumerated(idPath, idPath, idvectorMask);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref10.putEnumerated(idLyr, idOrdn, idTrgt);
    desc14.putReference(idT, ref10);
    var idVrsn = charIDToTypeID("Vrsn");
    desc14.putInteger(idVrsn, 1);
    var idvectorMaskParams = stringIDToTypeID("vectorMaskParams");
    desc14.putBoolean(idvectorMaskParams, true);
    executeAction(idsetd, desc14, DialogModes.NO);
};

function loadLayerMask() {
    // =======================================================
    var idsetd = charIDToTypeID("setd");
    var desc21 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref14 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref14.putProperty(idChnl, idfsel);
    desc21.putReference(idnull, ref14);
    var idT = charIDToTypeID("T   ");
    var ref15 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref15.putEnumerated(idChnl, idChnl, idMsk);
    desc21.putReference(idT, ref15);
    executeAction(idsetd, desc21, DialogModes.NO);
};

///////////////////////////////////////////////////////////////////////////////
// Function: hasVectorMask
// Usage: see if there is a vector layer mask
// Input: <none> Must have an open document
// Return: true if there is a vector mask
///////////////////////////////////////////////////////////////////////////////
function hasVectorMask() {
    var hasVectorMask = false;
    try {
        var ref = new ActionReference();
        var keyVectorMaskEnabled = app.stringIDToTypeID('vectorMask');
        var keyKind = app.charIDToTypeID('Knd ');
        ref.putEnumerated(app.charIDToTypeID('Path'), app.charIDToTypeID('Ordn'), keyVectorMaskEnabled);
        var desc = executeActionGet(ref);
        if (desc.hasKey(keyKind)) {
            var kindValue = desc.getEnumerationValue(keyKind);
            if (kindValue == keyVectorMaskEnabled) {
                hasVectorMask = true;
            }
        }
    } catch (e) {
        hasVectorMask = false;
    }
    return hasVectorMask;
};

function multiselectfontreader() {

    // by paul riggott; MULTI-SELECT Function

    app.bringToFront();
    main();

    function main() {
        if (!documents.length) return;
        var selLayers = [];
        selLayers = getSelectedLayersIdx();
        for (var a in selLayers) {
            makeActiveByIndex(selLayers[a], false);
            //amend to suit.
            readTextLayer()
        }
    }

    function getSelectedLayersIdx() {
        var selectedLayers = new Array;
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desc = executeActionGet(ref);
        if (desc.hasKey(stringIDToTypeID('targetLayers'))) {
            desc = desc.getList(stringIDToTypeID('targetLayers'));
            var c = desc.count
            var selectedLayers = new Array();
            for (var i = 0; i < c; i++) {
                try {
                    activeDocument.backgroundLayer;
                    selectedLayers.push(desc.getReference(i)
                        .getIndex());
                } catch (e) {
                    selectedLayers.push(desc.getReference(i)
                        .getIndex() + 1);
                }
            }
        } else {
            var ref = new ActionReference();
            ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("ItmI"));
            ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
            try {
                activeDocument.backgroundLayer;
                selectedLayers.push(executeActionGet(ref)
                    .getInteger(charIDToTypeID("ItmI")) - 1);
            } catch (e) {
                selectedLayers.push(executeActionGet(ref)
                    .getInteger(charIDToTypeID("ItmI")));
            }
        }
        return selectedLayers;
    };

    function makeActiveByIndex(idx, visible) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), idx)
        desc.putReference(charIDToTypeID("null"), ref);
        desc.putBoolean(charIDToTypeID("MkVs"), visible);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    };
};

// Read one or more selected fonts
function readTextLayer() {
    if (app.documents.length > 0) {
        var myDoc = app.activeDocument;
        var myLayer = myDoc.activeLayer;
        if (myLayer.kind == LayerKind.TEXT) {
            var thisText = myLayer.textItem;
            // Renaming the Justifcation info from Justification.CENTER - > Center;
            try {
                var theJustification = String(thisText.justification)
                    .replace("Justification.", "")
            } catch (e) {
                var theJustification = "LEFT"
            };

            theJustification = theJustification[0] + theJustification.slice(1, theJustification.length)
                .toLowerCase();

            var fonts = getFonts(app.activeDocument.activeLayer);

            for (var i = 0; i < fonts.length; i++) {

                /*[myLayer.bounds[0] + i * 150, myLayer.bounds[3] + 15]*/

                //Code for dynamically figuring out width hieght canvas size and placing the text objects accordingly//

                //(myDoc.width > myDoc.height?[, ]:[])

                var x, y;
                var topMargin = 20;

                if (myDoc.width > myDoc.height) {
                    x = myLayer.bounds[0] + i * 130;
                    y = myLayer.bounds[3] + topMargin;
                } else {
                    x = myLayer.bounds[0] + 1;
                    y = myLayer.bounds[3] + (i * 80) + topMargin;
                }

                addTextLayer(
                    ((fonts.length > 1) ? fonts[i].text + ((fonts[i].text.length) ? "\r" : '') : '') + "Font: " + fonts[i].font + "\r" + "Size: " + fonts[i].size + "\r" + "Color: #" + fonts[i].color.rgb.hexValue + "\r" + ((i === 0 && fonts[i].leading !== '' && TextLeading == true) ? "Leading: " + fonts[i].leading + "\r" : '') + ((i === 0 && TextJustification == true) ? "Justify: " + theJustification + "\r" : ''),
                    "Font Info #" + (i + 1), [x, y]);
            }
        }
    }
};

// Add's a text layer which contains the content of the read string above
function addTextLayer(theText, theName, thePosition) {
    var aTextLayer = app.activeDocument.artLayers.add();
    aTextLayer.kind = LayerKind.TEXT;
    aTextLayer.name = theName;
    var aTextLayerRef = aTextLayer.textItem;
    aTextLayerRef.kind = TextType.POINTTEXT;
    aTextLayerRef.size = 10;
    aTextLayerRef.font = "Arial-BoldMT";
    aTextLayerRef.color = app.foregroundColor;
    aTextLayerRef.justification = Justification.LEFT;
    aTextLayerRef.position = thePosition;
    aTextLayer.blendMode = BlendMode.NORMAL;
    aTextLayer.opacity = 100;
    aTextLayer.fillOpacity = 100;
    aTextLayerRef.useAutoLeading = true;
    aTextLayerRef.leading = 0;
    aTextLayerRef.horizontalScale = 100;
    aTextLayerRef.verticalScale = 100;
    aTextLayerRef.contents = theText;
    aTextLayerRef.antiAliasMethod = AntiAlias.SHARP;


    //Move the newly created font layers into the existing "Pixel Spec" folder
    var doc = app.activeDocument;
    var srcLayer = doc.activeLayer;

    try {
        moveLayerToSet(doc, srcLayer, 'Pixel Specs');
    } catch (error) {
        false;
    }

    function moveLayerToSet(doc, srcLayer, toLayerName) {
        var destLayer = doc.layers[toLayerName];
        if (destLayer.layers) destLayer = destLayer.layers[0];
        srcLayer.move(destLayer, ElementPlacement.PLACEBEFORE);
    }



};

function getColorFromDescriptor(colorDesc, keyClass) {
    var colorObject = new SolidColor();
    switch (keyClass) {
        case "Grsc":
            colorObject.grey.grey = color.getDouble(charIDToTypeID('Gry '));
            break;
        case "RGBC":
            colorObject.rgb.red = colorDesc.getDouble(charIDToTypeID('Rd  '));
            colorObject.rgb.green = colorDesc.getDouble(charIDToTypeID('Grn '));
            colorObject.rgb.blue = colorDesc.getDouble(charIDToTypeID('Bl  '));
            break;
        case "CMYC":
            colorObject.cmyk.cyan = colorDesc.getDouble(charIDToTypeID('Cyn '));
            colorObject.cmyk.magenta = colorDesc.getDouble(charIDToTypeID('Mgnt'));
            colorObject.cmyk.yellow = colorDesc.getDouble(charIDToTypeID('Ylw '));
            colorObject.cmyk.black = colorDesc.getDouble(charIDToTypeID('Blck'));
            break;
        case "LbCl":
            colorObject.lab.l = colorDesc.getDouble(charIDToTypeID('Lmnc'));
            colorObject.lab.a = colorDesc.getDouble(charIDToTypeID('A   '));
            colorObject.lab.b = colorDesc.getDouble(charIDToTypeID('B   '));
            break;
        default:
            return null;
    }
    return colorObject;
};
// get fonts and other parameters used in type layer
function getFonts(textLayer) {

    function markReturnedContentText(text) {
        if (font_content_detection) {
            return font_content_detection_symbols[0] + text + font_content_detection_symbols[1] + "\r";
        } else {
            return '';
        }
    }

    if (textLayer.kind == LayerKind.TEXT) {

        app.activeDocument.activeLayer = textLayer;
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var layerDesc = executeActionGet(ref);
        var textDesc = layerDesc.getObjectValue(stringIDToTypeID('textKey'));
        var rangeList = textDesc.getList(stringIDToTypeID('textStyleRange'));

        var fonts = [];

        for (var m = 0; m < rangeList.count; m++) {
            var styleDesc = rangeList.getObjectValue(m)
                .getObjectValue(stringIDToTypeID('textStyle'));
            var aFrom = rangeList.getObjectValue(m)
                .getInteger(stringIDToTypeID('from'));
            var aTo = rangeList.getObjectValue(m)
                .getInteger(stringIDToTypeID('to'));
            if (m > 0) {
                if (rangeList.getObjectValue(m - 1)
                    .getInteger(stringIDToTypeID('from')) == aFrom && rangeList.getObjectValue(m - 1)
                    .getInteger(stringIDToTypeID('to')) == aTo) continue;
            }
            var theLetters = app.activeDocument.activeLayer.textItem.contents.substring(aFrom, aTo);

            var aFont = styleDesc.getString(stringIDToTypeID('fontPostScriptName'));

            //var aSize = styleDesc.getUnitDoubleValue(stringIDToTypeID('size')) + " " + typeIDToCharID(styleDesc.getUnitDoubleType(stringIDToTypeID('size')));
            var aSize = new UnitValue(styleDesc.getUnitDoubleValue(stringIDToTypeID('size')), "px");
            //Check if font has been transformed
            if (textDesc.hasKey(stringIDToTypeID('transform'))) {
                var mFactor = textDesc.getObjectValue(stringIDToTypeID('transform')).getUnitDoubleValue(stringIDToTypeID("yy"));
                aSize = Math.round(aSize * mFactor);
            }
            var aColor = getColorFromDescriptor(styleDesc.getObjectValue(charIDToTypeID("Clr ")), typeIDToCharID(styleDesc.getClass(charIDToTypeID("Clr "))));

            if (styleDesc.hasKey(stringIDToTypeID('leading'))) {
                var aLeading = new UnitValue(styleDesc.getUnitDoubleValue(stringIDToTypeID('leading')), "px");
            } else {
                var aLeading = "";
            }

            var txt = theLetters.replace(/^\s+/, '').replace(/\s+$/, '');
            var merged = false;

            if (txt.length > 0) {
                for (var x = 0; x < m; x++) {
                    try {
                        if (fonts[x].font === aFont && fonts[x].size === aSize && fonts[x].color.rgb.hexValue === aColor.rgb.hexValue && fonts[x].leading === aLeading) {
                            // It's a hack!!!
                            if (fonts[x].text !== txt) {
                                fonts[x].text += markReturnedContentText(txt);
                            }
                            merged = true;
                        }
                    } catch (e) {}
                }

                if (!merged) {
                    fonts.push({
                        text: markReturnedContentText(txt),
                        font: aFont,
                        size: aSize,
                        color: aColor,
                        leading: aLeading
                    });
                }
            }

        };

        return fonts;

    }
};