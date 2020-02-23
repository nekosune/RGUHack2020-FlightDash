using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDashWeb
{
    public class Player
    {

        public decimal Money { get; set; }
        public double ScoreModifiers { get; set; }
        public void Initialize()
        {
            this.Money = 125;
        }

    }
}
