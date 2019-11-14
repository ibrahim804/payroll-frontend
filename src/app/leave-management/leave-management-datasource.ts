import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface LeaveManagementItem {
  name: string;
  id: number;
  department: string;
  designation: string;
  category: string;
  start_date: string;
  end_date: string;
  leave_length: string;
  leave_available: string;
  status: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: LeaveManagementItem[] = [
//   {id: 1, name: 'Arif', department: 'IT', designation: 'Trainee', category: 'Sick', start_date: '2019-06-15', end_date: '2019-06-18', status: 'Accepted'},
//   {id: 2, name: 'Siam', department: 'IT', designation: 'Web developer', category: 'Casual', start_date: '2019-06-17', end_date: '2019-06-20', status: 'Pending'},
//   {id: 3, name: 'Khalil', department: 'IT', designation: 'Intern', category: 'Sick', start_date: '2019-06-20', end_date: '2019-06-26', status: 'Pending'}
// ];

/**
 * Data source for the LeaveManagement view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaveManagementDataSource extends DataSource<LeaveManagementItem> {
  data: LeaveManagementItem[]; // = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(leaves) {
    super();
    this.data = leaves;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<LeaveManagementItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: LeaveManagementItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: LeaveManagementItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        case 'designation': return compare(a.designation, b.designation, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
