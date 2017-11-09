!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("PropTypes")):"function"==typeof define&&define.amd?define(["React","PropTypes"],t):"object"==typeof exports?exports.SentenceCrafter=t(require("React"),require("PropTypes")):e.SentenceCrafter=t(e.React,e.PropTypes)}(this,function(e,t){return webpackJsonpSentenceCrafter([0,1],[function(t,n){t.exports=e},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"phraseContextTypes",function(){return y}),n.d(t,"Input",function(){return v}),n.d(t,"Word",function(){return b}),n.d(t,"Sentence",function(){return m}),n.d(t,"List",function(){return O}),n.d(t,"Phrase",function(){return _});var s=n(0),a=(n.n(s),n(3)),l=n.n(a),p=n(2),d=(n.n(p),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),f={verticalAlign:"super",fontSize:"smaller",margin:"0 -0.05em 0 0.05em",animation:"sentence-crafter-blinker 1s ease-in-out infinite"},h=function(e){var t=void 0,n=void 0,r=void 0,i=e.onValueChange||function(e){return e},o=e.options||[],u=function(){t&&n&&r&&t.options[t.selectedIndex]&&(r.innerText=t.options[t.selectedIndex].text,t.style.width=n.getBoundingClientRect().width+"px")};return s.createElement("span",null,s.createElement("select",{className:"sentence-crafter-input sentence-crafter-select sentence-crafter-input-hidden",ref:function(e){n=e,u()}},s.createElement("option",{ref:function(e){r=e,u()}})),s.createElement("select",{className:"sentence-crafter-input sentence-crafter-select",id:e.id,value:e.value||"",style:e.value?{}:f,name:e.name,ref:function(e){t=e,e&&i(e.value),u()},onChange:function(e){i(e.target.value)}},e.required||s.createElement("option",{className:"sentence-crafter-option",value:""},e.placeholder||"▾"),o.map(function(e){var t=e.id,n=e.value;return s.createElement("option",{className:"sentence-crafter-option",key:t,value:t},n)})))},y={parentId:l.a.string.isRequired,selectOption:l.a.func.isRequired,setSelection:l.a.func.isRequired,selections:l.a.PropTypes.oneOfType([l.a.object,l.a.array]),choices:l.a.object.isRequired},v=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),d(t,[{key:"componentDidMount",value:function(){var e=this.props.id,t=this.context.choices[this.getKey()],n=this.context.selections.hasOwnProperty(e);this.value=!n&&t}},{key:"getKey",value:function(){var e=this.context.parentId,t=this.props.id;return"string"==typeof t?e+"."+t:e+"["+t+"]"}},{key:"value",set:function(e){var t=(this.props.id,this.context),n=(t.selectOption,t.setSelection,{id:e});this.context.selectOption(this.props.id,n)&&this.context.setSelection(this.props.id,function(){return n})},get:function(){return this.context.selections[this.props.id]&&this.context.selections[this.props.id].id}}]),t}(s.Component);v.contextTypes=y;var b=function(e){function t(){o(this,t);var e=u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onValueChange=function(t,n){var r=e.props.id,i=e.context,o=i.selectOption,u=i.setSelection,c=e.context.choices[e.getKey()],s=!e.context.selections.hasOwnProperty(r)&&c&&t.find(function(e){return e.id===c}),a=s||t.find(function(e){return e.id===n});o(r,a)&&u(r,function(){return a})},e}return c(t,e),d(t,[{key:"getOptions",value:function(){return this.props.getOptions(this.context.selections)}},{key:"getKey",value:function(){var e=this.context.parentId,t=this.props.id;return"string"==typeof t?e+"."+t:e+"["+t+"]"}},{key:"render",value:function(){var e=this,t=this.props,n=t.placeholder,r=t.required,i=this.getOptions();if(i){var o=this.getKey();return s.createElement(h,{required:r,key:o,name:o,id:o,placeholder:n,onValueChange:function(t){return e.onValueChange(i,t)},value:this.value,options:i})}return null}},{key:"value",get:function(){return this.context.selections[this.props.id]&&this.context.selections[this.props.id].id}}]),t}(s.Component);b.contextTypes=y;var g=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),d(t,[{key:"getChildContext",value:function(){var e=this,t=this;return{get parentId(){var e=t.context.parentId,n=t.props.id;return"string"==typeof n?e+"."+n:e+"["+n+"]"},setSelection:function(t,n){e.context.setSelection(e.props.id,function(r){return e.updateSelections(t,n,r)})},selectOption:function(t,n){e.props.id;return e.context.selectOption(e.props.id+"."+t,n)},get selections(){return t.context.selections[t.props.id]},get choices(){return t.context.choices}}}},{key:"componentWillMount",value:function(){var e=this;this.context.setSelection(this.props.id,function(){return e.getInitialSelections()})}}]),t}(s.Component);g.contextTypes=y,g.childContextTypes=y;var m=function(e){function t(e){o(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={choices:{},selections:{}},n}return c(t,e),d(t,[{key:"getChildContext",value:function(){var e=this;return{parentId:this.props.id,setSelection:function(t,n){e.setState(function(e){var r=e.selections;return{selections:Object.assign({},r,i({},t,n(r[t])))}})},selectOption:function(t,n){var r=e.props.id+"."+t;return e.state.choices[r]!==(n&&n.id)&&(e.setState(function(e){var t=e.choices;if(t[r]!==(n&&n.id))return{choices:Object.assign({},t,i({},r,n&&n.id))}}),!0)},selections:this.state.selections,choices:this.props.choices}}},{key:"render",value:function(){return s.createElement("span",{className:"sentence-crafter"},this.props.children)}}]),t}(s.Component);m.childContextTypes=g.contextTypes;var O=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),d(t,[{key:"getInitialSelections",value:function(){return[]}},{key:"updateSelections",value:function(e,t,n){return[].concat(r(n.slice(0,e)),[t(n[e])],r(n.slice(e+1)))}},{key:"render",value:function(){var e=this.context.selections[this.props.id];if(Array.isArray(e)){for(var t=[],n=0,r=!0;r;n++){var i=this.props.children(this.context.selections,n);if(!i)break;t.push(i),r=!!e[n]}return s.createElement("span",null,t)}return null}}]),t}(g),_=function(e){function t(){return o(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),d(t,[{key:"getInitialSelections",value:function(){return{}}},{key:"updateSelections",value:function(e,t,n){return Object.assign({},n,i({},e,t(n[e])))}},{key:"render",value:function(){return this.context.selections[this.props.id]?s.createElement("span",null,this.props.children(this.context.selections)):null}}]),t}(g)},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);n(6)(r,{});r.locals&&(e.exports=r.locals)},function(e,n){e.exports=t},function(e,t,n){t=e.exports=n(5)(void 0),t.push([e.i,".sentence-crafter-input{background:inherit;color:inherit;display:inline-block;border:inherit;margin:0 .1em;-webkit-appearance:inherit;-webkit-border-radius:inherit;border-radius:inherit;font:inherit}.sentence-crafter-input-hidden{position:absolute;visibility:hidden}@keyframes sentence-crafter-blinker{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}",""])},,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"Field",function(){return p}),n.d(t,"DateField",function(){return d}),n.d(t,"BooleanField",function(){return f}),n.d(t,"MultiChoiceField",function(){return h}),n.d(t,"NestedField",function(){return y}),n.d(t,"Table",function(){return g});var u=n(0),c=(n.n(u),n(1)),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){function t(){r(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.resize=function(t){if(t&&e.hiddenSpan&&"date"!==e.props.type){e.value=t.value,e.hiddenSpan.innerText=t.value?t.value+".":t.placeholder;var n=e.hiddenSpan.getBoundingClientRect(),r=n.width;n.height;t.style.width=r+"px"}},e}return o(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.getKey();return u.createElement("span",null,u.createElement("span",{ref:function(t){return e.hiddenSpan=t},style:{minWidth:"20px",position:"absolute",visibility:"hidden"}}),u.createElement("input",{className:"sentence-crafter-input",placeholder:"<blank>",type:this.props.type||"text",key:t,name:t,id:t,ref:function(t){return e.resize(t)},onChange:function(t){return e.resize(t.target)},value:this.value||""}))}}]),t}(c.Input),l=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),s(t,[{key:"onValueChange",value:function(e){e&&(this.value=e.value)}},{key:"render",value:function(){var e=this,t=this.getKey();return u.createElement("input",{className:"sentence-crafter-input",placeholder:"<blank>",type:"date",key:t,name:t,id:t,ref:function(t){return e.onValueChange(t)},onChange:function(t){return e.onValueChange(t.target)},value:this.value})}}]),t}(c.Input),p=function(){function e(t,n){r(this,e),this.id=t,this.value=n,this.conditions=[{id:"eq",value:"is"},{id:"neq",value:"is not"}]}return s(e,[{key:"Query",value:function(){return u.createElement(a,{key:"value",id:"value"})}}]),e}(),d=function(e){function t(){r(this,t);var e=i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.conditions=[{id:"gt",value:"after"},{id:"lt",value:"before"}],e}return o(t,e),s(t,[{key:"Query",value:function(){return u.createElement(l,{key:"value",id:"value"})}}]),t}(p),f=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),t}(p),h=function(e){function t(e,n,o){r(this,t);var u=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return u.options=o,u}return o(t,e),s(t,[{key:"Query",value:function(){var e=this;return u.createElement(c.Word,{id:"value",placeholder:"(blank)",getOptions:function(){return e.options}})}}]),t}(p),y=function(e){function t(e,n,o){r(this,t);var u=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return u.subFields=o,u}return o(t,e),t}(p),v=function(e){var t=e.table;return u.createElement(c.List,{id:"query"},function(e,n){var r=(e.doQuery,e.query);return(0===n||r[n-1]&&r[n-1].cont)&&u.createElement(c.Phrase,{key:n,id:n},function(e){return u.createElement("span",null,u.createElement(c.Word,{id:"fieldId",required:!0,getOptions:function(){return e?t.fields.filter(function(t){var r=t.id;return!e.slice(0,n).find(function(e){var t=e.fieldId;return t&&t.id===r})}):t.fields}}),u.createElement(c.Word,{id:"subFieldId",required:!0,getOptions:function(e){var t=e.fieldId;return t instanceof y&&t.subFields}}),u.createElement(c.Word,{id:"op",required:!0,getOptions:function(e){var t=e.fieldId;return t&&t.conditions}}),e[n].fieldId&&e[n].fieldId.Query(),u.createElement(c.Word,{id:"cont",placeholder:"(+and)",getOptions:function(n){return n.op&&e.length<t.fields.length-1&&[{id:"and",value:", and"}]}}))})})},b=function(){return u.createElement(c.List,{id:"alternatives"},function(e,t){var n=e.table,r=e.doQuery,i=e.alternatives;return n&&r&&(0===t||i[t-1]&&i[t-1].cont)&&u.createElement(c.Phrase,{key:t,id:t},function(){return u.createElement("span",null,u.createElement(v,{table:n}),u.createElement(c.Word,{id:"cont",placeholder:"(+or)",getOptions:function(e){var t=e.query;return t&&t.length&&t[t.length-1].fieldId&&[{id:"or",value:"; or"}]}}))})})},g=function e(t,n,i){r(this,e),this.id=t,this.value=n,this.fields=i},m=function(e){var t=e.fieldId,n=e.subFieldId;return t&&(t instanceof y?n:t)},O=[{id:"year",value:"Year"},{id:"month",value:"Month"},{id:"day",value:"Day"},{id:"hour",value:"Hour"},{id:"minutes",value:"Minute"},{id:"seconds",value:"Second"},{id:"milliseconds",value:"Millisecond"}],_=function(e){var t=e.charts,n=e.choices;return u.createElement(c.Sentence,{id:"report",choices:n},u.createElement(c.Word,{id:"chart",required:!0,getOptions:function(){return t}}),u.createElement(c.Word,{id:"table",placeholder:"table",required:!0,getOptions:function(e){var t=e.chart;return t&&t.tables}}),u.createElement(c.Word,{id:"doQuery",placeholder:"(+filter)",getOptions:function(e){return e.table&&[{id:"where",value:"where"}]}}),u.createElement(b,null),u.createElement("span",{key:"grouped by"},"grouped by"),u.createElement(c.Phrase,{id:"group"},function(e){var t=e.table;return t&&u.createElement("span",null,u.createElement(c.Word,{id:"dateInterval",required:!0,getOptions:function(e){var t=e.fieldId,n=e.subFieldId;return m({fieldId:t,subFieldId:n})instanceof d&&O}}),u.createElement(c.Word,{id:"fieldId",required:!0,getOptions:function(){return t.fields}}),u.createElement(c.Word,{id:"subFieldId",required:!0,getOptions:function(e){var t=e.fieldId;return t instanceof y&&t.subFields}}))}),u.createElement(c.Word,{id:"doSplit",placeholder:"(+split)",getOptions:function(e){var t=e.table;return e.group&&t&&[{id:"split by",value:"split by"}]}}),u.createElement(c.Phrase,{id:"split"},function(e){var t=e.table,n=e.group,r=e.doSplit;return t&&r&&n&&u.createElement("span",null,u.createElement(c.Word,{id:"fieldId",required:!0,getOptions:function(){return t.fields.filter(function(e){return e.id!==n.fieldId.id&&!(e instanceof d)})}}),u.createElement(c.Word,{id:"subFieldId",required:!0,getOptions:function(e){var t=e.fieldId;return t instanceof y&&t.subFields}}))}))};t.default=_}],[7])});