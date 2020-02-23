using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDashWeb
{
    class EndScreenRoom : Room
    {
        public Game CurState { get; set; }

        public EndScreenRoom(Game game)
        {
            this.CurState = game;
        }

        public new string ShortRoomDesc => $"Congratulations, you won! You had {CurState.TimeToFlight / 60:D2}:{CurState.TimeToFlight % 60:D2} remaining, and {CurState.Player?.Money ?? 0:C} remaining";
    }
}
