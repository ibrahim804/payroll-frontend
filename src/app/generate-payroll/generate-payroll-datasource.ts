import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface GeneratePayrollItem {
  name: string;
  id: number;
  fixedSalary: string;
  variableSalary: string;
  overtime: string;
  nightAllowence: string;
  totalSalary: string;
  employeeType: string;
  department: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: GeneratePayrollItem[] = [
  {id: 1, name: 'Salman', fixedSalary: '12,000', variableSalary: '1,000', overtime: '900', nightAllowence: '1,000', totalSalary: '14,900', employeeType: 'Parmanent', department: 'Management'},
  {id: 2, name: 'Farhan', fixedSalary: '15,000', variableSalary: '2,000', overtime: '0', nightAllowence: '0', totalSalary: '17,000', employeeType: 'Parmanent', department: 'Sewing'},
  {id: 3, name: 'Arif', fixedSalary: '8,200', variableSalary: '1,200', overtime: '500',nightAllowence: '1,000', totalSalary: '10,900', employeeType: 'Parmanent', department: 'Sewing'},
  {id: 4, name: 'Siam', fixedSalary: '5,400', variableSalary: '-400', overtime: '0',nightAllowence: '300', totalSalary: '5,300', employeeType: 'Parmanent', department: 'Cutting'},
  {id: 5, name: 'Ibrahim', fixedSalary: '5,000', variableSalary: '400', overtime: '0', nightAllowence: '0', totalSalary: '5,400', employeeType: 'Intern', department: 'Finishing'},
  {id: 6, name: 'Ratul', fixedSalary: '8,000', variableSalary: '-1,000', overtime: '0',nightAllowence: '1,000', totalSalary: '8,000', employeeType: 'Intern', department: 'Quality Control'}
];

/**
 * Data source for the GeneratePayroll view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GeneratePayrollDataSource extends DataSource<GeneratePayrollItem> {
  data: GeneratePayrollItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<GeneratePayrollItem[]> {
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
  private getPagedData(data: GeneratePayrollItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: GeneratePayrollItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
