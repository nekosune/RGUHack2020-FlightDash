using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightDash
{
    public interface ICommand
    {
        string GetCommandName();

        string[] GetCommandAliases();
        string GetCommandHelp();
        bool TryParseCommand(string[] commandArguments, Game curState, out string output);

    }
}
