using AuthServiceApp.BL.Services.Category.Models;

namespace AuthServiceApp.BL.Helpers
{
    public static class GetRsuiteColor
    {
        static Dictionary<string, string>  colors = new Dictionary<string, string>()
        {
            {"red", "hsl(4.11deg 89.62% 58.43%)"},
            {"orange", "hsl(32.88deg 100% 49.02%)"},
            {"yellow", "hsl(42.12deg 100% 50%)"},
            {"green", "hsl(123.78deg 65.13% 38.24%)"},
            {"cyan", "hsl(186.79deg 100% 41.57%)"},
            {"blue", "hsl(209.25deg 88.44% 44.12%)"},
            {"violet", "hsl(261.6deg 51.87% 47.25%)"}
        };
    public static string GetColor(this string model)
    {
        return colors.Single(x => x.Key == model).Value;
    }
    }
}
