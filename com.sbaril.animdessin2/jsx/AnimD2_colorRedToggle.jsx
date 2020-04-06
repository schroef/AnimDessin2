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


function colorRedToggle() {
  try {
    var idHd = charIDToTypeID( "Hd  " );
    var desc6 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var list1 = new ActionList();
    var ref3 = new ActionReference();
    var idSoFi = charIDToTypeID( "SoFi" );
    ref3.putIndex( idSoFi, 1 );
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref3.putEnumerated( idLyr, idOrdn, idTrgt );
    list1.putReference( ref3 );
    desc6.putList( idnull, list1 );
    executeAction( idHd, desc6, DialogModes.NO );
  } catch (e) {
    // alert(e)
  }
};

//=========================================
//                    colorRedToggle.main
//=========================================
//

colorRedToggle.main = function () {
  colorRedToggle();
};

app.activeDocument.suspendHistory("Toggle Color the Video Frame in Red", 'colorRedToggle.main()');
