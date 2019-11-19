using System;
using System.Diagnostics;

namespace IZGWeb.Utilities.Exceptions
{
    [Serializable]
    public class DuplicateUserException: Exception
    {
        public DuplicateUserException():base()
        {

        }

        public DuplicateUserException(string ErrorMessage)
            : base(String.Format(ErrorMessage))
        {

        }
    }
}