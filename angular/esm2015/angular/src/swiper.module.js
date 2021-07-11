import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper.component';
import { SwiperSlideDirective } from './swiper-slide.directive';
export class SwiperModule {
}
SwiperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SwiperComponent, SwiperSlideDirective],
                exports: [SwiperComponent, SwiperSlideDirective],
                imports: [CommonModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1oRSxNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUM7Z0JBQ3JELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU3dpcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zd2lwZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3dpcGVyU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuL3N3aXBlci1zbGlkZS5kaXJlY3RpdmUnO1xyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1N3aXBlckNvbXBvbmVudCwgU3dpcGVyU2xpZGVEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtTd2lwZXJDb21wb25lbnQsIFN3aXBlclNsaWRlRGlyZWN0aXZlXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFN3aXBlck1vZHVsZSB7fVxyXG4iXX0=