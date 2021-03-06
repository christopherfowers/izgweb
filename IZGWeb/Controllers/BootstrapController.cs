using System;
using System.Collections.Generic;
using System.Linq;
using IZGWeb.Bootstrap;
using IZGWeb.Data.Interface;
using IZGWeb.Data.Model.DnD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


//TODO extract all bootstraping from the web application and put them into an external non-published tool
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
        [Authorize("bootstrap:gamedata")]
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