(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36ed7e88"],{"0212":function(n,e,a){"use strict";a.r(e);var t=function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("v-container",{attrs:{"grid-list-md":"","text-xs-center":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("div",{attrs:{id:"map"}})])],1)],1)},o=[],l=(a("ac6a"),a("bd86")),i=a("2ee3"),r=a.n(i);r.a.KEY="AIzaSyCX0EVea8pRdiSdso5s78fahE7VTm0YtaA",r.a.LIBRARIES=["places"];var u={data:function(){return Object(l["a"])({latLng:"",localizationName:null,markers:[],lat:-23.4698745,lng:-47.4319803,info:[]},"markers",[])},watch:{latLng:function(){}},mounted:function(){var n=this,e=this;r.a.load(function(n){var a=0,t=new n.maps.Map(document.getElementById("map"),{zoom:16,center:{lat:e.lat,lng:e.lng}});e.axios.get("/getfullsensors").then(function(o){console.log(o.data.result),o=o.data.result,o.forEach(function(o){e.markers.push(new n.maps.Marker({position:{lat:parseFloat(o.y),lng:parseFloat(o.x)},map:t,animation:n.maps.Animation.DROP})),'<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent"><p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large sandstone rock formation in the southern part of the Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) south west of the nearest large town, Alice Springs; 450&#160;km (280&#160;mi) by road. Kata Tjuta and Uluru are the two major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and Yankunytjatjara, the Aboriginal people of the area. It has many springs, waterholes, rock caves and ancient paintings. Uluru is listed as a World Heritage Site.</p><p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">https://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p></div></div>',e.info.push(new n.maps.InfoWindow({content:"Renato"})),console.log(e.markers),console.log(e.info),console.log(a),a++,"aaaaaaaaaaaaaaaaa"})}).catch(function(n){console.log(n)})}),console.log(this.markers);var a=0;this.markers.forEach(function(e){n.markers[a].addListener("click",function(){console.log(this.info[a]),this.info[a].open(map,markers[a])}),a++})}},s=u,c=(a("3fc4"),a("2877")),d=a("6544"),f=a.n(d),p=a("a523"),g=a("0e8f"),h=a("a722"),A=Object(c["a"])(s,t,o,!1,null,null,null);e["default"]=A.exports;f()(A,{VContainer:p["a"],VFlex:g["a"],VLayout:h["a"]})},"2ee3":function(n,e,a){var t,o;(function(l,i){if(null===l)throw new Error("Google-maps package can be used only in browser");t=i,o="function"===typeof t?t.call(e,a,e,n):t,void 0===o||(n.exports=o)})("undefined"!==typeof window?window:null,function(){"use strict";var n="3.31",e=null,a=null,t=!1,o=[],l=[],i=null,r={URL:"https://maps.googleapis.com/maps/api/js",KEY:null,LIBRARIES:[],CLIENT:null,CHANNEL:null,LANGUAGE:null,REGION:null};r.VERSION=n,r.WINDOW_CALLBACK_NAME="__google_maps_api_provider_initializator__",r._googleMockApiObject={},r.load=function(n){null===a?!0===t?n&&o.push(n):(t=!0,window[r.WINDOW_CALLBACK_NAME]=function(){u(n)},r.createLoader()):n&&n(a)},r.createLoader=function(){e=document.createElement("script"),e.type="text/javascript",e.src=r.createUrl(),document.body.appendChild(e)},r.isLoaded=function(){return null!==a},r.createUrl=function(){var n=r.URL;return n+="?callback="+r.WINDOW_CALLBACK_NAME,r.KEY&&(n+="&key="+r.KEY),r.LIBRARIES.length>0&&(n+="&libraries="+r.LIBRARIES.join(",")),r.CLIENT&&(n+="&client="+r.CLIENT),r.CHANNEL&&(n+="&channel="+r.CHANNEL),r.LANGUAGE&&(n+="&language="+r.LANGUAGE),r.REGION&&(n+="&region="+r.REGION),r.VERSION&&(n+="&v="+r.VERSION),n},r.release=function(u){var s=function(){r.KEY=null,r.LIBRARIES=[],r.CLIENT=null,r.CHANNEL=null,r.LANGUAGE=null,r.REGION=null,r.VERSION=n,a=null,t=!1,o=[],l=[],"undefined"!==typeof window.google&&delete window.google,"undefined"!==typeof window[r.WINDOW_CALLBACK_NAME]&&delete window[r.WINDOW_CALLBACK_NAME],null!==i&&(r.createLoader=i,i=null),null!==e&&(e.parentElement.removeChild(e),e=null),u&&u()};t?r.load(function(){s()}):s()},r.onLoad=function(n){l.push(n)},r.makeMock=function(){i=r.createLoader,r.createLoader=function(){window.google=r._googleMockApiObject,window[r.WINDOW_CALLBACK_NAME]()}};var u=function(n){var e;for(t=!1,null===a&&(a=window.google),e=0;e<l.length;e++)l[e](a);for(n&&n(a),e=0;e<o.length;e++)o[e](a);o=[]};return r})},"3fc4":function(n,e,a){"use strict";var t=a("ff1a"),o=a.n(t);o.a},ff1a:function(n,e,a){}}]);
//# sourceMappingURL=chunk-36ed7e88.e66cc833.js.map