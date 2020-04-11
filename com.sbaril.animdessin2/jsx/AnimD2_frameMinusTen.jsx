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
//FUNCTIONS
///////////////////////////////////////////////////


function frameMinusTen() {
    // =======================================================
    function GetFrameRate(){
        var ref = new ActionReference();
        ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID("documentTimelineSettings") );
        ref.putClass( stringIDToTypeID( "timeline" ) );
        var desc = new ActionDescriptor();
        desc.putReference( charIDToTypeID( 'null' ), ref );
        var resultDesc = executeAction( charIDToTypeID( 'getd' ), desc, DialogModes.NO );
        return resultDesc.getDouble( stringIDToTypeID('frameRate') );
    };

    // Added try for catching errors if not enough frames are present
    try {
        var idmoveOutTime = stringIDToTypeID( "moveOutTime" );
        var desc6 = new ActionDescriptor();
        var idtimeOffset = stringIDToTypeID( "timeOffset" );
        var desc7 = new ActionDescriptor();
        var idseconds = stringIDToTypeID( "seconds" );
        desc7.putInteger( idseconds, 0 );
        var idframe = stringIDToTypeID( "frame" );
        desc7.putInteger( idframe, -10 );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc7.putDouble( idframeRate, GetFrameRate() );
        var idtimecode = stringIDToTypeID( "timecode" );
        desc6.putObject( idtimeOffset, idtimecode, desc7 );
        executeAction( idmoveOutTime, desc6, DialogModes.NO );
    } catch(e) {
        // Turned this off, we dont need an error warning when users cancels
        alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));
    }
};

//=========================================
// frameMinusTen.main
//=========================================
//

frameMinusTen.main = function () {
    applyToAllLayers(frameMinusTen);
};

app.activeDocument.suspendHistory("Expose 10 frames less", 'frameMinusTen.main()');