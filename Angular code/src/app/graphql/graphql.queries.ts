import { gql } from 'apollo-angular';
import { Employee } from '../models/employee';
import { User } from '../models/user';

class EmployeeQueries {
  static getAllEmployees = gql`
    query {
      allEmployees {
        name
        id
        address
        email
      }
    }
  `;
  
  static getEmployeeById = gql`
    query ($input: Int!) {
      employeeById(id: $id) {
        id
        name
      }
    }
  `;
}

export default EmployeeQueries;
