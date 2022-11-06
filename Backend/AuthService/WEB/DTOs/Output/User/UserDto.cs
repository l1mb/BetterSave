﻿namespace AuthServiceApp.WEB.DTOs.Output.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateOnly Birthday { get; set; }
    }
}
