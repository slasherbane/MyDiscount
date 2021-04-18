import { TestBed } from '@angular/core/testing';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NativeStorage]
     
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
