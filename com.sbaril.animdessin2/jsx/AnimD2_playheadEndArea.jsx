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

function playheadEndArea() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        
        // function ftn1() {
        //     function cTID(s) { return app.charIDToTypeID(s); };
        //     function sTID(s) { return app.stringIDToTypeID(s); };

        //     var desc46 = new ActionDescriptor();
        //     var ref30 = new ActionReference();
        //     ref30.putProperty( cTID('Prpr'), sTID('time') );
        //     ref30.putClass( sTID('timeline') );
        //     desc46.putReference( cTID('null'), ref30 );
        //     var desc47 = new ActionDescriptor();
        //     desc47.putInteger( sTID('seconds'), 2 );
        //     desc47.putInteger( sTID('frame'), 8 );
        //     desc47.putDouble( sTID('frameRate'), 30.000000 );
        //     desc46.putObject( cTID('T   '), sTID('timecode'), desc47 );
        //     executeAction( cTID('setd'), desc46, DialogModes.NO );
        // };
        // ftn1()

        
        // Offical code not working > Why??? > returns illegal argument
        // VIDEO TIMELINE
        var idslct = charIDToTypeID( 'slct' );
        var desc471 = new ActionDescriptor();
        var idnull = charIDToTypeID( 'null' );
        var ref412 = new ActionReference();
        var idMnspsp = charIDToTypeID( 'Mn ' );
        var idMnIt = charIDToTypeID( 'MnIt' );
        var idtimelineGoToWorkAreaEnd = stringIDToTypeID( 'timelineGoToWorkAreaEnd' );
        ref412.putEnumerated( idMnspsp, idMnIt, idtimelineGoToWorkAreaEnd ); 
        desc471.putReference( idnull, ref412 ); 
        executeAction( idslct, desc471, DialogModes.ALL ); 
  
        // NEEDS WORK, need to find framerate and length of video

        // var idsetd = charIDToTypeID( "setd" );
        // var desc422 = new ActionDescriptor();
        // var idnull = charIDToTypeID( "null" );
        // var ref197 = new ActionReference();
        // var idPrpr = charIDToTypeID( "Prpr" );
        // var idtime = stringIDToTypeID( "time" );
        // ref197.putProperty( idPrpr, idtime );
        // var idtimeline = stringIDToTypeID( "timeline" );
        // ref197.putClass( idtimeline );
        // desc422.putReference( idnull, ref197 );
        // var idT = charIDToTypeID( "T   " );
        // var desc423 = new ActionDescriptor();
        // var idseconds = stringIDToTypeID( "seconds" );
        // desc423.putInteger( idseconds, 1 );
        // var idframe = stringIDToTypeID( "frame" );
        // desc423.putInteger( idframe, 18 );
        // var idframeRate = stringIDToTypeID( "frameRate" );
        // desc423.putDouble( idframeRate, 30.000000 );
        // var idtimecode = stringIDToTypeID( "timecode" );
        // desc422.putObject( idT, idtimecode, desc423 );
        // executeAction( idsetd, desc422, DialogModes.NO );




    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};




//=========================================
// playheadEndArea.main
//=========================================
//

playheadEndArea.main = function() {
    playheadEndArea();
    // applyToAllLayers(playheadEndArea);
};

playheadEndArea.main();
// Doesnt use history
// app.activeDocument.suspendHistory(localize(locplayheadEndArea), 'playheadEndArea.main()');
