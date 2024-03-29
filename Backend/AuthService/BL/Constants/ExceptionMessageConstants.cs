﻿namespace AuthServiceApp.BL.Constants
{
    public static class ExceptionMessageConstants
    {
        public const string MissingUser = "User with this email was not found";
        public const string PasswordMismatch = "Couldn't login. Provided password is wrong";
        public const string ConfirmEmail = "Please, confirm your email first";
        public const string UserWithoutRoles = "User without roles";
        public const string UserAlreadyExist = "User with this email already exist";
        public const string TokenIsBroken = "Token isn't valid";
        public const string NotFound = "Entity not found";
        public const string SaveIsImpossible = "Unable to save changes to database";
        public const string BalanceCannotBeNegative = "You balance could not be negative";
        public const string ItemExistCannotSave = "Unable to save enitity. It already exist";
    }
}
