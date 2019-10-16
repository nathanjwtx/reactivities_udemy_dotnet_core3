using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                // handler logic goes here
                var activity = await _context.Activities.FindAsync(request.Id).ConfigureAwait(false);
                if (activity == null)
                {
                    throw new Exception("Counld not find activity to delete");
                }

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync().ConfigureAwait(false) > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception ("Problem saving changes");
            }
        }
    }
}