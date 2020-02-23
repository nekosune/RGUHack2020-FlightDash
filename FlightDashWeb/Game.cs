using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using FlightDashWeb.Commands;

namespace FlightDashWeb
{
    public class Game
    {
        public Room CurrentRoom { get; set; }
        public Player Player { get; set; }
        public int TimeToFlight { get; set; }

        public List<ICommand> Commands { get; set; } = new List<ICommand>();
        public bool GameOver { get; set; }

        public bool CheckedIn { get; set; }

        public Belongings CurrentBelongings { get; set; }
        public void InitializeGame()
        {

            TimeToFlight = 60;
            Player = new Player();
            Player.Initialize();
            MakeRooms();
            Commands.Clear();
            Commands.Add(new Look());
            Commands.Add(new Go());
            Commands.Add(new CheckIn());
            Commands.Add(new SecurityCommand());
            CheckedIn = false;
            GameOver = false;
            CurrentBelongings = Belongings.All;
        }

        private void MakeRooms()
        {
            var hotelRoom = new Room
            {
                RoomName = "Hotel Room",
                ShortRoomDesc = "A pretty basic Hotel room. Nothing much out of the ordinary here",
                LongRoomDesc =
                    "The bed is unmade, left in a mess from your rude awakening, as the alarm blinks 12:00 merrily at you, ignorant of your distress.\r\n Your suitcase lays on the floor at the foot of the bed, neatly packed.\r\n"
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
                ExitDesc = "The hotel door has a sign on it saying \"Please remember your key will not work once your checkout time is past, please remember all your belongings\"\r\n",
                ExitText =
                    "Leaving the hotel you hear it lock behind you, dropping your keys off at reception you head into the carpark to pick up your rental.",
                ExitName = "Outside",
                ExitNames = new[] { "outside", "door", "exit", "out" },
                ExitTime = 5,
                ExitCost = 0
            };
            hotelRoom.Exits.Add(hotelExit);

            var car = new Room()
            {
                RoomName = "In your Car",
                ShortRoomDesc = "Your rental is a basic automatic transmission car",
                LongRoomDesc = @"Moderate size, at minimal cost, no fancy GPS or media center for you on this trip. 
 It is obvious the car has seen better days, and much worse drivers, with some stains dotted on the empty passenger seat cushions. 
Your dashboard is a bit dirty but looking closer you notice your fuel is only a third full"
            };

            var carExit = new Exit()
            {
                Destination = car,
                ExitDesc = "The rental car is a small, and slightly battered thing.",
                ExitText = "You dump your suitcase into the trunk, filling the limited space before plopping yourself down in the drivers seat",
                ExitName = "Car",
                ExitNames = new[] { "car", "in", "rental", "drivers side" },
                ExitTime = 1,
                ExitCost = 0
            };
            outsideHotel.Exits.Add(carExit);
            // todo Add walk
            var onFirstRoad = new Room()
            {
                RoomName = "On the Road",
                ShortRoomDesc = "The road out of the hotel is pretty basic, straight, and well signposted up to the highway. ",
                LongRoomDesc = @"Ahead of you is a split, the road to the right is free, but there seems to be signs of traffic. 
Whereas the road to the left costs you $50 just to enter,but takes you direct to the airport.",
            };

            var startCar = new Exit()
            {
                ExitName = "On the Way",
                ExitDesc = "The road to the airport looks pretty obvious from here",
                Destination = onFirstRoad,
                ExitCost = 0,
                ExitNames = new[] { "to the airport", "airport", "out", "plane", "flight" },
                ExitText = "Driving out of the hotel, you  soon spot the sign to the airport",
                ExitTime = 10

            };
            car.Exits.Add(startCar);

            var tollboothMotorway = new Room()
            {
                RoomName = "On the Tollbooth route",
                ShortRoomDesc = "The highway looks clear through the whole route. The occasional car passes, or is passed but overall  it stays clear right through to the airport",
                LongRoomDesc =
                    @""
            };

            var tollboothEntrance = new Exit()
            {
                ExitName = "Tollbooth Route",
                ExitDesc = "The tollbooth stands on the side of the road, it's long bar lowered blocking the route on",
                Destination = tollboothMotorway,
                ExitCost = (decimal)50.0,
                ExitNames = new[] { "tollbooth", "paid", "fast" },
                ExitTime = 0
            };
            onFirstRoad.Exits.Add(tollboothEntrance);

            var freeRoad = new Room()
            {
                RoomName = "On the free route",
                ShortRoomDesc = "The highway is in the midst of a huge traffic jam. Car horns of all sorts , and the occasional yell fills the air",
                LongRoomDesc = ""
            };
            var freeRoadEntrance = new Exit()
            {
                ExitName = "Free Route",
                ExitDesc =
                    "The free route's entrance lies unbarred, but there is a hint of red break-lights in the distance along it",
                Destination = freeRoad,
                ExitCost = 0,
                ExitNames = new[] { "free", "right" },
                ExitText = "You go right, intending to save your money for later, however a short time up the road you crawl to a halt as you hit a huge traffic jam,",
                ExitTime = 0
            };
            onFirstRoad.Exits.Add(freeRoadEntrance);


            var airportEntrance = new Room()
            {
                RoomName = "Airport Departures Entrance",
                ShortRoomDesc = "The departures entrance to the airport looks a bit dingy, but well traveled, the doors are wide open as people stream in",
                LongRoomDesc = "Here and there posters are on the wall, advertising flight deals for various companies, and a couple security guards stand near the entrance.",

            };

            var tollbothLeave = new Exit()
            {
                Destination = airportEntrance,
                ExitNames = new[] { "" },
                ExitName = "Tollbooth exit",
                ExitDesc = "",
                ExitTime = 10,
                ExitText = "You leave the toll route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures",
                ExitCost = 5
            };

            var freeRouteLeave = new Exit()
            {
                Destination = airportEntrance,
                ExitNames = new[] { "" },
                ExitName = "Free route exit",
                ExitDesc = "",
                ExitTime = 25,
                ExitText = "You leave the route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures",
                ExitCost = 0
            };

            tollboothMotorway.AutoExit = tollbothLeave;

            freeRoad.AutoExit = freeRouteLeave;
            var walk = new Exit()
            {
                Destination = airportEntrance,
                ExitNames = new[] { "walk" },
                ExitDesc = "There is a walking path to the airport that seems to go through a few fields",
                ExitText = "The walk to the airport is long and arduous, and seems to take a lot longer then it looked from the map at the hotel",
                ExitTime = 120,
                ExitCost = 0,
                ExitName = "Walking Path"
            };
            outsideHotel.Exits.Add(walk);


            var insideAirport = new Room()
            {
                RoomName = "Inside the airport",
                ShortRoomDesc = "Inside the airport things are quite busy, to the left are the check-in desks while to the right is the TSA queue.",
                LongRoomDesc = "By the TSA queue entrance is a sign saying \"Buy TSA PreCheck to use this shorter queue. Only $85\" Next to a barrier  leading to a much shorter queue",

            };
            var goInside = new Exit()
            {
                Destination = insideAirport,
                ExitName = "Inside Airport",
                ExitDesc = "The doors are wide open, the only obstacle being the stream of people going on their travel plans",
                ExitText = "You go through the doors, managing to avoid getting jostled about",
                ExitNames = new[] { "in", "inside", "indoors", "enter", "entrance", "airport" },
                ExitTime = 1,
                ExitCost = 0
            };

            airportEntrance.Exits.Add(goInside);
            var tsaEntrance = new Room()
            {
                RoomName = "TSA Entry",
                ShortRoomDesc = "You head towards the TSA Security Checkpoint, it seems to be split into two, a quick PreCheck area, and a slow area",
                LongRoomDesc = @"Near the quick zone is a sign, speak to a TSA Officer to buy a single-use TSA PreCheck access, only $85, 
Do you choose to buy TSA PreCheck, or do you use the general queue?
",

            };

            var goToTsa = new Exit()
            {
                ExitLocked = game => !game.CheckedIn,
                LockText = "The guard at the front of the queue looks at you flatly asking for your boarding pass, looking back for a second you face-palm before leaving to do so",
                LockTime = 2,
                Destination = tsaEntrance,
                ExitCost = 0,
                ExitName = "TSA Entrance",
                ExitNames = new[] { "TSA", "right", "security" },
                ExitDesc = "The Entrance to the TSA area is large, but guarded by a couple men checking boarding passes",
                ExitText = "You get in line, showing your boarding pass to the guard",
                ExitTime = 1

            };

            var checkInDesk = new Room()
            {
                RoomName = "The Check-in Desk",
                ShortRoomDesc = "The check-in desk finally in view, the woman sat in front asks you to 'check in' with a smile",
                LongRoomDesc = "Near the desk is a couple leaflets about carry on size and what is and isnt allowed",

            };

            var gotoCheckin = new Exit()
            {
                ExitName = "Checkin line",
                Destination = checkInDesk,
                ExitNames = new[] { "checkin", "check", "desk", "left" },
                ExitDesc = "The line to the check-in desk is quite long, but not unwieldy",
                ExitText = "Waiting in the line, it moves at a moderate pace, and soon enough you are at the check-in desk",
                ExitCost = 0,
                ExitTime = 5
            };

            var leaveCheckin = new Exit()
            {
                ExitName = "Leave check-in",
                ExitLocked = game => !game.CheckedIn,
                LockText = "After finally getting to the end of the check-in line you realize you forgot your suitcase near the start, with an annoyed sigh you go back to get it",
                LockTime = 5,
                ExitNames = new[] { "right", "out", "back" },
                Destination = insideAirport,
                ExitDesc = "The way out of check-in is a small alleyway between the desks",
                ExitCost = 0,
                ExitText = "You leave check-in following the lines, and soon find yourself back where you started in the airport",
                ExitTime = 1
            };
            checkInDesk.Exits.Add(leaveCheckin);
            insideAirport.Exits.Add(gotoCheckin);

            insideAirport.Exits.Add(goToTsa);

            var preCheck = new Room()
            {
                ShortRoomDesc = "The PreCheck zone is nice and quick, you dump your backpack on the xray belt before you go through the scanner without needing to take off your belt and shoes",
                LongRoomDesc = "As you pick up your backpack off the xray belt, you smell burritos from the Mexican food stand opposite",
                RoomName = "PreCheck"
            };

            var preCheckExit = new Exit()
            {
                ExitName = "PreCheck",
                Destination = preCheck,
                ExitDesc = "The PreCheck Security queue would be quicker, but it will cost you. It looks like theres only one other passenger heading for it",
                ExitText = "You pay the $85 fee from your budget, and the TSA Officer waves you to the PreCheck Security Zone",
                ExitCost = 85,
                ExitTime = 3,
                ExitNames = new[] { "precheck", "short", "pay" }
            };
            tsaEntrance.Exits.Add(preCheckExit);

            var generalSecurity = new Room()
            {
                RoomName = "General Security",
                ShortRoomDesc = "Eventually you get to the security desk and a TSA Officer gives you two trays and tells you to 'empty pockets' 'remove belt' 'remove shoes' and 'place backpack' in one tray, and 'remove electronics' into another tray.",
                LongRoomDesc = "You jostle your way forward to a table, so that you can get ready to be cleared through security"
            };

            var generalExit = new Exit()
            {
                ExitName = "General Security",
                Destination = generalSecurity,
                ExitDesc = "There's a long queue for the General Security, everyone is taking their shoes and belts off and taking the electronics out of their bags",
                ExitText = "You decide to save your cash, and join the horde of travellers making their way to the General Security zone",
                ExitTime = 15,
                ExitNames = new[] { "free", "general" }
            };
            tsaEntrance.Exits.Add(generalExit);

            var terminal = new Room()
            {
                RoomName = "Terminal",
                ShortRoomDesc = "The departure terminal beyond TSA is bustling with activity, people, and smells of all shapes and sizes",
                LongRoomDesc = "Here and there food shops are dotted around, ensuring you are never too far away from one. " + Environment.NewLine +
                               "The Bakery and the Mexican place look especially interesting. The sign on the ceiling shows Lounge to the right, and your gate number a tiny bit to the left"
            };
            var preCheckLeave = new Exit()
            {
                ExitName = "Finish security",
                Destination = terminal,
                ExitNames = new[] { "finish", "out" },
                ExitDesc = "The terminal, with the shops, food stalls, and waiting areas, are laid out before you",
                ExitText = "You thank the TSA Officer as you leave and head into the Airport Departures Terminal",
                ExitCost = 0,
                ExitTime = 1
            };
            preCheck.Exits.Add(preCheckLeave);

            var generalExitLeave = new Exit()
            {
                ExitName = "Finish security",
                ExitLocked = game => game.CurrentBelongings != Belongings.None,
                LockText = "The TSA Officer grunts at you and stares you down. \"Empty your pockets, take your shoes off, take your belt off, empty your electronics and place your backpack into the tray, BEFORE going through security!",
                LockTime = 6,
                Destination = terminal,
                ExitDesc = "The terminal, with the shops, food stalls, and waiting areas, are laid out before you",
                ExitText = "You thank the TSA Officer as you leave and head into the Airport Departures Terminal",
                ExitTime = 6,
                ExitCost = 0,
                ExitNames = new[] { "finish", "out" }

            };
            generalSecurity.Exits.Add(generalExitLeave);

            var mexican = new Room()
            {
                RoomName = "Mexican food",
                ShortRoomDesc = "You go towards the mexican food stall as a worker looks up and smiles at you. On the counter is a sign that reads \"Developers' Favourite: Breakfast Burrito $10\", behind the worker is a soda fountain",
                LongRoomDesc = "You notice a holder at the end of the counter, containing disposable cutlery"
            };

            var buyMexican = new Exit()
            {
                ExitName = "Buy Burrito",
                ExitNames = new[] { "buy", "burrito" },
                Destination = terminal,
                ExitDesc = "",
                ExitText = "Stomach grumbling, you order the Breakfast Burrito and a soa, the worker goes and makes one for you, returning after a few minutes, she passes you a foil-wrapped gift, and a cup of Strawberry flavored Soda. \"$13 please\"",
                ExitCost = 13,
                ExitTime = 5
            };
            mexican.Exits.Add(buyMexican);

            var goMexican = new Exit()
            {
                ExitName = "Visit Mexican Store",
                ExitNames = new[] { "mexican", "burrito" },
                Destination = mexican,
                ExitCost = 0,
                ExitDesc = "The Stall is done up in stereotypical mexican styles",
                ExitText = "You decide to go look over what kind of burritos the mexican place sells.",
                ExitTime = 1
            };
            terminal.Exits.Add(goMexican);

            var bakery = new Room()
            {
                RoomName = "Bakery",
                ShortRoomDesc = "The small bakery catches your eye, and you enter, the smell of warm bread enticing you.",
                LongRoomDesc = "The sole staff-member welcomes you. You can see her nametag reads 'Mishy - Head Baker'",

            };

            var buyBakery = new Exit()
            {
                ExitName = "Order food",
                ExitDesc = "",
                Destination = terminal,
                ExitText =
                    "Stomach grumbling, you order a bagel and Orange Juice, Mishy grabs you a bagel and pours you a cup of fresh orange juice, passing it over the counter with a smile. \"$6 please\"",
                ExitCost = 6,
                ExitTime = 4
            };
            bakery.Exits.Add(buyBakery);

            var goBakery = new Exit()
            {
                ExitName = "Visit Bakery",
                ExitDesc = "The Bakery looks warm, and inviting, with a soft scent of fresh bread wafting from it",
                ExitText = "You go into the bakery, enjoying the ambiance provided",
                ExitTime = 1,
                Destination = bakery,
                ExitCost = 0
            };
            terminal.Exits.Add(goBakery);

            var loungeExit = new Exit()
            {
                ExitName = "The Lounge",
                ExitLocked = game => true,
                LockText = "You wander off to the lounge, hoping you may be able to talk your way in on this economy ticket, sadly however as you try to talk the attendent into it, she is having none of it and refuses you entry.",
                LockTime = 5
            };
            terminal.Exits.Add(loungeExit);

            var gate = new Room()
            {
                RoomName = "Gate 42",
                ShortRoomDesc =
                    "Gate 43 looks like pretty much every other gate, but a quick check of your boarding pass shows this one is yours",
                LongRoomDesc =
                    "The line seems to be quite short, seems not many people want to go the same place as you today",

            };

            var EndScreen = new EndScreenRoom(this);
            {
                // fill this in
            };
            var gateExit = new Exit()
            {
                ExitName = "In the Airplane",
                ExitDesc = "",
                ExitText = "You leave the Gate and soon you are on the airplane. Your seat is as cramped as usual, but it feels like a throne today",
                Destination = EndScreen,

            };
            terminal.Exits.Add(gateExit);
            gate.AutoExit = gateExit;

            CurrentRoom = hotelRoom;

        }


        public string RoomTitle()
        {
            return CurrentRoom?.RoomName ?? "";
        }

        public string GetRoomHeader()
        {
            var builder = new StringBuilder();
            var roomName = CurrentRoom?.RoomName ?? "";
            builder.AppendLine(roomName);
            builder.AppendLine("-------------------------------------");
            builder.AppendLine($"Time to Flight: {TimeToFlight / 60:D2}:{TimeToFlight % 60:D2}");
            builder.AppendLine($"Money: {Player?.Money ?? 0:C}");
            builder.AppendLine(CurrentRoom?.ShortRoomDesc ?? "");
            return builder.ToString();

        }
        public bool TryParseInput(string input, out string outputText)
        {
            if (GameOver)
            {
                outputText = "Sorry, this game is over";
                return true;
            }
            var commandSplit = input.Split(' ');
            foreach (var command in Commands.Where(command => command.GetCommandAliases().Contains(commandSplit[0].ToLower())))
            {
                if (command.TryParseCommand(commandSplit.Skip(1).ToArray(), this, out outputText))
                {

                    if (TimeToFlight <= 0 || Player.Money <= 0)
                    {

                        GameOver = true;
                        outputText = "Sorry, it seems you " + (TimeToFlight <= 0 ? "ran out of time" : "ran out of money");
                    }

                    return true;
                }
                else
                {
                    return false;
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
