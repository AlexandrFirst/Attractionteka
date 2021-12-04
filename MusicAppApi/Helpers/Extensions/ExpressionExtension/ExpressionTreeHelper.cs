using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using AutoMapper.Internal;
using MusicAppApi.DTOs;
using MusicAppApi.Models;

namespace MusicAppApi.Helpers.Extensions.ExpressionExtension
{
    public class ExpressionTreeHelper<T> where T : PlaceDescription
    {
        private const int MAX_LEVENSHTEIN_DIST = 3;
        public ParameterExpression parameter = null;
        //Dictionary to store expression delegates
        private readonly Dictionary<PropertyInfo, Func<ParameterExpression, PropertyInfo, Expression>> expressionMethodPairs = null;
        private readonly Dictionary<PropertyInfo, PropertyInfo> propertyPairs = null;
        //Private field containing filters
        private readonly PlaceFilterDto filter = null;

        #region InitializeDictionaries
        private void InitializePropertyPairs()
        {
            Type filterType = typeof(PlaceFilterDto);
            Type baseType = typeof(T);
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.PlaceName)), baseType.GetProperty("Name"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.KeyWords)), baseType.GetProperty("KeyWords"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.FromTime)), baseType.GetProperty("UploadTime"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.ToTime)), baseType.GetProperty("UploadTime"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.FromRating)), baseType.GetProperty("Rating"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.ToRating)), baseType.GetProperty("Rating"));
            propertyPairs.Add(filterType.GetProperty(nameof(PlaceFilterDto.AuthorNameList)), baseType.GetProperty("Author"));
        }

        private void InitializeExpressionMehtodPairs()
        {
            Type baseType = typeof(T);
            expressionMethodPairs.Add(baseType.GetProperty("KeyWords"), MatchKeyWordsRefactored);
            // expressionMethodPairs.Add(baseType.GetProperty("Rating"), RatingBetween);
            expressionMethodPairs.Add(baseType.GetProperty("UploadTime"), UploadDateBetween);
            expressionMethodPairs.Add(baseType.GetProperty("Name"), NameContains);
            expressionMethodPairs.Add(baseType.GetProperty("Author"), MatchAuthor);
        }
        #endregion
        public ExpressionTreeHelper(PlaceFilterDto filterDTO)
        {
            this.filter = filterDTO;
            propertyPairs = new Dictionary<PropertyInfo, PropertyInfo>();
            expressionMethodPairs = new Dictionary<PropertyInfo, Func<ParameterExpression, PropertyInfo, Expression>>();
            InitializePropertyPairs();
            InitializeExpressionMehtodPairs();
        }
        public Expression<Func<T, bool>> GetFilterExpression()
        {
            // our main parameter {parameter}
            parameter = Expression.Parameter(typeof(T), "parameter");
            // get filtering properites
            IEnumerable<PropertyInfo> filterProperties = typeof(PlaceFilterDto).GetProperties();
            // the final expression which we are going to compile
            Expression resultExpression = null;
            foreach (var property in filterProperties)
            {
                if (CheckEmptyness(property) && propertyPairs.ContainsKey(property))
                {
                    var baseProperty = propertyPairs[property];
                    Func<ParameterExpression, PropertyInfo, Expression> expressionMethod = expressionMethodPairs[baseProperty];
                    Expression tmp = expressionMethod?.Invoke(parameter, baseProperty);
                    resultExpression = resultExpression == null ? tmp : Expression.AndAlso(tmp, resultExpression);
                }
            }
            // predicate to put into where extension method
            if(resultExpression == null)
                return null;
            else{
                Expression<Func<T, bool>> predicate = Expression.Lambda<Func<T, bool>>(resultExpression, new ParameterExpression[] { parameter });
                return predicate;
            }
        }
        #region keywords
        private Expression MatchKeyWords(ParameterExpression parameter, PropertyInfo property)
        {
            /*
             return parameter => parameter.Keywords.IsMatch(word) AND parameter.KeyWord.IsMatch(anotherWord);
             */
            MemberExpression propertyExpression = Expression.Property(parameter, property);
            Expression resultEpxression = null;

            //iterate through every keyword
            foreach (var keyword in filter.KeyWords)
            {
                var regex = String.Format(@"[^A-Za-z\d]{0}[^A-Za-z\d]", keyword);
                var tmp = Expression.Call(typeof(Regex), "IsMatch", null, propertyExpression, Expression.Constant(regex, typeof(string)));
                resultEpxression = resultEpxression == null ? tmp : Expression.AndAlso(tmp, resultEpxression);
            }
            //clean the input filter data
            filter.KeyWords.Clear();
            return resultEpxression;
        }
        private Expression MatchKeyWordsRefactored(ParameterExpression parameter, PropertyInfo property){
            
            MemberExpression propertyExpression = Expression.Property(parameter, property);
            MethodInfo contains = typeof(string).GetMethod(nameof(String.Contains), new Type[] { typeof(string) });
            MethodInfo toLower = typeof(string).GetMethod("ToLower", System.Type.EmptyTypes);
            var toLowerPropertyExpression = Expression.Call(propertyExpression, toLower);
            Expression resultExpression = null;
            foreach(var keyword in filter.KeyWords)
            {
                string keyWordString = String.Format("{0},", keyword);
                var tmp = Expression.Call(toLowerPropertyExpression, contains, Expression.Constant(keyWordString, typeof(string)));
                resultExpression = resultExpression == null ? tmp : Expression.AndAlso(tmp, resultExpression);
            }
            return resultExpression;
        }
        #endregion

        #region Rating
        private Expression RatingBetween(ParameterExpression parameter, PropertyInfo property)
        {
            /*
             parameter => parameter.Rating >= FromRating && parameter.Rating <= ToRating
             */
            MemberExpression propertyExpression = Expression.Property(parameter, property);
            Expression ratingInterval = null;
            //Checking left interval point
            if (filter.FromRating != 0)
            {
                ConstantExpression greaterThan = Expression.Constant(filter.FromRating, typeof(Double));
                ratingInterval = Expression.GreaterThanOrEqual(propertyExpression, greaterThan);
            }
            //Checking right interval point
            if (filter.ToRating != Double.MaxValue)
            {
                ConstantExpression lessThan = Expression.Constant(filter.ToRating, typeof(Double));
                Expression lessThanExpression = Expression.LessThanOrEqual(propertyExpression, lessThan);
                ratingInterval = ratingInterval == null ? lessThanExpression : Expression.AndAlso(ratingInterval, lessThanExpression);
            }
            //set Default values in order to not to invoke this method another time;
            filter.FromRating = 0;
            filter.ToRating = Double.MaxValue;

            return ratingInterval;
        }
        #endregion

        #region LoadDate

        private Expression UploadDateBetween(ParameterExpression parameter, PropertyInfo property)
        {
            /*
             parameter => parameter.UploadDate >= someVal && parameter.UploadDate <= someVal
             */
            // {parameter.UploadTime}
            MemberExpression propertyExpression = Expression.Property(parameter, property);
            Expression dateInterval = null;
            if (filter.FromTime != DateTime.MinValue)
            {
                ConstantExpression greaterThan = Expression.Constant(filter.FromTime, typeof(DateTime));
                Expression greaterThanExpression = Expression.GreaterThanOrEqual(propertyExpression, greaterThan);
                dateInterval = greaterThanExpression;
            }
            if (filter.ToTime != DateTime.MaxValue)
            {
                ConstantExpression lessThan = Expression.Constant(filter.ToTime, typeof(DateTime));
                Expression lessThanExpression = Expression.LessThanOrEqual(propertyExpression, lessThan);
                dateInterval = dateInterval == null ? lessThanExpression : Expression.AndAlso(lessThanExpression, dateInterval);
            }
            //Set Default values in order not to invoke it another time
            filter.FromTime = DateTime.MinValue;
            filter.ToTime = DateTime.MaxValue;
            
            return dateInterval;
        }
        #endregion
        #region Name
        private Expression NameIsCloseToFilter(ParameterExpression parameter, PropertyInfo property)
        {
            /*
             parameter => StaticHelpers.ComputeLevenshtein(parameter.Name, someName) <= MAX_LEVENSHTEIN_COST             
             */
            // parameter.Property
            MemberExpression propertyExpression = Expression.Property(parameter, property);
            // Levshtein(parameter.Name, PlaceName)
            Expression levenshteinExpression = Expression.Call(typeof(StaticHelpers),
                nameof(StaticHelpers.ComputeLevenshtein),
                null,
                propertyExpression,
                Expression.Constant(filter.PlaceName, typeof(string)));
            // Max difference expression
            Expression resultExpression = Expression.LessThanOrEqual(levenshteinExpression, Expression.Constant(MAX_LEVENSHTEIN_DIST, typeof(int)));
            // Set default values
            filter.PlaceName = null;
            return resultExpression;
        }
        private Expression NameContains(ParameterExpression parameter, PropertyInfo property){

            MemberExpression propertyExpression = Expression.Property(parameter, property);
            ConstantExpression constantExpression = Expression.Constant(filter.PlaceName, typeof(string));
            MethodInfo contains = typeof(string).GetMethod(nameof(String.Contains), new Type[] { typeof(string) });
            var toLowerPropertyExpression = Expression.Call(propertyExpression, typeof(string).GetMethod("ToLower", System.Type.EmptyTypes)); 
            var toLowerConstantEpxression = Expression.Call(constantExpression,  typeof(string).GetMethod("ToLower", System.Type.EmptyTypes));
            Expression resultExpression = Expression.Call(toLowerPropertyExpression, contains, toLowerConstantEpxression);
            return resultExpression;
        }
        #endregion


        #region Author
        private Expression MatchAuthor(ParameterExpression parameter, PropertyInfo property)
        {
            //Get User type property that is called Surname
            Type user = typeof(User);
            PropertyInfo userSurnameProperty = user.GetProperty(nameof(User.Surname));

            MemberExpression basePropertyExpression = Expression.Property(parameter, property);
            MemberExpression userPropertyExpression = Expression.Property(basePropertyExpression, userSurnameProperty);

            Expression resultExpression = null;

            foreach (var surname in filter.AuthorNameList)
            {
                BinaryExpression tmp = Expression.Equal(userPropertyExpression, Expression.Constant(surname, typeof(string)));
                resultExpression = resultExpression == null ? tmp : Expression.OrElse(tmp, resultExpression);
            }
            //set Default values
            filter.AuthorNameList = null;
            return resultExpression;
        }
        #endregion

        private bool CheckEmptyness(PropertyInfo property)
        {
            var value = property.GetValue(filter, null);
            if (property.PropertyType == typeof(DateTime))
            {
                var dateTimeValue = Convert.ToDateTime(value);
                if (dateTimeValue == DateTime.MinValue || dateTimeValue == DateTime.MaxValue)
                    return false;
            }
            else if (property.PropertyType == typeof(Double))
            {
                var doubleValue = Convert.ToDouble(value);
                if (doubleValue == 0 || doubleValue == Double.MaxValue)
                    return false;
            }
            else if (property.PropertyType == typeof(bool) || value == null)
                return false;
            return true;
        }

    }

    internal class StaticHelpers
    {
        public static int ComputeLevenshtein(string s, string t)
        {
            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];

            // Verify arguments.
            if (n == 0)
                return m;
            if (m == 0)
                return n;

            // Initialize arrays.
            for (int i = 0; i <= n; d[i, 0] = i++)
            {
            }
            for (int j = 0; j <= m; d[0, j] = j++)
            {
            }
            // Begin looping.
            for (int i = 1; i <= n; i++)
                for (int j = 1; j <= m; j++)
                {
                    // Compute cost.
                    int cost = (t[j - 1] == s[i - 1]) ? 0 : 1;
                    d[i, j] = Math.Min(
                    Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                    d[i - 1, j - 1] + cost);
                }
            // Return cost.
            return d[n, m];
        }
    }
}