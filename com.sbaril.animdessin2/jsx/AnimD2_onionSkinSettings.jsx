﻿// Copyright 2013 
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