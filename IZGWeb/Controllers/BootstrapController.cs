using System;
using System.Collections.Generic;
using System.Linq;
using IZGWeb.Bootstrap;
using IZGWeb.Data.Interface;
using IZGWeb.Data.Model.DnD;
using Microsoft.AspNetCore.Mvc;

namespace IZGWeb.Controllers
{
    [Route("api/[controller]")]
    public class BootstrapController : Controller
    {
        private IRepository _repository;
        private SpellBootstrapper _spellBootstrapper;
        
        public BootstrapController(IRepository repository)
        {
            _repository = repository;   
            _spellBootstrapper = new SpellBootstrapper();
        }
        
        [HttpGet("[action]")]
        public IActionResult Spell()
        {
            if (_repository.CollectionExists<Spell>().GetAwaiter().GetResult())
                return Ok();
            ICollection<Spell> spellList = _spellBootstrapper.GetSpells();
            try
            {
                _repository.Add(spellList).GetAwaiter().GetResult();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}