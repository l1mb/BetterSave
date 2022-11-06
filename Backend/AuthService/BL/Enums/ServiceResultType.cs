namespace AuthServiceApp.BL.Enums
{
    public enum ServiceResultType
    {
        Ok = 200,
        Created = 201,
        NoContent = 204,
        NotChanged = 304,
        InvalidData = 400,
        NotAuthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        ServerError = 500
    }
}
