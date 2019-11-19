using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using IZGWeb.Data.Interface;
using IZGWeb.Data.Model.DnD;

namespace IZGWeb.Bootstrap
{
    public class SpellBootstrapper
    {
        private IRepository _repository;

        public SpellBootstrapper()
        {
            
        }

        public SpellBootstrapper(IRepository repository)
        {
            _repository = repository;
        }

        public List<Spell> GetSpells()
        {
            var filename = "spell.xml";
            var currentDirectory = Directory.GetCurrentDirectory();
            var spellFilepath = Path.Combine(currentDirectory, "Data", filename);
            
            XElement spells = XElement.Load(spellFilepath);
            IEnumerable<XElement> res = from spell in spells.Descendants("spell")
                select spell;

            var spellArray = res.ToArray();
            var spellList = new List<Spell>();
            for (int i = 0; i < spellArray.Length; i++)
            {
                spellList.Add(MapSpell(spellArray[i]));
            }
            return spellList;
        }

        public Spell MapSpell(XElement xElement)
        {
            var elements = xElement.Elements().ToArray();
            var spell = new Spell();

            foreach (var element in elements)
            {
                switch (element.Name.ToString())
                {
                    case "name":
                        spell.Name = GetElementContents(element);
                        break;
                    case "area":
                        spell.Area = GetElementContents(element);
                        break;
                    case "altname":
                        spell.AltName = GetElementContents(element);
                        break;
                    case "school":
                        spell.School = GetElementContents(element);
                        break;
                    case "subschool":
                        spell.SubSchool = GetElementContents(element);
                        break;
                    case "xp_cost":
                        spell.ExperienceCost = GetElementContents(element);
                        break;
                    case "descriptor":
                        spell.Descriptor = GetElementContents(element);
                        break;
                    case "level":
                        spell.Level = GetElementContents(element);
                        break;
                    case "components":
                        spell.Components = GetElementContents(element);
                        break;
                    case "casting_time":
                        spell.CastingTime = GetElementContents(element);
                        break;
                    case "range":
                        spell.Range = GetElementContents(element);
                        break;
                    case "target":
                        spell.Target = GetElementContents(element);
                        break;
                    case "duration":
                        spell.Duration = GetElementContents(element);
                        break;
                    case "saving_throw":
                        spell.SavingThrow = GetElementContents(element);
                        break;
                    case "spell_resistance":
                        spell.SpellResistance = GetElementContents(element);
                        break;
                    case "description":
                        spell.Description = GetElementContents(element);
                        break;
                    case "full_text":
                        spell.FullText = GetElementContents(element);
                        break;
                    case "reference":
                        spell.Reference = GetElementContents(element);
                        break;
                    case "to_develop":
                        spell.ToDevelop = GetElementContents(element);
                        break;
                }
            }

            return spell;
        }
        
        public string GetElementContents(XElement element)
        {
            switch (element.Name.ToString())
            {
                case "description":
                case "full_text":
                    element.Name = "div";
                    return element.ToString();
                default:
                    return element.Value.ToString();
            }
        }
    }
}