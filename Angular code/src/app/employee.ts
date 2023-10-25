export class Employee {
    /*id: any;
  name: any;               // any can store any type of data
  address:any;
  salary: any; 

  constructor(){
      this.id = null;
      this.name = null;
      this.address = null;
      this.salary = null;
  } */

    id: number;
    name: string;
    address: string;
    email: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.address = ""; // Properties initialized
        this.email = "";
    }
}
