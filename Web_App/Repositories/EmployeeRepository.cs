using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Web_App.Data;
using Web_App.Models;
using Web_App.Repositories.Interfaces;
using Web_App.Validators;

namespace Web_App.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly FormInputValidator _formInputValidator;
        public EmployeeRepository(ApplicationDbContext context, FormInputValidator formInputValidator)
        {
            _formInputValidator = formInputValidator;
            _context = context;
        }
        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var data = await _context.Employees.ToListAsync();
            return data;
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception($"Employee with ID:{id} not found.");
            }

            return employee;
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            var validationResult = _formInputValidator.Validate(employee);

            if (!validationResult.IsValid)
            {
                var exceptionList = validationResult.Errors.Select(error => new Exception(error.ErrorMessage));
                throw new AggregateException(exceptionList);
            }


            var recordInDb = _context.Employees.FirstOrDefault(x=>x.Email== employee.Email);

            if (recordInDb != null)
            {
                throw new Exception("Employee with same Email Id already exist!!");
            }


            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            try
            {
                var recordInDb = _context.Employees.Find(employee.Id);


                if (recordInDb == null)
                {
                    throw new Exception($"Employee with ID:{employee.Id} not found.");
                }
                recordInDb.Name = employee.Name;
                recordInDb.Email = employee.Email;
                recordInDb.Address = employee.Address;
                _context.Employees.Update(recordInDb);
                await _context.SaveChangesAsync();
                return employee;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the Employee: "+ ex);
            }
        } 
        public async Task<string> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                throw new Exception($"Employee with ID:{id} not found.");

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return $"Data with Id:{id} Deleted successfully!";
        }
    }
}
