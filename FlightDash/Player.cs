﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    public class Player
    {

        public decimal Money { get; set; }

        public void Initialize()
        {
            this.Money = 125;
        }

    }
}
