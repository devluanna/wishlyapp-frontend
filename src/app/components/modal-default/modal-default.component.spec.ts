import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDefaultComponent } from './modal-default.component';

describe('ModalDefaultComponent', () => {
  let component: ModalDefaultComponent;
  let fixture: ComponentFixture<ModalDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDefaultComponent);
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
  
  

});
