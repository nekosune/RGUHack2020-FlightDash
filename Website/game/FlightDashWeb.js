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


                var ResourceDictionary_b67f33039048495bb445b8c00b17f2c2 = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_b67f33039048495bb445b8c00b17f2c2;

                this.Resources = ResourceDictionary_b67f33039048495bb445b8c00b17f2c2;







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
        },
        methods: {
            toString: function () {
                return System.String.format("{0}", [this.ExitName]);
            }
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

                var carExit = ($t = new FlightDashWeb.Exit(), $t.Destination = car, $t.ExitDesc = "The rental car is a small, and slightly battered thing.", $t.ExitText = "You dump your suitcase into the trunk, filling the limited space before plopping yourself down in the drivers seat", $t.ExitName = "Car", $t.ExitNames = System.Array.init(["car", "in", "rental", "drivers"], System.String), $t.ExitTime = 1, $t.ExitCost = System.Decimal(0), $t);
                outsideHotel.Exits.add(carExit);
                var onFirstRoad = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the Road", $t.ShortRoomDesc = "The road out of the hotel is pretty basic, straight, and well signposted up to the highway. ", $t.LongRoomDesc = "Ahead of you is a split, the road to the right is free, but there seems to be signs of traffic. \r\nWhereas the road to the left costs you $50 just to enter,but takes you direct to the airport.", $t);

                var startCar = ($t = new FlightDashWeb.Exit(), $t.ExitName = "On the Way", $t.ExitDesc = "The road to the airport looks pretty obvious from here", $t.Destination = onFirstRoad, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["airport", "airport", "out", "plane", "flight"], System.String), $t.ExitText = "Driving out of the hotel, you  soon spot the sign to the airport", $t.ExitTime = 10, $t);
                car.Exits.add(startCar);

                var tollboothMotorway = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the Tollbooth route", $t.ShortRoomDesc = "The highway looks clear through the whole route. The occasional car passes, or is passed but overall  it stays clear right through to the airport", $t.LongRoomDesc = "", $t);

                var tollboothEntrance = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Tollbooth Route", $t.ExitDesc = "The tollbooth stands on the side of the road, it's long bar lowered blocking the route on", $t.Destination = tollboothMotorway, $t.ExitCost = System.Decimal(50.0), $t.ExitNames = System.Array.init(["tollbooth", "paid", "fast"], System.String), $t.ExitTime = 0, $t);
                onFirstRoad.Exits.add(tollboothEntrance);

                var freeRoad = ($t = new FlightDashWeb.Room(), $t.RoomName = "On the free route", $t.ShortRoomDesc = "The highway is in the midst of a huge traffic jam. Car horns of all sorts , and the occasional yell fills the air", $t.LongRoomDesc = "", $t);
                var freeRoadEntrance = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Free Route", $t.ExitDesc = "The free route's entrance lies unbarred, but there is a hint of red break-lights in the distance along it", $t.Destination = freeRoad, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["free", "right"], System.String), $t.ExitText = "You go right, intending to save your money for later, however a short time up the road you crawl to a halt as you hit a huge traffic jam,", $t.ExitTime = 0, $t);
                onFirstRoad.Exits.add(freeRoadEntrance);


                var airportEntrance = ($t = new FlightDashWeb.Room(), $t.RoomName = "Airport Departures Entrance", $t.ShortRoomDesc = "The departures entrance to the airport looks a bit dingy, but well traveled, the doors are wide open as people stream in", $t.LongRoomDesc = "Here and there posters are on the wall, advertising flight deals for various companies, and a couple security guards stand near the entrance.", $t);

                var tollbothLeave = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init(["leave"], System.String), $t.ExitName = "Tollbooth exit", $t.ExitDesc = "", $t.ExitTime = 10, $t.ExitText = "You leave the toll route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures", $t.ExitCost = System.Decimal(5), $t);

                var freeRouteLeave = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init(["leave"], System.String), $t.ExitName = "Free route exit", $t.ExitDesc = "", $t.ExitTime = 25, $t.ExitText = "You leave the route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures", $t.ExitCost = System.Decimal(0), $t);

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

                var buyBakery = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Order food", $t.ExitDesc = "", $t.Destination = terminal, $t.ExitText = "Stomach grumbling, you order a bagel and Orange Juice, Mishy grabs you a bagel and pours you a cup of fresh orange juice, passing it over the counter with a smile. \"$6 please\"", $t.ExitCost = System.Decimal(6), $t.ExitTime = 4, $t.ExitNames = System.Array.init(["order", "bakery", "bread", "bagel"], System.String), $t);
                bakery.Exits.add(buyBakery);

                var goBakery = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Visit Bakery", $t.ExitDesc = "The Bakery looks warm, and inviting, with a soft scent of fresh bread wafting from it", $t.ExitText = "You go into the bakery, enjoying the ambiance provided", $t.ExitTime = 1, $t.Destination = bakery, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["bakery", "mishy", "bread"], System.String), $t);
                terminal.Exits.add(goBakery);

                var loungeExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "The Lounge", $t.ExitLocked = function (game) {
                    return true;
                }, $t.LockText = "You wander off to the lounge, hoping you may be able to talk your way in on this economy ticket, sadly however as you try to talk the attendent into it, she is having none of it and refuses you entry.", $t.LockTime = 5, $t.ExitNames = System.Array.init(["lounge", "gold"], System.String), $t);
                terminal.Exits.add(loungeExit);

                var gate = ($t = new FlightDashWeb.Room(), $t.RoomName = "Gate 42", $t.ShortRoomDesc = "Gate 43 looks like pretty much every other gate, but a quick check of your boarding pass shows this one is yours", $t.LongRoomDesc = "The line seems to be quite short, seems not many people want to go the same place as you today", $t);

                var EndScreen = new FlightDashWeb.EndScreenRoom(this);
                {
                }
                ;
                var gateExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "In the Airplane", $t.ExitDesc = "", $t.ExitText = "You leave the Gate and soon you are on the airplane. Your seat is as cramped as usual, but it feels like a throne today", $t.Destination = EndScreen, $t.ExitNames = System.Array.init(["win"], System.String), $t);
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
            },
            ChangeRoom: function (exit) {
                var output = "";
                output = (exit.ExitText || "") + ("\n" || "");
                this.CurrentRoom = exit.Destination;
                this.TimeToFlight = (this.TimeToFlight - exit.ExitTime) | 0;
                this.Player.Money = this.Player.Money.sub(exit.ExitCost);
                output = (output || "") + ((this.GetRoomHeader()) || "");
                return output;
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
            directionList: null,
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
                this.statusScreen();
            }
        },
        methods: {
            statusScreen: function () {
                var $t;
                this.directionList.Items.clear();
                $t = Bridge.getEnumerator(this.Game.CurrentRoom.Exits);
                try {
                    while ($t.moveNext()) {
                        var currentRoomExit = $t.Current;
                        this.directionList.Items.add(currentRoomExit);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            direction_Click: function (sender, e) {

            },
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

                this.statusScreen();
            },
            directionList_SelectionChanged: function (sender, e) {
                var $t;
                var selectedExit = Bridge.as(this.directionList.SelectedItem, FlightDashWeb.Exit);
                if (selectedExit == null) {
                    return;
                }
                this.input.Text = "go " + ((selectedExit.ExitNames.length > 0 ? ($t = selectedExit.ExitNames)[System.Array.index(0, $t)] : "") || "");
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



                var Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0 = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_3452157f17d94030a477da9127fc67f5 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_3452157f17d94030a477da9127fc67f5.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_4e0c7c3bb0e24d0fbb77f87397364fa1 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_4e0c7c3bb0e24d0fbb77f87397364fa1.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_a9899ef9314243b4ae335d8b4e2e8e2a = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_a9899ef9314243b4ae335d8b4e2e8e2a.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_d811567b00184ac89f22ec623b5b5807 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_d811567b00184ac89f22ec623b5b5807.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_e763d22f02074410b6ee10ddc971fbb0 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_e763d22f02074410b6ee10ddc971fbb0.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.ColumnDefinitions.add(ColumnDefinition_3452157f17d94030a477da9127fc67f5);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.ColumnDefinitions.add(ColumnDefinition_4e0c7c3bb0e24d0fbb77f87397364fa1);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.ColumnDefinitions.add(ColumnDefinition_a9899ef9314243b4ae335d8b4e2e8e2a);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.ColumnDefinitions.add(ColumnDefinition_d811567b00184ac89f22ec623b5b5807);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.ColumnDefinitions.add(ColumnDefinition_e763d22f02074410b6ee10ddc971fbb0);

                var RowDefinition_07185d0ee0cd4ec3a9f286d18fdf79a2 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_07185d0ee0cd4ec3a9f286d18fdf79a2.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_ce1690ae43fc40d084b6d2c3b9d473e9 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_ce1690ae43fc40d084b6d2c3b9d473e9.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_d9c4675b28a94c8fa2f56b5eea432fd1 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_d9c4675b28a94c8fa2f56b5eea432fd1.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_15db94d3a32a4142b5fe68ffeb17d479 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_15db94d3a32a4142b5fe68ffeb17d479.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_18248643e8ac498b9b693caecec2acbd = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_18248643e8ac498b9b693caecec2acbd.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_79d61e761cb844cf8566817b879f64a5 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_79d61e761cb844cf8566817b879f64a5.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_e6557e0301374027b5553814ec3e7a72 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_e6557e0301374027b5553814ec3e7a72.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_a3f93592e49849ddbb2ee2c070619de4 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_a3f93592e49849ddbb2ee2c070619de4.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_86c9f08678da44e9a0ea7432f13def9b = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_86c9f08678da44e9a0ea7432f13def9b.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_89219d8be5744ff09a773f651d3d9bf0 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_89219d8be5744ff09a773f651d3d9bf0.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_07185d0ee0cd4ec3a9f286d18fdf79a2);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_ce1690ae43fc40d084b6d2c3b9d473e9);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_d9c4675b28a94c8fa2f56b5eea432fd1);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_15db94d3a32a4142b5fe68ffeb17d479);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_18248643e8ac498b9b693caecec2acbd);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_79d61e761cb844cf8566817b879f64a5);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_e6557e0301374027b5553814ec3e7a72);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_a3f93592e49849ddbb2ee2c070619de4);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_86c9f08678da44e9a0ea7432f13def9b);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.RowDefinitions.add(RowDefinition_89219d8be5744ff09a773f651d3d9bf0);

                var ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1 = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1);
                ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1, 7);
                ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_2afab82f9af54ca285570703b9c16247 = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_2afab82f9af54ca285570703b9c16247.Text = "";
                this.RegisterName$1("output", TextBlock_2afab82f9af54ca285570703b9c16247);
                TextBlock_2afab82f9af54ca285570703b9c16247.Name = "output";
                TextBlock_2afab82f9af54ca285570703b9c16247.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_2afab82f9af54ca285570703b9c16247.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));
                TextBlock_2afab82f9af54ca285570703b9c16247.TextWrapping = Bridge.global.Windows.UI.Xaml.TextWrapping.Wrap;

                ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1.Content = TextBlock_2afab82f9af54ca285570703b9c16247;


                var ListBox_38324d2225f54782aeb6d5110ef5fd85 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_38324d2225f54782aeb6d5110ef5fd85);
                ListBox_38324d2225f54782aeb6d5110ef5fd85.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_38324d2225f54782aeb6d5110ef5fd85, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_38324d2225f54782aeb6d5110ef5fd85, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_38324d2225f54782aeb6d5110ef5fd85, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_38324d2225f54782aeb6d5110ef5fd85, 2);

                var TextBox_a8d13609766048ea970a4f5919eda91f = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_a8d13609766048ea970a4f5919eda91f);
                TextBox_a8d13609766048ea970a4f5919eda91f.Name = "input";
                TextBox_a8d13609766048ea970a4f5919eda91f.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_a8d13609766048ea970a4f5919eda91f, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_a8d13609766048ea970a4f5919eda91f, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_a8d13609766048ea970a4f5919eda91f, 9);
                TextBox_a8d13609766048ea970a4f5919eda91f.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_a7420fcef9e74d15b9c70416d565055b = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_a7420fcef9e74d15b9c70416d565055b);
                Button_a7420fcef9e74d15b9c70416d565055b.Name = "actionButton";
                Button_a7420fcef9e74d15b9c70416d565055b.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_a7420fcef9e74d15b9c70416d565055b, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_a7420fcef9e74d15b9c70416d565055b, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_a7420fcef9e74d15b9c70416d565055b, 9);
                Button_a7420fcef9e74d15b9c70416d565055b.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                var ListBox_2097bdecbc64464fb898cb74ab51c818 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("directionList", ListBox_2097bdecbc64464fb898cb74ab51c818);
                ListBox_2097bdecbc64464fb898cb74ab51c818.Name = "directionList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_2097bdecbc64464fb898cb74ab51c818, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_2097bdecbc64464fb898cb74ab51c818, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_2097bdecbc64464fb898cb74ab51c818, 6);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_2097bdecbc64464fb898cb74ab51c818, 4);
                ListBox_2097bdecbc64464fb898cb74ab51c818.addSelectionChanged(Bridge.fn.cacheBind(this, this.directionList_SelectionChanged));

                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.Children.add(ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.Children.add(ListBox_38324d2225f54782aeb6d5110ef5fd85);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.Children.add(TextBox_a8d13609766048ea970a4f5919eda91f);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.Children.add(Button_a7420fcef9e74d15b9c70416d565055b);
                Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0.Children.add(ListBox_2097bdecbc64464fb898cb74ab51c818);


                this.Content = Grid_13c65c9a7f4648b08fb90d5e0d7a1fe0;



                this.output = TextBlock_2afab82f9af54ca285570703b9c16247;
                this.outputScroll = ScrollViewer_baa5a2a33df047928ed623dbbbc0fbd1;
                this.pastInputList = ListBox_38324d2225f54782aeb6d5110ef5fd85;
                this.input = TextBox_a8d13609766048ea970a4f5919eda91f;
                this.actionButton = Button_a7420fcef9e74d15b9c70416d565055b;
                this.directionList = ListBox_2097bdecbc64464fb898cb74ab51c818;



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

                        output.v = curState.ChangeRoom(currentRoomExit);

                        while (curState.CurrentRoom.AutoExit != null) {
                            var exit = curState.CurrentRoom.AutoExit;
                            output.v = (output.v || "") + ((curState.ChangeRoom(exit)) || "");
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovUmVsZWFzZS9BcHAueGFtbC5nLmNzIiwib2JqL1JlbGVhc2UvTWFpblBhZ2UueGFtbC5nLmNzIiwiQXBwLnhhbWwuY3MiLCJSb29tLmNzIiwiRXhpdC5jcyIsIkdhbWUuY3MiLCJNYWluUGFnZS54YW1sLmNzIiwiUGxheWVyLmNzIiwiQ29tbWFuZHMvQ2hlY2tJbi5jcyIsIkNvbW1hbmRzL0dvLmNzIiwiQ29tbWFuZHMvTG9vay5jcyIsIkNvbW1hbmRzL1NlY3VyaXR5Q29tbWFuZC5jcyIsIkVuZFNjcmVlblJvb20uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztvQkFRUUEsV0FBMkJBLEFBQU9BO29CQUNsQ0EsT0FBT0EsbUVBQTZEQTs7Ozs7Ozs7OztvQkNEcEVBLFdBQTJCQSxBQUFPQTtvQkFDbENBLE9BQU9BLG1FQUE2REE7Ozs7Ozs7OztZRG1FeEVBLElBQUlBOzs7Ozs7Ozs7Z0JFL0RJQTs7O2dCQUlBQSxlQUFlQSxJQUFJQTtnQkFDbkJBLHlDQUF5QkE7Ozs7O2dCRnVCekJBLElBQUlBO29CQUNBQTs7Z0JBQ0pBOzs7Z0JBR0FBLElBQUlBO29CQUVBQSxBQUFDQSxZQUFtQ0EsQUFBUUE7Ozs7Z0JBSzVEQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUdBQSwwREFBMERBLElBQUlBO2dCQUM5REEsaUJBQWlCQTs7Z0JBRWpCQSxpQkFBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkdqQ2lDQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDZTFDQSxPQUFPQSw2QkFBb0JBOzs7Ozs7Ozs7Ozs7Ozs7OztnQ0MyZGtCQSxLQUFJQTs7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QUF1QkEsMEJBQXlCQTtnQ0FDekRBOzs7Ozs7Ozs7OztnQkFNWkE7Z0JBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Z0JDbkNBQTs7O2dCQUtBQSxPQUFPQTs7O2dCQUtQQTs7dUNBR3dCQSxrQkFBMkJBLFVBQWVBOztnQkFFbEVBLElBQUlBO29CQUVBQTtvQkFDQUE7OztnQkFHSkE7Z0JBQ0FBLDBCQUEwQkEsa0RBQWVBLEFBQU9BLHVFQUFrQkE7Ozs7d0JBRTlEQSxJQUFJQSxnR0FBa0NBOzRCQUVsQ0EsOEJBQThCQTs0QkFDOUJBLFFBQVFBO2dDQUVKQSxLQUFLQTtvQ0FDREEsK0JBQVVBLHFEQUFtREE7b0NBQzdEQTtnQ0FDSkEsS0FBS0E7b0NBQ0RBLCtCQUFVQSxrREFBZ0RBO29DQUMxREE7Z0NBQ0pBLEtBQUtBO29DQUNEQSwrQkFBVUEsd0RBQXNEQTtvQ0FDaEVBO2dDQUNKQSxLQUFLQTtvQ0FDREEsK0JBQVVBLDhEQUE0REE7b0NBQ3RFQTtnQ0FDSkEsS0FBS0E7b0NBQ0RBLCtCQUFVQSxtREFBaURBO29DQUMzREE7Z0NBQ0pBO29DQUNJQSxXQUFTQSx3QkFBcUJBO29DQUM5QkE7Ozs7Ozs7Ozs7Z0JBS2hCQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7OztvQkM1Q0pBLE9BQU9BLHVHQUErRkEsa0ZBQTJCQSwyREFBMkJBLE9BQUNBLE9BQW9DQSx5QkFBa0JBLE9BQUtBLFlBQXFEQSxBQUFVQSx5Q0FBM0hBOzs7Ozs0QkFSdklBOzs7Z0JBRWpCQSxnQkFBZ0JBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIDxDU0hUTUw1PjxYYW1sSGFzaD45NzQzQjkwMzIxOURDRTNGMDUzM0I5NTU1ODNFM0I0QzwvWGFtbEhhc2g+PFBhc3NOdW1iZXI+MjwvUGFzc051bWJlcj48Q29tcGlsYXRpb25EYXRlPjIvMjMvMjAyMCA5OjE4OjUyIEFNPC9Db21waWxhdGlvbkRhdGU+PC9DU0hUTUw1PlxyXG5cclxuXHJcblxyXG5wdWJsaWMgc3RhdGljIGNsYXNzIMeAx4BGbGlnaHRkYXNod2Vix4DHgENvbXBvbmVudMeAx4BBcHDHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5BcHApO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuVHlwZUluc3RhbnRpYXRpb25IZWxwZXIuSW5zdGFudGlhdGUodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XHJcbi8vICAgICBUaGlzIGNvZGUgd2FzIGF1dG8tZ2VuZXJhdGVkIGJ5IFwiQyMvWEFNTCBmb3IgSFRNTDVcIlxyXG4vL1xyXG4vLyAgICAgQ2hhbmdlcyB0byB0aGlzIGZpbGUgbWF5IGNhdXNlIGluY29ycmVjdCBiZWhhdmlvciBhbmQgd2lsbCBiZSBsb3N0IGlmXHJcbi8vICAgICB0aGUgY29kZSBpcyByZWdlbmVyYXRlZC5cclxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxucGFydGlhbCBjbGFzcyBBcHAgOiBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5BcHBsaWNhdGlvblxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxuXHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcQXBwLnhhbWxcIjtcclxuICAgICAgICAgICAgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAwMTg0XHJcblxyXG5cclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0Um9vdFBhdGggPSBAXCJPdXRwdXRcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRBcHBGaWxlc1BhdGggPSBAXCJhcHAtY3NodG1sNVxcYXBwXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0TGlicmFyaWVzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxsaWJzXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0UmVzb3VyY2VzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxyZXNcXFwiO1xyXG5cclxuXHJcbnZhciBSZXNvdXJjZURpY3Rpb25hcnlfYjY3ZjMzMDM5MDQ4NDk1YmI0NDViOGMwMGIxN2YyYzIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuUmVzb3VyY2VEaWN0aW9uYXJ5KCk7XHJcbnRoaXMuUmVzb3VyY2VzID0gUmVzb3VyY2VEaWN0aW9uYXJ5X2I2N2YzMzAzOTA0ODQ5NWJiNDQ1YjhjMDBiMTdmMmMyO1xyXG5cclxudGhpcy5SZXNvdXJjZXMgPSBSZXNvdXJjZURpY3Rpb25hcnlfYjY3ZjMzMDM5MDQ4NDk1YmI0NDViOGMwMGIxN2YyYzI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxue1xyXG4gICAgbmV3IEFwcCgpO1xyXG59XHJcblxyXG59XHJcblxyXG5cclxufVxyXG4iLCIvLyA8Q1NIVE1MNT48WGFtbEhhc2g+MkU1Q0IwOEQ0NjM1REJGOTA2RTM0ODdBNDk5QzI4QUI8L1hhbWxIYXNoPjxQYXNzTnVtYmVyPjI8L1Bhc3NOdW1iZXI+PENvbXBpbGF0aW9uRGF0ZT4yLzIzLzIwMjAgOToxODo1MiBBTTwvQ29tcGlsYXRpb25EYXRlPjwvQ1NIVE1MNT5cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyBjbGFzcyDHgMeARmxpZ2h0ZGFzaHdlYseAx4BDb21wb25lbnTHgMeATWFpbnBhZ2XHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5NYWluUGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5UeXBlSW5zdGFudGlhdGlvbkhlbHBlci5JbnN0YW50aWF0ZSh0eXBlKTtcclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDxhdXRvLWdlbmVyYXRlZD5cclxuLy8gICAgIFRoaXMgY29kZSB3YXMgYXV0by1nZW5lcmF0ZWQgYnkgXCJDIy9YQU1MIGZvciBIVE1MNVwiXHJcbi8vXHJcbi8vICAgICBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBtYXkgY2F1c2UgaW5jb3JyZWN0IGJlaGF2aW9yIGFuZCB3aWxsIGJlIGxvc3QgaWZcclxuLy8gICAgIHRoZSBjb2RlIGlzIHJlZ2VuZXJhdGVkLlxyXG4vLyA8L2F1dG8tZ2VuZXJhdGVkPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblxyXG5wYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUGFnZVxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCbG9jayBvdXRwdXQ7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5TY3JvbGxWaWV3ZXIgb3V0cHV0U2Nyb2xsO1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCBwYXN0SW5wdXRMaXN0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJveCBpbnB1dDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkJ1dHRvbiBhY3Rpb25CdXR0b247XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94IGRpcmVjdGlvbkxpc3Q7XHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcTWFpblBhZ2UueGFtbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDAxODRcclxuXHJcblxyXG5cclxudmFyIEdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZCgpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLkhvcml6b250YWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Ib3Jpem9udGFsQWxpZ25tZW50LlN0cmV0Y2g7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuVmVydGljYWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5WZXJ0aWNhbEFsaWdubWVudC5TdHJldGNoO1xyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl8zNDUyMTU3ZjE3ZDk0MDMwYTQ3N2RhOTEyN2ZjNjdmNSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fMzQ1MjE1N2YxN2Q5NDAzMGE0NzdkYTkxMjdmYzY3ZjUuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzRlMGM3YzNiYjBlMjRkMGZiYjc3Zjg3Mzk3MzY0ZmExID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl80ZTBjN2MzYmIwZTI0ZDBmYmI3N2Y4NzM5NzM2NGZhMS5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fYTk4OTllZjkzMTQyNDNiNGFlMzM1ZDhiNGUyZThlMmEgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uX2E5ODk5ZWY5MzE0MjQzYjRhZTMzNWQ4YjRlMmU4ZTJhLldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl9kODExNTY3YjAwMTg0YWM4OWYyMmVjNjIzYjViNTgwNyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fZDgxMTU2N2IwMDE4NGFjODlmMjJlYzYyM2I1YjU4MDcuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uX2U3NjNkMjJmMDIwNzQ0MTBiNmVlMTBkZGM5NzFmYmIwID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl9lNzYzZDIyZjAyMDc0NDEwYjZlZTEwZGRjOTcxZmJiMC5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl8zNDUyMTU3ZjE3ZDk0MDMwYTQ3N2RhOTEyN2ZjNjdmNSk7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fNGUwYzdjM2JiMGUyNGQwZmJiNzdmODczOTczNjRmYTEpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uX2E5ODk5ZWY5MzE0MjQzYjRhZTMzNWQ4YjRlMmU4ZTJhKTtcclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl9kODExNTY3YjAwMTg0YWM4OWYyMmVjNjIzYjViNTgwNyk7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fZTc2M2QyMmYwMjA3NDQxMGI2ZWUxMGRkYzk3MWZiYjApO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMDcxODVkMGVlMGNkNGVjM2E5ZjI4NmQxOGZkZjc5YTIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzA3MTg1ZDBlZTBjZDRlYzNhOWYyODZkMThmZGY3OWEyLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fY2UxNjkwYWU0M2ZjNDBkMDg0YjZkMmMzYjlkNDczZTkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2NlMTY5MGFlNDNmYzQwZDA4NGI2ZDJjM2I5ZDQ3M2U5LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZDljNDY3NWIyOGE5NGM4ZmEyZjU2YjVlZWE0MzJmZDEgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2Q5YzQ2NzViMjhhOTRjOGZhMmY1NmI1ZWVhNDMyZmQxLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMTVkYjk0ZDNhMzJhNDE0MmI1ZmU2OGZmZWIxN2Q0NzkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzE1ZGI5NGQzYTMyYTQxNDJiNWZlNjhmZmViMTdkNDc5LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMTgyNDg2NDNlOGFjNDk4YjliNjkzY2FlY2VjMmFjYmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzE4MjQ4NjQzZThhYzQ5OGI5YjY5M2NhZWNlYzJhY2JkLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNzlkNjFlNzYxY2I4NDRjZjg1NjY4MTdiODc5ZjY0YTUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzc5ZDYxZTc2MWNiODQ0Y2Y4NTY2ODE3Yjg3OWY2NGE1LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZTY1NTdlMDMwMTM3NDAyN2I1NTUzODE0ZWMzZTdhNzIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2U2NTU3ZTAzMDEzNzQwMjdiNTU1MzgxNGVjM2U3YTcyLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fYTNmOTM1OTJlNDk4NDlkZGJiMmVlMmMwNzA2MTlkZTQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2EzZjkzNTkyZTQ5ODQ5ZGRiYjJlZTJjMDcwNjE5ZGU0LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fODZjOWYwODY3OGRhNDRlOWEwZWE3NDMyZjEzZGVmOWIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzg2YzlmMDg2NzhkYTQ0ZTlhMGVhNzQzMmYxM2RlZjliLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fODkyMTlkOGJlNTc0NGZmMDlhNzczZjY1MWQzZDliZjAgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzg5MjE5ZDhiZTU3NDRmZjA5YTc3M2Y2NTFkM2Q5YmYwLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl8wNzE4NWQwZWUwY2Q0ZWMzYTlmMjg2ZDE4ZmRmNzlhMik7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fY2UxNjkwYWU0M2ZjNDBkMDg0YjZkMmMzYjlkNDczZTkpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uX2Q5YzQ2NzViMjhhOTRjOGZhMmY1NmI1ZWVhNDMyZmQxKTtcclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl8xNWRiOTRkM2EzMmE0MTQyYjVmZTY4ZmZlYjE3ZDQ3OSk7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fMTgyNDg2NDNlOGFjNDk4YjliNjkzY2FlY2VjMmFjYmQpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzc5ZDYxZTc2MWNiODQ0Y2Y4NTY2ODE3Yjg3OWY2NGE1KTtcclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9lNjU1N2UwMzAxMzc0MDI3YjU1NTM4MTRlYzNlN2E3Mik7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fYTNmOTM1OTJlNDk4NDlkZGJiMmVlMmMwNzA2MTlkZTQpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzg2YzlmMDg2NzhkYTQ0ZTlhMGVhNzQzMmYxM2RlZjliKTtcclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl84OTIxOWQ4YmU1NzQ0ZmYwOWE3NzNmNjUxZDNkOWJmMCk7XHJcblxyXG52YXIgU2Nyb2xsVmlld2VyX2JhYTVhMmEzM2RmMDQ3OTI4ZWQ2MjNkYmJiYzBmYmQxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlNjcm9sbFZpZXdlcigpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcIm91dHB1dFNjcm9sbFwiLCBTY3JvbGxWaWV3ZXJfYmFhNWEyYTMzZGYwNDc5MjhlZDYyM2RiYmJjMGZiZDEpO1xyXG5TY3JvbGxWaWV3ZXJfYmFhNWEyYTMzZGYwNDc5MjhlZDYyM2RiYmJjMGZiZDEuTmFtZSA9IFwib3V0cHV0U2Nyb2xsXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKFNjcm9sbFZpZXdlcl9iYWE1YTJhMzNkZjA0NzkyOGVkNjIzZGJiYmMwZmJkMSwwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKFNjcm9sbFZpZXdlcl9iYWE1YTJhMzNkZjA0NzkyOGVkNjIzZGJiYmMwZmJkMSw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3dTcGFuKFNjcm9sbFZpZXdlcl9iYWE1YTJhMzNkZjA0NzkyOGVkNjIzZGJiYmMwZmJkMSw3KTtcclxuU2Nyb2xsVmlld2VyX2JhYTVhMmEzM2RmMDQ3OTI4ZWQ2MjNkYmJiYzBmYmQxLkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcbnZhciBUZXh0QmxvY2tfMmFmYWI4MmY5YWY1NGNhMjg1NTcwNzAzYjljMTYyNDcgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJsb2NrKCk7XHJcblRleHRCbG9ja18yYWZhYjgyZjlhZjU0Y2EyODU1NzA3MDNiOWMxNjI0Ny5UZXh0ID0gQFwiXCI7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwib3V0cHV0XCIsIFRleHRCbG9ja18yYWZhYjgyZjlhZjU0Y2EyODU1NzA3MDNiOWMxNjI0Nyk7XHJcblRleHRCbG9ja18yYWZhYjgyZjlhZjU0Y2EyODU1NzA3MDNiOWMxNjI0Ny5OYW1lID0gXCJvdXRwdXRcIjtcclxuVGV4dEJsb2NrXzJhZmFiODJmOWFmNTRjYTI4NTU3MDcwM2I5YzE2MjQ3LkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcblRleHRCbG9ja18yYWZhYjgyZjlhZjU0Y2EyODU1NzA3MDNiOWMxNjI0Ny5Gb3JlZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMjU1LCBHID0gKGJ5dGUpMjU1LCBCID0gKGJ5dGUpMjU1IH0pO1xyXG5UZXh0QmxvY2tfMmFmYWI4MmY5YWY1NGNhMjg1NTcwNzAzYjljMTYyNDcuVGV4dFdyYXBwaW5nID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVGV4dFdyYXBwaW5nLldyYXA7XHJcblxyXG5TY3JvbGxWaWV3ZXJfYmFhNWEyYTMzZGYwNDc5MjhlZDYyM2RiYmJjMGZiZDEuQ29udGVudCA9IFRleHRCbG9ja18yYWZhYjgyZjlhZjU0Y2EyODU1NzA3MDNiOWMxNjI0NztcclxuXHJcblxyXG52YXIgTGlzdEJveF8zODMyNGQyMjI1ZjU0NzgyYWViNmQ1MTEwZWY1ZmQ4NSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94KCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwicGFzdElucHV0TGlzdFwiLCBMaXN0Qm94XzM4MzI0ZDIyMjVmNTQ3ODJhZWI2ZDUxMTBlZjVmZDg1KTtcclxuTGlzdEJveF8zODMyNGQyMjI1ZjU0NzgyYWViNmQ1MTEwZWY1ZmQ4NS5OYW1lID0gXCJwYXN0SW5wdXRMaXN0XCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKExpc3RCb3hfMzgzMjRkMjIyNWY1NDc4MmFlYjZkNTExMGVmNWZkODUsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihMaXN0Qm94XzM4MzI0ZDIyMjVmNTQ3ODJhZWI2ZDUxMTBlZjVmZDg1LDQpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhMaXN0Qm94XzM4MzI0ZDIyMjVmNTQ3ODJhZWI2ZDUxMTBlZjVmZDg1LDcpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvd1NwYW4oTGlzdEJveF8zODMyNGQyMjI1ZjU0NzgyYWViNmQ1MTEwZWY1ZmQ4NSwyKTtcclxuXHJcbnZhciBUZXh0Qm94X2E4ZDEzNjA5NzY2MDQ4ZWE5NzBhNGY1OTE5ZWRhOTFmID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJpbnB1dFwiLCBUZXh0Qm94X2E4ZDEzNjA5NzY2MDQ4ZWE5NzBhNGY1OTE5ZWRhOTFmKTtcclxuVGV4dEJveF9hOGQxMzYwOTc2NjA0OGVhOTcwYTRmNTkxOWVkYTkxZi5OYW1lID0gXCJpbnB1dFwiO1xyXG5UZXh0Qm94X2E4ZDEzNjA5NzY2MDQ4ZWE5NzBhNGY1OTE5ZWRhOTFmLlRleHQgPSBAXCJcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oVGV4dEJveF9hOGQxMzYwOTc2NjA0OGVhOTcwYTRmNTkxOWVkYTkxZiwwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKFRleHRCb3hfYThkMTM2MDk3NjYwNDhlYTk3MGE0ZjU5MTllZGE5MWYsMyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KFRleHRCb3hfYThkMTM2MDk3NjYwNDhlYTk3MGE0ZjU5MTllZGE5MWYsOSk7XHJcblRleHRCb3hfYThkMTM2MDk3NjYwNDhlYTk3MGE0ZjU5MTllZGE5MWYuS2V5RG93biArPSBpbnB1dF9LZXlEb3duO1xyXG5cclxudmFyIEJ1dHRvbl9hNzQyMGZjZWY5ZTc0ZDE1YjljNzA0MTZkNTY1MDU1YiA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5CdXR0b24oKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJhY3Rpb25CdXR0b25cIiwgQnV0dG9uX2E3NDIwZmNlZjllNzRkMTViOWM3MDQxNmQ1NjUwNTViKTtcclxuQnV0dG9uX2E3NDIwZmNlZjllNzRkMTViOWM3MDQxNmQ1NjUwNTViLk5hbWUgPSBcImFjdGlvbkJ1dHRvblwiO1xyXG5CdXR0b25fYTc0MjBmY2VmOWU3NGQxNWI5YzcwNDE2ZDU2NTA1NWIuQ29udGVudCA9IEBcIkFjdGlvblwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihCdXR0b25fYTc0MjBmY2VmOWU3NGQxNWI5YzcwNDE2ZDU2NTA1NWIsMyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihCdXR0b25fYTc0MjBmY2VmOWU3NGQxNWI5YzcwNDE2ZDU2NTA1NWIsMSk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KEJ1dHRvbl9hNzQyMGZjZWY5ZTc0ZDE1YjljNzA0MTZkNTY1MDU1Yiw5KTtcclxuQnV0dG9uX2E3NDIwZmNlZjllNzRkMTViOWM3MDQxNmQ1NjUwNTViLkNsaWNrICs9IGFjdGlvbkJ1dHRvbl9DbGljaztcclxuXHJcbnZhciBMaXN0Qm94XzIwOTdiZGVjYmM2NDQ2NGZiODk4Y2I3NGFiNTFjODE4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJkaXJlY3Rpb25MaXN0XCIsIExpc3RCb3hfMjA5N2JkZWNiYzY0NDY0ZmI4OThjYjc0YWI1MWM4MTgpO1xyXG5MaXN0Qm94XzIwOTdiZGVjYmM2NDQ2NGZiODk4Y2I3NGFiNTFjODE4Lk5hbWUgPSBcImRpcmVjdGlvbkxpc3RcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oTGlzdEJveF8yMDk3YmRlY2JjNjQ0NjRmYjg5OGNiNzRhYjUxYzgxOCw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKExpc3RCb3hfMjA5N2JkZWNiYzY0NDY0ZmI4OThjYjc0YWI1MWM4MTgsMSk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KExpc3RCb3hfMjA5N2JkZWNiYzY0NDY0ZmI4OThjYjc0YWI1MWM4MTgsNik7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihMaXN0Qm94XzIwOTdiZGVjYmM2NDQ2NGZiODk4Y2I3NGFiNTFjODE4LDQpO1xyXG5MaXN0Qm94XzIwOTdiZGVjYmM2NDQ2NGZiODk4Y2I3NGFiNTFjODE4LlNlbGVjdGlvbkNoYW5nZWQgKz0gZGlyZWN0aW9uTGlzdF9TZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5DaGlsZHJlbi5BZGQoU2Nyb2xsVmlld2VyX2JhYTVhMmEzM2RmMDQ3OTI4ZWQ2MjNkYmJiYzBmYmQxKTtcclxuR3JpZF8xM2M2NWM5YTdmNDY0OGIwOGZiOTBkNWUwZDdhMWZlMC5DaGlsZHJlbi5BZGQoTGlzdEJveF8zODMyNGQyMjI1ZjU0NzgyYWViNmQ1MTEwZWY1ZmQ4NSk7XHJcbkdyaWRfMTNjNjVjOWE3ZjQ2NDhiMDhmYjkwZDVlMGQ3YTFmZTAuQ2hpbGRyZW4uQWRkKFRleHRCb3hfYThkMTM2MDk3NjYwNDhlYTk3MGE0ZjU5MTllZGE5MWYpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLkNoaWxkcmVuLkFkZChCdXR0b25fYTc0MjBmY2VmOWU3NGQxNWI5YzcwNDE2ZDU2NTA1NWIpO1xyXG5HcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwLkNoaWxkcmVuLkFkZChMaXN0Qm94XzIwOTdiZGVjYmM2NDQ2NGZiODk4Y2I3NGFiNTFjODE4KTtcclxuXHJcblxyXG50aGlzLkNvbnRlbnQgPSBHcmlkXzEzYzY1YzlhN2Y0NjQ4YjA4ZmI5MGQ1ZTBkN2ExZmUwO1xyXG5cclxuXHJcblxyXG5vdXRwdXQgPSBUZXh0QmxvY2tfMmFmYWI4MmY5YWY1NGNhMjg1NTcwNzAzYjljMTYyNDc7XHJcbm91dHB1dFNjcm9sbCA9IFNjcm9sbFZpZXdlcl9iYWE1YTJhMzNkZjA0NzkyOGVkNjIzZGJiYmMwZmJkMTtcclxucGFzdElucHV0TGlzdCA9IExpc3RCb3hfMzgzMjRkMjIyNWY1NDc4MmFlYjZkNTExMGVmNWZkODU7XHJcbmlucHV0ID0gVGV4dEJveF9hOGQxMzYwOTc2NjA0OGVhOTcwYTRmNTkxOWVkYTkxZjtcclxuYWN0aW9uQnV0dG9uID0gQnV0dG9uX2E3NDIwZmNlZjllNzRkMTViOWM3MDQxNmQ1NjUwNTViO1xyXG5kaXJlY3Rpb25MaXN0ID0gTGlzdEJveF8yMDk3YmRlY2JjNjQ0NjRmYjg5OGNiNzRhYjUxYzgxODtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgc2VhbGVkIHBhcnRpYWwgY2xhc3MgQXBwIDogQXBwbGljYXRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluUGFnZSA9IG5ldyBNYWluUGFnZSgpO1xyXG4gICAgICAgICAgICBXaW5kb3cuQ3VycmVudC5Db250ZW50ID0gbWFpblBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIGJhc2ljIHJvb21cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUm9vbVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJvb20gbmFtZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSb29tTmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcm9vbSBEZXNjcmlwdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTaG9ydFJvb21EZXNjIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMb25nUm9vbURlc2MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBMaXN0PEV4aXQ+IEV4aXRzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRXhpdCBBdXRvRXhpdCB7IGdldDsgc2V0OyB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgTGlzdDxFeGl0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRXhpdHM9bmV3IExpc3Q8RXhpdD4oKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgYmFzaWMgZXhpdCBmcm9tIG9uZSByb29tIGludG8gYW5vdGhlclxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBFeGl0XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYW1lIG9mIHRoZSBleGl0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEV4aXROYW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0cmluZ1tdIEV4aXROYW1lcyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGVzdGluYXRpb24gcm9vbVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFJvb20gRGVzdGluYXRpb24geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGVzY3JpcHRpb24gdG8gc2hvdyBvZiB0aGUgZXhpdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBFeGl0RGVzYyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXhpdFRleHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBkZWNpbWFsIEV4aXRDb3N0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaW1lIHRha2VuIHRvIHVzZSB0aGUgZXhpdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBFeGl0VGltZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGdW5jPEdhbWUsYm9vbD4gRXhpdExvY2tlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTG9ja1RleHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgTG9ja1RpbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiezB9XCIsRXhpdE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGbGlnaHREYXNoV2ViLkNvbW1hbmRzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUm9vbSBDdXJyZW50Um9vbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIFBsYXllciBQbGF5ZXIgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZVRvRmxpZ2h0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8SUNvbW1hbmQ+IENvbW1hbmRzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBHYW1lT3ZlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENoZWNrZWRJbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCZWxvbmdpbmdzIEN1cnJlbnRCZWxvbmdpbmdzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplR2FtZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgVGltZVRvRmxpZ2h0ID0gNjA7XHJcbiAgICAgICAgICAgIFBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICAgICAgUGxheWVyLkluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgTWFrZVJvb21zKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgTG9vaygpKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBHbygpKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBDaGVja0luKCkpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IFNlY3VyaXR5Q29tbWFuZCgpKTtcclxuICAgICAgICAgICAgQ2hlY2tlZEluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEN1cnJlbnRCZWxvbmdpbmdzID0gQmVsb25naW5ncy5BbGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTWFrZVJvb21zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbFJvb20gPSBuZXcgUm9vbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSG90ZWwgUm9vbVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiQSBwcmV0dHkgYmFzaWMgSG90ZWwgcm9vbS4gTm90aGluZyBtdWNoIG91dCBvZiB0aGUgb3JkaW5hcnkgaGVyZVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBiZWQgaXMgdW5tYWRlLCBsZWZ0IGluIGEgbWVzcyBmcm9tIHlvdXIgcnVkZSBhd2FrZW5pbmcsIGFzIHRoZSBhbGFybSBibGlua3MgMTI6MDAgbWVycmlseSBhdCB5b3UsIGlnbm9yYW50IG9mIHlvdXIgZGlzdHJlc3MuXFxyXFxuIFlvdXIgc3VpdGNhc2UgbGF5cyBvbiB0aGUgZmxvb3IgYXQgdGhlIGZvb3Qgb2YgdGhlIGJlZCwgbmVhdGx5IHBhY2tlZC5cXHJcXG5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG91dHNpZGVIb3RlbCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk91dHNpZGUgSG90ZWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIk91dHNpZGUgdGhlIHdlYXRoZXIgaXMgY2FsbSwgYmx1ZSBza2llcy4gWW91ciBjYXIgc2l0cyBpbiB0aGUgYXNzaWduZWQgcGFya2luZyBzcG90IGF3YWl0aW5nIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJJbiB0aGUgZGlzdGFuY2UgeW91IHNlZSBvbiB0aGUgZnJlZSByb2FkIHNvbWUgaGludHMgb2YgYSB0cmFmZmljIGphbS5cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgaG90ZWxFeGl0ID0gbmV3IEV4aXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBvdXRzaWRlSG90ZWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGhvdGVsIGRvb3IgaGFzIGEgc2lnbiBvbiBpdCBzYXlpbmcgXFxcIlBsZWFzZSByZW1lbWJlciB5b3VyIGtleSB3aWxsIG5vdCB3b3JrIG9uY2UgeW91ciBjaGVja291dCB0aW1lIGlzIHBhc3QsIHBsZWFzZSByZW1lbWJlciBhbGwgeW91ciBiZWxvbmdpbmdzXFxcIlxcclxcblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhdmluZyB0aGUgaG90ZWwgeW91IGhlYXIgaXQgbG9jayBiZWhpbmQgeW91LCBkcm9wcGluZyB5b3VyIGtleXMgb2ZmIGF0IHJlY2VwdGlvbiB5b3UgaGVhZCBpbnRvIHRoZSBjYXJwYXJrIHRvIHBpY2sgdXAgeW91ciByZW50YWwuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiT3V0c2lkZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIm91dHNpZGVcIiwgXCJkb29yXCIsIFwiZXhpdFwiLCBcIm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDUsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaG90ZWxSb29tLkV4aXRzLkFkZChob3RlbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhciA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkluIHlvdXIgQ2FyXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJZb3VyIHJlbnRhbCBpcyBhIGJhc2ljIGF1dG9tYXRpYyB0cmFuc21pc3Npb24gY2FyXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJNb2RlcmF0ZSBzaXplLCBhdCBtaW5pbWFsIGNvc3QsIG5vIGZhbmN5IEdQUyBvciBtZWRpYSBjZW50ZXIgZm9yIHlvdSBvbiB0aGlzIHRyaXAuIFxyXG4gSXQgaXMgb2J2aW91cyB0aGUgY2FyIGhhcyBzZWVuIGJldHRlciBkYXlzLCBhbmQgbXVjaCB3b3JzZSBkcml2ZXJzLCB3aXRoIHNvbWUgc3RhaW5zIGRvdHRlZCBvbiB0aGUgZW1wdHkgcGFzc2VuZ2VyIHNlYXQgY3VzaGlvbnMuIFxyXG5Zb3VyIGRhc2hib2FyZCBpcyBhIGJpdCBkaXJ0eSBidXQgbG9va2luZyBjbG9zZXIgeW91IG5vdGljZSB5b3VyIGZ1ZWwgaXMgb25seSBhIHRoaXJkIGZ1bGxcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhckV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gY2FyLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSByZW50YWwgY2FyIGlzIGEgc21hbGwsIGFuZCBzbGlnaHRseSBiYXR0ZXJlZCB0aGluZy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZHVtcCB5b3VyIHN1aXRjYXNlIGludG8gdGhlIHRydW5rLCBmaWxsaW5nIHRoZSBsaW1pdGVkIHNwYWNlIGJlZm9yZSBwbG9wcGluZyB5b3Vyc2VsZiBkb3duIGluIHRoZSBkcml2ZXJzIHNlYXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDYXJcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJjYXJcIiwgXCJpblwiLCBcInJlbnRhbFwiLCBcImRyaXZlcnNcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG91dHNpZGVIb3RlbC5FeGl0cy5BZGQoY2FyRXhpdCk7XHJcbiAgICAgICAgICAgIC8vIHRvZG8gQWRkIHdhbGtcclxuICAgICAgICAgICAgdmFyIG9uRmlyc3RSb2FkID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIFJvYWRcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSByb2FkIG91dCBvZiB0aGUgaG90ZWwgaXMgcHJldHR5IGJhc2ljLCBzdHJhaWdodCwgYW5kIHdlbGwgc2lnbnBvc3RlZCB1cCB0byB0aGUgaGlnaHdheS4gXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJBaGVhZCBvZiB5b3UgaXMgYSBzcGxpdCwgdGhlIHJvYWQgdG8gdGhlIHJpZ2h0IGlzIGZyZWUsIGJ1dCB0aGVyZSBzZWVtcyB0byBiZSBzaWducyBvZiB0cmFmZmljLiBcclxuV2hlcmVhcyB0aGUgcm9hZCB0byB0aGUgbGVmdCBjb3N0cyB5b3UgJDUwIGp1c3QgdG8gZW50ZXIsYnV0IHRha2VzIHlvdSBkaXJlY3QgdG8gdGhlIGFpcnBvcnQuXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRDYXIgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPbiB0aGUgV2F5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJvYWQgdG8gdGhlIGFpcnBvcnQgbG9va3MgcHJldHR5IG9idmlvdXMgZnJvbSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG9uRmlyc3RSb2FkLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImFpcnBvcnRcIiwgXCJhaXJwb3J0XCIsIFwib3V0XCIsIFwicGxhbmVcIiwgXCJmbGlnaHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIkRyaXZpbmcgb3V0IG9mIHRoZSBob3RlbCwgeW91ICBzb29uIHNwb3QgdGhlIHNpZ24gdG8gdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMTBcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhci5FeGl0cy5BZGQoc3RhcnRDYXIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aE1vdG9yd2F5ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIFRvbGxib290aCByb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGhpZ2h3YXkgbG9va3MgY2xlYXIgdGhyb3VnaCB0aGUgd2hvbGUgcm91dGUuIFRoZSBvY2Nhc2lvbmFsIGNhciBwYXNzZXMsIG9yIGlzIHBhc3NlZCBidXQgb3ZlcmFsbCAgaXQgc3RheXMgY2xlYXIgcmlnaHQgdGhyb3VnaCB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBAXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aEVudHJhbmNlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVG9sbGJvb3RoIFJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRvbGxib290aCBzdGFuZHMgb24gdGhlIHNpZGUgb2YgdGhlIHJvYWQsIGl0J3MgbG9uZyBiYXIgbG93ZXJlZCBibG9ja2luZyB0aGUgcm91dGUgb25cIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdG9sbGJvb3RoTW90b3J3YXksXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IChkZWNpbWFsKTUwLjAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwidG9sbGJvb3RoXCIsIFwicGFpZFwiLCBcImZhc3RcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9uRmlyc3RSb2FkLkV4aXRzLkFkZCh0b2xsYm9vdGhFbnRyYW5jZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJlZVJvYWQgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgZnJlZSByb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGhpZ2h3YXkgaXMgaW4gdGhlIG1pZHN0IG9mIGEgaHVnZSB0cmFmZmljIGphbS4gQ2FyIGhvcm5zIG9mIGFsbCBzb3J0cyAsIGFuZCB0aGUgb2NjYXNpb25hbCB5ZWxsIGZpbGxzIHRoZSBhaXJcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGZyZWVSb2FkRW50cmFuY2UgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGcmVlIFJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaGUgZnJlZSByb3V0ZSdzIGVudHJhbmNlIGxpZXMgdW5iYXJyZWQsIGJ1dCB0aGVyZSBpcyBhIGhpbnQgb2YgcmVkIGJyZWFrLWxpZ2h0cyBpbiB0aGUgZGlzdGFuY2UgYWxvbmcgaXRcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gZnJlZVJvYWQsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiZnJlZVwiLCBcInJpZ2h0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gcmlnaHQsIGludGVuZGluZyB0byBzYXZlIHlvdXIgbW9uZXkgZm9yIGxhdGVyLCBob3dldmVyIGEgc2hvcnQgdGltZSB1cCB0aGUgcm9hZCB5b3UgY3Jhd2wgdG8gYSBoYWx0IGFzIHlvdSBoaXQgYSBodWdlIHRyYWZmaWMgamFtLFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9uRmlyc3RSb2FkLkV4aXRzLkFkZChmcmVlUm9hZEVudHJhbmNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYWlycG9ydEVudHJhbmNlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiQWlycG9ydCBEZXBhcnR1cmVzIEVudHJhbmNlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgZGVwYXJ0dXJlcyBlbnRyYW5jZSB0byB0aGUgYWlycG9ydCBsb29rcyBhIGJpdCBkaW5neSwgYnV0IHdlbGwgdHJhdmVsZWQsIHRoZSBkb29ycyBhcmUgd2lkZSBvcGVuIGFzIHBlb3BsZSBzdHJlYW0gaW5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgcG9zdGVycyBhcmUgb24gdGhlIHdhbGwsIGFkdmVydGlzaW5nIGZsaWdodCBkZWFscyBmb3IgdmFyaW91cyBjb21wYW5pZXMsIGFuZCBhIGNvdXBsZSBzZWN1cml0eSBndWFyZHMgc3RhbmQgbmVhciB0aGUgZW50cmFuY2UuXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib3RoTGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYWlycG9ydEVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImxlYXZlXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggZXhpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHRvbGwgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmVlUm91dGVMZWF2ZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwibGVhdmVcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkZyZWUgcm91dGUgZXhpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAyNSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHJvdXRlIGFuZCBmaW5kIHlvdXJzZWxmIGltbWVkaWF0ZWx5IGJ5IHRoZSBhaXJwb3J0IHJlbnRhbCBkcm9wIG9mZiwgcGFya2luZyB5b3VyIGNhciBhbmQgZ3JhYmJpbmcgeW91ciBsdWdnYWdlIHlvdSB3YWxrIHRoZSBleHRyZW1lbHkgc2hvcnQgZGlzdGFuY2UgdG8gZGVwYXJ0dXJlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0b2xsYm9vdGhNb3RvcndheS5BdXRvRXhpdCA9IHRvbGxib3RoTGVhdmU7XHJcblxyXG4gICAgICAgICAgICBmcmVlUm9hZC5BdXRvRXhpdCA9IGZyZWVSb3V0ZUxlYXZlO1xyXG4gICAgICAgICAgICB2YXIgd2FsayA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwid2Fsa1wiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlcmUgaXMgYSB3YWxraW5nIHBhdGggdG8gdGhlIGFpcnBvcnQgdGhhdCBzZWVtcyB0byBnbyB0aHJvdWdoIGEgZmV3IGZpZWxkc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIlRoZSB3YWxrIHRvIHRoZSBhaXJwb3J0IGlzIGxvbmcgYW5kIGFyZHVvdXMsIGFuZCBzZWVtcyB0byB0YWtlIGEgbG90IGxvbmdlciB0aGVuIGl0IGxvb2tlZCBmcm9tIHRoZSBtYXAgYXQgdGhlIGhvdGVsXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEyMCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJXYWxraW5nIFBhdGhcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvdXRzaWRlSG90ZWwuRXhpdHMuQWRkKHdhbGspO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBpbnNpZGVBaXJwb3J0ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSW5zaWRlIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJJbnNpZGUgdGhlIGFpcnBvcnQgdGhpbmdzIGFyZSBxdWl0ZSBidXN5LCB0byB0aGUgbGVmdCBhcmUgdGhlIGNoZWNrLWluIGRlc2tzIHdoaWxlIHRvIHRoZSByaWdodCBpcyB0aGUgVFNBIHF1ZXVlLlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJCeSB0aGUgVFNBIHF1ZXVlIGVudHJhbmNlIGlzIGEgc2lnbiBzYXlpbmcgXFxcIkJ1eSBUU0EgUHJlQ2hlY2sgdG8gdXNlIHRoaXMgc2hvcnRlciBxdWV1ZS4gT25seSAkODVcXFwiIE5leHQgdG8gYSBiYXJyaWVyICBsZWFkaW5nIHRvIGEgbXVjaCBzaG9ydGVyIHF1ZXVlXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZ29JbnNpZGUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gaW5zaWRlQWlycG9ydCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJJbnNpZGUgQWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBkb29ycyBhcmUgd2lkZSBvcGVuLCB0aGUgb25seSBvYnN0YWNsZSBiZWluZyB0aGUgc3RyZWFtIG9mIHBlb3BsZSBnb2luZyBvbiB0aGVpciB0cmF2ZWwgcGxhbnNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gdGhyb3VnaCB0aGUgZG9vcnMsIG1hbmFnaW5nIHRvIGF2b2lkIGdldHRpbmcgam9zdGxlZCBhYm91dFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImluXCIsIFwiaW5zaWRlXCIsIFwiaW5kb29yc1wiLCBcImVudGVyXCIsIFwiZW50cmFuY2VcIiwgXCJhaXJwb3J0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWlycG9ydEVudHJhbmNlLkV4aXRzLkFkZChnb0luc2lkZSk7XHJcbiAgICAgICAgICAgIHZhciB0c2FFbnRyYW5jZSA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlRTQSBFbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiWW91IGhlYWQgdG93YXJkcyB0aGUgVFNBIFNlY3VyaXR5IENoZWNrcG9pbnQsIGl0IHNlZW1zIHRvIGJlIHNwbGl0IGludG8gdHdvLCBhIHF1aWNrIFByZUNoZWNrIGFyZWEsIGFuZCBhIHNsb3cgYXJlYVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gQFwiTmVhciB0aGUgcXVpY2sgem9uZSBpcyBhIHNpZ24sIHNwZWFrIHRvIGEgVFNBIE9mZmljZXIgdG8gYnV5IGEgc2luZ2xlLXVzZSBUU0EgUHJlQ2hlY2sgYWNjZXNzLCBvbmx5ICQ4NSwgXHJcbkRvIHlvdSBjaG9vc2UgdG8gYnV5IFRTQSBQcmVDaGVjaywgb3IgZG8geW91IHVzZSB0aGUgZ2VuZXJhbCBxdWV1ZT9cclxuXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvVG9Uc2EgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+ICFnYW1lLkNoZWNrZWRJbixcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJUaGUgZ3VhcmQgYXQgdGhlIGZyb250IG9mIHRoZSBxdWV1ZSBsb29rcyBhdCB5b3UgZmxhdGx5IGFza2luZyBmb3IgeW91ciBib2FyZGluZyBwYXNzLCBsb29raW5nIGJhY2sgZm9yIGEgc2Vjb25kIHlvdSBmYWNlLXBhbG0gYmVmb3JlIGxlYXZpbmcgdG8gZG8gc29cIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gMixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdHNhRW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVFNBIEVudHJhbmNlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiVFNBXCIsIFwicmlnaHRcIiwgXCJzZWN1cml0eVwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIEVudHJhbmNlIHRvIHRoZSBUU0EgYXJlYSBpcyBsYXJnZSwgYnV0IGd1YXJkZWQgYnkgYSBjb3VwbGUgbWVuIGNoZWNraW5nIGJvYXJkaW5nIHBhc3Nlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnZXQgaW4gbGluZSwgc2hvd2luZyB5b3VyIGJvYXJkaW5nIHBhc3MgdG8gdGhlIGd1YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDFcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hlY2tJbkRlc2sgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJUaGUgQ2hlY2staW4gRGVza1wiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGNoZWNrLWluIGRlc2sgZmluYWxseSBpbiB2aWV3LCB0aGUgd29tYW4gc2F0IGluIGZyb250IGFza3MgeW91IHRvICdjaGVjayBpbicgd2l0aCBhIHNtaWxlXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIk5lYXIgdGhlIGRlc2sgaXMgYSBjb3VwbGUgbGVhZmxldHMgYWJvdXQgY2Fycnkgb24gc2l6ZSBhbmQgd2hhdCBpcyBhbmQgaXNudCBhbGxvd2VkXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvdG9DaGVja2luID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiQ2hlY2tpbiBsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGNoZWNrSW5EZXNrLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImNoZWNraW5cIiwgXCJjaGVja1wiLCBcImRlc2tcIiwgXCJsZWZ0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgbGluZSB0byB0aGUgY2hlY2staW4gZGVzayBpcyBxdWl0ZSBsb25nLCBidXQgbm90IHVud2llbGR5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiV2FpdGluZyBpbiB0aGUgbGluZSwgaXQgbW92ZXMgYXQgYSBtb2RlcmF0ZSBwYWNlLCBhbmQgc29vbiBlbm91Z2ggeW91IGFyZSBhdCB0aGUgY2hlY2staW4gZGVza1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbGVhdmVDaGVja2luID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiTGVhdmUgY2hlY2staW5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+ICFnYW1lLkNoZWNrZWRJbixcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJBZnRlciBmaW5hbGx5IGdldHRpbmcgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2staW4gbGluZSB5b3UgcmVhbGl6ZSB5b3UgZm9yZ290IHlvdXIgc3VpdGNhc2UgbmVhciB0aGUgc3RhcnQsIHdpdGggYW4gYW5ub3llZCBzaWdoIHlvdSBnbyBiYWNrIHRvIGdldCBpdFwiLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RpbWUgPSA1LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcInJpZ2h0XCIsIFwib3V0XCIsIFwiYmFja1wiIH0sXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGluc2lkZUFpcnBvcnQsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHdheSBvdXQgb2YgY2hlY2staW4gaXMgYSBzbWFsbCBhbGxleXdheSBiZXR3ZWVuIHRoZSBkZXNrc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSBjaGVjay1pbiBmb2xsb3dpbmcgdGhlIGxpbmVzLCBhbmQgc29vbiBmaW5kIHlvdXJzZWxmIGJhY2sgd2hlcmUgeW91IHN0YXJ0ZWQgaW4gdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjaGVja0luRGVzay5FeGl0cy5BZGQobGVhdmVDaGVja2luKTtcclxuICAgICAgICAgICAgaW5zaWRlQWlycG9ydC5FeGl0cy5BZGQoZ290b0NoZWNraW4pO1xyXG5cclxuICAgICAgICAgICAgaW5zaWRlQWlycG9ydC5FeGl0cy5BZGQoZ29Ub1RzYSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJlQ2hlY2sgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBQcmVDaGVjayB6b25lIGlzIG5pY2UgYW5kIHF1aWNrLCB5b3UgZHVtcCB5b3VyIGJhY2twYWNrIG9uIHRoZSB4cmF5IGJlbHQgYmVmb3JlIHlvdSBnbyB0aHJvdWdoIHRoZSBzY2FubmVyIHdpdGhvdXQgbmVlZGluZyB0byB0YWtlIG9mZiB5b3VyIGJlbHQgYW5kIHNob2VzXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkFzIHlvdSBwaWNrIHVwIHlvdXIgYmFja3BhY2sgb2ZmIHRoZSB4cmF5IGJlbHQsIHlvdSBzbWVsbCBidXJyaXRvcyBmcm9tIHRoZSBNZXhpY2FuIGZvb2Qgc3RhbmQgb3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJQcmVDaGVja1wiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJlQ2hlY2tFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiUHJlQ2hlY2tcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gcHJlQ2hlY2ssXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIFByZUNoZWNrIFNlY3VyaXR5IHF1ZXVlIHdvdWxkIGJlIHF1aWNrZXIsIGJ1dCBpdCB3aWxsIGNvc3QgeW91LiBJdCBsb29rcyBsaWtlIHRoZXJlcyBvbmx5IG9uZSBvdGhlciBwYXNzZW5nZXIgaGVhZGluZyBmb3IgaXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgcGF5IHRoZSAkODUgZmVlIGZyb20geW91ciBidWRnZXQsIGFuZCB0aGUgVFNBIE9mZmljZXIgd2F2ZXMgeW91IHRvIHRoZSBQcmVDaGVjayBTZWN1cml0eSBab25lXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDg1LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAzLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcInByZWNoZWNrXCIsIFwic2hvcnRcIiwgXCJwYXlcIiB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRzYUVudHJhbmNlLkV4aXRzLkFkZChwcmVDaGVja0V4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdlbmVyYWxTZWN1cml0eSA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkdlbmVyYWwgU2VjdXJpdHlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIkV2ZW50dWFsbHkgeW91IGdldCB0byB0aGUgc2VjdXJpdHkgZGVzayBhbmQgYSBUU0EgT2ZmaWNlciBnaXZlcyB5b3UgdHdvIHRyYXlzIGFuZCB0ZWxscyB5b3UgdG8gJ2VtcHR5IHBvY2tldHMnICdyZW1vdmUgYmVsdCcgJ3JlbW92ZSBzaG9lcycgYW5kICdwbGFjZSBiYWNrcGFjaycgaW4gb25lIHRyYXksIGFuZCAncmVtb3ZlIGVsZWN0cm9uaWNzJyBpbnRvIGFub3RoZXIgdHJheS5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiWW91IGpvc3RsZSB5b3VyIHdheSBmb3J3YXJkIHRvIGEgdGFibGUsIHNvIHRoYXQgeW91IGNhbiBnZXQgcmVhZHkgdG8gYmUgY2xlYXJlZCB0aHJvdWdoIHNlY3VyaXR5XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZW5lcmFsRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkdlbmVyYWwgU2VjdXJpdHlcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gZ2VuZXJhbFNlY3VyaXR5LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZXJlJ3MgYSBsb25nIHF1ZXVlIGZvciB0aGUgR2VuZXJhbCBTZWN1cml0eSwgZXZlcnlvbmUgaXMgdGFraW5nIHRoZWlyIHNob2VzIGFuZCBiZWx0cyBvZmYgYW5kIHRha2luZyB0aGUgZWxlY3Ryb25pY3Mgb3V0IG9mIHRoZWlyIGJhZ3NcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZGVjaWRlIHRvIHNhdmUgeW91ciBjYXNoLCBhbmQgam9pbiB0aGUgaG9yZGUgb2YgdHJhdmVsbGVycyBtYWtpbmcgdGhlaXIgd2F5IHRvIHRoZSBHZW5lcmFsIFNlY3VyaXR5IHpvbmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMTUsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiZnJlZVwiLCBcImdlbmVyYWxcIiB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRzYUVudHJhbmNlLkV4aXRzLkFkZChnZW5lcmFsRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGVybWluYWwgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGRlcGFydHVyZSB0ZXJtaW5hbCBiZXlvbmQgVFNBIGlzIGJ1c3RsaW5nIHdpdGggYWN0aXZpdHksIHBlb3BsZSwgYW5kIHNtZWxscyBvZiBhbGwgc2hhcGVzIGFuZCBzaXplc1wiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJIZXJlIGFuZCB0aGVyZSBmb29kIHNob3BzIGFyZSBkb3R0ZWQgYXJvdW5kLCBlbnN1cmluZyB5b3UgYXJlIG5ldmVyIHRvbyBmYXIgYXdheSBmcm9tIG9uZS4gXCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIEJha2VyeSBhbmQgdGhlIE1leGljYW4gcGxhY2UgbG9vayBlc3BlY2lhbGx5IGludGVyZXN0aW5nLiBUaGUgc2lnbiBvbiB0aGUgY2VpbGluZyBzaG93cyBMb3VuZ2UgdG8gdGhlIHJpZ2h0LCBhbmQgeW91ciBnYXRlIG51bWJlciBhIHRpbnkgYml0IHRvIHRoZSBsZWZ0XCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHByZUNoZWNrTGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGaW5pc2ggc2VjdXJpdHlcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiZmluaXNoXCIsIFwib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgdGVybWluYWwsIHdpdGggdGhlIHNob3BzLCBmb29kIHN0YWxscywgYW5kIHdhaXRpbmcgYXJlYXMsIGFyZSBsYWlkIG91dCBiZWZvcmUgeW91XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IHRoYW5rIHRoZSBUU0EgT2ZmaWNlciBhcyB5b3UgbGVhdmUgYW5kIGhlYWQgaW50byB0aGUgQWlycG9ydCBEZXBhcnR1cmVzIFRlcm1pbmFsXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcHJlQ2hlY2suRXhpdHMuQWRkKHByZUNoZWNrTGVhdmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdlbmVyYWxFeGl0TGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGaW5pc2ggc2VjdXJpdHlcIixcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+IGdhbWUuQ3VycmVudEJlbG9uZ2luZ3MgIT0gQmVsb25naW5ncy5Ob25lLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIlRoZSBUU0EgT2ZmaWNlciBncnVudHMgYXQgeW91IGFuZCBzdGFyZXMgeW91IGRvd24uIFxcXCJFbXB0eSB5b3VyIHBvY2tldHMsIHRha2UgeW91ciBzaG9lcyBvZmYsIHRha2UgeW91ciBiZWx0IG9mZiwgZW1wdHkgeW91ciBlbGVjdHJvbmljcyBhbmQgcGxhY2UgeW91ciBiYWNrcGFjayBpbnRvIHRoZSB0cmF5LCBCRUZPUkUgZ29pbmcgdGhyb3VnaCBzZWN1cml0eSFcIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRlcm1pbmFsLCB3aXRoIHRoZSBzaG9wcywgZm9vZCBzdGFsbHMsIGFuZCB3YWl0aW5nIGFyZWFzLCBhcmUgbGFpZCBvdXQgYmVmb3JlIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSB0aGFuayB0aGUgVFNBIE9mZmljZXIgYXMgeW91IGxlYXZlIGFuZCBoZWFkIGludG8gdGhlIEFpcnBvcnQgRGVwYXJ0dXJlcyBUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA2LFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZpbmlzaFwiLCBcIm91dFwiIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGdlbmVyYWxTZWN1cml0eS5FeGl0cy5BZGQoZ2VuZXJhbEV4aXRMZWF2ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWV4aWNhbiA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk1leGljYW4gZm9vZFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiWW91IGdvIHRvd2FyZHMgdGhlIG1leGljYW4gZm9vZCBzdGFsbCBhcyBhIHdvcmtlciBsb29rcyB1cCBhbmQgc21pbGVzIGF0IHlvdS4gT24gdGhlIGNvdW50ZXIgaXMgYSBzaWduIHRoYXQgcmVhZHMgXFxcIkRldmVsb3BlcnMnIEZhdm91cml0ZTogQnJlYWtmYXN0IEJ1cnJpdG8gJDEwXFxcIiwgYmVoaW5kIHRoZSB3b3JrZXIgaXMgYSBzb2RhIGZvdW50YWluXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIllvdSBub3RpY2UgYSBob2xkZXIgYXQgdGhlIGVuZCBvZiB0aGUgY291bnRlciwgY29udGFpbmluZyBkaXNwb3NhYmxlIGN1dGxlcnlcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ1eU1leGljYW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJCdXkgQnVycml0b1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImJ1eVwiLCBcImJ1cnJpdG9cIiB9LFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0ZXJtaW5hbCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJTdG9tYWNoIGdydW1ibGluZywgeW91IG9yZGVyIHRoZSBCcmVha2Zhc3QgQnVycml0byBhbmQgYSBzb2EsIHRoZSB3b3JrZXIgZ29lcyBhbmQgbWFrZXMgb25lIGZvciB5b3UsIHJldHVybmluZyBhZnRlciBhIGZldyBtaW51dGVzLCBzaGUgcGFzc2VzIHlvdSBhIGZvaWwtd3JhcHBlZCBnaWZ0LCBhbmQgYSBjdXAgb2YgU3RyYXdiZXJyeSBmbGF2b3JlZCBTb2RhLiBcXFwiJDEzIHBsZWFzZVxcXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMTMsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbWV4aWNhbi5FeGl0cy5BZGQoYnV5TWV4aWNhbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ29NZXhpY2FuID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVmlzaXQgTWV4aWNhbiBTdG9yZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIm1leGljYW5cIiwgXCJidXJyaXRvXCIgfSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gbWV4aWNhbixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgU3RhbGwgaXMgZG9uZSB1cCBpbiBzdGVyZW90eXBpY2FsIG1leGljYW4gc3R5bGVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGRlY2lkZSB0byBnbyBsb29rIG92ZXIgd2hhdCBraW5kIG9mIGJ1cnJpdG9zIHRoZSBtZXhpY2FuIHBsYWNlIHNlbGxzLlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChnb01leGljYW4pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJha2VyeSA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkJha2VyeVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIHNtYWxsIGJha2VyeSBjYXRjaGVzIHlvdXIgZXllLCBhbmQgeW91IGVudGVyLCB0aGUgc21lbGwgb2Ygd2FybSBicmVhZCBlbnRpY2luZyB5b3UuXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIlRoZSBzb2xlIHN0YWZmLW1lbWJlciB3ZWxjb21lcyB5b3UuIFlvdSBjYW4gc2VlIGhlciBuYW1ldGFnIHJlYWRzICdNaXNoeSAtIEhlYWQgQmFrZXInXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ1eUJha2VyeSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIk9yZGVyIGZvb2RcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdG9tYWNoIGdydW1ibGluZywgeW91IG9yZGVyIGEgYmFnZWwgYW5kIE9yYW5nZSBKdWljZSwgTWlzaHkgZ3JhYnMgeW91IGEgYmFnZWwgYW5kIHBvdXJzIHlvdSBhIGN1cCBvZiBmcmVzaCBvcmFuZ2UganVpY2UsIHBhc3NpbmcgaXQgb3ZlciB0aGUgY291bnRlciB3aXRoIGEgc21pbGUuIFxcXCIkNiBwbGVhc2VcXFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDYsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDQsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwib3JkZXJcIiwgXCJiYWtlcnlcIiwgXCJicmVhZFwiLCBcImJhZ2VsXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBiYWtlcnkuRXhpdHMuQWRkKGJ1eUJha2VyeSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ29CYWtlcnkgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJWaXNpdCBCYWtlcnlcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgQmFrZXJ5IGxvb2tzIHdhcm0sIGFuZCBpbnZpdGluZywgd2l0aCBhIHNvZnQgc2NlbnQgb2YgZnJlc2ggYnJlYWQgd2FmdGluZyBmcm9tIGl0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGdvIGludG8gdGhlIGJha2VyeSwgZW5qb3lpbmcgdGhlIGFtYmlhbmNlIHByb3ZpZGVkXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGJha2VyeSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJiYWtlcnlcIiwgXCJtaXNoeVwiLCBcImJyZWFkXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ29CYWtlcnkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvdW5nZUV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUaGUgTG91bmdlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIllvdSB3YW5kZXIgb2ZmIHRvIHRoZSBsb3VuZ2UsIGhvcGluZyB5b3UgbWF5IGJlIGFibGUgdG8gdGFsayB5b3VyIHdheSBpbiBvbiB0aGlzIGVjb25vbXkgdGlja2V0LCBzYWRseSBob3dldmVyIGFzIHlvdSB0cnkgdG8gdGFsayB0aGUgYXR0ZW5kZW50IGludG8gaXQsIHNoZSBpcyBoYXZpbmcgbm9uZSBvZiBpdCBhbmQgcmVmdXNlcyB5b3UgZW50cnkuXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDUsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwibG91bmdlXCIsIFwiZ29sZFwiIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGVybWluYWwuRXhpdHMuQWRkKGxvdW5nZUV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdhdGUgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJHYXRlIDQyXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIkdhdGUgNDMgbG9va3MgbGlrZSBwcmV0dHkgbXVjaCBldmVyeSBvdGhlciBnYXRlLCBidXQgYSBxdWljayBjaGVjayBvZiB5b3VyIGJvYXJkaW5nIHBhc3Mgc2hvd3MgdGhpcyBvbmUgaXMgeW91cnNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaGUgbGluZSBzZWVtcyB0byBiZSBxdWl0ZSBzaG9ydCwgc2VlbXMgbm90IG1hbnkgcGVvcGxlIHdhbnQgdG8gZ28gdGhlIHNhbWUgcGxhY2UgYXMgeW91IHRvZGF5XCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIEVuZFNjcmVlbiA9IG5ldyBFbmRTY3JlZW5Sb29tKHRoaXMpO1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWxsIHRoaXMgaW5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdhdGVFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiSW4gdGhlIEFpcnBsYW5lXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIHRoZSBHYXRlIGFuZCBzb29uIHlvdSBhcmUgb24gdGhlIGFpcnBsYW5lLiBZb3VyIHNlYXQgaXMgYXMgY3JhbXBlZCBhcyB1c3VhbCwgYnV0IGl0IGZlZWxzIGxpa2UgYSB0aHJvbmUgdG9kYXlcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gRW5kU2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIndpblwiIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChnYXRlRXhpdCk7XHJcbiAgICAgICAgICAgIGdhdGUuQXV0b0V4aXQgPSBnYXRlRXhpdDtcclxuXHJcbiAgICAgICAgICAgIEN1cnJlbnRSb29tID0gaG90ZWxSb29tO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJvb21UaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTFcIikuUm9vbU5hbWU6KHN0cmluZyludWxsKSA/PyBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSb29tSGVhZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBidWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgdmFyIHJvb21OYW1lID0gKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTJcIikuUm9vbU5hbWU6KHN0cmluZyludWxsKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUocm9vbU5hbWUpO1xyXG4gICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoc3RyaW5nLkZvcm1hdChcIlRpbWUgdG8gRmxpZ2h0OiB7MDpEMn06ezE6RDJ9XCIsVGltZVRvRmxpZ2h0IC8gNjAsVGltZVRvRmxpZ2h0ICUgNjApKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHN0cmluZy5Gb3JtYXQoXCJNb25leTogezA6Q31cIiwoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixQbGF5ZXIpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxQbGF5ZXI+KFwia2V5M1wiKS5Nb25leTooZGVjaW1hbD8pbnVsbCkgPz8gMCkpO1xyXG4gICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXk0XCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTRcIikuU2hvcnRSb29tRGVzYzooc3RyaW5nKW51bGwpID8/IFwiXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVpbGRlci5Ub1N0cmluZygpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VJbnB1dChzdHJpbmcgaW5wdXQsIG91dCBzdHJpbmcgb3V0cHV0VGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lT3ZlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0VGV4dCA9IFwiU29ycnksIHRoaXMgZ2FtZSBpcyBvdmVyXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29tbWFuZFNwbGl0ID0gaW5wdXQuU3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNvbW1hbmQgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxJQ29tbWFuZD4oQ29tbWFuZHMsKEZ1bmM8SUNvbW1hbmQsYm9vbD4pKGNvbW1hbmQgPT4gU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Db250YWluczxzdHJpbmc+KGNvbW1hbmQuR2V0Q29tbWFuZEFsaWFzZXMoKSxjb21tYW5kU3BsaXRbMF0uVG9Mb3dlcigpKSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5UcnlQYXJzZUNvbW1hbmQoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPHN0cmluZz4oY29tbWFuZFNwbGl0LDEpKSwgdGhpcywgb3V0IG91dHB1dFRleHQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoVGltZVRvRmxpZ2h0IDw9IDAgfHwgUGxheWVyLk1vbmV5IDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJTb3JyeSwgaXQgc2VlbXMgeW91IFwiICsgKFRpbWVUb0ZsaWdodCA8PSAwID8gXCJyYW4gb3V0IG9mIHRpbWVcIiA6IFwicmFuIG91dCBvZiBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhcnNlSW5wdXQoc3RyaW5nIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENoYW5nZVJvb20oRXhpdCBleGl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IGV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICBDdXJyZW50Um9vbSA9IGV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgIFRpbWVUb0ZsaWdodCAtPSBleGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICBQbGF5ZXIuTW9uZXkgLT0gZXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IEdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PElDb21tYW5kPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29tbWFuZHM9bmV3IExpc3Q8SUNvbW1hbmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuU3lzdGVtO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWw7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbC5Db250cm9scztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEdhbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTWFpblBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIEdhbWUuSW5pdGlhbGl6ZUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gR2FtZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHN0YXR1c1NjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIHN0YXR1c1NjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25MaXN0Lkl0ZW1zLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gR2FtZS5DdXJyZW50Um9vbS5FeGl0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uTGlzdC5JdGVtcy5BZGQoY3VycmVudFJvb21FeGl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHZvaWQgZGlyZWN0aW9uX0NsaWNrKG9iamVjdCBzZW5kZXIsIFJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBhY3Rpb25CdXR0b25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGlucHV0X0tleURvd24ob2JqZWN0IHNlbmRlciwgV2luZG93cy5VSS5YYW1sLklucHV0LktleVJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZS5LZXk9PVZpcnR1YWxLZXkuRW50ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhhbmRsZUlucHV0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXN0SW5wdXRMaXN0Lkl0ZW1zLkFkZChpbnB1dC5UZXh0KTtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5TZWxlY3RlZEluZGV4ID0gcGFzdElucHV0TGlzdC5JdGVtcy5Db3VudCAtIDE7XHJcbnN0cmluZyBvdXRwdXRUZXh0O1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEdhbWUuVHJ5UGFyc2VJbnB1dChpbnB1dC5UZXh0LCBvdXQgb3V0cHV0VGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgICAgIGlucHV0LlRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gXCI+IFwiICsgaW5wdXQuVGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBvdXRwdXRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0dXNTY3JlZW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBkaXJlY3Rpb25MaXN0X1NlbGVjdGlvbkNoYW5nZWQob2JqZWN0IHNlbmRlciwgU2VsZWN0aW9uQ2hhbmdlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRXhpdCA9IGRpcmVjdGlvbkxpc3QuU2VsZWN0ZWRJdGVtIGFzIEV4aXQ7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEV4aXQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaW5wdXQuVGV4dCA9IFwiZ28gXCIgKyAoc2VsZWN0ZWRFeGl0LkV4aXROYW1lcy5MZW5ndGggPiAwID8gc2VsZWN0ZWRFeGl0LkV4aXROYW1lc1swXSA6IFwiXCIpO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIEdhbWUgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0dhbWU9bmV3IEdhbWUoKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBsYXllclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVjaW1hbCBNb25leSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Nb25leSA9IDEyNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGVja0luOklDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjaGVjay1pblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7XCJjaGVja1wifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIitFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50c1swXSAhPSBcImluXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiSSBoYXZlIG5vdGhpbmcgdG8gY2hlY2suXCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyU3RhdGUuUm9vbVRpdGxlKCkuVG9Mb3dlcigpICE9IFwidGhlIGNoZWNrLWluIGRlc2tcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJTb3JyeSwgeW91IGNhbiBub3QgY2hlY2sgaW4gaGVyZVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJTdGF0ZS5DaGVja2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBleGl0ID0gY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHNbMF07XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgZXhpdC5FeGl0VGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRSb29tID0gZXhpdC5EZXN0aW5hdGlvbjtcclxuICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGV4aXQuRXhpdFRpbWU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlBsYXllci5Nb25leSAtPSBleGl0LkV4aXRDb3N0O1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdvIDogSUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkdvXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHsgXCJnb1wiLCBcImhlYWRcIiwgXCJ3YWxrXCIsIFwiZHJpdmVcIiwgXCJnZXQgaW5cIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIlNvcnJ5LCBJbnZhbGlkIGRlc3RpbmF0aW9uIG9yIGNvbW1hbmQgZm9ybWF0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY3VycmVudFJvb21FeGl0IGluIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8RXhpdD4oY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHMsKEZ1bmM8RXhpdCxib29sPikoY3VycmVudFJvb21FeGl0ID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjdXJyZW50Um9vbUV4aXQuRXhpdE5hbWVzLGNvbW1hbmRBcmd1bWVudHNbMF0uVG9Mb3dlcigpKSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJvb21FeGl0LkV4aXRMb2NrZWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNMb2NrZWQgPSBjdXJyZW50Um9vbUV4aXQuRXhpdExvY2tlZChjdXJTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gY3VycmVudFJvb21FeGl0LkxvY2tUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gY3VycmVudFJvb21FeGl0LkxvY2tUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gRW52aXJvbm1lbnQuTmV3TGluZSArIGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IGN1clN0YXRlLkNoYW5nZVJvb20oY3VycmVudFJvb21FeGl0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyU3RhdGUuQ3VycmVudFJvb20uQXV0b0V4aXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpdCA9IGN1clN0YXRlLkN1cnJlbnRSb29tLkF1dG9FeGl0O1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBjdXJTdGF0ZS5DaGFuZ2VSb29tKGV4aXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIkludmFsaWQgZGVzdGluYXRpb25cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTG9vazpJQ29tbWFuZFxyXG4gICAge1xyXG5wdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxue1xyXG4gICAgcmV0dXJuIFwiTG9va1wiO1xyXG59cHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxue1xyXG4gICAgcmV0dXJuIG5ld1tde1wibG9va1wiLCBcImxcIiwgXCJwZWVyXCIsIFwic3RhcmVcIiwgXCJleGFtaW5lXCJ9O1xyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJMb29rIGF0IGFuIGl0ZW1cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPVxyXG5zdHJpbmcuRm9ybWF0KFwiezB9ezF9ezJ9XCIsY3VyU3RhdGUuQ3VycmVudFJvb20uU2hvcnRSb29tRGVzYyxFbnZpcm9ubWVudC5OZXdMaW5lLGN1clN0YXRlLkN1cnJlbnRSb29tLkxvbmdSb29tRGVzYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzWzBdLlRvTG93ZXIoKSA9PSBcImF0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEFyZ3VtZW50cyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxzdHJpbmc+KGNvbW1hbmRBcmd1bWVudHMsMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvTG9vayA9IGNvbW1hbmRBcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY3VycmVudFJvb21FeGl0IGluIGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY3VycmVudFJvb21FeGl0LkV4aXROYW1lcyx0b0xvb2suVG9Mb3dlcigpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH17MX1cIixjdXJyZW50Um9vbUV4aXQuRXhpdERlc2MsRW52aXJvbm1lbnQuTmV3TGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2VjdXJpdHlDb21tYW5kOklDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJTZWN1cml0eVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7IFwicmVtb3ZlXCIsXCJwbGFjZVwiLFwiZW1wdHlcIn07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBiZWxvbmdpbmcgaW4gRW51bS5HZXRWYWx1ZXModHlwZW9mKEJlbG9uZ2luZ3MpKS5DYXN0PEJlbG9uZ2luZ3M+KCkpICBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJlbG9uZ2luZy5Ub1N0cmluZygpLlRvTG93ZXIoKSA9PSBjb21tYW5kQXJndW1lbnRzWzBdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRCZWxvbmdpbmdzIF49IGJlbG9uZ2luZztcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlbG9uZ2luZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5TaG9lczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSByZW1vdmUgeW91ciBzaG9lcyBhbmQgcHV0IHRoZW0gb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkJlbHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJZb3UgcmVtb3ZlIHlvdXIgYmVsdCBhbmQgcHV0IGl0IG9uIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5CYWNrcGFjazpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSB0YWtlIG9mZiB5b3VyIGJhY2twYWNrIGFuZCBwdXQgaXQgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLlBvY2tldHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCJZb3UgZW1wdHkgeW91ciBwb2NrZXRzIGFuZCBwdXQgdGhlIGNvbnRlbnRzIG9uIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQmVsb25naW5ncy5FbGVjdHJvbmljczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSBlbXB0eSB5b3VyIGVsZWN0cm9uaWNzIG91dCBvbnRvIHRoZSBiZWx0XCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIkkgZG8gbm90IGhhdmUgdGhhdFwiK0Vudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBjbGFzcyBFbmRTY3JlZW5Sb29tIDogUm9vbVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEN1clN0YXRlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZFNjcmVlblJvb20oR2FtZSBnYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DdXJTdGF0ZSA9IGdhbWU7XHJcbiAgICAgICAgfVxyXG5wdWJsaWMgbmV3IHN0cmluZyBTaG9ydFJvb21EZXNjXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQ29uZ3JhdHVsYXRpb25zLCB5b3Ugd29uISBZb3UgaGFkIHswOkQyfTp7MTpEMn0gcmVtYWluaW5nLCBhbmQgezI6Q30gcmVtYWluaW5nXCIsQ3VyU3RhdGUuVGltZVRvRmxpZ2h0IC8gNjAsQ3VyU3RhdGUuVGltZVRvRmxpZ2h0ICUgNjAsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsQ3VyU3RhdGUuUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTFcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApO1xyXG4gICAgfVxyXG59ICAgIH1cclxufVxyXG4iXQp9Cg==
