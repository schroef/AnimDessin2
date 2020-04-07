/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
	'use strict';

	var csInterface = new CSInterface();
	var gExtensionId = "com.sbaril.animdessin2.Panel";

	function Persistent(inOn) { // keep session stored

		if (inOn) {
			var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
		} else {
			var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
		}

		event.extensionId = gExtensionId;
		csInterface.dispatchEvent(event);
	}

	// Opens the chrome developer tools in host app
	// Depricated https://community.adobe.com/t5/labs/showdevtools-method-added-by-default/td-p/6905305?page=1
	function showDevTools() {
		window.__adobe_cep__.showDevTools();
	}

	// Reloads extension panel
	function reloadPanel() {
		location.reload();
	}

	// Loads / executes a jsx file
	function loadJSXFile(pPath) {
		var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
		csInterface.evalScript('evalFile("' + scriptPath + '")');
	}

	// Fontsize
	function iconSize(size) {
		$("body").removeClass("iconSml").removeClass("iconMed").removeClass("iconBig").addClass(size);
		storeSettings(size);
		// document.getElementsByTagName('BODY').className = document.getElementsByTagName('BODY').className.replace(/(?:^|\s)\"+size+\"(?!\S)/g ,"");
	}

	// ToolTips
	function toolTips() {
		$(".mybtn").toggleClass("ttHide", "ttShow");
		if (document.getElementsByClassName("ttHide").length == 0) {
			storeSettings("ttShow");
		} else {
			storeSettings("ttHide");
		}
	}

	function checkSettings() {
		$("#btn_onionSkin").addClass(localStorage.getItem('onionSkin'));
		$("#btn_videoShortcuts").addClass(localStorage.getItem('keySettings'));
		if (localStorage.getItem('onionSkin' == "onionDisabled")) {
			$("body").addClass(localStorage.getItem('onionSkin'));
			$("#btn_onionSkin").addClass("onionDisabled");
			// loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
		}
		if (localStorage.getItem('onionSkin' == "onionActive")) {
			loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
		}
		if (localStorage.getItem('keySettings' == "keysDisabled")) {
			$("body").addClass(localStorage.getItem('keysSettings'));
			$("#btn_videoShortcuts").addClass("keysDisabled");
		}
		if (localStorage.getItem('iconSize') == "iconSml") {
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, true);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
			csInterface.updateContextMenuItem("iconSml", true, true);
        	csInterface.updateContextMenuItem("iconMed", true, false);
        	csInterface.updateContextMenuItem("iconBig", true, false);
		}
		if (localStorage.getItem('iconSize') == "iconMed") {
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, true);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
			csInterface.updateContextMenuItem("iconSml", true, false);
        	csInterface.updateContextMenuItem("iconMed", true, true);
			csInterface.updateContextMenuItem("iconBig", true, false);
		}
		if (localStorage.getItem('iconSize') == "iconBig") {
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, true);
			csInterface.updateContextMenuItem("iconMed", true, false);
        	csInterface.updateContextMenuItem("iconMed", true, false);
			csInterface.updateContextMenuItem("iconBig", true, true);
		}
		if (localStorage.getItem('toolTips') == "ttHide") {
			csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, false);
			csInterface.updateContextMenuItem("toolTips", true, false);
		}
		if (localStorage.getItem('toolTips') == "ttShow") {
			csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, true);
			csInterface.updateContextMenuItem("toolTips", true, true);
		}
		$("body").addClass(localStorage.getItem('iconSize'));
		$(".mybtn").addClass(localStorage.getItem('toolTips'));
	}

	//Store settings
	function storeSettings(store) {
		// alert(store)
		if (store == "onion") {
			if (localStorage.getItem('onionSkin') == 'onionDisabled') {
				localStorage.setItem('onionSkin', "onionActive");
			} else {
				localStorage.setItem('onionSkin', "onionDisabled");
			}
		}
		if (store == "keys") {
			if (localStorage.getItem('keySettings') == 'keysDisabled') {
				localStorage.setItem('keySettings', "keysActive");
			} else {
				localStorage.setItem('keySettings', "keysDisabled");
			}
		}
		if (store == "iconSml") {
			localStorage.setItem('iconSize', "iconSml");
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, true);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
			csInterface.updateContextMenuItem("iconSml", true, true);
        	csInterface.updateContextMenuItem("iconMed", true, false);
        	csInterface.updateContextMenuItem("iconBig", true, false);
		}
		if (store == "iconMed") {
			localStorage.setItem('iconSize', "iconMed");
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, true);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, false);
			csInterface.updateContextMenuItem("iconSml", true, false);
        	csInterface.updateContextMenuItem("iconMed", true, true);
			csInterface.updateContextMenuItem("iconBig", true, false);
		}
		if (store == "iconBig") {
			localStorage.setItem('iconSize', "iconBig");
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconSml, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconMed, true, false);
			csInterface.updatePanelMenuItem(getLocalize().flyout_iconBig, true, true);
        	csInterface.updateContextMenuItem("iconMed", true, false);
        	csInterface.updateContextMenuItem("iconMed", true, false);
			csInterface.updateContextMenuItem("iconBig", true, true);
		}
		if (store == "ttHide") {
			localStorage.setItem('toolTips', "ttHide");
			csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, false);
			csInterface.updateContextMenuItem("toolTips", true, false);
		}
		if (store == "ttShow") {
			localStorage.setItem('toolTips', "ttShow");
			csInterface.updatePanelMenuItem(getLocalize().flyout_tooltips, true, true);
			csInterface.updateContextMenuItem("toolTips", true, true);
		}
		console.log(store)
	}

	function openGuides() {
		var ext = "com.sbaril.animdessin2.Panel2"
		csInterface.requestOpenExtension(ext, "");
	}
	// function hostApp(){
	// 	var hostEnv = csInterface.getHostEnvironment();
	// 	var languageCode = hostEnv.appUILocale;
	// 	return languageCode
	// }

	// Localize Languages
	function getLocalize() {
		var csInterface = new CSInterface();
		// csInterface.initResourceBundle();
		var renderBundle = csInterface.initResourceBundle();
		console.log(renderBundle)
		return renderBundle
	}
	// // Show helpguide
	// function toggleGuide(){
	// 	if (localStorage.getItem('toggleGuide') == "guideInActive") {
	// 		localStorage.setItem('toggleGuide', "guideActive");
	// 		localStorage.setItem('toggleVideo', "videoInActive");
	// 		$("#content").addClass("InActive").removeClass("Active");
	// 		$("#guide").addClass("Active").removeClass("InActive");
	// 		$("#video").addClass("InActive").removeClass("Active");
	// 		csInterface.resizeContent(400, 500);

	// 	} else {
	// 		localStorage.setItem('toggleGuide', "guideInActive");
	// 		localStorage.setItem('toggleVideo', "videoInActive");
	// 		$("#content").addClass("Active").removeClass("InActive");
	// 		$("#guide").addClass("InActive").removeClass("Active");
	// 		$("#video").addClass("InActive").removeClass("Active");
	// 		csInterface.resizeContent(1000, 45);
	// 	}
	// }

	// // Show Video
	// function toggleVideo(){
	// 	if (localStorage.getItem('toggleVideo') == "videoInActive") {
	// 		localStorage.setItem('toggleVideo', "videoActive");
	// 		localStorage.setItem('toggleGuide', "videoInActive");
	// 		$("#content").addClass("InActive").removeClass("Active");
	// 		$("#guide").addClass("InActive").removeClass("Active");
	// 		$("#video").addClass("Active").removeClass("InActive");
	// 		csInterface.resizeContent(720, 480);

	// 	} else {
	// 		localStorage.setItem('toggleGuide', "videoInActive");
	// 		localStorage.setItem('toggleVideo', "videoInActive");
	// 		$("#content").addClass("Active").removeClass("InActive");
	// 		$("#guide").addClass("InActive").removeClass("Active");
	// 		$("#video").addClass("InActive").removeClass("Active");
	// 		csInterface.resizeContent(1000, 45);
	// 	}
	// }

	function getLocalizes() {
		var resourceBundle = csInterface.initResourceBundle();
		// console.log(resourceBundle)
		// var localizedStr = resourceBundle[key];
		var btn = ['#btn_showTimeline', '#btn_newDoc', "#btn_canvasSize", '#btn_save', '#btn_newFrameOne']
		// csInterface.initResourceBundle();
		var j = 0;
		var key = "";
		var lanValue = [];
		console.log(resourceBundle)
		for (key in resourceBundle) {
			console.log(resourceBundle[key]);
			lanValue.push(resourceBundle[key]);
			// console.log(lanValue[j]);
			console.log("Item: %s - %s", j, lanValue[j]);
			j++;
		}
		// $('#btn_showTimeline').attr('data-original-title', getLocalize().DL_CANCEL)
		for (var i = 0; i < btn.length; i++) {
			// console.log("Item: %s - %s",i,lanValue[i]);
			// console.log(btn[i] +" "+lanValue[i]);
			$(btn[i]).attr('data-original-title', lanValue[i]);
		}
		return resourceBundle
	}

	function sendWarning() {
		loadJSXFile("/jsx/AnimD2_warning.jsx");
	}

	function init() {
		themeManager.init();
		//Persistent(true); //persistent to prevent extension from unloading


		////////////////////////////////////////////////////////////////////////////////
		// ANIMDESSIN2 BUTTONS FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////   

		$("#btn_debug").click(showDevTools);
		$("#btn_reload").click(reloadPanel);

		// $("#btn_closeGuide").click(toggleGuide);
		// $("#btn_closeVideo").click(toggleVideo);


		$("#btn_lan").click(function () {
			$(this).html(getLocalize());
		});

		$("#btn_test").click(function () {
			csInterface.evalScript('sayHello()');
		});
		$("#btn_showTimeline").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_setTimelinePanelOptions.jsx");
			else
				loadJSXFile("/jsx/AnimD2_showTimeline.jsx");
		});

		$("#btn_newDoc").click(function (e) {
			if (e.altKey && e.shiftKey)
				loadJSXFile("/jsx/AnimD2_timelineSetFrameRate.jsx");
			else if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_timelineRenderVideo.jsx");
			else if (e.altKey)
				loadJSXFile("/jsx/AnimD2_gotoInTimeLine.jsx");
			else
				loadJSXFile("/jsx/AnimD2_newDoc.jsx");
		});

		$("#btn_canvasSize").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_canvasFitScreen.jsx");
			else if (e.altKey)
				loadJSXFile("/jsx/AnimD2_canvasRealSize.jsx");
			else
				loadJSXFile("/jsx/AnimD2_canvasSize.jsx");
		});

		$("#btn_save").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_saveAs.jsx");
			else
				loadJSXFile("/jsx/AnimD2_save.jsx");
		});

		$("#btn_newFrameOne").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_create1FrameVideoLayer.jsx");
			else
				loadJSXFile("/jsx/AnimD2_create1Frame.jsx");
		});

		$("#btn_newFrameTwo").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_create2FrameVideoLayer.jsx");
			else
				loadJSXFile("/jsx/AnimD2_create2Frames.jsx");
		});

		$("#btn_duplicateFrame").click(function () {
			loadJSXFile("/jsx/AnimD2_duplicateFrame.jsx");
		});

		$("#btn_deleteFrame").click(function () {
			loadJSXFile("/jsx/AnimD2_deleteFrame.jsx");
		});

		$("#btn_toggleFavorite").click(function (e) {
			if (e.altKey && e.shiftKey)
				loadJSXFile("/jsx/AnimD2_timelineShowAllLayers.jsx") || $(this).addClass('favoriteDisabled').removeClass('favoriteActive');
			else if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_timelineShowFavorites.jsx") || $(this).addClass('favoriteActive').removeClass('favoriteDisabled');
			else
				loadJSXFile("/jsx/AnimD2_timelineShowSetFavorites.jsx") || $(this).addClass('favoriteActive').removeClass('favoriteDisabled');
			$("body").toggleClass('favoriteDisabled', '');
		});

		$("#btn_onionSkin").click(function () {
			loadJSXFile("/jsx/AnimD2_onionSkin.jsx");
			$(this).toggleClass('onionActive', 'onionDisabled');
			$("body").toggleClass('onionDisabled', '');
			// storeSettings("onion");
			// sendWarning();
		});

		$("#btn_onionSkinSettings").click(function () {
			loadJSXFile("/jsx/AnimD2_onionSkinSettings.jsx");
		});

		$("#btn_newVideoGroup").click(function (e) {
			if (e.altKey && e.shiftKey)
				loadJSXFile("/jsx/AnimD2_toggleAutoGroupClips.jsx");
			else if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_newVideoGroupSelection.jsx");
			else if (e.altKey)
				loadJSXFile("/jsx/AnimD2_newVideoUngroup.jsx");
			else
				loadJSXFile("/jsx/AnimD2_newVideoGroup.jsx");
		});

		$("#btn_minus").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_frameMinusTwo.jsx");
			else if (e.altKey)
				loadJSXFile("/jsx/AnimD2_frameMinusTen.jsx");
			else
				loadJSXFile("/jsx/AnimD2_frameMinusOne.jsx");
		});

		$("#btn_plus").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_framePlusTwo.jsx");
			else if (e.altKey)
				loadJSXFile("/jsx/AnimD2_framePlusTen.jsx");
			else
				loadJSXFile("/jsx/AnimD2_framePlusOne.jsx");
		});

		$("#btn_red").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_colorRedToggle.jsx");
			else
				loadJSXFile("/jsx/AnimD2_colorRed.jsx");
		});

		$("#btn_green").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_colorGreenToggle.jsx");
			else
				loadJSXFile("/jsx/AnimD2_colorGreen.jsx");
		});

		$("#btn_blue").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_colorBlueToggle.jsx");
			else
				loadJSXFile("/jsx/AnimD2_colorBlue.jsx");
		});

		$("#btn_none").click(function () {
			loadJSXFile("/jsx/AnimD2_colorNone.jsx");
		});

		$("#btn_createInBetween").click(function () {
			loadJSXFile("/jsx/AnimD2_inBetweenCreate.jsx");
		});

		$("#btn_inBetweenPrevious").click(function () {
			loadJSXFile("/jsx/AnimD2_inBetweenPrevious.jsx");
		});

		$("#btn_inBetweenNext").click(function () {
			loadJSXFile("/jsx/AnimD2_inBetweenNext.jsx");
		});

		$("#btn_playheadStart").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_playheadTrimStart.jsx");
			else if (e.altKey)	
				loadJSXFile("/jsx/AnimD2_playheadMoveStart.jsx");
			else
				loadJSXFile("/jsx/AnimD2_playheadStart.jsx");
		});

		$("#btn_playheadEnd").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_playheadTrimEnd.jsx");
				else if (e.altKey)	
				loadJSXFile("/jsx/AnimD2_playheadMoveEnd.jsx");	
			else
				loadJSXFile("/jsx/AnimD2_playheadEnd.jsx");
		});

		$("#btn_commentEdit").click(function (e) {
			if (e.shiftKey)
				loadJSXFile("/jsx/AnimD2_commentToggle.jsx");
			else
				loadJSXFile("/jsx/AnimD2_commentEdit.jsx");
		});

		$("#btn_commentsHtml").click(function () {
			loadJSXFile("/jsx/AnimD2_commentExportHtml.jsx");
		});

		$("#btn_commentsText").click(function () {
			loadJSXFile("/jsx/AnimD2_commentExportText.jsx");
		});

		$("#btn_videoShortcuts").click(function () {
			loadJSXFile("/jsx/AnimD2_videoShortcuts.jsx");
			$(this).toggleClass('keysActive', 'keysDisabled');
			$("body").toggleClass('keysDisabled', '');
			storeSettings("keys");
			// sendWarning();
		});

		/////////////////////////////////////////////////////////////////////////

		// Main Feature Button
        /*
		$("#mainBT").click(function () {
            invokeFeature("Main");
        });
		*/

		$("#lassoToolBT").click(function () {
			invokeFeature("Tool-Lasso_Tool");
		});

		////////////////////////////////////////////////////////////////////////////////
		// ANIMDESSIN FLYOUT MENU
		////////////////////////////////////////////////////////////////////////////////

		// Ugly workaround to keep track of "checked" and "enabled" statuses
		var checkableMenuItem_isChecked = true;
		var targetMenuItem_isEnabled = true;

		function flyoutXML() {
			return "<Menu> \n<MenuItem Id=\"AboutItemAnimD2\" Label=\"" + (getLocalize().flyout_about) + "\"/> \n<MenuItem Id=\"OpenWebsiteAnimD2\" Label=\"" + (getLocalize().flyout_onlineinfo) + "\"/> \n <MenuItem Label=\"---\" /> \n<MenuItem Id=\"iconSml\" Label=\"" + (getLocalize().flyout_iconSml) + "\" Checkable=\"true\" Checked=\"false\"/> \n\n<MenuItem Id=\"iconMed\" Label=\"" + (getLocalize().flyout_iconMed) + "\" Checkable=\"true\" Checked=\"false\"/> \n\n<MenuItem Id=\"iconBig\" Label=\"" + (getLocalize().flyout_iconBig) + "\" Checkable=\"true\" Checked=\"false\"/> \n <MenuItem Label=\"---\" /> \n<MenuItem Id=\"toolTips\" Label=\"" + (getLocalize().flyout_tooltips) + "\" Checkable=\"true\" Checked=\"false\"/> \n <MenuItem Id=\"help\" Label=\"" + (getLocalize().flyout_helpguides) + "\" Checkable=\"true\" Checked=\"false\"/>\n</Menu>";
		};

		// Uses the XML string to build the menu
		csInterface.setPanelFlyoutMenu(flyoutXML());

		// Flyout Menu Click Callback
		function flyoutMenuClickedHandler(e) {

			// the event's "data" attribute is an object, which contains "menuId" and "menuName"
			console.dir(e);
			switch (e.data.menuId) {
				case "AboutItemAnimD2":
					csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.1\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\nhttp://www.sbaril.me');");
					break;
				case "OpenWebsiteAnimD2":
					csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links"); LoseFocus();
					break;
				case "iconSml":
					iconSize("iconSml");
					break;
				case "iconMed":
					iconSize("iconMed");
					break;
				case "iconBig":
					iconSize("iconBig");
					break;
				case "toolTips":
					toolTips();
					break;
				case "help":
					openGuides();
					break;
				case "localize":
					getLocalize();
					break;
				default:
					console.log(e.data.menuName + " panel clicked!");
			}
		}

		// Listen for the Flyout menu clicks
		csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", flyoutMenuClickedHandler);

		// Righclick Context Menu > uses exact same structure for now. easier acces
		function contextHandler(menuId) {
			switch (menuId) {
				case "AboutItemAnimD2":
					csInterface.evalScript("alert('AnimDessin2 \\nVersion 2.2.1\\nPhotoshop CC 2015 to 2018+\\n©2018 Stephane Baril\\nhttp://www.sbaril.me');");
					break;
				case "OpenWebsiteAnimD2":
					csInterface.openURLInDefaultBrowser("http://www.sbaril.me/links"); LoseFocus();
					break;
				case "iconSml":
					iconSize("iconSml");
					break;
				case "iconMed":
					iconSize("iconMed");
					break;
				case "iconBig":
					iconSize("iconBig");
					break;
				case "toolTips":
					toolTips();
					break;
				case "help":
					openGuides();
					break;
				case "localize":
					getLocalize();
					break;
				default:
					console.log(menuId + " panel clicked!");
			}
		}
		// Uses the XML string to build the menu
		csInterface.setContextMenu(flyoutXML(), contextHandler);

	}
	init();
	checkSettings();
}());