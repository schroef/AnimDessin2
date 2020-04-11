// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

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

function create1FrameVideoLayer() {

    // =======================================================
    var idaddBlankVideoLayer = stringIDToTypeID( "addBlankVideoLayer" );
    executeAction( idaddBlankVideoLayer, undefined, DialogModes.NO );
    
    // =======================================================
    // Reduze the end of the layer to the actual frame
    var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
    var desc99 = new ActionDescriptor();
    executeAction( idmoveOutTime, desc99, DialogModes.NO );


    // =======================================================
    // Function to get the framerate of the actual documment
    function GetFrameRate(){
        var ref = new ActionReference();
        ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID("documentTimelineSettings") );
        ref.putClass( stringIDToTypeID( "timeline" ) );
        var desc = new ActionDescriptor();
        desc.putReference( charIDToTypeID( 'null' ), ref );
        var resultDesc = executeAction( charIDToTypeID( 'getd' ), desc, DialogModes.NO );

        return resultDesc.getDouble( stringIDToTypeID('frameRate') );
    };

    var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
    var desc123 = new ActionDescriptor();
    var idtimeOffset = stringIDToTypeID( "timeOffset" );
    var desc124 = new ActionDescriptor();
    var idseconds = stringIDToTypeID( "seconds" );
    desc124.putInteger( idseconds, 0 );
    var idframe = stringIDToTypeID( "frame" );
    desc124.putInteger( idframe, 0 );               // Value 0=1; 1=2 …
    var idframeRate = stringIDToTypeID( "frameRate" );
    desc124.putDouble( idframeRate, GetFrameRate() );
    var idtimecode = stringIDToTypeID( "timecode" );
    desc123.putObject( idtimeOffset, idtimecode, desc124 );
    executeAction( idmoveOutTime, desc123, DialogModes.NO );


     // =======================================================
    var idnextFrame = stringIDToTypeID( "nextFrame" );
    var desc211 = new ActionDescriptor();
    var idtoNextWholeSecond = stringIDToTypeID( "toNextWholeSecond" );
    desc211.putBoolean( idtoNextWholeSecond, false );
    executeAction( idnextFrame, desc211, DialogModes.NO );

};

//=========================================
// create1FrameVideoLayer.main
//=========================================
//

create1FrameVideoLayer.main = function () {
  create1FrameVideoLayer();
};

app.activeDocument.suspendHistory("Create 1 frame Video Layer", 'create1FrameVideoLayer.main()');