(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=n(14),i=n(2),l=function(e){var t=e.person;e.toggleImportance;console.log("person!!!!!!",t);t.important;return r.a.createElement("li",{className:"person"},"Name: ",t.name,r.a.createElement("br",null),"Number: ",t.number)},m=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},s=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},f=n(3),p=n.n(f),d=function(){var e=p.a.get("/api/persons"),t={id:1e4,content:"This person is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return e.then(function(e){return e.data.concat(t)})},v=function(e){return p.a.post("/api/persons",e).then(function(e){return e.data})},b=function(e,t){return p.a.put("".concat("/api/persons","/").concat(e),t).then(function(e){return e.data})},E=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),f=Object(i.a)(c,2),p=f[0],E=f[1],g=Object(a.useState)(!0),h=Object(i.a)(g,2),O=h[0],j=h[1],w=Object(a.useState)(null),S=Object(i.a)(w,2),y=S[0],N=S[1];Object(a.useEffect)(function(){d().then(function(e){return o(e)})},[]);var k=O?n:n.filter(function(e){return e.important});console.log("newPerson!!!!!!!!!!!!!!!!!!!",p);var I=function(e){var t=n.find(function(t){return t.id===e}),a=Object(u.a)({},t,{important:!t.important});b(e,a).then(function(t){o(n.map(function(n){return n.id!==e?n:t}))}).catch(function(a){N("Note '".concat(t.content,"' was already removed from server")),setTimeout(function(){N(null)},5e3),o(n.filter(function(t){return t.id!==e}))})};return r.a.createElement("div",null,r.a.createElement("h1",null,"Persons"),r.a.createElement(m,{message:y}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),r.a.createElement("ul",null,k.map(function(e){return r.a.createElement(l,{key:e.id,person:e,toggleImportance:function(){return I(e.id)}})})),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:p,date:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};v(t).then(function(e){o(n.concat(e)),E("")})}},r.a.createElement("input",{value:p,onChange:function(e){E(e.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(s,null))};n(38);c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.cfd468c8.chunk.js.map