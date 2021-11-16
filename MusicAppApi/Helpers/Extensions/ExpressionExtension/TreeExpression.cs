using System;
using System.Linq.Expressions;
using AutoMapper.Internal;

namespace MusicAppApi.Helpers.Extensions.ExpressionExtension
{
    public static class TreeExpression
    {
        public static Expression<Func<T, bool>> CombineAnd<T>(this Expression<Func<T, bool>> self, Expression<Func<T, bool>> other)
        {
            var parameter = Expression.Parameter(typeof(T), "a");
            return Expression.Lambda<Func<T, bool>>(
                Expression.AndAlso(
                    self.Body.Replace(self.Parameters[0], parameter),
                    other.Body.Replace(other.Parameters[0], parameter)
                ),
                parameter
            );
        }

    }
}