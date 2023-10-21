import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { DebugElement } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { logoutAction } from '../store/actions/auth.action';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: AuthService,
          useValue: {
            user: of({ email: 'test@123' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logoutAction when user clicks on logout', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.logout();
    expect(dispatchSpy).toHaveBeenCalledWith(logoutAction());
  });

  it('should not render auth link if user logged in', () => {
    expect(component.isAuthed).toBe(true);
    const authLink = de.query(By.css('.navbar-auth'));
    expect(authLink).toBeFalsy();
  });
});
