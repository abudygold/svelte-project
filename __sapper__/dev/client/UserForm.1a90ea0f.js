import { _ as __extends, Y as __assign, $ as MDCFoundation, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, u as create_slot, v as validate_slots, a3 as validate_store, a4 as component_subscribe, a5 as setContext, a8 as onDestroy, aa as writable, ab as set_store_value, E as update_slot, H as transition_in, I as transition_out, x as compute_rest_props, y as forwardEventsBuilder, z as get_current_component, O as getContext, a6 as onMount, a7 as dispatch, w as assign, A as exclude_internal_props, N as classMap, B as useActions, Q as empty, k as insert_dev, V as group_outros, X as check_outros, g as detach_dev, K as binding_callbacks, e as element, c as claim_element, b as children, C as set_attributes, j as add_location, D as action_destroyer, F as get_spread_update, G as is_function, J as run_all, n as noop, h as attr_dev, o as space, p as claim_space, l as append_dev, ac as listen_dev, an as classAdderBuilder, ao as Div, am as Span, ap as set_input_value, a2 as compute_slots, aq as tick, ar as events, aj as Ripple, P as create_component, R as claim_component, T as mount_component, U as get_spread_object, W as destroy_component, as as bubble, ad as bind, t as text, f as claim_text, m as set_data_dev, af as add_flush_callback, a1 as globals } from './client.ce997a5d.js';
import { e as exclude, p as prefixFilter, B as Button_1, c as customUsers, C as CommonLabel } from './CommonLabel.c4903fb6.js';

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

/* src\components\User\UserForm.svelte generated by Svelte v3.38.3 */

const { console: console_1 } = globals;
const file = "src\\components\\User\\UserForm.svelte";

// (35:12) <HelperText slot="helper">
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
		source: "(35:12) <HelperText slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (35:12) 
function create_helper_slot_3(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(35:12) ",
		ctx
	});

	return block;
}

// (45:12) <HelperText slot="helper">
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
		source: "(45:12) <HelperText slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (45:12) 
function create_helper_slot_2(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(45:12) ",
		ctx
	});

	return block;
}

// (55:12) <HelperText slot="helper">
function create_default_slot_5(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("E-Mail is Required");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "E-Mail is Required");
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
		source: "(55:12) <HelperText slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (55:12) 
function create_helper_slot_1(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(55:12) ",
		ctx
	});

	return block;
}

// (65:12) <HelperText slot="helper">
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
		source: "(65:12) <HelperText slot=\\\"helper\\\">",
		ctx
	});

	return block;
}

// (65:12) 
function create_helper_slot(ctx) {
	let helpertext;
	let current;

	helpertext = new HelperText({
			props: {
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(65:12) ",
		ctx
	});

	return block;
}

// (73:12) <Label>
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
		source: "(73:12) <Label>",
		ctx
	});

	return block;
}

// (72:8) <Button on:click={() => console.log('clicked!')} variant="raised" class="w-50">
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(72:8) <Button on:click={() => console.log('clicked!')} variant=\\\"raised\\\" class=\\\"w-50\\\">",
		ctx
	});

	return block;
}

// (77:12) <Label>
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
		source: "(77:12) <Label>",
		ctx
	});

	return block;
}

// (76:8) <Button on:click={() => console.log('clicked!')} variant="outlined" class="w-50">
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

			if (dirty & /*$$scope*/ 2048) {
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
		source: "(76:8) <Button on:click={() => console.log('clicked!')} variant=\\\"outlined\\\" class=\\\"w-50\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
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
	let div1;
	let button0;
	let t4;
	let button1;
	let current;

	function textfield0_value_binding(value) {
		/*textfield0_value_binding*/ ctx[5](value);
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
		/*textfield1_value_binding*/ ctx[6](value);
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
		/*textfield2_value_binding*/ ctx[7](value);
	}

	let textfield2_props = {
		variant: "outlined",
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
		/*textfield3_value_binding*/ ctx[8](value);
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
				class: "w-50",
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button0.$on("click", /*click_handler*/ ctx[9]);

	button1 = new Button_1({
			props: {
				variant: "outlined",
				class: "w-50",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button1.$on("click", /*click_handler_1*/ ctx[10]);

	const block = {
		c: function create() {
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
			div1 = element("div");
			create_component(button0.$$.fragment);
			t4 = space();
			create_component(button1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			form = claim_element(nodes, "FORM", { class: true });
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
			t3 = claim_space(form_nodes);
			div1 = claim_element(form_nodes, "DIV", {});
			var div1_nodes = children(div1);
			claim_component(button0.$$.fragment, div1_nodes);
			t4 = claim_space(div1_nodes);
			claim_component(button1.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			form_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "columns margins");
			add_location(div0, file, 28, 4, 746);
			add_location(div1, file, 70, 4, 1927);
			attr_dev(form, "class", "w-50 m-auto");
			add_location(form, file, 27, 0, 714);
		},
		m: function mount(target, anchor) {
			insert_dev(target, form, anchor);
			append_dev(form, div0);
			mount_component(textfield0, div0, null);
			append_dev(div0, t0);
			mount_component(textfield1, div0, null);
			append_dev(div0, t1);
			mount_component(textfield2, div0, null);
			append_dev(div0, t2);
			mount_component(textfield3, div0, null);
			append_dev(form, t3);
			append_dev(form, div1);
			mount_component(button0, div1, null);
			append_dev(div1, t4);
			mount_component(button1, div1, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const textfield0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textfield0_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value && dirty & /*name*/ 1) {
				updating_value = true;
				textfield0_changes.value = /*name*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			textfield0.$set(textfield0_changes);
			const textfield1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textfield1_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_1 && dirty & /*username*/ 2) {
				updating_value_1 = true;
				textfield1_changes.value = /*username*/ ctx[1];
				add_flush_callback(() => updating_value_1 = false);
			}

			textfield1.$set(textfield1_changes);
			const textfield2_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textfield2_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_2 && dirty & /*email*/ 4) {
				updating_value_2 = true;
				textfield2_changes.value = /*email*/ ctx[2];
				add_flush_callback(() => updating_value_2 = false);
			}

			textfield2.$set(textfield2_changes);
			const textfield3_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				textfield3_changes.$$scope = { dirty, ctx };
			}

			if (!updating_value_3 && dirty & /*website*/ 8) {
				updating_value_3 = true;
				textfield3_changes.value = /*website*/ ctx[3];
				add_flush_callback(() => updating_value_3 = false);
			}

			textfield3.$set(textfield3_changes);
			const button0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
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
			if (detaching) detach_dev(form);
			destroy_component(textfield0);
			destroy_component(textfield1);
			destroy_component(textfield2);
			destroy_component(textfield3);
			destroy_component(button0);
			destroy_component(button1);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("UserForm", slots, []);
	let { id = null } = $$props;
	let name = "";
	let username = "";
	let email = "";
	let website = "";

	if (id) {
		const unsubscribe = customUsers.subscribe(items => {
			const selectedUser = items.find(i => i.id === id);
			$$invalidate(0, name = selectedUser.name);
			$$invalidate(1, username = selectedUser.username);
			$$invalidate(2, email = selectedUser.email);
			$$invalidate(3, website = selectedUser.website);
		});

		unsubscribe();
	}

	const writable_props = ["id"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<UserForm> was created with unknown prop '${key}'`);
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

	const click_handler = () => console.log("clicked!");
	const click_handler_1 = () => console.log("clicked!");

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(4, id = $$props.id);
	};

	$$self.$capture_state = () => ({
		users: customUsers,
		Textfield,
		HelperText,
		Button: Button_1,
		Label: CommonLabel,
		id,
		name,
		username,
		email,
		website
	});

	$$self.$inject_state = $$props => {
		if ("id" in $$props) $$invalidate(4, id = $$props.id);
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("username" in $$props) $$invalidate(1, username = $$props.username);
		if ("email" in $$props) $$invalidate(2, email = $$props.email);
		if ("website" in $$props) $$invalidate(3, website = $$props.website);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		name,
		username,
		email,
		website,
		id,
		textfield0_value_binding,
		textfield1_value_binding,
		textfield2_value_binding,
		textfield3_value_binding,
		click_handler,
		click_handler_1
	];
}

class UserForm extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { id: 4 });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckZvcm0uMWE5MGVhMGYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lLXJpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvZm91bmRhdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2NvbnN0YW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvY29tbW9uL0NvbnRleHRGcmFnbWVudC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvZmxvYXRpbmctbGFiZWwvRmxvYXRpbmdMYWJlbC5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvbGluZS1yaXBwbGUvTGluZVJpcHBsZS5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvbm90Y2hlZC1vdXRsaW5lL05vdGNoZWRPdXRsaW5lLnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvSGVscGVyTGluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvUHJlZml4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9TdWZmaXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNtdWkvdGV4dGZpZWxkL0lucHV0LnN2ZWx0ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac211aS90ZXh0ZmllbGQvVGV4dGFyZWEuc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9UZXh0ZmllbGQuc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzbXVpL3RleHRmaWVsZC9oZWxwZXItdGV4dC9IZWxwZXJUZXh0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VzZXIvVXNlckZvcm0uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuZXhwb3J0IHZhciBjc3NDbGFzc2VzID0ge1xuICAgIExBQkVMX0ZMT0FUX0FCT1ZFOiAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZScsXG4gICAgTEFCRUxfUkVRVUlSRUQ6ICdtZGMtZmxvYXRpbmctbGFiZWwtLXJlcXVpcmVkJyxcbiAgICBMQUJFTF9TSEFLRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tc2hha2UnLFxuICAgIFJPT1Q6ICdtZGMtZmxvYXRpbmctbGFiZWwnLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7IF9fYXNzaWduLCBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE1EQ0ZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7IGNzc0NsYXNzZXMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG52YXIgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKGFkYXB0ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgX19hc3NpZ24oX19hc3NpZ24oe30sIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyKSwgYWRhcHRlcikpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5oYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8oKTsgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24sIFwiY3NzQ2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24sIFwiZGVmYXVsdEFkYXB0ZXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2VlIHtAbGluayBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm4gdHlwZXMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBnZXRXaWR0aDogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgICAgICAgICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYW5pbWF0aW9uZW5kJywgdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB9O1xuICAgIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIuZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYW5pbWF0aW9uZW5kJywgdGhpcy5zaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgICAqL1xuICAgIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXRXaWR0aCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBwcm9kdWNlIGEgc2hha2UgYW5pbWF0aW9uIHRvIGluZGljYXRlIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSBzaG91bGRTaGFrZSBJZiB0cnVlLCBhZGRzIHRoZSBzaGFrZSBDU1MgY2xhc3M7IG90aGVyd2lzZSwgcmVtb3ZlcyBzaGFrZSBjbGFzcy5cbiAgICAgKi9cbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuc2hha2UgPSBmdW5jdGlvbiAoc2hvdWxkU2hha2UpIHtcbiAgICAgICAgdmFyIExBQkVMX1NIQUtFID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5MQUJFTF9TSEFLRTtcbiAgICAgICAgaWYgKHNob3VsZFNoYWtlKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKExBQkVMX1NIQUtFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBmbG9hdCBvciBkb2NrLlxuICAgICAqIEBwYXJhbSBzaG91bGRGbG9hdCBJZiB0cnVlLCBhZGRzIHRoZSBmbG9hdCBDU1MgY2xhc3M7IG90aGVyd2lzZSwgcmVtb3ZlcyBmbG9hdCBhbmQgc2hha2UgY2xhc3NlcyB0byBkb2NrIHRoZSBsYWJlbC5cbiAgICAgKi9cbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiAoc2hvdWxkRmxvYXQpIHtcbiAgICAgICAgdmFyIF9hID0gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24uY3NzQ2xhc3NlcywgTEFCRUxfRkxPQVRfQUJPVkUgPSBfYS5MQUJFTF9GTE9BVF9BQk9WRSwgTEFCRUxfU0hBS0UgPSBfYS5MQUJFTF9TSEFLRTtcbiAgICAgICAgaWYgKHNob3VsZEZsb2F0KSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoTEFCRUxfRkxPQVRfQUJPVkUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0eWxlcyB0aGUgbGFiZWwgYXMgcmVxdWlyZWQuXG4gICAgICogQHBhcmFtIGlzUmVxdWlyZWQgSWYgdHJ1ZSwgYWRkcyBhbiBhc3RlcmlzayB0byB0aGUgbGFiZWwsIGluZGljYXRpbmcgdGhhdCBpdCBpcyByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0UmVxdWlyZWQgPSBmdW5jdGlvbiAoaXNSZXF1aXJlZCkge1xuICAgICAgICB2YXIgTEFCRUxfUkVRVUlSRUQgPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzLkxBQkVMX1JFUVVJUkVEO1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKExBQkVMX1JFUVVJUkVEKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9SRVFVSVJFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVTaGFrZUFuaW1hdGlvbkVuZF8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBMQUJFTF9TSEFLRSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXMuTEFCRUxfU0hBS0U7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfTtcbiAgICByZXR1cm4gTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb247XG59KE1EQ0ZvdW5kYXRpb24pKTtcbmV4cG9ydCB7IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIH07XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVmYXVsdC1leHBvcnQgTmVlZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggTURDIFdlYiB2MC40NC4wIGFuZCBlYXJsaWVyLlxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xudmFyIGNzc0NsYXNzZXMgPSB7XG4gICAgTElORV9SSVBQTEVfQUNUSVZFOiAnbWRjLWxpbmUtcmlwcGxlLS1hY3RpdmUnLFxuICAgIExJTkVfUklQUExFX0RFQUNUSVZBVElORzogJ21kYy1saW5lLXJpcHBsZS0tZGVhY3RpdmF0aW5nJyxcbn07XG5leHBvcnQgeyBjc3NDbGFzc2VzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5pbXBvcnQgeyBfX2Fzc2lnbiwgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBjc3NDbGFzc2VzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xudmFyIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNRENMaW5lUmlwcGxlRm91bmRhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNRENMaW5lUmlwcGxlRm91bmRhdGlvbihhZGFwdGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciksIGFkYXB0ZXIpKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSBmdW5jdGlvbiAoZXZ0KSB7IHJldHVybiBfdGhpcy5oYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCk7IH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uLCBcImNzc0NsYXNzZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uLCBcImRlZmF1bHRBZGFwdGVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlZSB7QGxpbmsgTURDTGluZVJpcHBsZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuIHR5cGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXMgTWV0aG9kcyBzaG91bGQgYmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGFkYXB0ZXIgaW50ZXJmYWNlLlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICAgICAgICAgIHNldFN0eWxlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgfTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgfTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0FDVElWRSk7XG4gICAgfTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0UmlwcGxlQ2VudGVyID0gZnVuY3Rpb24gKHhDb29yZGluYXRlKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5zZXRTdHlsZSgndHJhbnNmb3JtLW9yaWdpbicsIHhDb29yZGluYXRlICsgXCJweCBjZW50ZXJcIik7XG4gICAgfTtcbiAgICBNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICB9O1xuICAgIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBXYWl0IGZvciB0aGUgbGluZSByaXBwbGUgdG8gYmUgZWl0aGVyIHRyYW5zcGFyZW50IG9yIG9wYXF1ZVxuICAgICAgICAvLyBiZWZvcmUgZW1pdHRpbmcgdGhlIGFuaW1hdGlvbiBlbmQgZXZlbnRcbiAgICAgICAgdmFyIGlzRGVhY3RpdmF0aW5nID0gdGhpcy5hZGFwdGVyLmhhc0NsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcbiAgICAgICAgaWYgKGV2dC5wcm9wZXJ0eU5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgICAgICAgaWYgKGlzRGVhY3RpdmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTURDTGluZVJpcHBsZUZvdW5kYXRpb247XG59KE1EQ0ZvdW5kYXRpb24pKTtcbmV4cG9ydCB7IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIH07XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVmYXVsdC1leHBvcnQgTmVlZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggTURDIFdlYiB2MC40NC4wIGFuZCBlYXJsaWVyLlxuZXhwb3J0IGRlZmF1bHQgTURDTGluZVJpcHBsZUZvdW5kYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xudmFyIHN0cmluZ3MgPSB7XG4gICAgTk9UQ0hfRUxFTUVOVF9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lX19ub3RjaCcsXG59O1xudmFyIG51bWJlcnMgPSB7XG4gICAgLy8gVGhpcyBzaG91bGQgc3RheSBpbiBzeW5jIHdpdGggJG1kYy1ub3RjaGVkLW91dGxpbmUtcGFkZGluZyAqIDIuXG4gICAgTk9UQ0hfRUxFTUVOVF9QQURESU5HOiA4LFxufTtcbnZhciBjc3NDbGFzc2VzID0ge1xuICAgIE5PX0xBQkVMOiAnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm8tbGFiZWwnLFxuICAgIE9VVExJTkVfTk9UQ0hFRDogJ21kYy1ub3RjaGVkLW91dGxpbmUtLW5vdGNoZWQnLFxuICAgIE9VVExJTkVfVVBHUkFERUQ6ICdtZGMtbm90Y2hlZC1vdXRsaW5lLS11cGdyYWRlZCcsXG59O1xuZXhwb3J0IHsgY3NzQ2xhc3NlcywgbnVtYmVycywgc3RyaW5ncyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuaW1wb3J0IHsgX19hc3NpZ24sIF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgTURDRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHsgY3NzQ2xhc3NlcywgbnVtYmVycywgc3RyaW5ncyB9IGZyb20gJy4vY29uc3RhbnRzJztcbnZhciBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24oYWRhcHRlcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgX19hc3NpZ24oX19hc3NpZ24oe30sIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciksIGFkYXB0ZXIpKSB8fCB0aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLCBcInN0cmluZ3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24sIFwibnVtYmVyc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLCBcImRlZmF1bHRBZGFwdGVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlZSB7QGxpbmsgTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVybiB0eXBlcy5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzIE1ldGhvZHMgc2hvdWxkIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBhZGFwdGVyIGludGVyZmFjZS5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHNldE5vdGNoV2lkdGhQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIHJlbW92ZU5vdGNoV2lkdGhQcm9wZXJ0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBvdXRsaW5lIG5vdGNoZWQgc2VsZWN0b3IgYW5kIHVwZGF0ZXMgdGhlIG5vdGNoIHdpZHRoIGNhbGN1bGF0ZWQgYmFzZWQgb2ZmIG9mIG5vdGNoV2lkdGguXG4gICAgICovXG4gICAgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLnByb3RvdHlwZS5ub3RjaCA9IGZ1bmN0aW9uIChub3RjaFdpZHRoKSB7XG4gICAgICAgIHZhciBPVVRMSU5FX05PVENIRUQgPSBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PVVRMSU5FX05PVENIRUQ7XG4gICAgICAgIGlmIChub3RjaFdpZHRoID4gMCkge1xuICAgICAgICAgICAgbm90Y2hXaWR0aCArPSBudW1iZXJzLk5PVENIX0VMRU1FTlRfUEFERElORzsgLy8gQWRkIHBhZGRpbmcgZnJvbSBsZWZ0L3JpZ2h0LlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRhcHRlci5zZXROb3RjaFdpZHRoUHJvcGVydHkobm90Y2hXaWR0aCk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5hZGRDbGFzcyhPVVRMSU5FX05PVENIRUQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBub3RjaGVkIG91dGxpbmUgc2VsZWN0b3IgdG8gY2xvc2UgdGhlIG5vdGNoIGluIHRoZSBvdXRsaW5lLlxuICAgICAqL1xuICAgIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5wcm90b3R5cGUuY2xvc2VOb3RjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIE9VVExJTkVfTk9UQ0hFRCA9IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9VVExJTkVfTk9UQ0hFRDtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKE9VVExJTkVfTk9UQ0hFRCk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVOb3RjaFdpZHRoUHJvcGVydHkoKTtcbiAgICB9O1xuICAgIHJldHVybiBNRENOb3RjaGVkT3V0bGluZUZvdW5kYXRpb247XG59KE1EQ0ZvdW5kYXRpb24pKTtcbmV4cG9ydCB7IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cbmV4cG9ydCBkZWZhdWx0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvdW5kYXRpb24uanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG52YXIgc3RyaW5ncyA9IHtcbiAgICBBUklBX0NPTlRST0xTOiAnYXJpYS1jb250cm9scycsXG4gICAgQVJJQV9ERVNDUklCRURCWTogJ2FyaWEtZGVzY3JpYmVkYnknLFxuICAgIElOUFVUX1NFTEVDVE9SOiAnLm1kYy10ZXh0LWZpZWxkX19pbnB1dCcsXG4gICAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgICBMRUFESU5HX0lDT05fU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2ljb24tLWxlYWRpbmcnLFxuICAgIExJTkVfUklQUExFX1NFTEVDVE9SOiAnLm1kYy1saW5lLXJpcHBsZScsXG4gICAgT1VUTElORV9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lJyxcbiAgICBQUkVGSVhfU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2FmZml4LS1wcmVmaXgnLFxuICAgIFNVRkZJWF9TRUxFQ1RPUjogJy5tZGMtdGV4dC1maWVsZF9fYWZmaXgtLXN1ZmZpeCcsXG4gICAgVFJBSUxJTkdfSUNPTl9TRUxFQ1RPUjogJy5tZGMtdGV4dC1maWVsZF9faWNvbi0tdHJhaWxpbmcnXG59O1xudmFyIGNzc0NsYXNzZXMgPSB7XG4gICAgRElTQUJMRUQ6ICdtZGMtdGV4dC1maWVsZC0tZGlzYWJsZWQnLFxuICAgIEZPQ1VTRUQ6ICdtZGMtdGV4dC1maWVsZC0tZm9jdXNlZCcsXG4gICAgSEVMUEVSX0xJTkU6ICdtZGMtdGV4dC1maWVsZC1oZWxwZXItbGluZScsXG4gICAgSU5WQUxJRDogJ21kYy10ZXh0LWZpZWxkLS1pbnZhbGlkJyxcbiAgICBMQUJFTF9GTE9BVElORzogJ21kYy10ZXh0LWZpZWxkLS1sYWJlbC1mbG9hdGluZycsXG4gICAgTk9fTEFCRUw6ICdtZGMtdGV4dC1maWVsZC0tbm8tbGFiZWwnLFxuICAgIE9VVExJTkVEOiAnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJyxcbiAgICBST09UOiAnbWRjLXRleHQtZmllbGQnLFxuICAgIFRFWFRBUkVBOiAnbWRjLXRleHQtZmllbGQtLXRleHRhcmVhJyxcbiAgICBXSVRIX0xFQURJTkdfSUNPTjogJ21kYy10ZXh0LWZpZWxkLS13aXRoLWxlYWRpbmctaWNvbicsXG4gICAgV0lUSF9UUkFJTElOR19JQ09OOiAnbWRjLXRleHQtZmllbGQtLXdpdGgtdHJhaWxpbmctaWNvbicsXG59O1xudmFyIG51bWJlcnMgPSB7XG4gICAgTEFCRUxfU0NBTEU6IDAuNzUsXG59O1xuLyoqXG4gKiBXaGl0ZWxpc3QgYmFzZWQgb2ZmIG9mIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0hUTUwvSFRNTDUvQ29uc3RyYWludF92YWxpZGF0aW9uXG4gKiB1bmRlciB0aGUgXCJWYWxpZGF0aW9uLXJlbGF0ZWQgYXR0cmlidXRlc1wiIHNlY3Rpb24uXG4gKi9cbnZhciBWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUID0gW1xuICAgICdwYXR0ZXJuJywgJ21pbicsICdtYXgnLCAncmVxdWlyZWQnLCAnc3RlcCcsICdtaW5sZW5ndGgnLCAnbWF4bGVuZ3RoJyxcbl07XG4vKipcbiAqIExhYmVsIHNob3VsZCBhbHdheXMgZmxvYXQgZm9yIHRoZXNlIHR5cGVzIGFzIHRoZXkgc2hvdyBzb21lIFVJIGV2ZW4gaWYgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbnZhciBBTFdBWVNfRkxPQVRfVFlQRVMgPSBbXG4gICAgJ2NvbG9yJywgJ2RhdGUnLCAnZGF0ZXRpbWUtbG9jYWwnLCAnbW9udGgnLCAncmFuZ2UnLCAndGltZScsICd3ZWVrJyxcbl07XG5leHBvcnQgeyBjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNULCBBTFdBWVNfRkxPQVRfVFlQRVMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbmltcG9ydCB7IF9fYXNzaWduLCBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE1EQ0ZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7IEFMV0FZU19GTE9BVF9UWVBFUywgY3NzQ2xhc3NlcywgbnVtYmVycywgc3RyaW5ncywgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbnZhciBQT0lOVEVSRE9XTl9FVkVOVFMgPSBbJ21vdXNlZG93bicsICd0b3VjaHN0YXJ0J107XG52YXIgSU5URVJBQ1RJT05fRVZFTlRTID0gWydjbGljaycsICdrZXlkb3duJ107XG52YXIgTURDVGV4dEZpZWxkRm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTURDVGV4dEZpZWxkRm91bmRhdGlvbiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYWRhcHRlclxuICAgICAqIEBwYXJhbSBmb3VuZGF0aW9uTWFwIE1hcCBmcm9tIHN1YmNvbXBvbmVudCBuYW1lcyB0byB0aGVpciBzdWJmb3VuZGF0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNRENUZXh0RmllbGRGb3VuZGF0aW9uKGFkYXB0ZXIsIGZvdW5kYXRpb25NYXApIHtcbiAgICAgICAgaWYgKGZvdW5kYXRpb25NYXAgPT09IHZvaWQgMCkgeyBmb3VuZGF0aW9uTWFwID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgX19hc3NpZ24oX19hc3NpZ24oe30sIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIpLCBhZGFwdGVyKSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNGb2N1c2VkXyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8gPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaXNWYWxpZF8gPSB0cnVlO1xuICAgICAgICBfdGhpcy51c2VOYXRpdmVWYWxpZGF0aW9uXyA9IHRydWU7XG4gICAgICAgIF90aGlzLnZhbGlkYXRlT25WYWx1ZUNoYW5nZV8gPSB0cnVlO1xuICAgICAgICBfdGhpcy5oZWxwZXJUZXh0XyA9IGZvdW5kYXRpb25NYXAuaGVscGVyVGV4dDtcbiAgICAgICAgX3RoaXMuY2hhcmFjdGVyQ291bnRlcl8gPSBmb3VuZGF0aW9uTWFwLmNoYXJhY3RlckNvdW50ZXI7XG4gICAgICAgIF90aGlzLmxlYWRpbmdJY29uXyA9IGZvdW5kYXRpb25NYXAubGVhZGluZ0ljb247XG4gICAgICAgIF90aGlzLnRyYWlsaW5nSWNvbl8gPSBmb3VuZGF0aW9uTWFwLnRyYWlsaW5nSWNvbjtcbiAgICAgICAgX3RoaXMuaW5wdXRGb2N1c0hhbmRsZXJfID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuYWN0aXZhdGVGb2N1cygpOyB9O1xuICAgICAgICBfdGhpcy5pbnB1dEJsdXJIYW5kbGVyXyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmRlYWN0aXZhdGVGb2N1cygpOyB9O1xuICAgICAgICBfdGhpcy5pbnB1dElucHV0SGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5oYW5kbGVJbnB1dCgpOyB9O1xuICAgICAgICBfdGhpcy5zZXRQb2ludGVyWE9mZnNldF8gPSBmdW5jdGlvbiAoZXZ0KSB7IHJldHVybiBfdGhpcy5zZXRUcmFuc2Zvcm1PcmlnaW4oZXZ0KTsgfTtcbiAgICAgICAgX3RoaXMudGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyXyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uKCk7IH07XG4gICAgICAgIF90aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZVZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2UoYXR0cmlidXRlc0xpc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRGb3VuZGF0aW9uLCBcImNzc0NsYXNzZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1RleHRGaWVsZEZvdW5kYXRpb24sIFwic3RyaW5nc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbiwgXCJudW1iZXJzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVycztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZSwgXCJzaG91bGRBbHdheXNGbG9hdF9cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS50eXBlO1xuICAgICAgICAgICAgcmV0dXJuIEFMV0FZU19GTE9BVF9UWVBFUy5pbmRleE9mKHR5cGUpID49IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUsIFwic2hvdWxkRmxvYXRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3VsZEFsd2F5c0Zsb2F0XyB8fCB0aGlzLmlzRm9jdXNlZF8gfHwgISF0aGlzLmdldFZhbHVlKCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmlzQmFkSW5wdXRfKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUsIFwic2hvdWxkU2hha2VcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0ZvY3VzZWRfICYmICF0aGlzLmlzVmFsaWQoKSAmJiAhIXRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRGb3VuZGF0aW9uLCBcImRlZmF1bHRBZGFwdGVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlZSB7QGxpbmsgTURDVGV4dEZpZWxkQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZFxuICAgICAgICAgKiByZXR1cm4gdHlwZXMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBoYXNDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgICAgICAgICBzZXRJbnB1dEF0dHI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVJbnB1dEF0dHI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGdldE5hdGl2ZUlucHV0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICAgICAgICAgIGlzRm9jdXNlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgZGVhY3RpdmF0ZUxpbmVSaXBwbGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgc2hha2VMYWJlbDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGZsb2F0TGFiZWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICBzZXRMYWJlbFJlcXVpcmVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgaGFzTGFiZWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICAgICAgICAgIGdldExhYmVsV2lkdGg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gICAgICAgICAgICAgICAgaGFzT3V0bGluZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgICAgICAgICAgbm90Y2hPdXRsaW5lOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgY2xvc2VPdXRsaW5lOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSAmJiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0TGFiZWxSZXF1aXJlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hZGFwdGVyLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Rm9jdXNIYW5kbGVyXygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYWRhcHRlci5oYXNMYWJlbCgpICYmIHRoaXMuc2hvdWxkRmxvYXQpIHtcbiAgICAgICAgICAgIHRoaXMubm90Y2hPdXRsaW5lKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmZsb2F0TGFiZWwodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRmxvYXRpbmdfKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRhcHRlci5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgICAgICBQT0lOVEVSRE9XTl9FVkVOVFMuZm9yRWFjaChmdW5jdGlvbiAoZXZ0VHlwZSkge1xuICAgICAgICAgICAgX3RoaXMuYWRhcHRlci5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIF90aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgICAgIH0pO1xuICAgICAgICBJTlRFUkFDVElPTl9FVkVOVFMuZm9yRWFjaChmdW5jdGlvbiAoZXZ0VHlwZSkge1xuICAgICAgICAgICAgX3RoaXMuYWRhcHRlci5yZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbk9ic2VydmVyXyA9XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcih0aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyk7XG4gICAgICAgIHRoaXMuc2V0Q2hhcmFjdGVyQ291bnRlcl8odGhpcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuaW5wdXRCbHVySGFuZGxlcl8pO1xuICAgICAgICB0aGlzLmFkYXB0ZXIuZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdpbnB1dCcsIHRoaXMuaW5wdXRJbnB1dEhhbmRsZXJfKTtcbiAgICAgICAgUE9JTlRFUkRPV05fRVZFTlRTLmZvckVhY2goZnVuY3Rpb24gKGV2dFR5cGUpIHtcbiAgICAgICAgICAgIF90aGlzLmFkYXB0ZXIuZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIF90aGlzLnNldFBvaW50ZXJYT2Zmc2V0Xyk7XG4gICAgICAgIH0pO1xuICAgICAgICBJTlRFUkFDVElPTl9FVkVOVFMuZm9yRWFjaChmdW5jdGlvbiAoZXZ0VHlwZSkge1xuICAgICAgICAgICAgX3RoaXMuYWRhcHRlci5kZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIF90aGlzLnRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGFwdGVyLmRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcih0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB1c2VyIGludGVyYWN0aW9ucyB3aXRoIHRoZSBUZXh0IEZpZWxkLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF0aXZlSW5wdXQgPSB0aGlzLmFkYXB0ZXIuZ2V0TmF0aXZlSW5wdXQoKTtcbiAgICAgICAgaWYgKG5hdGl2ZUlucHV0ICYmIG5hdGl2ZUlucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8gPSB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB2YWxpZGF0aW9uIGF0dHJpYnV0ZSBjaGFuZ2VzXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzTGlzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBhdHRyaWJ1dGVzTGlzdC5zb21lKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgICAgICBpZiAoVkFMSURBVElPTl9BVFRSX1dISVRFTElTVC5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdHlsZVZhbGlkaXR5Xyh0cnVlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGFwdGVyLnNldExhYmVsUmVxdWlyZWQoX3RoaXMuZ2V0TmF0aXZlSW5wdXRfKCkucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNMaXN0LmluZGV4T2YoJ21heGxlbmd0aCcpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hhcmFjdGVyQ291bnRlcl8odGhpcy5nZXRWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9wZW5zL2Nsb3NlcyB0aGUgbm90Y2hlZCBvdXRsaW5lLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLm5vdGNoT3V0bGluZSA9IGZ1bmN0aW9uIChvcGVuTm90Y2gpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaGFzT3V0bGluZSgpIHx8ICF0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVuTm90Y2gpIHtcbiAgICAgICAgICAgIHZhciBsYWJlbFdpZHRoID0gdGhpcy5hZGFwdGVyLmdldExhYmVsV2lkdGgoKSAqIG51bWJlcnMuTEFCRUxfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIubm90Y2hPdXRsaW5lKGxhYmVsV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmNsb3NlT3V0bGluZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIHRleHQgZmllbGQgZm9jdXMgc3RhdGUuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuYWN0aXZhdGVGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0ZvY3VzZWRfID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdHlsZUZvY3VzZWRfKHRoaXMuaXNGb2N1c2VkXyk7XG4gICAgICAgIHRoaXMuYWRhcHRlci5hY3RpdmF0ZUxpbmVSaXBwbGUoKTtcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlci5oYXNMYWJlbCgpKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUZsb2F0aW5nXyh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlbHBlclRleHRfICYmXG4gICAgICAgICAgICAodGhpcy5oZWxwZXJUZXh0Xy5pc1BlcnNpc3RlbnQoKSB8fCAhdGhpcy5oZWxwZXJUZXh0Xy5pc1ZhbGlkYXRpb24oKSB8fFxuICAgICAgICAgICAgICAgICF0aGlzLmlzVmFsaWRfKSkge1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zaG93VG9TY3JlZW5SZWFkZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGluZSByaXBwbGUncyB0cmFuc2Zvcm0gb3JpZ2luLCBzbyB0aGF0IHRoZSBsaW5lIHJpcHBsZSBhY3RpdmF0ZVxuICAgICAqIGFuaW1hdGlvbiB3aWxsIGFuaW1hdGUgb3V0IGZyb20gdGhlIHVzZXIncyBjbGljayBsb2NhdGlvbi5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm1PcmlnaW4gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSB8fCB0aGlzLmFkYXB0ZXIuaGFzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgdmFyIHRhcmdldEV2ZW50ID0gdG91Y2hlcyA/IHRvdWNoZXNbMF0gOiBldnQ7XG4gICAgICAgIHZhciB0YXJnZXRDbGllbnRSZWN0ID0gdGFyZ2V0RXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgbm9ybWFsaXplZFggPSB0YXJnZXRFdmVudC5jbGllbnRYIC0gdGFyZ2V0Q2xpZW50UmVjdC5sZWZ0O1xuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbihub3JtYWxpemVkWCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGlucHV0IGNoYW5nZSBvZiB0ZXh0IGlucHV0IGFuZCB0ZXh0IGFyZWEuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlRm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRDaGFyYWN0ZXJDb3VudGVyXyh0aGlzLmdldFZhbHVlKCkubGVuZ3RoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgVGV4dCBGaWVsZCdzIGZvY3VzIHN0YXRlIGluIGNhc2VzIHdoZW4gdGhlIGlucHV0IHZhbHVlXG4gICAgICogY2hhbmdlcyB3aXRob3V0IHVzZXIgaW5wdXQgKGUuZy4gcHJvZ3JhbW1hdGljYWxseSkuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuYXV0b0NvbXBsZXRlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVGb2N1cygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWFjdGl2YXRlcyB0aGUgVGV4dCBGaWVsZCdzIGZvY3VzIHN0YXRlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLmRlYWN0aXZhdGVGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRhcHRlci5kZWFjdGl2YXRlTGluZVJpcHBsZSgpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZCgpO1xuICAgICAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgICAgICB0aGlzLnN0eWxlRm9jdXNlZF8odGhpcy5pc0ZvY3VzZWRfKTtcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlci5oYXNMYWJlbCgpKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGNoT3V0bGluZSh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgICAgICAgICAgdGhpcy5zdHlsZUZsb2F0aW5nXyh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRGbG9hdCkge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbHVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgb24gdGhlIGlucHV0IEVsZW1lbnQuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gUHJldmVudCBTYWZhcmkgZnJvbSBtb3ZpbmcgdGhlIGNhcmV0IHRvIHRoZSBlbmQgb2YgdGhlIGlucHV0IHdoZW4gdGhlXG4gICAgICAgIC8vIHZhbHVlIGhhcyBub3QgY2hhbmdlZC5cbiAgICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldENoYXJhY3RlckNvdW50ZXJfKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlT25WYWx1ZUNoYW5nZV8pIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RjaE91dGxpbmUodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuZmxvYXRMYWJlbCh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVGbG9hdGluZ18odGhpcy5zaG91bGRGbG9hdCk7XG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZU9uVmFsdWVDaGFuZ2VfKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVGhlIGN1c3RvbSB2YWxpZGl0eSBzdGF0ZSwgaWYgc2V0OyBvdGhlcndpc2UsIHRoZSByZXN1bHQgb2YgYVxuICAgICAqICAgICBuYXRpdmUgdmFsaWRpdHkgY2hlY2suXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlTmF0aXZlVmFsaWRhdGlvbl8gPyB0aGlzLmlzTmF0aXZlSW5wdXRWYWxpZF8oKSA6XG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRfO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlzVmFsaWQgU2V0cyB0aGUgY3VzdG9tIHZhbGlkaXR5IHN0YXRlIG9mIHRoZSBUZXh0IEZpZWxkLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZhbGlkID0gZnVuY3Rpb24gKGlzVmFsaWQpIHtcbiAgICAgICAgdGhpcy5pc1ZhbGlkXyA9IGlzVmFsaWQ7XG4gICAgICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8oaXNWYWxpZCk7XG4gICAgICAgIHZhciBzaG91bGRTaGFrZSA9ICFpc1ZhbGlkICYmICF0aGlzLmlzRm9jdXNlZF8gJiYgISF0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXIuaGFzTGFiZWwoKSkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNoYWtlTGFiZWwoc2hvdWxkU2hha2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2hvdWxkVmFsaWRhdGUgV2hldGhlciBvciBub3QgdmFsaWRpdHkgc2hvdWxkIGJlIHVwZGF0ZWQgb25cbiAgICAgKiAgICAgdmFsdWUgY2hhbmdlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZhbGlkYXRlT25WYWx1ZUNoYW5nZSA9IGZ1bmN0aW9uIChzaG91bGRWYWxpZGF0ZSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlT25WYWx1ZUNoYW5nZV8gPSBzaG91bGRWYWxpZGF0ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gV2hldGhlciBvciBub3QgdmFsaWRpdHkgc2hvdWxkIGJlIHVwZGF0ZWQgb24gdmFsdWUgY2hhbmdlLiBgdHJ1ZWBcbiAgICAgKiAgICAgYnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5nZXRWYWxpZGF0ZU9uVmFsdWVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlT25WYWx1ZUNoYW5nZV87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIHRoZSB1c2Ugb2YgbmF0aXZlIHZhbGlkYXRpb24uIFVzZSB0aGlzIGZvciBjdXN0b21cbiAgICAgKiB2YWxpZGF0aW9uLlxuICAgICAqIEBwYXJhbSB1c2VOYXRpdmVWYWxpZGF0aW9uIFNldCB0aGlzIHRvIGZhbHNlIHRvIGlnbm9yZSBuYXRpdmUgaW5wdXRcbiAgICAgKiAgICAgdmFsaWRhdGlvbi5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRVc2VOYXRpdmVWYWxpZGF0aW9uID0gZnVuY3Rpb24gKHVzZU5hdGl2ZVZhbGlkYXRpb24pIHtcbiAgICAgICAgdGhpcy51c2VOYXRpdmVWYWxpZGF0aW9uXyA9IHVzZU5hdGl2ZVZhbGlkYXRpb247XG4gICAgfTtcbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5kaXNhYmxlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkaXNhYmxlZCBTZXRzIHRoZSB0ZXh0LWZpZWxkIGRpc2FibGVkIG9yIGVuYWJsZWQuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0RGlzYWJsZWQgPSBmdW5jdGlvbiAoZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5nZXROYXRpdmVJbnB1dF8oKS5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLnN0eWxlRGlzYWJsZWRfKGRpc2FibGVkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBjb250ZW50IFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIGhlbHBlciB0ZXh0LlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldEhlbHBlclRleHRDb250ZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgICAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXJpYSBsYWJlbCBvZiB0aGUgbGVhZGluZyBpY29uLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldExlYWRpbmdJY29uQXJpYUxhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIGlmICh0aGlzLmxlYWRpbmdJY29uXykge1xuICAgICAgICAgICAgdGhpcy5sZWFkaW5nSWNvbl8uc2V0QXJpYUxhYmVsKGxhYmVsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSBsZWFkaW5nIGljb24uXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc2V0TGVhZGluZ0ljb25Db250ZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubGVhZGluZ0ljb25fKSB7XG4gICAgICAgICAgICB0aGlzLmxlYWRpbmdJY29uXy5zZXRDb250ZW50KGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhcmlhIGxhYmVsIG9mIHRoZSB0cmFpbGluZyBpY29uLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFRyYWlsaW5nSWNvbkFyaWFMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb25fKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWlsaW5nSWNvbl8uc2V0QXJpYUxhYmVsKGxhYmVsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IG9mIHRoZSB0cmFpbGluZyBpY29uLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFRyYWlsaW5nSWNvbkNvbnRlbnQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICBpZiAodGhpcy50cmFpbGluZ0ljb25fKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWlsaW5nSWNvbl8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyBjaGFyYWN0ZXIgY291bnRlciB2YWx1ZXMgdGhhdCBzaG93cyBjaGFyYWN0ZXJzIHVzZWQgYW5kIHRoZSB0b3RhbFxuICAgICAqIGNoYXJhY3RlciBsaW1pdC5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRDaGFyYWN0ZXJDb3VudGVyXyA9IGZ1bmN0aW9uIChjdXJyZW50TGVuZ3RoKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGFyYWN0ZXJDb3VudGVyXykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXhMZW5ndGggPSB0aGlzLmdldE5hdGl2ZUlucHV0XygpLm1heExlbmd0aDtcbiAgICAgICAgaWYgKG1heExlbmd0aCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTURDVGV4dEZpZWxkRm91bmRhdGlvbjogRXhwZWN0ZWQgbWF4bGVuZ3RoIGh0bWwgcHJvcGVydHkgb24gdGV4dCBpbnB1dCBvciB0ZXh0YXJlYS4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYXJhY3RlckNvdW50ZXJfLnNldENvdW50ZXJWYWx1ZShjdXJyZW50TGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBUZXh0IEZpZWxkIGlucHV0IGZhaWxzIGluIGNvbnZlcnRpbmcgdGhlIHVzZXItc3VwcGxpZWRcbiAgICAgKiAgICAgdmFsdWUuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaXNCYWRJbnB1dF8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRoZSBiYWRJbnB1dCBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIGluIElFIDExIPCfkqkuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LmJhZElucHV0IHx8IGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0IG9mIG5hdGl2ZSB2YWxpZGl0eSBjaGVja2luZyAoVmFsaWRpdHlTdGF0ZS52YWxpZCkuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuaXNOYXRpdmVJbnB1dFZhbGlkXyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsaWRpdHkudmFsaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgdmFsaWRpdHkgc3RhdGUuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuc3R5bGVWYWxpZGl0eV8gPSBmdW5jdGlvbiAoaXNWYWxpZCkge1xuICAgICAgICB2YXIgSU5WQUxJRCA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5JTlZBTElEO1xuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKElOVkFMSUQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKElOVkFMSUQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlbHBlclRleHRfKSB7XG4gICAgICAgICAgICB0aGlzLmhlbHBlclRleHRfLnNldFZhbGlkaXR5KGlzVmFsaWQpO1xuICAgICAgICAgICAgLy8gV2UgZHluYW1pY2FsbHkgc2V0IG9yIHVuc2V0IGFyaWEtZGVzY3JpYmVkYnkgZm9yIHZhbGlkYXRpb24gaGVscGVyIHRleHRcbiAgICAgICAgICAgIC8vIG9ubHksIGJhc2VkIG9uIHdoZXRoZXIgdGhlIGZpZWxkIGlzIHZhbGlkXG4gICAgICAgICAgICB2YXIgaGVscGVyVGV4dFZhbGlkYXRpb24gPSB0aGlzLmhlbHBlclRleHRfLmlzVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgaWYgKCFoZWxwZXJUZXh0VmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoZWxwZXJUZXh0VmlzaWJsZSA9IHRoaXMuaGVscGVyVGV4dF8uaXNWaXNpYmxlKCk7XG4gICAgICAgICAgICB2YXIgaGVscGVyVGV4dElkID0gdGhpcy5oZWxwZXJUZXh0Xy5nZXRJZCgpO1xuICAgICAgICAgICAgaWYgKGhlbHBlclRleHRWaXNpYmxlICYmIGhlbHBlclRleHRJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlci5zZXRJbnB1dEF0dHIoc3RyaW5ncy5BUklBX0RFU0NSSUJFREJZLCBoZWxwZXJUZXh0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUlucHV0QXR0cihzdHJpbmdzLkFSSUFfREVTQ1JJQkVEQlkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZm9jdXNlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zdHlsZUZvY3VzZWRfID0gZnVuY3Rpb24gKGlzRm9jdXNlZCkge1xuICAgICAgICB2YXIgRk9DVVNFRCA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GT0NVU0VEO1xuICAgICAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoRk9DVVNFRCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQ2xhc3MoRk9DVVNFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBkaXNhYmxlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRGb3VuZGF0aW9uLnByb3RvdHlwZS5zdHlsZURpc2FibGVkXyA9IGZ1bmN0aW9uIChpc0Rpc2FibGVkKSB7XG4gICAgICAgIHZhciBfYSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcywgRElTQUJMRUQgPSBfYS5ESVNBQkxFRCwgSU5WQUxJRCA9IF9hLklOVkFMSUQ7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoRElTQUJMRUQpO1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKElOVkFMSUQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKERJU0FCTEVEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sZWFkaW5nSWNvbl8pIHtcbiAgICAgICAgICAgIHRoaXMubGVhZGluZ0ljb25fLnNldERpc2FibGVkKGlzRGlzYWJsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYWlsaW5nSWNvbl8pIHtcbiAgICAgICAgICAgIHRoaXMudHJhaWxpbmdJY29uXy5zZXREaXNhYmxlZChpc0Rpc2FibGVkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGxhYmVsIGZsb2F0aW5nIHN0YXRlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEZvdW5kYXRpb24ucHJvdG90eXBlLnN0eWxlRmxvYXRpbmdfID0gZnVuY3Rpb24gKGlzRmxvYXRpbmcpIHtcbiAgICAgICAgdmFyIExBQkVMX0ZMT0FUSU5HID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzLkxBQkVMX0ZMT0FUSU5HO1xuICAgICAgICBpZiAoaXNGbG9hdGluZykge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKExBQkVMX0ZMT0FUSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVGhlIG5hdGl2ZSB0ZXh0IGlucHV0IGVsZW1lbnQgZnJvbSB0aGUgaG9zdCBlbnZpcm9ubWVudCwgb3IgYW5cbiAgICAgKiAgICAgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgZm9yIHVuaXQgdGVzdHMuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkRm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0TmF0aXZlSW5wdXRfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzLmFkYXB0ZXIgbWF5IGJlIHVuZGVmaW5lZCBpbiBmb3VuZGF0aW9uIHVuaXQgdGVzdHMuIFRoaXMgaGFwcGVucyB3aGVuXG4gICAgICAgIC8vIHRlc3Rkb3VibGUgaXMgY3JlYXRpbmcgYSBtb2NrIG9iamVjdCBhbmQgaW52b2tlcyB0aGVcbiAgICAgICAgLy8gc2hvdWxkU2hha2Uvc2hvdWxkRmxvYXQgZ2V0dGVycyAod2hpY2ggaW4gdHVybiBjYWxsIGdldFZhbHVlKCksIHdoaWNoXG4gICAgICAgIC8vIGNhbGxzIHRoaXMgbWV0aG9kKSBiZWZvcmUgaW5pdCgpIGhhcyBiZWVuIGNhbGxlZCBmcm9tIHRoZSBNRENUZXh0RmllbGRcbiAgICAgICAgLy8gY29uc3RydWN0b3IuIFRvIHdvcmsgYXJvdW5kIHRoYXQgaXNzdWUsIHdlIHJldHVybiBhIGR1bW15IG9iamVjdC5cbiAgICAgICAgdmFyIG5hdGl2ZUlucHV0ID0gdGhpcy5hZGFwdGVyID8gdGhpcy5hZGFwdGVyLmdldE5hdGl2ZUlucHV0KCkgOiBudWxsO1xuICAgICAgICByZXR1cm4gbmF0aXZlSW5wdXQgfHwge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbWF4TGVuZ3RoOiAtMSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICB2YWxpZGl0eToge1xuICAgICAgICAgICAgICAgIGJhZElucHV0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTURDVGV4dEZpZWxkRm91bmRhdGlvbjtcbn0oTURDRm91bmRhdGlvbikpO1xuZXhwb3J0IHsgTURDVGV4dEZpZWxkRm91bmRhdGlvbiB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEZvdW5kYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xudmFyIGNzc0NsYXNzZXMgPSB7XG4gICAgSEVMUEVSX1RFWFRfUEVSU0lTVEVOVDogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS1wZXJzaXN0ZW50JyxcbiAgICBIRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRzogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS12YWxpZGF0aW9uLW1zZycsXG4gICAgUk9PVDogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0Jyxcbn07XG52YXIgc3RyaW5ncyA9IHtcbiAgICBBUklBX0hJRERFTjogJ2FyaWEtaGlkZGVuJyxcbiAgICBST0xFOiAncm9sZScsXG4gICAgUk9PVF9TRUxFQ1RPUjogXCIuXCIgKyBjc3NDbGFzc2VzLlJPT1QsXG59O1xuZXhwb3J0IHsgc3RyaW5ncywgY3NzQ2xhc3NlcyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuaW1wb3J0IHsgX19hc3NpZ24sIF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgTURDRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHsgY3NzQ2xhc3Nlcywgc3RyaW5ncyB9IGZyb20gJy4vY29uc3RhbnRzJztcbnZhciBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24oYWRhcHRlcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgX19hc3NpZ24oX19hc3NpZ24oe30sIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyKSwgYWRhcHRlcikpIHx8IHRoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiwgXCJzdHJpbmdzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5ncztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWUge0BsaW5rIE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVybiB0eXBlcy5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzIE1ldGhvZHMgc2hvdWxkIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBhZGFwdGVyIGludGVyZmFjZS5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgICAgICAgICBnZXRBdHRyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICAgICAgICAgIHNldEF0dHI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICAgICAgICAgICAgICByZW1vdmVBdHRyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZ2V0QXR0cignaWQnKTtcbiAgICB9O1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZ2V0QXR0cihzdHJpbmdzLkFSSUFfSElEREVOKSAhPT0gJ3RydWUnO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQgZmllbGQuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIuc2V0Q29udGVudChjb250ZW50KTtcbiAgICB9O1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5pc1BlcnNpc3RlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpc1BlcnNpc3RlbnQgU2V0cyB0aGUgcGVyc2lzdGVuY3kgb2YgdGhlIGhlbHBlciB0ZXh0LlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRQZXJzaXN0ZW50ID0gZnVuY3Rpb24gKGlzUGVyc2lzdGVudCkge1xuICAgICAgICBpZiAoaXNQZXJzaXN0ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXIuYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHdoZXRoZXIgdGhlIGhlbHBlciB0ZXh0IGFjdHMgYXMgYW4gZXJyb3IgdmFsaWRhdGlvbiBtZXNzYWdlLlxuICAgICAqL1xuICAgIE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uLnByb3RvdHlwZS5pc1ZhbGlkYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXNWYWxpZGF0aW9uIFRydWUgdG8gbWFrZSB0aGUgaGVscGVyIHRleHQgYWN0IGFzIGFuIGVycm9yIHZhbGlkYXRpb24gbWVzc2FnZS5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VmFsaWRhdGlvbiA9IGZ1bmN0aW9uIChpc1ZhbGlkYXRpb24pIHtcbiAgICAgICAgaWYgKGlzVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLmFkZENsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNYWtlcyB0aGUgaGVscGVyIHRleHQgdmlzaWJsZSB0byB0aGUgc2NyZWVuIHJlYWRlci5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2hvd1RvU2NyZWVuUmVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXIucmVtb3ZlQXR0cihzdHJpbmdzLkFSSUFfSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbGlkaXR5IG9mIHRoZSBoZWxwZXIgdGV4dCBiYXNlZCBvbiB0aGUgaW5wdXQgdmFsaWRpdHkuXG4gICAgICovXG4gICAgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZhbGlkaXR5ID0gZnVuY3Rpb24gKGlucHV0SXNWYWxpZCkge1xuICAgICAgICB2YXIgaGVscGVyVGV4dElzUGVyc2lzdGVudCA9IHRoaXMuYWRhcHRlci5oYXNDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgICAgICB2YXIgaGVscGVyVGV4dElzVmFsaWRhdGlvbk1zZyA9IHRoaXMuYWRhcHRlci5oYXNDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHKTtcbiAgICAgICAgdmFyIHZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkgPSBoZWxwZXJUZXh0SXNWYWxpZGF0aW9uTXNnICYmICFpbnB1dElzVmFsaWQ7XG4gICAgICAgIGlmICh2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUb1NjcmVlblJlYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5hZGFwdGVyLnNldEF0dHIoc3RyaW5ncy5ST0xFLCAnYWxlcnQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlci5yZW1vdmVBdHRyKHN0cmluZ3MuUk9MRSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoZWxwZXJUZXh0SXNQZXJzaXN0ZW50ICYmICF2YWxpZGF0aW9uTXNnTmVlZHNEaXNwbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVfKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBoZWxwIHRleHQgZnJvbSBzY3JlZW4gcmVhZGVycy5cbiAgICAgKi9cbiAgICBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5wcm90b3R5cGUuaGlkZV8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlci5zZXRBdHRyKHN0cmluZ3MuQVJJQV9ISURERU4sICd0cnVlJyk7XG4gICAgfTtcbiAgICByZXR1cm4gTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb247XG59KE1EQ0ZvdW5kYXRpb24pKTtcbmV4cG9ydCB7IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIH07XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVmYXVsdC1leHBvcnQgTmVlZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggTURDIFdlYiB2MC40NC4wIGFuZCBlYXJsaWVyLlxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIjxzbG90Pjwvc2xvdD5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHtvbkRlc3Ryb3ksIHNldENvbnRleHR9IGZyb20gJ3N2ZWx0ZSc7XG4gIGltcG9ydCB7d3JpdGFibGV9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5cbiAgZXhwb3J0IGxldCBrZXk7XG4gIGV4cG9ydCBsZXQgdmFsdWU7XG5cbiAgY29uc3Qgc3RvcmVWYWx1ZSA9IHdyaXRhYmxlKHZhbHVlKTtcbiAgc2V0Q29udGV4dChrZXksIHN0b3JlVmFsdWUpO1xuXG4gICQ6ICRzdG9yZVZhbHVlID0gdmFsdWU7XG5cbiAgb25EZXN0cm95KCgpID0+IHtcbiAgICBzdG9yZVZhbHVlLnNldCh1bmRlZmluZWQpO1xuICB9KTtcbjwvc2NyaXB0PiIsInsjaWYgd3JhcHBlZH1cbiAgPHNwYW5cbiAgICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gICAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgICB1c2U6Zm9yd2FyZEV2ZW50c1xuICAgIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwnOiB0cnVlLFxuICAgICAgJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnOiBmbG9hdEFib3ZlLFxuICAgICAgJ21kYy1mbG9hdGluZy1sYWJlbC0tcmVxdWlyZWQnOiByZXF1aXJlZCxcbiAgICAgIC4uLmludGVybmFsQ2xhc3NlcyxcbiAgICB9KX1cbiAgICBzdHlsZT17T2JqZWN0LmVudHJpZXMoaW50ZXJuYWxTdHlsZXMpXG4gICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgJHtuYW1lfTogJHt2YWx1ZX07YClcbiAgICAgIC5jb25jYXQoW3N0eWxlXSlcbiAgICAgIC5qb2luKCcgJyl9XG4gICAgey4uLiQkcmVzdFByb3BzfT48c2xvdCAvPjwvc3BhblxuICA+XG57OmVsc2V9XG4gIDxsYWJlbFxuICAgIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgICB1c2U6dXNlQWN0aW9ucz17dXNlfVxuICAgIHVzZTpmb3J3YXJkRXZlbnRzXG4gICAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICAgIFtjbGFzc05hbWVdOiB0cnVlLFxuICAgICAgJ21kYy1mbG9hdGluZy1sYWJlbCc6IHRydWUsXG4gICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZSc6IGZsb2F0QWJvdmUsXG4gICAgICAnbWRjLWZsb2F0aW5nLWxhYmVsLS1yZXF1aXJlZCc6IHJlcXVpcmVkLFxuICAgICAgLi4uaW50ZXJuYWxDbGFzc2VzLFxuICAgIH0pfVxuICAgIHN0eWxlPXtPYmplY3QuZW50cmllcyhpbnRlcm5hbFN0eWxlcylcbiAgICAgIC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IGAke25hbWV9OiAke3ZhbHVlfTtgKVxuICAgICAgLmNvbmNhdChbc3R5bGVdKVxuICAgICAgLmpvaW4oJyAnKX1cbiAgICBmb3I9e2ZvcklkIHx8IChpbnB1dFByb3BzID8gaW5wdXRQcm9wcy5pZCA6IG51bGwpfVxuICAgIHsuLi4kJHJlc3RQcm9wc30+PHNsb3QgLz48L2xhYmVsXG4gID5cbnsvaWZ9XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsJztcbiAgaW1wb3J0IHsgb25Nb3VudCwgZ2V0Q29udGV4dCB9IGZyb20gJ3N2ZWx0ZSc7XG4gIGltcG9ydCB7IGdldF9jdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCc7XG4gIGltcG9ydCB7XG4gICAgZm9yd2FyZEV2ZW50c0J1aWxkZXIsXG4gICAgY2xhc3NNYXAsXG4gICAgdXNlQWN0aW9ucyxcbiAgICBkaXNwYXRjaCxcbiAgfSBmcm9tICdAc211aS9jb21tb24vaW50ZXJuYWwuanMnO1xuXG4gIGNvbnN0IGZvcndhcmRFdmVudHMgPSBmb3J3YXJkRXZlbnRzQnVpbGRlcihnZXRfY3VycmVudF9jb21wb25lbnQoKSk7XG5cbiAgZXhwb3J0IGxldCB1c2UgPSBbXTtcbiAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICBleHBvcnQgeyBjbGFzc05hbWUgYXMgY2xhc3MgfTtcbiAgZXhwb3J0IGxldCBzdHlsZSA9ICcnO1xuICBsZXQgZm9ySWQgPSBudWxsO1xuICBleHBvcnQgeyBmb3JJZCBhcyBmb3IgfTtcbiAgZXhwb3J0IGxldCBmbG9hdEFib3ZlID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgcmVxdWlyZWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCB3cmFwcGVkID0gZmFsc2U7XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGxldCBpbnN0YW5jZTtcbiAgbGV0IGludGVybmFsQ2xhc3NlcyA9IHt9O1xuICBsZXQgaW50ZXJuYWxTdHlsZXMgPSB7fTtcbiAgbGV0IGlucHV0UHJvcHMgPSBnZXRDb250ZXh0KCdTTVVJOmdlbmVyaWM6aW5wdXQ6cHJvcHMnKSB8fCB7fTtcblxuICBsZXQgcHJldmlvdXNGbG9hdEFib3ZlID0gZmxvYXRBYm92ZTtcbiAgJDogaWYgKHByZXZpb3VzRmxvYXRBYm92ZSAhPT0gZmxvYXRBYm92ZSkge1xuICAgIHByZXZpb3VzRmxvYXRBYm92ZSA9IGZsb2F0QWJvdmU7XG4gICAgaW5zdGFuY2UuZmxvYXQoZmxvYXRBYm92ZSk7XG4gIH1cblxuICBsZXQgcHJldmlvdXNSZXF1aXJlZCA9IHJlcXVpcmVkO1xuICAkOiBpZiAocHJldmlvdXNSZXF1aXJlZCAhPT0gcmVxdWlyZWQpIHtcbiAgICBwcmV2aW91c1JlcXVpcmVkID0gcmVxdWlyZWQ7XG4gICAgaW5zdGFuY2Uuc2V0UmVxdWlyZWQocmVxdWlyZWQpO1xuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgaW5zdGFuY2UgPSBuZXcgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3MsXG4gICAgICByZW1vdmVDbGFzcyxcbiAgICAgIGdldFdpZHRoOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZ2V0RWxlbWVudCgpO1xuICAgICAgICBjb25zdCBjbG9uZSA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoJ3NtdWktZmxvYXRpbmctbGFiZWwtLXJlbW92ZS10cmFuc2l0aW9uJyk7XG4gICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoJ3NtdWktZmxvYXRpbmctbGFiZWwtLWZvcmNlLXNpemUnKTtcbiAgICAgICAgY2xvbmUuY2xhc3NMaXN0LnJlbW92ZSgnbWRjLWZsb2F0aW5nLWxhYmVsLS1mbG9hdC1hYm92ZScpO1xuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IGNsb25lLnNjcm9sbFdpZHRoO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbFdpZHRoO1xuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvciA9IHtcbiAgICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gZ2V0RWxlbWVudCgpO1xuICAgICAgfSxcbiAgICAgIGFkZFN0eWxlLFxuICAgICAgcmVtb3ZlU3R5bGUsXG4gICAgfTtcblxuICAgIGRpc3BhdGNoKGVsZW1lbnQsICdTTVVJOmZsb2F0aW5nLWxhYmVsOm1vdW50JywgYWNjZXNzb3IpO1xuXG4gICAgaW5zdGFuY2UuaW5pdCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGVsZW1lbnQsICdTTVVJOmZsb2F0aW5nLWxhYmVsOnVubW91bnQnLCBhY2Nlc3Nvcik7XG5cbiAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIWludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIGluIGludGVybmFsQ2xhc3NlcykgfHwgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkU3R5bGUobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaW50ZXJuYWxTdHlsZXNbbmFtZV0gIT0gdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBkZWxldGUgaW50ZXJuYWxTdHlsZXNbbmFtZV07XG4gICAgICAgIGludGVybmFsU3R5bGVzID0gaW50ZXJuYWxTdHlsZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlcm5hbFN0eWxlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVN0eWxlKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiBpbnRlcm5hbFN0eWxlcykge1xuICAgICAgZGVsZXRlIGludGVybmFsU3R5bGVzW25hbWVdO1xuICAgICAgaW50ZXJuYWxTdHlsZXMgPSBpbnRlcm5hbFN0eWxlcztcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2hha2Uoc2hvdWxkU2hha2UpIHtcbiAgICBpbnN0YW5jZS5zaGFrZShzaG91bGRTaGFrZSk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZmxvYXQoc2hvdWxkRmxvYXQpIHtcbiAgICBmbG9hdEFib3ZlID0gc2hvdWxkRmxvYXQ7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gc2V0UmVxdWlyZWQoaXNSZXF1aXJlZCkge1xuICAgIHJlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRXaWR0aCgpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0V2lkdGgoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG48L3NjcmlwdD5cbiIsIjxkaXZcbiAgYmluZDp0aGlzPXtlbGVtZW50fVxuICB1c2U6dXNlQWN0aW9ucz17dXNlfVxuICB1c2U6Zm9yd2FyZEV2ZW50c1xuICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgIFtjbGFzc05hbWVdOiB0cnVlLFxuICAgICdtZGMtbGluZS1yaXBwbGUnOiB0cnVlLFxuICAgICdtZGMtbGluZS1yaXBwbGUtLWFjdGl2ZSc6IGFjdGl2ZSxcbiAgICAuLi5pbnRlcm5hbENsYXNzZXMsXG4gIH0pfVxuICBzdHlsZT17T2JqZWN0LmVudHJpZXMoaW50ZXJuYWxTdHlsZXMpXG4gICAgLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gYCR7bmFtZX06ICR7dmFsdWV9O2ApXG4gICAgLmNvbmNhdChbc3R5bGVdKVxuICAgIC5qb2luKCcgJyl9XG4gIHsuLi4kJHJlc3RQcm9wc31cbi8+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2xpbmUtcmlwcGxlJztcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG4gIGltcG9ydCB7IGdldF9jdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCc7XG4gIGltcG9ydCB7XG4gICAgZm9yd2FyZEV2ZW50c0J1aWxkZXIsXG4gICAgY2xhc3NNYXAsXG4gICAgdXNlQWN0aW9ucyxcbiAgfSBmcm9tICdAc211aS9jb21tb24vaW50ZXJuYWwuanMnO1xuXG4gIGNvbnN0IGZvcndhcmRFdmVudHMgPSBmb3J3YXJkRXZlbnRzQnVpbGRlcihnZXRfY3VycmVudF9jb21wb25lbnQoKSk7XG5cbiAgZXhwb3J0IGxldCB1c2UgPSBbXTtcbiAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICBleHBvcnQgeyBjbGFzc05hbWUgYXMgY2xhc3MgfTtcbiAgZXhwb3J0IGxldCBzdHlsZSA9ICcnO1xuICBleHBvcnQgbGV0IGFjdGl2ZSA9IGZhbHNlO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW5zdGFuY2U7XG4gIGxldCBpbnRlcm5hbENsYXNzZXMgPSB7fTtcbiAgbGV0IGludGVybmFsU3R5bGVzID0ge307XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgaW5zdGFuY2UgPSBuZXcgTURDTGluZVJpcHBsZUZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3MsXG4gICAgICByZW1vdmVDbGFzcyxcbiAgICAgIGhhc0NsYXNzLFxuICAgICAgc2V0U3R5bGU6IGFkZFN0eWxlLFxuICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBnZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBnZXRFbGVtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICB9KTtcblxuICAgIGluc3RhbmNlLmluaXQoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXNcbiAgICAgID8gaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV1cbiAgICAgIDogZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCFpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghKGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXMpIHx8IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0eWxlKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGludGVybmFsU3R5bGVzW25hbWVdICE9IHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIGludGVybmFsU3R5bGVzW25hbWVdO1xuICAgICAgICBpbnRlcm5hbFN0eWxlcyA9IGludGVybmFsU3R5bGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJuYWxTdHlsZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgaW5zdGFuY2UuYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIGluc3RhbmNlLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBzZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpIHtcbiAgICBpbnN0YW5jZS5zZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbjwvc2NyaXB0PlxuIiwiPGRpdlxuICBiaW5kOnRoaXM9e2VsZW1lbnR9XG4gIHVzZTp1c2VBY3Rpb25zPXt1c2V9XG4gIHVzZTpmb3J3YXJkRXZlbnRzXG4gIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgW2NsYXNzTmFtZV06IHRydWUsXG4gICAgJ21kYy1ub3RjaGVkLW91dGxpbmUnOiB0cnVlLFxuICAgICdtZGMtbm90Y2hlZC1vdXRsaW5lLS1ub3RjaGVkJzogbm90Y2hlZCxcbiAgICAnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm8tbGFiZWwnOiBub0xhYmVsLFxuICAgIC4uLmludGVybmFsQ2xhc3NlcyxcbiAgfSl9XG4gIG9uOlNNVUk6ZmxvYXRpbmctbGFiZWw6bW91bnQ9eyhldmVudCkgPT4gKGZsb2F0aW5nTGFiZWwgPSBldmVudC5kZXRhaWwpfVxuICBvbjpTTVVJOmZsb2F0aW5nLWxhYmVsOnVubW91bnQ9eygpID0+IChmbG9hdGluZ0xhYmVsID0gdW5kZWZpbmVkKX1cbiAgey4uLiQkcmVzdFByb3BzfVxuPlxuICA8ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZ1wiIC8+XG4gIHsjaWYgIW5vTGFiZWx9XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX19ub3RjaFwiXG4gICAgICBzdHlsZT17T2JqZWN0LmVudHJpZXMobm90Y2hTdHlsZXMpXG4gICAgICAgIC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IGAke25hbWV9OiAke3ZhbHVlfTtgKVxuICAgICAgICAuam9pbignICcpfVxuICAgID5cbiAgICAgIDxzbG90IC8+XG4gICAgPC9kaXY+XG4gIHsvaWZ9XG4gIDxkaXYgY2xhc3M9XCJtZGMtbm90Y2hlZC1vdXRsaW5lX190cmFpbGluZ1wiIC8+XG48L2Rpdj5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHsgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL25vdGNoZWQtb3V0bGluZSc7XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgbm90Y2hlZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IG5vTGFiZWwgPSBmYWxzZTtcblxuICBsZXQgZWxlbWVudDtcbiAgbGV0IGluc3RhbmNlO1xuICBsZXQgZmxvYXRpbmdMYWJlbDtcbiAgbGV0IGludGVybmFsQ2xhc3NlcyA9IHt9O1xuICBsZXQgbm90Y2hTdHlsZXMgPSB7fTtcblxuICAkOiBpZiAoZmxvYXRpbmdMYWJlbCkge1xuICAgIGZsb2F0aW5nTGFiZWwuYWRkU3R5bGUoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnMHMnKTtcbiAgICBhZGRDbGFzcygnbWRjLW5vdGNoZWQtb3V0bGluZS0tdXBncmFkZWQnKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgZmxvYXRpbmdMYWJlbC5yZW1vdmVTdHlsZSgndHJhbnNpdGlvbi1kdXJhdGlvbicpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZUNsYXNzKCdtZGMtbm90Y2hlZC1vdXRsaW5lLS11cGdyYWRlZCcpO1xuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgaW5zdGFuY2UgPSBuZXcgTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBzZXROb3RjaFdpZHRoUHJvcGVydHk6ICh3aWR0aCkgPT4gYWRkTm90Y2hTdHlsZSgnd2lkdGgnLCB3aWR0aCArICdweCcpLFxuICAgICAgcmVtb3ZlTm90Y2hXaWR0aFByb3BlcnR5OiAoKSA9PiByZW1vdmVOb3RjaFN0eWxlKCd3aWR0aCcpLFxuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UuaW5pdCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIWludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCEoY2xhc3NOYW1lIGluIGludGVybmFsQ2xhc3NlcykgfHwgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkTm90Y2hTdHlsZShuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChub3RjaFN0eWxlc1tuYW1lXSAhPSB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSBub3RjaFN0eWxlc1tuYW1lXTtcbiAgICAgICAgbm90Y2hTdHlsZXMgPSBub3RjaFN0eWxlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vdGNoU3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTm90Y2hTdHlsZShuYW1lKSB7XG4gICAgaWYgKG5hbWUgaW4gbm90Y2hTdHlsZXMpIHtcbiAgICAgIGRlbGV0ZSBub3RjaFN0eWxlc1tuYW1lXTtcbiAgICAgIG5vdGNoU3R5bGVzID0gbm90Y2hTdHlsZXM7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG5vdGNoKG5vdGNoV2lkdGgpIHtcbiAgICBpbnN0YW5jZS5ub3RjaChub3RjaFdpZHRoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjbG9zZU5vdGNoKCkge1xuICAgIGluc3RhbmNlLmNsb3NlTm90Y2goKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IGNsYXNzQWRkZXJCdWlsZGVyIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcbmltcG9ydCBEaXYgZnJvbSAnQHNtdWkvY29tbW9uL0Rpdi5zdmVsdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzc0FkZGVyQnVpbGRlcih7XG4gIGNsYXNzOiAnbWRjLXRleHQtZmllbGQtaGVscGVyLWxpbmUnLFxuICBjb21wb25lbnQ6IERpdixcbn0pO1xuIiwiaW1wb3J0IHsgY2xhc3NBZGRlckJ1aWxkZXIgfSBmcm9tICdAc211aS9jb21tb24vaW50ZXJuYWwuanMnO1xuaW1wb3J0IFNwYW4gZnJvbSAnQHNtdWkvY29tbW9uL1NwYW4uc3ZlbHRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3NBZGRlckJ1aWxkZXIoe1xuICBjbGFzczogJ21kYy10ZXh0LWZpZWxkX19hZmZpeCBtZGMtdGV4dC1maWVsZF9fYWZmaXgtLXByZWZpeCcsXG4gIGNvbXBvbmVudDogU3Bhbixcbn0pO1xuIiwiaW1wb3J0IHsgY2xhc3NBZGRlckJ1aWxkZXIgfSBmcm9tICdAc211aS9jb21tb24vaW50ZXJuYWwuanMnO1xuaW1wb3J0IFNwYW4gZnJvbSAnQHNtdWkvY29tbW9uL1NwYW4uc3ZlbHRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3NBZGRlckJ1aWxkZXIoe1xuICBjbGFzczogJ21kYy10ZXh0LWZpZWxkX19hZmZpeCBtZGMtdGV4dC1maWVsZF9fYWZmaXgtLXN1ZmZpeCcsXG4gIGNvbXBvbmVudDogU3Bhbixcbn0pO1xuIiwiPGlucHV0XG4gIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgdXNlOmZvcndhcmRFdmVudHNcbiAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAnbWRjLXRleHQtZmllbGRfX2lucHV0JzogdHJ1ZSxcbiAgfSl9XG4gIG9uOmNoYW5nZT17KGUpID0+ICh0eXBlID09PSAnZmlsZScgfHwgdHlwZSA9PT0gJ3JhbmdlJykgJiYgdmFsdWVVcGRhdGVyKGUpfVxuICBvbjppbnB1dD17KGUpID0+IHR5cGUgIT09ICdmaWxlJyAmJiB2YWx1ZVVwZGF0ZXIoZSl9XG4gIG9uOmNoYW5nZT17Y2hhbmdlSGFuZGxlcn1cbiAge3R5cGV9XG4gIHtwbGFjZWhvbGRlcn1cbiAgey4uLnZhbHVlUHJvcH1cbiAgey4uLmludGVybmFsQXR0cnN9XG4gIHsuLi4kJHJlc3RQcm9wc31cbi8+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgdHlwZSA9ICd0ZXh0JztcbiAgLy8gQWx3YXlzIGhhdmluZyBhIHBsYWNlaG9sZGVyIGZpeGVzIFNhZmFyaSdzIGJhc2VsaW5lIGFsaWdubWVudC5cbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGhpbGlwd2FsdG9uL2ZsZXhidWdzL2lzc3Vlcy8yNzBcbiAgZXhwb3J0IGxldCBwbGFjZWhvbGRlciA9ICcgJztcbiAgZXhwb3J0IGxldCB2YWx1ZSA9ICcnO1xuICBleHBvcnQgbGV0IGZpbGVzID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGRpcnR5ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHVwZGF0ZUludmFsaWQgPSB0cnVlO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW50ZXJuYWxBdHRycyA9IHt9O1xuICBsZXQgdmFsdWVQcm9wID0ge307XG5cbiAgJDogaWYgKHR5cGUgPT09ICdmaWxlJykge1xuICAgIGRlbGV0ZSB2YWx1ZVByb3AudmFsdWU7XG4gICAgdmFsdWVQcm9wID0gdmFsdWVQcm9wO1xuICB9IGVsc2Uge1xuICAgIHZhbHVlUHJvcC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgaWYgKHVwZGF0ZUludmFsaWQpIHtcbiAgICAgIGludmFsaWQgPSBlbGVtZW50Lm1hdGNoZXMoJzppbnZhbGlkJyk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIGNvbnN0IG5hbiA9IG5ldyBOdW1iZXIoTnVtYmVyLk5hTik7XG4gICAgICBuYW4ubGVuZ3RoID0gMDtcbiAgICAgIHJldHVybiBuYW47XG4gICAgfVxuICAgIHJldHVybiArdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZVVwZGF0ZXIoZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgdmFsdWUgPSB0b051bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIGZpbGVzID0gZS50YXJnZXQuZmlsZXM7XG4gICAgICAvLyBGYWxsIHRocm91Z2guXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKGUpIHtcbiAgICBkaXJ0eSA9IHRydWU7XG4gICAgaWYgKHVwZGF0ZUludmFsaWQpIHtcbiAgICAgIGludmFsaWQgPSBlbGVtZW50Lm1hdGNoZXMoJzppbnZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEF0dHIobmFtZSkge1xuICAgIHJldHVybiBuYW1lIGluIGludGVybmFsQXR0cnNcbiAgICAgID8gaW50ZXJuYWxBdHRyc1tuYW1lXVxuICAgICAgOiBnZXRFbGVtZW50KCkuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFkZEF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaW50ZXJuYWxBdHRyc1tuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXR0cihuYW1lKSB7XG4gICAgaWYgKCEobmFtZSBpbiBpbnRlcm5hbEF0dHJzKSB8fCBpbnRlcm5hbEF0dHJzW25hbWVdICE9IG51bGwpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGdldEVsZW1lbnQoKS5mb2N1cygpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbjwvc2NyaXB0PlxuIiwiPHRleHRhcmVhXG4gIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgdXNlOmZvcndhcmRFdmVudHNcbiAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAnbWRjLXRleHQtZmllbGRfX2lucHV0JzogdHJ1ZSxcbiAgfSl9XG4gIHN0eWxlPXtgJHtyZXNpemFibGUgPyAnJyA6ICdyZXNpemU6IG5vbmU7ICd9JHtzdHlsZX1gfVxuICBvbjpjaGFuZ2U9e2NoYW5nZUhhbmRsZXJ9XG4gIGJpbmQ6dmFsdWVcbiAgey4uLmludGVybmFsQXR0cnN9XG4gIHsuLi4kJHJlc3RQcm9wc31cbi8+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgc3R5bGUgPSAnJztcbiAgZXhwb3J0IGxldCB2YWx1ZSA9ICcnO1xuICBleHBvcnQgbGV0IGRpcnR5ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaW52YWxpZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHVwZGF0ZUludmFsaWQgPSB0cnVlO1xuICBleHBvcnQgbGV0IHJlc2l6YWJsZSA9IHRydWU7XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGxldCBpbnRlcm5hbEF0dHJzID0ge307XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgaWYgKHVwZGF0ZUludmFsaWQpIHtcbiAgICAgIGludmFsaWQgPSBlbGVtZW50Lm1hdGNoZXMoJzppbnZhbGlkJyk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKCkge1xuICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICBpZiAodXBkYXRlSW52YWxpZCkge1xuICAgICAgaW52YWxpZCA9IGVsZW1lbnQubWF0Y2hlcygnOmludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0QXR0cihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUgaW4gaW50ZXJuYWxBdHRyc1xuICAgICAgPyBpbnRlcm5hbEF0dHJzW25hbWVdXG4gICAgICA6IGdldEVsZW1lbnQoKS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYWRkQXR0cihuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpbnRlcm5hbEF0dHJzW25hbWVdICE9PSB2YWx1ZSkge1xuICAgICAgaW50ZXJuYWxBdHRyc1tuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdHRyKG5hbWUpIHtcbiAgICBpZiAoIShuYW1lIGluIGludGVybmFsQXR0cnMpIHx8IGludGVybmFsQXR0cnNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgaW50ZXJuYWxBdHRyc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgZ2V0RWxlbWVudCgpLmZvY3VzKCk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuPC9zY3JpcHQ+XG4iLCJ7I2lmIHZhbHVlZH1cbiAgPGxhYmVsXG4gICAgYmluZDp0aGlzPXtlbGVtZW50fVxuICAgIHVzZTpSaXBwbGU9e3tcbiAgICAgIHJpcHBsZTogIXRleHRhcmVhICYmIHZhcmlhbnQgPT09ICdmaWxsZWQnLFxuICAgICAgdW5ib3VuZGVkOiBmYWxzZSxcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBhZGRTdHlsZSxcbiAgICAgIGV2ZW50VGFyZ2V0OiBpbnB1dEVsZW1lbnQsXG4gICAgICBhY3RpdmVUYXJnZXQ6IGlucHV0RWxlbWVudCxcbiAgICAgIGluaXRQcm9taXNlLFxuICAgIH19XG4gICAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgICB1c2U6Zm9yd2FyZEV2ZW50c1xuICAgIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAgICdtZGMtdGV4dC1maWVsZCc6IHRydWUsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJzogZGlzYWJsZWQsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLXRleHRhcmVhJzogdGV4dGFyZWEsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWZpbGxlZCc6IHZhcmlhbnQgPT09ICdmaWxsZWQnLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCc6IHZhcmlhbnQgPT09ICdvdXRsaW5lZCcsXG4gICAgICAnc211aS10ZXh0LWZpZWxkLS1zdGFuZGFyZCc6IHZhcmlhbnQgPT09ICdzdGFuZGFyZCcgJiYgIXRleHRhcmVhLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1uby1sYWJlbCc6IG5vTGFiZWwgfHwgKGxhYmVsID09IG51bGwgJiYgISQkc2xvdHMubGFiZWwpLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1sYWJlbC1mbG9hdGluZyc6XG4gICAgICAgIGZvY3VzZWQgfHwgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09ICcnKSxcbiAgICAgICdtZGMtdGV4dC1maWVsZC0td2l0aC1sZWFkaW5nLWljb24nOlxuICAgICAgICB3aXRoTGVhZGluZ0ljb24gPT09IHVuaW5pdGlhbGl6ZWRWYWx1ZVxuICAgICAgICAgID8gJCRzbG90cy5sZWFkaW5nSWNvblxuICAgICAgICAgIDogd2l0aExlYWRpbmdJY29uLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nOlxuICAgICAgICB3aXRoVHJhaWxpbmdJY29uID09PSB1bmluaXRpYWxpemVkVmFsdWVcbiAgICAgICAgICA/ICQkc2xvdHMudHJhaWxpbmdJY29uXG4gICAgICAgICAgOiB3aXRoVHJhaWxpbmdJY29uLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS13aXRoLWludGVybmFsLWNvdW50ZXInOlxuICAgICAgICB0ZXh0YXJlYSAmJiAkJHNsb3RzLmludGVybmFsQ291bnRlcixcbiAgICAgICdtZGMtdGV4dC1maWVsZC0taW52YWxpZCc6IGludmFsaWQgIT09IHVuaW5pdGlhbGl6ZWRWYWx1ZSAmJiBpbnZhbGlkLFxuICAgICAgLi4uaW50ZXJuYWxDbGFzc2VzLFxuICAgIH0pfVxuICAgIHN0eWxlPXtPYmplY3QuZW50cmllcyhpbnRlcm5hbFN0eWxlcylcbiAgICAgIC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IGAke25hbWV9OiAke3ZhbHVlfTtgKVxuICAgICAgLmNvbmNhdChbc3R5bGVdKVxuICAgICAgLmpvaW4oJyAnKX1cbiAgICBmb3I9ey8qIHN1cHByZXNzIGExMXkgd2FybmluZywgc2luY2UgdGhpcyBpcyB3cmFwcGVkICovIG51bGx9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6bGVhZGluZy1pY29uOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAobGVhZGluZ0ljb24gPSBldmVudC5kZXRhaWwpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmxlYWRpbmctaWNvbjp1bm1vdW50PXsoKSA9PiAobGVhZGluZ0ljb24gPSB1bmRlZmluZWQpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOnRyYWlsaW5nLWljb246bW91bnQ9eyhldmVudCkgPT5cbiAgICAgICh0cmFpbGluZ0ljb24gPSBldmVudC5kZXRhaWwpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOnRyYWlsaW5nLWljb246dW5tb3VudD17KCkgPT4gKHRyYWlsaW5nSWNvbiA9IHVuZGVmaW5lZCl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6Y2hhcmFjdGVyLWNvdW50ZXI6bW91bnQ9eyhldmVudCkgPT5cbiAgICAgIChjaGFyYWN0ZXJDb3VudGVyID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDpjaGFyYWN0ZXItY291bnRlcjp1bm1vdW50PXsoKSA9PlxuICAgICAgKGNoYXJhY3RlckNvdW50ZXIgPSB1bmRlZmluZWQpfVxuICAgIHsuLi5leGNsdWRlKCQkcmVzdFByb3BzLCBbXG4gICAgICAnaW5wdXQkJyxcbiAgICAgICdsYWJlbCQnLFxuICAgICAgJ3JpcHBsZSQnLFxuICAgICAgJ291dGxpbmUkJyxcbiAgICAgICdoZWxwZXJMaW5lJCcsXG4gICAgXSl9XG4gID5cbiAgICB7I2lmICF0ZXh0YXJlYSAmJiB2YXJpYW50ICE9PSAnb3V0bGluZWQnfVxuICAgICAgeyNpZiB2YXJpYW50ID09PSAnZmlsbGVkJ31cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtZGMtdGV4dC1maWVsZF9fcmlwcGxlXCIgLz5cbiAgICAgIHsvaWZ9XG4gICAgICB7I2lmICFub0xhYmVsICYmIChsYWJlbCAhPSBudWxsIHx8ICQkc2xvdHMubGFiZWwpfVxuICAgICAgICA8RmxvYXRpbmdMYWJlbFxuICAgICAgICAgIGJpbmQ6dGhpcz17ZmxvYXRpbmdMYWJlbH1cbiAgICAgICAgICBmbG9hdEFib3ZlPXtmb2N1c2VkIHx8ICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnJyl9XG4gICAgICAgICAge3JlcXVpcmVkfVxuICAgICAgICAgIHdyYXBwZWRcbiAgICAgICAgICB7Li4ucHJlZml4RmlsdGVyKCQkcmVzdFByb3BzLCAnbGFiZWwkJyl9XG4gICAgICAgICAgPntsYWJlbCA9PSBudWxsID8gJycgOiBsYWJlbH08c2xvdCBuYW1lPVwibGFiZWxcIiAvPjwvRmxvYXRpbmdMYWJlbFxuICAgICAgICA+XG4gICAgICB7L2lmfVxuICAgIHsvaWZ9XG4gICAgeyNpZiB0ZXh0YXJlYSB8fCB2YXJpYW50ID09PSAnb3V0bGluZWQnfVxuICAgICAgPE5vdGNoZWRPdXRsaW5lXG4gICAgICAgIGJpbmQ6dGhpcz17bm90Y2hlZE91dGxpbmV9XG4gICAgICAgIG5vTGFiZWw9e25vTGFiZWwgfHwgKGxhYmVsID09IG51bGwgJiYgISQkc2xvdHMubGFiZWwpfVxuICAgICAgICB7Li4ucHJlZml4RmlsdGVyKCQkcmVzdFByb3BzLCAnb3V0bGluZSQnKX1cbiAgICAgID5cbiAgICAgICAgeyNpZiAhbm9MYWJlbCAmJiAobGFiZWwgIT0gbnVsbCB8fCAkJHNsb3RzLmxhYmVsKX1cbiAgICAgICAgICA8RmxvYXRpbmdMYWJlbFxuICAgICAgICAgICAgYmluZDp0aGlzPXtmbG9hdGluZ0xhYmVsfVxuICAgICAgICAgICAgZmxvYXRBYm92ZT17Zm9jdXNlZCB8fCAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycpfVxuICAgICAgICAgICAge3JlcXVpcmVkfVxuICAgICAgICAgICAgd3JhcHBlZFxuICAgICAgICAgICAgey4uLnByZWZpeEZpbHRlcigkJHJlc3RQcm9wcywgJ2xhYmVsJCcpfVxuICAgICAgICAgICAgPntsYWJlbCA9PSBudWxsID8gJycgOiBsYWJlbH08c2xvdCBuYW1lPVwibGFiZWxcIiAvPjwvRmxvYXRpbmdMYWJlbFxuICAgICAgICAgID5cbiAgICAgICAgey9pZn1cbiAgICAgIDwvTm90Y2hlZE91dGxpbmU+XG4gICAgey9pZn1cbiAgICA8Q29udGV4dEZyYWdtZW50IGtleT1cIlNNVUk6dGV4dGZpZWxkOmljb246bGVhZGluZ1wiIHZhbHVlPXt0cnVlfT5cbiAgICAgIDxzbG90IG5hbWU9XCJsZWFkaW5nSWNvblwiIC8+XG4gICAgPC9Db250ZXh0RnJhZ21lbnQ+XG4gICAgPHNsb3QgLz5cbiAgICB7I2lmIHRleHRhcmVhfVxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9e2NsYXNzTWFwKHtcbiAgICAgICAgICAnbWRjLXRleHQtZmllbGRfX3Jlc2l6ZXInOlxuICAgICAgICAgICAgISgnaW5wdXQkcmVzaXphYmxlJyBpbiAkJHJlc3RQcm9wcykgfHwgJCRyZXN0UHJvcHMuaW5wdXQkcmVzaXphYmxlLFxuICAgICAgICB9KX1cbiAgICAgID5cbiAgICAgICAgPFRleHRhcmVhXG4gICAgICAgICAgYmluZDp0aGlzPXtpbnB1dH1cbiAgICAgICAgICB7ZGlzYWJsZWR9XG4gICAgICAgICAge3JlcXVpcmVkfVxuICAgICAgICAgIGJpbmQ6dmFsdWVcbiAgICAgICAgICBiaW5kOmRpcnR5XG4gICAgICAgICAgYmluZDppbnZhbGlkXG4gICAgICAgICAge3VwZGF0ZUludmFsaWR9XG4gICAgICAgICAgb246Ymx1cj17KCkgPT4gKGZvY3VzZWQgPSBmYWxzZSl9XG4gICAgICAgICAgb246Zm9jdXM9eygpID0+IChmb2N1c2VkID0gdHJ1ZSl9XG4gICAgICAgICAgb246Ymx1clxuICAgICAgICAgIG9uOmZvY3VzXG4gICAgICAgICAgYXJpYS1jb250cm9scz17aGVscGVySWR9XG4gICAgICAgICAgYXJpYS1kZXNjcmliZWRieT17aGVscGVySWR9XG4gICAgICAgICAgey4uLnByZWZpeEZpbHRlcigkJHJlc3RQcm9wcywgJ2lucHV0JCcpfVxuICAgICAgICAvPlxuICAgICAgICA8c2xvdCBuYW1lPVwiaW50ZXJuYWxDb3VudGVyXCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICB7OmVsc2V9XG4gICAgICA8c2xvdCBuYW1lPVwicHJlZml4XCIgLz5cbiAgICAgIHsjaWYgcHJlZml4ICE9IG51bGx9XG4gICAgICAgIDxQcmVmaXg+e3ByZWZpeH08L1ByZWZpeD5cbiAgICAgIHsvaWZ9XG4gICAgICA8SW5wdXRcbiAgICAgICAgYmluZDp0aGlzPXtpbnB1dH1cbiAgICAgICAge3R5cGV9XG4gICAgICAgIHtkaXNhYmxlZH1cbiAgICAgICAge3JlcXVpcmVkfVxuICAgICAgICBiaW5kOnZhbHVlXG4gICAgICAgIGJpbmQ6ZmlsZXNcbiAgICAgICAgYmluZDpkaXJ0eVxuICAgICAgICBiaW5kOmludmFsaWRcbiAgICAgICAge3VwZGF0ZUludmFsaWR9XG4gICAgICAgIG9uOmJsdXI9eygpID0+IChmb2N1c2VkID0gZmFsc2UpfVxuICAgICAgICBvbjpmb2N1cz17KCkgPT4gKGZvY3VzZWQgPSB0cnVlKX1cbiAgICAgICAgb246Ymx1clxuICAgICAgICBvbjpmb2N1c1xuICAgICAgICBhcmlhLWNvbnRyb2xzPXtoZWxwZXJJZH1cbiAgICAgICAgYXJpYS1kZXNjcmliZWRieT17aGVscGVySWR9XG4gICAgICAgIHsuLi5ub0xhYmVsICYmIGxhYmVsICE9IG51bGwgPyB7IHBsYWNlaG9sZGVyOiBsYWJlbCB9IDoge319XG4gICAgICAgIHsuLi5wcmVmaXhGaWx0ZXIoJCRyZXN0UHJvcHMsICdpbnB1dCQnKX1cbiAgICAgIC8+XG4gICAgICB7I2lmIHN1ZmZpeCAhPSBudWxsfVxuICAgICAgICA8U3VmZml4PntzdWZmaXh9PC9TdWZmaXg+XG4gICAgICB7L2lmfVxuICAgICAgPHNsb3QgbmFtZT1cInN1ZmZpeFwiIC8+XG4gICAgey9pZn1cbiAgICA8Q29udGV4dEZyYWdtZW50IGtleT1cIlNNVUk6dGV4dGZpZWxkOmljb246bGVhZGluZ1wiIHZhbHVlPXtmYWxzZX0+XG4gICAgICA8c2xvdCBuYW1lPVwidHJhaWxpbmdJY29uXCIgLz5cbiAgICA8L0NvbnRleHRGcmFnbWVudD5cbiAgICB7I2lmICF0ZXh0YXJlYSAmJiB2YXJpYW50ICE9PSAnb3V0bGluZWQnICYmIHJpcHBsZX1cbiAgICAgIDxMaW5lUmlwcGxlXG4gICAgICAgIGJpbmQ6dGhpcz17bGluZVJpcHBsZX1cbiAgICAgICAgey4uLnByZWZpeEZpbHRlcigkJHJlc3RQcm9wcywgJ3JpcHBsZSQnKX1cbiAgICAgIC8+XG4gICAgey9pZn1cbiAgPC9sYWJlbD5cbns6ZWxzZX1cbiAgPGRpdlxuICAgIGJpbmQ6dGhpcz17ZWxlbWVudH1cbiAgICB1c2U6UmlwcGxlPXt7XG4gICAgICByaXBwbGUsXG4gICAgICB1bmJvdW5kZWQ6IGZhbHNlLFxuICAgICAgYWRkQ2xhc3MsXG4gICAgICByZW1vdmVDbGFzcyxcbiAgICAgIGFkZFN0eWxlLFxuICAgIH19XG4gICAgdXNlOnVzZUFjdGlvbnM9e3VzZX1cbiAgICB1c2U6Zm9yd2FyZEV2ZW50c1xuICAgIGNsYXNzPXtjbGFzc01hcCh7XG4gICAgICBbY2xhc3NOYW1lXTogdHJ1ZSxcbiAgICAgICdtZGMtdGV4dC1maWVsZCc6IHRydWUsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJzogZGlzYWJsZWQsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLXRleHRhcmVhJzogdGV4dGFyZWEsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWZpbGxlZCc6IHZhcmlhbnQgPT09ICdmaWxsZWQnLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCc6IHZhcmlhbnQgPT09ICdvdXRsaW5lZCcsXG4gICAgICAnc211aS10ZXh0LWZpZWxkLS1zdGFuZGFyZCc6IHZhcmlhbnQgPT09ICdzdGFuZGFyZCcgJiYgIXRleHRhcmVhLFxuICAgICAgJ21kYy10ZXh0LWZpZWxkLS1uby1sYWJlbCc6IG5vTGFiZWwgfHwgISQkc2xvdHMubGFiZWwsXG4gICAgICAnbWRjLXRleHQtZmllbGQtLXdpdGgtbGVhZGluZy1pY29uJzogJCRzbG90cy5sZWFkaW5nSWNvbixcbiAgICAgICdtZGMtdGV4dC1maWVsZC0td2l0aC10cmFpbGluZy1pY29uJzogJCRzbG90cy50cmFpbGluZ0ljb24sXG4gICAgICAnbWRjLXRleHQtZmllbGQtLWludmFsaWQnOiBpbnZhbGlkICE9PSB1bmluaXRpYWxpemVkVmFsdWUgJiYgaW52YWxpZCxcbiAgICAgIC4uLmludGVybmFsQ2xhc3NlcyxcbiAgICB9KX1cbiAgICBzdHlsZT17T2JqZWN0LmVudHJpZXMoaW50ZXJuYWxTdHlsZXMpXG4gICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBgJHtuYW1lfTogJHt2YWx1ZX07YClcbiAgICAgIC5jb25jYXQoW3N0eWxlXSlcbiAgICAgIC5qb2luKCcgJyl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6bGVhZGluZy1pY29uOm1vdW50PXsoZXZlbnQpID0+XG4gICAgICAobGVhZGluZ0ljb24gPSBldmVudC5kZXRhaWwpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOmxlYWRpbmctaWNvbjp1bm1vdW50PXsoKSA9PiAobGVhZGluZ0ljb24gPSB1bmRlZmluZWQpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOnRyYWlsaW5nLWljb246bW91bnQ9eyhldmVudCkgPT5cbiAgICAgICh0cmFpbGluZ0ljb24gPSBldmVudC5kZXRhaWwpfVxuICAgIG9uOlNNVUk6dGV4dGZpZWxkOnRyYWlsaW5nLWljb246dW5tb3VudD17KCkgPT4gKHRyYWlsaW5nSWNvbiA9IHVuZGVmaW5lZCl9XG4gICAgey4uLmV4Y2x1ZGUoJCRyZXN0UHJvcHMsIFtcbiAgICAgICdpbnB1dCQnLFxuICAgICAgJ2xhYmVsJCcsXG4gICAgICAncmlwcGxlJCcsXG4gICAgICAnb3V0bGluZSQnLFxuICAgICAgJ2hlbHBlckxpbmUkJyxcbiAgICBdKX1cbiAgPlxuICAgIDxzbG90IG5hbWU9XCJsYWJlbFwiIC8+XG4gICAgPENvbnRleHRGcmFnbWVudCBrZXk9XCJTTVVJOnRleHRmaWVsZDppY29uOmxlYWRpbmdcIiB2YWx1ZT17dHJ1ZX0+XG4gICAgICA8c2xvdCBuYW1lPVwibGVhZGluZ0ljb25cIiAvPlxuICAgIDwvQ29udGV4dEZyYWdtZW50PlxuICAgIDxzbG90IC8+XG4gICAgPENvbnRleHRGcmFnbWVudCBrZXk9XCJTTVVJOnRleHRmaWVsZDppY29uOmxlYWRpbmdcIiB2YWx1ZT17ZmFsc2V9PlxuICAgICAgPHNsb3QgbmFtZT1cInRyYWlsaW5nSWNvblwiIC8+XG4gICAgPC9Db250ZXh0RnJhZ21lbnQ+XG4gICAgPHNsb3QgbmFtZT1cInJpcHBsZVwiIC8+XG4gIDwvZGl2Plxuey9pZn1cbnsjaWYgJCRzbG90cy5oZWxwZXJ9XG4gIDxIZWxwZXJMaW5lXG4gICAgb246U01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6aWQ9eyhldmVudCkgPT4gKGhlbHBlcklkID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDpoZWxwZXItdGV4dDptb3VudD17KGV2ZW50KSA9PiAoaGVscGVyVGV4dCA9IGV2ZW50LmRldGFpbCl9XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6dW5tb3VudD17KCkgPT4ge1xuICAgICAgaGVscGVySWQgPSB1bmRlZmluZWQ7XG4gICAgICBoZWxwZXJUZXh0ID0gdW5kZWZpbmVkO1xuICAgIH19XG4gICAgb246U01VSTp0ZXh0ZmllbGQ6Y2hhcmFjdGVyLWNvdW50ZXI6bW91bnQ9eyhldmVudCkgPT5cbiAgICAgIChjaGFyYWN0ZXJDb3VudGVyID0gZXZlbnQuZGV0YWlsKX1cbiAgICBvbjpTTVVJOnRleHRmaWVsZDpjaGFyYWN0ZXItY291bnRlcjp1bm1vdW50PXsoKSA9PlxuICAgICAgKGNoYXJhY3RlckNvdW50ZXIgPSB1bmRlZmluZWQpfVxuICAgIHsuLi5wcmVmaXhGaWx0ZXIoJCRyZXN0UHJvcHMsICdoZWxwZXJMaW5lJCcpfVxuICAgID48c2xvdCBuYW1lPVwiaGVscGVyXCIgLz48L0hlbHBlckxpbmVcbiAgPlxuey9pZn1cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHsgTURDVGV4dEZpZWxkRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQnO1xuICBpbXBvcnQgeyBldmVudHMgfSBmcm9tICdAbWF0ZXJpYWwvZG9tJztcbiAgaW1wb3J0IHsgb25Nb3VudCwgb25EZXN0cm95LCBnZXRDb250ZXh0LCB0aWNrIH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZ2V0X2N1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcbiAgaW1wb3J0IHtcbiAgICBmb3J3YXJkRXZlbnRzQnVpbGRlcixcbiAgICBjbGFzc01hcCxcbiAgICBleGNsdWRlLFxuICAgIHByZWZpeEZpbHRlcixcbiAgICB1c2VBY3Rpb25zLFxuICB9IGZyb20gJ0BzbXVpL2NvbW1vbi9pbnRlcm5hbC5qcyc7XG4gIGltcG9ydCBDb250ZXh0RnJhZ21lbnQgZnJvbSAnQHNtdWkvY29tbW9uL0NvbnRleHRGcmFnbWVudC5zdmVsdGUnO1xuICBpbXBvcnQgUmlwcGxlIGZyb20gJ0BzbXVpL3JpcHBsZSc7XG4gIGltcG9ydCBGbG9hdGluZ0xhYmVsIGZyb20gJ0BzbXVpL2Zsb2F0aW5nLWxhYmVsL0Zsb2F0aW5nTGFiZWwuc3ZlbHRlJztcbiAgaW1wb3J0IExpbmVSaXBwbGUgZnJvbSAnQHNtdWkvbGluZS1yaXBwbGUvTGluZVJpcHBsZS5zdmVsdGUnO1xuICBpbXBvcnQgTm90Y2hlZE91dGxpbmUgZnJvbSAnQHNtdWkvbm90Y2hlZC1vdXRsaW5lL05vdGNoZWRPdXRsaW5lLnN2ZWx0ZSc7XG4gIGltcG9ydCBIZWxwZXJMaW5lIGZyb20gJy4vSGVscGVyTGluZS5qcyc7XG4gIGltcG9ydCBQcmVmaXggZnJvbSAnLi9QcmVmaXguanMnO1xuICBpbXBvcnQgU3VmZml4IGZyb20gJy4vU3VmZml4LmpzJztcbiAgaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQuc3ZlbHRlJztcbiAgaW1wb3J0IFRleHRhcmVhIGZyb20gJy4vVGV4dGFyZWEuc3ZlbHRlJztcbiAgY29uc3QgeyBhcHBseVBhc3NpdmUgfSA9IGV2ZW50cztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuICBsZXQgdW5pbml0aWFsaXplZFZhbHVlID0gKCkgPT4ge307XG5cbiAgZXhwb3J0IGxldCB1c2UgPSBbXTtcbiAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICBleHBvcnQgeyBjbGFzc05hbWUgYXMgY2xhc3MgfTtcbiAgZXhwb3J0IGxldCBzdHlsZSA9ICcnO1xuICBleHBvcnQgbGV0IHJpcHBsZSA9IHRydWU7XG4gIGV4cG9ydCBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCByZXF1aXJlZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IHRleHRhcmVhID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgdmFyaWFudCA9IHRleHRhcmVhID8gJ291dGxpbmVkJyA6ICdzdGFuZGFyZCc7XG4gIGV4cG9ydCBsZXQgbm9MYWJlbCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGxhYmVsID0gbnVsbDtcbiAgZXhwb3J0IGxldCB0eXBlID0gJ3RleHQnO1xuICBleHBvcnQgbGV0IHZhbHVlID0gdW5pbml0aWFsaXplZFZhbHVlO1xuICBleHBvcnQgbGV0IGZpbGVzID0gdW5pbml0aWFsaXplZFZhbHVlO1xuICBleHBvcnQgbGV0IGRpcnR5ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaW52YWxpZCA9IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgZXhwb3J0IGxldCBwcmVmaXggPSBudWxsO1xuICBleHBvcnQgbGV0IHN1ZmZpeCA9IG51bGw7XG4gIGV4cG9ydCBsZXQgdXBkYXRlSW52YWxpZCA9IGludmFsaWQgPT09IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgZXhwb3J0IGxldCB2YWxpZGF0ZU9uVmFsdWVDaGFuZ2UgPSB1cGRhdGVJbnZhbGlkO1xuICBleHBvcnQgbGV0IHVzZU5hdGl2ZVZhbGlkYXRpb24gPSB1cGRhdGVJbnZhbGlkO1xuICBleHBvcnQgbGV0IHdpdGhMZWFkaW5nSWNvbiA9IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgZXhwb3J0IGxldCB3aXRoVHJhaWxpbmdJY29uID0gdW5pbml0aWFsaXplZFZhbHVlO1xuXG4gIC8vIENvbXBvbmVudHNcbiAgZXhwb3J0IGxldCBpbnB1dCA9IHVuZGVmaW5lZDtcbiAgZXhwb3J0IGxldCBmbG9hdGluZ0xhYmVsID0gdW5kZWZpbmVkO1xuICBleHBvcnQgbGV0IGxpbmVSaXBwbGUgPSB1bmRlZmluZWQ7XG4gIGV4cG9ydCBsZXQgbm90Y2hlZE91dGxpbmUgPSB1bmRlZmluZWQ7XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGxldCBpbnN0YW5jZTtcbiAgbGV0IGludGVybmFsQ2xhc3NlcyA9IHt9O1xuICBsZXQgaW50ZXJuYWxTdHlsZXMgPSB7fTtcbiAgbGV0IGhlbHBlcklkO1xuICBsZXQgZm9jdXNlZCA9IGZhbHNlO1xuICBsZXQgYWRkTGF5b3V0TGlzdGVuZXIgPSBnZXRDb250ZXh0KCdTTVVJOmFkZExheW91dExpc3RlbmVyJyk7XG4gIGxldCByZW1vdmVMYXlvdXRMaXN0ZW5lcjtcbiAgbGV0IGluaXRQcm9taXNlUmVzb2x2ZTtcbiAgbGV0IGluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IChpbml0UHJvbWlzZVJlc29sdmUgPSByZXNvbHZlKSk7XG4gIC8vIFRoZXNlIGFyZSBpbnN0YW5jZXMsIG5vdCBhY2Nlc3NvcnMuXG4gIGxldCBsZWFkaW5nSWNvbjtcbiAgbGV0IHRyYWlsaW5nSWNvbjtcbiAgbGV0IGhlbHBlclRleHQ7XG4gIGxldCBjaGFyYWN0ZXJDb3VudGVyO1xuXG4gICQ6IHZhbHVlZCA9IHZhbHVlICE9PSB1bmluaXRpYWxpemVkVmFsdWUgfHwgZmlsZXMgIT09IHVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgJDogaW5wdXRFbGVtZW50ID0gaW5wdXQgJiYgaW5wdXQuZ2V0RWxlbWVudCgpO1xuXG4gICQ6IGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZS5pc1ZhbGlkKCkgIT09ICFpbnZhbGlkKSB7XG4gICAgaWYgKHVwZGF0ZUludmFsaWQpIHtcbiAgICAgIGludmFsaWQgPSAhaW5zdGFuY2UuaXNWYWxpZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS5zZXRWYWxpZCghaW52YWxpZCk7XG4gICAgfVxuICB9XG5cbiAgJDogaWYgKFxuICAgIGluc3RhbmNlICYmXG4gICAgaW5zdGFuY2UuZ2V0VmFsaWRhdGVPblZhbHVlQ2hhbmdlKCkgIT09IHZhbGlkYXRlT25WYWx1ZUNoYW5nZVxuICApIHtcbiAgICBpbnN0YW5jZS5zZXRWYWxpZGF0ZU9uVmFsdWVDaGFuZ2UoXG4gICAgICB2YWxpZGF0ZU9uVmFsdWVDaGFuZ2UgPT09IHVuaW5pdGlhbGl6ZWRWYWx1ZVxuICAgICAgICA/IGZhbHNlXG4gICAgICAgIDogdmFsaWRhdGVPblZhbHVlQ2hhbmdlXG4gICAgKTtcbiAgfVxuXG4gICQ6IGlmIChpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlLnNldFVzZU5hdGl2ZVZhbGlkYXRpb24odXNlTmF0aXZlVmFsaWRhdGlvbik7XG4gIH1cblxuICAkOiBpZiAoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZS5zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICAvLyBSZWFjdCB0byBjaGFuZ2VzIG9mIHZhbHVlIGZyb20gb3V0c2lkZSBjb21wb25lbnQuXG4gIGxldCBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICQ6IGlmIChpbnN0YW5jZSAmJiB2YWx1ZWQgJiYgcHJldmlvdXNWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgLy8gQ2hlY2sgdGhlIGRhdGEgaXMgZmxvd2luZyBkb3duLlxuICAgIGlmIChpbnN0YW5jZS5nZXRWYWx1ZSgpICE9PSB2YWx1ZSkge1xuICAgICAgaW5zdGFuY2Uuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhZGRMYXlvdXRMaXN0ZW5lcikge1xuICAgIHJlbW92ZUxheW91dExpc3RlbmVyID0gYWRkTGF5b3V0TGlzdGVuZXIobGF5b3V0KTtcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc3RhbmNlID0gbmV3IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24oXG4gICAgICB7XG4gICAgICAgIC8vIGdldFJvb3RBZGFwdGVyTWV0aG9kc19cbiAgICAgICAgYWRkQ2xhc3MsXG4gICAgICAgIHJlbW92ZUNsYXNzLFxuICAgICAgICBoYXNDbGFzcyxcbiAgICAgICAgcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICAgIGdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgICAgICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgICBnZXRFbGVtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICAgICAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBnZXRBdHRyaWJ1dGVzTGlzdCA9IChtdXRhdGlvbnNMaXN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbXV0YXRpb25zTGlzdFxuICAgICAgICAgICAgICAubWFwKChtdXRhdGlvbikgPT4gbXV0YXRpb24uYXR0cmlidXRlTmFtZSlcbiAgICAgICAgICAgICAgLmZpbHRlcigoYXR0cmlidXRlTmFtZSkgPT4gYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnNMaXN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlTmF0aXZlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICBoYW5kbGVyKGdldEF0dHJpYnV0ZXNMaXN0KG11dGF0aW9uc0xpc3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUgfTtcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGlucHV0LmdldEVsZW1lbnQoKSwgY29uZmlnKTtcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGdldElucHV0QWRhcHRlck1ldGhvZHNfXG4gICAgICAgIGdldE5hdGl2ZUlucHV0OiAoKSA9PiBpbnB1dC5nZXRFbGVtZW50KCksXG4gICAgICAgIHNldElucHV0QXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgaW5wdXQuYWRkQXR0cihuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUlucHV0QXR0cjogKG5hbWUpID0+IHtcbiAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyKG5hbWUpO1xuICAgICAgICB9LFxuICAgICAgICBpc0ZvY3VzZWQ6ICgpID0+IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucHV0LmdldEVsZW1lbnQoKSxcbiAgICAgICAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICBpbnB1dC5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICBpbnB1dFxuICAgICAgICAgICAgLmdldEVsZW1lbnQoKVxuICAgICAgICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGdldExhYmVsQWRhcHRlck1ldGhvZHNfXG4gICAgICAgIGZsb2F0TGFiZWw6IChzaG91bGRGbG9hdCkgPT5cbiAgICAgICAgICBmbG9hdGluZ0xhYmVsICYmIGZsb2F0aW5nTGFiZWwuZmxvYXQoc2hvdWxkRmxvYXQpLFxuICAgICAgICBnZXRMYWJlbFdpZHRoOiAoKSA9PiAoZmxvYXRpbmdMYWJlbCA/IGZsb2F0aW5nTGFiZWwuZ2V0V2lkdGgoKSA6IDApLFxuICAgICAgICBoYXNMYWJlbDogKCkgPT4gISFmbG9hdGluZ0xhYmVsLFxuICAgICAgICBzaGFrZUxhYmVsOiAoc2hvdWxkU2hha2UpID0+XG4gICAgICAgICAgZmxvYXRpbmdMYWJlbCAmJiBmbG9hdGluZ0xhYmVsLnNoYWtlKHNob3VsZFNoYWtlKSxcbiAgICAgICAgc2V0TGFiZWxSZXF1aXJlZDogKGlzUmVxdWlyZWQpID0+XG4gICAgICAgICAgZmxvYXRpbmdMYWJlbCAmJiBmbG9hdGluZ0xhYmVsLnNldFJlcXVpcmVkKGlzUmVxdWlyZWQpLFxuXG4gICAgICAgIC8vIGdldExpbmVSaXBwbGVBZGFwdGVyTWV0aG9kc19cbiAgICAgICAgYWN0aXZhdGVMaW5lUmlwcGxlOiAoKSA9PiBsaW5lUmlwcGxlICYmIGxpbmVSaXBwbGUuYWN0aXZhdGUoKSxcblxuICAgICAgICBkZWFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4gbGluZVJpcHBsZSAmJiBsaW5lUmlwcGxlLmRlYWN0aXZhdGUoKSxcblxuICAgICAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiAobm9ybWFsaXplZFgpID0+XG4gICAgICAgICAgbGluZVJpcHBsZSAmJiBsaW5lUmlwcGxlLnNldFJpcHBsZUNlbnRlcihub3JtYWxpemVkWCksXG5cbiAgICAgICAgLy8gZ2V0T3V0bGluZUFkYXB0ZXJNZXRob2RzX1xuICAgICAgICBjbG9zZU91dGxpbmU6ICgpID0+IG5vdGNoZWRPdXRsaW5lICYmIG5vdGNoZWRPdXRsaW5lLmNsb3NlTm90Y2goKSxcbiAgICAgICAgaGFzT3V0bGluZTogKCkgPT4gISFub3RjaGVkT3V0bGluZSxcbiAgICAgICAgbm90Y2hPdXRsaW5lOiAobGFiZWxXaWR0aCkgPT5cbiAgICAgICAgICBub3RjaGVkT3V0bGluZSAmJiBub3RjaGVkT3V0bGluZS5ub3RjaChsYWJlbFdpZHRoKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGdldCBoZWxwZXJUZXh0KCkge1xuICAgICAgICAgIHJldHVybiBoZWxwZXJUZXh0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2hhcmFjdGVyQ291bnRlcigpIHtcbiAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyQ291bnRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxlYWRpbmdJY29uKCkge1xuICAgICAgICAgIHJldHVybiBsZWFkaW5nSWNvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHRyYWlsaW5nSWNvbigpIHtcbiAgICAgICAgICByZXR1cm4gdHJhaWxpbmdJY29uO1xuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAodmFsdWVkKSB7XG4gICAgICBpbnN0YW5jZS5pbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpY2soKS50aGVuKCgpID0+IHtcbiAgICAgICAgaW5zdGFuY2UuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFByb21pc2VSZXNvbHZlKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgIH07XG4gIH0pO1xuXG4gIG9uRGVzdHJveSgoKSA9PiB7XG4gICAgaWYgKHJlbW92ZUxheW91dExpc3RlbmVyKSB7XG4gICAgICByZW1vdmVMYXlvdXRMaXN0ZW5lcigpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFzQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXNcbiAgICAgID8gaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV1cbiAgICAgIDogZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCFpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghKGNsYXNzTmFtZSBpbiBpbnRlcm5hbENsYXNzZXMpIHx8IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0eWxlKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGludGVybmFsU3R5bGVzW25hbWVdICE9IHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIGludGVybmFsU3R5bGVzW25hbWVdO1xuICAgICAgICBpbnRlcm5hbFN0eWxlcyA9IGludGVybmFsU3R5bGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJuYWxTdHlsZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBsYXlvdXQoKSB7XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICBjb25zdCBvcGVuTm90Y2ggPSBpbnN0YW5jZS5zaG91bGRGbG9hdDtcbiAgICAgIGluc3RhbmNlLm5vdGNoT3V0bGluZShvcGVuTm90Y2gpO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG48L3NjcmlwdD5cbiIsIjxkaXZcbiAgYmluZDp0aGlzPXtlbGVtZW50fVxuICB1c2U6dXNlQWN0aW9ucz17dXNlfVxuICB1c2U6Zm9yd2FyZEV2ZW50c1xuICBjbGFzcz17Y2xhc3NNYXAoe1xuICAgIFtjbGFzc05hbWVdOiB0cnVlLFxuICAgICdtZGMtdGV4dC1maWVsZC1oZWxwZXItdGV4dCc6IHRydWUsXG4gICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS1wZXJzaXN0ZW50JzogcGVyc2lzdGVudCxcbiAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXZhbGlkYXRpb24tbXNnJzogdmFsaWRhdGlvbk1zZyxcbiAgICAuLi5pbnRlcm5hbENsYXNzZXMsXG4gIH0pfVxuICBhcmlhLWhpZGRlbj17cGVyc2lzdGVudCA/IG51bGwgOiAndHJ1ZSd9XG4gIHtpZH1cbiAgey4uLmludGVybmFsQXR0cnN9XG4gIHsuLi4kJHJlc3RQcm9wc31cbj5cbiAgeyNpZiBjb250ZW50ID09IG51bGx9PHNsb3QgLz57OmVsc2V9e2NvbnRlbnR9ey9pZn1cbjwvZGl2PlxuXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgbGV0IGNvdW50ZXIgPSAwO1xuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dCc7XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBnZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICdzdmVsdGUvaW50ZXJuYWwnO1xuICBpbXBvcnQge1xuICAgIGZvcndhcmRFdmVudHNCdWlsZGVyLFxuICAgIGNsYXNzTWFwLFxuICAgIHVzZUFjdGlvbnMsXG4gICAgZGlzcGF0Y2gsXG4gIH0gZnJvbSAnQHNtdWkvY29tbW9uL2ludGVybmFsLmpzJztcblxuICBjb25zdCBmb3J3YXJkRXZlbnRzID0gZm9yd2FyZEV2ZW50c0J1aWxkZXIoZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkpO1xuXG4gIGV4cG9ydCBsZXQgdXNlID0gW107XG4gIGxldCBjbGFzc05hbWUgPSAnJztcbiAgZXhwb3J0IHsgY2xhc3NOYW1lIGFzIGNsYXNzIH07XG4gIGV4cG9ydCBsZXQgaWQgPSAnU01VSS10ZXh0ZmllbGQtaGVscGVyLXRleHQtJyArIGNvdW50ZXIrKztcbiAgZXhwb3J0IGxldCBwZXJzaXN0ZW50ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgdmFsaWRhdGlvbk1zZyA9IGZhbHNlO1xuXG4gIGxldCBlbGVtZW50O1xuICBsZXQgaW5zdGFuY2U7XG4gIGxldCBpbnRlcm5hbENsYXNzZXMgPSB7fTtcbiAgbGV0IGludGVybmFsQXR0cnMgPSB7fTtcbiAgbGV0IGNvbnRlbnQgPSBudWxsO1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc3RhbmNlID0gbmV3IE1EQ1RleHRGaWVsZEhlbHBlclRleHRGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzLFxuICAgICAgcmVtb3ZlQ2xhc3MsXG4gICAgICBoYXNDbGFzcyxcbiAgICAgIGdldEF0dHIsXG4gICAgICBzZXRBdHRyOiBhZGRBdHRyLFxuICAgICAgcmVtb3ZlQXR0cixcbiAgICAgIHNldENvbnRlbnQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb250ZW50ID0gdmFsdWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKGlkLnN0YXJ0c1dpdGgoJ1NNVUktdGV4dGZpZWxkLWhlbHBlci10ZXh0LScpKSB7XG4gICAgICBkaXNwYXRjaChnZXRFbGVtZW50KCksICdTTVVJOnRleHRmaWVsZDpoZWxwZXItdGV4dDppZCcsIGlkKTtcbiAgICB9XG4gICAgZGlzcGF0Y2goZ2V0RWxlbWVudCgpLCAnU01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6bW91bnQnLCBpbnN0YW5jZSk7XG5cbiAgICBpbnN0YW5jZS5pbml0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZ2V0RWxlbWVudCgpLCAnU01VSTp0ZXh0ZmllbGQ6aGVscGVyLXRleHQ6dW5tb3VudCcsIGluc3RhbmNlKTtcblxuICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzXG4gICAgICA/IGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdXG4gICAgICA6IGdldEVsZW1lbnQoKS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICghaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0pIHtcbiAgICAgIGludGVybmFsQ2xhc3Nlc1tjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIShjbGFzc05hbWUgaW4gaW50ZXJuYWxDbGFzc2VzKSB8fCBpbnRlcm5hbENsYXNzZXNbY2xhc3NOYW1lXSkge1xuICAgICAgaW50ZXJuYWxDbGFzc2VzW2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBdHRyKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSBpbiBpbnRlcm5hbEF0dHJzXG4gICAgICA/IGludGVybmFsQXR0cnNbbmFtZV1cbiAgICAgIDogZ2V0RWxlbWVudCgpLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaW50ZXJuYWxBdHRyc1tuYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgIGludGVybmFsQXR0cnNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBdHRyKG5hbWUpIHtcbiAgICBpZiAoIShuYW1lIGluIGludGVybmFsQXR0cnMpIHx8IGludGVybmFsQXR0cnNbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgaW50ZXJuYWxBdHRyc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuPC9zY3JpcHQ+XG4iLCI8c2NyaXB0PlxyXG4gICAgaW1wb3J0IHVzZXJzIGZyb20gJy4uLy4uL3N0b3JlL3VzZXJzLXN0b3JlJztcclxuICAgIGltcG9ydCBUZXh0ZmllbGQgZnJvbSAnQHNtdWkvdGV4dGZpZWxkJztcclxuICAgIGltcG9ydCBIZWxwZXJUZXh0IGZyb20gJ0BzbXVpL3RleHRmaWVsZC9oZWxwZXItdGV4dC9pbmRleCc7XHJcbiAgICBpbXBvcnQgQnV0dG9uLCB7IExhYmVsIH0gZnJvbSAnQHNtdWkvYnV0dG9uJztcclxuICAgXHJcbiAgICBleHBvcnQgbGV0IGlkID0gbnVsbDtcclxuXHJcbiAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgbGV0IHVzZXJuYW1lID0gJyc7XHJcbiAgICBsZXQgZW1haWwgPSAnJztcclxuICAgIGxldCB3ZWJzaXRlID0gJyc7XHJcblxyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSB1c2Vycy5zdWJzY3JpYmUoaXRlbXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFVzZXIgPSBpdGVtcy5maW5kKGkgPT4gaS5pZCA9PT0gaWQpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IHNlbGVjdGVkVXNlci5uYW1lO1xyXG4gICAgICAgICAgICB1c2VybmFtZSA9IHNlbGVjdGVkVXNlci51c2VybmFtZTtcclxuICAgICAgICAgICAgZW1haWwgPSBzZWxlY3RlZFVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgIHdlYnNpdGUgPSBzZWxlY3RlZFVzZXIud2Vic2l0ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48Zm9ybSBjbGFzcz1cInctNTAgbS1hdXRvXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1ucyBtYXJnaW5zXCI+XHJcbiAgICAgICAgPFRleHRmaWVsZCB2YXJpYW50PVwib3V0bGluZWRcIlxyXG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtuYW1lfVxyXG4gICAgICAgICAgICBsYWJlbD1cIk5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInctMTAwXCJcclxuICAgICAgICAgICAgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgIDxIZWxwZXJUZXh0IHNsb3Q9XCJoZWxwZXJcIj5cclxuICAgICAgICAgICAgICAgIE5hbWUgaXMgUmVxdWlyZWRcclxuICAgICAgICAgICAgPC9IZWxwZXJUZXh0PlxyXG4gICAgICAgIDwvVGV4dGZpZWxkPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxUZXh0ZmllbGQgdmFyaWFudD1cIm91dGxpbmVkXCJcclxuICAgICAgICAgICAgYmluZDp2YWx1ZT17dXNlcm5hbWV9XHJcbiAgICAgICAgICAgIGxhYmVsPVwiVXNlcm5hbWVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInctMTAwXCJcclxuICAgICAgICAgICAgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgIDxIZWxwZXJUZXh0IHNsb3Q9XCJoZWxwZXJcIj5cclxuICAgICAgICAgICAgICAgIFVzZXJuYW1lIGlzIFJlcXVpcmVkXHJcbiAgICAgICAgICAgIDwvSGVscGVyVGV4dD5cclxuICAgICAgICA8L1RleHRmaWVsZD5cclxuICAgICAgICBcclxuICAgICAgICA8VGV4dGZpZWxkIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXHJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2VtYWlsfVxyXG4gICAgICAgICAgICBsYWJlbD1cIkUtTWFpbFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgICAgICByZXF1aXJlZD5cclxuICAgICAgICAgICAgPEhlbHBlclRleHQgc2xvdD1cImhlbHBlclwiPlxyXG4gICAgICAgICAgICAgICAgRS1NYWlsIGlzIFJlcXVpcmVkXHJcbiAgICAgICAgICAgIDwvSGVscGVyVGV4dD5cclxuICAgICAgICA8L1RleHRmaWVsZD5cclxuICAgICAgICBcclxuICAgICAgICA8VGV4dGZpZWxkIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXHJcbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e3dlYnNpdGV9XHJcbiAgICAgICAgICAgIGxhYmVsPVwiV2Vic2l0ZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgICAgICByZXF1aXJlZD5cclxuICAgICAgICAgICAgPEhlbHBlclRleHQgc2xvdD1cImhlbHBlclwiPlxyXG4gICAgICAgICAgICAgICAgV2Vic2l0ZSBpcyBSZXF1aXJlZFxyXG4gICAgICAgICAgICA8L0hlbHBlclRleHQ+XHJcbiAgICAgICAgPC9UZXh0ZmllbGQ+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxCdXR0b24gb246Y2xpY2s9eygpID0+IGNvbnNvbGUubG9nKCdjbGlja2VkIScpfSB2YXJpYW50PVwicmFpc2VkXCIgY2xhc3M9XCJ3LTUwXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD5TYXZlPC9MYWJlbD5cclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICBcclxuICAgICAgICA8QnV0dG9uIG9uOmNsaWNrPXsoKSA9PiBjb25zb2xlLmxvZygnY2xpY2tlZCEnKX0gdmFyaWFudD1cIm91dGxpbmVkXCIgY2xhc3M9XCJ3LTUwXCI+XHJcbiAgICAgICAgICAgIDxMYWJlbD5DYW5jZWw8L0xhYmVsPlxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbjwvZm9ybT5cclxuIl0sIm5hbWVzIjpbImNzc0NsYXNzZXMiLCJzdHJpbmdzIiwibnVtYmVycyIsInVzZXJzIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQUlBLFlBQVUsR0FBRztBQUN4QixJQUFJLGlCQUFpQixFQUFFLGlDQUFpQztBQUN4RCxJQUFJLGNBQWMsRUFBRSw4QkFBOEI7QUFDbEQsSUFBSSxXQUFXLEVBQUUsMkJBQTJCO0FBQzVDLElBQUksSUFBSSxFQUFFLG9CQUFvQjtBQUM5QixDQUFDOztBQzNCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBLElBQUksMEJBQTBCLGtCQUFrQixVQUFVLE1BQU0sRUFBRTtBQUNsRSxJQUFJLFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxJQUFJLFNBQVMsMEJBQTBCLENBQUMsT0FBTyxFQUFFO0FBQ2pELFFBQVEsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElB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YUFBYSxDQUFDLElBQUksSUFBSSxTQUFTOzs7O1VBSW5CLFVBQVU7U0FDakIsT0FBTzs7Ozs7R0FoSEwsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0M2QkksR0FBSTtvQ0FBSixHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQVVKLEdBQVE7d0NBQVIsR0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQVVSLEdBQUs7cUNBQUwsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFVTCxHQUFPO3VDQUFQLEdBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQTlCUCxHQUFJOzs7Ozs7Ozs7Ozs7OzRDQVVKLEdBQVE7Ozs7Ozs7Ozs7Ozs7eUNBVVIsR0FBSzs7Ozs7Ozs7Ozs7OzsyQ0FVTCxHQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdERoQixFQUFFLEdBQUcsSUFBSTtLQUVoQixJQUFJLEdBQUcsRUFBRTtLQUNULFFBQVEsR0FBRyxFQUFFO0tBQ2IsS0FBSyxHQUFHLEVBQUU7S0FDVixPQUFPLEdBQUcsRUFBRTs7S0FFWixFQUFFO1FBQ0ksV0FBVyxHQUFHRSxXQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7U0FDL0IsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTttQkFFaEQsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJO21CQUN4QixRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVE7bUJBQ2hDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSzttQkFDMUIsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPOzs7RUFHbEMsV0FBVzs7Ozs7Ozs7OztFQU9LLElBQUk7Ozs7O0VBVUosUUFBUTs7Ozs7RUFVUixLQUFLOzs7OztFQVVMLE9BQU87Ozs7NkJBV0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVOytCQUl0QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
