﻿using AuthServiceApp.BL.Constants;

namespace AuthServiceApp.BL.Exceptions
{
    public static class ExceptionUtilities
    {
        public static void CheckSaveStatus<T>(T value)
        {
            if (value is null)
            {
                throw new ApplicationHelperException(Enums.ServiceResultType.InvalidData, ExceptionMessageConstants.SaveIsImpossible);
            }
        }

        public static void CheckExtractionStatus<T>(T value)
        {
            if (value is null)
            {
                throw new ApplicationHelperException(Enums.ServiceResultType.InvalidData, ExceptionMessageConstants.NotFound);
            }
        }
    }
}
