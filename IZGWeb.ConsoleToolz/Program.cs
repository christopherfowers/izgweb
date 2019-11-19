using System;
using System.Linq;
using System.Xml.Linq;
using IZGWeb.Bootstrap;
using IZGWeb.Data.Model.DnD;

namespace IZGWeb.ConsoleToolz
{
    class Program
    {
        static void Main(string[] args)
        {
            var spellBootStrapper = new SpellBootstrapper();
            Console.WriteLine("Getting Spells");
            var spells = spellBootStrapper.GetSpells();

            Console.WriteLine("Got " + spells.Count + " Spells");
            foreach (var spell in spells)
            {
//                Console.WriteLine(spell.Name);
            }

            Console.WriteLine(spells.First().Description);

            Console.ReadKey();
        }
    }
}