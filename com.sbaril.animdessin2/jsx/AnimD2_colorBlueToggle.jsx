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

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function colorBlueToggle() {
  try {
    var idHd = charIDToTypeID( "Hd  " );
    var desc11 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var list6 = new ActionList();
    var ref8 = new ActionReference();
    var idSoFi = charIDToTypeID( "SoFi" );
    ref8.putIndex( idSoFi, 1 );
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref8.putEnumerated( idLyr, idOrdn, idTrgt );
    list6.putReference( ref8 );
    desc11.putList( idnull, list6 );
    executeAction( idHd, desc11, DialogModes.NO );
  } catch (e) {
    // alert(e)
  }
};

//=========================================
//                    colorBlueToggle.main
//=========================================
//

colorBlueToggle.main = function () {
  colorBlueToggle();
};

app.activeDocument.suspendHistory("Toggle Color the Video Frame in Blue", 'colorBlueToggle.main()');
