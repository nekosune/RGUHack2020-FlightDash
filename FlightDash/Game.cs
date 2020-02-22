using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    public class Game
    {
        public Room CurrentRoom { get; set; }
        public Player Player { get; set; }


        public string RoomTitle()
        {
            return CurrentRoom?.RoomName;
        }
    }
}
