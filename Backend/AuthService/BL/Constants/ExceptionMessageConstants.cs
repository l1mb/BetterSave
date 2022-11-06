namespace AuthServiceApp.BL.Constants
{
    public static class ExceptionMessageConstants
    {
        public const string MissingUser = "User with this email was not found";
        public const string PasswordMissmatch = "Couldn't login. Provided password is wrong";
        public const string ConfirmEmail = "Please, confirm your email first";
        public const string UserWithoutRoles = "User without roles";
        public const string UserAlreadyExist = "User with this email already exist";
        public const string TokenIsBroken = "Token isn't valid";
    }
}
