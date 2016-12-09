import { AppComponent } from './app.component';
import { MockBackend } from '@angular/http/testing';
import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Purchase } from './purchase';
import { PurchaseService } from './purchase.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let MockPurchase: Purchase = <Purchase>{ id: 1, name: 'John Do', creditCardNumber: 111, expiry: 1111 };

describe('Component: HeroDetail', () => {
  let fixture: ComponentFixture<AppComponent>;
  let purchaseService: PurchaseService;
  let mockBackend: MockBackend;
  let appComponent: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent)


  });

  beforeEach(inject([PurchaseService, MockBackend],
    (ps: PurchaseService, mb: MockBackend) => {
      purchaseService = ps;
      mockBackend = mb;
    }));

  describe('Component: AppComponent', () => {
    it('should have a disabled purchase button when form is invalid', () => {
      // should I inject the form??
      const purchaseButton = fixture.debugElement.query(By.css('button[disabled="true"]'));
      expect(purchaseButton).toBeTruthy();
    });

     it('should submit a purchse when form is valid', () => {
      this.purchase = ''
      fixture.detectChanges();
      const purchaseButton = fixture.debugElement.query(By.css('button[disabled="false"]'));
      // expect(purchaseButton).toBeTruthy();
    });

  

    //   it('should emit close without saved purchase when goBack is called directly', () => {
    //     spyOn(appComponent.close, 'emit');
    //     spyOn(window.history, 'back');

    //     appComponent.goBack();

    //     expect(appComponent.close.emit).toHaveBeenCalled();
    //     expect(appComponent.close.emit).toHaveBeenCalledTimes(1);
    //     expect(window.history.back).not.toHaveBeenCalled();
    //   });

    //   it('should attempt to save the purchase when save is called and navigate to purchase when save successful', async(() => {
    //     appComponent.purchase = MockPurchase;
    //     spyOn(appComponent, 'goBack');
    //     spyOn(purchaseService, 'save').and.callFake(() => {
    //       return Promise.resolve(MockPurchase);
    //     });

    //     appComponent.save().then(() => {
    //       expect(purchaseService.save).toHaveBeenCalled();
    //       expect(purchaseService.save).toHaveBeenCalledTimes(1);
    //       expect(purchaseService.save).toHaveBeenCalledWith(MockPurchase);
    //       expect(appComponent.purchase).toEqual(MockPurchase);
    //       expect(appComponent.goBack).toHaveBeenCalled();
    //       expect(appComponent.goBack).toHaveBeenCalledTimes(1);
    //       expect(appComponent.goBack).toHaveBeenCalledWith(MockPurchase);
    //       // done();
    //     });
    //   }));

    // it('should attempt to save the purchase when save is called and display error when save errors', (done) => {
    //   appComponent.purchase = MockPurchase;
    //   const errorMsg = 'Some Error';
    //   spyOn(appComponent, 'goBack');
    //   spyOn(purchaseService, 'save').and.callFake(() => {
    //     return Promise.reject(errorMsg);
    //   });

    //   appComponent.save().then(() => {
    //     expect(purchaseService.save).toHaveBeenCalled();
    //     expect(purchaseService.save).toHaveBeenCalledTimes(1);
    //     expect(purchaseService.save).toHaveBeenCalledWith(MockPurchase);
    //     expect(appComponent.purchase).toEqual(MockPurchase);
    //     expect(appComponent.goBack).not.toHaveBeenCalled();
    //     expect(appComponent.error).toBe(errorMsg);
    //     done();
    //   });
    // });

    // it('should emit close without saved purchase when goBack is called directly and go back when navigated is true', () => {
    //   appComponent.navigated = true;
    //   spyOn(appComponent.close, 'emit');
    //   spyOn(window.history, 'back');

    //   appComponent.goBack();

    //   expect(appComponent.close.emit).toHaveBeenCalled();
    //   expect(appComponent.close.emit).toHaveBeenCalledTimes(1);
    //   expect(window.history.back).toHaveBeenCalled();
    //   expect(window.history.back).toHaveBeenCalledTimes(1);
    // });

    // it('should create a new purchase and set navigated false when initialized without route id param', () => {
    //   expect(appComponent.purchase).not.toBeDefined();

    //   appComponent.ngOnInit();

    //   expect(appComponent.navigated).toBeFalsy();
    //   expect(appComponent.purchase).toEqual(new Hero());
    // });

    // it('should set the purchase to the purchase for the id and set navigated false when initialized with route id param', () => {
    //   expect(appComponent.purchase).not.toBeDefined();
    //   activatedRoute.params = Observable.of({ 'id': 1 });
    //   spyOn(purchaseService, 'getHero').and.callFake(() => {
    //     return {
    //       then: function (callback) {
    //         return callback(MockPurchase);
    //       }
    //     };
    //   });

    //   appComponent.ngOnInit();

    //   expect(appComponent.navigated).toBeTruthy();
    //   expect(appComponent.purchase).toEqual(MockPurchase);
    // });
  });
});
