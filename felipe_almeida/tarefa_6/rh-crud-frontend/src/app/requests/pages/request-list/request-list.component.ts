import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService, Request } from '../../services/request.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './request-list.component.html',
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getAll().subscribe((data) => {
      this.requests = data;
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/requests/edit', id]);
  }

  onDelete(id: string): void {
    if (confirm('Deseja realmente excluir esta solicitação?')) {
      this.requestService.delete(id).subscribe(() => this.loadRequests());
    }
  }
}
