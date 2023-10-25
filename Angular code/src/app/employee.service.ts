import { Employee } from './employee';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import EmployeeQueries from './graphql/graphql.queries';
import EmployeeMutations from './graphql/graphql.mutation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployee() {
    return this.apollo.watchQuery({
      query: EmployeeQueries.getAllEmployees,
    });
  }

  createNewEmployee(newEmployee: Employee): Observable<any> {
    return this.apollo.mutate({
      mutation: EmployeeMutations.createEmployee,
      variables: {
        input: newEmployee,
      },
      refetchQueries: [{ query: EmployeeQueries.getAllEmployees }],
    });
  }

  updateOldEmployee(editEmployee: Employee): Observable<any> {
    return this.apollo.mutate({
      mutation: EmployeeMutations.updateEmployee,
      variables: {
        input: editEmployee,
      },
      refetchQueries: [{ query: EmployeeQueries.getAllEmployees }],
    });
  }

  deleteEmployee(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: EmployeeMutations.deleteEmployee,
      variables: {
        id: id,
      },
      refetchQueries: [{ query: EmployeeQueries.getAllEmployees }],
    });
  }
}
