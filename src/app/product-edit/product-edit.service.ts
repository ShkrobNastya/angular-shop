import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductEditService {
  isToastVisible = new BehaviorSubject<boolean>(false);
}
