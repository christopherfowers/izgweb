namespace IZGWeb.Data.Model.DnD
{
    public class Spell : BaseDocument
    {
        public string Name { get; set; }
        public string Area { get; set; }
        public string AltName { get; set; }
        public string School { get; set; }
        public string SubSchool { get; set; }
        public string ExperienceCost { get; set; }
        public string Descriptor { get; set; }
        public string Level { get; set; }
        public string Components { get; set; }
        public string CastingTime { get; set; }
        public string Range { get; set; }
        public string Target { get; set; }
        public string Duration { get; set; }
        public string SavingThrow { get; set; }
        public string SpellResistance{get; set;}
        public string Description { get; set; }
        public string FullText { get; set; }
        public string Reference { get; set; }
        public string ToDevelop { get; set; }
    }
}