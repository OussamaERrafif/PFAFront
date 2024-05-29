import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import axios from 'axios';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  page: number = 1;
  tableSize: number = 10;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    axios
      .get('http://localhost:3000/logs')
      .then((res) => {
        console.log('Logs data:', res.data); // Debugging line
        this.logs = res.data;
        this.cdr.detectChanges(); // Trigger change detection
      })
      .catch((err) => {
        console.error('Error fetching logs:', err);
      });
  }

  normalizeStatus(status: string): string {
    return status.toLowerCase();
  }
}
