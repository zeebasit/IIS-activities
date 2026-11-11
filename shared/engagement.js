(function(){
 "use strict";
 if(window.ActivityEngagement)return;
 var COLLECT_URL="https://activity-engagement.basitzeeshan.workers.dev/collect";
 var canTrack=COLLECT_URL&&window.location.hostname==="zeebasit.github.io"&&
  navigator.doNotTrack!=="1"&&!navigator.globalPrivacyControl;
 var pathname=window.location.pathname||"";
 var repo=pathname.startsWith("/IIS-activities/")?"IIS":pathname.startsWith("/net-interactive-activities/")?"NET":null;
 if(!repo)return;
 var activity=pathname.replace(/^\/(?:IIS-activities|net-interactive-activities)\//,"").replace(/\/?index\.html$/i,"").replace(/\/+$/,"")||"home";
 var flags={started:false,completed:false};
 function track(event){
  if(!canTrack||activity==="home"||activity==="lecturer-hub")return;
  fetch(COLLECT_URL,{
   method:"POST",
   body:JSON.stringify({course:repo,activity:activity,name:event}),
   headers:{"Content-Type":"text/plain;charset=UTF-8"},
   credentials:"omit",
   referrerPolicy:"no-referrer",
   keepalive:true
  }).catch(function(){});
 }
 function start(){
  if(flags.started)return;
  flags.started=true;
  track("activity-start")
 }
 function complete(){
  start();
  if(flags.completed)return;
  flags.completed=true;
  track("activity-complete")
 }
 function activeControl(el){
  if(!el||typeof el.closest!=="function")return null;
  var control=el.closest('button,input,select,textarea,[role="button"],[role="slider"],[contenteditable="true"]');
  if(!control||control.disabled)return null;
  if(control.closest(".lecturer-navigation"))return null;
  return control
 }
 document.addEventListener("click",function(e){if(activeControl(e.target))start()},true);
 document.addEventListener("change",function(e){if(activeControl(e.target))start()},true);
 document.addEventListener("keydown",function(e){
  if((e.key==="Enter"||e.key===" ")&&activeControl(e.target))start()
 },true);
 window.ActivityEngagement=Object.freeze({
  start:start,
  complete:complete,
  // Custom milestones for activities with verifiable end states.
  milestone:function(name){if(typeof name!=="string"||!/^[a-z0-9-]{1,32}$/.test(name))return;start()}
 });
 track("pageview");
})();

