namespace WACP.Models {
    public class Groups {
        public String ID { get => _ID; set => _Name = value; }
        private String _ID;
        public String Name { get => _Name; set => _Name = value; }
        private String _Name;
        public String GAID { get => _GAID; set => _GAID = value; }
        private String _GAID;

        public String GAN { get => _GAN; set => _GAN = value; }
        private String _GAN;
        public Groups(string ID, string Name, string GAID, string GAN) {
            this.ID = ID;
            this.Name = Name;
            this.GAID = GAID;
            this.GAN = GAN;
        }   
    }
}
