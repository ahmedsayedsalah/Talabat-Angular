import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  imports: [NgTemplateOutlet,NgFor,NgIf],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected = true;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number) {
    this.selectedIndex = index;
    // console.log(this.selectedIndex);
  }


}
