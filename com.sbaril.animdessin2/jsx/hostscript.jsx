/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


//Evaluate a file and catch the exception.
function evalFile(path) {
    try {
        $.evalFile(path);
    } catch (e) {
        alert("Exception:" + e);
    }
}



function sayHello() {
    alert("hello from ExendScript");
}
function checkOpenDoc(){
    if (app.documents.length == 0){
        // alert("no document available")
        return false
    } else {
        return true
    }
}
function countLayers() {
    // alert("Somehow keeps running")
    // alert(app.documents.length)
    try {
    // if (app.documents.length != 0) {
        // if (app.activeDocument > 0) {
            docRef = app.activeDocument;
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
                        // console.log("Error: " + e)
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
            return selectedLayers.length
    } catch (e) {
    //     console.log("Error: " + e)
}
}
// var layers = countLayers(docRef)