
// From faster layer to comps
// https://github.com/jwa107/Photoshop-Export-Layers-as-Images
// create progress bar

// var env = new Object();
// env.profiling = false;


// var progressBarWindow = createProgressBar();
// if (!progressBarWindow) {
//     return "cancel";
// }
// var layerCountResult = countLayers(progressBarWindow);
// layerCount = layerCountResult.layerCount;
// visibleLayerCount = layerCountResult.visibleLayerCount;
// selectedLayerCount = layerCountResult.selectedLayerCount;
// var countDuration = profiler.getDuration(true, true);
// if (env.profiling) {
//     alert("Layers counted in " + profiler.format(countDuration), "Debug info");
// }


// profiler.resetLastTime();
// var collected = collectLayers(progressBarWindow);

// layers = collected.layers;
// visibleLayers = collected.visibleLayers;
// selectedLayers = collected.selectedLayers;
// groups = collected.groups;
// var collectionDuration = profiler.getDuration(true, true);
// if (env.profiling) {
//     alert("Layers collected in " + profiler.format(collectionDuration), "Debug info");
// }

// function Profiler(enabled) {
//     this.enabled = enabled;
//     if (this.enabled) {
//         this.startTime = new Date();
//         this.lastTime = this.startTime;
//     }
// }

// function defineProfilerMethods() {
//     Profiler.prototype.getDuration = function(rememberAsLastCall, sinceLastCall) {
//         if (this.enabled) {
//             var currentTime = new Date();
//             var lastTime = sinceLastCall ? this.lastTime : this.startTime;
//             if (rememberAsLastCall) {
//                 this.lastTime = currentTime;
//             }
//             return new Date(currentTime.getTime() - lastTime.getTime());
//         }
//     }

//     Profiler.prototype.resetLastTime = function() {
//         this.lastTime = new Date();
//     };

//     Profiler.prototype.format = function(duration) {
//         var output = padder(duration.getUTCHours(), 2) + ":";
//         output += padder(duration.getUTCMinutes(), 2) + ":";
//         output += padder(duration.getUTCSeconds(), 2) + ".";
//         output += padder(duration.getUTCMilliseconds(), 3);
//         return output;
//     };
// }

function main() {
    var progress_win = new Window("palette"); // create new palette
    var progress = progress_bar(progress_win, 2, 'Doing Something. Please be patient'); // call the pbar function
    delay(1); // wait a second
    progress.value = progress.value + 1; // update the progress bar
    delay(1); // wait another second
    progress.parent.close(); // close the palette
    return 0; // we are done
}
// delay function found here
//found here http://www.wer-weiss-was.de/theme157/article1143593.html
function delay(prmSec) {
    prmSec *= 1000; // Dates work in milliseconds
    var eDate = null;
    var eMsec = 0;
    var sDate = new Date();
    var sMsec = sDate.getTime();
    do {
        eDate = new Date();
        eMsec = eDate.getTime();
    } while ((eMsec - sMsec) < prmSec);
}
/**
 * Taken from ScriptUI by Peter Kahrel
 * 
 * @param  {Palette} w    the palette the progress is shown on
 * @param  {[type]} stop [description]
 * @return {[type]}      [description]
 */
function progress_bar(w, stop, labeltext) {
    var txt = w.add('statictext', undefined, labeltext); // add some text to the window
    var pbar = w.add("progressbar", undefined, 1, stop); // add the bar
    pbar.preferredSize = [300, 20]; // set the size
    w.show(); // show it
    return pbar; // return it for further use
}