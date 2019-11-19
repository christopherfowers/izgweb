using System;
using System.Collections.Generic;
using System.Linq;
using IZGWeb.Core.Interface;
using IZGWeb.Data.Interface;
using IZGWeb.Data.Model.DnD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IZGWeb.Controllers.DnD
{
    [Route("api/DnD/[controller]")]
    public class SpellController : Controller
    {
        private ISpellService _spellService;
        
        public SpellController(ISpellService spellService)
        {
            _spellService = spellService;
        }
        
        
        [Authorize("read:gamedata")]
        [HttpGet("[action]")]
        public IActionResult AllSpells()
        {
            var spells = _spellService.GetAllSpells();
            return Ok(spells);
        }
    }
}