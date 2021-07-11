import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Input, NgZone, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges, coerceBooleanProperty, isShowEl, } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        // prettier-ignore
        this.s__beforeBreakpoint = new EventEmitter();
        // prettier-ignore
        this.s__containerClasses = new EventEmitter();
        // prettier-ignore
        this.s__slideClass = new EventEmitter();
        // prettier-ignore
        this.s__swiper = new EventEmitter();
        // prettier-ignore
        this.s_activeIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_afterInit = new EventEmitter();
        // prettier-ignore
        this.s_autoplay = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStart = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStop = new EventEmitter();
        // prettier-ignore
        this.s_beforeDestroy = new EventEmitter();
        // prettier-ignore
        this.s_beforeInit = new EventEmitter();
        // prettier-ignore
        this.s_beforeLoopFix = new EventEmitter();
        // prettier-ignore
        this.s_beforeResize = new EventEmitter();
        // prettier-ignore
        this.s_beforeSlideChangeStart = new EventEmitter();
        // prettier-ignore
        this.s_beforeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_breakpoint = new EventEmitter();
        // prettier-ignore
        this.s_changeDirection = new EventEmitter();
        // prettier-ignore
        this.s_click = new EventEmitter();
        // prettier-ignore
        this.s_doubleTap = new EventEmitter();
        // prettier-ignore
        this.s_doubleClick = new EventEmitter();
        // prettier-ignore
        this.s_destroy = new EventEmitter();
        // prettier-ignore
        this.s_fromEdge = new EventEmitter();
        // prettier-ignore
        this.s_hashChange = new EventEmitter();
        // prettier-ignore
        this.s_hashSet = new EventEmitter();
        // prettier-ignore
        this.s_imagesReady = new EventEmitter();
        // prettier-ignore
        this.s_init = new EventEmitter();
        // prettier-ignore
        this.s_keyPress = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageLoad = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageReady = new EventEmitter();
        // prettier-ignore
        this.s_loopFix = new EventEmitter();
        // prettier-ignore
        this.s_momentumBounce = new EventEmitter();
        // prettier-ignore
        this.s_navigationHide = new EventEmitter();
        // prettier-ignore
        this.s_navigationShow = new EventEmitter();
        // prettier-ignore
        this.s_observerUpdate = new EventEmitter();
        // prettier-ignore
        this.s_orientationchange = new EventEmitter();
        // prettier-ignore
        this.s_paginationHide = new EventEmitter();
        // prettier-ignore
        this.s_paginationRender = new EventEmitter();
        // prettier-ignore
        this.s_paginationShow = new EventEmitter();
        // prettier-ignore
        this.s_paginationUpdate = new EventEmitter();
        // prettier-ignore
        this.s_progress = new EventEmitter();
        // prettier-ignore
        this.s_reachBeginning = new EventEmitter();
        // prettier-ignore
        this.s_reachEnd = new EventEmitter();
        // prettier-ignore
        this.s_realIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_resize = new EventEmitter();
        // prettier-ignore
        this.s_scroll = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragEnd = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragMove = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragStart = new EventEmitter();
        // prettier-ignore
        this.s_setTransition = new EventEmitter();
        // prettier-ignore
        this.s_setTranslate = new EventEmitter();
        // prettier-ignore
        this.s_slideChange = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_sliderMove = new EventEmitter();
        // prettier-ignore
        this.s_sliderFirstMove = new EventEmitter();
        // prettier-ignore
        this.s_slidesLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_slidesGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_tap = new EventEmitter();
        // prettier-ignore
        this.s_toEdge = new EventEmitter();
        // prettier-ignore
        this.s_touchEnd = new EventEmitter();
        // prettier-ignore
        this.s_touchMove = new EventEmitter();
        // prettier-ignore
        this.s_touchMoveOpposite = new EventEmitter();
        // prettier-ignore
        this.s_touchStart = new EventEmitter();
        // prettier-ignore
        this.s_transitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_transitionStart = new EventEmitter();
        // prettier-ignore
        this.s_update = new EventEmitter();
        // prettier-ignore
        this.s_zoomChange = new EventEmitter();
        // prettier-ignore
        this.s_swiper = new EventEmitter();
        this.indexChange = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper-container';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass;
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._ngZone.run(() => {
                this._changeDetectorRef.detectChanges();
            });
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        var _a, _b, _c;
        const currentNext = typeof this._navigation !== 'boolean' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
        const currentPrev = typeof this._navigation !== 'boolean' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        this.showNavigation = !(coerceBooleanProperty(val) !== true ||
            (this._navigation &&
                typeof this._navigation !== 'boolean' &&
                this._navigation.prevEl !== ((_c = this._prevElRef) === null || _c === void 0 ? void 0 : _c.nativeElement) &&
                (this._navigation.prevEl !== null || this._navigation.nextEl !== null) &&
                (typeof this._navigation.nextEl === 'string' ||
                    typeof this._navigation.prevEl === 'string' ||
                    typeof this._navigation.nextEl === 'object' ||
                    typeof this._navigation.prevEl === 'object')));
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        var _a;
        const current = typeof this._pagination !== 'boolean' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        this.showPagination = isShowEl(val, this._pagination, this._paginationElRef);
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        var _a;
        const current = typeof this._scrollbar !== 'boolean' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set index(index) {
        this.setIndex(index);
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._prevElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._nextElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._scrollbarElRef = el;
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._paginationElRef = el;
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return typeof this.zoom !== 'boolean' ? this.zoom.containerClass : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el || !ref) {
            return;
        }
        if (ref && el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (event, ...args) => {
                const emitter = this[`s_${event}`];
                if (emitter) {
                    emitter.emit(...args);
                }
            };
            Object.assign(swiperParams.on, {
                _containerClasses(swiper, classes) {
                    this.containerClasses = classes;
                },
                _slideClasses: (_, updated) => {
                    updated.forEach(({ slideEl, classNames }, index) => {
                        const slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index')) || index;
                        if (this.virtual) {
                            const virtualSlide = this.slides.find((item) => {
                                return item.virtualIndex && item.virtualIndex === slideIndex;
                            });
                            if (virtualSlide) {
                                virtualSlide.classNames = classNames;
                                return;
                            }
                        }
                        if (this.slides[slideIndex]) {
                            this.slides[slideIndex].classNames = classNames;
                        }
                    });
                    this._changeDetectorRef.detectChanges();
                },
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                if (this.swiperRef.virtual && this.swiperRef.params.virtual.enabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
                swiperRef.on('slideChange', () => {
                    this.indexChange.emit(this.swiperRef.realIndex);
                });
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            var _a, _b;
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        loopedSlides += this.loopAdditionalSlides;
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return loopedSlides;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        const isCurrentParamObj = isObject(this.swiperRef.params[_key]);
        if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
            const defaultParams = this.swiperRef.modules[_key].params[_key];
            if (isCurrentParamObj) {
                extend(this.swiperRef.params[_key], defaultParams);
            }
            else {
                this.swiperRef.params[_key] = defaultParams;
            }
        }
        if (isCurrentParamObj && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    setIndex(index, speed, silent) {
        if (!this.isSwiperActive) {
            this.initialSlide = index;
            return;
        }
        if (index === this.swiperRef.activeIndex) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            if (this.loop) {
                this.swiperRef.slideToLoop(index, speed, !silent);
            }
            else {
                this.swiperRef.slideTo(index, speed, !silent);
            }
        });
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            var _a;
            (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy(true, false);
        });
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\r\n<ng-container *ngIf=\"navigation && showNavigation\">\r\n  <div class=\"swiper-button-prev\" #prevElRef></div>\r\n  <div class=\"swiper-button-next\" #nextElRef></div>\r\n</ng-container>\r\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\r\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\r\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\r\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\r\n  <ng-template *ngTemplateOutlet=\"\r\n      slidesTemplate;\r\n      context: {\r\n        loopSlides: prependSlides,\r\n        key: 'prepend'\r\n      }\r\n    \"></ng-template>\r\n  <ng-template *ngTemplateOutlet=\"\r\n      slidesTemplate;\r\n      context: {\r\n        loopSlides: activeSlides,\r\n        key: ''\r\n      }\r\n    \"></ng-template>\r\n  <ng-template *ngTemplateOutlet=\"\r\n      slidesTemplate;\r\n      context: {\r\n        loopSlides: appendSlides,\r\n        key: 'append'\r\n      }\r\n    \"></ng-template>\r\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\r\n</div>\r\n<ng-content select=\"[slot=container-end]\"></ng-content>\r\n\r\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\r\n  <div *ngFor=\"let slide of loopSlides | async\" [ngClass]=\"\r\n      (slide.class ? slide.class + ' ' : '') +\r\n      slideClass +\r\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\r\n    \" [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\" [style]=\"style\"\r\n    [ngSwitch]=\"slide.zoom\">\r\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\r\n      <ng-template [ngTemplateOutlet]=\"slide.template\" [ngTemplateOutletContext]=\"{\r\n          $implicit: slide.slideData\r\n        }\"></ng-template>\r\n    </div>\r\n    <ng-container *ngSwitchDefault>\r\n      <ng-template [ngTemplateOutlet]=\"slide.template\" [ngTemplateOutletContext]=\"{\r\n          $implicit: slide.slideData\r\n        }\"></ng-template>\r\n    </ng-container>\r\n  </div>\r\n</ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      swiper {
        display: block;
      }
    `]
            },] }
];
SwiperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
SwiperComponent.propDecorators = {
    direction: [{ type: Input }],
    touchEventsTarget: [{ type: Input }],
    initialSlide: [{ type: Input }],
    speed: [{ type: Input }],
    cssMode: [{ type: Input }],
    updateOnWindowResize: [{ type: Input }],
    resizeObserver: [{ type: Input }],
    nested: [{ type: Input }],
    focusableElements: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    preventInteractionOnTransition: [{ type: Input }],
    userAgent: [{ type: Input }],
    url: [{ type: Input }],
    edgeSwipeDetection: [{ type: Input }],
    edgeSwipeThreshold: [{ type: Input }],
    freeMode: [{ type: Input }],
    freeModeMomentum: [{ type: Input }],
    freeModeMomentumRatio: [{ type: Input }],
    freeModeMomentumBounce: [{ type: Input }],
    freeModeMomentumBounceRatio: [{ type: Input }],
    freeModeMomentumVelocityRatio: [{ type: Input }],
    freeModeSticky: [{ type: Input }],
    freeModeMinimumVelocity: [{ type: Input }],
    autoHeight: [{ type: Input }],
    setWrapperSize: [{ type: Input }],
    virtualTranslate: [{ type: Input }],
    effect: [{ type: Input }],
    breakpoints: [{ type: Input }],
    spaceBetween: [{ type: Input }],
    slidesPerView: [{ type: Input }],
    slidesPerColumn: [{ type: Input }],
    slidesPerColumnFill: [{ type: Input }],
    slidesPerGroup: [{ type: Input }],
    slidesPerGroupSkip: [{ type: Input }],
    centeredSlides: [{ type: Input }],
    centeredSlidesBounds: [{ type: Input }],
    slidesOffsetBefore: [{ type: Input }],
    slidesOffsetAfter: [{ type: Input }],
    normalizeSlideIndex: [{ type: Input }],
    centerInsufficientSlides: [{ type: Input }],
    watchOverflow: [{ type: Input }],
    roundLengths: [{ type: Input }],
    touchRatio: [{ type: Input }],
    touchAngle: [{ type: Input }],
    simulateTouch: [{ type: Input }],
    shortSwipes: [{ type: Input }],
    longSwipes: [{ type: Input }],
    longSwipesRatio: [{ type: Input }],
    longSwipesMs: [{ type: Input }],
    followFinger: [{ type: Input }],
    allowTouchMove: [{ type: Input }],
    threshold: [{ type: Input }],
    touchMoveStopPropagation: [{ type: Input }],
    touchStartPreventDefault: [{ type: Input }],
    touchStartForcePreventDefault: [{ type: Input }],
    touchReleaseOnEdges: [{ type: Input }],
    uniqueNavElements: [{ type: Input }],
    resistance: [{ type: Input }],
    resistanceRatio: [{ type: Input }],
    watchSlidesProgress: [{ type: Input }],
    watchSlidesVisibility: [{ type: Input }],
    grabCursor: [{ type: Input }],
    preventClicks: [{ type: Input }],
    preventClicksPropagation: [{ type: Input }],
    slideToClickedSlide: [{ type: Input }],
    preloadImages: [{ type: Input }],
    updateOnImagesReady: [{ type: Input }],
    loop: [{ type: Input }],
    loopAdditionalSlides: [{ type: Input }],
    loopedSlides: [{ type: Input }],
    loopFillGroupWithBlank: [{ type: Input }],
    loopPreventsSlide: [{ type: Input }],
    allowSlidePrev: [{ type: Input }],
    allowSlideNext: [{ type: Input }],
    swipeHandler: [{ type: Input }],
    noSwiping: [{ type: Input }],
    noSwipingClass: [{ type: Input }],
    noSwipingSelector: [{ type: Input }],
    passiveListeners: [{ type: Input }],
    containerModifierClass: [{ type: Input }],
    slideClass: [{ type: Input }],
    slideBlankClass: [{ type: Input }],
    slideActiveClass: [{ type: Input }],
    slideDuplicateActiveClass: [{ type: Input }],
    slideVisibleClass: [{ type: Input }],
    slideDuplicateClass: [{ type: Input }],
    slideNextClass: [{ type: Input }],
    slideDuplicateNextClass: [{ type: Input }],
    slidePrevClass: [{ type: Input }],
    slideDuplicatePrevClass: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    runCallbacksOnInit: [{ type: Input }],
    observeParents: [{ type: Input }],
    observeSlideChildren: [{ type: Input }],
    a11y: [{ type: Input }],
    autoplay: [{ type: Input }],
    controller: [{ type: Input }],
    coverflowEffect: [{ type: Input }],
    cubeEffect: [{ type: Input }],
    fadeEffect: [{ type: Input }],
    flipEffect: [{ type: Input }],
    hashNavigation: [{ type: Input }],
    history: [{ type: Input }],
    keyboard: [{ type: Input }],
    lazy: [{ type: Input }],
    mousewheel: [{ type: Input }],
    parallax: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
    class: [{ type: Input }],
    id: [{ type: Input }],
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    index: [{ type: Input }],
    config: [{ type: Input }],
    s__beforeBreakpoint: [{ type: Output, args: ['_beforeBreakpoint',] }],
    s__containerClasses: [{ type: Output, args: ['_containerClasses',] }],
    s__slideClass: [{ type: Output, args: ['_slideClass',] }],
    s__swiper: [{ type: Output, args: ['_swiper',] }],
    s_activeIndexChange: [{ type: Output, args: ['activeIndexChange',] }],
    s_afterInit: [{ type: Output, args: ['afterInit',] }],
    s_autoplay: [{ type: Output, args: ['autoplay',] }],
    s_autoplayStart: [{ type: Output, args: ['autoplayStart',] }],
    s_autoplayStop: [{ type: Output, args: ['autoplayStop',] }],
    s_beforeDestroy: [{ type: Output, args: ['beforeDestroy',] }],
    s_beforeInit: [{ type: Output, args: ['beforeInit',] }],
    s_beforeLoopFix: [{ type: Output, args: ['beforeLoopFix',] }],
    s_beforeResize: [{ type: Output, args: ['beforeResize',] }],
    s_beforeSlideChangeStart: [{ type: Output, args: ['beforeSlideChangeStart',] }],
    s_beforeTransitionStart: [{ type: Output, args: ['beforeTransitionStart',] }],
    s_breakpoint: [{ type: Output, args: ['breakpoint',] }],
    s_changeDirection: [{ type: Output, args: ['changeDirection',] }],
    s_click: [{ type: Output, args: ['click',] }],
    s_doubleTap: [{ type: Output, args: ['doubleTap',] }],
    s_doubleClick: [{ type: Output, args: ['doubleClick',] }],
    s_destroy: [{ type: Output, args: ['destroy',] }],
    s_fromEdge: [{ type: Output, args: ['fromEdge',] }],
    s_hashChange: [{ type: Output, args: ['hashChange',] }],
    s_hashSet: [{ type: Output, args: ['hashSet',] }],
    s_imagesReady: [{ type: Output, args: ['imagesReady',] }],
    s_init: [{ type: Output, args: ['init',] }],
    s_keyPress: [{ type: Output, args: ['keyPress',] }],
    s_lazyImageLoad: [{ type: Output, args: ['lazyImageLoad',] }],
    s_lazyImageReady: [{ type: Output, args: ['lazyImageReady',] }],
    s_loopFix: [{ type: Output, args: ['loopFix',] }],
    s_momentumBounce: [{ type: Output, args: ['momentumBounce',] }],
    s_navigationHide: [{ type: Output, args: ['navigationHide',] }],
    s_navigationShow: [{ type: Output, args: ['navigationShow',] }],
    s_observerUpdate: [{ type: Output, args: ['observerUpdate',] }],
    s_orientationchange: [{ type: Output, args: ['orientationchange',] }],
    s_paginationHide: [{ type: Output, args: ['paginationHide',] }],
    s_paginationRender: [{ type: Output, args: ['paginationRender',] }],
    s_paginationShow: [{ type: Output, args: ['paginationShow',] }],
    s_paginationUpdate: [{ type: Output, args: ['paginationUpdate',] }],
    s_progress: [{ type: Output, args: ['progress',] }],
    s_reachBeginning: [{ type: Output, args: ['reachBeginning',] }],
    s_reachEnd: [{ type: Output, args: ['reachEnd',] }],
    s_realIndexChange: [{ type: Output, args: ['realIndexChange',] }],
    s_resize: [{ type: Output, args: ['resize',] }],
    s_scroll: [{ type: Output, args: ['scroll',] }],
    s_scrollbarDragEnd: [{ type: Output, args: ['scrollbarDragEnd',] }],
    s_scrollbarDragMove: [{ type: Output, args: ['scrollbarDragMove',] }],
    s_scrollbarDragStart: [{ type: Output, args: ['scrollbarDragStart',] }],
    s_setTransition: [{ type: Output, args: ['setTransition',] }],
    s_setTranslate: [{ type: Output, args: ['setTranslate',] }],
    s_slideChange: [{ type: Output, args: ['slideChange',] }],
    s_slideChangeTransitionEnd: [{ type: Output, args: ['slideChangeTransitionEnd',] }],
    s_slideChangeTransitionStart: [{ type: Output, args: ['slideChangeTransitionStart',] }],
    s_slideNextTransitionEnd: [{ type: Output, args: ['slideNextTransitionEnd',] }],
    s_slideNextTransitionStart: [{ type: Output, args: ['slideNextTransitionStart',] }],
    s_slidePrevTransitionEnd: [{ type: Output, args: ['slidePrevTransitionEnd',] }],
    s_slidePrevTransitionStart: [{ type: Output, args: ['slidePrevTransitionStart',] }],
    s_slideResetTransitionStart: [{ type: Output, args: ['slideResetTransitionStart',] }],
    s_slideResetTransitionEnd: [{ type: Output, args: ['slideResetTransitionEnd',] }],
    s_sliderMove: [{ type: Output, args: ['sliderMove',] }],
    s_sliderFirstMove: [{ type: Output, args: ['sliderFirstMove',] }],
    s_slidesLengthChange: [{ type: Output, args: ['slidesLengthChange',] }],
    s_slidesGridLengthChange: [{ type: Output, args: ['slidesGridLengthChange',] }],
    s_snapGridLengthChange: [{ type: Output, args: ['snapGridLengthChange',] }],
    s_snapIndexChange: [{ type: Output, args: ['snapIndexChange',] }],
    s_tap: [{ type: Output, args: ['tap',] }],
    s_toEdge: [{ type: Output, args: ['toEdge',] }],
    s_touchEnd: [{ type: Output, args: ['touchEnd',] }],
    s_touchMove: [{ type: Output, args: ['touchMove',] }],
    s_touchMoveOpposite: [{ type: Output, args: ['touchMoveOpposite',] }],
    s_touchStart: [{ type: Output, args: ['touchStart',] }],
    s_transitionEnd: [{ type: Output, args: ['transitionEnd',] }],
    s_transitionStart: [{ type: Output, args: ['transitionStart',] }],
    s_update: [{ type: Output, args: ['update',] }],
    s_zoomChange: [{ type: Output, args: ['zoomChange',] }],
    s_swiper: [{ type: Output, args: ['swiper',] }],
    indexChange: [{ type: Output }],
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true, emitDistinctChangesOnly: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFHWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBY3BELE1BQU0sT0FBTyxlQUFlO0lBbVkxQixZQUNVLE9BQWUsRUFDZixVQUFzQixFQUN0QixrQkFBcUMsRUFDaEIsV0FBVztRQUhoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBclRqQyxlQUFVLEdBQWdDLGNBQWMsQ0FBQztRQVV6RCxpQkFBWSxHQUFrQyxnQkFBZ0IsQ0FBQztRQTZDeEUsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFjL0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFjL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFxQjlCLGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNLLGtCQUFhLEdBQThDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUcsa0JBQWtCO1FBQ0MsY0FBUyxHQUEwQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlGLGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNHLGdCQUFXLEdBQTRDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDcEcsa0JBQWtCO1FBQ0UsZUFBVSxHQUEyQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pHLGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ00sbUJBQWMsR0FBK0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3RyxrQkFBa0I7UUFDTyxvQkFBZSxHQUFnRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2hILGtCQUFrQjtRQUNJLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkcsa0JBQWtCO1FBQ08sb0JBQWUsR0FBZ0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNoSCxrQkFBa0I7UUFDTSxtQkFBYyxHQUErQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzdHLGtCQUFrQjtRQUNnQiw2QkFBd0IsR0FBeUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzSSxrQkFBa0I7UUFDZSw0QkFBdUIsR0FBd0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4SSxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNTLHNCQUFpQixHQUFrRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RILGtCQUFrQjtRQUNELFlBQU8sR0FBd0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4RixrQkFBa0I7UUFDRyxnQkFBVyxHQUE0QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3BHLGtCQUFrQjtRQUNLLGtCQUFhLEdBQThDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUcsa0JBQWtCO1FBQ0MsY0FBUyxHQUEwQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlGLGtCQUFrQjtRQUNFLGVBQVUsR0FBMkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqRyxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNDLGNBQVMsR0FBMEMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM5RixrQkFBa0I7UUFDSyxrQkFBYSxHQUE4QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFHLGtCQUFrQjtRQUNGLFdBQU0sR0FBdUMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyRixrQkFBa0I7UUFDRSxlQUFVLEdBQTJDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakcsa0JBQWtCO1FBQ08sb0JBQWUsR0FBZ0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNoSCxrQkFBa0I7UUFDUSxxQkFBZ0IsR0FBaUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNuSCxrQkFBa0I7UUFDQyxjQUFTLEdBQTBDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDOUYsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1csd0JBQW1CLEdBQW9ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1UsdUJBQWtCLEdBQW1ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDekgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1UsdUJBQWtCLEdBQW1ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDekgsa0JBQWtCO1FBQ0UsZUFBVSxHQUEyQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pHLGtCQUFrQjtRQUNRLHFCQUFnQixHQUFpRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ25ILGtCQUFrQjtRQUNFLGVBQVUsR0FBMkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqRyxrQkFBa0I7UUFDUyxzQkFBaUIsR0FBa0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0SCxrQkFBa0I7UUFDQSxhQUFRLEdBQXlDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Ysa0JBQWtCO1FBQ0EsYUFBUSxHQUF5QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNGLGtCQUFrQjtRQUNVLHVCQUFrQixHQUFtRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pILGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNZLHlCQUFvQixHQUFxRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQy9ILGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ00sbUJBQWMsR0FBK0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3RyxrQkFBa0I7UUFDSyxrQkFBYSxHQUE4QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFHLGtCQUFrQjtRQUNrQiwrQkFBMEIsR0FBMkQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqSixrQkFBa0I7UUFDb0IsaUNBQTRCLEdBQTZELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkosa0JBQWtCO1FBQ2dCLDZCQUF3QixHQUF5RCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNJLGtCQUFrQjtRQUNrQiwrQkFBMEIsR0FBMkQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqSixrQkFBa0I7UUFDZ0IsNkJBQXdCLEdBQXlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0ksa0JBQWtCO1FBQ2tCLCtCQUEwQixHQUEyRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pKLGtCQUFrQjtRQUNtQixnQ0FBMkIsR0FBNEQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwSixrQkFBa0I7UUFDaUIsOEJBQXlCLEdBQTBELElBQUksWUFBWSxFQUFPLENBQUM7UUFDOUksa0JBQWtCO1FBQ0ksaUJBQVksR0FBNkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2RyxrQkFBa0I7UUFDUyxzQkFBaUIsR0FBa0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0SCxrQkFBa0I7UUFDWSx5QkFBb0IsR0FBcUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMvSCxrQkFBa0I7UUFDZ0IsNkJBQXdCLEdBQXlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0ksa0JBQWtCO1FBQ2MsMkJBQXNCLEdBQXVELElBQUksWUFBWSxFQUFPLENBQUM7UUFDckksa0JBQWtCO1FBQ1Msc0JBQWlCLEdBQWtELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEgsa0JBQWtCO1FBQ0gsVUFBSyxHQUFzQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xGLGtCQUFrQjtRQUNBLGFBQVEsR0FBeUMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRixrQkFBa0I7UUFDRSxlQUFVLEdBQTJDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakcsa0JBQWtCO1FBQ0csZ0JBQVcsR0FBNEMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwRyxrQkFBa0I7UUFDVyx3QkFBbUIsR0FBb0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1SCxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ1Msc0JBQWlCLEdBQWtELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEgsa0JBQWtCO1FBQ0EsYUFBUSxHQUF5QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNGLGtCQUFrQjtRQUNJLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkcsa0JBQWtCO1FBQ0EsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTlELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQWtDMUMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBMEIsQ0FBQztRQWF6QyxxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQXdDcEQsa0JBQWEsR0FBRyxDQUFDLEdBQW9DLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUEyQixFQUFFLEtBQWEsRUFBRSxFQUFFO2dCQUNuRSxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDekIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUNqRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQztRQTBFRixVQUFLLEdBQVEsSUFBSSxDQUFDO1FBRVYsd0JBQW1CLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUU7WUFDakQseUJBQXlCO1lBQ3pCLElBQ0UsQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFDZixDQUFDLElBQUksQ0FBQyxrQkFBa0I7b0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUk7b0JBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUN4RDtnQkFDQSxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO2dCQUN4QyxDQUFDLENBQUM7b0JBQ0UsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUk7aUJBQzVFO2dCQUNILENBQUMsQ0FBQztvQkFDRSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxJQUFJO2lCQUMvQixDQUFDO1lBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzVCO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDLENBQUM7SUFsS0MsQ0FBQztJQXZSSixJQUNJLFVBQVUsQ0FBQyxHQUFHOztRQUNoQixNQUFNLFdBQVcsR0FBRyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVGLE1BQU0sV0FBVyxHQUFHLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxXQUFXLElBQUksSUFBSTtZQUMzQixNQUFNLEVBQUUsV0FBVyxJQUFJLElBQUk7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQ3JCLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUk7WUFDbkMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDZixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLE1BQUssTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxhQUFhLENBQUE7Z0JBQzFELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQztnQkFDdEUsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLFFBQVE7b0JBQzFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssUUFBUTtvQkFDM0MsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxRQUFRO29CQUMzQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQ2xELENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFJRCxJQUNJLFVBQVUsQ0FBQyxHQUFHOztRQUNoQixNQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxFQUFFLEVBQUUsT0FBTyxJQUFJLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBSUQsSUFDSSxTQUFTLENBQUMsR0FBRzs7UUFDZixNQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxFQUFFLEVBQUUsT0FBTyxJQUFJLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUlELElBQ0ksT0FBTyxDQUFDLEdBQUc7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQ0ksTUFBTSxDQUFDLEdBQWtCO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBNEpELElBQ0ksU0FBUyxDQUFDLEVBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELElBQ0ksU0FBUyxDQUFDLEVBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELElBQ0ksY0FBYyxDQUFDLEVBQWM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFDSSxlQUFlLENBQUMsRUFBYztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVlELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0lBQzdGLENBQUM7SUFVTyxXQUFXLENBQUMsRUFBYyxFQUFFLEdBQVEsRUFBRSxNQUFjLEVBQUUsR0FBRyxHQUFHLElBQUk7UUFDdEUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRTtnQkFDakMsT0FBTzthQUNSO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDN0I7UUFDRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELFFBQVE7UUFDTixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUF1QkQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2xDLFlBQVksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO2dCQUN6QixZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUM5QjtZQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQXNCLENBQUM7Z0JBQ3hELElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPO29CQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxDQUFDO2dCQUNELGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUNqRCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO3dCQUN0RixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQzs0QkFDL0QsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsSUFBSSxZQUFZLEVBQUU7Z0NBQ2hCLFlBQVksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dDQUNyQyxPQUFPOzZCQUNSO3lCQUNGO3dCQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3lCQUNqRDtvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQzFDLENBQUM7YUFDRixDQUFDLENBQUM7WUFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxTQUFTLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztZQUNoQyxTQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztZQUNqQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM1QztZQUNELElBQUksU0FBUyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pELFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLE1BQU0sVUFBVSxHQUFHO29CQUNqQixLQUFLLEVBQUUsS0FBSztvQkFDWixjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtvQkFDeEMsb0JBQW9CLEVBQUUsS0FBSztpQkFDNUIsQ0FBQztnQkFDRixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO29CQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBdUNELFdBQVcsQ0FBQyxhQUE0QjtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsYUFBYTtRQUM1QixJQUFJLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkUsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDbEMsTUFBTSxFQUNKLE1BQU0sRUFBRSxhQUFhLEVBQ3JCLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEdBQ1AsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRW5CLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtnQkFDNUIsSUFDRSxJQUFJLENBQUMsVUFBVTtvQkFDZixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztvQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUNsQixVQUFVO29CQUNWLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFDZDtvQkFDQSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3BELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwQixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckIsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO2FBQ0Y7WUFFRCxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7Z0JBQzNCLElBQ0UsSUFBSSxDQUFDLFNBQVM7b0JBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7b0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDakIsU0FBUztvQkFDVCxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQ2I7b0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2pCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdkIsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDTCxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3BCLFNBQVMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjthQUNGO1lBRUQsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO2dCQUM1QixJQUNFLElBQUksQ0FBQyxVQUFVO29CQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTO29CQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07b0JBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtvQkFDdEIsVUFBVTtvQkFDVixDQUFDLFVBQVUsQ0FBQyxNQUFNO29CQUNsQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQ2xCO29CQUNBLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEQsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNsQixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3JCO3FCQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUNqRCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUN6QixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDMUI7YUFDRjtZQUNELElBQUksYUFBYSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxXQUFXO29CQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEM7WUFFRCxJQUFJLGFBQWEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQzdEO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsYUFBa0M7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7O1lBQ2xDLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNuRSxPQUFPO2FBQ1I7WUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRTtnQkFDL0IsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QyxTQUFTO2lCQUNWO2dCQUNELE1BQU0sUUFBUSxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsR0FBRyxDQUFDLDBDQUFFLFlBQVksbUNBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNyQztZQUVELElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNyRDtZQUNELElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNyRDtZQUNELElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQ3pCO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN0QztZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFDRCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRSxNQUFNLG9CQUFvQixHQUN4QixVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVFLElBQUksb0JBQW9CLElBQUksb0JBQW9CLENBQUMsYUFBYSxFQUFFO2dCQUM5RCxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLENBQUM7YUFDMUQ7U0FDRjtRQUNELElBQUksbUJBQW1CLEtBQUssTUFBTSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksbUJBQW1CLENBQUM7UUFFNUQsWUFBWSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUUxQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQUcsRUFBRSxLQUFLO1FBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUNELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFaEUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEUsSUFBSSxpQkFBaUIsRUFBRTtnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQzthQUM3QztTQUNGO1FBRUQsSUFBSSxpQkFBaUIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFjLEVBQUUsTUFBZ0I7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7O1lBQ2xDLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQWx3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDBvRUFBc0M7Z0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTt5QkFFbkM7Ozs7S0FJQzthQUVKOzs7WUExQ0MsTUFBTTtZQUxOLFVBQVU7WUFIVixpQkFBaUI7NENBMGJkLE1BQU0sU0FBQyxXQUFXOzs7d0JBdFlwQixLQUFLO2dDQUNMLEtBQUs7MkJBQ0wsS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUs7bUNBQ0wsS0FBSzs2QkFDTCxLQUFLO3FCQUNMLEtBQUs7Z0NBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7NkNBQ0wsS0FBSzt3QkFDTCxLQUFLO2tCQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSztvQ0FDTCxLQUFLO3FDQUNMLEtBQUs7MENBQ0wsS0FBSzs0Q0FDTCxLQUFLOzZCQUNMLEtBQUs7c0NBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7K0JBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxLQUFLO2lDQUNMLEtBQUs7Z0NBQ0wsS0FBSztrQ0FDTCxLQUFLO3VDQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7dUNBQ0wsS0FBSzt1Q0FDTCxLQUFLOzRDQUNMLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxLQUFLO29DQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VDQUNMLEtBQUs7a0NBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLEtBQUs7bUJBQ0wsS0FBSzttQ0FDTCxLQUFLOzJCQUNMLEtBQUs7cUNBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUs7cUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt3Q0FDTCxLQUFLO2dDQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLO3NDQUNMLEtBQUs7NkJBQ0wsS0FBSztzQ0FDTCxLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUNMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSztpQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBMEJMLEtBQUs7d0JBY0wsS0FBSztzQkFjTCxLQUFLO29CQVNMLEtBQUs7cUJBSUwsS0FBSztrQ0FPTCxNQUFNLFNBQUMsbUJBQW1CO2tDQUUxQixNQUFNLFNBQUMsbUJBQW1COzRCQUUxQixNQUFNLFNBQUMsYUFBYTt3QkFFcEIsTUFBTSxTQUFDLFNBQVM7a0NBRWhCLE1BQU0sU0FBQyxtQkFBbUI7MEJBRTFCLE1BQU0sU0FBQyxXQUFXO3lCQUVsQixNQUFNLFNBQUMsVUFBVTs4QkFFakIsTUFBTSxTQUFDLGVBQWU7NkJBRXRCLE1BQU0sU0FBQyxjQUFjOzhCQUVyQixNQUFNLFNBQUMsZUFBZTsyQkFFdEIsTUFBTSxTQUFDLFlBQVk7OEJBRW5CLE1BQU0sU0FBQyxlQUFlOzZCQUV0QixNQUFNLFNBQUMsY0FBYzt1Q0FFckIsTUFBTSxTQUFDLHdCQUF3QjtzQ0FFL0IsTUFBTSxTQUFDLHVCQUF1QjsyQkFFOUIsTUFBTSxTQUFDLFlBQVk7Z0NBRW5CLE1BQU0sU0FBQyxpQkFBaUI7c0JBRXhCLE1BQU0sU0FBQyxPQUFPOzBCQUVkLE1BQU0sU0FBQyxXQUFXOzRCQUVsQixNQUFNLFNBQUMsYUFBYTt3QkFFcEIsTUFBTSxTQUFDLFNBQVM7eUJBRWhCLE1BQU0sU0FBQyxVQUFVOzJCQUVqQixNQUFNLFNBQUMsWUFBWTt3QkFFbkIsTUFBTSxTQUFDLFNBQVM7NEJBRWhCLE1BQU0sU0FBQyxhQUFhO3FCQUVwQixNQUFNLFNBQUMsTUFBTTt5QkFFYixNQUFNLFNBQUMsVUFBVTs4QkFFakIsTUFBTSxTQUFDLGVBQWU7K0JBRXRCLE1BQU0sU0FBQyxnQkFBZ0I7d0JBRXZCLE1BQU0sU0FBQyxTQUFTOytCQUVoQixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCO2tDQUV2QixNQUFNLFNBQUMsbUJBQW1COytCQUUxQixNQUFNLFNBQUMsZ0JBQWdCO2lDQUV2QixNQUFNLFNBQUMsa0JBQWtCOytCQUV6QixNQUFNLFNBQUMsZ0JBQWdCO2lDQUV2QixNQUFNLFNBQUMsa0JBQWtCO3lCQUV6QixNQUFNLFNBQUMsVUFBVTsrQkFFakIsTUFBTSxTQUFDLGdCQUFnQjt5QkFFdkIsTUFBTSxTQUFDLFVBQVU7Z0NBRWpCLE1BQU0sU0FBQyxpQkFBaUI7dUJBRXhCLE1BQU0sU0FBQyxRQUFRO3VCQUVmLE1BQU0sU0FBQyxRQUFRO2lDQUVmLE1BQU0sU0FBQyxrQkFBa0I7a0NBRXpCLE1BQU0sU0FBQyxtQkFBbUI7bUNBRTFCLE1BQU0sU0FBQyxvQkFBb0I7OEJBRTNCLE1BQU0sU0FBQyxlQUFlOzZCQUV0QixNQUFNLFNBQUMsY0FBYzs0QkFFckIsTUFBTSxTQUFDLGFBQWE7eUNBRXBCLE1BQU0sU0FBQywwQkFBMEI7MkNBRWpDLE1BQU0sU0FBQyw0QkFBNEI7dUNBRW5DLE1BQU0sU0FBQyx3QkFBd0I7eUNBRS9CLE1BQU0sU0FBQywwQkFBMEI7dUNBRWpDLE1BQU0sU0FBQyx3QkFBd0I7eUNBRS9CLE1BQU0sU0FBQywwQkFBMEI7MENBRWpDLE1BQU0sU0FBQywyQkFBMkI7d0NBRWxDLE1BQU0sU0FBQyx5QkFBeUI7MkJBRWhDLE1BQU0sU0FBQyxZQUFZO2dDQUVuQixNQUFNLFNBQUMsaUJBQWlCO21DQUV4QixNQUFNLFNBQUMsb0JBQW9CO3VDQUUzQixNQUFNLFNBQUMsd0JBQXdCO3FDQUUvQixNQUFNLFNBQUMsc0JBQXNCO2dDQUU3QixNQUFNLFNBQUMsaUJBQWlCO29CQUV4QixNQUFNLFNBQUMsS0FBSzt1QkFFWixNQUFNLFNBQUMsUUFBUTt5QkFFZixNQUFNLFNBQUMsVUFBVTswQkFFakIsTUFBTSxTQUFDLFdBQVc7a0NBRWxCLE1BQU0sU0FBQyxtQkFBbUI7MkJBRTFCLE1BQU0sU0FBQyxZQUFZOzhCQUVuQixNQUFNLFNBQUMsZUFBZTtnQ0FFdEIsTUFBTSxTQUFDLGlCQUFpQjt1QkFFeEIsTUFBTSxTQUFDLFFBQVE7MkJBRWYsTUFBTSxTQUFDLFlBQVk7dUJBRW5CLE1BQU0sU0FBQyxRQUFROzBCQUVmLE1BQU07d0JBRU4sU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBTXhDLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzZCQU14QyxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzhCQU03QyxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQU05QyxlQUFlLFNBQUMsb0JBQW9CLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRTsrQkFxQjFGLFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBQTEFURk9STV9JRCxcclxuICBRdWVyeUxpc3QsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBnZXRQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldC1wYXJhbXMnO1xyXG5pbXBvcnQgeyBTd2lwZXJTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4vc3dpcGVyLXNsaWRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7XHJcbiAgZXh0ZW5kLFxyXG4gIGlzT2JqZWN0LFxyXG4gIHNldFByb3BlcnR5LFxyXG4gIGlnbm9yZU5nT25DaGFuZ2VzLFxyXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcclxuICBpc1Nob3dFbCxcclxufSBmcm9tICcuL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBTd2lwZXJPcHRpb25zLFxyXG4gIFN3aXBlckV2ZW50cyxcclxuICBOYXZpZ2F0aW9uT3B0aW9ucyxcclxuICBQYWdpbmF0aW9uT3B0aW9ucyxcclxuICBTY3JvbGxiYXJPcHRpb25zLFxyXG4gIFZpcnR1YWxPcHRpb25zLFxyXG59IGZyb20gJ3N3aXBlci90eXBlcyc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzd2lwZXIsIFtzd2lwZXJdJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3dpcGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlczogW1xyXG4gICAgYFxyXG4gICAgICBzd2lwZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB9XHJcbiAgICBgLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTd2lwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogU3dpcGVyT3B0aW9uc1snZGlyZWN0aW9uJ107XHJcbiAgQElucHV0KCkgdG91Y2hFdmVudHNUYXJnZXQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoRXZlbnRzVGFyZ2V0J107XHJcbiAgQElucHV0KCkgaW5pdGlhbFNsaWRlOiBTd2lwZXJPcHRpb25zWydpbml0aWFsU2xpZGUnXTtcclxuICBASW5wdXQoKSBzcGVlZDogU3dpcGVyT3B0aW9uc1snc3BlZWQnXTtcclxuICBASW5wdXQoKSBjc3NNb2RlOiBTd2lwZXJPcHRpb25zWydjc3NNb2RlJ107XHJcbiAgQElucHV0KCkgdXBkYXRlT25XaW5kb3dSZXNpemU6IFN3aXBlck9wdGlvbnNbJ3VwZGF0ZU9uV2luZG93UmVzaXplJ107XHJcbiAgQElucHV0KCkgcmVzaXplT2JzZXJ2ZXI6IFN3aXBlck9wdGlvbnNbJ3Jlc2l6ZU9ic2VydmVyJ107XHJcbiAgQElucHV0KCkgbmVzdGVkOiBTd2lwZXJPcHRpb25zWyduZXN0ZWQnXTtcclxuICBASW5wdXQoKSBmb2N1c2FibGVFbGVtZW50czogU3dpcGVyT3B0aW9uc1snZm9jdXNhYmxlRWxlbWVudHMnXTtcclxuICBASW5wdXQoKSB3aWR0aDogU3dpcGVyT3B0aW9uc1snd2lkdGgnXTtcclxuICBASW5wdXQoKSBoZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2hlaWdodCddO1xyXG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uJ107XHJcbiAgQElucHV0KCkgdXNlckFnZW50OiBTd2lwZXJPcHRpb25zWyd1c2VyQWdlbnQnXTtcclxuICBASW5wdXQoKSB1cmw6IFN3aXBlck9wdGlvbnNbJ3VybCddO1xyXG4gIEBJbnB1dCgpIGVkZ2VTd2lwZURldGVjdGlvbjogYm9vbGVhbiB8IHN0cmluZztcclxuICBASW5wdXQoKSBlZGdlU3dpcGVUaHJlc2hvbGQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBmcmVlTW9kZTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGUnXTtcclxuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtJ107XHJcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtUmF0aW8nXTtcclxuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtQm91bmNlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlJ107XHJcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW8nXTtcclxuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW8nXTtcclxuICBASW5wdXQoKSBmcmVlTW9kZVN0aWNreTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVTdGlja3knXTtcclxuICBASW5wdXQoKSBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHknXTtcclxuICBASW5wdXQoKSBhdXRvSGVpZ2h0OiBTd2lwZXJPcHRpb25zWydhdXRvSGVpZ2h0J107XHJcbiAgQElucHV0KCkgc2V0V3JhcHBlclNpemU6IFN3aXBlck9wdGlvbnNbJ3NldFdyYXBwZXJTaXplJ107XHJcbiAgQElucHV0KCkgdmlydHVhbFRyYW5zbGF0ZTogU3dpcGVyT3B0aW9uc1sndmlydHVhbFRyYW5zbGF0ZSddO1xyXG4gIEBJbnB1dCgpIGVmZmVjdDogU3dpcGVyT3B0aW9uc1snZWZmZWN0J107XHJcbiAgQElucHV0KCkgYnJlYWtwb2ludHM6IFN3aXBlck9wdGlvbnNbJ2JyZWFrcG9pbnRzJ107XHJcbiAgQElucHV0KCkgc3BhY2VCZXR3ZWVuOiBTd2lwZXJPcHRpb25zWydzcGFjZUJldHdlZW4nXTtcclxuICBASW5wdXQoKSBzbGlkZXNQZXJWaWV3OiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJWaWV3J107XHJcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW4nXTtcclxuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW5GaWxsOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW5GaWxsJ107XHJcbiAgQElucHV0KCkgc2xpZGVzUGVyR3JvdXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwJ107XHJcbiAgQElucHV0KCkgc2xpZGVzUGVyR3JvdXBTa2lwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cFNraXAnXTtcclxuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXMnXTtcclxuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlc0JvdW5kczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXNCb3VuZHMnXTtcclxuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRCZWZvcmU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc09mZnNldEJlZm9yZSddO1xyXG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEFmdGVyOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRBZnRlciddO1xyXG4gIEBJbnB1dCgpIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IFN3aXBlck9wdGlvbnNbJ25vcm1hbGl6ZVNsaWRlSW5kZXgnXTtcclxuICBASW5wdXQoKSBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlckluc3VmZmljaWVudFNsaWRlcyddO1xyXG4gIEBJbnB1dCgpIHdhdGNoT3ZlcmZsb3c6IFN3aXBlck9wdGlvbnNbJ3dhdGNoT3ZlcmZsb3cnXTtcclxuICBASW5wdXQoKSByb3VuZExlbmd0aHM6IFN3aXBlck9wdGlvbnNbJ3JvdW5kTGVuZ3RocyddO1xyXG4gIEBJbnB1dCgpIHRvdWNoUmF0aW86IFN3aXBlck9wdGlvbnNbJ3RvdWNoUmF0aW8nXTtcclxuICBASW5wdXQoKSB0b3VjaEFuZ2xlOiBTd2lwZXJPcHRpb25zWyd0b3VjaEFuZ2xlJ107XHJcbiAgQElucHV0KCkgc2ltdWxhdGVUb3VjaDogU3dpcGVyT3B0aW9uc1snc2ltdWxhdGVUb3VjaCddO1xyXG4gIEBJbnB1dCgpIHNob3J0U3dpcGVzOiBTd2lwZXJPcHRpb25zWydzaG9ydFN3aXBlcyddO1xyXG4gIEBJbnB1dCgpIGxvbmdTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXMnXTtcclxuICBASW5wdXQoKSBsb25nU3dpcGVzUmF0aW86IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXNSYXRpbyddO1xyXG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNNczogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlc01zJ107XHJcbiAgQElucHV0KCkgZm9sbG93RmluZ2VyOiBTd2lwZXJPcHRpb25zWydmb2xsb3dGaW5nZXInXTtcclxuICBASW5wdXQoKSBhbGxvd1RvdWNoTW92ZTogU3dpcGVyT3B0aW9uc1snYWxsb3dUb3VjaE1vdmUnXTtcclxuICBASW5wdXQoKSB0aHJlc2hvbGQ6IFN3aXBlck9wdGlvbnNbJ3RocmVzaG9sZCddO1xyXG4gIEBJbnB1dCgpIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sndG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJ107XHJcbiAgQElucHV0KCkgdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQnXTtcclxuICBASW5wdXQoKSB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQnXTtcclxuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJlbGVhc2VPbkVkZ2VzJ107XHJcbiAgQElucHV0KCkgdW5pcXVlTmF2RWxlbWVudHM6IFN3aXBlck9wdGlvbnNbJ3VuaXF1ZU5hdkVsZW1lbnRzJ107XHJcbiAgQElucHV0KCkgcmVzaXN0YW5jZTogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZSddO1xyXG4gIEBJbnB1dCgpIHJlc2lzdGFuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZVJhdGlvJ107XHJcbiAgQElucHV0KCkgd2F0Y2hTbGlkZXNQcm9ncmVzczogU3dpcGVyT3B0aW9uc1snd2F0Y2hTbGlkZXNQcm9ncmVzcyddO1xyXG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogU3dpcGVyT3B0aW9uc1snd2F0Y2hTbGlkZXNWaXNpYmlsaXR5J107XHJcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogU3dpcGVyT3B0aW9uc1snZ3JhYkN1cnNvciddO1xyXG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3M6IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRDbGlja3MnXTtcclxuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiddO1xyXG4gIEBJbnB1dCgpIHNsaWRlVG9DbGlja2VkU2xpZGU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVG9DbGlja2VkU2xpZGUnXTtcclxuICBASW5wdXQoKSBwcmVsb2FkSW1hZ2VzOiBTd2lwZXJPcHRpb25zWydwcmVsb2FkSW1hZ2VzJ107XHJcbiAgQElucHV0KCkgdXBkYXRlT25JbWFnZXNSZWFkeTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25JbWFnZXNSZWFkeSddO1xyXG4gIEBJbnB1dCgpIGxvb3A6IFN3aXBlck9wdGlvbnNbJ2xvb3AnXTtcclxuICBASW5wdXQoKSBsb29wQWRkaXRpb25hbFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcEFkZGl0aW9uYWxTbGlkZXMnXTtcclxuICBASW5wdXQoKSBsb29wZWRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BlZFNsaWRlcyddO1xyXG4gIEBJbnB1dCgpIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IFN3aXBlck9wdGlvbnNbJ2xvb3BGaWxsR3JvdXBXaXRoQmxhbmsnXTtcclxuICBASW5wdXQoKSBsb29wUHJldmVudHNTbGlkZTogU3dpcGVyT3B0aW9uc1snbG9vcFByZXZlbnRzU2xpZGUnXTtcclxuICBASW5wdXQoKSBhbGxvd1NsaWRlUHJldjogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZVByZXYnXTtcclxuICBASW5wdXQoKSBhbGxvd1NsaWRlTmV4dDogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZU5leHQnXTtcclxuICBASW5wdXQoKSBzd2lwZUhhbmRsZXI6IFN3aXBlck9wdGlvbnNbJ3N3aXBlSGFuZGxlciddO1xyXG4gIEBJbnB1dCgpIG5vU3dpcGluZzogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nJ107XHJcbiAgQElucHV0KCkgbm9Td2lwaW5nQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ0NsYXNzJ107XHJcbiAgQElucHV0KCkgbm9Td2lwaW5nU2VsZWN0b3I6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ1NlbGVjdG9yJ107XHJcbiAgQElucHV0KCkgcGFzc2l2ZUxpc3RlbmVyczogU3dpcGVyT3B0aW9uc1sncGFzc2l2ZUxpc3RlbmVycyddO1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ2NvbnRhaW5lck1vZGlmaWVyQ2xhc3MnXTtcclxuICBASW5wdXQoKSBzbGlkZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUNsYXNzJ10gPSAnc3dpcGVyLXNsaWRlJztcclxuICBASW5wdXQoKSBzbGlkZUJsYW5rQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQmxhbmtDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHNsaWRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQWN0aXZlQ2xhc3MnXTtcclxuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzJ107XHJcbiAgQElucHV0KCkgc2xpZGVWaXNpYmxlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVmlzaWJsZUNsYXNzJ107XHJcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHNsaWRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZU5leHRDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHNsaWRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZVByZXZDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyddO1xyXG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzczogU3dpcGVyT3B0aW9uc1snd3JhcHBlckNsYXNzJ10gPSAnc3dpcGVyLXdyYXBwZXInO1xyXG4gIEBJbnB1dCgpIHJ1bkNhbGxiYWNrc09uSW5pdDogU3dpcGVyT3B0aW9uc1sncnVuQ2FsbGJhY2tzT25Jbml0J107XHJcbiAgQElucHV0KCkgb2JzZXJ2ZVBhcmVudHM6IFN3aXBlck9wdGlvbnNbJ29ic2VydmVQYXJlbnRzJ107XHJcbiAgQElucHV0KCkgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IFN3aXBlck9wdGlvbnNbJ29ic2VydmVTbGlkZUNoaWxkcmVuJ107XHJcbiAgQElucHV0KCkgYTExeTogU3dpcGVyT3B0aW9uc1snYTExeSddO1xyXG4gIEBJbnB1dCgpIGF1dG9wbGF5OiBTd2lwZXJPcHRpb25zWydhdXRvcGxheSddO1xyXG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI6IFN3aXBlck9wdGlvbnNbJ2NvbnRyb2xsZXInXTtcclxuICBASW5wdXQoKSBjb3ZlcmZsb3dFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2NvdmVyZmxvd0VmZmVjdCddO1xyXG4gIEBJbnB1dCgpIGN1YmVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2N1YmVFZmZlY3QnXTtcclxuICBASW5wdXQoKSBmYWRlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmYWRlRWZmZWN0J107XHJcbiAgQElucHV0KCkgZmxpcEVmZmVjdDogU3dpcGVyT3B0aW9uc1snZmxpcEVmZmVjdCddO1xyXG4gIEBJbnB1dCgpIGhhc2hOYXZpZ2F0aW9uOiBTd2lwZXJPcHRpb25zWydoYXNoTmF2aWdhdGlvbiddO1xyXG4gIEBJbnB1dCgpIGhpc3Rvcnk6IFN3aXBlck9wdGlvbnNbJ2hpc3RvcnknXTtcclxuICBASW5wdXQoKSBrZXlib2FyZDogU3dpcGVyT3B0aW9uc1sna2V5Ym9hcmQnXTtcclxuICBASW5wdXQoKSBsYXp5OiBTd2lwZXJPcHRpb25zWydsYXp5J107XHJcbiAgQElucHV0KCkgbW91c2V3aGVlbDogU3dpcGVyT3B0aW9uc1snbW91c2V3aGVlbCddO1xyXG4gIEBJbnB1dCgpIHBhcmFsbGF4OiBTd2lwZXJPcHRpb25zWydwYXJhbGxheCddO1xyXG4gIEBJbnB1dCgpIHRodW1iczogU3dpcGVyT3B0aW9uc1sndGh1bWJzJ107XHJcbiAgQElucHV0KCkgem9vbTogU3dpcGVyT3B0aW9uc1snem9vbSddO1xyXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIHNldCBuYXZpZ2F0aW9uKHZhbCkge1xyXG4gICAgY29uc3QgY3VycmVudE5leHQgPSB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nID8gdGhpcy5fbmF2aWdhdGlvbj8ubmV4dEVsIDogbnVsbDtcclxuICAgIGNvbnN0IGN1cnJlbnRQcmV2ID0gdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX25hdmlnYXRpb24/LnByZXZFbCA6IG51bGw7XHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XHJcbiAgICAgIG5leHRFbDogY3VycmVudE5leHQgfHwgbnVsbCxcclxuICAgICAgcHJldkVsOiBjdXJyZW50UHJldiB8fCBudWxsLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uID0gIShcclxuICAgICAgY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCkgIT09IHRydWUgfHxcclxuICAgICAgKHRoaXMuX25hdmlnYXRpb24gJiZcclxuICAgICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXHJcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbi5wcmV2RWwgIT09IHRoaXMuX3ByZXZFbFJlZj8ubmF0aXZlRWxlbWVudCAmJlxyXG4gICAgICAgICh0aGlzLl9uYXZpZ2F0aW9uLnByZXZFbCAhPT0gbnVsbCB8fCB0aGlzLl9uYXZpZ2F0aW9uLm5leHRFbCAhPT0gbnVsbCkgJiZcclxuICAgICAgICAodHlwZW9mIHRoaXMuX25hdmlnYXRpb24ubmV4dEVsID09PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ucHJldkVsID09PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ubmV4dEVsID09PSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ucHJldkVsID09PSAnb2JqZWN0JykpXHJcbiAgICApO1xyXG4gIH1cclxuICBnZXQgbmF2aWdhdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uO1xyXG4gIH1cclxuICBwcml2YXRlIF9uYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uT3B0aW9ucyB8IGJvb2xlYW47XHJcbiAgc2hvd05hdmlnYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBwYWdpbmF0aW9uKHZhbCkge1xyXG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgPyB0aGlzLl9wYWdpbmF0aW9uPy5lbCA6IG51bGw7XHJcbiAgICB0aGlzLl9wYWdpbmF0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XHJcbiAgICAgIGVsOiBjdXJyZW50IHx8IG51bGwsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hvd1BhZ2luYXRpb24gPSBpc1Nob3dFbCh2YWwsIHRoaXMuX3BhZ2luYXRpb24sIHRoaXMuX3BhZ2luYXRpb25FbFJlZik7XHJcbiAgfVxyXG4gIGdldCBwYWdpbmF0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247XHJcbiAgfVxyXG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcclxuICBzaG93UGFnaW5hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNjcm9sbGJhcih2YWwpIHtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSB0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgPyB0aGlzLl9zY3JvbGxiYXI/LmVsIDogbnVsbDtcclxuICAgIHRoaXMuX3Njcm9sbGJhciA9IHNldFByb3BlcnR5KHZhbCwge1xyXG4gICAgICBlbDogY3VycmVudCB8fCBudWxsLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dTY3JvbGxiYXIgPSBpc1Nob3dFbCh2YWwsIHRoaXMuX3Njcm9sbGJhciwgdGhpcy5fc2Nyb2xsYmFyRWxSZWYpO1xyXG4gIH1cclxuICBnZXQgc2Nyb2xsYmFyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2Nyb2xsYmFyOiBTY3JvbGxiYXJPcHRpb25zIHwgYm9vbGVhbjtcclxuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlydHVhbCh2YWwpIHtcclxuICAgIHRoaXMuX3ZpcnR1YWwgPSBzZXRQcm9wZXJ0eSh2YWwpO1xyXG4gIH1cclxuICBnZXQgdmlydHVhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92aXJ0dWFsO1xyXG4gIH1cclxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuc2V0SW5kZXgoaW5kZXgpO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb25maWcodmFsOiBTd2lwZXJPcHRpb25zKSB7XHJcbiAgICB0aGlzLnVwZGF0ZVN3aXBlcih2YWwpO1xyXG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xyXG4gIH1cclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdfYmVmb3JlQnJlYWtwb2ludCcpIHNfX2JlZm9yZUJyZWFrcG9pbnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19iZWZvcmVCcmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ19zbGlkZUNsYXNzJykgc19fc2xpZGVDbGFzczogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snX3NsaWRlQ2xhc3MnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdfc3dpcGVyJykgc19fc3dpcGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc3dpcGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhY3RpdmVJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2FmdGVySW5pdCcpIHNfYWZ0ZXJJbml0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhZnRlckluaXQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdhdXRvcGxheScpIHNfYXV0b3BsYXk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnYXV0b3BsYXlTdGFydCcpIHNfYXV0b3BsYXlTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2F1dG9wbGF5U3RvcCcpIHNfYXV0b3BsYXlTdG9wOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheVN0b3AnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdiZWZvcmVEZXN0cm95Jykgc19iZWZvcmVEZXN0cm95OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVEZXN0cm95J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnYmVmb3JlSW5pdCcpIHNfYmVmb3JlSW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlSW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2JlZm9yZUxvb3BGaXgnKSBzX2JlZm9yZUxvb3BGaXg6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZUxvb3BGaXgnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdiZWZvcmVSZXNpemUnKSBzX2JlZm9yZVJlc2l6ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlUmVzaXplJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpIHNfYmVmb3JlU2xpZGVDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcpIHNfYmVmb3JlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVUcmFuc2l0aW9uU3RhcnQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdicmVha3BvaW50Jykgc19icmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydicmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb246IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NoYW5nZURpcmVjdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2NsaWNrJykgc19jbGljazogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snY2xpY2snXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdkb3VibGVUYXAnKSBzX2RvdWJsZVRhcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZG91YmxlVGFwJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnZG91YmxlQ2xpY2snKSBzX2RvdWJsZUNsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkb3VibGVDbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2Rlc3Ryb3knKSBzX2Rlc3Ryb3k6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2Rlc3Ryb3knXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdmcm9tRWRnZScpIHNfZnJvbUVkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2Zyb21FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnaGFzaENoYW5nZScpIHNfaGFzaENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2hhc2hTZXQnKSBzX2hhc2hTZXQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2hhc2hTZXQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdpbWFnZXNSZWFkeScpIHNfaW1hZ2VzUmVhZHk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2ltYWdlc1JlYWR5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnaW5pdCcpIHNfaW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2tleVByZXNzJykgc19rZXlQcmVzczogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sna2V5UHJlc3MnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdsYXp5SW1hZ2VMb2FkJykgc19sYXp5SW1hZ2VMb2FkOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VMb2FkJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknKSBzX2xhenlJbWFnZVJlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ2xvb3BGaXgnKSBzX2xvb3BGaXg6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2xvb3BGaXgnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdtb21lbnR1bUJvdW5jZScpIHNfbW9tZW50dW1Cb3VuY2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ21vbWVudHVtQm91bmNlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnbmF2aWdhdGlvbkhpZGUnKSBzX25hdmlnYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ25hdmlnYXRpb25TaG93Jykgc19uYXZpZ2F0aW9uU2hvdzogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbmF2aWdhdGlvblNob3cnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdvYnNlcnZlclVwZGF0ZScpIHNfb2JzZXJ2ZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ29ic2VydmVyVXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnb3JpZW50YXRpb25jaGFuZ2UnKSBzX29yaWVudGF0aW9uY2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvcmllbnRhdGlvbmNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3BhZ2luYXRpb25IaWRlJykgc19wYWdpbmF0aW9uSGlkZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvbkhpZGUnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdwYWdpbmF0aW9uUmVuZGVyJykgc19wYWdpbmF0aW9uUmVuZGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uUmVuZGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3BhZ2luYXRpb25VcGRhdGUnKSBzX3BhZ2luYXRpb25VcGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3BhZ2luYXRpb25VcGRhdGUnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdwcm9ncmVzcycpIHNfcHJvZ3Jlc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Byb2dyZXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgncmVhY2hCZWdpbm5pbmcnKSBzX3JlYWNoQmVnaW5uaW5nOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEJlZ2lubmluZyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3JlYWNoRW5kJykgc19yZWFjaEVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVhY2hFbmQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdyZWFsSW5kZXhDaGFuZ2UnKSBzX3JlYWxJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVhbEluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Jlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3Njcm9sbCcpIHNfc2Nyb2xsOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGwnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnRW5kJykgc19zY3JvbGxiYXJEcmFnRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3Njcm9sbGJhckRyYWdTdGFydCcpIHNfc2Nyb2xsYmFyRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnU3RhcnQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzZXRUcmFuc2l0aW9uJykgc19zZXRUcmFuc2l0aW9uOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzZXRUcmFuc2l0aW9uJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NldFRyYW5zbGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3NsaWRlQ2hhbmdlJykgc19zbGlkZUNoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVDaGFuZ2UnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3NsaWRlck1vdmUnKSBzX3NsaWRlck1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlck1vdmUnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzbGlkZXJGaXJzdE1vdmUnKSBzX3NsaWRlckZpcnN0TW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyRmlyc3RNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0xlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnKSBzX3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpIHNfc25hcEdyaWRMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3RhcCcpIHNfdGFwOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0YXAnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCd0b0VkZ2UnKSBzX3RvRWRnZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG9FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3RvdWNoTW92ZScpIHNfdG91Y2hNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaE1vdmUnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCd0b3VjaE1vdmVPcHBvc2l0ZScpIHNfdG91Y2hNb3ZlT3Bwb3NpdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZU9wcG9zaXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgndG91Y2hTdGFydCcpIHNfdG91Y2hTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3RyYW5zaXRpb25FbmQnKSBzX3RyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RyYW5zaXRpb25FbmQnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCd0cmFuc2l0aW9uU3RhcnQnKSBzX3RyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3VwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gIEBPdXRwdXQoJ3pvb21DaGFuZ2UnKSBzX3pvb21DaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3pvb21DaGFuZ2UnXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAvLyBwcmV0dGllci1pZ25vcmVcclxuICBAT3V0cHV0KCdzd2lwZXInKSBzX3N3aXBlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3ByZXZFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIHNldCBwcmV2RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuX3ByZXZFbFJlZiA9IGVsO1xyXG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICdwcmV2RWwnKTtcclxuICB9XHJcbiAgX3ByZXZFbFJlZjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCduZXh0RWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBzZXQgbmV4dEVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLl9uZXh0RWxSZWYgPSBlbDtcclxuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMubmF2aWdhdGlvbiwgJ25hdmlnYXRpb24nLCAnbmV4dEVsJyk7XHJcbiAgfVxyXG4gIF9uZXh0RWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsYmFyRWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBzZXQgc2Nyb2xsYmFyRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuX3Njcm9sbGJhckVsUmVmID0gZWw7XHJcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnNjcm9sbGJhciwgJ3Njcm9sbGJhcicpO1xyXG4gIH1cclxuICBfc2Nyb2xsYmFyRWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgncGFnaW5hdGlvbkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgc2V0IHBhZ2luYXRpb25FbFJlZihlbDogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5fcGFnaW5hdGlvbkVsUmVmID0gZWw7XHJcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnBhZ2luYXRpb24sICdwYWdpbmF0aW9uJyk7XHJcbiAgfVxyXG4gIF9wYWdpbmF0aW9uRWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihTd2lwZXJTbGlkZURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSwgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHk6IHRydWUgfSlcclxuICBzbGlkZXNFbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPjtcclxuICBwcml2YXRlIHNsaWRlczogU3dpcGVyU2xpZGVEaXJlY3RpdmVbXTtcclxuXHJcbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcclxuICBhcHBlbmRTbGlkZXM6IE9ic2VydmFibGU8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT47XHJcblxyXG4gIHN3aXBlclJlZjogU3dpcGVyO1xyXG4gIHJlYWRvbmx5IF9hY3RpdmVTbGlkZXMgPSBuZXcgU3ViamVjdDxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPigpO1xyXG5cclxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xyXG4gICAgaWYgKHRoaXMudmlydHVhbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGVzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHRoaXMuc2xpZGVzKTtcclxuICB9XHJcblxyXG4gIGdldCB6b29tQ29udGFpbmVyQ2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuem9vbSAhPT0gJ2Jvb2xlYW4nID8gdGhpcy56b29tLmNvbnRhaW5lckNsYXNzIDogJ3N3aXBlci16b29tLWNvbnRhaW5lcic7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY29udGFpbmVyQ2xhc3NlcyA9ICdzd2lwZXItY29udGFpbmVyJztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZCxcclxuICApIHt9XHJcblxyXG4gIHByaXZhdGUgX3NldEVsZW1lbnQoZWw6IEVsZW1lbnRSZWYsIHJlZjogYW55LCB1cGRhdGU6IHN0cmluZywga2V5ID0gJ2VsJykge1xyXG4gICAgaWYgKCFlbCB8fCAhcmVmKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyZWYgJiYgZWwubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICBpZiAocmVmW2tleV0gPT09IGVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcmVmW2tleV0gPSBlbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXBkYXRlT2JqID0ge307XHJcbiAgICB1cGRhdGVPYmpbdXBkYXRlXSA9IHRydWU7XHJcbiAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIodXBkYXRlT2JqKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xyXG4gIH1cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmNoaWxkcmVuU2xpZGVzSW5pdCgpO1xyXG4gICAgdGhpcy5pbml0U3dpcGVyKCk7XHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zX3N3aXBlci5lbWl0KHRoaXMuc3dpcGVyUmVmKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGlsZHJlblNsaWRlc0luaXQoKSB7XHJcbiAgICB0aGlzLnNsaWRlc0NoYW5nZXModGhpcy5zbGlkZXNFbCk7XHJcbiAgICB0aGlzLnNsaWRlc0VsLmNoYW5nZXMuc3Vic2NyaWJlKHRoaXMuc2xpZGVzQ2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNsaWRlc0NoYW5nZXMgPSAodmFsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+KSA9PiB7XHJcbiAgICB0aGlzLnNsaWRlcyA9IHZhbC5tYXAoKHNsaWRlOiBTd2lwZXJTbGlkZURpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBzbGlkZS5zbGlkZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgIHNsaWRlLmNsYXNzTmFtZXMgPSB0aGlzLnNsaWRlQ2xhc3M7XHJcbiAgICAgIHJldHVybiBzbGlkZTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcclxuICAgICAgdGhpcy5jYWxjTG9vcGVkU2xpZGVzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMudmlydHVhbCkge1xyXG4gICAgICB0aGlzLnByZXBlbmRTbGlkZXMgPSBvZih0aGlzLnNsaWRlcy5zbGljZSh0aGlzLnNsaWRlcy5sZW5ndGggLSB0aGlzLmxvb3BlZFNsaWRlcykpO1xyXG4gICAgICB0aGlzLmFwcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKDAsIHRoaXMubG9vcGVkU2xpZGVzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3dpcGVyUmVmICYmIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwpIHtcclxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xyXG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwudXBkYXRlKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9O1xyXG5cclxuICBnZXQgaXNTd2lwZXJBY3RpdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZDtcclxuICB9XHJcblxyXG4gIGluaXRTd2lwZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhcmFtczogc3dpcGVyUGFyYW1zLCBwYXNzZWRQYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3dpcGVyUGFyYW1zKTtcclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHN3aXBlclBhcmFtcy5pbml0ID0gZmFsc2U7XHJcbiAgICAgIGlmICghc3dpcGVyUGFyYW1zLnZpcnR1YWwpIHtcclxuICAgICAgICBzd2lwZXJQYXJhbXMub2JzZXJ2ZXIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHN3aXBlclBhcmFtcy5vbkFueSA9IChldmVudCwgLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzW2BzXyR7ZXZlbnR9YF0gYXMgRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHtcclxuICAgICAgICAgIGVtaXR0ZXIuZW1pdCguLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyUGFyYW1zLm9uLCB7XHJcbiAgICAgICAgX2NvbnRhaW5lckNsYXNzZXMoc3dpcGVyLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc2VzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3NsaWRlQ2xhc3NlczogKF8sIHVwZGF0ZWQpID0+IHtcclxuICAgICAgICAgIHVwZGF0ZWQuZm9yRWFjaCgoeyBzbGlkZUVsLCBjbGFzc05hbWVzIH0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBwYXJzZUludChzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgfHwgaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcclxuICAgICAgICAgICAgICBjb25zdCB2aXJ0dWFsU2xpZGUgPSB0aGlzLnNsaWRlcy5maW5kKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYgKHZpcnR1YWxTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbc2xpZGVJbmRleF0uY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBzd2lwZXJSZWYgPSBuZXcgU3dpcGVyKHN3aXBlclBhcmFtcyk7XHJcbiAgICAgIHN3aXBlclJlZi5sb29wQ3JlYXRlID0gKCkgPT4ge307XHJcbiAgICAgIHN3aXBlclJlZi5sb29wRGVzdHJveSA9ICgpID0+IHt9O1xyXG4gICAgICBpZiAoc3dpcGVyUGFyYW1zLmxvb3ApIHtcclxuICAgICAgICBzd2lwZXJSZWYubG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXM7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHN3aXBlclJlZi52aXJ0dWFsICYmIHN3aXBlclJlZi5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XHJcbiAgICAgICAgc3dpcGVyUmVmLnZpcnR1YWwuc2xpZGVzID0gdGhpcy5zbGlkZXM7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5kV2l0aCA9IHtcclxuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgIHJlbmRlckV4dGVybmFsOiB0aGlzLnVwZGF0ZVZpcnR1YWxTbGlkZXMsXHJcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbFVwZGF0ZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBleHRlbmQoc3dpcGVyUmVmLnBhcmFtcy52aXJ0dWFsLCBleHRlbmRXaXRoKTtcclxuICAgICAgICBleHRlbmQoc3dpcGVyUmVmLm9yaWdpbmFsUGFyYW1zLnZpcnR1YWwsIGV4dGVuZFdpdGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcclxuICAgICAgICB0aGlzLnN3aXBlclJlZiA9IHN3aXBlclJlZi5pbml0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBpZiAodGhpcy5zd2lwZXJSZWYudmlydHVhbCAmJiB0aGlzLnN3aXBlclJlZi5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XHJcbiAgICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHN3aXBlclJlZi5vbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmluZGV4Q2hhbmdlLmVtaXQodGhpcy5zd2lwZXJSZWYucmVhbEluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdHlsZTogYW55ID0gbnVsbDtcclxuICBjdXJyZW50VmlydHVhbERhdGE6IGFueTsgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YTtcclxuICBwcml2YXRlIHVwZGF0ZVZpcnR1YWxTbGlkZXMgPSAodmlydHVhbERhdGE6IGFueSkgPT4ge1xyXG4gICAgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YVxyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5zd2lwZXJSZWYgfHxcclxuICAgICAgKHRoaXMuY3VycmVudFZpcnR1YWxEYXRhICYmXHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEuZnJvbSA9PT0gdmlydHVhbERhdGEuZnJvbSAmJlxyXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLnRvID09PSB2aXJ0dWFsRGF0YS50byAmJlxyXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLm9mZnNldCA9PT0gdmlydHVhbERhdGEub2Zmc2V0KVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc3R5bGUgPSB0aGlzLnN3aXBlclJlZi5pc0hvcml6b250YWwoKVxyXG4gICAgICA/IHtcclxuICAgICAgICAgIFt0aGlzLnN3aXBlclJlZi5ydGxUcmFuc2xhdGUgPyAncmlnaHQnIDogJ2xlZnQnXTogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcclxuICAgICAgICB9XHJcbiAgICAgIDoge1xyXG4gICAgICAgICAgdG9wOiBgJHt2aXJ0dWFsRGF0YS5vZmZzZXR9cHhgLFxyXG4gICAgICAgIH07XHJcbiAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSA9IHZpcnR1YWxEYXRhO1xyXG4gICAgdGhpcy5fYWN0aXZlU2xpZGVzLm5leHQodmlydHVhbERhdGEuc2xpZGVzKTtcclxuICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xyXG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVQcm9ncmVzcygpO1xyXG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgIGlmICh0aGlzLnN3aXBlclJlZi5sYXp5ICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy5sYXp5WydlbmFibGVkJ10pIHtcclxuICAgICAgICB0aGlzLnN3aXBlclJlZi5sYXp5LmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH07XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZWRQYXJhbXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMudXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5pdFN3aXBlcihjaGFuZ2VkUGFyYW1zKSB7XHJcbiAgICBpZiAoIShjaGFuZ2VkUGFyYW1zICYmIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgcGFyYW1zOiBjdXJyZW50UGFyYW1zLFxyXG4gICAgICAgIHBhZ2luYXRpb24sXHJcbiAgICAgICAgbmF2aWdhdGlvbixcclxuICAgICAgICBzY3JvbGxiYXIsXHJcbiAgICAgICAgdmlydHVhbCxcclxuICAgICAgICB0aHVtYnMsXHJcbiAgICAgIH0gPSB0aGlzLnN3aXBlclJlZjtcclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnBhZ2luYXRpb24pIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gJiZcclxuICAgICAgICAgIHR5cGVvZiB0aGlzLnBhZ2luYXRpb24gIT09ICdib29sZWFuJyAmJlxyXG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLmVsICYmXHJcbiAgICAgICAgICBwYWdpbmF0aW9uICYmXHJcbiAgICAgICAgICAhcGFnaW5hdGlvbi5lbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24pO1xyXG4gICAgICAgICAgcGFnaW5hdGlvbi5pbml0KCk7XHJcbiAgICAgICAgICBwYWdpbmF0aW9uLnJlbmRlcigpO1xyXG4gICAgICAgICAgcGFnaW5hdGlvbi51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFnaW5hdGlvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICBwYWdpbmF0aW9uLmVsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnNjcm9sbGJhcikge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyICYmXHJcbiAgICAgICAgICB0eXBlb2YgdGhpcy5zY3JvbGxiYXIgIT09ICdib29sZWFuJyAmJlxyXG4gICAgICAgICAgdGhpcy5zY3JvbGxiYXIuZWwgJiZcclxuICAgICAgICAgIHNjcm9sbGJhciAmJlxyXG4gICAgICAgICAgIXNjcm9sbGJhci5lbFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3Njcm9sbGJhcicsIHRoaXMuc2Nyb2xsYmFyKTtcclxuICAgICAgICAgIHNjcm9sbGJhci5pbml0KCk7XHJcbiAgICAgICAgICBzY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xyXG4gICAgICAgICAgc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzY3JvbGxiYXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgc2Nyb2xsYmFyLmVsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLm5hdmlnYXRpb24pIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24gJiZcclxuICAgICAgICAgIHR5cGVvZiB0aGlzLm5hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJlxyXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLnByZXZFbCAmJlxyXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLm5leHRFbCAmJlxyXG4gICAgICAgICAgbmF2aWdhdGlvbiAmJlxyXG4gICAgICAgICAgIW5hdmlnYXRpb24ucHJldkVsICYmXHJcbiAgICAgICAgICAhbmF2aWdhdGlvbi5uZXh0RWxcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCduYXZpZ2F0aW9uJywgdGhpcy5uYXZpZ2F0aW9uKTtcclxuICAgICAgICAgIG5hdmlnYXRpb24uaW5pdCgpO1xyXG4gICAgICAgICAgbmF2aWdhdGlvbi51cGRhdGUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG5hdmlnYXRpb24ucHJldkVsICYmIG5hdmlnYXRpb24ubmV4dEVsKSB7XHJcbiAgICAgICAgICBuYXZpZ2F0aW9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgIG5hdmlnYXRpb24ubmV4dEVsID0gbnVsbDtcclxuICAgICAgICAgIG5hdmlnYXRpb24ucHJldkVsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzICYmIHRoaXMudGh1bWJzICYmIHRoaXMudGh1bWJzLnN3aXBlcikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCd0aHVtYnMnLCB0aGlzLnRodW1icyk7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZWQgPSB0aHVtYnMuaW5pdCgpO1xyXG4gICAgICAgIGlmIChpbml0aWFsaXplZCkgdGh1bWJzLnVwZGF0ZSh0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIgJiYgdGhpcy5jb250cm9sbGVyLmNvbnRyb2wpIHtcclxuICAgICAgICB0aGlzLnN3aXBlclJlZi5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xsZXIuY29udHJvbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN3aXBlcihjaGFuZ2VkUGFyYW1zOiBTaW1wbGVDaGFuZ2VzIHwgYW55KSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb25maWcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGFuZ2VkUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKGlnbm9yZU5nT25DaGFuZ2VzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjaGFuZ2VkUGFyYW1zW2tleV0/LmN1cnJlbnRWYWx1ZSA/PyBjaGFuZ2VkUGFyYW1zW2tleV07XHJcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoa2V5LCBuZXdWYWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmFsbG93U2xpZGVOZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmFsbG93U2xpZGVQcmV2KSB7XHJcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmRpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmJyZWFrcG9pbnRzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcclxuICAgICAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuc2V0QnJlYWtwb2ludCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgfHwgY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbml0U3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYWxjTG9vcGVkU2xpZGVzKCkge1xyXG4gICAgaWYgKCF0aGlzLmxvb3ApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHNsaWRlc1BlclZpZXdQYXJhbXMgPSB0aGlzLnNsaWRlc1BlclZpZXc7XHJcbiAgICBpZiAodGhpcy5icmVha3BvaW50cykge1xyXG4gICAgICBjb25zdCBicmVha3BvaW50ID0gU3dpcGVyLnByb3RvdHlwZS5nZXRCcmVha3BvaW50KHRoaXMuYnJlYWtwb2ludHMpO1xyXG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9XHJcbiAgICAgICAgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzID8gdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKGJyZWFrcG9pbnRPbmx5UGFyYW1zICYmIGJyZWFrcG9pbnRPbmx5UGFyYW1zLnNsaWRlc1BlclZpZXcpIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNsaWRlc1BlclZpZXdQYXJhbXMgPT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcclxuICAgICAgcmV0dXJuIHRoaXMuc2xpZGVzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGxldCBsb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcyB8fCBzbGlkZXNQZXJWaWV3UGFyYW1zO1xyXG5cclxuICAgIGxvb3BlZFNsaWRlcyArPSB0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xyXG5cclxuICAgIGlmIChsb29wZWRTbGlkZXMgPiB0aGlzLnNsaWRlcy5sZW5ndGgpIHtcclxuICAgICAgbG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb29wZWRTbGlkZXMgPSBsb29wZWRTbGlkZXM7XHJcbiAgICByZXR1cm4gbG9vcGVkU2xpZGVzO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcclxuICAgIGlmICghKHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IF9rZXkgPSBrZXkucmVwbGFjZSgvXl8vLCAnJyk7XHJcbiAgICBjb25zdCBpc0N1cnJlbnRQYXJhbU9iaiA9IGlzT2JqZWN0KHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSk7XHJcblxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc3dpcGVyUmVmLm1vZHVsZXMpLmluZGV4T2YoX2tleSkgPj0gMCkge1xyXG4gICAgICBjb25zdCBkZWZhdWx0UGFyYW1zID0gdGhpcy5zd2lwZXJSZWYubW9kdWxlc1tfa2V5XS5wYXJhbXNbX2tleV07XHJcbiAgICAgIGlmIChpc0N1cnJlbnRQYXJhbU9iaikge1xyXG4gICAgICAgIGV4dGVuZCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0sIGRlZmF1bHRQYXJhbXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSA9IGRlZmF1bHRQYXJhbXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDdXJyZW50UGFyYW1PYmogJiYgaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgIGV4dGVuZCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0sIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SW5kZXgoaW5kZXg6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIsIHNpbGVudD86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1N3aXBlckFjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluaXRpYWxTbGlkZSA9IGluZGV4O1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc3dpcGVyUmVmLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxvb3ApIHtcclxuICAgICAgICB0aGlzLnN3aXBlclJlZi5zbGlkZVRvTG9vcChpbmRleCwgc3BlZWQsICFzaWxlbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCAhc2lsZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3dpcGVyUmVmPy5kZXN0cm95KHRydWUsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=