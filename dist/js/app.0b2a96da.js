(function(t){function e(e){for(var n,a,s=e[0],l=e[1],c=e[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],n=!0,s=1;s<o.length;s++){var l=o[s];0!==r[l]&&(n=!1)}n&&(i.splice(e--,1),t=a(a.s=o[0]))}return t}var n={},r={app:0},i=[];function a(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/stops/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"151b":function(t,e,o){},"2eb9":function(t,e,o){"use strict";var n=o("151b"),r=o.n(n);r.a},"44ec":function(t,e,o){"use strict";var n=o("ba16"),r=o.n(n);r.a},"56d7":function(t,e,o){"use strict";o.r(e);var n=o("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[t.favoriteTab?t._e():o("Nearest",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}),t.favoriteTab?o("Favorite",{attrs:{favoriteStops:t.favoriteStops,realtime:t.realtime},on:{"toggle-favorite":t.toggleFavorite}}):t._e(),o("Navigation",{attrs:{favoriteTab:t.favoriteTab},on:{"time-switch-clicked":t.showRealtime,nearby:function(e){t.favoriteTab=!1},favorite:function(e){t.favoriteTab=!0}}})],1)},i=[],a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("Data",{attrs:{favoriteStops:t.favoriteStops},on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return o("div",[o("section",[o("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.node.place.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),o("Departures",{attrs:{departures:e.node.place.stoptimesWithoutPatterns,timeNow:t.timeNow,realtime:t.realtime}})],1)])}))],2)},s=[];function l(){return new Promise((t,e)=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>{t({lat:e.coords.latitude,lon:e.coords.longitude})})})}var c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div")},u=[];async function d(t,e,o){const n=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:p(t,e,o)})});return await n.json()}function p(t,e,o){const n=JSON.stringify(o);return`\n    {\n        nearest(lat: ${t}, lon: ${e}, maxResults: 20, maxDistance: 2000, filterByPlaceTypes: [STOP] ${void 0===o?"":`filterByIds:{stops: ${n}}`}) {\n          edges {\n            node {\n              distance\n              place {\n                id\n                lat\n                lon\n                ... on Stop {\n                  name\n                  gtfsId\n                  code\n                  desc\n                  locationType\n                  vehicleType\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    departureDelay\n                    realtime\n                    realtimeState\n                    headsign\n                    serviceDay\n                    trip {\n                      routeShortName\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n    }`}var v={name:"Data",props:{favoriteStops:Array},mounted:async function(){document.addEventListener("visibilitychange",async()=>{"visible"===document.visibilityState&&this.locateAndfetch()}),this.locateAndfetch(),setInterval(async()=>{this.locateAndfetch()},2e4)},methods:{locateAndfetch:async function(){const t=await l(),e=await d(t.lat,t.lon,this.favoriteStops),o=e.data.nearest.edges;this.$emit("nearest-stops",o)}}},f=v,h=o("2877"),m=Object(h["a"])(f,c,u,!1,null,null,null),g=m.exports,w=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("article",{staticClass:"secondary"},[o("div"),o("div",[o("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("MIN")]),o("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}]},[t._v("KLO")])]),o("div",[t._v("LINJA")]),o("div",[t._v("MÄÄRÄNPÄÄ")])]),t._l(t.departures,(function(e){return o("article",{staticClass:"departure"},[o("div",{class:{"realtime-sign":e.realtime&&t.realtime}}),o("div",[o("span",{directives:[{name:"show",rawName:"v-show",value:!t.realtime,expression:"!realtime"}],attrs:{"data-hook":"time-schedule"}},[t._v(t._s(t.timeToString(t.toHourAndMinutes(e.scheduledDeparture))))]),o("span",{directives:[{name:"show",rawName:"v-show",value:t.realtime,expression:"realtime"}]},[t._v("\n        "+t._s(t.toRealtime(t.timeNow,e.scheduledDeparture,e.departureDelay,e.realtime,e.serviceDay))+"\n      ")])]),o("div",[t._v(t._s(e.trip.routeShortName))]),o("div",[t._v(t._s(e.headsign))]),o("div")])}))],2)},b=[],S={name:"Schedule",props:{departures:Array,realtime:Boolean,timeNow:Date},methods:{dayNumber(t){return new Date(1e3*t).getDate()},toHourAndMinutes:function(t){const e=Math.floor(t/3600),o=60*e*60,n=Math.floor((t-o)/60);return{hours:e,minutes:n}},timeToString:function(t){const e=t.hours>9?`${t.hours}`:`0${t.hours}`,o=t.minutes>9?`${t.minutes}`:`0${t.minutes}`;return`${e}.${o}`},toRealtime:function(t,e,o,n,r){this.dayNumber(r),t.getDate();const i=this.getSecondsSinceMidnight(t),a=Math.floor((e-i)/60);if(a>59||a<-30)return this.timeToString(this.toHourAndMinutes(e));const s=a>0?a:0;let l=a+Math.ceil(o/60);return l=l>0?l:0,l===s?s:s<l?`${s}-${l}*`:`${l}*-${s}`},getSecondsSinceMidnight:function(t){let e=new Date(t);const o=t-e.setHours(0,0,0,0);return o/1e3}}},y=S,_=(o("8348"),Object(h["a"])(y,w,b,!1,null,"1c0d9dc9",null)),N=_.exports,x=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",[o("h2",[t._v("\n    "+t._s(t.stop.node.place.name)+"\n    "),o("span",{staticClass:"secondary"},[t._v("("+t._s(t.stop.node.place.code)+") "+t._s(t.stop.node.place.desc))])]),o("div",[t._v(t._s(t.stop.node.distance)+"m")]),o("div",[o("Star",{attrs:{selected:t.favorite},on:{toggle:t.toggleFavorite}})],1)])},$=[],O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a",{on:{click:function(e){return t.toggle()}}},[o("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24"}},[o("path",{directives:[{name:"show",rawName:"v-show",value:!t.selected,expression:"!selected"}],attrs:{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}}),o("path",{directives:[{name:"show",rawName:"v-show",value:t.selected,expression:"selected"}],attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}})])])},T=[],j={name:"Star",props:{selected:Boolean},mounted:function(){},methods:{toggle:function(){this.$emit("toggle",!this.selected)}},data(){return{}}},k=j,D=Object(h["a"])(k,O,T,!1,null,null,null),F=D.exports,M={name:"Stop",props:{favorite:Boolean,stop:Object},components:{Star:F},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",{stopId:this.stop.node.place.gtfsId,selected:t})}}},C=M,I=(o("44ec"),Object(h["a"])(C,x,$,!1,null,"51624350",null)),L=I.exports,P={name:"Favorite",props:{favoriteStops:Array,realtime:Boolean},components:{Data:g,Departures:N,Stop:L},data(){return{stops:[],timeNow:new Date}},methods:{isFavorite(t){return this.favoriteStops.includes(t)},populateStops(t){this.stops=t},toggleFavorite(t){this.$emit("toggle-favorite",t)}}},A=P,B=Object(h["a"])(A,a,s,!1,null,null,null),E=B.exports,J=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("nav",[o("div",{staticClass:"tab"},[o("TimeSwitch",{on:{"time-switch-clicked":function(e){return t.$emit("time-switch-clicked")}}}),o("Clock")],1),o("div",{staticClass:"tab",attrs:{selected:!t.favoriteTab},on:{click:function(e){return t.$emit("nearby")}}},[o("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[o("path",{attrs:{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}})]),o("div",[t._v("lähellä")])]),o("div",{staticClass:"tab",attrs:{selected:t.favoriteTab},on:{click:function(e){return t.$emit("favorite")}}},[o("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"}},[o("path",{attrs:{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}}),o("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]),o("div",[t._v("suosikit")])])])},z=[],R=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t._v(t._s(t.time))])},H=[],q={name:"Clock",props:{stop:Object},data(){return{time:""}},mounted:function(){this.startClock()},methods:{startClock:function(){setInterval(()=>{const t=new Date;this.time=t.toLocaleTimeString("fi-FI")},1e3)}}},W=q,K=Object(h["a"])(W,R,H,!1,null,"541d20f8",null),G=K.exports,Q=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("label",{staticClass:"switch"},[o("input",{attrs:{type:"checkbox"},on:{change:function(e){return t.checkboxChanged()}}})])},U=[],V={name:"TimeSwitch",methods:{checkboxChanged(){this.$emit("time-switch-clicked")}}},X=V,Y=(o("d3ab"),Object(h["a"])(X,Q,U,!1,null,"4b319a75",null)),Z=Y.exports,tt={name:"Navigation",props:{favoriteTab:Boolean},components:{Clock:G,TimeSwitch:Z}},et=tt,ot=(o("2eb9"),Object(h["a"])(et,J,z,!1,null,"0bf1e658",null)),nt=ot.exports,rt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("Data",{on:{"nearest-stops":t.populateStops}}),t._l(t.stops,(function(e){return o("div",[o("section",[o("Stop",{attrs:{stop:e,favorite:t.isFavorite(e.node.place.gtfsId)},on:{"toggle-favorite":t.toggleFavorite}}),o("Departures",{attrs:{departures:e.node.place.stoptimesWithoutPatterns,timeNow:t.timeNow,realtime:t.realtime}})],1)])}))],2)},it=[],at={name:"Nearest",props:{favoriteStops:Array,realtime:Boolean},components:{Data:g,Departures:N,Stop:L},data(){return{stops:[],timeNow:new Date}},methods:{toggleFavorite:function(t){this.$emit("toggle-favorite",t)},isFavorite(t){return this.favoriteStops.includes(t)},populateStops:function(t){this.stops=t}}},st=at,lt=Object(h["a"])(st,rt,it,!1,null,null,null),ct=lt.exports,ut={name:"app",components:{Favorite:E,Navigation:nt,Nearest:ct},data(){return{realtime:!1,favoriteStops:[],favoriteTab:!1}},mounted:function(){const t=window.localStorage.getItem("favoriteStops");null===t?window.localStorage.setItem("favoriteStops",JSON.stringify([])):this.favoriteStops=JSON.parse(t)},methods:{toggleFavorite:function(t){!0===t.selected?this.addFavorite(t.stopId):this.removeFavorite(t.stopId)},addFavorite:function(t){this.favoriteStops.push(t),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},removeFavorite:function(t){this.favoriteStops=this.favoriteStops.filter(e=>{return e!==t}),window.localStorage.setItem("favoriteStops",JSON.stringify(this.favoriteStops))},showRealtime:function(){this.realtime=!this.realtime}}},dt=ut,pt=Object(h["a"])(dt,r,i,!1,null,null,null),vt=pt.exports,ft=o("9483");Object(ft["a"])("/stops/dist/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(vt)}}).$mount("#app")},"5cbd":function(t,e,o){},8348:function(t,e,o){"use strict";var n=o("5cbd"),r=o.n(n);r.a},"99b6":function(t,e,o){},ba16:function(t,e,o){},d3ab:function(t,e,o){"use strict";var n=o("99b6"),r=o.n(n);r.a}});
//# sourceMappingURL=app.0b2a96da.js.map