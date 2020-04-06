// Copyright 2013
// Compiled (via JavascriptListener or ActionToJavascript Xtools…) by Stéphane Baril

// enable double clicking from the Finder or Explorer
#target photoshop

//Make Photoshop the front most application
app.bringToFront();
docRef = app.activeDocument;

///////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////

var ScriptFilePath = Folder($.fileName).parent.fsName ; 
$.evalFile(new File(ScriptFilePath + '/AnimD2_getSelectedLayers.jsx'));

///////////////////////////////////////////////////
// MAIN
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////


function colorRed() {

    // =======================================================
    var idsetd = charIDToTypeID( "setd" );
        var desc989 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref343 = new ActionReference();
            var idPrpr = charIDToTypeID( "Prpr" );
            var idLefx = charIDToTypeID( "Lefx" );
            ref343.putProperty( idPrpr, idLefx );
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref343.putEnumerated( idLyr, idOrdn, idTrgt );
        desc989.putReference( idnull, ref343 );
        var idT = charIDToTypeID( "T   " );
            var desc990 = new ActionDescriptor();
            var idScl = charIDToTypeID( "Scl " );
            var idPrc = charIDToTypeID( "#Prc" );
            desc990.putUnitDouble( idScl, idPrc, 100.000000 );
            var idSoFi = charIDToTypeID( "SoFi" );
                var desc991 = new ActionDescriptor();
                var idenab = charIDToTypeID( "enab" );
                desc991.putBoolean( idenab, true );
                var idMd = charIDToTypeID( "Md  " );
                var idBlnM = charIDToTypeID( "BlnM" );
                var idNrml = charIDToTypeID( "Nrml" );
                desc991.putEnumerated( idMd, idBlnM, idNrml );
                var idOpct = charIDToTypeID( "Opct" );
                var idPrc = charIDToTypeID( "#Prc" );
                desc991.putUnitDouble( idOpct, idPrc, 100.000000 );
                var idClr = charIDToTypeID( "Clr " );
                    var desc992 = new ActionDescriptor();
                    var idRd = charIDToTypeID( "Rd  " );
                    desc992.putDouble( idRd, 255.000000 );
                    var idGrn = charIDToTypeID( "Grn " );
                    desc992.putDouble( idGrn, 0.000000 );
                    var idBl = charIDToTypeID( "Bl  " );
                    desc992.putDouble( idBl, 0.000000 );
                var idRGBC = charIDToTypeID( "RGBC" );
                desc991.putObject( idClr, idRGBC, desc992 );
            var idSoFi = charIDToTypeID( "SoFi" );
            desc990.putObject( idSoFi, idSoFi, desc991 );
        var idLefx = charIDToTypeID( "Lefx" );
        desc989.putObject( idT, idLefx, desc990 );
    executeAction( idsetd, desc989, DialogModes.NO );

    // =======================================================
    var idsetd = charIDToTypeID( "setd" );
        var desc26 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref19 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref19.putEnumerated( idLyr, idOrdn, idTrgt );
        desc26.putReference( idnull, ref19 );
        var idT = charIDToTypeID( "T   " );
            var desc27 = new ActionDescriptor();
            var idClr = charIDToTypeID( "Clr " );
            var idClr = charIDToTypeID( "Clr " );
            var idRd = charIDToTypeID( "Rd  " );
            desc27.putEnumerated( idClr, idClr, idRd );
        var idLyr = charIDToTypeID( "Lyr " );
        desc26.putObject( idT, idLyr, desc27 );
    executeAction( idsetd, desc26, DialogModes.NO );

};
//=========================================
//                    colorRed.main
//=========================================
//


var selectedLayers = getSelectedLayersAMIdx(docRef);
var selFromStart = selectedLayers;
layerInfo = getLayerInfo(selectedLayers)

function setColorRed(layerInfo) {
    // docRef.activeLayer[docRef.layers.length];
    for (var i = 0; i < layerInfo.length; i++) {
        // alert(layerInfo[i].name)
        // alert(layerInfo[i].AMid)
        selectById(layerInfo[i].AMid);
        colorRed();
        // alert(docRef.layers[layerInfo[i].name])
        // alert(selectedLayers[i])
        // if (allLayers[i].typename === "ArtLayer"){
        //     var layerParent = docRef.activeLayer.parent;
        //     // alert(layerParent)
        //     if ( layerParent !== docRef ) doc.activeLayer = layerParent;
        //         if (layerParent && (layerParent !== docRef)) {
        //             // alert(doc.activeLayer.name)
        //             // alert(layerParent)
        //             docRef.activeLayer = docRef.layerSets[layerParent.name].layers[layerInfo[i].name];
        //             colorRed();
        //         } else if (layerParent == docRef) {
        //             // alert(layerParent)
        //             // alert(layerInfo[i].name)
        //             docRef.activeLayer = docRef.layers[layerInfo[i].name];
        //             colorRed();
        //         }
                // if (layerParent == docRef) {
                //     alert(allLayers[i].name)
                //     // alert(doc.activeLayer.name)
                //     alert(layerParent)
                //     docRef.activeLayer = docRef.layers[layerInfo[i].name];
                //     colorRed();
                // }
            // alert(layerParent)
            // alert(docRef.layers[selectedLayers[i]])
            // alert(layerInfo[i].name)
            // alert(docRef)
                // alert(!layerParent)
                // if (layerParent && (layerParent !== docRef)) {
                //     // alert(doc.activeLayer.name)
                //     // alert(layerParent)
                //     docRef.activeLayer = docRef.layerSets[layerParent.name].layers[layerInfo[i].name];
                //     colorRed();
                // }
            // } else {
            //     alert(layerInfo[i].name)
            //     docRef.activeLayer = docRef.layers[layerInfo[i].name];
            //     colorRed();
            // }
        // }
        // else if (allLayers[i].typename === "LayerSet"){
        //     var layerParent = docRef.activeLayer.parent;
        //     if ( layerParent !== docRef ) doc.activeLayer = layerParent;
        //         docRef.activeLayer = docRef.layerSets[layerParent.name].layers[layerInfo[i].name];
        //         colorRed();
            // alert(layerParent)
            // setColorRed(layerInfo);
            // colorRed();
            // alert(docRef.layers[selectedLayers[i]])
            // alert(layerInfo[i].name)
            // colorRed();
        //     // alert(allLayers[i].typename)
        //     // alert(layerInfo[i].name)
        //     // alert(layerInfo[i].idx)
        //     // alert(docRef.layers[i])
        //     alert(docRef.layers[layerInfo[i].name])
        //     // docRef.activeLayer = docRef.layers[layerInfo[i].name];
        //     // docRef.activeLayer = docRef.layers.index(i);
        //     // colorRed();
        // }
        // } else {
        //     setColorRed(layerInfo);
        // }
    }
    // reselect selected like from start
    for (var i = 0; i < layerInfo.length; i++) {
        selLyr(selFromStart[i],1);
    }
}

colorRed.main = function () {
    setColorRed(layerInfo);
};

app.activeDocument.suspendHistory("Colorize the Video Frame in Red", 'colorRed.main()');
