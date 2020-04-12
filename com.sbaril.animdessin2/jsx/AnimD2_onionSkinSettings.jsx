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


function onSkinSettings() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var idslct = charIDToTypeID( "slct" );
        var desc48 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref24 = new ActionReference();
        var idMn = charIDToTypeID( "Mn  " );
        var idMnIt = charIDToTypeID( "MnIt" );
        var idtimelineOnionSkinSettings = stringIDToTypeID( "timelineOnionSkinSettings" );
        ref24.putEnumerated( idMn, idMnIt, idtimelineOnionSkinSettings );
        desc48.putReference( idnull, ref24 );
        executeAction( idslct, desc48, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// onSkinSettings.main
//=========================================
//

onSkinSettings.main = function () {
  onSkinSettings();
};

//app.activeDocument.suspendHistory("Onion Skin Settings", 'onSkinSettings.main()');
onSkinSettings.main();