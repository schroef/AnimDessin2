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


function colorGreenToggle() {
  try {
    var idHd = charIDToTypeID( "Hd  " );
    var desc8 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var list3 = new ActionList();
    var ref5 = new ActionReference();
    var idSoFi = charIDToTypeID( "SoFi" );
    ref5.putIndex( idSoFi, 1 );
    var idLyr = charIDToTypeID( "Lyr " );
    ref5.putName( idLyr, "Layer 1" );
    list3.putReference( ref5 );
    desc8.putList( idnull, list3 );
    executeAction( idHd, desc8, DialogModes.NO );

  } catch (e) {
    // alert(e)
  }
};

//=========================================
//                    colorGreenToggle.main
//=========================================
//

colorGreenToggle.main = function () {
  colorGreenToggle();
};

app.activeDocument.suspendHistory("Toggle Color the Video Frame in Green", 'colorGreenToggle.main()');
