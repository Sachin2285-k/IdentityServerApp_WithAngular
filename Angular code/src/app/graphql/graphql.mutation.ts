import { gql } from 'apollo-angular';

class EmployeeMutations {
  static createEmployee = gql`
    mutation ($input: EmployeeInput!) {
      createEmployee(employee: $input) {
        id
        name
        email
        address
      }
    }
  `;

  static updateEmployee = gql`
    mutation ($input: EmployeeInput!) {
      updateEmployee(employee: $input) {
        id
        name
        email
        address
      }
    }
  `;

  static deleteEmployee = gql`
    mutation ($id: Int!) {
      deleteEmployee(id: $id)
    }
  `;
}

export default EmployeeMutations;
