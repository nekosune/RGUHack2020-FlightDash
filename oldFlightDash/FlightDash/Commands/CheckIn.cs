using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash.Commands
{
    public class CheckIn:ICommand
    {
        public string GetCommandName()
        {
            return "check-in";
        }

        public string[] GetCommandAliases()
        {
            return new[] {"check"};
        }

        public string GetCommandHelp()
        {
            return "";
        }

        public bool TryParseCommand(string[] commandArguments, Game curState, out string output)
        {
            if (commandArguments.Length != 1)
            {
                output = "I have nothing to check."+Environment.NewLine;
                return false;
            }

            if (commandArguments[0] != "in")
            {
                output = "I have nothing to check." + Environment.NewLine;
                return false;
            }

            if (curState.RoomTitle().ToLower() != "the check-in desk")
            {
                output = "Sorry, you can not check in here";
                return false;
            }

            curState.CheckedIn = true;

            output = "You Check in at the desk, putting your carefully preweighed luggage on the scale, and collect your boarding pass.";

            var exit = curState.CurrentRoom.Exits[0];
            output += Environment.NewLine + exit.ExitText + Environment.NewLine;
            curState.CurrentRoom = exit.Destination;
            curState.TimeToFlight -= exit.ExitTime;
            curState.Player.Money -= exit.ExitCost;
            output += curState.GetRoomHeader();
            return true;
        }
    }
}
