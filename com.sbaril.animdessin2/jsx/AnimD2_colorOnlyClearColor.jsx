// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/AnimD2_applyToAllLayers.jsx'));

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

function colorOnlyClearColor() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        var desc1042 = new ActionDescriptor();
        var ref383 = new ActionReference();
        
        //references color overlay > is index number works weird when multiple are present
        ref383.putIndex(cTID('SoFi'), 3); 
        ref383.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1042.putReference(cTID('null'), ref383);
        executeAction(cTID('dsfx'), desc1042, DialogModes.NO);

        // Clear layer color
        var desc111 = new ActionDescriptor();
        var ref38 = new ActionReference();
        ref38.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
        desc111.putReference( cTID('null'), ref38 );
        var desc112 = new ActionDescriptor();
        desc112.putEnumerated( cTID('Clr '), cTID('Clr '), cTID('None') );
        desc111.putObject( cTID('T   '), cTID('Lyr '), desc112 );
        executeAction( cTID('setd'), desc111, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};


//=========================================
//          colorOnlyClearColor.main
//=========================================


colorOnlyClearColor.main = function() {
    // colorOnlyClearColor();
    applyToAllLayers(colorOnlyClearColor);
};

app.activeDocument.suspendHistory(localize(locColorOnlyClearColor), 'colorOnlyClearColor.main()');