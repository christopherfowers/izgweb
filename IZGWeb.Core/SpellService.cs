using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IZGWeb.Core.Interface;
using IZGWeb.Core.ServiceModel;
using IZGWeb.Data.Interface;
using IZGWeb.Data.Model.DnD;

namespace IZGWeb.Core
{
    public class SpellService : ISpellService
    {
        
        private readonly IRepository _repository;
        
        public SpellService(IRepository repository)
        {
            _repository = repository;
        }

        public ICollection<SpellServiceModel> GetAllSpells()
        {
            var spells = _repository.All<Spell>();
            var spellSMs = new List<SpellServiceModel>();
            foreach (var spell in spells)
            {
                spellSMs.Add(MapSpell(spell));
            }

            return spellSMs;
        }

        public SpellServiceModel MapSpell(Spell spell)
        {
            SpellServiceModel spellSM = new SpellServiceModel
            {
                Id = spell.Id.ToString(),
                Name = spell.Name,
                AltName = spell.AltName,
                Area = spell.Area,
                Components = spell.Components,
                Description = spell.Description,
                Descriptor = spell.Descriptor,
                Duration = spell.Duration,
                Level = spell.Level,
                Range = spell.Range,
                Reference = spell.Reference,
                School = spell.School,
                SubSchool = spell.SubSchool,
                Target = spell.Target,
                CastingTime = spell.CastingTime,
                ExperienceCost = spell.ExperienceCost,
                FullText = spell.FullText,
                SavingThrow = spell.SavingThrow,
                SpellResistance = spell.SpellResistance,
                ToDevelop = spell.ToDevelop
            };
            return spellSM;
        }
    }
}