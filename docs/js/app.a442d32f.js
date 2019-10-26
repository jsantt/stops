(function(t){function e(e){for(var o,i,r=e[0],c=e[1],l=e[2],d=0,f=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(s.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},a={app:0},s=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"2a27":function(t,e,n){"use strict";var o=n("bfdf"),a=n.n(o);a.a},4769:function(t,e,n){},"4d67":function(t,e,n){"use strict";var o=n("be50"),a=n.n(o);a.a},"55d3":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.favoriteTab?t._e():n("Nearest",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}),t.favoriteTab?n("Favorite",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}):t._e(),n("Navigation",{on:{"time-switch-clicked":t.showRealtime,nearby:function(e){t.favoriteTab=!1},favorite:function(e){t.favoriteTab=!0}}})],1)},s=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Data",{attrs:{favoriteStops:t.favoriteStops},on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return n("div",{key:e.gtfsId},[n("section",[n("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),n("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime}})],1)])}))],2)},r=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span")},l=[];function u(t,e,n,o){const a=6371,s=d(n-t),i=d(o-e),r=d(t),c=d(n),l=Math.sin(s/2)*Math.sin(s/2)+Math.sin(i/2)*Math.sin(i/2)*Math.cos(r)*Math.cos(c),u=2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),f=a*u;return f}function d(t){return t*Math.PI/180}function f(t){const e=Math.round(1e3*t);return e}async function p(t,e,n){const o=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:v(t)})}),a=await h(o);let s=[];a.forEach(t=>{const o={...t};o.distance=f(u(e,n,t.lat,t.lon)),s.push(o)});const i=s.sort((t,e)=>t.distance>e.distance?1:-1);return i}async function h(t){const e=await t.json();return e.data.stops}function v(t){const e=JSON.stringify(t);return`\n    {\n      stops(ids: ${e}) {\n        lat\n        lon\n        name\n        gtfsId\n        code\n        desc\n        locationType\n        vehicleType\n        stoptimesWithoutPatterns {\n          scheduledDeparture\n          departureDelay\n          realtime\n          realtimeState\n          headsign\n          serviceDay\n          trip {\n            routeShortName\n          }\n        }\n      }\n    }`}async function m(t,e,n){const o=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:w(t,e,n)})});return await g(o,t,e)}async function g(t,e,n){const o=await t.json(),a=o.data.nearest.edges,s=[];a.forEach(t=>{const o={...t.node.place};o.distance=f(u(e,n,t.node.place.lat,t.node.place.lon)),s.push(o)});const i=s.sort((t,e)=>t.distance>e.distance?1:-1);return i}function w(t,e,n){const o=JSON.stringify(n);return`\n    {\n        nearest(lat: ${t}, lon: ${e}, maxResults: 20, maxDistance: 2000, filterByPlaceTypes: [STOP] ${void 0===n?"":`filterByIds:{stops: ${o}}`}) {\n          edges {\n            node {\n              distance\n              place {\n                id\n                lat\n                lon\n                ... on Stop {\n                  name\n                  gtfsId\n                  code\n                  desc\n                  locationType\n                  vehicleType\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    departureDelay\n                    realtime\n                    realtimeState\n                    headsign\n                    serviceDay\n                    trip {\n                      routeShortName\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n    }`}function S(){return new Promise((t,e)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{t({lat:e.coords.latitude,lon:e.coords.longitude})},t=>{switch(t.code){case t.PERMISSION_DENIED:e(new Error("Salli paikannus käyttääksesi palvelua"));break;case t.POSITION_UNAVAILABLE:e(new Error("Lokaatiota ei saatavilla"));break;case t.TIMEOUT:e(new Error("Paikantaminen kesti liian kauan ja epäonnistui"));break;case t.UNKNOWN_ERROR:e(new Error("Tuntematon virhe paikannuksessa"))}},{maximumAge:0}):e(new Error("Käyttämäsi selain ei tue paikannusta"))})}var b={name:"Data",props:{favoriteStops:Array},mounted:function(){document.addEventListener("visibilitychange",()=>{"visible"===document.visibilityState&&this.locateAndfetch()}),this.locateAndfetch(),setInterval(()=>{this.locateAndfetch()},15e3)},methods:{locateAndfetch:async function(){try{const t=await S();console.log("hip"),console.log(this.favoriteStops);const e=void 0===this.favoriteStops?await m(t.lat,t.lon):await p(this.favoriteStops,t.lat,t.lon);this.$emit("nearest-stops",e)}catch(t){alert(t),this.$emit("location-error",t)}}}},y=b,_=n("2877"),k=Object(_["a"])(y,c,l,!1,null,null,null),O=k.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.departures.length<1?n("div",{staticClass:"no-departures"},[t._v("—")]):t._e(),t.departures.length>0?n("article",{staticClass:"secondary header"},[n("div"),n("div",[n("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("MIN")]),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}]},[t._v("KLO")])]),n("div",[t._v("LINJA")]),n("div",[t._v("MÄÄRÄNPÄÄ")])]):t._e(),t._l(t.departures,(function(e){return n("article",{key:e.scheduledArrival,staticClass:"departure"},[n("div",{class:{"realtime-sign":e.realtime&&t.realtime}}),n("div",{staticClass:"time"},[n("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}],attrs:{"data-hook":"time-schedule"}},[t._v(t._s(t.timeToString(t.toHourAndMinutes(e.scheduledDeparture))))]),n("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("\n        "+t._s(t.toRealtime(new Date,e.scheduledDeparture,e.departureDelay,e.realtime,e.serviceDay))+"\n      ")])]),n("div",{staticClass:"line"},[t._v(t._s(e.trip.routeShortName))]),n("div",[t._v(t._s(e.headsign))]),n("div")])}))],2)},N=[],$={name:"Schedule",props:{departures:Array,realtime:Boolean},methods:{dayNumber(t){return new Date(1e3*t).getDate()},toHourAndMinutes:function(t){const e=Math.floor(t/3600),n=60*e*60,o=Math.floor((t-n)/60);return{hours:e,minutes:o}},timeToString:function(t){const e=t.hours>9?`${t.hours}`:`0${t.hours}`,n=t.minutes>9?`${t.minutes}`:`0${t.minutes}`;return`${e}.${n}`},toRealtime:function(t,e,n){const o=this.getSecondsSinceMidnight(t),a=Math.floor((e-o)/60);if(a>59||a<-30)return this.timeToString(this.toHourAndMinutes(e));const s=a>0?a:0;let i=a+Math.ceil(n/60);return i=i>0?i:0,i===s?s:s<i?`${s}-${i}*`:`${i}*-${s}`},getSecondsSinceMidnight:function(t){let e=new Date(t);const n=t-e.setHours(0,0,0,0);return n/1e3}}},x=$,M=(n("f4f8"),Object(_["a"])(x,T,N,!1,null,"36872ebc",null)),C=M.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("div",[n("span",{staticClass:"name"},[t._v(t._s(t.stop.name))]),n("wbr"),n("span",{staticClass:"secondary"},[n("span",{staticClass:"code"},[t._v(t._s(t.stop.code))]),t._v("\n      "+t._s(t.stop.desc)+"\n    ")])]),n("div",{staticClass:"distance secondary"},[t._v(t._s(t.formatDistance(t.stop.distance)))]),n("div",{staticClass:"favorite"},[n("Star",{attrs:{selected:t.favorite},on:{toggle:t.toggleFavorite}})],1)])},D=[],j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{on:{click:function(e){return t.toggle()}}},[n("svg",{class:{animate:t.selected},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"28",height:"28",viewBox:"0 0 24 24"}},[n("path",{directives:[{name:"show",rawName:"v-show",value:!t.selected,expression:"!selected"}],attrs:{fill:"#a9a9a9",d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}}),n("path",{directives:[{name:"show",rawName:"v-show",value:t.selected,expression:"selected"}],attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}})])])},E=[],F={name:"Star",props:{selected:Boolean},mounted:function(){},methods:{toggle:function(){this.$emit("toggle",!this.selected)}}},P=F,A=(n("2a27"),Object(_["a"])(P,j,E,!1,null,"1ad28da6",null)),L=A.exports,B={name:"Stop",props:{favorite:Boolean,stop:Object},components:{Star:L},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",{stopId:this.stop.gtfsId,selected:t})},formatDistance:function(t){if(t<1e3)return`${t}m`;const e=Math.round(t/100)/10;return`${e}km`}}},J=B,R=(n("4d67"),Object(_["a"])(J,I,D,!1,null,"76e4e74e",null)),q=R.exports,z={name:"Favorite",props:{favoriteStops:Array,realtime:Boolean},components:{Data:O,Departures:C,Stop:q},data(){return{stops:[]}},methods:{isFavorite(t){return this.favoriteStops.includes(t)},populateStops(t){this.stops=t},toggleFavorite(t){this.$emit("toggle-favorite",t)}}},H=z,W=Object(_["a"])(H,i,r,!1,null,null,null),K=W.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",[n("div",{staticClass:"tab"},[n("TimeSwitch",{on:{"time-switch-clicked":function(e){return t.$emit("time-switch-clicked")}}}),n("Clock")],1),n("div",{staticClass:"tab",attrs:{selected:"nearby"===t.selectedTab},on:{click:t.clickNearby}},[n("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})]),n("div",[t._v("lähellä")])]),n("div",{staticClass:"tab",attrs:{selected:"favorite"===t.selectedTab},on:{click:t.clickFavorite}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]),n("div",[t._v("suosikit")])])])},V=[],G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v(t._s(t.time))])},Q=[],X={name:"Clock",props:{stop:Object},data(){return{time:""}},mounted:function(){this.startClock()},methods:{startClock:function(){setInterval(()=>{const t=new Date;this.time=t.toLocaleTimeString("fi-FI")},1e3)}}},Y=X,Z=Object(_["a"])(Y,G,Q,!1,null,"11c04b07",null),tt=Z.exports,et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"onoffswitch"},[n("input",{staticClass:"onoffswitch-checkbox",attrs:{type:"checkbox",name:"onoffswitch",id:"myonoffswitch",checked:""},on:{change:function(e){return t.checkboxChanged()}}}),t._m(0)])},nt=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"onoffswitch-label",attrs:{for:"myonoffswitch"}},[n("span",{staticClass:"onoffswitch-inner"}),n("span",{staticClass:"onoffswitch-switch"})])}],ot={name:"TimeSwitch",methods:{checkboxChanged(){this.$emit("time-switch-clicked")}}},at=ot,st=(n("61e8"),Object(_["a"])(at,et,nt,!1,null,"424ee250",null)),it=st.exports,rt={name:"Navigation",components:{Clock:tt,TimeSwitch:it},data(){return{selectedTab:"nearby"}},mounted:function(){const t=this.getSelectedTab();this.selectedTab=t||"nearby"},methods:{clickNearby:function(){this.$emit("nearby"),this.setSelectedTab("nearby")},clickFavorite:function(){this.$emit("favorite"),this.setSelectedTab("favorite")},getSelectedTab:function(){return window.localStorage.getItem("selectedTab")},setSelectedTab:function(t){this.selectedTab=t,window.localStorage.setItem("selectedTab",t)}}},ct=rt,lt=(n("cfa3"),Object(_["a"])(ct,U,V,!1,null,"f942915c",null)),ut=lt.exports,dt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Data",{on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return n("div",{key:e.gtfsId},[n("section",[n("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),n("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime}})],1)])}))],2)},ft=[],pt={name:"Nearest",props:{favoriteStops:Array,realtime:Boolean},components:{Data:O,Departures:C,Stop:q},data(){return{stops:[]}},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",t)},isFavorite(t){return this.favoriteStops.includes(t)},populateStops:function(t){this.stops=t}}},ht=pt,vt=Object(_["a"])(ht,dt,ft,!1,null,null,null),mt=vt.exports,gt={name:"app",components:{Favorite:K,Navigation:ut,Nearest:mt},data:function(){return{realtime:!0,favoriteStops:[],favoriteTab:!1}},mounted:function(){const t=window.localStorage.getItem("favoriteStops");null===t?window.localStorage.setItem("favoriteStops",JSON.stringify([])):(this.favoriteStops=JSON.parse(t),console.log("parsed"+this.favoriteStops))},methods:{toggleFavorite:function(t){!0===t.selected?this.addFavorite(t.stopId):this.removeFavorite(t.stopId)},addFavorite:function(t){this.favoriteStops.push(t),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},removeFavorite:function(t){this.favoriteStops=this.favoriteStops.filter(e=>{return e!==t}),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},showRealtime:function(){this.realtime=!this.realtime}}},wt=gt,St=Object(_["a"])(wt,a,s,!1,null,null,null),bt=St.exports,yt=n("9483");Object(yt["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(bt)}}).$mount("#app")},"61e8":function(t,e,n){"use strict";var o=n("55d3"),a=n.n(o);a.a},be50:function(t,e,n){},bfdf:function(t,e,n){},cfa3:function(t,e,n){"use strict";var o=n("d80f"),a=n.n(o);a.a},d80f:function(t,e,n){},f4f8:function(t,e,n){"use strict";var o=n("4769"),a=n.n(o);a.a}});
//# sourceMappingURL=app.a442d32f.js.map