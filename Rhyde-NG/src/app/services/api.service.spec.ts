import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { expectedUsers } from './testdata/users';

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets all users', ()=>{
    service.getUsers().subscribe((users: any)=>{
      expect(users).toBeTruthy()
      expect(users.length).toBe(3)
    })

    const mockReq = testingController.expectOne('http://localhost:4100/users')
    mockReq.flush(Object.values(expectedUsers))
    expect(mockReq.request.method).toBe('GET')
  })

  it('gets user by id', ()=>{
    let id = '206ff9b5-5413-4f20-b343-501285fcf0a3'
    service.getOneUserDetails(id).subscribe((user:any)=>{
      expect(user).toBeTruthy();
      expect(user.name).toBe('Meshack Korir')
    })

    const mockReq = testingController.expectOne(`http://localhost:4100/users/${id}`)
    mockReq.flush(expectedUsers[0])
    expect(mockReq.request.method).toBe('GET')
  })

  it('registers a user', ()=>{
    let mockUser = {
      name: "user",
      email: "user@yopmail.com",
      phone_number: "0787543211",
      role: "user",
      password: "user",
      location: "Nairobi",
      profile_image: ''
    }

    service.registerUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual("User registered successfully")
    })

    const mockReq = testingController.expectOne('http://localhost:4100/users');
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)
    mockReq.flush({"message": "User registered successfully"})
  })

  it('deletes a user', ()=>{
    let id = '206ff9b5-5413-4f20-b343-501285fcf0a3'

    service.deleteUser(id).subscribe((res:any)=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Deleted successfully')
    })

    const mockReq = testingController.expectOne(`http://localhost:4100/users/delete/${id}`)
    expect(mockReq.request.method).toBe('DELETE')
  })
});
