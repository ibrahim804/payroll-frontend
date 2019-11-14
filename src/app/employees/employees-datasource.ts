import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface EmployeesItem {
  id: number;
  full_name: string;
  department: string;
  designation: string;
  casual_leave: string;
  sick_leave: string;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: EmployeesItem[] = [
//   {id: 1, full_name: 'Abdullah Salman Siddique', department:'IT', designation: 'Senior Software Engineer'},
//   {id: 2, full_name: 'Farhan Ishraque', department:'IT', designation: 'Database Administrator'},
//   {id: 3, full_name: 'Arif Hossain', department:'IT', designation: 'Trainee Software Engineer'},
//   {id: 4, full_name: 'Siam Rafsunjani', department:'IT', designation: 'Developer'},
//   {id: 5, full_name: 'Ibrahim Khalil', department:'IT', designation: 'Intern'},
//   {id: 6, full_name: 'Md. Rafiul Islam', department:'IT', designation: 'Intern'}
// ];

/**
 * Data source for the Employees view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeesDataSource extends DataSource<EmployeesItem> {
  data: EmployeesItem[]; // = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(employeeData) {
    super();
    this.data = employeeData;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EmployeesItem[]> {
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
  private getPagedData(data: EmployeesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EmployeesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.full_name, b.full_name, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        case 'designation': return compare(a.designation, b.designation, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
