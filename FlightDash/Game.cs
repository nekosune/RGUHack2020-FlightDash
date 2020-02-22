using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms.VisualStyles;
using FlightDash.Commands;

namespace FlightDash
{
    public class Game
    {
        public Room CurrentRoom { get; set; }
        public Player Player { get; set; }
        public int TimeToFlight { get; set; }

        public List<ICommand> Commands { get; set; }=new List<ICommand>();
        public void InititalizeGame()
        {
            
            TimeToFlight = 60;
            Player=new Player();
            Player.Initialize();
            MakeRooms();
            Commands.Add(new Look());
        }

        private void MakeRooms()
        {
            var hotelRoom = new Room
            {
                RoomName = "Hotel Room",
                ShortRoomDesc = "A pretty basic Hotel room. Nothing much out of the ordinary here",
                LongRoomDesc =
                    "The bed is unmade, left in a mess from your rude awakening, as the alarm blinks 12:00 merilly at you, ignorant of your distres.\r\n Your suitcase lays on the floor at the foot of the bed, neatly packed.\r\n"
            };

            var outsideHotel = new Room()
            {
                RoomName = "Outside Hotel",
                ShortRoomDesc = "Outside the weather is calm, blue skies. Your car sits in the assigned parking spot awaiting you",
                LongRoomDesc = "In the distance you see on the free road some hints of a traffic jam."
            };
            var hotelExit = new Exit
            {
                Destination = outsideHotel,
                ExitDesc =
                    "Leaving the hotel you hear it lock behind you, dropping youre keys off at reception you head into the carpark to pick up your car.",
                ExitName = "Outside",
                ExitTime = 2
            };
            hotelRoom.Exits.Add(hotelExit);
            CurrentRoom = hotelRoom;
        }


        public string RoomTitle()
        {
            return CurrentRoom?.RoomName ?? "";
        }

        public string GetRoomHeader()
        {
            StringBuilder builder=new StringBuilder();
            string roomName = CurrentRoom?.RoomName ?? "";
            builder.AppendLine(roomName);
            builder.AppendLine("-------------------------------------");
            builder.AppendLine($"Time to Flight: {TimeToFlight / 60:D2}:{TimeToFlight % 60:D2}");
            builder.AppendLine($"Money: {Player?.Money ?? 0:C}");
            builder.AppendLine(CurrentRoom?.ShortRoomDesc ?? "");
            return builder.ToString();

        }
        public bool TryParseInput(string input, out string outputText)
        {
            var commandSplit = input.Split(' ');
            foreach (var command in Commands.Where(command => command.GetCommandAliases().Contains(commandSplit[0].ToLower())))
            {
                if (command.TryParseCommand(commandSplit.Skip(1).ToArray(), this, out outputText))
                {
                    return true;
                }
            }
            outputText = "";
            return false;
        }

        public string ParseInput(string input)
        {
            return "";
        }

    }
}
