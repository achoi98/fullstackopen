(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),o=t.n(c),r=t(6),a=t(3),u=t(2),i=t(4),l=t.n(i),s="/api/persons",d={getAll:function(){return l.a.get(s).then((function(e){return e.data}))},create:function(e){return l.a.post(s,e).then((function(e){return e.data}))},deleteP:function(e){return l.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.status}))},changeN:function(e){console.log("newNumber:",e);var n="http://localhost:3001/api/persons/".concat(e.id);return console.log("url:",n),l.a.put(n,e).then((function(e){return e.data}))}},h=t(0),b=function(e){return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{children:["filter shown with ",Object(h.jsx)("input",{value:e.value,onChange:e.handle})]})})},j=function(e){return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:e.name,onChange:e.handleNameChange})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{value:e.number,onChange:e.handleNumberChange})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{onClick:e.handleSubmit,children:"add"})})]})})},f=function(e){return Object(h.jsx)("div",{children:Object(h.jsxs)("p",{children:[e.name," : ",e.number," ",Object(h.jsx)("button",{id:e.id,onClick:e.handleDelete,children:"delete"})]})})},m=function(e){var n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filterText.toLowerCase())})).map((function(n){return Object(h.jsx)(f,{name:n.name,number:n.number,id:n.id,handleDelete:e.handle},n.name)}));return Object(h.jsx)("div",{children:n})},O=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"error",children:n})},g=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],o=Object(u.useState)(""),i=Object(a.a)(o,2),l=i[0],s=i[1],f=Object(u.useState)(""),g=Object(a.a)(f,2),v=g[0],x=g[1],p=Object(u.useState)(""),w=Object(a.a)(p,2),C=w[0],k=w[1],N=Object(u.useState)(null),S=Object(a.a)(N,2),A=S[0],D=S[1];Object(u.useEffect)((function(){d.getAll().then((function(e){c(e)}))}),[]);var T=Object(h.jsx)("div",{children:Object(h.jsx)("button",{onClick:function(e){console.log(e.target.id)},id:"2",children:"test"})});return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Phonebook"}),T,Object(h.jsx)(O,{message:A}),Object(h.jsx)(b,{value:C,handle:function(e){k(e.target.value)}}),Object(h.jsx)("h2",{children:"add a new person"}),Object(h.jsx)(j,{handleSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name.toLowerCase()===l.toLowerCase()}));if(void 0!==n){if(console.log("old entry:",n),window.confirm("".concat(l," is already in the phonebook, update the number?"))){var o=Object(r.a)(Object(r.a)({},n),{},{number:v});d.changeN(o).then((function(e){return d.getAll().then((function(e){return c(e)}))})),D("Number of '".concat(o.name,"' changed to ").concat(o.number)),setTimeout((function(){D(null)}),5e3)}}else{var a={name:l,number:v};d.create(a).then((function(e){c(t.concat(e)),s(""),x(""),D("Added ".concat(e.name)),setTimeout((function(){D(null)}),5e3)}))}},name:l,number:v,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){x(e.target.value)}}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(m,{persons:t,filterText:C,handle:function(e){var n=e.target.id;console.log("targetID:",n),console.log("persons",t);var o=t.find((function(e){return e.id===n}));console.log("targetPerson",o),window.confirm("Delete ".concat(o.name," from the phonebook?"))&&(d.deleteP(n).then((function(e){console.log("response:",e),204===e&&d.getAll().then((function(e){return c(e)}))})).catch((function(e){d.getAll().then((function(e){return c(e)})),D("".concat(o.name," has already been removed from the phonebook"))})),setTimeout((function(){D(null)}),5e3))}})]})};t(39);o.a.render(Object(h.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.11d46048.chunk.js.map