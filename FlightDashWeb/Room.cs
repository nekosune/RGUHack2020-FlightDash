using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDashWeb
{
    /// <summary>
    /// A basic room
    /// </summary>
    public class Room
    {
        /// <summary>
        /// The room name
        /// </summary>
        public string RoomName { get; set; }
        /// <summary>
        /// The room Description
        /// </summary>
        public string ShortRoomDesc { get; set; }

        public string LongRoomDesc { get; set; }
        
        public List<Exit> Exits { get; set; } = new List<Exit>();
        public Exit AutoExit { get; set; }

    }
}
