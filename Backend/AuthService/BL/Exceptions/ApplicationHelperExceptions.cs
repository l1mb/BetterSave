using AuthServiceApp.BL.Enums;
using System.Runtime.Serialization;

namespace AuthServiceApp.BL.Exceptions
{
    public class ApplicationHelperException : Exception
    {
        public ServiceResultType ErrorStatus;
        public ApplicationHelperException(string message ) : base(message)
        {
        }
        public ApplicationHelperException(ServiceResultType code, string message) : base(message)
        {
            this.ErrorStatus = code;
        }

        public ApplicationHelperException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected ApplicationHelperException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
