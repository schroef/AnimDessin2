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


function AnimD2_colorFxShowAll() {

    function cTID(s) { return app.charIDToTypeID(s); };
    function sTID(s) { return app.stringIDToTypeID(s); };

    var desc154 = new ActionDescriptor();
    var ref72 = new ActionReference();
    ref72.putProperty( cTID('Prpr'), cTID('lfxv') );
    ref72.putEnumerated( cTID('Dcmn'), cTID('Ordn'), cTID('Trgt') );
    desc154.putReference( cTID('null'), ref72 );
    var desc155 = new ActionDescriptor();
    desc155.putBoolean( cTID('lfxv'), true );
    desc154.putObject( cTID('T   '), cTID('lfxv'), desc155 );
    executeAction( cTID('setd'), desc154, DialogModes.NO );

};

//=========================================
//                    AnimD2_colorFxShowAll.main
//=========================================
//

AnimD2_colorFxShowAll.main = function () {
  AnimD2_colorFxShowAll();
};

app.activeDocument.suspendHistory("Show all layers Effects", 'AnimD2_colorFxShowAll.main()');