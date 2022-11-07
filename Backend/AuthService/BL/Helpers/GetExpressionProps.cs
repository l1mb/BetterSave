using AuthServiceApp.DAL.Entities;
using AuthServiceApp.DAL.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace AuthServiceApp.BL.Helpers
{
    public static class GetExpressionProps
    {
        public static Expression<Func<ApplicationUser, object>>[] GetExpression<T>(string[] propsArray)
        {
            Expression<Func<ApplicationUser, object>>[] expressions = new Expression<Func<ApplicationUser, object>>[propsArray.Length];
            foreach (var property in propsArray)
            {
                expressions[propsArray.ToList().IndexOf(property)] = u => u[property];
            }
            return expressions;
        }
    }
}
