namespace WACP.Models {
    //Получает теги(аттрибуты) которые наделяют правами ту или иную группу
    public class Attributes {
        private readonly String[] attributes;
        public Attributes(String[] attributes) {
            this.attributes = attributes;
        }
    }
}
