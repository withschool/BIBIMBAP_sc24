import{R as z,r as y,u as ct,s as ut,a as _e,b as u,j as l,L as mt,I as L,l as $e,m as je}from"./index-e6579e08.js";import{C as X}from"./Highlight-eedb31b7.js";/* empty css                       */import{I as Oe}from"./IconBell-1fdbf761.js";import{I as K}from"./IconCode-1ee24f4a.js";import{I as Le,a as pt}from"./IconGithub-0ee66bcc.js";import{I as Ie}from"./IconLock-3ca50364.js";import{I as ze}from"./IconFacebook-8248d75a.js";import{q as S,_ as F}from"./transition-80f3a448.js";import{$ as R}from"./tabs-1aa6e749.js";import"./keyboard-f5d889b5.js";import"./use-is-mounted-7d7d3758.js";import"./bugs-ce4da728.js";import"./use-resolve-button-type-0cfcefe6.js";function Ae(e){return e!==null&&typeof e=="object"&&"constructor"in e&&e.constructor===Object}function Se(e={},a={}){Object.keys(a).forEach(t=>{typeof e[t]>"u"?e[t]=a[t]:Ae(a[t])&&Ae(e[t])&&Object.keys(a[t]).length>0&&Se(e[t],a[t])})}const He={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createEvent(){return{initEvent(){}}},createElement(){return{children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName(){return[]}}},createElementNS(){return{}},importNode(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function q(){const e=typeof document<"u"?document:{};return Se(e,He),e}const ft={document:He,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle(){return{getPropertyValue(){return""}}},Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia(){return{}},requestAnimationFrame(e){return typeof setTimeout>"u"?(e(),null):setTimeout(e,0)},cancelAnimationFrame(e){typeof setTimeout>"u"||clearTimeout(e)}};function A(){const e=typeof window<"u"?window:{};return Se(e,ft),e}function ht(e){const a=e.__proto__;Object.defineProperty(e,"__proto__",{get(){return a},set(t){a.__proto__=t}})}class Z extends Array{constructor(a){typeof a=="number"?super(a):(super(...a||[]),ht(this))}}function oe(e=[]){const a=[];return e.forEach(t=>{Array.isArray(t)?a.push(...oe(t)):a.push(t)}),a}function Ue(e,a){return Array.prototype.filter.call(e,a)}function vt(e){const a=[];for(let t=0;t<e.length;t+=1)a.indexOf(e[t])===-1&&a.push(e[t]);return a}function bt(e,a){if(typeof e!="string")return[e];const t=[],i=a.querySelectorAll(e);for(let s=0;s<i.length;s+=1)t.push(i[s]);return t}function C(e,a){const t=A(),i=q();let s=[];if(!a&&e instanceof Z)return e;if(!e)return new Z(s);if(typeof e=="string"){const n=e.trim();if(n.indexOf("<")>=0&&n.indexOf(">")>=0){let o="div";n.indexOf("<li")===0&&(o="ul"),n.indexOf("<tr")===0&&(o="tbody"),(n.indexOf("<td")===0||n.indexOf("<th")===0)&&(o="tr"),n.indexOf("<tbody")===0&&(o="table"),n.indexOf("<option")===0&&(o="select");const c=i.createElement(o);c.innerHTML=n;for(let r=0;r<c.childNodes.length;r+=1)s.push(c.childNodes[r])}else s=bt(e.trim(),a||i)}else if(e.nodeType||e===t||e===i)s.push(e);else if(Array.isArray(e)){if(e instanceof Z)return e;s=e}return new Z(vt(s))}C.fn=Z.prototype;function gt(...e){const a=oe(e.map(t=>t.split(" ")));return this.forEach(t=>{t.classList.add(...a)}),this}function yt(...e){const a=oe(e.map(t=>t.split(" ")));return this.forEach(t=>{t.classList.remove(...a)}),this}function xt(...e){const a=oe(e.map(t=>t.split(" ")));this.forEach(t=>{a.forEach(i=>{t.classList.toggle(i)})})}function wt(...e){const a=oe(e.map(t=>t.split(" ")));return Ue(this,t=>a.filter(i=>t.classList.contains(i)).length>0).length>0}function Nt(e,a){if(arguments.length===1&&typeof e=="string")return this[0]?this[0].getAttribute(e):void 0;for(let t=0;t<this.length;t+=1)if(arguments.length===2)this[t].setAttribute(e,a);else for(const i in e)this[t][i]=e[i],this[t].setAttribute(i,e[i]);return this}function Ct(e){for(let a=0;a<this.length;a+=1)this[a].removeAttribute(e);return this}function kt(e){for(let a=0;a<this.length;a+=1)this[a].style.transform=e;return this}function Tt(e){for(let a=0;a<this.length;a+=1)this[a].style.transitionDuration=typeof e!="string"?`${e}ms`:e;return this}function St(...e){let[a,t,i,s]=e;typeof e[1]=="function"&&([a,i,s]=e,t=void 0),s||(s=!1);function n(d){const m=d.target;if(!m)return;const h=d.target.dom7EventData||[];if(h.indexOf(d)<0&&h.unshift(d),C(m).is(t))i.apply(m,h);else{const p=C(m).parents();for(let b=0;b<p.length;b+=1)C(p[b]).is(t)&&i.apply(p[b],h)}}function o(d){const m=d&&d.target?d.target.dom7EventData||[]:[];m.indexOf(d)<0&&m.unshift(d),i.apply(this,m)}const c=a.split(" ");let r;for(let d=0;d<this.length;d+=1){const m=this[d];if(t)for(r=0;r<c.length;r+=1){const h=c[r];m.dom7LiveListeners||(m.dom7LiveListeners={}),m.dom7LiveListeners[h]||(m.dom7LiveListeners[h]=[]),m.dom7LiveListeners[h].push({listener:i,proxyListener:n}),m.addEventListener(h,n,s)}else for(r=0;r<c.length;r+=1){const h=c[r];m.dom7Listeners||(m.dom7Listeners={}),m.dom7Listeners[h]||(m.dom7Listeners[h]=[]),m.dom7Listeners[h].push({listener:i,proxyListener:o}),m.addEventListener(h,o,s)}}return this}function Mt(...e){let[a,t,i,s]=e;typeof e[1]=="function"&&([a,i,s]=e,t=void 0),s||(s=!1);const n=a.split(" ");for(let o=0;o<n.length;o+=1){const c=n[o];for(let r=0;r<this.length;r+=1){const d=this[r];let m;if(!t&&d.dom7Listeners?m=d.dom7Listeners[c]:t&&d.dom7LiveListeners&&(m=d.dom7LiveListeners[c]),m&&m.length)for(let h=m.length-1;h>=0;h-=1){const p=m[h];i&&p.listener===i||i&&p.listener&&p.listener.dom7proxy&&p.listener.dom7proxy===i?(d.removeEventListener(c,p.proxyListener,s),m.splice(h,1)):i||(d.removeEventListener(c,p.proxyListener,s),m.splice(h,1))}}}return this}function Et(...e){const a=A(),t=e[0].split(" "),i=e[1];for(let s=0;s<t.length;s+=1){const n=t[s];for(let o=0;o<this.length;o+=1){const c=this[o];if(a.CustomEvent){const r=new a.CustomEvent(n,{detail:i,bubbles:!0,cancelable:!0});c.dom7EventData=e.filter((d,m)=>m>0),c.dispatchEvent(r),c.dom7EventData=[],delete c.dom7EventData}}}return this}function Ft(e){const a=this;function t(i){i.target===this&&(e.call(this,i),a.off("transitionend",t))}return e&&a.on("transitionend",t),this}function Pt(e){if(this.length>0){if(e){const a=this.styles();return this[0].offsetWidth+parseFloat(a.getPropertyValue("margin-right"))+parseFloat(a.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null}function Dt(e){if(this.length>0){if(e){const a=this.styles();return this[0].offsetHeight+parseFloat(a.getPropertyValue("margin-top"))+parseFloat(a.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null}function _t(){if(this.length>0){const e=A(),a=q(),t=this[0],i=t.getBoundingClientRect(),s=a.body,n=t.clientTop||s.clientTop||0,o=t.clientLeft||s.clientLeft||0,c=t===e?e.scrollY:t.scrollTop,r=t===e?e.scrollX:t.scrollLeft;return{top:i.top+c-n,left:i.left+r-o}}return null}function $t(){const e=A();return this[0]?e.getComputedStyle(this[0],null):{}}function jt(e,a){const t=A();let i;if(arguments.length===1)if(typeof e=="string"){if(this[0])return t.getComputedStyle(this[0],null).getPropertyValue(e)}else{for(i=0;i<this.length;i+=1)for(const s in e)this[i].style[s]=e[s];return this}if(arguments.length===2&&typeof e=="string"){for(i=0;i<this.length;i+=1)this[i].style[e]=a;return this}return this}function Ot(e){return e?(this.forEach((a,t)=>{e.apply(a,[a,t])}),this):this}function Lt(e){const a=Ue(this,e);return C(a)}function It(e){if(typeof e>"u")return this[0]?this[0].innerHTML:null;for(let a=0;a<this.length;a+=1)this[a].innerHTML=e;return this}function zt(e){if(typeof e>"u")return this[0]?this[0].textContent.trim():null;for(let a=0;a<this.length;a+=1)this[a].textContent=e;return this}function At(e){const a=A(),t=q(),i=this[0];let s,n;if(!i||typeof e>"u")return!1;if(typeof e=="string"){if(i.matches)return i.matches(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);for(s=C(e),n=0;n<s.length;n+=1)if(s[n]===i)return!0;return!1}if(e===t)return i===t;if(e===a)return i===a;if(e.nodeType||e instanceof Z){for(s=e.nodeType?[e]:e,n=0;n<s.length;n+=1)if(s[n]===i)return!0;return!1}return!1}function Gt(){let e=this[0],a;if(e){for(a=0;(e=e.previousSibling)!==null;)e.nodeType===1&&(a+=1);return a}}function qt(e){if(typeof e>"u")return this;const a=this.length;if(e>a-1)return C([]);if(e<0){const t=a+e;return t<0?C([]):C([this[t]])}return C([this[e]])}function Vt(...e){let a;const t=q();for(let i=0;i<e.length;i+=1){a=e[i];for(let s=0;s<this.length;s+=1)if(typeof a=="string"){const n=t.createElement("div");for(n.innerHTML=a;n.firstChild;)this[s].appendChild(n.firstChild)}else if(a instanceof Z)for(let n=0;n<a.length;n+=1)this[s].appendChild(a[n]);else this[s].appendChild(a)}return this}function Bt(e){const a=q();let t,i;for(t=0;t<this.length;t+=1)if(typeof e=="string"){const s=a.createElement("div");for(s.innerHTML=e,i=s.childNodes.length-1;i>=0;i-=1)this[t].insertBefore(s.childNodes[i],this[t].childNodes[0])}else if(e instanceof Z)for(i=0;i<e.length;i+=1)this[t].insertBefore(e[i],this[t].childNodes[0]);else this[t].insertBefore(e,this[t].childNodes[0]);return this}function Rt(e){return this.length>0?e?this[0].nextElementSibling&&C(this[0].nextElementSibling).is(e)?C([this[0].nextElementSibling]):C([]):this[0].nextElementSibling?C([this[0].nextElementSibling]):C([]):C([])}function Ht(e){const a=[];let t=this[0];if(!t)return C([]);for(;t.nextElementSibling;){const i=t.nextElementSibling;e?C(i).is(e)&&a.push(i):a.push(i),t=i}return C(a)}function Ut(e){if(this.length>0){const a=this[0];return e?a.previousElementSibling&&C(a.previousElementSibling).is(e)?C([a.previousElementSibling]):C([]):a.previousElementSibling?C([a.previousElementSibling]):C([])}return C([])}function Wt(e){const a=[];let t=this[0];if(!t)return C([]);for(;t.previousElementSibling;){const i=t.previousElementSibling;e?C(i).is(e)&&a.push(i):a.push(i),t=i}return C(a)}function Yt(e){const a=[];for(let t=0;t<this.length;t+=1)this[t].parentNode!==null&&(e?C(this[t].parentNode).is(e)&&a.push(this[t].parentNode):a.push(this[t].parentNode));return C(a)}function Xt(e){const a=[];for(let t=0;t<this.length;t+=1){let i=this[t].parentNode;for(;i;)e?C(i).is(e)&&a.push(i):a.push(i),i=i.parentNode}return C(a)}function Kt(e){let a=this;return typeof e>"u"?C([]):(a.is(e)||(a=a.parents(e).eq(0)),a)}function Zt(e){const a=[];for(let t=0;t<this.length;t+=1){const i=this[t].querySelectorAll(e);for(let s=0;s<i.length;s+=1)a.push(i[s])}return C(a)}function Qt(e){const a=[];for(let t=0;t<this.length;t+=1){const i=this[t].children;for(let s=0;s<i.length;s+=1)(!e||C(i[s]).is(e))&&a.push(i[s])}return C(a)}function Jt(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}const Ge={addClass:gt,removeClass:yt,hasClass:wt,toggleClass:xt,attr:Nt,removeAttr:Ct,transform:kt,transition:Tt,on:St,off:Mt,trigger:Et,transitionEnd:Ft,outerWidth:Pt,outerHeight:Dt,styles:$t,offset:_t,css:jt,each:Ot,html:It,text:zt,is:At,index:Gt,eq:qt,append:Vt,prepend:Bt,next:Rt,nextAll:Ht,prev:Ut,prevAll:Wt,parent:Yt,parents:Xt,closest:Kt,find:Zt,children:Qt,filter:Lt,remove:Jt};Object.keys(Ge).forEach(e=>{Object.defineProperty(C.fn,e,{value:Ge[e],writable:!0})});function ea(e){const a=e;Object.keys(a).forEach(t=>{try{a[t]=null}catch{}try{delete a[t]}catch{}})}function Ce(e,a=0){return setTimeout(e,a)}function re(){return Date.now()}function ta(e){const a=A();let t;return a.getComputedStyle&&(t=a.getComputedStyle(e,null)),!t&&e.currentStyle&&(t=e.currentStyle),t||(t=e.style),t}function aa(e,a="x"){const t=A();let i,s,n;const o=ta(e);return t.WebKitCSSMatrix?(s=o.transform||o.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(c=>c.replace(",",".")).join(", ")),n=new t.WebKitCSSMatrix(s==="none"?"":s)):(n=o.MozTransform||o.OTransform||o.MsTransform||o.msTransform||o.transform||o.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),i=n.toString().split(",")),a==="x"&&(t.WebKitCSSMatrix?s=n.m41:i.length===16?s=parseFloat(i[12]):s=parseFloat(i[4])),a==="y"&&(t.WebKitCSSMatrix?s=n.m42:i.length===16?s=parseFloat(i[13]):s=parseFloat(i[5])),s||0}function ue(e){return typeof e=="object"&&e!==null&&e.constructor&&Object.prototype.toString.call(e).slice(8,-1)==="Object"}function ia(e){return typeof window<"u"&&typeof window.HTMLElement<"u"?e instanceof HTMLElement:e&&(e.nodeType===1||e.nodeType===11)}function V(...e){const a=Object(e[0]),t=["__proto__","constructor","prototype"];for(let i=1;i<e.length;i+=1){const s=e[i];if(s!=null&&!ia(s)){const n=Object.keys(Object(s)).filter(o=>t.indexOf(o)<0);for(let o=0,c=n.length;o<c;o+=1){const r=n[o],d=Object.getOwnPropertyDescriptor(s,r);d!==void 0&&d.enumerable&&(ue(a[r])&&ue(s[r])?s[r].__swiper__?a[r]=s[r]:V(a[r],s[r]):!ue(a[r])&&ue(s[r])?(a[r]={},s[r].__swiper__?a[r]=s[r]:V(a[r],s[r])):a[r]=s[r])}}}return a}function me(e,a,t){e.style.setProperty(a,t)}function We({swiper:e,targetPosition:a,side:t}){const i=A(),s=-e.translate;let n=null,o;const c=e.params.speed;e.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(e.cssModeFrameID);const r=a>s?"next":"prev",d=(h,p)=>r==="next"&&h>=p||r==="prev"&&h<=p,m=()=>{o=new Date().getTime(),n===null&&(n=o);const h=Math.max(Math.min((o-n)/c,1),0),p=.5-Math.cos(h*Math.PI)/2;let b=s+p*(a-s);if(d(b,a)&&(b=a),e.wrapperEl.scrollTo({[t]:b}),d(b,a)){e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout(()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[t]:b})}),i.cancelAnimationFrame(e.cssModeFrameID);return}e.cssModeFrameID=i.requestAnimationFrame(m)};m()}let ge;function sa(){const e=A(),a=q();return{smoothScroll:a.documentElement&&"scrollBehavior"in a.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&a instanceof e.DocumentTouch),passiveListener:function(){let i=!1;try{const s=Object.defineProperty({},"passive",{get(){i=!0}});e.addEventListener("testPassiveListener",null,s)}catch{}return i}(),gestures:function(){return"ongesturestart"in e}()}}function Ye(){return ge||(ge=sa()),ge}let ye;function na({userAgent:e}={}){const a=Ye(),t=A(),i=t.navigator.platform,s=e||t.navigator.userAgent,n={ios:!1,android:!1},o=t.screen.width,c=t.screen.height,r=s.match(/(Android);?[\s\/]+([\d.]+)?/);let d=s.match(/(iPad).*OS\s([\d_]+)/);const m=s.match(/(iPod)(.*OS\s([\d_]+))?/),h=!d&&s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),p=i==="Win32";let b=i==="MacIntel";const x=["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"];return!d&&b&&a.touch&&x.indexOf(`${o}x${c}`)>=0&&(d=s.match(/(Version)\/([\d.]+)/),d||(d=[0,1,"13_0_0"]),b=!1),r&&!p&&(n.os="android",n.android=!0),(d||h||m)&&(n.os="ios",n.ios=!0),n}function la(e={}){return ye||(ye=na(e)),ye}let xe;function ra(){const e=A();function a(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}return{isSafari:a(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}function oa(){return xe||(xe=ra()),xe}function da({swiper:e,on:a,emit:t}){const i=A();let s=null,n=null;const o=()=>{!e||e.destroyed||!e.initialized||(t("beforeResize"),t("resize"))},c=()=>{!e||e.destroyed||!e.initialized||(s=new ResizeObserver(m=>{n=i.requestAnimationFrame(()=>{const{width:h,height:p}=e;let b=h,x=p;m.forEach(({contentBoxSize:f,contentRect:v,target:g})=>{g&&g!==e.el||(b=v?v.width:(f[0]||f).inlineSize,x=v?v.height:(f[0]||f).blockSize)}),(b!==h||x!==p)&&o()})}),s.observe(e.el))},r=()=>{n&&i.cancelAnimationFrame(n),s&&s.unobserve&&e.el&&(s.unobserve(e.el),s=null)},d=()=>{!e||e.destroyed||!e.initialized||t("orientationchange")};a("init",()=>{if(e.params.resizeObserver&&typeof i.ResizeObserver<"u"){c();return}i.addEventListener("resize",o),i.addEventListener("orientationchange",d)}),a("destroy",()=>{r(),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)})}function ca({swiper:e,extendParams:a,on:t,emit:i}){const s=[],n=A(),o=(d,m={})=>{const h=n.MutationObserver||n.WebkitMutationObserver,p=new h(b=>{if(b.length===1){i("observerUpdate",b[0]);return}const x=function(){i("observerUpdate",b[0])};n.requestAnimationFrame?n.requestAnimationFrame(x):n.setTimeout(x,0)});p.observe(d,{attributes:typeof m.attributes>"u"?!0:m.attributes,childList:typeof m.childList>"u"?!0:m.childList,characterData:typeof m.characterData>"u"?!0:m.characterData}),s.push(p)},c=()=>{if(e.params.observer){if(e.params.observeParents){const d=e.$el.parents();for(let m=0;m<d.length;m+=1)o(d[m])}o(e.$el[0],{childList:e.params.observeSlideChildren}),o(e.$wrapperEl[0],{attributes:!1})}},r=()=>{s.forEach(d=>{d.disconnect()}),s.splice(0,s.length)};a({observer:!1,observeParents:!1,observeSlideChildren:!1}),t("init",c),t("destroy",r)}const ua={on(e,a,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof a!="function")return i;const s=t?"unshift":"push";return e.split(" ").forEach(n=>{i.eventsListeners[n]||(i.eventsListeners[n]=[]),i.eventsListeners[n][s](a)}),i},once(e,a,t){const i=this;if(!i.eventsListeners||i.destroyed||typeof a!="function")return i;function s(...n){i.off(e,s),s.__emitterProxy&&delete s.__emitterProxy,a.apply(i,n)}return s.__emitterProxy=a,i.on(e,s,t)},onAny(e,a){const t=this;if(!t.eventsListeners||t.destroyed||typeof e!="function")return t;const i=a?"unshift":"push";return t.eventsAnyListeners.indexOf(e)<0&&t.eventsAnyListeners[i](e),t},offAny(e){const a=this;if(!a.eventsListeners||a.destroyed||!a.eventsAnyListeners)return a;const t=a.eventsAnyListeners.indexOf(e);return t>=0&&a.eventsAnyListeners.splice(t,1),a},off(e,a){const t=this;return!t.eventsListeners||t.destroyed||!t.eventsListeners||e.split(" ").forEach(i=>{typeof a>"u"?t.eventsListeners[i]=[]:t.eventsListeners[i]&&t.eventsListeners[i].forEach((s,n)=>{(s===a||s.__emitterProxy&&s.__emitterProxy===a)&&t.eventsListeners[i].splice(n,1)})}),t},emit(...e){const a=this;if(!a.eventsListeners||a.destroyed||!a.eventsListeners)return a;let t,i,s;return typeof e[0]=="string"||Array.isArray(e[0])?(t=e[0],i=e.slice(1,e.length),s=a):(t=e[0].events,i=e[0].data,s=e[0].context||a),i.unshift(s),(Array.isArray(t)?t:t.split(" ")).forEach(o=>{a.eventsAnyListeners&&a.eventsAnyListeners.length&&a.eventsAnyListeners.forEach(c=>{c.apply(s,[o,...i])}),a.eventsListeners&&a.eventsListeners[o]&&a.eventsListeners[o].forEach(c=>{c.apply(s,i)})}),a}};function ma(){const e=this;let a,t;const i=e.$el;typeof e.params.width<"u"&&e.params.width!==null?a=e.params.width:a=i[0].clientWidth,typeof e.params.height<"u"&&e.params.height!==null?t=e.params.height:t=i[0].clientHeight,!(a===0&&e.isHorizontal()||t===0&&e.isVertical())&&(a=a-parseInt(i.css("padding-left")||0,10)-parseInt(i.css("padding-right")||0,10),t=t-parseInt(i.css("padding-top")||0,10)-parseInt(i.css("padding-bottom")||0,10),Number.isNaN(a)&&(a=0),Number.isNaN(t)&&(t=0),Object.assign(e,{width:a,height:t,size:e.isHorizontal()?a:t}))}function pa(){const e=this;function a(M){return e.isHorizontal()?M:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[M]}function t(M,T){return parseFloat(M.getPropertyValue(a(T))||0)}const i=e.params,{$wrapperEl:s,size:n,rtlTranslate:o,wrongRTL:c}=e,r=e.virtual&&i.virtual.enabled,d=r?e.virtual.slides.length:e.slides.length,m=s.children(`.${e.params.slideClass}`),h=r?e.virtual.slides.length:m.length;let p=[];const b=[],x=[];let f=i.slidesOffsetBefore;typeof f=="function"&&(f=i.slidesOffsetBefore.call(e));let v=i.slidesOffsetAfter;typeof v=="function"&&(v=i.slidesOffsetAfter.call(e));const g=e.snapGrid.length,w=e.slidesGrid.length;let N=i.spaceBetween,E=-f,k=0,_=0;if(typeof n>"u")return;typeof N=="string"&&N.indexOf("%")>=0&&(N=parseFloat(N.replace("%",""))/100*n),e.virtualSize=-N,o?m.css({marginLeft:"",marginBottom:"",marginTop:""}):m.css({marginRight:"",marginBottom:"",marginTop:""}),i.centeredSlides&&i.cssMode&&(me(e.wrapperEl,"--swiper-centered-offset-before",""),me(e.wrapperEl,"--swiper-centered-offset-after",""));const j=i.grid&&i.grid.rows>1&&e.grid;j&&e.grid.initSlides(h);let D;const I=i.slidesPerView==="auto"&&i.breakpoints&&Object.keys(i.breakpoints).filter(M=>typeof i.breakpoints[M].slidesPerView<"u").length>0;for(let M=0;M<h;M+=1){D=0;const T=m.eq(M);if(j&&e.grid.updateSlide(M,T,h,a),T.css("display")!=="none"){if(i.slidesPerView==="auto"){I&&(m[M].style[a("width")]="");const P=getComputedStyle(T[0]),$=T[0].style.transform,H=T[0].style.webkitTransform;if($&&(T[0].style.transform="none"),H&&(T[0].style.webkitTransform="none"),i.roundLengths)D=e.isHorizontal()?T.outerWidth(!0):T.outerHeight(!0);else{const B=t(P,"width"),ae=t(P,"padding-left"),U=t(P,"padding-right"),J=t(P,"margin-left"),O=t(P,"margin-right"),W=P.getPropertyValue("box-sizing");if(W&&W==="border-box")D=B+J+O;else{const{clientWidth:ee,offsetWidth:de}=T[0];D=B+ae+U+J+O+(de-ee)}}$&&(T[0].style.transform=$),H&&(T[0].style.webkitTransform=H),i.roundLengths&&(D=Math.floor(D))}else D=(n-(i.slidesPerView-1)*N)/i.slidesPerView,i.roundLengths&&(D=Math.floor(D)),m[M]&&(m[M].style[a("width")]=`${D}px`);m[M]&&(m[M].swiperSlideSize=D),x.push(D),i.centeredSlides?(E=E+D/2+k/2+N,k===0&&M!==0&&(E=E-n/2-N),M===0&&(E=E-n/2-N),Math.abs(E)<1/1e3&&(E=0),i.roundLengths&&(E=Math.floor(E)),_%i.slidesPerGroup===0&&p.push(E),b.push(E)):(i.roundLengths&&(E=Math.floor(E)),(_-Math.min(e.params.slidesPerGroupSkip,_))%e.params.slidesPerGroup===0&&p.push(E),b.push(E),E=E+D+N),e.virtualSize+=D+N,k=D,_+=1}}if(e.virtualSize=Math.max(e.virtualSize,n)+v,o&&c&&(i.effect==="slide"||i.effect==="coverflow")&&s.css({width:`${e.virtualSize+i.spaceBetween}px`}),i.setWrapperSize&&s.css({[a("width")]:`${e.virtualSize+i.spaceBetween}px`}),j&&e.grid.updateWrapperSize(D,p,a),!i.centeredSlides){const M=[];for(let T=0;T<p.length;T+=1){let P=p[T];i.roundLengths&&(P=Math.floor(P)),p[T]<=e.virtualSize-n&&M.push(P)}p=M,Math.floor(e.virtualSize-n)-Math.floor(p[p.length-1])>1&&p.push(e.virtualSize-n)}if(p.length===0&&(p=[0]),i.spaceBetween!==0){const M=e.isHorizontal()&&o?"marginLeft":a("marginRight");m.filter((T,P)=>i.cssMode?P!==m.length-1:!0).css({[M]:`${N}px`})}if(i.centeredSlides&&i.centeredSlidesBounds){let M=0;x.forEach(P=>{M+=P+(i.spaceBetween?i.spaceBetween:0)}),M-=i.spaceBetween;const T=M-n;p=p.map(P=>P<0?-f:P>T?T+v:P)}if(i.centerInsufficientSlides){let M=0;if(x.forEach(T=>{M+=T+(i.spaceBetween?i.spaceBetween:0)}),M-=i.spaceBetween,M<n){const T=(n-M)/2;p.forEach((P,$)=>{p[$]=P-T}),b.forEach((P,$)=>{b[$]=P+T})}}if(Object.assign(e,{slides:m,snapGrid:p,slidesGrid:b,slidesSizesGrid:x}),i.centeredSlides&&i.cssMode&&!i.centeredSlidesBounds){me(e.wrapperEl,"--swiper-centered-offset-before",`${-p[0]}px`),me(e.wrapperEl,"--swiper-centered-offset-after",`${e.size/2-x[x.length-1]/2}px`);const M=-e.snapGrid[0],T=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map(P=>P+M),e.slidesGrid=e.slidesGrid.map(P=>P+T)}if(h!==d&&e.emit("slidesLengthChange"),p.length!==g&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),b.length!==w&&e.emit("slidesGridLengthChange"),i.watchSlidesProgress&&e.updateSlidesOffset(),!r&&!i.cssMode&&(i.effect==="slide"||i.effect==="fade")){const M=`${i.containerModifierClass}backface-hidden`,T=e.$el.hasClass(M);h<=i.maxBackfaceHiddenSlides?T||e.$el.addClass(M):T&&e.$el.removeClass(M)}}function fa(e){const a=this,t=[],i=a.virtual&&a.params.virtual.enabled;let s=0,n;typeof e=="number"?a.setTransition(e):e===!0&&a.setTransition(a.params.speed);const o=c=>i?a.slides.filter(r=>parseInt(r.getAttribute("data-swiper-slide-index"),10)===c)[0]:a.slides.eq(c)[0];if(a.params.slidesPerView!=="auto"&&a.params.slidesPerView>1)if(a.params.centeredSlides)(a.visibleSlides||C([])).each(c=>{t.push(c)});else for(n=0;n<Math.ceil(a.params.slidesPerView);n+=1){const c=a.activeIndex+n;if(c>a.slides.length&&!i)break;t.push(o(c))}else t.push(o(a.activeIndex));for(n=0;n<t.length;n+=1)if(typeof t[n]<"u"){const c=t[n].offsetHeight;s=c>s?c:s}(s||s===0)&&a.$wrapperEl.css("height",`${s}px`)}function ha(){const e=this,a=e.slides;for(let t=0;t<a.length;t+=1)a[t].swiperSlideOffset=e.isHorizontal()?a[t].offsetLeft:a[t].offsetTop}function va(e=this&&this.translate||0){const a=this,t=a.params,{slides:i,rtlTranslate:s,snapGrid:n}=a;if(i.length===0)return;typeof i[0].swiperSlideOffset>"u"&&a.updateSlidesOffset();let o=-e;s&&(o=e),i.removeClass(t.slideVisibleClass),a.visibleSlidesIndexes=[],a.visibleSlides=[];for(let c=0;c<i.length;c+=1){const r=i[c];let d=r.swiperSlideOffset;t.cssMode&&t.centeredSlides&&(d-=i[0].swiperSlideOffset);const m=(o+(t.centeredSlides?a.minTranslate():0)-d)/(r.swiperSlideSize+t.spaceBetween),h=(o-n[0]+(t.centeredSlides?a.minTranslate():0)-d)/(r.swiperSlideSize+t.spaceBetween),p=-(o-d),b=p+a.slidesSizesGrid[c];(p>=0&&p<a.size-1||b>1&&b<=a.size||p<=0&&b>=a.size)&&(a.visibleSlides.push(r),a.visibleSlidesIndexes.push(c),i.eq(c).addClass(t.slideVisibleClass)),r.progress=s?-m:m,r.originalProgress=s?-h:h}a.visibleSlides=C(a.visibleSlides)}function ba(e){const a=this;if(typeof e>"u"){const d=a.rtlTranslate?-1:1;e=a&&a.translate&&a.translate*d||0}const t=a.params,i=a.maxTranslate()-a.minTranslate();let{progress:s,isBeginning:n,isEnd:o}=a;const c=n,r=o;i===0?(s=0,n=!0,o=!0):(s=(e-a.minTranslate())/i,n=s<=0,o=s>=1),Object.assign(a,{progress:s,isBeginning:n,isEnd:o}),(t.watchSlidesProgress||t.centeredSlides&&t.autoHeight)&&a.updateSlidesProgress(e),n&&!c&&a.emit("reachBeginning toEdge"),o&&!r&&a.emit("reachEnd toEdge"),(c&&!n||r&&!o)&&a.emit("fromEdge"),a.emit("progress",s)}function ga(){const e=this,{slides:a,params:t,$wrapperEl:i,activeIndex:s,realIndex:n}=e,o=e.virtual&&t.virtual.enabled;a.removeClass(`${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ${t.slideDuplicatePrevClass}`);let c;o?c=e.$wrapperEl.find(`.${t.slideClass}[data-swiper-slide-index="${s}"]`):c=a.eq(s),c.addClass(t.slideActiveClass),t.loop&&(c.hasClass(t.slideDuplicateClass)?i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${n}"]`).addClass(t.slideDuplicateActiveClass):i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${n}"]`).addClass(t.slideDuplicateActiveClass));let r=c.nextAll(`.${t.slideClass}`).eq(0).addClass(t.slideNextClass);t.loop&&r.length===0&&(r=a.eq(0),r.addClass(t.slideNextClass));let d=c.prevAll(`.${t.slideClass}`).eq(0).addClass(t.slidePrevClass);t.loop&&d.length===0&&(d=a.eq(-1),d.addClass(t.slidePrevClass)),t.loop&&(r.hasClass(t.slideDuplicateClass)?i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicateNextClass):i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicateNextClass),d.hasClass(t.slideDuplicateClass)?i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicatePrevClass):i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicatePrevClass)),e.emitSlidesClasses()}function ya(e){const a=this,t=a.rtlTranslate?a.translate:-a.translate,{slidesGrid:i,snapGrid:s,params:n,activeIndex:o,realIndex:c,snapIndex:r}=a;let d=e,m;if(typeof d>"u"){for(let p=0;p<i.length;p+=1)typeof i[p+1]<"u"?t>=i[p]&&t<i[p+1]-(i[p+1]-i[p])/2?d=p:t>=i[p]&&t<i[p+1]&&(d=p+1):t>=i[p]&&(d=p);n.normalizeSlideIndex&&(d<0||typeof d>"u")&&(d=0)}if(s.indexOf(t)>=0)m=s.indexOf(t);else{const p=Math.min(n.slidesPerGroupSkip,d);m=p+Math.floor((d-p)/n.slidesPerGroup)}if(m>=s.length&&(m=s.length-1),d===o){m!==r&&(a.snapIndex=m,a.emit("snapIndexChange"));return}const h=parseInt(a.slides.eq(d).attr("data-swiper-slide-index")||d,10);Object.assign(a,{snapIndex:m,realIndex:h,previousIndex:o,activeIndex:d}),a.emit("activeIndexChange"),a.emit("snapIndexChange"),c!==h&&a.emit("realIndexChange"),(a.initialized||a.params.runCallbacksOnInit)&&a.emit("slideChange")}function xa(e){const a=this,t=a.params,i=C(e).closest(`.${t.slideClass}`)[0];let s=!1,n;if(i){for(let o=0;o<a.slides.length;o+=1)if(a.slides[o]===i){s=!0,n=o;break}}if(i&&s)a.clickedSlide=i,a.virtual&&a.params.virtual.enabled?a.clickedIndex=parseInt(C(i).attr("data-swiper-slide-index"),10):a.clickedIndex=n;else{a.clickedSlide=void 0,a.clickedIndex=void 0;return}t.slideToClickedSlide&&a.clickedIndex!==void 0&&a.clickedIndex!==a.activeIndex&&a.slideToClickedSlide()}const wa={updateSize:ma,updateSlides:pa,updateAutoHeight:fa,updateSlidesOffset:ha,updateSlidesProgress:va,updateProgress:ba,updateSlidesClasses:ga,updateActiveIndex:ya,updateClickedSlide:xa};function Na(e=this.isHorizontal()?"x":"y"){const a=this,{params:t,rtlTranslate:i,translate:s,$wrapperEl:n}=a;if(t.virtualTranslate)return i?-s:s;if(t.cssMode)return s;let o=aa(n[0],e);return i&&(o=-o),o||0}function Ca(e,a){const t=this,{rtlTranslate:i,params:s,$wrapperEl:n,wrapperEl:o,progress:c}=t;let r=0,d=0;const m=0;t.isHorizontal()?r=i?-e:e:d=e,s.roundLengths&&(r=Math.floor(r),d=Math.floor(d)),s.cssMode?o[t.isHorizontal()?"scrollLeft":"scrollTop"]=t.isHorizontal()?-r:-d:s.virtualTranslate||n.transform(`translate3d(${r}px, ${d}px, ${m}px)`),t.previousTranslate=t.translate,t.translate=t.isHorizontal()?r:d;let h;const p=t.maxTranslate()-t.minTranslate();p===0?h=0:h=(e-t.minTranslate())/p,h!==c&&t.updateProgress(e),t.emit("setTranslate",t.translate,a)}function ka(){return-this.snapGrid[0]}function Ta(){return-this.snapGrid[this.snapGrid.length-1]}function Sa(e=0,a=this.params.speed,t=!0,i=!0,s){const n=this,{params:o,wrapperEl:c}=n;if(n.animating&&o.preventInteractionOnTransition)return!1;const r=n.minTranslate(),d=n.maxTranslate();let m;if(i&&e>r?m=r:i&&e<d?m=d:m=e,n.updateProgress(m),o.cssMode){const h=n.isHorizontal();if(a===0)c[h?"scrollLeft":"scrollTop"]=-m;else{if(!n.support.smoothScroll)return We({swiper:n,targetPosition:-m,side:h?"left":"top"}),!0;c.scrollTo({[h?"left":"top"]:-m,behavior:"smooth"})}return!0}return a===0?(n.setTransition(0),n.setTranslate(m),t&&(n.emit("beforeTransitionStart",a,s),n.emit("transitionEnd"))):(n.setTransition(a),n.setTranslate(m),t&&(n.emit("beforeTransitionStart",a,s),n.emit("transitionStart")),n.animating||(n.animating=!0,n.onTranslateToWrapperTransitionEnd||(n.onTranslateToWrapperTransitionEnd=function(p){!n||n.destroyed||p.target===this&&(n.$wrapperEl[0].removeEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].removeEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd),n.onTranslateToWrapperTransitionEnd=null,delete n.onTranslateToWrapperTransitionEnd,t&&n.emit("transitionEnd"))}),n.$wrapperEl[0].addEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.$wrapperEl[0].addEventListener("webkitTransitionEnd",n.onTranslateToWrapperTransitionEnd))),!0}const Ma={getTranslate:Na,setTranslate:Ca,minTranslate:ka,maxTranslate:Ta,translateTo:Sa};function Ea(e,a){const t=this;t.params.cssMode||t.$wrapperEl.transition(e),t.emit("setTransition",e,a)}function Xe({swiper:e,runCallbacks:a,direction:t,step:i}){const{activeIndex:s,previousIndex:n}=e;let o=t;if(o||(s>n?o="next":s<n?o="prev":o="reset"),e.emit(`transition${i}`),a&&s!==n){if(o==="reset"){e.emit(`slideResetTransition${i}`);return}e.emit(`slideChangeTransition${i}`),o==="next"?e.emit(`slideNextTransition${i}`):e.emit(`slidePrevTransition${i}`)}}function Fa(e=!0,a){const t=this,{params:i}=t;i.cssMode||(i.autoHeight&&t.updateAutoHeight(),Xe({swiper:t,runCallbacks:e,direction:a,step:"Start"}))}function Pa(e=!0,a){const t=this,{params:i}=t;t.animating=!1,!i.cssMode&&(t.setTransition(0),Xe({swiper:t,runCallbacks:e,direction:a,step:"End"}))}const Da={setTransition:Ea,transitionStart:Fa,transitionEnd:Pa};function _a(e=0,a=this.params.speed,t=!0,i,s){if(typeof e!="number"&&typeof e!="string")throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if(typeof e=="string"){const N=parseInt(e,10);if(!isFinite(N))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=N}const n=this;let o=e;o<0&&(o=0);const{params:c,snapGrid:r,slidesGrid:d,previousIndex:m,activeIndex:h,rtlTranslate:p,wrapperEl:b,enabled:x}=n;if(n.animating&&c.preventInteractionOnTransition||!x&&!i&&!s)return!1;const f=Math.min(n.params.slidesPerGroupSkip,o);let v=f+Math.floor((o-f)/n.params.slidesPerGroup);v>=r.length&&(v=r.length-1);const g=-r[v];if(c.normalizeSlideIndex)for(let N=0;N<d.length;N+=1){const E=-Math.floor(g*100),k=Math.floor(d[N]*100),_=Math.floor(d[N+1]*100);typeof d[N+1]<"u"?E>=k&&E<_-(_-k)/2?o=N:E>=k&&E<_&&(o=N+1):E>=k&&(o=N)}if(n.initialized&&o!==h&&(!n.allowSlideNext&&g<n.translate&&g<n.minTranslate()||!n.allowSlidePrev&&g>n.translate&&g>n.maxTranslate()&&(h||0)!==o))return!1;o!==(m||0)&&t&&n.emit("beforeSlideChangeStart"),n.updateProgress(g);let w;if(o>h?w="next":o<h?w="prev":w="reset",p&&-g===n.translate||!p&&g===n.translate)return n.updateActiveIndex(o),c.autoHeight&&n.updateAutoHeight(),n.updateSlidesClasses(),c.effect!=="slide"&&n.setTranslate(g),w!=="reset"&&(n.transitionStart(t,w),n.transitionEnd(t,w)),!1;if(c.cssMode){const N=n.isHorizontal(),E=p?g:-g;if(a===0){const k=n.virtual&&n.params.virtual.enabled;k&&(n.wrapperEl.style.scrollSnapType="none",n._immediateVirtual=!0),b[N?"scrollLeft":"scrollTop"]=E,k&&requestAnimationFrame(()=>{n.wrapperEl.style.scrollSnapType="",n._swiperImmediateVirtual=!1})}else{if(!n.support.smoothScroll)return We({swiper:n,targetPosition:E,side:N?"left":"top"}),!0;b.scrollTo({[N?"left":"top"]:E,behavior:"smooth"})}return!0}return n.setTransition(a),n.setTranslate(g),n.updateActiveIndex(o),n.updateSlidesClasses(),n.emit("beforeTransitionStart",a,i),n.transitionStart(t,w),a===0?n.transitionEnd(t,w):n.animating||(n.animating=!0,n.onSlideToWrapperTransitionEnd||(n.onSlideToWrapperTransitionEnd=function(E){!n||n.destroyed||E.target===this&&(n.$wrapperEl[0].removeEventListener("transitionend",n.onSlideToWrapperTransitionEnd),n.$wrapperEl[0].removeEventListener("webkitTransitionEnd",n.onSlideToWrapperTransitionEnd),n.onSlideToWrapperTransitionEnd=null,delete n.onSlideToWrapperTransitionEnd,n.transitionEnd(t,w))}),n.$wrapperEl[0].addEventListener("transitionend",n.onSlideToWrapperTransitionEnd),n.$wrapperEl[0].addEventListener("webkitTransitionEnd",n.onSlideToWrapperTransitionEnd)),!0}function $a(e=0,a=this.params.speed,t=!0,i){if(typeof e=="string"){const o=parseInt(e,10);if(!isFinite(o))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=o}const s=this;let n=e;return s.params.loop&&(n+=s.loopedSlides),s.slideTo(n,a,t,i)}function ja(e=this.params.speed,a=!0,t){const i=this,{animating:s,enabled:n,params:o}=i;if(!n)return i;let c=o.slidesPerGroup;o.slidesPerView==="auto"&&o.slidesPerGroup===1&&o.slidesPerGroupAuto&&(c=Math.max(i.slidesPerViewDynamic("current",!0),1));const r=i.activeIndex<o.slidesPerGroupSkip?1:c;if(o.loop){if(s&&o.loopPreventsSlide)return!1;i.loopFix(),i._clientLeft=i.$wrapperEl[0].clientLeft}return o.rewind&&i.isEnd?i.slideTo(0,e,a,t):i.slideTo(i.activeIndex+r,e,a,t)}function Oa(e=this.params.speed,a=!0,t){const i=this,{params:s,animating:n,snapGrid:o,slidesGrid:c,rtlTranslate:r,enabled:d}=i;if(!d)return i;if(s.loop){if(n&&s.loopPreventsSlide)return!1;i.loopFix(),i._clientLeft=i.$wrapperEl[0].clientLeft}const m=r?i.translate:-i.translate;function h(v){return v<0?-Math.floor(Math.abs(v)):Math.floor(v)}const p=h(m),b=o.map(v=>h(v));let x=o[b.indexOf(p)-1];if(typeof x>"u"&&s.cssMode){let v;o.forEach((g,w)=>{p>=g&&(v=w)}),typeof v<"u"&&(x=o[v>0?v-1:v])}let f=0;if(typeof x<"u"&&(f=c.indexOf(x),f<0&&(f=i.activeIndex-1),s.slidesPerView==="auto"&&s.slidesPerGroup===1&&s.slidesPerGroupAuto&&(f=f-i.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),s.rewind&&i.isBeginning){const v=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1;return i.slideTo(v,e,a,t)}return i.slideTo(f,e,a,t)}function La(e=this.params.speed,a=!0,t){const i=this;return i.slideTo(i.activeIndex,e,a,t)}function Ia(e=this.params.speed,a=!0,t,i=.5){const s=this;let n=s.activeIndex;const o=Math.min(s.params.slidesPerGroupSkip,n),c=o+Math.floor((n-o)/s.params.slidesPerGroup),r=s.rtlTranslate?s.translate:-s.translate;if(r>=s.snapGrid[c]){const d=s.snapGrid[c],m=s.snapGrid[c+1];r-d>(m-d)*i&&(n+=s.params.slidesPerGroup)}else{const d=s.snapGrid[c-1],m=s.snapGrid[c];r-d<=(m-d)*i&&(n-=s.params.slidesPerGroup)}return n=Math.max(n,0),n=Math.min(n,s.slidesGrid.length-1),s.slideTo(n,e,a,t)}function za(){const e=this,{params:a,$wrapperEl:t}=e,i=a.slidesPerView==="auto"?e.slidesPerViewDynamic():a.slidesPerView;let s=e.clickedIndex,n;if(a.loop){if(e.animating)return;n=parseInt(C(e.clickedSlide).attr("data-swiper-slide-index"),10),a.centeredSlides?s<e.loopedSlides-i/2||s>e.slides.length-e.loopedSlides+i/2?(e.loopFix(),s=t.children(`.${a.slideClass}[data-swiper-slide-index="${n}"]:not(.${a.slideDuplicateClass})`).eq(0).index(),Ce(()=>{e.slideTo(s)})):e.slideTo(s):s>e.slides.length-i?(e.loopFix(),s=t.children(`.${a.slideClass}[data-swiper-slide-index="${n}"]:not(.${a.slideDuplicateClass})`).eq(0).index(),Ce(()=>{e.slideTo(s)})):e.slideTo(s)}else e.slideTo(s)}const Aa={slideTo:_a,slideToLoop:$a,slideNext:ja,slidePrev:Oa,slideReset:La,slideToClosest:Ia,slideToClickedSlide:za};function Ga(){const e=this,a=q(),{params:t,$wrapperEl:i}=e,s=i.children().length>0?C(i.children()[0].parentNode):i;s.children(`.${t.slideClass}.${t.slideDuplicateClass}`).remove();let n=s.children(`.${t.slideClass}`);if(t.loopFillGroupWithBlank){const r=t.slidesPerGroup-n.length%t.slidesPerGroup;if(r!==t.slidesPerGroup){for(let d=0;d<r;d+=1){const m=C(a.createElement("div")).addClass(`${t.slideClass} ${t.slideBlankClass}`);s.append(m)}n=s.children(`.${t.slideClass}`)}}t.slidesPerView==="auto"&&!t.loopedSlides&&(t.loopedSlides=n.length),e.loopedSlides=Math.ceil(parseFloat(t.loopedSlides||t.slidesPerView,10)),e.loopedSlides+=t.loopAdditionalSlides,e.loopedSlides>n.length&&e.params.loopedSlidesLimit&&(e.loopedSlides=n.length);const o=[],c=[];n.each((r,d)=>{C(r).attr("data-swiper-slide-index",d)});for(let r=0;r<e.loopedSlides;r+=1){const d=r-Math.floor(r/n.length)*n.length;c.push(n.eq(d)[0]),o.unshift(n.eq(n.length-d-1)[0])}for(let r=0;r<c.length;r+=1)s.append(C(c[r].cloneNode(!0)).addClass(t.slideDuplicateClass));for(let r=o.length-1;r>=0;r-=1)s.prepend(C(o[r].cloneNode(!0)).addClass(t.slideDuplicateClass))}function qa(){const e=this;e.emit("beforeLoopFix");const{activeIndex:a,slides:t,loopedSlides:i,allowSlidePrev:s,allowSlideNext:n,snapGrid:o,rtlTranslate:c}=e;let r;e.allowSlidePrev=!0,e.allowSlideNext=!0;const m=-o[a]-e.getTranslate();a<i?(r=t.length-i*3+a,r+=i,e.slideTo(r,0,!1,!0)&&m!==0&&e.setTranslate((c?-e.translate:e.translate)-m)):a>=t.length-i&&(r=-t.length+a+i,r+=i,e.slideTo(r,0,!1,!0)&&m!==0&&e.setTranslate((c?-e.translate:e.translate)-m)),e.allowSlidePrev=s,e.allowSlideNext=n,e.emit("loopFix")}function Va(){const e=this,{$wrapperEl:a,params:t,slides:i}=e;a.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),i.removeAttr("data-swiper-slide-index")}const Ba={loopCreate:Ga,loopFix:qa,loopDestroy:Va};function Ra(e){const a=this;if(a.support.touch||!a.params.simulateTouch||a.params.watchOverflow&&a.isLocked||a.params.cssMode)return;const t=a.params.touchEventsTarget==="container"?a.el:a.wrapperEl;t.style.cursor="move",t.style.cursor=e?"grabbing":"grab"}function Ha(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e[e.params.touchEventsTarget==="container"?"el":"wrapperEl"].style.cursor="")}const Ua={setGrabCursor:Ra,unsetGrabCursor:Ha};function Wa(e,a=this){function t(i){if(!i||i===q()||i===A())return null;i.assignedSlot&&(i=i.assignedSlot);const s=i.closest(e);return!s&&!i.getRootNode?null:s||t(i.getRootNode().host)}return t(a)}function Ya(e){const a=this,t=q(),i=A(),s=a.touchEventsData,{params:n,touches:o,enabled:c}=a;if(!c||a.animating&&n.preventInteractionOnTransition)return;!a.animating&&n.cssMode&&n.loop&&a.loopFix();let r=e;r.originalEvent&&(r=r.originalEvent);let d=C(r.target);if(n.touchEventsTarget==="wrapper"&&!d.closest(a.wrapperEl).length||(s.isTouchEvent=r.type==="touchstart",!s.isTouchEvent&&"which"in r&&r.which===3)||!s.isTouchEvent&&"button"in r&&r.button>0||s.isTouched&&s.isMoved)return;const m=!!n.noSwipingClass&&n.noSwipingClass!=="",h=e.composedPath?e.composedPath():e.path;m&&r.target&&r.target.shadowRoot&&h&&(d=C(h[0]));const p=n.noSwipingSelector?n.noSwipingSelector:`.${n.noSwipingClass}`,b=!!(r.target&&r.target.shadowRoot);if(n.noSwiping&&(b?Wa(p,d[0]):d.closest(p)[0])){a.allowClick=!0;return}if(n.swipeHandler&&!d.closest(n.swipeHandler)[0])return;o.currentX=r.type==="touchstart"?r.targetTouches[0].pageX:r.pageX,o.currentY=r.type==="touchstart"?r.targetTouches[0].pageY:r.pageY;const x=o.currentX,f=o.currentY,v=n.edgeSwipeDetection||n.iOSEdgeSwipeDetection,g=n.edgeSwipeThreshold||n.iOSEdgeSwipeThreshold;if(v&&(x<=g||x>=i.innerWidth-g))if(v==="prevent")e.preventDefault();else return;if(Object.assign(s,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=x,o.startY=f,s.touchStartTime=re(),a.allowClick=!0,a.updateSize(),a.swipeDirection=void 0,n.threshold>0&&(s.allowThresholdMove=!1),r.type!=="touchstart"){let w=!0;d.is(s.focusableElements)&&(w=!1,d[0].nodeName==="SELECT"&&(s.isTouched=!1)),t.activeElement&&C(t.activeElement).is(s.focusableElements)&&t.activeElement!==d[0]&&t.activeElement.blur();const N=w&&a.allowTouchMove&&n.touchStartPreventDefault;(n.touchStartForcePreventDefault||N)&&!d[0].isContentEditable&&r.preventDefault()}a.params.freeMode&&a.params.freeMode.enabled&&a.freeMode&&a.animating&&!n.cssMode&&a.freeMode.onTouchStart(),a.emit("touchStart",r)}function Xa(e){const a=q(),t=this,i=t.touchEventsData,{params:s,touches:n,rtlTranslate:o,enabled:c}=t;if(!c)return;let r=e;if(r.originalEvent&&(r=r.originalEvent),!i.isTouched){i.startMoving&&i.isScrolling&&t.emit("touchMoveOpposite",r);return}if(i.isTouchEvent&&r.type!=="touchmove")return;const d=r.type==="touchmove"&&r.targetTouches&&(r.targetTouches[0]||r.changedTouches[0]),m=r.type==="touchmove"?d.pageX:r.pageX,h=r.type==="touchmove"?d.pageY:r.pageY;if(r.preventedByNestedSwiper){n.startX=m,n.startY=h;return}if(!t.allowTouchMove){C(r.target).is(i.focusableElements)||(t.allowClick=!1),i.isTouched&&(Object.assign(n,{startX:m,startY:h,currentX:m,currentY:h}),i.touchStartTime=re());return}if(i.isTouchEvent&&s.touchReleaseOnEdges&&!s.loop){if(t.isVertical()){if(h<n.startY&&t.translate<=t.maxTranslate()||h>n.startY&&t.translate>=t.minTranslate()){i.isTouched=!1,i.isMoved=!1;return}}else if(m<n.startX&&t.translate<=t.maxTranslate()||m>n.startX&&t.translate>=t.minTranslate())return}if(i.isTouchEvent&&a.activeElement&&r.target===a.activeElement&&C(r.target).is(i.focusableElements)){i.isMoved=!0,t.allowClick=!1;return}if(i.allowTouchCallbacks&&t.emit("touchMove",r),r.targetTouches&&r.targetTouches.length>1)return;n.currentX=m,n.currentY=h;const p=n.currentX-n.startX,b=n.currentY-n.startY;if(t.params.threshold&&Math.sqrt(p**2+b**2)<t.params.threshold)return;if(typeof i.isScrolling>"u"){let g;t.isHorizontal()&&n.currentY===n.startY||t.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:p*p+b*b>=25&&(g=Math.atan2(Math.abs(b),Math.abs(p))*180/Math.PI,i.isScrolling=t.isHorizontal()?g>s.touchAngle:90-g>s.touchAngle)}if(i.isScrolling&&t.emit("touchMoveOpposite",r),typeof i.startMoving>"u"&&(n.currentX!==n.startX||n.currentY!==n.startY)&&(i.startMoving=!0),i.isScrolling){i.isTouched=!1;return}if(!i.startMoving)return;t.allowClick=!1,!s.cssMode&&r.cancelable&&r.preventDefault(),s.touchMoveStopPropagation&&!s.nested&&r.stopPropagation(),i.isMoved||(s.loop&&!s.cssMode&&t.loopFix(),i.startTranslate=t.getTranslate(),t.setTransition(0),t.animating&&t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,s.grabCursor&&(t.allowSlideNext===!0||t.allowSlidePrev===!0)&&t.setGrabCursor(!0),t.emit("sliderFirstMove",r)),t.emit("sliderMove",r),i.isMoved=!0;let x=t.isHorizontal()?p:b;n.diff=x,x*=s.touchRatio,o&&(x=-x),t.swipeDirection=x>0?"prev":"next",i.currentTranslate=x+i.startTranslate;let f=!0,v=s.resistanceRatio;if(s.touchReleaseOnEdges&&(v=0),x>0&&i.currentTranslate>t.minTranslate()?(f=!1,s.resistance&&(i.currentTranslate=t.minTranslate()-1+(-t.minTranslate()+i.startTranslate+x)**v)):x<0&&i.currentTranslate<t.maxTranslate()&&(f=!1,s.resistance&&(i.currentTranslate=t.maxTranslate()+1-(t.maxTranslate()-i.startTranslate-x)**v)),f&&(r.preventedByNestedSwiper=!0),!t.allowSlideNext&&t.swipeDirection==="next"&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&t.swipeDirection==="prev"&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),!t.allowSlidePrev&&!t.allowSlideNext&&(i.currentTranslate=i.startTranslate),s.threshold>0)if(Math.abs(x)>s.threshold||i.allowThresholdMove){if(!i.allowThresholdMove){i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,n.diff=t.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY;return}}else{i.currentTranslate=i.startTranslate;return}!s.followFinger||s.cssMode||((s.freeMode&&s.freeMode.enabled&&t.freeMode||s.watchSlidesProgress)&&(t.updateActiveIndex(),t.updateSlidesClasses()),t.params.freeMode&&s.freeMode.enabled&&t.freeMode&&t.freeMode.onTouchMove(),t.updateProgress(i.currentTranslate),t.setTranslate(i.currentTranslate))}function Ka(e){const a=this,t=a.touchEventsData,{params:i,touches:s,rtlTranslate:n,slidesGrid:o,enabled:c}=a;if(!c)return;let r=e;if(r.originalEvent&&(r=r.originalEvent),t.allowTouchCallbacks&&a.emit("touchEnd",r),t.allowTouchCallbacks=!1,!t.isTouched){t.isMoved&&i.grabCursor&&a.setGrabCursor(!1),t.isMoved=!1,t.startMoving=!1;return}i.grabCursor&&t.isMoved&&t.isTouched&&(a.allowSlideNext===!0||a.allowSlidePrev===!0)&&a.setGrabCursor(!1);const d=re(),m=d-t.touchStartTime;if(a.allowClick){const w=r.path||r.composedPath&&r.composedPath();a.updateClickedSlide(w&&w[0]||r.target),a.emit("tap click",r),m<300&&d-t.lastClickTime<300&&a.emit("doubleTap doubleClick",r)}if(t.lastClickTime=re(),Ce(()=>{a.destroyed||(a.allowClick=!0)}),!t.isTouched||!t.isMoved||!a.swipeDirection||s.diff===0||t.currentTranslate===t.startTranslate){t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;return}t.isTouched=!1,t.isMoved=!1,t.startMoving=!1;let h;if(i.followFinger?h=n?a.translate:-a.translate:h=-t.currentTranslate,i.cssMode)return;if(a.params.freeMode&&i.freeMode.enabled){a.freeMode.onTouchEnd({currentPos:h});return}let p=0,b=a.slidesSizesGrid[0];for(let w=0;w<o.length;w+=w<i.slidesPerGroupSkip?1:i.slidesPerGroup){const N=w<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;typeof o[w+N]<"u"?h>=o[w]&&h<o[w+N]&&(p=w,b=o[w+N]-o[w]):h>=o[w]&&(p=w,b=o[o.length-1]-o[o.length-2])}let x=null,f=null;i.rewind&&(a.isBeginning?f=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1:a.isEnd&&(x=0));const v=(h-o[p])/b,g=p<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;if(m>i.longSwipesMs){if(!i.longSwipes){a.slideTo(a.activeIndex);return}a.swipeDirection==="next"&&(v>=i.longSwipesRatio?a.slideTo(i.rewind&&a.isEnd?x:p+g):a.slideTo(p)),a.swipeDirection==="prev"&&(v>1-i.longSwipesRatio?a.slideTo(p+g):f!==null&&v<0&&Math.abs(v)>i.longSwipesRatio?a.slideTo(f):a.slideTo(p))}else{if(!i.shortSwipes){a.slideTo(a.activeIndex);return}a.navigation&&(r.target===a.navigation.nextEl||r.target===a.navigation.prevEl)?r.target===a.navigation.nextEl?a.slideTo(p+g):a.slideTo(p):(a.swipeDirection==="next"&&a.slideTo(x!==null?x:p+g),a.swipeDirection==="prev"&&a.slideTo(f!==null?f:p))}}function qe(){const e=this,{params:a,el:t}=e;if(t&&t.offsetWidth===0)return;a.breakpoints&&e.setBreakpoint();const{allowSlideNext:i,allowSlidePrev:s,snapGrid:n}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),(a.slidesPerView==="auto"||a.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=s,e.allowSlideNext=i,e.params.watchOverflow&&n!==e.snapGrid&&e.checkOverflow()}function Za(e){const a=this;a.enabled&&(a.allowClick||(a.params.preventClicks&&e.preventDefault(),a.params.preventClicksPropagation&&a.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function Qa(){const e=this,{wrapperEl:a,rtlTranslate:t,enabled:i}=e;if(!i)return;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-a.scrollLeft:e.translate=-a.scrollTop,e.translate===0&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();let s;const n=e.maxTranslate()-e.minTranslate();n===0?s=0:s=(e.translate-e.minTranslate())/n,s!==e.progress&&e.updateProgress(t?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let Ve=!1;function Ja(){}const Ke=(e,a)=>{const t=q(),{params:i,touchEvents:s,el:n,wrapperEl:o,device:c,support:r}=e,d=!!i.nested,m=a==="on"?"addEventListener":"removeEventListener",h=a;if(!r.touch)n[m](s.start,e.onTouchStart,!1),t[m](s.move,e.onTouchMove,d),t[m](s.end,e.onTouchEnd,!1);else{const p=s.start==="touchstart"&&r.passiveListener&&i.passiveListeners?{passive:!0,capture:!1}:!1;n[m](s.start,e.onTouchStart,p),n[m](s.move,e.onTouchMove,r.passiveListener?{passive:!1,capture:d}:d),n[m](s.end,e.onTouchEnd,p),s.cancel&&n[m](s.cancel,e.onTouchEnd,p)}(i.preventClicks||i.preventClicksPropagation)&&n[m]("click",e.onClick,!0),i.cssMode&&o[m]("scroll",e.onScroll),i.updateOnWindowResize?e[h](c.ios||c.android?"resize orientationchange observerUpdate":"resize observerUpdate",qe,!0):e[h]("observerUpdate",qe,!0)};function ei(){const e=this,a=q(),{params:t,support:i}=e;e.onTouchStart=Ya.bind(e),e.onTouchMove=Xa.bind(e),e.onTouchEnd=Ka.bind(e),t.cssMode&&(e.onScroll=Qa.bind(e)),e.onClick=Za.bind(e),i.touch&&!Ve&&(a.addEventListener("touchstart",Ja),Ve=!0),Ke(e,"on")}function ti(){Ke(this,"off")}const ai={attachEvents:ei,detachEvents:ti},Be=(e,a)=>e.grid&&a.grid&&a.grid.rows>1;function ii(){const e=this,{activeIndex:a,initialized:t,loopedSlides:i=0,params:s,$el:n}=e,o=s.breakpoints;if(!o||o&&Object.keys(o).length===0)return;const c=e.getBreakpoint(o,e.params.breakpointsBase,e.el);if(!c||e.currentBreakpoint===c)return;const d=(c in o?o[c]:void 0)||e.originalParams,m=Be(e,s),h=Be(e,d),p=s.enabled;m&&!h?(n.removeClass(`${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`),e.emitContainerClasses()):!m&&h&&(n.addClass(`${s.containerModifierClass}grid`),(d.grid.fill&&d.grid.fill==="column"||!d.grid.fill&&s.grid.fill==="column")&&n.addClass(`${s.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach(v=>{const g=s[v]&&s[v].enabled,w=d[v]&&d[v].enabled;g&&!w&&e[v].disable(),!g&&w&&e[v].enable()});const b=d.direction&&d.direction!==s.direction,x=s.loop&&(d.slidesPerView!==s.slidesPerView||b);b&&t&&e.changeDirection(),V(e.params,d);const f=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!f?e.disable():!p&&f&&e.enable(),e.currentBreakpoint=c,e.emit("_beforeBreakpoint",d),x&&t&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(a-i+e.loopedSlides,0,!1)),e.emit("breakpoint",d)}function si(e,a="window",t){if(!e||a==="container"&&!t)return;let i=!1;const s=A(),n=a==="window"?s.innerHeight:t.clientHeight,o=Object.keys(e).map(c=>{if(typeof c=="string"&&c.indexOf("@")===0){const r=parseFloat(c.substr(1));return{value:n*r,point:c}}return{value:c,point:c}});o.sort((c,r)=>parseInt(c.value,10)-parseInt(r.value,10));for(let c=0;c<o.length;c+=1){const{point:r,value:d}=o[c];a==="window"?s.matchMedia(`(min-width: ${d}px)`).matches&&(i=r):d<=t.clientWidth&&(i=r)}return i||"max"}const ni={setBreakpoint:ii,getBreakpoint:si};function li(e,a){const t=[];return e.forEach(i=>{typeof i=="object"?Object.keys(i).forEach(s=>{i[s]&&t.push(a+s)}):typeof i=="string"&&t.push(a+i)}),t}function ri(){const e=this,{classNames:a,params:t,rtl:i,$el:s,device:n,support:o}=e,c=li(["initialized",t.direction,{"pointer-events":!o.touch},{"free-mode":e.params.freeMode&&t.freeMode.enabled},{autoheight:t.autoHeight},{rtl:i},{grid:t.grid&&t.grid.rows>1},{"grid-column":t.grid&&t.grid.rows>1&&t.grid.fill==="column"},{android:n.android},{ios:n.ios},{"css-mode":t.cssMode},{centered:t.cssMode&&t.centeredSlides},{"watch-progress":t.watchSlidesProgress}],t.containerModifierClass);a.push(...c),s.addClass([...a].join(" ")),e.emitContainerClasses()}function oi(){const e=this,{$el:a,classNames:t}=e;a.removeClass(t.join(" ")),e.emitContainerClasses()}const di={addClasses:ri,removeClasses:oi};function ci(e,a,t,i,s,n){const o=A();let c;function r(){n&&n()}!C(e).parent("picture")[0]&&(!e.complete||!s)&&a?(c=new o.Image,c.onload=r,c.onerror=r,i&&(c.sizes=i),t&&(c.srcset=t),a&&(c.src=a)):r()}function ui(){const e=this;e.imagesToLoad=e.$el.find("img");function a(){typeof e>"u"||e===null||!e||e.destroyed||(e.imagesLoaded!==void 0&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}for(let t=0;t<e.imagesToLoad.length;t+=1){const i=e.imagesToLoad[t];e.loadImage(i,i.currentSrc||i.getAttribute("src"),i.srcset||i.getAttribute("srcset"),i.sizes||i.getAttribute("sizes"),!0,a)}}const mi={loadImage:ci,preloadImages:ui};function pi(){const e=this,{isLocked:a,params:t}=e,{slidesOffsetBefore:i}=t;if(i){const s=e.slides.length-1,n=e.slidesGrid[s]+e.slidesSizesGrid[s]+i*2;e.isLocked=e.size>n}else e.isLocked=e.snapGrid.length===1;t.allowSlideNext===!0&&(e.allowSlideNext=!e.isLocked),t.allowSlidePrev===!0&&(e.allowSlidePrev=!e.isLocked),a&&a!==e.isLocked&&(e.isEnd=!1),a!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}const fi={checkOverflow:pi},Re={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopedSlidesLimit:!0,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function hi(e,a){return function(i={}){const s=Object.keys(i)[0],n=i[s];if(typeof n!="object"||n===null){V(a,i);return}if(["navigation","pagination","scrollbar"].indexOf(s)>=0&&e[s]===!0&&(e[s]={auto:!0}),!(s in e&&"enabled"in n)){V(a,i);return}e[s]===!0&&(e[s]={enabled:!0}),typeof e[s]=="object"&&!("enabled"in e[s])&&(e[s].enabled=!0),e[s]||(e[s]={enabled:!1}),V(a,i)}}const we={eventsEmitter:ua,update:wa,translate:Ma,transition:Da,slide:Aa,loop:Ba,grabCursor:Ua,events:ai,breakpoints:ni,checkOverflow:fi,classes:di,images:mi},Ne={};let se=class Y{constructor(...a){let t,i;if(a.length===1&&a[0].constructor&&Object.prototype.toString.call(a[0]).slice(8,-1)==="Object"?i=a[0]:[t,i]=a,i||(i={}),i=V({},i),t&&!i.el&&(i.el=t),i.el&&C(i.el).length>1){const c=[];return C(i.el).each(r=>{const d=V({},i,{el:r});c.push(new Y(d))}),c}const s=this;s.__swiper__=!0,s.support=Ye(),s.device=la({userAgent:i.userAgent}),s.browser=oa(),s.eventsListeners={},s.eventsAnyListeners=[],s.modules=[...s.__modules__],i.modules&&Array.isArray(i.modules)&&s.modules.push(...i.modules);const n={};s.modules.forEach(c=>{c({swiper:s,extendParams:hi(i,n),on:s.on.bind(s),once:s.once.bind(s),off:s.off.bind(s),emit:s.emit.bind(s)})});const o=V({},Re,n);return s.params=V({},o,Ne,i),s.originalParams=V({},s.params),s.passedParams=V({},i),s.params&&s.params.on&&Object.keys(s.params.on).forEach(c=>{s.on(c,s.params.on[c])}),s.params&&s.params.onAny&&s.onAny(s.params.onAny),s.$=C,Object.assign(s,{enabled:s.params.enabled,el:t,classNames:[],slides:C(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal(){return s.params.direction==="horizontal"},isVertical(){return s.params.direction==="vertical"},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:s.params.allowSlideNext,allowSlidePrev:s.params.allowSlidePrev,touchEvents:function(){const r=["touchstart","touchmove","touchend","touchcancel"],d=["pointerdown","pointermove","pointerup"];return s.touchEventsTouch={start:r[0],move:r[1],end:r[2],cancel:r[3]},s.touchEventsDesktop={start:d[0],move:d[1],end:d[2]},s.support.touch||!s.params.simulateTouch?s.touchEventsTouch:s.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:s.params.focusableElements,lastClickTime:re(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:s.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),s.emit("_swiper"),s.params.init&&s.init(),s}enable(){const a=this;a.enabled||(a.enabled=!0,a.params.grabCursor&&a.setGrabCursor(),a.emit("enable"))}disable(){const a=this;a.enabled&&(a.enabled=!1,a.params.grabCursor&&a.unsetGrabCursor(),a.emit("disable"))}setProgress(a,t){const i=this;a=Math.min(Math.max(a,0),1);const s=i.minTranslate(),o=(i.maxTranslate()-s)*a+s;i.translateTo(o,typeof t>"u"?0:t),i.updateActiveIndex(),i.updateSlidesClasses()}emitContainerClasses(){const a=this;if(!a.params._emitClasses||!a.el)return;const t=a.el.className.split(" ").filter(i=>i.indexOf("swiper")===0||i.indexOf(a.params.containerModifierClass)===0);a.emit("_containerClasses",t.join(" "))}getSlideClasses(a){const t=this;return t.destroyed?"":a.className.split(" ").filter(i=>i.indexOf("swiper-slide")===0||i.indexOf(t.params.slideClass)===0).join(" ")}emitSlidesClasses(){const a=this;if(!a.params._emitClasses||!a.el)return;const t=[];a.slides.each(i=>{const s=a.getSlideClasses(i);t.push({slideEl:i,classNames:s}),a.emit("_slideClass",i,s)}),a.emit("_slideClasses",t)}slidesPerViewDynamic(a="current",t=!1){const i=this,{params:s,slides:n,slidesGrid:o,slidesSizesGrid:c,size:r,activeIndex:d}=i;let m=1;if(s.centeredSlides){let h=n[d].swiperSlideSize,p;for(let b=d+1;b<n.length;b+=1)n[b]&&!p&&(h+=n[b].swiperSlideSize,m+=1,h>r&&(p=!0));for(let b=d-1;b>=0;b-=1)n[b]&&!p&&(h+=n[b].swiperSlideSize,m+=1,h>r&&(p=!0))}else if(a==="current")for(let h=d+1;h<n.length;h+=1)(t?o[h]+c[h]-o[d]<r:o[h]-o[d]<r)&&(m+=1);else for(let h=d-1;h>=0;h-=1)o[d]-o[h]<r&&(m+=1);return m}update(){const a=this;if(!a||a.destroyed)return;const{snapGrid:t,params:i}=a;i.breakpoints&&a.setBreakpoint(),a.updateSize(),a.updateSlides(),a.updateProgress(),a.updateSlidesClasses();function s(){const o=a.rtlTranslate?a.translate*-1:a.translate,c=Math.min(Math.max(o,a.maxTranslate()),a.minTranslate());a.setTranslate(c),a.updateActiveIndex(),a.updateSlidesClasses()}let n;a.params.freeMode&&a.params.freeMode.enabled?(s(),a.params.autoHeight&&a.updateAutoHeight()):((a.params.slidesPerView==="auto"||a.params.slidesPerView>1)&&a.isEnd&&!a.params.centeredSlides?n=a.slideTo(a.slides.length-1,0,!1,!0):n=a.slideTo(a.activeIndex,0,!1,!0),n||s()),i.watchOverflow&&t!==a.snapGrid&&a.checkOverflow(),a.emit("update")}changeDirection(a,t=!0){const i=this,s=i.params.direction;return a||(a=s==="horizontal"?"vertical":"horizontal"),a===s||a!=="horizontal"&&a!=="vertical"||(i.$el.removeClass(`${i.params.containerModifierClass}${s}`).addClass(`${i.params.containerModifierClass}${a}`),i.emitContainerClasses(),i.params.direction=a,i.slides.each(n=>{a==="vertical"?n.style.width="":n.style.height=""}),i.emit("changeDirection"),t&&i.update()),i}changeLanguageDirection(a){const t=this;t.rtl&&a==="rtl"||!t.rtl&&a==="ltr"||(t.rtl=a==="rtl",t.rtlTranslate=t.params.direction==="horizontal"&&t.rtl,t.rtl?(t.$el.addClass(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.$el.removeClass(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(a){const t=this;if(t.mounted)return!0;const i=C(a||t.params.el);if(a=i[0],!a)return!1;a.swiper=t;const s=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let o=(()=>{if(a&&a.shadowRoot&&a.shadowRoot.querySelector){const c=C(a.shadowRoot.querySelector(s()));return c.children=r=>i.children(r),c}return i.children?i.children(s()):C(i).children(s())})();if(o.length===0&&t.params.createElements){const r=q().createElement("div");o=C(r),r.className=t.params.wrapperClass,i.append(r),i.children(`.${t.params.slideClass}`).each(d=>{o.append(d)})}return Object.assign(t,{$el:i,el:a,$wrapperEl:o,wrapperEl:o[0],mounted:!0,rtl:a.dir.toLowerCase()==="rtl"||i.css("direction")==="rtl",rtlTranslate:t.params.direction==="horizontal"&&(a.dir.toLowerCase()==="rtl"||i.css("direction")==="rtl"),wrongRTL:o.css("display")==="-webkit-box"}),!0}init(a){const t=this;return t.initialized||t.mount(a)===!1||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(a=!0,t=!0){const i=this,{params:s,$el:n,$wrapperEl:o,slides:c}=i;return typeof i.params>"u"||i.destroyed||(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),s.loop&&i.loopDestroy(),t&&(i.removeClasses(),n.removeAttr("style"),o.removeAttr("style"),c&&c.length&&c.removeClass([s.slideVisibleClass,s.slideActiveClass,s.slideNextClass,s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),i.emit("destroy"),Object.keys(i.eventsListeners).forEach(r=>{i.off(r)}),a!==!1&&(i.$el[0].swiper=null,ea(i)),i.destroyed=!0),null}static extendDefaults(a){V(Ne,a)}static get extendedDefaults(){return Ne}static get defaults(){return Re}static installModule(a){Y.prototype.__modules__||(Y.prototype.__modules__=[]);const t=Y.prototype.__modules__;typeof a=="function"&&t.indexOf(a)<0&&t.push(a)}static use(a){return Array.isArray(a)?(a.forEach(t=>Y.installModule(t)),Y):(Y.installModule(a),Y)}};Object.keys(we).forEach(e=>{Object.keys(we[e]).forEach(a=>{se.prototype[a]=we[e][a]})});se.use([da,ca]);function Ze(e,a,t,i){const s=q();return e.params.createElements&&Object.keys(i).forEach(n=>{if(!t[n]&&t.auto===!0){let o=e.$el.children(`.${i[n]}`)[0];o||(o=s.createElement("div"),o.className=i[n],e.$el.append(o)),t[n]=o,a[n]=o}}),t}function vi({swiper:e,extendParams:a,on:t,emit:i}){a({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null};function s(b){let x;return b&&(x=C(b),e.params.uniqueNavElements&&typeof b=="string"&&x.length>1&&e.$el.find(b).length===1&&(x=e.$el.find(b))),x}function n(b,x){const f=e.params.navigation;b&&b.length>0&&(b[x?"addClass":"removeClass"](f.disabledClass),b[0]&&b[0].tagName==="BUTTON"&&(b[0].disabled=x),e.params.watchOverflow&&e.enabled&&b[e.isLocked?"addClass":"removeClass"](f.lockClass))}function o(){if(e.params.loop)return;const{$nextEl:b,$prevEl:x}=e.navigation;n(x,e.isBeginning&&!e.params.rewind),n(b,e.isEnd&&!e.params.rewind)}function c(b){b.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),i("navigationPrev"))}function r(b){b.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),i("navigationNext"))}function d(){const b=e.params.navigation;if(e.params.navigation=Ze(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(b.nextEl||b.prevEl))return;const x=s(b.nextEl),f=s(b.prevEl);x&&x.length>0&&x.on("click",r),f&&f.length>0&&f.on("click",c),Object.assign(e.navigation,{$nextEl:x,nextEl:x&&x[0],$prevEl:f,prevEl:f&&f[0]}),e.enabled||(x&&x.addClass(b.lockClass),f&&f.addClass(b.lockClass))}function m(){const{$nextEl:b,$prevEl:x}=e.navigation;b&&b.length&&(b.off("click",r),b.removeClass(e.params.navigation.disabledClass)),x&&x.length&&(x.off("click",c),x.removeClass(e.params.navigation.disabledClass))}t("init",()=>{e.params.navigation.enabled===!1?p():(d(),o())}),t("toEdge fromEdge lock unlock",()=>{o()}),t("destroy",()=>{m()}),t("enable disable",()=>{const{$nextEl:b,$prevEl:x}=e.navigation;b&&b[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass),x&&x[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass)}),t("click",(b,x)=>{const{$nextEl:f,$prevEl:v}=e.navigation,g=x.target;if(e.params.navigation.hideOnClick&&!C(g).is(v)&&!C(g).is(f)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===g||e.pagination.el.contains(g)))return;let w;f?w=f.hasClass(e.params.navigation.hiddenClass):v&&(w=v.hasClass(e.params.navigation.hiddenClass)),i(w===!0?"navigationShow":"navigationHide"),f&&f.toggleClass(e.params.navigation.hiddenClass),v&&v.toggleClass(e.params.navigation.hiddenClass)}});const h=()=>{e.$el.removeClass(e.params.navigation.navigationDisabledClass),d(),o()},p=()=>{e.$el.addClass(e.params.navigation.navigationDisabledClass),m()};Object.assign(e.navigation,{enable:h,disable:p,update:o,init:d,destroy:m})}function ie(e=""){return`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function bi({swiper:e,extendParams:a,on:t,emit:i}){const s="swiper-pagination";a({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:f=>f,formatFractionTotal:f=>f,bulletClass:`${s}-bullet`,bulletActiveClass:`${s}-bullet-active`,modifierClass:`${s}-`,currentClass:`${s}-current`,totalClass:`${s}-total`,hiddenClass:`${s}-hidden`,progressbarFillClass:`${s}-progressbar-fill`,progressbarOppositeClass:`${s}-progressbar-opposite`,clickableClass:`${s}-clickable`,lockClass:`${s}-lock`,horizontalClass:`${s}-horizontal`,verticalClass:`${s}-vertical`,paginationDisabledClass:`${s}-disabled`}}),e.pagination={el:null,$el:null,bullets:[]};let n,o=0;function c(){return!e.params.pagination.el||!e.pagination.el||!e.pagination.$el||e.pagination.$el.length===0}function r(f,v){const{bulletActiveClass:g}=e.params.pagination;f[v]().addClass(`${g}-${v}`)[v]().addClass(`${g}-${v}-${v}`)}function d(){const f=e.rtl,v=e.params.pagination;if(c())return;const g=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,w=e.pagination.$el;let N;const E=e.params.loop?Math.ceil((g-e.loopedSlides*2)/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(N=Math.ceil((e.activeIndex-e.loopedSlides)/e.params.slidesPerGroup),N>g-1-e.loopedSlides*2&&(N-=g-e.loopedSlides*2),N>E-1&&(N-=E),N<0&&e.params.paginationType!=="bullets"&&(N=E+N)):typeof e.snapIndex<"u"?N=e.snapIndex:N=e.activeIndex||0,v.type==="bullets"&&e.pagination.bullets&&e.pagination.bullets.length>0){const k=e.pagination.bullets;let _,j,D;if(v.dynamicBullets&&(n=k.eq(0)[e.isHorizontal()?"outerWidth":"outerHeight"](!0),w.css(e.isHorizontal()?"width":"height",`${n*(v.dynamicMainBullets+4)}px`),v.dynamicMainBullets>1&&e.previousIndex!==void 0&&(o+=N-(e.previousIndex-e.loopedSlides||0),o>v.dynamicMainBullets-1?o=v.dynamicMainBullets-1:o<0&&(o=0)),_=Math.max(N-o,0),j=_+(Math.min(k.length,v.dynamicMainBullets)-1),D=(j+_)/2),k.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map(I=>`${v.bulletActiveClass}${I}`).join(" ")),w.length>1)k.each(I=>{const M=C(I),T=M.index();T===N&&M.addClass(v.bulletActiveClass),v.dynamicBullets&&(T>=_&&T<=j&&M.addClass(`${v.bulletActiveClass}-main`),T===_&&r(M,"prev"),T===j&&r(M,"next"))});else{const I=k.eq(N),M=I.index();if(I.addClass(v.bulletActiveClass),v.dynamicBullets){const T=k.eq(_),P=k.eq(j);for(let $=_;$<=j;$+=1)k.eq($).addClass(`${v.bulletActiveClass}-main`);if(e.params.loop)if(M>=k.length){for(let $=v.dynamicMainBullets;$>=0;$-=1)k.eq(k.length-$).addClass(`${v.bulletActiveClass}-main`);k.eq(k.length-v.dynamicMainBullets-1).addClass(`${v.bulletActiveClass}-prev`)}else r(T,"prev"),r(P,"next");else r(T,"prev"),r(P,"next")}}if(v.dynamicBullets){const I=Math.min(k.length,v.dynamicMainBullets+4),M=(n*I-n)/2-D*n,T=f?"right":"left";k.css(e.isHorizontal()?T:"top",`${M}px`)}}if(v.type==="fraction"&&(w.find(ie(v.currentClass)).text(v.formatFractionCurrent(N+1)),w.find(ie(v.totalClass)).text(v.formatFractionTotal(E))),v.type==="progressbar"){let k;v.progressbarOpposite?k=e.isHorizontal()?"vertical":"horizontal":k=e.isHorizontal()?"horizontal":"vertical";const _=(N+1)/E;let j=1,D=1;k==="horizontal"?j=_:D=_,w.find(ie(v.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${j}) scaleY(${D})`).transition(e.params.speed)}v.type==="custom"&&v.renderCustom?(w.html(v.renderCustom(e,N+1,E)),i("paginationRender",w[0])):i("paginationUpdate",w[0]),e.params.watchOverflow&&e.enabled&&w[e.isLocked?"addClass":"removeClass"](v.lockClass)}function m(){const f=e.params.pagination;if(c())return;const v=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,g=e.pagination.$el;let w="";if(f.type==="bullets"){let N=e.params.loop?Math.ceil((v-e.loopedSlides*2)/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&!e.params.loop&&N>v&&(N=v);for(let E=0;E<N;E+=1)f.renderBullet?w+=f.renderBullet.call(e,E,f.bulletClass):w+=`<${f.bulletElement} class="${f.bulletClass}"></${f.bulletElement}>`;g.html(w),e.pagination.bullets=g.find(ie(f.bulletClass))}f.type==="fraction"&&(f.renderFraction?w=f.renderFraction.call(e,f.currentClass,f.totalClass):w=`<span class="${f.currentClass}"></span> / <span class="${f.totalClass}"></span>`,g.html(w)),f.type==="progressbar"&&(f.renderProgressbar?w=f.renderProgressbar.call(e,f.progressbarFillClass):w=`<span class="${f.progressbarFillClass}"></span>`,g.html(w)),f.type!=="custom"&&i("paginationRender",e.pagination.$el[0])}function h(){e.params.pagination=Ze(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const f=e.params.pagination;if(!f.el)return;let v=C(f.el);v.length!==0&&(e.params.uniqueNavElements&&typeof f.el=="string"&&v.length>1&&(v=e.$el.find(f.el),v.length>1&&(v=v.filter(g=>C(g).parents(".swiper")[0]===e.el))),f.type==="bullets"&&f.clickable&&v.addClass(f.clickableClass),v.addClass(f.modifierClass+f.type),v.addClass(e.isHorizontal()?f.horizontalClass:f.verticalClass),f.type==="bullets"&&f.dynamicBullets&&(v.addClass(`${f.modifierClass}${f.type}-dynamic`),o=0,f.dynamicMainBullets<1&&(f.dynamicMainBullets=1)),f.type==="progressbar"&&f.progressbarOpposite&&v.addClass(f.progressbarOppositeClass),f.clickable&&v.on("click",ie(f.bulletClass),function(w){w.preventDefault();let N=C(this).index()*e.params.slidesPerGroup;e.params.loop&&(N+=e.loopedSlides),e.slideTo(N)}),Object.assign(e.pagination,{$el:v,el:v[0]}),e.enabled||v.addClass(f.lockClass))}function p(){const f=e.params.pagination;if(c())return;const v=e.pagination.$el;v.removeClass(f.hiddenClass),v.removeClass(f.modifierClass+f.type),v.removeClass(e.isHorizontal()?f.horizontalClass:f.verticalClass),e.pagination.bullets&&e.pagination.bullets.removeClass&&e.pagination.bullets.removeClass(f.bulletActiveClass),f.clickable&&v.off("click",ie(f.bulletClass))}t("init",()=>{e.params.pagination.enabled===!1?x():(h(),m(),d())}),t("activeIndexChange",()=>{(e.params.loop||typeof e.snapIndex>"u")&&d()}),t("snapIndexChange",()=>{e.params.loop||d()}),t("slidesLengthChange",()=>{e.params.loop&&(m(),d())}),t("snapGridLengthChange",()=>{e.params.loop||(m(),d())}),t("destroy",()=>{p()}),t("enable disable",()=>{const{$el:f}=e.pagination;f&&f[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)}),t("lock unlock",()=>{d()}),t("click",(f,v)=>{const g=v.target,{$el:w}=e.pagination;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&w&&w.length>0&&!C(g).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&g===e.navigation.nextEl||e.navigation.prevEl&&g===e.navigation.prevEl))return;const N=w.hasClass(e.params.pagination.hiddenClass);i(N===!0?"paginationShow":"paginationHide"),w.toggleClass(e.params.pagination.hiddenClass)}});const b=()=>{e.$el.removeClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass),h(),m(),d()},x=()=>{e.$el.addClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass),p()};Object.assign(e.pagination,{enable:b,disable:x,render:m,update:d,init:h,destroy:p})}function te(e){return typeof e=="object"&&e!==null&&e.constructor&&Object.prototype.toString.call(e).slice(8,-1)==="Object"}function Q(e,a){const t=["__proto__","constructor","prototype"];Object.keys(a).filter(i=>t.indexOf(i)<0).forEach(i=>{typeof e[i]>"u"?e[i]=a[i]:te(a[i])&&te(e[i])&&Object.keys(a[i]).length>0?a[i].__swiper__?e[i]=a[i]:Q(e[i],a[i]):e[i]=a[i]})}function Qe(e={}){return e.navigation&&typeof e.navigation.nextEl>"u"&&typeof e.navigation.prevEl>"u"}function Je(e={}){return e.pagination&&typeof e.pagination.el>"u"}function et(e={}){return e.scrollbar&&typeof e.scrollbar.el>"u"}function tt(e=""){const a=e.split(" ").map(i=>i.trim()).filter(i=>!!i),t=[];return a.forEach(i=>{t.indexOf(i)<0&&t.push(i)}),t.join(" ")}const at=["modules","init","_direction","touchEventsTarget","initialSlide","_speed","cssMode","updateOnWindowResize","resizeObserver","nested","focusableElements","_enabled","_width","_height","preventInteractionOnTransition","userAgent","url","_edgeSwipeDetection","_edgeSwipeThreshold","_freeMode","_autoHeight","setWrapperSize","virtualTranslate","_effect","breakpoints","_spaceBetween","_slidesPerView","maxBackfaceHiddenSlides","_grid","_slidesPerGroup","_slidesPerGroupSkip","_slidesPerGroupAuto","_centeredSlides","_centeredSlidesBounds","_slidesOffsetBefore","_slidesOffsetAfter","normalizeSlideIndex","_centerInsufficientSlides","_watchOverflow","roundLengths","touchRatio","touchAngle","simulateTouch","_shortSwipes","_longSwipes","longSwipesRatio","longSwipesMs","_followFinger","allowTouchMove","_threshold","touchMoveStopPropagation","touchStartPreventDefault","touchStartForcePreventDefault","touchReleaseOnEdges","uniqueNavElements","_resistance","_resistanceRatio","_watchSlidesProgress","_grabCursor","preventClicks","preventClicksPropagation","_slideToClickedSlide","_preloadImages","updateOnImagesReady","_loop","_loopAdditionalSlides","_loopedSlides","_loopedSlidesLimit","_loopFillGroupWithBlank","loopPreventsSlide","_rewind","_allowSlidePrev","_allowSlideNext","_swipeHandler","_noSwiping","noSwipingClass","noSwipingSelector","passiveListeners","containerModifierClass","slideClass","slideBlankClass","slideActiveClass","slideDuplicateActiveClass","slideVisibleClass","slideDuplicateClass","slideNextClass","slideDuplicateNextClass","slidePrevClass","slideDuplicatePrevClass","wrapperClass","runCallbacksOnInit","observer","observeParents","observeSlideChildren","a11y","_autoplay","_controller","coverflowEffect","cubeEffect","fadeEffect","flipEffect","creativeEffect","cardsEffect","hashNavigation","history","keyboard","lazy","mousewheel","_navigation","_pagination","parallax","_scrollbar","_thumbs","virtual","zoom"];function gi(e={},a=!0){const t={on:{}},i={},s={};Q(t,se.defaults),Q(t,se.extendedDefaults),t._emitClasses=!0,t.init=!1;const n={},o=at.map(r=>r.replace(/_/,"")),c=Object.assign({},e);return Object.keys(c).forEach(r=>{typeof e[r]>"u"||(o.indexOf(r)>=0?te(e[r])?(t[r]={},s[r]={},Q(t[r],e[r]),Q(s[r],e[r])):(t[r]=e[r],s[r]=e[r]):r.search(/on[A-Z]/)===0&&typeof e[r]=="function"?a?i[`${r[2].toLowerCase()}${r.substr(3)}`]=e[r]:t.on[`${r[2].toLowerCase()}${r.substr(3)}`]=e[r]:n[r]=e[r])}),["navigation","pagination","scrollbar"].forEach(r=>{t[r]===!0&&(t[r]={}),t[r]===!1&&delete t[r]}),{params:t,passedParams:s,rest:n,events:i}}function yi({el:e,nextEl:a,prevEl:t,paginationEl:i,scrollbarEl:s,swiper:n},o){Qe(o)&&a&&t&&(n.params.navigation.nextEl=a,n.originalParams.navigation.nextEl=a,n.params.navigation.prevEl=t,n.originalParams.navigation.prevEl=t),Je(o)&&i&&(n.params.pagination.el=i,n.originalParams.pagination.el=i),et(o)&&s&&(n.params.scrollbar.el=s,n.originalParams.scrollbar.el=s),n.init(e)}const it=(e,a)=>{let t=a.slidesPerView;if(a.breakpoints){const s=se.prototype.getBreakpoint(a.breakpoints),n=s in a.breakpoints?a.breakpoints[s]:void 0;n&&n.slidesPerView&&(t=n.slidesPerView)}let i=Math.ceil(parseFloat(a.loopedSlides||t,10));return i+=a.loopAdditionalSlides,i>e.length&&a.loopedSlidesLimit&&(i=e.length),i};function xi(e,a,t){const i=a.map((r,d)=>z.cloneElement(r,{swiper:e,"data-swiper-slide-index":d}));function s(r,d,m){return z.cloneElement(r,{key:`${r.key}-duplicate-${d}-${m}`,className:`${r.props.className||""} ${t.slideDuplicateClass}`})}if(t.loopFillGroupWithBlank){const r=t.slidesPerGroup-i.length%t.slidesPerGroup;if(r!==t.slidesPerGroup)for(let d=0;d<r;d+=1){const m=z.createElement("div",{className:`${t.slideClass} ${t.slideBlankClass}`});i.push(m)}}t.slidesPerView==="auto"&&!t.loopedSlides&&(t.loopedSlides=i.length);const n=it(i,t),o=[],c=[];for(let r=0;r<n;r+=1){const d=r-Math.floor(r/i.length)*i.length;c.push(s(i[d],r,"append")),o.unshift(s(i[i.length-d-1],r,"prepend"))}return e&&(e.loopedSlides=n),[...o,...i,...c]}function wi(e,a,t,i,s){const n=[];if(!a)return n;const o=r=>{n.indexOf(r)<0&&n.push(r)};if(t&&i){const r=i.map(s),d=t.map(s);r.join("")!==d.join("")&&o("children"),i.length!==t.length&&o("children")}return at.filter(r=>r[0]==="_").map(r=>r.replace(/_/,"")).forEach(r=>{if(r in e&&r in a)if(te(e[r])&&te(a[r])){const d=Object.keys(e[r]),m=Object.keys(a[r]);d.length!==m.length?o(r):(d.forEach(h=>{e[r][h]!==a[r][h]&&o(r)}),m.forEach(h=>{e[r][h]!==a[r][h]&&o(r)}))}else e[r]!==a[r]&&o(r)}),n}function st(e){return e.type&&e.type.displayName&&e.type.displayName.includes("SwiperSlide")}function nt(e){const a=[];return z.Children.toArray(e).forEach(t=>{st(t)?a.push(t):t.props&&t.props.children&&nt(t.props.children).forEach(i=>a.push(i))}),a}function Ni(e){const a=[],t={"container-start":[],"container-end":[],"wrapper-start":[],"wrapper-end":[]};return z.Children.toArray(e).forEach(i=>{if(st(i))a.push(i);else if(i.props&&i.props.slot&&t[i.props.slot])t[i.props.slot].push(i);else if(i.props&&i.props.children){const s=nt(i.props.children);s.length>0?s.forEach(n=>a.push(n)):t["container-end"].push(i)}else t["container-end"].push(i)}),{slides:a,slots:t}}function Ci({swiper:e,slides:a,passedParams:t,changedParams:i,nextEl:s,prevEl:n,scrollbarEl:o,paginationEl:c}){const r=i.filter(k=>k!=="children"&&k!=="direction"),{params:d,pagination:m,navigation:h,scrollbar:p,virtual:b,thumbs:x}=e;let f,v,g,w,N;i.includes("thumbs")&&t.thumbs&&t.thumbs.swiper&&d.thumbs&&!d.thumbs.swiper&&(f=!0),i.includes("controller")&&t.controller&&t.controller.control&&d.controller&&!d.controller.control&&(v=!0),i.includes("pagination")&&t.pagination&&(t.pagination.el||c)&&(d.pagination||d.pagination===!1)&&m&&!m.el&&(g=!0),i.includes("scrollbar")&&t.scrollbar&&(t.scrollbar.el||o)&&(d.scrollbar||d.scrollbar===!1)&&p&&!p.el&&(w=!0),i.includes("navigation")&&t.navigation&&(t.navigation.prevEl||n)&&(t.navigation.nextEl||s)&&(d.navigation||d.navigation===!1)&&h&&!h.prevEl&&!h.nextEl&&(N=!0);const E=k=>{e[k]&&(e[k].destroy(),k==="navigation"?(d[k].prevEl=void 0,d[k].nextEl=void 0,e[k].prevEl=void 0,e[k].nextEl=void 0):(d[k].el=void 0,e[k].el=void 0))};r.forEach(k=>{if(te(d[k])&&te(t[k]))Q(d[k],t[k]);else{const _=t[k];(_===!0||_===!1)&&(k==="navigation"||k==="pagination"||k==="scrollbar")?_===!1&&E(k):d[k]=t[k]}}),r.includes("controller")&&!v&&e.controller&&e.controller.control&&d.controller&&d.controller.control&&(e.controller.control=d.controller.control),i.includes("children")&&a&&b&&d.virtual.enabled?(b.slides=a,b.update(!0)):i.includes("children")&&e.lazy&&e.params.lazy.enabled&&e.lazy.load(),f&&x.init()&&x.update(!0),v&&(e.controller.control=d.controller.control),g&&(c&&(d.pagination.el=c),m.init(),m.render(),m.update()),w&&(o&&(d.scrollbar.el=o),p.init(),p.updateSize(),p.setTranslate()),N&&(s&&(d.navigation.nextEl=s),n&&(d.navigation.prevEl=n),h.init(),h.update()),i.includes("allowSlideNext")&&(e.allowSlideNext=t.allowSlideNext),i.includes("allowSlidePrev")&&(e.allowSlidePrev=t.allowSlidePrev),i.includes("direction")&&e.changeDirection(t.direction,!1),e.update()}function ki(e,a,t){if(!t)return null;const i=e.isHorizontal()?{[e.rtlTranslate?"right":"left"]:`${t.offset}px`}:{top:`${t.offset}px`};return a.filter((s,n)=>n>=t.from&&n<=t.to).map(s=>z.cloneElement(s,{swiper:e,style:i}))}const Ti=e=>{!e||e.destroyed||!e.params.virtual||e.params.virtual&&!e.params.virtual.enabled||(e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.lazy&&e.params.lazy.enabled&&e.lazy.load(),e.parallax&&e.params.parallax&&e.params.parallax.enabled&&e.parallax.setTranslate())};function le(e,a){return typeof window>"u"?y.useEffect(e,a):y.useLayoutEffect(e,a)}const Si=y.createContext(null),Mi=y.createContext(null);function ke(){return ke=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},ke.apply(this,arguments)}const lt=y.forwardRef(function(e,a){let{className:t,tag:i="div",wrapperTag:s="div",children:n,onSwiper:o,...c}=e===void 0?{}:e,r=!1;const[d,m]=y.useState("swiper"),[h,p]=y.useState(null),[b,x]=y.useState(!1),f=y.useRef(!1),v=y.useRef(null),g=y.useRef(null),w=y.useRef(null),N=y.useRef(null),E=y.useRef(null),k=y.useRef(null),_=y.useRef(null),j=y.useRef(null),{params:D,passedParams:I,rest:M,events:T}=gi(c),{slides:P,slots:$}=Ni(n),H=()=>{x(!b)};Object.assign(D.on,{_containerClasses(O,W){m(W)}});const B=()=>{if(Object.assign(D.on,T),r=!0,g.current=new se(D),g.current.loopCreate=()=>{},g.current.loopDestroy=()=>{},D.loop&&(g.current.loopedSlides=it(P,D)),g.current.virtual&&g.current.params.virtual.enabled){g.current.virtual.slides=P;const O={cache:!1,slides:P,renderExternal:p,renderExternalUpdate:!1};Q(g.current.params.virtual,O),Q(g.current.originalParams.virtual,O)}};v.current||B(),g.current&&g.current.on("_beforeBreakpoint",H);const ae=()=>{r||!T||!g.current||Object.keys(T).forEach(O=>{g.current.on(O,T[O])})},U=()=>{!T||!g.current||Object.keys(T).forEach(O=>{g.current.off(O,T[O])})};y.useEffect(()=>()=>{g.current&&g.current.off("_beforeBreakpoint",H)}),y.useEffect(()=>{!f.current&&g.current&&(g.current.emitSlidesClasses(),f.current=!0)}),le(()=>{if(a&&(a.current=v.current),!!v.current)return g.current.destroyed&&B(),yi({el:v.current,nextEl:E.current,prevEl:k.current,paginationEl:_.current,scrollbarEl:j.current,swiper:g.current},D),o&&o(g.current),()=>{g.current&&!g.current.destroyed&&g.current.destroy(!0,!1)}},[]),le(()=>{ae();const O=wi(I,w.current,P,N.current,W=>W.key);return w.current=I,N.current=P,O.length&&g.current&&!g.current.destroyed&&Ci({swiper:g.current,slides:P,passedParams:I,changedParams:O,nextEl:E.current,prevEl:k.current,scrollbarEl:j.current,paginationEl:_.current}),()=>{U()}}),le(()=>{Ti(g.current)},[h]);function J(){return D.virtual?ki(g.current,P,h):!D.loop||g.current&&g.current.destroyed?P.map(O=>z.cloneElement(O,{swiper:g.current})):xi(g.current,P,D)}return z.createElement(i,ke({ref:v,className:tt(`${d}${t?` ${t}`:""}`)},M),z.createElement(Mi.Provider,{value:g.current},$["container-start"],z.createElement(s,{className:"swiper-wrapper"},$["wrapper-start"],J(),$["wrapper-end"]),Qe(D)&&z.createElement(z.Fragment,null,z.createElement("div",{ref:k,className:"swiper-button-prev"}),z.createElement("div",{ref:E,className:"swiper-button-next"})),et(D)&&z.createElement("div",{ref:j,className:"swiper-scrollbar"}),Je(D)&&z.createElement("div",{ref:_,className:"swiper-pagination"}),$["container-end"]))});lt.displayName="Swiper";function Te(){return Te=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},Te.apply(this,arguments)}const rt=y.forwardRef(function(e,a){let{tag:t="div",children:i,className:s="",swiper:n,zoom:o,virtualIndex:c,...r}=e===void 0?{}:e;const d=y.useRef(null),[m,h]=y.useState("swiper-slide");function p(f,v,g){v===d.current&&h(g)}le(()=>{if(a&&(a.current=d.current),!(!d.current||!n)){if(n.destroyed){m!=="swiper-slide"&&h("swiper-slide");return}return n.on("_slideClass",p),()=>{n&&n.off("_slideClass",p)}}}),le(()=>{n&&d.current&&!n.destroyed&&h(n.getSlideClasses(d.current))},[n]);const b={isActive:m.indexOf("swiper-slide-active")>=0||m.indexOf("swiper-slide-duplicate-active")>=0,isVisible:m.indexOf("swiper-slide-visible")>=0,isDuplicate:m.indexOf("swiper-slide-duplicate")>=0,isPrev:m.indexOf("swiper-slide-prev")>=0||m.indexOf("swiper-slide-duplicate-prev")>=0,isNext:m.indexOf("swiper-slide-next")>=0||m.indexOf("swiper-slide-duplicate-next")>=0},x=()=>typeof i=="function"?i(b):i;return z.createElement(t,Te({ref:d,className:tt(`${m}${s?` ${s}`:""}`),"data-swiper-slide-index":c},r),z.createElement(Si.Provider,{value:b},o?z.createElement("div",{className:"swiper-zoom-container","data-swiper-zoom":typeof o=="number"?o:void 0},x()):x()))});rt.displayName="SwiperSlide";const Vi=()=>{const e=ct();y.useEffect(()=>{e(ut("Modals"))});const a=["carousel1.jpeg","carousel2.jpeg","carousel3.jpeg"],t=_e(G=>G.themeConfig.rtlClass)==="rtl",[i,s]=y.useState([]),n=G=>{i.includes(G)?s(be=>be.filter(dt=>dt!==G)):s([...i,G])},[o,c]=y.useState(!1),[r,d]=y.useState(!1),[m,h]=y.useState(!1),[p,b]=y.useState(!1),[x,f]=y.useState(!1),[v,g]=y.useState(!1),[w,N]=y.useState(!1),[E,k]=y.useState(!1),[_,j]=y.useState(!1),[D,I]=y.useState(!1),[M,T]=y.useState(!1),[P,$]=y.useState(!1),[H,B]=y.useState(!1),[ae,U]=y.useState(!1),[J,O]=y.useState(!1),[W,ee]=y.useState(!1),[de,ce]=y.useState(!1),[Me,ne]=y.useState(!1),[Ee,pe]=y.useState(!1),[Fe,fe]=y.useState(!1),[Pe,he]=y.useState(!1),[ot,ve]=y.useState(!1),De=_e(G=>G.themeConfig);return u("div",{children:[u("ul",{className:"flex space-x-2 rtl:space-x-reverse",children:[l("li",{children:l(mt,{to:"#",className:"text-primary hover:underline",children:"컴포넌트"})}),l("li",{className:"before:content-['/'] ltr:before:mr-2 rtl:before:ml-2",children:l("span",{children:"모달"})})]}),u("div",{className:"space-y-8 pt-5",children:[u("div",{className:"panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary",children:[l("div",{className:"rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3",children:l(Oe,{})}),l("span",{className:"ltr:mr-3 rtl:ml-3",children:"Documentation: "}),l("a",{href:"https://headlessui.com/react/dialog",target:"_blank",className:"block hover:underline",rel:"noreferrer",children:"https://headlessui.com/react/dialog"})]}),u("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-2",children:[u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Basic"}),l("button",{type:"button",onClick:()=>n("code1"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",children:[l("div",{className:"flex items-center justify-center",children:l("button",{type:"button",className:"btn btn-primary",onClick:()=>c(!0),children:"Launch modal"})}),l(S,{appear:!0,show:o,as:y.Fragment,children:u(F,{as:"div",open:o,onClose:()=>c(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{as:"div",className:"panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("div",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{type:"button",className:"text-white-dark hover:text-dark",onClick:()=>c(!1),children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{type:"button",className:"btn btn-outline-danger",onClick:()=>c(!1),children:"Discard"}),l("button",{type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",onClick:()=>c(!1),children:"Save"})]})]})]})})})})]})})]}),i.includes("code1")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition,Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal1, setModal1] = useState(false);

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-primary" onClick={() => setModal1(true)}>
            Launch modal
        </button>
    </div>
    <Transition appear show={modal1} as={Fragment}>
        <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                <div className="text-lg font-bold">Modal Title</div>
                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
                                    <svg>...</svg>
                                </button>
                            </div>
                            <div className="p-5">
                                <p>
                                    Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit
                                    amet ullamcorper mi.
                                </p>
                                <div className="flex justify-end items-center mt-8">
                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                        Discard
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal1(false)}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
</div>

                                        `})})]}),u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Vertically Centered"}),l("button",{type:"button",onClick:()=>n("code2"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",children:[l("div",{className:"flex items-center justify-center",children:l("button",{type:"button",onClick:()=>d(!0),className:"btn btn-info",children:"Launch modal"})}),l(S,{appear:!0,show:r,as:y.Fragment,children:u(F,{as:"div",open:r,onClose:()=>d(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-center justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{as:"div",className:"panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{type:"button",className:"text-white-dark hover:text-dark",onClick:()=>d(!1),children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{type:"button",className:"btn btn-outline-danger",onClick:()=>d(!1),children:"Discard"}),l("button",{type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",onClick:()=>d(!1),children:"Save"})]})]})]})})})})]})})]}),i.includes("code2")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal2, setModal2] = useState(false);

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" onClick={() => setModal2(true)} className="btn btn-info">
            Launch modal
        </button>
    </div>
    <Transition appear show={modal2} as={Fragment}>
        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                <h5 className="font-bold text-lg">Modal Title</h5>
                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                    <svg>...</svg>
                                </button>
                            </div>
                            <div className="p-5">
                                <p>
                                    Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit
                                    amet ullamcorper mi.
                                </p>
                                <div className="flex justify-end items-center mt-8">
                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                        Discard
                                    </button>
                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal2(false)}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
</div>
`})})]}),u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Static"}),l("button",{type:"button",onClick:()=>n("code3"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",children:[l("div",{className:"flex items-center justify-center",children:l("button",{type:"button",onClick:()=>h(!0),className:"btn btn-secondary",children:"Static modal"})}),l(S,{appear:!0,show:m,as:y.Fragment,children:u(F,{as:"div",open:m,onClose:()=>h(!0),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("div",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{type:"button",onClick:()=>h(!1),className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{type:"button",onClick:()=>h(!1),className:"btn btn-outline-danger",children:"Discard"}),l("button",{type:"button",onClick:()=>h(!1),className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]}),i.includes("code3")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal3, setModal3] = useState(false);

<div className="mb-5">
    <div className="flex items-center justify-center">
        <button type="button" onClick={() => setModal3(true)} className="btn btn-secondary">
            Static modal
        </button>
    </div>
    <Transition appear show={modal3} as={Fragment}>
        <Dialog as="div" open={modal3} onClose={() => setModal3(true)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                <div className="font-bold text-lg">Modal Title</div>
                                <button type="button" onClick={() => setModal3(false)} className="text-white-dark hover:text-dark">
                                    <svg>...</svg>
                                </button>
                            </div>
                            <div className="p-5">
                                <p>
                                    Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit
                                    amet ullamcorper mi.
                                </p>
                                <div className="flex justify-end items-center mt-8">
                                    <button type="button" onClick={() => setModal3(false)} className="btn btn-outline-danger">
                                        Discard
                                    </button>
                                    <button type="button" onClick={() => setModal3(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
</div>

`})})]}),u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Remove animation"}),l("button",{type:"button",onClick:()=>n("code4"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",onClick:()=>b(!0),children:[l("div",{className:"flex items-center justify-center",children:l("button",{type:"button",className:"btn btn-success",children:"Launch modal"})}),l(S,{appear:!0,show:p,as:y.Fragment,children:u(F,{as:"div",open:p,onClose:()=>b(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] bg-[black]/60 px-4",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel my-8 w-full max-w-lg overflow-hidden  rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{type:"button",onClick:()=>b(!1),className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>b(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{type:"button",onClick:()=>b(!1),className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),i.includes("code4")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal4, setModal4] = useState(false);

<div className="mb-5" onClick={() => setModal4(true)}>
    <div className="flex items-center justify-center">
        <button type="button" className="btn btn-success">
            Launch modal
        </button>
    </div>
    <Transition appear show={modal4} as={Fragment}>
        <Dialog as="div" open={modal4} onClose={() => setModal4(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0" />
            </Transition.Child>
            <div className="fixed inset-0 bg-[black]/60 z-[999] px-4">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden  w-full max-w-lg my-8 text-black dark:text-white-dark">
                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 className="font-bold text-lg">Modal Title</h5>
                            <button type="button" onClick={() => setModal4(false)} className="text-white-dark hover:text-dark">
                                <svg>...</svg>
                            </button>
                        </div>
                        <div className="p-5">
                            <p>
                                Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus
                                et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper
                                mi.
                            </p>
                            <div className="flex justify-end items-center mt-8">
                                <button onClick={() => setModal4(false)} type="button" className="btn btn-outline-danger">
                                    Discard
                                </button>
                                <button type="button" onClick={() => setModal4(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                    Save
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    </Transition>
</div>
`})})]}),u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Optional sizes"}),l("button",{type:"button",onClick:()=>n("code5"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),l("div",{className:"mb-5",children:u("div",{className:"flex items-center justify-center gap-2",children:[u("div",{children:[l("button",{type:"button",onClick:()=>f(!0),className:"btn btn-warning",children:"Extra large"}),l(S,{appear:!0,show:x,as:y.Fragment,children:u(F,{as:"div",open:x,onClose:()=>f(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>f(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>f(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>f(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>g(!0),className:"btn btn-danger",children:"Large"}),l(S,{appear:!0,show:v,as:y.Fragment,children:u(F,{as:"div",open:v,onClose:()=>g(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-xl overflow-hidden  rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>g(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>g(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>g(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>N(!0),className:"btn btn-secondary",children:"Small"}),l(S,{appear:!0,show:w,as:y.Fragment,children:u(F,{as:"div",open:w,onClose:()=>N(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-sm overflow-hidden  rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>N(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>N(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>N(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]})]})}),i.includes("code5")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';


const [modal5, setModal5] = useState(false);
const [modal6, setModal6] = useState(false);
const [modal7, setModal7] = useState(false);

<div className="mb-5">
    <div className="flex items-center justify-center gap-2">
        <div>
            <button type="button" onClick={() => setModal5(true)} className="btn btn-warning">
                Extra large
            </button>
            <Transition appear show={modal5} as={Fragment}>
                <Dialog as="div" open={modal5} onClose={() => setModal5(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999]">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Modal Title</h5>
                                        <button onClick={() => setModal5(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <p>
                                            Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius
                                            natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac
                                            pulvinar. Ut sit amet ullamcorper mi.
                                        </p>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setModal5(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={() => setModal5(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>

        <div>
            <button type="button" onClick={() => setModal6(true)} className="btn btn-danger">
                Large
            </button>
            <Transition appear show={modal6} as={Fragment}>
                <Dialog as="div" open={modal6} onClose={() => setModal6(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999]">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden  w-full max-w-xl my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Modal Title</h5>
                                        <button onClick={() => setModal6(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="dark:text-white-dark/70 text-base font-medium text-[#1f2937]">
                                            <p>
                                                Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius
                                                natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac
                                                pulvinar. Ut sit amet ullamcorper mi.
                                            </p>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setModal6(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={() => setModal6(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>

        <div>
            <button type="button" onClick={() => setModal7(true)} className="btn btn-secondary">
                Small
            </button>
            <Transition appear show={modal7} as={Fragment}>
                <Dialog as="div" open={modal7} onClose={() => setModal7(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden  w-full max-w-sm my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Modal Title</h5>
                                        <button onClick={() => setModal7(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="dark:text-white-dark/70 text-base font-medium text-[#1f2937]">
                                            <p>
                                                Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius
                                                natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac
                                                pulvinar. Ut sit amet ullamcorper mi.
                                            </p>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setModal7(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={() => setModal7(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    </div>
</div>

`})})]}),u("div",{className:"panel",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Video"}),l("button",{type:"button",onClick:()=>n("code6"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",children:[l("div",{className:"flex items-center justify-center",children:l("button",{onClick:()=>k(!0),type:"button",className:"btn btn-primary",children:"Play Youtube"})}),l(S,{appear:!0,show:E,as:y.Fragment,children:u(F,{as:"div",open:E,onClose:()=>k(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"my-8 w-full max-w-3xl overflow-hidden",children:[l("div",{className:"text-right",children:l("button",{onClick:()=>k(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})}),l("iframe",{title:"youtube-video",src:"https://www.youtube.com/embed/tgbNymZ7vqY",className:"h-[250px] w-full md:h-[550px]"})]})})})})]})})]}),i.includes("code6")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal8, setModal8] = useState(false);

<div className="mb-5">
<div className="flex items-center justify-center">
    <button onClick={() => setModal8(true)} type="button" className="btn btn-primary">
        Play Youtube
    </button>
</div>
<Transition appear show={modal8} as={Fragment}>
    <Dialog as="div" open={modal8} onClose={() => setModal8(false)}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0" />
        </Transition.Child>
        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-start justify-center min-h-screen px-4">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="max-w-3xl w-full my-8 overflow-hidden">
                        <div className="text-right">
                            <button onClick={() => setModal8(false)} type="button" className="text-white-dark hover:text-dark">
                                <svg>...</svg>
                            </button>
                        </div>
                        <iframe title="youtube-video" src="https://www.youtube.com/embed/tgbNymZ7vqY" className="w-full h-[250px] md:h-[550px]"></iframe>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
</Transition>
</div>
`})})]}),u("div",{className:"panel md:col-span-2",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Animation Style Modal"}),l("button",{type:"button",onClick:()=>n("code7"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),l("div",{className:"mb-5",children:u("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[u("div",{children:[l("button",{onClick:()=>j(!0),type:"button",className:"btn btn-primary",children:"FadeIn"}),l(S,{appear:!0,show:_,as:y.Fragment,children:u(F,{as:"div",open:_,onClose:()=>j(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"fadein_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel animate__animated animate__fadeIn my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>j(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>j(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>j(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>I(!0),type:"button",className:"btn btn-info",children:"SlideIn Down"}),l(S,{appear:!0,show:D,as:y.Fragment,children:u(F,{as:"div",open:D,onClose:()=>I(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"slideIn_down_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>I(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>I(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>I(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>T(!0),className:"btn btn-success",children:"FadeIn Up"}),l(S,{appear:!0,show:M,as:y.Fragment,children:u(F,{as:"div",open:M,onClose:()=>T(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"fadein_left_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel animate__animated animate__fadeInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>T(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>T(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>T(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>$(!0),type:"button",className:"btn btn-warning",children:"SlideIn Up"}),l(S,{appear:!0,show:P,as:y.Fragment,children:u(F,{as:"div",open:P,onClose:()=>$(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"slidein_up_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel animate__animated animate__slideInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>$(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>$(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>$(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>B(!0),type:"button",className:"btn btn-danger",children:"FadeIn Left"}),l(S,{appear:!0,show:H,as:y.Fragment,children:u(F,{as:"div",open:H,onClose:()=>B(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"fadein_up_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${t?"animate__fadeInRight":"animate__fadeInLeft"}`,children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>B(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>B(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>B(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>U(!0),type:"button",className:"btn btn-secondary",children:"RotateIn Left"}),l(S,{appear:!0,show:ae,as:y.Fragment,children:u(F,{as:"div",open:ae,onClose:()=>U(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"rotatein_left_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${t?"animate__rotateInDownRight":"animate__rotateInDownLeft"}`,children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>U(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>U(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>U(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>O(!0),type:"button",className:"btn btn-dark",children:"FadeIn Right"}),l(S,{appear:!0,show:J,as:y.Fragment,children:u(F,{as:"div",open:J,onClose:()=>O(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"fadein_right_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark ${t?"animate__fadeInLeft":"animate__fadeInRight"}`,children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>O(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>O(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>O(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]}),u("div",{children:[l("button",{onClick:()=>ee(!0),type:"button",className:"btn btn-primary",children:"ZoomIn Up"}),l(S,{appear:!0,show:W,as:y.Fragment,children:u(F,{as:"div",open:W,onClose:()=>ee(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"zoomIn_up_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"panel animate__animated animate__zoomInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Modal Title"}),l("button",{onClick:()=>ee(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[l("p",{children:"Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi."}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>ee(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>ee(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})]})})]})]})}),i.includes("code7")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

const [modal9, setModal9] = useState(false);
const [modal10, setModal10] = useState(false);
const [modal11, setModal11] = useState(false);
const [modal12, setModal12] = useState(false);
const [modal13, setModal13] = useState(false);
const [modal14, setModal14] = useState(false);
const [modal15, setModal15] = useState(false);
const [modal16, setModal16] = useState(false);

<div className="mb-5">
    <div className="flex flex-wrap items-center justify-center gap-2">
        <div>
            <button onClick={() => setModal9(true)} type="button" className="btn btn-primary">
                FadeIn
            </button>
            <Transition appear show={modal9} as={Fragment}>
                <Dialog as="div" open={modal9} onClose={() => setModal9(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__fadeIn">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal9(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal9(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal9(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal10(true)} type="button" className="btn btn-info">
                SlideIn Down
            </button>
            <Transition appear show={modal10} as={Fragment}>
                <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal10(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal10(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button type="button" onClick={() => setModal11(true)} className="btn btn-success">
                FadeIn Up
            </button>
            <Transition appear show={modal11} as={Fragment}>
                <Dialog as="div" open={modal11} onClose={() => setModal11(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_left_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__fadeInUp">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal11(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal11(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal11(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal12(true)} type="button" className="btn btn-warning">
                SlideIn Up
            </button>
            <Transition appear show={modal12} as={Fragment}>
                <Dialog as="div" open={modal12} onClose={() => setModal12(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slidein_up_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInUp">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal12(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal12(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal12(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal13(true)} type="button" className="btn btn-danger">
                FadeIn Left
            </button>
            <Transition appear show={modal13} as={Fragment}>
                <Dialog as="div" open={modal13} onClose={() => setModal13(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_up_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel
                                className='panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated'

                            >
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal13(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal13(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal13(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal14(true)} type="button" className="btn btn-secondary">
                RotateIn Left
            </button>
            <Transition appear show={modal14} as={Fragment}>
                <Dialog as="div" open={modal14} onClose={() => setModal14(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="rotatein_left_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel
                                className='panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated'
                            >
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal14(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal14(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal14(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal15(true)} type="button" className="btn btn-dark">
                FadeIn Right
            </button>
            <Transition appear show={modal15} as={Fragment}>
                <Dialog as="div" open={modal15} onClose={() => setModal15(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_right_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel
                                className='panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated'
                            >
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal15(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal15(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal15(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        <div>
            <button onClick={() => setModal16(true)} type="button" className="btn btn-primary">
                ZoomIn Up
            </button>
            <Transition appear show={modal16} as={Fragment}>
                <Dialog as="div" open={modal16} onClose={() => setModal16(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="zoomIn_up_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__zoomInUp">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Modal Title</h5>
                                    <button onClick={() => setModal16(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg>...</svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque
                                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut
                                        sit amet ullamcorper mi.
                                    </p>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal16(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal16(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    </div>
</div>

`})})]}),u("div",{className:"panel md:col-span-2",children:[u("div",{className:"mb-5 flex items-center justify-between",children:[l("h5",{className:"text-lg font-semibold dark:text-white-light",children:"Custom"}),l("button",{type:"button",onClick:()=>n("code8"),className:"font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600",children:u("span",{className:"flex items-center",children:[l(K,{className:"me-2"}),"Code"]})})]}),u("div",{className:"mb-5",children:[l("p",{className:"mb-4 text-center",children:"More Custom Modals."}),u("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[u("div",{children:[l("button",{type:"button",onClick:()=>ce(!0),className:"btn btn-primary",children:"Standard"}),l(S,{appear:!0,show:de,as:y.Fragment,children:u(F,{as:"div",open:de,onClose:()=>ce(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"standard_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[l("div",{className:"flex items-center justify-center p-5 text-base font-medium text-[#1f2937] dark:text-white-dark/70",children:l("span",{className:"flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f2f3] dark:bg-white/10",children:l(Oe,{className:"w-7 h-7"})})}),u("div",{className:"p-5",children:[l("div",{className:"text-center text-sm text-white-dark",children:l("p",{children:"Vivamus vitae hendrerit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi consequat auctor turpis, vitae dictum augue efficitur vitae. Vestibulum a risus ipsum. Quisque nec lacus dolor. Quisque ornare tempor orci id rutrum."})}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{type:"button",onClick:()=>ce(!1),className:"btn btn-outline-danger",children:"Discard"}),l("button",{type:"button",onClick:()=>ce(!1),className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]}),u("div",{children:[l("button",{onClick:()=>ne(!0),type:"button",className:"btn btn-info",children:"Tabs"}),l(S,{appear:!0,show:Me,as:y.Fragment,children:u(F,{as:"div",open:Me,onClose:()=>ne(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"tabs_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[l("h5",{className:"text-lg font-bold",children:"Tabs"}),l("button",{onClick:()=>ne(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{})})]}),u("div",{className:"p-5",children:[u(R.Group,{children:[u(R.List,{className:"mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]",children:[l(R,{as:y.Fragment,children:({selected:G})=>l("button",{type:"button",className:`${G?"!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ":""} -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`,children:"Home"})}),l(R,{as:y.Fragment,children:({selected:G})=>l("button",{type:"button",className:`${G?"!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ":""}-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`,children:"Profile"})}),l(R,{as:y.Fragment,children:({selected:G})=>l("button",{type:"button",className:`${G?"!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ":""}-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`,children:"Contact"})}),l(R,{className:"pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light outline-none dark:text-dark",children:"Disabled"})]}),u(R.Panels,{children:[l(R.Panel,{children:u("div",{className:"active pt-5 text-sm",children:[l("h4",{className:"mb-4 text-2xl font-semibold",children:"We move your world!"}),l("p",{className:"mb-4",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),l("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})}),l(R.Panel,{children:l("div",{children:u("div",{className:"flex items-start pt-5",children:[l("div",{className:"h-20 w-20 flex-none ltr:mr-4 rtl:ml-4",children:l("img",{src:"/assets/images/profile-34.jpeg",alt:"img",className:"m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"})}),u("div",{className:"flex-auto",children:[l("h5",{className:"mb-4 text-xl font-medium",children:"Media heading"}),l("p",{className:"text-white-dark",children:"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."})]})]})})}),l(R.Panel,{children:l("div",{className:"pt-5",children:l("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})})}),l(R.Panel,{children:"Disabled"})]})]}),u("div",{className:"mt-8 flex items-center justify-end",children:[l("button",{onClick:()=>ne(!1),type:"button",className:"btn btn-outline-danger",children:"Discard"}),l("button",{onClick:()=>ne(!1),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Save"})]})]})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>pe(!0),className:"btn btn-success",children:"Profile"}),l(S,{appear:!0,show:Ee,as:y.Fragment,children:u(F,{as:"div",open:Ee,onClose:()=>pe(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"profile_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-[300px] overflow-hidden rounded-lg border-0 bg-secondary p-0 text-black dark:bg-secondary dark:text-white-dark",children:[l("div",{className:"flex items-center justify-end pt-4 text-white ltr:pr-4 rtl:pl-4 dark:text-white-light",children:l("button",{onClick:()=>pe(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{className:"w-5 h-5"})})}),u("div",{className:"p-5",children:[u("div",{className:"py-5 text-center text-white dark:text-white-light",children:[l("div",{className:"mx-auto mb-7 h-20 w-20 overflow-hidden rounded-full",children:l("img",{src:"/assets/images/profile-16.jpeg",alt:"img",className:"h-full w-full object-cover"})}),u("p",{className:"font-semibold",children:["Click on view to access ",l("br",{}),"your profile."]})]}),l("div",{className:"flex justify-center gap-4 p-5",children:l("button",{type:"button",className:"btn dark:btn-dark bg-white text-black",children:"View"})})]})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>fe(!0),className:"btn btn-warning",children:"Login"}),l(S,{appear:!0,show:Fe,as:y.Fragment,children:u(F,{as:"div",open:Fe,onClose:()=>fe(!1),children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"login_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between p-5 text-lg font-semibold dark:text-white",children:[l("h5",{children:"Login"}),l("button",{type:"button",onClick:()=>fe(!1),className:"text-white-dark hover:text-dark",children:l(L,{className:"w-5 h-5"})})]}),l("div",{className:"p-5",children:u("form",{children:[u("div",{className:"relative mb-4",children:[l("span",{className:"absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark",children:l($e,{className:"w-5 h-5"})}),l("input",{type:"email",placeholder:"Email",className:"form-input ltr:pl-10 rtl:pr-10",id:"login_email"})]}),u("div",{className:"relative mb-4",children:[l("span",{className:"absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark",children:l(Ie,{className:"w-5 h-5"})}),l("input",{type:"password",placeholder:"Password",className:"form-input ltr:pl-10 rtl:pr-10",id:"login_password"})]}),l("button",{type:"button",className:"btn btn-primary w-full",children:"Login"})]})}),l("div",{className:"my-4 text-center text-xs text-white-dark dark:text-white-dark/70",children:"OR"}),u("div",{className:"mb-5 flex items-center justify-center gap-3",children:[u("button",{type:"button",className:"btn btn-outline-primary flex gap-1",children:[l(ze,{className:"w-5 h-5 shrink-0"}),l("span",{children:"Facebook"})]}),u("button",{type:"button",className:"btn btn-outline-danger flex gap-1",children:[l(Le,{className:"shrink-0"}),l("span",{children:"Github"})]})]}),l("div",{className:"border-t border-[#ebe9f1] p-5 dark:border-white/10",children:u("p",{className:"text-center text-sm text-white-dark dark:text-white-dark/70",children:["Looking to",l("button",{type:"button",className:"text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark",children:"create an account?"})]})})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>he(!0),className:"btn btn-danger",children:"Register"}),l(S,{appear:!0,show:Pe,as:y.Fragment,children:u(F,{as:"div",open:Pe,onClose:()=>{he(!1)},children:[l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:l("div",{className:"fixed inset-0"})}),l("div",{id:"register_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:l(S.Child,{as:y.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:u(F.Panel,{className:"panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark",children:[u("div",{className:"flex items-center justify-between p-5 text-lg font-semibold dark:text-white",children:[l("h5",{children:"Register"}),l("button",{type:"button",onClick:()=>he(!1),className:"text-white-dark hover:text-dark",children:l(L,{className:"w-5 h-5"})})]}),l("div",{className:"p-5",children:u("form",{children:[u("div",{className:"relative mb-4",children:[l("span",{className:"absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark",children:l($e,{className:"w-5 h-5"})}),l("input",{type:"text",placeholder:"Name",className:"form-input ltr:pl-10 rtl:pr-10",id:"name"})]}),u("div",{className:"relative mb-4",children:[l("span",{className:"absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark",children:l(pt,{})}),l("input",{type:"email",placeholder:"Email",className:"form-input ltr:pl-10 rtl:pr-10",id:"email"})]}),u("div",{className:"relative mb-4",children:[l("span",{className:"absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark",children:l(Ie,{className:"w-5 h-5"})}),l("input",{type:"password",placeholder:"Password",className:"form-input ltr:pl-10 rtl:pr-10",id:"password"})]}),l("button",{type:"button",className:"btn btn-primary w-full",children:"Submit"})]})}),l("div",{className:"my-4 text-center text-xs text-white-dark dark:text-white-dark/70",children:"OR"}),u("div",{className:"mb-5 flex items-center justify-center gap-3",children:[u("button",{type:"button",className:"btn btn-outline-primary flex gap-1",children:[l(ze,{className:"w-5 h-5 shrink-0"}),l("span",{children:"Facebook"})]}),u("button",{type:"button",className:"btn btn-outline-danger flex gap-1",children:[l(Le,{className:"shrink-0"}),l("span",{children:"Github"})]})]}),l("div",{className:"border-t border-[#ebe9f1] p-5 dark:border-white/10",children:u("p",{className:"text-center text-sm text-white-dark dark:text-white-dark/70",children:["Already have",l("button",{type:"button",className:"text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark",children:"Login?"})]})})]})})})})]})})]}),u("div",{children:[l("button",{type:"button",onClick:()=>ve(!0),className:"btn btn-secondary",children:"Slider"}),l(F,{as:"div",open:ot,onClose:()=>{ve(!1)},children:l("div",{id:"slider_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:l("div",{className:"flex min-h-screen items-start justify-center px-4",children:u(F.Panel,{className:"animate__animated animate__fadeIn panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 py-1 px-4",children:[u("div",{className:"flex items-center justify-between py-5 text-lg font-semibold dark:text-white",children:[l("span",{children:"Slider"}),l("button",{onClick:()=>ve(!1),type:"button",className:"text-white-dark hover:text-dark",children:l(L,{className:"w-5 h-5"})})]}),u(lt,{modules:[vi,bi],navigation:{nextEl:".swiper-button-next1",prevEl:".swiper-button-prev1"},pagination:{clickable:!0},className:"swiper mx-auto mb-5 max-w-3xl",id:"slider1",dir:De.rtlClass,children:[l("div",{className:"swiper-wrapper",children:a.map((G,be)=>l(rt,{children:l("img",{src:`/assets/images/${G}`,className:"max-h-80 w-full object-cover",alt:"img"})},be))}),l("button",{type:"button",className:"swiper-button-prev1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:left-2 rtl:right-2",children:l(je,{className:"w-5 h-5 rtl:-rotate-90 rotate-90"})}),l("button",{type:"button",className:"swiper-button-next1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1 text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:right-2 rtl:left-2",children:l(je,{className:"w-5 h-5 rtl:rotate-90 -rotate-90"})}),l("div",{className:"swiper-pagination"})]},De.rtlClass==="rtl"?"true":"false")]})})})})]})]})]}),i.includes("code8")&&l(X,{children:l("pre",{className:"language-typescript",children:`import { Dialog, Transition,Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

    const [modal17, setModal17] = useState(false);
    const [modal18, setModal18] = useState(false);
    const [modal19, setModal19] = useState(false);
    const [modal20, setModal20] = useState(false);
    const [modal21, setModal21] = useState(false);
    const [modal22, setModal22] = useState(false);

<div className="mb-5">
    <p className="text-center mb-4">More Custom Modals.</p>
    <div className="flex flex-wrap items-center justify-center gap-2">
        {/* standard */}
        <div>
            <button type="button" onClick={() => setModal17(true)} className="btn btn-primary">
                Standard
            </button>
            <Transition appear show={modal17} as={Fragment}>
                <Dialog as="div" open={modal17} onClose={() => setModal17(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="standard_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex py-2 bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-center">
                                        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f1f2f3] dark:bg-white/10">
                                            <svg>...</svg>
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="py-5 text-white-dark text-center">
                                            <p>
                                                Vivamus vitae hendrerit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi
                                                consequat auctor turpis, vitae dictum augue efficitur vitae. Vestibulum a risus ipsum. Quisque nec lacus dolor. Quisque ornare
                                                tempor orci id rutrum.
                                            </p>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" onClick={() => setModal17(false)} className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button type="button" onClick={() => setModal17(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        {/* tabs */}
        <div>
            <button onClick={() => setModal18(true)} type="button" className="btn btn-info">
                Tabs
            </button>
            <Transition appear show={modal18} as={Fragment}>
                <Dialog as="div" open={modal18} onClose={() => setModal18(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="tabs_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">Tabs</h5>
                                        <button onClick={() => setModal18(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <Tab.Group>
                                            <Tab.List className="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            type="button"
                                                            className={\`\${
                                                                selected
                                                                    ? '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black !outline-none '
                                                                    : ''
                                                            } p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black\`}
                                                        >
                                                            Home
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            type="button"
                                                            className={\`\${
                                                                selected
                                                                    ? '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black !outline-none '
                                                                    : ''
                                                            } p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black\`}
                                                        >
                                                            Profile
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            type="button"
                                                            className={\`\${
                                                                selected
                                                                    ? '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black !outline-none '
                                                                    : ''
                                                            } p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black\`}
                                                        >
                                                            Contact
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab className="p-3.5 py-2 -mb-[1px] block pointer-events-none text-white-light dark:text-dark outline-none">Disabled</Tab>
                                            </Tab.List>
                                            <Tab.Panels>
                                                <Tab.Panel>
                                                    <div className="active pt-5">
                                                        <h4 className="font-semibold text-2xl mb-4">We move your world!</h4>
                                                        <p className="mb-4">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        </p>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        </p>
                                                    </div>
                                                </Tab.Panel>
                                                <Tab.Panel>
                                                    <div>
                                                        <div className="flex items-start pt-5">
                                                            <div className="w-20 h-20 ltr:mr-4 rtl:ml-4 flex-none">
                                                                <img
                                                                    src="/assets/images/profile-34.jpeg"
                                                                    alt="img"
                                                                    className="w-20 h-20 m-0 rounded-full ring-2 ring-[#ebedf2] dark:ring-white-dark object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-auto">
                                                                <h5 className="text-xl font-medium mb-4">Media heading</h5>
                                                                <p className="text-white-dark">
                                                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
                                                                    vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                                                    lacinia congue felis in faucibus.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Panel>
                                                <Tab.Panel>
                                                    <div className="pt-5">
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                                            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                        </p>
                                                    </div>
                                                </Tab.Panel>
                                                <Tab.Panel>Disabled</Tab.Panel>
                                            </Tab.Panels>
                                        </Tab.Group>
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setModal18(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={() => setModal18(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        {/* profile */}
        <div>
            <button type="button" onClick={() => setModal19(true)} className="btn btn-success">
                Profile
            </button>
            <Transition appear show={modal19} as={Fragment}>
                <Dialog as="div" open={modal19} onClose={() => setModal19(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0"></div>
                    </Transition.Child>
                    <div id="profile_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden max-w-[300px] w-full bg-secondary dark:bg-secondary my-8 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-end pt-4 ltr:pr-4 rtl:pl-4 text-white dark:text-white-light">
                                        <button onClick={() => setModal19(false)} type="button" className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="py-5 text-white dark:text-white-light text-center">
                                            <div className="rounded-full w-20 h-20 mx-auto mb-7 overflow-hidden">
                                                <img src="/assets/images/profile-16.jpeg" alt="img" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="font-semibold">
                                                Click on view to access <br />
                                                your profile.
                                            </p>
                                        </div>
                                        <div className="flex justify-center gap-4 p-5">
                                            <button type="button" className="btn bg-white text-black dark:btn-dark">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        {/* login */}
        <div>
            <button type="button" onClick={() => setModal20(true)} className="btn btn-warning">
                Login
            </button>
            <Transition appear show={modal20} as={Fragment}>
                <Dialog as="div" open={modal20} onClose={() => setModal20(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="login_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                        <h5>Login</h5>
                                        <button type="button" onClick={() => setModal20(false)} className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <form>
                                            <div className="relative mb-4">
                                                <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                    <svg>...</svg>
                                                </span>
                                                <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
                                            </div>
                                            <div className="relative mb-4">
                                                <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                    <svg>...</svg>
                                                </span>
                                                <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="login_password" />
                                            </div>
                                            <button type="button" className="btn btn-primary w-full">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                    <div className="my-4 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div>
                                    <div className="flex items-center justify-center gap-3 mb-5">
                                        <button type="button" className="btn btn-outline-primary flex gap-1">
                                            <svg>...</svg>

                                            <span>Facebook</span>
                                        </button>
                                        <button type="button" className="btn btn-outline-danger flex gap-1">
                                            <svg>...</svg>
                                            <span>Github</span>
                                        </button>
                                    </div>
                                    <div className="p-5 border-t border-[#ebe9f1] dark:border-white/10">
                                        <p className="text-sm text-center text-white-dark dark:text-white-dark/70">
                                            Looking to
                                            <button type="button" className="text-[#515365] hover:underline dark:text-white-dark ltr:ml-1 rtl:mr-1">
                                                create an account?
                                            </button>
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        {/* Register */}
        <div>
            <button type="button" onClick={() => setModal21(true)} className="btn btn-danger">
                Register
            </button>
            <Transition appear show={modal21} as={Fragment}>
                <Dialog
                    as="div"
                    open={modal21}
                    onClose={() => {
                        setModal21(false);
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                        <h5>Register</h5>
                                        <button type="button" onClick={() => setModal21(false)} className="text-white-dark hover:text-dark">
                                            <svg>...</svg>
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="relative mb-4">
                                                <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                    <svg>...</svg>
                                                </span>
                                                <input type="text" placeholder="Name" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                            </div>
                                            <div className="relative mb-4">
                                                <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                    <svg>...</svg>
                                                </span>
                                                <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" />
                                            </div>
                                            <div className="relative mb-4">
                                                <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                    <svg>...</svg>
                                                </span>
                                                <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="password" />
                                            </div>
                                            <button type="button" className="btn btn-primary w-full">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                    <div className="my-4 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div>
                                    <div className="flex items-center justify-center gap-3 mb-5">
                                        <button type="button" className="btn btn-outline-primary flex gap-1">
                                            <svg>...</svg>
                                            <span>Facebook</span>
                                        </button>
                                        <button type="button" className="btn btn-outline-danger flex gap-1">
                                            <svg>...</svg>
                                            <span>Github</span>
                                        </button>
                                    </div>
                                    <div className="p-5 border-t border-[#ebe9f1] dark:border-white/10">
                                        <p className="text-sm text-center text-white-dark dark:text-white-dark/70">
                                            Already have
                                            <button type="button" className="text-[#515365] hover:underline dark:text-white-dark ltr:ml-1 rtl:mr-1">
                                                Login?
                                            </button>
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
        {/* slider */}
        <div>
            <button type="button" onClick={() => setModal22(true)} className="btn btn-secondary">
                Slider
            </button>
            <Dialog
                as="div"
                open={modal22}
                onClose={() => {
                    setModal22(false);
                }}
            >
                <div id="slider_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Dialog.Panel className="animate__animated animate__fadeIn panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 py-1 px-4">
                            <div className="flex items-center justify-between py-5 text-lg font-semibold dark:text-white">
                                <span>Slider</span>
                                <button onClick={() => setModal22(false)} type="button" className="text-white-dark hover:text-dark">
                                    <svg>...</svg>
                                </button>
                            </div>
                            <Swiper
                                ref={swiperRef}
                                modules={[Navigation, Pagination]}
                                navigation={{
                                    nextEl: '.swiper-button-next-ex1',
                                    prevEl: '.swiper-button-prev-ex1',
                                }}
                                observer={true}
                                observeParents={true}
                                pagination={{ clickable: true }}
                                className="swiper mx-auto mb-5 max-w-3xl"
                                id="slider1"
                                dir={themeConfig.rtlClass}
                                key={themeConfig.rtlClass === 'rtl' ? 'true' : 'false'}
                            >
                                <div className="swiper-wrapper">
                                    {items.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <img src={\`/assets/images/\${item}\`} className="max-h-80 w-full object-cover" alt="img" />
                                            </SwiperSlide>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    className="swiper-button-prev-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:left-2 rtl:right-2"
                                >
                                    <svg>...</svg>
                                </button>
                                <button
                                    type="button"
                                    className="swiper-button-next-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1 text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:right-2 rtl:left-2"
                                >
                                    <svg>...</svg>
                                </button>
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </div>
    </div>
</div>`})})]})]})]})]})};export{Vi as default};
