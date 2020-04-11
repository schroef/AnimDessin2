// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();

///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function timelineRenderVideo() {

    // Show Timeline Panel
    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation"); 
    try {
        var idExpr = charIDToTypeID( 'Expr' );
        var desc1081 = new ActionDescriptor();
        var idUsng = charIDToTypeID( 'Usng' );
        var idvideoExport = stringIDToTypeID( 'videoExport' );
        desc1081.putClass( idUsng, idvideoExport );
        executeAction( idExpr, desc1081, DialogModes.ALL );
    } 
    catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;} 
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }

};
//=========================================
// timelineRenderVideo.main
//=========================================
//

timelineRenderVideo.main = function () {
  timelineRenderVideo();
};

//app.activeDocument.suspendHistory("Show / Hide the Timeline Panel", 'timelineRenderVideo.main()');
timelineRenderVideo.main();