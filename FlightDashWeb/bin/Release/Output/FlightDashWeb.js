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


                var ResourceDictionary_399c753b2f3d4c6b819145f5b8e0a6b8 = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_399c753b2f3d4c6b819145f5b8e0a6b8;

                this.Resources = ResourceDictionary_399c753b2f3d4c6b819145f5b8e0a6b8;







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
                this.CurrentBelongings = 31;
            },
            MakeRooms: function () {
                var $t;
                var hotelRoom = ($t = new FlightDashWeb.Room(), $t.RoomName = "Hotel Room", $t.ShortRoomDesc = "A pretty basic Hotel room. Nothing much out of the ordinary here", $t.LongRoomDesc = "The bed is unmade, left in a mess from your rude awakening, as the alarm blinks 12:00 merrily at you, ignorant of your distress.\r\n Your suitcase lays on the floor at the foot of the bed, neatly packed.\r\n", $t);

                var outsideHotel = ($t = new FlightDashWeb.Room(), $t.RoomName = "Outside Hotel", $t.ShortRoomDesc = "Outside the weather is calm, blue skies. Your car sits in the assigned parking spot awaiting you", $t.LongRoomDesc = "In the distance you see on the free road some hints of a traffic jam.", $t);
                var hotelExit = ($t = new FlightDashWeb.Exit(), $t.Destination = outsideHotel, $t.ExitDesc = "The hotel door has a sign on it saying \"Please remember your key will not work once your checkout time is past, please remember all your belongings\"\r\n", $t.ExitText = "Leaving the hotel you hear it lock behind you, dropping your keys off at reception you head into the carpark to pick up your rental.", $t.ExitName = "Outside", $t.ExitNames = System.Array.init(["outside", "door", "exit", "out"], System.String), $t.ExitTime = 3, $t.ExitCost = System.Decimal(0), $t);
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
                }, $t.LockText = "The guard at the front of the queue looks at you flatly asking for your boarding pass, looking back for a second you face-palm before leaving to do so", $t.LockTime = 2, $t.Destination = tsaEntrance, $t.ExitCost = System.Decimal(0), $t.ExitName = "TSA Entrance", $t.ExitNames = System.Array.init(["tsa", "right", "security"], System.String), $t.ExitDesc = "The Entrance to the TSA area is large, but guarded by a couple men checking boarding passes", $t.ExitText = "You get in line, showing your boarding pass to the guard", $t.ExitTime = 1, $t);

                var checkInDesk = ($t = new FlightDashWeb.Room(), $t.RoomName = "The Check-in Desk", $t.ShortRoomDesc = "The check-in desk finally in view, the woman sat in front asks you to 'check in' with a smile", $t.LongRoomDesc = "Near the desk is a couple leaflets about carry on size and what is and isnt allowed", $t);

                var gotoCheckin = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Checkin line", $t.Destination = checkInDesk, $t.ExitNames = System.Array.init(["checkin", "check", "desk", "left"], System.String), $t.ExitDesc = "The line to the check-in desk is quite long, but not unwieldy", $t.ExitText = "Waiting in the line, it moves at a moderate pace, and soon enough you are at the check-in desk", $t.ExitCost = System.Decimal(0), $t.ExitTime = 4, $t);

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

                var generalExit = ($t = new FlightDashWeb.Exit(), $t.ExitName = "General Security", $t.Destination = generalSecurity, $t.ExitDesc = "There's a long queue for the General Security, everyone is taking their shoes and belts off and taking the electronics out of their bags", $t.ExitText = "You decide to save your cash, and join the horde of travellers making their way to the General Security zone", $t.ExitTime = 8, $t.ExitNames = System.Array.init(["free", "general"], System.String), $t);
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

                var EndScreen = ($t = new FlightDashWeb.EndScreenRoom(this), $t.RoomName = "End Screen", $t);
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
                var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7;
                if (Bridge.is(this.CurrentRoom, FlightDashWeb.EndScreenRoom)) {
                    return System.String.format("Congratulations, you won! You had {0:D2}:{1:D2} remaining, and {2:C} remaining", Bridge.box(((Bridge.Int.div(this.TimeToFlight, 60)) | 0), System.Int32), Bridge.box(this.TimeToFlight % 60, System.Int32), ($t = (($t1 = this.Player) != null ? $t1.Money : System.Decimal.lift(null)), $t != null ? $t : System.Decimal(0)));
                } else {
                    var builder = new System.Text.StringBuilder();
                    var roomName = ($t2 = (($t3 = this.CurrentRoom) != null ? $t3.RoomName : null), $t2 != null ? $t2 : "");
                    builder.appendLine(roomName);
                    builder.appendLine("-------------------------------------");
                    builder.appendLine(System.String.format("Time to Flight: {0:D2}:{1:D2}", Bridge.box(((Bridge.Int.div(this.TimeToFlight, 60)) | 0), System.Int32), Bridge.box(this.TimeToFlight % 60, System.Int32)));
                    builder.appendLine(System.String.format("Money: {0:C}", [($t4 = (($t5 = this.Player) != null ? $t5.Money : System.Decimal.lift(null)), $t4 != null ? $t4 : System.Decimal(0))]));
                    builder.appendLine(($t6 = (($t7 = this.CurrentRoom) != null ? $t7.ShortRoomDesc : null), $t6 != null ? $t6 : ""));
                    return builder.toString();
                }
            },
            GetSpecialItems: function () {
                var items = new (System.Collections.Generic.List$1(System.String)).ctor();
                if (Bridge.referenceEquals(this.CurrentRoom.RoomName.toLowerCase(), "the check-in desk")) {
                    items.add("check in");
                } else if (Bridge.referenceEquals(this.CurrentRoom.RoomName.toLowerCase(), "general security")) {

                    if (System.Enum.hasFlag(this.CurrentBelongings, Bridge.box(FlightDashWeb.Belongings.Pockets, FlightDashWeb.Belongings, System.Enum.toStringFn(FlightDashWeb.Belongings)))) {
                        items.add("empty pockets");
                    }
                    if (System.Enum.hasFlag(this.CurrentBelongings, Bridge.box(FlightDashWeb.Belongings.Belt, FlightDashWeb.Belongings, System.Enum.toStringFn(FlightDashWeb.Belongings)))) {
                        items.add("remove belt");
                    }
                    if (System.Enum.hasFlag(this.CurrentBelongings, Bridge.box(FlightDashWeb.Belongings.Shoes, FlightDashWeb.Belongings, System.Enum.toStringFn(FlightDashWeb.Belongings)))) {
                        items.add("remove shoes");
                    }
                    if (System.Enum.hasFlag(this.CurrentBelongings, Bridge.box(FlightDashWeb.Belongings.Backpack, FlightDashWeb.Belongings, System.Enum.toStringFn(FlightDashWeb.Belongings)))) {
                        items.add("place backpack");
                    }
                    if (System.Enum.hasFlag(this.CurrentBelongings, Bridge.box(FlightDashWeb.Belongings.Electronics, FlightDashWeb.Belongings, System.Enum.toStringFn(FlightDashWeb.Belongings)))) {
                        items.add("remove electronics");
                    }
                }
                return items.ToArray();
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
                var $t, $t1;
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

                $t1 = Bridge.getEnumerator(this.Game.GetSpecialItems());
                try {
                    while ($t1.moveNext()) {
                        var specialItem = $t1.Current;
                        this.directionList.Items.add(specialItem);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
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
                    this.outputScroll.ScrollToVerticalOffset(this.outputScroll.ActualHeight);
                } else {
                    ($t2 = this.output).Text = ($t2.Text || "") + "> " + (this.input.Text || "") + ("\n" || "");
                    ($t3 = this.output).Text = ($t3.Text || "") + (outputText.v || "");
                    this.outputScroll.ScrollToVerticalOffset(this.outputScroll.ActualHeight);
                }

                this.statusScreen();
            },
            directionList_SelectionChanged: function (sender, e) {
                var $t;
                if (this.directionList.SelectedItem != null && Bridge.is(this.directionList.SelectedItem, FlightDashWeb.Exit)) {
                    var selectedExit = Bridge.as(this.directionList.SelectedItem, FlightDashWeb.Exit);
                    if (selectedExit == null) {
                        return;
                    }
                    this.input.Text = "go " + ((selectedExit.ExitNames.length > 0 ? ($t = selectedExit.ExitNames)[System.Array.index(0, $t)] : "") || "");
                } else if (this.directionList.SelectedItem != null && Bridge.is(this.directionList.SelectedItem, System.String)) {
                    var selectedText = Bridge.as(this.directionList.SelectedItem, System.String);
                    if (selectedText == null) {
                        return;
                    }
                    this.input.Text = selectedText;
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



                var Grid_86bdd4ebd32540219945d71dbbc43ad8 = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_86bdd4ebd32540219945d71dbbc43ad8.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_86bdd4ebd32540219945d71dbbc43ad8.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_41e9e19cbbff4a688dd8625ab7b6e128 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_41e9e19cbbff4a688dd8625ab7b6e128.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_2743b79ab85841279b71fcc81f7c3f04 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_2743b79ab85841279b71fcc81f7c3f04.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_9fe7cd2ba75f4fcb89a45d93bdf57897 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_9fe7cd2ba75f4fcb89a45d93bdf57897.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_69374b8355fc4038b5066a79d622aa80 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_69374b8355fc4038b5066a79d622aa80.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_c3fa24fbcf914168b35011f6746b5ce6 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_c3fa24fbcf914168b35011f6746b5ce6.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_86bdd4ebd32540219945d71dbbc43ad8.ColumnDefinitions.add(ColumnDefinition_41e9e19cbbff4a688dd8625ab7b6e128);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.ColumnDefinitions.add(ColumnDefinition_2743b79ab85841279b71fcc81f7c3f04);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.ColumnDefinitions.add(ColumnDefinition_9fe7cd2ba75f4fcb89a45d93bdf57897);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.ColumnDefinitions.add(ColumnDefinition_69374b8355fc4038b5066a79d622aa80);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.ColumnDefinitions.add(ColumnDefinition_c3fa24fbcf914168b35011f6746b5ce6);

                var RowDefinition_efd8c5b9e6f54ce1919f184562caa37e = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_efd8c5b9e6f54ce1919f184562caa37e.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_76ade837af374b89bea79888cd779efb = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_76ade837af374b89bea79888cd779efb.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_4a6dc0fdcff44543aa1b0f948d8c8a0f = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_4a6dc0fdcff44543aa1b0f948d8c8a0f.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_62906c9885404d618733d2d4e5c14d51 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_62906c9885404d618733d2d4e5c14d51.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_95f8e2a4fa474ca3ae5f0133310df5a4 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_95f8e2a4fa474ca3ae5f0133310df5a4.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_1bcb5ffc39ef4c34aba07c13776e4079 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_1bcb5ffc39ef4c34aba07c13776e4079.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_3920d426543c4a07b4cdd444247f8006 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_3920d426543c4a07b4cdd444247f8006.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_e1a7fe8a70c64975ae49154b2098ccf8 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_e1a7fe8a70c64975ae49154b2098ccf8.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_a9de1b77ceab4cc2bf73f49acc2fb5a1 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_a9de1b77ceab4cc2bf73f49acc2fb5a1.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_c058613b639b4347981bd3b54f3d5981 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_c058613b639b4347981bd3b54f3d5981.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_efd8c5b9e6f54ce1919f184562caa37e);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_76ade837af374b89bea79888cd779efb);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_4a6dc0fdcff44543aa1b0f948d8c8a0f);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_62906c9885404d618733d2d4e5c14d51);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_95f8e2a4fa474ca3ae5f0133310df5a4);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_1bcb5ffc39ef4c34aba07c13776e4079);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_3920d426543c4a07b4cdd444247f8006);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_e1a7fe8a70c64975ae49154b2098ccf8);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_a9de1b77ceab4cc2bf73f49acc2fb5a1);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.RowDefinitions.add(RowDefinition_c058613b639b4347981bd3b54f3d5981);

                var ScrollViewer_118409c6d17c463884245e0e853ec2b0 = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_118409c6d17c463884245e0e853ec2b0);
                ScrollViewer_118409c6d17c463884245e0e853ec2b0.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_118409c6d17c463884245e0e853ec2b0, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_118409c6d17c463884245e0e853ec2b0, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_118409c6d17c463884245e0e853ec2b0, 7);
                ScrollViewer_118409c6d17c463884245e0e853ec2b0.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_45bdf4a380944b31a763c600266e4a4e = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_45bdf4a380944b31a763c600266e4a4e.Text = "";
                this.RegisterName$1("output", TextBlock_45bdf4a380944b31a763c600266e4a4e);
                TextBlock_45bdf4a380944b31a763c600266e4a4e.Name = "output";
                TextBlock_45bdf4a380944b31a763c600266e4a4e.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_45bdf4a380944b31a763c600266e4a4e.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));
                TextBlock_45bdf4a380944b31a763c600266e4a4e.TextWrapping = Bridge.global.Windows.UI.Xaml.TextWrapping.Wrap;

                ScrollViewer_118409c6d17c463884245e0e853ec2b0.Content = TextBlock_45bdf4a380944b31a763c600266e4a4e;


                var ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c);
                ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c, 2);

                var TextBox_7db1d46668494c9db3bdd0c3dd7881d4 = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_7db1d46668494c9db3bdd0c3dd7881d4);
                TextBox_7db1d46668494c9db3bdd0c3dd7881d4.Name = "input";
                TextBox_7db1d46668494c9db3bdd0c3dd7881d4.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_7db1d46668494c9db3bdd0c3dd7881d4, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_7db1d46668494c9db3bdd0c3dd7881d4, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_7db1d46668494c9db3bdd0c3dd7881d4, 9);
                TextBox_7db1d46668494c9db3bdd0c3dd7881d4.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_29c5857501ff410b99a547083330f85d = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_29c5857501ff410b99a547083330f85d);
                Button_29c5857501ff410b99a547083330f85d.Name = "actionButton";
                Button_29c5857501ff410b99a547083330f85d.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_29c5857501ff410b99a547083330f85d, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_29c5857501ff410b99a547083330f85d, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_29c5857501ff410b99a547083330f85d, 9);
                Button_29c5857501ff410b99a547083330f85d.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                var ListBox_61c29ce582904634ba4ae1d58a3c3202 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("directionList", ListBox_61c29ce582904634ba4ae1d58a3c3202);
                ListBox_61c29ce582904634ba4ae1d58a3c3202.Name = "directionList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_61c29ce582904634ba4ae1d58a3c3202, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_61c29ce582904634ba4ae1d58a3c3202, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_61c29ce582904634ba4ae1d58a3c3202, 6);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_61c29ce582904634ba4ae1d58a3c3202, 4);
                ListBox_61c29ce582904634ba4ae1d58a3c3202.addSelectionChanged(Bridge.fn.cacheBind(this, this.directionList_SelectionChanged));

                Grid_86bdd4ebd32540219945d71dbbc43ad8.Children.add(ScrollViewer_118409c6d17c463884245e0e853ec2b0);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.Children.add(ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.Children.add(TextBox_7db1d46668494c9db3bdd0c3dd7881d4);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.Children.add(Button_29c5857501ff410b99a547083330f85d);
                Grid_86bdd4ebd32540219945d71dbbc43ad8.Children.add(ListBox_61c29ce582904634ba4ae1d58a3c3202);


                this.Content = Grid_86bdd4ebd32540219945d71dbbc43ad8;



                this.output = TextBlock_45bdf4a380944b31a763c600266e4a4e;
                this.outputScroll = ScrollViewer_118409c6d17c463884245e0e853ec2b0;
                this.pastInputList = ListBox_bcbdd79391ad4f96aa571ba54d6b9a4c;
                this.input = TextBox_7db1d46668494c9db3bdd0c3dd7881d4;
                this.actionButton = Button_29c5857501ff410b99a547083330f85d;
                this.directionList = ListBox_61c29ce582904634ba4ae1d58a3c3202;



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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovUmVsZWFzZS9BcHAueGFtbC5nLmNzIiwib2JqL1JlbGVhc2UvTWFpblBhZ2UueGFtbC5nLmNzIiwiQXBwLnhhbWwuY3MiLCJSb29tLmNzIiwiRXhpdC5jcyIsIkdhbWUuY3MiLCJNYWluUGFnZS54YW1sLmNzIiwiUGxheWVyLmNzIiwiQ29tbWFuZHMvQ2hlY2tJbi5jcyIsIkNvbW1hbmRzL0dvLmNzIiwiQ29tbWFuZHMvTG9vay5jcyIsIkNvbW1hbmRzL1NlY3VyaXR5Q29tbWFuZC5jcyIsIkVuZFNjcmVlblJvb20uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztvQkFRUUEsV0FBMkJBLEFBQU9BO29CQUNsQ0EsT0FBT0EsbUVBQTZEQTs7Ozs7Ozs7OztvQkNEcEVBLFdBQTJCQSxBQUFPQTtvQkFDbENBLE9BQU9BLG1FQUE2REE7Ozs7Ozs7OztZRG1FeEVBLElBQUlBOzs7Ozs7Ozs7Z0JFL0RJQTs7O2dCQUlBQSxlQUFlQSxJQUFJQTtnQkFDbkJBLHlDQUF5QkE7Ozs7O2dCRnVCekJBLElBQUlBO29CQUNBQTs7Z0JBQ0pBOzs7Z0JBR0FBLElBQUlBO29CQUVBQSxBQUFDQSxZQUFtQ0EsQUFBUUE7Ozs7Z0JBSzVEQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUdBQSwwREFBMERBLElBQUlBO2dCQUM5REEsaUJBQWlCQTs7Z0JBRWpCQSxpQkFBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkdqQ2lDQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JDZTFDQSxPQUFPQSw2QkFBb0JBOzs7Ozs7Ozs7Ozs7Ozs7OztnQ0MwZmtCQSxLQUFJQTs7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VUEsOERBQTREQTtvQ0FDdEVBO2dDQUNKQSxLQUFLQTtvQ0FDREEsK0JBQVVBLG1EQUFpREE7b0NBQzNEQTtnQ0FDSkE7b0NBQ0lBLFdBQVNBLHdCQUFxQkE7b0NBQzlCQTs7Ozs7Ozs7OztnQkFLaEJBO2dCQUNBQTs7Ozs7Ozs7Ozs7Ozs7O29CQzVDSkEsT0FBT0EsdUdBQStGQSxrRkFBMkJBLDJEQUEyQkEsT0FBQ0EsT0FBb0NBLHlCQUFrQkEsT0FBS0EsWUFBcURBLEFBQVVBLHlDQUEzSEE7Ozs7OzRCQVJ2SUE7OztnQkFFakJBLGdCQUFnQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gPENTSFRNTDU+PFhhbWxIYXNoPjk3NDNCOTAzMjE5RENFM0YwNTMzQjk1NTU4M0UzQjRDPC9YYW1sSGFzaD48UGFzc051bWJlcj4yPC9QYXNzTnVtYmVyPjxDb21waWxhdGlvbkRhdGU+Mi8yMy8yMDIwIDExOjE2OjQ3IEFNPC9Db21waWxhdGlvbkRhdGU+PC9DU0hUTUw1PlxyXG5cclxuXHJcblxyXG5wdWJsaWMgc3RhdGljIGNsYXNzIMeAx4BGbGlnaHRkYXNod2Vix4DHgENvbXBvbmVudMeAx4BBcHDHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5BcHApO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuVHlwZUluc3RhbnRpYXRpb25IZWxwZXIuSW5zdGFudGlhdGUodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XHJcbi8vICAgICBUaGlzIGNvZGUgd2FzIGF1dG8tZ2VuZXJhdGVkIGJ5IFwiQyMvWEFNTCBmb3IgSFRNTDVcIlxyXG4vL1xyXG4vLyAgICAgQ2hhbmdlcyB0byB0aGlzIGZpbGUgbWF5IGNhdXNlIGluY29ycmVjdCBiZWhhdmlvciBhbmQgd2lsbCBiZSBsb3N0IGlmXHJcbi8vICAgICB0aGUgY29kZSBpcyByZWdlbmVyYXRlZC5cclxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxucGFydGlhbCBjbGFzcyBBcHAgOiBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5BcHBsaWNhdGlvblxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxuXHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcQXBwLnhhbWxcIjtcclxuICAgICAgICAgICAgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAwMTg0XHJcblxyXG5cclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0Um9vdFBhdGggPSBAXCJPdXRwdXRcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRBcHBGaWxlc1BhdGggPSBAXCJhcHAtY3NodG1sNVxcYXBwXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0TGlicmFyaWVzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxsaWJzXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0UmVzb3VyY2VzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxyZXNcXFwiO1xyXG5cclxuXHJcbnZhciBSZXNvdXJjZURpY3Rpb25hcnlfMzk5Yzc1M2IyZjNkNGM2YjgxOTE0NWY1YjhlMGE2YjggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuUmVzb3VyY2VEaWN0aW9uYXJ5KCk7XHJcbnRoaXMuUmVzb3VyY2VzID0gUmVzb3VyY2VEaWN0aW9uYXJ5XzM5OWM3NTNiMmYzZDRjNmI4MTkxNDVmNWI4ZTBhNmI4O1xyXG5cclxudGhpcy5SZXNvdXJjZXMgPSBSZXNvdXJjZURpY3Rpb25hcnlfMzk5Yzc1M2IyZjNkNGM2YjgxOTE0NWY1YjhlMGE2Yjg7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxue1xyXG4gICAgbmV3IEFwcCgpO1xyXG59XHJcblxyXG59XHJcblxyXG5cclxufVxyXG4iLCIvLyA8Q1NIVE1MNT48WGFtbEhhc2g+MkU1Q0IwOEQ0NjM1REJGOTA2RTM0ODdBNDk5QzI4QUI8L1hhbWxIYXNoPjxQYXNzTnVtYmVyPjI8L1Bhc3NOdW1iZXI+PENvbXBpbGF0aW9uRGF0ZT4yLzIzLzIwMjAgMTE6MTY6NDcgQU08L0NvbXBpbGF0aW9uRGF0ZT48L0NTSFRNTDU+XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgY2xhc3Mgx4DHgEZsaWdodGRhc2h3ZWLHgMeAQ29tcG9uZW50x4DHgE1haW5wYWdlx4DHgFhhbWzHgMeARmFjdG9yeVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIG9iamVjdCBJbnN0YW50aWF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgZ2xvYmFsOjpTeXN0ZW0uVHlwZSB0eXBlID0gdHlwZW9mKEZsaWdodERhc2hXZWIuTWFpblBhZ2UpO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuVHlwZUluc3RhbnRpYXRpb25IZWxwZXIuSW5zdGFudGlhdGUodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XHJcbi8vICAgICBUaGlzIGNvZGUgd2FzIGF1dG8tZ2VuZXJhdGVkIGJ5IFwiQyMvWEFNTCBmb3IgSFRNTDVcIlxyXG4vL1xyXG4vLyAgICAgQ2hhbmdlcyB0byB0aGlzIGZpbGUgbWF5IGNhdXNlIGluY29ycmVjdCBiZWhhdmlvciBhbmQgd2lsbCBiZSBsb3N0IGlmXHJcbi8vICAgICB0aGUgY29kZSBpcyByZWdlbmVyYXRlZC5cclxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxucGFydGlhbCBjbGFzcyBNYWluUGFnZSA6IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlBhZ2Vcclxue1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMTY5LCA2NDksIDA2MjggLy8gUHJldmVudHMgd2FybmluZyBDUzAxNjkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgdXNlZCcpLCBDUzA2NDkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgYXNzaWduZWQgdG8sIGFuZCB3aWxsIGFsd2F5cyBoYXZlIGl0cyBkZWZhdWx0IHZhbHVlIG51bGwnKSwgYW5kIENTMDYyOCAoJ21lbWJlciA6IG5ldyBwcm90ZWN0ZWQgbWVtYmVyIGRlY2xhcmVkIGluIHNlYWxlZCBjbGFzcycpXHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0QmxvY2sgb3V0cHV0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuU2Nyb2xsVmlld2VyIG91dHB1dFNjcm9sbDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3ggcGFzdElucHV0TGlzdDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCb3ggaW5wdXQ7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5CdXR0b24gYWN0aW9uQnV0dG9uO1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCBkaXJlY3Rpb25MaXN0O1xyXG5cclxuXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDE2OSwgNjQ5LCAwNjI4XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2NvbnRlbnRMb2FkZWQ7XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZUNvbXBvbmVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2NvbnRlbnRMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9jb250ZW50TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDAxODQgLy8gUHJldmVudHMgd2FybmluZyBDUzAxODQgKCdUaGUgZ2l2ZW4gZXhwcmVzc2lvbiBpcyBuZXZlciBvZiB0aGUgcHJvdmlkZWQgKCd0eXBlJykgdHlwZScpXHJcbiAgICAgICAgICAgIGlmICh0aGlzIGlzIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKChnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpKG9iamVjdCl0aGlzKS5YYW1sU291cmNlUGF0aCA9IEBcIkZsaWdodERhc2hXZWJcXE1haW5QYWdlLnhhbWxcIjtcclxuICAgICAgICAgICAgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAwMTg0XHJcblxyXG5cclxuXHJcbnZhciBHcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQoKTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5Ib3Jpem9udGFsQWxpZ25tZW50ID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuSG9yaXpvbnRhbEFsaWdubWVudC5TdHJldGNoO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LlZlcnRpY2FsQWxpZ25tZW50ID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVmVydGljYWxBbGlnbm1lbnQuU3RyZXRjaDtcclxudmFyIENvbHVtbkRlZmluaXRpb25fNDFlOWUxOWNiYmZmNGE2ODhkZDg2MjVhYjdiNmUxMjggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzQxZTllMTljYmJmZjRhNjg4ZGQ4NjI1YWI3YjZlMTI4LldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl8yNzQzYjc5YWI4NTg0MTI3OWI3MWZjYzgxZjdjM2YwNCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fMjc0M2I3OWFiODU4NDEyNzliNzFmY2M4MWY3YzNmMDQuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzlmZTdjZDJiYTc1ZjRmY2I4OWE0NWQ5M2JkZjU3ODk3ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl85ZmU3Y2QyYmE3NWY0ZmNiODlhNDVkOTNiZGY1Nzg5Ny5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fNjkzNzRiODM1NWZjNDAzOGI1MDY2YTc5ZDYyMmFhODAgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzY5Mzc0YjgzNTVmYzQwMzhiNTA2NmE3OWQ2MjJhYTgwLldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl9jM2ZhMjRmYmNmOTE0MTY4YjM1MDExZjY3NDZiNWNlNiA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fYzNmYTI0ZmJjZjkxNDE2OGIzNTAxMWY2NzQ2YjVjZTYuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fNDFlOWUxOWNiYmZmNGE2ODhkZDg2MjVhYjdiNmUxMjgpO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzI3NDNiNzlhYjg1ODQxMjc5YjcxZmNjODFmN2MzZjA0KTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl85ZmU3Y2QyYmE3NWY0ZmNiODlhNDVkOTNiZGY1Nzg5Nyk7XHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fNjkzNzRiODM1NWZjNDAzOGI1MDY2YTc5ZDYyMmFhODApO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uX2MzZmEyNGZiY2Y5MTQxNjhiMzUwMTFmNjc0NmI1Y2U2KTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uX2VmZDhjNWI5ZTZmNTRjZTE5MTlmMTg0NTYyY2FhMzdlID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl9lZmQ4YzViOWU2ZjU0Y2UxOTE5ZjE4NDU2MmNhYTM3ZS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzc2YWRlODM3YWYzNzRiODliZWE3OTg4OGNkNzc5ZWZiID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl83NmFkZTgzN2FmMzc0Yjg5YmVhNzk4ODhjZDc3OWVmYi5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzRhNmRjMGZkY2ZmNDQ1NDNhYTFiMGY5NDhkOGM4YTBmID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl80YTZkYzBmZGNmZjQ0NTQzYWExYjBmOTQ4ZDhjOGEwZi5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzYyOTA2Yzk4ODU0MDRkNjE4NzMzZDJkNGU1YzE0ZDUxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl82MjkwNmM5ODg1NDA0ZDYxODczM2QyZDRlNWMxNGQ1MS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzk1ZjhlMmE0ZmE0NzRjYTNhZTVmMDEzMzMxMGRmNWE0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl85NWY4ZTJhNGZhNDc0Y2EzYWU1ZjAxMzMzMTBkZjVhNC5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzFiY2I1ZmZjMzllZjRjMzRhYmEwN2MxMzc3NmU0MDc5ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl8xYmNiNWZmYzM5ZWY0YzM0YWJhMDdjMTM3NzZlNDA3OS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzM5MjBkNDI2NTQzYzRhMDdiNGNkZDQ0NDI0N2Y4MDA2ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl8zOTIwZDQyNjU0M2M0YTA3YjRjZGQ0NDQyNDdmODAwNi5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uX2UxYTdmZThhNzBjNjQ5NzVhZTQ5MTU0YjIwOThjY2Y4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl9lMWE3ZmU4YTcwYzY0OTc1YWU0OTE1NGIyMDk4Y2NmOC5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uX2E5ZGUxYjc3Y2VhYjRjYzJiZjczZjQ5YWNjMmZiNWExID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl9hOWRlMWI3N2NlYWI0Y2MyYmY3M2Y0OWFjYzJmYjVhMS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uX2MwNTg2MTNiNjM5YjQzNDc5ODFiZDNiNTRmM2Q1OTgxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl9jMDU4NjEzYjYzOWI0MzQ3OTgxYmQzYjU0ZjNkNTk4MS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fZWZkOGM1YjllNmY1NGNlMTkxOWYxODQ1NjJjYWEzN2UpO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzc2YWRlODM3YWYzNzRiODliZWE3OTg4OGNkNzc5ZWZiKTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl80YTZkYzBmZGNmZjQ0NTQzYWExYjBmOTQ4ZDhjOGEwZik7XHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNjI5MDZjOTg4NTQwNGQ2MTg3MzNkMmQ0ZTVjMTRkNTEpO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzk1ZjhlMmE0ZmE0NzRjYTNhZTVmMDEzMzMxMGRmNWE0KTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl8xYmNiNWZmYzM5ZWY0YzM0YWJhMDdjMTM3NzZlNDA3OSk7XHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fMzkyMGQ0MjY1NDNjNGEwN2I0Y2RkNDQ0MjQ3ZjgwMDYpO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uX2UxYTdmZThhNzBjNjQ5NzVhZTQ5MTU0YjIwOThjY2Y4KTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9hOWRlMWI3N2NlYWI0Y2MyYmY3M2Y0OWFjYzJmYjVhMSk7XHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fYzA1ODYxM2I2MzliNDM0Nzk4MWJkM2I1NGYzZDU5ODEpO1xyXG5cclxudmFyIFNjcm9sbFZpZXdlcl8xMTg0MDljNmQxN2M0NjM4ODQyNDVlMGU4NTNlYzJiMCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5TY3JvbGxWaWV3ZXIoKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJvdXRwdXRTY3JvbGxcIiwgU2Nyb2xsVmlld2VyXzExODQwOWM2ZDE3YzQ2Mzg4NDI0NWUwZTg1M2VjMmIwKTtcclxuU2Nyb2xsVmlld2VyXzExODQwOWM2ZDE3YzQ2Mzg4NDI0NWUwZTg1M2VjMmIwLk5hbWUgPSBcIm91dHB1dFNjcm9sbFwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihTY3JvbGxWaWV3ZXJfMTE4NDA5YzZkMTdjNDYzODg0MjQ1ZTBlODUzZWMyYjAsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihTY3JvbGxWaWV3ZXJfMTE4NDA5YzZkMTdjNDYzODg0MjQ1ZTBlODUzZWMyYjAsNCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihTY3JvbGxWaWV3ZXJfMTE4NDA5YzZkMTdjNDYzODg0MjQ1ZTBlODUzZWMyYjAsNyk7XHJcblNjcm9sbFZpZXdlcl8xMTg0MDljNmQxN2M0NjM4ODQyNDVlMGU4NTNlYzJiMC5CYWNrZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMCwgRyA9IChieXRlKTAsIEIgPSAoYnl0ZSkwIH0pO1xyXG52YXIgVGV4dEJsb2NrXzQ1YmRmNGEzODA5NDRiMzFhNzYzYzYwMDI2NmU0YTRlID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCbG9jaygpO1xyXG5UZXh0QmxvY2tfNDViZGY0YTM4MDk0NGIzMWE3NjNjNjAwMjY2ZTRhNGUuVGV4dCA9IEBcIlwiO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcIm91dHB1dFwiLCBUZXh0QmxvY2tfNDViZGY0YTM4MDk0NGIzMWE3NjNjNjAwMjY2ZTRhNGUpO1xyXG5UZXh0QmxvY2tfNDViZGY0YTM4MDk0NGIzMWE3NjNjNjAwMjY2ZTRhNGUuTmFtZSA9IFwib3V0cHV0XCI7XHJcblRleHRCbG9ja180NWJkZjRhMzgwOTQ0YjMxYTc2M2M2MDAyNjZlNGE0ZS5CYWNrZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMCwgRyA9IChieXRlKTAsIEIgPSAoYnl0ZSkwIH0pO1xyXG5UZXh0QmxvY2tfNDViZGY0YTM4MDk0NGIzMWE3NjNjNjAwMjY2ZTRhNGUuRm9yZWdyb3VuZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5NZWRpYS5Tb2xpZENvbG9yQnJ1c2gobmV3IGdsb2JhbDo6V2luZG93cy5VSS5Db2xvcigpIHsgQSA9IChieXRlKTI1NSwgUiA9IChieXRlKTI1NSwgRyA9IChieXRlKTI1NSwgQiA9IChieXRlKTI1NSB9KTtcclxuVGV4dEJsb2NrXzQ1YmRmNGEzODA5NDRiMzFhNzYzYzYwMDI2NmU0YTRlLlRleHRXcmFwcGluZyA9IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlRleHRXcmFwcGluZy5XcmFwO1xyXG5cclxuU2Nyb2xsVmlld2VyXzExODQwOWM2ZDE3YzQ2Mzg4NDI0NWUwZTg1M2VjMmIwLkNvbnRlbnQgPSBUZXh0QmxvY2tfNDViZGY0YTM4MDk0NGIzMWE3NjNjNjAwMjY2ZTRhNGU7XHJcblxyXG5cclxudmFyIExpc3RCb3hfYmNiZGQ3OTM5MWFkNGY5NmFhNTcxYmE1NGQ2YjlhNGMgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCgpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcInBhc3RJbnB1dExpc3RcIiwgTGlzdEJveF9iY2JkZDc5MzkxYWQ0Zjk2YWE1NzFiYTU0ZDZiOWE0Yyk7XHJcbkxpc3RCb3hfYmNiZGQ3OTM5MWFkNGY5NmFhNTcxYmE1NGQ2YjlhNGMuTmFtZSA9IFwicGFzdElucHV0TGlzdFwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihMaXN0Qm94X2JjYmRkNzkzOTFhZDRmOTZhYTU3MWJhNTRkNmI5YTRjLDApO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oTGlzdEJveF9iY2JkZDc5MzkxYWQ0Zjk2YWE1NzFiYTU0ZDZiOWE0Yyw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coTGlzdEJveF9iY2JkZDc5MzkxYWQ0Zjk2YWE1NzFiYTU0ZDZiOWE0Yyw3KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3dTcGFuKExpc3RCb3hfYmNiZGQ3OTM5MWFkNGY5NmFhNTcxYmE1NGQ2YjlhNGMsMik7XHJcblxyXG52YXIgVGV4dEJveF83ZGIxZDQ2NjY4NDk0YzlkYjNiZGQwYzNkZDc4ODFkNCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0Qm94KCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwiaW5wdXRcIiwgVGV4dEJveF83ZGIxZDQ2NjY4NDk0YzlkYjNiZGQwYzNkZDc4ODFkNCk7XHJcblRleHRCb3hfN2RiMWQ0NjY2ODQ5NGM5ZGIzYmRkMGMzZGQ3ODgxZDQuTmFtZSA9IFwiaW5wdXRcIjtcclxuVGV4dEJveF83ZGIxZDQ2NjY4NDk0YzlkYjNiZGQwYzNkZDc4ODFkNC5UZXh0ID0gQFwiXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKFRleHRCb3hfN2RiMWQ0NjY2ODQ5NGM5ZGIzYmRkMGMzZGQ3ODgxZDQsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihUZXh0Qm94XzdkYjFkNDY2Njg0OTRjOWRiM2JkZDBjM2RkNzg4MWQ0LDMpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhUZXh0Qm94XzdkYjFkNDY2Njg0OTRjOWRiM2JkZDBjM2RkNzg4MWQ0LDkpO1xyXG5UZXh0Qm94XzdkYjFkNDY2Njg0OTRjOWRiM2JkZDBjM2RkNzg4MWQ0LktleURvd24gKz0gaW5wdXRfS2V5RG93bjtcclxuXHJcbnZhciBCdXR0b25fMjljNTg1NzUwMWZmNDEwYjk5YTU0NzA4MzMzMGY4NWQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQnV0dG9uKCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwiYWN0aW9uQnV0dG9uXCIsIEJ1dHRvbl8yOWM1ODU3NTAxZmY0MTBiOTlhNTQ3MDgzMzMwZjg1ZCk7XHJcbkJ1dHRvbl8yOWM1ODU3NTAxZmY0MTBiOTlhNTQ3MDgzMzMwZjg1ZC5OYW1lID0gXCJhY3Rpb25CdXR0b25cIjtcclxuQnV0dG9uXzI5YzU4NTc1MDFmZjQxMGI5OWE1NDcwODMzMzBmODVkLkNvbnRlbnQgPSBAXCJBY3Rpb25cIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oQnV0dG9uXzI5YzU4NTc1MDFmZjQxMGI5OWE1NDcwODMzMzBmODVkLDMpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oQnV0dG9uXzI5YzU4NTc1MDFmZjQxMGI5OWE1NDcwODMzMzBmODVkLDEpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhCdXR0b25fMjljNTg1NzUwMWZmNDEwYjk5YTU0NzA4MzMzMGY4NWQsOSk7XHJcbkJ1dHRvbl8yOWM1ODU3NTAxZmY0MTBiOTlhNTQ3MDgzMzMwZjg1ZC5DbGljayArPSBhY3Rpb25CdXR0b25fQ2xpY2s7XHJcblxyXG52YXIgTGlzdEJveF82MWMyOWNlNTgyOTA0NjM0YmE0YWUxZDU4YTNjMzIwMiA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94KCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwiZGlyZWN0aW9uTGlzdFwiLCBMaXN0Qm94XzYxYzI5Y2U1ODI5MDQ2MzRiYTRhZTFkNThhM2MzMjAyKTtcclxuTGlzdEJveF82MWMyOWNlNTgyOTA0NjM0YmE0YWUxZDU4YTNjMzIwMi5OYW1lID0gXCJkaXJlY3Rpb25MaXN0XCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKExpc3RCb3hfNjFjMjljZTU4MjkwNDYzNGJhNGFlMWQ1OGEzYzMyMDIsNCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihMaXN0Qm94XzYxYzI5Y2U1ODI5MDQ2MzRiYTRhZTFkNThhM2MzMjAyLDEpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhMaXN0Qm94XzYxYzI5Y2U1ODI5MDQ2MzRiYTRhZTFkNThhM2MzMjAyLDYpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvd1NwYW4oTGlzdEJveF82MWMyOWNlNTgyOTA0NjM0YmE0YWUxZDU4YTNjMzIwMiw0KTtcclxuTGlzdEJveF82MWMyOWNlNTgyOTA0NjM0YmE0YWUxZDU4YTNjMzIwMi5TZWxlY3Rpb25DaGFuZ2VkICs9IGRpcmVjdGlvbkxpc3RfU2VsZWN0aW9uQ2hhbmdlZDtcclxuXHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguQ2hpbGRyZW4uQWRkKFNjcm9sbFZpZXdlcl8xMTg0MDljNmQxN2M0NjM4ODQyNDVlMGU4NTNlYzJiMCk7XHJcbkdyaWRfODZiZGQ0ZWJkMzI1NDAyMTk5NDVkNzFkYmJjNDNhZDguQ2hpbGRyZW4uQWRkKExpc3RCb3hfYmNiZGQ3OTM5MWFkNGY5NmFhNTcxYmE1NGQ2YjlhNGMpO1xyXG5HcmlkXzg2YmRkNGViZDMyNTQwMjE5OTQ1ZDcxZGJiYzQzYWQ4LkNoaWxkcmVuLkFkZChUZXh0Qm94XzdkYjFkNDY2Njg0OTRjOWRiM2JkZDBjM2RkNzg4MWQ0KTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5DaGlsZHJlbi5BZGQoQnV0dG9uXzI5YzU4NTc1MDFmZjQxMGI5OWE1NDcwODMzMzBmODVkKTtcclxuR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkOC5DaGlsZHJlbi5BZGQoTGlzdEJveF82MWMyOWNlNTgyOTA0NjM0YmE0YWUxZDU4YTNjMzIwMik7XHJcblxyXG5cclxudGhpcy5Db250ZW50ID0gR3JpZF84NmJkZDRlYmQzMjU0MDIxOTk0NWQ3MWRiYmM0M2FkODtcclxuXHJcblxyXG5cclxub3V0cHV0ID0gVGV4dEJsb2NrXzQ1YmRmNGEzODA5NDRiMzFhNzYzYzYwMDI2NmU0YTRlO1xyXG5vdXRwdXRTY3JvbGwgPSBTY3JvbGxWaWV3ZXJfMTE4NDA5YzZkMTdjNDYzODg0MjQ1ZTBlODUzZWMyYjA7XHJcbnBhc3RJbnB1dExpc3QgPSBMaXN0Qm94X2JjYmRkNzkzOTFhZDRmOTZhYTU3MWJhNTRkNmI5YTRjO1xyXG5pbnB1dCA9IFRleHRCb3hfN2RiMWQ0NjY2ODQ5NGM5ZGIzYmRkMGMzZGQ3ODgxZDQ7XHJcbmFjdGlvbkJ1dHRvbiA9IEJ1dHRvbl8yOWM1ODU3NTAxZmY0MTBiOTlhNTQ3MDgzMzMwZjg1ZDtcclxuZGlyZWN0aW9uTGlzdCA9IExpc3RCb3hfNjFjMjljZTU4MjkwNDYzNGJhNGFlMWQ1OGEzYzMyMDI7XHJcblxyXG5cclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbDtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sLkNvbnRyb2xzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIHNlYWxlZCBwYXJ0aWFsIGNsYXNzIEFwcCA6IEFwcGxpY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFwcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVDb21wb25lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVudGVyIGNvbnN0cnVjdGlvbiBsb2dpYyBoZXJlLi4uXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpblBhZ2UgPSBuZXcgTWFpblBhZ2UoKTtcclxuICAgICAgICAgICAgV2luZG93LkN1cnJlbnQuQ29udGVudCA9IG1haW5QYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gQSBiYXNpYyByb29tXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFJvb21cclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSByb29tIG5hbWVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUm9vbU5hbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJvb20gRGVzY3JpcHRpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2hvcnRSb29tRGVzYyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTG9uZ1Jvb21EZXNjIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgTGlzdDxFeGl0PiBFeGl0cyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIEV4aXQgQXV0b0V4aXQgeyBnZXQ7IHNldDsgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIExpc3Q8RXhpdD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0V4aXRzPW5ldyBMaXN0PEV4aXQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIGJhc2ljIGV4aXQgZnJvbSBvbmUgcm9vbSBpbnRvIGFub3RoZXJcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgRXhpdFxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmFtZSBvZiB0aGUgZXhpdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBFeGl0TmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdHJpbmdbXSBFeGl0TmFtZXMgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIERlc3RpbmF0aW9uIHJvb21cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBSb29tIERlc3RpbmF0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIERlc2NyaXB0aW9uIHRvIHNob3cgb2YgdGhlIGV4aXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXhpdERlc2MgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEV4aXRUZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgZGVjaW1hbCBFeGl0Q29zdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGltZSB0YWtlbiB0byB1c2UgdGhlIGV4aXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBpbnQgRXhpdFRpbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRnVuYzxHYW1lLGJvb2w+IEV4aXRMb2NrZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExvY2tUZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IExvY2tUaW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcInswfVwiLEV4aXROYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgRmxpZ2h0RGFzaFdlYi5Db21tYW5kcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJvb20gQ3VycmVudFJvb20geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXIgUGxheWVyIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IFRpbWVUb0ZsaWdodCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBMaXN0PElDb21tYW5kPiBDb21tYW5kcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgR2FtZU92ZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDaGVja2VkSW4geyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmVsb25naW5ncyBDdXJyZW50QmVsb25naW5ncyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZUdhbWUoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIFRpbWVUb0ZsaWdodCA9IDYwO1xyXG4gICAgICAgICAgICBQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgICAgIFBsYXllci5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIE1ha2VSb29tcygpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5DbGVhcigpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IExvb2soKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgR28oKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgQ2hlY2tJbigpKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBTZWN1cml0eUNvbW1hbmQoKSk7XHJcbiAgICAgICAgICAgIENoZWNrZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDdXJyZW50QmVsb25naW5ncyA9IEJlbG9uZ2luZ3MuRWxlY3Ryb25pY3MgfCBCZWxvbmdpbmdzLlBvY2tldHMgfCBCZWxvbmdpbmdzLkJhY2twYWNrIHwgQmVsb25naW5ncy5CZWx0IHwgQmVsb25naW5ncy5TaG9lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBNYWtlUm9vbXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsUm9vbSA9IG5ldyBSb29tXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJIb3RlbCBSb29tXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJBIHByZXR0eSBiYXNpYyBIb3RlbCByb29tLiBOb3RoaW5nIG11Y2ggb3V0IG9mIHRoZSBvcmRpbmFyeSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGhlIGJlZCBpcyB1bm1hZGUsIGxlZnQgaW4gYSBtZXNzIGZyb20geW91ciBydWRlIGF3YWtlbmluZywgYXMgdGhlIGFsYXJtIGJsaW5rcyAxMjowMCBtZXJyaWx5IGF0IHlvdSwgaWdub3JhbnQgb2YgeW91ciBkaXN0cmVzcy5cXHJcXG4gWW91ciBzdWl0Y2FzZSBsYXlzIG9uIHRoZSBmbG9vciBhdCB0aGUgZm9vdCBvZiB0aGUgYmVkLCBuZWF0bHkgcGFja2VkLlxcclxcblwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb3V0c2lkZUhvdGVsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT3V0c2lkZSBIb3RlbFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiT3V0c2lkZSB0aGUgd2VhdGhlciBpcyBjYWxtLCBibHVlIHNraWVzLiBZb3VyIGNhciBzaXRzIGluIHRoZSBhc3NpZ25lZCBwYXJraW5nIHNwb3QgYXdhaXRpbmcgeW91XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkluIHRoZSBkaXN0YW5jZSB5b3Ugc2VlIG9uIHRoZSBmcmVlIHJvYWQgc29tZSBoaW50cyBvZiBhIHRyYWZmaWMgamFtLlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBob3RlbEV4aXQgPSBuZXcgRXhpdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG91dHNpZGVIb3RlbCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgaG90ZWwgZG9vciBoYXMgYSBzaWduIG9uIGl0IHNheWluZyBcXFwiUGxlYXNlIHJlbWVtYmVyIHlvdXIga2V5IHdpbGwgbm90IHdvcmsgb25jZSB5b3VyIGNoZWNrb3V0IHRpbWUgaXMgcGFzdCwgcGxlYXNlIHJlbWVtYmVyIGFsbCB5b3VyIGJlbG9uZ2luZ3NcXFwiXFxyXFxuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJMZWF2aW5nIHRoZSBob3RlbCB5b3UgaGVhciBpdCBsb2NrIGJlaGluZCB5b3UsIGRyb3BwaW5nIHlvdXIga2V5cyBvZmYgYXQgcmVjZXB0aW9uIHlvdSBoZWFkIGludG8gdGhlIGNhcnBhcmsgdG8gcGljayB1cCB5b3VyIHJlbnRhbC5cIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPdXRzaWRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwib3V0c2lkZVwiLCBcImRvb3JcIiwgXCJleGl0XCIsIFwib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMyxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBob3RlbFJvb20uRXhpdHMuQWRkKGhvdGVsRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSW4geW91ciBDYXJcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdXIgcmVudGFsIGlzIGEgYmFzaWMgYXV0b21hdGljIHRyYW5zbWlzc2lvbiBjYXJcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IEBcIk1vZGVyYXRlIHNpemUsIGF0IG1pbmltYWwgY29zdCwgbm8gZmFuY3kgR1BTIG9yIG1lZGlhIGNlbnRlciBmb3IgeW91IG9uIHRoaXMgdHJpcC4gXHJcbiBJdCBpcyBvYnZpb3VzIHRoZSBjYXIgaGFzIHNlZW4gYmV0dGVyIGRheXMsIGFuZCBtdWNoIHdvcnNlIGRyaXZlcnMsIHdpdGggc29tZSBzdGFpbnMgZG90dGVkIG9uIHRoZSBlbXB0eSBwYXNzZW5nZXIgc2VhdCBjdXNoaW9ucy4gXHJcbllvdXIgZGFzaGJvYXJkIGlzIGEgYml0IGRpcnR5IGJ1dCBsb29raW5nIGNsb3NlciB5b3Ugbm90aWNlIHlvdXIgZnVlbCBpcyBvbmx5IGEgdGhpcmQgZnVsbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBjYXIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJlbnRhbCBjYXIgaXMgYSBzbWFsbCwgYW5kIHNsaWdodGx5IGJhdHRlcmVkIHRoaW5nLlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkdW1wIHlvdXIgc3VpdGNhc2UgaW50byB0aGUgdHJ1bmssIGZpbGxpbmcgdGhlIGxpbWl0ZWQgc3BhY2UgYmVmb3JlIHBsb3BwaW5nIHlvdXJzZWxmIGRvd24gaW4gdGhlIGRyaXZlcnMgc2VhdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkNhclwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImNhclwiLCBcImluXCIsIFwicmVudGFsXCIsIFwiZHJpdmVyc1wiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb3V0c2lkZUhvdGVsLkV4aXRzLkFkZChjYXJFeGl0KTtcclxuICAgICAgICAgICAgLy8gdG9kbyBBZGQgd2Fsa1xyXG4gICAgICAgICAgICB2YXIgb25GaXJzdFJvYWQgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgUm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIHJvYWQgb3V0IG9mIHRoZSBob3RlbCBpcyBwcmV0dHkgYmFzaWMsIHN0cmFpZ2h0LCBhbmQgd2VsbCBzaWducG9zdGVkIHVwIHRvIHRoZSBoaWdod2F5LiBcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IEBcIkFoZWFkIG9mIHlvdSBpcyBhIHNwbGl0LCB0aGUgcm9hZCB0byB0aGUgcmlnaHQgaXMgZnJlZSwgYnV0IHRoZXJlIHNlZW1zIHRvIGJlIHNpZ25zIG9mIHRyYWZmaWMuIFxyXG5XaGVyZWFzIHRoZSByb2FkIHRvIHRoZSBsZWZ0IGNvc3RzIHlvdSAkNTAganVzdCB0byBlbnRlcixidXQgdGFrZXMgeW91IGRpcmVjdCB0byB0aGUgYWlycG9ydC5cIixcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydENhciA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIk9uIHRoZSBXYXlcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgcm9hZCB0byB0aGUgYWlycG9ydCBsb29rcyBwcmV0dHkgb2J2aW91cyBmcm9tIGhlcmVcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gb25GaXJzdFJvYWQsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiYWlycG9ydFwiLCBcImFpcnBvcnRcIiwgXCJvdXRcIiwgXCJwbGFuZVwiLCBcImZsaWdodFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiRHJpdmluZyBvdXQgb2YgdGhlIGhvdGVsLCB5b3UgIHNvb24gc3BvdCB0aGUgc2lnbiB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2FyLkV4aXRzLkFkZChzdGFydENhcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoTW90b3J3YXkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgVG9sbGJvb3RoIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBsb29rcyBjbGVhciB0aHJvdWdoIHRoZSB3aG9sZSByb3V0ZS4gVGhlIG9jY2FzaW9uYWwgY2FyIHBhc3Nlcywgb3IgaXMgcGFzc2VkIGJ1dCBvdmVyYWxsICBpdCBzdGF5cyBjbGVhciByaWdodCB0aHJvdWdoIHRvIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIEBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoRW50cmFuY2UgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgdG9sbGJvb3RoIHN0YW5kcyBvbiB0aGUgc2lkZSBvZiB0aGUgcm9hZCwgaXQncyBsb25nIGJhciBsb3dlcmVkIGJsb2NraW5nIHRoZSByb3V0ZSBvblwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0b2xsYm9vdGhNb3RvcndheSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gKGRlY2ltYWwpNTAuMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ0b2xsYm9vdGhcIiwgXCJwYWlkXCIsIFwiZmFzdFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKHRvbGxib290aEVudHJhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmVlUm9hZCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk9uIHRoZSBmcmVlIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBpcyBpbiB0aGUgbWlkc3Qgb2YgYSBodWdlIHRyYWZmaWMgamFtLiBDYXIgaG9ybnMgb2YgYWxsIHNvcnRzICwgYW5kIHRoZSBvY2Nhc2lvbmFsIHllbGwgZmlsbHMgdGhlIGFpclwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZnJlZVJvYWRFbnRyYW5jZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkZyZWUgUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBmcmVlIHJvdXRlJ3MgZW50cmFuY2UgbGllcyB1bmJhcnJlZCwgYnV0IHRoZXJlIGlzIGEgaGludCBvZiByZWQgYnJlYWstbGlnaHRzIGluIHRoZSBkaXN0YW5jZSBhbG9uZyBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBmcmVlUm9hZCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJmcmVlXCIsIFwicmlnaHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyByaWdodCwgaW50ZW5kaW5nIHRvIHNhdmUgeW91ciBtb25leSBmb3IgbGF0ZXIsIGhvd2V2ZXIgYSBzaG9ydCB0aW1lIHVwIHRoZSByb2FkIHlvdSBjcmF3bCB0byBhIGhhbHQgYXMgeW91IGhpdCBhIGh1Z2UgdHJhZmZpYyBqYW0sXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKGZyZWVSb2FkRW50cmFuY2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhaXJwb3J0RW50cmFuY2UgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJBaXJwb3J0IERlcGFydHVyZXMgRW50cmFuY2VcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmVzIGVudHJhbmNlIHRvIHRoZSBhaXJwb3J0IGxvb2tzIGEgYml0IGRpbmd5LCBidXQgd2VsbCB0cmF2ZWxlZCwgdGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4gYXMgcGVvcGxlIHN0cmVhbSBpblwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJIZXJlIGFuZCB0aGVyZSBwb3N0ZXJzIGFyZSBvbiB0aGUgd2FsbCwgYWR2ZXJ0aXNpbmcgZmxpZ2h0IGRlYWxzIGZvciB2YXJpb3VzIGNvbXBhbmllcywgYW5kIGEgY291cGxlIHNlY3VyaXR5IGd1YXJkcyBzdGFuZCBuZWFyIHRoZSBlbnRyYW5jZS5cIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvdGhMZWF2ZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwibGVhdmVcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRvbGxib290aCBleGl0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgdG9sbCByb3V0ZSBhbmQgZmluZCB5b3Vyc2VsZiBpbW1lZGlhdGVseSBieSB0aGUgYWlycG9ydCByZW50YWwgZHJvcCBvZmYsIHBhcmtpbmcgeW91ciBjYXIgYW5kIGdyYWJiaW5nIHlvdXIgbHVnZ2FnZSB5b3Ugd2FsayB0aGUgZXh0cmVtZWx5IHNob3J0IGRpc3RhbmNlIHRvIGRlcGFydHVyZXNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gNVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyZWVSb3V0ZUxlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJsZWF2ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRnJlZSByb3V0ZSBleGl0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDI1LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRvbGxib290aE1vdG9yd2F5LkF1dG9FeGl0ID0gdG9sbGJvdGhMZWF2ZTtcclxuXHJcbiAgICAgICAgICAgIGZyZWVSb2FkLkF1dG9FeGl0ID0gZnJlZVJvdXRlTGVhdmU7XHJcbiAgICAgICAgICAgIHZhciB3YWxrID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ3YWxrXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGVyZSBpcyBhIHdhbGtpbmcgcGF0aCB0byB0aGUgYWlycG9ydCB0aGF0IHNlZW1zIHRvIGdvIHRocm91Z2ggYSBmZXcgZmllbGRzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiVGhlIHdhbGsgdG8gdGhlIGFpcnBvcnQgaXMgbG9uZyBhbmQgYXJkdW91cywgYW5kIHNlZW1zIHRvIHRha2UgYSBsb3QgbG9uZ2VyIHRoZW4gaXQgbG9va2VkIGZyb20gdGhlIG1hcCBhdCB0aGUgaG90ZWxcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMTIwLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIldhbGtpbmcgUGF0aFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG91dHNpZGVIb3RlbC5FeGl0cy5BZGQod2Fsayk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGluc2lkZUFpcnBvcnQgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJJbnNpZGUgdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIkluc2lkZSB0aGUgYWlycG9ydCB0aGluZ3MgYXJlIHF1aXRlIGJ1c3ksIHRvIHRoZSBsZWZ0IGFyZSB0aGUgY2hlY2staW4gZGVza3Mgd2hpbGUgdG8gdGhlIHJpZ2h0IGlzIHRoZSBUU0EgcXVldWUuXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkJ5IHRoZSBUU0EgcXVldWUgZW50cmFuY2UgaXMgYSBzaWduIHNheWluZyBcXFwiQnV5IFRTQSBQcmVDaGVjayB0byB1c2UgdGhpcyBzaG9ydGVyIHF1ZXVlLiBPbmx5ICQ4NVxcXCIgTmV4dCB0byBhIGJhcnJpZXIgIGxlYWRpbmcgdG8gYSBtdWNoIHNob3J0ZXIgcXVldWVcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnb0luc2lkZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBpbnNpZGVBaXJwb3J0LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkluc2lkZSBBaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4sIHRoZSBvbmx5IG9ic3RhY2xlIGJlaW5nIHRoZSBzdHJlYW0gb2YgcGVvcGxlIGdvaW5nIG9uIHRoZWlyIHRyYXZlbCBwbGFuc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyB0aHJvdWdoIHRoZSBkb29ycywgbWFuYWdpbmcgdG8gYXZvaWQgZ2V0dGluZyBqb3N0bGVkIGFib3V0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiaW5cIiwgXCJpbnNpZGVcIiwgXCJpbmRvb3JzXCIsIFwiZW50ZXJcIiwgXCJlbnRyYW5jZVwiLCBcImFpcnBvcnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBhaXJwb3J0RW50cmFuY2UuRXhpdHMuQWRkKGdvSW5zaWRlKTtcclxuICAgICAgICAgICAgdmFyIHRzYUVudHJhbmNlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVFNBIEVudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJZb3UgaGVhZCB0b3dhcmRzIHRoZSBUU0EgU2VjdXJpdHkgQ2hlY2twb2ludCwgaXQgc2VlbXMgdG8gYmUgc3BsaXQgaW50byB0d28sIGEgcXVpY2sgUHJlQ2hlY2sgYXJlYSwgYW5kIGEgc2xvdyBhcmVhXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJOZWFyIHRoZSBxdWljayB6b25lIGlzIGEgc2lnbiwgc3BlYWsgdG8gYSBUU0EgT2ZmaWNlciB0byBidXkgYSBzaW5nbGUtdXNlIFRTQSBQcmVDaGVjayBhY2Nlc3MsIG9ubHkgJDg1LCBcclxuRG8geW91IGNob29zZSB0byBidXkgVFNBIFByZUNoZWNrLCBvciBkbyB5b3UgdXNlIHRoZSBnZW5lcmFsIHF1ZXVlP1xyXG5cIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ29Ub1RzYSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdExvY2tlZCA9IGdhbWUgPT4gIWdhbWUuQ2hlY2tlZEluLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIlRoZSBndWFyZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlIGxvb2tzIGF0IHlvdSBmbGF0bHkgYXNraW5nIGZvciB5b3VyIGJvYXJkaW5nIHBhc3MsIGxvb2tpbmcgYmFjayBmb3IgYSBzZWNvbmQgeW91IGZhY2UtcGFsbSBiZWZvcmUgbGVhdmluZyB0byBkbyBzb1wiLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RpbWUgPSAyLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0c2FFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUU0EgRW50cmFuY2VcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ0c2FcIiwgXCJyaWdodFwiLCBcInNlY3VyaXR5XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgRW50cmFuY2UgdG8gdGhlIFRTQSBhcmVhIGlzIGxhcmdlLCBidXQgZ3VhcmRlZCBieSBhIGNvdXBsZSBtZW4gY2hlY2tpbmcgYm9hcmRpbmcgcGFzc2VzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGdldCBpbiBsaW5lLCBzaG93aW5nIHlvdXIgYm9hcmRpbmcgcGFzcyB0byB0aGUgZ3VhcmRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGVja0luRGVzayA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlRoZSBDaGVjay1pbiBEZXNrXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgY2hlY2staW4gZGVzayBmaW5hbGx5IGluIHZpZXcsIHRoZSB3b21hbiBzYXQgaW4gZnJvbnQgYXNrcyB5b3UgdG8gJ2NoZWNrIGluJyB3aXRoIGEgc21pbGVcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiTmVhciB0aGUgZGVzayBpcyBhIGNvdXBsZSBsZWFmbGV0cyBhYm91dCBjYXJyeSBvbiBzaXplIGFuZCB3aGF0IGlzIGFuZCBpc250IGFsbG93ZWRcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ290b0NoZWNraW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDaGVja2luIGxpbmVcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gY2hlY2tJbkRlc2ssXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiY2hlY2tpblwiLCBcImNoZWNrXCIsIFwiZGVza1wiLCBcImxlZnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBsaW5lIHRvIHRoZSBjaGVjay1pbiBkZXNrIGlzIHF1aXRlIGxvbmcsIGJ1dCBub3QgdW53aWVsZHlcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJXYWl0aW5nIGluIHRoZSBsaW5lLCBpdCBtb3ZlcyBhdCBhIG1vZGVyYXRlIHBhY2UsIGFuZCBzb29uIGVub3VnaCB5b3UgYXJlIGF0IHRoZSBjaGVjay1pbiBkZXNrXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZWF2ZUNoZWNraW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJMZWF2ZSBjaGVjay1pblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdExvY2tlZCA9IGdhbWUgPT4gIWdhbWUuQ2hlY2tlZEluLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIkFmdGVyIGZpbmFsbHkgZ2V0dGluZyB0byB0aGUgZW5kIG9mIHRoZSBjaGVjay1pbiBsaW5lIHlvdSByZWFsaXplIHlvdSBmb3Jnb3QgeW91ciBzdWl0Y2FzZSBuZWFyIHRoZSBzdGFydCwgd2l0aCBhbiBhbm5veWVkIHNpZ2ggeW91IGdvIGJhY2sgdG8gZ2V0IGl0XCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDUsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwicmlnaHRcIiwgXCJvdXRcIiwgXCJiYWNrXCIgfSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gaW5zaWRlQWlycG9ydCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgd2F5IG91dCBvZiBjaGVjay1pbiBpcyBhIHNtYWxsIGFsbGV5d2F5IGJldHdlZW4gdGhlIGRlc2tzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIGNoZWNrLWluIGZvbGxvd2luZyB0aGUgbGluZXMsIGFuZCBzb29uIGZpbmQgeW91cnNlbGYgYmFjayB3aGVyZSB5b3Ugc3RhcnRlZCBpbiB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNoZWNrSW5EZXNrLkV4aXRzLkFkZChsZWF2ZUNoZWNraW4pO1xyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb3RvQ2hlY2tpbik7XHJcblxyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb1RvVHNhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVjayA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIFByZUNoZWNrIHpvbmUgaXMgbmljZSBhbmQgcXVpY2ssIHlvdSBkdW1wIHlvdXIgYmFja3BhY2sgb24gdGhlIHhyYXkgYmVsdCBiZWZvcmUgeW91IGdvIHRocm91Z2ggdGhlIHNjYW5uZXIgd2l0aG91dCBuZWVkaW5nIHRvIHRha2Ugb2ZmIHlvdXIgYmVsdCBhbmQgc2hvZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiQXMgeW91IHBpY2sgdXAgeW91ciBiYWNrcGFjayBvZmYgdGhlIHhyYXkgYmVsdCwgeW91IHNtZWxsIGJ1cnJpdG9zIGZyb20gdGhlIE1leGljYW4gZm9vZCBzdGFuZCBvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlByZUNoZWNrXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0V4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJQcmVDaGVja1wiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBwcmVDaGVjayxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgUHJlQ2hlY2sgU2VjdXJpdHkgcXVldWUgd291bGQgYmUgcXVpY2tlciwgYnV0IGl0IHdpbGwgY29zdCB5b3UuIEl0IGxvb2tzIGxpa2UgdGhlcmVzIG9ubHkgb25lIG90aGVyIHBhc3NlbmdlciBoZWFkaW5nIGZvciBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBwYXkgdGhlICQ4NSBmZWUgZnJvbSB5b3VyIGJ1ZGdldCwgYW5kIHRoZSBUU0EgT2ZmaWNlciB3YXZlcyB5b3UgdG8gdGhlIFByZUNoZWNrIFNlY3VyaXR5IFpvbmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gODUsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDMsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwicHJlY2hlY2tcIiwgXCJzaG9ydFwiLCBcInBheVwiIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHNhRW50cmFuY2UuRXhpdHMuQWRkKHByZUNoZWNrRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2VuZXJhbFNlY3VyaXR5ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiR2VuZXJhbCBTZWN1cml0eVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiRXZlbnR1YWxseSB5b3UgZ2V0IHRvIHRoZSBzZWN1cml0eSBkZXNrIGFuZCBhIFRTQSBPZmZpY2VyIGdpdmVzIHlvdSB0d28gdHJheXMgYW5kIHRlbGxzIHlvdSB0byAnZW1wdHkgcG9ja2V0cycgJ3JlbW92ZSBiZWx0JyAncmVtb3ZlIHNob2VzJyBhbmQgJ3BsYWNlIGJhY2twYWNrJyBpbiBvbmUgdHJheSwgYW5kICdyZW1vdmUgZWxlY3Ryb25pY3MnIGludG8gYW5vdGhlciB0cmF5LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJZb3Ugam9zdGxlIHlvdXIgd2F5IGZvcndhcmQgdG8gYSB0YWJsZSwgc28gdGhhdCB5b3UgY2FuIGdldCByZWFkeSB0byBiZSBjbGVhcmVkIHRocm91Z2ggc2VjdXJpdHlcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdlbmVyYWxFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiR2VuZXJhbCBTZWN1cml0eVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBnZW5lcmFsU2VjdXJpdHksXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlcmUncyBhIGxvbmcgcXVldWUgZm9yIHRoZSBHZW5lcmFsIFNlY3VyaXR5LCBldmVyeW9uZSBpcyB0YWtpbmcgdGhlaXIgc2hvZXMgYW5kIGJlbHRzIG9mZiBhbmQgdGFraW5nIHRoZSBlbGVjdHJvbmljcyBvdXQgb2YgdGhlaXIgYmFnc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkZWNpZGUgdG8gc2F2ZSB5b3VyIGNhc2gsIGFuZCBqb2luIHRoZSBob3JkZSBvZiB0cmF2ZWxsZXJzIG1ha2luZyB0aGVpciB3YXkgdG8gdGhlIEdlbmVyYWwgU2VjdXJpdHkgem9uZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA4LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZyZWVcIiwgXCJnZW5lcmFsXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0c2FFbnRyYW5jZS5FeGl0cy5BZGQoZ2VuZXJhbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlcm1pbmFsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVGVybWluYWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmUgdGVybWluYWwgYmV5b25kIFRTQSBpcyBidXN0bGluZyB3aXRoIGFjdGl2aXR5LCBwZW9wbGUsIGFuZCBzbWVsbHMgb2YgYWxsIHNoYXBlcyBhbmQgc2l6ZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgZm9vZCBzaG9wcyBhcmUgZG90dGVkIGFyb3VuZCwgZW5zdXJpbmcgeW91IGFyZSBuZXZlciB0b28gZmFyIGF3YXkgZnJvbSBvbmUuIFwiICsgRW52aXJvbm1lbnQuTmV3TGluZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBCYWtlcnkgYW5kIHRoZSBNZXhpY2FuIHBsYWNlIGxvb2sgZXNwZWNpYWxseSBpbnRlcmVzdGluZy4gVGhlIHNpZ24gb24gdGhlIGNlaWxpbmcgc2hvd3MgTG91bmdlIHRvIHRoZSByaWdodCwgYW5kIHlvdXIgZ2F0ZSBudW1iZXIgYSB0aW55IGJpdCB0byB0aGUgbGVmdFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0xlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZpbmlzaFwiLCBcIm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRlcm1pbmFsLCB3aXRoIHRoZSBzaG9wcywgZm9vZCBzdGFsbHMsIGFuZCB3YWl0aW5nIGFyZWFzLCBhcmUgbGFpZCBvdXQgYmVmb3JlIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSB0aGFuayB0aGUgVFNBIE9mZmljZXIgYXMgeW91IGxlYXZlIGFuZCBoZWFkIGludG8gdGhlIEFpcnBvcnQgRGVwYXJ0dXJlcyBUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByZUNoZWNrLkV4aXRzLkFkZChwcmVDaGVja0xlYXZlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZW5lcmFsRXhpdExlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiBnYW1lLkN1cnJlbnRCZWxvbmdpbmdzICE9IEJlbG9uZ2luZ3MuTm9uZSxcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJUaGUgVFNBIE9mZmljZXIgZ3J1bnRzIGF0IHlvdSBhbmQgc3RhcmVzIHlvdSBkb3duLiBcXFwiRW1wdHkgeW91ciBwb2NrZXRzLCB0YWtlIHlvdXIgc2hvZXMgb2ZmLCB0YWtlIHlvdXIgYmVsdCBvZmYsIGVtcHR5IHlvdXIgZWxlY3Ryb25pY3MgYW5kIHBsYWNlIHlvdXIgYmFja3BhY2sgaW50byB0aGUgdHJheSwgQkVGT1JFIGdvaW5nIHRocm91Z2ggc2VjdXJpdHkhXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDYsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSB0ZXJtaW5hbCwgd2l0aCB0aGUgc2hvcHMsIGZvb2Qgc3RhbGxzLCBhbmQgd2FpdGluZyBhcmVhcywgYXJlIGxhaWQgb3V0IGJlZm9yZSB5b3VcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgdGhhbmsgdGhlIFRTQSBPZmZpY2VyIGFzIHlvdSBsZWF2ZSBhbmQgaGVhZCBpbnRvIHRoZSBBaXJwb3J0IERlcGFydHVyZXMgVGVybWluYWxcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gNixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJmaW5pc2hcIiwgXCJvdXRcIiB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnZW5lcmFsU2VjdXJpdHkuRXhpdHMuQWRkKGdlbmVyYWxFeGl0TGVhdmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1leGljYW4gPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJNZXhpY2FuIGZvb2RcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdSBnbyB0b3dhcmRzIHRoZSBtZXhpY2FuIGZvb2Qgc3RhbGwgYXMgYSB3b3JrZXIgbG9va3MgdXAgYW5kIHNtaWxlcyBhdCB5b3UuIE9uIHRoZSBjb3VudGVyIGlzIGEgc2lnbiB0aGF0IHJlYWRzIFxcXCJEZXZlbG9wZXJzJyBGYXZvdXJpdGU6IEJyZWFrZmFzdCBCdXJyaXRvICQxMFxcXCIsIGJlaGluZCB0aGUgd29ya2VyIGlzIGEgc29kYSBmb3VudGFpblwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJZb3Ugbm90aWNlIGEgaG9sZGVyIGF0IHRoZSBlbmQgb2YgdGhlIGNvdW50ZXIsIGNvbnRhaW5pbmcgZGlzcG9zYWJsZSBjdXRsZXJ5XCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXlNZXhpY2FuID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiQnV5IEJ1cnJpdG9cIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJidXlcIiwgXCJidXJyaXRvXCIgfSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiU3RvbWFjaCBncnVtYmxpbmcsIHlvdSBvcmRlciB0aGUgQnJlYWtmYXN0IEJ1cnJpdG8gYW5kIGEgc29hLCB0aGUgd29ya2VyIGdvZXMgYW5kIG1ha2VzIG9uZSBmb3IgeW91LCByZXR1cm5pbmcgYWZ0ZXIgYSBmZXcgbWludXRlcywgc2hlIHBhc3NlcyB5b3UgYSBmb2lsLXdyYXBwZWQgZ2lmdCwgYW5kIGEgY3VwIG9mIFN0cmF3YmVycnkgZmxhdm9yZWQgU29kYS4gXFxcIiQxMyBwbGVhc2VcXFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDEzLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1leGljYW4uRXhpdHMuQWRkKGJ1eU1leGljYW4pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvTWV4aWNhbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlZpc2l0IE1leGljYW4gU3RvcmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJtZXhpY2FuXCIsIFwiYnVycml0b1wiIH0sXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG1leGljYW4sXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIFN0YWxsIGlzIGRvbmUgdXAgaW4gc3RlcmVvdHlwaWNhbCBtZXhpY2FuIHN0eWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkZWNpZGUgdG8gZ28gbG9vayBvdmVyIHdoYXQga2luZCBvZiBidXJyaXRvcyB0aGUgbWV4aWNhbiBwbGFjZSBzZWxscy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ29NZXhpY2FuKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBiYWtlcnkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJCYWtlcnlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBzbWFsbCBiYWtlcnkgY2F0Y2hlcyB5b3VyIGV5ZSwgYW5kIHlvdSBlbnRlciwgdGhlIHNtZWxsIG9mIHdhcm0gYnJlYWQgZW50aWNpbmcgeW91LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJUaGUgc29sZSBzdGFmZi1tZW1iZXIgd2VsY29tZXMgeW91LiBZb3UgY2FuIHNlZSBoZXIgbmFtZXRhZyByZWFkcyAnTWlzaHkgLSBIZWFkIEJha2VyJ1wiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXlCYWtlcnkgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPcmRlciBmb29kXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RvbWFjaCBncnVtYmxpbmcsIHlvdSBvcmRlciBhIGJhZ2VsIGFuZCBPcmFuZ2UgSnVpY2UsIE1pc2h5IGdyYWJzIHlvdSBhIGJhZ2VsIGFuZCBwb3VycyB5b3UgYSBjdXAgb2YgZnJlc2ggb3JhbmdlIGp1aWNlLCBwYXNzaW5nIGl0IG92ZXIgdGhlIGNvdW50ZXIgd2l0aCBhIHNtaWxlLiBcXFwiJDYgcGxlYXNlXFxcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSA2LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA0LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIm9yZGVyXCIsIFwiYmFrZXJ5XCIsIFwiYnJlYWRcIiwgXCJiYWdlbFwiIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYmFrZXJ5LkV4aXRzLkFkZChidXlCYWtlcnkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvQmFrZXJ5ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVmlzaXQgQmFrZXJ5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIEJha2VyeSBsb29rcyB3YXJtLCBhbmQgaW52aXRpbmcsIHdpdGggYSBzb2Z0IHNjZW50IG9mIGZyZXNoIGJyZWFkIHdhZnRpbmcgZnJvbSBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyBpbnRvIHRoZSBiYWtlcnksIGVuam95aW5nIHRoZSBhbWJpYW5jZSBwcm92aWRlZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBiYWtlcnksXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiYmFrZXJ5XCIsIFwibWlzaHlcIiwgXCJicmVhZFwiIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGVybWluYWwuRXhpdHMuQWRkKGdvQmFrZXJ5KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb3VuZ2VFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVGhlIExvdW5nZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdExvY2tlZCA9IGdhbWUgPT4gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJZb3Ugd2FuZGVyIG9mZiB0byB0aGUgbG91bmdlLCBob3BpbmcgeW91IG1heSBiZSBhYmxlIHRvIHRhbGsgeW91ciB3YXkgaW4gb24gdGhpcyBlY29ub215IHRpY2tldCwgc2FkbHkgaG93ZXZlciBhcyB5b3UgdHJ5IHRvIHRhbGsgdGhlIGF0dGVuZGVudCBpbnRvIGl0LCBzaGUgaXMgaGF2aW5nIG5vbmUgb2YgaXQgYW5kIHJlZnVzZXMgeW91IGVudHJ5LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RpbWUgPSA1LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImxvdW5nZVwiLCBcImdvbGRcIiB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChsb3VuZ2VFeGl0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnYXRlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiR2F0ZSA0MlwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJHYXRlIDQzIGxvb2tzIGxpa2UgcHJldHR5IG11Y2ggZXZlcnkgb3RoZXIgZ2F0ZSwgYnV0IGEgcXVpY2sgY2hlY2sgb2YgeW91ciBib2FyZGluZyBwYXNzIHNob3dzIHRoaXMgb25lIGlzIHlvdXJzXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGhlIGxpbmUgc2VlbXMgdG8gYmUgcXVpdGUgc2hvcnQsIHNlZW1zIG5vdCBtYW55IHBlb3BsZSB3YW50IHRvIGdvIHRoZSBzYW1lIHBsYWNlIGFzIHlvdSB0b2RheVwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBFbmRTY3JlZW4gPSBuZXcgRW5kU2NyZWVuUm9vbSh0aGlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaWxsIHRoaXMgaW5cclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJFbmQgU2NyZWVuXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdhdGVFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiSW4gdGhlIEFpcnBsYW5lXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIHRoZSBHYXRlIGFuZCBzb29uIHlvdSBhcmUgb24gdGhlIGFpcnBsYW5lLiBZb3VyIHNlYXQgaXMgYXMgY3JhbXBlZCBhcyB1c3VhbCwgYnV0IGl0IGZlZWxzIGxpa2UgYSB0aHJvbmUgdG9kYXlcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gRW5kU2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIndpblwiIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChnYXRlRXhpdCk7XHJcbiAgICAgICAgICAgIGdhdGUuQXV0b0V4aXQgPSBnYXRlRXhpdDtcclxuXHJcbiAgICAgICAgICAgIEN1cnJlbnRSb29tID0gaG90ZWxSb29tO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJvb21UaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTFcIikuUm9vbU5hbWU6KHN0cmluZyludWxsKSA/PyBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSb29tSGVhZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50Um9vbSBpcyBFbmRTY3JlZW5Sb29tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkNvbmdyYXR1bGF0aW9ucywgeW91IHdvbiEgWW91IGhhZCB7MDpEMn06ezE6RDJ9IHJlbWFpbmluZywgYW5kIHsyOkN9IHJlbWFpbmluZ1wiLFRpbWVUb0ZsaWdodCAvIDYwLFRpbWVUb0ZsaWdodCAlIDYwLChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLFBsYXllcikhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFBsYXllcj4oXCJrZXkyXCIpLk1vbmV5OihkZWNpbWFsPyludWxsKSA/PyAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBidWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciByb29tTmFtZSA9IChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5M1wiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXkzXCIpLlJvb21OYW1lOihzdHJpbmcpbnVsbCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShyb29tTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHN0cmluZy5Gb3JtYXQoXCJUaW1lIHRvIEZsaWdodDogezA6RDJ9OnsxOkQyfVwiLFRpbWVUb0ZsaWdodCAvIDYwLFRpbWVUb0ZsaWdodCAlIDYwKSk7XHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoc3RyaW5nLkZvcm1hdChcIk1vbmV5OiB7MDpDfVwiLChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NFwiLFBsYXllcikhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFBsYXllcj4oXCJrZXk0XCIpLk1vbmV5OihkZWNpbWFsPyludWxsKSA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXk1XCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTVcIikuU2hvcnRSb29tRGVzYzooc3RyaW5nKW51bGwpID8/IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldFNwZWNpYWxJdGVtcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50Um9vbS5Sb29tTmFtZS5Ub0xvd2VyKCkgPT0gXCJ0aGUgY2hlY2staW4gZGVza1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5BZGQoXCJjaGVjayBpblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChDdXJyZW50Um9vbS5Sb29tTmFtZS5Ub0xvd2VyKCkgPT0gXCJnZW5lcmFsIHNlY3VyaXR5XCIpXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQ3VycmVudEJlbG9uZ2luZ3MuSGFzRmxhZyhCZWxvbmdpbmdzLlBvY2tldHMpKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLkFkZChcImVtcHR5IHBvY2tldHNcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3VycmVudEJlbG9uZ2luZ3MuSGFzRmxhZyhCZWxvbmdpbmdzLkJlbHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLkFkZChcInJlbW92ZSBiZWx0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEN1cnJlbnRCZWxvbmdpbmdzLkhhc0ZsYWcoQmVsb25naW5ncy5TaG9lcykpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuQWRkKFwicmVtb3ZlIHNob2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEN1cnJlbnRCZWxvbmdpbmdzLkhhc0ZsYWcoQmVsb25naW5ncy5CYWNrcGFjaykpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuQWRkKFwicGxhY2UgYmFja3BhY2tcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3VycmVudEJlbG9uZ2luZ3MuSGFzRmxhZyhCZWxvbmdpbmdzLkVsZWN0cm9uaWNzKSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5BZGQoXCJyZW1vdmUgZWxlY3Ryb25pY3NcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLlRvQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VJbnB1dChzdHJpbmcgaW5wdXQsIG91dCBzdHJpbmcgb3V0cHV0VGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lT3ZlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0VGV4dCA9IFwiU29ycnksIHRoaXMgZ2FtZSBpcyBvdmVyXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29tbWFuZFNwbGl0ID0gaW5wdXQuU3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNvbW1hbmQgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxJQ29tbWFuZD4oQ29tbWFuZHMsKEZ1bmM8SUNvbW1hbmQsYm9vbD4pKGNvbW1hbmQgPT4gU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Db250YWluczxzdHJpbmc+KGNvbW1hbmQuR2V0Q29tbWFuZEFsaWFzZXMoKSxjb21tYW5kU3BsaXRbMF0uVG9Mb3dlcigpKSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC5UcnlQYXJzZUNvbW1hbmQoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPHN0cmluZz4oY29tbWFuZFNwbGl0LDEpKSwgdGhpcywgb3V0IG91dHB1dFRleHQpKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoVGltZVRvRmxpZ2h0IDw9IDAgfHwgUGxheWVyLk1vbmV5IDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJTb3JyeSwgaXQgc2VlbXMgeW91IFwiICsgKFRpbWVUb0ZsaWdodCA8PSAwID8gXCJyYW4gb3V0IG9mIHRpbWVcIiA6IFwicmFuIG91dCBvZiBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhcnNlSW5wdXQoc3RyaW5nIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENoYW5nZVJvb20oRXhpdCBleGl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIG91dHB1dCA9IGV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICBDdXJyZW50Um9vbSA9IGV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgIFRpbWVUb0ZsaWdodCAtPSBleGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICBQbGF5ZXIuTW9uZXkgLT0gZXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IEdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PElDb21tYW5kPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29tbWFuZHM9bmV3IExpc3Q8SUNvbW1hbmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuU3lzdGVtO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWw7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbC5Db250cm9scztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEdhbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTWFpblBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIEdhbWUuSW5pdGlhbGl6ZUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gR2FtZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHN0YXR1c1NjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIHN0YXR1c1NjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25MaXN0Lkl0ZW1zLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gR2FtZS5DdXJyZW50Um9vbS5FeGl0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uTGlzdC5JdGVtcy5BZGQoY3VycmVudFJvb21FeGl0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHNwZWNpYWxJdGVtIGluIEdhbWUuR2V0U3BlY2lhbEl0ZW1zKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbkxpc3QuSXRlbXMuQWRkKHNwZWNpYWxJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBkaXJlY3Rpb25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBhY3Rpb25CdXR0b25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGlucHV0X0tleURvd24ob2JqZWN0IHNlbmRlciwgV2luZG93cy5VSS5YYW1sLklucHV0LktleVJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGUuS2V5ID09IFZpcnR1YWxLZXkuRW50ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhhbmRsZUlucHV0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXN0SW5wdXRMaXN0Lkl0ZW1zLkFkZChpbnB1dC5UZXh0KTtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5TZWxlY3RlZEluZGV4ID0gcGFzdElucHV0TGlzdC5JdGVtcy5Db3VudCAtIDE7XHJcbnN0cmluZyBvdXRwdXRUZXh0O1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEdhbWUuVHJ5UGFyc2VJbnB1dChpbnB1dC5UZXh0LCBvdXQgb3V0cHV0VGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgICAgIGlucHV0LlRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0U2Nyb2xsLlNjcm9sbFRvVmVydGljYWxPZmZzZXQob3V0cHV0U2Nyb2xsLkFjdHVhbEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBcIj4gXCIgKyBpbnB1dC5UZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IG91dHB1dFRleHQ7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRTY3JvbGwuU2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChvdXRwdXRTY3JvbGwuQWN0dWFsSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdHVzU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgZGlyZWN0aW9uTGlzdF9TZWxlY3Rpb25DaGFuZ2VkKG9iamVjdCBzZW5kZXIsIFNlbGVjdGlvbkNoYW5nZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSAhPSBudWxsICYmIGRpcmVjdGlvbkxpc3QuU2VsZWN0ZWRJdGVtIGlzIEV4aXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZEV4aXQgPSBkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSBhcyBFeGl0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkRXhpdCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlucHV0LlRleHQgPSBcImdvIFwiICsgKHNlbGVjdGVkRXhpdC5FeGl0TmFtZXMuTGVuZ3RoID4gMCA/IHNlbGVjdGVkRXhpdC5FeGl0TmFtZXNbMF0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSAhPSBudWxsICYmIGRpcmVjdGlvbkxpc3QuU2VsZWN0ZWRJdGVtIGlzIHN0cmluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IGRpcmVjdGlvbkxpc3QuU2VsZWN0ZWRJdGVtIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFRleHQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5UZXh0ID0gc2VsZWN0ZWRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgR2FtZSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fR2FtZT1uZXcgR2FtZSgpO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGxheWVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWNpbWFsIE1vbmV5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1vbmV5ID0gMTI1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoZWNrSW46SUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNoZWNrLWluXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHtcImNoZWNrXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIkkgaGF2ZSBub3RoaW5nIHRvIGNoZWNrLlwiK0Vudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzWzBdICE9IFwiaW5cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJTdGF0ZS5Sb29tVGl0bGUoKS5Ub0xvd2VyKCkgIT0gXCJ0aGUgY2hlY2staW4gZGVza1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIlNvcnJ5LCB5b3UgY2FuIG5vdCBjaGVjayBpbiBoZXJlXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1clN0YXRlLkNoZWNrZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIGV4aXQgPSBjdXJTdGF0ZS5DdXJyZW50Um9vbS5FeGl0c1swXTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IEVudmlyb25tZW50Lk5ld0xpbmUgKyBleGl0LkV4aXRUZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudFJvb20gPSBleGl0LkRlc3RpbmF0aW9uO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gZXhpdC5FeGl0VGltZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuUGxheWVyLk1vbmV5IC09IGV4aXQuRXhpdENvc3Q7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBjdXJTdGF0ZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR28gOiBJQ29tbWFuZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiR29cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBHZXRDb21tYW5kQWxpYXNlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W10geyBcImdvXCIsIFwiaGVhZFwiLCBcIndhbGtcIiwgXCJkcml2ZVwiLCBcImdldCBpblwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiU29ycnksIEludmFsaWQgZGVzdGluYXRpb24gb3IgY29tbWFuZCBmb3JtYXRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxFeGl0PihjdXJTdGF0ZS5DdXJyZW50Um9vbS5FeGl0cywoRnVuYzxFeGl0LGJvb2w+KShjdXJyZW50Um9vbUV4aXQgPT4gU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Db250YWluczxzdHJpbmc+KGN1cnJlbnRSb29tRXhpdC5FeGl0TmFtZXMsY29tbWFuZEFyZ3VtZW50c1swXS5Ub0xvd2VyKCkpKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Um9vbUV4aXQuRXhpdExvY2tlZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0xvY2tlZCA9IGN1cnJlbnRSb29tRXhpdC5FeGl0TG9ja2VkKGN1clN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNMb2NrZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBjdXJyZW50Um9vbUV4aXQuTG9ja1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBjdXJyZW50Um9vbUV4aXQuTG9ja1RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gY3VyU3RhdGUuQ2hhbmdlUm9vbShjdXJyZW50Um9vbUV4aXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJTdGF0ZS5DdXJyZW50Um9vbS5BdXRvRXhpdCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGl0ID0gY3VyU3RhdGUuQ3VycmVudFJvb20uQXV0b0V4aXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkNoYW5nZVJvb20oZXhpdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiSW52YWxpZCBkZXN0aW5hdGlvblwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMb29rOklDb21tYW5kXHJcbiAgICB7XHJcbnB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG57XHJcbiAgICByZXR1cm4gXCJMb29rXCI7XHJcbn1wdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG57XHJcbiAgICByZXR1cm4gbmV3W117XCJsb29rXCIsIFwibFwiLCBcInBlZXJcIiwgXCJzdGFyZVwiLCBcImV4YW1pbmVcIn07XHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxvb2sgYXQgYW4gaXRlbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9XHJcbnN0cmluZy5Gb3JtYXQoXCJ7MH17MX17Mn1cIixjdXJTdGF0ZS5DdXJyZW50Um9vbS5TaG9ydFJvb21EZXNjLEVudmlyb25tZW50Lk5ld0xpbmUsY3VyU3RhdGUuQ3VycmVudFJvb20uTG9uZ1Jvb21EZXNjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHNbMF0uVG9Mb3dlcigpID09IFwiYXRcIilcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPHN0cmluZz4oY29tbWFuZEFyZ3VtZW50cywxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9Mb29rID0gY29tbWFuZEFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjdXJyZW50Um9vbUV4aXQuRXhpdE5hbWVzLHRvTG9vay5Ub0xvd2VyKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gc3RyaW5nLkZvcm1hdChcInswfXsxfVwiLGN1cnJlbnRSb29tRXhpdC5FeGl0RGVzYyxFbnZpcm9ubWVudC5OZXdMaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTZWN1cml0eUNvbW1hbmQ6SUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlNlY3VyaXR5XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHsgXCJyZW1vdmVcIixcInBsYWNlXCIsXCJlbXB0eVwifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGJlbG9uZ2luZyBpbiBFbnVtLkdldFZhbHVlcyh0eXBlb2YoQmVsb25naW5ncykpLkNhc3Q8QmVsb25naW5ncz4oKSkgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVsb25naW5nLlRvU3RyaW5nKCkuVG9Mb3dlcigpID09IGNvbW1hbmRBcmd1bWVudHNbMF0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudEJlbG9uZ2luZ3MgXj0gYmVsb25naW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYmVsb25naW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLlNob2VzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IHJlbW92ZSB5b3VyIHNob2VzIGFuZCBwdXQgdGhlbSBvbiB0aGUgYmVsdFwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJlbG9uZ2luZ3MuQmVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSByZW1vdmUgeW91ciBiZWx0IGFuZCBwdXQgaXQgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkJhY2twYWNrOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IHRha2Ugb2ZmIHlvdXIgYmFja3BhY2sgYW5kIHB1dCBpdCBvbiB0aGUgYmVsdFwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJlbG9uZ2luZ3MuUG9ja2V0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSBlbXB0eSB5b3VyIHBvY2tldHMgYW5kIHB1dCB0aGUgY29udGVudHMgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkVsZWN0cm9uaWNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IGVtcHR5IHlvdXIgZWxlY3Ryb25pY3Mgb3V0IG9udG8gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiSSBkbyBub3QgaGF2ZSB0aGF0XCIrRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIGNsYXNzIEVuZFNjcmVlblJvb20gOiBSb29tXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEdhbWUgQ3VyU3RhdGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kU2NyZWVuUm9vbShHYW1lIGdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkN1clN0YXRlID0gZ2FtZTtcclxuICAgICAgICB9XHJcbnB1YmxpYyBuZXcgc3RyaW5nIFNob3J0Um9vbURlc2Ncclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJDb25ncmF0dWxhdGlvbnMsIHlvdSB3b24hIFlvdSBoYWQgezA6RDJ9OnsxOkQyfSByZW1haW5pbmcsIGFuZCB7MjpDfSByZW1haW5pbmdcIixDdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLyA2MCxDdXJTdGF0ZS5UaW1lVG9GbGlnaHQgJSA2MCwoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixDdXJTdGF0ZS5QbGF5ZXIpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxQbGF5ZXI+KFwia2V5MVwiKS5Nb25leTooZGVjaW1hbD8pbnVsbCkgPz8gMCk7XHJcbiAgICB9XHJcbn0gICAgfVxyXG59XHJcbiJdCn0K
