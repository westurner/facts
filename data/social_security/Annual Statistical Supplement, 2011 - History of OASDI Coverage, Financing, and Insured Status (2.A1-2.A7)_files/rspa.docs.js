/***********************************/
/*   SSA BASE VARIABLES            */
/*   created by: Eric Brown        */
/*   modified by: Jessie Dalrymple */
/*   last modified: 10/31/11       */
/***********************************/

/*********************************************************/
/* INITIATE JQUERY IF AVAILABLE                          */
/*********************************************************/
if (jQuery) {

/***********************************/
/* GENERAL CONFIG                  */
/***********************************/
var $pdfLink = $("a[href$='.pdf']", "#content"),
    $pdfPlugin = "&#160;<a href='http://get.adobe.com/reader/'><img alt='Get Adobe Acrobat' class='middle' src='/framework/images/icons/pdf.gif' /></a>";

/* LOOP VARIABLES */
var uniqueID, length;

/* UTILITY BAR
-----------------------------------*/
var $utilityBar = $("#utility-bar", document.body),
    $mail = $("a", "#mail"),
    $print = $("a", "#print"),
		$excel = $("a", "#excel"),
    $facebook = $("#facebook", $utilityBar),
		$sendTitle = document.title.replace(/&/g, "%26").replace(/"/g, "");
var utilityBar = {
    load: function () {
        utilityBar.configure();
        $utilityBar.css("visibility", "visible");
    },
    configure: function () {
				$mail.attr("href", "mailto:?subject=From the SSA Research, Statistics, %26 Policy Analysis website&body=" + $sendTitle + "%0D" + $pageURL);
        $print.attr("href", $fileAsPDF);
				$excel.attr("href", $fileAsXLSX);
    }
	};		
    
/* DISCLAIMER LINK
-----------------------------------*/
var $disclaimer = $("#disclaimer"),$disclaimerLink = $("a.disclaimer", "#page");
				
/* PDF SCRIPT
-----------------------------------*/
var pdf = {
    load: function () {pdf.detect();},
    detect: function () {
        var plugin = {browser:null,installed:false,version:null};

        if (navigator && (navigator.userAgent.toLowerCase()).indexOf("chrome") > -1) plugin.browser = "chrome";
        else if (navigator && (navigator.userAgent.toLowerCase()).indexOf("msie") > -1) plugin.browser = "ie";
        else if (navigator && (navigator.userAgent.toLowerCase()).indexOf("firefox") > -1) plugin.browser = "firefox";
        else if (navigator && (navigator.userAgent.toLowerCase()).indexOf("msie") > -1) plugin.browser = "other";

        /* HANDLE IE */
        try {
            if (plugin.browser == "ie") {
                var control = null;
                try {
                    // AcroPDF.PDF is used by version 7 and later
                    control = new ActiveXObject('AcroPDF.PDF');
                }
                catch (e) { }

                if (!control) {
                    try {
                        // PDF.PdfCtrl is used by version 6 and earlier
                        control = new ActiveXObject('PDF.PdfCtrl');
                    }
                    catch (e) { }
                }

                if (!control) {plugin.installed = false;return plugin;}

                version = control.GetVersions().split(',');
                version = version[0].split('=');
                plugin.installed = true;
                plugin.version = parseFloat(version[1]);
            }
            /* HANDLE CHROME */
            else if (plugin.browser === "chrome") {
                for (key in navigator.plugins) {
                    if (navigator.plugins[key].name === "Chrome PDF Viewer" || navigator.plugins[key].name === "Adobe Acrobat") {
                        plugin.installed = true;plugin.version = parseInt(navigator.plugins[key].version) || "Chome PDF Viewer";
                    }
                }
            }
            /* HANDLE FIREFOX, OPERA, ETC. */
            else if (navigator.plugins != null) {
                var acrobat = navigator.plugins['Adobe Acrobat'];
                if (acrobat === null) {plugin.installed = false;return plugin;}
                plugin.installed = true;plugin.version = parseInt(acrobat.version[0]);
            }
        }
        catch (e) {plugin.version = null;}

        if (plugin.installed === false) {pdf.links();}
    },
    links: function () {
        $pdfLink.addClass("no-icon");
        len = $pdfLink.length;
        for (var i = -1; ++i < len; ) {$("a[href$='.pdf']:eq(" + i + ")", $content).after($pdfPlugin);}
    }
};

/***********************************/
/* MOBILE DETECTION SCRIPT         */
/* http://detectmobilebrowser.com/ */
/***********************************/
(function (a) { jQuery.browser.mobile = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

/************************************************
URL Parser 2.0 Plug-in
https://github.com/allmarkedup/jQuery-URL-Parser
Author: Mark Perkins
*************************************************/
(function (h, f) { var i = { a: "href", img: "src", form: "action", base: "href", script: "src", iframe: "src", link: "href" }, j = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], e = { anchor: "fragment" }, a = { strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ }, c = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, b = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; function g(k, n) { var p = decodeURI(k), m = a[n || false ? "strict" : "loose"].exec(p), o = { attr: {}, param: {}, seg: {} }, l = 14; while (l--) { o.attr[j[l]] = m[l] || "" } o.param.query = {}; o.param.fragment = {}; o.attr.query.replace(c, function (r, q, s) { if (q) { o.param.query[q] = s } }); o.attr.fragment.replace(b, function (r, q, s) { if (q) { o.param.fragment[q] = s } }); o.seg.path = o.attr.path.replace(/^\/+|\/+$/g, "").split("/"); o.seg.fragment = o.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"); o.attr.base = o.attr.host ? o.attr.protocol + "://" + o.attr.host + (o.attr.port ? ":" + o.attr.port : "") : ""; return o } function d(l) { var k = l.tagName; if (k !== f) { return i[k.toLowerCase()] } return k } h.fn.url = function (l) { var k = ""; if (this.length) { k = h(this).attr(d(this[0])) || "" } return h.url(k, l) }; h.url = function (k, l) { if (arguments.length === 1 && k === true) { l = true; k = f } l = l || false; k = k || window.location.toString(); return { data: g(k, l), attr: function (m) { m = e[m] || m; return m !== f ? this.data.attr[m] : this.data.attr }, param: function (m) { return m !== f ? this.data.param.query[m] : this.data.param.query }, fparam: function (m) { return m !== f ? this.data.param.fragment[m] : this.data.param.fragment }, segment: function (m) { if (m === f) { return this.data.seg.path } else { m = m < 0 ? this.data.seg.path.length + m : m - 1; return this.data.seg.path[m] } }, fsegment: function (m) { if (m === f) { return this.data.seg.fragment } else { m = m < 0 ? this.data.seg.fragment.length + m : m - 1; return this.data.seg.fragment[m] } } } } })(jQuery);

var file,
    $url = $.url(true),
    $fileURL = $url.attr("file"),
    $pageAnchor = $url.attr("anchor"),
    $pageURL = "http://www.socialsecurity.gov" + $url.attr("path"),
		$pathURL = $url.attr("path"),
    $sourceURL = $url.attr("source");

    if ($fileURL === "") { file = "index"; }
    else { 
			file = $fileURL.replace(".html", "").replace(".htm", ""),
			$fileAsPDF = $url.attr("file").replace(".html",".pdf").replace(".htm",".pdf");
			$fileAsXLS = $url.attr("file").replace(".html",".xls").replace(".htm",".xls");
			$fileAsXLSX = $url.attr("file").replace(".html",".xlsx").replace(".htm",".xlsx");
		}		

    var urlParams = {};
    (function () {
        var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

        while (e = r.exec(q))
            urlParams[d(e[1])] = d(e[2]);
    })();

/************************************************
POPUP WINDOW
http://swip.codylindley.com/popupWindowDemo.html
Author: Cody Lindley
*************************************************/
(function (a) { a.fn.popupWindow = function (b) { return this.each(function () { a(this).click(function () { a.fn.popupWindow.defaultSettings = { centerBrowser: 0, centerScreen: 0, height: 500, left: 0, location: 0, menubar: 0, resizable: 0, scrollbars: 0, status: 0, width: 500, windowName: null, windowURL: null, top: 0, toolbar: 0 }; settings = a.extend({}, a.fn.popupWindow.defaultSettings, b || {}); var c = "height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable + ",location=" + settings.location + ",menuBar=" + settings.menubar; settings.windowName = this.name || settings.windowName; settings.windowURL = this.href || settings.windowURL; var d, e; if (settings.centerBrowser) { if (a.browser.msie) { d = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120) / 2) - (settings.height / 2))); e = window.screenLeft + ((((document.body.offsetWidth + 20) / 2) - (settings.width / 2))) } else { d = window.screenY + (((window.outerHeight / 2) - (settings.height / 2))); e = window.screenX + (((window.outerWidth / 2) - (settings.width / 2))) } window.open(settings.windowURL, settings.windowName, c + ",left=" + e + ",top=" + d).focus() } else { if (settings.centerScreen) { d = (screen.height - settings.height) / 2; e = (screen.width - settings.width) / 2; window.open(settings.windowURL, settings.windowName, c + ",left=" + e + ",top=" + d).focus() } else { window.open(settings.windowURL, settings.windowName, c + ",left=" + settings.left + ",top=" + settings.top).focus() } } return false }) }) } })(jQuery);

/*  RSPA Only: Autogenerated TOC on stat pub doc pages   */
var tablesTOC = {
	load: function() {
		// map the captions into a new array then the table ids into a second array
		var chartsList = $(".chartCenter .title").map(function(){return $(this).text().replace(/Chart ([^ ]+)/g,"Chart $1</a> ").replace(/Chart ([^ ]+)/g,"Chart $1</a> ")});
		var tablesList = $("caption").map(function(){return $(this).text().replace("(in dollars)","").replace("(in\xa0dollars)","").replace("(in thousands)","").replace("(in\xa0thousands)","").replace("(in thousands of dollars)","").replace("(in\xa0thousands of\xa0dollars)","").replace("[In thousands of dollars]","").replace(/Table ([^ ]+)/g,"Table $1</a> ").replace(/Table ([^ ]+)/g,"Table $1</a> ")});
		var tableIDs = $(".table").map(function(){return $(this).attr("id")});
		var chartIDs = $(".chartCenter").map(function(){return $(this).children(":first").attr("id")});
		
		// generate the TOC list tag
		var contentsList = "<ul>";
		$.each(chartsList, function(index, value){ contentsList += "<li><a href=\"#"+chartIDs[index]+"\">"+value+"</li>";});
		$.each(tablesList, function(index, value){ contentsList += "<li><a href=\"#"+tableIDs[index]+"\">"+value+"</li>";});
		contentsList += "</ul>";
		
		// add the filter links before the first table
		if (chartsList.length > 0) {$(".chartCenter:first").before(contentsList);}
		else {$(".table:first").before(contentsList);}
	}
};

/*  RSPA Only: CHARTBOOK navigation   */
var incomeChart = {
	load: function() {
		var thisChart = location.hash;
		incomeChart.myToggles(thisChart);
	
		$(".chartNext,.chartPrevious, .ui-corner-top a, .chartSidebar a").click(function() {
			thisChart = $(this).attr("href");
			incomeChart.myToggles(thisChart);
			return false;
		});
		},
	
	myToggles: function (thisChart) {
		var definitionsArray = ['','#definitions'];
		var totalArray = ['','#table2','#chart3','#chart4','#chart5','#chart6'];
  	var incomeArray = ['#chart8','#chart9','#chart10','#chart11','#chart12','#chart13','#chart14'];
		var sharesArray = ['#chart16','#chart17','#chart18'];
		var familyArray = ['#table20','#chart21','#chart22','#chart23','#chart24','#chart25'];
		var povertyArray = ['#chart28','#chart29'];
		$(".ui-corner-top").removeClass("activeTab");
		$(".chartSidebar, .chartArea").hide();		
		$('.current').removeClass("current");
		if (thisChart != "") {$(thisChart).show();}
		else {$(".chartArea:first").show();$(".chartSidebar:first").show();$('.chartSidebar:first li:first').addClass("current");}
		if ($.inArray(thisChart, definitionsArray) !== -1) {$("#definition").addClass("activeTab");}
		if ($.inArray(thisChart, totalArray) !== -1) {$("#total").addClass("activeTab");$("#totalSidebar").show();}
		if ($.inArray(thisChart, incomeArray) !== -1) {$("#income").addClass("activeTab");$("#incomeSidebar").show();}
		if ($.inArray(thisChart, sharesArray) !== -1) {$("#shares").addClass("activeTab");$("#sharesSidebar").show();}
		if ($.inArray(thisChart, familyArray) !== -1) {$("#family").addClass("activeTab");$("#familySidebar").show();}
		if ($.inArray(thisChart, povertyArray) !== -1) {$("#poverty").addClass("activeTab");$("#povertySidebar").show();}
		$('.chartSidebar a[href=' + thisChart +']').parent().addClass("current"); 
		$(window).scrollTop($("#docHeader").offset().top);
	}
};
var fastfacts = {
	load: function() {
		var thisChart = location.hash;
		fastfacts.myToggles(thisChart);
	
		$(".chartNext,.chartPrevious, .ui-corner-top a, .chartSidebar a").click(function() {
			thisChart = $(this).attr("href");
			fastfacts.myToggles(thisChart);
			return false;
		});
		
		$(".abbr a").click(function() {
			$("#abbreviations").toggle();
			return false;
		});	
		},
	
	myToggles: function (thisChart) {
		var thisInfo = "";
		var highlightsArray = ['','#pagei'];
		var generalinfoArray = ['#contributions','#benefits','#ssirates','#trustfunds','#admindata'];
			var contributionsArray = ['#taxrates','#taxespayable','#taxmax','#workcredits','#earningstest'];
				if ($.inArray(thisChart, contributionsArray) !== -1) {thisInfo = thisChart; thisChart = '#contributions'}
			var benefitsArray = ['#benefitpayments','#cola','#maxbenefit','#fra','#bendpoints','#awi'];
				if ($.inArray(thisChart, benefitsArray) !== -1) {thisInfo = thisChart; thisChart = '#benefits'}
			var ssiratesArray = ['#rateslimits','#disabilitythresholds','#povertythresholds'];
				if ($.inArray(thisChart, ssiratesArray) !== -1) {thisInfo = thisChart; thisChart = '#ssirates'}
			var admindataArray = ['#costs','#workload'];
				if ($.inArray(thisChart, admindataArray) !== -1) {thisInfo = thisChart; thisChart = '#admindata'}
			var generalSubArray = ['#taxmax','#workcredits','#earningstest','#fra','#bendpoints','#awi'];
		var agedpopArray = ['#page5','#page6','#page7','#page8','#page9'];
		var oasdiArray = ['#page10','#page11','#page12','#page13','#page14','#page15','#page16','#page17','#page18','#page19','#page20','#page21','#page22','#page23'];
  	var ssiArray = ['#page24','#page25','#page26','#page27','#page28','#page29','#page30','#page31'];
		var crossprogramArray = ['#page32','#page33','#page34'];
		var financingArray = ['#page35','#page36','#page37'];
		$(".ui-corner-top").removeClass("activeTab");
		$(".chartSidebar, .chartArea").hide();		
		$(".current").removeClass("current");
		$(".shaded").removeClass("shaded");
		if (thisChart != "") {$(thisChart).show();}
		else {$(".chartArea:first").show();}
		if ($.inArray(thisChart, highlightsArray) !== -1) {$("#highlights").addClass("activeTab");$("#highlightsSidebar").show();}
  	if ($.inArray(thisChart, generalinfoArray) !== -1) {$("#generalinfo").addClass("activeTab");$("#generalinfoSidebar").show();}
		if ($.inArray(thisChart, agedpopArray) !== -1) {$("#agedpop").addClass("activeTab");$("#agedpopSidebar").show();}
		if ($.inArray(thisChart, oasdiArray) !== -1) {$("#oasdi").addClass("activeTab");$("#oasdiSidebar").show();}
		if ($.inArray(thisChart, ssiArray) !== -1) {$("#ssi").addClass("activeTab");$("#ssiSidebar").show();}
		if ($.inArray(thisChart, crossprogramArray) !== -1) {$("#crossprogram").addClass("activeTab");$("#crossprogramSidebar").show();}
		if ($.inArray(thisChart, financingArray) !== -1) {$("#financing").addClass("activeTab");$("#financingSidebar").show();}				
		$(".chartSidebar a[href=" + thisChart +"]").parent().addClass("current");
		if (thisInfo != "") {$(thisInfo).addClass("shaded");}
		if ($.inArray(thisInfo, generalSubArray) !== -1) {$(window).scrollTop($(thisInfo).offset().top);}
		else {$(window).scrollTop($("#docHeader").offset().top);}
	}
};

/**********************************************************/
/* FROM INITIALIZE SCRIPTS:                               */
/* USE SELF-INVOKING JQUERY FUNCTION TO PREVENT CONFLICTS */
/**********************************************************/
(function ($) {
		/* HIDE WHILE LOADING MODULES */
		$("html").addClass("hide").removeClass("no-js").addClass("js");

		utilityBar.load();
		if ($pdfLink.length > 0) {pdf.load();}
		if ($("body").hasClass("tablesTOC")) {tablesTOC.load();}
		if ($("body").hasClass("incomeChart")) {incomeChart.load();}
		if ($("body").hasClass("fastfacts")) {fastfacts.load();}
				
		/* REVEAL PAGE */
		$("html").removeClass("hide");
})(jQuery);
}