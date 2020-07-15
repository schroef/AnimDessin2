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
// See url for codes http://www.fileformat.info/info/unicode/char/search.htm
// à = \u00E0
// á = \u00E1
// é = \u00E9
// è = \u00E8
// ë = \u00EB
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

// Localize AnimD2_canvasSize.jsx
locCanvasSize = {
    en: "Set canvas size of document",
    fr: "XXXX",
    nl: "Stel canvasgrootte in van document"
};
// Localize AnimD2_colorBlue.jsx
locColorBlue = {
    en: "Colorize the video frame in blue",
    fr: "Coloriser le cadre vid\u00E9o en bleue",
    nl: "Kleurbedekking video frame in blauw"
};
// Localize AnimD2_colorGlobalHide.jsx
locColorGlobalHide = {
    en: "Hide all overlays",
    fr: "XXXX",
    nl: "Verberg alle kleurbedekkingen"
};
// Localize AnimD2_colorGlobalShow.jsx
locColorGlobalShow = {
    en: "Show all overlays",
    fr: "XXXX",
    nl: "Toon alle kleurbedekkingen"
};
// Localize AnimD2_colorGreen.jsx
locColorGreen = {
    en: "Colorize the video frame in Green",
    fr: "Coloriser le cadre vid\u00E9o en verte",
    nl: "Kleurbedekking video frame in groen"
};
// Localize AnimD2_colorNone.jsx
locColorNone = {
    en: "Clear all layer effects",
    fr: "XXXX",
    nl: "Verwijder alle laag effecten"
};
// Localize AnimD2_colorNoneFXHideAll.jsx
locColorNoneFXHideAll = {
    en: "Hide all layers effects",
    fr: "XXXX",
    nl: "Verberg alle laag effecten"
};
// Localize AnimD2_colorNoneFXShowAll.jsx
locColorNoneFXShowAll = {
    en: "Show all layers effects",
    fr: "XXXX",
    nl: "Toon alle laag effecten"
};
// Localize AnimD2_colorOnlyClearColor.jsx
locColorOnlyClearColor = {
    en: "Clear only color overlay from video frame",
    fr: "Effacer uniquement la superposition de couleurs de l'image vid\u00E9oo",
    nl: "Verwijder alleen kleurbedekking van video frame"
};
// Localize AnimD2_colorRed.jsx
locColorRed = {
    en: "Colorize the video frame in red",
    fr: "Coloriser le cadre vid\u00E9o en rouge",
    nl: "Kleurbedekking video frame in rood"
};
// Localize AnimD2_commentEdit.jsx
locCommentEdit = {
    en: "Add or Edit a timeline comment",
    fr: "Ajouter ou modifier un commentaire",
    nl: "Nieuwe of bewerk opmerkingen"
};
// Localize AnimD2_creat1Frame.jsx
locCreate1Frame = {
    en: "Add 1 frame layer",
    fr: "Ajouter 1 couche de cadre",
    nl: "1 frame laag toevoegen"
};
// Localize AnimD2_creat1FrameVideoLayer.jsx
locCreate1FrameVideoLayer = {
    en: "Add 1 frame video layer",
    fr: "Ajouter 1 couche de vid\u00E9oo",
    nl: "1 frame video laag toevoegen"
};
// Localize AnimD2_creat2Frame.jsx
locCreate2Frames = {
    en: "Add 2 frame layer",
    fr: "Ajouter 2 couche de cadre",
    nl: "2 frame laag toevoegen"
};
// Localize AnimD2_creat2FrameVideoLayer.jsx
locCreate2FrameVideoLayer = {
    en: "Add 2 frame video layer",
    fr: "Ajouter 2 couche de vid\u00E9oo",
    nl: "2 frame video laag toevoegen"
};
// Localize AnimD2_deleteFrame.jsx
locDeleteFrame = {
    en: "Delete selected frame/layer",
    fr: "Supprimer le cadre/calque s\u00E9lectionn\u00E9",
    nl: "Verwijder geselecteerde frame/laag"
};
// Localize AnimD2_duplicateFrame.jsx
locDuplicateFrame = {
    en: "Duplicate frame/layer",
    fr: "Cadre/calque en double",
    nl: "Dupliceer frame/layer"
};
// Localize AnimD2_frameMinusFive.jsx
locFrameMinusFive = {
    en: "Expose 5 frames less",
    fr: "XXXXXXXXX",
    nl: "Geef 5 frames minder weer"
};
// Localize AnimD2_frameMinusOne.jsx
locFrameMinusOne = {
    en: "Expose 1 frame less",
    fr: "XXXXXXXXX",
    nl: "Geef 1 frame minder weer"
};
// Localize AnimD2_frameMinusTen.jsx
locFrameMinusTen = {
    en: "Expose 10 frames less",
    fr: "XXXXXXXXX",
    nl: "Geef 10 frames minder weer"
};
// Localize AnimD2_frameMinusTwo.jsx
locFrameMinusTwo = {
    en: "Expose 2 frames less",
    fr: "XXXXXXXXX",
    nl: "Geef 2 frames minder weer"
};
// Localize AnimD2_framePlusFive.jsx
locFramePlusFive = {
    en: "Expose 5 frames more",
    fr: "XXXXXXXXX",
    nl: "Geef 5 frames meer weer"
};
// Localize AnimD2_frameMinusOne.jsx
locFramePlusOne = {
    en: "Expose 1 frame more",
    fr: "XXXXXXXXX",
    nl: "Geef 1 frame meer weer"
};
// Localize AnimD2_frameMinusTen.jsx
locFramePlusTen = {
    en: "Expose 10 frames more",
    fr: "XXXXXXXXX",
    nl: "Geef 10 frames meer weer"
};
// Localize AnimD2_frameMinusTwo.jsx
locFramePlusTwo = {
    en: "Expose 2 frames more",
    fr: "XXXXXXXXX",
    nl: "Geef 2 frames meer weer"
};
// Localize AnimD2_frameRename.jsx
// Rename Frame Dialog
locRenameFrameTitle = {
    en: "Rename frame/Layer",
    fr: "Renommer le cadre/calque",
    nl: "Frame/laag hernoemen"
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
// Localize AnimD2_gotoInTimeLine.jsx
locGoToInTimeline = {
    en: "Go to in timeline",
    fr: "XXXXXXXXX",
    nl: "Ga naar in tijdslijn"
};
// Localize AnimD2_inBetweenCreate.jsx
locCreateInBetween = {
    en: "Create an InBetween",
    fr: "XXXXXXXXX",
    nl: "Voeg een InBetween toe"
};
// Localize AnimD2_inBetweenNext.jsx
locInBetweenNext = {
    en: "Move the InBetween to next position",
    fr: "XXXXXXXXX",
    nl: "Verplaats de InBetween naar volgende positie"
};
// Localize AnimD2_inBetweenPrevious.jsx
locInBetweenPrevious = {
    en: "Move the InBetween to previous position",
    fr: "XXXXXXXXX",
    nl: "Verplaats de InBetween naar vorige positie"
};
// Localize AnimD2_newDoc.jsx
locNewDoc = {
    en: "Create a timeline with a video group",
    fr: "XXXXXXXXX",
    nl: "Cre\u00EBer tijdlijn met een video group "
};
// Localize AnimD2_newVideoGroup.jsx
locNewVideoGroup = {
    en: "New video group with a blank frame",
    fr: "XXXXXXXXX",
    nl: "Nieuwe video group met blanco frame "
};
// Localize AnimD2_newVideoGroupSelection.jsx
locNewVideoGroupSelection = {
    en: "New video group from selection",
    fr: "XXXXXXXXX",
    nl: "Nieuwe video group van selectie"
};
// Localize AnimD2_newVideoUnGroup.jsx
locNewVideoUngroup = {
    en: "Ungroup selected video group",
    fr: "XXXXXXXXX",
    nl: "Degroepeer geselecteerde video groep"
};
// Localize AnimD2_playheadSplit.jsx
locPlayheadSplit = {
    en: "Split at playhead",
    fr: "XXXXXXXXX",
    nl: "Splitsen bij afspeelknop"
};
// Localize AnimD2_playheadSplitGroup.jsx
locPlayheadSplitGroup = {
    en: "Split at playhead and make video group",
    fr: "XXXXXXXXX",
    nl: "Splitsen bij afspeelknop en video group maken"
};
// // Localize AnimD2_playheadSplitGroup.jsx
// locPlayheadNextEdit = {
//     en: "Split at playhead and make video group",
//     fr: "XXXXXXXXX",
//     nl: "Splitsen bij afspeelknop en video group maken"
// };

// Localize AnimD2_playLoopPlayback.jsx
// locplayLoopPlayback = {
//     en: "Loop playback",
//     fr: "Cadre/calque en double",
//     nl: "Afspelen herhalen"
// };

// locProseccing = {
//     en: "Processing",
//     fr: "En D\u00E9veloppement",
//     nl: "Verwerken"
// };

// // Localize 
// var STR_processing = localize(locProseccing);



// Localize AnimD2_frameRename.jsx
var strAlertSpecifyName = localize("$$$/JavaScripts/LayerCompsToABFiles/SpecifyDestination=Please specify destination.");
var strAlertRename = localize("$$$/Actions/Event/Rename");
var strAlertFailure = localize("$$$/AdobePlugin/Shared/failure");
var renameFrameTitleStr = localize(locRenameFrameTitle);
var newNameStr = localize(locRenameFrameNewName);
var alertNameStr = localize(locRenameFrameAlertName);
var applyToSelectedStr = localize(locRenameFrameApplySelected);
var cancelBtnStr = localize(locRenameFrameCancelBtn);
var okBtnStr = localize(locRenameFrameOkBtn);



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
///////////////////////////////////////////////////
// Select Layer Rande by id add to selection
// https://feedback.photoshop.com/photoshop_family/topics/ps-script-i-can-not-achieve-a-proper-continuous-selection
// By Paul Riggot
///////////////////////////////////////////////////
function selectLayerById(LyrN, add) {
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID('Lyr '), LyrN);
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID("null"), ref);
    if (add) desc.putEnumerated(stringIDToTypeID("selectionModifier"), stringIDToTypeID("selectionModifierType"), stringIDToTypeID("addToSelection"));
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    try {
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    } catch (e) {
        alert(e)
    }
};
///////////////////////////////////////////////////
// Get Layer Kind
// https://www.ps-scripts.com/viewtopic.php?p=43242#p43242
// Get return layerkind by layerid
///////////////////////////////////////////////////
function getLayerKindByIndex( index ) {
   var ref, desc, adjustmentDesc, layerSectionType;
   ref = new ActionReference();
   ref.putIndex(charIDToTypeID( "Lyr " ), index );
   desc =  executeActionGet(ref);
   var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'layerSection' )));
   if( layerType != 'layerSectionContent' ) return;// return if layerSet
   if( desc.hasKey( stringIDToTypeID( 'textKey' ) ) ) return LayerKind.TEXT;
   if( desc.hasKey( stringIDToTypeID( 'smartObject' ) ) ) return LayerKind.SMARTOBJECT;// includes LayerKind.VIDEO
   if( desc.hasKey( stringIDToTypeID( 'layer3D' ) ) ) return LayerKind.LAYER3D;
   if( desc.hasKey( stringIDToTypeID( 'videoLayer' ) ) ) return LayerKind.VIDEO;
   if( desc.hasKey( stringIDToTypeID( 'adjustment' ) ) ){
      switch(typeIDToStringID(desc.getList (stringIDToTypeID('adjustment')).getClass (0))){
         case 'photoFilter' : return LayerKind.PHOTOFILTER;
         case 'solidColorLayer' : return LayerKind.SOLIDFILL;
         case 'gradientMapClass' : return LayerKind.GRADIENTMAP;
         case 'gradientMapLayer' : return LayerKind.GRADIENTFILL;
         case 'hueSaturation' : return LayerKind.HUESATURATION;
         case 'colorLookup' : return udefined; //this does not exist and errors with getting layer kind
         case 'colorBalance' : return LayerKind.COLORBALANCE;
         case 'patternLayer' : return LayerKind.PATTERNFILL;
         case 'invert' : return LayerKind.INVERSION;
         case 'posterization' : return LayerKind.POSTERIZE;
         case 'thresholdClassEvent' : return LayerKind.THRESHOLD;
         case 'blackAndWhite' : return LayerKind.BLACKANDWHITE;
         case 'selectiveColor' : return LayerKind.SELECTIVECOLOR;
         case 'vibrance' : return LayerKind.VIBRANCE;
         case 'brightnessEvent' : return LayerKind.BRIGHTNESSCONTRAST;
         case  'channelMixer' : return LayerKind.CHANNELMIXER;
         case 'curves' : return LayerKind.CURVES;
         case 'exposure' : return LayerKind.EXPOSURE;
         // if not one of the above adjustments return - adjustment layer type
         default : return typeIDToStringID(desc.getList (stringIDToTypeID('adjustment')).getClass (0));
      }
   }
    return LayerKind.NORMAL;// if we get here normal should be the only choice left.
};

/// ////////////////////////////////////////////////////////////////////////////
// by Paul Riggot 2012
// http://web.archive.org/web/20141205220915/https://forums.adobe.com/message/4897995
// Find available keys per layer

function findKeys() {
    var ref = new ActionReference();  
    ref.putEnumerated( zTID("Lyr "), zTID("Ordn"), zTID("Trgt") );   
    var desc = executeActionGet(ref);  
    // $.writeln(desc);  
    var c = desc.count  
    if(desc.typename == 'ActionReference'){  
        var c = desc.count;  
        for(var i=0;i<c;i++){ //enumerate reference. use getForm() to determine which get method to use  
        // $.writeln('AR '+zeroPad( i+1, 2 )+' = '+desc.getReference(i).getIndex());   
        var AR = 'AR '+zeroPad( i+1, 2 )+' = '+desc.getReference(i).getIndex();   
        // document.getElementById("error").innerHTML = AR;   
        alert(AR);   
        }  
    }  
    if(desc.typename == 'ActionList'){  
        var c = desc.count;  
        for(var i=0;i<c;i++){ //enumerate list  
        // $.writeln('AL '+zeroPad( i+1, 2 )+' = '+desc.getType(i)/* added desc.getPath(i) for aliastype */ +' - ' + typeIDToStringID(desc.getClass (i)));  
        var AL = 'AL '+zeroPad( i+1, 2 )+' = '+desc.getType(i)/* added desc.getPath(i) for aliastype */ +' - ' + typeIDToStringID(desc.getClass (i));  
        // document.getElementById("error").innerHTML = L ;   
        alert(AL);   
        }  
    }  
    if(desc.typename == 'ActionDescriptor'){  
        var c = desc.count;  
        for(var i=0;i<c;i++){ //enumerate descriptor's keys  
        // $.writeln('AD '+zeroPad( i+1, 2 )+' = '+IDTz(desc.getKey(i)) +' : '+desc.getType(desc.getKey(i)));
        var AD = 'AD '+zeroPad( i+1, 2 )+' = '+IDTz(desc.getKey(i)) +' : '+desc.getType(desc.getKey(i));   
        alert(AD)
        }  
    }  
    function IDTz(id){  
        try {  
            var res = typeIDToStringID( id );  
            if(res == '' ){  
                var res = typeIDToCharID( id );  
            }  
        }catch(e){}  
        return res;  
    }  
    function zTID( s ){  
        if( s.length == 4 ) var res = charIDToTypeID( s );  
        if( s.length > 4 ) var res = stringIDToTypeID( s );  
        return res;  
    }  
    function zeroPad(num,pad) {  
        var z = Math.pow(10,Number(pad))  
        return num <= z ? ((Number( num) + z).toString().substr(1)): num  
    } 
}

function getTimelineLength() {
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID('duration'));
    ref.putClass(stringIDToTypeID('timeline'));
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID('null'), ref);
    var TC = executeAction(charIDToTypeID('getd'), desc, DialogModes.NO);
    TC = TC.getObjectValue(stringIDToTypeID('duration'));
    var M = 0;
    try {
        M = TC.getInteger(stringIDToTypeID('minutes'));
    } catch (e) {}
    var S = 0;
    try {
        S = TC.getInteger(stringIDToTypeID('seconds'));
    } catch (e) {}
    var F = TC.getInteger(stringIDToTypeID('frame'));
    var FR = TC.getInteger(stringIDToTypeID('frameRate'));
    var A = new Array();
    A.push([M+':'+S+':'+F+':'+FR+':']);
    return A;
}

/// ////////////////////////////////////////////////////////////////////////////

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
            // alert(lyrDesc.getInteger(stringIDToTypeID("layerKind")))
            var Id = lyrDesc.getInteger(stringIDToTypeID("layerID"));
            lyr.AMid = Id;
            lyr.lyrKind = getLayerKindByIndex(lyrIndex);
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
    // || (env.version > 18)) 
    if (layerInfo.length >= 30) {
        // $.sleep (200);
        // app.refresh();
        for (var i = 0; i < layerInfo.length; i++) {
            selectById(layerInfo[i].AMid);
            callFunction(layerInfo[i].lyrKind);
        }
        for (var i = 0; i < layerInfo.length; i++) {
            selLyr(layerInfo[i].lyrIndex, 1);
            // selectLayerById(layerInfo[i].lyrIndex, 1)
        }
        // progressbar(callFunction);
    } else {
        // Use IDX of each selected layer & run Function
        // Aprox 5s for 60 layers
        for (var i = 0; i < layerInfo.length; i++) {
            selectById(layerInfo[i].AMid);
            callFunction(layerInfo[i].lyrKind);
        }

        // Reselect layers using list of total selected from start & LayerIndex
        // Slows down by aprox 1s with circa 50 layerss
        for (var i = 0; i < layerInfo.length; i++) {
            selLyr(layerInfo[i].lyrIndex, 1);
            // selectLayerById(layerInfo[i].lyrIndex, true)
        }
    }
    // return layerInfo.length
    
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
        // win.show();
        // win.hide();
        // app.refresh();
        // $.sleep (1000); // waits 2 seconds
        // win.update();
        // app.refresh(); // refreshes PS
        if (val != undefined) {
            win.bar.value = val;
        } else {
            win.bar.value++;
        }
        if (win.recenter) {
            win.center(win.parentWin);
        }
        // win.update();
        // win.hide();
    }
    win.hideWindow = function(){
        var win = this;
        win.hide();
    }
    win.center(win.parent);
    return win;
};

var waitForRedraw = function() {
  var d;
  d = new ActionDescriptor();
  d.putEnumerated(app.stringIDtoTypeID('state'),
  app.stringIDtoTypeID('state'),
  app.stringIDtoTypeID('redrawComplete'));
  return executeAction(app.stringIDtoTypeID('wait'), d, DialogModes.NO);
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
                // $.sleep (250); // waits 2 seconds
                // app.refresh();
                
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
        progressWindow.hideWindow();
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