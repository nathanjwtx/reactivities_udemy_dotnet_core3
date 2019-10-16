using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using Domain;
using Application.Activities;
using System.Collections.Generic;
using System;
using System.Threading;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query()).ConfigureAwait(false);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{ Id = id }).ConfigureAwait(false);
        }

        [HttpPost]
        // FromBody isn't required as [ApiController] is in place. Added for clarification
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await _mediator.Send(command).ConfigureAwait(false);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command).ConfigureAwait(false);
        }
    }
}