!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("PropTypes")):"function"==typeof define&&define.amd?define(["React","PropTypes"],t):"object"==typeof exports?exports.SentenceCrafter=t(require("React"),require("PropTypes")):e.SentenceCrafter=t(e.React,e.PropTypes)}(this,function(e,t){return webpackJsonpSentenceCrafter([1],[function(t,n){t.exports=e},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"phraseContextTypes",function(){return y}),n.d(t,"Input",function(){return v}),n.d(t,"Word",function(){return b}),n.d(t,"Sentence",function(){return x}),n.d(t,"List",function(){return m}),n.d(t,"Phrase",function(){return O});var u=n(0),a=(n.n(u),n(3)),p=n.n(a),l=n(2),f=(n.n(l),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),h={verticalAlign:"super",fontSize:"smaller",margin:"0 -0.05em 0 0.05em",animation:"sentence-crafter-blinker 1s ease-in-out infinite"},d=function(e){var t=void 0,n=void 0,r=void 0,i=e.onValueChange||function(e){return e},o=e.options||[],c=function(){t&&n&&r&&t.options[t.selectedIndex]&&(r.innerText=t.options[t.selectedIndex].text,t.style.width=n.getBoundingClientRect().width+"px")};return u.createElement("span",null,u.createElement("select",{className:"sentence-crafter-input sentence-crafter-select sentence-crafter-input-hidden",ref:function(e){n=e,c()}},u.createElement("option",{ref:function(e){r=e,c()}})),u.createElement("select",{className:"sentence-crafter-input sentence-crafter-select",id:e.id,value:e.value||"",style:e.value?{}:h,name:e.name,ref:function(e){t=e,e&&i(e.value),c()},onChange:function(e){i(e.target.value)}},e.required||u.createElement("option",{className:"sentence-crafter-option",value:""},e.placeholder||"▾"),o.map(function(e){var t=e.id,n=e.value;return u.createElement("option",{className:"sentence-crafter-option",key:t,value:t},n)})))},y={parentId:p.a.string.isRequired,selectOption:p.a.func.isRequired,setSelection:p.a.func.isRequired,selections:p.a.PropTypes.oneOfType([p.a.object,p.a.array]),choices:p.a.object.isRequired},v=function(e){function t(){return o(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),f(t,[{key:"componentDidMount",value:function(){var e=this.props.id,t=this.context.choices[this.getKey()],n=this.context.selections.hasOwnProperty(e);this.value=!n&&t}},{key:"getKey",value:function(){var e=this.context.parentId,t=this.props.id;return"string"==typeof t?e+"."+t:e+"["+t+"]"}},{key:"value",set:function(e){var t=(this.props.id,this.context),n=(t.selectOption,t.setSelection,{id:e});this.context.selectOption(this.props.id,n)&&this.context.setSelection(this.props.id,function(){return n})},get:function(){return this.context.selections[this.props.id]&&this.context.selections[this.props.id].id}}]),t}(u.Component);v.contextTypes=y;var b=function(e){function t(){o(this,t);var e=c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onValueChange=function(t,n){var r=e.props.id,i=e.context,o=i.selectOption,c=i.setSelection,s=e.context.choices[e.getKey()],u=!e.context.selections.hasOwnProperty(r)&&s&&t.find(function(e){return e.id===s}),a=u||t.find(function(e){return e.id===n});o(r,a)&&c(r,function(){return a})},e}return s(t,e),f(t,[{key:"getOptions",value:function(){return this.props.getOptions(this.context.selections)}},{key:"getKey",value:function(){var e=this.context.parentId,t=this.props.id;return"string"==typeof t?e+"."+t:e+"["+t+"]"}},{key:"render",value:function(){var e=this,t=this.props,n=t.placeholder,r=t.required,i=this.getOptions();if(i){var o=this.getKey();return u.createElement(d,{required:r,key:o,name:o,id:o,placeholder:n,onValueChange:function(t){return e.onValueChange(i,t)},value:this.value,options:i})}return null}},{key:"value",get:function(){return this.context.selections[this.props.id]&&this.context.selections[this.props.id].id}}]),t}(u.Component);b.contextTypes=y;var g=function(e){function t(){return o(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),f(t,[{key:"getChildContext",value:function(){var e=this,t=this;return{get parentId(){var e=t.context.parentId,n=t.props.id;return"string"==typeof n?e+"."+n:e+"["+n+"]"},setSelection:function(t,n){e.context.setSelection(e.props.id,function(r){return e.updateSelections(t,n,r)})},selectOption:function(t,n){e.props.id;return e.context.selectOption(e.props.id+"."+t,n)},get selections(){return t.context.selections[t.props.id]},get choices(){return t.context.choices}}}},{key:"componentWillMount",value:function(){var e=this;this.context.setSelection(this.props.id,function(){return e.getInitialSelections()})}}]),t}(u.Component);g.contextTypes=y,g.childContextTypes=y;var x=function(e){function t(e){o(this,t);var n=c(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={choices:{},selections:{}},n}return s(t,e),f(t,[{key:"getChildContext",value:function(){var e=this;return{parentId:this.props.id,setSelection:function(t,n){e.setState(function(e){var r=e.selections;return{selections:Object.assign({},r,i({},t,n(r[t])))}})},selectOption:function(t,n){var r=e.props.id+"."+t;return e.state.choices[r]!==(n&&n.id)&&(e.setState(function(e){var t=e.choices;if(t[r]!==(n&&n.id))return{choices:Object.assign({},t,i({},r,n&&n.id))}}),!0)},selections:this.state.selections,choices:this.props.choices}}},{key:"render",value:function(){return u.createElement("span",{className:"sentence-crafter"},this.props.children)}}]),t}(u.Component);x.childContextTypes=g.contextTypes;var m=function(e){function t(){return o(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),f(t,[{key:"getInitialSelections",value:function(){return[]}},{key:"updateSelections",value:function(e,t,n){return[].concat(r(n.slice(0,e)),[t(n[e])],r(n.slice(e+1)))}},{key:"render",value:function(){var e=this.context.selections[this.props.id];if(Array.isArray(e)){for(var t=[],n=0,r=!0;r;n++){var i=this.props.children(this.context.selections,n);if(!i)break;t.push(i),r=!!e[n]}return u.createElement("span",null,t)}return null}}]),t}(g),O=function(e){function t(){return o(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),f(t,[{key:"getInitialSelections",value:function(){return{}}},{key:"updateSelections",value:function(e,t,n){return Object.assign({},n,i({},e,t(n[e])))}},{key:"render",value:function(){return this.context.selections[this.props.id]?u.createElement("span",null,this.props.children(this.context.selections)):null}}]),t}(g)},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);n(6)(r,{});r.locals&&(e.exports=r.locals)},function(e,n){e.exports=t},function(e,t,n){t=e.exports=n(5)(void 0),t.push([e.i,".sentence-crafter-input{background:inherit;color:inherit;display:inline-block;border:inherit;margin:0 .1em;-webkit-appearance:inherit;-webkit-border-radius:inherit;border-radius:inherit;font:inherit}.sentence-crafter-input-hidden{position:absolute;visibility:hidden}@keyframes sentence-crafter-blinker{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}",""])}],[1])});