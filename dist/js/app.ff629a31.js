(function(e){function t(t){for(var r,a,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/stops/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0e3a":function(e,t,n){"use strict";var r=n("71a7"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Clock"),n("TimeSwitch",{on:{"time-switch-clicked":e.showRealtime}}),n("Schedule",{attrs:{realtime:e.realtime}})],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(e._s(e.time))])},s=[],l={name:"Clock",props:{stop:Object},data(){return{time:""}},mounted:function(){this.startClock()},methods:{startClock:function(){setInterval(()=>{const e=new Date;this.time=e.toLocaleTimeString("fi-FI")},1e3)}}},c=l,u=(n("c470"),n("2877")),d=Object(u["a"])(c,a,s,!1,null,"e9265552",null),p=d.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"switch"},[e._v("\n  aikataulu\n  "),n("input",{attrs:{type:"checkbox"},on:{change:function(t){return e.checkboxChanged()}}}),e._v("\n  reaaliaikainen\n")])},f=[],m={name:"TimeSwitch",methods:{checkboxChanged(){this.$emit("time-switch-clicked",.1)}}},v=m,g=(n("0e3a"),Object(u["a"])(v,h,f,!1,null,"62d38df7",null)),w=g.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.stops,(function(t){return n("div",[n("section",[n("Stop",{attrs:{stop:t}}),n("Departures",{attrs:{departures:t.node.place.stoptimesWithoutPatterns,timeNow:e.timeNow,realtime:e.realtime}})],1)])})),0)},b=[];function y(){return new Promise((e,t)=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(t=>{e({lat:t.coords.latitude,lon:t.coords.longitude})})})}var S={name:"Data",fetchSchedule:O};function $(e,t,n){return`\n    {\n        nearest(lat: ${e}, lon: ${t}, maxResults: 8, maxDistance: 2000, filterByPlaceTypes: [STOP] ${void 0===n?"":`filterByIds:{stops: ${n}}`}) {\n          edges {\n            node {\n              distance\n              place {\n                id\n                lat\n                lon\n                ... on Stop {\n                  name\n                  gtfsId\n                  code\n                  desc\n                  locationType\n                  vehicleType\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    departureDelay\n                    realtime\n                    realtimeState\n                    headsign\n                    serviceDay\n                    trip {\n                      routeShortName\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n    }`}async function O(e,t,n){const r=await window.fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:$(e,t,n)})});return await r.json()}var j,k,x=S,D=Object(u["a"])(x,j,k,!1,null,null,null),N=D.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._m(0),e._l(e.departures,(function(t){return n("article",[n("div",{class:{"realtime-sign":t.realtime&&e.realtime}}),n("div",[n("span",{directives:[{name:"show",rawName:"v-show",value:!e.realtime,expression:"!realtime"}],attrs:{"data-hook":"time-schedule"}},[e._v(e._s(e.timeToString(e.toHourAndMinutes(t.scheduledDeparture))))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.realtime,expression:"realtime"}]},[e._v("\n        "+e._s(e.toRealtime(e.timeNow,t.scheduledDeparture,t.departureDelay,t.realtime,t.serviceDay))+"\n      ")])]),n("div",[e._v(e._s(t.trip.routeShortName))]),n("div",[e._v(e._s(t.headsign))]),n("div")])}))],2)},T=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("article",{staticClass:"secondary"},[n("div"),n("div",[e._v("MIN")]),n("div",[e._v("LINJA")]),n("div",[e._v("MÄÄRÄNPÄÄ")])])}],P={name:"Schedule",props:{departures:Array,realtime:Boolean,timeNow:Date},methods:{dayNumber(e){return new Date(1e3*e).getDate()},toHourAndMinutes:function(e){const t=Math.floor(e/3600),n=60*t*60,r=Math.floor((e-n)/60);return{hours:t,minutes:r}},timeToString:function(e){const t=e.hours>9?`${e.hours}`:`0${e.hours}`,n=e.minutes>9?`${e.minutes}`:`0${e.minutes}`;return`${t}.${n}`},toRealtime:function(e,t,n,r,o){this.dayNumber(o),e.getDate();const i=this.getSecondsSinceMidnight(e),a=Math.floor((t-i)/60);if(a>59||a<-30)return this.timeToString(this.toHourAndMinutes(t));if(t<30||t-n<30)return"&#126;0";if(Math.abs(n)<30)return`${a}`;if(n>0)return`${a}-${a+Math.ceil(n/60)}*`;if(n<0)return`${a+Math.ceil(n/60)}*-${a}`;const s=Math.floor((t-n)/60);return`${s} ${t}${n}`},getSecondsSinceMidnight:function(e){let t=new Date(e);const n=e-t.setHours(0,0,0,0);return n/1e3}}},C=P,A=Object(u["a"])(C,M,T,!1,null,null,null),E=A.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("h2",[e._v("\n    "+e._s(e.stop.node.place.name)+"\n    "),n("span",{staticClass:"secondary"},[e._v("\n      ("+e._s(e.stop.node.place.code)+") "+e._s(e.stop.node.place.desc)+"\n    ")])]),n("div",[e._v(e._s(e.stop.node.distance)+"m")]),n("div")])},R=[],B={name:"Stop",props:{stop:Object}},H=B,J=Object(u["a"])(H,I,R,!1,null,null,null),q=J.exports,F={name:"Schedule",props:{realtime:Boolean,stop:Object},components:{Data:N,Departures:E,Stop:q},data(){return{stops:[],timeNow:new Date}},async mounted(){const e=await y();this.fetchSchedule(e.lat,e.lon),setInterval(async()=>{const e=await y();console.log("updated"),this.fetchSchedule(e.lat,e.lon)},2e4)},methods:{fetchSchedule:async function(e,t){const n=await N.fetchSchedule(e,t);this.timeNow=new Date,this.stops=n.data.nearest.edges}}},L=F,W=Object(u["a"])(L,_,b,!1,null,null,null),z=W.exports,G={name:"app",components:{Clock:p,Schedule:z,TimeSwitch:w},data(){return{realtime:!1}},methods:{showRealtime:function(){this.realtime=!this.realtime}}},K=G,Q=Object(u["a"])(K,o,i,!1,null,null,null),U=Q.exports,V=n("9483");Object(V["a"])("/stops/dist/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(U)}}).$mount("#app")},"71a7":function(e,t,n){},"82f0":function(e,t,n){},c470:function(e,t,n){"use strict";var r=n("82f0"),o=n.n(r);o.a}});
//# sourceMappingURL=app.ff629a31.js.map