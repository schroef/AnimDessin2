// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools�) by St�phane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

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

function framePlusOne() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Function to get the framerate of the actual document
        function GetFrameRate(){
            var ref = new ActionReference();
            ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID("documentTimelineSettings") );
            ref.putClass( stringIDToTypeID( "timeline" ) );
            var desc = new ActionDescriptor();
            desc.putReference( charIDToTypeID( 'null' ), ref );
            var resultDesc = executeAction( charIDToTypeID( 'getd' ), desc, DialogModes.NO );
            return resultDesc.getDouble( stringIDToTypeID('frameRate') );
        };

        // So here the number of additional frames is difine ( idframe, 1 )
        var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
        var desc123 = new ActionDescriptor();
        var idtimeOffset = stringIDToTypeID( "timeOffset" );
        var desc124 = new ActionDescriptor();
        var idseconds = stringIDToTypeID( "seconds" );
        desc124.putInteger( idseconds, 0 );
        var idframe = stringIDToTypeID( "frame" );
        desc124.putInteger( idframe, 1 );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc124.putDouble( idframeRate, GetFrameRate() );
        var idtimecode = stringIDToTypeID( "timecode" );
        desc123.putObject( idtimeOffset, idtimecode, desc124 );
        executeAction( idmoveOutTime, desc123, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};

//=========================================
// framePlusOne.main
//=========================================
//

framePlusOne.main = function () {
    applyToAllLayers(framePlusOne);
};

app.activeDocument.suspendHistory(localize(locFramePlusOne), 'framePlusOne.main()');