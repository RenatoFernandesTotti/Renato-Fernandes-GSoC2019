(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d0293"],{6795:function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("h1",{staticClass:"font-weight-light display-3"},[a._v("\n      Sensor Name: "+a._s(a.sensor.name)+"\n      "),e("br")]),e("h3",{staticClass:"font-weight-light display-3"},[a._v("Registered on: "+a._s(a.sensor.register))]),e("h3",{staticClass:"font-weight-light display-3"},[a._v("Description: "+a._s(a.sensor.description))]),e("v-divider"),e("br"),e("br"),e("br"),a.hasRead?e("v-flex",{attrs:{xs12:""}},[e("h3",{staticClass:"font-weight-light display-3"},[a._v("Min reading: "+a._s(a.min))]),e("h3",{staticClass:"font-weight-light display-3 red darken-4"},[a._v("Max reading: "+a._s(a.max))]),e("h3",{staticClass:"font-weight-light display-3"},[a._v("Average: "+a._s(a.avg))])]):e("v-flex",{attrs:{xs12:""}},[e("h3",{staticClass:"font-weight-light display-3 "},[a._v("The sensor has no reading for the time")])])],1),e("v-flex",{attrs:{xs12:""}},[e("lineChart",{attrs:{id:"chart","chart-data":a.datacol}})],1)],1)},n=[],r=(e("ac6a"),e("7f7f"),e("4a88")),l=e("6b40"),i={data:function(){return{sensor:null,datacol:{},data:null,labels:null,max:null,min:null,avg:null,hasRead:!1}},props:{name:String},methods:{getReading:function(a){var t=this,e="/readSensor?name="+this.$options.propsData.name;"setup"!=a&&(e+="&datespan="+a),e=encodeURI(e),this.axios.get(e).then(function(e){var s=[],n=[],r=e.data.result,l=0;if(0==r.length?t.hasRead=!1:t.hasRead=!0,"setup"==a){r.reverse();for(var i=r.length;l<10&&0!=i;i--,l++){var o=r[i-1];s.push(parseFloat(o.value));var h=new Date(o.date);n.push(h.getDate()+"/"+(h.getMonth()+1)+"/"+h.getFullYear())}}else r.forEach(function(a){s.push(parseFloat(a.value));var t=new Date(a.date);n.push(t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear())});t.data=s,t.labels=n,t.min=Math.min.apply(Math,s)+" on "+n[s.indexOf(Math.min.apply(Math,s))],t.max=Math.max.apply(Math,s)+" on "+n[s.indexOf(Math.max.apply(Math,s))];var d=s.reduce(function(a,t){return a+t}),g=d/s.length;t.avg=g}).finally(function(){t.axios.get("/getSensorInfo?name="+t.$options.propsData.name).then(function(a){var e=a.data.result,s=new Date(e.register),n=s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear();e.register=n,t.sensor=e;var r=Math.round,l=Math.random,i=255,o="rgba("+r(l()*i)+","+r(l()*i)+","+r(l()*i)+","+l().toFixed(1)+")";t.datacol={labels:t.labels,datasets:[{label:t.sensor.unit,backgroundColor:o,data:t.data}]}})})}},mounted:function(){this.getReading("setup")},components:{lineChart:r["a"],gmap:l["a"]}},o=i,h=e("2877"),d=e("6544"),g=e.n(d),u=e("ce7e"),p=e("0e8f"),c=e("a722"),f=Object(h["a"])(o,s,n,!1,null,null,null);t["default"]=f.exports;g()(f,{VDivider:u["a"],VFlex:p["a"],VLayout:c["a"]})}}]);
//# sourceMappingURL=chunk-2d0d0293.28f74288.js.map