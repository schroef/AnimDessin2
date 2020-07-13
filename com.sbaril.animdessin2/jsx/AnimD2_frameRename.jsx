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
        if (exportInfo.renameLayer == newNameStr) {
            alert(alertNameStr)
            return
        }
        
        if (exportInfo.allLayers){
            applyToAllLayers(allLayers);
        } else {
            frameRename(exportInfo.renameLayer);
        }

        app.playbackDisplayDialogs = DialogModes.ALL;

    } catch (e) {
        if (DialogModes.NO != app.playbackDisplayDialogs) {
            alert(e);
        }
        return "cancel"; // quit, returning "cancel" (dont localize) makes the actions palette not record our script
    }
}
function allLayers(){
    frameRename(exportInfo.renameLayer);
}

///////////////////////////////////////////////////
// Set Defaults Dialog
///////////////////////////////////////////////////
function initExportInfo(exportInfo){
    exportInfo.renameLayer = new String(newNameStr);
    exportInfo.allLayers = false;
}

function settingDialog(exportInfo) {
    // FRAMERENAME
    // ===========
    var dlgMain = new Window("dialog"); 
        dlgMain.text = renameFrameTitleStr; 
        dlgMain.preferredSize.width = 300; 
        dlgMain.orientation = "column"; 
        dlgMain.alignChildren = ["fill","top"]; 
        dlgMain.spacing = 10; 
        dlgMain.margins = 16; 

    var newLyrName = dlgMain.add('edittext {properties: {name: "newLyrName"}}'); 
        newLyrName.helpTip = "Apply new name to frame"; 
        newLyrName.text = exportInfo.renameLayer;
        newLyrName.active = true; // Set focus on input

    var applySelection = dlgMain.add("checkbox", undefined, undefined, {name: "applySelection"}); 
        applySelection.text = applyToSelectedStr; 
        applySelection.value = exportInfo.allLayers;

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

    var renameLayer = newLyrName.text;
    ok.onClick = function() {
        // check if the setting is properly
        if (renameLayer.length == 0) {
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
    exportInfo.renameLayer = newLyrName.text;
    exportInfo.allLayers = applySelection.value;

    return result;
}

///////////////////////////////////////////////////
// Rename function
// Uses data from dialog window
///////////////////////////////////////////////////
function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

function frameRename(layerName) {
    var desc3272 = new ActionDescriptor();
    var ref1750 = new ActionReference();
    ref1750.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc3272.putReference( cTID('null'), ref1750 );
    var desc3273 = new ActionDescriptor();
    desc3273.putString( cTID('Nm  '), layerName );
    // desc3273.putString( cTID('Nm  '), "layerName" );
    desc3272.putObject( cTID('T   '), cTID('Lyr '), desc3273 );
    executeAction( cTID('setd'), desc3272, DialogModes.NO );
};

//=========================================
// frameRename.main
//=========================================
//

frameRename.main = function () {
    main();
};

app.activeDocument.suspendHistory(localize(locRenameFrameTitle), 'frameRename.main()');