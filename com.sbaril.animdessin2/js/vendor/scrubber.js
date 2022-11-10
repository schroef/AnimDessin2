/*

    TODO
    - scripts should be loaded once and not all the time. 
    ^ Downside is that when document is change, it does need to be updated.
    - Call all variables when we set playhead. This should make less demanding

*/

// Variables
var pos1 = Number;
var pos2 = Number;
var pos3 = Number;
var pos4 = Number;
var csInterface = new CSInterface();
var curFr = Number;
var totFr = Number;
var pos = Number;
var posX = Number;
var checkTml = Boolean;
var timeline = document.getElementById("errorTimeline");
var container = document.getElementById("timeline");
var scrubber = document.getElementById("scrubber");
var current = document.getElementById("current");
var os = String;

// Localize Languages
function getLocalize() {
    var csInterface = new CSInterface();
    // csInterface.initResourceBundle();
    var renderBundle = csInterface.initResourceBundle();
    // console.log(renderBundle)
    return renderBundle;
}

//Make the DIV element draggagle:
dragElement(document.getElementById("scrubber"));

function dragElement(elmnt) {

    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = 0;
        pos2 = 0;
        pos3 = 0;
        pos4 = 0;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement(e) {
        e = e || window.event;
        e.preventDefault();
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        // console.log(e.clientX)
    }
    function setDiv(e) {
        // From PSfeatures 5
        var OSVersion = csInterface.getOSInformation();
        if (OSVersion.indexOf("Windows") >= 0) {
            // WIP get windows equilant code
            os = "Windows";
          } else if (OSVersion.indexOf("Mac") >= 0) {
            os = "Mac";
          }
        // var csInterface = new CSInterface();
        csInterface.evalScript("timelineFrameCount()", function (result) {
            // Use OS to do keypress so we focus on playhead > dirty trick ;)
            totFr = result;
            e = e || window.event;
            e.preventDefault();
            pos1 = e.clientX;
            elmnt.style.left = pos1 - 10 + "px";
            pos = (totFr / window.innerWidth) * e.clientX;
            // gotoFrame(Seconds, Frame)
            posX = Math.floor(pos);
            csInterface.evalScript("gotoFrame('" + (posX - 1) + "')");
            csInterface.evalScript('keyPress("' + os + '")');
        });
    }

    // Add event listener to table
    const el = document.getElementById("track");
    el.addEventListener("click", setDiv, false);
}

// https://stackoverflow.com/questions/12295375/creating-timecode-from-frames/12295518#12295518
function timecode(curFr) {
    var useTimeCode = localStorage.getItem("timeCode"); // Use timecode yes/no
    if (useTimeCode == "true"){
        csInterface.evalScript("timelineFPS()", function (result) {
            fps = result;
        });
        currentFrame = curFr;
        var h = Math.floor(currentFrame/(60*60*fps));
        var m = (Math.floor(currentFrame/(60*fps))) % 60;
        var s = (Math.floor(currentFrame/fps)) % 60;
        var f = currentFrame % fps;
        var timecode = h + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f); // changed hours to songle digit
        function showTwoDigits (number) {
            return ("00" + number).slice(-2);
        }
    } else {
        timecode = curFr;
    }    
    return timecode
}

// Frame indicator hover
$("#track").bind("mousemove", function (e) {
    csInterface.evalScript("timelineFrameCount()", function (result) {
        totFr = result;
        pos = (totFr / window.innerWidth) * e.pageX;
        posX = Math.floor(pos);
        // if (useTimeCode){
        posX = timecode(posX);
        // }
        $("#current").text(posX);
        // console.log("getCurrentFr")
    }, 5000);
    $("#current").css({
        left: e.pageX - 4,
        //    top:   e.pageY
    });
});

// https://www.digitalocean.com/community/tutorials/js-building-countdown-timer
// https://blog.mattclemente.com/2019/07/12/modulus-operator-modulo-operation.html

// Timecode format > https://www.omnicalculator.com/other/timecode-to-frame#what-is-a-timecode

// function countdownTimer() {
//     const difference = +new Date("2021-01-01") - +new Date();
//     let remaining = "Time's up!";

//     if (difference > 0) {
//       const parts = {
//         // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60)
//       };

//       remaining = Object.keys(parts)
//         .map(part => {
//           if (!parts[part]) return;
//           return `${parts[part]} ${part}`;
//         })
//         .join(" ");
//     }

//     document.getElementById("track").innerHTML = remaining;
//   }

//   countdownTimer();
//   setInterval(countdownTimer, 1000);


function setPlayhead() {
    checkTimeline();
    // console.log("setPlayed")
    // console.log(checkTimeline());
    if (checkTml) {
        csInterface.evalScript("timelineFrameCount()", function (result) {
            totFr = result;
        });
        csInterface.evalScript("timelineCurrentFrame()", function (result) {
            curFr = result;
            curFr = (window.innerWidth / totFr) * curFr;
            document.getElementById("scrubber").style.left = curFr - 10 + "px";
        });
    }
}

// Add event listener to timeline
const tml = document.getElementById("track");
// const tml = document.getElementById("body");
tml.addEventListener("mouseenter", setPlayhead, false); // only check once prevents fireing 

function checkTimeline() {
    // console.log("timelineChecl")
    var timeline = document.getElementById("errorTimeline");
    csInterface.evalScript("timelineFrameCount()", function (result) {
        // console.log(result)
        if (result == "EvalScript error.") {
            timeline.innerHTML = getLocalize().STR_noTimeline;
            timeline.style.display = "block";
            checkTml = false;
        } else {
            timeline.innerHTML = "";
            timeline.style.display = "none";
            checkTml = true;
        }
    });
    return checkTml
};

function initTimeline() {
    // var container = document.getElementById("timeline");
    // csInterface.evalScript("timelineFrameCount()", function (result) {
    // if (result != "EvalScript error.") {
    // totFr = Number(result);
    // totFr = totFr / 10;
    timeline.innerHTML = ""; // clear errors
    container.innerHTML = ""; // clear errors
    container.style.opacity = "1";
    scrubber.style.opacity = "1";
    current.style.opacity = "1";
    for (var i = 0; i < 10; i++) {
        // container.innerHTML+='<div>'+(Math.floor(totFr*i))+'</div>';
        container.innerHTML += '<div id="' + i + '">';
        var subcontainer = document.getElementById(i);
        for (var j = 0; j < 10; j++) {
            subcontainer.innerHTML += "<div></div>";
        }
        ("</div>");
    }
    // } else {
    checkTimeline();
    // }
    // });
}

initTimeline();

// function initTimeline() {
//     var csInterface = new CSInterface();
//     var timeline = document.getElementById("errorTimeline");
//     var container = document.getElementById("timeline");
//     var scrubber = document.getElementById("scrubber");
//     var current = document.getElementById("current");
//     csInterface.evalScript("timelineFrameCount()", function (result) {
//         if (result != "EvalScript error.") {
//             var totFr = Number(result);
//             totFr = totFr / 10;
//             timeline.innerHTML = ""; // clear errors
//             container.innerHTML = ""; // clear errors
//             container.style.opacity = "1";
//             scrubber.style.opacity = "1";
//             current.style.opacity = "1";
//             for (var i = 0; i < 11; i++) {
//                 // container.innerHTML+='<div>'+(Math.floor(totFr*i))+'</div>';
//                 container.innerHTML += '<div id="' + i + '">';
//                 var subcontainer = document.getElementById(i);
//                 for (var j = 0; j < 11; j++) {
//                     subcontainer.innerHTML += "<div></div>";
//                 }
//                 ("</div>");
//             }
//         } else {
//             timeline.innerHTML = "No timeline available";
//             timeline.style.textAlign = "center";
//             // container.style.width = "100%";
//             // track.style.display = "block";
//             container.style.opacity = "0";
//             scrubber.style.opacity = "0";
//             current.style.opacity = "0";

//         }
//     });
// }

