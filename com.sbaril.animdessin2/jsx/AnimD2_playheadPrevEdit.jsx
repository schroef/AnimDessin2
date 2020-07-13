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
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function playheadPrevEdit() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {

        // Set selection layer panel
        var desc83 = new ActionDescriptor();
        var ref48 = new ActionReference();
        ref48.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Bckw') );
        desc83.putReference( cTID('null'), ref48 );
        desc83.putBoolean( cTID('MkVs'), false );
        var list25 = new ActionList();
        list25.putInteger( 5 );
        desc83.putList( cTID('LyrI'), list25 );
        executeAction( cTID('slct'), desc83, DialogModes.NO );

        // https://www.ps-scripts.com/viewtopic.php?f=77&t=40409&p=169007&hilit=timeline#p169007
        // Get frame numers
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID('property'), stringIDToTypeID('time'));
        ref.putClass(stringIDToTypeID('timeline'), stringIDToTypeID('timeline'));
        var desc = executeActionGet(ref); // <- it's here inside desc

        var time_Seconds = desc.getObjectValue(stringIDToTypeID('time')).getInteger(stringIDToTypeID('seconds'))
        var time_Frame = desc.getObjectValue(stringIDToTypeID('time')).getInteger(stringIDToTypeID('frame'))
        var time_FrameRate = desc.getObjectValue(stringIDToTypeID('time')).getDouble(stringIDToTypeID('frameRate'))

        // Set playhead to selection
        // Move playhead 1 second
        var idsetd = charIDToTypeID( "setd" );
        var desc36 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref18 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idtime = stringIDToTypeID( "time" );
        ref18.putProperty( idPrpr, idtime );
        var idtimeline = stringIDToTypeID( "timeline" );
        ref18.putClass( idtimeline );
        desc36.putReference( idnull, ref18 );
        var idT = charIDToTypeID( "T   " );
        var desc37 = new ActionDescriptor();
        var idseconds = stringIDToTypeID( "seconds" );
        desc37.putInteger( idseconds, 0 );
        var idframe = stringIDToTypeID( "frame" );
        desc37.putInteger( idframe, (time_Frame - 1) );
        var idframeRate = stringIDToTypeID( "frameRate" );
        desc37.putDouble( idframeRate, time_FrameRate);
        var idtimecode = stringIDToTypeID( "timecode" );
        desc36.putObject( idT, idtimecode, desc37 );
        executeAction( idsetd, desc36, DialogModes.NO );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};




//=========================================
// playheadPrevEdit.main
//=========================================
//

playheadPrevEdit.main = function() {
    playheadPrevEdit();
    // applyToAllLayers(playheadPrevEdit);
};

playheadPrevEdit.main();
// Doesnt use history
// app.activeDocument.suspendHistory(localize(locplayheadPrevEdit), 'playheadPrevEdit.main()');
