/* IIS + NET teaching activity engagement integration.
 * Events: automatic pageview (Umami), activity-start, activity-complete.
 * Never send names, answers, scores, keystrokes or manually assigned visitor IDs.
 * Repo: zeebasit/IIS-activities
 */
(function(){
 "use strict";
 if(window.ActivityEngagement)return;
 var WEBSITE_ID="3477cf4c-a222-4bee-9deb-e7bd5b7c0a69";
 var ENABLED=true;
 var HOSTNAME="zeebasit.github.io";
 var canTrack=ENABLED&&window.location.hostname===HOSTNAME;
 var SCRIPT_URL="https://cloud.umami.is/script.js";
 var pathname=window.location.pathname||"";
 var repo=pathname.startsWith("/IIS-activities/")?"IIS":pathname.startsWith("/net-interactive-activities/")?"NET":null;
 if(!repo)return;
 var activity=pathname.replace(/^\/(?:IIS-activities|net-interactive-activities)\//,"").replace(/\/?index\.html$/i,"").replace(/\/+$/,"")||"home";
 var flags={started:false,completed:false};
 var queue=[],loaded=false;
 function track(event){
  if(!canTrack)return false; // No third-party request until enabled.
  if(loaded&&window.umami&&typeof window.umami.track==="function"){
   try{window.umami.track(event,{course:repo,activity:activity});return true}catch(e){return false}
  }
  if(queue.length<4)queue.push(event);
  return false;
 }
 function flush(){
  loaded=true;
  while(queue.length&&window.umami&&typeof window.umami.track==="function")track(queue.shift());
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
  milestone:function(name){if(typeof name!=="string"||!/^[a-z0-9-]{1,32}$/.test(name))return;start();track("activity-"+name)}
 });
 if(canTrack){
  window.activityEngagementBeforeSend=function(type,payload){
   delete payload.referrer;
   return payload;
  };
  var s=document.createElement("script");s.defer=true;s.src=SCRIPT_URL;
  s.referrerPolicy="no-referrer";
  s.dataset.websiteId=WEBSITE_ID;s.dataset.domains=HOSTNAME;s.dataset.tag=repo;
  s.dataset.beforeSend="activityEngagementBeforeSend";s.dataset.excludeSearch="true";
  s.dataset.excludeHash="true";s.dataset.doNotTrack="true";
  s.addEventListener("load",flush);
  (document.head||document.documentElement).appendChild(s)
 }
})();