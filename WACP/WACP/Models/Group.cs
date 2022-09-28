namespace WACP.Models {
    //промежуточный класс для получение разрешения из клсса тегов
    public class Group {
        #region Varialbe
        public Guid _ID;
        private string _Name;
        public Guid Id {
            get => _ID;
            set => _ID = value;
        }
        public string Name {
            get => _Name;
            set => _Name = value;
        }
        #endregion
        public Group(Guid idUser) {

        }

        //Выполнимо?
        public bool IsDoable() {
            return false;
        }
        //при выполнении того или иного
        //действия пересылается id действия
        //и его пользователя для получения разрешения
        //public bool
    }
}
