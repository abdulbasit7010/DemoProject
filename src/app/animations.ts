import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const fadeInGrow = trigger('fadeInGrow', [
    transition(':enter', [
      query(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        group([
          animate('500ms', style({ opacity: 1 })),
          animate('200ms ease-in', style({ transform: 'scale(1)' })),
        ]),
      ]),
    ]),
  ])

  export const fadeSlideInOut = trigger("fadeSlideInOut", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(10px)" }),
      animate("700ms", style({ opacity: 1, transform: "translateY(0)" })),
    ]),
    transition(":leave", [
      animate("700ms", style({ opacity: 0, transform: "translateY(5px)" })),
    ]),
  ])

  export const fade = trigger('fade', [ transition('void => *', [style({opacity:0}), animate(1500)]),
  transition('* => void', [animate(1500), style({opacity: 1})]) ] 
)