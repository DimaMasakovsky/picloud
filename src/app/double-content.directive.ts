import { AfterViewInit, Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDoubleContent]',
})
export class DoubleContentDirective implements AfterViewInit {
  public isContentWasCreated = false;

  constructor(private template: TemplateRef<any>, private vc: ViewContainerRef) {
    this.vc.createEmbeddedView(template);
  }

  ngAfterViewInit(): void {
    if (!this.isContentWasCreated) {
      this.vc.insert(this.vc.createEmbeddedView(this.template));
      this.isContentWasCreated = true;
    }
  }
}
