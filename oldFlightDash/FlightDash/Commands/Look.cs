using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash.Commands
{
    public class Look:ICommand
    {
        public string GetCommandName() => "Look";

        public string[] GetCommandAliases() => new[] {"look", "l", "peer", "stare", "examine"};

        public string GetCommandHelp()
        {
            return "Look at an item";
        }

        public bool TryParseCommand(string[] commandArguments, Game curState, out string output)
        {
            if (commandArguments.Length == 0)
            {
                output =
                    $"{curState.CurrentRoom.ShortRoomDesc}{Environment.NewLine}{curState.CurrentRoom.LongRoomDesc}";
                return true;
            }
            else
            {
                if (commandArguments[0].ToLower() == "at")
                    commandArguments = commandArguments.Skip(1).ToArray();
                var toLook = commandArguments[0];
                foreach (var currentRoomExit in curState.CurrentRoom.Exits)
                {
                    if (currentRoomExit.ExitNames.Contains(toLook.ToLower()))
                    {
                        output = $"{currentRoomExit.ExitDesc}{Environment.NewLine}";
                        return true;
                    }
                }
            }


            output = "";
            return true;
        }
    }
}
