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

function playheadFirstFrame() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {

        function ftn1() {
            function cTID(s) { return app.charIDToTypeID(s); };
            function sTID(s) { return app.stringIDToTypeID(s); };

                var desc537 = new ActionDescriptor();
                var ref246 = new ActionReference();
                ref246.putProperty( cTID('Prpr'), sTID('time') );
                ref246.putClass( sTID('timeline') );
                desc537.putReference( cTID('null'), ref246 );
                var desc538 = new ActionDescriptor();
                desc538.putInteger( sTID('minutes'), 0 ); // Add insane amount of minuts > works and no error.
                desc538.putInteger( sTID('seconds'), 0 );
                desc538.putInteger( sTID('frame'), 0 );
                desc538.putDouble( sTID('frameRate'), 29.970000 );
                desc537.putObject( cTID('T   '), sTID('timecode'), desc538 );
                executeAction( cTID('setd'), desc537, DialogModes.NO );
        };
        ftn1();

       // Official Code not working ?? 
        // var idslct = charIDToTypeID( 'slct' );
        // var desc411 = new ActionDescriptor(); 
        // var idnull = charIDToTypeID( 'null' ); 
        // var ref352 = new ActionReference(); 
        // var idMnspsp = charIDToTypeID( 'Mn ' );
        // var idMnIt = charIDToTypeID( 'MnIt' );
        // var idanimationGoToLastFrame = stringIDToTypeID( 'animationGoToFirstFrame' );
        // ref352.putEnumerated( idMnspsp, idMnIt, idanimationGoToLastFrame ); 
        // desc411.putReference( idnull, ref352 ); 
        // executeAction( idslct, desc411, DialogModes.ALL );

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};




//=========================================
// playheadFirstFrame.main
//=========================================
//

playheadFirstFrame.main = function() {
    playheadFirstFrame();
    // applyToAllLayers(playheadFirstFrame);
};

playheadFirstFrame.main();
// Doesnt use history
// app.activeDocument.suspendHistory(localize(locplayheadFirstFrame), 'playheadFirstFrame.main()');
