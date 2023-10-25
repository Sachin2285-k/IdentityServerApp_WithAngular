import { gql } from 'apollo-angular';
import { Employee } from '../employee';
import { User } from '../user';

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
  
  static getAuthenticated = gql`
    query ($input: UserInput!) {
      authenticated(userInput: $input) {
        id
        userName
        password
        token
      }
    }
  `;
}

export default EmployeeQueries;
