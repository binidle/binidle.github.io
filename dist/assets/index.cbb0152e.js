(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();function c(){}function A(e){return e()}function j(){return Object.create(null)}function $(e){e.forEach(A)}function B(e){return typeof e=="function"}function P(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function K(e){return Object.keys(e).length===0}function p(e,t,r){e.insertBefore(t,r||null)}function a(e){e.parentNode.removeChild(e)}function x(e){return document.createElement(e)}function W(e){return document.createTextNode(e)}function z(){return W(" ")}function D(e){return Array.from(e.childNodes)}let v;function d(e){v=e}const l=[],C=[],_=[],S=[],G=Promise.resolve();let b=!1;function J(){b||(b=!0,G.then(k))}function w(e){_.push(e)}const y=new Set;let h=0;function k(){const e=v;do{for(;h<l.length;){const t=l[h];h++,d(t),Q(t.$$)}for(d(null),l.length=0,h=0;C.length;)C.pop()();for(let t=0;t<_.length;t+=1){const r=_[t];y.has(r)||(y.add(r),r())}_.length=0}while(l.length);for(;S.length;)S.pop()();b=!1,y.clear(),d(e)}function Q(e){if(e.fragment!==null){e.update(),$(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(w)}}const g=new Set;let R;function I(e,t){e&&e.i&&(g.delete(e),e.i(t))}function U(e,t,r,o){if(e&&e.o){if(g.has(e))return;g.add(e),R.c.push(()=>{g.delete(e),o&&(r&&e.d(1),o())}),e.o(t)}else o&&o()}function V(e){e&&e.c()}function M(e,t,r,o){const{fragment:n,after_update:i}=e.$$;n&&n.m(t,r),o||w(()=>{const f=e.$$.on_mount.map(A).filter(B);e.$$.on_destroy?e.$$.on_destroy.push(...f):$(f),e.$$.on_mount=[]}),i.forEach(w)}function T(e,t){const r=e.$$;r.fragment!==null&&($(r.on_destroy),r.fragment&&r.fragment.d(t),r.on_destroy=r.fragment=null,r.ctx=[])}function X(e,t){e.$$.dirty[0]===-1&&(l.push(e),J(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function q(e,t,r,o,n,i,f,H=[-1]){const m=v;d(e);const u=e.$$={fragment:null,ctx:[],props:i,update:c,not_equal:n,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(m?m.$$.context:[])),callbacks:j(),dirty:H,skip_bound:!1,root:t.target||m.$$.root};f&&f(u.root);let E=!1;if(u.ctx=r?r(e,t.props||{},(s,O,...N)=>{const L=N.length?N[0]:O;return u.ctx&&n(u.ctx[s],u.ctx[s]=L)&&(!u.skip_bound&&u.bound[s]&&u.bound[s](L),E&&X(e,s)),O}):[],u.update(),E=!0,$(u.before_update),u.fragment=o?o(u.ctx):!1,t.target){if(t.hydrate){const s=D(t.target);u.fragment&&u.fragment.l(s),s.forEach(a)}else u.fragment&&u.fragment.c();t.intro&&I(e.$$.fragment),M(e,t.target,t.anchor,t.customElement),k()}d(m)}class F{$destroy(){T(this,1),this.$destroy=c}$on(t,r){if(!B(r))return c;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(r),()=>{const n=o.indexOf(r);n!==-1&&o.splice(n,1)}}$set(t){this.$$set&&!K(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Y(e){let t,r,o;return{c(){t=x("h1"),t.textContent="Binidle",r=z(),o=x("p"),o.textContent="Hello, World!"},m(n,i){p(n,t,i),p(n,r,i),p(n,o,i)},p:c,i:c,o:c,d(n){n&&a(t),n&&a(r),n&&a(o)}}}class Z extends F{constructor(t){super(),q(this,t,null,Y,P,{})}}function ee(e){let t,r,o;return r=new Z({}),{c(){t=x("main"),V(r.$$.fragment)},m(n,i){p(n,t,i),M(r,t,null),o=!0},p:c,i(n){o||(I(r.$$.fragment,n),o=!0)},o(n){U(r.$$.fragment,n),o=!1},d(n){n&&a(t),T(r)}}}class te extends F{constructor(t){super(),q(this,t,null,ee,P,{})}}new te({target:document.getElementById("app")});
