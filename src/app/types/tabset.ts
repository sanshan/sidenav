import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import {VisiblePipe} from './visible.pipe';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'formly-field-tabset',
  template: `
    <div [ngClass]="['left-tabs', field.fieldGroupClassName || '', labelsWidth]">
      <mat-tab-group
        #leftTabs
        class="dynamic-height"
        animationDuration="0ms"
        [disablePagination]="true"
      >

        <mat-tab [disabled]="true">
          <ng-template class="tabs-resize" mat-tab-label>
            <mat-icon (click)="toggleLabelsWidth($event)" [matTooltip]="'Expand / Collapse'"
                      svgIcon="arrow-split-vertical"></mat-icon>&nbsp;
          </ng-template>
        </mat-tab>

        <mat-tab *ngFor="let f of tabs; let index = index;"
                 [disabled]="f?.templateOptions?.disabled || ( index>0 && !isValid(index-1) )">

          <ng-template mat-tab-label>
            <mat-icon matTooltip="{{ f?.templateOptions?.description || '' }}"
                      svgIcon="{{ f?.templateOptions?.attributes?.icon || 'radiobox-marked' }}"></mat-icon>&nbsp;
            <span>{{ f?.templateOptions?.label }}</span>
          </ng-template>

          <formly-field [field]="f"></formly-field>

        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
      `
      .left-tabs .mat-tab-labels {
        flex-direction: column;
      }


      .left-tabs .mat-tab-group {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        height: 100%;
      }

      .left-tabs .mat-tab-body-wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .left-tabs .mat-tab-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .left-tabs .mat-ink-bar {
        left: auto !important;
        right: 0 !important;
        width: 2px !important;
      }

      .left-tabs .mat-tab-header {
        border-bottom: none;
      }

      .left-tabs .mat-tab-label-container {
        border-right: 1px solid #eee;
      }

      .left-tabs .mat-tab-group .mat-ink-bar {
        background-color: transparent !important;
      }

      .left-tabs .mat-tab-label {
        padding: 0 15px 0 5px;
        justify-content: left;
      }

      .left-tabs .mat-tab-label:nth-of-type(1) {
        color: #000;
        cursor: pointer;
      }

      .left-tabs.short .mat-tab-label-container {
        width: 34px;
      }

      .left-tabs .mat-tab-label-content span {
        font-weight: normal;
      }

      .left-tabs .mat-tab-body-content {
        padding: 5px 10px;
      }

    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormlyFieldTabsetComponent extends FieldType implements AfterViewInit {
  labelsWidth: 'short' | 'full' = 'short';
  @ViewChild('leftTabs') tabGroup: MatTabGroup;
  private _ink: any;

  constructor(
    private _elRef: ElementRef
  ) {
    super();
  }

  /**
   * Tabs
   */
  get tabs(): FormlyFieldConfig[] {
    return new VisiblePipe().transform(this.field.fieldGroup, 'templateOptions');
  }

  ngAfterViewInit() {
    this._ink = this._elRef.nativeElement.querySelector('.mat-ink-bar');
    // this._ink.classList.add('vertical');
    this.tabGroup.selectedIndex = (this.field.templateOptions && this.field.templateOptions.panel) ? 0 : 1;
  }

  /**
   * Loginc is Valid
   */
  isValid(index): boolean {
    return true;
    // console.log(index, this.field.formControl.valid)
    // return this.field.fieldGroup[index].formControl.valid;
  }

  // tabChange(e: MatTabChangeEvent) {
  //   // const btn = this._elRef.nativeElement.querySelectorAll('.mat-tab-label')[e.index];
  //   // const top = btn.offsetTop;// + btn.offsetHeight;
  //   // this._ink.style.top = `${top}px`;
  //   // this._ink.style.height = `${btn.offsetHeight}px`;
  // }

  toggleLabelsWidth(e) {
    e.preventDefault();
    this.labelsWidth = this.labelsWidth === 'short' ? 'full' : 'short';
  }

}
