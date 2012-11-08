// WebTrends SmartSource Data Collector Tag
// Version: 8.6.2     
// Tag Builder Version: 3.0
// Created: 10/27/2009 11:44:46 PM
// Modified: 4/23/2010  3:00 PM - by SSA

function WebTrends(){
	var that=this;
	// begin: user modifiable
	this.dcsid="dcs5w0txb10000wocrvqy1nqm_6n1p";
	this.domain="stats.ssa.gov";
	this.timezone=-5;
	this.fpcdom="";
	this.onsitedoms="www.ssa.gov,www.socialsecurity.gov";
	this.downloadtypes="xls,doc,pdf,txt,csv,zip,exe";
	this.navigationtag="div,table";
	this.trackevents=true;
	this.trimoffsiteparams=true;
	this.enabled=true;
	this.i18n=false;
	this.fpc="WT_FPC";
	this.paidsearchparams="gclid";
	// end: user modifiable
	this.DCS={};
	this.WT={};
	this.DCSext={};
	this.images=[];
	this.index=0;
	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
}
