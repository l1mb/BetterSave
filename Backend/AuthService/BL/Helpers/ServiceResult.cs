using AuthServiceApp.BL.Enums;

namespace AuthServiceApp.BL.Helpers
{
    public class Error
    {
        public Error(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        public string ErrorMessage { get; set; }
    }
    public class ServiceResult
    {
        public ServiceResultType Result { get; set; }

        public Error Error { get; set; }    

        public ServiceResult()
        {

        }
        public ServiceResult(ServiceResultType result)
        {
            Result = result;
        }

        public ServiceResult(ServiceResultType result, string message)
        {
            Result = result;
            
        }
    }

    public class ServiceResult<T> : ServiceResult
    {
        public T Data { get; set; }

        public ServiceResult()
        {
        }

        public ServiceResult(ServiceResultType result)
        {
            Result = result;
        }

        public ServiceResult(ServiceResultType result, string message)
        {
            Result = result;
            Error = new(message);
        }

        public ServiceResult(ServiceResultType result, T data)
        {
            Result = result;
            Data = data;
        }

        public ServiceResult(ServiceResultType result, string message, T data)
        {
            Result = result;
            Error = new(message);
            Data = data;
        }
    }
}

