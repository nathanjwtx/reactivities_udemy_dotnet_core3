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
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new List.Query(), ct).ConfigureAwait(false);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{ Id = id }).ConfigureAwait(false);
        }
    }
}