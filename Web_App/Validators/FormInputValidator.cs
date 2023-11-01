using FluentValidation;
using Web_App.Models;

namespace Web_App.Validators
{
    public class FormInputValidator: AbstractValidator<Employee>
    {
        public FormInputValidator()
        {
            RuleFor(c => c.Name)
                .MinimumLength(3)
                .WithMessage("Name must be atleaset of 3 characters");

            RuleFor(c => c.Email)
                .EmailAddress()
                .WithMessage("Please enter a valid Email address");
            RuleFor(c => c.Address)
                .MinimumLength(5)
                .WithMessage("Address must contain atleast 5 characters");
        }
    }
}
