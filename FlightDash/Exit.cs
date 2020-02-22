﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    /// <summary>
    /// A basic exit from one room into another
    /// </summary>
    public class Exit
    {
        /// <summary>
        /// Name of the exit
        /// </summary>
        public string ExitName { get; set; }

        /// <summary>
        /// Destination room
        /// </summary>
        public Room Destination { get; set; }
        /// <summary>
        /// Description to show of the exit
        /// </summary>
        public string ExitDesc { get; set; }

        /// <summary>
        /// Time taken to use the exit
        /// </summary>
        public int ExitTime { get; set; }

    }
}
