/**
 * Created by Leon Revill on 10/12/2017.
 * Blog: blog.revillweb.com
 * Twitter: @RevillWeb
 * GitHub: github.com/RevillWeb
 */
(function() {
    'use strict';
    // global for (1) existence means `WebComponentsReady` will fire,
    // (2) WebComponents.ready == true means event has fired.
    window.WebComponents = window.WebComponents || {};
    var name = 'webcomponents-loader.js';
    // Feature detect which polyfill needs to be imported.
    var polyfills = [];
    if (!('import' in document.createElement('link'))) {
      polyfills.push('hi');
    }
    if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
      (window.ShadyDOM && window.ShadyDOM.force)) {
      polyfills.push('sd');
    }
    if (!window.customElements || window.customElements.forcePolyfill) {
      polyfills.push('ce');
    }
    // NOTE: any browser that does not have template or ES6 features
    // must load the full suite (called `lite` for legacy reasons) of polyfills.
    if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
      // Edge has broken fragment cloning which means you cannot clone template.content
      !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
      polyfills = ['lite'];
    }
  
    if (polyfills.length) {
      var script = document.querySelector('script[src*="' + name +'"]');
      var newScript = document.createElement('script');
      // Load it from the right place.
      var replacement = 'webcomponents-' + polyfills.join('-') + '.js';
      var url = script.src.replace(name, replacement);
      newScript.src = url;
      // NOTE: this is required to ensure the polyfills are loaded before
      // *native* html imports load on older Chrome versions. This *is* CSP
      // compliant since CSP rules must have allowed this script to run.
      // In all other cases, this can be async.
      if (document.readyState === 'loading' && ('import' in document.createElement('link'))) {
        document.write(newScript.outerHTML);
      } else {
        document.head.appendChild(newScript);
      }
    } else {
      // Ensure `WebComponentsReady` is fired also when there are no polyfills loaded.
      // however, we have to wait for the document to be in 'interactive' state,
      // otherwise a rAF may fire before scripts in <body>
  
      var fire = function() {
        requestAnimationFrame(function() {
          window.WebComponents.ready = true;
          document.dispatchEvent(new CustomEvent('WebComponentsReady', {bubbles: true}));
        });
      };
  
      if (document.readyState !== 'loading') {
        fire();
      } else {
        document.addEventListener('readystatechange', function wait() {
          fire();
          document.removeEventListener('readystatechange', wait);
        });
      }
    }
  })();
  /**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){/*

    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
   'use strict';var n,q="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};function ca(){ca=function(){};q.Symbol||(q.Symbol=da)}var da=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
   function ea(){ca();var a=q.Symbol.iterator;a||(a=q.Symbol.iterator=q.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&ba(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return fa(this)}});ea=function(){}}function fa(a){var b=0;return ha(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ha(a){ea();a={next:a};a[q.Symbol.iterator]=function(){return this};return a}function ia(a){ea();var b=a[Symbol.iterator];return b?b.call(a):fa(a)}
   function ka(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
   (function(a){function b(a,b){if("function"===typeof window.CustomEvent)return new CustomEvent(a,b);var c=document.createEvent("CustomEvent");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c}function c(a){if(D)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;if("function"===typeof b.closest)b=b.closest("link[rel=import]");else for(;!g(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=m(document,"link[rel=import]:not([import-dependency])"),
   c=b.length;c?p(b,function(b){return h(b,function(){0===--c&&a()})}):a()}function e(a){function b(){"loading"!==document.readyState&&document.body&&(document.removeEventListener("readystatechange",b),a())}document.addEventListener("readystatechange",b);b()}function f(a){e(function(){return d(function(){return a&&a()})})}function h(a,b){if(a.__loaded)b&&b();else if("script"===a.localName&&!a.src||"style"===a.localName&&!a.firstChild)a.__loaded=!0,b&&b();else{var c=function(d){a.removeEventListener(d.type,
   c);a.__loaded=!0;b&&b()};a.addEventListener("load",c);Pa&&"style"===a.localName||a.addEventListener("error",c)}}function g(a){return a.nodeType===Node.ELEMENT_NODE&&"link"===a.localName&&"import"===a.rel}function k(){var a=this;this.a={};this.b=0;this.c=new MutationObserver(function(b){return a.Ja(b)});this.c.observe(document.head,{childList:!0,subtree:!0});this.loadImports(document)}function l(a){p(m(a,"template"),function(a){p(m(a.content,'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'),
   function(a){var b=document.createElement("script");p(a.attributes,function(a){return b.setAttribute(a.name,a.value)});b.textContent=a.textContent;a.parentNode.replaceChild(b,a)});l(a.content)})}function m(a,b){return a.childNodes.length?a.querySelectorAll(b):aa}function p(a,b,c){var d=a?a.length:0,e=c?-1:1;for(c=c?d-1:0;c<d&&0<=c;c+=e)b(a[c],c)}var y=document.createElement("link"),D="import"in y,aa=y.querySelectorAll("*"),Qa=null;!1==="currentScript"in document&&Object.defineProperty(document,"currentScript",
   {get:function(){return Qa||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var je=/(url\()([^)]*)(\))/g,ke=/(@import[\s]+(?!url\())([^;]*)(;)/g,le=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,I={Da:function(a,b){a.href&&a.setAttribute("href",I.U(a.getAttribute("href"),b));a.src&&a.setAttribute("src",I.U(a.getAttribute("src"),b));if("style"===a.localName){var c=I.na(a.textContent,b,je);a.textContent=I.na(c,b,ke)}},na:function(a,b,c){return a.replace(c,
   function(a,c,d,e){a=d.replace(/["']/g,"");b&&(a=I.U(a,b));return c+"'"+a+"'"+e})},U:function(a,b){if(void 0===I.Z){I.Z=!1;try{var c=new URL("b","http://a");c.pathname="c%20d";I.Z="http://a/c%20d"===c.href}catch(fg){}}if(I.Z)return(new URL(a,b)).href;c=I.ua;c||(c=document.implementation.createHTMLDocument("temp"),I.ua=c,c.ga=c.createElement("base"),c.head.appendChild(c.ga),c.fa=c.createElement("a"));c.ga.href=b;c.fa.href=a;return c.fa.href||a}},Xb={async:!0,load:function(a,b,c){if(a)if(a.match(/^data:/)){a=
   a.split(",");var d=a[1];d=-1<a[0].indexOf(";base64")?atob(d):decodeURIComponent(d);b(d)}else{var e=new XMLHttpRequest;e.open("GET",a,Xb.async);e.onload=function(){var a=e.responseURL||e.getResponseHeader("Location");a&&0===a.indexOf("/")&&(a=(location.origin||location.protocol+"//"+location.host)+a);var d=e.response||e.responseText;304===e.status||0===e.status||200<=e.status&&300>e.status?b(d,a):c(d)};e.send()}else c("error: href must be specified")}},Pa=/Trident/.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent);
   k.prototype.loadImports=function(a){var b=this;a=m(a,"link[rel=import]");p(a,function(a){return b.m(a)})};k.prototype.m=function(a){var b=this,c=a.href;if(void 0!==this.a[c]){var d=this.a[c];d&&d.__loaded&&(a.__import=d,this.g(a))}else this.b++,this.a[c]="pending",Xb.load(c,function(a,d){a=b.Ka(a,d||c);b.a[c]=a;b.b--;b.loadImports(a);b.H()},function(){b.a[c]=null;b.b--;b.H()})};k.prototype.Ka=function(a,b){if(!a)return document.createDocumentFragment();Pa&&(a=a.replace(le,function(a,b,c){return-1===
   a.indexOf("type=")?b+" type=import-disable "+c:a}));var c=document.createElement("template");c.innerHTML=a;if(c.content)a=c.content,l(a);else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);if(c=a.querySelector("base"))b=I.U(c.getAttribute("href"),b),c.removeAttribute("href");c=m(a,'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
   var d=0;p(c,function(a){h(a);I.Da(a,b);a.setAttribute("import-dependency","");"script"===a.localName&&!a.src&&a.textContent&&(a.setAttribute("src","data:text/javascript;charset=utf-8,"+encodeURIComponent(a.textContent+("\n//# sourceURL="+b+(d?"-"+d:"")+".js\n"))),a.textContent="",d++)});return a};k.prototype.H=function(){var a=this;if(!this.b){this.c.disconnect();this.flatten(document);var b=!1,c=!1,d=function(){c&&b&&(a.loadImports(document),a.b||(a.c.observe(document.head,{childList:!0,subtree:!0}),
   a.Ha()))};this.Ma(function(){c=!0;d()});this.La(function(){b=!0;d()})}};k.prototype.flatten=function(a){var b=this;a=m(a,"link[rel=import]");p(a,function(a){var c=b.a[a.href];(a.__import=c)&&c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(b.a[a.href]=a,a.readyState="loading",a.__import=a,b.flatten(c),a.appendChild(c))})};k.prototype.La=function(a){function b(e){if(e<d){var f=c[e],g=document.createElement("script");f.removeAttribute("import-dependency");p(f.attributes,function(a){return g.setAttribute(a.name,
   a.value)});Qa=g;f.parentNode.replaceChild(g,f);h(g,function(){Qa=null;b(e+1)})}else a()}var c=m(document,"script[import-dependency]"),d=c.length;b(0)};k.prototype.Ma=function(a){var b=m(document,"style[import-dependency],link[rel=stylesheet][import-dependency]"),d=b.length;if(d){var e=Pa&&!!document.querySelector("link[rel=stylesheet][href][type=import-disable]");p(b,function(b){h(b,function(){b.removeAttribute("import-dependency");0===--d&&a()});if(e&&b.parentNode!==document.head){var f=document.createElement(b.localName);
   f.__appliedElement=b;f.setAttribute("type","import-placeholder");b.parentNode.insertBefore(f,b.nextSibling);for(f=c(b);f&&c(f);)f=c(f);f.parentNode!==document.head&&(f=null);document.head.insertBefore(b,f);b.removeAttribute("type")}})}else a()};k.prototype.Ha=function(){var a=this,b=m(document,"link[rel=import]");p(b,function(b){return a.g(b)},!0)};k.prototype.g=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState="complete"),a.dispatchEvent(b(a.import?"load":"error",{bubbles:!1,
   cancelable:!1,detail:void 0})))};k.prototype.Ja=function(a){var b=this;p(a,function(a){return p(a.addedNodes,function(a){a&&a.nodeType===Node.ELEMENT_NODE&&(g(a)?b.m(a):b.loadImports(a))})})};var Ra=null;if(D)y=m(document,"link[rel=import]"),p(y,function(a){a.import&&"loading"===a.import.readyState||(a.__loaded=!0)}),y=function(a){a=a.target;g(a)&&(a.__loaded=!0)},document.addEventListener("load",y,!0),document.addEventListener("error",y,!0);else{var ja=Object.getOwnPropertyDescriptor(Node.prototype,
   "baseURI");Object.defineProperty((!ja||ja.configurable?Node:Element).prototype,"baseURI",{get:function(){var a=g(this)?this:c(this);return a?a.href:ja&&ja.get?ja.get.call(this):(document.querySelector("base")||window.location).href},configurable:!0,enumerable:!0});Object.defineProperty(HTMLLinkElement.prototype,"import",{get:function(){return this.__import||null},configurable:!0,enumerable:!0});e(function(){Ra=new k})}f(function(){return document.dispatchEvent(b("HTMLImportsLoaded",{cancelable:!0,
   bubbles:!0,detail:void 0}))});a.useNative=D;a.whenReady=f;a.importForElement=c;a.loadImports=function(a){Ra&&Ra.loadImports(a)}})(window.HTMLImports=window.HTMLImports||{});/*
   
   Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
   function la(){this.ma=this.root=null;this.R=!1;this.A=this.M=this.ca=this.assignedSlot=this.assignedNodes=this.F=null;this.childNodes=this.nextSibling=this.previousSibling=this.lastChild=this.firstChild=this.parentNode=this.I=void 0;this.sa=this.ha=!1}function r(a){a.X||(a.X=new la);return a.X}function t(a){return a&&a.X};var u=window.ShadyDOM||{};u.Fa=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var ma=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");u.u=!!(ma&&ma.configurable&&ma.get);u.ka=u.force||!u.Fa;var na=navigator.userAgent.match("Trident"),oa=navigator.userAgent.match("Edge");void 0===u.qa&&(u.qa=u.u&&(na||oa));function v(a){return(a=t(a))&&void 0!==a.firstChild}function w(a){return"ShadyRoot"===a.xa}function pa(a){a=a.getRootNode();if(w(a))return a}
   var qa=Element.prototype,ra=qa.matches||qa.matchesSelector||qa.mozMatchesSelector||qa.msMatchesSelector||qa.oMatchesSelector||qa.webkitMatchesSelector;function sa(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=Object.getOwnPropertyDescriptor(b,e);f&&Object.defineProperty(a,e,f)}}function ta(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)sa(a,c[d]);return a}function ua(a,b){for(var c in b)a[c]=b[c]}
   var va=document.createTextNode(""),wa=0,xa=[];(new MutationObserver(function(){for(;xa.length;)try{xa.shift()()}catch(a){throw va.textContent=wa++,a;}})).observe(va,{characterData:!0});function ya(a){xa.push(a);va.textContent=wa++}var za=!!document.contains;function Aa(a,b){for(;b;){if(b==a)return!0;b=b.parentNode}return!1};var Ba=[],Ca;function Da(a){Ca||(Ca=!0,ya(Ea));Ba.push(a)}function Ea(){Ca=!1;for(var a=!!Ba.length;Ba.length;)Ba.shift()();return a}Ea.list=Ba;function Fa(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.P=new Set}function Ga(a){a.a||(a.a=!0,ya(function(){Ha(a)}))}function Ha(a){if(a.a){a.a=!1;var b=a.takeRecords();b.length&&a.P.forEach(function(a){a(b)})}}Fa.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
   function Ia(a,b){var c=r(a);c.F||(c.F=new Fa);c.F.P.add(b);var d=c.F;return{va:b,C:d,ya:a,takeRecords:function(){return d.takeRecords()}}}function Ja(a){var b=a&&a.C;b&&(b.P.delete(a.va),b.P.size||(r(a.ya).F=null))}
   function Ka(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})};var x={},La=Element.prototype.insertBefore,Ma=Element.prototype.replaceChild,Na=Element.prototype.removeChild,Oa=Element.prototype.setAttribute,Sa=Element.prototype.removeAttribute,Ta=Element.prototype.cloneNode,Ua=Document.prototype.importNode,Va=Element.prototype.addEventListener,Wa=Element.prototype.removeEventListener,Xa=Window.prototype.addEventListener,Ya=Window.prototype.removeEventListener,Za=Element.prototype.dispatchEvent,$a=Node.prototype.contains||HTMLElement.prototype.contains,ab=Element.prototype.querySelector,
   bb=DocumentFragment.prototype.querySelector,cb=Document.prototype.querySelector,db=Element.prototype.querySelectorAll,eb=DocumentFragment.prototype.querySelectorAll,fb=Document.prototype.querySelectorAll;x.appendChild=Element.prototype.appendChild;x.insertBefore=La;x.replaceChild=Ma;x.removeChild=Na;x.setAttribute=Oa;x.removeAttribute=Sa;x.cloneNode=Ta;x.importNode=Ua;x.addEventListener=Va;x.removeEventListener=Wa;x.Sa=Xa;x.Ta=Ya;x.dispatchEvent=Za;x.contains=$a;x.ab=ab;x.eb=bb;x.Za=cb;
   x.querySelector=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return ab.call(this,a);case Node.DOCUMENT_NODE:return cb.call(this,a);default:return bb.call(this,a)}};x.bb=db;x.fb=eb;x.$a=fb;x.querySelectorAll=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return db.call(this,a);case Node.DOCUMENT_NODE:return fb.call(this,a);default:return eb.call(this,a)}};var gb=/[&\u00A0"]/g,hb=/[&\u00A0<>]/g;function ib(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}function jb(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}var kb=jb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),lb=jb("style script xmp iframe noembed noframes plaintext noscript".split(" "));
   function mb(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,f=d.length,h;e<f&&(h=d[e]);e++){a:{var g=h;var k=a;var l=b;switch(g.nodeType){case Node.ELEMENT_NODE:for(var m=g.localName,p="<"+m,y=g.attributes,D=0;k=y[D];D++)p+=" "+k.name+'="'+k.value.replace(gb,ib)+'"';p+=">";g=kb[m]?p:p+mb(g,l)+"</"+m+">";break a;case Node.TEXT_NODE:g=g.data;g=k&&lb[k.localName]?g:g.replace(hb,ib);break a;case Node.COMMENT_NODE:g="\x3c!--"+g.data+"--\x3e";break a;default:throw window.console.error(g),
   Error("not implemented");}}c+=g}return c};var z={},A=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),B=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1);function nb(a){var b=[];A.currentNode=a;for(a=A.firstChild();a;)b.push(a),a=A.nextSibling();return b}z.parentNode=function(a){A.currentNode=a;return A.parentNode()};z.firstChild=function(a){A.currentNode=a;return A.firstChild()};z.lastChild=function(a){A.currentNode=a;return A.lastChild()};z.previousSibling=function(a){A.currentNode=a;return A.previousSibling()};
   z.nextSibling=function(a){A.currentNode=a;return A.nextSibling()};z.childNodes=nb;z.parentElement=function(a){B.currentNode=a;return B.parentNode()};z.firstElementChild=function(a){B.currentNode=a;return B.firstChild()};z.lastElementChild=function(a){B.currentNode=a;return B.lastChild()};z.previousElementSibling=function(a){B.currentNode=a;return B.previousSibling()};z.nextElementSibling=function(a){B.currentNode=a;return B.nextSibling()};
   z.children=function(a){var b=[];B.currentNode=a;for(a=B.firstChild();a;)b.push(a),a=B.nextSibling();return b};z.innerHTML=function(a){return mb(a,function(a){return nb(a)})};z.textContent=function(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}};var C={},ob=u.u,pb=[Node.prototype,Element.prototype,HTMLElement.prototype];function E(a){var b;a:{for(b=0;b<pb.length;b++){var c=pb[b];if(c.hasOwnProperty(a)){b=c;break a}}b=void 0}if(!b)throw Error("Could not find descriptor for "+a);return Object.getOwnPropertyDescriptor(b,a)}
   var F=ob?{parentNode:E("parentNode"),firstChild:E("firstChild"),lastChild:E("lastChild"),previousSibling:E("previousSibling"),nextSibling:E("nextSibling"),childNodes:E("childNodes"),parentElement:E("parentElement"),previousElementSibling:E("previousElementSibling"),nextElementSibling:E("nextElementSibling"),innerHTML:E("innerHTML"),textContent:E("textContent"),firstElementChild:E("firstElementChild"),lastElementChild:E("lastElementChild"),children:E("children")}:{},qb=ob?{firstElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,
   "firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"children")}:{},rb=ob?{firstElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(Document.prototype,"children")}:{};C.la=F;C.cb=qb;C.Ya=rb;C.parentNode=function(a){return F.parentNode.get.call(a)};
   C.firstChild=function(a){return F.firstChild.get.call(a)};C.lastChild=function(a){return F.lastChild.get.call(a)};C.previousSibling=function(a){return F.previousSibling.get.call(a)};C.nextSibling=function(a){return F.nextSibling.get.call(a)};C.childNodes=function(a){return Array.prototype.slice.call(F.childNodes.get.call(a))};C.parentElement=function(a){return F.parentElement.get.call(a)};C.previousElementSibling=function(a){return F.previousElementSibling.get.call(a)};C.nextElementSibling=function(a){return F.nextElementSibling.get.call(a)};
   C.innerHTML=function(a){return F.innerHTML.get.call(a)};C.textContent=function(a){return F.textContent.get.call(a)};C.children=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:a=qb.children.get.call(a);break;case Node.DOCUMENT_NODE:a=rb.children.get.call(a);break;default:a=F.children.get.call(a)}return Array.prototype.slice.call(a)};
   C.firstElementChild=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return qb.firstElementChild.get.call(a);case Node.DOCUMENT_NODE:return rb.firstElementChild.get.call(a);default:return F.firstElementChild.get.call(a)}};C.lastElementChild=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return qb.lastElementChild.get.call(a);case Node.DOCUMENT_NODE:return rb.lastElementChild.get.call(a);default:return F.lastElementChild.get.call(a)}};var G=u.qa?C:z;function sb(a){for(;a.firstChild;)a.removeChild(a.firstChild)}
   var tb=u.u,ub=document.implementation.createHTMLDocument("inert"),vb=Object.getOwnPropertyDescriptor(Node.prototype,"isConnected"),wb=vb&&vb.get,xb=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),yb={parentElement:{get:function(){var a=t(this);(a=a&&a.parentNode)&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:G.parentElement(this)},configurable:!0},parentNode:{get:function(){var a=t(this);a=a&&a.parentNode;return void 0!==a?a:G.parentNode(this)},configurable:!0},
   nextSibling:{get:function(){var a=t(this);a=a&&a.nextSibling;return void 0!==a?a:G.nextSibling(this)},configurable:!0},previousSibling:{get:function(){var a=t(this);a=a&&a.previousSibling;return void 0!==a?a:G.previousSibling(this)},configurable:!0},nextElementSibling:{get:function(){var a=t(this);if(a&&void 0!==a.nextSibling){for(a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return G.nextElementSibling(this)},configurable:!0},previousElementSibling:{get:function(){var a=
   t(this);if(a&&void 0!==a.previousSibling){for(a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return G.previousElementSibling(this)},configurable:!0}},zb={className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0}},Ab={childNodes:{get:function(){if(v(this)){var a=t(this);if(!a.childNodes){a.childNodes=[];for(var b=this.firstChild;b;b=b.nextSibling)a.childNodes.push(b)}var c=a.childNodes}else c=
   G.childNodes(this);c.item=function(a){return c[a]};return c},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=t(this);a=a&&a.firstChild;return void 0!==a?a:G.firstChild(this)},configurable:!0},lastChild:{get:function(){var a=t(this);a=a&&a.lastChild;return void 0!==a?a:G.lastChild(this)},configurable:!0},textContent:{get:function(){if(v(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&
   a.push(d.textContent);return a.join("")}return G.textContent(this)},set:function(a){if("undefined"===typeof a||null===a)a="";switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:if(!v(this)&&tb){var b=this.firstChild;(b!=this.lastChild||b&&b.nodeType!=Node.TEXT_NODE)&&sb(this);C.la.textContent.set.call(this,a)}else sb(this),(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){var a=
   t(this);if(a&&void 0!==a.firstChild){for(a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return G.firstElementChild(this)},configurable:!0},lastElementChild:{get:function(){var a=t(this);if(a&&void 0!==a.lastChild){for(a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return G.lastElementChild(this)},configurable:!0},children:{get:function(){var a=v(this)?Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE}):
   G.children(this);a.item=function(b){return a[b]};return a},configurable:!0},innerHTML:{get:function(){return v(this)?mb("template"===this.localName?this.content:this):G.innerHTML(this)},set:function(a){var b="template"===this.localName?this.content:this;sb(b);var c=this.localName;c&&"template"!==c||(c="div");c=ub.createElement(c);for(tb?C.la.innerHTML.set.call(c,a):c.innerHTML=a;c.firstChild;)b.appendChild(c.firstChild)},configurable:!0}},Bb={shadowRoot:{get:function(){var a=t(this);return a&&a.ma||
   null},configurable:!0}},Cb={activeElement:{get:function(){var a=xb&&xb.get?xb.get.call(document):u.u?void 0:document.activeElement;if(a&&a.nodeType){var b=!!w(this);if(this===document||b&&this.host!==a&&x.contains.call(this.host,a)){for(b=pa(a);b&&b!==this;)a=b.host,b=pa(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}};
   function H(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function J(a){H(a,yb);H(a,zb);H(a,Ab);H(a,Cb)}
   function Db(){var a=Eb.prototype;a.__proto__=DocumentFragment.prototype;H(a,yb,!0);H(a,Ab,!0);H(a,Cb,!0);Object.defineProperties(a,{nodeType:{value:Node.DOCUMENT_FRAGMENT_NODE,configurable:!0},nodeName:{value:"#document-fragment",configurable:!0},nodeValue:{value:null,configurable:!0}});["localName","namespaceURI","prefix"].forEach(function(b){Object.defineProperty(a,b,{value:void 0,configurable:!0})});["ownerDocument","baseURI","isConnected"].forEach(function(b){Object.defineProperty(a,b,{get:function(){return this.host[b]},
   configurable:!0})})}var Fb=u.u?function(){}:function(a){var b=r(a);b.ha||(b.ha=!0,H(a,yb,!0),H(a,zb,!0))},Gb=u.u?function(){}:function(a){r(a).sa||(H(a,Ab,!0),H(a,Bb,!0))};var Hb=G.childNodes;function Ib(a,b,c){Fb(a);c=c||null;var d=r(a),e=r(b),f=c?r(c):null;d.previousSibling=c?f.previousSibling:b.lastChild;if(f=t(d.previousSibling))f.nextSibling=a;if(f=t(d.nextSibling=c))f.previousSibling=a;d.parentNode=b;c?c===e.firstChild&&(e.firstChild=a):(e.lastChild=a,e.firstChild||(e.firstChild=a));e.childNodes=null}
   function Jb(a,b){var c=r(a);if(void 0===c.firstChild)for(b=b||Hb(a),c.firstChild=b[0]||null,c.lastChild=b[b.length-1]||null,Gb(a),c=0;c<b.length;c++){var d=b[c],e=r(d);e.parentNode=a;e.nextSibling=b[c+1]||null;e.previousSibling=b[c-1]||null;Fb(d)}};var Kb=G.parentNode;
   function Lb(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=t(c);d=d&&d.parentNode;if(void 0!==d&&d!==a||void 0===d&&Kb(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;b.parentNode&&Mb(b.parentNode,b);var e,f;if(!b.__noInsertionPoint){if(f=e=pa(a)){var h;"slot"===b.localName?h=[b]:b.querySelectorAll&&
   (h=b.querySelectorAll("slot"));f=h&&h.length?h:void 0}f&&(h=e,d=f,h.s=h.s||[],h.f=h.f||[],h.h=h.h||{},h.s.push.apply(h.s,[].concat(d instanceof Array?d:ka(ia(d)))))}("slot"===a.localName||f)&&(e=e||pa(a))&&Nb(e);if(v(a)){e=c;Gb(a);f=r(a);void 0!==f.firstChild&&(f.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){f=b.childNodes;for(h=0;h<f.length;h++)Ib(f[h],a,e);e=r(b);f=void 0!==e.firstChild?null:void 0;e.firstChild=e.lastChild=f;e.childNodes=f}else Ib(b,a,e);e=t(a);if(Ob(a)){Nb(e.root);
   var g=!0}else e.root&&(g=!0)}g||(g=w(a)?a.host:a,c?(c=Pb(c),x.insertBefore.call(g,b,c)):x.appendChild.call(g,b));Qb(a,b);return b}
   function Mb(a,b){if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+b);var c=pa(b),d=t(a);if(v(a)){var e=r(b),f=r(a);b===f.firstChild&&(f.firstChild=e.nextSibling);b===f.lastChild&&(f.lastChild=e.previousSibling);var h=e.previousSibling,g=e.nextSibling;h&&(r(h).nextSibling=g);g&&(r(g).previousSibling=h);e.parentNode=e.previousSibling=e.nextSibling=void 0;void 0!==f.childNodes&&(f.childNodes=null);if(Ob(a)){Nb(d.root);var k=!0}}Rb(b);if(c){(e=a&&"slot"===a.localName)&&
   (k=!0);if(c.f){Sb(c);f=c.h;for(aa in f)for(h=f[aa],g=0;g<h.length;g++){var l=h[g];if(Aa(b,l)){h.splice(g,1);var m=c.f.indexOf(l);0<=m&&c.f.splice(m,1);g--;m=t(l);if(l=m.A)for(var p=0;p<l.length;p++){var y=l[p],D=Tb(y);D&&x.removeChild.call(D,y)}m.A=[];m.assignedNodes=[];m=!0}}var aa=m}else aa=void 0;(aa||e)&&Nb(c)}k||(k=w(a)?a.host:a,(!d.root&&"slot"!==b.localName||k===Kb(b))&&x.removeChild.call(k,b));Qb(a,null,b);return b}
   function Rb(a){var b=t(a);if(b&&void 0!==b.I){b=a.childNodes;for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)Rb(e)}if(a=t(a))a.I=void 0}function Pb(a){var b=a;a&&"slot"===a.localName&&(b=(b=(b=t(a))&&b.A)&&b.length?b[0]:Pb(a.nextSibling));return b}function Ob(a){return(a=(a=t(a))&&a.root)&&Ub(a)}
   function Vb(a,b){if("slot"===b)a=a.parentNode,Ob(a)&&Nb(t(a).root);else if("slot"===a.localName&&"name"===b&&(b=pa(a))){if(b.f){var c=a.ta,d=Wb(a);if(d!==c){c=b.h[c];var e=c.indexOf(a);0<=e&&c.splice(e,1);c=b.h[d]||(b.h[d]=[]);c.push(a);1<c.length&&(b.h[d]=Yb(c))}}Nb(b)}}function Qb(a,b,c){if(a=(a=t(a))&&a.F)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),Ga(a)}
   function Zb(a){if(a&&a.nodeType){var b=r(a),c=b.I;void 0===c&&(w(a)?(c=a,b.I=c):(c=(c=a.parentNode)?Zb(c):a,x.contains.call(document.documentElement,a)&&(b.I=c)));return c}}function $b(a,b,c){var d=[];ac(a.childNodes,b,c,d);return d}function ac(a,b,c,d){for(var e=0,f=a.length,h;e<f&&(h=a[e]);e++){var g;if(g=h.nodeType===Node.ELEMENT_NODE){g=h;var k=b,l=c,m=d,p=k(g);p&&m.push(g);l&&l(p)?g=p:(ac(g.childNodes,k,l,m),g=void 0)}if(g)break}}var bc=null;
   function cc(a,b,c){bc||(bc=window.ShadyCSS&&window.ShadyCSS.ScopingShim);bc&&"class"===b?bc.setElementClass(a,c):(x.setAttribute.call(a,b,c),Vb(a,b))}function dc(a,b){if(a.ownerDocument!==document)return x.importNode.call(document,a,b);var c=x.importNode.call(document,a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=dc(a[b],!0),c.appendChild(d)}return c};var ec="__eventWrappers"+Date.now(),fc={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,
   dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0};function gc(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}
   function hc(a,b){if(!w)return a;a=gc(a,!0);for(var c=0,d,e,f,h;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(h=a.indexOf(f),e=f),!w(f)||-1<h)return d}
   var ic={get composed(){!1!==this.isTrusted&&void 0===this.V&&(this.V=fc[this.type]);return this.V||!1},composedPath:function(){this.b||(this.b=gc(this.__target,this.composed));return this.b},get target(){return hc(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.W)return null;this.c||(this.c=gc(this.W,!0));return hc(this.currentTarget,this.c)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);this.a=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);
   this.a=this.g=!0}};function jc(a){function b(b,d){b=new a(b,d);b.V=d&&!!d.composed;return b}ua(b,a);b.prototype=a.prototype;return b}var kc={focus:!0,blur:!0};function lc(a){return a.__target!==a.target||a.W!==a.relatedTarget}function mc(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&(!lc(a)||a.target!==a.relatedTarget)&&(e.call(b,a),!a.g);d++);}
   function nc(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];mc(a,d,"capture");if(a.a)return}Object.defineProperty(a,"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=t(d);f=f&&f.root;if(0===c||f&&f===e)if(mc(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.a)break}}
   function oc(a,b,c,d,e,f){for(var h=0;h<a.length;h++){var g=a[h],k=g.type,l=g.capture,m=g.once,p=g.passive;if(b===g.node&&c===k&&d===l&&e===m&&f===p)return h}return-1}
   function pc(a,b,c){if(b){var d=typeof b;if("function"===d||"object"===d)if("object"!==d||b.handleEvent&&"function"===typeof b.handleEvent){if(c&&"object"===typeof c){var e=!!c.capture;var f=!!c.once;var h=!!c.passive}else e=!!c,h=f=!1;var g=c&&c.Y||this,k=b[ec];if(k){if(-1<oc(k,g,a,e,f,h))return}else b[ec]=[];k=function(e){f&&this.removeEventListener(a,b,c);e.__target||qc(e);if(g!==this){var h=Object.getOwnPropertyDescriptor(e,"currentTarget");Object.defineProperty(e,"currentTarget",{get:function(){return g},
   configurable:!0})}if(e.composed||-1<e.composedPath().indexOf(g))if(lc(e)&&e.target===e.relatedTarget)e.eventPhase===Event.BUBBLING_PHASE&&e.stopImmediatePropagation();else if(e.eventPhase===Event.CAPTURING_PHASE||e.bubbles||e.target===g||g instanceof Window){var k="function"===d?b.call(g,e):b.handleEvent&&b.handleEvent(e);g!==this&&(h?(Object.defineProperty(e,"currentTarget",h),h=null):delete e.currentTarget);return k}};b[ec].push({node:g,type:a,capture:e,once:f,passive:h,Ua:k});kc[a]?(this.__handlers=
   this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][e?"capture":"bubble"].push(k)):(this instanceof Window?x.Sa:x.addEventListener).call(this,a,k,c)}}}
   function rc(a,b,c){if(b){if(c&&"object"===typeof c){var d=!!c.capture;var e=!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var h=c&&c.Y||this,g=void 0;var k=null;try{k=b[ec]}catch(l){}k&&(e=oc(k,h,a,d,e,f),-1<e&&(g=k.splice(e,1)[0].Ua,k.length||(b[ec]=void 0)));(this instanceof Window?x.Ta:x.removeEventListener).call(this,a,g||b,c);g&&kc[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][d?"capture":"bubble"],g=a.indexOf(g),-1<g&&a.splice(g,1))}}
   function sc(){for(var a in kc)window.addEventListener(a,function(a){a.__target||(qc(a),nc(a))},!0)}function qc(a){a.__target=a.target;a.W=a.relatedTarget;if(u.u){var b=Object.getPrototypeOf(a);if(!b.hasOwnProperty("__patchProto")){var c=Object.create(b);c.Wa=b;sa(c,ic);b.__patchProto=c}a.__proto__=b.__patchProto}else sa(a,ic)}var tc=jc(window.Event),uc=jc(window.CustomEvent),vc=jc(window.MouseEvent);function wc(a,b){return{index:a,J:[],O:b}}
   function xc(a,b,c,d){var e=0,f=0,h=0,g=0,k=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(h=0;h<k;h++)if(a[h]!==c[h])break a;h=k}if(b==a.length&&d==c.length){g=a.length;for(var l=c.length,m=0;m<k-h&&yc(a[--g],c[--l]);)m++;g=m}e+=h;f+=h;b-=g;d-=g;if(0==b-e&&0==d-f)return[];if(e==b){for(b=wc(e,0);f<d;)b.J.push(c[f++]);return[b]}if(f==d)return[wc(e,b-e)];k=e;h=f;d=d-h+1;g=b-k+1;b=Array(d);for(l=0;l<d;l++)b[l]=Array(g),b[l][0]=l;for(l=0;l<g;l++)b[0][l]=l;for(l=1;l<d;l++)for(m=1;m<g;m++)if(a[k+m-1]===c[h+l-1])b[l][m]=
   b[l-1][m-1];else{var p=b[l-1][m]+1,y=b[l][m-1]+1;b[l][m]=p<y?p:y}k=b.length-1;h=b[0].length-1;d=b[k][h];for(a=[];0<k||0<h;)0==k?(a.push(2),h--):0==h?(a.push(3),k--):(g=b[k-1][h-1],l=b[k-1][h],m=b[k][h-1],p=l<m?l<g?l:g:m<g?m:g,p==g?(g==d?a.push(0):(a.push(1),d=g),k--,h--):p==l?(a.push(3),k--,d=l):(a.push(2),h--,d=m));a.reverse();b=void 0;k=[];for(h=0;h<a.length;h++)switch(a[h]){case 0:b&&(k.push(b),b=void 0);e++;f++;break;case 1:b||(b=wc(e,0));b.O++;e++;b.J.push(c[f]);f++;break;case 2:b||(b=wc(e,0));
   b.O++;e++;break;case 3:b||(b=wc(e,0)),b.J.push(c[f]),f++}b&&k.push(b);return k}function yc(a,b){return a===b};var Tb=G.parentNode,zc=G.childNodes,Ac={};function Bc(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}function Eb(a,b,c){if(a!==Ac)throw new TypeError("Illegal constructor");this.xa="ShadyRoot";a=zc(b);this.host=b;this.a=c&&c.mode;Jb(b,a);c=t(b);c.root=this;c.ma="closed"!==this.a?this:null;c=r(this);c.firstChild=c.lastChild=c.parentNode=c.nextSibling=c.previousSibling=null;c.childNodes=[];this.N=!1;this.s=this.h=this.f=null;c=0;for(var d=a.length;c<d;c++)x.removeChild.call(b,a[c])}
   function Nb(a){a.N||(a.N=!0,Da(function(){return Cc(a)}))}function Cc(a){for(var b;a;){a.N&&(b=a);a:{var c=a;a=c.host.getRootNode();if(w(a))for(var d=c.host.childNodes,e=0;e<d.length;e++)if(c=d[e],"slot"==c.localName)break a;a=void 0}}b&&b._renderRoot()}
   Eb.prototype._renderRoot=function(){this.N=!1;if(this.f){Sb(this);for(var a=0,b;a<this.f.length;a++){b=this.f[a];var c=t(b),d=c.assignedNodes;c.assignedNodes=[];c.A=[];if(c.ca=d)for(c=0;c<d.length;c++){var e=t(d[c]);e.M=e.assignedSlot;e.assignedSlot===b&&(e.assignedSlot=null)}}for(b=this.host.firstChild;b;b=b.nextSibling)Dc(this,b);for(a=0;a<this.f.length;a++){b=this.f[a];d=t(b);if(!d.assignedNodes.length)for(c=b.firstChild;c;c=c.nextSibling)Dc(this,c,b);(c=(c=t(b.parentNode))&&c.root)&&Ub(c)&&c._renderRoot();
   Ec(this,d.A,d.assignedNodes);if(c=d.ca){for(e=0;e<c.length;e++)t(c[e]).M=null;d.ca=null;c.length>d.assignedNodes.length&&(d.R=!0)}d.R&&(d.R=!1,Fc(this,b))}a=this.f;b=[];for(d=0;d<a.length;d++)c=a[d].parentNode,(e=t(c))&&e.root||!(0>b.indexOf(c))||b.push(c);for(a=0;a<b.length;a++){d=b[a];c=d===this?this.host:d;e=[];d=d.childNodes;for(var f=0;f<d.length;f++){var h=d[f];if("slot"==h.localName){h=t(h).A;for(var g=0;g<h.length;g++)e.push(h[g])}else e.push(h)}d=void 0;f=zc(c);h=xc(e,e.length,f,f.length);
   for(var k=g=0;g<h.length&&(d=h[g]);g++){for(var l=0,m;l<d.J.length&&(m=d.J[l]);l++)Tb(m)===c&&x.removeChild.call(c,m),f.splice(d.index+k,1);k-=d.O}for(k=0;k<h.length&&(d=h[k]);k++)for(g=f[d.index],l=d.index;l<d.index+d.O;l++)m=e[l],x.insertBefore.call(c,m,g),f.splice(l,0,m)}}};function Dc(a,b,c){var d=r(b),e=d.M;d.M=null;c||(c=(a=a.h[b.slot||"__catchall"])&&a[0]);c?(r(c).assignedNodes.push(b),d.assignedSlot=c):d.assignedSlot=void 0;e!==d.assignedSlot&&d.assignedSlot&&(r(d.assignedSlot).R=!0)}
   function Ec(a,b,c){for(var d=0,e;d<c.length&&(e=c[d]);d++)if("slot"==e.localName){var f=t(e).assignedNodes;f&&f.length&&Ec(a,b,f)}else b.push(c[d])}function Fc(a,b){x.dispatchEvent.call(b,new Event("slotchange"));b=t(b);b.assignedSlot&&Fc(a,b.assignedSlot)}function Sb(a){if(a.s&&a.s.length){for(var b=a.s,c,d=0;d<b.length;d++){var e=b[d];Jb(e);Jb(e.parentNode);var f=Wb(e);a.h[f]?(c=c||{},c[f]=!0,a.h[f].push(e)):a.h[f]=[e];a.f.push(e)}if(c)for(var h in c)a.h[h]=Yb(a.h[h]);a.s=[]}}
   function Wb(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.ta=b}function Yb(a){return a.sort(function(a,c){a=Bc(a);for(var b=Bc(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})}function Ub(a){Sb(a);return!(!a.f||!a.f.length)};function Gc(a){var b=a.getRootNode();w(b)&&Cc(b);return(a=t(a))&&a.assignedSlot||null}
   var Hc={addEventListener:pc.bind(window),removeEventListener:rc.bind(window)},Ic={addEventListener:pc,removeEventListener:rc,appendChild:function(a){return Lb(this,a)},insertBefore:function(a,b){return Lb(this,a,b)},removeChild:function(a){return Mb(this,a)},replaceChild:function(a,b){Lb(this,a,b);Mb(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=x.cloneNode.call(this,a);else if(b=x.cloneNode.call(this,!1),a){a=this.childNodes;for(var c=0,d;c<a.length;c++)d=a[c].cloneNode(!0),
   b.appendChild(d)}return b},getRootNode:function(){return Zb(this)},contains:function(a){return Aa(this,a)},dispatchEvent:function(a){Ea();return x.dispatchEvent.call(this,a)}};
   Object.defineProperties(Ic,{isConnected:{get:function(){if(wb&&wb.call(this))return!0;if(this.nodeType==Node.DOCUMENT_FRAGMENT_NODE)return!1;var a=this.ownerDocument;if(za){if(x.contains.call(a,this))return!0}else if(a.documentElement&&x.contains.call(a.documentElement,this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(w(a)?a.host:void 0);return!!(a&&a instanceof Document)},configurable:!0}});
   var Jc={get assignedSlot(){return Gc(this)}},Kc={querySelector:function(a){return $b(this,function(b){return ra.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a,b){if(b){b=Array.prototype.slice.call(x.querySelectorAll(this,a));var c=this.getRootNode();return b.filter(function(a){return a.getRootNode()==c})}return $b(this,function(b){return ra.call(b,a)})}},Lc={assignedNodes:function(a){if("slot"===this.localName){var b=this.getRootNode();w(b)&&Cc(b);return(b=t(this))?(a&&a.flatten?
   b.A:b.assignedNodes)||[]:[]}}},Mc=ta({setAttribute:function(a,b){cc(this,a,b)},removeAttribute:function(a){x.removeAttribute.call(this,a);Vb(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";return new Eb(Ac,this,a)},get slot(){return this.getAttribute("slot")},set slot(a){cc(this,"slot",a)},get assignedSlot(){return Gc(this)}},Kc,Lc);Object.defineProperties(Mc,Bb);
   var Nc=ta({importNode:function(a,b){return dc(a,b)},getElementById:function(a){return $b(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},Kc);Object.defineProperties(Nc,{_activeElement:Cb.activeElement});
   var Oc=HTMLElement.prototype.blur,Pc=ta({blur:function(){var a=t(this);(a=(a=a&&a.root)&&a.activeElement)?a.blur():Oc.call(this)}}),Qc={addEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.Y=this;this.host.addEventListener(a,b,c)},removeEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.Y=this;this.host.removeEventListener(a,b,c)},getElementById:function(a){return $b(this,function(b){return b.id==a},function(a){return!!a})[0]||null}};
   function K(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}};if(u.ka){var ShadyDOM={inUse:u.ka,patch:function(a){Gb(a);Fb(a);return a},isShadyRoot:w,enqueue:Da,flush:Ea,settings:u,filterMutations:Ka,observeChildren:Ia,unobserveChildren:Ja,nativeMethods:x,nativeTree:G};window.ShadyDOM=ShadyDOM;window.Event=tc;window.CustomEvent=uc;window.MouseEvent=vc;sc();var Rc=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;K(Eb.prototype,Qc);K(window.Node.prototype,Ic);K(window.Window.prototype,Hc);K(window.Text.prototype,Jc);K(window.DocumentFragment.prototype,
   Kc);K(window.Element.prototype,Mc);K(window.Document.prototype,Nc);window.HTMLSlotElement&&K(window.HTMLSlotElement.prototype,Lc);K(Rc.prototype,Pc);u.u&&(J(window.Node.prototype),J(window.Text.prototype),J(window.DocumentFragment.prototype),J(window.Element.prototype),J(Rc.prototype),J(window.Document.prototype),window.HTMLSlotElement&&J(window.HTMLSlotElement.prototype));Db();window.ShadowRoot=Eb};var Sc=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function Tc(a){var b=Sc.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function L(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}
   function Uc(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
   function M(a,b,c){c=void 0===c?new Set:c;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)M(d,b,c);d=Uc(a,e);continue}else if("template"===f){d=Uc(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)M(e,b,c)}d=d.firstChild?d.firstChild:Uc(a,d)}}function N(a,b,c){a[b]=c};function Vc(){this.a=new Map;this.m=new Map;this.g=[];this.c=!1}function Wc(a,b,c){a.a.set(b,c);a.m.set(c.constructor,c)}function Xc(a,b){a.c=!0;a.g.push(b)}function Yc(a,b){a.c&&M(b,function(b){return a.b(b)})}Vc.prototype.b=function(a){if(this.c&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this.g.length;b++)this.g[b](a)}};function O(a,b){var c=[];M(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state?a.connectedCallback(d):Zc(a,d)}}
   function P(a,b){var c=[];M(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state&&a.disconnectedCallback(d)}}
   function Q(a,b,c){c=void 0===c?{}:c;var d=c.Ra||new Set,e=c.pa||function(b){return Zc(a,b)},f=[];M(b,function(b){if("link"===b.localName&&"import"===b.getAttribute("rel")){var c=b.import;c instanceof Node&&(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0);c&&"complete"===c.readyState?c.__CE_documentLoadHandled=!0:b.addEventListener("load",function(){var c=b.import;if(!c.__CE_documentLoadHandled){c.__CE_documentLoadHandled=!0;var f=new Set(d);f.delete(c);Q(a,c,{Ra:f,pa:e})}})}else f.push(b)},d);if(a.c)for(b=
   0;b<f.length;b++)a.b(f[b]);for(b=0;b<f.length;b++)e(f[b])}
   function Zc(a,b){if(void 0===b.__CE_state){var c=b.ownerDocument;if(c.defaultView||c.__CE_isImportDocument&&c.__CE_hasRegistry)if(c=a.a.get(b.localName)){c.constructionStack.push(b);var d=c.constructor;try{try{if(new d!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(h){throw b.__CE_state=2,h;}b.__CE_state=1;b.__CE_definition=c;if(c.attributeChangedCallback)for(c=c.observedAttributes,d=0;d<c.length;d++){var e=c[d],
   f=b.getAttribute(e);null!==f&&a.attributeChangedCallback(b,e,null,f,null)}L(b)&&a.connectedCallback(b)}}}Vc.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};Vc.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
   Vc.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,c,d,e)};function $c(a){var b=document;this.j=a;this.a=b;this.C=void 0;Q(this.j,this.a);"loading"===this.a.readyState&&(this.C=new MutationObserver(this.b.bind(this)),this.C.observe(this.a,{childList:!0,subtree:!0}))}$c.prototype.disconnect=function(){this.C&&this.C.disconnect()};$c.prototype.b=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||this.disconnect();for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)Q(this.j,c[d])};function ad(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function bd(a){if(a.a)throw Error("Already resolved.");a.a=void 0;a.b&&a.b(void 0)};function R(a){this.$=!1;this.j=a;this.da=new Map;this.aa=function(a){return a()};this.L=!1;this.ba=[];this.wa=new $c(a)}
   R.prototype.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!Tc(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.j.a.get(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.$)throw Error("A custom element is already being defined.");this.$=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error("The '"+a+"' callback must be a function.");
   return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=d("connectedCallback");var h=d("disconnectedCallback");var g=d("adoptedCallback");var k=d("attributeChangedCallback");var l=b.observedAttributes||[]}catch(m){return}finally{this.$=!1}b={localName:a,constructor:b,connectedCallback:f,disconnectedCallback:h,adoptedCallback:g,attributeChangedCallback:k,observedAttributes:l,constructionStack:[]};Wc(this.j,a,b);this.ba.push(b);
   this.L||(this.L=!0,this.aa(function(){return cd(c)}))};function cd(a){if(!1!==a.L){a.L=!1;for(var b=a.ba,c=[],d=new Map,e=0;e<b.length;e++)d.set(b[e].localName,[]);Q(a.j,document,{pa:function(b){if(void 0===b.__CE_state){var e=b.localName,f=d.get(e);f?f.push(b):a.j.a.get(e)&&c.push(b)}}});for(e=0;e<c.length;e++)Zc(a.j,c[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=d.get(f.localName);for(var h=0;h<f.length;h++)Zc(a.j,f[h]);(e=a.da.get(e))&&bd(e)}}}R.prototype.get=function(a){if(a=this.j.a.get(a))return a.constructor};
   R.prototype.a=function(a){if(!Tc(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.da.get(a);if(b)return b.c;b=new ad;this.da.set(a,b);this.j.a.get(a)&&!this.ba.some(function(b){return b.localName===a})&&bd(b);return b.c};R.prototype.b=function(a){this.wa.disconnect();var b=this.aa;this.aa=function(c){return a(function(){return b(c)})}};window.CustomElementRegistry=R;R.prototype.define=R.prototype.define;R.prototype.get=R.prototype.get;
   R.prototype.whenDefined=R.prototype.a;R.prototype.polyfillWrapFlushCallback=R.prototype.b;var dd=window.Document.prototype.createElement,ed=window.Document.prototype.createElementNS,fd=window.Document.prototype.importNode,gd=window.Document.prototype.prepend,hd=window.Document.prototype.append,id=window.DocumentFragment.prototype.prepend,jd=window.DocumentFragment.prototype.append,kd=window.Node.prototype.cloneNode,ld=window.Node.prototype.appendChild,md=window.Node.prototype.insertBefore,nd=window.Node.prototype.removeChild,od=window.Node.prototype.replaceChild,pd=Object.getOwnPropertyDescriptor(window.Node.prototype,
   "textContent"),qd=window.Element.prototype.attachShadow,rd=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),sd=window.Element.prototype.getAttribute,td=window.Element.prototype.setAttribute,ud=window.Element.prototype.removeAttribute,vd=window.Element.prototype.getAttributeNS,wd=window.Element.prototype.setAttributeNS,xd=window.Element.prototype.removeAttributeNS,yd=window.Element.prototype.insertAdjacentElement,zd=window.Element.prototype.insertAdjacentHTML,Ad=window.Element.prototype.prepend,
   Bd=window.Element.prototype.append,Cd=window.Element.prototype.before,Dd=window.Element.prototype.after,Ed=window.Element.prototype.replaceWith,Fd=window.Element.prototype.remove,Gd=window.HTMLElement,Hd=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),Id=window.HTMLElement.prototype.insertAdjacentElement,Jd=window.HTMLElement.prototype.insertAdjacentHTML;var Kd=new function(){};function Ld(){var a=Md;window.HTMLElement=function(){function b(){var b=this.constructor,d=a.m.get(b);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(0===e.length)return e=dd.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.b(e),e;d=e.length-1;var f=e[d];if(f===Kd)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
   e[d]=Kd;Object.setPrototypeOf(f,b.prototype);a.b(f);return f}b.prototype=Gd.prototype;return b}()};function Nd(a,b,c){function d(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var f=[],l=0;l<d.length;l++){var m=d[l];m instanceof Element&&L(m)&&f.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)e.push(m);else e.push(m)}b.apply(this,d);for(d=0;d<f.length;d++)P(a,f[d]);if(L(this))for(d=0;d<e.length;d++)f=e[d],f instanceof Element&&O(a,f)}}void 0!==c.T&&(b.prepend=d(c.T));void 0!==c.append&&(b.append=d(c.append))};function Od(){var a=Md;N(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var c=a.a.get(b);if(c)return new c.constructor}b=dd.call(this,b);a.b(b);return b});N(Document.prototype,"importNode",function(b,c){b=fd.call(this,b,c);this.__CE_hasRegistry?Q(a,b):Yc(a,b);return b});N(Document.prototype,"createElementNS",function(b,c){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var d=a.a.get(c);if(d)return new d.constructor}b=ed.call(this,b,c);a.b(b);return b});
   Nd(a,Document.prototype,{T:gd,append:hd})};function Pd(){var a=Md;function b(b,d){Object.defineProperty(b,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var e=this.childNodes,g=e.length;if(0<g&&L(this)){c=Array(g);for(var k=0;k<g;k++)c[k]=e[k]}}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)P(a,c[b])}}})}N(Node.prototype,"insertBefore",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);
   b=md.call(this,b,d);if(L(this))for(d=0;d<c.length;d++)O(a,c[d]);return b}c=L(b);d=md.call(this,b,d);c&&P(a,b);L(this)&&O(a,b);return d});N(Node.prototype,"appendChild",function(b){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=ld.call(this,b);if(L(this))for(var e=0;e<c.length;e++)O(a,c[e]);return b}c=L(b);e=ld.call(this,b);c&&P(a,b);L(this)&&O(a,b);return e});N(Node.prototype,"cloneNode",function(b){b=kd.call(this,b);this.ownerDocument.__CE_hasRegistry?Q(a,b):
   Yc(a,b);return b});N(Node.prototype,"removeChild",function(b){var c=L(b),e=nd.call(this,b);c&&P(a,b);return e});N(Node.prototype,"replaceChild",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=od.call(this,b,d);if(L(this))for(P(a,d),d=0;d<c.length;d++)O(a,c[d]);return b}c=L(b);var f=od.call(this,b,d),h=L(this);h&&P(a,d);c&&P(a,b);h&&O(a,b);return f});pd&&pd.get?b(Node.prototype,pd):Xc(a,function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=
   [],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)nd.call(this,this.firstChild);ld.call(this,document.createTextNode(a))}})})};function Qd(a){var b=Element.prototype;function c(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var g=[],k=0;k<d.length;k++){var l=d[k];l instanceof Element&&L(l)&&g.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)e.push(l);else e.push(l)}b.apply(this,d);for(d=0;d<g.length;d++)P(a,g[d]);if(L(this))for(d=0;d<e.length;d++)g=e[d],g instanceof Element&&O(a,g)}}void 0!==Cd&&(b.before=c(Cd));void 0!==Cd&&(b.after=c(Dd));void 0!==
   Ed&&N(b,"replaceWith",function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=[];for(var h=[],g=0;g<c.length;g++){var k=c[g];k instanceof Element&&L(k)&&h.push(k);if(k instanceof DocumentFragment)for(k=k.firstChild;k;k=k.nextSibling)d.push(k);else d.push(k)}g=L(this);Ed.apply(this,c);for(c=0;c<h.length;c++)P(a,h[c]);if(g)for(P(a,this),c=0;c<d.length;c++)h=d[c],h instanceof Element&&O(a,h)});void 0!==Fd&&N(b,"remove",function(){var b=L(this);Fd.call(this);b&&P(a,this)})};function Rd(){var a=Md;function b(b,c){Object.defineProperty(b,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(b){var d=this,e=void 0;L(this)&&(e=[],M(this,function(a){a!==d&&e.push(a)}));c.set.call(this,b);if(e)for(var f=0;f<e.length;f++){var h=e[f];1===h.__CE_state&&a.disconnectedCallback(h)}this.ownerDocument.__CE_hasRegistry?Q(a,this):Yc(a,this);return b}})}function c(b,c){N(b,"insertAdjacentElement",function(b,d){var e=L(d);b=c.call(this,b,d);e&&P(a,d);L(b)&&O(a,d);
   return b})}function d(b,c){function d(b,c){for(var d=[];b!==c;b=b.nextSibling)d.push(b);for(c=0;c<d.length;c++)Q(a,d[c])}N(b,"insertAdjacentHTML",function(a,b){a=a.toLowerCase();if("beforebegin"===a){var e=this.previousSibling;c.call(this,a,b);d(e||this.parentNode.firstChild,this)}else if("afterbegin"===a)e=this.firstChild,c.call(this,a,b),d(this.firstChild,e);else if("beforeend"===a)e=this.lastChild,c.call(this,a,b),d(e||this.firstChild,null);else if("afterend"===a)e=this.nextSibling,c.call(this,
   a,b),d(this.nextSibling,e);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}qd&&N(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=qd.call(this,a)});rd&&rd.get?b(Element.prototype,rd):Hd&&Hd.get?b(HTMLElement.prototype,Hd):Xc(a,function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return kd.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName,c=b?this.content:
   this,d=dd.call(document,this.localName);for(d.innerHTML=a;0<c.childNodes.length;)nd.call(c,c.childNodes[0]);for(a=b?d.content:d;0<a.childNodes.length;)ld.call(c,a.childNodes[0])}})});N(Element.prototype,"setAttribute",function(b,c){if(1!==this.__CE_state)return td.call(this,b,c);var d=sd.call(this,b);td.call(this,b,c);c=sd.call(this,b);a.attributeChangedCallback(this,b,d,c,null)});N(Element.prototype,"setAttributeNS",function(b,c,d){if(1!==this.__CE_state)return wd.call(this,b,c,d);var e=vd.call(this,
   b,c);wd.call(this,b,c,d);d=vd.call(this,b,c);a.attributeChangedCallback(this,c,e,d,b)});N(Element.prototype,"removeAttribute",function(b){if(1!==this.__CE_state)return ud.call(this,b);var c=sd.call(this,b);ud.call(this,b);null!==c&&a.attributeChangedCallback(this,b,c,null,null)});N(Element.prototype,"removeAttributeNS",function(b,c){if(1!==this.__CE_state)return xd.call(this,b,c);var d=vd.call(this,b,c);xd.call(this,b,c);var e=vd.call(this,b,c);d!==e&&a.attributeChangedCallback(this,c,d,e,b)});Id?
   c(HTMLElement.prototype,Id):yd?c(Element.prototype,yd):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Jd?d(HTMLElement.prototype,Jd):zd?d(Element.prototype,zd):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Nd(a,Element.prototype,{T:Ad,append:Bd});Qd(a)};var Sd=window.customElements;if(!Sd||Sd.forcePolyfill||"function"!=typeof Sd.define||"function"!=typeof Sd.get){var Md=new Vc;Ld();Od();Nd(Md,DocumentFragment.prototype,{T:id,append:jd});Pd();Rd();document.__CE_hasRegistry=!0;var customElements=new R(Md);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};/*
   
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
   function Td(){this.end=this.start=0;this.rules=this.parent=this.previous=null;this.cssText=this.parsedCssText="";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=""}
   function Ud(a){a=a.replace(Vd,"").replace(Wd,"");var b=Xd,c=a,d=new Td;d.start=0;d.end=c.length;for(var e=d,f=0,h=c.length;f<h;f++)if("{"===c[f]){e.rules||(e.rules=[]);var g=e,k=g.rules[g.rules.length-1]||null;e=new Td;e.start=f+1;e.parent=g;e.previous=k;g.rules.push(e)}else"}"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}
   function Xd(a,b){var c=b.substring(a.start,a.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?a.previous.end:a.parent.start,a.start-1),c=Yd(c),c=c.replace(Zd," "),c=c.substring(c.lastIndexOf(";")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf("@"),a.atRule?0===c.indexOf("@media")?a.type=$d:c.match(ae)&&(a.type=be,a.keyframesName=a.selector.split(Zd).pop()):a.type=0===c.indexOf("--")?ce:de);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)Xd(f,
   b);return a}function Yd(a){return a.replace(/\\([0-9a-f]{1,6})\s/gi,function(a,c){a=c;for(c=6-a.length;c--;)a="0"+a;return"\\"+a})}
   function ee(a,b,c){c=void 0===c?"":c;var d="";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf("--"));if(f){f=0;for(var h=e.length,g;f<h&&(g=e[f]);f++)d=ee(g,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(fe,"").replace(ge,""),b=b.replace(he,"").replace(ie,"")),(d=b.trim())&&(d="  "+d+"\n")}d&&(a.selector&&(c+=a.selector+" {\n"),c+=d,a.selector&&(c+="}\n\n"));return c}
   var de=1,be=7,$d=4,ce=1E3,Vd=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,Wd=/@import[^;]*;/gim,fe=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,ge=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,he=/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,ie=/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,ae=/^@[^\s]*keyframes/,Zd=/\s+/g;var S=!(window.ShadyDOM&&window.ShadyDOM.inUse),me;function ne(a){me=a&&a.shimcssproperties?!1:S||!(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)||!window.CSS||!CSS.supports||!CSS.supports("box-shadow","0 0 0 var(--foo)"))}window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?me=window.ShadyCSS.nativeCss:window.ShadyCSS?(ne(window.ShadyCSS),window.ShadyCSS=void 0):ne(window.WebComponents&&window.WebComponents.flags);var T=me;var oe=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,pe=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,qe=/(--[\w-]+)\s*([:,;)]|$)/gi,re=/(animation\s*:)|(animation-name\s*:)/,se=/@media\s(.*)/,te=/\{[^}]*\}/g;var ue=new Set;function ve(a,b){if(!a)return"";"string"===typeof a&&(a=Ud(a));b&&we(a,b);return ee(a,T)}function xe(a){!a.__cssRules&&a.textContent&&(a.__cssRules=Ud(a.textContent));return a.__cssRules||null}function ye(a){return!!a.parent&&a.parent.type===be}function we(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===$d){var h=a.selector.match(se);h&&(window.matchMedia(h[1]).matches||(e=!0))}f===de?b(a):c&&f===be?c(a):f===ce&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var g;e<f&&(g=a[e]);e++)we(g,b,c,d)}}}
   function ze(a,b,c,d){var e=document.createElement("style");b&&e.setAttribute("scope",b);e.textContent=a;Ae(e,c,d);return e}var U=null;function Ae(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);U?a.compareDocumentPosition(U)===Node.DOCUMENT_POSITION_PRECEDING&&(U=a):U=a}
   function Be(a,b){var c=a.indexOf("var(");if(-1===c)return b(a,"","","");a:{var d=0;var e=c+3;for(var f=a.length;e<f;e++)if("("===a[e])d++;else if(")"===a[e]&&0===--d)break a;e=-1}d=a.substring(c+4,e);c=a.substring(0,c);a=Be(a.substring(e+1),b);e=d.indexOf(",");return-1===e?b(c,d.trim(),"",a):b(c,d.substring(0,e).trim(),d.substring(e+1).trim(),a)}function Ce(a,b){S?a.setAttribute("class",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,"class",b)}
   function V(a){var b=a.localName,c="";b?-1<b.indexOf("-")||(c=b,b=a.getAttribute&&a.getAttribute("is")||""):(b=a.is,c=a.extends);return{is:b,K:c}};function De(){}function Ee(a,b,c){var d=W;a.__styleScoped?a.__styleScoped=null:Fe(d,a,b||"",c)}function Fe(a,b,c,d){b.nodeType===Node.ELEMENT_NODE&&Ge(b,c,d);if(b="template"===b.localName?(b.content||b.Xa).childNodes:b.children||b.childNodes)for(var e=0;e<b.length;e++)Fe(a,b[e],c,d)}
   function Ge(a,b,c){if(b)if(a.classList)c?(a.classList.remove("style-scope"),a.classList.remove(b)):(a.classList.add("style-scope"),a.classList.add(b));else if(a.getAttribute){var d=a.getAttribute(He);c?d&&(b=d.replace("style-scope","").replace(b,""),Ce(a,b)):Ce(a,(d?d+" ":"")+"style-scope "+b)}}function Ie(a,b,c){var d=W,e=a.__cssBuild;S||"shady"===e?b=ve(b,c):(a=V(a),b=Je(d,b,a.is,a.K,c)+"\n\n");return b.trim()}
   function Je(a,b,c,d,e){var f=Ke(c,d);c=c?Le+c:"";return ve(b,function(b){b.c||(b.selector=b.l=Me(a,b,a.b,c,f),b.c=!0);e&&e(b,c,f)})}function Ke(a,b){return b?"[is="+a+"]":a}function Me(a,b,c,d,e){var f=b.selector.split(Ne);if(!ye(b)){b=0;for(var h=f.length,g;b<h&&(g=f[b]);b++)f[b]=c.call(a,g,d,e)}return f.join(Ne)}function Oe(a){return a.replace(Pe,function(a,c,d){-1<d.indexOf("+")?d=d.replace(/\+/g,"___"):-1<d.indexOf("___")&&(d=d.replace(/___/g,"+"));return":"+c+"("+d+")"})}
   De.prototype.b=function(a,b,c){var d=!1;a=a.trim();var e=Pe.test(a);e&&(a=a.replace(Pe,function(a,b,c){return":"+b+"("+c.replace(/\s/g,"")+")"}),a=Oe(a));a=a.replace(Qe,Re+" $1");a=a.replace(Se,function(a,e,g){d||(a=Te(g,e,b,c),d=d||a.stop,e=a.Ca,g=a.value);return e+g});e&&(a=Oe(a));return a};
   function Te(a,b,c,d){var e=a.indexOf(Ue);0<=a.indexOf(Re)?a=Ve(a,d):0!==e&&(a=c?We(a,c):a);c=!1;0<=e&&(b="",c=!0);if(c){var f=!0;c&&(a=a.replace(Xe,function(a,b){return" > "+b}))}a=a.replace(Ye,function(a,b,c){return'[dir="'+c+'"] '+b+", "+b+'[dir="'+c+'"]'});return{value:a,Ca:b,stop:f}}function We(a,b){a=a.split(Ze);a[0]+=b;return a.join(Ze)}
   function Ve(a,b){var c=a.match($e);return(c=c&&c[2].trim()||"")?c[0].match(af)?a.replace($e,function(a,c,f){return b+f}):c.split(af)[0]===b?c:bf:a.replace(Re,b)}function cf(a){a.selector===df&&(a.selector="html")}De.prototype.c=function(a){return a.match(Ue)?this.b(a,ef):We(a.trim(),ef)};q.Object.defineProperties(De.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"style-scope"}}});
   var Pe=/:(nth[-\w]+)\(([^)]+)\)/,ef=":not(.style-scope)",Ne=",",Se=/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,af=/[[.:#*]/,Re=":host",df=":root",Ue="::slotted",Qe=new RegExp("^("+Ue+")"),$e=/(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,Xe=/(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,Ye=/(.*):dir\((?:(ltr|rtl))\)/,Le=".",Ze=":",He="class",bf="should_not_match",W=new De;function ff(a,b,c,d){this.w=a||null;this.b=b||null;this.ea=c||[];this.G=null;this.K=d||"";this.a=this.o=this.B=null}function X(a){return a?a.__styleInfo:null}function gf(a,b){return a.__styleInfo=b}ff.prototype.c=function(){return this.w};ff.prototype._getStyleRules=ff.prototype.c;function hf(a){var b=this.matches||this.matchesSelector||this.mozMatchesSelector||this.msMatchesSelector||this.oMatchesSelector||this.webkitMatchesSelector;return b&&b.call(this,a)}var jf=navigator.userAgent.match("Trident");function kf(){}function lf(a){var b={},c=[],d=0;we(a,function(a){mf(a);a.index=d++;a=a.i.cssText;for(var c;c=qe.exec(a);){var e=c[1];":"!==c[2]&&(b[e]=!0)}},function(a){c.push(a)});a.b=c;a=[];for(var e in b)a.push(e);return a}
   function mf(a){if(!a.i){var b={},c={};nf(a,c)&&(b.v=c,a.rules=null);b.cssText=a.parsedCssText.replace(te,"").replace(oe,"");a.i=b}}function nf(a,b){var c=a.i;if(c){if(c.v)return Object.assign(b,c.v),!0}else{c=a.parsedCssText;for(var d;a=oe.exec(c);){d=(a[2]||a[3]).trim();if("inherit"!==d||"unset"!==d)b[a[1].trim()]=d;d=!0}return d}}
   function of(a,b,c){b&&(b=0<=b.indexOf(";")?pf(a,b,c):Be(b,function(b,e,f,h){if(!e)return b+h;(e=of(a,c[e],c))&&"initial"!==e?"apply-shim-inherit"===e&&(e="inherit"):e=of(a,c[f]||f,c)||f;return b+(e||"")+h}));return b&&b.trim()||""}
   function pf(a,b,c){b=b.split(";");for(var d=0,e,f;d<b.length;d++)if(e=b[d]){pe.lastIndex=0;if(f=pe.exec(e))e=of(a,c[f[1]],c);else if(f=e.indexOf(":"),-1!==f){var h=e.substring(f);h=h.trim();h=of(a,h,c)||h;e=e.substring(0,f)+h}b[d]=e&&e.lastIndexOf(";")===e.length-1?e.slice(0,-1):e||""}return b.join(";")}
   function qf(a,b){var c={},d=[];we(a,function(a){a.i||mf(a);var e=a.l||a.parsedSelector;b&&a.i.v&&e&&hf.call(b,e)&&(nf(a,c),a=a.index,e=parseInt(a/32,10),d[e]=(d[e]||0)|1<<a%32)},null,!0);return{v:c,key:d}}
   function rf(a,b,c,d){b.i||mf(b);if(b.i.v){var e=V(a);a=e.is;e=e.K;e=a?Ke(a,e):"html";var f=b.parsedSelector,h=":host > *"===f||"html"===f,g=0===f.indexOf(":host")&&!h;"shady"===c&&(h=f===e+" > *."+e||-1!==f.indexOf("html"),g=!h&&0===f.indexOf(e));"shadow"===c&&(h=":host > *"===f||"html"===f,g=g&&!h);if(h||g)c=e,g&&(b.l||(b.l=Me(W,b,W.b,a?Le+a:"",e)),c=b.l||e),d({Oa:c,Ia:g,gb:h})}}
   function sf(a,b){var c={},d={},e=b&&b.__cssBuild;we(b,function(b){rf(a,b,e,function(e){hf.call(a.g||a,e.Oa)&&(e.Ia?nf(b,c):nf(b,d))})},null,!0);return{Na:d,Ga:c}}
   function tf(a,b,c,d){var e=V(b),f=Ke(e.is,e.K),h=new RegExp("(?:^|[^.#[:])"+(b.extends?"\\"+f.slice(0,-1)+"\\]":f)+"($|[.:[\\s>+~])");e=X(b).w;var g=uf(e,d);return Ie(b,e,function(b){var e="";b.i||mf(b);b.i.cssText&&(e=pf(a,b.i.cssText,c));b.cssText=e;if(!S&&!ye(b)&&b.cssText){var k=e=b.cssText;null==b.ja&&(b.ja=re.test(e));if(b.ja)if(null==b.S){b.S=[];for(var p in g)k=g[p],k=k(e),e!==k&&(e=k,b.S.push(p))}else{for(p=0;p<b.S.length;++p)k=g[b.S[p]],e=k(e);k=e}b.cssText=k;b.l=b.l||b.selector;e="."+d;
   p=b.l.split(",");k=0;for(var y=p.length,D;k<y&&(D=p[k]);k++)p[k]=D.match(h)?D.replace(f,e):e+" "+D;b.selector=p.join(",")}})}function uf(a,b){a=a.b;var c={};if(!S&&a)for(var d=0,e=a[d];d<a.length;e=a[++d]){var f=e,h=b;f.g=new RegExp("\\b"+f.keyframesName+"(?!\\B|-)","g");f.a=f.keyframesName+"-"+h;f.l=f.l||f.selector;f.selector=f.l.replace(f.keyframesName,f.a);c[e.keyframesName]=vf(e)}return c}function vf(a){return function(b){return b.replace(a.g,a.a)}}
   function wf(a,b){var c=xf,d=xe(a);a.textContent=ve(d,function(a){var d=a.cssText=a.parsedCssText;a.i&&a.i.cssText&&(d=d.replace(fe,"").replace(ge,""),a.cssText=pf(c,d,b))})}q.Object.defineProperties(kf.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"x-scope"}}});var xf=new kf;var yf={},zf=window.customElements;if(zf&&!S){var Af=zf.define;zf.define=function(a,b,c){var d=document.createComment(" Shady DOM styles for "+a+" "),e=document.head;e.insertBefore(d,(U?U.nextSibling:null)||e.firstChild);U=d;yf[a]=d;return Af.call(zf,a,b,c)}};function Bf(){this.cache={}}Bf.prototype.store=function(a,b,c,d){var e=this.cache[a]||[];e.push({v:b,styleElement:c,o:d});100<e.length&&e.shift();this.cache[a]=e};Bf.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d],f;a:{for(f=0;f<c.length;f++){var h=c[f];if(e.v[h]!==b[h]){f=!1;break a}}f=!0}if(f)return e}};function Cf(){}
   function Df(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var h=e;var g=[];h.classList?g=Array.from(h.classList):h instanceof window.SVGElement&&h.hasAttribute("class")&&(g=h.getAttribute("class").split(/\s+/));h=g;g=h.indexOf(W.a);if((h=-1<g?h[g+1]:"")&&f===e.ownerDocument)Ee(e,h,!0);else if(f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&
   (f=f.host))if(f=V(f).is,h===f)for(e=window.ShadyDOM.nativeMethods.querySelectorAll.call(e,":not(."+W.a+")"),f=0;f<e.length;f++)Ge(e[f],h);else h&&Ee(e,h,!0),Ee(e,f)}}}}
   if(!S){var Ef=new MutationObserver(Df),Ff=function(a){Ef.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)Ff(document);else{var Gf=function(){Ff(document.body)};window.HTMLImports?window.HTMLImports.whenReady(Gf):requestAnimationFrame(function(){if("loading"===document.readyState){var a=function(){Gf();document.removeEventListener("readystatechange",a)};document.addEventListener("readystatechange",a)}else Gf()})}Cf=function(){Df(Ef.takeRecords())}}
   var Hf=Cf;var If={};var Jf=Promise.resolve();function Kf(a){if(a=If[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function Lf(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}function Mf(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.a||(a.a=!0,Jf.then(function(){a._applyShimCurrentVersion=a._applyShimNextVersion;a.a=!1}))};var Nf=null,Of=window.HTMLImports&&window.HTMLImports.whenReady||null,Pf;function Qf(a){requestAnimationFrame(function(){Of?Of(a):(Nf||(Nf=new Promise(function(a){Pf=a}),"complete"===document.readyState?Pf():document.addEventListener("readystatechange",function(){"complete"===document.readyState&&Pf()})),Nf.then(function(){a&&a()}))})};var Rf=new Bf;function Y(){var a=this;this.H={};this.c=document.documentElement;var b=new Td;b.rules=[];this.g=gf(this.c,new ff(b));this.m=!1;this.b=this.a=null;Qf(function(){Sf(a)})}n=Y.prototype;n.ra=function(){Hf()};n.Ea=function(a){return xe(a)};n.Qa=function(a){return ve(a)};
   n.prepareTemplate=function(a,b,c){if(!a.b){a.b=!0;a.name=b;a.extends=c;If[b]=a;var d=(d=a.content.querySelector("style"))?d.getAttribute("css-build")||"":"";var e=[];for(var f=a.content.querySelectorAll("style"),h=0;h<f.length;h++){var g=f[h];if(g.hasAttribute("shady-unscoped")){if(!S){var k=g.textContent;ue.has(k)||(ue.add(k),k=g.cloneNode(!0),document.head.appendChild(k));g.parentNode.removeChild(g)}}else e.push(g.textContent),g.parentNode.removeChild(g)}e=e.join("").trim();c={is:b,extends:c,Va:d};
   S||Ee(a.content,b);Sf(this);f=pe.test(e)||oe.test(e);pe.lastIndex=0;oe.lastIndex=0;e=Ud(e);f&&T&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.c=d;d=[];T||(d=lf(a._styleAst));if(!d.length||T)e=S?a.content:null,b=yf[b],f=Ie(c,a._styleAst),b=f.length?ze(f,c.is,e,b):void 0,a.ia=b;a.za=d}};
   function Tf(a){!a.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&(a.b=window.ShadyCSS.CustomStyleInterface,a.b.transformCallback=function(b){a.oa(b)},a.b.validateCallback=function(){requestAnimationFrame(function(){(a.b.enqueued||a.m)&&a.D()})})}function Sf(a){!a.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(a.a=window.ShadyCSS.ApplyShim,a.a.invalidCallback=Kf);Tf(a)}
   n.D=function(){Sf(this);if(this.b){var a=this.b.processStyles();if(this.b.enqueued){if(T)for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);if(c&&T&&this.a){var d=xe(c);Sf(this);this.a.transformRules(d);c.textContent=ve(d)}}else for(Uf(this,this.c,this.g),b=0;b<a.length;b++)(c=this.b.getStyleForCustomStyle(a[b]))&&wf(c,this.g.B);this.b.enqueued=!1;this.m&&!T&&this.styleDocument()}}};
   n.styleElement=function(a,b){var c=V(a).is,d=X(a);if(!d){var e=V(a);d=e.is;e=e.K;var f=yf[d];d=If[d];if(d){var h=d._styleAst;var g=d.za}d=gf(a,new ff(h,f,g,e))}a!==this.c&&(this.m=!0);b&&(d.G=d.G||{},Object.assign(d.G,b));if(T){if(d.G){b=d.G;for(var k in b)null===k?a.style.removeProperty(k):a.style.setProperty(k,b[k])}if(((k=If[c])||a===this.c)&&k&&k.ia&&!Lf(k)){if(Lf(k)||k._applyShimValidatingVersion!==k._applyShimNextVersion)Sf(this),this.a&&this.a.transformRules(k._styleAst,c),k.ia.textContent=
   Ie(a,d.w),Mf(k);S&&(c=a.shadowRoot)&&(c.querySelector("style").textContent=Ie(a,d.w));d.w=k._styleAst}}else if(Uf(this,a,d),d.ea&&d.ea.length){c=d;k=V(a).is;d=(b=Rf.fetch(k,c.B,c.ea))?b.styleElement:null;h=c.o;(g=b&&b.o)||(g=this.H[k]=(this.H[k]||0)+1,g=k+"-"+g);c.o=g;g=c.o;e=xf;e=d?d.textContent||"":tf(e,a,c.B,g);f=X(a);var l=f.a;l&&!S&&l!==d&&(l._useCount--,0>=l._useCount&&l.parentNode&&l.parentNode.removeChild(l));S?f.a?(f.a.textContent=e,d=f.a):e&&(d=ze(e,g,a.shadowRoot,f.b)):d?d.parentNode||
   (jf&&-1<e.indexOf("@media")&&(d.textContent=e),Ae(d,null,f.b)):e&&(d=ze(e,g,null,f.b));d&&(d._useCount=d._useCount||0,f.a!=d&&d._useCount++,f.a=d);g=d;S||(d=c.o,f=e=a.getAttribute("class")||"",h&&(f=e.replace(new RegExp("\\s*x-scope\\s*"+h+"\\s*","g")," ")),f+=(f?" ":"")+"x-scope "+d,e!==f&&Ce(a,f));b||Rf.store(k,c.B,g,c.o)}};function Vf(a,b){return(b=b.getRootNode().host)?X(b)?b:Vf(a,b):a.c}
   function Uf(a,b,c){a=Vf(a,b);var d=X(a);a=Object.create(d.B||null);var e=sf(b,c.w);b=qf(d.w,b).v;Object.assign(a,e.Ga,b,e.Na);b=c.G;for(var f in b)if((e=b[f])||0===e)a[f]=e;f=xf;b=Object.getOwnPropertyNames(a);for(e=0;e<b.length;e++)d=b[e],a[d]=of(f,a[d],a);c.B=a}n.styleDocument=function(a){this.styleSubtree(this.c,a)};
   n.styleSubtree=function(a,b){var c=a.shadowRoot;(c||a===this.c)&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};n.oa=function(a){var b=this,c=xe(a);we(c,function(a){if(S)cf(a);else{var c=W;a.selector=a.parsedSelector;cf(a);a.selector=a.l=Me(c,a,c.c,void 0,void 0)}T&&(Sf(b),b.a&&b.a.transformRule(a))});T?a.textContent=ve(c):this.g.w.rules.push(c)};
   n.getComputedStyleValue=function(a,b){var c;T||(c=(X(a)||X(Vf(this,a))).B[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?c.trim():""};n.Pa=function(a,b){var c=a.getRootNode();b=b?b.split(/\s/):[];c=c.host&&c.host.localName;if(!c){var d=a.getAttribute("class");if(d){d=d.split(/\s/);for(var e=0;e<d.length;e++)if(d[e]===W.a){c=d[e+1];break}}}c&&b.push(W.a,c);T||(c=X(a))&&c.o&&b.push(xf.a,c.o);Ce(a,b.join(" "))};n.Aa=function(a){return X(a)};Y.prototype.flush=Y.prototype.ra;
   Y.prototype.prepareTemplate=Y.prototype.prepareTemplate;Y.prototype.styleElement=Y.prototype.styleElement;Y.prototype.styleDocument=Y.prototype.styleDocument;Y.prototype.styleSubtree=Y.prototype.styleSubtree;Y.prototype.getComputedStyleValue=Y.prototype.getComputedStyleValue;Y.prototype.setElementClass=Y.prototype.Pa;Y.prototype._styleInfoForNode=Y.prototype.Aa;Y.prototype.transformCustomStyleForDocument=Y.prototype.oa;Y.prototype.getStyleAst=Y.prototype.Ea;Y.prototype.styleAstToString=Y.prototype.Qa;
   Y.prototype.flushCustomStyles=Y.prototype.D;Object.defineProperties(Y.prototype,{nativeShadow:{get:function(){return S}},nativeCss:{get:function(){return T}}});var Z=new Y,Wf,Xf;window.ShadyCSS&&(Wf=window.ShadyCSS.ApplyShim,Xf=window.ShadyCSS.CustomStyleInterface);window.ShadyCSS={ScopingShim:Z,prepareTemplate:function(a,b,c){Z.D();Z.prepareTemplate(a,b,c)},styleSubtree:function(a,b){Z.D();Z.styleSubtree(a,b)},styleElement:function(a){Z.D();Z.styleElement(a)},styleDocument:function(a){Z.D();Z.styleDocument(a)},getComputedStyleValue:function(a,b){return Z.getComputedStyleValue(a,b)},nativeCss:T,nativeShadow:S};Wf&&(window.ShadyCSS.ApplyShim=Wf);
   Xf&&(window.ShadyCSS.CustomStyleInterface=Xf);/*
   
    Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
   var Yf=window.customElements,Zf=window.HTMLImports,$f=window.HTMLTemplateElement;window.WebComponents=window.WebComponents||{};if(Yf&&Yf.polyfillWrapFlushCallback){var ag,bg=function(){if(ag){$f.Ba&&$f.Ba(window.document);var a=ag;ag=null;a();return!0}},cg=Zf.whenReady;Yf.polyfillWrapFlushCallback(function(a){ag=a;cg(bg)});Zf.whenReady=function(a){cg(function(){bg()?Zf.whenReady(a):a()})}}
   Zf.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})});var dg=document.createElement("style");dg.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var eg=document.querySelector("head");eg.insertBefore(dg,eg.firstChild);}).call(this);
   
   //# sourceMappingURL=webcomponents-hi-sd-ce.js.map
   
(function(undefined) {}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
class Img2 extends HTMLElement {

    constructor() {
        super();

        // Private class variables
        this._root = null;
        this._$img = null;
        this._$preview = null;
        this._preview = null;
        this._src = null;
        this._width = null;
        this._height = null;
        this._reset();

        // Settings
        this._renderOnPreCached = Img2.settings.RENDER_ON_PRECACHED;

        // Bound class methods
        this._precache = this._precache.bind(this);
        this._onImgLoad = this._onImgLoad.bind(this);
        this._onImgPreCached = this._onImgPreCached.bind(this);
    }

    get loaded() {
        return this._loaded;
    }

    /**
     * Reset all private values
     * @private
     */
    _reset() {
        if (this._loaded === true) this.removeAttribute("loaded");
        this._rendered = false;
        this._loading = false;
        this._loaded = false;
        this._preCaching = false;
        this._preCached = false;
    }

    connectedCallback() {

        if (window.ShadyCSS) ShadyCSS.styleElement(this);
        // Override any global settings
        this._renderOnPreCached = this.getAttribute("render-on-pre-cached") === "true";
        this._init();
    }

    _init() {

        // Check to see if we have a src, if not return and do nothing else
        this._src = this.getAttribute("src");
        // Grab the initial attribute values
        this._preview = this.getAttribute("src-preview");
        this._width = this.getAttribute("width");
        this._height = this.getAttribute("height");

        if (!this._src || !this._width || !this._height) return;

        // Set the height and width of the element so that we can figure out if it is on the screen or not
        this.style.width = `${ this._width }px`;
        this.style.height = `${ this._height }px`;

        // Figure out if this image is within view
        Img2.addIntersectListener(this, () => {
            Img2._removePreCacheListener(this._precache);
            this._render();
            this._load();
            Img2.removeIntersectListener(this);
        });

        // Listen for precache instruction
        Img2._addPreCacheListener(this._precache, this._src);
    }

    /**
     * Method which displays the image once ready to be displayed
     * @private
     */
    _load() {
        if (this._preCached === false) Img2._priorityCount += 1;
        this._$img.onload = this._onImgLoad;
        this._loading = true;
        this._$img.src = this._src;
    }

    _onImgLoad() {
        this._loading = false;
        this._loaded = true;
        if (this._$preview !== null) {
            this._root.removeChild(this._$preview);
            this._$preview = null;
        }
        this._$img.onload = null;
        if (this._preCached === false) Img2._priorityCount -= 1;
        this.setAttribute("loaded", "");
    }

    _onImgPreCached() {
        this._preCaching = false;
        this._preCached = true;
        if (this._renderOnPreCached !== false) {
            this._render();
            this._load();
        }
    }

    static get observedAttributes() {
        return ["src", "width", "height", "alt"];
    }
    attributeChangedCallback(name, oldValue, newValue) {

        // If nothing has changed then just return
        if (newValue === oldValue) return;

        switch (name) {
            case "src":
                // If the src is changed then we need to reset and start again
                this._reset();
                this._init();
                break;
            case "width":
                this._width = newValue;
                if (this._$preview !== null) this._$preview.width = this._width;
                if (this._$img !== null) this._$img.width = this._width;
                this.style.width = `${ this._width }px`;
                break;
            case "height":
                this._height = newValue;
                if (this._$preview !== null) this._$preview.height = this._height;
                if (this._$img !== null) this._$img.height = this._height;
                this.style.height = `${ this._height }px`;
                break;
            case "render-on-pre-cached":
                this._renderOnPreCached = !(newValue === "false");
                break;
            case "alt":
                this._updateAttribute("alt", newValue);
                break;
        }
    }

    /** 
     * Method used to update an individual attribute on the native image element
     * @param {string} name - The name of the attribute to update
     * @param {string} value - The new attribute value
     * @private
    */
    _updateAttribute(name, value) {
        // If the image element hasn't been rendered yet, just return.
        if (this._rendered === false) return;
        this._$img.setAttribute(name, value);
    }

    /**
     * Method which renders the DOM elements and displays any preview image
     * @private
     */
    _render() {

        if (this._rendered === true) return;

        // Render the Shadow Root if not done already (src change can force this method to be called again)
        if (this._root === null) {
            // Attach the Shadow Root to the element
            this._root = this.attachShadow({ mode: "open" });
            // Create the initial template with styles
            let $template = document.createElement("template");
            $template.innerHTML = `
                <style>
                    :host {
                        position: relative;
                        overflow: hidden;
                        display: inline-block;
                        outline: none;
                    }
                    img {
                        position: absolute;
                    }
                    img.img2-src {
                        z-index: 1;
                        opacity: 0;
                    }
                    img.img2-preview {
                        z-index: 2;
                        filter: blur(2vw);
                        transform: scale(1.5);
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                    }
                    :host([loaded]) img.img2-src {
                        opacity: 1;
                    }
                </style>
            `;
            if (window.ShadyCSS) ShadyCSS.prepareTemplate($template, "img-2");
            this._root.appendChild(document.importNode($template.content, true));
        }

        // If a preview image has been specified
        if (this._$preview === null && this._preview !== null && this._loaded === false) {
            // Create the element
            this._$preview = document.createElement("img");
            this._$preview.classList.add("img2-preview");
            this._$preview.src = this._preview;
            // Add the specified width and height
            this._$preview.width = this._width;
            this._$preview.height = this._height;
            // Add it to the Shadow Root
            this._root.appendChild(this._$preview);
        }

        // Render the img element if not done already
        if (this._$img === null) {
            // Create the actual image element to be used to display the image
            this._$img = document.createElement("img");
            this._$img.classList.add("img2-src");
            // add the specified width and height to the image element
            this._$img.width = this._width;
            this._$img.height = this._height;
            const alt = this.getAttribute("alt");
            if (alt !== null) this._$img.setAttribute("alt", alt);
            // Add the image to the Shadow Root
            this._root.appendChild(this._$img);
        }

        // Flag as rendered
        this._rendered = true;
    }

    _precache() {
        this._preCaching = true;
        Img2._preCache(this._src, this._onImgPreCached);
    }

    static _addPreCacheListener(cb, url) {
        Img2._preCacheListeners.set(cb, url);
    }

    static _removePreCacheListener(cb) {
        Img2._preCacheListeners.delete(cb);
    }

    static _startPreCache() {
        for (let cb of Img2._preCacheListeners.keys()) cb();
    }

    /**
     * Methods used to determine when currently visible (priority) elements have finished download to then inform other elements to pre-cache
     */

    static get _priorityCount() {
        return Img2.__priorityCount;
    }
    static set _priorityCount(value) {
        Img2.__priorityCount = value;
        if (Img2.__priorityCount < 1) {
            // Inform components that they can start to pre-cache their images
            // Debounce in case the user scrolls because then there will be more priority images
            if (Img2._startPreCacheDebounce !== null) {
                clearTimeout(Img2._startPreCacheDebounce);
                Img2._startPreCacheDebounce = null;
            }
            Img2._startPreCacheDebounce = setTimeout(function () {
                if (Img2.__priorityCount < 1) Img2._startPreCache();
            }, 500);
        }
    }

    /**
     * Methods used to determine when this element is in the visible viewport
     */


    static addIntersectListener($element, intersectCallback) {
        Img2._intersectListeners.set($element, intersectCallback);
        Img2._observer.observe($element);
    }

    static removeIntersectListener($element) {
        if ($element) Img2._observer.unobserve($element);
    }

    static _handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting === true) {
                const cb = Img2._intersectListeners.get(entry.target);
                if (cb !== undefined) cb(entry);
            }
        });
    }

    static _preCache(url, cb) {

        let slot = Img2._preCacheCallbacks[url];
        if (slot === undefined) {
            Img2._preCacheCallbacks[url] = {
                cached: false,
                cbs: [cb]
            };
            const location = url.indexOf("http") > -1 ? url : window.location.href + url;
            Img2._worker.postMessage({ location: location, url: url });
        } else {
            if (slot.cached === true) {
                cb();
            } else {
                slot.cbs.push(cb);
            }
        }
    }
}

/**
 * Methods used to pre-cache images using a WebWorker
 */

Img2._preCacheListeners = new Map();
Img2.__priorityCount = 0;
Img2._startPreCacheDebounce = null;
Img2._intersectListeners = new Map();
Img2._observer = new IntersectionObserver(Img2._handleIntersect, {
    root: null,
    rootMargin: "0px",
    threshold: 0
});
Img2._preCacheCallbacks = {};
Img2._worker = new Worker(window.URL.createObjectURL(new Blob([`self.onmessage=${ function (e) {
    const xhr = new XMLHttpRequest();
    function onload() {
        self.postMessage(e.data.url);
    }
    xhr.responseType = "blob";
    xhr.onload = xhr.onerror = onload;
    xhr.open("GET", e.data.location, true);
    xhr.send();
}.toString() };`], { type: "text/javascript" })));

Img2._worker.onmessage = function (e) {
    const slot = Img2._preCacheCallbacks[e.data];
    if (slot !== undefined) {
        slot.cached = true;
        slot.cbs = slot.cbs.filter(cb => {
            // Call the callback
            cb();
            // Remove the callback
            return false;
        });
    }
};

/** Img2 Settings **/
Img2.settings = {
    "RENDER_ON_PRECACHED": false // Set this to false to save memory but can cause jank during scrolling
};

window.customElements.define("img-2", Img2);
