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

function playheadSplitGroup() {

    ErrStrs = {}; 
    ErrStrs.USER_CANCELLED=localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Split at playhead
        var idsplitVideoLayer = stringIDToTypeID( "splitVideoLayer" );
        var desc75 = new ActionDescriptor();
        executeAction( idsplitVideoLayer, desc75, DialogModes.NO );

        // Group into video group
        function ftn1() {
            function cTID(s) { return app.charIDToTypeID(s); };
            function sTID(s) { return app.stringIDToTypeID(s); };

            var desc40 = new ActionDescriptor();
            var ref18 = new ActionReference();
            ref18.putClass( sTID('sceneSection') );
            desc40.putReference( cTID('null'), ref18 );
            var ref19 = new ActionReference();
            ref19.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
            desc40.putReference( cTID('From'), ref19 );
            desc40.putInteger( sTID('layerSectionStart'), 397 );
            desc40.putInteger( sTID('layerSectionEnd'), 398 );
            desc40.putString( cTID('Nm  '), "Video Group 1" );
            executeAction( cTID('Mk  '), desc40, DialogModes.NO );
        };
        ftn1();

    // Allows for cancel without feedback message
    } catch(e){
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED)!=-1) {;}
        else{alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
  }
};




//=========================================
// playheadSplitGroup.main
//=========================================
//

playheadSplitGroup.main = function() {
    applyToAllLayers(playheadSplitGroup);
};

app.activeDocument.suspendHistory(localize(locPlayheadSplitGroup), 'playheadSplitGroup.main()');
