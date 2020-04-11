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


function AnimD2_colorFxHideAll() {

    function cTID(s) { return app.charIDToTypeID(s); };
    function sTID(s) { return app.stringIDToTypeID(s); };

    var desc149 = new ActionDescriptor();
    var ref71 = new ActionReference();
    ref71.putProperty( cTID('Prpr'), cTID('lfxv') );
    ref71.putEnumerated( cTID('Dcmn'), cTID('Ordn'), cTID('Trgt') );
    desc149.putReference( cTID('null'), ref71 );
    var desc150 = new ActionDescriptor();
    desc150.putBoolean( cTID('lfxv'), false );
    desc149.putObject( cTID('T   '), cTID('lfxv'), desc150 );
    executeAction( cTID('setd'), desc149, DialogModes.NO );

};
//=========================================
//                    AnimD2_colorFxHideAll.main
//=========================================
//

AnimD2_colorFxHideAll.main = function () {
  AnimD2_colorFxHideAll();
};

app.activeDocument.suspendHistory("Hide all layers Effects", 'AnimD2_colorFxHideAll.main()');