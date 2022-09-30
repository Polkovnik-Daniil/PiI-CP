namespace WACP.Models {
    //промежуточный класс для получение разрешения из клсса тегов
    public class Group {
        #region Varialbe
        public String _ID;
        private String _Name;

        public String Id {
            get => _ID;
            set => _ID = value;
        }
        public String Name {
            get => _Name;
            set => _Name = value;
        }
        #endregion
        public Group(String ID, String Name) {

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
