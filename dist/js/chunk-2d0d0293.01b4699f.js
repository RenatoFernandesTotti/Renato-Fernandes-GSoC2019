(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0293"],{6795:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("h1",{staticClass:"font-weight-light display-4"},[t._v("\n      Sensor Name: "+t._s(t.sensor.name)+"\n      "),e("br")]),e("h3",{staticClass:"font-weight-light display-4"},[t._v("Registered on: "+t._s(t.sensor.register))]),e("h3",{staticClass:"font-weight-light display-4"},[t._v("Description: "+t._s(t.sensor.description))]),e("v-divider"),e("br"),e("br"),e("br"),t.hasRead?e("v-flex",{attrs:{xs12:""}},[e("h3",{staticClass:"font-weight-light display-4"},[t._v("Min reading:"+t._s(t.min))]),e("h3",{staticClass:"font-weight-light display-4"},[t._v("Max reading:"+t._s(t.max))]),e("h3",{staticClass:"font-weight-light display-4"},[t._v("Average: "+t._s(t.avg))])]):e("v-flex",{attrs:{xs12:""}},[e("h3",{staticClass:"font-weight-light display-4"},[t._v("The sensor has no reading for the time")])])],1),e("v-flex",{attrs:{xs12:""}},[e("lineChart",{attrs:{id:"chart","chart-data":t.datacol}})],1)],1)},s=[],l=(e("ac6a"),e("7f7f"),e("4a88")),o=e("6b40"),i={data:function(){return{sensor:null,datacol:{},data:null,labels:null,max:null,min:null,avg:null,hasRead:!1}},props:{name:String},methods:{getReading:function(t){var a=this,e="/readSensor?name="+this.$options.propsData.name;"setup"!=t&&(e+="&datespan="+t),e=encodeURI(e),this.axios.get(e).then(function(e){var n=[],s=[],l=e.data.result,o=0;if(0==l.length?a.hasRead=!1:a.hasRead=!0,"setup"==t){l.reverse();for(var i=l.length;o<10&&0!=i;i--,o++){var r=l[i-1];n.push(parseFloat(r.value));var h=new Date(r.date);s.push(h.getDate()+"/"+(h.getMonth()+1)+"/"+h.getFullYear())}}else l.forEach(function(t){n.push(parseFloat(t.value));var a=new Date(t.date);s.push(a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear())});a.data=n,a.labels=s,a.min=Math.min.apply(Math,n)+" on "+s[n.indexOf(Math.min.apply(Math,n))],a.max=Math.max.apply(Math,n)+" on "+s[n.indexOf(Math.max.apply(Math,n))];var d=n.reduce(function(t,a){return t+a}),g=d/n.length;a.avg=g}).finally(function(){a.axios.get("/getSensorInfo?name="+a.$options.propsData.name).then(function(t){var e=t.data.result,n=new Date(e.register),s=n.getDate()+"/"+(n.getMonth()+1)+"/"+n.getFullYear();e.register=s,a.sensor=e;var l=Math.round,o=Math.random,i=255,r="rgba("+l(o()*i)+","+l(o()*i)+","+l(o()*i)+","+o().toFixed(1)+")";a.datacol={labels:a.labels,datasets:[{label:a.sensor.unit,backgroundColor:r,data:a.data}]},a.axios.post("http://192.168.0.155:8888/movelg",{lat:e.y,lng:e.x}).then(function(){console.log("ue"),console.log(window.location.pathname),a.axios.post("http://192.168.0.155:8888/opensite",{url:"http://192.168.0.187:8888"+window.location.pathname}).then(function(){console.log("finally")})}).catch(function(t){console.log(t)})})})}},mounted:function(){this.getReading("setup")},components:{lineChart:l["a"],gmap:o["a"]}},r=i,h=e("2877"),d=e("6544"),g=e.n(d),p=e("ce7e"),u=e("0e8f"),c=e("a722"),f=Object(h["a"])(r,n,s,!1,null,null,null);a["default"]=f.exports;g()(f,{VDivider:p["a"],VFlex:u["a"],VLayout:c["a"]})}}]);
//# sourceMappingURL=chunk-2d0d0293.01b4699f.js.map