using AuthServiceApp.WEB.DTOs.AimRecording;

namespace AuthServiceApp.WEB.DTOs.Aim
{
    public class AimProgressDto
    {
        public List<AimRecordingModel> AimRecords { get; set; }
        public float Percent { get; set; }
    }
}
