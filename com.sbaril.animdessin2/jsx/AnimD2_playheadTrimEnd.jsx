// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;
///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

var ScriptFilePath = Folder($.fileName).parent.fsName ; 
$.evalFile(new File(ScriptFilePath + '/AnimD2_getSelectedLayers.jsx'));

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function playheadTrimEnd() {

    // ErrStrs = {}; 
    // ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
        var desc14 = new ActionDescriptor();
        executeAction( idmoveOutTime, desc14, DialogModes.NO );

    }
    catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }

};
//=========================================
//                    playheadTrimEnd.main
//=========================================
//

function playheadTrimEndSelected() {
    var selectedLayers = getSelectedLayersAMIdx(docRef);
    var selFromStart = selectedLayers;
    layerInfo = getLayerInfo(selectedLayers)

    for (var i = 0; i < layerInfo.length; i++) {
        docRef.activeLayer = docRef.layers[layerInfo[i].name];
        playheadTrimEnd();
    }
    // reselect selected like from start
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(selFromStart[i],1);
    }
}

playheadTrimEnd.main = function () {
  playheadTrimEndSelected();
};

//app.activeDocument.suspendHistory("??", 'playheadTrimEnd.main()');
playheadTrimEnd.main();