import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  onResize(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth), 
      startWith(window.innerWidth)
    )
  }
}
