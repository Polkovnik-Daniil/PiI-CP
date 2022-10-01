namespace WACP.Models {
    //Получает теги(аттрибуты) которые наделяют правами ту или иную группу
    public class Attributes {
        public Dictionary<String, bool> attributes { get => _attributes; set => _attributes = value; }
        private Dictionary<String, bool> _attributes = new Dictionary<string, bool>();
        public Attributes(Dictionary<String, bool> attributes) {
            this.attributes = attributes;
        }
    }
}
