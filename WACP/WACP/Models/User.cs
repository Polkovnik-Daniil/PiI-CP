namespace WACP.Models {
    public class User {
        #region Param User
        public Guid Id { get => _ID; set => _ID = value; }
        private Guid _ID;
        public string Name { get => _Name; set => _Email = value; }
        private string _Name;
        public string Surname { get => _Surname; set => _Surname = value; }
        private string _Surname;
        public string Email { get => _Email; set => _Email = value; }
        private string _Email;
        public Group group { get => _Group; set => _Group = value; }
        private Group _Group;
        #endregion
        #region Constructors
        public User(Guid Id, string Name, string Surname, string Email) { 
            //инициализация пользователя его роли(
            //для получения разрешения на выполнения
            //того или иного действия)
        }
        #endregion
    }
}
