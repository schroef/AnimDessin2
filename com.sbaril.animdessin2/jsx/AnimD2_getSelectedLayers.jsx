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
        var c = desc.count
        var selectedLayers = [] // for each
        for (var i = 0; i < c; i++) {
            try {
                docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                selectedLayers.push(desc.getReference(i).getIndex())
            } catch (e) {
                selectedLayers.push(desc.getReference(i).getIndex() + 1)
            }
        }
    }
    // alert("selLayres:" + selectedLayers)
    return selectedLayers
}

function getLayerInfo(inArray) {
    var infoList = []
    for (var i = 0; i < inArray.length; i++) {
        var obj = {}
        ref = new ActionReference()
        ref.putIndex(charIDToTypeID("Lyr "), inArray[i])
        var desc = executeActionGet(ref)
        var Id = desc.getInteger(stringIDToTypeID("layerID"))
        var name = desc.getString(charIDToTypeID("Nm  "))
        // var isArtboard = desc.getBoolean(stringIDToTypeID("artboardEnabled"))
        var isVisible = desc.getBoolean(charIDToTypeID("Vsbl"))
        // if (isArtboard && isVisible) {
        if (isVisible) {
            obj.name = name
            // alert("selLayName:" + name)
            obj.AMid = Id
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
            infoList.push(obj)
        }
        // alert("array:" + infoList[i].AMid)
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

// https://stackoverflow.com/questions/26623283/photoshop-javascript-to-get-all-layers-in-the-active-document
// var allLayers = new Array();
// const theLayers = collectAllLayers(app.activeDocument, 0);


// function collectAllLayers (theParent, level)
// {
//   for (var m = theParent.layers.length - 1; m >= 0; m--)
//   {
//     var theLayer = theParent.layers[m];
//     if (theLayer.typename != "ArtLayer")
//     {
//       allLayers.push(level + theLayer.name);
//       collectAllLayers(theLayer, level + 1)
//     }
//   }
// }
// var doc = app.activeDocument;
// var allLayers = [];
// var allLayers = collectAllLayers(doc, allLayers);

// function collectAllLayers (doc, allLayers){
//     for (var m = 0; m < doc.layers.length; m++){
//         var theLayer = doc.layers[m];
//         // alert(theLayer.typename)
//         if (theLayer.typename === "ArtLayer"){
//             allLayers.push(theLayer);
//         }else{
//             collectAllLayers(theLayer, allLayers);
//         }
//     }
//     return allLayers;
// }
// alert("all layers: " + allLayers)

// function applySelected(functionName){
//     functionName();
// };


// Apply Function to selection > called from each JSX file
var selectedLayers = getSelectedLayersAMIdx(docRef);
var selFromStart = selectedLayers;
layerInfo = getLayerInfo(selectedLayers);

function applyToSelected(callFunction) {
    // Get IDX of each selected layer
    for (var i = 0; i < layerInfo.length; i++) {
        selectById(layerInfo[i].AMid);
        callFunction();
    }
    // reselect selected like from start
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(selFromStart[i], 1);
    }
}
