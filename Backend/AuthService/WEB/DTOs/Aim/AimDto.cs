namespace AuthServiceApp.WEB.DTOs.Aim
{

    public enum AimType
    {
        Daily,
        ToDate
    }
    public class AimDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public float Amount { get; set; }
        public DateTime FinishDate { get; set; }
        public int AimType { get; set; }
        public Guid UserId { get; set; }
    }

    public class GetAimDto : AimDto
    {
        public Guid Id { get; set; }
    }

}
