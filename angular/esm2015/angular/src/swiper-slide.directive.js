import { Directive, Input, TemplateRef } from '@angular/core';
import { coerceBooleanProperty } from './utils/utils';
export class SwiperSlideDirective {
    constructor(template) {
        this.template = template;
        this.class = '';
        this.slideData = {
            isActive: false,
            isPrev: false,
            isNext: false,
            isVisible: false,
            isDuplicate: false,
        };
    }
    set zoom(val) {
        this._zoom = coerceBooleanProperty(val);
    }
    get zoom() {
        return this._zoom;
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(val) {
        if (this._classNames === val) {
            return;
        }
        this._classNames = val;
        this.slideData = {
            isActive: this._hasClass(['swiper-slide-active', 'swiper-slide-duplicate-active']),
            isVisible: this._hasClass(['swiper-slide-visible']),
            isDuplicate: this._hasClass(['swiper-slide-duplicate']),
            isPrev: this._hasClass(['swiper-slide-prev', 'swiper-slide-duplicate-prev']),
            isNext: this._hasClass(['swiper-slide-next', 'swiper-slide-duplicate-next']),
        };
    }
    _hasClass(classNames) {
        return classNames.some((className) => this._classNames.indexOf(className) >= 0);
    }
}
SwiperSlideDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[swiperSlide]',
            },] }
];
SwiperSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SwiperSlideDirective.propDecorators = {
    virtualIndex: [{ type: Input }],
    class: [{ type: Input }],
    zoom: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLXNsaWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXItc2xpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJdEQsTUFBTSxPQUFPLG9CQUFvQjtJQXlDL0IsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUF2Q3BDLFVBQUssR0FBVyxFQUFFLENBQUM7UUE4QjVCLGNBQVMsR0FBRztZQUNWLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7SUFHOEMsQ0FBQztJQXRDakQsSUFDSSxJQUFJLENBQUMsR0FBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUdELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsR0FBRztRQUNoQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssR0FBRyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLCtCQUErQixDQUFDLENBQUM7WUFDbEYsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25ELFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RCxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLDZCQUE2QixDQUFDLENBQUM7WUFDNUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1NBQzdFLENBQUM7SUFDSixDQUFDO0lBRU8sU0FBUyxDQUFDLFVBQW9CO1FBQ3BDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7O1lBbENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2FBQ3JDOzs7WUFKMEIsV0FBVzs7OzJCQU1uQyxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW3N3aXBlclNsaWRlXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTd2lwZXJTbGlkZURpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCkgdmlydHVhbEluZGV4OiBudW1iZXI7XHJcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHpvb20odmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl96b29tID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XHJcbiAgfVxyXG4gIGdldCB6b29tKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3pvb207XHJcbiAgfVxyXG4gIHByaXZhdGUgX3pvb206IGJvb2xlYW47XHJcbiAgc2xpZGVJbmRleDogbnVtYmVyO1xyXG4gIGdldCBjbGFzc05hbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzTmFtZXM7XHJcbiAgfVxyXG4gIHNldCBjbGFzc05hbWVzKHZhbCkge1xyXG4gICAgaWYgKHRoaXMuX2NsYXNzTmFtZXMgPT09IHZhbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jbGFzc05hbWVzID0gdmFsO1xyXG4gICAgdGhpcy5zbGlkZURhdGEgPSB7XHJcbiAgICAgIGlzQWN0aXZlOiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1hY3RpdmUnLCAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnXSksXHJcbiAgICAgIGlzVmlzaWJsZTogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtdmlzaWJsZSddKSxcclxuICAgICAgaXNEdXBsaWNhdGU6IHRoaXMuX2hhc0NsYXNzKFsnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZSddKSxcclxuICAgICAgaXNQcmV2OiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1wcmV2JywgJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldiddKSxcclxuICAgICAgaXNOZXh0OiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1uZXh0JywgJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtbmV4dCddKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYXNDbGFzcyhjbGFzc05hbWVzOiBzdHJpbmdbXSkge1xyXG4gICAgcmV0dXJuIGNsYXNzTmFtZXMuc29tZSgoY2xhc3NOYW1lKSA9PiB0aGlzLl9jbGFzc05hbWVzLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwKTtcclxuICB9XHJcbiAgc2xpZGVEYXRhID0ge1xyXG4gICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgaXNQcmV2OiBmYWxzZSxcclxuICAgIGlzTmV4dDogZmFsc2UsXHJcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxyXG4gICAgaXNEdXBsaWNhdGU6IGZhbHNlLFxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgX2NsYXNzTmFtZXM6IHN0cmluZztcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuIl19