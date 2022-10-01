using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace WACP.Models {
    public class Users {
        #region Param User
        [MaxLength(36)]
        public String ID { get => _ID; set => _ID = value; }
        private String _ID;
        [MaxLength(15)]
        public String Login { get => _Login; set => _Login = value; }
        private String _Login;
        [MaxLength(100)]
        public String Password { get => _Password; set => _Password = value; }
        private String _Password;
        [MaxLength(15)]
        public String Firstname { get => _Firstname; set => _Firstname = value; }
        private String _Firstname;
        [MaxLength(15)]
        public String Lastname { get => _Lastname; set => _Lastname = value; }
        private String _Lastname;
        [MaxLength(15)]
        
        public String Email { 
            get => _Email; 
            set {
                String pattern = @"^(?("")(""[^""]+?""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                                 @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9]{2,17}))$";
                if (Regex.IsMatch(pattern, value)) {
                    _Email = value;
                    return; 
                }
                throw new Exception("Uncorrected Email");
            } 
        }
        private String _Email;
        [MaxLength(36)]
        public String GID { get => _GID; set => _GID = value; }
        private String _GID;
        #endregion
        #region Constructors
        //public User(string Id, string Name, string Surname, string Email) { 
        //    //инициализация пользователя его роли(
        //    //для получения разрешения на выполнения
        //    //того или иного действия)
        //}
        #endregion
    }
}
