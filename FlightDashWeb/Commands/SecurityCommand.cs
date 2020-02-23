using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDashWeb.Commands
{
    public class SecurityCommand:ICommand
    {
        public string GetCommandName()
        {
            return "Security";
        }

        public string[] GetCommandAliases()
        {
            return new[] { "remove","place","empty"};
        }

        public string GetCommandHelp()
        {
            return "";
        }

        public bool TryParseCommand(string[] commandArguments, Game curState, out string output)
        {
            if (commandArguments.Length != 1)
            {
                output = "";
                return false;
            }

            output = "";
            foreach (var belonging in Enum.GetValues(typeof(Belongings)).Cast<Belongings>())  
            {
                if (belonging.ToString().ToLower() == commandArguments[0])
                {
                    curState.CurrentBelongings ^= belonging;
                    switch (belonging)
                    {
                        case Belongings.Shoes:
                            output += "You remove your shoes and put them on the belt" + Environment.NewLine;
                            return true;
                        case Belongings.Belt:
                            output += "You remove your belt and put it on the belt" + Environment.NewLine;
                            return true;
                        case Belongings.Backpack:
                            output += "You take off your backpack and put it on the belt" + Environment.NewLine;
                            return true;
                        case Belongings.Pockets:
                            output += "You empty your pockets and put the contents on the belt" + Environment.NewLine;
                            return true;
                        case Belongings.Electronics:
                            output += "You empty your electronics out onto the belt" + Environment.NewLine;
                            return true;
                        default:
                            output = "I do not have that"+Environment.NewLine;
                            return false;
                    }
                }
            }
            
            output = "";
            return false;

        }
    }
}
