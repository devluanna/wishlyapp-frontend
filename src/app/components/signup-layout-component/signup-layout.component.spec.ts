import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLayoutComponent } from './signup-layout.component';

describe('SignupLayoutComponent', () => {
  let component: SignupLayoutComponent;
  let fixture: ComponentFixture<SignupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmit event when submit is called', () => {
    jest.spyOn(component.onSubmit, 'emit'); 
    component.submit();
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });
  
  it('should emit onNavigate event when navigate is called', () => {
    jest.spyOn(component.onNavigate, 'emit'); 
    component.navigate();
    expect(component.onNavigate.emit).toHaveBeenCalled();
  });

});
