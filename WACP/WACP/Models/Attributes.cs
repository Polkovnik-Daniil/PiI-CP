namespace WACP.Models {
    //Получает теги(аттрибуты) которые наделяют правами ту или иную группу
    public class Attributes {
        private readonly string[] attributes;
        public Attributes(string[] attributes) {
            this.attributes = attributes;
        }
    }
}
