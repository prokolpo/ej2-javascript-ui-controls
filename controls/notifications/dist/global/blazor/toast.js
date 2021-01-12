window.sf = window.sf || {};
var sftoast = (function (exports) {
'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ROOT = 'e-toast';
var CONTAINER = 'e-toast-container';
var TITLE = 'e-toast-title';
var WIDTHFULL = 'e-toast-full-width';
var CONTENT = 'e-toast-content';
var MESSAGE = 'e-toast-message';
var ICON = 'e-toast-icon';
var PROGRESS = 'e-toast-progress';
var ACTIOBUTTONS = 'e-toast-actions';
var CLOSEBTN = 'e-toast-close-icon';
var RTL = 'e-rtl';
var TOAST_BLAZOR_HIDDEN = 'e-blazor-toast-hidden';
/**
 * An object that is used to configure the Toast X Y positions.
 */
var ToastPosition = /** @class */ (function (_super) {
    __extends(ToastPosition, _super);
    function ToastPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sf.base.Property('Left')
    ], ToastPosition.prototype, "X", void 0);
    __decorate([
        sf.base.Property('Top')
    ], ToastPosition.prototype, "Y", void 0);
    return ToastPosition;
}(sf.base.ChildProperty));
/**
 * An object that is used to configure the action button model properties and event.
 */
var ButtonModelProps = /** @class */ (function (_super) {
    __extends(ButtonModelProps, _super);
    function ButtonModelProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sf.base.Property(null)
    ], ButtonModelProps.prototype, "model", void 0);
    __decorate([
        sf.base.Property(null)
    ], ButtonModelProps.prototype, "click", void 0);
    return ButtonModelProps;
}(sf.base.ChildProperty));
/**
 * An object that is used to configure the animation object of Toast.
 */
var ToastAnimations = /** @class */ (function (_super) {
    __extends(ToastAnimations, _super);
    function ToastAnimations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sf.base.Property('FadeIn')
    ], ToastAnimations.prototype, "effect", void 0);
    __decorate([
        sf.base.Property(600)
    ], ToastAnimations.prototype, "duration", void 0);
    __decorate([
        sf.base.Property('ease')
    ], ToastAnimations.prototype, "easing", void 0);
    return ToastAnimations;
}(sf.base.ChildProperty));
/**
 * An object that is used to configure the show/hide animation settings of Toast.
 */
var ToastAnimationSettings = /** @class */ (function (_super) {
    __extends(ToastAnimationSettings, _super);
    function ToastAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sf.base.Complex({ effect: 'FadeIn', duration: 600, easing: 'ease' }, ToastAnimations)
    ], ToastAnimationSettings.prototype, "show", void 0);
    __decorate([
        sf.base.Complex({ effect: 'FadeOut', duration: 600, easing: 'ease' }, ToastAnimations)
    ], ToastAnimationSettings.prototype, "hide", void 0);
    return ToastAnimationSettings;
}(sf.base.ChildProperty));
/**
 * The Toast is a notification pop-up that showing on desired position which can provide an information to the user.
 *  * ```html
 * <div id="toast"/>
 * <script>
 *   var toastObj = new Toast();
 *   toastObj.appendTo("#toast");
 * </script>
 * ```
 */
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    /**
     * Initializes a new instance of the Toast class.
     * @param options  - Specifies Toast model properties as options.
     * @param element  - Specifies the element that is rendered as a Toast.
     */
    function Toast(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.toastCollection = [];
        return _this;
    }
    /**
     * Gets the Component module name.
     * @private
     */
    Toast.prototype.getModuleName = function () {
        return 'toast';
    };
    /**
     * Gets the persisted state properties of the Component.
     */
    Toast.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers, attributes and classes.
     */
    Toast.prototype.destroy = function () {
        this.hide('All');
        this.element.classList.remove(CONTAINER);
        sf.base.setStyleAttribute(this.element, { 'position': '', 'z-index': '' });
        if (!sf.base.isNullOrUndefined(this.refElement) && !sf.base.isNullOrUndefined(this.refElement.parentElement)) {
            this.refElement.parentElement.insertBefore(this.element, this.refElement);
            sf.base.detach(this.refElement);
            this.refElement = undefined;
        }
        if (!this.isBlazorServer()) {
            _super.prototype.destroy.call(this);
        }
    };
    /**
     * Initialize the event handler
     * @private
     */
    Toast.prototype.preRender = function () {
        //There is no event handler
        this.isDevice = sf.base.Browser.isDevice;
        if (this.width === '300px') {
            this.width = (this.isDevice && screen.width < 768) ? '100%' : '300px';
        }
        if (sf.base.isNullOrUndefined(this.target)) {
            this.target = document.body;
        }
        if (this.enableRtl && !this.isBlazorServer()) {
            this.element.classList.add(RTL);
        }
    };
    /**
     * Initialize the component rendering
     * @private
     */
    Toast.prototype.render = function () {
        this.progressObj = [];
        this.intervalId = [];
        this.contentTemplate = null;
        this.toastTemplate = null;
        if (this.isDevice && screen.width < 768) {
            new sf.base.Touch(this.element, { swipe: this.swipeHandler.bind(this) });
        }
        this.renderComplete();
        this.initRenderClass = this.element.className;
    };
    /**
     * To show Toast element on a document with the relative position.
     * @param  {ToastModel} toastObj? - To show Toast element on screen.
     * @returns void
     * @deprecated
     */
    Toast.prototype.show = function (toastObj) {
        var collectionObj;
        if (!sf.base.isNullOrUndefined(toastObj)) {
            this.templateChanges(toastObj);
            collectionObj = JSON.parse(JSON.stringify(toastObj));
            sf.base.extend(this, this, toastObj);
        }
        if (sf.base.isNullOrUndefined(this.toastContainer)) {
            this.toastContainer = this.getContainer();
            var target = typeof (this.target) === 'string' ? document.querySelector(this.target) : document.body;
            if (sf.base.isNullOrUndefined(target)) {
                return;
            }
            if (target.tagName === 'BODY') {
                this.toastContainer.style.position = 'fixed';
            }
            else {
                this.toastContainer.style.position = 'absolute';
                target.style.position = 'relative';
            }
            this.setPositioning(this.position);
            target.appendChild(this.toastContainer);
        }
        if (this.isBlazorServer() && this.element.classList.contains('e-control')) {
            this.isToastModel(toastObj);
            return;
        }
        this.toastEle = this.createElement('div', { className: ROOT, id: sf.base.getUniqueID('toast') });
        this.setWidthHeight();
        this.setCSSClass(this.cssClass);
        (sf.base.isNullOrUndefined(this.template) || this.template === '') ? this.personalizeToast() : this.templateRendering();
        this.setProgress();
        this.setCloseButton();
        this.setAria();
        this.appendToTarget(toastObj);
        if (!sf.base.isNullOrUndefined(collectionObj)) {
            sf.base.extend(collectionObj, { element: [this.toastEle] }, true);
            this.toastCollection.push(collectionObj);
        }
        // tslint:disable-next-line:no-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * @hidden
     * @deprecated
     * This method applicable for blazor alone.
     */
    Toast.prototype.showToast = function (id, toastObj) {
        this.toastEle = this.element.querySelector('#' + id);
        this.show(toastObj);
    };
    Toast.prototype.isToastModel = function (toastObj) {
        this.toastContainer = this.element;
        this.setPositioning(this.position);
        var proxy = this;
        if (!sf.base.isNullOrUndefined(proxy.element.lastElementChild)) {
            this.setProgress();
        }
        this.setAria();
        this.appendToTarget(toastObj);
    };
    Toast.prototype.swipeHandler = function (e) {
        var toastEle = sf.base.closest(e.originalEvent.target, '.' + ROOT + ':not(.' + CONTAINER + ')');
        var hideAnimation = this.animation.hide.effect;
        if (!sf.base.isNullOrUndefined(toastEle)) {
            if (e.swipeDirection === 'Right') {
                this.animation.hide.effect = 'SlideRightOut';
                this.hide(toastEle);
            }
            else if (e.swipeDirection === 'Left') {
                this.animation.hide.effect = 'SlideLeftOut';
                this.hide(toastEle);
            }
            this.animation.hide.effect = hideAnimation;
        }
    };
    Toast.prototype.templateChanges = function (toastObj) {
        if (!sf.base.isUndefined(toastObj.content) && !sf.base.isNullOrUndefined(this.contentTemplate) && this.content !== toastObj.content) {
            this.clearContentTemplate();
        }
        if (!sf.base.isUndefined(toastObj.template) && !sf.base.isNullOrUndefined(this.toastTemplate) && this.template !== toastObj.template) {
            this.clearToastTemplate();
        }
    };
    Toast.prototype.setCSSClass = function (cssClass) {
        if (cssClass) {
            var split = cssClass.indexOf(',') !== -1 ? ',' : ' ';
            sf.base.classList(this.toastEle, cssClass.split(split), []);
        }
    };
    Toast.prototype.setWidthHeight = function () {
        if (this.width === '300px') {
            this.toastEle.style.width = sf.base.formatUnit(this.width);
        }
        else if (this.width === '100%') {
            this.toastContainer.classList.add(WIDTHFULL);
        }
        else {
            this.toastEle.style.width = sf.base.formatUnit(this.width);
            this.toastContainer.classList.remove(WIDTHFULL);
        }
        this.toastEle.style.height = sf.base.formatUnit(this.height);
    };
    Toast.prototype.templateRendering = function () {
        this.fetchEle(this.toastEle, this.template, 'template');
    };
    /**
     * @hidden
     */
    Toast.prototype.sanitizeHelper = function (value) {
        if (this.enableHtmlSanitizer) {
            var item = sf.base.SanitizeHtmlHelper.beforeSanitize();
            var beforeEvent = {
                cancel: false,
                helper: null
            };
            sf.base.extend(item, item, beforeEvent);
            this.trigger('beforeSanitizeHtml', item);
            if (item.cancel && !sf.base.isNullOrUndefined(item.helper)) {
                value = item.helper(value);
            }
            else if (!item.cancel) {
                value = sf.base.SanitizeHtmlHelper.serializeValue(item, value);
            }
        }
        return value;
    };
    /**
     * To Hide Toast element on a document.
     * To Hide all toast element when passing 'All'.
     * @param  {HTMLElement| Element| string} element? - To Hide Toast element on screen.
     * @returns void
     */
    Toast.prototype.hide = function (element) {
        if (sf.base.isNullOrUndefined(this.toastContainer) || this.toastContainer.childElementCount === 0) {
            return;
        }
        if (typeof element === 'string' && element === 'All') {
            for (var i = 0; i < this.toastContainer.childElementCount; i++) {
                this.destroyToast(this.toastContainer.children[i]);
            }
            return;
        }
        if (sf.base.isNullOrUndefined(element)) {
            element = (this.newestOnTop ? this.toastContainer.lastElementChild : this.toastContainer.firstElementChild);
        }
        this.destroyToast(element);
        // tslint:disable-next-line:no-any
        if (this.isReact) {
            this.clearTemplate();
        }
    };
    Toast.prototype.fetchEle = function (ele, value, prob) {
        value = typeof (value) === 'string' ? this.sanitizeHelper(value) : value;
        var templateFn;
        var tempVar;
        var tmpArray;
        var templateProps;
        if (ele.classList.contains(TITLE)) {
            templateProps = this.element.id + 'title';
        }
        else if (ele.classList.contains(CONTENT)) {
            templateProps = this.element.id + 'content';
        }
        else {
            templateProps = this.element.id + 'template';
        }
        prob === 'content' ? tempVar = this.contentTemplate : tempVar = this.toastTemplate;
        if (!sf.base.isNullOrUndefined(tempVar)) {
            ele.appendChild(tempVar.cloneNode(true));
            return ele;
        }
        try {
            if (document.querySelectorAll(value).length > 0) {
                var elem = null;
                if (prob !== 'title') {
                    elem = document.querySelector(value);
                    ele.appendChild(elem);
                    elem.style.display = '';
                }
                var clo = sf.base.isNullOrUndefined(elem) ? tempVar : elem.cloneNode(true);
                prob === 'content' ? this.contentTemplate = clo : this.toastTemplate = clo;
            }
        }
        catch (e) {
            templateFn = sf.base.compile(value);
            
        }
        if (!sf.base.isNullOrUndefined(templateFn)) {
            if (!this.isBlazorServer()) {
                tmpArray = templateFn({}, this, prob, null, true);
            }
            else {
                var isString = true;
                tmpArray = templateFn({}, this, prob, templateProps, isString);
            }
        }
        if (!sf.base.isNullOrUndefined(tmpArray) && tmpArray.length > 0 && !(sf.base.isNullOrUndefined(tmpArray[0].tagName) && tmpArray.length === 1)) {
            [].slice.call(tmpArray).forEach(function (el) {
                if (!sf.base.isNullOrUndefined(el.tagName)) {
                    el.style.display = '';
                }
                ele.appendChild(el);
            });
        }
        else if (ele.childElementCount === 0) {
            ele.innerHTML = value;
        }
        return ele;
    };
    Toast.prototype.clearProgress = function (intervalId) {
        if (!sf.base.isNullOrUndefined(this.intervalId[intervalId])) {
            clearInterval(this.intervalId[intervalId]);
            delete this.intervalId[intervalId];
        }
        if (!sf.base.isNullOrUndefined(this.progressObj[intervalId])) {
            clearInterval(this.progressObj[intervalId].intervalId);
            delete this.progressObj[intervalId];
        }
    };
    Toast.prototype.clearContainerPos = function () {
        var _this = this;
        if (this.isBlazorServer()) {
            this.toastContainer = null;
            return;
        }
        if (this.customPosition) {
            sf.base.setStyleAttribute(this.toastContainer, { 'left': '', 'top': '' });
            this.toastContainer = null;
            this.customPosition = false;
        }
        else {
            [ROOT + '-top-left',
                ROOT + '-top-right',
                ROOT + '-bottom-left',
                ROOT + '-bottom-right',
                ROOT + '-bottom-center',
                ROOT + '-top-center',
                ROOT + '-full-width'].forEach(function (pos) {
                if (!sf.base.isNullOrUndefined(_this.toastContainer) && _this.toastContainer.classList.contains(pos)) {
                    _this.toastContainer.classList.remove(pos);
                }
            });
            this.toastContainer = null;
        }
        if (!sf.base.isNullOrUndefined(this.contentTemplate)) {
            this.clearContentTemplate();
        }
        if (!sf.base.isNullOrUndefined(this.toastTemplate)) {
            this.clearToastTemplate();
        }
    };
    Toast.prototype.clearContentTemplate = function () {
        this.contentTemplate.style.display = 'none';
        document.body.appendChild(this.contentTemplate);
        this.contentTemplate = null;
    };
    Toast.prototype.clearToastTemplate = function () {
        this.toastTemplate.style.display = 'none';
        document.body.appendChild(this.toastTemplate);
        this.toastTemplate = null;
    };
    Toast.prototype.isBlazorServer = function () {
        return (sf.base.isBlazor() && this.isServerRendered);
    };
    Toast.prototype.destroyToast = function (toastEle) {
        var _this = this;
        var toastObj;
        for (var i = 0; i < this.toastCollection.length; i++) {
            if (this.toastCollection[i].element[0] === toastEle) {
                toastObj = this.toastCollection[i];
                this.toastCollection.splice(i, 1);
            }
        }
        var hideAnimate = this.animation.hide;
        var animate = {
            duration: hideAnimate.duration, name: hideAnimate.effect, timingFunction: hideAnimate.easing
        };
        var intervalId = parseInt(toastEle.id.split('toast_')[1], 10);
        var toastClose = this.isBlazorServer() ? {
            options: toastObj,
            toastContainer: this.toastContainer
        } : {
            options: toastObj,
            toastContainer: this.toastContainer,
            toastObj: this,
        };
        if (!sf.base.isNullOrUndefined(this.progressObj[intervalId]) && !sf.base.isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
            this.progressObj[intervalId].progressEle.style.width = '0%';
        }
        animate.end = function () {
            _this.clearProgress(intervalId);
            if (!_this.isBlazorServer() || sf.base.isNullOrUndefined(toastObj)) {
                sf.base.detach(toastEle);
            }
            _this.trigger('close', toastClose);
            if (_this.toastContainer.childElementCount === 0) {
                _this.clearContainerPos();
            }
        };
        new sf.base.Animation({}).animate(toastEle, animate);
    };
    Toast.prototype.personalizeToast = function () {
        this.setIcon();
        this.setTitle();
        this.setContent();
        this.actionButtons();
    };
    Toast.prototype.setAria = function () {
        sf.base.attributes(this.toastEle, { 'role': 'alert' });
    };
    Toast.prototype.setPositioning = function (pos) {
        if (this.isBlazorServer()) {
            return;
        }
        if (!isNaN(parseFloat(pos.X)) || !isNaN(parseFloat(pos.Y))) {
            this.customPosition = true;
            sf.base.setStyleAttribute(this.toastContainer, { 'left': sf.base.formatUnit(pos.X), 'top': sf.base.formatUnit(pos.Y) });
        }
        else {
            this.toastContainer.classList.add(ROOT + '-' + pos.Y.toString().toLowerCase() + '-' + pos.X.toString().toLowerCase());
        }
    };
    Toast.prototype.setCloseButton = function () {
        if (!this.showCloseButton) {
            return;
        }
        var localeText = { close: 'Close' };
        this.l10n = new sf.base.L10n('toast', localeText, this.locale);
        this.l10n.setLocale(this.locale);
        var closeIconTitle = this.l10n.getConstant('close');
        var closeBtn = this.createElement('div', { className: CLOSEBTN + ' e-icons ', attrs: { tabindex: '0', 'aria-label': closeIconTitle } });
        this.toastEle.appendChild(closeBtn);
    };
    Toast.prototype.setProgress = function () {
        if (this.timeOut > 0) {
            var id = parseInt(this.toastEle.id.split('toast_')[1], 10);
            this.intervalId[id] = window.setTimeout(this.destroyToast.bind(this, this.toastEle), this.timeOut);
            this.progressObj[id] = { hideEta: null, intervalId: null, maxHideTime: null, element: null, timeOutId: null, progressEle: null };
            this.progressObj[id].maxHideTime = parseFloat(this.timeOut + '');
            this.progressObj[id].hideEta = new Date().getTime() + this.progressObj[id].maxHideTime;
            this.progressObj[id].element = this.toastEle;
            if (this.extendedTimeout > 0) {
                sf.base.EventHandler.add(this.toastEle, 'mouseover', this.toastHoverAction.bind(this, id));
                sf.base.EventHandler.add(this.toastEle, 'mouseleave', this.delayedToastProgress.bind(this, id));
                this.progressObj[id].timeOutId = this.intervalId[id];
            }
            if (this.showProgressBar) {
                this.progressBarEle = this.createElement('div', { className: PROGRESS });
                this.toastEle.insertBefore(this.progressBarEle, this.toastEle.children[0]);
                this.progressObj[id].intervalId = setInterval(this.updateProgressBar.bind(this, this.progressObj[id]), 10);
                this.progressObj[id].progressEle = this.progressBarEle;
            }
        }
    };
    Toast.prototype.toastHoverAction = function (id) {
        clearTimeout(this.progressObj[id].timeOutId);
        clearInterval(this.progressObj[id].intervalId);
        this.progressObj[id].hideEta = 0;
        var toastEle = this.progressObj[id].element;
        if (!sf.base.isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
            this.progressObj[id].progressEle.style.width = '0%';
        }
    };
    Toast.prototype.delayedToastProgress = function (id) {
        var progress = this.progressObj[id];
        var toastEle = progress.element;
        progress.timeOutId = window.setTimeout(this.destroyToast.bind(this, toastEle), this.extendedTimeout);
        progress.maxHideTime = parseFloat(this.extendedTimeout + '');
        progress.hideEta = new Date().getTime() + progress.maxHideTime;
        if (!sf.base.isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
            progress.intervalId = setInterval(this.updateProgressBar.bind(this, progress), 10);
        }
    };
    Toast.prototype.updateProgressBar = function (progressObj) {
        var percentage = ((progressObj.hideEta - (new Date().getTime())) / progressObj.maxHideTime) * 100;
        progressObj.progressEle.style.width = percentage + '%';
    };
    Toast.prototype.setIcon = function () {
        if (sf.base.isNullOrUndefined(this.icon) || this.icon.length === 0) {
            return;
        }
        var iconEle = this.createElement('div', { className: ICON + ' e-icons ' + this.icon });
        this.toastEle.appendChild(iconEle);
    };
    Toast.prototype.setTitle = function () {
        if (sf.base.isNullOrUndefined(this.title)) {
            return;
        }
        var titleEle = this.createElement('div', { className: TITLE });
        titleEle = this.fetchEle(titleEle, this.title, 'title');
        var msgContainer = this.createElement('div', { className: MESSAGE });
        msgContainer.appendChild(titleEle);
        this.toastEle.appendChild(msgContainer);
    };
    Toast.prototype.setContent = function () {
        var contentEle = this.createElement('div', { className: CONTENT });
        var ele = this.element;
        if (sf.base.isNullOrUndefined(this.content) || this.content === '') {
            var isContent = this.element.innerHTML.replace(/\s/g, '') !== '';
            if ((ele.children.length > 0 || isContent) && !(ele.firstElementChild && ele.firstElementChild.classList.contains(ROOT))) {
                this.innerEle = document.createDocumentFragment();
                var tempEle_1 = this.createElement('div');
                while (ele.childNodes.length !== 0) {
                    this.innerEle.appendChild(this.element.childNodes[0]);
                }
                contentEle.appendChild(this.innerEle);
                [].slice.call(contentEle.children).forEach(function (ele) {
                    tempEle_1.appendChild(ele.cloneNode(true));
                });
                this.content = tempEle_1;
                this.appendMessageContainer(contentEle);
            }
        }
        else {
            if (typeof (this.content) === 'object' && !sf.base.isNullOrUndefined(this.content.tagName)) {
                contentEle.appendChild(this.content);
                this.content = this.content.cloneNode(true);
                this.appendMessageContainer(contentEle);
            }
            else {
                contentEle = this.fetchEle(contentEle, this.content, 'content');
                this.appendMessageContainer(contentEle);
            }
        }
    };
    Toast.prototype.appendMessageContainer = function (element) {
        if (this.toastEle.querySelectorAll('.' + MESSAGE).length > 0) {
            this.toastEle.querySelector('.' + MESSAGE).appendChild(element);
        }
        else {
            var msgContainer = this.createElement('div', { className: MESSAGE });
            msgContainer.appendChild(element);
            this.toastEle.appendChild(msgContainer);
        }
    };
    Toast.prototype.actionButtons = function () {
        var _this = this;
        var actionBtnContainer = this.createElement('div', { className: ACTIOBUTTONS });
        [].slice.call(this.buttons).forEach(function (actionBtn) {
            if (sf.base.isNullOrUndefined(actionBtn.model)) {
                return;
            }
            var btnDom = _this.createElement('button');
            btnDom.setAttribute('type', 'button');
            if (sf.base.isNullOrUndefined(actionBtn.model.cssClass) || actionBtn.model.cssClass.length === 0) {
                actionBtn.model.cssClass = 'e-primary';
            }
            btnDom.classList.add('e-small');
            new sf.buttons.Button(actionBtn.model, btnDom);
            if (!sf.base.isNullOrUndefined(actionBtn.click) && typeof (actionBtn.click) === 'function') {
                sf.base.EventHandler.add(btnDom, 'click', actionBtn.click);
            }
            actionBtnContainer.appendChild(btnDom);
        });
        if (actionBtnContainer.childElementCount > 0) {
            this.appendMessageContainer(actionBtnContainer);
        }
    };
    Toast.prototype.appendToTarget = function (toastObj) {
        var _this = this;
        var toastBeforeOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle,
            cancel: false
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle,
            cancel: false
        };
        this.trigger('beforeOpen', toastBeforeOpen, function (toastBeforeOpenArgs) {
            if (!toastBeforeOpenArgs.cancel) {
                if (!_this.isBlazorServer()) {
                    _this.toastEle.style.display = 'none';
                }
                if (_this.newestOnTop && _this.toastContainer.childElementCount !== 0) {
                    _this.toastContainer.insertBefore(_this.toastEle, _this.toastContainer.children[0]);
                }
                else if (!_this.isBlazorServer()) {
                    _this.toastContainer.appendChild(_this.toastEle);
                }
                sf.base.removeClass([_this.toastEle], TOAST_BLAZOR_HIDDEN);
                sf.base.EventHandler.add(_this.toastEle, 'click', _this.clickHandler, _this);
                sf.base.EventHandler.add(_this.toastEle, 'keydown', _this.keyDownHandler, _this);
                _this.toastContainer.style.zIndex = sf.popups.getZindexPartial(_this.toastContainer) + '';
                _this.displayToast(_this.toastEle, toastObj);
            }
            else if (_this.isBlazorServer()) {
                var intervalId = parseInt(_this.toastEle.id.split('toast_')[1], 10);
                _this.clearProgress(intervalId);
                sf.base.detach(_this.toastEle);
                if (_this.toastContainer.childElementCount === 0) {
                    _this.clearContainerPos();
                }
            }
        });
    };
    Toast.prototype.clickHandler = function (e) {
        var _this = this;
        if (!this.isBlazorServer()) {
            e.stopPropagation();
        }
        var target = e.target;
        var toastEle = sf.base.closest(target, '.' + ROOT);
        var clickArgs = this.isBlazorServer() ? {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e
        } : {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e, toastObj: this
        };
        var isCloseIcon = target.classList.contains(CLOSEBTN);
        this.trigger('click', clickArgs, function (toastClickArgs) {
            if ((isCloseIcon && !toastClickArgs.cancel) || toastClickArgs.clickToClose) {
                _this.destroyToast(toastEle);
            }
        });
    };
    Toast.prototype.keyDownHandler = function (e) {
        if (e.target.classList.contains(CLOSEBTN) &&
            (e.keyCode === 13 || e.keyCode === 32)) {
            var target = e.target;
            var toastEle = sf.base.closest(target, '.' + ROOT);
            this.destroyToast(toastEle);
        }
    };
    Toast.prototype.displayToast = function (toastEle, toastObj) {
        var _this = this;
        var showAnimate = this.animation.show;
        var animate = {
            duration: showAnimate.duration, name: showAnimate.effect, timingFunction: showAnimate.easing
        };
        var toastOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle,
        };
        animate.begin = function () {
            toastEle.style.display = '';
        };
        animate.end = function () {
            _this.trigger('open', toastOpen);
        };
        new sf.base.Animation(animate).animate(toastEle);
    };
    Toast.prototype.getContainer = function () {
        this.element.classList.add(CONTAINER);
        return this.element;
    };
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    Toast.prototype.onPropertyChanged = function (newProp, oldProp) {
        var container = this.element;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    newProp.enableRtl ? container.classList.add(RTL) : container.classList.remove(RTL);
                    break;
            }
        }
    };
    __decorate([
        sf.base.Property('300px')
    ], Toast.prototype, "width", void 0);
    __decorate([
        sf.base.Property('auto')
    ], Toast.prototype, "height", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "title", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "content", void 0);
    __decorate([
        sf.base.Property(true)
    ], Toast.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "icon", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "cssClass", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "template", void 0);
    __decorate([
        sf.base.Property(true)
    ], Toast.prototype, "newestOnTop", void 0);
    __decorate([
        sf.base.Property(false)
    ], Toast.prototype, "showCloseButton", void 0);
    __decorate([
        sf.base.Property(false)
    ], Toast.prototype, "showProgressBar", void 0);
    __decorate([
        sf.base.Property(5000)
    ], Toast.prototype, "timeOut", void 0);
    __decorate([
        sf.base.Property(1000)
    ], Toast.prototype, "extendedTimeout", void 0);
    __decorate([
        sf.base.Complex({}, ToastAnimationSettings)
    ], Toast.prototype, "animation", void 0);
    __decorate([
        sf.base.Complex({}, ToastPosition)
    ], Toast.prototype, "position", void 0);
    __decorate([
        sf.base.Collection([{}], ButtonModelProps)
    ], Toast.prototype, "buttons", void 0);
    __decorate([
        sf.base.Property(null)
    ], Toast.prototype, "target", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "created", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "destroyed", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "open", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "beforeOpen", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "close", void 0);
    __decorate([
        sf.base.Event()
    ], Toast.prototype, "click", void 0);
    Toast = __decorate([
        sf.base.NotifyPropertyChanges
    ], Toast);
    return Toast;
}(sf.base.Component));

/**
 * Toast modules
 */

exports.ToastPosition = ToastPosition;
exports.ButtonModelProps = ButtonModelProps;
exports.ToastAnimations = ToastAnimations;
exports.ToastAnimationSettings = ToastAnimationSettings;
exports.Toast = Toast;

return exports;

});

    sf.notifications = sf.base.extend({}, sf.notifications, sftoast({}));