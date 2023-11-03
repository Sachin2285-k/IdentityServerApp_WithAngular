export class User {
  userName: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.userName = ''; // Default to an empty string
    this.password = ''; // Default to an empty string
    this.confirmPassword = '';
  }
}
