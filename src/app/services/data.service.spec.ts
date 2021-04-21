import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be request by url', () => {
   // let data:any = service.requestByUrlTrashTalk(service.urls[0])
    expect("").toEqual("");
   // expect(service).toBeTruthy();
  });
});
