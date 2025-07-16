import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Request {
  id: string; // ou number, dependendo do seu backend
  employeeName: string;
  description: string;
  type: 'FÉRIAS' | 'AFASTAMENTO' | 'OUTROS'; // ou apenas string
  status: string; // se estiver sendo usado
  createdAt?: string; // se vier do backend
}


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly API = `${environment.apiUrl}/requests`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Request[]> {
    return this.http.get<Request[]>(this.API);
  }

  getById(id: string): Observable<Request> {
    return this.http.get<Request>(`${this.API}/${id}`);
  }

  create(data: Omit<Request, 'id'>): Observable<Request> {
    return this.http.post<Request>(this.API, data);
  }

  update(id: string, data: Omit<Request, 'id'>): Observable<Request> {
    return this.http.put<Request>(`${this.API}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

