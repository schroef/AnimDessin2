// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// https://stackoverflow.com/questions/26295492/photoshop-script-new-layer-below-current-layer
// select [LayerNum], optionally [add] to selection (if add=2: with inclusion)
function selLyr(LyrN, add) {
    var adesc = new ActionDescriptor();
    var aref = new ActionReference();
    aref.putIndex(charIDToTypeID("Lyr "), LyrN);
    adesc.putReference(charIDToTypeID("null"), aref);
    if (add) {
        add = (add == 2) ? stringIDToTypeID("addToSelectionContinuous") : stringIDToTypeID("addToSelection");
        adesc.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), add);
    }
    adesc.putBoolean(charIDToTypeID("MkVs"), false);
    return executeAction(charIDToTypeID("slct"), adesc, DialogModes.NO);
}


/// ////////////////////////////////////////////////////////////////////////////
// Function: Combination of getSelectedLayersAMIdx & getLayerInfo
// Usage: extract a list of index values of all the selected layers & ID layernamer
// Input:: (active document.) s
// Return: array of indexes ID"s of selected layers.
// Mixed this so it only loops once over all layers
/// ////////////////////////////////////////////////////////////////////////////
function getSelectedLayersInfo(docRef) {
    var selectedLayers = new Array()
    var ref = new ActionReference()
    // get a number list of selected artLayers in the document
    ref.putProperty(app.charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"))
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
    // what do I want to do this this list? Define an description of an action.
    var desc = executeActionGet(ref)
    // if the selected object has the "Target Layers" key (only works CS4+)
    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        desc = desc.getList(stringIDToTypeID("targetLayers"))
        var c = desc.count
        var selectedLayers = [] // for each
        for (var i = 0; i < c; i++) {
            var obj = {}
            var lyrIndex;
            try {
                docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                // selectedLayers.push(desc.getReference(i).getIndex())
                lyrIndex = desc.getReference(i).getIndex();
            } catch (e) {
                // selectedLayers.push(desc.getReference(i).getIndex() + 1)
                lyrIndex = desc.getReference(i).getIndex() + 1;
            }
            
            // Added from getLayerInfo
            var lyrRef = new ActionReference();
            lyrRef.putIndex(charIDToTypeID("Lyr "), lyrIndex )
            var lyrDesc = executeActionGet(lyrRef);
            var Id = lyrDesc.getInteger(stringIDToTypeID("layerID"));
            obj.AMid = Id;
            obj.lyrIndex = lyrIndex;
            selectedLayers.push(obj);
        }
    }
    return selectedLayers
}


/// ////////////////////////////////////////////////////////////////////////////
// Function: getSelectedLayersAMIdx
// Usage: extract a list of index values of all the selected layers.
// Input:: (active document.) s
// Return: array of indexes ID"s of selected layers.
/// ////////////////////////////////////////////////////////////////////////////
function getSelectedLayersAMIdx(docRef) {
    var selectedLayers = new Array()
    var ref = new ActionReference()
    // get a number list of selected artLayers in the document
    ref.putProperty(app.charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"))
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
    // what do I want to do this this list? Define an description of an action.
    var desc = executeActionGet(ref)
    // if the selected object has the "Target Layers" key (only works CS4+)
    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        desc = desc.getList(stringIDToTypeID("targetLayers"))
        var c = desc.count;
        var selectedLayers = [] // for each
        for (var i = 0; i < c; i++) {
            try {
                docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                selectedLayers.push(desc.getReference(i).getIndex());
            } catch (e) {
                selectedLayers.push(desc.getReference(i).getIndex() + 1);
            }
        }
    }
    // alert("selLayres:" + selectedLayers)
    return selectedLayers
}


// Get Layer ID and Name > perhaps this can all be done in getSelectedLayersAMIdx
function getLayerInfo(inArray) {
    var infoList = []
    for (var i = 0; i < inArray.length; i++) {
        var obj = {}
        ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), inArray[i]);
        var desc = executeActionGet(ref)
        var Id = desc.getInteger(stringIDToTypeID("layerID"));
        // var name = desc.getString(charIDToTypeID("Nm  "))
        // var isArtboard = desc.getBoolean(stringIDToTypeID("artboardEnabled"))
        var isVisible = desc.getBoolean(charIDToTypeID("Vsbl"));
        // if (isArtboard && isVisible) {
        if (isVisible) {
            // obj.name = name
            obj.AMid = Id;
            //     obj.visible = isVisible
            //     var ab_actDesc = desc.getObjectValue(stringIDToTypeID("artboard"))
            //     obj.bgType = ab_actDesc.getInteger(stringIDToTypeID("artboardBackgroundType"))
            //     var abBgColor_desc = ab_actDesc.getObjectValue(charIDToTypeID("Clr "))
            //     obj.bgColor = [
            //         abBgColor_desc.getDouble(charIDToTypeID("Rd  ")),
            //         abBgColor_desc.getDouble(charIDToTypeID("Grn ")),
            //         abBgColor_desc.getDouble(charIDToTypeID("Bl  "))
            //     ]
            //     obj.empty = isArtboardEmpty(inArray[i])
            infoList.push(obj);
        }
    }
    return infoList
}

// https://graphicdesign.stackexchange.com/questions/130739/photoshop-scripting-applying-changes-only-to-selected-artboards
function selectById(AMid) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIdentifier(charIDToTypeID('Lyr '), AMid);
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
}


// Apply Function to selection > called from each JSX file
// var selectedLayers = getSelectedLayersAMIdx(docRef);
// var selFromStart = selectedLayers;
// var layerInfo = getLayerInfo(selectedLayers);

// Faster combined loop method
var layerInfo = getSelectedLayersInfo(docRef);
var selFromStart = layerInfo.length;

// Progressbar vars
// setup the environment
env = new Object();
env.version = parseInt(app.version, 10);

var totProgress = layerInfo.length * 2;
var progress = 0;
var progressWindow;
var cancelButtonID = 2;
// var progBarLabel = "";

function applyToSelected(callFunction) {
    if (env.version < 9) {
        alert("Photoshop versions before CS2 are not supported!", "Error", true);
        return "cancel";
    }
    // if (layerInfo.length > 10) {
    //     progressbar();
    // }
    // Get IDX of each selected layer
    for (var i = 0; i < layerInfo.length; i++) {
        selectById(layerInfo[i].AMid);
        callFunction();
    }
    // reselect selected like from start
    // Makes progress slower > Not much difference
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(layerInfo[i].lyrIndex, 1);
        // selLyr(selectedLayers[i], 1);
    }
}


// Progress bar
function createProgressWindow(title, min, max, parent, useCancel) {
    var win = new Window('palette', title);
    win.bar = win.add('progressbar', undefined, min, max);
    win.bar.preferredSize = [300, 20];

    win.progBarLabel = win.add("statictext", [20, 20, 320, 35], "Progress");
    win.progBarLabel.alignment = "left";
    win.progBarLabel.text = "Progress";

    win.parent = undefined;

    if (parent) {
        if (parent instanceof Window) {
            win.parent = parent;
        } else if (useCancel == undefined) {
            useCancel = parent;
        }
    }

    if (useCancel) {
        win.cancel = win.add('button', undefined, 'Cancel');
        win.cancel.onClick = function() {
            try {
                if (win.onCancel) {
                    var rc = win.onCancel();
                    if (rc || rc == undefined) {
                        win.close();
                    }
                } else {
                    win.close();
                }
            } catch (e) {
                alert(e);
            }
            win.close();
        }
    }

    win.updateProgress = function(val) {
        var win = this;
        win.bar.value = val;
        // recenter the progressWindow if desired
        // win.center(win.parent);
        // win.update(); // Doesnt seem to work cogs app
        // app.refresh(); // Doubles the progress somehow? But cancel can be clicked
        win.show();
        win.hide();
        // win.show(); //Last hide make it appear again?
    }
    win.center(win.parent);
    return win;
};

// function updateBar(win, val){
//         win.bar.value = val;
//         win.show();
//         win.hide();
//     return win;
// };

// And here's an example of how it would be used:
// Code: Select all  // we have to process an array of files
function progressbar() {
    var layers = layerInfo;
    totProgress = totProgress/2;
    progressWindow = createProgressWindow("Progress...", 0, totProgress, true);
    progressWindow.isDone = false;
    progressWindow.onCancel = function() {
        this.isDone = true;
        progressWindow.close();
        return true; // return 'true' to close the window
    }

    try {
        for (var i = 0; i < totProgress; i++) {
            if (progressWindow.isDone) {
                // progressWindow.close();
                break;
            }
            // progressWindow.text = ("Processing file " + (i + 1) + " of " + layers.length + "...");
            // progressWindow.text = ("Progress " + (i + 1) + " of " + totProgress + "...");
            progressWindow.progBarLabel.text = "Progress " + (i + 1) + " of " + totProgress + "...";
            
            // now process the next file
            progressWindow.updateProgress(i);
            // updateBar(progressWindow, i);
        }
    } catch (e) {
        alert(e);

    } finally {
        progressWindow.close();
    }
};


// From Export layers to files (fast)
// https://github.com/jwa107/Photoshop-Export-Layers-as-Images
function repaintProgressBar(win, force /* = false*/ ) {
    if (env.version >= 11) { // CS4 added support for UI updates; the previous method became unbearably slow, as is app.refresh()
        if (force) {
            app.refresh();
        } else {
            win.update();
        }
    } else {
        // CS3 and below
        var d = new ActionDescriptor();
        d.putEnumerated(app.stringIDToTypeID('state'), app.stringIDToTypeID('state'), app.stringIDToTypeID('redrawComplete'));
        app.executeAction(app.stringIDToTypeID('wait'), d, DialogModes.NO);
    }
};