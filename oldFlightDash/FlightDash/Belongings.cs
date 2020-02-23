using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    [Flags]
    public enum Belongings
    {
        None=0,
        Backpack = 1,
        Shoes=2,
        Belt=4,
        Pockets=8,
        Electronics = 16,
        All=32
    }
}
