using AuthServiceApp.DAL.Entities;
using AuthServiceApp.WEB.DTOs.AimRecording;

namespace AuthServiceApp.WEB.DTOs.Aim
{
    public class AimProgressDto
    {
        public AimEntity Aim { get; set; }
        public float Percent { get; set; }
    }
}
