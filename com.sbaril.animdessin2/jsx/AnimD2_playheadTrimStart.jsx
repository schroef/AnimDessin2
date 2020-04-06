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


function playheadTrimStart() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
        var idmoveOutTime = stringIDToTypeID( "moveInTime" );
        var desc14 = new ActionDescriptor();
        executeAction( idmoveOutTime, desc14, DialogModes.NO );
    } 
    catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }

};
//=========================================
//                    playheadTrimStart.main
//=========================================
//

function playheadTrimStartSelected() {
    var selectedLayers = getSelectedLayersAMIdx(docRef);
    var selFromStart = selectedLayers;
    layerInfo = getLayerInfo(selectedLayers)

    for (var i = 0; i < layerInfo.length; i++) {
        docRef.activeLayer = docRef.layers[layerInfo[i].name];
        playheadTrimStart();
    }
    // reselect selected like from start
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(selFromStart[i],1);
    }
}

playheadTrimStart.main = function () {
  playheadTrimStartSelected();
};

//app.activeDocument.suspendHistory("??", 'playheadTrimStart.main()');
playheadTrimStart.main();