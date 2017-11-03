(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("PropTypes"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "PropTypes"], factory);
	else if(typeof exports === 'object')
		exports["SentenceCrafter"] = factory(require("React"), require("PropTypes"));
	else
		root["SentenceCrafter"] = factory(root["React"], root["PropTypes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__) {
return webpackJsonpSentenceCrafter([0,1],[
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "phraseContextTypes", function() { return phraseContextTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Word", function() { return Word; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sentence", function() { return Sentence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Phrase", function() { return Phrase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var blinkerStyle = {
    verticalAlign: 'super',
    fontSize: 'smaller',
    margin: '0 -0.05em 0 0.05em',
    animation: 'sentence-crafter-blinker 1s ease-in-out infinite'
};
var SelectComponent = function SelectComponent(props) {
    var select = void 0;
    var hiddenSelect = void 0;
    var hiddenOption = void 0;
    var onValueChange = props.onValueChange || function ($) {
        return $;
    };
    var options = props.options || [];
    var resize = function resize() {
        if (!select || !hiddenSelect || !hiddenOption || !select.options[select.selectedIndex]) return;
        hiddenOption.innerText = select.options[select.selectedIndex].text;
        select.style.width = hiddenSelect.getBoundingClientRect().width + 'px';
    };
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("select", { className: 'sentence-crafter-input sentence-crafter-select sentence-crafter-input-hidden', ref: function ref($) {
            hiddenSelect = $;resize();
        } }, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("option", { ref: function ref($) {
            hiddenOption = $;resize();
        } })), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("select", { className: 'sentence-crafter-input sentence-crafter-select', id: props.id, value: props.value || '', style: props.value ? {} : blinkerStyle, name: props.name, ref: function ref($) {
            select = $;$ && onValueChange($.value);resize();
        }, onChange: function onChange(e) {
            onValueChange(e.target.value);
        } }, props.required || __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("option", { className: 'sentence-crafter-option', value: '' }, props.placeholder || '▾'), options.map(function (_ref) {
        var id = _ref.id,
            value = _ref.value;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("option", { className: 'sentence-crafter-option', key: id, value: id }, value);
    })));
};
var phraseContextTypes = {
    parentId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    selectOption: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    setSelection: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    selections: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.PropTypes.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array]),
    choices: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
};
var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input() {
        _classCallCheck(this, Input);

        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    _createClass(Input, [{
        key: 'getKey',
        value: function getKey() {
            var parentId = this.context.parentId;
            var id = this.props.id;

            return typeof id === 'string' ? parentId + '.' + id : parentId + '[' + id + ']';
        }
    }, {
        key: 'value',
        set: function set(value) {
            var id = this.props.id;
            var _context = this.context,
                selectOption = _context.selectOption,
                setSelection = _context.setSelection;

            var preSelectedChoice = this.context.choices[this.getKey()];
            var weMadeSelection = this.context.selections.hasOwnProperty(id);
            value = !weMadeSelection && preSelectedChoice ? preSelectedChoice : value;
            var selection = { id: value };
            this.context.selectOption(this.props.id, selection) && this.context.setSelection(this.props.id, function () {
                return selection;
            });
        },
        get: function get() {
            console.log(this.context.selections);
            return this.context.selections[this.props.id] && this.context.selections[this.props.id].id;
        }
    }]);

    return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
Input.contextTypes = phraseContextTypes;
var Word = function (_React$Component2) {
    _inherits(Word, _React$Component2);

    function Word() {
        _classCallCheck(this, Word);

        var _this2 = _possibleConstructorReturn(this, (Word.__proto__ || Object.getPrototypeOf(Word)).apply(this, arguments));

        _this2.onValueChange = function (options, value) {
            var id = _this2.props.id;
            var _this2$context = _this2.context,
                selectOption = _this2$context.selectOption,
                setSelection = _this2$context.setSelection;

            var preSelectedChoice = _this2.context.choices[_this2.getKey()];
            var preSelection = !_this2.context.selections.hasOwnProperty(id) && preSelectedChoice && options.find(function (_ref2) {
                var id = _ref2.id;
                return id === preSelectedChoice;
            });
            var selection = preSelection || options.find(function (_ref3) {
                var id = _ref3.id;
                return id === value;
            });
            selectOption(id, selection) && setSelection(id, function () {
                return selection;
            });
        };
        return _this2;
    }

    _createClass(Word, [{
        key: 'getOptions',
        value: function getOptions() {
            return this.props.getOptions(this.context.selections);
        }
    }, {
        key: 'getKey',
        value: function getKey() {
            var parentId = this.context.parentId;
            var id = this.props.id;

            return typeof id === 'string' ? parentId + '.' + id : parentId + '[' + id + ']';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                placeholder = _props.placeholder,
                required = _props.required;

            var options = this.getOptions();
            // Only show the select if there are options
            if (options) {
                var key = this.getKey();
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SelectComponent, { required: required, key: key, name: key, id: key, placeholder: placeholder, onValueChange: function onValueChange(value) {
                        return _this3.onValueChange(options, value);
                    }, value: this.value, options: options });
            } else return null;
        }
    }, {
        key: 'value',
        get: function get() {
            return this.context.selections[this.props.id] && this.context.selections[this.props.id].id;
        }
    }]);

    return Word;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
Word.contextTypes = phraseContextTypes;

var AbstractPhrase = function (_React$Component3) {
    _inherits(AbstractPhrase, _React$Component3);

    function AbstractPhrase() {
        _classCallCheck(this, AbstractPhrase);

        return _possibleConstructorReturn(this, (AbstractPhrase.__proto__ || Object.getPrototypeOf(AbstractPhrase)).apply(this, arguments));
    }

    _createClass(AbstractPhrase, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this5 = this;

            var self = this;
            return {
                get parentId() {
                    var parent = self.context.parentId;
                    var child = self.props.id;
                    return typeof child === 'string' ? parent + '.' + child : parent + '[' + child + ']';
                },
                setSelection: function setSelection(id, f) {
                    _this5.context.setSelection(_this5.props.id, function (prevSelections) {
                        return _this5.updateSelections(id, f, prevSelections);
                    });
                },
                selectOption: function selectOption(id, selection) {
                    var parent = _this5.props.id;
                    var child = id;
                    var key = typeof child === 'string' ? parent + '.' + child : parent + '[' + child + ']';
                    return _this5.context.selectOption(_this5.props.id + '.' + id, selection);
                },
                get selections() {
                    return self.context.selections[self.props.id];
                },
                get choices() {
                    return self.context.choices;
                }
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this6 = this;

            this.context.setSelection(this.props.id, function () {
                return _this6.getInitialSelections();
            });
        }
    }]);

    return AbstractPhrase;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

AbstractPhrase.contextTypes = phraseContextTypes;
AbstractPhrase.childContextTypes = phraseContextTypes;
var Sentence = function (_React$Component4) {
    _inherits(Sentence, _React$Component4);

    function Sentence(props) {
        _classCallCheck(this, Sentence);

        var _this7 = _possibleConstructorReturn(this, (Sentence.__proto__ || Object.getPrototypeOf(Sentence)).call(this, props));

        _this7.state = {
            choices: {},
            selections: {}
        };
        return _this7;
    }

    _createClass(Sentence, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this8 = this;

            return {
                parentId: this.props.id,
                setSelection: function setSelection(id, f) {
                    _this8.setState(function (_ref4) {
                        var selections = _ref4.selections;
                        return {
                            selections: Object.assign({}, selections, _defineProperty({}, id, f(selections[id])))
                        };
                    });
                },
                selectOption: function selectOption(id, selection) {
                    var key = _this8.props.id + '.' + id;
                    var currValue = _this8.state.choices[key];
                    if (currValue === (selection && selection.id)) return false;
                    _this8.setState(function (_ref5) {
                        var choices = _ref5.choices;

                        var currValue = choices[key];
                        if (currValue === (selection && selection.id)) return;
                        return {
                            choices: Object.assign({}, choices, _defineProperty({}, key, selection && selection.id))
                        };
                    });
                    return true;
                },
                selections: this.state.selections,
                choices: this.props.choices
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "sentence-crafter" }, this.props.children);
        }
    }]);

    return Sentence;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
Sentence.childContextTypes = AbstractPhrase.contextTypes;
var List = function (_AbstractPhrase) {
    _inherits(List, _AbstractPhrase);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'getInitialSelections',
        value: function getInitialSelections() {
            return [];
        }
    }, {
        key: 'updateSelections',
        value: function updateSelections(idx, f, prevSelection) {
            return [].concat(_toConsumableArray(prevSelection.slice(0, idx)), [f(prevSelection[idx])], _toConsumableArray(prevSelection.slice(idx + 1)));
        }
    }, {
        key: 'render',
        value: function render() {
            var currSelection = this.context.selections[this.props.id];
            if (Array.isArray(currSelection)) {
                var components = [];
                for (var idx = 0, cont = true; cont; idx++) {
                    var component = this.props.children(this.context.selections, idx);
                    if (!component) break;
                    components.push(component);
                    cont = !!currSelection[idx];
                }
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, components);
            } else return null;
        }
    }]);

    return List;
}(AbstractPhrase);
var Phrase = function (_AbstractPhrase2) {
    _inherits(Phrase, _AbstractPhrase2);

    function Phrase() {
        _classCallCheck(this, Phrase);

        return _possibleConstructorReturn(this, (Phrase.__proto__ || Object.getPrototypeOf(Phrase)).apply(this, arguments));
    }

    _createClass(Phrase, [{
        key: 'getInitialSelections',
        value: function getInitialSelections() {
            return {};
        }
    }, {
        key: 'updateSelections',
        value: function updateSelections(id, f, currSelection) {
            return Object.assign({}, currSelection, _defineProperty({}, id, f(currSelection[id])));
        }
    }, {
        key: 'render',
        value: function render() {
            var currSelection = this.context.selections[this.props.id];
            if (currSelection) {
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, this.props.children(this.context.selections));
            } else return null;
        }
    }]);

    return Phrase;
}(AbstractPhrase);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".sentence-crafter-input {\n    background: inherit;\n    color: inherit;\n    display: inline-block;\n    border: inherit;\n    margin: 0 0.1em;\n    -webkit-appearance: inherit;\n    -webkit-border-radius: inherit;\n    border-radius: inherit;\n    font: inherit;\n}\n\n.sentence-crafter-input-hidden {\n    position: absolute;\n    visibility: hidden;\n}\n\n@keyframes sentence-crafter-blinker {\n    0% { opacity: 0.4; }\n    50% { opacity: 0.6; }\n    100% { opacity: 0.4; }\n}", ""]);

// exports


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateField", function() { return DateField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanField", function() { return BooleanField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiChoiceField", function() { return MultiChoiceField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedField", function() { return NestedField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DynamicInput = function (_Input) {
    _inherits(DynamicInput, _Input);

    function DynamicInput() {
        _classCallCheck(this, DynamicInput);

        var _this = _possibleConstructorReturn(this, (DynamicInput.__proto__ || Object.getPrototypeOf(DynamicInput)).apply(this, arguments));

        _this.resize = function (input) {
            if (!input || !_this.hiddenSpan || _this.props.type === 'date') return;
            _this.hiddenSpan.innerText = input.value ? input.value + '.' : input.placeholder;

            var _this$hiddenSpan$getB = _this.hiddenSpan.getBoundingClientRect(),
                width = _this$hiddenSpan$getB.width,
                height = _this$hiddenSpan$getB.height;

            input.style.width = width + 'px';
        };
        return _this;
    }

    _createClass(DynamicInput, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var key = this.getKey();
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { ref: function ref($) {
                    return _this2.hiddenSpan = $;
                }, style: {
                    minWidth: '20px',
                    position: 'absolute',
                    visibility: 'hidden'
                } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: 'sentence-crafter-input', placeholder: '<blank>', type: this.props.type, key: key, name: key, id: key, ref: function ref($) {
                    return _this2.resize($);
                }, onChange: function onChange(e) {
                    return _this2.resize(e.target);
                }, value: this.value }));
        }
    }]);

    return DynamicInput;
}(__WEBPACK_IMPORTED_MODULE_1__index__["Input"]);

var DateInput = function (_Input2) {
    _inherits(DateInput, _Input2);

    function DateInput() {
        _classCallCheck(this, DateInput);

        return _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).apply(this, arguments));
    }

    _createClass(DateInput, [{
        key: 'onValueChange',
        value: function onValueChange(input) {
            if (input) this.value = input.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var key = this.getKey();
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: 'sentence-crafter-input', placeholder: '<blank>', type: 'date', key: key, name: key, id: key, ref: function ref($) {
                    return _this4.onValueChange($);
                }, onChange: function onChange(e) {
                    return _this4.onValueChange(e.target);
                }, value: this.value });
        }
    }]);

    return DateInput;
}(__WEBPACK_IMPORTED_MODULE_1__index__["Input"]);

var Field = function () {
    function Field(id, value) {
        _classCallCheck(this, Field);

        this.id = id;
        this.value = value;
        this.conditions = [{ id: 'eq', value: 'is' }, { id: 'neq', value: 'is not' }];
    }

    _createClass(Field, [{
        key: 'Query',
        value: function Query() {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](DynamicInput, { key: 'value', id: 'value' });
        }
    }]);

    return Field;
}();
var DateField = function (_Field) {
    _inherits(DateField, _Field);

    function DateField() {
        _classCallCheck(this, DateField);

        var _this5 = _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).apply(this, arguments));

        _this5.conditions = [{ id: 'gt', value: 'after' }, { id: 'lt', value: 'before' }];
        return _this5;
    }

    _createClass(DateField, [{
        key: 'Query',
        value: function Query() {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](DateInput, { key: 'value', id: 'value' });
        }
    }]);

    return DateField;
}(Field);
var BooleanField = function (_Field2) {
    _inherits(BooleanField, _Field2);

    function BooleanField() {
        _classCallCheck(this, BooleanField);

        return _possibleConstructorReturn(this, (BooleanField.__proto__ || Object.getPrototypeOf(BooleanField)).apply(this, arguments));
    }

    return BooleanField;
}(Field);
var MultiChoiceField = function (_Field3) {
    _inherits(MultiChoiceField, _Field3);

    function MultiChoiceField(id, value, options) {
        _classCallCheck(this, MultiChoiceField);

        var _this7 = _possibleConstructorReturn(this, (MultiChoiceField.__proto__ || Object.getPrototypeOf(MultiChoiceField)).call(this, id, value));

        _this7.options = options;
        return _this7;
    }

    _createClass(MultiChoiceField, [{
        key: 'Query',
        value: function Query() {
            var _this8 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'value', placeholder: '(blank)', getOptions: function getOptions() {
                    return _this8.options;
                } });
        }
    }]);

    return MultiChoiceField;
}(Field);
var NestedField = function (_Field4) {
    _inherits(NestedField, _Field4);

    function NestedField(id, value, subFields) {
        _classCallCheck(this, NestedField);

        var _this9 = _possibleConstructorReturn(this, (NestedField.__proto__ || Object.getPrototypeOf(NestedField)).call(this, id, value));

        _this9.subFields = subFields;
        return _this9;
    }

    return NestedField;
}(Field);
var Query = function Query(_ref) {
    var table = _ref.table;

    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["List"], { id: 'query' }, function (_ref2, idx) {
        var doQuery = _ref2.doQuery,
            query = _ref2.query;
        return (idx === 0 || query[idx - 1] && query[idx - 1].cont) && __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Phrase"], { key: idx, id: idx }, function (query) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'fieldId', required: true, getOptions: function getOptions() {
                    return query ? table.fields.filter(function (_ref3) {
                        var id = _ref3.id;
                        return !query.slice(0, idx).find(function (_ref4) {
                            var fieldId = _ref4.fieldId;
                            return fieldId && fieldId.id === id;
                        });
                    }) : table.fields;
                } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'subFieldId', required: true, getOptions: function getOptions(_ref5) {
                    var fieldId = _ref5.fieldId;
                    return fieldId instanceof NestedField && fieldId.subFields;
                } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'op', required: true, getOptions: function getOptions(_ref6) {
                    var fieldId = _ref6.fieldId;
                    return fieldId && fieldId.conditions;
                } }), query[idx].fieldId && query[idx].fieldId.Query(), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'cont', placeholder: '(+and)', getOptions: function getOptions(_ref7) {
                    var op = _ref7.op;
                    return op && query.length < table.fields.length - 1 && [{ id: 'and', value: ', and' }];
                } }));
        });
    });
};
var Alternatives = function Alternatives() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["List"], { id: 'alternatives' }, function (_ref8, idx) {
        var table = _ref8.table,
            doQuery = _ref8.doQuery,
            alternatives = _ref8.alternatives;
        return table && doQuery && (idx === 0 || alternatives[idx - 1] && alternatives[idx - 1].cont) && __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Phrase"], { key: idx, id: idx }, function () {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Query, { table: table }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'cont', placeholder: '(+or)', getOptions: function getOptions(_ref9) {
                    var query = _ref9.query;
                    return query && query.length && query[query.length - 1].fieldId && [{ id: 'or', value: '; or' }];
                } }));
        });
    });
};
var Table = function Table(id, value, fields) {
    _classCallCheck(this, Table);

    this.id = id;
    this.value = value;
    this.fields = fields;
};
var getQueryField = function getQueryField(_ref10) {
    var fieldId = _ref10.fieldId,
        subFieldId = _ref10.subFieldId;
    return fieldId && (fieldId instanceof NestedField ? subFieldId : fieldId);
};
var intervals = [{ id: 'year', value: 'Year' }, { id: 'month', value: 'Month' }, { id: 'day', value: 'Day' }, { id: 'hour', value: 'Hour' }, { id: 'minutes', value: 'Minute' }, { id: 'seconds', value: 'Second' }, { id: 'milliseconds', value: 'Millisecond' }];
var ReportSelector = function ReportSelector(_ref11) {
    var charts = _ref11.charts,
        choices = _ref11.choices;
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Sentence"], { id: 'report', choices: choices }, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'chart', required: true, getOptions: function getOptions() {
            return charts;
        } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'table', placeholder: 'table', required: true, getOptions: function getOptions(_ref12) {
            var chart = _ref12.chart;
            return chart && chart.tables;
        } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'doQuery', placeholder: '(+filter)', getOptions: function getOptions(_ref13) {
            var table = _ref13.table;
            return table && [{ id: 'where', value: 'where' }];
        } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Alternatives, null), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { key: 'grouped by' }, "grouped by"), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Phrase"], { id: 'group' }, function (_ref14) {
        var table = _ref14.table;
        return table && __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'dateInterval', required: true, getOptions: function getOptions(_ref15) {
                var fieldId = _ref15.fieldId,
                    subFieldId = _ref15.subFieldId;
                return getQueryField({ fieldId: fieldId, subFieldId: subFieldId }) instanceof DateField && intervals;
            } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'fieldId', required: true, getOptions: function getOptions() {
                return table.fields;
            } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'subFieldId', required: true, getOptions: function getOptions(_ref16) {
                var fieldId = _ref16.fieldId;
                return fieldId instanceof NestedField && fieldId.subFields;
            } }));
    }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'doSplit', placeholder: '(+split)', getOptions: function getOptions(_ref17) {
            var table = _ref17.table,
                group = _ref17.group;
            return group && table && [{ id: 'split by', value: 'split by' }];
        } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Phrase"], { id: 'split' }, function (_ref18) {
        var table = _ref18.table,
            group = _ref18.group,
            doSplit = _ref18.doSplit;
        return table && doSplit && group && __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'fieldId', required: true, getOptions: function getOptions() {
                return table.fields.filter(function (field) {
                    return field.id !== group.fieldId.id && !(field instanceof DateField);
                });
            } }), __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__index__["Word"], { id: 'subFieldId', required: true, getOptions: function getOptions(_ref19) {
                var fieldId = _ref19.fieldId;
                return fieldId instanceof NestedField && fieldId.subFields;
            } }));
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (ReportSelector);

/***/ })
],[7]);
});