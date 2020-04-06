#target photoshop
//
// AAAnimD2_newVideoGroupSelection.jsx
//

//
// Generated Wed May 14 2014 16:13:27 GMT+0200
//


//
//==================== AnimD2_newVideoGroupSelection ==============
//
function AnimD2_newVideoGroupSelection() {
    // var idsave = charIDToTypeID( 'Ungr' );
    // var idsave = charIDToTypeID( 'Unlk' );
    // executeAction( idsave, undefined, DialogModes.ALL );

    app.runMenuItem(stringIDToTypeID('ungroupLayersEvent'));

    // var layerRef = app.activeDocument.artLayers.getByName("Video Group 1");
    // layerRef.allLocked = true;
    // var idslct = charIDToTypeID( "slct" );
    // var desc237 = new ActionDescriptor();
    // var idnull = charIDToTypeID( "null" );
    // var ref134 = new ActionReference();
    // var idLyr = charIDToTypeID( "Lyr " );
    // ref134.putName( idLyr, "Video Group 1" );
    // desc237.putReference( idnull, ref134 );
    // var idMkVs = charIDToTypeID( "MkVs" );
    // desc237.putBoolean( idMkVs, false );
    // var idLyrI = charIDToTypeID( "LyrI" );
    // var list92 = new ActionList();
    // list92.putInteger( 50 );
    // desc237.putList( idLyrI, list92 );
    // executeAction( idslct, desc237, DialogModes.NO );

    // // =======================================================
    // var idinvokeCommand = stringIDToTypeID( "invokeCommand" );
    // var desc238 = new ActionDescriptor();
    // var idcommandID = stringIDToTypeID( "commandID" );
    // desc238.putInteger( idcommandID, 2959 );
    // var idkcanDispatchWhileModal = stringIDToTypeID( "kcanDispatchWhileModal" );
    // desc238.putBoolean( idkcanDispatchWhileModal, true );
    // executeAction( idinvokeCommand, desc238, DialogModes.NO );

    // // =======================================================
    // var idungroupLayersEvent = stringIDToTypeID( "ungroupLayersEvent" );
    // var desc239 = new ActionDescriptor();
    // var idnull = charIDToTypeID( "null" );
    // var ref135 = new ActionReference();
    // var idLyr = charIDToTypeID( "Lyr " );
    // var idOrdn = charIDToTypeID( "Ordn" );
    // var idTrgt = charIDToTypeID( "Trgt" );
    // ref135.putEnumerated( idLyr, idOrdn, idTrgt );
    // desc239.putReference( idnull, ref135 );
    // executeAction( idungroupLayersEvent, desc239, DialogModes.NO );
};



//=========================================
//                    AnimD2_newVideoGroupSelection.main
//=========================================
//

AnimD2_newVideoGroupSelection.main = function () {
  AnimD2_newVideoGroupSelection();
};

//AnimD2_newVideoGroupSelection.main();
app.activeDocument.suspendHistory("New Video Group from Selection", 'AnimD2_newVideoGroupSelection.main()');

// EOF

"AAAnimD2_newVideoGroupSelection.jsx"
// EOF
