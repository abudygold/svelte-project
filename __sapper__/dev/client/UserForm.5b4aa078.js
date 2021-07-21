import { _ as __extends, Y as __assign, $ as MDCFoundation, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, u as create_slot, v as validate_slots, a3 as validate_store, a4 as component_subscribe, a5 as setContext, a8 as onDestroy, aa as writable, ab as set_store_value, E as update_slot, H as transition_in, I as transition_out, x as compute_rest_props, y as forwardEventsBuilder, z as get_current_component, O as getContext, a6 as onMount, a7 as dispatch, w as assign, A as exclude_internal_props, N as classMap, B as useActions, Q as empty, k as insert_dev, V as group_outros, X as check_outros, g as detach_dev, K as binding_callbacks, e as element, c as claim_element, b as children, C as set_attributes, j as add_location, D as action_destroyer, F as get_spread_update, G as is_function, J as run_all, n as noop, h as attr_dev, o as space, p as claim_space, l as append_dev, ac as listen_dev, an as classAdderBuilder, ao as Div, am as Span, ap as set_input_value, a2 as compute_slots, aq as tick, ar as events, aj as Ripple, P as create_component, R as claim_component, T as mount_component, U as get_spread_object, W as destroy_component, as as bubble, ad as bind, t as text, f as claim_text, m as set_data_dev, af as add_flush_callback, at as goto, au as prevent_default } from './client.d7fceac6.js';
import { e as exclude, p as prefixFilter, B as Button_1, c as customUsers, C as CommonLabel } from './CommonLabel.deac9c34.js';

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_REQUIRED: 'mdc-floating-label--required',
    LABEL_SHAKE: 'mdc-floating-label--shake',
    ROOT: 'mdc-floating-label',
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFloatingLabelFoundation = /** @class */ (function (_super) {
    __extends(MDCFloatingLabelFoundation, _super);
    function MDCFloatingLabelFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;
        _this.shakeAnimationEndHandler_ = function () { return _this.handleShakeAnimationEnd_(); };
        return _this;
    }
    Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
        get: function () {
            return cssClasses$4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
        /**
         * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                getWidth: function () { return 0; },
                registerInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCFloatingLabelFoundation.prototype.init = function () {
        this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
    };
    MDCFloatingLabelFoundation.prototype.destroy = function () {
        this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
    };
    /**
     * Returns the width of the label element.
     */
    MDCFloatingLabelFoundation.prototype.getWidth = function () {
        return this.adapter.getWidth();
    };
    /**
     * Styles the label to produce a shake animation to indicate an error.
     * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
     */
    MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        if (shouldShake) {
            this.adapter.addClass(LABEL_SHAKE);
        }
        else {
            this.adapter.removeClass(LABEL_SHAKE);
        }
    };
    /**
     * Styles the label to float or dock.
     * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
     */
    MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
        var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
        if (shouldFloat) {
            this.adapter.addClass(LABEL_FLOAT_ABOVE);
        }
        else {
            this.adapter.removeClass(LABEL_FLOAT_ABOVE);
            this.adapter.removeClass(LABEL_SHAKE);
        }
    };
    /**
     * Styles the label as required.
     * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
     */
    MDCFloatingLabelFoundation.prototype.setRequired = function (isRequired) {
        var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;
        if (isRequired) {
            this.adapter.addClass(LABEL_REQUIRED);
        }
        else {
            this.adapter.removeClass(LABEL_REQUIRED);
        }
    };
    MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        this.adapter.removeClass(LABEL_SHAKE);
    };
    return MDCFloatingLabelFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLineRippleFoundation = /** @class */ (function (_super) {
    __extends(MDCLineRippleFoundation, _super);
    function MDCLineRippleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;
        _this.transitionEndHandler_ = function (evt) { return _this.handleTransitionEnd(evt); };
        return _this;
    }
    Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
        /**
         * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                registerEventHandler: function () { return undefined; },
                deregisterEventHandler: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCLineRippleFoundation.prototype.init = function () {
        this.adapter.registerEventHandler('transitionend', this.transitionEndHandler_);
    };
    MDCLineRippleFoundation.prototype.destroy = function () {
        this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler_);
    };
    MDCLineRippleFoundation.prototype.activate = function () {
        this.adapter.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
        this.adapter.addClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
    };
    MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
        this.adapter.setStyle('transform-origin', xCoordinate + "px center");
    };
    MDCLineRippleFoundation.prototype.deactivate = function () {
        this.adapter.addClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
    };
    MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter.hasClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
        if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
                this.adapter.removeClass(cssClasses$3.LINE_RIPPLE_ACTIVE);
                this.adapter.removeClass(cssClasses$3.LINE_RIPPLE_DEACTIVATING);
            }
        }
    };
    return MDCLineRippleFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$2 = {
    NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch',
};
var numbers$1 = {
    // This should stay in sync with $mdc-notched-outline-padding * 2.
    NOTCH_ELEMENT_PADDING: 8,
};
var cssClasses$2 = {
    NO_LABEL: 'mdc-notched-outline--no-label',
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
    OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCNotchedOutlineFoundation = /** @class */ (function (_super) {
    __extends(MDCNotchedOutlineFoundation, _super);
    function MDCNotchedOutlineFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
        get: function () {
            return strings$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
        get: function () {
            return cssClasses$2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
        get: function () {
            return numbers$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
        /**
         * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                setNotchWidthProperty: function () { return undefined; },
                removeNotchWidthProperty: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
     */
    MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        if (notchWidth > 0) {
            notchWidth += numbers$1.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
        }
        this.adapter.setNotchWidthProperty(notchWidth);
        this.adapter.addClass(OUTLINE_NOTCHED);
    };
    /**
     * Removes notched outline selector to close the notch in the outline.
     */
    MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        this.adapter.removeClass(OUTLINE_NOTCHED);
        this.adapter.removeNotchWidthProperty();
    };
    return MDCNotchedOutlineFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$1 = {
    ARIA_CONTROLS: 'aria-controls',
    ARIA_DESCRIBEDBY: 'aria-describedby',
    INPUT_SELECTOR: '.mdc-text-field__input',
    LABEL_SELECTOR: '.mdc-floating-label',
    LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
    SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
    TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
};
var cssClasses$1 = {
    DISABLED: 'mdc-text-field--disabled',
    FOCUSED: 'mdc-text-field--focused',
    HELPER_LINE: 'mdc-text-field-helper-line',
    INVALID: 'mdc-text-field--invalid',
    LABEL_FLOATING: 'mdc-text-field--label-floating',
    NO_LABEL: 'mdc-text-field--no-label',
    OUTLINED: 'mdc-text-field--outlined',
    ROOT: 'mdc-text-field',
    TEXTAREA: 'mdc-text-field--textarea',
    WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
    WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
};
var numbers = {
    LABEL_SCALE: 0.75,
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */
var VALIDATION_ATTR_WHITELIST = [
    'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */
var ALWAYS_FLOAT_TYPES = [
    'color', 'date', 'datetime-local', 'month', 'range', 'time', 'week',
];

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
var INTERACTION_EVENTS = ['click', 'keydown'];
var MDCTextFieldFoundation = /** @class */ (function (_super) {
    __extends(MDCTextFieldFoundation, _super);
    /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */
    function MDCTextFieldFoundation(adapter, foundationMap) {
        if (foundationMap === void 0) { foundationMap = {}; }
        var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;
        _this.isFocused_ = false;
        _this.receivedUserInput_ = false;
        _this.isValid_ = true;
        _this.useNativeValidation_ = true;
        _this.validateOnValueChange_ = true;
        _this.helperText_ = foundationMap.helperText;
        _this.characterCounter_ = foundationMap.characterCounter;
        _this.leadingIcon_ = foundationMap.leadingIcon;
        _this.trailingIcon_ = foundationMap.trailingIcon;
        _this.inputFocusHandler_ = function () { return _this.activateFocus(); };
        _this.inputBlurHandler_ = function () { return _this.deactivateFocus(); };
        _this.inputInputHandler_ = function () { return _this.handleInput(); };
        _this.setPointerXOffset_ = function (evt) { return _this.setTransformOrigin(evt); };
        _this.textFieldInteractionHandler_ = function () { return _this.handleTextFieldInteraction(); };
        _this.validationAttributeChangeHandler_ = function (attributesList) {
            return _this.handleValidationAttributeChange(attributesList);
        };
        return _this;
    }
    Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
        get: function () {
            return cssClasses$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "strings", {
        get: function () {
            return strings$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
        get: function () {
            var type = this.getNativeInput_().type;
            return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
        get: function () {
            return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() ||
                this.isBadInput_();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
        get: function () {
            return !this.isFocused_ && !this.isValid() && !!this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldAdapter} for typing information on parameters and
         * return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return true; },
                setInputAttr: function () { return undefined; },
                removeInputAttr: function () { return undefined; },
                registerTextFieldInteractionHandler: function () { return undefined; },
                deregisterTextFieldInteractionHandler: function () { return undefined; },
                registerInputInteractionHandler: function () { return undefined; },
                deregisterInputInteractionHandler: function () { return undefined; },
                registerValidationAttributeChangeHandler: function () {
                    return new MutationObserver(function () { return undefined; });
                },
                deregisterValidationAttributeChangeHandler: function () { return undefined; },
                getNativeInput: function () { return null; },
                isFocused: function () { return false; },
                activateLineRipple: function () { return undefined; },
                deactivateLineRipple: function () { return undefined; },
                setLineRippleTransformOrigin: function () { return undefined; },
                shakeLabel: function () { return undefined; },
                floatLabel: function () { return undefined; },
                setLabelRequired: function () { return undefined; },
                hasLabel: function () { return false; },
                getLabelWidth: function () { return 0; },
                hasOutline: function () { return false; },
                notchOutline: function () { return undefined; },
                closeOutline: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldFoundation.prototype.init = function () {
        var _this = this;
        if (this.adapter.hasLabel() && this.getNativeInput_().required) {
            this.adapter.setLabelRequired(true);
        }
        if (this.adapter.isFocused()) {
            this.inputFocusHandler_();
        }
        else if (this.adapter.hasLabel() && this.shouldFloat) {
            this.notchOutline(true);
            this.adapter.floatLabel(true);
            this.styleFloating_(true);
        }
        this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter.registerInputInteractionHandler('input', this.inputInputHandler_);
        POINTERDOWN_EVENTS.forEach(function (evtType) {
            _this.adapter.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
        });
        INTERACTION_EVENTS.forEach(function (evtType) {
            _this.adapter.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
        });
        this.validationObserver_ =
            this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        this.setCharacterCounter_(this.getValue().length);
    };
    MDCTextFieldFoundation.prototype.destroy = function () {
        var _this = this;
        this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
        this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
        this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler_);
        POINTERDOWN_EVENTS.forEach(function (evtType) {
            _this.adapter.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
        });
        INTERACTION_EVENTS.forEach(function (evtType) {
            _this.adapter.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
        });
        this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_);
    };
    /**
     * Handles user interactions with the Text Field.
     */
    MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
        var nativeInput = this.adapter.getNativeInput();
        if (nativeInput && nativeInput.disabled) {
            return;
        }
        this.receivedUserInput_ = true;
    };
    /**
     * Handles validation attribute changes
     */
    MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
        var _this = this;
        attributesList.some(function (attributeName) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                _this.styleValidity_(true);
                _this.adapter.setLabelRequired(_this.getNativeInput_().required);
                return true;
            }
            return false;
        });
        if (attributesList.indexOf('maxlength') > -1) {
            this.setCharacterCounter_(this.getValue().length);
        }
    };
    /**
     * Opens/closes the notched outline.
     */
    MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
        if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
            return;
        }
        if (openNotch) {
            var labelWidth = this.adapter.getLabelWidth() * numbers.LABEL_SCALE;
            this.adapter.notchOutline(labelWidth);
        }
        else {
            this.adapter.closeOutline();
        }
    };
    /**
     * Activates the text field focus state.
     */
    MDCTextFieldFoundation.prototype.activateFocus = function () {
        this.isFocused_ = true;
        this.styleFocused_(this.isFocused_);
        this.adapter.activateLineRipple();
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating_(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (this.helperText_ &&
            (this.helperText_.isPersistent() || !this.helperText_.isValidation() ||
                !this.isValid_)) {
            this.helperText_.showToScreenReader();
        }
    };
    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     */
    MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
        if (this.isDisabled() || this.adapter.hasOutline()) {
            return;
        }
        var touches = evt.touches;
        var targetEvent = touches ? touches[0] : evt;
        var targetClientRect = targetEvent.target.getBoundingClientRect();
        var normalizedX = targetEvent.clientX - targetClientRect.left;
        this.adapter.setLineRippleTransformOrigin(normalizedX);
    };
    /**
     * Handles input change of text input and text area.
     */
    MDCTextFieldFoundation.prototype.handleInput = function () {
        this.autoCompleteFocus();
        this.setCharacterCounter_(this.getValue().length);
    };
    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programmatically).
     */
    MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
        if (!this.receivedUserInput_) {
            this.activateFocus();
        }
    };
    /**
     * Deactivates the Text Field's focus state.
     */
    MDCTextFieldFoundation.prototype.deactivateFocus = function () {
        this.isFocused_ = false;
        this.adapter.deactivateLineRipple();
        var isValid = this.isValid();
        this.styleValidity_(isValid);
        this.styleFocused_(this.isFocused_);
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating_(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (!this.shouldFloat) {
            this.receivedUserInput_ = false;
        }
    };
    MDCTextFieldFoundation.prototype.getValue = function () {
        return this.getNativeInput_().value;
    };
    /**
     * @param value The value to set on the input Element.
     */
    MDCTextFieldFoundation.prototype.setValue = function (value) {
        // Prevent Safari from moving the caret to the end of the input when the
        // value has not changed.
        if (this.getValue() !== value) {
            this.getNativeInput_().value = value;
        }
        this.setCharacterCounter_(value.length);
        if (this.validateOnValueChange_) {
            var isValid = this.isValid();
            this.styleValidity_(isValid);
        }
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating_(this.shouldFloat);
            if (this.validateOnValueChange_) {
                this.adapter.shakeLabel(this.shouldShake);
            }
        }
    };
    /**
     * @return The custom validity state, if set; otherwise, the result of a
     *     native validity check.
     */
    MDCTextFieldFoundation.prototype.isValid = function () {
        return this.useNativeValidation_ ? this.isNativeInputValid_() :
            this.isValid_;
    };
    /**
     * @param isValid Sets the custom validity state of the Text Field.
     */
    MDCTextFieldFoundation.prototype.setValid = function (isValid) {
        this.isValid_ = isValid;
        this.styleValidity_(isValid);
        var shouldShake = !isValid && !this.isFocused_ && !!this.getValue();
        if (this.adapter.hasLabel()) {
            this.adapter.shakeLabel(shouldShake);
        }
    };
    /**
     * @param shouldValidate Whether or not validity should be updated on
     *     value change.
     */
    MDCTextFieldFoundation.prototype.setValidateOnValueChange = function (shouldValidate) {
        this.validateOnValueChange_ = shouldValidate;
    };
    /**
     * @return Whether or not validity should be updated on value change. `true`
     *     by default.
     */
    MDCTextFieldFoundation.prototype.getValidateOnValueChange = function () {
        return this.validateOnValueChange_;
    };
    /**
     * Enables or disables the use of native validation. Use this for custom
     * validation.
     * @param useNativeValidation Set this to false to ignore native input
     *     validation.
     */
    MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
        this.useNativeValidation_ = useNativeValidation;
    };
    MDCTextFieldFoundation.prototype.isDisabled = function () {
        return this.getNativeInput_().disabled;
    };
    /**
     * @param disabled Sets the text-field disabled or enabled.
     */
    MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
        this.getNativeInput_().disabled = disabled;
        this.styleDisabled_(disabled);
    };
    /**
     * @param content Sets the content of the helper text.
     */
    MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
        if (this.helperText_) {
            this.helperText_.setContent(content);
        }
    };
    /**
     * Sets the aria label of the leading icon.
     */
    MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
        if (this.leadingIcon_) {
            this.leadingIcon_.setAriaLabel(label);
        }
    };
    /**
     * Sets the text content of the leading icon.
     */
    MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
        if (this.leadingIcon_) {
            this.leadingIcon_.setContent(content);
        }
    };
    /**
     * Sets the aria label of the trailing icon.
     */
    MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
        if (this.trailingIcon_) {
            this.trailingIcon_.setAriaLabel(label);
        }
    };
    /**
     * Sets the text content of the trailing icon.
     */
    MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
        if (this.trailingIcon_) {
            this.trailingIcon_.setContent(content);
        }
    };
    /**
     * Sets character counter values that shows characters used and the total
     * character limit.
     */
    MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
        if (!this.characterCounter_) {
            return;
        }
        var maxLength = this.getNativeInput_().maxLength;
        if (maxLength === -1) {
            throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
        }
        this.characterCounter_.setCounterValue(currentLength, maxLength);
    };
    /**
     * @return True if the Text Field input fails in converting the user-supplied
     *     value.
     */
    MDCTextFieldFoundation.prototype.isBadInput_ = function () {
        // The badInput property is not supported in IE 11 💩.
        return this.getNativeInput_().validity.badInput || false;
    };
    /**
     * @return The result of native validity checking (ValidityState.valid).
     */
    MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
        return this.getNativeInput_().validity.valid;
    };
    /**
     * Styles the component based on the validity state.
     */
    MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
        var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
        if (isValid) {
            this.adapter.removeClass(INVALID);
        }
        else {
            this.adapter.addClass(INVALID);
        }
        if (this.helperText_) {
            this.helperText_.setValidity(isValid);
            // We dynamically set or unset aria-describedby for validation helper text
            // only, based on whether the field is valid
            var helperTextValidation = this.helperText_.isValidation();
            if (!helperTextValidation) {
                return;
            }
            var helperTextVisible = this.helperText_.isVisible();
            var helperTextId = this.helperText_.getId();
            if (helperTextVisible && helperTextId) {
                this.adapter.setInputAttr(strings$1.ARIA_DESCRIBEDBY, helperTextId);
            }
            else {
                this.adapter.removeInputAttr(strings$1.ARIA_DESCRIBEDBY);
            }
        }
    };
    /**
     * Styles the component based on the focused state.
     */
    MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
        var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
        if (isFocused) {
            this.adapter.addClass(FOCUSED);
        }
        else {
            this.adapter.removeClass(FOCUSED);
        }
    };
    /**
     * Styles the component based on the disabled state.
     */
    MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
        var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
        if (isDisabled) {
            this.adapter.addClass(DISABLED);
            this.adapter.removeClass(INVALID);
        }
        else {
            this.adapter.removeClass(DISABLED);
        }
        if (this.leadingIcon_) {
            this.leadingIcon_.setDisabled(isDisabled);
        }
        if (this.trailingIcon_) {
            this.trailingIcon_.setDisabled(isDisabled);
        }
    };
    /**
     * Styles the component based on the label floating state.
     */
    MDCTextFieldFoundation.prototype.styleFloating_ = function (isFloating) {
        var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;
        if (isFloating) {
            this.adapter.addClass(LABEL_FLOATING);
        }
        else {
            this.adapter.removeClass(LABEL_FLOATING);
        }
    };
    /**
     * @return The native text input element from the host environment, or an
     *     object with the same shape for unit tests.
     */
    MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
        // this.adapter may be undefined in foundation unit tests. This happens when
        // testdouble is creating a mock object and invokes the
        // shouldShake/shouldFloat getters (which in turn call getValue(), which
        // calls this method) before init() has been called from the MDCTextField
        // constructor. To work around that issue, we return a dummy object.
        var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
        return nativeInput || {
            disabled: false,
            maxLength: -1,
            required: false,
            type: 'input',
            validity: {
                badInput: false,
                valid: true,
            },
            value: '',
        };
    };
    return MDCTextFieldFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
    HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
    ROOT: 'mdc-text-field-helper-text',
};
var strings = {
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role',
    ROOT_SELECTOR: "." + cssClasses.ROOT,
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTextFieldHelperTextFoundation = /** @class */ (function (_super) {
    __extends(MDCTextFieldHelperTextFoundation, _super);
    function MDCTextFieldHelperTextFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCTextFieldHelperTextFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                getAttr: function () { return null; },
                setAttr: function () { return undefined; },
                removeAttr: function () { return undefined; },
                setContent: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldHelperTextFoundation.prototype.getId = function () {
        return this.adapter.getAttr('id');
    };
    MDCTextFieldHelperTextFoundation.prototype.isVisible = function () {
        return this.adapter.getAttr(strings.ARIA_HIDDEN) !== 'true';
    };
    /**
     * Sets the content of the helper text field.
     */
    MDCTextFieldHelperTextFoundation.prototype.setContent = function (content) {
        this.adapter.setContent(content);
    };
    MDCTextFieldHelperTextFoundation.prototype.isPersistent = function () {
        return this.adapter.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
    };
    /**
     * @param isPersistent Sets the persistency of the helper text.
     */
    MDCTextFieldHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
        if (isPersistent) {
            this.adapter.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
        }
        else {
            this.adapter.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
        }
    };
    /**
     * @return whether the helper text acts as an error validation message.
     */
    MDCTextFieldHelperTextFoundation.prototype.isValidation = function () {
        return this.adapter.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
    };
    /**
     * @param isValidation True to make the helper text act as an error validation message.
     */
    MDCTextFieldHelperTextFoundation.prototype.setValidation = function (isValidation) {
        if (isValidation) {
            this.adapter.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
        }
        else {
            this.adapter.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
        }
    };
    /**
     * Makes the helper text visible to the screen reader.
     */
    MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function () {
        this.adapter.removeAttr(strings.ARIA_HIDDEN);
    };
    /**
     * Sets the validity of the helper text based on the input validity.
     */
    MDCTextFieldHelperTextFoundation.prototype.setValidity = function (inputIsValid) {
        var helperTextIsPersistent = this.adapter.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
        var helperTextIsValidationMsg = this.adapter.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
        var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;
        if (validationMsgNeedsDisplay) {
            this.showToScreenReader();
            this.adapter.setAttr(strings.ROLE, 'alert');
        }
        else {
            this.adapter.removeAttr(strings.ROLE);
        }
        if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
            this.hide_();
        }
    };
    /**
     * Hides the help text from screen readers.
     */
    MDCTextFieldHelperTextFoundation.prototype.hide_ = function () {
        this.adapter.setAttr(strings.ARIA_HIDDEN, 'true');
    };
    return MDCTextFieldHelperTextFoundation;
}(MDCFoundation));

/* node_modules\@smui\common\ContextFragment.svelte generated by Svelte v3.38.3 */

function create_fragment$8(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], !current ? -1 : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let $storeValue;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ContextFragment", slots, ['default']);
	let { key } = $$props;
	let { value } = $$props;
	const storeValue = writable(value);
	validate_store(storeValue, "storeValue");
	component_subscribe($$self, storeValue, value => $$invalidate(5, $storeValue = value));
	setContext(key, storeValue);

	onDestroy(() => {
		storeValue.set(undefined);
	});

	const writable_props = ["key", "value"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ContextFragment> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onDestroy,
		setContext,
		writable,
		key,
		value,
		storeValue,
		$storeValue
	});

	$$self.$inject_state = $$props => {
		if ("key" in $$props) $$invalidate(1, key = $$props.key);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 4) {
			set_store_value(storeValue, $storeValue = value, $storeValue);
		}
	};

	return [storeValue, key, value, $$scope, slots];
}

class ContextFragment extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$8, safe_not_equal, { key: 1, value: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ContextFragment",
			options,
			id: create_fragment$8.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*key*/ ctx[1] === undefined && !("key" in props)) {
			console.warn("<ContextFragment> was created without expected prop 'key'");
		}

		if (/*value*/ ctx[2] === undefined && !("value" in props)) {
			console.warn("<ContextFragment> was created without expected prop 'value'");
		}
	}

	get key() {
		throw new Error("<ContextFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<ContextFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<ContextFragment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<ContextFragment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\floating-label\FloatingLabel.svelte generated by Svelte v3.38.3 */

const file$7 = "node_modules\\@smui\\floating-label\\FloatingLabel.svelte";

// (19:0) {:else}
function create_else_block$2(ctx) {
	let label;
	let label_class_value;
	let label_style_value;
	let label_for_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

	let label_levels = [
		{
			class: label_class_value = classMap({
				[/*className*/ ctx[3]]: true,
				"mdc-floating-label": true,
				"mdc-floating-label--float-above": /*floatAbove*/ ctx[0],
				"mdc-floating-label--required": /*required*/ ctx[1],
				.../*internalClasses*/ ctx[8]
			})
		},
		{
			style: label_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func_1$1).concat([/*style*/ ctx[4]]).join(" ")
		},
		{
			for: label_for_value = /*forId*/ ctx[5] || (/*inputProps*/ ctx[11]
			? /*inputProps*/ ctx[11].id
			: null)
		},
		/*$$restProps*/ ctx[12]
	];

	let label_data = {};

	for (let i = 0; i < label_levels.length; i += 1) {
		label_data = assign(label_data, label_levels[i]);
	}

	const block = {
		c: function create() {
			label = element("label");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { class: true, style: true, for: true });
			var label_nodes = children(label);
			if (default_slot) default_slot.l(label_nodes);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(label, label_data);
			add_location(label, file$7, 19, 2, 494);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);

			if (default_slot) {
				default_slot.m(label, null);
			}

			/*label_binding*/ ctx[24](label);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, label, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[10].call(null, label))
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[21], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(label, label_data = get_spread_update(label_levels, [
				(!current || dirty & /*className, floatAbove, required, internalClasses*/ 267 && label_class_value !== (label_class_value = classMap({
					[/*className*/ ctx[3]]: true,
					"mdc-floating-label": true,
					"mdc-floating-label--float-above": /*floatAbove*/ ctx[0],
					"mdc-floating-label--required": /*required*/ ctx[1],
					.../*internalClasses*/ ctx[8]
				}))) && { class: label_class_value },
				(!current || dirty & /*internalStyles, style*/ 528 && label_style_value !== (label_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func_1$1).concat([/*style*/ ctx[4]]).join(" "))) && { style: label_style_value },
				(!current || dirty & /*forId*/ 32 && label_for_value !== (label_for_value = /*forId*/ ctx[5] || (/*inputProps*/ ctx[11]
				? /*inputProps*/ ctx[11].id
				: null))) && { for: label_for_value },
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
			if (default_slot) default_slot.d(detaching);
			/*label_binding*/ ctx[24](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(19:0) {:else}",
		ctx
	});

	return block;
}

// (1:0) {#if wrapped}
function create_if_block$3(ctx) {
	let span;
	let span_class_value;
	let span_style_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[22].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[21], null);

	let span_levels = [
		{
			class: span_class_value = classMap({
				[/*className*/ ctx[3]]: true,
				"mdc-floating-label": true,
				"mdc-floating-label--float-above": /*floatAbove*/ ctx[0],
				"mdc-floating-label--required": /*required*/ ctx[1],
				.../*internalClasses*/ ctx[8]
			})
		},
		{
			style: span_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func$3).concat([/*style*/ ctx[4]]).join(" ")
		},
		/*$$restProps*/ ctx[12]
	];

	let span_data = {};

	for (let i = 0; i < span_levels.length; i += 1) {
		span_data = assign(span_data, span_levels[i]);
	}

	const block = {
		c: function create() {
			span = element("span");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true, style: true });
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(span, span_data);
			add_location(span, file$7, 1, 2, 16);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (default_slot) {
				default_slot.m(span, null);
			}

			/*span_binding*/ ctx[23](span);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, span, /*use*/ ctx[2])),
					action_destroyer(/*forwardEvents*/ ctx[10].call(null, span))
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2097152)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[21], !current ? -1 : dirty, null, null);
				}
			}

			set_attributes(span, span_data = get_spread_update(span_levels, [
				(!current || dirty & /*className, floatAbove, required, internalClasses*/ 267 && span_class_value !== (span_class_value = classMap({
					[/*className*/ ctx[3]]: true,
					"mdc-floating-label": true,
					"mdc-floating-label--float-above": /*floatAbove*/ ctx[0],
					"mdc-floating-label--required": /*required*/ ctx[1],
					.../*internalClasses*/ ctx[8]
				}))) && { class: span_class_value },
				(!current || dirty & /*internalStyles, style*/ 528 && span_style_value !== (span_style_value = Object.entries(/*internalStyles*/ ctx[9]).map(func$3).concat([/*style*/ ctx[4]]).join(" "))) && { style: span_style_value },
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (default_slot) default_slot.d(detaching);
			/*span_binding*/ ctx[23](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(1:0) {#if wrapped}",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*wrapped*/ ctx[6]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func$3 = ([name, value]) => `${name}: ${value};`;
const func_1$1 = ([name, value]) => `${name}: ${value};`;

function instance_1$4($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","style","for","floatAbove","required","wrapped","shake","float","setRequired","getWidth","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("FloatingLabel", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { for: forId = null } = $$props;
	let { floatAbove = false } = $$props;
	let { required = false } = $$props;
	let { wrapped = false } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	let inputProps = getContext("SMUI:generic:input:props") || {};
	let previousFloatAbove = floatAbove;
	let previousRequired = required;

	onMount(() => {
		$$invalidate(18, instance = new MDCFloatingLabelFoundation({
				addClass,
				removeClass,
				getWidth: () => {
					const el = getElement();
					const clone = el.cloneNode(true);
					el.parentNode.appendChild(clone);
					clone.classList.add("smui-floating-label--remove-transition");
					clone.classList.add("smui-floating-label--force-size");
					clone.classList.remove("mdc-floating-label--float-above");
					const scrollWidth = clone.scrollWidth;
					el.parentNode.removeChild(clone);
					return scrollWidth;
				},
				registerInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
				deregisterInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
			}));

		const accessor = {
			get element() {
				return getElement();
			},
			addStyle,
			removeStyle
		};

		dispatch(element, "SMUI:floating-label:mount", accessor);
		instance.init();

		return () => {
			dispatch(element, "SMUI:floating-label:unmount", accessor);
			instance.destroy();
		};
	});

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(8, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(8, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				$$invalidate(9, internalStyles);
			} else {
				$$invalidate(9, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function removeStyle(name) {
		if (name in internalStyles) {
			delete internalStyles[name];
			$$invalidate(9, internalStyles);
		}
	}

	function shake(shouldShake) {
		instance.shake(shouldShake);
	}

	function float(shouldFloat) {
		$$invalidate(0, floatAbove = shouldFloat);
	}

	function setRequired(isRequired) {
		$$invalidate(1, required = isRequired);
	}

	function getWidth() {
		return instance.getWidth();
	}

	function getElement() {
		return element;
	}

	function span_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(7, element);
		});
	}

	function label_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(7, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(2, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(3, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(4, style = $$new_props.style);
		if ("for" in $$new_props) $$invalidate(5, forId = $$new_props.for);
		if ("floatAbove" in $$new_props) $$invalidate(0, floatAbove = $$new_props.floatAbove);
		if ("required" in $$new_props) $$invalidate(1, required = $$new_props.required);
		if ("wrapped" in $$new_props) $$invalidate(6, wrapped = $$new_props.wrapped);
		if ("$$scope" in $$new_props) $$invalidate(21, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCFloatingLabelFoundation,
		onMount,
		getContext,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		dispatch,
		forwardEvents,
		use,
		className,
		style,
		forId,
		floatAbove,
		required,
		wrapped,
		element,
		instance,
		internalClasses,
		internalStyles,
		inputProps,
		previousFloatAbove,
		previousRequired,
		addClass,
		removeClass,
		addStyle,
		removeStyle,
		shake,
		float,
		setRequired,
		getWidth,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(2, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(3, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(4, style = $$new_props.style);
		if ("forId" in $$props) $$invalidate(5, forId = $$new_props.forId);
		if ("floatAbove" in $$props) $$invalidate(0, floatAbove = $$new_props.floatAbove);
		if ("required" in $$props) $$invalidate(1, required = $$new_props.required);
		if ("wrapped" in $$props) $$invalidate(6, wrapped = $$new_props.wrapped);
		if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(18, instance = $$new_props.instance);
		if ("internalClasses" in $$props) $$invalidate(8, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(9, internalStyles = $$new_props.internalStyles);
		if ("inputProps" in $$props) $$invalidate(11, inputProps = $$new_props.inputProps);
		if ("previousFloatAbove" in $$props) $$invalidate(19, previousFloatAbove = $$new_props.previousFloatAbove);
		if ("previousRequired" in $$props) $$invalidate(20, previousRequired = $$new_props.previousRequired);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*previousFloatAbove, floatAbove, instance*/ 786433) {
			if (previousFloatAbove !== floatAbove) {
				$$invalidate(19, previousFloatAbove = floatAbove);
				instance.float(floatAbove);
			}
		}

		if ($$self.$$.dirty & /*previousRequired, required, instance*/ 1310722) {
			if (previousRequired !== required) {
				$$invalidate(20, previousRequired = required);
				instance.setRequired(required);
			}
		}
	};

	return [
		floatAbove,
		required,
		use,
		className,
		style,
		forId,
		wrapped,
		element,
		internalClasses,
		internalStyles,
		forwardEvents,
		inputProps,
		$$restProps,
		shake,
		float,
		setRequired,
		getWidth,
		getElement,
		instance,
		previousFloatAbove,
		previousRequired,
		$$scope,
		slots,
		span_binding,
		label_binding
	];
}

class FloatingLabel extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance_1$4, create_fragment$7, safe_not_equal, {
			use: 2,
			class: 3,
			style: 4,
			for: 5,
			floatAbove: 0,
			required: 1,
			wrapped: 6,
			shake: 13,
			float: 14,
			setRequired: 15,
			getWidth: 16,
			getElement: 17
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FloatingLabel",
			options,
			id: create_fragment$7.name
		});
	}

	get use() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get for() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set for(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get floatAbove() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set floatAbove(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get required() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set required(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get wrapped() {
		throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set wrapped(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get shake() {
		return this.$$.ctx[13];
	}

	set shake(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get float() {
		return this.$$.ctx[14];
	}

	set float(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setRequired() {
		return this.$$.ctx[15];
	}

	set setRequired(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getWidth() {
		return this.$$.ctx[16];
	}

	set getWidth(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[17];
	}

	set getElement(value) {
		throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\line-ripple\LineRipple.svelte generated by Svelte v3.38.3 */

const file$6 = "node_modules\\@smui\\line-ripple\\LineRipple.svelte";

function create_fragment$6(ctx) {
	let div;
	let div_class_value;
	let div_style_value;
	let useActions_action;
	let mounted;
	let dispose;

	let div_levels = [
		{
			class: div_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-line-ripple": true,
				"mdc-line-ripple--active": /*active*/ ctx[3],
				.../*internalClasses*/ ctx[5]
			})
		},
		{
			style: div_style_value = Object.entries(/*internalStyles*/ ctx[6]).map(func$2).concat([/*style*/ ctx[2]]).join(" ")
		},
		/*$$restProps*/ ctx[8]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			children(div).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(div, div_data);
			add_location(div, file$6, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[13](div);

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[7].call(null, div))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*className, active, internalClasses*/ 42 && div_class_value !== (div_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-line-ripple": true,
					"mdc-line-ripple--active": /*active*/ ctx[3],
					.../*internalClasses*/ ctx[5]
				})) && { class: div_class_value },
				dirty & /*internalStyles, style*/ 68 && div_style_value !== (div_style_value = Object.entries(/*internalStyles*/ ctx[6]).map(func$2).concat([/*style*/ ctx[2]]).join(" ")) && { style: div_style_value },
				dirty & /*$$restProps*/ 256 && /*$$restProps*/ ctx[8]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*div_binding*/ ctx[13](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func$2 = ([name, value]) => `${name}: ${value};`;

function instance_1$3($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","style","active","activate","deactivate","setRippleCenter","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("LineRipple", slots, []);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { active = false } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};

	onMount(() => {
		instance = new MDCLineRippleFoundation({
				addClass,
				removeClass,
				hasClass,
				setStyle: addStyle,
				registerEventHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
				deregisterEventHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
			});

		instance.init();

		return () => {
			instance.destroy();
		};
	});

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(5, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(5, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				$$invalidate(6, internalStyles);
			} else {
				$$invalidate(6, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function activate() {
		instance.activate();
	}

	function deactivate() {
		instance.deactivate();
	}

	function setRippleCenter(xCoordinate) {
		instance.setRippleCenter(xCoordinate);
	}

	function getElement() {
		return element;
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(4, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(2, style = $$new_props.style);
		if ("active" in $$new_props) $$invalidate(3, active = $$new_props.active);
	};

	$$self.$capture_state = () => ({
		MDCLineRippleFoundation,
		onMount,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		style,
		active,
		element,
		instance,
		internalClasses,
		internalStyles,
		hasClass,
		addClass,
		removeClass,
		addStyle,
		activate,
		deactivate,
		setRippleCenter,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(2, style = $$new_props.style);
		if ("active" in $$props) $$invalidate(3, active = $$new_props.active);
		if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
		if ("instance" in $$props) instance = $$new_props.instance;
		if ("internalClasses" in $$props) $$invalidate(5, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(6, internalStyles = $$new_props.internalStyles);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		style,
		active,
		element,
		internalClasses,
		internalStyles,
		forwardEvents,
		$$restProps,
		activate,
		deactivate,
		setRippleCenter,
		getElement,
		div_binding
	];
}

class LineRipple extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance_1$3, create_fragment$6, safe_not_equal, {
			use: 0,
			class: 1,
			style: 2,
			active: 3,
			activate: 9,
			deactivate: 10,
			setRippleCenter: 11,
			getElement: 12
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LineRipple",
			options,
			id: create_fragment$6.name
		});
	}

	get use() {
		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get active() {
		throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set active(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get activate() {
		return this.$$.ctx[9];
	}

	set activate(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get deactivate() {
		return this.$$.ctx[10];
	}

	set deactivate(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setRippleCenter() {
		return this.$$.ctx[11];
	}

	set setRippleCenter(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[12];
	}

	set getElement(value) {
		throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\notched-outline\NotchedOutline.svelte generated by Svelte v3.38.3 */

const file$5 = "node_modules\\@smui\\notched-outline\\NotchedOutline.svelte";

// (17:2) {#if !noLabel}
function create_if_block$2(ctx) {
	let div;
	let div_style_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[14].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (default_slot) default_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "mdc-notched-outline__notch");
			attr_dev(div, "style", div_style_value = Object.entries(/*notchStyles*/ ctx[7]).map(func$1).join(" "));
			add_location(div, file$5, 17, 4, 500);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[13], !current ? -1 : dirty, null, null);
				}
			}

			if (!current || dirty & /*notchStyles*/ 128 && div_style_value !== (div_style_value = Object.entries(/*notchStyles*/ ctx[7]).map(func$1).join(" "))) {
				attr_dev(div, "style", div_style_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(17:2) {#if !noLabel}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let div2;
	let div0;
	let t0;
	let t1;
	let div1;
	let div2_class_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	let if_block = !/*noLabel*/ ctx[3] && create_if_block$2(ctx);

	let div2_levels = [
		{
			class: div2_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-notched-outline": true,
				"mdc-notched-outline--notched": /*notched*/ ctx[2],
				"mdc-notched-outline--no-label": /*noLabel*/ ctx[3],
				.../*internalClasses*/ ctx[6]
			})
		},
		/*$$restProps*/ ctx[9]
	];

	let div2_data = {};

	for (let i = 0; i < div2_levels.length; i += 1) {
		div2_data = assign(div2_data, div2_levels[i]);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			div1 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t0 = claim_space(div2_nodes);
			if (if_block) if_block.l(div2_nodes);
			t1 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			children(div1).forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "mdc-notched-outline__leading");
			add_location(div0, file$5, 15, 2, 434);
			attr_dev(div1, "class", "mdc-notched-outline__trailing");
			add_location(div1, file$5, 26, 2, 703);
			set_attributes(div2, div2_data);
			add_location(div2, file$5, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div2, t0);
			if (if_block) if_block.m(div2, null);
			append_dev(div2, t1);
			append_dev(div2, div1);
			/*div2_binding*/ ctx[15](div2);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, div2, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[8].call(null, div2)),
					listen_dev(div2, "SMUI:floating-label:mount", /*SMUI_floating_label_mount_handler*/ ctx[16], false, false, false),
					listen_dev(div2, "SMUI:floating-label:unmount", /*SMUI_floating_label_unmount_handler*/ ctx[17], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!/*noLabel*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*noLabel*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div2, t1);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			set_attributes(div2, div2_data = get_spread_update(div2_levels, [
				(!current || dirty & /*className, notched, noLabel, internalClasses*/ 78 && div2_class_value !== (div2_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-notched-outline": true,
					"mdc-notched-outline--notched": /*notched*/ ctx[2],
					"mdc-notched-outline--no-label": /*noLabel*/ ctx[3],
					.../*internalClasses*/ ctx[6]
				}))) && { class: div2_class_value },
				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (if_block) if_block.d();
			/*div2_binding*/ ctx[15](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func$1 = ([name, value]) => `${name}: ${value};`;

function instance_1$2($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","notched","noLabel","notch","closeNotch","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("NotchedOutline", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { notched = false } = $$props;
	let { noLabel = false } = $$props;
	let element;
	let instance;
	let floatingLabel;
	let internalClasses = {};
	let notchStyles = {};

	onMount(() => {
		instance = new MDCNotchedOutlineFoundation({
				addClass,
				removeClass,
				setNotchWidthProperty: width => addNotchStyle("width", width + "px"),
				removeNotchWidthProperty: () => removeNotchStyle("width")
			});

		instance.init();

		return () => {
			instance.destroy();
		};
	});

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = false, internalClasses);
		}
	}

	function addNotchStyle(name, value) {
		if (notchStyles[name] != value) {
			if (value === "" || value == null) {
				delete notchStyles[name];
				$$invalidate(7, notchStyles);
			} else {
				$$invalidate(7, notchStyles[name] = value, notchStyles);
			}
		}
	}

	function removeNotchStyle(name) {
		if (name in notchStyles) {
			delete notchStyles[name];
			$$invalidate(7, notchStyles);
		}
	}

	function notch(notchWidth) {
		instance.notch(notchWidth);
	}

	function closeNotch() {
		instance.closeNotch();
	}

	function getElement() {
		return element;
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(5, element);
		});
	}

	const SMUI_floating_label_mount_handler = event => $$invalidate(4, floatingLabel = event.detail);
	const SMUI_floating_label_unmount_handler = () => $$invalidate(4, floatingLabel = undefined);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("notched" in $$new_props) $$invalidate(2, notched = $$new_props.notched);
		if ("noLabel" in $$new_props) $$invalidate(3, noLabel = $$new_props.noLabel);
		if ("$$scope" in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCNotchedOutlineFoundation,
		onMount,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		notched,
		noLabel,
		element,
		instance,
		floatingLabel,
		internalClasses,
		notchStyles,
		addClass,
		removeClass,
		addNotchStyle,
		removeNotchStyle,
		notch,
		closeNotch,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("notched" in $$props) $$invalidate(2, notched = $$new_props.notched);
		if ("noLabel" in $$props) $$invalidate(3, noLabel = $$new_props.noLabel);
		if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
		if ("instance" in $$props) instance = $$new_props.instance;
		if ("floatingLabel" in $$props) $$invalidate(4, floatingLabel = $$new_props.floatingLabel);
		if ("internalClasses" in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
		if ("notchStyles" in $$props) $$invalidate(7, notchStyles = $$new_props.notchStyles);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*floatingLabel*/ 16) {
			if (floatingLabel) {
				floatingLabel.addStyle("transition-duration", "0s");
				addClass("mdc-notched-outline--upgraded");

				requestAnimationFrame(() => {
					floatingLabel.removeStyle("transition-duration");
				});
			} else {
				removeClass("mdc-notched-outline--upgraded");
			}
		}
	};

	return [
		use,
		className,
		notched,
		noLabel,
		floatingLabel,
		element,
		internalClasses,
		notchStyles,
		forwardEvents,
		$$restProps,
		notch,
		closeNotch,
		getElement,
		$$scope,
		slots,
		div2_binding,
		SMUI_floating_label_mount_handler,
		SMUI_floating_label_unmount_handler
	];
}

class NotchedOutline extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance_1$2, create_fragment$5, safe_not_equal, {
			use: 0,
			class: 1,
			notched: 2,
			noLabel: 3,
			notch: 10,
			closeNotch: 11,
			getElement: 12
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "NotchedOutline",
			options,
			id: create_fragment$5.name
		});
	}

	get use() {
		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notched() {
		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notched(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get noLabel() {
		throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set noLabel(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notch() {
		return this.$$.ctx[10];
	}

	set notch(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeNotch() {
		return this.$$.ctx[11];
	}

	set closeNotch(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[12];
	}

	set getElement(value) {
		throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var HelperLine = classAdderBuilder({
  class: 'mdc-text-field-helper-line',
  component: Div,
});

var Prefix = classAdderBuilder({
  class: 'mdc-text-field__affix mdc-text-field__affix--prefix',
  component: Span,
});

var Suffix = classAdderBuilder({
  class: 'mdc-text-field__affix mdc-text-field__affix--suffix',
  component: Span,
});

/* node_modules\@smui\textfield\Input.svelte generated by Svelte v3.38.3 */

const file$4 = "node_modules\\@smui\\textfield\\Input.svelte";

function create_fragment$4(ctx) {
	let input;
	let input_class_value;
	let useActions_action;
	let mounted;
	let dispose;

	let input_levels = [
		{
			class: input_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-text-field__input": true
			})
		},
		{ type: /*type*/ ctx[2] },
		{ placeholder: /*placeholder*/ ctx[3] },
		/*valueProp*/ ctx[4],
		/*internalAttrs*/ ctx[6],
		/*$$restProps*/ ctx[10]
	];

	let input_data = {};

	for (let i = 0; i < input_levels.length; i += 1) {
		input_data = assign(input_data, input_levels[i]);
	}

	const block = {
		c: function create() {
			input = element("input");
			this.h();
		},
		l: function claim(nodes) {
			input = claim_element(nodes, "INPUT", {
				class: true,
				type: true,
				placeholder: true
			});

			this.h();
		},
		h: function hydrate() {
			set_attributes(input, input_data);
			add_location(input, file$4, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			/*input_binding*/ ctx[21](input);

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[7].call(null, input)),
					listen_dev(input, "change", /*change_handler*/ ctx[22], false, false, false),
					listen_dev(input, "input", /*input_handler*/ ctx[23], false, false, false),
					listen_dev(input, "change", /*changeHandler*/ ctx[9], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			set_attributes(input, input_data = get_spread_update(input_levels, [
				dirty & /*className*/ 2 && input_class_value !== (input_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-text-field__input": true
				})) && { class: input_class_value },
				dirty & /*type*/ 4 && { type: /*type*/ ctx[2] },
				dirty & /*placeholder*/ 8 && { placeholder: /*placeholder*/ ctx[3] },
				dirty & /*valueProp*/ 16 && /*valueProp*/ ctx[4],
				dirty & /*internalAttrs*/ 64 && /*internalAttrs*/ ctx[6],
				dirty & /*$$restProps*/ 1024 && /*$$restProps*/ ctx[10]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(input);
			/*input_binding*/ ctx[21](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function toNumber(value) {
	if (value === "") {
		const nan = new Number(Number.NaN);
		nan.length = 0;
		return nan;
	}

	return +value;
}

function instance$2($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","type","placeholder","value","files","dirty","invalid","updateInvalid","getAttr","addAttr","removeAttr","focus","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Input", slots, []);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { type = "text" } = $$props;
	let { placeholder = " " } = $$props;
	let { value = "" } = $$props;
	let { files = undefined } = $$props;
	let { dirty = false } = $$props;
	let { invalid = false } = $$props;
	let { updateInvalid = true } = $$props;
	let element;
	let internalAttrs = {};
	let valueProp = {};

	onMount(() => {
		if (updateInvalid) {
			$$invalidate(14, invalid = element.matches(":invalid"));
		}
	});

	function valueUpdater(e) {
		switch (type) {
			case "number":
			case "range":
				$$invalidate(11, value = toNumber(e.target.value));
				break;
			case "file":
				$$invalidate(12, files = e.target.files);
			default:
				$$invalidate(11, value = e.target.value);
				break;
		}
	}

	function changeHandler(e) {
		$$invalidate(13, dirty = true);

		if (updateInvalid) {
			$$invalidate(14, invalid = element.matches(":invalid"));
		}
	}

	function getAttr(name) {
		return name in internalAttrs
		? internalAttrs[name]
		: getElement().getAttribute(name);
	}

	function addAttr(name, value) {
		if (internalAttrs[name] !== value) {
			$$invalidate(6, internalAttrs[name] = value, internalAttrs);
		}
	}

	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			$$invalidate(6, internalAttrs[name] = undefined, internalAttrs);
		}
	}

	function focus() {
		getElement().focus();
	}

	function getElement() {
		return element;
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(5, element);
		});
	}

	const change_handler = e => (type === "file" || type === "range") && valueUpdater(e);
	const input_handler = e => type !== "file" && valueUpdater(e);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("type" in $$new_props) $$invalidate(2, type = $$new_props.type);
		if ("placeholder" in $$new_props) $$invalidate(3, placeholder = $$new_props.placeholder);
		if ("value" in $$new_props) $$invalidate(11, value = $$new_props.value);
		if ("files" in $$new_props) $$invalidate(12, files = $$new_props.files);
		if ("dirty" in $$new_props) $$invalidate(13, dirty = $$new_props.dirty);
		if ("invalid" in $$new_props) $$invalidate(14, invalid = $$new_props.invalid);
		if ("updateInvalid" in $$new_props) $$invalidate(15, updateInvalid = $$new_props.updateInvalid);
	};

	$$self.$capture_state = () => ({
		onMount,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		type,
		placeholder,
		value,
		files,
		dirty,
		invalid,
		updateInvalid,
		element,
		internalAttrs,
		valueProp,
		toNumber,
		valueUpdater,
		changeHandler,
		getAttr,
		addAttr,
		removeAttr,
		focus,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("type" in $$props) $$invalidate(2, type = $$new_props.type);
		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$new_props.placeholder);
		if ("value" in $$props) $$invalidate(11, value = $$new_props.value);
		if ("files" in $$props) $$invalidate(12, files = $$new_props.files);
		if ("dirty" in $$props) $$invalidate(13, dirty = $$new_props.dirty);
		if ("invalid" in $$props) $$invalidate(14, invalid = $$new_props.invalid);
		if ("updateInvalid" in $$props) $$invalidate(15, updateInvalid = $$new_props.updateInvalid);
		if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
		if ("internalAttrs" in $$props) $$invalidate(6, internalAttrs = $$new_props.internalAttrs);
		if ("valueProp" in $$props) $$invalidate(4, valueProp = $$new_props.valueProp);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*type, valueProp, value*/ 2068) {
			if (type === "file") {
				delete valueProp.value;
				(($$invalidate(4, valueProp), $$invalidate(2, type)), $$invalidate(11, value));
			} else {
				$$invalidate(4, valueProp.value = value == null ? "" : value, valueProp);
			}
		}
	};

	return [
		use,
		className,
		type,
		placeholder,
		valueProp,
		element,
		internalAttrs,
		forwardEvents,
		valueUpdater,
		changeHandler,
		$$restProps,
		value,
		files,
		dirty,
		invalid,
		updateInvalid,
		getAttr,
		addAttr,
		removeAttr,
		focus,
		getElement,
		input_binding,
		change_handler,
		input_handler
	];
}

class Input extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$4, safe_not_equal, {
			use: 0,
			class: 1,
			type: 2,
			placeholder: 3,
			value: 11,
			files: 12,
			dirty: 13,
			invalid: 14,
			updateInvalid: 15,
			getAttr: 16,
			addAttr: 17,
			removeAttr: 18,
			focus: 19,
			getElement: 20
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Input",
			options,
			id: create_fragment$4.name
		});
	}

	get use() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get placeholder() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set placeholder(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get files() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set files(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dirty() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dirty(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get invalid() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set invalid(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get updateInvalid() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set updateInvalid(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getAttr() {
		return this.$$.ctx[16];
	}

	set getAttr(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get addAttr() {
		return this.$$.ctx[17];
	}

	set addAttr(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get removeAttr() {
		return this.$$.ctx[18];
	}

	set removeAttr(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focus() {
		return this.$$.ctx[19];
	}

	set focus(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[20];
	}

	set getElement(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\textfield\Textarea.svelte generated by Svelte v3.38.3 */

const file$3 = "node_modules\\@smui\\textfield\\Textarea.svelte";

function create_fragment$3(ctx) {
	let textarea;
	let textarea_class_value;
	let textarea_style_value;
	let useActions_action;
	let mounted;
	let dispose;

	let textarea_levels = [
		{
			class: textarea_class_value = classMap({
				[/*className*/ ctx[2]]: true,
				"mdc-text-field__input": true
			})
		},
		{
			style: textarea_style_value = `${/*resizable*/ ctx[4] ? "" : "resize: none; "}${/*style*/ ctx[3]}`
		},
		/*internalAttrs*/ ctx[6],
		/*$$restProps*/ ctx[9]
	];

	let textarea_data = {};

	for (let i = 0; i < textarea_levels.length; i += 1) {
		textarea_data = assign(textarea_data, textarea_levels[i]);
	}

	const block = {
		c: function create() {
			textarea = element("textarea");
			this.h();
		},
		l: function claim(nodes) {
			textarea = claim_element(nodes, "TEXTAREA", { class: true, style: true });
			children(textarea).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(textarea, textarea_data);
			add_location(textarea, file$3, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, textarea, anchor);
			/*textarea_binding*/ ctx[18](textarea);
			set_input_value(textarea, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, textarea, /*use*/ ctx[1])),
					action_destroyer(/*forwardEvents*/ ctx[7].call(null, textarea)),
					listen_dev(textarea, "change", /*changeHandler*/ ctx[8], false, false, false),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[19])
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
				dirty & /*className*/ 4 && textarea_class_value !== (textarea_class_value = classMap({
					[/*className*/ ctx[2]]: true,
					"mdc-text-field__input": true
				})) && { class: textarea_class_value },
				dirty & /*resizable, style*/ 24 && textarea_style_value !== (textarea_style_value = `${/*resizable*/ ctx[4] ? "" : "resize: none; "}${/*style*/ ctx[3]}`) && { style: textarea_style_value },
				dirty & /*internalAttrs*/ 64 && /*internalAttrs*/ ctx[6],
				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);

			if (dirty & /*value*/ 1) {
				set_input_value(textarea, /*value*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(textarea);
			/*textarea_binding*/ ctx[18](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"use","class","style","value","dirty","invalid","updateInvalid","resizable","getAttr","addAttr","removeAttr","focus","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Textarea", slots, []);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { value = "" } = $$props;
	let { dirty = false } = $$props;
	let { invalid = false } = $$props;
	let { updateInvalid = true } = $$props;
	let { resizable = true } = $$props;
	let element;
	let internalAttrs = {};

	onMount(() => {
		if (updateInvalid) {
			$$invalidate(11, invalid = element.matches(":invalid"));
		}
	});

	function changeHandler() {
		$$invalidate(10, dirty = true);

		if (updateInvalid) {
			$$invalidate(11, invalid = element.matches(":invalid"));
		}
	}

	function getAttr(name) {
		return name in internalAttrs
		? internalAttrs[name]
		: getElement().getAttribute(name);
	}

	function addAttr(name, value) {
		if (internalAttrs[name] !== value) {
			$$invalidate(6, internalAttrs[name] = value, internalAttrs);
		}
	}

	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			$$invalidate(6, internalAttrs[name] = undefined, internalAttrs);
		}
	}

	function focus() {
		getElement().focus();
	}

	function getElement() {
		return element;
	}

	function textarea_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(5, element);
		});
	}

	function textarea_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(3, style = $$new_props.style);
		if ("value" in $$new_props) $$invalidate(0, value = $$new_props.value);
		if ("dirty" in $$new_props) $$invalidate(10, dirty = $$new_props.dirty);
		if ("invalid" in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
		if ("updateInvalid" in $$new_props) $$invalidate(12, updateInvalid = $$new_props.updateInvalid);
		if ("resizable" in $$new_props) $$invalidate(4, resizable = $$new_props.resizable);
	};

	$$self.$capture_state = () => ({
		onMount,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		forwardEvents,
		use,
		className,
		style,
		value,
		dirty,
		invalid,
		updateInvalid,
		resizable,
		element,
		internalAttrs,
		changeHandler,
		getAttr,
		addAttr,
		removeAttr,
		focus,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(3, style = $$new_props.style);
		if ("value" in $$props) $$invalidate(0, value = $$new_props.value);
		if ("dirty" in $$props) $$invalidate(10, dirty = $$new_props.dirty);
		if ("invalid" in $$props) $$invalidate(11, invalid = $$new_props.invalid);
		if ("updateInvalid" in $$props) $$invalidate(12, updateInvalid = $$new_props.updateInvalid);
		if ("resizable" in $$props) $$invalidate(4, resizable = $$new_props.resizable);
		if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
		if ("internalAttrs" in $$props) $$invalidate(6, internalAttrs = $$new_props.internalAttrs);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		value,
		use,
		className,
		style,
		resizable,
		element,
		internalAttrs,
		forwardEvents,
		changeHandler,
		$$restProps,
		dirty,
		invalid,
		updateInvalid,
		getAttr,
		addAttr,
		removeAttr,
		focus,
		getElement,
		textarea_binding,
		textarea_input_handler
	];
}

class Textarea extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$1, create_fragment$3, safe_not_equal, {
			use: 1,
			class: 2,
			style: 3,
			value: 0,
			dirty: 10,
			invalid: 11,
			updateInvalid: 12,
			resizable: 4,
			getAttr: 13,
			addAttr: 14,
			removeAttr: 15,
			focus: 16,
			getElement: 17
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Textarea",
			options,
			id: create_fragment$3.name
		});
	}

	get use() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dirty() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dirty(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get invalid() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set invalid(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get updateInvalid() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set updateInvalid(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get resizable() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set resizable(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getAttr() {
		return this.$$.ctx[13];
	}

	set getAttr(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get addAttr() {
		return this.$$.ctx[14];
	}

	set addAttr(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get removeAttr() {
		return this.$$.ctx[15];
	}

	set removeAttr(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focus() {
		return this.$$.ctx[16];
	}

	set focus(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[17];
	}

	set getElement(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\textfield\Textfield.svelte generated by Svelte v3.38.3 */
const file$2 = "node_modules\\@smui\\textfield\\Textfield.svelte";
const get_helper_slot_changes = dirty => ({});
const get_helper_slot_context = ctx => ({});
const get_ripple_slot_changes = dirty => ({});
const get_ripple_slot_context = ctx => ({});
const get_trailingIcon_slot_changes_1 = dirty => ({});
const get_trailingIcon_slot_context_1 = ctx => ({});
const get_leadingIcon_slot_changes_1 = dirty => ({});
const get_leadingIcon_slot_context_1 = ctx => ({});
const get_label_slot_changes_2 = dirty => ({});
const get_label_slot_context_2 = ctx => ({});
const get_trailingIcon_slot_changes = dirty => ({});
const get_trailingIcon_slot_context = ctx => ({});
const get_suffix_slot_changes = dirty => ({});
const get_suffix_slot_context = ctx => ({});
const get_prefix_slot_changes = dirty => ({});
const get_prefix_slot_context = ctx => ({});
const get_internalCounter_slot_changes = dirty => ({});
const get_internalCounter_slot_context = ctx => ({});
const get_leadingIcon_slot_changes = dirty => ({});
const get_leadingIcon_slot_context = ctx => ({});
const get_label_slot_changes_1 = dirty => ({});
const get_label_slot_context_1 = ctx => ({});
const get_label_slot_changes = dirty => ({});
const get_label_slot_context = ctx => ({});

// (164:0) {:else}
function create_else_block_1(ctx) {
	let div;
	let t0;
	let contextfragment0;
	let t1;
	let t2;
	let contextfragment1;
	let t3;
	let div_class_value;
	let div_style_value;
	let Ripple_action;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const label_slot_template = /*#slots*/ ctx[50].label;
	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[89], get_label_slot_context_2);

	contextfragment0 = new ContextFragment({
			props: {
				key: "SMUI:textfield:icon:leading",
				value: true,
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const default_slot_template = /*#slots*/ ctx[50].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[89], null);

	contextfragment1 = new ContextFragment({
			props: {
				key: "SMUI:textfield:icon:leading",
				value: false,
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const ripple_slot_template = /*#slots*/ ctx[50].ripple;
	const ripple_slot = create_slot(ripple_slot_template, ctx, /*$$scope*/ ctx[89], get_ripple_slot_context);

	let div_levels = [
		{
			class: div_class_value = classMap({
				[/*className*/ ctx[9]]: true,
				"mdc-text-field": true,
				"mdc-text-field--disabled": /*disabled*/ ctx[12],
				"mdc-text-field--textarea": /*textarea*/ ctx[14],
				"mdc-text-field--filled": /*variant*/ ctx[15] === "filled",
				"mdc-text-field--outlined": /*variant*/ ctx[15] === "outlined",
				"smui-text-field--standard": /*variant*/ ctx[15] === "standard" && !/*textarea*/ ctx[14],
				"mdc-text-field--no-label": /*noLabel*/ ctx[16] || !/*$$slots*/ ctx[41].label,
				"mdc-text-field--with-leading-icon": /*$$slots*/ ctx[41].leadingIcon,
				"mdc-text-field--with-trailing-icon": /*$$slots*/ ctx[41].trailingIcon,
				"mdc-text-field--invalid": /*invalid*/ ctx[2] !== /*uninitializedValue*/ ctx[36] && /*invalid*/ ctx[2],
				.../*internalClasses*/ ctx[26]
			})
		},
		{
			style: div_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func_1).concat([/*style*/ ctx[10]]).join(" ")
		},
		exclude(/*$$restProps*/ ctx[42], ["input$", "label$", "ripple$", "outline$", "helperLine$"])
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (label_slot) label_slot.c();
			t0 = space();
			create_component(contextfragment0.$$.fragment);
			t1 = space();
			if (default_slot) default_slot.c();
			t2 = space();
			create_component(contextfragment1.$$.fragment);
			t3 = space();
			if (ripple_slot) ripple_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);
			if (label_slot) label_slot.l(div_nodes);
			t0 = claim_space(div_nodes);
			claim_component(contextfragment0.$$.fragment, div_nodes);
			t1 = claim_space(div_nodes);
			if (default_slot) default_slot.l(div_nodes);
			t2 = claim_space(div_nodes);
			claim_component(contextfragment1.$$.fragment, div_nodes);
			t3 = claim_space(div_nodes);
			if (ripple_slot) ripple_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(div, div_data);
			add_location(div, file$2, 164, 2, 5265);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (label_slot) {
				label_slot.m(div, null);
			}

			append_dev(div, t0);
			mount_component(contextfragment0, div, null);
			append_dev(div, t1);

			if (default_slot) {
				default_slot.m(div, null);
			}

			append_dev(div, t2);
			mount_component(contextfragment1, div, null);
			append_dev(div, t3);

			if (ripple_slot) {
				ripple_slot.m(div, null);
			}

			/*div_binding*/ ctx[79](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(Ripple_action = Ripple.call(null, div, {
						ripple: /*ripple*/ ctx[11],
						unbounded: false,
						addClass: /*addClass*/ ctx[38],
						removeClass: /*removeClass*/ ctx[39],
						addStyle: /*addStyle*/ ctx[40]
					})),
					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[8])),
					action_destroyer(/*forwardEvents*/ ctx[35].call(null, div)),
					listen_dev(div, "SMUI:textfield:leading-icon:mount", /*SMUI_textfield_leading_icon_mount_handler_1*/ ctx[80], false, false, false),
					listen_dev(div, "SMUI:textfield:leading-icon:unmount", /*SMUI_textfield_leading_icon_unmount_handler_1*/ ctx[81], false, false, false),
					listen_dev(div, "SMUI:textfield:trailing-icon:mount", /*SMUI_textfield_trailing_icon_mount_handler_1*/ ctx[82], false, false, false),
					listen_dev(div, "SMUI:textfield:trailing-icon:unmount", /*SMUI_textfield_trailing_icon_unmount_handler_1*/ ctx[83], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (label_slot) {
				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(label_slot, label_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_label_slot_changes_2, get_label_slot_context_2);
				}
			}

			const contextfragment0_changes = {};

			if (dirty[2] & /*$$scope*/ 134217728) {
				contextfragment0_changes.$$scope = { dirty, ctx };
			}

			contextfragment0.$set(contextfragment0_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, null, null);
				}
			}

			const contextfragment1_changes = {};

			if (dirty[2] & /*$$scope*/ 134217728) {
				contextfragment1_changes.$$scope = { dirty, ctx };
			}

			contextfragment1.$set(contextfragment1_changes);

			if (ripple_slot) {
				if (ripple_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(ripple_slot, ripple_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_ripple_slot_changes, get_ripple_slot_context);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, invalid, internalClasses*/ 67228164 | dirty[1] & /*$$slots*/ 1024 && div_class_value !== (div_class_value = classMap({
					[/*className*/ ctx[9]]: true,
					"mdc-text-field": true,
					"mdc-text-field--disabled": /*disabled*/ ctx[12],
					"mdc-text-field--textarea": /*textarea*/ ctx[14],
					"mdc-text-field--filled": /*variant*/ ctx[15] === "filled",
					"mdc-text-field--outlined": /*variant*/ ctx[15] === "outlined",
					"smui-text-field--standard": /*variant*/ ctx[15] === "standard" && !/*textarea*/ ctx[14],
					"mdc-text-field--no-label": /*noLabel*/ ctx[16] || !/*$$slots*/ ctx[41].label,
					"mdc-text-field--with-leading-icon": /*$$slots*/ ctx[41].leadingIcon,
					"mdc-text-field--with-trailing-icon": /*$$slots*/ ctx[41].trailingIcon,
					"mdc-text-field--invalid": /*invalid*/ ctx[2] !== /*uninitializedValue*/ ctx[36] && /*invalid*/ ctx[2],
					.../*internalClasses*/ ctx[26]
				}))) && { class: div_class_value },
				(!current || dirty[0] & /*internalStyles, style*/ 134218752 && div_style_value !== (div_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func_1).concat([/*style*/ ctx[10]]).join(" "))) && { style: div_style_value },
				dirty[1] & /*$$restProps*/ 2048 && exclude(/*$$restProps*/ ctx[42], ["input$", "label$", "ripple$", "outline$", "helperLine$"])
			]));

			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*ripple*/ 2048) Ripple_action.update.call(null, {
				ripple: /*ripple*/ ctx[11],
				unbounded: false,
				addClass: /*addClass*/ ctx[38],
				removeClass: /*removeClass*/ ctx[39],
				addStyle: /*addStyle*/ ctx[40]
			});

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 256) useActions_action.update.call(null, /*use*/ ctx[8]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label_slot, local);
			transition_in(contextfragment0.$$.fragment, local);
			transition_in(default_slot, local);
			transition_in(contextfragment1.$$.fragment, local);
			transition_in(ripple_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label_slot, local);
			transition_out(contextfragment0.$$.fragment, local);
			transition_out(default_slot, local);
			transition_out(contextfragment1.$$.fragment, local);
			transition_out(ripple_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (label_slot) label_slot.d(detaching);
			destroy_component(contextfragment0);
			if (default_slot) default_slot.d(detaching);
			destroy_component(contextfragment1);
			if (ripple_slot) ripple_slot.d(detaching);
			/*div_binding*/ ctx[79](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(164:0) {:else}",
		ctx
	});

	return block;
}

// (1:0) {#if valued}
function create_if_block_1(ctx) {
	let label_1;
	let t0;
	let t1;
	let contextfragment0;
	let t2;
	let t3;
	let current_block_type_index;
	let if_block2;
	let t4;
	let contextfragment1;
	let t5;
	let label_1_class_value;
	let label_1_style_value;
	let label_1_for_value;
	let Ripple_action;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	let if_block0 = !/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== "outlined" && create_if_block_8(ctx);
	let if_block1 = (/*textarea*/ ctx[14] || /*variant*/ ctx[15] === "outlined") && create_if_block_6(ctx);

	contextfragment0 = new ContextFragment({
			props: {
				key: "SMUI:textfield:icon:leading",
				value: true,
				$$slots: { default: [create_default_slot_4$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const default_slot_template = /*#slots*/ ctx[50].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[89], null);
	const if_block_creators = [create_if_block_3, create_else_block$1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*textarea*/ ctx[14]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	contextfragment1 = new ContextFragment({
			props: {
				key: "SMUI:textfield:icon:leading",
				value: false,
				$$slots: { default: [create_default_slot_1$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	let if_block3 = !/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== "outlined" && /*ripple*/ ctx[11] && create_if_block_2(ctx);

	let label_1_levels = [
		{
			class: label_1_class_value = classMap({
				[/*className*/ ctx[9]]: true,
				"mdc-text-field": true,
				"mdc-text-field--disabled": /*disabled*/ ctx[12],
				"mdc-text-field--textarea": /*textarea*/ ctx[14],
				"mdc-text-field--filled": /*variant*/ ctx[15] === "filled",
				"mdc-text-field--outlined": /*variant*/ ctx[15] === "outlined",
				"smui-text-field--standard": /*variant*/ ctx[15] === "standard" && !/*textarea*/ ctx[14],
				"mdc-text-field--no-label": /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[41].label,
				"mdc-text-field--label-floating": /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== "",
				"mdc-text-field--with-leading-icon": /*withLeadingIcon*/ ctx[22] === /*uninitializedValue*/ ctx[36]
				? /*$$slots*/ ctx[41].leadingIcon
				: /*withLeadingIcon*/ ctx[22],
				"mdc-text-field--with-trailing-icon": /*withTrailingIcon*/ ctx[23] === /*uninitializedValue*/ ctx[36]
				? /*$$slots*/ ctx[41].trailingIcon
				: /*withTrailingIcon*/ ctx[23],
				"mdc-text-field--with-internal-counter": /*textarea*/ ctx[14] && /*$$slots*/ ctx[41].internalCounter,
				"mdc-text-field--invalid": /*invalid*/ ctx[2] !== /*uninitializedValue*/ ctx[36] && /*invalid*/ ctx[2],
				.../*internalClasses*/ ctx[26]
			})
		},
		{
			style: label_1_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func).concat([/*style*/ ctx[10]]).join(" ")
		},
		{
			for: label_1_for_value = /* suppress a11y warning, since this is wrapped */ null
		},
		exclude(/*$$restProps*/ ctx[42], ["input$", "label$", "ripple$", "outline$", "helperLine$"])
	];

	let label_1_data = {};

	for (let i = 0; i < label_1_levels.length; i += 1) {
		label_1_data = assign(label_1_data, label_1_levels[i]);
	}

	const block = {
		c: function create() {
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			create_component(contextfragment0.$$.fragment);
			t2 = space();
			if (default_slot) default_slot.c();
			t3 = space();
			if_block2.c();
			t4 = space();
			create_component(contextfragment1.$$.fragment);
			t5 = space();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			label_1 = claim_element(nodes, "LABEL", { class: true, style: true, for: true });
			var label_1_nodes = children(label_1);
			if (if_block0) if_block0.l(label_1_nodes);
			t0 = claim_space(label_1_nodes);
			if (if_block1) if_block1.l(label_1_nodes);
			t1 = claim_space(label_1_nodes);
			claim_component(contextfragment0.$$.fragment, label_1_nodes);
			t2 = claim_space(label_1_nodes);
			if (default_slot) default_slot.l(label_1_nodes);
			t3 = claim_space(label_1_nodes);
			if_block2.l(label_1_nodes);
			t4 = claim_space(label_1_nodes);
			claim_component(contextfragment1.$$.fragment, label_1_nodes);
			t5 = claim_space(label_1_nodes);
			if (if_block3) if_block3.l(label_1_nodes);
			label_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(label_1, label_1_data);
			add_location(label_1, file$2, 1, 2, 15);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label_1, anchor);
			if (if_block0) if_block0.m(label_1, null);
			append_dev(label_1, t0);
			if (if_block1) if_block1.m(label_1, null);
			append_dev(label_1, t1);
			mount_component(contextfragment0, label_1, null);
			append_dev(label_1, t2);

			if (default_slot) {
				default_slot.m(label_1, null);
			}

			append_dev(label_1, t3);
			if_blocks[current_block_type_index].m(label_1, null);
			append_dev(label_1, t4);
			mount_component(contextfragment1, label_1, null);
			append_dev(label_1, t5);
			if (if_block3) if_block3.m(label_1, null);
			/*label_1_binding*/ ctx[72](label_1);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(Ripple_action = Ripple.call(null, label_1, {
						ripple: !/*textarea*/ ctx[14] && /*variant*/ ctx[15] === "filled",
						unbounded: false,
						addClass: /*addClass*/ ctx[38],
						removeClass: /*removeClass*/ ctx[39],
						addStyle: /*addStyle*/ ctx[40],
						eventTarget: /*inputElement*/ ctx[34],
						activeTarget: /*inputElement*/ ctx[34],
						initPromise: /*initPromise*/ ctx[37]
					})),
					action_destroyer(useActions_action = useActions.call(null, label_1, /*use*/ ctx[8])),
					action_destroyer(/*forwardEvents*/ ctx[35].call(null, label_1)),
					listen_dev(label_1, "SMUI:textfield:leading-icon:mount", /*SMUI_textfield_leading_icon_mount_handler*/ ctx[73], false, false, false),
					listen_dev(label_1, "SMUI:textfield:leading-icon:unmount", /*SMUI_textfield_leading_icon_unmount_handler*/ ctx[74], false, false, false),
					listen_dev(label_1, "SMUI:textfield:trailing-icon:mount", /*SMUI_textfield_trailing_icon_mount_handler*/ ctx[75], false, false, false),
					listen_dev(label_1, "SMUI:textfield:trailing-icon:unmount", /*SMUI_textfield_trailing_icon_unmount_handler*/ ctx[76], false, false, false),
					listen_dev(label_1, "SMUI:textfield:character-counter:mount", /*SMUI_textfield_character_counter_mount_handler*/ ctx[77], false, false, false),
					listen_dev(label_1, "SMUI:textfield:character-counter:unmount", /*SMUI_textfield_character_counter_unmount_handler*/ ctx[78], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== "outlined") {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*textarea, variant*/ 49152) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_8(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(label_1, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*textarea*/ ctx[14] || /*variant*/ ctx[15] === "outlined") {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*textarea, variant*/ 49152) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(label_1, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			const contextfragment0_changes = {};

			if (dirty[2] & /*$$scope*/ 134217728) {
				contextfragment0_changes.$$scope = { dirty, ctx };
			}

			contextfragment0.$set(contextfragment0_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, null, null);
				}
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block2 = if_blocks[current_block_type_index];

				if (!if_block2) {
					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block2.c();
				} else {
					if_block2.p(ctx, dirty);
				}

				transition_in(if_block2, 1);
				if_block2.m(label_1, t4);
			}

			const contextfragment1_changes = {};

			if (dirty[2] & /*$$scope*/ 134217728) {
				contextfragment1_changes.$$scope = { dirty, ctx };
			}

			contextfragment1.$set(contextfragment1_changes);

			if (!/*textarea*/ ctx[14] && /*variant*/ ctx[15] !== "outlined" && /*ripple*/ ctx[11]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty[0] & /*textarea, variant, ripple*/ 51200) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_2(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(label_1, null);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			set_attributes(label_1, label_1_data = get_spread_update(label_1_levels, [
				(!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, label, focused, value, withLeadingIcon, withTrailingIcon, invalid, internalClasses*/ 616813061 | dirty[1] & /*$$slots*/ 1024 && label_1_class_value !== (label_1_class_value = classMap({
					[/*className*/ ctx[9]]: true,
					"mdc-text-field": true,
					"mdc-text-field--disabled": /*disabled*/ ctx[12],
					"mdc-text-field--textarea": /*textarea*/ ctx[14],
					"mdc-text-field--filled": /*variant*/ ctx[15] === "filled",
					"mdc-text-field--outlined": /*variant*/ ctx[15] === "outlined",
					"smui-text-field--standard": /*variant*/ ctx[15] === "standard" && !/*textarea*/ ctx[14],
					"mdc-text-field--no-label": /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[41].label,
					"mdc-text-field--label-floating": /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== "",
					"mdc-text-field--with-leading-icon": /*withLeadingIcon*/ ctx[22] === /*uninitializedValue*/ ctx[36]
					? /*$$slots*/ ctx[41].leadingIcon
					: /*withLeadingIcon*/ ctx[22],
					"mdc-text-field--with-trailing-icon": /*withTrailingIcon*/ ctx[23] === /*uninitializedValue*/ ctx[36]
					? /*$$slots*/ ctx[41].trailingIcon
					: /*withTrailingIcon*/ ctx[23],
					"mdc-text-field--with-internal-counter": /*textarea*/ ctx[14] && /*$$slots*/ ctx[41].internalCounter,
					"mdc-text-field--invalid": /*invalid*/ ctx[2] !== /*uninitializedValue*/ ctx[36] && /*invalid*/ ctx[2],
					.../*internalClasses*/ ctx[26]
				}))) && { class: label_1_class_value },
				(!current || dirty[0] & /*internalStyles, style*/ 134218752 && label_1_style_value !== (label_1_style_value = Object.entries(/*internalStyles*/ ctx[27]).map(func).concat([/*style*/ ctx[10]]).join(" "))) && { style: label_1_style_value },
				{ for: label_1_for_value },
				dirty[1] & /*$$restProps*/ 2048 && exclude(/*$$restProps*/ ctx[42], ["input$", "label$", "ripple$", "outline$", "helperLine$"])
			]));

			if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*textarea, variant*/ 49152 | dirty[1] & /*inputElement*/ 8) Ripple_action.update.call(null, {
				ripple: !/*textarea*/ ctx[14] && /*variant*/ ctx[15] === "filled",
				unbounded: false,
				addClass: /*addClass*/ ctx[38],
				removeClass: /*removeClass*/ ctx[39],
				addStyle: /*addStyle*/ ctx[40],
				eventTarget: /*inputElement*/ ctx[34],
				activeTarget: /*inputElement*/ ctx[34],
				initPromise: /*initPromise*/ ctx[37]
			});

			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 256) useActions_action.update.call(null, /*use*/ ctx[8]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(contextfragment0.$$.fragment, local);
			transition_in(default_slot, local);
			transition_in(if_block2);
			transition_in(contextfragment1.$$.fragment, local);
			transition_in(if_block3);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(contextfragment0.$$.fragment, local);
			transition_out(default_slot, local);
			transition_out(if_block2);
			transition_out(contextfragment1.$$.fragment, local);
			transition_out(if_block3);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label_1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_component(contextfragment0);
			if (default_slot) default_slot.d(detaching);
			if_blocks[current_block_type_index].d();
			destroy_component(contextfragment1);
			if (if_block3) if_block3.d();
			/*label_1_binding*/ ctx[72](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(1:0) {#if valued}",
		ctx
	});

	return block;
}

// (209:4) <ContextFragment key="SMUI:textfield:icon:leading" value={true}>
function create_default_slot_9(ctx) {
	let current;
	const leadingIcon_slot_template = /*#slots*/ ctx[50].leadingIcon;
	const leadingIcon_slot = create_slot(leadingIcon_slot_template, ctx, /*$$scope*/ ctx[89], get_leadingIcon_slot_context_1);

	const block = {
		c: function create() {
			if (leadingIcon_slot) leadingIcon_slot.c();
		},
		l: function claim(nodes) {
			if (leadingIcon_slot) leadingIcon_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (leadingIcon_slot) {
				leadingIcon_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (leadingIcon_slot) {
				if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(leadingIcon_slot, leadingIcon_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_leadingIcon_slot_changes_1, get_leadingIcon_slot_context_1);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(leadingIcon_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(leadingIcon_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (leadingIcon_slot) leadingIcon_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9.name,
		type: "slot",
		source: "(209:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={true}>",
		ctx
	});

	return block;
}

// (213:4) <ContextFragment key="SMUI:textfield:icon:leading" value={false}>
function create_default_slot_8(ctx) {
	let current;
	const trailingIcon_slot_template = /*#slots*/ ctx[50].trailingIcon;
	const trailingIcon_slot = create_slot(trailingIcon_slot_template, ctx, /*$$scope*/ ctx[89], get_trailingIcon_slot_context_1);

	const block = {
		c: function create() {
			if (trailingIcon_slot) trailingIcon_slot.c();
		},
		l: function claim(nodes) {
			if (trailingIcon_slot) trailingIcon_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (trailingIcon_slot) {
				trailingIcon_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (trailingIcon_slot) {
				if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(trailingIcon_slot, trailingIcon_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_trailingIcon_slot_changes_1, get_trailingIcon_slot_context_1);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(trailingIcon_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(trailingIcon_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (trailingIcon_slot) trailingIcon_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8.name,
		type: "slot",
		source: "(213:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={false}>",
		ctx
	});

	return block;
}

// (63:4) {#if !textarea && variant !== 'outlined'}
function create_if_block_8(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*variant*/ ctx[15] === "filled" && create_if_block_10(ctx);
	let if_block1 = !/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[41].label) && create_if_block_9(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*variant*/ ctx[15] === "filled") {
				if (if_block0) ; else {
					if_block0 = create_if_block_10(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (!/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[41].label)) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 1024) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_9(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(63:4) {#if !textarea && variant !== 'outlined'}",
		ctx
	});

	return block;
}

// (64:6) {#if variant === 'filled'}
function create_if_block_10(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			children(span).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "mdc-text-field__ripple");
			add_location(span, file$2, 64, 8, 2304);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(64:6) {#if variant === 'filled'}",
		ctx
	});

	return block;
}

// (67:6) {#if !noLabel && (label != null || $$slots.label)}
function create_if_block_9(ctx) {
	let floatinglabel;
	let current;

	const floatinglabel_spread_levels = [
		{
			floatAbove: /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ""
		},
		{ required: /*required*/ ctx[13] },
		{ wrapped: true },
		prefixFilter(/*$$restProps*/ ctx[42], "label$")
	];

	let floatinglabel_props = {
		$$slots: { default: [create_default_slot_7$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
	}

	floatinglabel = new FloatingLabel({
			props: floatinglabel_props,
			$$inline: true
		});

	/*floatinglabel_binding*/ ctx[51](floatinglabel);

	const block = {
		c: function create() {
			create_component(floatinglabel.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(floatinglabel.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(floatinglabel, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const floatinglabel_changes = (dirty[0] & /*focused, value, required*/ 536879105 | dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(floatinglabel_spread_levels, [
					dirty[0] & /*focused, value*/ 536870913 && {
						floatAbove: /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ""
					},
					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
					floatinglabel_spread_levels[2],
					dirty[1] & /*$$restProps*/ 2048 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "label$"))
				])
			: {};

			if (dirty[0] & /*label*/ 131072 | dirty[2] & /*$$scope*/ 134217728) {
				floatinglabel_changes.$$scope = { dirty, ctx };
			}

			floatinglabel.$set(floatinglabel_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(floatinglabel.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(floatinglabel.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*floatinglabel_binding*/ ctx[51](null);
			destroy_component(floatinglabel, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(67:6) {#if !noLabel && (label != null || $$slots.label)}",
		ctx
	});

	return block;
}

// (68:8) <FloatingLabel           bind:this={floatingLabel}           floatAbove={focused || (value != null && value !== '')}           {required}           wrapped           {...prefixFilter($$restProps, 'label$')}           >
function create_default_slot_7$1(ctx) {
	let t_value = (/*label*/ ctx[17] == null ? "" : /*label*/ ctx[17]) + "";
	let t;
	let current;
	const label_slot_template = /*#slots*/ ctx[50].label;
	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[89], get_label_slot_context);

	const block = {
		c: function create() {
			t = text(t_value);
			if (label_slot) label_slot.c();
		},
		l: function claim(nodes) {
			t = claim_text(nodes, t_value);
			if (label_slot) label_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);

			if (label_slot) {
				label_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty[0] & /*label*/ 131072) && t_value !== (t_value = (/*label*/ ctx[17] == null ? "" : /*label*/ ctx[17]) + "")) set_data_dev(t, t_value);

			if (label_slot) {
				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(label_slot, label_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_label_slot_changes, get_label_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			if (label_slot) label_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7$1.name,
		type: "slot",
		source: "(68:8) <FloatingLabel           bind:this={floatingLabel}           floatAbove={focused || (value != null && value !== '')}           {required}           wrapped           {...prefixFilter($$restProps, 'label$')}           >",
		ctx
	});

	return block;
}

// (78:4) {#if textarea || variant === 'outlined'}
function create_if_block_6(ctx) {
	let notchedoutline;
	let current;

	const notchedoutline_spread_levels = [
		{
			noLabel: /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[41].label
		},
		prefixFilter(/*$$restProps*/ ctx[42], "outline$")
	];

	let notchedoutline_props = {
		$$slots: { default: [create_default_slot_5$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < notchedoutline_spread_levels.length; i += 1) {
		notchedoutline_props = assign(notchedoutline_props, notchedoutline_spread_levels[i]);
	}

	notchedoutline = new NotchedOutline({
			props: notchedoutline_props,
			$$inline: true
		});

	/*notchedoutline_binding*/ ctx[53](notchedoutline);

	const block = {
		c: function create() {
			create_component(notchedoutline.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(notchedoutline.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(notchedoutline, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const notchedoutline_changes = (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots, $$restProps*/ 3072)
			? get_spread_update(notchedoutline_spread_levels, [
					dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 1024 && {
						noLabel: /*noLabel*/ ctx[16] || /*label*/ ctx[17] == null && !/*$$slots*/ ctx[41].label
					},
					dirty[1] & /*$$restProps*/ 2048 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "outline$"))
				])
			: {};

			if (dirty[0] & /*focused, value, required, floatingLabel, label, noLabel*/ 537075745 | dirty[1] & /*$$restProps, $$slots*/ 3072 | dirty[2] & /*$$scope*/ 134217728) {
				notchedoutline_changes.$$scope = { dirty, ctx };
			}

			notchedoutline.$set(notchedoutline_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(notchedoutline.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(notchedoutline.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*notchedoutline_binding*/ ctx[53](null);
			destroy_component(notchedoutline, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(78:4) {#if textarea || variant === 'outlined'}",
		ctx
	});

	return block;
}

// (84:8) {#if !noLabel && (label != null || $$slots.label)}
function create_if_block_7(ctx) {
	let floatinglabel;
	let current;

	const floatinglabel_spread_levels = [
		{
			floatAbove: /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ""
		},
		{ required: /*required*/ ctx[13] },
		{ wrapped: true },
		prefixFilter(/*$$restProps*/ ctx[42], "label$")
	];

	let floatinglabel_props = {
		$$slots: { default: [create_default_slot_6$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
		floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
	}

	floatinglabel = new FloatingLabel({
			props: floatinglabel_props,
			$$inline: true
		});

	/*floatinglabel_binding_1*/ ctx[52](floatinglabel);

	const block = {
		c: function create() {
			create_component(floatinglabel.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(floatinglabel.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(floatinglabel, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const floatinglabel_changes = (dirty[0] & /*focused, value, required*/ 536879105 | dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(floatinglabel_spread_levels, [
					dirty[0] & /*focused, value*/ 536870913 && {
						floatAbove: /*focused*/ ctx[29] || /*value*/ ctx[0] != null && /*value*/ ctx[0] !== ""
					},
					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
					floatinglabel_spread_levels[2],
					dirty[1] & /*$$restProps*/ 2048 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "label$"))
				])
			: {};

			if (dirty[0] & /*label*/ 131072 | dirty[2] & /*$$scope*/ 134217728) {
				floatinglabel_changes.$$scope = { dirty, ctx };
			}

			floatinglabel.$set(floatinglabel_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(floatinglabel.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(floatinglabel.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*floatinglabel_binding_1*/ ctx[52](null);
			destroy_component(floatinglabel, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(84:8) {#if !noLabel && (label != null || $$slots.label)}",
		ctx
	});

	return block;
}

// (85:10) <FloatingLabel             bind:this={floatingLabel}             floatAbove={focused || (value != null && value !== '')}             {required}             wrapped             {...prefixFilter($$restProps, 'label$')}             >
function create_default_slot_6$1(ctx) {
	let t_value = (/*label*/ ctx[17] == null ? "" : /*label*/ ctx[17]) + "";
	let t;
	let current;
	const label_slot_template = /*#slots*/ ctx[50].label;
	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[89], get_label_slot_context_1);

	const block = {
		c: function create() {
			t = text(t_value);
			if (label_slot) label_slot.c();
		},
		l: function claim(nodes) {
			t = claim_text(nodes, t_value);
			if (label_slot) label_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);

			if (label_slot) {
				label_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty[0] & /*label*/ 131072) && t_value !== (t_value = (/*label*/ ctx[17] == null ? "" : /*label*/ ctx[17]) + "")) set_data_dev(t, t_value);

			if (label_slot) {
				if (label_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(label_slot, label_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_label_slot_changes_1, get_label_slot_context_1);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			if (label_slot) label_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6$1.name,
		type: "slot",
		source: "(85:10) <FloatingLabel             bind:this={floatingLabel}             floatAbove={focused || (value != null && value !== '')}             {required}             wrapped             {...prefixFilter($$restProps, 'label$')}             >",
		ctx
	});

	return block;
}

// (79:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >
function create_default_slot_5$1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = !/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[41].label) && create_if_block_7(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!/*noLabel*/ ctx[16] && (/*label*/ ctx[17] != null || /*$$slots*/ ctx[41].label)) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*noLabel, label*/ 196608 | dirty[1] & /*$$slots*/ 1024) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_7(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5$1.name,
		type: "slot",
		source: "(79:6) <NotchedOutline         bind:this={notchedOutline}         noLabel={noLabel || (label == null && !$$slots.label)}         {...prefixFilter($$restProps, 'outline$')}       >",
		ctx
	});

	return block;
}

// (96:4) <ContextFragment key="SMUI:textfield:icon:leading" value={true}>
function create_default_slot_4$1(ctx) {
	let current;
	const leadingIcon_slot_template = /*#slots*/ ctx[50].leadingIcon;
	const leadingIcon_slot = create_slot(leadingIcon_slot_template, ctx, /*$$scope*/ ctx[89], get_leadingIcon_slot_context);

	const block = {
		c: function create() {
			if (leadingIcon_slot) leadingIcon_slot.c();
		},
		l: function claim(nodes) {
			if (leadingIcon_slot) leadingIcon_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (leadingIcon_slot) {
				leadingIcon_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (leadingIcon_slot) {
				if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(leadingIcon_slot, leadingIcon_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_leadingIcon_slot_changes, get_leadingIcon_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(leadingIcon_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(leadingIcon_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (leadingIcon_slot) leadingIcon_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4$1.name,
		type: "slot",
		source: "(96:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={true}>",
		ctx
	});

	return block;
}

// (125:4) {:else}
function create_else_block$1(ctx) {
	let t0;
	let t1;
	let input_1;
	let updating_value;
	let updating_files;
	let updating_dirty;
	let updating_invalid;
	let t2;
	let t3;
	let current;
	const prefix_slot_template = /*#slots*/ ctx[50].prefix;
	const prefix_slot = create_slot(prefix_slot_template, ctx, /*$$scope*/ ctx[89], get_prefix_slot_context);
	let if_block0 = /*prefix*/ ctx[19] != null && create_if_block_5(ctx);

	const input_1_spread_levels = [
		{ type: /*type*/ ctx[18] },
		{ disabled: /*disabled*/ ctx[12] },
		{ required: /*required*/ ctx[13] },
		{ updateInvalid: /*updateInvalid*/ ctx[21] },
		{ "aria-controls": /*helperId*/ ctx[28] },
		{ "aria-describedby": /*helperId*/ ctx[28] },
		/*noLabel*/ ctx[16] && /*label*/ ctx[17] != null
		? { placeholder: /*label*/ ctx[17] }
		: {},
		prefixFilter(/*$$restProps*/ ctx[42], "input$")
	];

	function input_1_value_binding(value) {
		/*input_1_value_binding*/ ctx[63](value);
	}

	function input_1_files_binding(value) {
		/*input_1_files_binding*/ ctx[64](value);
	}

	function input_1_dirty_binding(value) {
		/*input_1_dirty_binding*/ ctx[65](value);
	}

	function input_1_invalid_binding(value) {
		/*input_1_invalid_binding*/ ctx[66](value);
	}

	let input_1_props = {};

	for (let i = 0; i < input_1_spread_levels.length; i += 1) {
		input_1_props = assign(input_1_props, input_1_spread_levels[i]);
	}

	if (/*value*/ ctx[0] !== void 0) {
		input_1_props.value = /*value*/ ctx[0];
	}

	if (/*files*/ ctx[1] !== void 0) {
		input_1_props.files = /*files*/ ctx[1];
	}

	if (/*dirty*/ ctx[4] !== void 0) {
		input_1_props.dirty = /*dirty*/ ctx[4];
	}

	if (/*invalid*/ ctx[2] !== void 0) {
		input_1_props.invalid = /*invalid*/ ctx[2];
	}

	input_1 = new Input({ props: input_1_props, $$inline: true });
	/*input_1_binding*/ ctx[62](input_1);
	binding_callbacks.push(() => bind(input_1, "value", input_1_value_binding));
	binding_callbacks.push(() => bind(input_1, "files", input_1_files_binding));
	binding_callbacks.push(() => bind(input_1, "dirty", input_1_dirty_binding));
	binding_callbacks.push(() => bind(input_1, "invalid", input_1_invalid_binding));
	input_1.$on("blur", /*blur_handler_3*/ ctx[67]);
	input_1.$on("focus", /*focus_handler_3*/ ctx[68]);
	input_1.$on("blur", /*blur_handler_1*/ ctx[69]);
	input_1.$on("focus", /*focus_handler_1*/ ctx[70]);
	let if_block1 = /*suffix*/ ctx[20] != null && create_if_block_4(ctx);
	const suffix_slot_template = /*#slots*/ ctx[50].suffix;
	const suffix_slot = create_slot(suffix_slot_template, ctx, /*$$scope*/ ctx[89], get_suffix_slot_context);

	const block = {
		c: function create() {
			if (prefix_slot) prefix_slot.c();
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			create_component(input_1.$$.fragment);
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			if (suffix_slot) suffix_slot.c();
		},
		l: function claim(nodes) {
			if (prefix_slot) prefix_slot.l(nodes);
			t0 = claim_space(nodes);
			if (if_block0) if_block0.l(nodes);
			t1 = claim_space(nodes);
			claim_component(input_1.$$.fragment, nodes);
			t2 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			t3 = claim_space(nodes);
			if (suffix_slot) suffix_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (prefix_slot) {
				prefix_slot.m(target, anchor);
			}

			insert_dev(target, t0, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(input_1, target, anchor);
			insert_dev(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t3, anchor);

			if (suffix_slot) {
				suffix_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (prefix_slot) {
				if (prefix_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(prefix_slot, prefix_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_prefix_slot_changes, get_prefix_slot_context);
				}
			}

			if (/*prefix*/ ctx[19] != null) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*prefix*/ 524288) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t1.parentNode, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const input_1_changes = (dirty[0] & /*type, disabled, required, updateInvalid, helperId, noLabel, label*/ 271003648 | dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(input_1_spread_levels, [
					dirty[0] & /*type*/ 262144 && { type: /*type*/ ctx[18] },
					dirty[0] & /*disabled*/ 4096 && { disabled: /*disabled*/ ctx[12] },
					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
					dirty[0] & /*updateInvalid*/ 2097152 && { updateInvalid: /*updateInvalid*/ ctx[21] },
					dirty[0] & /*helperId*/ 268435456 && { "aria-controls": /*helperId*/ ctx[28] },
					dirty[0] & /*helperId*/ 268435456 && { "aria-describedby": /*helperId*/ ctx[28] },
					dirty[0] & /*noLabel, label*/ 196608 && get_spread_object(/*noLabel*/ ctx[16] && /*label*/ ctx[17] != null
					? { placeholder: /*label*/ ctx[17] }
					: {}),
					dirty[1] & /*$$restProps*/ 2048 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "input$"))
				])
			: {};

			if (!updating_value && dirty[0] & /*value*/ 1) {
				updating_value = true;
				input_1_changes.value = /*value*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			if (!updating_files && dirty[0] & /*files*/ 2) {
				updating_files = true;
				input_1_changes.files = /*files*/ ctx[1];
				add_flush_callback(() => updating_files = false);
			}

			if (!updating_dirty && dirty[0] & /*dirty*/ 16) {
				updating_dirty = true;
				input_1_changes.dirty = /*dirty*/ ctx[4];
				add_flush_callback(() => updating_dirty = false);
			}

			if (!updating_invalid && dirty[0] & /*invalid*/ 4) {
				updating_invalid = true;
				input_1_changes.invalid = /*invalid*/ ctx[2];
				add_flush_callback(() => updating_invalid = false);
			}

			input_1.$set(input_1_changes);

			if (/*suffix*/ ctx[20] != null) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*suffix*/ 1048576) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t3.parentNode, t3);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (suffix_slot) {
				if (suffix_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(suffix_slot, suffix_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_suffix_slot_changes, get_suffix_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(prefix_slot, local);
			transition_in(if_block0);
			transition_in(input_1.$$.fragment, local);
			transition_in(if_block1);
			transition_in(suffix_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(prefix_slot, local);
			transition_out(if_block0);
			transition_out(input_1.$$.fragment, local);
			transition_out(if_block1);
			transition_out(suffix_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (prefix_slot) prefix_slot.d(detaching);
			if (detaching) detach_dev(t0);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t1);
			/*input_1_binding*/ ctx[62](null);
			destroy_component(input_1, detaching);
			if (detaching) detach_dev(t2);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t3);
			if (suffix_slot) suffix_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(125:4) {:else}",
		ctx
	});

	return block;
}

// (100:4) {#if textarea}
function create_if_block_3(ctx) {
	let span;
	let textarea_1;
	let updating_value;
	let updating_dirty;
	let updating_invalid;
	let t;
	let span_class_value;
	let current;

	const textarea_1_spread_levels = [
		{ disabled: /*disabled*/ ctx[12] },
		{ required: /*required*/ ctx[13] },
		{ updateInvalid: /*updateInvalid*/ ctx[21] },
		{ "aria-controls": /*helperId*/ ctx[28] },
		{ "aria-describedby": /*helperId*/ ctx[28] },
		prefixFilter(/*$$restProps*/ ctx[42], "input$")
	];

	function textarea_1_value_binding(value) {
		/*textarea_1_value_binding*/ ctx[55](value);
	}

	function textarea_1_dirty_binding(value) {
		/*textarea_1_dirty_binding*/ ctx[56](value);
	}

	function textarea_1_invalid_binding(value) {
		/*textarea_1_invalid_binding*/ ctx[57](value);
	}

	let textarea_1_props = {};

	for (let i = 0; i < textarea_1_spread_levels.length; i += 1) {
		textarea_1_props = assign(textarea_1_props, textarea_1_spread_levels[i]);
	}

	if (/*value*/ ctx[0] !== void 0) {
		textarea_1_props.value = /*value*/ ctx[0];
	}

	if (/*dirty*/ ctx[4] !== void 0) {
		textarea_1_props.dirty = /*dirty*/ ctx[4];
	}

	if (/*invalid*/ ctx[2] !== void 0) {
		textarea_1_props.invalid = /*invalid*/ ctx[2];
	}

	textarea_1 = new Textarea({ props: textarea_1_props, $$inline: true });
	/*textarea_1_binding*/ ctx[54](textarea_1);
	binding_callbacks.push(() => bind(textarea_1, "value", textarea_1_value_binding));
	binding_callbacks.push(() => bind(textarea_1, "dirty", textarea_1_dirty_binding));
	binding_callbacks.push(() => bind(textarea_1, "invalid", textarea_1_invalid_binding));
	textarea_1.$on("blur", /*blur_handler_2*/ ctx[58]);
	textarea_1.$on("focus", /*focus_handler_2*/ ctx[59]);
	textarea_1.$on("blur", /*blur_handler*/ ctx[60]);
	textarea_1.$on("focus", /*focus_handler*/ ctx[61]);
	const internalCounter_slot_template = /*#slots*/ ctx[50].internalCounter;
	const internalCounter_slot = create_slot(internalCounter_slot_template, ctx, /*$$scope*/ ctx[89], get_internalCounter_slot_context);

	const block = {
		c: function create() {
			span = element("span");
			create_component(textarea_1.$$.fragment);
			t = space();
			if (internalCounter_slot) internalCounter_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			claim_component(textarea_1.$$.fragment, span_nodes);
			t = claim_space(span_nodes);
			if (internalCounter_slot) internalCounter_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", span_class_value = classMap({
				"mdc-text-field__resizer": !("input$resizable" in /*$$restProps*/ ctx[42]) || /*$$restProps*/ ctx[42].input$resizable
			}));

			add_location(span, file$2, 100, 6, 3548);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			mount_component(textarea_1, span, null);
			append_dev(span, t);

			if (internalCounter_slot) {
				internalCounter_slot.m(span, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const textarea_1_changes = (dirty[0] & /*disabled, required, updateInvalid, helperId*/ 270544896 | dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(textarea_1_spread_levels, [
					dirty[0] & /*disabled*/ 4096 && { disabled: /*disabled*/ ctx[12] },
					dirty[0] & /*required*/ 8192 && { required: /*required*/ ctx[13] },
					dirty[0] & /*updateInvalid*/ 2097152 && { updateInvalid: /*updateInvalid*/ ctx[21] },
					dirty[0] & /*helperId*/ 268435456 && { "aria-controls": /*helperId*/ ctx[28] },
					dirty[0] & /*helperId*/ 268435456 && { "aria-describedby": /*helperId*/ ctx[28] },
					dirty[1] & /*$$restProps*/ 2048 && get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "input$"))
				])
			: {};

			if (!updating_value && dirty[0] & /*value*/ 1) {
				updating_value = true;
				textarea_1_changes.value = /*value*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			if (!updating_dirty && dirty[0] & /*dirty*/ 16) {
				updating_dirty = true;
				textarea_1_changes.dirty = /*dirty*/ ctx[4];
				add_flush_callback(() => updating_dirty = false);
			}

			if (!updating_invalid && dirty[0] & /*invalid*/ 4) {
				updating_invalid = true;
				textarea_1_changes.invalid = /*invalid*/ ctx[2];
				add_flush_callback(() => updating_invalid = false);
			}

			textarea_1.$set(textarea_1_changes);

			if (internalCounter_slot) {
				if (internalCounter_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(internalCounter_slot, internalCounter_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_internalCounter_slot_changes, get_internalCounter_slot_context);
				}
			}

			if (!current || dirty[1] & /*$$restProps*/ 2048 && span_class_value !== (span_class_value = classMap({
				"mdc-text-field__resizer": !("input$resizable" in /*$$restProps*/ ctx[42]) || /*$$restProps*/ ctx[42].input$resizable
			}))) {
				attr_dev(span, "class", span_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textarea_1.$$.fragment, local);
			transition_in(internalCounter_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textarea_1.$$.fragment, local);
			transition_out(internalCounter_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			/*textarea_1_binding*/ ctx[54](null);
			destroy_component(textarea_1);
			if (internalCounter_slot) internalCounter_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(100:4) {#if textarea}",
		ctx
	});

	return block;
}

// (127:6) {#if prefix != null}
function create_if_block_5(ctx) {
	let prefix_1;
	let current;

	prefix_1 = new Prefix({
			props: {
				$$slots: { default: [create_default_slot_3$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(prefix_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(prefix_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(prefix_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const prefix_1_changes = {};

			if (dirty[0] & /*prefix*/ 524288 | dirty[2] & /*$$scope*/ 134217728) {
				prefix_1_changes.$$scope = { dirty, ctx };
			}

			prefix_1.$set(prefix_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(prefix_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(prefix_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(prefix_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(127:6) {#if prefix != null}",
		ctx
	});

	return block;
}

// (128:8) <Prefix>
function create_default_slot_3$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text(/*prefix*/ ctx[19]);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, /*prefix*/ ctx[19]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 524288) set_data_dev(t, /*prefix*/ ctx[19]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3$1.name,
		type: "slot",
		source: "(128:8) <Prefix>",
		ctx
	});

	return block;
}

// (149:6) {#if suffix != null}
function create_if_block_4(ctx) {
	let suffix_1;
	let current;

	suffix_1 = new Suffix({
			props: {
				$$slots: { default: [create_default_slot_2$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(suffix_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(suffix_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(suffix_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const suffix_1_changes = {};

			if (dirty[0] & /*suffix*/ 1048576 | dirty[2] & /*$$scope*/ 134217728) {
				suffix_1_changes.$$scope = { dirty, ctx };
			}

			suffix_1.$set(suffix_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(suffix_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(suffix_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(suffix_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(149:6) {#if suffix != null}",
		ctx
	});

	return block;
}

// (150:8) <Suffix>
function create_default_slot_2$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text(/*suffix*/ ctx[20]);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, /*suffix*/ ctx[20]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 1048576) set_data_dev(t, /*suffix*/ ctx[20]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$1.name,
		type: "slot",
		source: "(150:8) <Suffix>",
		ctx
	});

	return block;
}

// (154:4) <ContextFragment key="SMUI:textfield:icon:leading" value={false}>
function create_default_slot_1$1(ctx) {
	let current;
	const trailingIcon_slot_template = /*#slots*/ ctx[50].trailingIcon;
	const trailingIcon_slot = create_slot(trailingIcon_slot_template, ctx, /*$$scope*/ ctx[89], get_trailingIcon_slot_context);

	const block = {
		c: function create() {
			if (trailingIcon_slot) trailingIcon_slot.c();
		},
		l: function claim(nodes) {
			if (trailingIcon_slot) trailingIcon_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (trailingIcon_slot) {
				trailingIcon_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (trailingIcon_slot) {
				if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(trailingIcon_slot, trailingIcon_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_trailingIcon_slot_changes, get_trailingIcon_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(trailingIcon_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(trailingIcon_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (trailingIcon_slot) trailingIcon_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$1.name,
		type: "slot",
		source: "(154:4) <ContextFragment key=\\\"SMUI:textfield:icon:leading\\\" value={false}>",
		ctx
	});

	return block;
}

// (157:4) {#if !textarea && variant !== 'outlined' && ripple}
function create_if_block_2(ctx) {
	let lineripple;
	let current;
	const lineripple_spread_levels = [prefixFilter(/*$$restProps*/ ctx[42], "ripple$")];
	let lineripple_props = {};

	for (let i = 0; i < lineripple_spread_levels.length; i += 1) {
		lineripple_props = assign(lineripple_props, lineripple_spread_levels[i]);
	}

	lineripple = new LineRipple({ props: lineripple_props, $$inline: true });
	/*lineripple_binding*/ ctx[71](lineripple);

	const block = {
		c: function create() {
			create_component(lineripple.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(lineripple.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(lineripple, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const lineripple_changes = (dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(lineripple_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "ripple$"))])
			: {};

			lineripple.$set(lineripple_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(lineripple.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(lineripple.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*lineripple_binding*/ ctx[71](null);
			destroy_component(lineripple, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(157:4) {#if !textarea && variant !== 'outlined' && ripple}",
		ctx
	});

	return block;
}

// (219:0) {#if $$slots.helper}
function create_if_block$1(ctx) {
	let helperline;
	let current;
	const helperline_spread_levels = [prefixFilter(/*$$restProps*/ ctx[42], "helperLine$")];

	let helperline_props = {
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < helperline_spread_levels.length; i += 1) {
		helperline_props = assign(helperline_props, helperline_spread_levels[i]);
	}

	helperline = new HelperLine({ props: helperline_props, $$inline: true });
	helperline.$on("SMUI:textfield:helper-text:id", /*SMUI_textfield_helper_text_id_handler*/ ctx[84]);
	helperline.$on("SMUI:textfield:helper-text:mount", /*SMUI_textfield_helper_text_mount_handler*/ ctx[85]);
	helperline.$on("SMUI:textfield:helper-text:unmount", /*SMUI_textfield_helper_text_unmount_handler*/ ctx[86]);
	helperline.$on("SMUI:textfield:character-counter:mount", /*SMUI_textfield_character_counter_mount_handler_1*/ ctx[87]);
	helperline.$on("SMUI:textfield:character-counter:unmount", /*SMUI_textfield_character_counter_unmount_handler_1*/ ctx[88]);

	const block = {
		c: function create() {
			create_component(helperline.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(helperline.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(helperline, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const helperline_changes = (dirty[1] & /*$$restProps*/ 2048)
			? get_spread_update(helperline_spread_levels, [get_spread_object(prefixFilter(/*$$restProps*/ ctx[42], "helperLine$"))])
			: {};

			if (dirty[2] & /*$$scope*/ 134217728) {
				helperline_changes.$$scope = { dirty, ctx };
			}

			helperline.$set(helperline_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helperline.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helperline.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(helperline, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(219:0) {#if $$slots.helper}",
		ctx
	});

	return block;
}

// (220:2) <HelperLine     on:SMUI:textfield:helper-text:id={(event) => (helperId = event.detail)}     on:SMUI:textfield:helper-text:mount={(event) => (helperText = event.detail)}     on:SMUI:textfield:helper-text:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     on:SMUI:textfield:character-counter:mount={(event) =>       (characterCounter = event.detail)}     on:SMUI:textfield:character-counter:unmount={() =>       (characterCounter = undefined)}     {...prefixFilter($$restProps, 'helperLine$')}     >
function create_default_slot$1(ctx) {
	let current;
	const helper_slot_template = /*#slots*/ ctx[50].helper;
	const helper_slot = create_slot(helper_slot_template, ctx, /*$$scope*/ ctx[89], get_helper_slot_context);

	const block = {
		c: function create() {
			if (helper_slot) helper_slot.c();
		},
		l: function claim(nodes) {
			if (helper_slot) helper_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (helper_slot) {
				helper_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (helper_slot) {
				if (helper_slot.p && (!current || dirty[2] & /*$$scope*/ 134217728)) {
					update_slot(helper_slot, helper_slot_template, ctx, /*$$scope*/ ctx[89], !current ? [-1, -1, -1, -1] : dirty, get_helper_slot_changes, get_helper_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helper_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helper_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (helper_slot) helper_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(220:2) <HelperLine     on:SMUI:textfield:helper-text:id={(event) => (helperId = event.detail)}     on:SMUI:textfield:helper-text:mount={(event) => (helperText = event.detail)}     on:SMUI:textfield:helper-text:unmount={() => {       helperId = undefined;       helperText = undefined;     }}     on:SMUI:textfield:character-counter:mount={(event) =>       (characterCounter = event.detail)}     on:SMUI:textfield:character-counter:unmount={() =>       (characterCounter = undefined)}     {...prefixFilter($$restProps, 'helperLine$')}     >",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let current_block_type_index;
	let if_block0;
	let t;
	let if_block1_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*valued*/ ctx[24]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*$$slots*/ ctx[41].helper && create_if_block$1(ctx);

	const block = {
		c: function create() {
			if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(t.parentNode, t);
			}

			if (/*$$slots*/ ctx[41].helper) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[1] & /*$$slots*/ 1024) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func = ([name, value]) => `${name}: ${value};`;
const func_1 = ([name, value]) => `${name}: ${value};`;

function instance_1$1($$self, $$props, $$invalidate) {
	let valued;
	let inputElement;

	const omit_props_names = [
		"use","class","style","ripple","disabled","required","textarea","variant","noLabel","label","type","value","files","dirty","invalid","prefix","suffix","updateInvalid","validateOnValueChange","useNativeValidation","withLeadingIcon","withTrailingIcon","input","floatingLabel","lineRipple","notchedOutline","focus","layout","getElement"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;

	validate_slots("Textfield", slots, [
		'label','leadingIcon','default','internalCounter','prefix','suffix','trailingIcon','ripple','helper'
	]);

	const $$slots = compute_slots(slots);
	const { applyPassive } = events;
	const forwardEvents = forwardEventsBuilder(get_current_component());

	let uninitializedValue = () => {
		
	};

	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { style = "" } = $$props;
	let { ripple = true } = $$props;
	let { disabled = false } = $$props;
	let { required = false } = $$props;
	let { textarea = false } = $$props;
	let { variant = textarea ? "outlined" : "standard" } = $$props;
	let { noLabel = false } = $$props;
	let { label = null } = $$props;
	let { type = "text" } = $$props;
	let { value = uninitializedValue } = $$props;
	let { files = uninitializedValue } = $$props;
	let { dirty = false } = $$props;
	let { invalid = uninitializedValue } = $$props;
	let { prefix = null } = $$props;
	let { suffix = null } = $$props;
	let { updateInvalid = invalid === uninitializedValue } = $$props;
	let { validateOnValueChange = updateInvalid } = $$props;
	let { useNativeValidation = updateInvalid } = $$props;
	let { withLeadingIcon = uninitializedValue } = $$props;
	let { withTrailingIcon = uninitializedValue } = $$props;
	let { input = undefined } = $$props;
	let { floatingLabel = undefined } = $$props;
	let { lineRipple = undefined } = $$props;
	let { notchedOutline = undefined } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalStyles = {};
	let helperId;
	let focused = false;
	let addLayoutListener = getContext("SMUI:addLayoutListener");
	let removeLayoutListener;
	let initPromiseResolve;
	let initPromise = new Promise(resolve => initPromiseResolve = resolve);

	// These are instances, not accessors.
	let leadingIcon;

	let trailingIcon;
	let helperText;
	let characterCounter;

	// React to changes of value from outside component.
	let previousValue = value;

	if (addLayoutListener) {
		removeLayoutListener = addLayoutListener(layout);
	}

	onMount(() => {
		$$invalidate(48, instance = new MDCTextFieldFoundation({
				// getRootAdapterMethods_
				addClass,
				removeClass,
				hasClass,
				registerTextFieldInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
				deregisterTextFieldInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler),
				registerValidationAttributeChangeHandler: handler => {
					const getAttributesList = mutationsList => {
						return mutationsList.map(mutation => mutation.attributeName).filter(attributeName => attributeName);
					};

					const observer = new MutationObserver(mutationsList => {
							if (useNativeValidation) {
								handler(getAttributesList(mutationsList));
							}
						});

					const config = { attributes: true };
					observer.observe(input.getElement(), config);
					return observer;
				},
				deregisterValidationAttributeChangeHandler: observer => {
					observer.disconnect();
				},
				// getInputAdapterMethods_
				getNativeInput: () => input.getElement(),
				setInputAttr: (name, value) => {
					input.addAttr(name, value);
				},
				removeInputAttr: name => {
					input.removeAttr(name);
				},
				isFocused: () => document.activeElement === input.getElement(),
				registerInputInteractionHandler: (evtType, handler) => {
					input.getElement().addEventListener(evtType, handler, applyPassive());
				},
				deregisterInputInteractionHandler: (evtType, handler) => {
					input.getElement().removeEventListener(evtType, handler, applyPassive());
				},
				// getLabelAdapterMethods_
				floatLabel: shouldFloat => floatingLabel && floatingLabel.float(shouldFloat),
				getLabelWidth: () => floatingLabel ? floatingLabel.getWidth() : 0,
				hasLabel: () => !!floatingLabel,
				shakeLabel: shouldShake => floatingLabel && floatingLabel.shake(shouldShake),
				setLabelRequired: isRequired => floatingLabel && floatingLabel.setRequired(isRequired),
				// getLineRippleAdapterMethods_
				activateLineRipple: () => lineRipple && lineRipple.activate(),
				deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
				setLineRippleTransformOrigin: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
				// getOutlineAdapterMethods_
				closeOutline: () => notchedOutline && notchedOutline.closeNotch(),
				hasOutline: () => !!notchedOutline,
				notchOutline: labelWidth => notchedOutline && notchedOutline.notch(labelWidth)
			},
		{
				get helperText() {
					return helperText;
				},
				get characterCounter() {
					return characterCounter;
				},
				get leadingIcon() {
					return leadingIcon;
				},
				get trailingIcon() {
					return trailingIcon;
				}
			}));

		if (valued) {
			instance.init();
		} else {
			tick().then(() => {
				instance.init();
			});
		}

		initPromiseResolve();

		return () => {
			instance.destroy();
		};
	});

	onDestroy(() => {
		if (removeLayoutListener) {
			removeLayoutListener();
		}
	});

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(26, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(26, internalClasses[className] = false, internalClasses);
		}
	}

	function addStyle(name, value) {
		if (internalStyles[name] != value) {
			if (value === "" || value == null) {
				delete internalStyles[name];
				$$invalidate(27, internalStyles);
			} else {
				$$invalidate(27, internalStyles[name] = value, internalStyles);
			}
		}
	}

	function focus() {
		input.focus();
	}

	function layout() {
		if (instance) {
			const openNotch = instance.shouldFloat;
			instance.notchOutline(openNotch);
		}
	}

	function getElement() {
		return element;
	}

	function floatinglabel_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			floatingLabel = $$value;
			$$invalidate(5, floatingLabel);
		});
	}

	function floatinglabel_binding_1($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			floatingLabel = $$value;
			$$invalidate(5, floatingLabel);
		});
	}

	function notchedoutline_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			notchedOutline = $$value;
			$$invalidate(7, notchedOutline);
		});
	}

	function textarea_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(3, input);
		});
	}

	function textarea_1_value_binding(value$1) {
		value = value$1;
		$$invalidate(0, value);
	}

	function textarea_1_dirty_binding(value) {
		dirty = value;
		$$invalidate(4, dirty);
	}

	function textarea_1_invalid_binding(value) {
		invalid = value;
		(($$invalidate(2, invalid), $$invalidate(48, instance)), $$invalidate(21, updateInvalid));
	}

	const blur_handler_2 = () => $$invalidate(29, focused = false);
	const focus_handler_2 = () => $$invalidate(29, focused = true);

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focus_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(3, input);
		});
	}

	function input_1_value_binding(value$1) {
		value = value$1;
		$$invalidate(0, value);
	}

	function input_1_files_binding(value) {
		files = value;
		$$invalidate(1, files);
	}

	function input_1_dirty_binding(value) {
		dirty = value;
		$$invalidate(4, dirty);
	}

	function input_1_invalid_binding(value) {
		invalid = value;
		(($$invalidate(2, invalid), $$invalidate(48, instance)), $$invalidate(21, updateInvalid));
	}

	const blur_handler_3 = () => $$invalidate(29, focused = false);
	const focus_handler_3 = () => $$invalidate(29, focused = true);

	function blur_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function focus_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function lineripple_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			lineRipple = $$value;
			$$invalidate(6, lineRipple);
		});
	}

	function label_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(25, element);
		});
	}

	const SMUI_textfield_leading_icon_mount_handler = event => $$invalidate(30, leadingIcon = event.detail);
	const SMUI_textfield_leading_icon_unmount_handler = () => $$invalidate(30, leadingIcon = undefined);
	const SMUI_textfield_trailing_icon_mount_handler = event => $$invalidate(31, trailingIcon = event.detail);
	const SMUI_textfield_trailing_icon_unmount_handler = () => $$invalidate(31, trailingIcon = undefined);
	const SMUI_textfield_character_counter_mount_handler = event => $$invalidate(33, characterCounter = event.detail);
	const SMUI_textfield_character_counter_unmount_handler = () => $$invalidate(33, characterCounter = undefined);

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(25, element);
		});
	}

	const SMUI_textfield_leading_icon_mount_handler_1 = event => $$invalidate(30, leadingIcon = event.detail);
	const SMUI_textfield_leading_icon_unmount_handler_1 = () => $$invalidate(30, leadingIcon = undefined);
	const SMUI_textfield_trailing_icon_mount_handler_1 = event => $$invalidate(31, trailingIcon = event.detail);
	const SMUI_textfield_trailing_icon_unmount_handler_1 = () => $$invalidate(31, trailingIcon = undefined);
	const SMUI_textfield_helper_text_id_handler = event => $$invalidate(28, helperId = event.detail);
	const SMUI_textfield_helper_text_mount_handler = event => $$invalidate(32, helperText = event.detail);

	const SMUI_textfield_helper_text_unmount_handler = () => {
		$$invalidate(28, helperId = undefined);
		$$invalidate(32, helperText = undefined);
	};

	const SMUI_textfield_character_counter_mount_handler_1 = event => $$invalidate(33, characterCounter = event.detail);
	const SMUI_textfield_character_counter_unmount_handler_1 = () => $$invalidate(33, characterCounter = undefined);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(42, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(8, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(9, className = $$new_props.class);
		if ("style" in $$new_props) $$invalidate(10, style = $$new_props.style);
		if ("ripple" in $$new_props) $$invalidate(11, ripple = $$new_props.ripple);
		if ("disabled" in $$new_props) $$invalidate(12, disabled = $$new_props.disabled);
		if ("required" in $$new_props) $$invalidate(13, required = $$new_props.required);
		if ("textarea" in $$new_props) $$invalidate(14, textarea = $$new_props.textarea);
		if ("variant" in $$new_props) $$invalidate(15, variant = $$new_props.variant);
		if ("noLabel" in $$new_props) $$invalidate(16, noLabel = $$new_props.noLabel);
		if ("label" in $$new_props) $$invalidate(17, label = $$new_props.label);
		if ("type" in $$new_props) $$invalidate(18, type = $$new_props.type);
		if ("value" in $$new_props) $$invalidate(0, value = $$new_props.value);
		if ("files" in $$new_props) $$invalidate(1, files = $$new_props.files);
		if ("dirty" in $$new_props) $$invalidate(4, dirty = $$new_props.dirty);
		if ("invalid" in $$new_props) $$invalidate(2, invalid = $$new_props.invalid);
		if ("prefix" in $$new_props) $$invalidate(19, prefix = $$new_props.prefix);
		if ("suffix" in $$new_props) $$invalidate(20, suffix = $$new_props.suffix);
		if ("updateInvalid" in $$new_props) $$invalidate(21, updateInvalid = $$new_props.updateInvalid);
		if ("validateOnValueChange" in $$new_props) $$invalidate(43, validateOnValueChange = $$new_props.validateOnValueChange);
		if ("useNativeValidation" in $$new_props) $$invalidate(44, useNativeValidation = $$new_props.useNativeValidation);
		if ("withLeadingIcon" in $$new_props) $$invalidate(22, withLeadingIcon = $$new_props.withLeadingIcon);
		if ("withTrailingIcon" in $$new_props) $$invalidate(23, withTrailingIcon = $$new_props.withTrailingIcon);
		if ("input" in $$new_props) $$invalidate(3, input = $$new_props.input);
		if ("floatingLabel" in $$new_props) $$invalidate(5, floatingLabel = $$new_props.floatingLabel);
		if ("lineRipple" in $$new_props) $$invalidate(6, lineRipple = $$new_props.lineRipple);
		if ("notchedOutline" in $$new_props) $$invalidate(7, notchedOutline = $$new_props.notchedOutline);
		if ("$$scope" in $$new_props) $$invalidate(89, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		MDCTextFieldFoundation,
		events,
		onMount,
		onDestroy,
		getContext,
		tick,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		exclude,
		prefixFilter,
		useActions,
		ContextFragment,
		Ripple,
		FloatingLabel,
		LineRipple,
		NotchedOutline,
		HelperLine,
		Prefix,
		Suffix,
		Input,
		Textarea,
		applyPassive,
		forwardEvents,
		uninitializedValue,
		use,
		className,
		style,
		ripple,
		disabled,
		required,
		textarea,
		variant,
		noLabel,
		label,
		type,
		value,
		files,
		dirty,
		invalid,
		prefix,
		suffix,
		updateInvalid,
		validateOnValueChange,
		useNativeValidation,
		withLeadingIcon,
		withTrailingIcon,
		input,
		floatingLabel,
		lineRipple,
		notchedOutline,
		element,
		instance,
		internalClasses,
		internalStyles,
		helperId,
		focused,
		addLayoutListener,
		removeLayoutListener,
		initPromiseResolve,
		initPromise,
		leadingIcon,
		trailingIcon,
		helperText,
		characterCounter,
		previousValue,
		hasClass,
		addClass,
		removeClass,
		addStyle,
		focus,
		layout,
		getElement,
		valued,
		inputElement
	});

	$$self.$inject_state = $$new_props => {
		if ("uninitializedValue" in $$props) $$invalidate(36, uninitializedValue = $$new_props.uninitializedValue);
		if ("use" in $$props) $$invalidate(8, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(9, className = $$new_props.className);
		if ("style" in $$props) $$invalidate(10, style = $$new_props.style);
		if ("ripple" in $$props) $$invalidate(11, ripple = $$new_props.ripple);
		if ("disabled" in $$props) $$invalidate(12, disabled = $$new_props.disabled);
		if ("required" in $$props) $$invalidate(13, required = $$new_props.required);
		if ("textarea" in $$props) $$invalidate(14, textarea = $$new_props.textarea);
		if ("variant" in $$props) $$invalidate(15, variant = $$new_props.variant);
		if ("noLabel" in $$props) $$invalidate(16, noLabel = $$new_props.noLabel);
		if ("label" in $$props) $$invalidate(17, label = $$new_props.label);
		if ("type" in $$props) $$invalidate(18, type = $$new_props.type);
		if ("value" in $$props) $$invalidate(0, value = $$new_props.value);
		if ("files" in $$props) $$invalidate(1, files = $$new_props.files);
		if ("dirty" in $$props) $$invalidate(4, dirty = $$new_props.dirty);
		if ("invalid" in $$props) $$invalidate(2, invalid = $$new_props.invalid);
		if ("prefix" in $$props) $$invalidate(19, prefix = $$new_props.prefix);
		if ("suffix" in $$props) $$invalidate(20, suffix = $$new_props.suffix);
		if ("updateInvalid" in $$props) $$invalidate(21, updateInvalid = $$new_props.updateInvalid);
		if ("validateOnValueChange" in $$props) $$invalidate(43, validateOnValueChange = $$new_props.validateOnValueChange);
		if ("useNativeValidation" in $$props) $$invalidate(44, useNativeValidation = $$new_props.useNativeValidation);
		if ("withLeadingIcon" in $$props) $$invalidate(22, withLeadingIcon = $$new_props.withLeadingIcon);
		if ("withTrailingIcon" in $$props) $$invalidate(23, withTrailingIcon = $$new_props.withTrailingIcon);
		if ("input" in $$props) $$invalidate(3, input = $$new_props.input);
		if ("floatingLabel" in $$props) $$invalidate(5, floatingLabel = $$new_props.floatingLabel);
		if ("lineRipple" in $$props) $$invalidate(6, lineRipple = $$new_props.lineRipple);
		if ("notchedOutline" in $$props) $$invalidate(7, notchedOutline = $$new_props.notchedOutline);
		if ("element" in $$props) $$invalidate(25, element = $$new_props.element);
		if ("instance" in $$props) $$invalidate(48, instance = $$new_props.instance);
		if ("internalClasses" in $$props) $$invalidate(26, internalClasses = $$new_props.internalClasses);
		if ("internalStyles" in $$props) $$invalidate(27, internalStyles = $$new_props.internalStyles);
		if ("helperId" in $$props) $$invalidate(28, helperId = $$new_props.helperId);
		if ("focused" in $$props) $$invalidate(29, focused = $$new_props.focused);
		if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
		if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
		if ("initPromiseResolve" in $$props) initPromiseResolve = $$new_props.initPromiseResolve;
		if ("initPromise" in $$props) $$invalidate(37, initPromise = $$new_props.initPromise);
		if ("leadingIcon" in $$props) $$invalidate(30, leadingIcon = $$new_props.leadingIcon);
		if ("trailingIcon" in $$props) $$invalidate(31, trailingIcon = $$new_props.trailingIcon);
		if ("helperText" in $$props) $$invalidate(32, helperText = $$new_props.helperText);
		if ("characterCounter" in $$props) $$invalidate(33, characterCounter = $$new_props.characterCounter);
		if ("previousValue" in $$props) $$invalidate(49, previousValue = $$new_props.previousValue);
		if ("valued" in $$props) $$invalidate(24, valued = $$new_props.valued);
		if ("inputElement" in $$props) $$invalidate(34, inputElement = $$new_props.inputElement);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*value, files*/ 3) {
			$$invalidate(24, valued = value !== uninitializedValue || files !== uninitializedValue);
		}

		if ($$self.$$.dirty[0] & /*input*/ 8) {
			$$invalidate(34, inputElement = input && input.getElement());
		}

		if ($$self.$$.dirty[0] & /*invalid, updateInvalid*/ 2097156 | $$self.$$.dirty[1] & /*instance*/ 131072) {
			if (instance && instance.isValid() !== !invalid) {
				if (updateInvalid) {
					$$invalidate(2, invalid = !instance.isValid());
				} else {
					instance.setValid(!invalid);
				}
			}
		}

		if ($$self.$$.dirty[1] & /*instance, validateOnValueChange*/ 135168) {
			if (instance && instance.getValidateOnValueChange() !== validateOnValueChange) {
				instance.setValidateOnValueChange(validateOnValueChange === uninitializedValue
				? false
				: validateOnValueChange);
			}
		}

		if ($$self.$$.dirty[1] & /*instance, useNativeValidation*/ 139264) {
			if (instance) {
				instance.setUseNativeValidation(useNativeValidation);
			}
		}

		if ($$self.$$.dirty[0] & /*disabled*/ 4096 | $$self.$$.dirty[1] & /*instance*/ 131072) {
			if (instance) {
				instance.setDisabled(disabled);
			}
		}

		if ($$self.$$.dirty[0] & /*valued, value*/ 16777217 | $$self.$$.dirty[1] & /*instance, previousValue*/ 393216) {
			if (instance && valued && previousValue !== value) {
				$$invalidate(49, previousValue = value);

				// Check the data is flowing down.
				if (instance.getValue() !== value) {
					instance.setValue(value);
				}
			}
		}
	};

	return [
		value,
		files,
		invalid,
		input,
		dirty,
		floatingLabel,
		lineRipple,
		notchedOutline,
		use,
		className,
		style,
		ripple,
		disabled,
		required,
		textarea,
		variant,
		noLabel,
		label,
		type,
		prefix,
		suffix,
		updateInvalid,
		withLeadingIcon,
		withTrailingIcon,
		valued,
		element,
		internalClasses,
		internalStyles,
		helperId,
		focused,
		leadingIcon,
		trailingIcon,
		helperText,
		characterCounter,
		inputElement,
		forwardEvents,
		uninitializedValue,
		initPromise,
		addClass,
		removeClass,
		addStyle,
		$$slots,
		$$restProps,
		validateOnValueChange,
		useNativeValidation,
		focus,
		layout,
		getElement,
		instance,
		previousValue,
		slots,
		floatinglabel_binding,
		floatinglabel_binding_1,
		notchedoutline_binding,
		textarea_1_binding,
		textarea_1_value_binding,
		textarea_1_dirty_binding,
		textarea_1_invalid_binding,
		blur_handler_2,
		focus_handler_2,
		blur_handler,
		focus_handler,
		input_1_binding,
		input_1_value_binding,
		input_1_files_binding,
		input_1_dirty_binding,
		input_1_invalid_binding,
		blur_handler_3,
		focus_handler_3,
		blur_handler_1,
		focus_handler_1,
		lineripple_binding,
		label_1_binding,
		SMUI_textfield_leading_icon_mount_handler,
		SMUI_textfield_leading_icon_unmount_handler,
		SMUI_textfield_trailing_icon_mount_handler,
		SMUI_textfield_trailing_icon_unmount_handler,
		SMUI_textfield_character_counter_mount_handler,
		SMUI_textfield_character_counter_unmount_handler,
		div_binding,
		SMUI_textfield_leading_icon_mount_handler_1,
		SMUI_textfield_leading_icon_unmount_handler_1,
		SMUI_textfield_trailing_icon_mount_handler_1,
		SMUI_textfield_trailing_icon_unmount_handler_1,
		SMUI_textfield_helper_text_id_handler,
		SMUI_textfield_helper_text_mount_handler,
		SMUI_textfield_helper_text_unmount_handler,
		SMUI_textfield_character_counter_mount_handler_1,
		SMUI_textfield_character_counter_unmount_handler_1,
		$$scope
	];
}

class Textfield extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance_1$1,
			create_fragment$2,
			safe_not_equal,
			{
				use: 8,
				class: 9,
				style: 10,
				ripple: 11,
				disabled: 12,
				required: 13,
				textarea: 14,
				variant: 15,
				noLabel: 16,
				label: 17,
				type: 18,
				value: 0,
				files: 1,
				dirty: 4,
				invalid: 2,
				prefix: 19,
				suffix: 20,
				updateInvalid: 21,
				validateOnValueChange: 43,
				useNativeValidation: 44,
				withLeadingIcon: 22,
				withTrailingIcon: 23,
				input: 3,
				floatingLabel: 5,
				lineRipple: 6,
				notchedOutline: 7,
				focus: 45,
				layout: 46,
				getElement: 47
			},
			[-1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Textfield",
			options,
			id: create_fragment$2.name
		});
	}

	get use() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ripple() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ripple(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get required() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set required(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get textarea() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set textarea(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get variant() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set variant(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get noLabel() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set noLabel(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get files() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set files(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dirty() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dirty(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get invalid() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set invalid(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get prefix() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set prefix(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get suffix() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set suffix(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get updateInvalid() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set updateInvalid(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get validateOnValueChange() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set validateOnValueChange(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get useNativeValidation() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set useNativeValidation(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get withLeadingIcon() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set withLeadingIcon(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get withTrailingIcon() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set withTrailingIcon(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get input() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set input(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get floatingLabel() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set floatingLabel(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get lineRipple() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set lineRipple(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notchedOutline() {
		throw new Error("<Textfield>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notchedOutline(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focus() {
		return this.$$.ctx[45];
	}

	set focus(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get layout() {
		return this.$$.ctx[46];
	}

	set layout(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[47];
	}

	set getElement(value) {
		throw new Error("<Textfield>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules\@smui\textfield\helper-text\HelperText.svelte generated by Svelte v3.38.3 */

const file$1 = "node_modules\\@smui\\textfield\\helper-text\\HelperText.svelte";

// (17:31) {:else}
function create_else_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text(/*content*/ ctx[8]);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, /*content*/ ctx[8]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*content*/ 256) set_data_dev(t, /*content*/ ctx[8]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(17:31) {:else}",
		ctx
	});

	return block;
}

// (17:2) {#if content == null}
function create_if_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[13].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], !current ? -1 : dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(17:2) {#if content == null}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let div_class_value;
	let div_aria_hidden_value;
	let useActions_action;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*content*/ ctx[8] == null) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	let div_levels = [
		{
			class: div_class_value = classMap({
				[/*className*/ ctx[1]]: true,
				"mdc-text-field-helper-text": true,
				"mdc-text-field-helper-text--persistent": /*persistent*/ ctx[3],
				"mdc-text-field-helper-text--validation-msg": /*validationMsg*/ ctx[4],
				.../*internalClasses*/ ctx[6]
			})
		},
		{
			"aria-hidden": div_aria_hidden_value = /*persistent*/ ctx[3] ? null : "true"
		},
		{ id: /*id*/ ctx[2] },
		/*internalAttrs*/ ctx[7],
		/*$$restProps*/ ctx[10]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {
				class: true,
				"aria-hidden": true,
				id: true
			});

			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(div, div_data);
			add_location(div, file$1, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			/*div_binding*/ ctx[14](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[0])),
					action_destroyer(/*forwardEvents*/ ctx[9].call(null, div))
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className, persistent, validationMsg, internalClasses*/ 90 && div_class_value !== (div_class_value = classMap({
					[/*className*/ ctx[1]]: true,
					"mdc-text-field-helper-text": true,
					"mdc-text-field-helper-text--persistent": /*persistent*/ ctx[3],
					"mdc-text-field-helper-text--validation-msg": /*validationMsg*/ ctx[4],
					.../*internalClasses*/ ctx[6]
				}))) && { class: div_class_value },
				(!current || dirty & /*persistent*/ 8 && div_aria_hidden_value !== (div_aria_hidden_value = /*persistent*/ ctx[3] ? null : "true")) && { "aria-hidden": div_aria_hidden_value },
				(!current || dirty & /*id*/ 4) && { id: /*id*/ ctx[2] },
				dirty & /*internalAttrs*/ 128 && /*internalAttrs*/ ctx[7],
				dirty & /*$$restProps*/ 1024 && /*$$restProps*/ ctx[10]
			]));

			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_blocks[current_block_type_index].d();
			/*div_binding*/ ctx[14](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

let counter = 0;

function instance_1($$self, $$props, $$invalidate) {
	const omit_props_names = ["use","class","id","persistent","validationMsg","getElement"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("HelperText", slots, ['default']);
	const forwardEvents = forwardEventsBuilder(get_current_component());
	let { use = [] } = $$props;
	let { class: className = "" } = $$props;
	let { id = "SMUI-textfield-helper-text-" + counter++ } = $$props;
	let { persistent = false } = $$props;
	let { validationMsg = false } = $$props;
	let element;
	let instance;
	let internalClasses = {};
	let internalAttrs = {};
	let content = null;

	onMount(() => {
		instance = new MDCTextFieldHelperTextFoundation({
				addClass,
				removeClass,
				hasClass,
				getAttr,
				setAttr: addAttr,
				removeAttr,
				setContent: value => {
					$$invalidate(8, content = value);
				}
			});

		if (id.startsWith("SMUI-textfield-helper-text-")) {
			dispatch(getElement(), "SMUI:textfield:helper-text:id", id);
		}

		dispatch(getElement(), "SMUI:textfield:helper-text:mount", instance);
		instance.init();

		return () => {
			dispatch(getElement(), "SMUI:textfield:helper-text:unmount", instance);
			instance.destroy();
		};
	});

	function hasClass(className) {
		return className in internalClasses
		? internalClasses[className]
		: getElement().classList.contains(className);
	}

	function addClass(className) {
		if (!internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = true, internalClasses);
		}
	}

	function removeClass(className) {
		if (!(className in internalClasses) || internalClasses[className]) {
			$$invalidate(6, internalClasses[className] = false, internalClasses);
		}
	}

	function getAttr(name) {
		return name in internalAttrs
		? internalAttrs[name]
		: getElement().getAttribute(name);
	}

	function addAttr(name, value) {
		if (internalAttrs[name] !== value) {
			$$invalidate(7, internalAttrs[name] = value, internalAttrs);
		}
	}

	function removeAttr(name) {
		if (!(name in internalAttrs) || internalAttrs[name] != null) {
			$$invalidate(7, internalAttrs[name] = undefined, internalAttrs);
		}
	}

	function getElement() {
		return element;
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			element = $$value;
			$$invalidate(5, element);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ("id" in $$new_props) $$invalidate(2, id = $$new_props.id);
		if ("persistent" in $$new_props) $$invalidate(3, persistent = $$new_props.persistent);
		if ("validationMsg" in $$new_props) $$invalidate(4, validationMsg = $$new_props.validationMsg);
		if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		counter,
		MDCTextFieldHelperTextFoundation,
		onMount,
		get_current_component,
		forwardEventsBuilder,
		classMap,
		useActions,
		dispatch,
		forwardEvents,
		use,
		className,
		id,
		persistent,
		validationMsg,
		element,
		instance,
		internalClasses,
		internalAttrs,
		content,
		hasClass,
		addClass,
		removeClass,
		getAttr,
		addAttr,
		removeAttr,
		getElement
	});

	$$self.$inject_state = $$new_props => {
		if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
		if ("id" in $$props) $$invalidate(2, id = $$new_props.id);
		if ("persistent" in $$props) $$invalidate(3, persistent = $$new_props.persistent);
		if ("validationMsg" in $$props) $$invalidate(4, validationMsg = $$new_props.validationMsg);
		if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
		if ("instance" in $$props) instance = $$new_props.instance;
		if ("internalClasses" in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
		if ("internalAttrs" in $$props) $$invalidate(7, internalAttrs = $$new_props.internalAttrs);
		if ("content" in $$props) $$invalidate(8, content = $$new_props.content);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		use,
		className,
		id,
		persistent,
		validationMsg,
		element,
		internalClasses,
		internalAttrs,
		content,
		forwardEvents,
		$$restProps,
		getElement,
		$$scope,
		slots,
		div_binding
	];
}

class HelperText extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance_1, create_fragment$1, safe_not_equal, {
			use: 0,
			class: 1,
			id: 2,
			persistent: 3,
			validationMsg: 4,
			getElement: 11
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HelperText",
			options,
			id: create_fragment$1.name
		});
	}

	get use() {
		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set use(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get persistent() {
		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set persistent(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get validationMsg() {
		throw new Error("<HelperText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set validationMsg(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getElement() {
		return this.$$.ctx[11];
	}

	set getElement(value) {
		throw new Error("<HelperText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function isEmpty(val) {
    return val.trim().length === 0;
}

function isValidEmail(val) {
    return new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    ).test(val);
}

/* src\components\User\UserForm.svelte generated by Svelte v3.38.3 */
const file = "src\\components\\User\\UserForm.svelte";

// (75:16) <HelperText validationMsg slot="helper">
function create_default_slot_7(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Name is Required");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Name is Required");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7.name,
		type: "slot",
		source: "(75:16) <HelperText validationMsg slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (75:16) 
function create_helper_slot_3(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
				validationMsg: true,
				slot: "helper",
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(helpertext.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(helpertext.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(helpertext, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const helpertext_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				helpertext_changes.$$scope = { dirty, ctx };
			}

			helpertext.$set(helpertext_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helpertext.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helpertext.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(helpertext, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_helper_slot_3.name,
		type: "slot",
		source: "(75:16) ",
		ctx
	});

	return block;
}

// (85:16) <HelperText validationMsg slot="helper">
function create_default_slot_6(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Username is Required");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Username is Required");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(85:16) <HelperText validationMsg slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (85:16) 
function create_helper_slot_2(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
				validationMsg: true,
				slot: "helper",
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(helpertext.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(helpertext.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(helpertext, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const helpertext_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				helpertext_changes.$$scope = { dirty, ctx };
			}

			helpertext.$set(helpertext_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helpertext.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helpertext.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(helpertext, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_helper_slot_2.name,
		type: "slot",
		source: "(85:16) ",
		ctx
	});

	return block;
}

// (96:16) <HelperText validationMsg slot="helper">
function create_default_slot_5(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("That's not a valid email address");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "That's not a valid email address");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(96:16) <HelperText validationMsg slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (96:16) 
function create_helper_slot_1(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
				validationMsg: true,
				slot: "helper",
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(helpertext.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(helpertext.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(helpertext, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const helpertext_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				helpertext_changes.$$scope = { dirty, ctx };
			}

			helpertext.$set(helpertext_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helpertext.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helpertext.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(helpertext, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_helper_slot_1.name,
		type: "slot",
		source: "(96:16) ",
		ctx
	});

	return block;
}

// (106:16) <HelperText validationMsg slot="helper">
function create_default_slot_4(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Website is Required");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Website is Required");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(106:16) <HelperText validationMsg slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (106:16) 
function create_helper_slot(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
				validationMsg: true,
				slot: "helper",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(helpertext.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(helpertext.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(helpertext, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const helpertext_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				helpertext_changes.$$scope = { dirty, ctx };
			}

			helpertext.$set(helpertext_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(helpertext.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(helpertext.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(helpertext, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_helper_slot.name,
		type: "slot",
		source: "(106:16) ",
		ctx
	});

	return block;
}

// (119:8) <Label>
function create_default_slot_3(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Save");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Save");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(119:8) <Label>",
		ctx
	});

	return block;
}

// (115:4) <Button variant="raised"          class="w-50 m-5px"          disabled="{!formIsValid}"          on:click={onSubmit}>
function create_default_slot_2(ctx) {
	let label;
	let current;

	label = new CommonLabel({
			props: {
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(label.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const label_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				label_changes.$$scope = { dirty, ctx };
			}

			label.$set(label_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(label, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(115:4) <Button variant=\\\"raised\\\"          class=\\\"w-50 m-5px\\\"          disabled=\\\"{!formIsValid}\\\"          on:click={onSubmit}>",
		ctx
	});

	return block;
}

// (125:8) <Label>
function create_default_slot_1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Cancel");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Cancel");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(125:8) <Label>",
		ctx
	});

	return block;
}

// (122:4) <Button variant="outlined"          class="w-50 m-5px"          href="/user">
function create_default_slot(ctx) {
	let label;
	let current;

	label = new CommonLabel({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(label.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(label.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(label, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const label_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				label_changes.$$scope = { dirty, ctx };
			}

			label.$set(label_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(label, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(122:4) <Button variant=\\\"outlined\\\"          class=\\\"w-50 m-5px\\\"          href=\\\"/user\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div1;
	let form;
	let div0;
	let textfield0;
	let updating_value;
	let t0;
	let textfield1;
	let updating_value_1;
	let t1;
	let textfield2;
	let updating_value_2;
	let t2;
	let textfield3;
	let updating_value_3;
	let t3;
	let div2;
	let button0;
	let t4;
	let button1;
	let current;
	let mounted;
	let dispose;

	function textfield0_value_binding(value) {
		/*textfield0_value_binding*/ ctx[11](value);
	}

	let textfield0_props = {
		variant: "outlined",
		label: "Name",
		class: "w-100",
		required: true,
		$$slots: { helper: [create_helper_slot_3] },
		$$scope: { ctx }
	};

	if (/*name*/ ctx[0] !== void 0) {
		textfield0_props.value = /*name*/ ctx[0];
	}

	textfield0 = new Textfield({ props: textfield0_props, $$inline: true });
	binding_callbacks.push(() => bind(textfield0, "value", textfield0_value_binding));

	function textfield1_value_binding(value) {
		/*textfield1_value_binding*/ ctx[12](value);
	}

	let textfield1_props = {
		variant: "outlined",
		label: "Username",
		class: "w-100",
		required: true,
		$$slots: { helper: [create_helper_slot_2] },
		$$scope: { ctx }
	};

	if (/*username*/ ctx[1] !== void 0) {
		textfield1_props.value = /*username*/ ctx[1];
	}

	textfield1 = new Textfield({ props: textfield1_props, $$inline: true });
	binding_callbacks.push(() => bind(textfield1, "value", textfield1_value_binding));

	function textfield2_value_binding(value) {
		/*textfield2_value_binding*/ ctx[13](value);
	}

	let textfield2_props = {
		variant: "outlined",
		type: "email",
		label: "E-Mail",
		class: "w-100",
		required: true,
		$$slots: { helper: [create_helper_slot_1] },
		$$scope: { ctx }
	};

	if (/*email*/ ctx[2] !== void 0) {
		textfield2_props.value = /*email*/ ctx[2];
	}

	textfield2 = new Textfield({ props: textfield2_props, $$inline: true });
	binding_callbacks.push(() => bind(textfield2, "value", textfield2_value_binding));

	function textfield3_value_binding(value) {
		/*textfield3_value_binding*/ ctx[14](value);
	}

	let textfield3_props = {
		variant: "outlined",
		label: "Website",
		class: "w-100",
		required: true,
		$$slots: { helper: [create_helper_slot] },
		$$scope: { ctx }
	};

	if (/*website*/ ctx[3] !== void 0) {
		textfield3_props.value = /*website*/ ctx[3];
	}

	textfield3 = new Textfield({ props: textfield3_props, $$inline: true });
	binding_callbacks.push(() => bind(textfield3, "value", textfield3_value_binding));

	button0 = new Button_1({
			props: {
				variant: "raised",
				class: "w-50 m-5px",
				disabled: !/*formIsValid*/ ctx[4],
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button0.$on("click", /*onSubmit*/ ctx[5]);

	button1 = new Button_1({
			props: {
				variant: "outlined",
				class: "w-50 m-5px",
				href: "/user",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div1 = element("div");
			form = element("form");
			div0 = element("div");
			create_component(textfield0.$$.fragment);
			t0 = space();
			create_component(textfield1.$$.fragment);
			t1 = space();
			create_component(textfield2.$$.fragment);
			t2 = space();
			create_component(textfield3.$$.fragment);
			t3 = space();
			div2 = element("div");
			create_component(button0.$$.fragment);
			t4 = space();
			create_component(button1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			form = claim_element(div1_nodes, "FORM", { autocomplete: true });
			var form_nodes = children(form);
			div0 = claim_element(form_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(textfield0.$$.fragment, div0_nodes);
			t0 = claim_space(div0_nodes);
			claim_component(textfield1.$$.fragment, div0_nodes);
			t1 = claim_space(div0_nodes);
			claim_component(textfield2.$$.fragment, div0_nodes);
			t2 = claim_space(div0_nodes);
			claim_component(textfield3.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			form_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(button0.$$.fragment, div2_nodes);
			t4 = claim_space(div2_nodes);
			claim_component(button1.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "columns margins");
			add_location(div0, file, 68, 8, 1848);
			attr_dev(form, "autocomplete", "off");
			add_location(form, file, 66, 4, 1766);
			attr_dev(div1, "class", "w-50 m-auto");
			add_location(div1, file, 65, 0, 1735);
			attr_dev(div2, "class", "w-50 m-auto d-flex");
			add_location(div2, file, 113, 0, 3306);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, form);
			append_dev(form, div0);
			mount_component(textfield0, div0, null);
			append_dev(div0, t0);
			mount_component(textfield1, div0, null);
			append_dev(div0, t1);
			mount_component(textfield2, div0, null);
			append_dev(div0, t2);
			mount_component(textfield3, div0, null);
			insert_dev(target, t3, anchor);
			insert_dev(target, div2, anchor);
			mount_component(button0, div2, null);
			append_dev(div2, t4);
			mount_component(button1, div2, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[5]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const textfield0_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				textfield0_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value && dirty & /*name*/ 1) {
				updating_value = true;
				textfield0_changes.value = /*name*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			textfield0.$set(textfield0_changes);
			const textfield1_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				textfield1_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_1 && dirty & /*username*/ 2) {
				updating_value_1 = true;
				textfield1_changes.value = /*username*/ ctx[1];
				add_flush_callback(() => updating_value_1 = false);
			}

			textfield1.$set(textfield1_changes);
			const textfield2_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				textfield2_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_2 && dirty & /*email*/ 4) {
				updating_value_2 = true;
				textfield2_changes.value = /*email*/ ctx[2];
				add_flush_callback(() => updating_value_2 = false);
			}

			textfield2.$set(textfield2_changes);
			const textfield3_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				textfield3_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_3 && dirty & /*website*/ 8) {
				updating_value_3 = true;
				textfield3_changes.value = /*website*/ ctx[3];
				add_flush_callback(() => updating_value_3 = false);
			}

			textfield3.$set(textfield3_changes);
			const button0_changes = {};
			if (dirty & /*formIsValid*/ 16) button0_changes.disabled = !/*formIsValid*/ ctx[4];

			if (dirty & /*$$scope*/ 131072) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 131072) {
				button1_changes.$$scope = { dirty, ctx };
			}

			button1.$set(button1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(textfield0.$$.fragment, local);
			transition_in(textfield1.$$.fragment, local);
			transition_in(textfield2.$$.fragment, local);
			transition_in(textfield3.$$.fragment, local);
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(textfield0.$$.fragment, local);
			transition_out(textfield1.$$.fragment, local);
			transition_out(textfield2.$$.fragment, local);
			transition_out(textfield3.$$.fragment, local);
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_component(textfield0);
			destroy_component(textfield1);
			destroy_component(textfield2);
			destroy_component(textfield3);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(div2);
			destroy_component(button0);
			destroy_component(button1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let nameValid;
	let usernameValid;
	let emailValid;
	let websiteValid;
	let formIsValid;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("UserForm", slots, []);
	let { id = null } = $$props;
	let nextId = null;
	let name = "";
	let username = "";
	let email = "";
	let website = "";
	let unsubscribe;

	onMount(() => {
		unsubscribe = customUsers.subscribe(items => {
			const selectedUser = items.find(i => i.id === id);
			nextId = items.length + 1;

			if (selectedUser) {
				$$invalidate(0, name = selectedUser.name);
				$$invalidate(1, username = selectedUser.username);
				$$invalidate(2, email = selectedUser.email);
				$$invalidate(3, website = selectedUser.website);
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	function onSubmit() {
		const userData = { name, username, email, website };

		if (id) {
			customUsers.updateUser();
		} else {
			customUsers.addUser({ ...userData, id: nextId });
			goto("/user");
		}
	}

	const writable_props = ["id"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserForm> was created with unknown prop '${key}'`);
	});

	function textfield0_value_binding(value) {
		name = value;
		$$invalidate(0, name);
	}

	function textfield1_value_binding(value) {
		username = value;
		$$invalidate(1, username);
	}

	function textfield2_value_binding(value) {
		email = value;
		$$invalidate(2, email);
	}

	function textfield3_value_binding(value) {
		website = value;
		$$invalidate(3, website);
	}

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(6, id = $$props.id);
	};

	$$self.$capture_state = () => ({
		onMount,
		onDestroy,
		users: customUsers,
		goto,
		Textfield,
		HelperText,
		Button: Button_1,
		Label: CommonLabel,
		isEmpty,
		isValidEmail,
		id,
		nextId,
		name,
		username,
		email,
		website,
		unsubscribe,
		onSubmit,
		nameValid,
		usernameValid,
		emailValid,
		websiteValid,
		formIsValid
	});

	$$self.$inject_state = $$props => {
		if ("id" in $$props) $$invalidate(6, id = $$props.id);
		if ("nextId" in $$props) nextId = $$props.nextId;
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("username" in $$props) $$invalidate(1, username = $$props.username);
		if ("email" in $$props) $$invalidate(2, email = $$props.email);
		if ("website" in $$props) $$invalidate(3, website = $$props.website);
		if ("unsubscribe" in $$props) unsubscribe = $$props.unsubscribe;
		if ("nameValid" in $$props) $$invalidate(7, nameValid = $$props.nameValid);
		if ("usernameValid" in $$props) $$invalidate(8, usernameValid = $$props.usernameValid);
		if ("emailValid" in $$props) $$invalidate(9, emailValid = $$props.emailValid);
		if ("websiteValid" in $$props) $$invalidate(10, websiteValid = $$props.websiteValid);
		if ("formIsValid" in $$props) $$invalidate(4, formIsValid = $$props.formIsValid);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*name*/ 1) {
			$$invalidate(7, nameValid = !isEmpty(name));
		}

		if ($$self.$$.dirty & /*username*/ 2) {
			$$invalidate(8, usernameValid = !isEmpty(username));
		}

		if ($$self.$$.dirty & /*email*/ 4) {
			$$invalidate(9, emailValid = isValidEmail(email));
		}

		if ($$self.$$.dirty & /*website*/ 8) {
			$$invalidate(10, websiteValid = !isEmpty(website));
		}

		if ($$self.$$.dirty & /*nameValid, usernameValid, emailValid, websiteValid*/ 1920) {
			$$invalidate(4, formIsValid = nameValid && usernameValid && emailValid && websiteValid);
		}
	};

	return [
		name,
		username,
		email,
		website,
		formIsValid,
		onSubmit,
		id,
		nameValid,
		usernameValid,
		emailValid,
		websiteValid,
		textfield0_value_binding,
		textfield1_value_binding,
		textfield2_value_binding,
		textfield3_value_binding
	];
}

class UserForm extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { id: 6 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserForm",
			options,
			id: create_fragment.name
		});
	}

	get id() {
		throw new Error("<UserForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<UserForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { UserForm as U };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckZvcm0uNWI0YWEwNzguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2NvbnN0YW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvY29tbW9uL0NvbnRleHRGcmFnbWVudC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvZmxvYXRpbmctbGFiZWwvRmxvYXRpbmdMYWJlbC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvbGluZS1yaXBwbGUvTGluZVJpcHBsZS5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvbm90Y2hlZC1vdXRsaW5lL05vdGNoZWRPdXRsaW5lLnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvSGVscGVyTGluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvUHJlZml4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9TdWZmaXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvdGV4dGZpZWxkL0lucHV0LnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvVGV4dGFyZWEuc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9UZXh0ZmllbGQuc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9oZWxwZXItdGV4dC9IZWxwZXJUZXh0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9oZWxwZXJzL3ZhbGlkYXRpb24uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Vc2VyL1VzZXJGb3JtLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmV4cG9ydCB2YXIgY3NzQ2xhc3NlcyA9IHtcbiAgICBMQUJFTF9GTE9BVF9BQk9WRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnLFxuICAgIExBQkVMX1JFUVVJUkVEOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1yZXF1aXJlZCcsXG4gICAgTEFCRUxfU0hBS0U6ICdtZGMtZmxvYXRpbmctbGFiZWwtLXNoYWtlJyxcbiAgICBST09UOiAnbWRjLWZsb2F0aW5nLWxhYmVsJyxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5pbXBvcnQgeyBfX2Fzc2lnbiwgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBjc3NDbGFzc2VzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xudmFyIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbihhZGFwdGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciksIGFkYXB0ZXIpKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCk7IH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLCBcImNzc0NsYXNzZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLCBcImRlZmF1bHRBZGFwdGVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlZSB7QGxpbmsgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuIHR5cGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXMgTWV0aG9kcyBzaG91bGQgYmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgZ2V0V2lkdGg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gICAgfTtcbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICAgKi9cbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZ2V0V2lkdGgoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gcHJvZHVjZSBhIHNoYWtlIGFuaW1hdGlvbiB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgICAgKiBAcGFyYW0gc2hvdWxkU2hha2UgSWYgdHJ1ZSwgYWRkcyB0aGUgc2hha2UgQ1NTIGNsYXNzOyBvdGhlcndpc2UsIHJlbW92ZXMgc2hha2UgY2xhc3MuXG4gICAgICovXG4gICAgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24ucHJvdG90eXBlLnNoYWtlID0gZnVuY3Rpb24gKHNob3VsZFNoYWtlKSB7XG4gICAgICAgIHZhciBMQUJFTF9TSEFLRSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXMuTEFCRUxfU0hBS0U7XG4gICAgICAgIGlmIChzaG91bGRTaGFrZSkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKExBQkVMX1NIQUtFKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0eWxlcyB0aGUgbGFiZWwgdG8gZmxvYXQgb3IgZG9jay5cbiAgICAgKiBAcGFyYW0gc2hvdWxkRmxvYXQgSWYgdHJ1ZSwgYWRkcyB0aGUgZmxvYXQgQ1NTIGNsYXNzOyBvdGhlcndpc2UsIHJlbW92ZXMgZmxvYXQgYW5kIHNoYWtlIGNsYXNzZXMgdG8gZG9jayB0aGUgbGFiZWwuXG4gICAgICovXG4gICAgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24ucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gKHNob3VsZEZsb2F0KSB7XG4gICAgICAgIHZhciBfYSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXMsIExBQkVMX0ZMT0FUX0FCT1ZFID0gX2EuTEFCRUxfRkxPQVRfQUJPVkUsIExBQkVMX1NIQUtFID0gX2EuTEFCRUxfU0hBS0U7XG4gICAgICAgIGlmIChzaG91bGRGbG9hdCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdHlsZXMgdGhlIGxhYmVsIGFzIHJlcXVpcmVkLlxuICAgICAqIEBwYXJhbSBpc1JlcXVpcmVkIElmIHRydWUsIGFkZHMgYW4gYXN0ZXJpc2sgdG8gdGhlIGxhYmVsLCBpbmRpY2F0aW5nIHRoYXQgaXQgaXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFJlcXVpcmVkID0gZnVuY3Rpb24gKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFyIExBQkVMX1JFUVVJUkVEID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5MQUJFTF9SRVFVSVJFRDtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhMQUJFTF9SRVFVSVJFRCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoTEFCRUxfUkVRVUlSRUQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlU2hha2VBbmltYXRpb25FbmRfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgTEFCRUxfU0hBS0UgPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzLkxBQkVMX1NIQUtFO1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH07XG4gICAgcmV0dXJuIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uO1xufShNRENGb3VuZGF0aW9uKSk7XG5leHBvcnQgeyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbnZhciBjc3NDbGFzc2VzID0ge1xuICAgIExJTkVfUklQUExFX0FDVElWRTogJ21kYy1saW5lLXJpcHBsZS0tYWN0aXZlJyxcbiAgICBMSU5FX1JJUFBMRV9ERUFDVElWQVRJTkc6ICdtZGMtbGluZS1yaXBwbGUtLWRlYWN0aXZhdGluZycsXG59O1xuZXhwb3J0IHsgY3NzQ2xhc3NlcyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuaW1wb3J0IHsgX19hc3NpZ24sIF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgTURDRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHsgY3NzQ2xhc3NlcyB9IGZyb20gJy4vY29uc3RhbnRzJztcbnZhciBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTURDTGluZVJpcHBsZUZvdW5kYXRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTURDTGluZVJpcHBsZUZvdW5kYXRpb24oYWRhcHRlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgTURDTGluZVJpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIpLCBhZGFwdGVyKSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfID0gZnVuY3Rpb24gKGV2dCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlVHJhbnNpdGlvbkVuZChldnQpOyB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENMaW5lUmlwcGxlRm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENMaW5lUmlwcGxlRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWUge0BsaW5rIE1EQ0xpbmVSaXBwbGVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVybiB0eXBlcy5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzIE1ldGhvZHMgc2hvdWxkIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBhZGFwdGVyIGludGVyZmFjZS5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgICAgICAgICBzZXRTdHlsZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIH07XG4gICAgTURDTGluZVJpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5kZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIH07XG4gICAgTURDTGluZVJpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICAgIH07XG4gICAgTURDTGluZVJpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLnNldFJpcHBsZUNlbnRlciA9IGZ1bmN0aW9uICh4Q29vcmRpbmF0ZSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0U3R5bGUoJ3RyYW5zZm9ybS1vcmlnaW4nLCB4Q29vcmRpbmF0ZSArIFwicHggY2VudGVyXCIpO1xuICAgIH07XG4gICAgTURDTGluZVJpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgfTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gV2FpdCBmb3IgdGhlIGxpbmUgcmlwcGxlIHRvIGJlIGVpdGhlciB0cmFuc3BhcmVudCBvciBvcGFxdWVcbiAgICAgICAgLy8gYmVmb3JlIGVtaXR0aW5nIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50XG4gICAgICAgIHZhciBpc0RlYWN0aXZhdGluZyA9IHRoaXMuYWRhcHRlci5oYXNDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgICAgICAgIGlmIChpc0RlYWN0aXZhdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0FDVElWRSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xufShNRENGb3VuZGF0aW9uKSk7XG5leHBvcnQgeyBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbnZhciBzdHJpbmdzID0ge1xuICAgIE5PVENIX0VMRU1FTlRfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZV9fbm90Y2gnLFxufTtcbnZhciBudW1iZXJzID0ge1xuICAgIC8vIFRoaXMgc2hvdWxkIHN0YXkgaW4gc3luYyB3aXRoICRtZGMtbm90Y2hlZC1vdXRsaW5lLXBhZGRpbmcgKiAyLlxuICAgIE5PVENIX0VMRU1FTlRfUEFERElORzogOCxcbn07XG52YXIgY3NzQ2xhc3NlcyA9IHtcbiAgICBOT19MQUJFTDogJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vLWxhYmVsJyxcbiAgICBPVVRMSU5FX05PVENIRUQ6ICdtZGMtbm90Y2hlZC1vdXRsaW5lLS1ub3RjaGVkJyxcbiAgICBPVVRMSU5FX1VQR1JBREVEOiAnbWRjLW5vdGNoZWQtb3V0bGluZS0tdXBncmFkZWQnLFxufTtcbmV4cG9ydCB7IGNzc0NsYXNzZXMsIG51bWJlcnMsIHN0cmluZ3MgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7IF9fYXNzaWduLCBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE1EQ0ZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7IGNzc0NsYXNzZXMsIG51bWJlcnMsIHN0cmluZ3MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG52YXIgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uKGFkYXB0ZXIpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIpLCBhZGFwdGVyKSkgfHwgdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiwgXCJzdHJpbmdzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5ncztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24sIFwiY3NzQ2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLCBcIm51bWJlcnNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXJzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWUge0BsaW5rIE1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm4gdHlwZXMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBzZXROb3RjaFdpZHRoUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVOb3RjaFdpZHRoUHJvcGVydHk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgb3V0bGluZSBub3RjaGVkIHNlbGVjdG9yIGFuZCB1cGRhdGVzIHRoZSBub3RjaCB3aWR0aCBjYWxjdWxhdGVkIGJhc2VkIG9mZiBvZiBub3RjaFdpZHRoLlxuICAgICAqL1xuICAgIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5wcm90b3R5cGUubm90Y2ggPSBmdW5jdGlvbiAobm90Y2hXaWR0aCkge1xuICAgICAgICB2YXIgT1VUTElORV9OT1RDSEVEID0gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1VUTElORV9OT1RDSEVEO1xuICAgICAgICBpZiAobm90Y2hXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIG5vdGNoV2lkdGggKz0gbnVtYmVycy5OT1RDSF9FTEVNRU5UX1BBRERJTkc7IC8vIEFkZCBwYWRkaW5nIGZyb20gbGVmdC9yaWdodC5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0Tm90Y2hXaWR0aFByb3BlcnR5KG5vdGNoV2lkdGgpO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoT1VUTElORV9OT1RDSEVEKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbm90Y2hlZCBvdXRsaW5lIHNlbGVjdG9yIHRvIGNsb3NlIHRoZSBub3RjaCBpbiB0aGUgb3V0bGluZS5cbiAgICAgKi9cbiAgICBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24ucHJvdG90eXBlLmNsb3NlTm90Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBPVVRMSU5FX05PVENIRUQgPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PVVRMSU5FX05PVENIRUQ7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhPVVRMSU5FX05PVENIRUQpO1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlTm90Y2hXaWR0aFByb3BlcnR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uO1xufShNRENGb3VuZGF0aW9uKSk7XG5leHBvcnQgeyBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24gfTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXG5leHBvcnQgZGVmYXVsdCBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xudmFyIHN0cmluZ3MgPSB7XG4gICAgQVJJQV9DT05UUk9MUzogJ2FyaWEtY29udHJvbHMnLFxuICAgIEFSSUFfREVTQ1JJQkVEQlk6ICdhcmlhLWRlc2NyaWJlZGJ5JyxcbiAgICBJTlBVVF9TRUxFQ1RPUjogJy5tZGMtdGV4dC1maWVsZF9faW5wdXQnLFxuICAgIExBQkVMX1NFTEVDVE9SOiAnLm1kYy1mbG9hdGluZy1sYWJlbCcsXG4gICAgTEVBRElOR19JQ09OX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19pY29uLS1sZWFkaW5nJyxcbiAgICBMSU5FX1JJUFBMRV9TRUxFQ1RPUjogJy5tZGMtbGluZS1yaXBwbGUnLFxuICAgIE9VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZScsXG4gICAgUFJFRklYX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19hZmZpeC0tcHJlZml4JyxcbiAgICBTVUZGSVhfU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2FmZml4LS1zdWZmaXgnLFxuICAgIFRSQUlMSU5HX0lDT05fU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2ljb24tLXRyYWlsaW5nJ1xufTtcbnZhciBjc3NDbGFzc2VzID0ge1xuICAgIERJU0FCTEVEOiAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJyxcbiAgICBGT0NVU0VEOiAnbWRjLXRleHQtZmllbGQtLWZvY3VzZWQnLFxuICAgIEhFTFBFUl9MSU5FOiAnbWRjLXRleHQtZmllbGQtaGVscGVyLWxpbmUnLFxuICAgIElOVkFMSUQ6ICdtZGMtdGV4dC1maWVsZC0taW52YWxpZCcsXG4gICAgTEFCRUxfRkxPQVRJTkc6ICdtZGMtdGV4dC1maWVsZC0tbGFiZWwtZmxvYXRpbmcnLFxuICAgIE5PX0xBQkVMOiAnbWRjLXRleHQtZmllbGQtLW5vLWxhYmVsJyxcbiAgICBPVVRMSU5FRDogJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCcsXG4gICAgUk9PVDogJ21kYy10ZXh0LWZpZWxkJyxcbiAgICBURVhUQVJFQTogJ21kYy10ZXh0LWZpZWxkLS10ZXh0YXJlYScsXG4gICAgV0lUSF9MRUFESU5HX0lDT046ICdtZGMtdGV4dC1maWVsZC0td2l0aC1sZWFkaW5nLWljb24nLFxuICAgIFdJVEhfVFJBSUxJTkdfSUNPTjogJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nLFxufTtcbnZhciBudW1iZXJzID0ge1xuICAgIExBQkVMX1NDQUxFOiAwLjc1LFxufTtcbi8qKlxuICogV2hpdGVsaXN0IGJhc2VkIG9mZiBvZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML0hUTUw1L0NvbnN0cmFpbnRfdmFsaWRhdGlvblxuICogdW5kZXIgdGhlIFwiVmFsaWRhdGlvbi1yZWxhdGVkIGF0dHJpYnV0ZXNcIiBzZWN0aW9uLlxuICovXG52YXIgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCA9IFtcbiAgICAncGF0dGVybicsICdtaW4nLCAnbWF4JywgJ3JlcXVpcmVkJywgJ3N0ZXAnLCAnbWlubGVuZ3RoJywgJ21heGxlbmd0aCcsXG5dO1xuLyoqXG4gKiBMYWJlbCBzaG91bGQgYWx3YXlzIGZsb2F0IGZvciB0aGVzZSB0eXBlcyBhcyB0aGV5IHNob3cgc29tZSBVSSBldmVuIGlmIHZhbHVlIGlzIGVtcHR5LlxuICovXG52YXIgQUxXQVlTX0ZMT0FUX1RZUEVTID0gW1xuICAgICdjb2xvcicsICdkYXRlJywgJ2RhdGV0aW1lLWxvY2FsJywgJ21vbnRoJywgJ3JhbmdlJywgJ3RpbWUnLCAnd2VlaycsXG5dO1xuZXhwb3J0IHsgY3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVycywgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCwgQUxXQVlTX0ZMT0FUX1RZUEVTIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5pbXBvcnQgeyBfX2Fzc2lnbiwgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBBTFdBWVNfRkxPQVRfVFlQRVMsIGNzc0NsYXNzZXMsIG51bWJlcnMsIHN0cmluZ3MsIFZBTElEQVRJT05fQVRUUl9XSElURUxJU1QgfSBmcm9tICcuL2NvbnN0YW50cyc7XG52YXIgUE9JTlRFUkRPV05fRVZFTlRTID0gWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddO1xudmFyIElOVEVSQUNUSU9OX0VWRU5UUyA9IFsnY2xpY2snLCAna2V5ZG93biddO1xudmFyIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1EQ1RleHRGaWVsZEZvdW5kYXRpb24sIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFkYXB0ZXJcbiAgICAgKiBAcGFyYW0gZm91bmRhdGlvbk1hcCBNYXAgZnJvbSBzdWJjb21wb25lbnQgbmFtZXMgdG8gdGhlaXIgc3ViZm91bmRhdGlvbnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gTURDVGV4dEZpZWxkRm91bmRhdGlvbihhZGFwdGVyLCBmb3VuZGF0aW9uTWFwKSB7XG4gICAgICAgIGlmIChmb3VuZGF0aW9uTWFwID09PSB2b2lkIDApIHsgZm91bmRhdGlvbk1hcCA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyKSwgYWRhcHRlcikpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzRm9jdXNlZF8gPSBmYWxzZTtcbiAgICAgICAgX3RoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmlzVmFsaWRfID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMudXNlTmF0aXZlVmFsaWRhdGlvbl8gPSB0cnVlO1xuICAgICAgICBfdGhpcy52YWxpZGF0ZU9uVmFsdWVDaGFuZ2VfID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuaGVscGVyVGV4dF8gPSBmb3VuZGF0aW9uTWFwLmhlbHBlclRleHQ7XG4gICAgICAgIF90aGlzLmNoYXJhY3RlckNvdW50ZXJfID0gZm91bmRhdGlvbk1hcC5jaGFyYWN0ZXJDb3VudGVyO1xuICAgICAgICBfdGhpcy5sZWFkaW5nSWNvbl8gPSBmb3VuZGF0aW9uTWFwLmxlYWRpbmdJY29uO1xuICAgICAgICBfdGhpcy50cmFpbGluZ0ljb25fID0gZm91bmRhdGlvbk1hcC50cmFpbGluZ0ljb247XG4gICAgICAgIF90aGlzLmlucHV0Rm9jdXNIYW5kbGVyXyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmFjdGl2YXRlRm9jdXMoKTsgfTtcbiAgICAgICAgX3RoaXMuaW5wdXRCbHVySGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5kZWFjdGl2YXRlRm9jdXMoKTsgfTtcbiAgICAgICAgX3RoaXMuaW5wdXRJbnB1dEhhbmRsZXJfID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlSW5wdXQoKTsgfTtcbiAgICAgICAgX3RoaXMuc2V0UG9pbnRlclhPZmZzZXRfID0gZnVuY3Rpb24gKGV2dCkgeyByZXR1cm4gX3RoaXMuc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCk7IH07XG4gICAgICAgIF90aGlzLnRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5oYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpOyB9O1xuICAgICAgICBfdGhpcy52YWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcl8gPSBmdW5jdGlvbiAoYXR0cmlidXRlc0xpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlKGF0dHJpYnV0ZXNMaXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRGb3VuZGF0aW9uLCBcInN0cmluZ3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1RleHRGaWVsZEZvdW5kYXRpb24sIFwibnVtYmVyc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUsIFwic2hvdWxkQWx3YXlzRmxvYXRfXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudHlwZTtcbiAgICAgICAgICAgIHJldHVybiBBTFdBWVNfRkxPQVRfVFlQRVMuaW5kZXhPZih0eXBlKSA+PSAwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLCBcInNob3VsZEZsb2F0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaG91bGRBbHdheXNGbG9hdF8gfHwgdGhpcy5pc0ZvY3VzZWRfIHx8ICEhdGhpcy5nZXRWYWx1ZSgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5pc0JhZElucHV0XygpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLCBcInNob3VsZFNoYWtlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNGb2N1c2VkXyAmJiAhdGhpcy5pc1ZhbGlkKCkgJiYgISF0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWUge0BsaW5rIE1EQ1RleHRGaWVsZEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmRcbiAgICAgICAgICogcmV0dXJuIHR5cGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXMgTWV0aG9kcyBzaG91bGQgYmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICAgICAgICAgICAgc2V0SW5wdXRBdHRyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlSW5wdXRBdHRyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBnZXROYXRpdmVJbnB1dDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgICAgICAgICBpc0ZvY3VzZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICAgICAgICAgIGFjdGl2YXRlTGluZVJpcHBsZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGRlYWN0aXZhdGVMaW5lUmlwcGxlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHNoYWtlTGFiZWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBmbG9hdExhYmVsOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgc2V0TGFiZWxSZXF1aXJlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGhhc0xhYmVsOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgICAgICAgICBnZXRMYWJlbFdpZHRoOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxuICAgICAgICAgICAgICAgIGhhc091dGxpbmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICAgICAgICAgIG5vdGNoT3V0bGluZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGNsb3NlT3V0bGluZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5hZGFwdGVyLmhhc0xhYmVsKCkgJiYgdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNldExhYmVsUmVxdWlyZWQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlci5pc0ZvY3VzZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSAmJiB0aGlzLnNob3VsZEZsb2F0KSB7XG4gICAgICAgICAgICB0aGlzLm5vdGNoT3V0bGluZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5mbG9hdExhYmVsKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUZsb2F0aW5nXyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkYXB0ZXIucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmlucHV0Rm9jdXNIYW5kbGVyXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdpbnB1dCcsIHRoaXMuaW5wdXRJbnB1dEhhbmRsZXJfKTtcbiAgICAgICAgUE9JTlRFUkRPV05fRVZFTlRTLmZvckVhY2goZnVuY3Rpb24gKGV2dFR5cGUpIHtcbiAgICAgICAgICAgIF90aGlzLmFkYXB0ZXIucmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy5zZXRQb2ludGVyWE9mZnNldF8pO1xuICAgICAgICB9KTtcbiAgICAgICAgSU5URVJBQ1RJT05fRVZFTlRTLmZvckVhY2goZnVuY3Rpb24gKGV2dFR5cGUpIHtcbiAgICAgICAgICAgIF90aGlzLmFkYXB0ZXIucmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgX3RoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8gPVxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcl8pO1xuICAgICAgICB0aGlzLnNldENoYXJhY3RlckNvdW50ZXJfKHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgIH07XG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmlucHV0Rm9jdXNIYW5kbGVyXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignaW5wdXQnLCB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyk7XG4gICAgICAgIFBPSU5URVJET1dOX0VWRU5UUy5mb3JFYWNoKGZ1bmN0aW9uIChldnRUeXBlKSB7XG4gICAgICAgICAgICBfdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy5zZXRQb2ludGVyWE9mZnNldF8pO1xuICAgICAgICB9KTtcbiAgICAgICAgSU5URVJBQ1RJT05fRVZFTlRTLmZvckVhY2goZnVuY3Rpb24gKGV2dFR5cGUpIHtcbiAgICAgICAgICAgIF90aGlzLmFkYXB0ZXIuZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5kZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIodGhpcy52YWxpZGF0aW9uT2JzZXJ2ZXJfKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdXNlciBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgVGV4dCBGaWVsZC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5hdGl2ZUlucHV0ID0gdGhpcy5hZGFwdGVyLmdldE5hdGl2ZUlucHV0KCk7XG4gICAgICAgIGlmIChuYXRpdmVJbnB1dCAmJiBuYXRpdmVJbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgY2hhbmdlc1xuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZVZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2UgPSBmdW5jdGlvbiAoYXR0cmlidXRlc0xpc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgYXR0cmlidXRlc0xpc3Quc29tZShmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICAgICAgaWYgKFZBTElEQVRJT05fQVRUUl9XSElURUxJU1QuaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3R5bGVWYWxpZGl0eV8odHJ1ZSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWRhcHRlci5zZXRMYWJlbFJlcXVpcmVkKF90aGlzLmdldE5hdGl2ZUlucHV0XygpLnJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzTGlzdC5pbmRleE9mKCdtYXhsZW5ndGgnKSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldENoYXJhY3RlckNvdW50ZXJfKHRoaXMuZ2V0VmFsdWUoKS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPcGVucy9jbG9zZXMgdGhlIG5vdGNoZWQgb3V0bGluZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5ub3RjaE91dGxpbmUgPSBmdW5jdGlvbiAob3Blbk5vdGNoKSB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmhhc091dGxpbmUoKSB8fCAhdGhpcy5hZGFwdGVyLmhhc0xhYmVsKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3Blbk5vdGNoKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWxXaWR0aCA9IHRoaXMuYWRhcHRlci5nZXRMYWJlbFdpZHRoKCkgKiBudW1iZXJzLkxBQkVMX1NDQUxFO1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLm5vdGNoT3V0bGluZShsYWJlbFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5jbG9zZU91dGxpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSB0ZXh0IGZpZWxkIGZvY3VzIHN0YXRlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmFjdGl2YXRlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNGb2N1c2VkXyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3R5bGVGb2N1c2VkXyh0aGlzLmlzRm9jdXNlZF8pO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuYWN0aXZhdGVMaW5lUmlwcGxlKCk7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuZmxvYXRMYWJlbCh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVGbG9hdGluZ18odGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuc2hha2VMYWJlbCh0aGlzLnNob3VsZFNoYWtlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWxwZXJUZXh0XyAmJlxuICAgICAgICAgICAgKHRoaXMuaGVscGVyVGV4dF8uaXNQZXJzaXN0ZW50KCkgfHwgIXRoaXMuaGVscGVyVGV4dF8uaXNWYWxpZGF0aW9uKCkgfHxcbiAgICAgICAgICAgICAgICAhdGhpcy5pc1ZhbGlkXykpIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2hvd1RvU2NyZWVuUmVhZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGxpbmUgcmlwcGxlJ3MgdHJhbnNmb3JtIG9yaWdpbiwgc28gdGhhdCB0aGUgbGluZSByaXBwbGUgYWN0aXZhdGVcbiAgICAgKiBhbmltYXRpb24gd2lsbCBhbmltYXRlIG91dCBmcm9tIHRoZSB1c2VyJ3MgY2xpY2sgbG9jYXRpb24uXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VHJhbnNmb3JtT3JpZ2luID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKCkgfHwgdGhpcy5hZGFwdGVyLmhhc091dGxpbmUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgIHZhciB0YXJnZXRFdmVudCA9IHRvdWNoZXMgPyB0b3VjaGVzWzBdIDogZXZ0O1xuICAgICAgICB2YXIgdGFyZ2V0Q2xpZW50UmVjdCA9IHRhcmdldEV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRYID0gdGFyZ2V0RXZlbnQuY2xpZW50WCAtIHRhcmdldENsaWVudFJlY3QubGVmdDtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4obm9ybWFsaXplZFgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBpbnB1dCBjaGFuZ2Ugb2YgdGV4dCBpbnB1dCBhbmQgdGV4dCBhcmVhLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZUlucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZUZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0Q2hhcmFjdGVyQ291bnRlcl8odGhpcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZSBpbiBjYXNlcyB3aGVuIHRoZSBpbnB1dCB2YWx1ZVxuICAgICAqIGNoYW5nZXMgd2l0aG91dCB1c2VyIGlucHV0IChlLmcuIHByb2dyYW1tYXRpY2FsbHkpLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmF1dG9Db21wbGV0ZUZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVjZWl2ZWRVc2VySW5wdXRfKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlRm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVhY3RpdmF0ZXMgdGhlIFRleHQgRmllbGQncyBmb2N1cyBzdGF0ZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5kZWFjdGl2YXRlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNGb2N1c2VkXyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuZGVhY3RpdmF0ZUxpbmVSaXBwbGUoKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQoKTtcbiAgICAgICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICAgICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuZmxvYXRMYWJlbCh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVGbG9hdGluZ18odGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuc2hha2VMYWJlbCh0aGlzLnNob3VsZFNoYWtlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRmxvYXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWx1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIFByZXZlbnQgU2FmYXJpIGZyb20gbW92aW5nIHRoZSBjYXJldCB0byB0aGUgZW5kIG9mIHRoZSBpbnB1dCB3aGVuIHRoZVxuICAgICAgICAvLyB2YWx1ZSBoYXMgbm90IGNoYW5nZWQuXG4gICAgICAgIGlmICh0aGlzLmdldFZhbHVlKCkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRDaGFyYWN0ZXJDb3VudGVyXyh2YWx1ZS5sZW5ndGgpO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZU9uVmFsdWVDaGFuZ2VfKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hZGFwdGVyLmhhc0xhYmVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMubm90Y2hPdXRsaW5lKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRmxvYXRpbmdfKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVPblZhbHVlQ2hhbmdlXykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFRoZSBjdXN0b20gdmFsaWRpdHkgc3RhdGUsIGlmIHNldDsgb3RoZXJ3aXNlLCB0aGUgcmVzdWx0IG9mIGFcbiAgICAgKiAgICAgbmF0aXZlIHZhbGlkaXR5IGNoZWNrLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZU5hdGl2ZVZhbGlkYXRpb25fID8gdGhpcy5pc05hdGl2ZUlucHV0VmFsaWRfKCkgOlxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpc1ZhbGlkIFNldHMgdGhlIGN1c3RvbSB2YWxpZGl0eSBzdGF0ZSBvZiB0aGUgVGV4dCBGaWVsZC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRWYWxpZCA9IGZ1bmN0aW9uIChpc1ZhbGlkKSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZF8gPSBpc1ZhbGlkO1xuICAgICAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgICAgICB2YXIgc2hvdWxkU2hha2UgPSAhaXNWYWxpZCAmJiAhdGhpcy5pc0ZvY3VzZWRfICYmICEhdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAodGhpcy5hZGFwdGVyLmhhc0xhYmVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zaGFrZUxhYmVsKHNob3VsZFNoYWtlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNob3VsZFZhbGlkYXRlIFdoZXRoZXIgb3Igbm90IHZhbGlkaXR5IHNob3VsZCBiZSB1cGRhdGVkIG9uXG4gICAgICogICAgIHZhbHVlIGNoYW5nZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRWYWxpZGF0ZU9uVmFsdWVDaGFuZ2UgPSBmdW5jdGlvbiAoc2hvdWxkVmFsaWRhdGUpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZU9uVmFsdWVDaGFuZ2VfID0gc2hvdWxkVmFsaWRhdGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgb3Igbm90IHZhbGlkaXR5IHNob3VsZCBiZSB1cGRhdGVkIG9uIHZhbHVlIGNoYW5nZS4gYHRydWVgXG4gICAgICogICAgIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0VmFsaWRhdGVPblZhbHVlQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU9uVmFsdWVDaGFuZ2VfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvciBkaXNhYmxlcyB0aGUgdXNlIG9mIG5hdGl2ZSB2YWxpZGF0aW9uLiBVc2UgdGhpcyBmb3IgY3VzdG9tXG4gICAgICogdmFsaWRhdGlvbi5cbiAgICAgKiBAcGFyYW0gdXNlTmF0aXZlVmFsaWRhdGlvbiBTZXQgdGhpcyB0byBmYWxzZSB0byBpZ25vcmUgbmF0aXZlIGlucHV0XG4gICAgICogICAgIHZhbGlkYXRpb24uXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VXNlTmF0aXZlVmFsaWRhdGlvbiA9IGZ1bmN0aW9uICh1c2VOYXRpdmVWYWxpZGF0aW9uKSB7XG4gICAgICAgIHRoaXMudXNlTmF0aXZlVmFsaWRhdGlvbl8gPSB1c2VOYXRpdmVWYWxpZGF0aW9uO1xuICAgIH07XG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaXNEaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkuZGlzYWJsZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGlzYWJsZWQgU2V0cyB0aGUgdGV4dC1maWVsZCBkaXNhYmxlZCBvciBlbmFibGVkLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldERpc2FibGVkID0gZnVuY3Rpb24gKGRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5zdHlsZURpc2FibGVkXyhkaXNhYmxlZCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY29udGVudCBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSBoZWxwZXIgdGV4dC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRIZWxwZXJUZXh0Q29udGVudCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICAgICAgICB0aGlzLmhlbHBlclRleHRfLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFyaWEgbGFiZWwgb2YgdGhlIGxlYWRpbmcgaWNvbi5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRMZWFkaW5nSWNvbkFyaWFMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICBpZiAodGhpcy5sZWFkaW5nSWNvbl8pIHtcbiAgICAgICAgICAgIHRoaXMubGVhZGluZ0ljb25fLnNldEFyaWFMYWJlbChsYWJlbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHRleHQgY29udGVudCBvZiB0aGUgbGVhZGluZyBpY29uLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldExlYWRpbmdJY29uQ29udGVudCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmxlYWRpbmdJY29uXykge1xuICAgICAgICAgICAgdGhpcy5sZWFkaW5nSWNvbl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXJpYSBsYWJlbCBvZiB0aGUgdHJhaWxpbmcgaWNvbi5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRUcmFpbGluZ0ljb25BcmlhTGFiZWwgPSBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uXykge1xuICAgICAgICAgICAgdGhpcy50cmFpbGluZ0ljb25fLnNldEFyaWFMYWJlbChsYWJlbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHRleHQgY29udGVudCBvZiB0aGUgdHJhaWxpbmcgaWNvbi5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRUcmFpbGluZ0ljb25Db250ZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uXykge1xuICAgICAgICAgICAgdGhpcy50cmFpbGluZ0ljb25fLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgY2hhcmFjdGVyIGNvdW50ZXIgdmFsdWVzIHRoYXQgc2hvd3MgY2hhcmFjdGVycyB1c2VkIGFuZCB0aGUgdG90YWxcbiAgICAgKiBjaGFyYWN0ZXIgbGltaXQuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0Q2hhcmFjdGVyQ291bnRlcl8gPSBmdW5jdGlvbiAoY3VycmVudExlbmd0aCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hhcmFjdGVyQ291bnRlcl8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF4TGVuZ3RoID0gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5tYXhMZW5ndGg7XG4gICAgICAgIGlmIChtYXhMZW5ndGggPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01EQ1RleHRGaWVsZEZvdW5kYXRpb246IEV4cGVjdGVkIG1heGxlbmd0aCBodG1sIHByb3BlcnR5IG9uIHRleHQgaW5wdXQgb3IgdGV4dGFyZWEuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJDb3VudGVyXy5zZXRDb3VudGVyVmFsdWUoY3VycmVudExlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgVGV4dCBGaWVsZCBpbnB1dCBmYWlscyBpbiBjb252ZXJ0aW5nIHRoZSB1c2VyLXN1cHBsaWVkXG4gICAgICogICAgIHZhbHVlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmlzQmFkSW5wdXRfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBUaGUgYmFkSW5wdXQgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBpbiBJRSAxMSDwn5KpLlxuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS52YWxpZGl0eS5iYWRJbnB1dCB8fCBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVGhlIHJlc3VsdCBvZiBuYXRpdmUgdmFsaWRpdHkgY2hlY2tpbmcgKFZhbGlkaXR5U3RhdGUudmFsaWQpLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmlzTmF0aXZlSW5wdXRWYWxpZF8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LnZhbGlkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIHZhbGlkaXR5IHN0YXRlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnN0eWxlVmFsaWRpdHlfID0gZnVuY3Rpb24gKGlzVmFsaWQpIHtcbiAgICAgICAgdmFyIElOVkFMSUQgPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXMuSU5WQUxJRDtcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhJTlZBTElEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWxwZXJUZXh0Xykge1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zZXRWYWxpZGl0eShpc1ZhbGlkKTtcbiAgICAgICAgICAgIC8vIFdlIGR5bmFtaWNhbGx5IHNldCBvciB1bnNldCBhcmlhLWRlc2NyaWJlZGJ5IGZvciB2YWxpZGF0aW9uIGhlbHBlciB0ZXh0XG4gICAgICAgICAgICAvLyBvbmx5LCBiYXNlZCBvbiB3aGV0aGVyIHRoZSBmaWVsZCBpcyB2YWxpZFxuICAgICAgICAgICAgdmFyIGhlbHBlclRleHRWYWxpZGF0aW9uID0gdGhpcy5oZWxwZXJUZXh0Xy5pc1ZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIGlmICghaGVscGVyVGV4dFZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGVscGVyVGV4dFZpc2libGUgPSB0aGlzLmhlbHBlclRleHRfLmlzVmlzaWJsZSgpO1xuICAgICAgICAgICAgdmFyIGhlbHBlclRleHRJZCA9IHRoaXMuaGVscGVyVGV4dF8uZ2V0SWQoKTtcbiAgICAgICAgICAgIGlmIChoZWxwZXJUZXh0VmlzaWJsZSAmJiBoZWxwZXJUZXh0SWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0SW5wdXRBdHRyKHN0cmluZ3MuQVJJQV9ERVNDUklCRURCWSwgaGVscGVyVGV4dElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVJbnB1dEF0dHIoc3RyaW5ncy5BUklBX0RFU0NSSUJFREJZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGZvY3VzZWQgc3RhdGUuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc3R5bGVGb2N1c2VkXyA9IGZ1bmN0aW9uIChpc0ZvY3VzZWQpIHtcbiAgICAgICAgdmFyIEZPQ1VTRUQgPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRk9DVVNFRDtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKEZPQ1VTRUQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKEZPQ1VTRUQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc3R5bGVEaXNhYmxlZF8gPSBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgICAgICB2YXIgX2EgPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXMsIERJU0FCTEVEID0gX2EuRElTQUJMRUQsIElOVkFMSUQgPSBfYS5JTlZBTElEO1xuICAgICAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhESVNBQkxFRCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGVhZGluZ0ljb25fKSB7XG4gICAgICAgICAgICB0aGlzLmxlYWRpbmdJY29uXy5zZXREaXNhYmxlZChpc0Rpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb25fKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWlsaW5nSWNvbl8uc2V0RGlzYWJsZWQoaXNEaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBsYWJlbCBmbG9hdGluZyBzdGF0ZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zdHlsZUZsb2F0aW5nXyA9IGZ1bmN0aW9uIChpc0Zsb2F0aW5nKSB7XG4gICAgICAgIHZhciBMQUJFTF9GTE9BVElORyA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5MQUJFTF9GTE9BVElORztcbiAgICAgICAgaWYgKGlzRmxvYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhMQUJFTF9GTE9BVElORyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoTEFCRUxfRkxPQVRJTkcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFRoZSBuYXRpdmUgdGV4dCBpbnB1dCBlbGVtZW50IGZyb20gdGhlIGhvc3QgZW52aXJvbm1lbnQsIG9yIGFuXG4gICAgICogICAgIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGZvciB1bml0IHRlc3RzLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmdldE5hdGl2ZUlucHV0XyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5hZGFwdGVyIG1heSBiZSB1bmRlZmluZWQgaW4gZm91bmRhdGlvbiB1bml0IHRlc3RzLiBUaGlzIGhhcHBlbnMgd2hlblxuICAgICAgICAvLyB0ZXN0ZG91YmxlIGlzIGNyZWF0aW5nIGEgbW9jayBvYmplY3QgYW5kIGludm9rZXMgdGhlXG4gICAgICAgIC8vIHNob3VsZFNoYWtlL3Nob3VsZEZsb2F0IGdldHRlcnMgKHdoaWNoIGluIHR1cm4gY2FsbCBnZXRWYWx1ZSgpLCB3aGljaFxuICAgICAgICAvLyBjYWxscyB0aGlzIG1ldGhvZCkgYmVmb3JlIGluaXQoKSBoYXMgYmVlbiBjYWxsZWQgZnJvbSB0aGUgTURDVGV4dEZpZWxkXG4gICAgICAgIC8vIGNvbnN0cnVjdG9yLiBUbyB3b3JrIGFyb3VuZCB0aGF0IGlzc3VlLCB3ZSByZXR1cm4gYSBkdW1teSBvYmplY3QuXG4gICAgICAgIHZhciBuYXRpdmVJbnB1dCA9IHRoaXMuYWRhcHRlciA/IHRoaXMuYWRhcHRlci5nZXROYXRpdmVJbnB1dCgpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUlucHV0IHx8IHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1heExlbmd0aDogLTEsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgdmFsaWRpdHk6IHtcbiAgICAgICAgICAgICAgICBiYWRJbnB1dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG59KE1EQ0ZvdW5kYXRpb24pKTtcbmV4cG9ydCB7IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24gfTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRGb3VuZGF0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbnZhciBjc3NDbGFzc2VzID0ge1xuICAgIEhFTFBFUl9URVhUX1BFUlNJU1RFTlQ6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCcsXG4gICAgSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0c6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tdmFsaWRhdGlvbi1tc2cnLFxuICAgIFJPT1Q6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dCcsXG59O1xudmFyIHN0cmluZ3MgPSB7XG4gICAgQVJJQV9ISURERU46ICdhcmlhLWhpZGRlbicsXG4gICAgUk9MRTogJ3JvbGUnLFxuICAgIFJPT1RfU0VMRUNUT1I6IFwiLlwiICsgY3NzQ2xhc3Nlcy5ST09ULFxufTtcbmV4cG9ydCB7IHN0cmluZ3MsIGNzc0NsYXNzZXMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7IF9fYXNzaWduLCBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE1EQ0ZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7IGNzc0NsYXNzZXMsIHN0cmluZ3MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG52YXIgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uKGFkYXB0ZXIpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciksIGFkYXB0ZXIpKSB8fCB0aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24sIFwiY3NzQ2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24sIFwic3RyaW5nc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24sIFwiZGVmYXVsdEFkYXB0ZXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2VlIHtAbGluayBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm4gdHlwZXMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBoYXNDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgICAgICAgICAgZ2V0QXR0cjogZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgICAgICAgICBzZXRBdHRyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHNldENvbnRlbnQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLmdldElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldEF0dHIoJ2lkJyk7XG4gICAgfTtcbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldEF0dHIoc3RyaW5ncy5BUklBX0hJRERFTikgIT09ICd0cnVlJztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIGhlbHBlciB0ZXh0IGZpZWxkLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnNldENvbnRlbnQoY29udGVudCk7XG4gICAgfTtcbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuaXNQZXJzaXN0ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmhhc0NsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXNQZXJzaXN0ZW50IFNldHMgdGhlIHBlcnNpc3RlbmN5IG9mIHRoZSBoZWxwZXIgdGV4dC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0UGVyc2lzdGVudCA9IGZ1bmN0aW9uIChpc1BlcnNpc3RlbnQpIHtcbiAgICAgICAgaWYgKGlzUGVyc2lzdGVudCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB3aGV0aGVyIHRoZSBoZWxwZXIgdGV4dCBhY3RzIGFzIGFuIGVycm9yIHZhbGlkYXRpb24gbWVzc2FnZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuaXNWYWxpZGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmhhc0NsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlzVmFsaWRhdGlvbiBUcnVlIHRvIG1ha2UgdGhlIGhlbHBlciB0ZXh0IGFjdCBhcyBhbiBlcnJvciB2YWxpZGF0aW9uIG1lc3NhZ2UuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZhbGlkYXRpb24gPSBmdW5jdGlvbiAoaXNWYWxpZGF0aW9uKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTWFrZXMgdGhlIGhlbHBlciB0ZXh0IHZpc2libGUgdG8gdGhlIHNjcmVlbiByZWFkZXIuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLnNob3dUb1NjcmVlblJlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUF0dHIoc3RyaW5ncy5BUklBX0hJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWxpZGl0eSBvZiB0aGUgaGVscGVyIHRleHQgYmFzZWQgb24gdGhlIGlucHV0IHZhbGlkaXR5LlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRWYWxpZGl0eSA9IGZ1bmN0aW9uIChpbnB1dElzVmFsaWQpIHtcbiAgICAgICAgdmFyIGhlbHBlclRleHRJc1BlcnNpc3RlbnQgPSB0aGlzLmFkYXB0ZXIuaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICAgICAgdmFyIGhlbHBlclRleHRJc1ZhbGlkYXRpb25Nc2cgPSB0aGlzLmFkYXB0ZXIuaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgICAgIHZhciB2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5ID0gaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyAmJiAhaW5wdXRJc1ZhbGlkO1xuICAgICAgICBpZiAodmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VG9TY3JlZW5SZWFkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zZXRBdHRyKHN0cmluZ3MuUk9MRSwgJ2FsZXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQXR0cihzdHJpbmdzLlJPTEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGVscGVyVGV4dElzUGVyc2lzdGVudCAmJiAhdmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlXygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgaGVscCB0ZXh0IGZyb20gc2NyZWVuIHJlYWRlcnMuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLmhpZGVfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0QXR0cihzdHJpbmdzLkFSSUFfSElEREVOLCAndHJ1ZScpO1xuICAgIH07XG4gICAgcmV0dXJuIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uO1xufShNRENGb3VuZGF0aW9uKSk7XG5leHBvcnQgeyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCI8c2xvdD48L3Nsb3Q+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7b25EZXN0cm95LCBzZXRDb250ZXh0fSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQge3dyaXRhYmxlfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG4gIGV4cG9ydCBsZXQga2V5O1xuICBleHBvcnQgbGV0IHZhbHVlO1xuXG4gIGNvbnN0IHN0b3JlVmFsdWUgPSB3cml0YWJsZSh2YWx1ZSk7XG4gIHNldENvbnRleHQoa2V5LCBzdG9yZVZhbHVlKTtcblxuICAkOiAkc3RvcmVWYWx1ZSA9IHZhbHVlO1xuXG4gIG9uRGVzdHJveSgoKSA9PiB7XG4gICAgc3RvcmVWYWx1ZS5zZXQodW5kZWZpbmVkKTtcbiAgfSk7XG48L3NjcmlwdD4iLCJ7I2lmIHdyYXBwZWR9XG4gIDxzcGFuXG4gICAgYmluZDp0aGlzPXtlbGVtZW50fVxuICAgIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gICAgdXNlOmZvcndhcmRFdmVudHNcbiAgICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsJzogdHJ1ZSxcbiAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJzogZmxvYXRBYm92ZSxcbiAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwtLXJlcXVpcmVkJzogcmVxdWlyZWQsXG4gICAgICAuLi5pbnRlcm5hbENsYXNzZXMsXG4gICAgfSl9XG4gICAgc3R5bGU9e09iamVjdC5lbnRyaWVzKGludGVybmFsU3R5bGVzKVxuICAgICAgLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gYCR7bmFtZX06ICR7dmFsdWV9O2ApXG4gICAgICAuY29uY2F0KFtzdHlsZV0pXG4gICAgICAuam9pbignICcpfVxuICAgIHsuLi4kJHJlc3RQcm9wc30+PHNsb3QgLz48L3NwYW5cbiAgPlxuezplbHNlfVxuICA8bGFiZWxcbiAgICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gICAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgICB1c2U6Zm9yd2FyZEV2ZW50c1xuICAgIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwnOiB0cnVlLFxuICAgICAgJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnOiBmbG9hdEFib3ZlLFxuICAgICAgJ21kYy1mbG9hdGluZy1sYWJlbC0tcmVxdWlyZWQnOiByZXF1aXJlZCxcbiAgICAgIC4uLmludGVybmFsQ2xhc3NlcyxcbiAgICB9KX1cbiAgICBzdHlsZT17T2JqZWN0LmVudHJpZXMoaW50ZXJuYWxTdHlsZXMpXG4gICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgJHtuYW1lfTogJHt2YWx1ZX07YClcbiAgICAgIC5jb25jYXQoW3N0eWxlXSlcbiAgICAgIC5qb2luKCcgJyl9XG4gICAgZm9yPXtmb3JJZCB8fCAoaW5wdXRQcm9wcyA/IGlucHV0UHJvcHMuaWQgOiBudWxsKX1cbiAgICB7Li4uJCRyZXN0UHJvcHN9PjxzbG90IC8+PC9sYWJlbFxuICA+XG57L2lmfVxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbCc7XG4gIGltcG9ydCB7IG9uTW91bnQsIGdldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gICAgZGlzcGF0Y2gsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgc3R5bGUgPSAnJztcbiAgbGV0IGZvcklkID0gbnVsbDtcbiAgZXhwb3J0IHsgZm9ySWQgYXMgZm9yIH07XG4gIGV4cG9ydCBsZXQgZmxvYXRBYm92ZSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHJlcXVpcmVkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgd3JhcHBlZCA9IGZhbHNlO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW5zdGFuY2U7XG4gIGxldCBpbnRlcm5hbENsYXNzZXMgPSB7fTtcbiAgbGV0IGludGVybmFsU3R5bGVzID0ge307XG4gIGxldCBpbnB1dFByb3BzID0gZ2V0Q29udGV4dCgnU01VSTpnZW5lcmljOmlucHV0OnByb3BzJykgfHwge307XG5cbiAgbGV0IHByZXZpb3VzRmxvYXRBYm92ZSA9IGZsb2F0QWJvdmU7XG4gICQ6IGlmIChwcmV2aW91c0Zsb2F0QWJvdmUgIT09IGZsb2F0QWJvdmUpIHtcbiAgICBwcmV2aW91c0Zsb2F0QWJvdmUgPSBmbG9hdEFib3ZlO1xuICAgIGluc3RhbmNlLmZsb2F0KGZsb2F0QWJvdmUpO1xuICB9XG5cbiAgbGV0IHByZXZpb3VzUmVxdWlyZWQgPSByZXF1aXJlZDtcbiAgJDogaWYgKHByZXZpb3VzUmVxdWlyZWQgIT09IHJlcXVpcmVkKSB7XG4gICAgcHJldmlvdXNSZXF1aXJlZCA9IHJlcXVpcmVkO1xuICAgIGluc3RhbmNlLnNldFJlcXVpcmVkKHJlcXVpcmVkKTtcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc3RhbmNlID0gbmV3IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBnZXRXaWR0aDogKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGdldEVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKCdzbXVpLWZsb2F0aW5nLWxhYmVsLS1yZW1vdmUtdHJhbnNpdGlvbicpO1xuICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKCdzbXVpLWZsb2F0aW5nLWxhYmVsLS1mb3JjZS1zaXplJyk7XG4gICAgICAgIGNsb25lLmNsYXNzTGlzdC5yZW1vdmUoJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSBjbG9uZS5zY3JvbGxXaWR0aDtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9uZSk7XG4gICAgICAgIHJldHVybiBzY3JvbGxXaWR0aDtcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGdldEVsZW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3IgPSB7XG4gICAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnQoKTtcbiAgICAgIH0sXG4gICAgICBhZGRTdHlsZSxcbiAgICAgIHJlbW92ZVN0eWxlLFxuICAgIH07XG5cbiAgICBkaXNwYXRjaChlbGVtZW50LCAnU01VSTpmbG9hdGluZy1sYWJlbDptb3VudCcsIGFjY2Vzc29yKTtcblxuICAgIGluc3RhbmNlLmluaXQoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChlbGVtZW50LCAnU01VSTpmbG9hdGluZy1sYWJlbDp1bm1vdW50JywgYWNjZXNzb3IpO1xuXG4gICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCFpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghKGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXMpIHx8IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0eWxlKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGludGVybmFsU3R5bGVzW25hbWVdICE9IHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIGludGVybmFsU3R5bGVzW25hbWVdO1xuICAgICAgICBpbnRlcm5hbFN0eWxlcyA9IGludGVybmFsU3R5bGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJuYWxTdHlsZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVTdHlsZShuYW1lKSB7XG4gICAgaWYgKG5hbWUgaW4gaW50ZXJuYWxTdHlsZXMpIHtcbiAgICAgIGRlbGV0ZSBpbnRlcm5hbFN0eWxlc1tuYW1lXTtcbiAgICAgIGludGVybmFsU3R5bGVzID0gaW50ZXJuYWxTdHlsZXM7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNoYWtlKHNob3VsZFNoYWtlKSB7XG4gICAgaW5zdGFuY2Uuc2hha2Uoc2hvdWxkU2hha2UpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGZsb2F0KHNob3VsZEZsb2F0KSB7XG4gICAgZmxvYXRBYm92ZSA9IHNob3VsZEZsb2F0O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHNldFJlcXVpcmVkKGlzUmVxdWlyZWQpIHtcbiAgICByZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmdldFdpZHRoKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuPC9zY3JpcHQ+XG4iLCI8ZGl2XG4gIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgdXNlOmZvcndhcmRFdmVudHNcbiAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAnbWRjLWxpbmUtcmlwcGxlJzogdHJ1ZSxcbiAgICAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnOiBhY3RpdmUsXG4gICAgLi4uaW50ZXJuYWxDbGFzc2VzLFxuICB9KX1cbiAgc3R5bGU9e09iamVjdC5lbnRyaWVzKGludGVybmFsU3R5bGVzKVxuICAgIC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IGAke25hbWV9OiAke3ZhbHVlfTtgKVxuICAgIC5jb25jYXQoW3N0eWxlXSlcbiAgICAuam9pbignICcpfVxuICB7Li4uJCRyZXN0UHJvcHN9XG4vPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9saW5lLXJpcHBsZSc7XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgc3R5bGUgPSAnJztcbiAgZXhwb3J0IGxldCBhY3RpdmUgPSBmYWxzZTtcblxuICBsZXQgZWxlbWVudDtcbiAgbGV0IGluc3RhbmNlO1xuICBsZXQgaW50ZXJuYWxDbGFzc2VzID0ge307XG4gIGxldCBpbnRlcm5hbFN0eWxlcyA9IHt9O1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc3RhbmNlID0gbmV3IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBoYXNDbGFzcyxcbiAgICAgIHNldFN0eWxlOiBhZGRTdHlsZSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5pbml0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzXG4gICAgICA/IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdXG4gICAgICA6IGdldEVsZW1lbnQoKS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIShjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzKSB8fCBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdHlsZShuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpbnRlcm5hbFN0eWxlc1tuYW1lXSAhPSB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSBpbnRlcm5hbFN0eWxlc1tuYW1lXTtcbiAgICAgICAgaW50ZXJuYWxTdHlsZXMgPSBpbnRlcm5hbFN0eWxlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludGVybmFsU3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgIGluc3RhbmNlLmFjdGl2YXRlKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICBpbnN0YW5jZS5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2V0UmlwcGxlQ2VudGVyKHhDb29yZGluYXRlKSB7XG4gICAgaW5zdGFuY2Uuc2V0UmlwcGxlQ2VudGVyKHhDb29yZGluYXRlKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG48L3NjcmlwdD5cbiIsIjxkaXZcbiAgYmluZDp0aGlzPXtlbGVtZW50fVxuICB1c2U6dXNlQWN0aW9ucz17dXNlfVxuICB1c2U6Zm9yd2FyZEV2ZW50c1xuICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgIFtjbGFzc05hbWVdOiB0cnVlLFxuICAgICdtZGMtbm90Y2hlZC1vdXRsaW5lJzogdHJ1ZSxcbiAgICAnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZCc6IG5vdGNoZWQsXG4gICAgJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vLWxhYmVsJzogbm9MYWJlbCxcbiAgICAuLi5pbnRlcm5hbENsYXNzZXMsXG4gIH0pfVxuICBvbjpTTVVJOmZsb2F0aW5nLWxhYmVsOm1vdW50PXsoZXZlbnQpID0+IChmbG9hdGluZ0xhYmVsID0gZXZlbnQuZGV0YWlsKX1cbiAgb246U01VSTpmbG9hdGluZy1sYWJlbDp1bm1vdW50PXsoKSA9PiAoZmxvYXRpbmdMYWJlbCA9IHVuZGVmaW5lZCl9XG4gIHsuLi4kJHJlc3RQcm9wc31cbj5cbiAgPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2xlYWRpbmdcIiAvPlxuICB7I2lmICFub0xhYmVsfVxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fbm90Y2hcIlxuICAgICAgc3R5bGU9e09iamVjdC5lbnRyaWVzKG5vdGNoU3R5bGVzKVxuICAgICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgJHtuYW1lfTogJHt2YWx1ZX07YClcbiAgICAgICAgLmpvaW4oJyAnKX1cbiAgICA+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvZGl2PlxuICB7L2lmfVxuICA8ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fdHJhaWxpbmdcIiAvPlxuPC9kaXY+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUnO1xuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZ2V0X2N1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcbiAgaW1wb3J0IHtcbiAgICBmb3J3YXJkRXZlbnRzQnVpbGRlcixcbiAgICBjbGFzc01hcCxcbiAgICB1c2VBY3Rpb25zLFxuICB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG5cbiAgY29uc3QgZm9yd2FyZEV2ZW50cyA9IGZvcndhcmRFdmVudHNCdWlsZGVyKGdldF9jdXJyZW50X2NvbXBvbmVudCgpKTtcblxuICBleHBvcnQgbGV0IHVzZSA9IFtdO1xuICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gIGV4cG9ydCB7IGNsYXNzTmFtZSBhcyBjbGFzcyB9O1xuICBleHBvcnQgbGV0IG5vdGNoZWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBub0xhYmVsID0gZmFsc2U7XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGxldCBpbnN0YW5jZTtcbiAgbGV0IGZsb2F0aW5nTGFiZWw7XG4gIGxldCBpbnRlcm5hbENsYXNzZXMgPSB7fTtcbiAgbGV0IG5vdGNoU3R5bGVzID0ge307XG5cbiAgJDogaWYgKGZsb2F0aW5nTGFiZWwpIHtcbiAgICBmbG9hdGluZ0xhYmVsLmFkZFN0eWxlKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJzBzJyk7XG4gICAgYWRkQ2xhc3MoJ21kYy1ub3RjaGVkLW91dGxpbmUtLXVwZ3JhZGVkJyk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGZsb2F0aW5nTGFiZWwucmVtb3ZlU3R5bGUoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmVDbGFzcygnbWRjLW5vdGNoZWQtb3V0bGluZS0tdXBncmFkZWQnKTtcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc3RhbmNlID0gbmV3IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzcyxcbiAgICAgIHJlbW92ZUNsYXNzLFxuICAgICAgc2V0Tm90Y2hXaWR0aFByb3BlcnR5OiAod2lkdGgpID0+IGFkZE5vdGNoU3R5bGUoJ3dpZHRoJywgd2lkdGggKyAncHgnKSxcbiAgICAgIHJlbW92ZU5vdGNoV2lkdGhQcm9wZXJ0eTogKCkgPT4gcmVtb3ZlTm90Y2hTdHlsZSgnd2lkdGgnKSxcbiAgICB9KTtcblxuICAgIGluc3RhbmNlLmluaXQoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCFpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghKGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXMpIHx8IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE5vdGNoU3R5bGUobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAobm90Y2hTdHlsZXNbbmFtZV0gIT0gdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBkZWxldGUgbm90Y2hTdHlsZXNbbmFtZV07XG4gICAgICAgIG5vdGNoU3R5bGVzID0gbm90Y2hTdHlsZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3RjaFN0eWxlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU5vdGNoU3R5bGUobmFtZSkge1xuICAgIGlmIChuYW1lIGluIG5vdGNoU3R5bGVzKSB7XG4gICAgICBkZWxldGUgbm90Y2hTdHlsZXNbbmFtZV07XG4gICAgICBub3RjaFN0eWxlcyA9IG5vdGNoU3R5bGVzO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBub3RjaChub3RjaFdpZHRoKSB7XG4gICAgaW5zdGFuY2Uubm90Y2gobm90Y2hXaWR0aCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gY2xvc2VOb3RjaCgpIHtcbiAgICBpbnN0YW5jZS5jbG9zZU5vdGNoKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBjbGFzc0FkZGVyQnVpbGRlciB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG5pbXBvcnQgRGl2IGZyb20gJ0BzbXVpL2NvbW1vbi9EaXYuc3ZlbHRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3NBZGRlckJ1aWxkZXIoe1xuICBjbGFzczogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci1saW5lJyxcbiAgY29tcG9uZW50OiBEaXYsXG59KTtcbiIsImltcG9ydCB7IGNsYXNzQWRkZXJCdWlsZGVyIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcbmltcG9ydCBTcGFuIGZyb20gJ0BzbXVpL2NvbW1vbi9TcGFuLnN2ZWx0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzQWRkZXJCdWlsZGVyKHtcbiAgY2xhc3M6ICdtZGMtdGV4dC1maWVsZF9fYWZmaXggbWRjLXRleHQtZmllbGRfX2FmZml4LS1wcmVmaXgnLFxuICBjb21wb25lbnQ6IFNwYW4sXG59KTtcbiIsImltcG9ydCB7IGNsYXNzQWRkZXJCdWlsZGVyIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcbmltcG9ydCBTcGFuIGZyb20gJ0BzbXVpL2NvbW1vbi9TcGFuLnN2ZWx0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzQWRkZXJCdWlsZGVyKHtcbiAgY2xhc3M6ICdtZGMtdGV4dC1maWVsZF9fYWZmaXggbWRjLXRleHQtZmllbGRfX2FmZml4LS1zdWZmaXgnLFxuICBjb21wb25lbnQ6IFNwYW4sXG59KTtcbiIsIjxpbnB1dFxuICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gIHVzZTpmb3J3YXJkRXZlbnRzXG4gIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgJ21kYy10ZXh0LWZpZWxkX19pbnB1dCc6IHRydWUsXG4gIH0pfVxuICBvbjpjaGFuZ2U9eyhlKSA9PiAodHlwZSA9PT0gJ2ZpbGUnIHx8IHR5cGUgPT09ICdyYW5nZScpICYmIHZhbHVlVXBkYXRlcihlKX1cbiAgb246aW5wdXQ9eyhlKSA9PiB0eXBlICE9PSAnZmlsZScgJiYgdmFsdWVVcGRhdGVyKGUpfVxuICBvbjpjaGFuZ2U9e2NoYW5nZUhhbmRsZXJ9XG4gIHt0eXBlfVxuICB7cGxhY2Vob2xkZXJ9XG4gIHsuLi52YWx1ZVByb3B9XG4gIHsuLi5pbnRlcm5hbEF0dHJzfVxuICB7Li4uJCRyZXN0UHJvcHN9XG4vPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZ2V0X2N1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcbiAgaW1wb3J0IHtcbiAgICBmb3J3YXJkRXZlbnRzQnVpbGRlcixcbiAgICBjbGFzc01hcCxcbiAgICB1c2VBY3Rpb25zLFxuICB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG5cbiAgY29uc3QgZm9yd2FyZEV2ZW50cyA9IGZvcndhcmRFdmVudHNCdWlsZGVyKGdldF9jdXJyZW50X2NvbXBvbmVudCgpKTtcblxuICBleHBvcnQgbGV0IHVzZSA9IFtdO1xuICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gIGV4cG9ydCB7IGNsYXNzTmFtZSBhcyBjbGFzcyB9O1xuICBleHBvcnQgbGV0IHR5cGUgPSAndGV4dCc7XG4gIC8vIEFsd2F5cyBoYXZpbmcgYSBwbGFjZWhvbGRlciBmaXhlcyBTYWZhcmkncyBiYXNlbGluZSBhbGlnbm1lbnQuXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BoaWxpcHdhbHRvbi9mbGV4YnVncy9pc3N1ZXMvMjcwXG4gIGV4cG9ydCBsZXQgcGxhY2Vob2xkZXIgPSAnICc7XG4gIGV4cG9ydCBsZXQgdmFsdWUgPSAnJztcbiAgZXhwb3J0IGxldCBmaWxlcyA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBkaXJ0eSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGludmFsaWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCB1cGRhdGVJbnZhbGlkID0gdHJ1ZTtcblxuICBsZXQgZWxlbWVudDtcbiAgbGV0IGludGVybmFsQXR0cnMgPSB7fTtcbiAgbGV0IHZhbHVlUHJvcCA9IHt9O1xuXG4gICQ6IGlmICh0eXBlID09PSAnZmlsZScpIHtcbiAgICBkZWxldGUgdmFsdWVQcm9wLnZhbHVlO1xuICAgIHZhbHVlUHJvcCA9IHZhbHVlUHJvcDtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZVByb3AudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGlmICh1cGRhdGVJbnZhbGlkKSB7XG4gICAgICBpbnZhbGlkID0gZWxlbWVudC5tYXRjaGVzKCc6aW52YWxpZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICBjb25zdCBuYW4gPSBuZXcgTnVtYmVyKE51bWJlci5OYU4pO1xuICAgICAgbmFuLmxlbmd0aCA9IDA7XG4gICAgICByZXR1cm4gbmFuO1xuICAgIH1cbiAgICByZXR1cm4gK3ZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsdWVVcGRhdGVyKGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgIHZhbHVlID0gdG9OdW1iZXIoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICBmaWxlcyA9IGUudGFyZ2V0LmZpbGVzO1xuICAgICAgLy8gRmFsbCB0aHJvdWdoLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlSGFuZGxlcihlKSB7XG4gICAgZGlydHkgPSB0cnVlO1xuICAgIGlmICh1cGRhdGVJbnZhbGlkKSB7XG4gICAgICBpbnZhbGlkID0gZWxlbWVudC5tYXRjaGVzKCc6aW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSBpbiBpbnRlcm5hbEF0dHJzXG4gICAgICA/IGludGVybmFsQXR0cnNbbmFtZV1cbiAgICAgIDogZ2V0RWxlbWVudCgpLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhZGRBdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGludGVybmFsQXR0cnNbbmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICBpbnRlcm5hbEF0dHJzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobmFtZSkge1xuICAgIGlmICghKG5hbWUgaW4gaW50ZXJuYWxBdHRycykgfHwgaW50ZXJuYWxBdHRyc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICBpbnRlcm5hbEF0dHJzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICBnZXRFbGVtZW50KCkuZm9jdXMoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG48L3NjcmlwdD5cbiIsIjx0ZXh0YXJlYVxuICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gIHVzZTpmb3J3YXJkRXZlbnRzXG4gIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgJ21kYy10ZXh0LWZpZWxkX19pbnB1dCc6IHRydWUsXG4gIH0pfVxuICBzdHlsZT17YCR7cmVzaXphYmxlID8gJycgOiAncmVzaXplOiBub25lOyAnfSR7c3R5bGV9YH1cbiAgb246Y2hhbmdlPXtjaGFuZ2VIYW5kbGVyfVxuICBiaW5kOnZhbHVlXG4gIHsuLi5pbnRlcm5hbEF0dHJzfVxuICB7Li4uJCRyZXN0UHJvcHN9XG4vPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZ2V0X2N1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcbiAgaW1wb3J0IHtcbiAgICBmb3J3YXJkRXZlbnRzQnVpbGRlcixcbiAgICBjbGFzc01hcCxcbiAgICB1c2VBY3Rpb25zLFxuICB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG5cbiAgY29uc3QgZm9yd2FyZEV2ZW50cyA9IGZvcndhcmRFdmVudHNCdWlsZGVyKGdldF9jdXJyZW50X2NvbXBvbmVudCgpKTtcblxuICBleHBvcnQgbGV0IHVzZSA9IFtdO1xuICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gIGV4cG9ydCB7IGNsYXNzTmFtZSBhcyBjbGFzcyB9O1xuICBleHBvcnQgbGV0IHN0eWxlID0gJyc7XG4gIGV4cG9ydCBsZXQgdmFsdWUgPSAnJztcbiAgZXhwb3J0IGxldCBkaXJ0eSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGludmFsaWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCB1cGRhdGVJbnZhbGlkID0gdHJ1ZTtcbiAgZXhwb3J0IGxldCByZXNpemFibGUgPSB0cnVlO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW50ZXJuYWxBdHRycyA9IHt9O1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGlmICh1cGRhdGVJbnZhbGlkKSB7XG4gICAgICBpbnZhbGlkID0gZWxlbWVudC5tYXRjaGVzKCc6aW52YWxpZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY2hhbmdlSGFuZGxlcigpIHtcbiAgICBkaXJ0eSA9IHRydWU7XG4gICAgaWYgKHVwZGF0ZUludmFsaWQpIHtcbiAgICAgIGludmFsaWQgPSBlbGVtZW50Lm1hdGNoZXMoJzppbnZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHIobmFtZSkge1xuICAgIHJldHVybiBuYW1lIGluIGludGVybmFsQXR0cnNcbiAgICAgID8gaW50ZXJuYWxBdHRyc1tuYW1lXVxuICAgICAgOiBnZXRFbGVtZW50KCkuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFkZEF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaW50ZXJuYWxBdHRyc1tuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgaWYgKCEobmFtZSBpbiBpbnRlcm5hbEF0dHJzKSB8fCBpbnRlcm5hbEF0dHJzW25hbWVdICE9IG51bGwpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGdldEVsZW1lbnQoKS5mb2N1cygpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbjwvc2NyaXB0PlxuIiwieyNpZiB2YWx1ZWR9XG4gIDxsYWJlbFxuICAgIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgICB1c2U6UmlwcGxlPXt7XG4gICAgICByaXBwbGU6ICF0ZXh0YXJlYSAmJiB2YXJpYW50ID09PSAnZmlsbGVkJyxcbiAgICAgIHVuYm91bmRlZDogZmFsc2UsXG4gICAgICBhZGRDbGFzcyxcbiAgICAgIHJlbW92ZUNsYXNzLFxuICAgICAgYWRkU3R5bGUsXG4gICAgICBldmVudFRhcmdldDogaW5wdXRFbGVtZW50LFxuICAgICAgYWN0aXZlVGFyZ2V0OiBpbnB1dEVsZW1lbnQsXG4gICAgICBpbml0UHJvbWlzZSxcbiAgICB9fVxuICAgIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gICAgdXNlOmZvcndhcmRFdmVudHNcbiAgICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgICAnbWRjLXRleHQtZmllbGQnOiB0cnVlLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCc6IGRpc2FibGVkLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS10ZXh0YXJlYSc6IHRleHRhcmVhLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1maWxsZWQnOiB2YXJpYW50ID09PSAnZmlsbGVkJyxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnOiB2YXJpYW50ID09PSAnb3V0bGluZWQnLFxuICAgICAgJ3NtdWktdGV4dC1maWVsZC0tc3RhbmRhcmQnOiB2YXJpYW50ID09PSAnc3RhbmRhcmQnICYmICF0ZXh0YXJlYSxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0tbm8tbGFiZWwnOiBub0xhYmVsIHx8IChsYWJlbCA9PSBudWxsICYmICEkJHNsb3RzLmxhYmVsKSxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0tbGFiZWwtZmxvYXRpbmcnOlxuICAgICAgICBmb2N1c2VkIHx8ICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnJyksXG4gICAgICAnbWRjLXRleHQtZmllbGQtLXdpdGgtbGVhZGluZy1pY29uJzpcbiAgICAgICAgd2l0aExlYWRpbmdJY29uID09PSB1bmluaXRpYWxpemVkVmFsdWVcbiAgICAgICAgICA/ICQkc2xvdHMubGVhZGluZ0ljb25cbiAgICAgICAgICA6IHdpdGhMZWFkaW5nSWNvbixcbiAgICAgICdtZGMtdGV4dC1maWVsZC0td2l0aC10cmFpbGluZy1pY29uJzpcbiAgICAgICAgd2l0aFRyYWlsaW5nSWNvbiA9PT0gdW5pbml0aWFsaXplZFZhbHVlXG4gICAgICAgICAgPyAkJHNsb3RzLnRyYWlsaW5nSWNvblxuICAgICAgICAgIDogd2l0aFRyYWlsaW5nSWNvbixcbiAgICAgICdtZGMtdGV4dC1maWVsZC0td2l0aC1pbnRlcm5hbC1jb3VudGVyJzpcbiAgICAgICAgdGV4dGFyZWEgJiYgJCRzbG90cy5pbnRlcm5hbENvdW50ZXIsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWludmFsaWQnOiBpbnZhbGlkICE9PSB1bmluaXRpYWxpemVkVmFsdWUgJiYgaW52YWxpZCxcbiAgICAgIC4uLmludGVybmFsQ2xhc3NlcyxcbiAgICB9KX1cbiAgICBzdHlsZT17T2JqZWN0LmVudHJpZXMoaW50ZXJuYWxTdHlsZXMpXG4gICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgJHtuYW1lfTogJHt2YWx1ZX07YClcbiAgICAgIC5jb25jYXQoW3N0eWxlXSlcbiAgICAgIC5qb2luKCcgJyl9XG4gICAgZm9yPXsvKiBzdXBwcmVzcyBhMTF5IHdhcm5pbmcsIHNpbmNlIHRoaXMgaXMgd3JhcHBlZCAqLyBudWxsfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmxlYWRpbmctaWNvbjptb3VudD17KGV2ZW50KSA9PlxuICAgICAgKGxlYWRpbmdJY29uID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDpsZWFkaW5nLWljb246dW5tb3VudD17KCkgPT4gKGxlYWRpbmdJY29uID0gdW5kZWZpbmVkKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDp0cmFpbGluZy1pY29uOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAodHJhaWxpbmdJY29uID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDp0cmFpbGluZy1pY29uOnVubW91bnQ9eygpID0+ICh0cmFpbGluZ0ljb24gPSB1bmRlZmluZWQpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmNoYXJhY3Rlci1jb3VudGVyOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAoY2hhcmFjdGVyQ291bnRlciA9IGV2ZW50LmRldGFpbCl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6Y2hhcmFjdGVyLWNvdW50ZXI6dW5tb3VudD17KCkgPT5cbiAgICAgIChjaGFyYWN0ZXJDb3VudGVyID0gdW5kZWZpbmVkKX1cbiAgICB7Li4uZXhjbHVkZSgkJHJlc3RQcm9wcywgW1xuICAgICAgJ2lucHV0JCcsXG4gICAgICAnbGFiZWwkJyxcbiAgICAgICdyaXBwbGUkJyxcbiAgICAgICdvdXRsaW5lJCcsXG4gICAgICAnaGVscGVyTGluZSQnLFxuICAgIF0pfVxuICA+XG4gICAgeyNpZiAhdGV4dGFyZWEgJiYgdmFyaWFudCAhPT0gJ291dGxpbmVkJ31cbiAgICAgIHsjaWYgdmFyaWFudCA9PT0gJ2ZpbGxlZCd9XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWRjLXRleHQtZmllbGRfX3JpcHBsZVwiIC8+XG4gICAgICB7L2lmfVxuICAgICAgeyNpZiAhbm9MYWJlbCAmJiAobGFiZWwgIT0gbnVsbCB8fCAkJHNsb3RzLmxhYmVsKX1cbiAgICAgICAgPEZsb2F0aW5nTGFiZWxcbiAgICAgICAgICBiaW5kOnRoaXM9e2Zsb2F0aW5nTGFiZWx9XG4gICAgICAgICAgZmxvYXRBYm92ZT17Zm9jdXNlZCB8fCAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycpfVxuICAgICAgICAgIHtyZXF1aXJlZH1cbiAgICAgICAgICB3cmFwcGVkXG4gICAgICAgICAgey4uLnByZWZpeEZpbHRlcigkJHJlc3RQcm9wcywgJ2xhYmVsJCcpfVxuICAgICAgICAgID57bGFiZWwgPT0gbnVsbCA/ICcnIDogbGFiZWx9PHNsb3QgbmFtZT1cImxhYmVsXCIgLz48L0Zsb2F0aW5nTGFiZWxcbiAgICAgICAgPlxuICAgICAgey9pZn1cbiAgICB7L2lmfVxuICAgIHsjaWYgdGV4dGFyZWEgfHwgdmFyaWFudCA9PT0gJ291dGxpbmVkJ31cbiAgICAgIDxOb3RjaGVkT3V0bGluZVxuICAgICAgICBiaW5kOnRoaXM9e25vdGNoZWRPdXRsaW5lfVxuICAgICAgICBub0xhYmVsPXtub0xhYmVsIHx8IChsYWJlbCA9PSBudWxsICYmICEkJHNsb3RzLmxhYmVsKX1cbiAgICAgICAgey4uLnByZWZpeEZpbHRlcigkJHJlc3RQcm9wcywgJ291dGxpbmUkJyl9XG4gICAgICA+XG4gICAgICAgIHsjaWYgIW5vTGFiZWwgJiYgKGxhYmVsICE9IG51bGwgfHwgJCRzbG90cy5sYWJlbCl9XG4gICAgICAgICAgPEZsb2F0aW5nTGFiZWxcbiAgICAgICAgICAgIGJpbmQ6dGhpcz17ZmxvYXRpbmdMYWJlbH1cbiAgICAgICAgICAgIGZsb2F0QWJvdmU9e2ZvY3VzZWQgfHwgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09ICcnKX1cbiAgICAgICAgICAgIHtyZXF1aXJlZH1cbiAgICAgICAgICAgIHdyYXBwZWRcbiAgICAgICAgICAgIHsuLi5wcmVmaXhGaWx0ZXIoJCRyZXN0UHJvcHMsICdsYWJlbCQnKX1cbiAgICAgICAgICAgID57bGFiZWwgPT0gbnVsbCA/ICcnIDogbGFiZWx9PHNsb3QgbmFtZT1cImxhYmVsXCIgLz48L0Zsb2F0aW5nTGFiZWxcbiAgICAgICAgICA+XG4gICAgICAgIHsvaWZ9XG4gICAgICA8L05vdGNoZWRPdXRsaW5lPlxuICAgIHsvaWZ9XG4gICAgPENvbnRleHRGcmFnbWVudCBrZXk9XCJTTVVJOnRleHRmaWVsZDppY29uOmxlYWRpbmdcIiB2YWx1ZT17dHJ1ZX0+XG4gICAgICA8c2xvdCBuYW1lPVwibGVhZGluZ0ljb25cIiAvPlxuICAgIDwvQ29udGV4dEZyYWdtZW50PlxuICAgIDxzbG90IC8+XG4gICAgeyNpZiB0ZXh0YXJlYX1cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgICAgICAgJ21kYy10ZXh0LWZpZWxkX19yZXNpemVyJzpcbiAgICAgICAgICAgICEoJ2lucHV0JHJlc2l6YWJsZScgaW4gJCRyZXN0UHJvcHMpIHx8ICQkcmVzdFByb3BzLmlucHV0JHJlc2l6YWJsZSxcbiAgICAgICAgfSl9XG4gICAgICA+XG4gICAgICAgIDxUZXh0YXJlYVxuICAgICAgICAgIGJpbmQ6dGhpcz17aW5wdXR9XG4gICAgICAgICAge2Rpc2FibGVkfVxuICAgICAgICAgIHtyZXF1aXJlZH1cbiAgICAgICAgICBiaW5kOnZhbHVlXG4gICAgICAgICAgYmluZDpkaXJ0eVxuICAgICAgICAgIGJpbmQ6aW52YWxpZFxuICAgICAgICAgIHt1cGRhdGVJbnZhbGlkfVxuICAgICAgICAgIG9uOmJsdXI9eygpID0+IChmb2N1c2VkID0gZmFsc2UpfVxuICAgICAgICAgIG9uOmZvY3VzPXsoKSA9PiAoZm9jdXNlZCA9IHRydWUpfVxuICAgICAgICAgIG9uOmJsdXJcbiAgICAgICAgICBvbjpmb2N1c1xuICAgICAgICAgIGFyaWEtY29udHJvbHM9e2hlbHBlcklkfVxuICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e2hlbHBlcklkfVxuICAgICAgICAgIHsuLi5wcmVmaXhGaWx0ZXIoJCRyZXN0UHJvcHMsICdpbnB1dCQnKX1cbiAgICAgICAgLz5cbiAgICAgICAgPHNsb3QgbmFtZT1cImludGVybmFsQ291bnRlclwiIC8+XG4gICAgICA8L3NwYW4+XG4gICAgezplbHNlfVxuICAgICAgPHNsb3QgbmFtZT1cInByZWZpeFwiIC8+XG4gICAgICB7I2lmIHByZWZpeCAhPSBudWxsfVxuICAgICAgICA8UHJlZml4PntwcmVmaXh9PC9QcmVmaXg+XG4gICAgICB7L2lmfVxuICAgICAgPElucHV0XG4gICAgICAgIGJpbmQ6dGhpcz17aW5wdXR9XG4gICAgICAgIHt0eXBlfVxuICAgICAgICB7ZGlzYWJsZWR9XG4gICAgICAgIHtyZXF1aXJlZH1cbiAgICAgICAgYmluZDp2YWx1ZVxuICAgICAgICBiaW5kOmZpbGVzXG4gICAgICAgIGJpbmQ6ZGlydHlcbiAgICAgICAgYmluZDppbnZhbGlkXG4gICAgICAgIHt1cGRhdGVJbnZhbGlkfVxuICAgICAgICBvbjpibHVyPXsoKSA9PiAoZm9jdXNlZCA9IGZhbHNlKX1cbiAgICAgICAgb246Zm9jdXM9eygpID0+IChmb2N1c2VkID0gdHJ1ZSl9XG4gICAgICAgIG9uOmJsdXJcbiAgICAgICAgb246Zm9jdXNcbiAgICAgICAgYXJpYS1jb250cm9scz17aGVscGVySWR9XG4gICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9e2hlbHBlcklkfVxuICAgICAgICB7Li4ubm9MYWJlbCAmJiBsYWJlbCAhPSBudWxsID8geyBwbGFjZWhvbGRlcjogbGFiZWwgfSA6IHt9fVxuICAgICAgICB7Li4ucHJlZml4RmlsdGVyKCQkcmVzdFByb3BzLCAnaW5wdXQkJyl9XG4gICAgICAvPlxuICAgICAgeyNpZiBzdWZmaXggIT0gbnVsbH1cbiAgICAgICAgPFN1ZmZpeD57c3VmZml4fTwvU3VmZml4PlxuICAgICAgey9pZn1cbiAgICAgIDxzbG90IG5hbWU9XCJzdWZmaXhcIiAvPlxuICAgIHsvaWZ9XG4gICAgPENvbnRleHRGcmFnbWVudCBrZXk9XCJTTVVJOnRleHRmaWVsZDppY29uOmxlYWRpbmdcIiB2YWx1ZT17ZmFsc2V9PlxuICAgICAgPHNsb3QgbmFtZT1cInRyYWlsaW5nSWNvblwiIC8+XG4gICAgPC9Db250ZXh0RnJhZ21lbnQ+XG4gICAgeyNpZiAhdGV4dGFyZWEgJiYgdmFyaWFudCAhPT0gJ291dGxpbmVkJyAmJiByaXBwbGV9XG4gICAgICA8TGluZVJpcHBsZVxuICAgICAgICBiaW5kOnRoaXM9e2xpbmVSaXBwbGV9XG4gICAgICAgIHsuLi5wcmVmaXhGaWx0ZXIoJCRyZXN0UHJvcHMsICdyaXBwbGUkJyl9XG4gICAgICAvPlxuICAgIHsvaWZ9XG4gIDwvbGFiZWw+XG57OmVsc2V9XG4gIDxkaXZcbiAgICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gICAgdXNlOlJpcHBsZT17e1xuICAgICAgcmlwcGxlLFxuICAgICAgdW5ib3VuZGVkOiBmYWxzZSxcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBhZGRTdHlsZSxcbiAgICB9fVxuICAgIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gICAgdXNlOmZvcndhcmRFdmVudHNcbiAgICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgICAnbWRjLXRleHQtZmllbGQnOiB0cnVlLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1kaXNhYmxlZCc6IGRpc2FibGVkLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS10ZXh0YXJlYSc6IHRleHRhcmVhLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1maWxsZWQnOiB2YXJpYW50ID09PSAnZmlsbGVkJyxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0tb3V0bGluZWQnOiB2YXJpYW50ID09PSAnb3V0bGluZWQnLFxuICAgICAgJ3NtdWktdGV4dC1maWVsZC0tc3RhbmRhcmQnOiB2YXJpYW50ID09PSAnc3RhbmRhcmQnICYmICF0ZXh0YXJlYSxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0tbm8tbGFiZWwnOiBub0xhYmVsIHx8ICEkJHNsb3RzLmxhYmVsLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbic6ICQkc2xvdHMubGVhZGluZ0ljb24sXG4gICAgICAnbWRjLXRleHQtZmllbGQtLXdpdGgtdHJhaWxpbmctaWNvbic6ICQkc2xvdHMudHJhaWxpbmdJY29uLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1pbnZhbGlkJzogaW52YWxpZCAhPT0gdW5pbml0aWFsaXplZFZhbHVlICYmIGludmFsaWQsXG4gICAgICAuLi5pbnRlcm5hbENsYXNzZXMsXG4gICAgfSl9XG4gICAgc3R5bGU9e09iamVjdC5lbnRyaWVzKGludGVybmFsU3R5bGVzKVxuICAgICAgLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gYCR7bmFtZX06ICR7dmFsdWV9O2ApXG4gICAgICAuY29uY2F0KFtzdHlsZV0pXG4gICAgICAuam9pbignICcpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmxlYWRpbmctaWNvbjptb3VudD17KGV2ZW50KSA9PlxuICAgICAgKGxlYWRpbmdJY29uID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDpsZWFkaW5nLWljb246dW5tb3VudD17KCkgPT4gKGxlYWRpbmdJY29uID0gdW5kZWZpbmVkKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDp0cmFpbGluZy1pY29uOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAodHJhaWxpbmdJY29uID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDp0cmFpbGluZy1pY29uOnVubW91bnQ9eygpID0+ICh0cmFpbGluZ0ljb24gPSB1bmRlZmluZWQpfVxuICAgIHsuLi5leGNsdWRlKCQkcmVzdFByb3BzLCBbXG4gICAgICAnaW5wdXQkJyxcbiAgICAgICdsYWJlbCQnLFxuICAgICAgJ3JpcHBsZSQnLFxuICAgICAgJ291dGxpbmUkJyxcbiAgICAgICdoZWxwZXJMaW5lJCcsXG4gICAgXSl9XG4gID5cbiAgICA8c2xvdCBuYW1lPVwibGFiZWxcIiAvPlxuICAgIDxDb250ZXh0RnJhZ21lbnQga2V5PVwiU01VSTp0ZXh0ZmllbGQ6aWNvbjpsZWFkaW5nXCIgdmFsdWU9e3RydWV9PlxuICAgICAgPHNsb3QgbmFtZT1cImxlYWRpbmdJY29uXCIgLz5cbiAgICA8L0NvbnRleHRGcmFnbWVudD5cbiAgICA8c2xvdCAvPlxuICAgIDxDb250ZXh0RnJhZ21lbnQga2V5PVwiU01VSTp0ZXh0ZmllbGQ6aWNvbjpsZWFkaW5nXCIgdmFsdWU9e2ZhbHNlfT5cbiAgICAgIDxzbG90IG5hbWU9XCJ0cmFpbGluZ0ljb25cIiAvPlxuICAgIDwvQ29udGV4dEZyYWdtZW50PlxuICAgIDxzbG90IG5hbWU9XCJyaXBwbGVcIiAvPlxuICA8L2Rpdj5cbnsvaWZ9XG57I2lmICQkc2xvdHMuaGVscGVyfVxuICA8SGVscGVyTGluZVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmhlbHBlci10ZXh0OmlkPXsoZXZlbnQpID0+IChoZWxwZXJJZCA9IGV2ZW50LmRldGFpbCl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6bW91bnQ9eyhldmVudCkgPT4gKGhlbHBlclRleHQgPSBldmVudC5kZXRhaWwpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmhlbHBlci10ZXh0OnVubW91bnQ9eygpID0+IHtcbiAgICAgIGhlbHBlcklkID0gdW5kZWZpbmVkO1xuICAgICAgaGVscGVyVGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9fVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmNoYXJhY3Rlci1jb3VudGVyOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAoY2hhcmFjdGVyQ291bnRlciA9IGV2ZW50LmRldGFpbCl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6Y2hhcmFjdGVyLWNvdW50ZXI6dW5tb3VudD17KCkgPT5cbiAgICAgIChjaGFyYWN0ZXJDb3VudGVyID0gdW5kZWZpbmVkKX1cbiAgICB7Li4ucHJlZml4RmlsdGVyKCQkcmVzdFByb3BzLCAnaGVscGVyTGluZSQnKX1cbiAgICA+PHNsb3QgbmFtZT1cImhlbHBlclwiIC8+PC9IZWxwZXJMaW5lXG4gID5cbnsvaWZ9XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkJztcbiAgaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnQG1hdGVyaWFsL2RvbSc7XG4gIGltcG9ydCB7IG9uTW91bnQsIG9uRGVzdHJveSwgZ2V0Q29udGV4dCwgdGljayB9IGZyb20gJ3N2ZWx0ZSc7XG4gIGltcG9ydCB7IGdldF9jdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCc7XG4gIGltcG9ydCB7XG4gICAgZm9yd2FyZEV2ZW50c0J1aWxkZXIsXG4gICAgY2xhc3NNYXAsXG4gICAgZXhjbHVkZSxcbiAgICBwcmVmaXhGaWx0ZXIsXG4gICAgdXNlQWN0aW9ucyxcbiAgfSBmcm9tICdAc211aS9jb21tb24vaW50ZXJuYWwuanMnO1xuICBpbXBvcnQgQ29udGV4dEZyYWdtZW50IGZyb20gJ0BzbXVpL2NvbW1vbi9Db250ZXh0RnJhZ21lbnQuc3ZlbHRlJztcbiAgaW1wb3J0IFJpcHBsZSBmcm9tICdAc211aS9yaXBwbGUnO1xuICBpbXBvcnQgRmxvYXRpbmdMYWJlbCBmcm9tICdAc211aS9mbG9hdGluZy1sYWJlbC9GbG9hdGluZ0xhYmVsLnN2ZWx0ZSc7XG4gIGltcG9ydCBMaW5lUmlwcGxlIGZyb20gJ0BzbXVpL2xpbmUtcmlwcGxlL0xpbmVSaXBwbGUuc3ZlbHRlJztcbiAgaW1wb3J0IE5vdGNoZWRPdXRsaW5lIGZyb20gJ0BzbXVpL25vdGNoZWQtb3V0bGluZS9Ob3RjaGVkT3V0bGluZS5zdmVsdGUnO1xuICBpbXBvcnQgSGVscGVyTGluZSBmcm9tICcuL0hlbHBlckxpbmUuanMnO1xuICBpbXBvcnQgUHJlZml4IGZyb20gJy4vUHJlZml4LmpzJztcbiAgaW1wb3J0IFN1ZmZpeCBmcm9tICcuL1N1ZmZpeC5qcyc7XG4gIGltcG9ydCBJbnB1dCBmcm9tICcuL0lucHV0LnN2ZWx0ZSc7XG4gIGltcG9ydCBUZXh0YXJlYSBmcm9tICcuL1RleHRhcmVhLnN2ZWx0ZSc7XG4gIGNvbnN0IHsgYXBwbHlQYXNzaXZlIH0gPSBldmVudHM7XG5cbiAgY29uc3QgZm9yd2FyZEV2ZW50cyA9IGZvcndhcmRFdmVudHNCdWlsZGVyKGdldF9jdXJyZW50X2NvbXBvbmVudCgpKTtcbiAgbGV0IHVuaW5pdGlhbGl6ZWRWYWx1ZSA9ICgpID0+IHt9O1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgc3R5bGUgPSAnJztcbiAgZXhwb3J0IGxldCByaXBwbGUgPSB0cnVlO1xuICBleHBvcnQgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgcmVxdWlyZWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCB0ZXh0YXJlYSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHZhcmlhbnQgPSB0ZXh0YXJlYSA/ICdvdXRsaW5lZCcgOiAnc3RhbmRhcmQnO1xuICBleHBvcnQgbGV0IG5vTGFiZWwgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBsYWJlbCA9IG51bGw7XG4gIGV4cG9ydCBsZXQgdHlwZSA9ICd0ZXh0JztcbiAgZXhwb3J0IGxldCB2YWx1ZSA9IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgZXhwb3J0IGxldCBmaWxlcyA9IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgZXhwb3J0IGxldCBkaXJ0eSA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGludmFsaWQgPSB1bmluaXRpYWxpemVkVmFsdWU7XG4gIGV4cG9ydCBsZXQgcHJlZml4ID0gbnVsbDtcbiAgZXhwb3J0IGxldCBzdWZmaXggPSBudWxsO1xuICBleHBvcnQgbGV0IHVwZGF0ZUludmFsaWQgPSBpbnZhbGlkID09PSB1bmluaXRpYWxpemVkVmFsdWU7XG4gIGV4cG9ydCBsZXQgdmFsaWRhdGVPblZhbHVlQ2hhbmdlID0gdXBkYXRlSW52YWxpZDtcbiAgZXhwb3J0IGxldCB1c2VOYXRpdmVWYWxpZGF0aW9uID0gdXBkYXRlSW52YWxpZDtcbiAgZXhwb3J0IGxldCB3aXRoTGVhZGluZ0ljb24gPSB1bmluaXRpYWxpemVkVmFsdWU7XG4gIGV4cG9ydCBsZXQgd2l0aFRyYWlsaW5nSWNvbiA9IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcblxuICAvLyBDb21wb25lbnRzXG4gIGV4cG9ydCBsZXQgaW5wdXQgPSB1bmRlZmluZWQ7XG4gIGV4cG9ydCBsZXQgZmxvYXRpbmdMYWJlbCA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBsaW5lUmlwcGxlID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IG5vdGNoZWRPdXRsaW5lID0gdW5kZWZpbmVkO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW5zdGFuY2U7XG4gIGxldCBpbnRlcm5hbENsYXNzZXMgPSB7fTtcbiAgbGV0IGludGVybmFsU3R5bGVzID0ge307XG4gIGxldCBoZWxwZXJJZDtcbiAgbGV0IGZvY3VzZWQgPSBmYWxzZTtcbiAgbGV0IGFkZExheW91dExpc3RlbmVyID0gZ2V0Q29udGV4dCgnU01VSTphZGRMYXlvdXRMaXN0ZW5lcicpO1xuICBsZXQgcmVtb3ZlTGF5b3V0TGlzdGVuZXI7XG4gIGxldCBpbml0UHJvbWlzZVJlc29sdmU7XG4gIGxldCBpbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiAoaW5pdFByb21pc2VSZXNvbHZlID0gcmVzb2x2ZSkpO1xuICAvLyBUaGVzZSBhcmUgaW5zdGFuY2VzLCBub3QgYWNjZXNzb3JzLlxuICBsZXQgbGVhZGluZ0ljb247XG4gIGxldCB0cmFpbGluZ0ljb247XG4gIGxldCBoZWxwZXJUZXh0O1xuICBsZXQgY2hhcmFjdGVyQ291bnRlcjtcblxuICAkOiB2YWx1ZWQgPSB2YWx1ZSAhPT0gdW5pbml0aWFsaXplZFZhbHVlIHx8IGZpbGVzICE9PSB1bmluaXRpYWxpemVkVmFsdWU7XG4gICQ6IGlucHV0RWxlbWVudCA9IGlucHV0ICYmIGlucHV0LmdldEVsZW1lbnQoKTtcblxuICAkOiBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UuaXNWYWxpZCgpICE9PSAhaW52YWxpZCkge1xuICAgIGlmICh1cGRhdGVJbnZhbGlkKSB7XG4gICAgICBpbnZhbGlkID0gIWluc3RhbmNlLmlzVmFsaWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2Uuc2V0VmFsaWQoIWludmFsaWQpO1xuICAgIH1cbiAgfVxuXG4gICQ6IGlmIChcbiAgICBpbnN0YW5jZSAmJlxuICAgIGluc3RhbmNlLmdldFZhbGlkYXRlT25WYWx1ZUNoYW5nZSgpICE9PSB2YWxpZGF0ZU9uVmFsdWVDaGFuZ2VcbiAgKSB7XG4gICAgaW5zdGFuY2Uuc2V0VmFsaWRhdGVPblZhbHVlQ2hhbmdlKFxuICAgICAgdmFsaWRhdGVPblZhbHVlQ2hhbmdlID09PSB1bmluaXRpYWxpemVkVmFsdWVcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHZhbGlkYXRlT25WYWx1ZUNoYW5nZVxuICAgICk7XG4gIH1cblxuICAkOiBpZiAoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZS5zZXRVc2VOYXRpdmVWYWxpZGF0aW9uKHVzZU5hdGl2ZVZhbGlkYXRpb24pO1xuICB9XG5cbiAgJDogaWYgKGluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2Uuc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xuICB9XG5cbiAgLy8gUmVhY3QgdG8gY2hhbmdlcyBvZiB2YWx1ZSBmcm9tIG91dHNpZGUgY29tcG9uZW50LlxuICBsZXQgcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAkOiBpZiAoaW5zdGFuY2UgJiYgdmFsdWVkICYmIHByZXZpb3VzVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgIC8vIENoZWNrIHRoZSBkYXRhIGlzIGZsb3dpbmcgZG93bi5cbiAgICBpZiAoaW5zdGFuY2UuZ2V0VmFsdWUoKSAhPT0gdmFsdWUpIHtcbiAgICAgIGluc3RhbmNlLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWRkTGF5b3V0TGlzdGVuZXIpIHtcbiAgICByZW1vdmVMYXlvdXRMaXN0ZW5lciA9IGFkZExheW91dExpc3RlbmVyKGxheW91dCk7XG4gIH1cblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBpbnN0YW5jZSA9IG5ldyBNRENUZXh0RmllbGRGb3VuZGF0aW9uKFxuICAgICAge1xuICAgICAgICAvLyBnZXRSb290QWRhcHRlck1ldGhvZHNfXG4gICAgICAgIGFkZENsYXNzLFxuICAgICAgICByZW1vdmVDbGFzcyxcbiAgICAgICAgaGFzQ2xhc3MsXG4gICAgICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICBnZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICAgICAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgICAgZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgICAgIHJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2V0QXR0cmlidXRlc0xpc3QgPSAobXV0YXRpb25zTGlzdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG11dGF0aW9uc0xpc3RcbiAgICAgICAgICAgICAgLm1hcCgobXV0YXRpb24pID0+IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpXG4gICAgICAgICAgICAgIC5maWx0ZXIoKGF0dHJpYnV0ZU5hbWUpID0+IGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zTGlzdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZU5hdGl2ZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgaGFuZGxlcihnZXRBdHRyaWJ1dGVzTGlzdChtdXRhdGlvbnNMaXN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlIH07XG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpbnB1dC5nZXRFbGVtZW50KCksIGNvbmZpZyk7XG4gICAgICAgICAgcmV0dXJuIG9ic2VydmVyO1xuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZXRJbnB1dEFkYXB0ZXJNZXRob2RzX1xuICAgICAgICBnZXROYXRpdmVJbnB1dDogKCkgPT4gaW5wdXQuZ2V0RWxlbWVudCgpLFxuICAgICAgICBzZXRJbnB1dEF0dHI6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIGlucHV0LmFkZEF0dHIobmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVJbnB1dEF0dHI6IChuYW1lKSA9PiB7XG4gICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cihuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNGb2N1c2VkOiAoKSA9PiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnB1dC5nZXRFbGVtZW50KCksXG4gICAgICAgIHJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgaW5wdXQuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpO1xuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgaW5wdXRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50KClcbiAgICAgICAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZXRMYWJlbEFkYXB0ZXJNZXRob2RzX1xuICAgICAgICBmbG9hdExhYmVsOiAoc2hvdWxkRmxvYXQpID0+XG4gICAgICAgICAgZmxvYXRpbmdMYWJlbCAmJiBmbG9hdGluZ0xhYmVsLmZsb2F0KHNob3VsZEZsb2F0KSxcbiAgICAgICAgZ2V0TGFiZWxXaWR0aDogKCkgPT4gKGZsb2F0aW5nTGFiZWwgPyBmbG9hdGluZ0xhYmVsLmdldFdpZHRoKCkgOiAwKSxcbiAgICAgICAgaGFzTGFiZWw6ICgpID0+ICEhZmxvYXRpbmdMYWJlbCxcbiAgICAgICAgc2hha2VMYWJlbDogKHNob3VsZFNoYWtlKSA9PlxuICAgICAgICAgIGZsb2F0aW5nTGFiZWwgJiYgZmxvYXRpbmdMYWJlbC5zaGFrZShzaG91bGRTaGFrZSksXG4gICAgICAgIHNldExhYmVsUmVxdWlyZWQ6IChpc1JlcXVpcmVkKSA9PlxuICAgICAgICAgIGZsb2F0aW5nTGFiZWwgJiYgZmxvYXRpbmdMYWJlbC5zZXRSZXF1aXJlZChpc1JlcXVpcmVkKSxcblxuICAgICAgICAvLyBnZXRMaW5lUmlwcGxlQWRhcHRlck1ldGhvZHNfXG4gICAgICAgIGFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4gbGluZVJpcHBsZSAmJiBsaW5lUmlwcGxlLmFjdGl2YXRlKCksXG5cbiAgICAgICAgZGVhY3RpdmF0ZUxpbmVSaXBwbGU6ICgpID0+IGxpbmVSaXBwbGUgJiYgbGluZVJpcHBsZS5kZWFjdGl2YXRlKCksXG5cbiAgICAgICAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbjogKG5vcm1hbGl6ZWRYKSA9PlxuICAgICAgICAgIGxpbmVSaXBwbGUgJiYgbGluZVJpcHBsZS5zZXRSaXBwbGVDZW50ZXIobm9ybWFsaXplZFgpLFxuXG4gICAgICAgIC8vIGdldE91dGxpbmVBZGFwdGVyTWV0aG9kc19cbiAgICAgICAgY2xvc2VPdXRsaW5lOiAoKSA9PiBub3RjaGVkT3V0bGluZSAmJiBub3RjaGVkT3V0bGluZS5jbG9zZU5vdGNoKCksXG4gICAgICAgIGhhc091dGxpbmU6ICgpID0+ICEhbm90Y2hlZE91dGxpbmUsXG4gICAgICAgIG5vdGNoT3V0bGluZTogKGxhYmVsV2lkdGgpID0+XG4gICAgICAgICAgbm90Y2hlZE91dGxpbmUgJiYgbm90Y2hlZE91dGxpbmUubm90Y2gobGFiZWxXaWR0aCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBnZXQgaGVscGVyVGV4dCgpIHtcbiAgICAgICAgICByZXR1cm4gaGVscGVyVGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNoYXJhY3RlckNvdW50ZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIGNoYXJhY3RlckNvdW50ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsZWFkaW5nSWNvbigpIHtcbiAgICAgICAgICByZXR1cm4gbGVhZGluZ0ljb247XG4gICAgICAgIH0sXG4gICAgICAgIGdldCB0cmFpbGluZ0ljb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYWlsaW5nSWNvbjtcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKHZhbHVlZCkge1xuICAgICAgaW5zdGFuY2UuaW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWNrKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGluc3RhbmNlLmluaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRQcm9taXNlUmVzb2x2ZSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9KTtcblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmIChyZW1vdmVMYXlvdXRMaXN0ZW5lcikge1xuICAgICAgcmVtb3ZlTGF5b3V0TGlzdGVuZXIoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzXG4gICAgICA/IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdXG4gICAgICA6IGdldEVsZW1lbnQoKS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIShjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzKSB8fCBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRTdHlsZShuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpbnRlcm5hbFN0eWxlc1tuYW1lXSAhPSB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSBpbnRlcm5hbFN0eWxlc1tuYW1lXTtcbiAgICAgICAgaW50ZXJuYWxTdHlsZXMgPSBpbnRlcm5hbFN0eWxlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludGVybmFsU3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gbGF5b3V0KCkge1xuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgY29uc3Qgb3Blbk5vdGNoID0gaW5zdGFuY2Uuc2hvdWxkRmxvYXQ7XG4gICAgICBpbnN0YW5jZS5ub3RjaE91dGxpbmUob3Blbk5vdGNoKTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuPC9zY3JpcHQ+XG4iLCI8ZGl2XG4gIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgdXNlOmZvcndhcmRFdmVudHNcbiAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQnOiB0cnVlLFxuICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dC0tcGVyc2lzdGVudCc6IHBlcnNpc3RlbnQsXG4gICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS12YWxpZGF0aW9uLW1zZyc6IHZhbGlkYXRpb25Nc2csXG4gICAgLi4uaW50ZXJuYWxDbGFzc2VzLFxuICB9KX1cbiAgYXJpYS1oaWRkZW49e3BlcnNpc3RlbnQgPyBudWxsIDogJ3RydWUnfVxuICB7aWR9XG4gIHsuLi5pbnRlcm5hbEF0dHJzfVxuICB7Li4uJCRyZXN0UHJvcHN9XG4+XG4gIHsjaWYgY29udGVudCA9PSBudWxsfTxzbG90IC8+ezplbHNlfXtjb250ZW50fXsvaWZ9XG48L2Rpdj5cblxuPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gIGxldCBjb3VudGVyID0gMDtcbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQnO1xuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZ2V0X2N1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcbiAgaW1wb3J0IHtcbiAgICBmb3J3YXJkRXZlbnRzQnVpbGRlcixcbiAgICBjbGFzc01hcCxcbiAgICB1c2VBY3Rpb25zLFxuICAgIGRpc3BhdGNoLFxuICB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG5cbiAgY29uc3QgZm9yd2FyZEV2ZW50cyA9IGZvcndhcmRFdmVudHNCdWlsZGVyKGdldF9jdXJyZW50X2NvbXBvbmVudCgpKTtcblxuICBleHBvcnQgbGV0IHVzZSA9IFtdO1xuICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gIGV4cG9ydCB7IGNsYXNzTmFtZSBhcyBjbGFzcyB9O1xuICBleHBvcnQgbGV0IGlkID0gJ1NNVUktdGV4dGZpZWxkLWhlbHBlci10ZXh0LScgKyBjb3VudGVyKys7XG4gIGV4cG9ydCBsZXQgcGVyc2lzdGVudCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHZhbGlkYXRpb25Nc2cgPSBmYWxzZTtcblxuICBsZXQgZWxlbWVudDtcbiAgbGV0IGluc3RhbmNlO1xuICBsZXQgaW50ZXJuYWxDbGFzc2VzID0ge307XG4gIGxldCBpbnRlcm5hbEF0dHJzID0ge307XG4gIGxldCBjb250ZW50ID0gbnVsbDtcblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBpbnN0YW5jZSA9IG5ldyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzcyxcbiAgICAgIHJlbW92ZUNsYXNzLFxuICAgICAgaGFzQ2xhc3MsXG4gICAgICBnZXRBdHRyLFxuICAgICAgc2V0QXR0cjogYWRkQXR0cixcbiAgICAgIHJlbW92ZUF0dHIsXG4gICAgICBzZXRDb250ZW50OiAodmFsdWUpID0+IHtcbiAgICAgICAgY29udGVudCA9IHZhbHVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChpZC5zdGFydHNXaXRoKCdTTVVJLXRleHRmaWVsZC1oZWxwZXItdGV4dC0nKSkge1xuICAgICAgZGlzcGF0Y2goZ2V0RWxlbWVudCgpLCAnU01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6aWQnLCBpZCk7XG4gICAgfVxuICAgIGRpc3BhdGNoKGdldEVsZW1lbnQoKSwgJ1NNVUk6dGV4dGZpZWxkOmhlbHBlci10ZXh0Om1vdW50JywgaW5zdGFuY2UpO1xuXG4gICAgaW5zdGFuY2UuaW5pdCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGdldEVsZW1lbnQoKSwgJ1NNVUk6dGV4dGZpZWxkOmhlbHBlci10ZXh0OnVubW91bnQnLCBpbnN0YW5jZSk7XG5cbiAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lIGluIGludGVybmFsQ2xhc3Nlc1xuICAgICAgPyBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXVxuICAgICAgOiBnZXRFbGVtZW50KCkuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIWludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIGluIGludGVybmFsQ2xhc3NlcykgfHwgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXR0cihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUgaW4gaW50ZXJuYWxBdHRyc1xuICAgICAgPyBpbnRlcm5hbEF0dHJzW25hbWVdXG4gICAgICA6IGdldEVsZW1lbnQoKS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRBdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGludGVybmFsQXR0cnNbbmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICBpbnRlcm5hbEF0dHJzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgaWYgKCEobmFtZSBpbiBpbnRlcm5hbEF0dHJzKSB8fCBpbnRlcm5hbEF0dHJzW25hbWVdICE9IG51bGwpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbjwvc2NyaXB0PlxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsLnRyaW0oKS5sZW5ndGggPT09IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRW1haWwodmFsKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcclxuICAgICAgICBcIlthLXowLTkhIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiXHJcbiAgICApLnRlc3QodmFsKTtcclxufVxyXG4iLCI8c2NyaXB0PlxyXG4gICAgaW1wb3J0IHsgb25Nb3VudCwgb25EZXN0cm95IH0gZnJvbSAnc3ZlbHRlJztcclxuICAgIGltcG9ydCB1c2VycyBmcm9tICcuLi8uLi9zdG9yZS91c2Vycy1zdG9yZSc7XHJcbiAgICBpbXBvcnQgeyBnb3RvIH0gZnJvbSAnQHNhcHBlci9hcHAnO1xyXG4gICAgaW1wb3J0IFRleHRmaWVsZCBmcm9tICdAc211aS90ZXh0ZmllbGQnO1xyXG4gICAgaW1wb3J0IEhlbHBlclRleHQgZnJvbSAnQHNtdWkvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2luZGV4JztcclxuICAgIGltcG9ydCBCdXR0b24sIHsgTGFiZWwgfSBmcm9tICdAc211aS9idXR0b24nO1xyXG4gICAgaW1wb3J0IHsgaXNFbXB0eSwgaXNWYWxpZEVtYWlsIH0gZnJvbSAnLi4vLi4vaGVscGVycy92YWxpZGF0aW9uJztcclxuICAgXHJcbiAgICBleHBvcnQgbGV0IGlkID0gbnVsbDtcclxuXHJcbiAgICBsZXQgbmV4dElkID0gbnVsbDtcclxuICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAnJztcclxuICAgIGxldCBlbWFpbCA9ICcnO1xyXG4gICAgbGV0IHdlYnNpdGUgPSAnJztcclxuICAgIGxldCB1bnN1YnNjcmliZTtcclxuXHJcbiAgICBvbk1vdW50KCgpID0+IHtcclxuICAgICAgICB1bnN1YnNjcmliZSA9IHVzZXJzLnN1YnNjcmliZShpdGVtcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXNlciA9IGl0ZW1zLmZpbmQoaSA9PiBpLmlkID09PSBpZCk7XHJcblxyXG4gICAgICAgICAgICBuZXh0SWQgPSBpdGVtcy5sZW5ndGggKyAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVXNlcikge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlbGVjdGVkVXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSBzZWxlY3RlZFVzZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICBlbWFpbCA9IHNlbGVjdGVkVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIHdlYnNpdGUgPSBzZWxlY3RlZFVzZXIud2Vic2l0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICBvbkRlc3Ryb3koKCkgPT4ge1xyXG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xyXG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJDogbmFtZVZhbGlkID0gIWlzRW1wdHkobmFtZSk7XHJcbiAgICAkOiB1c2VybmFtZVZhbGlkID0gIWlzRW1wdHkodXNlcm5hbWUpO1xyXG4gICAgJDogZW1haWxWYWxpZCA9IGlzVmFsaWRFbWFpbChlbWFpbCk7XHJcbiAgICAkOiB3ZWJzaXRlVmFsaWQgPSAhaXNFbXB0eSh3ZWJzaXRlKTtcclxuICAgICQ6IGZvcm1Jc1ZhbGlkID0gbmFtZVZhbGlkICYmXHJcbiAgICAgICAgdXNlcm5hbWVWYWxpZCAmJlxyXG4gICAgICAgIGVtYWlsVmFsaWQgJiZcclxuICAgICAgICB3ZWJzaXRlVmFsaWQ7XHJcblxyXG4gICAgZnVuY3Rpb24gb25TdWJtaXQoKSB7XHJcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICB3ZWJzaXRlOiB3ZWJzaXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIHVzZXJzLnVwZGF0ZVVzZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1c2Vycy5hZGRVc2VyKHsgLi4udXNlckRhdGEsIGlkOiBuZXh0SWQgfSk7XHJcbiAgICAgICAgICAgIGdvdG8oJy91c2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxkaXYgY2xhc3M9XCJ3LTUwIG0tYXV0b1wiPlxyXG4gICAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgICBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9XCJ7b25TdWJtaXR9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnMgbWFyZ2luc1wiPlxyXG4gICAgICAgICAgICA8VGV4dGZpZWxkIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXHJcbiAgICAgICAgICAgICAgICBiaW5kOnZhbHVlPXtuYW1lfVxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJOYW1lXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8SGVscGVyVGV4dCB2YWxpZGF0aW9uTXNnIHNsb3Q9XCJoZWxwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICBOYW1lIGlzIFJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICA8L0hlbHBlclRleHQ+XHJcbiAgICAgICAgICAgIDwvVGV4dGZpZWxkPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPFRleHRmaWVsZCB2YXJpYW50PVwib3V0bGluZWRcIlxyXG4gICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17dXNlcm5hbWV9XHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlVzZXJuYW1lXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8SGVscGVyVGV4dCB2YWxpZGF0aW9uTXNnIHNsb3Q9XCJoZWxwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSBpcyBSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgPC9IZWxwZXJUZXh0PlxyXG4gICAgICAgICAgICA8L1RleHRmaWVsZD5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxUZXh0ZmllbGQgdmFyaWFudD1cIm91dGxpbmVkXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgICAgICBiaW5kOnZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRS1NYWlsXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8SGVscGVyVGV4dCB2YWxpZGF0aW9uTXNnIHNsb3Q9XCJoZWxwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICBUaGF0J3Mgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgPC9IZWxwZXJUZXh0PlxyXG4gICAgICAgICAgICA8L1RleHRmaWVsZD5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxUZXh0ZmllbGQgdmFyaWFudD1cIm91dGxpbmVkXCJcclxuICAgICAgICAgICAgICAgIGJpbmQ6dmFsdWU9e3dlYnNpdGV9XHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIldlYnNpdGVcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ3LTEwMFwiXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxIZWxwZXJUZXh0IHZhbGlkYXRpb25Nc2cgc2xvdD1cImhlbHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFdlYnNpdGUgaXMgUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgIDwvSGVscGVyVGV4dD5cclxuICAgICAgICAgICAgPC9UZXh0ZmllbGQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Zvcm0+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cInctNTAgbS1hdXRvIGQtZmxleFwiPlxyXG4gICAgPEJ1dHRvbiB2YXJpYW50PVwicmFpc2VkXCJcclxuICAgICAgICBjbGFzcz1cInctNTAgbS01cHhcIlxyXG4gICAgICAgIGRpc2FibGVkPVwieyFmb3JtSXNWYWxpZH1cIlxyXG4gICAgICAgIG9uOmNsaWNrPXtvblN1Ym1pdH0+XHJcbiAgICAgICAgPExhYmVsPlNhdmU8L0xhYmVsPlxyXG4gICAgPC9CdXR0b24+XHJcbiAgICBcclxuICAgIDxCdXR0b24gdmFyaWFudD1cIm91dGxpbmVkXCJcclxuICAgICAgICBjbGFzcz1cInctNTAgbS01cHhcIlxyXG4gICAgICAgIGhyZWY9XCIvdXNlclwiPlxyXG4gICAgICAgIDxMYWJlbD5DYW5jZWw8L0xhYmVsPlxyXG4gICAgPC9CdXR0b24+XHJcbjwvZGl2PlxyXG4iXSwibmFtZXMiOlsiY3NzQ2xhc3NlcyIsInN0cmluZ3MiLCJudW1iZXJzIiwidXNlcnMiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBSUEsWUFBVSxHQUFHO0FBQ3hCLElBQUksaUJBQWlCLEVBQUUsaUNBQWlDO0FBQ3hELElBQUksY0FBYyxFQUFFLDhCQUE4QjtBQUNsRCxJQUFJLFdBQVcsRUFBRSwyQkFBMkI7QUFDNUMsSUFBSSxJQUFJLEVBQUUsb0JBQW9CO0FBQzlCLENBQUM7O0FDM0JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUEsSUFBSSwwQkFBMEIsa0JBQWtCLFVBQVUsTUFBTSxFQUFFO0FBQ2xFLElBQUksU0FBUyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELElB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
