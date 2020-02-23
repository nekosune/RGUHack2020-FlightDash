using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    class EndScreenRoom : Room
    {
        public Game CurState { get; set; }

        public EndScreenRoom(Game game)
        {
            this.CurState = game;
        }

        
    }
}
