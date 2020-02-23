using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDashWeb.Commands
{
    public class Go : ICommand
    {
        public string GetCommandName()
        {
            return "Go";
        }

        public string[] GetCommandAliases()
        {
            return new[] { "go", "head", "walk", "drive", "get in" };
        }

        public string GetCommandHelp()
        {
            return "";
        }

        public bool TryParseCommand(string[] commandArguments, Game curState, out string output)
        {
            if (commandArguments.Length != 1)
            {
                output = "Sorry, Invalid destination or command format" + Environment.NewLine;
                return false;
            }

            foreach (var currentRoomExit in curState.CurrentRoom.Exits.Where(currentRoomExit => currentRoomExit.ExitNames.Contains(commandArguments[0].ToLower())))
            {
                if (currentRoomExit.ExitLocked != null)
                {
                    var isLocked = currentRoomExit.ExitLocked(curState);
                    if (isLocked)
                    {
                        output = currentRoomExit.LockText;
                        curState.TimeToFlight -= currentRoomExit.LockTime;
                        output += Environment.NewLine + curState.GetRoomHeader();
                        return true;
                    }
                }

                output = curState.ChangeRoom(currentRoomExit);

                while (curState.CurrentRoom.AutoExit != null)
                {
                    var exit = curState.CurrentRoom.AutoExit;
                    output += curState.ChangeRoom(exit);
                }

                return true;
            }

            output = "Invalid destination" + Environment.NewLine;
            return false;
        }
    }
}