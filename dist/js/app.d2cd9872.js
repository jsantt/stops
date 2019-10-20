(function(t){function e(e){for(var o,i,r=e[0],c=e[1],l=e[2],d=0,p=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(s.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},a={app:0},s=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/stops/dist/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"55d3":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.favoriteTab?t._e():n("Nearest",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}),t.favoriteTab?n("Favorite",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}):t._e(),n("Navigation",{attrs:{favoriteTab:t.favoriteTab},on:{"time-switch-clicked":t.showRealtime,nearby:function(e){t.favoriteTab=!1},favorite:function(e){t.favoriteTab=!0}}})],1)},s=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Data",{attrs:{favoriteStops:t.favoriteStops},on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return n("div",{key:e.gtfsId},[n("section",[n("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),n("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime}})],1)])}))],2)},r=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span")},l=[];async function u(t,e,n){const o=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:p(t)})}),a=await d(o);let s=[];a.forEach(t=>{const o={...t};o.distance=Math.round(1e3*f(e,n,t.lat,t.lon)),s.push(o)});const i=s.sort((t,e)=>t.distance>e.distance?1:-1);return i}async function d(t){const e=await t.json();return e.data.stops}function p(t){const e=JSON.stringify(t);return`\n    {\n      stops(ids: ${e}) {\n        lat\n        lon\n        name\n        gtfsId\n        code\n        desc\n        locationType\n        vehicleType\n        stoptimesWithoutPatterns {\n          scheduledDeparture\n          departureDelay\n          realtime\n          realtimeState\n          headsign\n          serviceDay\n          trip {\n            routeShortName\n          }\n        }\n      }\n    }`}function f(t,e,n,o){const a=6371,s=v(n-t),i=v(o-e),r=v(t),c=v(n),l=Math.sin(s/2)*Math.sin(s/2)+Math.sin(i/2)*Math.sin(i/2)*Math.cos(r)*Math.cos(c),u=2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),d=a*u;return d}function v(t){return t*Math.PI/180}async function h(t,e,n){const o=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:g(t,e,n)})});return await m(o)}async function m(t){const e=await t.json(),n=e.data.nearest.edges,o=[];return n.forEach(t=>{const e={...t.node.place};e.distance=t.node.distance,o.push(e)}),o}function g(t,e,n){const o=JSON.stringify(n);return`\n    {\n        nearest(lat: ${t}, lon: ${e}, maxResults: 20, maxDistance: 2000, filterByPlaceTypes: [STOP] ${void 0===n?"":`filterByIds:{stops: ${o}}`}) {\n          edges {\n            node {\n              distance\n              place {\n                id\n                lat\n                lon\n                ... on Stop {\n                  name\n                  gtfsId\n                  code\n                  desc\n                  locationType\n                  vehicleType\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    departureDelay\n                    realtime\n                    realtimeState\n                    headsign\n                    serviceDay\n                    trip {\n                      routeShortName\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n    }`}function w(){return new Promise(t=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>{t({lat:e.coords.latitude,lon:e.coords.longitude})})})}var S={name:"Data",props:{favoriteStops:Array},mounted:async function(){document.addEventListener("visibilitychange",async()=>{"visible"===document.visibilityState&&this.locateAndfetch()}),this.locateAndfetch(),setInterval(async()=>{this.locateAndfetch()},2e4)},methods:{locateAndfetch:async function(){const t=await w(),e=void 0===this.favoriteStops?await h(t.lat,t.lon):await u(this.favoriteStops,t.lat,t.lon);this.$emit("nearest-stops",e)}}},b=S,y=n("2877"),_=Object(y["a"])(b,c,l,!1,null,null,null),x=_.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.departures.length<1?n("div",{staticClass:"no-departures"},[t._v("—")]):t._e(),t.departures.length>0?n("article",{staticClass:"secondary header"},[n("div"),n("div",[n("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("MIN")]),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}]},[t._v("KLO")])]),n("div",[t._v("LINJA")]),n("div",[t._v("MÄÄRÄNPÄÄ")])]):t._e(),t._l(t.departures,(function(e){return n("article",{key:e.scheduledArrival,staticClass:"departure"},[n("div",{class:{"realtime-sign":e.realtime&&t.realtime}}),n("div",{staticClass:"time"},[n("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}],attrs:{"data-hook":"time-schedule"}},[t._v(t._s(t.timeToString(t.toHourAndMinutes(e.scheduledDeparture))))]),n("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("\n        "+t._s(t.toRealtime(new Date,e.scheduledDeparture,e.departureDelay,e.realtime,e.serviceDay))+"\n      ")])]),n("div",{staticClass:"line"},[t._v(t._s(e.trip.routeShortName))]),n("div",[t._v(t._s(e.headsign))]),n("div")])}))],2)},$=[],M={name:"Schedule",props:{departures:Array,realtime:Boolean},methods:{dayNumber(t){return new Date(1e3*t).getDate()},toHourAndMinutes:function(t){const e=Math.floor(t/3600),n=60*e*60,o=Math.floor((t-n)/60);return{hours:e,minutes:o}},timeToString:function(t){const e=t.hours>9?`${t.hours}`:`0${t.hours}`,n=t.minutes>9?`${t.minutes}`:`0${t.minutes}`;return`${e}.${n}`},toRealtime:function(t,e,n){const o=this.getSecondsSinceMidnight(t),a=Math.floor((e-o)/60);if(a>59||a<-30)return this.timeToString(this.toHourAndMinutes(e));const s=a>0?a:0;let i=a+Math.ceil(n/60);return i=i>0?i:0,i===s?s:s<i?`${s}-${i}*`:`${i}*-${s}`},getSecondsSinceMidnight:function(t){let e=new Date(t);const n=t-e.setHours(0,0,0,0);return n/1e3}}},C=M,k=(n("f9b8"),Object(y["a"])(C,O,$,!1,null,"07345256",null)),N=k.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("div",[n("span",{staticClass:"name"},[t._v(t._s(t.stop.name))]),n("wbr"),n("span",{staticClass:"secondary"},[n("span",{staticClass:"code"},[t._v(t._s(t.stop.code))]),t._v("\n      "+t._s(t.stop.desc)+"\n    ")])]),n("div",{staticClass:"distance secondary"},[t._v(t._s(t.stop.distance)+"m")]),n("div",{staticClass:"favorite"},[n("Star",{attrs:{selected:t.favorite},on:{toggle:t.toggleFavorite}})],1)])},j=[],D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{on:{click:function(e){return t.toggle()}}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24"}},[n("path",{directives:[{name:"show",rawName:"v-show",value:!t.selected,expression:"!selected"}],attrs:{fill:"#a9a9a9",d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}}),n("path",{directives:[{name:"show",rawName:"v-show",value:t.selected,expression:"selected"}],attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}})])])},F=[],I={name:"Star",props:{selected:Boolean},mounted:function(){},methods:{toggle:function(){this.$emit("toggle",!this.selected)}},data(){return{}}},P=I,L=Object(y["a"])(P,D,F,!1,null,null,null),A=L.exports,E={name:"Stop",props:{favorite:Boolean,stop:Object},components:{Star:A},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",{stopId:this.stop.gtfsId,selected:t})}}},B=E,J=(n("d711"),Object(y["a"])(B,T,j,!1,null,"917b185e",null)),q=J.exports,z={name:"Favorite",props:{favoriteStops:Array,realtime:Boolean},components:{Data:x,Departures:N,Stop:q},data(){return{stops:[]}},methods:{isFavorite(t){return this.favoriteStops.includes(t)},populateStops(t){this.stops=t},toggleFavorite(t){this.$emit("toggle-favorite",t)}}},R=z,H=Object(y["a"])(R,i,r,!1,null,null,null),W=H.exports,K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",[n("div",{staticClass:"tab"},[n("TimeSwitch",{on:{"time-switch-clicked":function(e){return t.$emit("time-switch-clicked")}}}),n("Clock")],1),n("div",{staticClass:"tab",attrs:{selected:!t.favoriteTab},on:{click:function(e){return t.$emit("nearby")}}},[n("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})]),n("div",[t._v("lähellä")])]),n("div",{staticClass:"tab",attrs:{selected:t.favoriteTab},on:{click:function(e){return t.$emit("favorite")}}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]),n("div",[t._v("suosikit")])])])},G=[],Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v(t._s(t.time))])},U=[],V={name:"Clock",props:{stop:Object},data(){return{time:""}},mounted:function(){this.startClock()},methods:{startClock:function(){setInterval(()=>{const t=new Date;this.time=t.toLocaleTimeString("fi-FI")},1e3)}}},X=V,Y=Object(y["a"])(X,Q,U,!1,null,"11c04b07",null),Z=Y.exports,tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"onoffswitch"},[n("input",{staticClass:"onoffswitch-checkbox",attrs:{type:"checkbox",name:"onoffswitch",id:"myonoffswitch",checked:""},on:{change:function(e){return t.checkboxChanged()}}}),t._m(0)])},et=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"onoffswitch-label",attrs:{for:"myonoffswitch"}},[n("span",{staticClass:"onoffswitch-inner"}),n("span",{staticClass:"onoffswitch-switch"})])}],nt={name:"TimeSwitch",methods:{checkboxChanged(){this.$emit("time-switch-clicked")}}},ot=nt,at=(n("61e8"),Object(y["a"])(ot,tt,et,!1,null,"424ee250",null)),st=at.exports,it={name:"Navigation",props:{favoriteTab:Boolean},components:{Clock:Z,TimeSwitch:st}},rt=it,ct=(n("db9e"),Object(y["a"])(rt,K,G,!1,null,"26b07dad",null)),lt=ct.exports,ut=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Data",{on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return n("div",{key:e.gtfsId},[n("section",[n("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),n("Departures",{attrs:{departures:e.stoptimesWithoutPatterns,realtime:t.realtime}})],1)])}))],2)},dt=[],pt={name:"Nearest",props:{favoriteStops:Array,realtime:Boolean},components:{Data:x,Departures:N,Stop:q},data(){return{stops:[]}},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",t)},isFavorite(t){return this.favoriteStops.includes(t)},populateStops:function(t){this.stops=t}}},ft=pt,vt=Object(y["a"])(ft,ut,dt,!1,null,null,null),ht=vt.exports,mt={name:"app",components:{Favorite:W,Navigation:lt,Nearest:ht},data(){return{realtime:!0,favoriteStops:[],favoriteTab:!1}},mounted:function(){const t=window.localStorage.getItem("favoriteStops");null===t?window.localStorage.setItem("favoriteStops",JSON.stringify([])):this.favoriteStops=JSON.parse(t)},methods:{toggleFavorite:function(t){!0===t.selected?this.addFavorite(t.stopId):this.removeFavorite(t.stopId)},addFavorite:function(t){this.favoriteStops.push(t),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},removeFavorite:function(t){this.favoriteStops=this.favoriteStops.filter(e=>{return e!==t}),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},showRealtime:function(){this.realtime=!this.realtime}}},gt=mt,wt=Object(y["a"])(gt,a,s,!1,null,null,null),St=wt.exports,bt=n("9483");Object(bt["a"])("/stops/dist/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(St)}}).$mount("#app")},"5c46":function(t,e,n){},"61e8":function(t,e,n){"use strict";var o=n("55d3"),a=n.n(o);a.a},a376:function(t,e,n){},d6cc:function(t,e,n){},d711:function(t,e,n){"use strict";var o=n("a376"),a=n.n(o);a.a},db9e:function(t,e,n){"use strict";var o=n("5c46"),a=n.n(o);a.a},f9b8:function(t,e,n){"use strict";var o=n("d6cc"),a=n.n(o);a.a}});
//# sourceMappingURL=app.d2cd9872.js.map