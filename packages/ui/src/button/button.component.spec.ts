/**
 * Button Component Tests
 *
 * Unit tests for the Button component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default variant classes', () => {
    expect(compiled.className).toContain('bg-primary');
    expect(compiled.className).toContain('text-primary-foreground');
  });

  it('should apply outline variant classes', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    expect(compiled.className).toContain('border');
    expect(compiled.className).toContain('border-input');
  });

  it('should apply size classes', () => {
    component.size = 'sm';
    fixture.detectChanges();
    expect(compiled.className).toContain('h-9');
    expect(compiled.className).toContain('px-3');
  });

  it('should apply custom classes', () => {
    component.class = 'custom-class';
    fixture.detectChanges();
    expect(compiled.className).toContain('custom-class');
  });
});
