namespace WACP.Models {
    //промежуточный класс для получение разрешения из клсса тегов
    public class Group {
        #region Varialbe
        public String _UID;
        private String _Name;

        public String UID {
            get => _UID;
            set => _UID = value;
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
