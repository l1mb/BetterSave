using AuthServiceApp.BL.Enums;

namespace AuthServiceApp.WEB.DTOs.Aim
{

    public class AimDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public float Amount { get; set; }
        public DateTime FinishDate { get; set; }

        public DateTime CreationDate { get; set; }
        public AimType Type { get; set; }
        public AimDateType DateType { get; set; }
        public bool? IsMastered { get; set; }
        public Guid UserId { get; set; }
    }

    public class GetAimDto : AimDto
    {
        public Guid Id { get; set; }
    }

}
