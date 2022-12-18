namespace AuthServiceApp.WEB.DTOs.Aim
{

    public enum AimType
    {
        Daily,
        ToDate
    }
    public class AimDto
    {
        public string Name { get; set; }
        public float Amount { get; set; }
        public DateTime FinishDate { get; set; }
        public AimType AimType { get; set; }
        public Guid UserId { get; set; }
    }
}
