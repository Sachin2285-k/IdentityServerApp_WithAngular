import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { ApolloErrorOptions } from '@apollo/client/errors';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  newEmployee: Employee = new Employee();
  editEmployee: Employee = new Employee();
  error: any = '';
  errorMessages: string[] = [];

  @ViewChild('closeButtonSave', { static: false }) closeButtonSave?: ElementRef;
  @ViewChild('closeButtonUpdate', { static: false }) closeButtonUpdate?: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

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
    this.employeeService.getAllEmployee().valueChanges.subscribe({
      next: (data: any) => {
        this.employeeList = data.data.allEmployees;
        // console.log(this.employeeList);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
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
    // console.log('closeButtonSave', this.closeButtonSave);

    this.employeeService.createNewEmployee(this.newEmployee).subscribe({
      next: (data: any) => {
        this.resetForm();
        this.closeButtonSave?.nativeElement.click();
        this.toastr.success('Data saved successfully!!');
        // console.log(data);
      },
      error: (error: ApolloErrorOptions) => {
        this.errorMessages = [];

        const errorArray = (error.networkError as any).error.errors;
        this.errorMessages = errorArray.map(
          (errorItem: any) => errorItem.message
        );
        // console.log(this.errorMessages);
        this.errorMessages.forEach((element) => {
            this.toastr.error(element);
        });
      },
    });
  }

  EditClick(emp: Employee) {
    this.editEmployee.id = emp.id;
    this.editEmployee.name = emp.name;
    this.editEmployee.address = emp.address;
    this.editEmployee.email = emp.email;

    // console.log(this.editEmployee);
  }

  async updateEmployee() {
    // console.log('closeButtonUpdate', this.closeButtonUpdate);
   await this.employeeService.updateOldEmployee(this.editEmployee).subscribe({
      next: (data: any) => {
        // this.getAll();
        this.closeButtonUpdate?.nativeElement.click();
        this.toastr.success('Data updated successfully!');
      },
      error: (error: ApolloErrorOptions) => {
        this.errorMessages = [];

        const errorArray = (error.networkError as any).error.errors;
        this.errorMessages = errorArray.map(
          (errorItem: any) => errorItem.message
        );

        this.errorMessages.forEach((element) => {        
            this.toastr.error(element);        
        });
      },
    });
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible',
      icon: 'warning',
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete.value) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: ({ data }: any) => {
            console.log(data);
            this.toastr.success(data.deleteEmployee);
          },
          error: (e) => {
            this.error = e;
            console.log(this.error);
          },
        });
      }
    });
  }
}
