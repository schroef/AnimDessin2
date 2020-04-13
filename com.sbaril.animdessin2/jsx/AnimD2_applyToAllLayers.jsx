// Updated 2020
// Modified on April 2020 by Rombout (https://https://github.com/schroef/AnimDessin2)

// Trick to test localize
// Work only only per local variables
//$.locale = "fr"; // try your Russian messages
//$.locale = null; // restore to the locale of the app

///////////////////////////////////////////////////
// Localize
// Function:  strings for History messages scipts
// Usage: each attribute is named by JSX main function
// Note: Special characters use Unicode to escape
// See url for codes http://www.fileformat.info/info/unicode/char/e9/index.htm
// à = \u00E0
// á = \u00E1
// é = \u00E9
// è = \u00E8
// î = \u00EE
// ó = \u00F3
///////////////////////////////////////////////////
// Localized history outputs
// PS version alert
locPhotoshopversionAlert = {
    en: "Photoshop versions before CS2 are not supported!",
    fr: "Les versions de Photoshop avant CS2 ne sont pas prises en charge!",
    nl: "Photoshop-versies v\u00F3\u00F3r CS2 worden niet ondersteund!"
};
// Progress Bar Dialog
locPbarProgressTitle = {
    en: "Progress",
    fr: "Le progr\u00E8s",
    nl: "Vooruitgang"
};
locPbarESCcancel = {
    en: "[ESC] cancels",
    fr: "[ESC] annule",
    nl: "[ESC] annuleert"
};
locPbarWait = {
    en: "Please wait...",
    fr: "S'il vous pla\u00EEt, attendez...",
    nl: "Een moment..."
};
locPbarInit = {
    en: "Initializing...",
    fr: "Initialisation ...",
    nl: "Bezig met initialiseren ..."
};
locPbarProcessing = {
    en: "Processing ",
    fr: "En traitement ",
    nl: "Verwerken "
};
locPbarReselectLayers = {
    en: "Reselecting layers ",
    fr: "S\u00E9lection de calques ",
    nl: "Lagen selecteren "
};
Msg = {
    en: "",
    fr: "",
    nl: ""
};

locColorRed = {
    en: "Colorize the Video Frame in Red",
    fr: "Coloriser le cadre vid\u00E9o en rouge",
    nl: "Kleurbedkking Video Frame in Rood"
};

// Rename Frame Dialog
locRenameFrameTitle = {
    en: "Rename Frame/Layer",
    fr: "Renommer le Cadre/Calque",
    nl: "Frame/laag Hernoemen"
};
locRenameFrameNewName = {
    en: "New name...",
    fr: "Nouveau nom...",
    nl: "Nieuwe naam..."
};
locRenameFrameAlertName = {
    en: "Please give a name",
    fr: "Veuillez donner un nom",
    nl: "Geef een naam op"
};
locRenameFrameApplySelected = {
    en: "Apply to selection",
    fr: "Appliquer \u00E0 la s\u00E9lection",
    nl: "Pas toe op selectie"
};
locRenameFrameCancelBtn = {
    en: "Cancel",
    fr: "Annuler",
    nl: "Annuleer"
};
locRenameFrameOkBtn = {
    en: "OK",
    fr: "OK",
    nl: "OK"
};





///////////////////////////////////////////////////
// Select Layer by LayerIndex
// Source: https://stackoverflow.com/questions/26295492/photoshop-script-new-layer-below-current-layer
// select [LayerNum], optionally [add] to selection (if add=2: with inclusion)
///////////////////////////////////////////////////
function selLyr(LyrN, add) {
    var adesc = new ActionDescriptor();
    var aref = new ActionReference();
    aref.putIndex(charIDToTypeID("Lyr "), LyrN);
    adesc.putReference(charIDToTypeID("null"), aref);
    if (add) {
        add = (add == 2) ? stringIDToTypeID("addToSelectionContinuous") : stringIDToTypeID("addToSelection");
        adesc.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), add);
    }
    adesc.putBoolean(charIDToTypeID("MkVs"), false);
    return executeAction(charIDToTypeID("slct"), adesc, DialogModes.NO);
}


/// ////////////////////////////////////////////////////////////////////////////
// Function: Combination of applyToAllLayersAMIdx & getLayerInfo
// Usage: extract a list of index values of all the selected layers & ID layernamer
// Input:: (active document.) s
// Return: array of indexes ID"s of selected layers.
// Mixed this so it only loops once over all layers
/// ////////////////////////////////////////////////////////////////////////////
function applyToAllLayersInfo(docRef) {
    var selectedLayers = new Array()
    var ref = new ActionReference()
    // get a number list of selected artLayers in the document
    ref.putProperty(app.charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"))
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
    // what do I want to do this this list? Define an description of an action.
    var desc = executeActionGet(ref)
    // if the selected object has the "Target Layers" key (only works CS4+)
    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        desc = desc.getList(stringIDToTypeID("targetLayers"))
        var c = desc.count
        var selectedLayers = [] // for each
        for (var i = 0; i < c; i++) {
            var lyr = {}
            var lyrIndex;
            try {
                docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                // selectedLayers.push(desc.getReference(i).getIndex())
                lyrIndex = desc.getReference(i).getIndex();
            } catch (e) {
                // selectedLayers.push(desc.getReference(i).getIndex() + 1)
                lyrIndex = desc.getReference(i).getIndex() + 1;
            }

            // Added from getLayerInfo
            var lyrRef = new ActionReference();
            lyrRef.putIndex(charIDToTypeID("Lyr "), lyrIndex)
            var lyrDesc = executeActionGet(lyrRef);
            var Id = lyrDesc.getInteger(stringIDToTypeID("layerID"));
            lyr.AMid = Id;
            lyr.lyrIndex = lyrIndex;
            selectedLayers.push(lyr);
        }
    }
    return selectedLayers
}


/// ////////////////////////////////////////////////////////////////////////////
// Function: applyToAllLayersAMIdx
// Usage: extract a list of index values of all the selected layers.
// Input:: (active document.) s
// Return: array of indexes ID"s of selected layers.
/// ////////////////////////////////////////////////////////////////////////////
function applyToAllLayersAMIdx(docRef) {
    var selectedLayers = new Array()
    var ref = new ActionReference()
    // get a number list of selected artLayers in the document
    ref.putProperty(app.charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"))
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
    // what do I want to do this this list? Define an description of an action.
    var desc = executeActionGet(ref)
    // if the selected object has the "Target Layers" key (only works CS4+)
    if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
        desc = desc.getList(stringIDToTypeID("targetLayers"))
        var c = desc.count;
        var selectedLayers = [] // for each
        for (var i = 0; i < c; i++) {
            try {
                docRef.backgroundLayer // try to select a background layer, if I can then adjust the index counting. (Background layers change index counitng of all layers by 1)
                selectedLayers.push(desc.getReference(i).getIndex());
            } catch (e) {
                selectedLayers.push(desc.getReference(i).getIndex() + 1);
            }
        }
    }
    // alert("selLayres:" + selectedLayers)
    return selectedLayers
}

///////////////////////////////////////////////////
// LayerID & LayerName
// Get Layer ID and Name > perhaps this can all be done in applyToAllLayersAMIdx
///////////////////////////////////////////////////
function getLayerInfo(inArray) {
    var layerInfo = []
    for (var i = 0; i < inArray.length; i++) {
        var lyr = {}
        ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), inArray[i]);
        var desc = executeActionGet(ref)
        var Id = desc.getInteger(stringIDToTypeID("layerID"));
        // var name = desc.getString(charIDToTypeID("Nm  "))
        // var isArtboard = desc.getBoolean(stringIDToTypeID("artboardEnabled"))
        var isVisible = desc.getBoolean(charIDToTypeID("Vsbl"));
        // if (isArtboard && isVisible) {
        if (isVisible) {
            // lyr.name = name
            lyr.AMid = Id;
            //     lyr.visible = isVisible
            //     var ab_actDesc = desc.getObjectValue(stringIDToTypeID("artboard"))
            //     lyr.bgType = ab_actDesc.getInteger(stringIDToTypeID("artboardBackgroundType"))
            //     var abBgColor_desc = ab_actDesc.getObjectValue(charIDToTypeID("Clr "))
            //     lyr.bgColor = [
            //         abBgColor_desc.getDouble(charIDToTypeID("Rd  ")),
            //         abBgColor_desc.getDouble(charIDToTypeID("Grn ")),
            //         abBgColor_desc.getDouble(charIDToTypeID("Bl  "))
            //     ]
            //     lyr.empty = isArtboardEmpty(inArray[i])
            layerInfo.push(lyr);
        }
    }
    return layerInfo
}


///////////////////////////////////////////////////
// Select Layers by LayerID
// Source: https://graphicdesign.stackexchange.com/questions/130739/photoshop-scripting-applying-changes-only-to-selected-artboards
///////////////////////////////////////////////////
function selectById(AMid) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIdentifier(charIDToTypeID('Lyr '), AMid);
    desc1.putReference(charIDToTypeID('null'), ref1);
    executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
}


///////////////////////////////////////////////////
// Apply Function to selection > called from each JSX file
///////////////////////////////////////////////////
// var selectedLayers = applyToAllLayersAMIdx(docRef);
// var selFromStart = selectedLayers;
// var layerInfo = getLayerInfo(selectedLayers);

///////////////////////////////////////////////////
// Faster combined loop method
///////////////////////////////////////////////////
var layerInfo = applyToAllLayersInfo(docRef);
var selFromStart = layerInfo.length;

///////////////////////////////////////////////////
// Progressbar vars
// setup the environment
///////////////////////////////////////////////////
env = new Object();
env.version = parseInt(app.version, 10);

var totProgress = layerInfo.length * 2;
var progress = 0;
var progressWindow;
var cancelButtonID = 2;

// Localize strings
var PSalertStr = localize(locPhotoshopversionAlert);
var progressTitleStr = localize(locPbarProgressTitle);
var ESCcancelStr = localize(locPbarESCcancel);
var initStr = localize(locPbarInit);
var waitStr = localize(locPbarWait);
var processingStr = localize(locPbarProcessing);
var reselectingLayersStr = localize(locPbarReselectLayers);

///////////////////////////////////////////////////
// Timer function
// source: https://community.adobe.com/t5/get-started/does-csinterface-evalscript-work-asynchronously-in-any-host-application/td-p/9569586?page=1
///////////////////////////////////////////////////
var time;
var GetTime = function GetTime() {
    var t = new Date();
    return t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds();
}

///////////////////////////////////////////////////
// Apply to All Layers function
// Applies function from button to single / all selected layers
// Uses LayerIndex & LayerAMdx to excecute
// Can be used with progressbar but that slows it down due GUI updates
///////////////////////////////////////////////////
function applyToAllLayers(callFunction) {
    if (env.version < 9) {
        alert(localize(PSalertStr), "Error", true);
        return "cancel";
    }
    // Timer for code speedtest
    // time = "start: "+GetTime();
    // time1 = GetTime();
    if (layerInfo.length >= 15) {
        progressbar(callFunction);
    } else {
        // Use IDX of each selected layer & run Function
        // Aprox 5s for 60 layers
        for (var i = 0; i < layerInfo.length; i++) {
            selectById(layerInfo[i].AMid);
            callFunction();
        }

        // Reselect layers using list of total selected from start & LayerIndex
        // Slows down by aprox 1s with circa 50 layerss
        for (var i = 0; i < layerInfo.length; i++) {
            selLyr(layerInfo[i].lyrIndex, 1);
            // selLyr(selectedLayers[i], 1);
        }
    }
    // Timer for code speedtest
    // time = time + "\nEnd: " + GetTime();
    // time2 = GetTime();
    // alert("Processing time: \n" + time + "\n ");
};

///////////////////////////////////////////////////
// See updated post
// https://www.ps-scripts.com/viewtopic.php?f=68&t=9732&start=10
// The above explains how to use the function in 'auto increment' mode. 
// You can also control the amount of progress by passing the value to use.
// progressWindow.updateProgress( 3 );
///////////////////////////////////////////////////
function createProgressWindow(title, message, min, max, parent, useCancel) {
    var win = new Window('palette', title);
    win.margins = [15, 15, 15, 15];
    win.parent = undefined;

    win.bar = win.add('progressbar', undefined, min, max);
    win.bar.preferredSize = [300, 20];

    var strDesc = win.add("group", undefined, {
        name: "strDesc"
    });
    strDesc.orientation = "row";
    strDesc.alignChildren = ["left", "top"];
    strDesc.spacing = 5;
    strDesc.margins = [0, 0, 0, 0];

    var stProgress = strDesc.add("statictext", undefined, undefined, {
        name: "stProgress"
    });
    stProgress.text = waitStr;
    stProgress.preferredSize = [200, 15];
    stProgress.justify = ["left"];
    // stProgress.preferredSize.height = 15;

    var stEscape = strDesc.add("statictext", undefined, undefined, {
        name: "stEscape"
    });
    stEscape.text = ESCcancelStr;
    stEscape.preferredSize = [100, 15];
    stEscape.justify = ["right"];
    // stEscape.preferredSize.height = 15;

    if (parent) {
        if (parent instanceof Window) {
            win.parent = parent;
        } else if (useCancel == undefined) {
            useCancel = parent;
        }
    }

    if (useCancel) {
        win.cancel = win.add('button', undefined, 'Cancel');
        win.cancel.onClick = function() {
            try {
                if (win.onCancel) {
                    var rc = win.onCancel();
                    if (rc || rc == undefined) {
                        win.close();
                    }
                } else {
                    win.close();
                }
            } catch (e) {
                alert(e);
            }
        }
    }

    win.updateProgress = function(val) {
        var win = this;
        win.show();
        win.hide();
        // app.refresh();
        // win.update();
        if (val != undefined) {
            win.bar.value = val;
        } else {
            win.bar.value++;
        }
        if (win.recenter) {
            win.center(win.parentWin);
        }
        win.update();
    }
    win.center(win.parent);
    return win;
};

// Creat progress bar window
function progressbar(callFunction) {
    // Timer for code speedtest
    // time = "start: " + GetTime();
    // totProgress = totProgress / 2;
    // var layers = layerInfo.length * 2;

    var layers = layerInfo;
    progressWindow = createProgressWindow(progressTitleStr, undefined, 0, (totProgress / 5), undefined, false);
    // set up the progress bar with a title and range
    progressWindow.show();
    progressWindow.isDone = false;
    // if you code does several things you can change the message under the bar as needed
    progressWindow.strDesc.stProgress.text = initStr;
    // progressWindow.text = ("Initaliazing...");
    progressWindow.updateProgress();

    ErrStrs = {};
    ErrStrs.USER_CANCELLED = localize("$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation");
    try {
        // Use steps of 5 to update > less slowdown
        var progress = 5;
        for (var i = 0; i < layers.length; i++) {
            // update the bar as needed
            // alert(totProgress == 1*i)
            if (progress == 1 * i) {
                progressWindow.updateProgress();
                progress += 5;
            }
            progressWindow.strDesc.stProgress.text = processingStr + (i + 1) + " / " + layers.length + "...";
            // progressWindow.text = ("Processing: " + (i + 1) + " / " + layers.length + "...");
            selectById(layerInfo[i].AMid);
            callFunction();
        }
        var progress = 10;
        for (var i = 0; i < layers.length; i++) {
            // update the bar as needed
            if (progress == 1 * i) {
                progressWindow.updateProgress();
                progress += 10;
            }
            progressWindow.strDesc.stProgress.text = reselectingLayersStr + (i + 1) + " / " + layers.length + "...";
            // progressWindow.text = ("Reselecting layers");
            // progressWindow.stProgress.text = ("Reselecting " + (i + 1) + " / " + layers.length + "...");
            selLyr(layerInfo[i].lyrIndex, 1);
        }
        // when done
        progressWindow.isDone = true;
        progressWindow.close();

        // Allows for cancel without feedback message
    } catch (e) {
        if (e.toString().indexOf(ErrStrs.USER_CANCELLED) != -1) {
            ;
        } else {
            alert(localize("$$$/ScriptingSupport/Error/CommandNotAvailable=The command is currently not available"));
        }

    } finally {
        progressWindow.close();
    }
    // the inDone flag is useful if you have code like a function
    // that you may or may not want to update the progress bar
    // in that case you can do something like
    // if (!progressWindow.isDone) progressWindow.upDateProgress();

    // Timer for code speedtest
    // time = time + "\nEnd: " + GetTime();
    // alert("Processing time: \n" + time)

}






// Test lcoalize with json file
////////////////////////////////////////////
// Load data by JSON
// Source: Export layers to Files Fast
// 
////////////////////////////////////////////
// function loadResource(file) {
//     var rsrcString;
//     if (!file.exists) {
//         alert("Resource file '" + file.name + "' for the export dialog is missing! Please, download the rest of the files that come with this script.", "Error", true);
//         return false;
//     }
//     try {
//         file.open("r");
//         if (file.error) throw file.error;
//         rsrcString = file.read();
//         if (file.error) throw file.error;
//         if (!file.close()) {
//             throw file.error;
//         }
//     } catch (error) {
//         alert("Failed to read the resource file '" + file.name + "'!\n\nReason: " + error + "\n\nPlease, check it's available for reading and redownload it in case it became corrupted.", "Error", true);
//         return false;
//     }

//     return rsrcString;
// };

// function localizeMessages(){
//     var env = new Object();
//     env.version = parseInt(app.version, 10);
//     env.cs3OrHigher = (env.version >= 10);

//     // get script's file name
//     if (env.cs3OrHigher) {
//         env.scriptFileName = $.fileName;
//     } else {
//         try {
//             //throw new Error();        // doesn't provide the file name, at least in CS2
//             var illegal = RUNTIME_ERROR;
//         } catch (e) {
//             env.scriptFileName = e.fileName;
//         }
//     }


//     env.scriptFileDirectory = (new File(env.scriptFileName)).parent;
//     var rsrcFile = new File(env.scriptFileDirectory + "/" + encodeURI("messages_jsx.json"));
//     var rsrcString = loadResource(rsrcFile);
//     if (!rsrcString) {
//         return false;
//     }
//     alert(rsrcString.find("locColorRed"))
//     // for (var i = 0; i < rsrcString.length; i++){
// 	//     var obj = rsrcString[i];
// 	//     alert("Name: " + obj.first_name + ", " + obj.last_name);
//     // }
//     // var messages = rsrcString;
//     // msg = locColorRed.locColorRed;
//     // alert(msgs[locColorRed])
//     // return localize(msgs.locColorRed);
// };
// app.activeDocument.suspendHistory(localizeMessages(), 'colorRed.main()');