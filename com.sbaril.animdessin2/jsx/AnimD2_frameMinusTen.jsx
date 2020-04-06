// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools�) by St�phane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;
///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////


// https://stackoverflow.com/questions/26295492/photoshop-script-new-layer-below-current-layer
// select [LayerNum], optionally [add] to selection (if add=2: with inclusion)
function selLyr(LyrN,add){
    var adesc = new ActionDescriptor();
    var aref = new ActionReference();
    aref.putIndex(charIDToTypeID("Lyr "), LyrN);
    adesc.putReference(charIDToTypeID("null"), aref);
    if(add){
        add = (add==2) ? stringIDToTypeID("addToSelectionContinuous") : stringIDToTypeID("addToSelection");
        adesc.putEnumerated(stringIDToTypeID("selectionModifier"),stringIDToTypeID("selectionModifierType"),add);
    }
    adesc.putBoolean(charIDToTypeID("MkVs"), false);
    return executeAction(charIDToTypeID("slct"), adesc, DialogModes.NO);
}

function frMinOne() {
    var selectedLayers = getSelectedLayersAMIdx(docRef);
    var selFromStart = selectedLayers;
    layerInfo = getLayerInfo(selectedLayers)

    for (var i = 0; i < layerInfo.length; i++) {
        docRef.activeLayer = docRef.layers[layerInfo[i].name];
        frameMinusOne();
    }
    // reselect selected like from start
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(selFromStart[i],1)
    }

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
    return selectedLayers
}

function getLayerInfo(inArray) {
    var infoList = []
    for (var i = 0; i < inArray.length; i++) {
        var obj = {}
        ref = new ActionReference()
        ref.putIndex(charIDToTypeID("Lyr "), inArray[i])
        var desc = executeActionGet(ref)
        // var Id = desc.getInteger(stringIDToTypeID("layerID"))
        var name = desc.getString(charIDToTypeID("Nm  "))
        // var isArtboard = desc.getBoolean(stringIDToTypeID("artboardEnabled"))
        var isVisible = desc.getBoolean(charIDToTypeID("Vsbl"))
        // if (isArtboard && isVisible) {
        if (isVisible) {
            obj.name = name
        //     obj.AMid = Id
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
    }
    return infoList
}


///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function frameMinusOne() {

    // =======================================================

    function GetFrameRate(){
        var ref = new ActionReference();
         ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID("documentTimelineSettings") );
          ref.putClass( stringIDToTypeID( "timeline" ) );
         var desc = new ActionDescriptor();
         desc.putReference( charIDToTypeID( 'null' ), ref );
         var resultDesc = executeAction( charIDToTypeID( 'getd' ), desc, DialogModes.NO );

         return resultDesc.getDouble( stringIDToTypeID('frameRate') );
    };
        var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
            var desc6 = new ActionDescriptor();
            var idtimeOffset = stringIDToTypeID( "timeOffset" );
                var desc7 = new ActionDescriptor();
                var idseconds = stringIDToTypeID( "seconds" );
                desc7.putInteger( idseconds, 0 );
                var idframe = stringIDToTypeID( "frame" );
                desc7.putInteger( idframe, -10 );
                var idframeRate = stringIDToTypeID( "frameRate" );
                desc7.putDouble( idframeRate, GetFrameRate() );
            var idtimecode = stringIDToTypeID( "timecode" );
            desc6.putObject( idtimeOffset, idtimecode, desc7 );
        executeAction( idmoveOutTime, desc6, DialogModes.NO );

    };



//=========================================
//                    frameMinusOne.main
//=========================================
//

frameMinusOne.main = function () {
  frMinOne();
//   frameMinusOne();
};

app.activeDocument.suspendHistory("Expose 1 frame less", 'frameMinusOne.main()');