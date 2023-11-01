namespace Web_App
{
    public class GraphQLErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            if (error.Exception != null)
            {
                return error.WithMessage(error.Exception.Message);
            }
            return error; // Return the original error if there's no exception.
        }
    }

}
