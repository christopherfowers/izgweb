using System.Collections.Generic;
using IZGWeb.Core.ServiceModel;

namespace IZGWeb.Core.Interface
{
    public interface ISpellService
    {
        ICollection<SpellServiceModel> GetAllSpells();
    }
}