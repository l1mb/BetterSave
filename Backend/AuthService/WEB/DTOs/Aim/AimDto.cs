﻿namespace AuthServiceApp.WEB.DTOs.Aim
{
    public class AimDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid AimTypeId { get; set; }
        public Guid UserId { get; set; }
    }
}
