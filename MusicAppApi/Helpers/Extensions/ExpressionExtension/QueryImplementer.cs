using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using AutoMapper.Internal;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.Helpers.Extensions.ExpressionExtension
{
    public static class QueryImplementer
    {
        public static IQueryable<T> Filter<T>(this IQueryable<T> source, PlaceFilterDto filter)
        {
            ExpressionTreeHelper<PlaceDescription> expressionTreeHelper = new ExpressionTreeHelper<PlaceDescription>(filter);
            var predicate = expressionTreeHelper.GetFilterExpression();
            if (predicate != null)
            {
                MethodCallExpression whereCallExpression = Expression.Call(typeof(Queryable),
                    "Where",
                    new Type[] { source.ElementType },
                    source.Expression,
                    predicate
            );
                return source.Provider.CreateQuery<T>(whereCallExpression);
            }
            else
            {
                return source;
            }
        }
    }
}