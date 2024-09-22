import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { describe, beforeEach, it, expect } from '@jest/globals'; 

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should have default properties set', () => {
    expect(component.type).toBe('text');
    expect(component.placeholder).toBe('');
    expect(component.label).toBe('');
    expect(component.inputName).toBe('');
    expect(component.hasError).toBe(false);
    expect(component.errorMessage).toBe('');
  });
  
  it('should write value to the input', () => {
    component.writeValue('Test Value');
    expect(component.value).toBe('Test Value');
  });

  it('should call onChange when input is changed', () => {
    const inputValue = 'New Value';
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: inputValue }
    });
    
    component.onChange = jest.fn();
    component.onInput(event);
    
    expect(component.onChange).toHaveBeenCalledWith(inputValue);
  });

  it('should display error message when hasError is true', () => {
    component.hasError = true;
    component.errorMessage = 'Error occurred';
    
    fixture.detectChanges();
    
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain('Error occurred');
  });

  it('should bind input properties correctly', () => {
    component.type = 'email';
    component.placeholder = 'Enter your email';
    component.label = 'Email';
  
    fixture.detectChanges();
  
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.type).toBe('email');
    expect(inputElement.placeholder).toBe('Enter your email');
  
    const labelElement: HTMLLabelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Email');
  });


  it('should render icon passed via ng-content', () => {
    const icon = '<span class="test-icon"></span>';
    component.hasError = false; 
    fixture.detectChanges();
  
    const iconElement = fixture.nativeElement.querySelector('.icon');
    expect(iconElement).toBeTruthy();
  });

  it('should call onChange with the input value when input is changed', () => {
    const inputValue = 'New Value';
    const event = new Event('input');
    
    Object.defineProperty(event, 'target', {
      value: { value: inputValue }
    });
  
    component.onChange = jest.fn();
    component.onInput(event);
  
    expect(component.onChange).toHaveBeenCalledWith(inputValue);
  });
})

