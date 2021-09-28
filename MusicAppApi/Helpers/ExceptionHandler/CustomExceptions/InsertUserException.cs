using System;

namespace MusicAppApi.Helpers.ExceptionHandler.CustomExceptions
{
    public class InsertUserException: Exception
    {
        public InsertUserException():base("You are already registered")
        {
        }
    }
}