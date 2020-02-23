/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("FlightDashWeb", function ($asm, globals) {
    "use strict";

    Bridge.define("\u01c0\u01c0Flightdashweb\u01c0\u01c0Component\u01c0\u01c0App\u01c0\u01c0Xaml\u01c0\u01c0Factory", {
        statics: {
            methods: {
                Instantiate: function () {
                    var type = FlightDashWeb.App;
                    return Bridge.global.CSHTML5.Internal.TypeInstantiationHelper.Instantiate(type);
                }
            }
        }
    });

    Bridge.define("\u01c0\u01c0Flightdashweb\u01c0\u01c0Component\u01c0\u01c0Mainpage\u01c0\u01c0Xaml\u01c0\u01c0Factory", {
        statics: {
            methods: {
                Instantiate: function () {
                    var type = FlightDashWeb.MainPage;
                    return Bridge.global.CSHTML5.Internal.TypeInstantiationHelper.Instantiate(type);
                }
            }
        }
    });

    Bridge.define("FlightDashWeb.App", {
        inherits: [Windows.UI.Xaml.Application],
        main: function Main () {
            new FlightDashWeb.App();
        },
        fields: {
            _contentLoaded: false
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Windows.UI.Xaml.Application.ctor.call(this);
                this.InitializeComponent();


                var mainPage = new FlightDashWeb.MainPage();
                Windows.UI.Xaml.Window.Current.Content = mainPage;
            }
        },
        methods: {
            InitializeComponent: function () {
                if (this._contentLoaded) {
                    return;
                }
                this._contentLoaded = true;


                if (Bridge.is(this, Windows.UI.Xaml.UIElement)) {
                    Bridge.cast(this, Windows.UI.Xaml.UIElement).XamlSourcePath = "FlightDashWeb\\App.xaml";
                }


                Bridge.global.CSHTML5.Internal.StartupAssemblyInfo.OutputRootPath = "Output\\";
                Bridge.global.CSHTML5.Internal.StartupAssemblyInfo.OutputAppFilesPath = "app-cshtml5\\app\\";
                Bridge.global.CSHTML5.Internal.StartupAssemblyInfo.OutputLibrariesPath = "app-cshtml5\\libs\\";
                Bridge.global.CSHTML5.Internal.StartupAssemblyInfo.OutputResourcesPath = "app-cshtml5\\res\\";


                var ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a;

                this.Resources = ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a;







            }
        }
    });

    Bridge.define("FlightDashWeb.Belongings", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Backpack: 1,
                Shoes: 2,
                Belt: 4,
                Pockets: 8,
                Electronics: 16,
                All: 32
            }
        },
        $flags: true
    });

    Bridge.define("FlightDashWeb.ICommand", {
        $kind: "interface"
    });

    /** @namespace FlightDashWeb */

    /**
     * A basic room
     *
     * @public
     * @class FlightDashWeb.Room
     */
    Bridge.define("FlightDashWeb.Room", {
        fields: {
            /**
             * The room name
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Room
             * @function RoomName
             * @type string
             */
            RoomName: null,
            /**
             * The room Description
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Room
             * @function ShortRoomDesc
             * @type string
             */
            ShortRoomDesc: null,
            LongRoomDesc: null,
            Exits: null,
            AutoExit: null
        },
        ctors: {
            init: function () {
                this.Exits = new (System.Collections.Generic.List$1(FlightDashWeb.Exit)).ctor();
            }
        }
    });

    /**
     * A basic exit from one room into another
     *
     * @public
     * @class FlightDashWeb.Exit
     */
    Bridge.define("FlightDashWeb.Exit", {
        fields: {
            /**
             * Name of the exit
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Exit
             * @function ExitName
             * @type string
             */
            ExitName: null,
            ExitNames: null,
            /**
             * Destination room
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Exit
             * @function Destination
             * @type FlightDashWeb.Room
             */
            Destination: null,
            /**
             * Description to show of the exit
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Exit
             * @function ExitDesc
             * @type string
             */
            ExitDesc: null,
            ExitText: null,
            ExitCost: System.Decimal(0.0),
            /**
             * Time taken to use the exit
             *
             * @instance
             * @public
             * @memberof FlightDashWeb.Exit
             * @function ExitTime
             * @type number
             */
            ExitTime: 0,
            ExitLocked: null,
            LockText: null,
            LockTime: 0
        }
    });

    Bridge.define("FlightDashWeb.Game", {
        fields: {
            CurrentRoom: null,
            Player: null,
            TimeToFlight: 0,
            Commands: null,
            GameOver: false,
            CheckedIn: false,
            CurrentBelongings: 0
        },
        ctors: {
            init: function () {
                this.Commands = new (System.Collections.Generic.List$1(FlightDashWeb.ICommand)).ctor();
            }
        },
        methods: {
            InitializeGame: function () {

                this.TimeToFlight = 60;
                this.Player = new FlightDashWeb.Player();
                this.Player.Initialize();
                this.MakeRooms();
                this.Commands.clear();
                this.Commands.add(new FlightDashWeb.Commands.Look());
                this.Commands.add(new FlightDashWeb.Commands.Go());
                this.Commands.add(new FlightDashWeb.Commands.CheckIn());
                this.Commands.add(new FlightDashWeb.Commands.SecurityCommand());
                this.CheckedIn = false;
                this.GameOver = false;
                this.CurrentBelongings = FlightDashWeb.Belongings.All;
            },
            MakeRooms: function () {
                var $t;
                var hotelRoom = ($t = new FlightDashWeb.Room(), $t.RoomName = "Hotel Room", $t.ShortRoomDesc = "A pretty basic Hotel room. Nothing much out of the ordinary here", $t.LongRoomDesc = "The bed is unmade, left in a mess from your rude awakening, as the alarm blinks 12:00 merrily at you, ignorant of your distress.\r\n Your suitcase lays on the floor at the foot of the bed, neatly packed.\r\n", $t);

                var outsideHotel = ($t = new FlightDashWeb.Room(), $t.RoomName = "Outside Hotel", $t.ShortRoomDesc = "Outside the weather is calm, blue skies. Your car sits in the assigned parking spot awaiting you", $t.LongRoomDesc = "In the distance you see on the free road some hints of a traffic jam.", $t);
                var hotelExit = ($t = new FlightDashWeb.Exit(), $t.Destination = outsideHotel, $t.ExitDesc = "The hotel door has a sign on it saying \"Please remember your key will not work once your checkout time is past, please remember all your belongings\"\r\n", $t.ExitText = "Leaving the hotel you hear it lock behind you, dropping your keys off at reception you head into the carpark to pick up your rental.", $t.ExitName = "Outside", $t.ExitNames = System.Array.init(["outside", "door", "exit", "out"], System.String), $t.ExitTime = 5, $t.ExitCost = System.Decimal(0), $t);
                hotelRoom.Exits.add(hotelExit);

                var car = ($t = new FlightDashWeb.Room(), $t.RoomName = "In your Car", $t.ShortRoomDesc = "Your rental is a basic automatic transmission car", $t.LongRoomDesc = "Moderate size, at minimal cost, no fancy GPS or media center for you on this trip. \r\n It is obvious the car has seen better days, and much worse drivers, with some stains dotted on the empty passenger seat cushions. \r\nYour dashboard is a bit dirty but looking closer you notice your fuel is only a third full", $t);

                var carExit = ($t = new FlightDashWeb.Exit(), $t.Destination = car, $t.ExitDesc = "The rental car is a small, and slightly battered thing.", $t.ExitText = "You dump your suitcase into the trunk, filling the limited space before plopping yourself down in the drivers seat", $t.ExitName = "Car", $t.ExitNames = System.Array.init(["car", "in", "rental", "drivers side"], System.String), $t.ExitTime = 1, $t.ExitCost = System.Decimal(0), $t);
                outsideHotel.Exits.add(carExit);
                var onFirstRoad = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the Road", $t.ShortRoomDesc = "The road out of the hotel is pretty basic, straight, and well signposted up to the highway. ", $t.LongRoomDesc = "Ahead of you is a split, the road to the right is free, but there seems to be signs of traffic. \r\nWhereas the road to the left costs you $50 just to enter,but takes you direct to the airport.", $t);

                var startCar = ($t = new FlightDashWeb.Exit(), $t.ExitName = "On the Way", $t.ExitDesc = "The road to the airport looks pretty obvious from here", $t.Destination = onFirstRoad, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["to the airport", "airport", "out", "plane", "flight"], System.String), $t.ExitText = "Driving out of the hotel, you  soon spot the sign to the airport", $t.ExitTime = 10, $t);
                car.Exits.add(startCar);

                var tollboothMotorway = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the Tollbooth route", $t.ShortRoomDesc = "The highway looks clear through the whole route. The occasional car passes, or is passed but overall  it stays clear right through to the airport", $t.LongRoomDesc = "", $t);

                var tollboothEntrance = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Tollbooth Route", $t.ExitDesc = "The tollbooth stands on the side of the road, it's long bar lowered blocking the route on", $t.Destination = tollboothMotorway, $t.ExitCost = System.Decimal(50.0), $t.ExitNames = System.Array.init(["tollbooth", "paid", "fast"], System.String), $t.ExitTime = 0, $t);
                onFirstRoad.Exits.add(tollboothEntrance);

                var freeRoad = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the free route", $t.ShortRoomDesc = "The highway is in the midst of a huge traffic jam. Car horns of all sorts , and the occasional yell fills the air", $t.LongRoomDesc = "", $t);
                var freeRoadEntrance = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Free Route", $t.ExitDesc = "The free route's entrance lies unbarred, but there is a hint of red break-lights in the distance along it", $t.Destination = freeRoad, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["free", "right"], System.String), $t.ExitText = "You go right, intending to save your money for later, however a short time up the road you crawl to a halt as you hit a huge traffic jam,", $t.ExitTime = 0, $t);
                onFirstRoad.Exits.add(freeRoadEntrance);


                var airportEntrance = ($t = new FlightDashWeb.Room(), $t.RoomName = "Airport Departures Entrance", $t.ShortRoomDesc = "The departures entrance to the airport looks a bit dingy, but well traveled, the doors are wide open as people stream in", $t.LongRoomDesc = "Here and there posters are on the wall, advertising flight deals for various companies, and a couple security guards stand near the entrance.", $t);

                var tollbothLeave = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init([""], System.String), $t.ExitName = "Tollbooth exit", $t.ExitDesc = "", $t.ExitTime = 10, $t.ExitText = "You leave the toll route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures", $t.ExitCost = System.Decimal(5), $t);

                var freeRouteLeave = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init([""], System.String), $t.ExitName = "Free route exit", $t.ExitDesc = "", $t.ExitTime = 25, $t.ExitText = "You leave the route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures", $t.ExitCost = System.Decimal(0), $t);

                tollboothMotorway.AutoExit = tollbothLeave;

                freeRoad.AutoExit = freeRouteLeave;
                var walk = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init(["walk"], System.String), $t.ExitDesc = "There is a walking path to the airport that seems to go through a few fields", $t.ExitText = "The walk to the airport is long and arduous, and seems to take a lot longer then it looked from the map at the hotel", $t.ExitTime = 120, $t.ExitCost = System.Decimal(0), $t.ExitName = "Walking Path", $t);
                outsideHotel.Exits.add(walk);


                var insideAirport = ($t = new FlightDashWeb.Room(), $t.RoomName = "Inside the airport", $t.ShortRoomDesc = "Inside the airport things are quite busy, to the left are the check-in desks while to the right is the TSA queue.", $t.LongRoomDesc = "By the TSA queue entrance is a sign saying \"Buy TSA PreCheck to use this shorter queue. Only $85\" Next to a barrier  leading to a much shorter queue", $t);
                var goInside = ($t = new FlightDashWeb.Exit(), $t.Destination = insideAirport, $t.ExitName = "Inside Airport", $t.ExitDesc = "The doors are wide open, the only obstacle being the stream of people going on their travel plans", $t.ExitText = "You go through the doors, managing to avoid getting jostled about", $t.ExitNames = System.Array.init(["in", "inside", "indoors", "enter", "entrance", "airport"], System.String), $t.ExitTime = 1, $t.ExitCost = System.Decimal(0), $t);

                airportEntrance.Exits.add(goInside);
                var tsaEntrance = ($t = new FlightDashWeb.Room(), $t.RoomName = "TSA Entry", $t.ShortRoomDesc = "You head towards the TSA Security Checkpoint, it seems to be split into two, a quick PreCheck area, and a slow area", $t.LongRoomDesc = "Near the quick zone is a sign, speak to a TSA Officer to buy a single-use TSA PreCheck access, only $85, \r\nDo you choose to buy TSA PreCheck, or do you use the general queue?\r\n", $t);

                var goToTsa = ($t = new FlightDashWeb.Exit(), $t.ExitLocked = function (game) {
                    return !game.CheckedIn;
                }, $t.LockText = "The guard at the front of the queue looks at you flatly asking for your boarding pass, looking back for a second you face-palm before leaving to do so", $t.LockTime = 2, $t.Destination = tsaEntrance, $t.ExitCost = System.Decimal(0), $t.ExitName = "TSA Entrance", $t.ExitNames = System.Array.init(["TSA", "right", "security"], System.String), $t.ExitDesc = "The Entrance to the TSA area is large, but guarded by a couple men checking boarding passes", $t.ExitText = "You get in line, showing your boarding pass to the guard", $t.ExitTime = 1, $t);

                var checkInDesk = ($t = new FlightDashWeb.Room(), $t.RoomName = "The Check-in Desk", $t.ShortRoomDesc = "The check-in desk finally in view, the woman sat in front asks you to 'check in' with a smile", $t.LongRoomDesc = "Near the desk is a couple leaflets about carry on size and what is and isnt allowed", $t);

                var gotoCheckin = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Checkin line", $t.Destination = checkInDesk, $t.ExitNames = System.Array.init(["checkin", "check", "desk", "left"], System.String), $t.ExitDesc = "The line to the check-in desk is quite long, but not unwieldy", $t.ExitText = "Waiting in the line, it moves at a moderate pace, and soon enough you are at the check-in desk", $t.ExitCost = System.Decimal(0), $t.ExitTime = 5, $t);

                var leaveCheckin = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Leave check-in", $t.ExitLocked = function (game) {
                    return !game.CheckedIn;
                }, $t.LockText = "After finally getting to the end of the check-in line you realize you forgot your suitcase near the start, with an annoyed sigh you go back to get it", $t.LockTime = 5, $t.ExitNames = System.Array.init(["right", "out", "back"], System.String), $t.Destination = insideAirport, $t.ExitDesc = "The way out of check-in is a small alleyway between the desks", $t.ExitCost = System.Decimal(0), $t.ExitText = "You leave check-in following the lines, and soon find yourself back where you started in the airport", $t.ExitTime = 1, $t);
                checkInDesk.Exits.add(leaveCheckin);
                insideAirport.Exits.add(gotoCheckin);

                insideAirport.Exits.add(goToTsa);

                var preCheck = ($t = new FlightDashWeb.Room(), $t.ShortRoomDesc = "The PreCheck zone is nice and quick, you dump your backpack on the xray belt before you go through the scanner without needing to take off your belt and shoes", $t.LongRoomDesc = "As you pick up your backpack off the xray belt, you smell burritos from the Mexican food stand opposite", $t.RoomName = "PreCheck", $t);

                var preCheckExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "PreCheck", $t.Destination = preCheck, $t.ExitDesc = "The PreCheck Security queue would be quicker, but it will cost you. It looks like theres only one other passenger heading for it", $t.ExitText = "You pay the $85 fee from your budget, and the TSA Officer waves you to the PreCheck Security Zone", $t.ExitCost = System.Decimal(85), $t.ExitTime = 3, $t.ExitNames = System.Array.init(["precheck", "short", "pay"], System.String), $t);
                tsaEntrance.Exits.add(preCheckExit);

                var generalSecurity = ($t = new FlightDashWeb.Room(), $t.RoomName = "General Security", $t.ShortRoomDesc = "Eventually you get to the security desk and a TSA Officer gives you two trays and tells you to 'empty pockets' 'remove belt' 'remove shoes' and 'place backpack' in one tray, and 'remove electronics' into another tray.", $t.LongRoomDesc = "You jostle your way forward to a table, so that you can get ready to be cleared through security", $t);

                var generalExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "General Security", $t.Destination = generalSecurity, $t.ExitDesc = "There's a long queue for the General Security, everyone is taking their shoes and belts off and taking the electronics out of their bags", $t.ExitText = "You decide to save your cash, and join the horde of travellers making their way to the General Security zone", $t.ExitTime = 15, $t.ExitNames = System.Array.init(["free", "general"], System.String), $t);
                tsaEntrance.Exits.add(generalExit);

                var terminal = ($t = new FlightDashWeb.Room(), $t.RoomName = "Terminal", $t.ShortRoomDesc = "The departure terminal beyond TSA is bustling with activity, people, and smells of all shapes and sizes", $t.LongRoomDesc = "Here and there food shops are dotted around, ensuring you are never too far away from one. " + ("\n" || "") + "The Bakery and the Mexican place look especially interesting. The sign on the ceiling shows Lounge to the right, and your gate number a tiny bit to the left", $t);
                var preCheckLeave = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Finish security", $t.Destination = terminal, $t.ExitNames = System.Array.init(["finish", "out"], System.String), $t.ExitDesc = "The terminal, with the shops, food stalls, and waiting areas, are laid out before you", $t.ExitText = "You thank the TSA Officer as you leave and head into the Airport Departures Terminal", $t.ExitCost = System.Decimal(0), $t.ExitTime = 1, $t);
                preCheck.Exits.add(preCheckLeave);

                var generalExitLeave = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Finish security", $t.ExitLocked = function (game) {
                    return game.CurrentBelongings !== FlightDashWeb.Belongings.None;
                }, $t.LockText = "The TSA Officer grunts at you and stares you down. \"Empty your pockets, take your shoes off, take your belt off, empty your electronics and place your backpack into the tray, BEFORE going through security!", $t.LockTime = 6, $t.Destination = terminal, $t.ExitDesc = "The terminal, with the shops, food stalls, and waiting areas, are laid out before you", $t.ExitText = "You thank the TSA Officer as you leave and head into the Airport Departures Terminal", $t.ExitTime = 6, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["finish", "out"], System.String), $t);
                generalSecurity.Exits.add(generalExitLeave);

                var mexican = ($t = new FlightDashWeb.Room(), $t.RoomName = "Mexican food", $t.ShortRoomDesc = "You go towards the mexican food stall as a worker looks up and smiles at you. On the counter is a sign that reads \"Developers' Favourite: Breakfast Burrito $10\", behind the worker is a soda fountain", $t.LongRoomDesc = "You notice a holder at the end of the counter, containing disposable cutlery", $t);

                var buyMexican = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Buy Burrito", $t.ExitNames = System.Array.init(["buy", "burrito"], System.String), $t.Destination = terminal, $t.ExitDesc = "", $t.ExitText = "Stomach grumbling, you order the Breakfast Burrito and a soa, the worker goes and makes one for you, returning after a few minutes, she passes you a foil-wrapped gift, and a cup of Strawberry flavored Soda. \"$13 please\"", $t.ExitCost = System.Decimal(13), $t.ExitTime = 5, $t);
                mexican.Exits.add(buyMexican);

                var goMexican = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Visit Mexican Store", $t.ExitNames = System.Array.init(["mexican", "burrito"], System.String), $t.Destination = mexican, $t.ExitCost = System.Decimal(0), $t.ExitDesc = "The Stall is done up in stereotypical mexican styles", $t.ExitText = "You decide to go look over what kind of burritos the mexican place sells.", $t.ExitTime = 1, $t);
                terminal.Exits.add(goMexican);

                var bakery = ($t = new FlightDashWeb.Room(), $t.RoomName = "Bakery", $t.ShortRoomDesc = "The small bakery catches your eye, and you enter, the smell of warm bread enticing you.", $t.LongRoomDesc = "The sole staff-member welcomes you. You can see her nametag reads 'Mishy - Head Baker'", $t);

                var buyBakery = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Order food", $t.ExitDesc = "", $t.Destination = terminal, $t.ExitText = "Stomach grumbling, you order a bagel and Orange Juice, Mishy grabs you a bagel and pours you a cup of fresh orange juice, passing it over the counter with a smile. \"$6 please\"", $t.ExitCost = System.Decimal(6), $t.ExitTime = 4, $t);
                bakery.Exits.add(buyBakery);

                var goBakery = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Visit Bakery", $t.ExitDesc = "The Bakery looks warm, and inviting, with a soft scent of fresh bread wafting from it", $t.ExitText = "You go into the bakery, enjoying the ambiance provided", $t.ExitTime = 1, $t.Destination = bakery, $t.ExitCost = System.Decimal(0), $t);
                terminal.Exits.add(goBakery);

                var loungeExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "The Lounge", $t.ExitLocked = function (game) {
                    return true;
                }, $t.LockText = "You wander off to the lounge, hoping you may be able to talk your way in on this economy ticket, sadly however as you try to talk the attendent into it, she is having none of it and refuses you entry.", $t.LockTime = 5, $t);
                terminal.Exits.add(loungeExit);

                var gate = ($t = new FlightDashWeb.Room(), $t.RoomName = "Gate 42", $t.ShortRoomDesc = "Gate 43 looks like pretty much every other gate, but a quick check of your boarding pass shows this one is yours", $t.LongRoomDesc = "The line seems to be quite short, seems not many people want to go the same place as you today", $t);

                var EndScreen = new FlightDashWeb.EndScreenRoom(this);
                {
                }
                ;
                var gateExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "In the Airplane", $t.ExitDesc = "", $t.ExitText = "You leave the Gate and soon you are on the airplane. Your seat is as cramped as usual, but it feels like a throne today", $t.Destination = EndScreen, $t);
                terminal.Exits.add(gateExit);
                gate.AutoExit = gateExit;

                this.CurrentRoom = hotelRoom;

            },
            RoomTitle: function () {
                var $t, $t1;
                return ($t = (($t1 = this.CurrentRoom) != null ? $t1.RoomName : null), $t != null ? $t : "");
            },
            GetRoomHeader: function () {
                var $t, $t1, $t2, $t3, $t4, $t5;
                var builder = new System.Text.StringBuilder();
                var roomName = ($t = (($t1 = this.CurrentRoom) != null ? $t1.RoomName : null), $t != null ? $t : "");
                builder.appendLine(roomName);
                builder.appendLine("-------------------------------------");
                builder.appendLine(System.String.format("Time to Flight: {0:D2}:{1:D2}", Bridge.box(((Bridge.Int.div(this.TimeToFlight, 60)) | 0), System.Int32), Bridge.box(this.TimeToFlight % 60, System.Int32)));
                builder.appendLine(System.String.format("Money: {0:C}", [($t2 = (($t3 = this.Player) != null ? $t3.Money : System.Decimal.lift(null)), $t2 != null ? $t2 : System.Decimal(0))]));
                builder.appendLine(($t4 = (($t5 = this.CurrentRoom) != null ? $t5.ShortRoomDesc : null), $t4 != null ? $t4 : ""));
                return builder.toString();

            },
            TryParseInput: function (input, outputText) {
                var $t;
                if (this.GameOver) {
                    outputText.v = "Sorry, this game is over";
                    return true;
                }
                var commandSplit = System.String.split(input, [32].map(function (i) {{ return String.fromCharCode(i); }}));
                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this.Commands).where(function (command) {
                        return System.Array.contains(command.FlightDashWeb$ICommand$GetCommandAliases(), commandSplit[System.Array.index(0, commandSplit)].toLowerCase(), System.String);
                    }), FlightDashWeb.ICommand);
                try {
                    while ($t.moveNext()) {
                        var command = $t.Current;
                        if (command.FlightDashWeb$ICommand$TryParseCommand(System.Linq.Enumerable.from(System.Linq.Enumerable.from(commandSplit).skip(1)).ToArray(), this, outputText)) {

                            if (this.TimeToFlight <= 0 || this.Player.Money.lte(System.Decimal(0))) {

                                this.GameOver = true;
                                outputText.v = "Sorry, it seems you " + ((this.TimeToFlight <= 0 ? "ran out of time" : "ran out of money") || "");
                            }

                            return true;
                        } else {
                            return false;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }


                outputText.v = "";
                return false;
            },
            ParseInput: function (input) {
                return "";
            }
        }
    });

    Bridge.define("FlightDashWeb.MainPage", {
        inherits: [Windows.UI.Xaml.Controls.Page],
        fields: {
            Game: null,
            output: null,
            outputScroll: null,
            pastInputList: null,
            input: null,
            actionButton: null,
            _contentLoaded: false
        },
        ctors: {
            init: function () {
                this.Game = new FlightDashWeb.Game();
            },
            ctor: function () {
                var $t;
                this.$initialize();
                Windows.UI.Xaml.Controls.Page.ctor.call(this);
                this.InitializeComponent();
                this.Game.InitializeGame();
                ($t = this.output).Text = ($t.Text || "") + (this.Game.GetRoomHeader() || "");
            }
        },
        methods: {
            actionButton_Click: function (sender, e) {
                this.HandleInput();
            },
            input_KeyDown: function (sender, e) {
                if (e.Key === Windows.System.VirtualKey.Enter) {
                    this.HandleInput();
                }
            },
            HandleInput: function () {
                var $t, $t1, $t2, $t3;
                this.pastInputList.Items.add(this.input.Text);
                this.pastInputList.SelectedIndex = (this.pastInputList.Items.Count - 1) | 0;
                var outputText = { };
                var parsed = this.Game.TryParseInput(this.input.Text, outputText);
                if (parsed) {
                    ($t = this.output).Text = ($t.Text || "") + "> " + (this.input.Text || "") + ("\n" || "");
                    ($t1 = this.output).Text = ($t1.Text || "") + (outputText.v || "");
                    this.input.Text = "";
                } else {
                    ($t2 = this.output).Text = ($t2.Text || "") + "> " + (this.input.Text || "") + ("\n" || "");
                    ($t3 = this.output).Text = ($t3.Text || "") + (outputText.v || "");
                }
            },
            InitializeComponent: function () {
                var $t;
                if (this._contentLoaded) {
                    return;
                }
                this._contentLoaded = true;


                if (Bridge.is(this, Windows.UI.Xaml.UIElement)) {
                    Bridge.cast(this, Windows.UI.Xaml.UIElement).XamlSourcePath = "FlightDashWeb\\MainPage.xaml";
                }



                var Grid_d36e3fae6419446582cbeda488d328a7 = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_d36e3fae6419446582cbeda488d328a7.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_d36e3fae6419446582cbeda488d328a7.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_92bef3b3aa8a4b568c9881ed12171228 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_92bef3b3aa8a4b568c9881ed12171228.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_f3bb85ba3e734aa59c6094af7ba21572 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_f3bb85ba3e734aa59c6094af7ba21572.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_d1bbd5995d2e45fd96cbbe99dc33f287 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_d1bbd5995d2e45fd96cbbe99dc33f287.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_b2b93a91f66f400b87200779b40e28b1 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_b2b93a91f66f400b87200779b40e28b1.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_08a3eab9a4ce4253af9ffd90b558f965 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_08a3eab9a4ce4253af9ffd90b558f965.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_d36e3fae6419446582cbeda488d328a7.ColumnDefinitions.add(ColumnDefinition_92bef3b3aa8a4b568c9881ed12171228);
                Grid_d36e3fae6419446582cbeda488d328a7.ColumnDefinitions.add(ColumnDefinition_f3bb85ba3e734aa59c6094af7ba21572);
                Grid_d36e3fae6419446582cbeda488d328a7.ColumnDefinitions.add(ColumnDefinition_d1bbd5995d2e45fd96cbbe99dc33f287);
                Grid_d36e3fae6419446582cbeda488d328a7.ColumnDefinitions.add(ColumnDefinition_b2b93a91f66f400b87200779b40e28b1);
                Grid_d36e3fae6419446582cbeda488d328a7.ColumnDefinitions.add(ColumnDefinition_08a3eab9a4ce4253af9ffd90b558f965);

                var RowDefinition_3685970c683841769868be8d1773d463 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_3685970c683841769868be8d1773d463.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_911d7d80044a4149afd5e6890ce198b8 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_911d7d80044a4149afd5e6890ce198b8.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_5868e85b35e94cd29b6896c467e6f864 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_5868e85b35e94cd29b6896c467e6f864.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_3f2b3756f2b24ed08cea9a7f0addd2ec = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_3f2b3756f2b24ed08cea9a7f0addd2ec.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_f040838fd2184ff0a6b786fc644013cd = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_f040838fd2184ff0a6b786fc644013cd.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_3027ef4f131f4043b82de33838e03a27 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_3027ef4f131f4043b82de33838e03a27.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_01ade81e324d4d84b5d439c2fe50a3f3 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_01ade81e324d4d84b5d439c2fe50a3f3.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_acb794fc1d334facaeb449a82ad1a7ec = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_acb794fc1d334facaeb449a82ad1a7ec.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_52f6ebcdaf254adbb2f0154c2b8f9e43 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_52f6ebcdaf254adbb2f0154c2b8f9e43.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_c6731da2aa954b68a772eb68e8d3f08d = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_c6731da2aa954b68a772eb68e8d3f08d.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_3685970c683841769868be8d1773d463);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_911d7d80044a4149afd5e6890ce198b8);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_5868e85b35e94cd29b6896c467e6f864);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_3f2b3756f2b24ed08cea9a7f0addd2ec);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_f040838fd2184ff0a6b786fc644013cd);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_3027ef4f131f4043b82de33838e03a27);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_01ade81e324d4d84b5d439c2fe50a3f3);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_acb794fc1d334facaeb449a82ad1a7ec);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_52f6ebcdaf254adbb2f0154c2b8f9e43);
                Grid_d36e3fae6419446582cbeda488d328a7.RowDefinitions.add(RowDefinition_c6731da2aa954b68a772eb68e8d3f08d);

                var ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09 = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09);
                ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09, 7);
                ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895 = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895.Text = "";
                this.RegisterName$1("output", TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895);
                TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895.Name = "output";
                TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));
                TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895.TextWrapping = Bridge.global.Windows.UI.Xaml.TextWrapping.Wrap;

                ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09.Content = TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895;


                var ListBox_627bf3b2c6234b1397e8c2070621f85c = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_627bf3b2c6234b1397e8c2070621f85c);
                ListBox_627bf3b2c6234b1397e8c2070621f85c.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_627bf3b2c6234b1397e8c2070621f85c, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_627bf3b2c6234b1397e8c2070621f85c, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_627bf3b2c6234b1397e8c2070621f85c, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_627bf3b2c6234b1397e8c2070621f85c, 2);

                var TextBox_b2b6ce062ac24fdcb80435e2f9fef649 = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_b2b6ce062ac24fdcb80435e2f9fef649);
                TextBox_b2b6ce062ac24fdcb80435e2f9fef649.Name = "input";
                TextBox_b2b6ce062ac24fdcb80435e2f9fef649.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_b2b6ce062ac24fdcb80435e2f9fef649, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_b2b6ce062ac24fdcb80435e2f9fef649, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_b2b6ce062ac24fdcb80435e2f9fef649, 9);
                TextBox_b2b6ce062ac24fdcb80435e2f9fef649.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_b45d301a36824ef89e86864bb2f1a697 = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_b45d301a36824ef89e86864bb2f1a697);
                Button_b45d301a36824ef89e86864bb2f1a697.Name = "actionButton";
                Button_b45d301a36824ef89e86864bb2f1a697.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_b45d301a36824ef89e86864bb2f1a697, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_b45d301a36824ef89e86864bb2f1a697, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_b45d301a36824ef89e86864bb2f1a697, 9);
                Button_b45d301a36824ef89e86864bb2f1a697.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                Grid_d36e3fae6419446582cbeda488d328a7.Children.add(ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09);
                Grid_d36e3fae6419446582cbeda488d328a7.Children.add(ListBox_627bf3b2c6234b1397e8c2070621f85c);
                Grid_d36e3fae6419446582cbeda488d328a7.Children.add(TextBox_b2b6ce062ac24fdcb80435e2f9fef649);
                Grid_d36e3fae6419446582cbeda488d328a7.Children.add(Button_b45d301a36824ef89e86864bb2f1a697);


                this.Content = Grid_d36e3fae6419446582cbeda488d328a7;



                this.output = TextBlock_3ad4c8fd8f364f8c9a5f723b001ff895;
                this.outputScroll = ScrollViewer_6d865bc1e93545269cfa5b7bdea4ac09;
                this.pastInputList = ListBox_627bf3b2c6234b1397e8c2070621f85c;
                this.input = TextBox_b2b6ce062ac24fdcb80435e2f9fef649;
                this.actionButton = Button_b45d301a36824ef89e86864bb2f1a697;



            }
        }
    });

    Bridge.define("FlightDashWeb.Player", {
        fields: {
            Money: System.Decimal(0.0)
        },
        methods: {
            Initialize: function () {
                this.Money = System.Decimal(125);
            }
        }
    });

    Bridge.define("FlightDashWeb.Commands.CheckIn", {
        inherits: [FlightDashWeb.ICommand],
        alias: [
            "GetCommandName", "FlightDashWeb$ICommand$GetCommandName",
            "GetCommandAliases", "FlightDashWeb$ICommand$GetCommandAliases",
            "GetCommandHelp", "FlightDashWeb$ICommand$GetCommandHelp",
            "TryParseCommand", "FlightDashWeb$ICommand$TryParseCommand"
        ],
        methods: {
            GetCommandName: function () {
                return "check-in";
            },
            GetCommandAliases: function () {
                return System.Array.init(["check"], System.String);
            },
            GetCommandHelp: function () {
                return "";
            },
            TryParseCommand: function (commandArguments, curState, output) {
                if (commandArguments.length !== 1) {
                    output.v = "I have nothing to check." + ("\n" || "");
                    return false;
                }

                if (!Bridge.referenceEquals(commandArguments[System.Array.index(0, commandArguments)], "in")) {
                    output.v = "I have nothing to check." + ("\n" || "");
                    return false;
                }

                if (!Bridge.referenceEquals(curState.RoomTitle().toLowerCase(), "the check-in desk")) {
                    output.v = "Sorry, you can not check in here";
                    return false;
                }

                curState.CheckedIn = true;

                output.v = "";

                var exit = curState.CurrentRoom.Exits.getItem(0);
                output.v = (output.v || "") + ((("\n" || "") + (exit.ExitText || "") + ("\n" || "")) || "");
                curState.CurrentRoom = exit.Destination;
                curState.TimeToFlight = (curState.TimeToFlight - exit.ExitTime) | 0;
                curState.Player.Money = curState.Player.Money.sub(exit.ExitCost);
                output.v = (output.v || "") + ((curState.GetRoomHeader()) || "");
                return true;
            }
        }
    });

    Bridge.define("FlightDashWeb.Commands.Go", {
        inherits: [FlightDashWeb.ICommand],
        alias: [
            "GetCommandName", "FlightDashWeb$ICommand$GetCommandName",
            "GetCommandAliases", "FlightDashWeb$ICommand$GetCommandAliases",
            "GetCommandHelp", "FlightDashWeb$ICommand$GetCommandHelp",
            "TryParseCommand", "FlightDashWeb$ICommand$TryParseCommand"
        ],
        methods: {
            GetCommandName: function () {
                return "Go";
            },
            GetCommandAliases: function () {
                return System.Array.init(["go", "head", "walk", "drive", "get in"], System.String);
            },
            GetCommandHelp: function () {
                return "";
            },
            TryParseCommand: function (commandArguments, curState, output) {
                var $t;
                if (commandArguments.length !== 1) {
                    output.v = "Sorry, Invalid destination or command format" + ("\n" || "");
                    return false;
                }

                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(curState.CurrentRoom.Exits).where(function (currentRoomExit) {
                        return System.Array.contains(currentRoomExit.ExitNames, commandArguments[System.Array.index(0, commandArguments)].toLowerCase(), System.String);
                    }), FlightDashWeb.Exit);
                try {
                    while ($t.moveNext()) {
                        var currentRoomExit = $t.Current;
                        if (!Bridge.staticEquals(currentRoomExit.ExitLocked, null)) {
                            var isLocked = currentRoomExit.ExitLocked(curState);
                            if (isLocked) {
                                output.v = currentRoomExit.LockText;
                                curState.TimeToFlight = (curState.TimeToFlight - currentRoomExit.LockTime) | 0;
                                output.v = (output.v || "") + ((("\n" || "") + (curState.GetRoomHeader() || "")) || "");
                                return true;
                            }
                        }
                        output.v = (currentRoomExit.ExitText || "") + ("\n" || "");
                        curState.CurrentRoom = currentRoomExit.Destination;
                        curState.TimeToFlight = (curState.TimeToFlight - currentRoomExit.ExitTime) | 0;
                        curState.Player.Money = curState.Player.Money.sub(currentRoomExit.ExitCost);
                        output.v = (output.v || "") + ((curState.GetRoomHeader()) || "");

                        while (curState.CurrentRoom.AutoExit != null) {
                            var exit = curState.CurrentRoom.AutoExit;
                            output.v = (output.v || "") + ((("\n" || "") + (exit.ExitText || "") + ("\n" || "")) || "");
                            curState.CurrentRoom = exit.Destination;
                            curState.TimeToFlight = (curState.TimeToFlight - exit.ExitTime) | 0;
                            curState.Player.Money = curState.Player.Money.sub(exit.ExitCost);
                            output.v = (output.v || "") + ((curState.GetRoomHeader()) || "");
                        }

                        return true;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                output.v = "Invalid destination" + ("\n" || "");
                return false;
            }
        }
    });

    Bridge.define("FlightDashWeb.Commands.Look", {
        inherits: [FlightDashWeb.ICommand],
        alias: [
            "GetCommandName", "FlightDashWeb$ICommand$GetCommandName",
            "GetCommandAliases", "FlightDashWeb$ICommand$GetCommandAliases",
            "GetCommandHelp", "FlightDashWeb$ICommand$GetCommandHelp",
            "TryParseCommand", "FlightDashWeb$ICommand$TryParseCommand"
        ],
        methods: {
            GetCommandName: function () {
                return "Look";
            },
            GetCommandAliases: function () {
                return System.Array.init(["look", "l", "peer", "stare", "examine"], System.String);
            },
            GetCommandHelp: function () {
                return "Look at an item";
            },
            TryParseCommand: function (commandArguments, curState, output) {
                var $t;
                if (commandArguments.length === 0) {
                    output.v = System.String.format("{0}{1}{2}", curState.CurrentRoom.ShortRoomDesc, "\n", curState.CurrentRoom.LongRoomDesc);
                    return true;
                } else {
                    if (Bridge.referenceEquals(commandArguments[System.Array.index(0, commandArguments)].toLowerCase(), "at")) {
                        commandArguments = System.Linq.Enumerable.from(System.Linq.Enumerable.from(commandArguments).skip(1)).ToArray();
                    }
                    var toLook = commandArguments[System.Array.index(0, commandArguments)];
                    $t = Bridge.getEnumerator(curState.CurrentRoom.Exits);
                    try {
                        while ($t.moveNext()) {
                            var currentRoomExit = $t.Current;
                            if (System.Array.contains(currentRoomExit.ExitNames, toLook.toLowerCase(), System.String)) {
                                output.v = System.String.format("{0}{1}", currentRoomExit.ExitDesc, "\n");
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }


                output.v = "";
                return true;
            }
        }
    });

    Bridge.define("FlightDashWeb.Commands.SecurityCommand", {
        inherits: [FlightDashWeb.ICommand],
        alias: [
            "GetCommandName", "FlightDashWeb$ICommand$GetCommandName",
            "GetCommandAliases", "FlightDashWeb$ICommand$GetCommandAliases",
            "GetCommandHelp", "FlightDashWeb$ICommand$GetCommandHelp",
            "TryParseCommand", "FlightDashWeb$ICommand$TryParseCommand"
        ],
        methods: {
            GetCommandName: function () {
                return "Security";
            },
            GetCommandAliases: function () {
                return System.Array.init(["remove", "place", "empty"], System.String);
            },
            GetCommandHelp: function () {
                return "";
            },
            TryParseCommand: function (commandArguments, curState, output) {
                var $t;
                if (commandArguments.length !== 1) {
                    output.v = "";
                    return false;
                }

                output.v = "";
                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(System.Enum.getValues(FlightDashWeb.Belongings)).select(function (x) { return Bridge.cast(x, FlightDashWeb.Belongings); }), FlightDashWeb.Belongings);
                try {
                    while ($t.moveNext()) {
                        var belonging = $t.Current;
                        if (Bridge.referenceEquals(System.Enum.toString(FlightDashWeb.Belongings, belonging).toLowerCase(), commandArguments[System.Array.index(0, commandArguments)])) {
                            curState.CurrentBelongings ^= belonging;
                            switch (belonging) {
                                case FlightDashWeb.Belongings.Shoes: 
                                    output.v = (output.v || "") + (("You remove your shoes and put them on the belt" + ("\n" || "")) || "");
                                    return true;
                                case FlightDashWeb.Belongings.Belt: 
                                    output.v = (output.v || "") + (("You remove your belt and put it on the belt" + ("\n" || "")) || "");
                                    return true;
                                case FlightDashWeb.Belongings.Backpack: 
                                    output.v = (output.v || "") + (("You take off your backpack and put it on the belt" + ("\n" || "")) || "");
                                    return true;
                                case FlightDashWeb.Belongings.Pockets: 
                                    output.v = (output.v || "") + (("You empty your pockets and put the contents on the belt" + ("\n" || "")) || "");
                                    return true;
                                case FlightDashWeb.Belongings.Electronics: 
                                    output.v = (output.v || "") + (("You empty your electronics out onto the belt" + ("\n" || "")) || "");
                                    return true;
                                default: 
                                    output.v = "I do not have that" + ("\n" || "");
                                    return false;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                output.v = "";
                return false;

            }
        }
    });

    Bridge.define("FlightDashWeb.EndScreenRoom", {
        inherits: [FlightDashWeb.Room],
        fields: {
            CurState: null
        },
        props: {
            ShortRoomDesc$1: {
                get: function () {
                    var $t, $t1;
                    return System.String.format("Congratulations, you won! You had {0:D2}:{1:D2} remaining, and {2:C} remaining", Bridge.box(((Bridge.Int.div(this.CurState.TimeToFlight, 60)) | 0), System.Int32), Bridge.box(this.CurState.TimeToFlight % 60, System.Int32), ($t = (($t1 = this.CurState.Player) != null ? $t1.Money : System.Decimal.lift(null)), $t != null ? $t : System.Decimal(0)));
                }
            }
        },
        ctors: {
            ctor: function (game) {
                this.$initialize();
                FlightDashWeb.Room.ctor.call(this);
                this.CurState = game;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovUmVsZWFzZS9BcHAueGFtbC5nLmNzIiwib2JqL1JlbGVhc2UvTWFpblBhZ2UueGFtbC5nLmNzIiwiQXBwLnhhbWwuY3MiLCJSb29tLmNzIiwiR2FtZS5jcyIsIk1haW5QYWdlLnhhbWwuY3MiLCJQbGF5ZXIuY3MiLCJDb21tYW5kcy9DaGVja0luLmNzIiwiQ29tbWFuZHMvR28uY3MiLCJDb21tYW5kcy9Mb29rLmNzIiwiQ29tbWFuZHMvU2VjdXJpdHlDb21tYW5kLmNzIiwiRW5kU2NyZWVuUm9vbS5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7O29CQVFRQSxXQUEyQkEsQUFBT0E7b0JBQ2xDQSxPQUFPQSxtRUFBNkRBOzs7Ozs7Ozs7O29CQ0RwRUEsV0FBMkJBLEFBQU9BO29CQUNsQ0EsT0FBT0EsbUVBQTZEQTs7Ozs7Ozs7O1lEbUV4RUEsSUFBSUE7Ozs7Ozs7OztnQkUvRElBOzs7Z0JBSUFBLGVBQWVBLElBQUlBO2dCQUNuQkEseUNBQXlCQTs7Ozs7Z0JGdUJ6QkEsSUFBSUE7b0JBQ0FBOztnQkFDSkE7OztnQkFHQUEsSUFBSUE7b0JBRUFBLEFBQUNBLFlBQW1DQSxBQUFRQTs7OztnQkFLNURBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBOzs7Z0JBR0FBLDBEQUEwREEsSUFBSUE7Z0JBQzlEQSxpQkFBaUJBOztnQkFFakJBLGlCQUFpQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCR2pDaUNBLEtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0M0ZEdBLEtBQUlBOzs7Ozs7Z0JBamVqREE7Z0JBQ0FBLGNBQVNBLElBQUlBO2dCQUNi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QUtBO29DQUNEQSwrQkFBVUEsOERBQTREQTtvQ0FDdEVBO2dDQUNKQSxLQUFLQTtvQ0FDREEsK0JBQVVBLG1EQUFpREE7b0NBQzNEQTtnQ0FDSkE7b0NBQ0lBLFdBQVNBLHdCQUFxQkE7b0NBQzlCQTs7Ozs7Ozs7OztnQkFLaEJBO2dCQUNBQTs7Ozs7Ozs7Ozs7Ozs7O29CQzVDSkEsT0FBT0EsdUdBQStGQSxrRkFBMkJBLDJEQUEyQkEsT0FBQ0EsT0FBb0NBLHlCQUFrQkEsT0FBS0EsWUFBcURBLEFBQVVBLHlDQUEzSEE7Ozs7OzRCQVJ2SUE7OztnQkFFakJBLGdCQUFnQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gPENTSFRNTDU+PFhhbWxIYXNoPjk3NDNCOTAzMjE5RENFM0YwNTMzQjk1NTU4M0UzQjRDPC9YYW1sSGFzaD48UGFzc051bWJlcj4yPC9QYXNzTnVtYmVyPjxDb21waWxhdGlvbkRhdGU+Mi8yMy8yMDIwIDc6MTc6MzYgQU08L0NvbXBpbGF0aW9uRGF0ZT48L0NTSFRNTDU+XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgY2xhc3Mgx4DHgEZsaWdodGRhc2h3ZWLHgMeAQ29tcG9uZW50x4DHgEFwcMeAx4BYYW1sx4DHgEZhY3Rvcnlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBvYmplY3QgSW5zdGFudGlhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGdsb2JhbDo6U3lzdGVtLlR5cGUgdHlwZSA9IHR5cGVvZihGbGlnaHREYXNoV2ViLkFwcCk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5UeXBlSW5zdGFudGlhdGlvbkhlbHBlci5JbnN0YW50aWF0ZSh0eXBlKTtcclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDxhdXRvLWdlbmVyYXRlZD5cclxuLy8gICAgIFRoaXMgY29kZSB3YXMgYXV0by1nZW5lcmF0ZWQgYnkgXCJDIy9YQU1MIGZvciBIVE1MNVwiXHJcbi8vXHJcbi8vICAgICBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBtYXkgY2F1c2UgaW5jb3JyZWN0IGJlaGF2aW9yIGFuZCB3aWxsIGJlIGxvc3QgaWZcclxuLy8gICAgIHRoZSBjb2RlIGlzIHJlZ2VuZXJhdGVkLlxyXG4vLyA8L2F1dG8tZ2VuZXJhdGVkPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblxyXG5wYXJ0aWFsIGNsYXNzIEFwcCA6IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkFwcGxpY2F0aW9uXHJcbntcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDE2OSwgNjQ5LCAwNjI4IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTY5ICgnZmllbGQgLi4uIGlzIG5ldmVyIHVzZWQnKSwgQ1MwNjQ5ICgnZmllbGQgLi4uIGlzIG5ldmVyIGFzc2lnbmVkIHRvLCBhbmQgd2lsbCBhbHdheXMgaGF2ZSBpdHMgZGVmYXVsdCB2YWx1ZSBudWxsJyksIGFuZCBDUzA2MjggKCdtZW1iZXIgOiBuZXcgcHJvdGVjdGVkIG1lbWJlciBkZWNsYXJlZCBpbiBzZWFsZWQgY2xhc3MnKVxyXG5cclxuXHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAxNjksIDY0OSwgMDYyOFxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9jb250ZW50TG9hZGVkO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVDb21wb25lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9jb250ZW50TG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfY29udGVudExvYWRlZCA9IHRydWU7XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAwMTg0IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTg0ICgnVGhlIGdpdmVuIGV4cHJlc3Npb24gaXMgbmV2ZXIgb2YgdGhlIHByb3ZpZGVkICgndHlwZScpIHR5cGUnKVxyXG4gICAgICAgICAgICBpZiAodGhpcyBpcyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICgoZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KShvYmplY3QpdGhpcykuWGFtbFNvdXJjZVBhdGggPSBAXCJGbGlnaHREYXNoV2ViXFxBcHAueGFtbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDAxODRcclxuXHJcblxyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRSb290UGF0aCA9IEBcIk91dHB1dFxcXCI7XHJcbmdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5TdGFydHVwQXNzZW1ibHlJbmZvLk91dHB1dEFwcEZpbGVzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxhcHBcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRMaWJyYXJpZXNQYXRoID0gQFwiYXBwLWNzaHRtbDVcXGxpYnNcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRSZXNvdXJjZXNQYXRoID0gQFwiYXBwLWNzaHRtbDVcXHJlc1xcXCI7XHJcblxyXG5cclxudmFyIFJlc291cmNlRGljdGlvbmFyeV9iMWU4MDlhYjg5OWM0Yjk0OGZjNjU5ZmNmOGE5YTk5YSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5SZXNvdXJjZURpY3Rpb25hcnkoKTtcclxudGhpcy5SZXNvdXJjZXMgPSBSZXNvdXJjZURpY3Rpb25hcnlfYjFlODA5YWI4OTljNGI5NDhmYzY1OWZjZjhhOWE5OWE7XHJcblxyXG50aGlzLlJlc291cmNlcyA9IFJlc291cmNlRGljdGlvbmFyeV9iMWU4MDlhYjg5OWM0Yjk0OGZjNjU5ZmNmOGE5YTk5YTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG57XHJcbiAgICBuZXcgQXBwKCk7XHJcbn1cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiIsIi8vIDxDU0hUTUw1PjxYYW1sSGFzaD43RDJDN0Q3MDY1NEMzRDZDMDZENzA0NTZCODAxQThERjwvWGFtbEhhc2g+PFBhc3NOdW1iZXI+MjwvUGFzc051bWJlcj48Q29tcGlsYXRpb25EYXRlPjIvMjMvMjAyMCA3OjE3OjM3IEFNPC9Db21waWxhdGlvbkRhdGU+PC9DU0hUTUw1PlxyXG5cclxuXHJcblxyXG5wdWJsaWMgc3RhdGljIGNsYXNzIMeAx4BGbGlnaHRkYXNod2Vix4DHgENvbXBvbmVudMeAx4BNYWlucGFnZceAx4BYYW1sx4DHgEZhY3Rvcnlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBvYmplY3QgSW5zdGFudGlhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGdsb2JhbDo6U3lzdGVtLlR5cGUgdHlwZSA9IHR5cGVvZihGbGlnaHREYXNoV2ViLk1haW5QYWdlKTtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlR5cGVJbnN0YW50aWF0aW9uSGVscGVyLkluc3RhbnRpYXRlKHR5cGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gPGF1dG8tZ2VuZXJhdGVkPlxyXG4vLyAgICAgVGhpcyBjb2RlIHdhcyBhdXRvLWdlbmVyYXRlZCBieSBcIkMjL1hBTUwgZm9yIEhUTUw1XCJcclxuLy9cclxuLy8gICAgIENoYW5nZXMgdG8gdGhpcyBmaWxlIG1heSBjYXVzZSBpbmNvcnJlY3QgYmVoYXZpb3IgYW5kIHdpbGwgYmUgbG9zdCBpZlxyXG4vLyAgICAgdGhlIGNvZGUgaXMgcmVnZW5lcmF0ZWQuXHJcbi8vIDwvYXV0by1nZW5lcmF0ZWQ+XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcbnBhcnRpYWwgY2xhc3MgTWFpblBhZ2UgOiBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5QYWdlXHJcbntcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDE2OSwgNjQ5LCAwNjI4IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTY5ICgnZmllbGQgLi4uIGlzIG5ldmVyIHVzZWQnKSwgQ1MwNjQ5ICgnZmllbGQgLi4uIGlzIG5ldmVyIGFzc2lnbmVkIHRvLCBhbmQgd2lsbCBhbHdheXMgaGF2ZSBpdHMgZGVmYXVsdCB2YWx1ZSBudWxsJyksIGFuZCBDUzA2MjggKCdtZW1iZXIgOiBuZXcgcHJvdGVjdGVkIG1lbWJlciBkZWNsYXJlZCBpbiBzZWFsZWQgY2xhc3MnKVxyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJsb2NrIG91dHB1dDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlNjcm9sbFZpZXdlciBvdXRwdXRTY3JvbGw7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94IHBhc3RJbnB1dExpc3Q7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0Qm94IGlucHV0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQnV0dG9uIGFjdGlvbkJ1dHRvbjtcclxuXHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAxNjksIDY0OSwgMDYyOFxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9jb250ZW50TG9hZGVkO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVDb21wb25lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9jb250ZW50TG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfY29udGVudExvYWRlZCA9IHRydWU7XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAwMTg0IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTg0ICgnVGhlIGdpdmVuIGV4cHJlc3Npb24gaXMgbmV2ZXIgb2YgdGhlIHByb3ZpZGVkICgndHlwZScpIHR5cGUnKVxyXG4gICAgICAgICAgICBpZiAodGhpcyBpcyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICgoZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KShvYmplY3QpdGhpcykuWGFtbFNvdXJjZVBhdGggPSBAXCJGbGlnaHREYXNoV2ViXFxNYWluUGFnZS54YW1sXCI7XHJcbiAgICAgICAgICAgIH1cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMDE4NFxyXG5cclxuXHJcblxyXG52YXIgR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkKCk7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuSG9yaXpvbnRhbEFsaWdubWVudCA9IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkhvcml6b250YWxBbGlnbm1lbnQuU3RyZXRjaDtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5WZXJ0aWNhbEFsaWdubWVudCA9IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlZlcnRpY2FsQWxpZ25tZW50LlN0cmV0Y2g7XHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzkyYmVmM2IzYWE4YTRiNTY4Yzk4ODFlZDEyMTcxMjI4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl85MmJlZjNiM2FhOGE0YjU2OGM5ODgxZWQxMjE3MTIyOC5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fZjNiYjg1YmEzZTczNGFhNTljNjA5NGFmN2JhMjE1NzIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uX2YzYmI4NWJhM2U3MzRhYTU5YzYwOTRhZjdiYTIxNTcyLldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl9kMWJiZDU5OTVkMmU0NWZkOTZjYmJlOTlkYzMzZjI4NyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fZDFiYmQ1OTk1ZDJlNDVmZDk2Y2JiZTk5ZGMzM2YyODcuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uX2IyYjkzYTkxZjY2ZjQwMGI4NzIwMDc3OWI0MGUyOGIxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl9iMmI5M2E5MWY2NmY0MDBiODcyMDA3NzliNDBlMjhiMS5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fMDhhM2VhYjlhNGNlNDI1M2FmOWZmZDkwYjU1OGY5NjUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzA4YTNlYWI5YTRjZTQyNTNhZjlmZmQ5MGI1NThmOTY1LldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzkyYmVmM2IzYWE4YTRiNTY4Yzk4ODFlZDEyMTcxMjI4KTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl9mM2JiODViYTNlNzM0YWE1OWM2MDk0YWY3YmEyMTU3Mik7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fZDFiYmQ1OTk1ZDJlNDVmZDk2Y2JiZTk5ZGMzM2YyODcpO1xyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uX2IyYjkzYTkxZjY2ZjQwMGI4NzIwMDc3OWI0MGUyOGIxKTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl8wOGEzZWFiOWE0Y2U0MjUzYWY5ZmZkOTBiNTU4Zjk2NSk7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl8zNjg1OTcwYzY4Mzg0MTc2OTg2OGJlOGQxNzczZDQ2MyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fMzY4NTk3MGM2ODM4NDE3Njk4NjhiZThkMTc3M2Q0NjMuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl85MTFkN2Q4MDA0NGE0MTQ5YWZkNWU2ODkwY2UxOThiOCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fOTExZDdkODAwNDRhNDE0OWFmZDVlNjg5MGNlMTk4YjguSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl81ODY4ZTg1YjM1ZTk0Y2QyOWI2ODk2YzQ2N2U2Zjg2NCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fNTg2OGU4NWIzNWU5NGNkMjliNjg5NmM0NjdlNmY4NjQuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl8zZjJiMzc1NmYyYjI0ZWQwOGNlYTlhN2YwYWRkZDJlYyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fM2YyYjM3NTZmMmIyNGVkMDhjZWE5YTdmMGFkZGQyZWMuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl9mMDQwODM4ZmQyMTg0ZmYwYTZiNzg2ZmM2NDQwMTNjZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fZjA0MDgzOGZkMjE4NGZmMGE2Yjc4NmZjNjQ0MDEzY2QuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl8zMDI3ZWY0ZjEzMWY0MDQzYjgyZGUzMzgzOGUwM2EyNyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fMzAyN2VmNGYxMzFmNDA0M2I4MmRlMzM4MzhlMDNhMjcuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl8wMWFkZTgxZTMyNGQ0ZDg0YjVkNDM5YzJmZTUwYTNmMyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fMDFhZGU4MWUzMjRkNGQ4NGI1ZDQzOWMyZmU1MGEzZjMuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl9hY2I3OTRmYzFkMzM0ZmFjYWViNDQ5YTgyYWQxYTdlYyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fYWNiNzk0ZmMxZDMzNGZhY2FlYjQ0OWE4MmFkMWE3ZWMuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl81MmY2ZWJjZGFmMjU0YWRiYjJmMDE1NGMyYjhmOWU0MyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fNTJmNmViY2RhZjI1NGFkYmIyZjAxNTRjMmI4ZjllNDMuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgUm93RGVmaW5pdGlvbl9jNjczMWRhMmFhOTU0YjY4YTc3MmViNjhlOGQzZjA4ZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Sb3dEZWZpbml0aW9uKCk7XHJcblJvd0RlZmluaXRpb25fYzY3MzFkYTJhYTk1NGI2OGE3NzJlYjY4ZThkM2YwOGQuSGVpZ2h0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzM2ODU5NzBjNjgzODQxNzY5ODY4YmU4ZDE3NzNkNDYzKTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl85MTFkN2Q4MDA0NGE0MTQ5YWZkNWU2ODkwY2UxOThiOCk7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNTg2OGU4NWIzNWU5NGNkMjliNjg5NmM0NjdlNmY4NjQpO1xyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzNmMmIzNzU2ZjJiMjRlZDA4Y2VhOWE3ZjBhZGRkMmVjKTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9mMDQwODM4ZmQyMTg0ZmYwYTZiNzg2ZmM2NDQwMTNjZCk7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fMzAyN2VmNGYxMzFmNDA0M2I4MmRlMzM4MzhlMDNhMjcpO1xyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzAxYWRlODFlMzI0ZDRkODRiNWQ0MzljMmZlNTBhM2YzKTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9hY2I3OTRmYzFkMzM0ZmFjYWViNDQ5YTgyYWQxYTdlYyk7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNTJmNmViY2RhZjI1NGFkYmIyZjAxNTRjMmI4ZjllNDMpO1xyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uX2M2NzMxZGEyYWE5NTRiNjhhNzcyZWI2OGU4ZDNmMDhkKTtcclxuXHJcbnZhciBTY3JvbGxWaWV3ZXJfNmQ4NjViYzFlOTM1NDUyNjljZmE1YjdiZGVhNGFjMDkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuU2Nyb2xsVmlld2VyKCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwib3V0cHV0U2Nyb2xsXCIsIFNjcm9sbFZpZXdlcl82ZDg2NWJjMWU5MzU0NTI2OWNmYTViN2JkZWE0YWMwOSk7XHJcblNjcm9sbFZpZXdlcl82ZDg2NWJjMWU5MzU0NTI2OWNmYTViN2JkZWE0YWMwOS5OYW1lID0gXCJvdXRwdXRTY3JvbGxcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oU2Nyb2xsVmlld2VyXzZkODY1YmMxZTkzNTQ1MjY5Y2ZhNWI3YmRlYTRhYzA5LDApO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oU2Nyb2xsVmlld2VyXzZkODY1YmMxZTkzNTQ1MjY5Y2ZhNWI3YmRlYTRhYzA5LDQpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvd1NwYW4oU2Nyb2xsVmlld2VyXzZkODY1YmMxZTkzNTQ1MjY5Y2ZhNWI3YmRlYTRhYzA5LDcpO1xyXG5TY3JvbGxWaWV3ZXJfNmQ4NjViYzFlOTM1NDUyNjljZmE1YjdiZGVhNGFjMDkuQmFja2dyb3VuZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5NZWRpYS5Tb2xpZENvbG9yQnJ1c2gobmV3IGdsb2JhbDo6V2luZG93cy5VSS5Db2xvcigpIHsgQSA9IChieXRlKTI1NSwgUiA9IChieXRlKTAsIEcgPSAoYnl0ZSkwLCBCID0gKGJ5dGUpMCB9KTtcclxudmFyIFRleHRCbG9ja18zYWQ0YzhmZDhmMzY0ZjhjOWE1ZjcyM2IwMDFmZjg5NSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0QmxvY2soKTtcclxuVGV4dEJsb2NrXzNhZDRjOGZkOGYzNjRmOGM5YTVmNzIzYjAwMWZmODk1LlRleHQgPSBAXCJcIjtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJvdXRwdXRcIiwgVGV4dEJsb2NrXzNhZDRjOGZkOGYzNjRmOGM5YTVmNzIzYjAwMWZmODk1KTtcclxuVGV4dEJsb2NrXzNhZDRjOGZkOGYzNjRmOGM5YTVmNzIzYjAwMWZmODk1Lk5hbWUgPSBcIm91dHB1dFwiO1xyXG5UZXh0QmxvY2tfM2FkNGM4ZmQ4ZjM2NGY4YzlhNWY3MjNiMDAxZmY4OTUuQmFja2dyb3VuZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5NZWRpYS5Tb2xpZENvbG9yQnJ1c2gobmV3IGdsb2JhbDo6V2luZG93cy5VSS5Db2xvcigpIHsgQSA9IChieXRlKTI1NSwgUiA9IChieXRlKTAsIEcgPSAoYnl0ZSkwLCBCID0gKGJ5dGUpMCB9KTtcclxuVGV4dEJsb2NrXzNhZDRjOGZkOGYzNjRmOGM5YTVmNzIzYjAwMWZmODk1LkZvcmVncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkyNTUsIEcgPSAoYnl0ZSkyNTUsIEIgPSAoYnl0ZSkyNTUgfSk7XHJcblRleHRCbG9ja18zYWQ0YzhmZDhmMzY0ZjhjOWE1ZjcyM2IwMDFmZjg5NS5UZXh0V3JhcHBpbmcgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5UZXh0V3JhcHBpbmcuV3JhcDtcclxuXHJcblNjcm9sbFZpZXdlcl82ZDg2NWJjMWU5MzU0NTI2OWNmYTViN2JkZWE0YWMwOS5Db250ZW50ID0gVGV4dEJsb2NrXzNhZDRjOGZkOGYzNjRmOGM5YTVmNzIzYjAwMWZmODk1O1xyXG5cclxuXHJcbnZhciBMaXN0Qm94XzYyN2JmM2IyYzYyMzRiMTM5N2U4YzIwNzA2MjFmODVjID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJwYXN0SW5wdXRMaXN0XCIsIExpc3RCb3hfNjI3YmYzYjJjNjIzNGIxMzk3ZThjMjA3MDYyMWY4NWMpO1xyXG5MaXN0Qm94XzYyN2JmM2IyYzYyMzRiMTM5N2U4YzIwNzA2MjFmODVjLk5hbWUgPSBcInBhc3RJbnB1dExpc3RcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oTGlzdEJveF82MjdiZjNiMmM2MjM0YjEzOTdlOGMyMDcwNjIxZjg1YywwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKExpc3RCb3hfNjI3YmYzYjJjNjIzNGIxMzk3ZThjMjA3MDYyMWY4NWMsNCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KExpc3RCb3hfNjI3YmYzYjJjNjIzNGIxMzk3ZThjMjA3MDYyMWY4NWMsNyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihMaXN0Qm94XzYyN2JmM2IyYzYyMzRiMTM5N2U4YzIwNzA2MjFmODVjLDIpO1xyXG5cclxudmFyIFRleHRCb3hfYjJiNmNlMDYyYWMyNGZkY2I4MDQzNWUyZjlmZWY2NDkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJveCgpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcImlucHV0XCIsIFRleHRCb3hfYjJiNmNlMDYyYWMyNGZkY2I4MDQzNWUyZjlmZWY2NDkpO1xyXG5UZXh0Qm94X2IyYjZjZTA2MmFjMjRmZGNiODA0MzVlMmY5ZmVmNjQ5Lk5hbWUgPSBcImlucHV0XCI7XHJcblRleHRCb3hfYjJiNmNlMDYyYWMyNGZkY2I4MDQzNWUyZjlmZWY2NDkuVGV4dCA9IEBcIlwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihUZXh0Qm94X2IyYjZjZTA2MmFjMjRmZGNiODA0MzVlMmY5ZmVmNjQ5LDApO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oVGV4dEJveF9iMmI2Y2UwNjJhYzI0ZmRjYjgwNDM1ZTJmOWZlZjY0OSwzKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coVGV4dEJveF9iMmI2Y2UwNjJhYzI0ZmRjYjgwNDM1ZTJmOWZlZjY0OSw5KTtcclxuVGV4dEJveF9iMmI2Y2UwNjJhYzI0ZmRjYjgwNDM1ZTJmOWZlZjY0OS5LZXlEb3duICs9IGlucHV0X0tleURvd247XHJcblxyXG52YXIgQnV0dG9uX2I0NWQzMDFhMzY4MjRlZjg5ZTg2ODY0YmIyZjFhNjk3ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkJ1dHRvbigpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcImFjdGlvbkJ1dHRvblwiLCBCdXR0b25fYjQ1ZDMwMWEzNjgyNGVmODllODY4NjRiYjJmMWE2OTcpO1xyXG5CdXR0b25fYjQ1ZDMwMWEzNjgyNGVmODllODY4NjRiYjJmMWE2OTcuTmFtZSA9IFwiYWN0aW9uQnV0dG9uXCI7XHJcbkJ1dHRvbl9iNDVkMzAxYTM2ODI0ZWY4OWU4Njg2NGJiMmYxYTY5Ny5Db250ZW50ID0gQFwiQWN0aW9uXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKEJ1dHRvbl9iNDVkMzAxYTM2ODI0ZWY4OWU4Njg2NGJiMmYxYTY5NywzKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKEJ1dHRvbl9iNDVkMzAxYTM2ODI0ZWY4OWU4Njg2NGJiMmYxYTY5NywxKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coQnV0dG9uX2I0NWQzMDFhMzY4MjRlZjg5ZTg2ODY0YmIyZjFhNjk3LDkpO1xyXG5CdXR0b25fYjQ1ZDMwMWEzNjgyNGVmODllODY4NjRiYjJmMWE2OTcuQ2xpY2sgKz0gYWN0aW9uQnV0dG9uX0NsaWNrO1xyXG5cclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5DaGlsZHJlbi5BZGQoU2Nyb2xsVmlld2VyXzZkODY1YmMxZTkzNTQ1MjY5Y2ZhNWI3YmRlYTRhYzA5KTtcclxuR3JpZF9kMzZlM2ZhZTY0MTk0NDY1ODJjYmVkYTQ4OGQzMjhhNy5DaGlsZHJlbi5BZGQoTGlzdEJveF82MjdiZjNiMmM2MjM0YjEzOTdlOGMyMDcwNjIxZjg1Yyk7XHJcbkdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTcuQ2hpbGRyZW4uQWRkKFRleHRCb3hfYjJiNmNlMDYyYWMyNGZkY2I4MDQzNWUyZjlmZWY2NDkpO1xyXG5HcmlkX2QzNmUzZmFlNjQxOTQ0NjU4MmNiZWRhNDg4ZDMyOGE3LkNoaWxkcmVuLkFkZChCdXR0b25fYjQ1ZDMwMWEzNjgyNGVmODllODY4NjRiYjJmMWE2OTcpO1xyXG5cclxuXHJcbnRoaXMuQ29udGVudCA9IEdyaWRfZDM2ZTNmYWU2NDE5NDQ2NTgyY2JlZGE0ODhkMzI4YTc7XHJcblxyXG5cclxuXHJcbm91dHB1dCA9IFRleHRCbG9ja18zYWQ0YzhmZDhmMzY0ZjhjOWE1ZjcyM2IwMDFmZjg5NTtcclxub3V0cHV0U2Nyb2xsID0gU2Nyb2xsVmlld2VyXzZkODY1YmMxZTkzNTQ1MjY5Y2ZhNWI3YmRlYTRhYzA5O1xyXG5wYXN0SW5wdXRMaXN0ID0gTGlzdEJveF82MjdiZjNiMmM2MjM0YjEzOTdlOGMyMDcwNjIxZjg1YztcclxuaW5wdXQgPSBUZXh0Qm94X2IyYjZjZTA2MmFjMjRmZGNiODA0MzVlMmY5ZmVmNjQ5O1xyXG5hY3Rpb25CdXR0b24gPSBCdXR0b25fYjQ1ZDMwMWEzNjgyNGVmODllODY4NjRiYjJmMWE2OTc7XHJcblxyXG5cclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbDtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sLkNvbnRyb2xzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIHNlYWxlZCBwYXJ0aWFsIGNsYXNzIEFwcCA6IEFwcGxpY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFwcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVDb21wb25lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVudGVyIGNvbnN0cnVjdGlvbiBsb2dpYyBoZXJlLi4uXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpblBhZ2UgPSBuZXcgTWFpblBhZ2UoKTtcclxuICAgICAgICAgICAgV2luZG93LkN1cnJlbnQuQ29udGVudCA9IG1haW5QYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBiYXNpYyByb29tXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFJvb21cclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSByb29tIG5hbWVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUm9vbU5hbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJvb20gRGVzY3JpcHRpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2hvcnRSb29tRGVzYyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTG9uZ1Jvb21EZXNjIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgTGlzdDxFeGl0PiBFeGl0cyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIEV4aXQgQXV0b0V4aXQgeyBnZXQ7IHNldDsgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIExpc3Q8RXhpdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0V4aXRzPW5ldyBMaXN0PEV4aXQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZsaWdodERhc2hXZWIuQ29tbWFuZHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSb29tIEN1cnJlbnRSb29tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgUGxheWVyIFBsYXllciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lVG9GbGlnaHQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGlzdDxJQ29tbWFuZD4gQ29tbWFuZHMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIEdhbWVPdmVyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2hlY2tlZEluIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEJlbG9uZ2luZ3MgQ3VycmVudEJlbG9uZ2luZ3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVHYW1lKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBUaW1lVG9GbGlnaHQgPSA2MDtcclxuICAgICAgICAgICAgUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICBNYWtlUm9vbXMoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBMb29rKCkpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IEdvKCkpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IENoZWNrSW4oKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgU2VjdXJpdHlDb21tYW5kKCkpO1xyXG4gICAgICAgICAgICBDaGVja2VkSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgQ3VycmVudEJlbG9uZ2luZ3MgPSBCZWxvbmdpbmdzLkFsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBNYWtlUm9vbXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsUm9vbSA9IG5ldyBSb29tXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJIb3RlbCBSb29tXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJBIHByZXR0eSBiYXNpYyBIb3RlbCByb29tLiBOb3RoaW5nIG11Y2ggb3V0IG9mIHRoZSBvcmRpbmFyeSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGhlIGJlZCBpcyB1bm1hZGUsIGxlZnQgaW4gYSBtZXNzIGZyb20geW91ciBydWRlIGF3YWtlbmluZywgYXMgdGhlIGFsYXJtIGJsaW5rcyAxMjowMCBtZXJyaWx5IGF0IHlvdSwgaWdub3JhbnQgb2YgeW91ciBkaXN0cmVzcy5cXHJcXG4gWW91ciBzdWl0Y2FzZSBsYXlzIG9uIHRoZSBmbG9vciBhdCB0aGUgZm9vdCBvZiB0aGUgYmVkLCBuZWF0bHkgcGFja2VkLlxcclxcblwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb3V0c2lkZUhvdGVsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT3V0c2lkZSBIb3RlbFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiT3V0c2lkZSB0aGUgd2VhdGhlciBpcyBjYWxtLCBibHVlIHNraWVzLiBZb3VyIGNhciBzaXRzIGluIHRoZSBhc3NpZ25lZCBwYXJraW5nIHNwb3QgYXdhaXRpbmcgeW91XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkluIHRoZSBkaXN0YW5jZSB5b3Ugc2VlIG9uIHRoZSBmcmVlIHJvYWQgc29tZSBoaW50cyBvZiBhIHRyYWZmaWMgamFtLlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBob3RlbEV4aXQgPSBuZXcgRXhpdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG91dHNpZGVIb3RlbCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgaG90ZWwgZG9vciBoYXMgYSBzaWduIG9uIGl0IHNheWluZyBcXFwiUGxlYXNlIHJlbWVtYmVyIHlvdXIga2V5IHdpbGwgbm90IHdvcmsgb25jZSB5b3VyIGNoZWNrb3V0IHRpbWUgaXMgcGFzdCwgcGxlYXNlIHJlbWVtYmVyIGFsbCB5b3VyIGJlbG9uZ2luZ3NcXFwiXFxyXFxuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJMZWF2aW5nIHRoZSBob3RlbCB5b3UgaGVhciBpdCBsb2NrIGJlaGluZCB5b3UsIGRyb3BwaW5nIHlvdXIga2V5cyBvZmYgYXQgcmVjZXB0aW9uIHlvdSBoZWFkIGludG8gdGhlIGNhcnBhcmsgdG8gcGljayB1cCB5b3VyIHJlbnRhbC5cIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPdXRzaWRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwib3V0c2lkZVwiLCBcImRvb3JcIiwgXCJleGl0XCIsIFwib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gNSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBob3RlbFJvb20uRXhpdHMuQWRkKGhvdGVsRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSW4geW91ciBDYXJcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdXIgcmVudGFsIGlzIGEgYmFzaWMgYXV0b21hdGljIHRyYW5zbWlzc2lvbiBjYXJcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IEBcIk1vZGVyYXRlIHNpemUsIGF0IG1pbmltYWwgY29zdCwgbm8gZmFuY3kgR1BTIG9yIG1lZGlhIGNlbnRlciBmb3IgeW91IG9uIHRoaXMgdHJpcC4gXHJcbiBJdCBpcyBvYnZpb3VzIHRoZSBjYXIgaGFzIHNlZW4gYmV0dGVyIGRheXMsIGFuZCBtdWNoIHdvcnNlIGRyaXZlcnMsIHdpdGggc29tZSBzdGFpbnMgZG90dGVkIG9uIHRoZSBlbXB0eSBwYXNzZW5nZXIgc2VhdCBjdXNoaW9ucy4gXHJcbllvdXIgZGFzaGJvYXJkIGlzIGEgYml0IGRpcnR5IGJ1dCBsb29raW5nIGNsb3NlciB5b3Ugbm90aWNlIHlvdXIgZnVlbCBpcyBvbmx5IGEgdGhpcmQgZnVsbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBjYXIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJlbnRhbCBjYXIgaXMgYSBzbWFsbCwgYW5kIHNsaWdodGx5IGJhdHRlcmVkIHRoaW5nLlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkdW1wIHlvdXIgc3VpdGNhc2UgaW50byB0aGUgdHJ1bmssIGZpbGxpbmcgdGhlIGxpbWl0ZWQgc3BhY2UgYmVmb3JlIHBsb3BwaW5nIHlvdXJzZWxmIGRvd24gaW4gdGhlIGRyaXZlcnMgc2VhdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkNhclwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImNhclwiLCBcImluXCIsIFwicmVudGFsXCIsIFwiZHJpdmVycyBzaWRlXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvdXRzaWRlSG90ZWwuRXhpdHMuQWRkKGNhckV4aXQpO1xyXG4gICAgICAgICAgICAvLyB0b2RvIEFkZCB3YWxrXHJcbiAgICAgICAgICAgIHZhciBvbkZpcnN0Um9hZCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk9uIHRoZSBSb2FkXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgcm9hZCBvdXQgb2YgdGhlIGhvdGVsIGlzIHByZXR0eSBiYXNpYywgc3RyYWlnaHQsIGFuZCB3ZWxsIHNpZ25wb3N0ZWQgdXAgdG8gdGhlIGhpZ2h3YXkuIFwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gQFwiQWhlYWQgb2YgeW91IGlzIGEgc3BsaXQsIHRoZSByb2FkIHRvIHRoZSByaWdodCBpcyBmcmVlLCBidXQgdGhlcmUgc2VlbXMgdG8gYmUgc2lnbnMgb2YgdHJhZmZpYy4gXHJcbldoZXJlYXMgdGhlIHJvYWQgdG8gdGhlIGxlZnQgY29zdHMgeW91ICQ1MCBqdXN0IHRvIGVudGVyLGJ1dCB0YWtlcyB5b3UgZGlyZWN0IHRvIHRoZSBhaXJwb3J0LlwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q2FyID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiT24gdGhlIFdheVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSByb2FkIHRvIHRoZSBhaXJwb3J0IGxvb2tzIHByZXR0eSBvYnZpb3VzIGZyb20gaGVyZVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBvbkZpcnN0Um9hZCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ0byB0aGUgYWlycG9ydFwiLCBcImFpcnBvcnRcIiwgXCJvdXRcIiwgXCJwbGFuZVwiLCBcImZsaWdodFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiRHJpdmluZyBvdXQgb2YgdGhlIGhvdGVsLCB5b3UgIHNvb24gc3BvdCB0aGUgc2lnbiB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2FyLkV4aXRzLkFkZChzdGFydENhcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoTW90b3J3YXkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgVG9sbGJvb3RoIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBsb29rcyBjbGVhciB0aHJvdWdoIHRoZSB3aG9sZSByb3V0ZS4gVGhlIG9jY2FzaW9uYWwgY2FyIHBhc3Nlcywgb3IgaXMgcGFzc2VkIGJ1dCBvdmVyYWxsICBpdCBzdGF5cyBjbGVhciByaWdodCB0aHJvdWdoIHRvIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIEBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoRW50cmFuY2UgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgdG9sbGJvb3RoIHN0YW5kcyBvbiB0aGUgc2lkZSBvZiB0aGUgcm9hZCwgaXQncyBsb25nIGJhciBsb3dlcmVkIGJsb2NraW5nIHRoZSByb3V0ZSBvblwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0b2xsYm9vdGhNb3RvcndheSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gKGRlY2ltYWwpNTAuMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ0b2xsYm9vdGhcIiwgXCJwYWlkXCIsIFwiZmFzdFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKHRvbGxib290aEVudHJhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmVlUm9hZCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk9uIHRoZSBmcmVlIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBpcyBpbiB0aGUgbWlkc3Qgb2YgYSBodWdlIHRyYWZmaWMgamFtLiBDYXIgaG9ybnMgb2YgYWxsIHNvcnRzICwgYW5kIHRoZSBvY2Nhc2lvbmFsIHllbGwgZmlsbHMgdGhlIGFpclwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZnJlZVJvYWRFbnRyYW5jZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkZyZWUgUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBmcmVlIHJvdXRlJ3MgZW50cmFuY2UgbGllcyB1bmJhcnJlZCwgYnV0IHRoZXJlIGlzIGEgaGludCBvZiByZWQgYnJlYWstbGlnaHRzIGluIHRoZSBkaXN0YW5jZSBhbG9uZyBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBmcmVlUm9hZCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJmcmVlXCIsIFwicmlnaHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyByaWdodCwgaW50ZW5kaW5nIHRvIHNhdmUgeW91ciBtb25leSBmb3IgbGF0ZXIsIGhvd2V2ZXIgYSBzaG9ydCB0aW1lIHVwIHRoZSByb2FkIHlvdSBjcmF3bCB0byBhIGhhbHQgYXMgeW91IGhpdCBhIGh1Z2UgdHJhZmZpYyBqYW0sXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKGZyZWVSb2FkRW50cmFuY2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhaXJwb3J0RW50cmFuY2UgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJBaXJwb3J0IERlcGFydHVyZXMgRW50cmFuY2VcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmVzIGVudHJhbmNlIHRvIHRoZSBhaXJwb3J0IGxvb2tzIGEgYml0IGRpbmd5LCBidXQgd2VsbCB0cmF2ZWxlZCwgdGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4gYXMgcGVvcGxlIHN0cmVhbSBpblwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJIZXJlIGFuZCB0aGVyZSBwb3N0ZXJzIGFyZSBvbiB0aGUgd2FsbCwgYWR2ZXJ0aXNpbmcgZmxpZ2h0IGRlYWxzIGZvciB2YXJpb3VzIGNvbXBhbmllcywgYW5kIGEgY291cGxlIHNlY3VyaXR5IGd1YXJkcyBzdGFuZCBuZWFyIHRoZSBlbnRyYW5jZS5cIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvdGhMZWF2ZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggZXhpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHRvbGwgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmVlUm91dGVMZWF2ZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGcmVlIHJvdXRlIGV4aXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMjUsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIHRoZSByb3V0ZSBhbmQgZmluZCB5b3Vyc2VsZiBpbW1lZGlhdGVseSBieSB0aGUgYWlycG9ydCByZW50YWwgZHJvcCBvZmYsIHBhcmtpbmcgeW91ciBjYXIgYW5kIGdyYWJiaW5nIHlvdXIgbHVnZ2FnZSB5b3Ugd2FsayB0aGUgZXh0cmVtZWx5IHNob3J0IGRpc3RhbmNlIHRvIGRlcGFydHVyZXNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdG9sbGJvb3RoTW90b3J3YXkuQXV0b0V4aXQgPSB0b2xsYm90aExlYXZlO1xyXG5cclxuICAgICAgICAgICAgZnJlZVJvYWQuQXV0b0V4aXQgPSBmcmVlUm91dGVMZWF2ZTtcclxuICAgICAgICAgICAgdmFyIHdhbGsgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYWlycG9ydEVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIndhbGtcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZXJlIGlzIGEgd2Fsa2luZyBwYXRoIHRvIHRoZSBhaXJwb3J0IHRoYXQgc2VlbXMgdG8gZ28gdGhyb3VnaCBhIGZldyBmaWVsZHNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJUaGUgd2FsayB0byB0aGUgYWlycG9ydCBpcyBsb25nIGFuZCBhcmR1b3VzLCBhbmQgc2VlbXMgdG8gdGFrZSBhIGxvdCBsb25nZXIgdGhlbiBpdCBsb29rZWQgZnJvbSB0aGUgbWFwIGF0IHRoZSBob3RlbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMjAsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiV2Fsa2luZyBQYXRoXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb3V0c2lkZUhvdGVsLkV4aXRzLkFkZCh3YWxrKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5zaWRlQWlycG9ydCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkluc2lkZSB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiSW5zaWRlIHRoZSBhaXJwb3J0IHRoaW5ncyBhcmUgcXVpdGUgYnVzeSwgdG8gdGhlIGxlZnQgYXJlIHRoZSBjaGVjay1pbiBkZXNrcyB3aGlsZSB0byB0aGUgcmlnaHQgaXMgdGhlIFRTQSBxdWV1ZS5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiQnkgdGhlIFRTQSBxdWV1ZSBlbnRyYW5jZSBpcyBhIHNpZ24gc2F5aW5nIFxcXCJCdXkgVFNBIFByZUNoZWNrIHRvIHVzZSB0aGlzIHNob3J0ZXIgcXVldWUuIE9ubHkgJDg1XFxcIiBOZXh0IHRvIGEgYmFycmllciAgbGVhZGluZyB0byBhIG11Y2ggc2hvcnRlciBxdWV1ZVwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdvSW5zaWRlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGluc2lkZUFpcnBvcnQsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiSW5zaWRlIEFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgZG9vcnMgYXJlIHdpZGUgb3BlbiwgdGhlIG9ubHkgb2JzdGFjbGUgYmVpbmcgdGhlIHN0cmVhbSBvZiBwZW9wbGUgZ29pbmcgb24gdGhlaXIgdHJhdmVsIHBsYW5zXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGdvIHRocm91Z2ggdGhlIGRvb3JzLCBtYW5hZ2luZyB0byBhdm9pZCBnZXR0aW5nIGpvc3RsZWQgYWJvdXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJpblwiLCBcImluc2lkZVwiLCBcImluZG9vcnNcIiwgXCJlbnRlclwiLCBcImVudHJhbmNlXCIsIFwiYWlycG9ydFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFpcnBvcnRFbnRyYW5jZS5FeGl0cy5BZGQoZ29JbnNpZGUpO1xyXG4gICAgICAgICAgICB2YXIgdHNhRW50cmFuY2UgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJUU0EgRW50cnlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdSBoZWFkIHRvd2FyZHMgdGhlIFRTQSBTZWN1cml0eSBDaGVja3BvaW50LCBpdCBzZWVtcyB0byBiZSBzcGxpdCBpbnRvIHR3bywgYSBxdWljayBQcmVDaGVjayBhcmVhLCBhbmQgYSBzbG93IGFyZWFcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IEBcIk5lYXIgdGhlIHF1aWNrIHpvbmUgaXMgYSBzaWduLCBzcGVhayB0byBhIFRTQSBPZmZpY2VyIHRvIGJ1eSBhIHNpbmdsZS11c2UgVFNBIFByZUNoZWNrIGFjY2Vzcywgb25seSAkODUsIFxyXG5EbyB5b3UgY2hvb3NlIHRvIGJ1eSBUU0EgUHJlQ2hlY2ssIG9yIGRvIHlvdSB1c2UgdGhlIGdlbmVyYWwgcXVldWU/XHJcblwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb1RvVHNhID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiAhZ2FtZS5DaGVja2VkSW4sXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiVGhlIGd1YXJkIGF0IHRoZSBmcm9udCBvZiB0aGUgcXVldWUgbG9va3MgYXQgeW91IGZsYXRseSBhc2tpbmcgZm9yIHlvdXIgYm9hcmRpbmcgcGFzcywgbG9va2luZyBiYWNrIGZvciBhIHNlY29uZCB5b3UgZmFjZS1wYWxtIGJlZm9yZSBsZWF2aW5nIHRvIGRvIHNvXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRzYUVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRTQSBFbnRyYW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIlRTQVwiLCBcInJpZ2h0XCIsIFwic2VjdXJpdHlcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBFbnRyYW5jZSB0byB0aGUgVFNBIGFyZWEgaXMgbGFyZ2UsIGJ1dCBndWFyZGVkIGJ5IGEgY291cGxlIG1lbiBjaGVja2luZyBib2FyZGluZyBwYXNzZXNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ2V0IGluIGxpbmUsIHNob3dpbmcgeW91ciBib2FyZGluZyBwYXNzIHRvIHRoZSBndWFyZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoZWNrSW5EZXNrID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVGhlIENoZWNrLWluIERlc2tcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBjaGVjay1pbiBkZXNrIGZpbmFsbHkgaW4gdmlldywgdGhlIHdvbWFuIHNhdCBpbiBmcm9udCBhc2tzIHlvdSB0byAnY2hlY2sgaW4nIHdpdGggYSBzbWlsZVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJOZWFyIHRoZSBkZXNrIGlzIGEgY291cGxlIGxlYWZsZXRzIGFib3V0IGNhcnJ5IG9uIHNpemUgYW5kIHdoYXQgaXMgYW5kIGlzbnQgYWxsb3dlZFwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb3RvQ2hlY2tpbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkNoZWNraW4gbGluZVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBjaGVja0luRGVzayxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJjaGVja2luXCIsIFwiY2hlY2tcIiwgXCJkZXNrXCIsIFwibGVmdFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGxpbmUgdG8gdGhlIGNoZWNrLWluIGRlc2sgaXMgcXVpdGUgbG9uZywgYnV0IG5vdCB1bndpZWxkeVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIldhaXRpbmcgaW4gdGhlIGxpbmUsIGl0IG1vdmVzIGF0IGEgbW9kZXJhdGUgcGFjZSwgYW5kIHNvb24gZW5vdWdoIHlvdSBhcmUgYXQgdGhlIGNoZWNrLWluIGRlc2tcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gNVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlYXZlQ2hlY2tpbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkxlYXZlIGNoZWNrLWluXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiAhZ2FtZS5DaGVja2VkSW4sXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiQWZ0ZXIgZmluYWxseSBnZXR0aW5nIHRvIHRoZSBlbmQgb2YgdGhlIGNoZWNrLWluIGxpbmUgeW91IHJlYWxpemUgeW91IGZvcmdvdCB5b3VyIHN1aXRjYXNlIG5lYXIgdGhlIHN0YXJ0LCB3aXRoIGFuIGFubm95ZWQgc2lnaCB5b3UgZ28gYmFjayB0byBnZXQgaXRcIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJyaWdodFwiLCBcIm91dFwiLCBcImJhY2tcIiB9LFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBpbnNpZGVBaXJwb3J0LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSB3YXkgb3V0IG9mIGNoZWNrLWluIGlzIGEgc21hbGwgYWxsZXl3YXkgYmV0d2VlbiB0aGUgZGVza3NcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgY2hlY2staW4gZm9sbG93aW5nIHRoZSBsaW5lcywgYW5kIHNvb24gZmluZCB5b3Vyc2VsZiBiYWNrIHdoZXJlIHlvdSBzdGFydGVkIGluIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2hlY2tJbkRlc2suRXhpdHMuQWRkKGxlYXZlQ2hlY2tpbik7XHJcbiAgICAgICAgICAgIGluc2lkZUFpcnBvcnQuRXhpdHMuQWRkKGdvdG9DaGVja2luKTtcclxuXHJcbiAgICAgICAgICAgIGluc2lkZUFpcnBvcnQuRXhpdHMuQWRkKGdvVG9Uc2EpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByZUNoZWNrID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgUHJlQ2hlY2sgem9uZSBpcyBuaWNlIGFuZCBxdWljaywgeW91IGR1bXAgeW91ciBiYWNrcGFjayBvbiB0aGUgeHJheSBiZWx0IGJlZm9yZSB5b3UgZ28gdGhyb3VnaCB0aGUgc2Nhbm5lciB3aXRob3V0IG5lZWRpbmcgdG8gdGFrZSBvZmYgeW91ciBiZWx0IGFuZCBzaG9lc1wiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJBcyB5b3UgcGljayB1cCB5b3VyIGJhY2twYWNrIG9mZiB0aGUgeHJheSBiZWx0LCB5b3Ugc21lbGwgYnVycml0b3MgZnJvbSB0aGUgTWV4aWNhbiBmb29kIHN0YW5kIG9wcG9zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiUHJlQ2hlY2tcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHByZUNoZWNrRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlByZUNoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHByZUNoZWNrLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBQcmVDaGVjayBTZWN1cml0eSBxdWV1ZSB3b3VsZCBiZSBxdWlja2VyLCBidXQgaXQgd2lsbCBjb3N0IHlvdS4gSXQgbG9va3MgbGlrZSB0aGVyZXMgb25seSBvbmUgb3RoZXIgcGFzc2VuZ2VyIGhlYWRpbmcgZm9yIGl0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IHBheSB0aGUgJDg1IGZlZSBmcm9tIHlvdXIgYnVkZ2V0LCBhbmQgdGhlIFRTQSBPZmZpY2VyIHdhdmVzIHlvdSB0byB0aGUgUHJlQ2hlY2sgU2VjdXJpdHkgWm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSA4NSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMyxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJwcmVjaGVja1wiLCBcInNob3J0XCIsIFwicGF5XCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0c2FFbnRyYW5jZS5FeGl0cy5BZGQocHJlQ2hlY2tFeGl0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZW5lcmFsU2VjdXJpdHkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJHZW5lcmFsIFNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJFdmVudHVhbGx5IHlvdSBnZXQgdG8gdGhlIHNlY3VyaXR5IGRlc2sgYW5kIGEgVFNBIE9mZmljZXIgZ2l2ZXMgeW91IHR3byB0cmF5cyBhbmQgdGVsbHMgeW91IHRvICdlbXB0eSBwb2NrZXRzJyAncmVtb3ZlIGJlbHQnICdyZW1vdmUgc2hvZXMnIGFuZCAncGxhY2UgYmFja3BhY2snIGluIG9uZSB0cmF5LCBhbmQgJ3JlbW92ZSBlbGVjdHJvbmljcycgaW50byBhbm90aGVyIHRyYXkuXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIllvdSBqb3N0bGUgeW91ciB3YXkgZm9yd2FyZCB0byBhIHRhYmxlLCBzbyB0aGF0IHlvdSBjYW4gZ2V0IHJlYWR5IHRvIGJlIGNsZWFyZWQgdGhyb3VnaCBzZWN1cml0eVwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2VuZXJhbEV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJHZW5lcmFsIFNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGdlbmVyYWxTZWN1cml0eSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGVyZSdzIGEgbG9uZyBxdWV1ZSBmb3IgdGhlIEdlbmVyYWwgU2VjdXJpdHksIGV2ZXJ5b25lIGlzIHRha2luZyB0aGVpciBzaG9lcyBhbmQgYmVsdHMgb2ZmIGFuZCB0YWtpbmcgdGhlIGVsZWN0cm9uaWNzIG91dCBvZiB0aGVpciBiYWdzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGRlY2lkZSB0byBzYXZlIHlvdXIgY2FzaCwgYW5kIGpvaW4gdGhlIGhvcmRlIG9mIHRyYXZlbGxlcnMgbWFraW5nIHRoZWlyIHdheSB0byB0aGUgR2VuZXJhbCBTZWN1cml0eSB6b25lXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDE1LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZyZWVcIiwgXCJnZW5lcmFsXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0c2FFbnRyYW5jZS5FeGl0cy5BZGQoZ2VuZXJhbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlcm1pbmFsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVGVybWluYWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmUgdGVybWluYWwgYmV5b25kIFRTQSBpcyBidXN0bGluZyB3aXRoIGFjdGl2aXR5LCBwZW9wbGUsIGFuZCBzbWVsbHMgb2YgYWxsIHNoYXBlcyBhbmQgc2l6ZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgZm9vZCBzaG9wcyBhcmUgZG90dGVkIGFyb3VuZCwgZW5zdXJpbmcgeW91IGFyZSBuZXZlciB0b28gZmFyIGF3YXkgZnJvbSBvbmUuIFwiICsgRW52aXJvbm1lbnQuTmV3TGluZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBCYWtlcnkgYW5kIHRoZSBNZXhpY2FuIHBsYWNlIGxvb2sgZXNwZWNpYWxseSBpbnRlcmVzdGluZy4gVGhlIHNpZ24gb24gdGhlIGNlaWxpbmcgc2hvd3MgTG91bmdlIHRvIHRoZSByaWdodCwgYW5kIHlvdXIgZ2F0ZSBudW1iZXIgYSB0aW55IGJpdCB0byB0aGUgbGVmdFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0xlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZpbmlzaFwiLCBcIm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRlcm1pbmFsLCB3aXRoIHRoZSBzaG9wcywgZm9vZCBzdGFsbHMsIGFuZCB3YWl0aW5nIGFyZWFzLCBhcmUgbGFpZCBvdXQgYmVmb3JlIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSB0aGFuayB0aGUgVFNBIE9mZmljZXIgYXMgeW91IGxlYXZlIGFuZCBoZWFkIGludG8gdGhlIEFpcnBvcnQgRGVwYXJ0dXJlcyBUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByZUNoZWNrLkV4aXRzLkFkZChwcmVDaGVja0xlYXZlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZW5lcmFsRXhpdExlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiBnYW1lLkN1cnJlbnRCZWxvbmdpbmdzICE9IEJlbG9uZ2luZ3MuTm9uZSxcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJUaGUgVFNBIE9mZmljZXIgZ3J1bnRzIGF0IHlvdSBhbmQgc3RhcmVzIHlvdSBkb3duLiBcXFwiRW1wdHkgeW91ciBwb2NrZXRzLCB0YWtlIHlvdXIgc2hvZXMgb2ZmLCB0YWtlIHlvdXIgYmVsdCBvZmYsIGVtcHR5IHlvdXIgZWxlY3Ryb25pY3MgYW5kIHBsYWNlIHlvdXIgYmFja3BhY2sgaW50byB0aGUgdHJheSwgQkVGT1JFIGdvaW5nIHRocm91Z2ggc2VjdXJpdHkhXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDYsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSB0ZXJtaW5hbCwgd2l0aCB0aGUgc2hvcHMsIGZvb2Qgc3RhbGxzLCBhbmQgd2FpdGluZyBhcmVhcywgYXJlIGxhaWQgb3V0IGJlZm9yZSB5b3VcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgdGhhbmsgdGhlIFRTQSBPZmZpY2VyIGFzIHlvdSBsZWF2ZSBhbmQgaGVhZCBpbnRvIHRoZSBBaXJwb3J0IERlcGFydHVyZXMgVGVybWluYWxcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gNixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJmaW5pc2hcIiwgXCJvdXRcIiB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnZW5lcmFsU2VjdXJpdHkuRXhpdHMuQWRkKGdlbmVyYWxFeGl0TGVhdmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1leGljYW4gPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJNZXhpY2FuIGZvb2RcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdSBnbyB0b3dhcmRzIHRoZSBtZXhpY2FuIGZvb2Qgc3RhbGwgYXMgYSB3b3JrZXIgbG9va3MgdXAgYW5kIHNtaWxlcyBhdCB5b3UuIE9uIHRoZSBjb3VudGVyIGlzIGEgc2lnbiB0aGF0IHJlYWRzIFxcXCJEZXZlbG9wZXJzJyBGYXZvdXJpdGU6IEJyZWFrZmFzdCBCdXJyaXRvICQxMFxcXCIsIGJlaGluZCB0aGUgd29ya2VyIGlzIGEgc29kYSBmb3VudGFpblwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJZb3Ugbm90aWNlIGEgaG9sZGVyIGF0IHRoZSBlbmQgb2YgdGhlIGNvdW50ZXIsIGNvbnRhaW5pbmcgZGlzcG9zYWJsZSBjdXRsZXJ5XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXlNZXhpY2FuID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiQnV5IEJ1cnJpdG9cIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJidXlcIiwgXCJidXJyaXRvXCIgfSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiU3RvbWFjaCBncnVtYmxpbmcsIHlvdSBvcmRlciB0aGUgQnJlYWtmYXN0IEJ1cnJpdG8gYW5kIGEgc29hLCB0aGUgd29ya2VyIGdvZXMgYW5kIG1ha2VzIG9uZSBmb3IgeW91LCByZXR1cm5pbmcgYWZ0ZXIgYSBmZXcgbWludXRlcywgc2hlIHBhc3NlcyB5b3UgYSBmb2lsLXdyYXBwZWQgZ2lmdCwgYW5kIGEgY3VwIG9mIFN0cmF3YmVycnkgZmxhdm9yZWQgU29kYS4gXFxcIiQxMyBwbGVhc2VcXFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDEzLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1leGljYW4uRXhpdHMuQWRkKGJ1eU1leGljYW4pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvTWV4aWNhbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlZpc2l0IE1leGljYW4gU3RvcmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJtZXhpY2FuXCIsIFwiYnVycml0b1wiIH0sXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG1leGljYW4sXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIFN0YWxsIGlzIGRvbmUgdXAgaW4gc3RlcmVvdHlwaWNhbCBtZXhpY2FuIHN0eWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkZWNpZGUgdG8gZ28gbG9vayBvdmVyIHdoYXQga2luZCBvZiBidXJyaXRvcyB0aGUgbWV4aWNhbiBwbGFjZSBzZWxscy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ29NZXhpY2FuKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBiYWtlcnkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJCYWtlcnlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBzbWFsbCBiYWtlcnkgY2F0Y2hlcyB5b3VyIGV5ZSwgYW5kIHlvdSBlbnRlciwgdGhlIHNtZWxsIG9mIHdhcm0gYnJlYWQgZW50aWNpbmcgeW91LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJUaGUgc29sZSBzdGFmZi1tZW1iZXIgd2VsY29tZXMgeW91LiBZb3UgY2FuIHNlZSBoZXIgbmFtZXRhZyByZWFkcyAnTWlzaHkgLSBIZWFkIEJha2VyJ1wiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXlCYWtlcnkgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPcmRlciBmb29kXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RvbWFjaCBncnVtYmxpbmcsIHlvdSBvcmRlciBhIGJhZ2VsIGFuZCBPcmFuZ2UgSnVpY2UsIE1pc2h5IGdyYWJzIHlvdSBhIGJhZ2VsIGFuZCBwb3VycyB5b3UgYSBjdXAgb2YgZnJlc2ggb3JhbmdlIGp1aWNlLCBwYXNzaW5nIGl0IG92ZXIgdGhlIGNvdW50ZXIgd2l0aCBhIHNtaWxlLiBcXFwiJDYgcGxlYXNlXFxcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSA2LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJha2VyeS5FeGl0cy5BZGQoYnV5QmFrZXJ5KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb0Jha2VyeSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlZpc2l0IEJha2VyeVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBCYWtlcnkgbG9va3Mgd2FybSwgYW5kIGludml0aW5nLCB3aXRoIGEgc29mdCBzY2VudCBvZiBmcmVzaCBicmVhZCB3YWZ0aW5nIGZyb20gaXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gaW50byB0aGUgYmFrZXJ5LCBlbmpveWluZyB0aGUgYW1iaWFuY2UgcHJvdmlkZWRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYmFrZXJ5LFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChnb0Jha2VyeSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG91bmdlRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRoZSBMb3VuZ2VcIixcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+IHRydWUsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiWW91IHdhbmRlciBvZmYgdG8gdGhlIGxvdW5nZSwgaG9waW5nIHlvdSBtYXkgYmUgYWJsZSB0byB0YWxrIHlvdXIgd2F5IGluIG9uIHRoaXMgZWNvbm9teSB0aWNrZXQsIHNhZGx5IGhvd2V2ZXIgYXMgeW91IHRyeSB0byB0YWxrIHRoZSBhdHRlbmRlbnQgaW50byBpdCwgc2hlIGlzIGhhdmluZyBub25lIG9mIGl0IGFuZCByZWZ1c2VzIHlvdSBlbnRyeS5cIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQobG91bmdlRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2F0ZSA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkdhdGUgNDJcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiR2F0ZSA0MyBsb29rcyBsaWtlIHByZXR0eSBtdWNoIGV2ZXJ5IG90aGVyIGdhdGUsIGJ1dCBhIHF1aWNrIGNoZWNrIG9mIHlvdXIgYm9hcmRpbmcgcGFzcyBzaG93cyB0aGlzIG9uZSBpcyB5b3Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBsaW5lIHNlZW1zIHRvIGJlIHF1aXRlIHNob3J0LCBzZWVtcyBub3QgbWFueSBwZW9wbGUgd2FudCB0byBnbyB0aGUgc2FtZSBwbGFjZSBhcyB5b3UgdG9kYXlcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgRW5kU2NyZWVuID0gbmV3IEVuZFNjcmVlblJvb20odGhpcyk7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpbGwgdGhpcyBpblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZ2F0ZUV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJJbiB0aGUgQWlycGxhbmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIEdhdGUgYW5kIHNvb24geW91IGFyZSBvbiB0aGUgYWlycGxhbmUuIFlvdXIgc2VhdCBpcyBhcyBjcmFtcGVkIGFzIHVzdWFsLCBidXQgaXQgZmVlbHMgbGlrZSBhIHRocm9uZSB0b2RheVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBFbmRTY3JlZW4sXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ2F0ZUV4aXQpO1xyXG4gICAgICAgICAgICBnYXRlLkF1dG9FeGl0ID0gZ2F0ZUV4aXQ7XHJcblxyXG4gICAgICAgICAgICBDdXJyZW50Um9vbSA9IGhvdGVsUm9vbTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSb29tVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXkxXCIpLlJvb21OYW1lOihzdHJpbmcpbnVsbCkgPz8gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Um9vbUhlYWRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIHZhciByb29tTmFtZSA9IChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXkyXCIpLlJvb21OYW1lOihzdHJpbmcpbnVsbCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHJvb21OYW1lKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHN0cmluZy5Gb3JtYXQoXCJUaW1lIHRvIEZsaWdodDogezA6RDJ9OnsxOkQyfVwiLFRpbWVUb0ZsaWdodCAvIDYwLFRpbWVUb0ZsaWdodCAlIDYwKSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShzdHJpbmcuRm9ybWF0KFwiTW9uZXk6IHswOkN9XCIsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIsUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTNcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NFwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXk0XCIpLlNob3J0Um9vbURlc2M6KHN0cmluZyludWxsKSA/PyBcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuVG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlSW5wdXQoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIG91dHB1dFRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlNvcnJ5LCB0aGlzIGdhbWUgaXMgb3ZlclwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbW1hbmRTcGxpdCA9IGlucHV0LlNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjb21tYW5kIGluIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8SUNvbW1hbmQ+KENvbW1hbmRzLChGdW5jPElDb21tYW5kLGJvb2w+KShjb21tYW5kID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjb21tYW5kLkdldENvbW1hbmRBbGlhc2VzKCksY29tbWFuZFNwbGl0WzBdLlRvTG93ZXIoKSkpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuVHJ5UGFyc2VDb21tYW5kKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxzdHJpbmc+KGNvbW1hbmRTcGxpdCwxKSksIHRoaXMsIG91dCBvdXRwdXRUZXh0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRpbWVUb0ZsaWdodCA8PSAwIHx8IFBsYXllci5Nb25leSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0VGV4dCA9IFwiU29ycnksIGl0IHNlZW1zIHlvdSBcIiArIChUaW1lVG9GbGlnaHQgPD0gMCA/IFwicmFuIG91dCBvZiB0aW1lXCIgOiBcInJhbiBvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYXJzZUlucHV0KHN0cmluZyBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBMaXN0PElDb21tYW5kPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29tbWFuZHM9bmV3IExpc3Q8SUNvbW1hbmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuU3lzdGVtO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWw7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbC5Db250cm9scztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEdhbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTWFpblBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIEdhbWUuSW5pdGlhbGl6ZUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gR2FtZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYWN0aW9uQnV0dG9uX0NsaWNrKG9iamVjdCBzZW5kZXIsIFJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSGFuZGxlSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBpbnB1dF9LZXlEb3duKG9iamVjdCBzZW5kZXIsIFdpbmRvd3MuVUkuWGFtbC5JbnB1dC5LZXlSb3V0ZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGUuS2V5PT1WaXJ0dWFsS2V5LkVudGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSGFuZGxlSW5wdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5JdGVtcy5BZGQoaW5wdXQuVGV4dCk7XHJcbiAgICAgICAgICAgIHBhc3RJbnB1dExpc3QuU2VsZWN0ZWRJbmRleCA9IHBhc3RJbnB1dExpc3QuSXRlbXMuQ291bnQgLSAxO1xyXG5zdHJpbmcgb3V0cHV0VGV4dDtcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBHYW1lLlRyeVBhcnNlSW5wdXQoaW5wdXQuVGV4dCwgb3V0IG91dHB1dFRleHQpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBcIj4gXCIgKyBpbnB1dC5UZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IG91dHB1dFRleHQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5UZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIEdhbWUgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0dhbWU9bmV3IEdhbWUoKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBsYXllclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVjaW1hbCBNb25leSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Nb25leSA9IDEyNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGVja0luOklDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjaGVjay1pblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7XCJjaGVja1wifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIitFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50c1swXSAhPSBcImluXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiSSBoYXZlIG5vdGhpbmcgdG8gY2hlY2suXCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyU3RhdGUuUm9vbVRpdGxlKCkuVG9Mb3dlcigpICE9IFwidGhlIGNoZWNrLWluIGRlc2tcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJTb3JyeSwgeW91IGNhbiBub3QgY2hlY2sgaW4gaGVyZVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJTdGF0ZS5DaGVja2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBleGl0ID0gY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHNbMF07XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgZXhpdC5FeGl0VGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRSb29tID0gZXhpdC5EZXN0aW5hdGlvbjtcclxuICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGV4aXQuRXhpdFRpbWU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlBsYXllci5Nb25leSAtPSBleGl0LkV4aXRDb3N0O1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdvOiBJQ29tbWFuZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiR29cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBHZXRDb21tYW5kQWxpYXNlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W10ge1wiZ29cIiwgXCJoZWFkXCIsIFwid2Fsa1wiLCBcImRyaXZlXCIsIFwiZ2V0IGluXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIlNvcnJ5LCBJbnZhbGlkIGRlc3RpbmF0aW9uIG9yIGNvbW1hbmQgZm9ybWF0XCIrRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGN1cnJlbnRSb29tRXhpdCBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPEV4aXQ+KGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzLChGdW5jPEV4aXQsYm9vbD4pKGN1cnJlbnRSb29tRXhpdCA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY3VycmVudFJvb21FeGl0LkV4aXROYW1lcyxjb21tYW5kQXJndW1lbnRzWzBdLlRvTG93ZXIoKSkpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSb29tRXhpdC5FeGl0TG9ja2VkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzTG9ja2VkID0gY3VycmVudFJvb21FeGl0LkV4aXRMb2NrZWQoY3VyU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0xvY2tlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IGN1cnJlbnRSb29tRXhpdC5Mb2NrVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGN1cnJlbnRSb29tRXhpdC5Mb2NrVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IEVudmlyb25tZW50Lk5ld0xpbmUgKyBjdXJTdGF0ZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IGN1cnJlbnRSb29tRXhpdC5FeGl0VGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5DdXJyZW50Um9vbSA9IGN1cnJlbnRSb29tRXhpdC5EZXN0aW5hdGlvbjtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBjdXJyZW50Um9vbUV4aXQuRXhpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5QbGF5ZXIuTW9uZXkgLT0gY3VycmVudFJvb21FeGl0LkV4aXRDb3N0O1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyU3RhdGUuQ3VycmVudFJvb20uQXV0b0V4aXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpdCA9IGN1clN0YXRlLkN1cnJlbnRSb29tLkF1dG9FeGl0O1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgZXhpdC5FeGl0VGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudFJvb20gPSBleGl0LkRlc3RpbmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBleGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLlBsYXllci5Nb25leSAtPSBleGl0LkV4aXRDb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBjdXJTdGF0ZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiSW52YWxpZCBkZXN0aW5hdGlvblwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTG9vazpJQ29tbWFuZFxyXG4gICAge1xyXG5wdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxue1xyXG4gICAgcmV0dXJuIFwiTG9va1wiO1xyXG59cHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxue1xyXG4gICAgcmV0dXJuIG5ld1tde1wibG9va1wiLCBcImxcIiwgXCJwZWVyXCIsIFwic3RhcmVcIiwgXCJleGFtaW5lXCJ9O1xyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJMb29rIGF0IGFuIGl0ZW1cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPVxyXG5zdHJpbmcuRm9ybWF0KFwiezB9ezF9ezJ9XCIsY3VyU3RhdGUuQ3VycmVudFJvb20uU2hvcnRSb29tRGVzYyxFbnZpcm9ubWVudC5OZXdMaW5lLGN1clN0YXRlLkN1cnJlbnRSb29tLkxvbmdSb29tRGVzYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzWzBdLlRvTG93ZXIoKSA9PSBcImF0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEFyZ3VtZW50cyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxzdHJpbmc+KGNvbW1hbmRBcmd1bWVudHMsMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvTG9vayA9IGNvbW1hbmRBcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY3VycmVudFJvb21FeGl0IGluIGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY3VycmVudFJvb21FeGl0LkV4aXROYW1lcyx0b0xvb2suVG9Mb3dlcigpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH17MX1cIixjdXJyZW50Um9vbUV4aXQuRXhpdERlc2MsRW52aXJvbm1lbnQuTmV3TGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2VjdXJpdHlDb21tYW5kOklDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJTZWN1cml0eVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7IFwicmVtb3ZlXCIsXCJwbGFjZVwiLFwiZW1wdHlcIn07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBiZWxvbmdpbmcgaW4gRW51bS5HZXRWYWx1ZXModHlwZW9mKEJlbG9uZ2luZ3MpKS5DYXN0PEJlbG9uZ2luZ3M+KCkpICBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJlbG9uZ2luZy5Ub1N0cmluZygpLlRvTG93ZXIoKSA9PSBjb21tYW5kQXJndW1lbnRzWzBdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRCZWxvbmdpbmdzIF49IGJlbG9uZ2luZztcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlbG9uZ2luZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5TaG9lczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSByZW1vdmUgeW91ciBzaG9lcyBhbmQgcHV0IHRoZW0gb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkJlbHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJZb3UgcmVtb3ZlIHlvdXIgYmVsdCBhbmQgcHV0IGl0IG9uIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5CYWNrcGFjazpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSB0YWtlIG9mZiB5b3VyIGJhY2twYWNrIGFuZCBwdXQgaXQgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLlBvY2tldHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJZb3UgZW1wdHkgeW91ciBwb2NrZXRzIGFuZCBwdXQgdGhlIGNvbnRlbnRzIG9uIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5FbGVjdHJvbmljczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSBlbXB0eSB5b3VyIGVsZWN0cm9uaWNzIG91dCBvbnRvIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIkkgZG8gbm90IGhhdmUgdGhhdFwiK0Vudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBjbGFzcyBFbmRTY3JlZW5Sb29tIDogUm9vbVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEN1clN0YXRlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZFNjcmVlblJvb20oR2FtZSBnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DdXJTdGF0ZSA9IGdhbWU7XHJcbiAgICAgICAgfVxyXG5wdWJsaWMgbmV3IHN0cmluZyBTaG9ydFJvb21EZXNjXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQ29uZ3JhdHVsYXRpb25zLCB5b3Ugd29uISBZb3UgaGFkIHswOkQyfTp7MTpEMn0gcmVtYWluaW5nLCBhbmQgezI6Q30gcmVtYWluaW5nXCIsQ3VyU3RhdGUuVGltZVRvRmxpZ2h0IC8gNjAsQ3VyU3RhdGUuVGltZVRvRmxpZ2h0ICUgNjAsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsQ3VyU3RhdGUuUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTFcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApO1xyXG4gICAgfVxyXG59ICAgIH1cclxufVxyXG4iXQp9Cg==
