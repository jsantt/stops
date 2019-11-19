(function(t){function e(e){for(var a,s,r=e[0],l=e[1],c=e[2],d=0,f=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],a=!0,r=1;r<i.length;r++){var l=i[r];0!==n[l]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=i[0]))}return t}var a={},n={app:0},o=[];function s(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=a,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"09ba":function(t,e,i){},"2a27":function(t,e,i){"use strict";var a=i("bfdf"),n=i.n(a);n.a},3324:function(t,e,i){"use strict";var a=i("f9ee"),n=i.n(a);n.a},"43af":function(t,e,i){},"4c69":function(t,e,i){"use strict";var a=i("5b9e"),n=i.n(a);n.a},"4e33":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);var a=i("2b0e"),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("Navigation",{ref:"navigation",staticClass:"navigation",on:{"time-switch-clicked":t.showRealtime,nearby:t.nearbyClicked,favorite:t.favoriteClicked}},[i("Filter-nearest",{on:{"filter-changed":t.filterByLine}}),void 0!==t.locationError?i("Notification",{on:{"open-locate-prompt":t.openLocatePrompt}},[i("div",{attrs:{slot:"header"},slot:"header"},[t._v(t._s(t.locationError.header))]),i("div",{attrs:{slot:"body"},slot:"body"},[t._v(t._s(t.locationError.body))]),i("div",{attrs:{slot:"button"},slot:"button"},[t._v(t._s(t.locationError.button))])]):t._e()],1),i("Data",{ref:"data",attrs:{fetchFavorites:t.favoriteTab,favoriteStops:t.favoriteStops},on:{"location-error":t.onLocationError,"nearest-stops":t.populateStops,"favorite-stops":t.populateFavorites,"finding-location":function(e){return t.updateStatus("paikannetaan")},"fetching-favorites":function(e){return t.updateStatus("haetaan *")},"fetching-nearest":function(e){return t.updateStatus("haetaan")}}}),i("div",{ref:"swipe",staticClass:"swipe"},[i("Nearest",{staticClass:"swipe-page",attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime,stops:t.nearestData},on:{"toggle-favorite":t.toggleFavorite,"add-favorite-line":t.addFavoriteLine}}),i("Favorite",{staticClass:"swipe-page",attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime,stops:t.favoriteData},on:{"toggle-favorite":t.toggleFavorite,"add-favorite-line":t.addFavoriteLine}})],1),i("footer",[void 0!==t.nearestData?i("div",[t._v("*=GPS-signaaliin perusteella laskettu arvio")]):t._e(),i("div",{staticClass:"version"},[i("Version")],1)])],1)},o=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span")},r=[];function l(t,e,i,a){const n=6371,o=c(i-t),s=c(a-e),r=c(t),l=c(i),u=Math.sin(o/2)*Math.sin(o/2)+Math.sin(s/2)*Math.sin(s/2)*Math.cos(r)*Math.cos(l),d=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)),f=n*d;return f}function c(t){return t*Math.PI/180}function u(t){const e=Math.round(1e3*t);return e}async function d(t,e,i){const a=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:h(t)})}),n=await f(a);let o=[];n.forEach(t=>{const a={...t};a.distance=u(l(e,i,t.lat,t.lon)),o.push(a)});const s=o.sort((t,e)=>t.distance>e.distance?1:-1);return s}async function f(t){const e=await t.json();return e.data.stops}function h(t){const e=JSON.stringify(t);return`\n    {\n      stops(ids: ${e}) {\n        lat\n        lon\n        name\n        gtfsId\n        code\n        desc\n        locationType\n        vehicleType\n        stoptimesWithoutPatterns {\n          scheduledDeparture\n          departureDelay\n          realtime\n          realtimeState\n          headsign\n          serviceDay\n          trip {\n            routeShortName\n          }\n        }\n      }\n    }`}async function v(t,e,i){const a=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:m(t,e,i)})});return await p(a,t,e)}async function p(t,e,i){const a=await t.json(),n=a.data.nearest.edges,o=[];n.forEach(t=>{const a={...t.node.place};a.distance=u(l(e,i,t.node.place.lat,t.node.place.lon)),o.push(a)});const s=o.sort((t,e)=>t.distance>e.distance?1:-1);return s}function m(t,e,i){const a=JSON.stringify(i);return`\n    {\n        nearest(lat: ${t}, lon: ${e}, maxResults: 20, maxDistance: 2000, filterByPlaceTypes: [STOP] ${void 0===i?"":`filterByIds:{stops: ${a}}`}) {\n          edges {\n            node {\n              distance\n              place {\n                id\n                lat\n                lon\n                ... on Stop {\n                  name\n                  gtfsId\n                  code\n                  desc\n                  locationType\n                  vehicleType\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    departureDelay\n                    realtime\n                    realtimeState\n                    headsign\n                    serviceDay\n                    trip {\n                      routeShortName\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n    }`}function g(){return new Promise((t,e)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{t({lat:e.coords.latitude,lon:e.coords.longitude})},t=>{switch(t.code){case t.PERMISSION_DENIED:e({header:"Salli paikannus",body:"Salli paikannus käyttääksesi palvelua",button:"ok"});break;case t.POSITION_UNAVAILABLE:e({header:"Lokaatiota ei saatavilla",body:"Kokeile uudestaan",button:"ok"});break;case t.TIMEOUT:e({header:"Aikakatkaisu",body:"Lokaatiota ei löytynyt",button:"ok"});break;case t.UNKNOWN_ERROR:e({header:"Tuntematon virhe",body:"Tuntematon virhe, kokeile uudestaan",button:"ok"})}},{maximumAge:0,enableHighAccuracy:!0,timeout:3e4}):e(new Error("Käyttämäsi selain ei tue paikannusta"))})}var w={name:"Data",props:{favoriteStops:Array,fetchFavorites:Boolean},data:function(){return{pollingHandle:void 0}},methods:{startPollingDefault:function(t){this.fetch(t),this.pollingHandle=setInterval(()=>{this.fetch(t)},15e3)},startPolling:async function(){this.stopPolling(),document.addEventListener("visibilitychange",this.visibilityChange);const t=await this.locate();void 0!==t&&this.fetch(t),this.pollingHandle=setInterval(async()=>{const t=await this.locate();void 0!==t&&this.fetch(t)},15e3)},stopPolling:function(){void 0!==this.pollingHandle&&(clearInterval(this.pollingHandle),document.removeEventListener("visibilitychange",this.visibilityChange))},visibilityChange:function(){"visible"===document.visibilityState&&this.startPolling()},locate:async function(){this.$emit("finding-location");try{const t=await g();return t}catch(t){return void this.$emit("location-error",t)}},fetch:async function(t){this.$emit("fetching-nearest");const e=await v(t.lat,t.lon);this.$emit("nearest-stops",e),this.$emit("fetching-favorites");const i=await d(this.favoriteStops,t.lat,t.lon);this.$emit("favorite-stops",i)},locateAndfetch:async function(t){try{const e=void 0!==t?t:await g(),i=await v(e.lat,e.lon);this.$emit("nearest-stops",i);const a=await d(this.favoriteStops,e.lat,e.lon);this.$emit("favorite-stops",a)}catch(e){this.$emit("location-error",e)}}}},b=w,y=i("2877"),S=Object(y["a"])(b,s,r,!1,null,null,null),_=S.exports,k=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h2",[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}}),i("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]),i("div",[t._v("Suosikit")])]),t._l(t.stops,(function(e){return i("div",{key:e.gtfsId},[i("section",[i("Stop",{attrs:{isFavorite:!0,stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),i("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime},on:{"add-favorite-line":t.addFavoriteLine}})],1)])})),null==t.stops||t.stops.length<1?i("div",{staticClass:"empty-favorite"},[i("h3",[t._v("Suosikkilista on tyhjä")]),i("div",[t._v("\n      Lisää suosikkisi lähellä näkymässä merkitsemällä pysäkki tähdellä\n    ")])]):t._e(),i("Install")],2)},T=[],$=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.departures.length<1?i("div",{staticClass:"no-departures"},[t._v("—")]):t._e(),t._l(t.departures,(function(e){return i("article",{directives:[{name:"show",rawName:"v-show",value:!0===!e.hidden,expression:"!departure.hidden === true"}],staticClass:"departure",class:{"departure--favorite":!0===e.favorite},on:{click:function(i){return t.addLine(e)}}},[i("div",{class:{"realtime-sign":e.realtime&&t.realtime}}),i("div",{staticClass:"time"},[i("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}],attrs:{"data-hook":"time-schedule"}},[t._v(t._s(t.timeToString(t.toHourAndMinutes(e.scheduledDeparture))))]),i("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("\n        "+t._s(t.toRealtime(new Date,e.scheduledDeparture,e.departureDelay,e.realtime,e.serviceDay))+"\n      ")])]),i("div",{staticClass:"line"},[t._v(t._s(e.trip.routeShortName))]),i("div",[t._v(t._s(e.headsign))]),i("div")])}))],2)},C=[],E={name:"Schedule",props:{departures:Array,realtime:Boolean},methods:{addLine(t){const e=t.trip.routeShortName;let i=window.localStorage.getItem("favoriteLines");null==i&&(i="[]");let a=JSON.parse(i);a.includes(e)?a=a.filter(t=>t!==e):a.push(e),window.localStorage.setItem("favoriteLines",JSON.stringify(a)),this.$emit("add-favorite-line",{routeShortName:t.trip.routeShortName,headsign:t.headsign})},isFavorite(t){const e=t.trip.routeShortName;let i=window.localStorage.getItem("favoriteLines");if(null==i)return!1;let a=JSON.parse(i);return a.includes(e)},dayNumber(t){return new Date(1e3*t).getDate()},toHourAndMinutes:function(t){const e=Math.floor(t/3600),i=60*e*60,a=Math.floor((t-i)/60);return{hours:e,minutes:a}},timeToString:function(t){const e=t.hours>9?`${t.hours}`:`0${t.hours}`,i=t.minutes>9?`${t.minutes}`:`0${t.minutes}`;return`${e}.${i}`},toRealtime:function(t,e,i){const a=this.getSecondsSinceMidnight(t),n=Math.round((e-a)/60);if(n>59||n<-30)return this.timeToString(this.toHourAndMinutes(e));const o=n>0?n:0;let s=n+Math.ceil(i/60);return s=s>0?s:0,s===o?o:o<s?`${o}-${s}*`:`${s}*-${o}`},getSecondsSinceMidnight:function(t){let e=new Date(t);const i=t-e.setHours(0,0,0,0);return i/1e3}}},x=E,N=(i("4c69"),Object(y["a"])(x,$,C,!1,null,"4b2ec008",null)),L=N.exports,O=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.showPrompt()?i("section",{attrs:{id:"install-prompt"}},[i("h2",[t._v("Asenna sovellus")]),t.showInstructions?t._e():i("div",[i("div",{staticClass:"body"},[t._v("Aloitusnäytöltä näet lähtöajat kolmessa sekunnissa")]),i("button",{on:{click:t.onInstructionClick}},[t._v("Asenna nyt")])]),t.showInstructions?i("div",[i("div",{staticClass:"body--instructions"},[i("ol",[i("li",[t._v("\n          valitse\n          "),i("svg",{attrs:{viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid meet"}},[i("g",{attrs:{id:"iosShare"}},[i("polyline",{staticClass:"arrow",attrs:{"stroke-width":"3",points:"40,12 50,2 60,12",fill:"none"}}),i("line",{staticClass:"arrow-line",attrs:{"stroke-width":"3",x1:"50",y1:"2",x2:"50",y2:"45"}}),i("polyline",{staticClass:"rectangle",attrs:{"stroke-width":"3",points:"45,20 27,20 27,70 73,70 73,20 55,20",fill:"none"}})])]),t._v("\n          kuvake alhaalta,\n        ")]),i("li",[t._v("skrollaa alaspäin ja")]),i("li",[t._v("lisää kotivalikkoon")])])])]):t._e()]):t._e()},F=[],I={name:"Install",mounted:function(){},data(){return{showInstructions:!1}},methods:{showPrompt:function(){if(navigator.standalone)return!1;const t=["iPhone","iPad","iPod"].includes(navigator.platform),e=null===localStorage.getItem("prompt-install");return t&&e},onInstructionClick:function(){this.showInstructions=!0,window.location.href="#install-prompt"}}},A=I,P=(i("a5e9"),Object(y["a"])(A,O,F,!1,null,"d1a0b090",null)),D=P.exports,M=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{class:{favorite:t.isFavorite}},[i("div",[i("span",{staticClass:"name"},[t._v(t._s(t.stop.name))]),i("wbr"),i("span",{staticClass:"secondary"},[i("span",{staticClass:"code"},[t._v(t._s(t.stop.code))]),t._v("\n      "+t._s(t.stop.desc)+"\n    ")])]),i("div",{staticClass:"distance secondary"},[t._v(t._s(t.formatDistance(t.stop.distance)))]),i("div",{staticClass:"favorite"},[i("Star",{attrs:{selected:t.favorite},on:{toggle:t.toggleFavorite}})],1)])},j=[],B=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{on:{click:function(e){return t.toggle()}}},[i("svg",{class:{animate:t.selected},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"28",height:"28",viewBox:"0 0 24 24"}},[i("path",{directives:[{name:"show",rawName:"v-show",value:!t.selected,expression:"!selected"}],attrs:{fill:"#a9a9a9",d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}}),i("path",{directives:[{name:"show",rawName:"v-show",value:t.selected,expression:"selected"}],attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}})])])},R=[],J={name:"Star",props:{selected:Boolean},mounted:function(){},methods:{toggle:function(){this.$emit("toggle",!this.selected)}}},V=J,z=(i("2a27"),Object(y["a"])(V,B,R,!1,null,"1ad28da6",null)),q=z.exports,H={name:"Stop",props:{favorite:Boolean,isFavorite:Boolean,stop:Object},components:{Star:q},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",{stopId:this.stop.gtfsId,selected:t})},formatDistance:function(t){if(t<1e3)return`${t}m`;const e=Math.round(t/100)/10;return`${e}km`}}},W=H,U=(i("56ea"),Object(y["a"])(W,M,j,!1,null,"2b51a5b6",null)),G=U.exports,Y={name:"Favorite",props:{favoriteStops:Array,realtime:Boolean,stops:Array},components:{Departures:L,Install:D,Stop:G},methods:{addFavoriteLine(t){this.$emit("add-favorite-line",t)},isFavorite(t){return this.favoriteStops.includes(t)},toggleFavorite(t){this.$emit("toggle-favorite",t)}}},K=Y,Q=(i("b3d0"),Object(y["a"])(K,k,T,!1,null,"3c7ff934",null)),X=Q.exports,Z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("label",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.filterValue,expression:"filterValue"}],attrs:{placeholder:" etsi linja",type:"text"},domProps:{value:t.filterValue},on:{keyup:t.filter,input:function(e){e.target.composing||(t.filterValue=e.target.value)}}})])])},tt=[],et={name:"Filter-nearest",data(){return{filterValue:void 0}},methods:{filter:function(t){this.$emit("filter-changed",this.filterValue)}}},it=et,at=(i("5906"),Object(y["a"])(it,Z,tt,!1,null,"371a8315",null)),nt=at.exports,ot=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bottom-sheet"},[i("div",{staticClass:"above-notification",class:{"above-notification--hidden":void 0===t.statusText}},[t._v("\n    "+t._s(t.statusText)+"\n  ")]),t._t("default"),i("nav",[i("div",{staticClass:"tab"},[i("TimeSwitch",{on:{"time-switch-clicked":function(e){return t.$emit("time-switch-clicked")}}}),i("Clock")],1),i("div",{staticClass:"tab nearby",attrs:{selected:"nearby"===t.selectedTab},on:{click:t.clickNearby}},[i("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})]),i("div",[t._v("lähellä")])]),i("div",{staticClass:"tab favorite",attrs:{selected:"favorite"===t.selectedTab},on:{click:t.clickFavorite}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}}),i("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]),i("div",[t._v("suosikit")])])])],2)},st=[],rt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._v(t._s(t.time))])},lt=[],ct={name:"Clock",props:{stop:Object},data(){return{time:""}},mounted:function(){this.startClock()},methods:{startClock:function(){setInterval(()=>{const t=new Date;this.time=t.toLocaleTimeString("fi-FI")},1e3)}}},ut=ct,dt=Object(y["a"])(ut,rt,lt,!1,null,"11c04b07",null),ft=dt.exports,ht=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"onoffswitch"},[i("input",{staticClass:"onoffswitch-checkbox",attrs:{type:"checkbox",name:"onoffswitch",id:"myonoffswitch",checked:""},on:{change:function(e){return t.checkboxChanged()}}}),t._m(0)])},vt=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("label",{staticClass:"onoffswitch-label",attrs:{for:"myonoffswitch"}},[i("span",{staticClass:"onoffswitch-inner"}),i("span",{staticClass:"onoffswitch-switch"})])}],pt={name:"TimeSwitch",methods:{checkboxChanged(){this.$emit("time-switch-clicked")}}},mt=pt,gt=(i("e087"),Object(y["a"])(mt,ht,vt,!1,null,"4bab6452",null)),wt=gt.exports,bt={name:"Navigation",components:{Clock:ft,TimeSwitch:wt},data(){return{TAB:{NEARBY:"nearby",FAVORITE:"favorite",STORAGE_NAME:"selectedTab"},selectedTab:"nearby",statusText:void 0}},mounted:function(){const t=this.getSelectedTab();t===this.TAB.FAVORITE&&this.clickFavorite()},methods:{clickNearby:function(){this.$emit(this.TAB.NEARBY),this.setSelectedTab(this.TAB.NEARBY)},clickFavorite:function(){this.$emit(this.TAB.FAVORITE),this.setSelectedTab(this.TAB.FAVORITE)},dataUpdated:function(t){this.statusText=t,setTimeout(()=>{this.statusText=void 0},3e3)},getSelectedTab:function(){return window.localStorage.getItem(this.TAB.STORAGE_NAME)},setSelectedTab:function(t){this.selectedTab=t||"nearby",window.localStorage.setItem(this.TAB.STORAGE_NAME,t)}}},yt=bt,St=(i("e1be"),Object(y["a"])(yt,ot,st,!1,null,"629b30ca",null)),_t=St.exports,kt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h2",[i("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})]),i("div",[t._v("Lähimmät")])]),t._l(t.stops,(function(e){return i("div",{key:e.gtfsId},[i("section",[void 0!==e.stoptimesWithoutPatterns&&!0!==e.hidden?i("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}):t._e(),i("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime},on:{"add-favorite-line":t.addFavoriteLine}})],1)])}))],2)},Tt=[],$t={name:"Nearest",props:{favoriteStops:Array,realtime:Boolean,stops:Array},components:{Departures:L,Stop:G},methods:{addFavoriteLine(t){this.$emit("add-favorite-line",t)},toggleFavorite:function(t){this.$emit("toggle-favorite",t)},isFavorite(t){return this.favoriteStops.includes(t)}}},Ct=$t,Et=(i("3324"),Object(y["a"])(Ct,kt,Tt,!1,null,"7386df55",null)),xt=Et.exports,Nt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"notification",attrs:{role:"dialog","aria-modal":"true"}},[i("h2",[i("div",[i("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24"}},[i("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})])]),t._t("header")],2),i("main",[t._t("body")],2),i("footer",[i("button",{on:{click:function(e){return t.$emit("open-locate-prompt")}}},[t._t("button")],2)])])},Lt=[],Ot={name:"Notification",data:function(){return{showUpdatedText:!1}}},Ft=Ot,It=(i("8740"),Object(y["a"])(Ft,Nt,Lt,!1,null,"a1b1f5ae",null)),At=It.exports,Pt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._v("versio 0.12")])},Dt=[],Mt={name:"Version"},jt=Mt,Bt=Object(y["a"])(jt,Pt,Dt,!1,null,null,null),Rt=Bt.exports,Jt={name:"app",components:{Data:_,Favorite:X,FilterNearest:nt,Navigation:_t,Nearest:xt,Notification:At,Version:Rt},data:function(){return{favoriteStops:[],favoriteTab:!1,filter:void 0,locationError:void 0,previousScrollPosition:0,realtime:!0,nearestData:[],favoriteData:[]}},mounted:function(){const t=window.localStorage.getItem("favoriteStops");null===t?(window.localStorage.setItem("favoriteStops",JSON.stringify([])),this.setAllowLocationNotification(),this.$refs.data.startPollingDefault({lat:60.16704004097834,lon:24.946832000000086})):(this.favoriteStops=JSON.parse(t),this.openLocatePrompt()),document.querySelector(".swipe").addEventListener("touchend",this.swipeListener)},methods:{swipeListener:function(){setTimeout(async()=>{let t=document.querySelector(".swipe").scrollLeft;t<200&&!0===this.favoriteTab?(await this.scrollEnded(),this.nearbyClicked(),this.$refs.navigation.setSelectedTab("nearby")):t>=200&&!1===this.favoriteTab&&(await this.scrollEnded(),this.favoriteClicked(),this.$refs.navigation.setSelectedTab("favorite"))},500)},addFavoriteLine(){const t=localStorage.getItem("favoriteLines"),e=JSON.parse(t);this.markAsFavorite(this.nearestData,e),this.markAsFavorite(this.favoriteData,e)},markAsFavorite(t,e){void 0!==t&&t.forEach(t=>{void 0!==t.stoptimesWithoutPatterns&&t.stoptimesWithoutPatterns.forEach(t=>{e.includes(t.trip.routeShortName)?a["a"].set(t,"favorite",!0):a["a"].set(t,"favorite",!1)})})},openLocatePrompt:function(){this.$refs.data.startPolling(),this.locationError=void 0},toggleFavorite:function(t){!0===t.selected?this.addFavorite(t.stopId):this.removeFavorite(t.stopId),this.$refs.data.startPolling()},addFavorite:function(t){this.favoriteStops.push(t),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},nearbyClicked:function(){this.$refs.swipe.scrollTo(0,0),document.querySelector("html").scrollTop=0,this.favoriteTab=!1,this.$refs.data.startPolling(),this.locationError=void 0},favoriteClicked:function(){this.$refs.swipe.scrollTo(this.$refs.swipe.scrollWidth,0),document.querySelector("html").scrollTop=0,this.favoriteTab=!0,this.$refs.data.startPolling(),this.locationError=void 0},filterByLine:function(t){this.filter=t,this.filterData(this.nearestData,t)},filterData(t,e){if(void 0===e)return;const i=e.toLowerCase();let n;t.forEach(t=>{n=!1,void 0!==t.stoptimesWithoutPatterns&&(t.stoptimesWithoutPatterns.forEach(t=>{const e=t.trip.routeShortName.toLowerCase();e.includes(i)?(a["a"].set(t,"hidden",!1),n=!0):a["a"].set(t,"hidden",!0)}),a["a"].set(t,"hidden",!n))})},removeFavorite:function(t){this.favoriteStops=this.favoriteStops.filter(e=>{return e!==t}),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},populateStops:function(t){this.nearestData=t,this.addFavoriteLine(),this.filterData(this.nearestData,this.filter)},updateStatus:function(t){this.$refs.navigation.dataUpdated(t)},populateFavorites:function(t){this.updateStatus("päivitetty"),this.favoriteData=t,this.addFavoriteLine()},onLocationError:function(t){this.locationError=t},showRealtime:function(){this.realtime=!this.realtime},setAllowLocationNotification:function(){this.locationError={header:"Tarvitsemme sijaintisi",body:"Jotta voimme näyttää lähimmät pysäkit. Sijaintiasi ei tallenneta mihinkään",button:"salli sijainti"}},scrollEnded:function(){return new Promise(t=>{let e=-99;const i=setInterval(()=>{let a=document.querySelector(".swipe").scrollLeft;e===a&&(clearInterval(i),t()),e=a},10)})}}},Vt=Jt,zt=(i("ae4f"),Object(y["a"])(Vt,n,o,!1,null,"3ffdc36e",null)),qt=zt.exports,Ht=i("9483");Object(Ht["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(qt)}}).$mount("#app")},"56ea":function(t,e,i){"use strict";var a=i("09ba"),n=i.n(a);n.a},5906:function(t,e,i){"use strict";var a=i("4e33"),n=i.n(a);n.a},"5b9e":function(t,e,i){},"60b1":function(t,e,i){},"72af":function(t,e,i){},8740:function(t,e,i){"use strict";var a=i("c91b"),n=i.n(a);n.a},"9f07":function(t,e,i){},a5e9:function(t,e,i){"use strict";var a=i("72af"),n=i.n(a);n.a},ae4f:function(t,e,i){"use strict";var a=i("43af"),n=i.n(a);n.a},b3d0:function(t,e,i){"use strict";var a=i("60b1"),n=i.n(a);n.a},b9e7:function(t,e,i){},bfdf:function(t,e,i){},c91b:function(t,e,i){},e087:function(t,e,i){"use strict";var a=i("b9e7"),n=i.n(a);n.a},e1be:function(t,e,i){"use strict";var a=i("9f07"),n=i.n(a);n.a},f9ee:function(t,e,i){}});
//# sourceMappingURL=app.418758ef.js.map