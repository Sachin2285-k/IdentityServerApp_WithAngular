import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AppComponent } from '../app.component';
import { query } from '@angular/animations';
import EmployeeQueries from '../graphql/graphql.queries';
import EmployeeMutations from '../graphql/graphql.mutation';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[] = []; // Array declaration in Angular
  newEmployee: Employee = new Employee();
  editEmployee: Employee = new Employee();
  error: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAll();
  }

  resetForm() {
    this.newEmployee = {
      id: 0,
      name: '',
      email: '',
      address: '',
    };
  }

  getAll() {
    this.employeeService.getAllEmployee().valueChanges.subscribe(
      ({ data }: any) => {
        this.employeeList = data.allEmployees;
      },
      ({ error }: any) => {
        this.error = error;
      }
    );
  }

  // getById(id: number) {
  //   this.apollo
  //     .watchQuery({
  //       query: EmployeeQueries.getEmployeeById,
  //       variables: {
  //         input: id,
  //       },
  //     })
  //     .valueChanges.subscribe(({ data, e }: any) => {
  //       this.newEmployee = data.employee;
  //       this.error = e;
  //     });
  // }

  createEmployee() {
    this.employeeService.createNewEmployee(this.newEmployee).subscribe(
      (data: any) => {
        // this.getAll();
        this.resetForm();
        // this.employeeList = data.allEmployees
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

  EditClick(emp: Employee) {
    this.editEmployee.id = emp.id;
    this.editEmployee.name = emp.name;
    this.editEmployee.address = emp.address;
    this.editEmployee.email = emp.email;

    console.log(this.editEmployee);
  }

  updateEmployee() {
    this.employeeService.updateOldEmployee(this.editEmployee).subscribe(
      ({ data }: any) => {
        // this.getAll();
      },
      (e) => {
        this.error = e;
        console.log(this.error);
      }
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      ({ data }: any) => {
        console.log(data.result);
      },
      (e) => {
        this.error = e;
        console.log(this.error);
      }
    );
  }
}
