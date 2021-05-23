using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //using Add() because at this point of time , I am using memory store not sql database
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();

                //this return make sure the action is complete, not truly return anything
                return Unit.Value;
            }
        }
    }
}