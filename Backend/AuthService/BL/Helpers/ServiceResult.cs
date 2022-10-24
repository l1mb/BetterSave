using AuthServiceApp.BL.Enums;

namespace AuthServiceApp.BL.Helpers
{
    public class ServiceResult
    {
        public ServiceResultType Result { get; set; }
        public string ErrorMessage { get; set; }

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
            ErrorMessage = message;
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
            ErrorMessage = message;
        }

        public ServiceResult(ServiceResultType result, T data)
        {
            Result = result;
            Data = data;
        }

        public ServiceResult(ServiceResultType result, string message, T data)
        {
            Result = result;
            ErrorMessage = message;
            Data = data;
        }
    }
}

