(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5566:function(e,a,t){e.exports=t(6146)},5571:function(e,a,t){},6146:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(39),r=t.n(l);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=t(170),i=t(171),c=t(174),u=t(172),m=t(175),d=t(292),p=t(10),h=t(49),g=t(125),f=(t(5571),t(173));var E=function(e,a){var t=[],n=[];return f.transpose(a).forEach(function(a,s){n.push(a.slice(0,-1)),t.push(e[s]-a[a.length-1])}),f.lusolve(n,t)},v=t(8),b=t.n(v),C=t(293),y=function(e){function a(e){var t;Object(o.a)(this,a),(t=Object(c.a)(this,Object(u.a)(a).call(this,e))).classes=e.classes,t.media={water:{ligand:{header:["Your ligand(s)","Reference A","Reference B","Reference C","Reference D","Reference E"],weights:[]},metal:{header:["Your metallic cofactor(s)","Reference A","Reference B","Reference C","Reference D","Reference E"],weights:[]}},vacuum:{ligand:{header:["Your ligand(s)",["AuPH",s.a.createElement("sub",null,"3"),s.a.createElement("sup",null,"+")],["Cu(NH",s.a.createElement("sub",null,"3"),")",s.a.createElement("sub",null,"3"),s.a.createElement("sup",null,"2+")],["OsO",s.a.createElement("sub",null,"3"),s.a.createElement("sup",null,"2+")],["PtF",s.a.createElement("sub",null,"5"),s.a.createElement("sup",null,"-")],["Ru(SH)",s.a.createElement("sub",null,"4")],["TiCl",s.a.createElement("sub",null,"3")]],weights:[[-772552e-10,.0019317413,-.0017217058,.0025846033,.0072391719,.0220593816],[-.0003868597,-.0032147086,.0005639329,.0123850745,-.005229837,-.002884931],[-.0001395635,.0004412619,-.0032287924,-.0021541268,.0003919718,-.0085726989],[-383948e-10,.0036048507,.0009461012,.003000505,-.013915797,.0035188363],[-.0001392313,.0019712987,.0055579601,.0032420026,.0197389414,-.0200861539],[-.0001187452,159655e-9,.004875293,-.0130585729,-.0079242451,.008610508],[.0021848302,-.0090176047,.0253814256,-.0517956187,-.3576429801,-.2078832521]]},metal:{header:["Your metallic cofactor(s)",["Cl",s.a.createElement("sup",null,"-")],["H",s.a.createElement("sub",null,"2"),"O"],["H",s.a.createElement("sup",null,"-")],["O",s.a.createElement("sub",null,"2"),s.a.createElement("sup",null,"-")],["C",s.a.createElement("sub",null,"6"),"H",s.a.createElement("sub",null,"4"),"OMe",s.a.createElement("sup",null,"-")],["PCl",s.a.createElement("sub",null,"3")]],weights:[[.0002509238,.0038089454,.0031077329,.0039693626,-.0149363509,-.0163124692],[49156e-9,-.0070359031,.0004437931,.0125666712,.0151204168,-.0207641867],[.0001486995,-.0030741939,.0003645779,-.0070594438,-.0015272163,-.0096336878],[142973e-9,.0007487861,-.0028223532,.002815909,-.0007336813,.0049838179],[.0002210716,.0006880377,.0023786455,-.0037573136,.0170585379,.0165954339],[181149e-10,-.0034813971,.0020768228,.0022057261,-.0177574977,.0078198948],[.0046719629,-.0599381822,.0777534936,-.133184439,.3482715799,.1282810294]]}}},t._defaultMedium="vacuum",t._defaultCompoundType="ligand";var n=t.media[t._defaultMedium][t._defaultCompoundType].header.length;return t.state={medium:t._defaultMedium,compoundType:t._defaultCompoundType,rows:[Array(n).fill("")],infoDialog:!1},t}return Object(m.a)(a,e),Object(i.a)(a,[{key:"filledRows",value:function(){for(var e=[],a=0;a<this.state.rows.length;a++){for(var t=this.state.rows[a],n=!0,s=0;s<t.length;s++){var l=t[s];if(s&&!this.validateQuantity(l)||!this.validateName(l)){n=!1;break}}n&&e.push(a)}return e}},{key:"validateQuantity",value:function(e){return this.validateName(e)&&!isNaN(parseFloat(e))&&isFinite(e)}},{key:"validateName",value:function(e){return void 0!==e&&null!==e&&e.length>0}},{key:"handleAddRow",value:function(){var e=this.state.rows.slice();e.push(Array(this.media[this.state.medium][this.state.compoundType].header.length).fill("")),this.setState({rows:e})}},{key:"handleRemoveRow",value:function(e){var a=this.state.rows,t=a.slice(0,e).concat(a.slice(e+1));this.setState({rows:t})}},{key:"handleMediumChange",value:function(e){var a=[Array(this.media[e][this.state.compoundType].header.length).fill("")];this.setState({medium:e,rows:a})}},{key:"handleCompoundTypeChange",value:function(e){var a=[Array(this.media[this.state.medium][e].header.length).fill("")];this.setState({compoundType:e,rows:a})}},{key:"handleFieldInput",value:function(e){var a=e.target,t=this.state.rows.slice();t[a.dataset.x][a.dataset.y]=a.value,this.setState({rows:t})}},{key:"handleInfoDialog",value:function(e){this.setState({infoDialog:!this.state.infoDialog})}},{key:"render",value:function(){var e=this,a=this.classes,t=this.media[this.state.medium][this.state.compoundType].header,n=this.state.rows.slice(),l=[s.a.createElement(p.x,{key:0},s.a.createElement(p.C,{title:"Add new row"},s.a.createElement(p.o,{color:"primary",onClick:function(){return e.handleAddRow()},"aria-label":"Add row"},s.a.createElement(g.a,null))))];t.forEach(function(e,a){l.push(s.a.createElement(p.x,{key:a+1},e))});var r=[];n.forEach(function(a,t){var l=[s.a.createElement(p.x,{key:0},s.a.createElement(p.C,{title:"Delete row"},s.a.createElement(p.o,{onClick:function(){return e.handleRemoveRow(t)},"aria-label":"Delete row"},s.a.createElement(g.b,null))))];a.forEach(function(a,r){var o={"data-x":t,"data-y":r},i=r?!e.validateQuantity(n[t][r]):!e.validateName(n[t][r]),c=r?"Bond dissociation energy (in Ha)":"Compound name";l.push(s.a.createElement(p.x,{key:r+1},s.a.createElement(p.C,{title:c},s.a.createElement(p.A,{inputProps:o,onChange:function(a){return e.handleFieldInput(a)},value:a,error:i}))))}),r.push(s.a.createElement(p.z,{key:t},l))});var o,i=[];return this.filledRows().forEach(function(n,l){var r=e.state.rows[n][0],o=e.state.rows[n].slice(1),c=e.state.medium,u=e.state.compoundType,m=t.slice(1),d=e.media[c][e.state.compoundType].weights,h=E(o,d);i.push(s.a.createElement(p.m,{item:!0,xs:3,key:l},s.a.createElement(w,{classes:a,name:r,medium:c,compoundType:u,references:m,descriptors:h,style:null})))}),i.length&&(o=s.a.createElement(p.m,{container:!0,spacing:8},i)),s.a.createElement("div",{className:a.layout},s.a.createElement(p.a,{position:"static"},s.a.createElement(p.B,null,s.a.createElement(p.D,{variant:"h4",color:"inherit",className:a.grow},"BDE Matrix App"),s.a.createElement(k,{items:["Ligand","Metal"],labelName:"Compound Type",onValueChange:function(a){return e.handleCompoundTypeChange(a)},defaultValue:this.state.compoundType}),s.a.createElement(k,{items:["Vacuum","Water"],labelName:"Medium",onValueChange:function(a){return e.handleMediumChange(a)},defaultValue:this.state.medium}))),s.a.createElement(p.u,{className:a.paper},s.a.createElement(p.v,{padding:"dense",key:t.length},s.a.createElement(p.y,null,s.a.createElement(p.z,null,l)),s.a.createElement(p.w,null,r))),o,s.a.createElement(N,{classes:a,handleInfoDialog:function(a){return e.handleInfoDialog(a)}}),s.a.createElement(j,{open:this.state.infoDialog,onClose:function(a){return e.handleInfoDialog(a)}}))}}]),a}(s.a.Component);function w(e){e.classes;for(var a=e.name,t=e.references,n=e.descriptors,l=e.medium,r=e.compoundType,o=r.charAt(0).toUpperCase()+r.slice(1),i=[],c=0;c<n.length;c++){var u=s.a.createElement("code",null,n[c]),m=t[c];i.push(s.a.createElement(p.q,{key:c,disableGutters:!0},s.a.createElement(p.r,{primary:u,secondary:m})))}return s.a.createElement(p.d,null,s.a.createElement(p.g,{avatar:s.a.createElement(p.C,{title:o},s.a.createElement(p.b,{"aria-label":r},o.charAt(0))),action:s.a.createElement(p.C,{title:"Copy"},s.a.createElement(p.o,{onClick:function(){window.prompt("Press Ctrl+C (or Cmd+C)",n.join(","))}},s.a.createElement(g.c,null))),title:a}),s.a.createElement(p.f,null,s.a.createElement(p.D,{color:"textSecondary"},"Descriptors for ",l),s.a.createElement(p.p,null,i)),s.a.createElement(p.e,null))}var k=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(c.a)(this,Object(u.a)(a).call(this,e))).handleClick=function(e){t.setState({anchorEl:e.currentTarget})},t.handleClose=function(){t.setState({anchorEl:null})},t.handleValueChange=function(e){var a=e.target.innerText.toLowerCase();t.props.onValueChange(a),t.handleClose(),t.setState({selected:a})},t.props=e,t.labelName=e.labelName,t.state={anchorEl:null,selected:e.defaultValue,items:e.items},t}return Object(m.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this,a=this.state,t=a.anchorEl,n=a.items,l=[];return n.forEach(function(a,t){l.push(s.a.createElement(p.t,{key:t,onClick:function(a){return e.handleValueChange(a)}},a))}),s.a.createElement("div",null,s.a.createElement(p.c,{"aria-owns":t?"simple-menu":null,"aria-haspopup":"true",color:"inherit",onClick:this.handleClick},this.labelName,": ",this.state.selected),s.a.createElement(p.s,{id:"simple-menu",anchorEl:t,open:Boolean(t),onClose:this.handleClose},l))}}]),a}(s.a.Component);function D(e){return s.a.createElement("span",{className:e.className},"\xb7")}function N(e){return Object(C.loadCSS)("https://use.fontawesome.com/releases/v5.1.0/css/all.css",document.querySelector("#insertion-point-jss")),s.a.createElement("div",{id:"footer",className:b()(e.classes.center,e.classes.footer)},s.a.createElement(p.D,{variant:"body2"},"BDE Matrix App",s.a.createElement(D,{className:e.classes.separator}),s.a.createElement("span",{onClick:e.handleInfoDialog,className:e.classes.link},s.a.createElement(p.n,{className:b()(e.classes.icon,"fa fa-info")}),"More info"),s.a.createElement(D,{className:e.classes.separator}),s.a.createElement("a",{href:"https://github.com/jaimergp/bde",target:"_blank",rel:"noopener noreferrer",className:e.classes.link},s.a.createElement(p.n,{className:b()(e.classes.icon,"fa fa-book")}),"Citation"),s.a.createElement(D,{className:e.classes.separator}),s.a.createElement("a",{href:"https://github.com/jaimergp",target:"_blank",rel:"noopener noreferrer",className:e.classes.link},s.a.createElement(p.n,{className:b()(e.classes.icon,"fab fa-github")}),"@jaimergp")))}function j(e){return s.a.createElement(p.h,{open:e.open,onClose:e.onClose,scroll:"paper","aria-labelledby":"scroll-dialog-title"},s.a.createElement(p.l,{id:"scroll-dialog-title"},"About the Bond Dissociation Energy Matrix"),s.a.createElement(p.j,null,s.a.createElement(p.k,null,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.")),s.a.createElement(p.i,null,s.a.createElement(p.c,{onClick:e.onClose,color:"primary"},"OK")))}var A=Object(h.withStyles)(function(e){return{grow:{flexGrow:1},layout:Object(d.a)({flexGrow:1,width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(800+3*e.spacing.unit*2),{width:"80%",marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:4*e.spacing.unit,marginBottom:4*e.spacing.unit,paddingBottom:2*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center"},extendedFab:{marginLeft:e.spacing.unit},topFab:{margin:e.spacing.unit},paddedTitle:{marginBottom:2*e.spacing.unit},center:{textAlign:"center",alignItems:"center"},footer:{marginTop:4*e.spacing.unit,marginBottom:e.spacing.unit},icon:{verticalAlign:"middle",marginRight:e.spacing.unit},link:{textDecoration:"none",color:e.palette.primary.main,cursor:"pointer"},separator:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit}}})(y);r.a.render(s.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5566,2,1]]]);
//# sourceMappingURL=main.fecfb2d2.chunk.js.map