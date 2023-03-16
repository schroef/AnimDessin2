// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools�) by St�phane Baril
// Modified on Mach 2014 by Clunkid (https://vimeo.com/clunkid)

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

// Call main function from getselected, we can reuse scripts
var ScriptFilePath = Folder($.fileName).parent.fsName;
$.evalFile(new File(ScriptFilePath + '/AnimD2_applyToAllLayers.jsx'));

frameStepStr = "Custom Frame Step..."
///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////

//=================================================================
// Globals
//=================================================================

//Local See AnimD2_frameRenam.jsx

// ok and cancel button
var runButtonID = 1;
var cancelButtonID = 2;

var exportInfo = new Object();

///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////

// One line prompt method > much easier!!!
// Ask user for input by showing prompt box and save inputted value to variable:
//var stemsAmount = prompt("How many stems do you need?", 12, "Processing "+originalStem.name);
// https://www.smashingmagazine.com/2013/07/introduction-to-photoshop-scripting/
///////////////////////////////////////////////////////////////////////////////
// Function: main
// Usage: the core routine for this script
// Input: <none>
// Return: <none>
///////////////////////////////////////////////////////////////////////////////
function main() {
    try {        
        app.playbackDisplayDialogs = DialogModes.ALL;
        initExportInfo(exportInfo);
        if (DialogModes.ALL == app.playbackDisplayDialogs) {
            if (cancelButtonID == settingDialog(exportInfo)) {
                return "cancel"; // quit, returning "cancel" (dont localize) makes the actions palette not record our script
            }
        }
        app.playbackDisplayDialogs = DialogModes.ALL;
        if (exportInfo.frameStep == frameStepStr) {
            alert(alertNameStr)
            return
        }
        
        app.playbackDisplayDialogs = DialogModes.ALL;
        return exportInfo.frameStep

    } catch (e) {
        if (DialogModes.NO != app.playbackDisplayDialogs) {
            alert(e);
        }
        return "cancel"; // quit, returning "cancel" (dont localize) makes the actions palette not record our script
    }
}

///////////////////////////////////////////////////
// Set Defaults Dialog
///////////////////////////////////////////////////
function initExportInfo(exportInfo){
    exportInfo.frameStep = new String(frameStepStr);
    // exportInfo.allLayers = false;
}

function settingDialog(exportInfo) {
    // FRAMERENAME
    // ===========
    var dlgMain = new Window("dialog"); 
        dlgMain.text = "Set Custom Frame Step"; //renameFrameTitleStr; 
        dlgMain.preferredSize.width = 100; 
        dlgMain.orientation = "column"; 
        dlgMain.alignChildren = ["fill","top"]; 
        dlgMain.spacing = 10; 
        dlgMain.margins = 16; 

    var customFrameStep = dlgMain.add('edittext {properties: {name: "frameStep"}}'); 
        customFrameStep.helpTip = "Set custom frame step"; 
        customFrameStep.text = exportInfo.frameStep;
        customFrameStep.active = true; // Set focus on input

    // var applySelection = dlgMain.add("checkbox", undefined, undefined, {name: "applySelection"}); 
    //     applySelection.text = applyToSelectedStr; 
    //     applySelection.value = exportInfo.allLayers;

    // GROUP1
    // ======
    var group1 = dlgMain.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["right","top"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

    var cancel = group1.add("button", undefined, undefined, {name: "cancel"}); 
        cancel.text = cancelBtnStr; 
        // cancel.preferredSize.width = 70; 
    
    cancel.onClick = function() {
        dlgMain.close(cancelButtonID);
    }

    var ok = group1.add("button", undefined, undefined, {name: "ok"}); 
        ok.text = okBtnStr; 
        // ok.preferredSize.width = 80; 

    var frameStepInput;
    customFrameStep.onChange = function(){
        frameStepInput = customFrameStep.text;
    }
    ok.onClick = function() {
        // check if the setting is properly
        if (frameStepInput.length == 0) {
            alert(strAlertRename); // +" "+ strAlertFailure);
            return;
        }
        dlgMain.close(runButtonID);
    }

    // in case we double clicked the file
    app.bringToFront();
    dlgMain.center();

    var result = dlgMain.show();

    if (cancelButtonID == result) {
        return result; // close to quit
    }

    // Get settings from Dialog
    exportInfo.frameStep = customFrameStep.text;
    // exportInfo.allLayers = applySelection.value;
    // alert(result)
    // alert(frameStepInput)
    // return exportInfo.frameStep
    return result;
}

//=========================================
// setFrameStep.main
//=========================================
//

// main.main = function () {
//     main();
// };

// main();
function test(){
    return 12
}
test()
// app.activeDocument.suspendHistory(localize(locRenameFrameTitle), 'setFrameStep.main()');
// app.activeDocument.suspendHistory('Set Custom Frame Step', 'main()');