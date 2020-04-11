// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

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

function cTID(s) {return app.charIDToTypeID(s);};
function sTID(s) {return app.stringIDToTypeID(s);};

function colorNone() {
    
    try {
        // =======================================================
        // Clear all overlay fx
        var desc597 = new ActionDescriptor();
        var ref377 = new ActionReference();
        ref377.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
        desc597.putReference( cTID('null'), ref377 );
        executeAction( sTID('disableLayerStyle'), desc597, DialogModes.NO );
    } catch (e) {
        alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"+"Turnovrlays on"));
    }
    try {
        // Clear red layer color
        var desc306 = new ActionDescriptor();
        var ref120 = new ActionReference();
        ref120.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc306.putReference(cTID('null'), ref120);
        var desc307 = new ActionDescriptor();
        desc307.putEnumerated(cTID('Clr '), cTID('Clr '), cTID('None'));
        desc306.putObject(cTID('T   '), cTID('Lyr '), desc307);
        executeAction(cTID('setd'), desc306, DialogModes.NO);

        // Separated this, runs into issue when layers dont have layer color applied
    } catch(e){
        // Dont catch this error
    }
};
//=========================================
// colorNone.main
//=========================================
//

colorNone.main = function() {
    colorNone();
};

app.activeDocument.suspendHistory("UnColorize the Video Frame(s)", 'colorNone.main()');