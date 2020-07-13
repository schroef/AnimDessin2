// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// enable double clicking from the Finder or Explorer
#target photoshop;

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


function createTwoFrames() {

    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // =======================================================
        var idMk = charIDToTypeID("Mk  ");
        var desc13 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref7 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref7.putClass(idLyr);
        desc13.putReference(idnull, ref7);
        executeAction(idMk, desc13, DialogModes.NO);

        // =======================================================
        // Reduze the end of the layer to the actual frame
        var idmoveOutTime = stringIDToTypeID("moveOutTime");
        var desc99 = new ActionDescriptor();
        executeAction(idmoveOutTime, desc99, DialogModes.NO);


        // =======================================================
        // Function to get the framerate of the actual documment
        function GetFrameRate() {
            var ref = new ActionReference();
            ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("documentTimelineSettings"));
            ref.putClass(stringIDToTypeID("timeline"));
            var desc = new ActionDescriptor();
            desc.putReference(charIDToTypeID('null'), ref);
            var resultDesc = executeAction(charIDToTypeID('getd'), desc, DialogModes.NO);

            return resultDesc.getDouble(stringIDToTypeID('frameRate'));
        };

        var idmoveOutTime = stringIDToTypeID("moveOutTime");
        var desc123 = new ActionDescriptor();
        var idtimeOffset = stringIDToTypeID("timeOffset");
        var desc124 = new ActionDescriptor();
        var idseconds = stringIDToTypeID("seconds");
        desc124.putInteger(idseconds, 0);
        var idframe = stringIDToTypeID("frame");
        desc124.putInteger(idframe, 0); // Value 0=1; 1=2 …
        var idframeRate = stringIDToTypeID("frameRate");
        desc124.putDouble(idframeRate, GetFrameRate());
        var idtimecode = stringIDToTypeID("timecode");
        desc123.putObject(idtimeOffset, idtimecode, desc124);
        executeAction(idmoveOutTime, desc123, DialogModes.NO);


        // =======================================================
        var idnextFrame = stringIDToTypeID("nextFrame");
        var desc211 = new ActionDescriptor();
        var idtoNextWholeSecond = stringIDToTypeID("toNextWholeSecond");
        desc211.putBoolean(idtoNextWholeSecond, false);
        executeAction(idnextFrame, desc211, DialogModes.NO);

    // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {;}
        else {alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));}
    }
};

//=========================================
// createTwoFrames.main
//=========================================
//

createTwoFrames.main = function() {
    createTwoFrames();
};

app.activeDocument.suspendHistory(localize(locCreate1Frame), 'createTwoFrames.main()');