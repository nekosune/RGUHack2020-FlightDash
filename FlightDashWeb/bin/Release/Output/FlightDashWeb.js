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


                var ResourceDictionary_452ecb77c46b4be1b87b8b990491b579 = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_452ecb77c46b4be1b87b8b990491b579;

                this.Resources = ResourceDictionary_452ecb77c46b4be1b87b8b990491b579;







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
            LockTime: 0,
            LockScore: 0,
            ScoreModify: 0
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

                var rand = new System.Random.ctor();
                var freeRouteLeave = ($t = new FlightDashWeb.Exit(), $t.Destination = airportEntrance, $t.ExitNames = System.Array.init(["leave"], System.String), $t.ExitName = "Free route exit", $t.ExitDesc = "", $t.ExitTime = rand.Next$1(10) > 5 ? 25 : 35, $t.ExitText = "You leave the route and find yourself immediately by the airport rental drop off, parking your car and grabbing your luggage you walk the extremely short distance to departures", $t.ExitCost = System.Decimal(0), $t);

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
                }, $t.LockText = "The TSA Officer grunts at you and stares you down. \"Empty your pockets, take your shoes off, take your belt off, empty your electronics and place your backpack into the tray, BEFORE going through security!", $t.LockScore = -1, $t.LockTime = 6, $t.Destination = terminal, $t.ExitDesc = "The terminal, with the shops, food stalls, and waiting areas, are laid out before you", $t.ExitText = "You thank the TSA Officer as you leave and head into the Airport Departures Terminal", $t.ExitTime = 6, $t.ExitCost = System.Decimal(0), $t.ExitNames = System.Array.init(["finish", "out"], System.String), $t);
                generalSecurity.Exits.add(generalExitLeave);

                var mexican = ($t = new FlightDashWeb.Room(), $t.RoomName = "Mexican food", $t.ShortRoomDesc = "You go towards the mexican food stall as a worker looks up and smiles at you. On the counter is a sign that reads \"Developers' Favourite: Breakfast Burrito $10\", behind the worker is a soda fountain", $t.LongRoomDesc = "You notice a holder at the end of the counter, containing disposable cutlery", $t);

                var buyMexican = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Buy Burrito", $t.ExitNames = System.Array.init(["buy", "burrito"], System.String), $t.Destination = terminal, $t.ExitDesc = "", $t.ExitText = "Stomach grumbling, you order the Breakfast Burrito and a soa, the worker goes and makes one for you, returning after a few minutes, she passes you a foil-wrapped gift, and a cup of Strawberry flavored Soda. \"$13 please\"", $t.ScoreModify = 50, $t.ExitCost = System.Decimal(13), $t.ExitTime = 5, $t);
                mexican.Exits.add(buyMexican);

                var goMexican = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Visit Mexican Store", $t.ExitNames = System.Array.init(["mexican", "burrito"], System.String), $t.Destination = mexican, $t.ExitCost = System.Decimal(0), $t.ExitDesc = "The Stall is done up in stereotypical mexican styles", $t.ExitText = "You decide to go look over what kind of burritos the mexican place sells.", $t.ExitTime = 1, $t);
                terminal.Exits.add(goMexican);

                var bakery = ($t = new FlightDashWeb.Room(), $t.RoomName = "Bakery", $t.ShortRoomDesc = "The small bakery catches your eye, and you enter, the smell of warm bread enticing you.", $t.LongRoomDesc = "The sole staff-member welcomes you. You can see her nametag reads 'Mishy - Head Baker'", $t);

                var buyBakery = ($t = new FlightDashWeb.Exit(), $t.ExitName = "Order food", $t.ExitDesc = "", $t.Destination = terminal, $t.ExitText = "Stomach grumbling, you order a bagel and Orange Juice, Mishy grabs you a bagel and pours you a cup of fresh orange juice, passing it over the counter with a smile. \"$6 please\"\r\n", $t.ExitCost = System.Decimal(6), $t.ExitTime = 4, $t.ScoreModify = 51, $t.ExitNames = System.Array.init(["order", "bakery", "bread", "bagel"], System.String), $t);
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
                    return (System.String.format("Congratulations, you won! You had {0:D2}:{1:D2} remaining, and {2:C} remaining\r\n That ,alongside bonus and penalty scores, gives you a total score of ", Bridge.box(((Bridge.Int.div(this.TimeToFlight, 60)) | 0), System.Int32), Bridge.box(this.TimeToFlight % 60, System.Int32), ($t = (($t1 = this.Player) != null ? $t1.Money : System.Decimal.lift(null)), $t != null ? $t : System.Decimal(0))) || "") + (Bridge.Int.mul((((Bridge.Int.div(this.TimeToFlight, 60)) | 0)), 100)) + ((this.Player.Money.div(System.Decimal(125))).mul(System.Decimal(100))) + System.Double.format(this.Player.ScoreModifiers);
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
                var $t;
                var output = "";
                output = (exit.ExitText || "") + ("\n" || "");
                this.CurrentRoom = exit.Destination;
                this.TimeToFlight = (this.TimeToFlight - exit.ExitTime) | 0;
                this.Player.Money = this.Player.Money.sub(exit.ExitCost);
                $t = this.Player;
                $t.ScoreModifiers += exit.ScoreModify;
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
                    this.outputScroll.ScrollToVerticalOffset(System.Int64([-727379969,232]));
                } else {
                    ($t2 = this.output).Text = ($t2.Text || "") + "> " + (this.input.Text || "") + ("\n" || "");
                    ($t3 = this.output).Text = ($t3.Text || "") + (outputText.v || "");
                    this.outputScroll.ScrollToVerticalOffset(System.Int64([-727379969,232]));
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



                var Grid_bbcd703b54a842f38dea7b5518b1c927 = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_bbcd703b54a842f38dea7b5518b1c927.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_bbcd703b54a842f38dea7b5518b1c927.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_3a94e94e9bfd4dcaa8feb9ccd2508735 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_3a94e94e9bfd4dcaa8feb9ccd2508735.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_5f01056d526a4658bab364772a12eba2 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_5f01056d526a4658bab364772a12eba2.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_309f36bf66b1455cad22eae4b09ae982 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_309f36bf66b1455cad22eae4b09ae982.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_9606033751ae4d5c980d2866e53b7f45 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_9606033751ae4d5c980d2866e53b7f45.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_8449046e06be4c118cee72a26fd1cdc4 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_8449046e06be4c118cee72a26fd1cdc4.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_bbcd703b54a842f38dea7b5518b1c927.ColumnDefinitions.add(ColumnDefinition_3a94e94e9bfd4dcaa8feb9ccd2508735);
                Grid_bbcd703b54a842f38dea7b5518b1c927.ColumnDefinitions.add(ColumnDefinition_5f01056d526a4658bab364772a12eba2);
                Grid_bbcd703b54a842f38dea7b5518b1c927.ColumnDefinitions.add(ColumnDefinition_309f36bf66b1455cad22eae4b09ae982);
                Grid_bbcd703b54a842f38dea7b5518b1c927.ColumnDefinitions.add(ColumnDefinition_9606033751ae4d5c980d2866e53b7f45);
                Grid_bbcd703b54a842f38dea7b5518b1c927.ColumnDefinitions.add(ColumnDefinition_8449046e06be4c118cee72a26fd1cdc4);

                var RowDefinition_0426a0d2209540c6887433bf9718331c = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_0426a0d2209540c6887433bf9718331c.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_d5a51708763547c69d38ec123139a77c = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_d5a51708763547c69d38ec123139a77c.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_709695c69c8c416aa505877191484bb2 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_709695c69c8c416aa505877191484bb2.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_b568fa3e3c3c4de7b195c73eae15eee6 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_b568fa3e3c3c4de7b195c73eae15eee6.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_70c8b5945e374bfaac9e44ee0feeb42f = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_70c8b5945e374bfaac9e44ee0feeb42f.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_68d5e8ebf2b943e0aa5cc6c23a92b4d7 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_68d5e8ebf2b943e0aa5cc6c23a92b4d7.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_40dabbaa5f7343eeb1e36102acf31479 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_40dabbaa5f7343eeb1e36102acf31479.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_edbccc0643ef4ae2b993f03ac810decf = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_edbccc0643ef4ae2b993f03ac810decf.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_f708d81efb9a4ba8bed734dfff49dda9 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_f708d81efb9a4ba8bed734dfff49dda9.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_597c2cee690f4f1a9ed0e98338da4895 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_597c2cee690f4f1a9ed0e98338da4895.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_0426a0d2209540c6887433bf9718331c);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_d5a51708763547c69d38ec123139a77c);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_709695c69c8c416aa505877191484bb2);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_b568fa3e3c3c4de7b195c73eae15eee6);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_70c8b5945e374bfaac9e44ee0feeb42f);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_68d5e8ebf2b943e0aa5cc6c23a92b4d7);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_40dabbaa5f7343eeb1e36102acf31479);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_edbccc0643ef4ae2b993f03ac810decf);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_f708d81efb9a4ba8bed734dfff49dda9);
                Grid_bbcd703b54a842f38dea7b5518b1c927.RowDefinitions.add(RowDefinition_597c2cee690f4f1a9ed0e98338da4895);

                var ScrollViewer_865c868d7dd04837b4db3672dc9f5a61 = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_865c868d7dd04837b4db3672dc9f5a61);
                ScrollViewer_865c868d7dd04837b4db3672dc9f5a61.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_865c868d7dd04837b4db3672dc9f5a61, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_865c868d7dd04837b4db3672dc9f5a61, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_865c868d7dd04837b4db3672dc9f5a61, 7);
                ScrollViewer_865c868d7dd04837b4db3672dc9f5a61.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_a3146e948702475c8d3e546ec01c90be = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_a3146e948702475c8d3e546ec01c90be.Text = "";
                this.RegisterName$1("output", TextBlock_a3146e948702475c8d3e546ec01c90be);
                TextBlock_a3146e948702475c8d3e546ec01c90be.Name = "output";
                TextBlock_a3146e948702475c8d3e546ec01c90be.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_a3146e948702475c8d3e546ec01c90be.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));
                TextBlock_a3146e948702475c8d3e546ec01c90be.TextWrapping = Bridge.global.Windows.UI.Xaml.TextWrapping.Wrap;

                ScrollViewer_865c868d7dd04837b4db3672dc9f5a61.Content = TextBlock_a3146e948702475c8d3e546ec01c90be;


                var ListBox_765056ad4bc545c2a1dc71bc707dd6a1 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_765056ad4bc545c2a1dc71bc707dd6a1);
                ListBox_765056ad4bc545c2a1dc71bc707dd6a1.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_765056ad4bc545c2a1dc71bc707dd6a1, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_765056ad4bc545c2a1dc71bc707dd6a1, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_765056ad4bc545c2a1dc71bc707dd6a1, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_765056ad4bc545c2a1dc71bc707dd6a1, 2);

                var TextBox_91aa49a58744480ea60877c69faaa330 = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_91aa49a58744480ea60877c69faaa330);
                TextBox_91aa49a58744480ea60877c69faaa330.Name = "input";
                TextBox_91aa49a58744480ea60877c69faaa330.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_91aa49a58744480ea60877c69faaa330, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_91aa49a58744480ea60877c69faaa330, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_91aa49a58744480ea60877c69faaa330, 9);
                TextBox_91aa49a58744480ea60877c69faaa330.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_e47c904fde854e3282768af38a02faa9 = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_e47c904fde854e3282768af38a02faa9);
                Button_e47c904fde854e3282768af38a02faa9.Name = "actionButton";
                Button_e47c904fde854e3282768af38a02faa9.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_e47c904fde854e3282768af38a02faa9, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_e47c904fde854e3282768af38a02faa9, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_e47c904fde854e3282768af38a02faa9, 9);
                Button_e47c904fde854e3282768af38a02faa9.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                var ListBox_f86680c50caa42eaa3ec06b1f12d0f02 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("directionList", ListBox_f86680c50caa42eaa3ec06b1f12d0f02);
                ListBox_f86680c50caa42eaa3ec06b1f12d0f02.Name = "directionList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_f86680c50caa42eaa3ec06b1f12d0f02, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_f86680c50caa42eaa3ec06b1f12d0f02, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_f86680c50caa42eaa3ec06b1f12d0f02, 6);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_f86680c50caa42eaa3ec06b1f12d0f02, 4);
                ListBox_f86680c50caa42eaa3ec06b1f12d0f02.addSelectionChanged(Bridge.fn.cacheBind(this, this.directionList_SelectionChanged));

                Grid_bbcd703b54a842f38dea7b5518b1c927.Children.add(ScrollViewer_865c868d7dd04837b4db3672dc9f5a61);
                Grid_bbcd703b54a842f38dea7b5518b1c927.Children.add(ListBox_765056ad4bc545c2a1dc71bc707dd6a1);
                Grid_bbcd703b54a842f38dea7b5518b1c927.Children.add(TextBox_91aa49a58744480ea60877c69faaa330);
                Grid_bbcd703b54a842f38dea7b5518b1c927.Children.add(Button_e47c904fde854e3282768af38a02faa9);
                Grid_bbcd703b54a842f38dea7b5518b1c927.Children.add(ListBox_f86680c50caa42eaa3ec06b1f12d0f02);


                this.Content = Grid_bbcd703b54a842f38dea7b5518b1c927;



                this.output = TextBlock_a3146e948702475c8d3e546ec01c90be;
                this.outputScroll = ScrollViewer_865c868d7dd04837b4db3672dc9f5a61;
                this.pastInputList = ListBox_765056ad4bc545c2a1dc71bc707dd6a1;
                this.input = TextBox_91aa49a58744480ea60877c69faaa330;
                this.actionButton = Button_e47c904fde854e3282768af38a02faa9;
                this.directionList = ListBox_f86680c50caa42eaa3ec06b1f12d0f02;



            }
        }
    });

    Bridge.define("FlightDashWeb.Player", {
        fields: {
            Money: System.Decimal(0.0),
            ScoreModifiers: 0
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

                output.v = "You Check in at the desk, putting your carefully preweighed luggage on the scale, and collect your boarding pass.";

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
                var $t, $t1;
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
                                $t1 = curState.Player;
                                $t1.ScoreModifiers += currentRoomExit.LockScore;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovUmVsZWFzZS9BcHAueGFtbC5nLmNzIiwib2JqL1JlbGVhc2UvTWFpblBhZ2UueGFtbC5nLmNzIiwiQXBwLnhhbWwuY3MiLCJSb29tLmNzIiwiRXhpdC5jcyIsIkdhbWUuY3MiLCJNYWluUGFnZS54YW1sLmNzIiwiUGxheWVyLmNzIiwiQ29tbWFuZHMvQ2hlY2tJbi5jcyIsIkNvbW1hbmRzL0dvLmNzIiwiQ29tbWFuZHMvTG9vay5jcyIsIkNvbW1hbmRzL1NlY3VyaXR5Q29tbWFuZC5jcyIsIkVuZFNjcmVlblJvb20uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztvQkFRUUEsV0FBMkJBLEFBQU9BO29CQUNsQ0EsT0FBT0EsbUVBQTZEQTs7Ozs7Ozs7OztvQkNEcEVBLFdBQTJCQSxBQUFPQTtvQkFDbENBLE9BQU9BLG1FQUE2REE7Ozs7Ozs7OztZRG1FeEVBLElBQUlBOzs7Ozs7Ozs7Z0JFL0RJQTs7O2dCQUlBQSxlQUFlQSxJQUFJQTtnQkFDbkJBLHlDQUF5QkE7Ozs7O2dCRnVCekJBLElBQUlBO29CQUNBQTs7Z0JBQ0pBOzs7Z0JBR0FBLElBQUlBO29CQUVBQSxBQUFDQSxZQUFtQ0EsQUFBUUE7Ozs7Z0JBSzVEQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUdBQSwwREFBMERBLElBQUlBO2dCQUM5REEsaUJBQWlCQTs7Z0JBRWpCQSxpQkFBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkdqQ2lDQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkNpQjFDQSxPQUFPQSw2QkFBb0JBOzs7Ozs7Ozs7Ozs7Ozs7OztnQ0M2ZmtCQSxLQUFJ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QUtBO29DQUNEQSwrQkFBVUEsa0RBQWdEQTtvQ0FDMURBO2dDQUNKQSxLQUFLQTtvQ0FDREEsK0JBQVVBLHdEQUFzREE7b0NBQ2hFQTtnQ0FDSkEsS0FBS0E7b0NBQ0RBLCtCQUFVQSw4REFBNERBO29DQUN0RUE7Z0NBQ0pBLEtBQUtBO29DQUNEQSwrQkFBVUEsbURBQWlEQTtvQ0FDM0RBO2dDQUNKQTtvQ0FDSUEsV0FBU0Esd0JBQXFCQTtvQ0FDOUJBOzs7Ozs7Ozs7O2dCQUtoQkE7Z0JBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7b0JDNUNKQSxPQUFPQSx1R0FBK0ZBLGtGQUEyQkEsMkRBQTJCQSxPQUFDQSxPQUFvQ0EseUJBQWtCQSxPQUFLQSxZQUFxREEsQUFBVUEseUNBQTNIQTs7Ozs7NEJBUnZJQTs7O2dCQUVqQkEsZ0JBQWdCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyA8Q1NIVE1MNT48WGFtbEhhc2g+OTc0M0I5MDMyMTlEQ0UzRjA1MzNCOTU1NTgzRTNCNEM8L1hhbWxIYXNoPjxQYXNzTnVtYmVyPjI8L1Bhc3NOdW1iZXI+PENvbXBpbGF0aW9uRGF0ZT4yLzIzLzIwMjAgMTI6MTM6NDcgUE08L0NvbXBpbGF0aW9uRGF0ZT48L0NTSFRNTDU+XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgY2xhc3Mgx4DHgEZsaWdodGRhc2h3ZWLHgMeAQ29tcG9uZW50x4DHgEFwcMeAx4BYYW1sx4DHgEZhY3Rvcnlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBvYmplY3QgSW5zdGFudGlhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGdsb2JhbDo6U3lzdGVtLlR5cGUgdHlwZSA9IHR5cGVvZihGbGlnaHREYXNoV2ViLkFwcCk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5UeXBlSW5zdGFudGlhdGlvbkhlbHBlci5JbnN0YW50aWF0ZSh0eXBlKTtcclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDxhdXRvLWdlbmVyYXRlZD5cclxuLy8gICAgIFRoaXMgY29kZSB3YXMgYXV0by1nZW5lcmF0ZWQgYnkgXCJDIy9YQU1MIGZvciBIVE1MNVwiXHJcbi8vXHJcbi8vICAgICBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBtYXkgY2F1c2UgaW5jb3JyZWN0IGJlaGF2aW9yIGFuZCB3aWxsIGJlIGxvc3QgaWZcclxuLy8gICAgIHRoZSBjb2RlIGlzIHJlZ2VuZXJhdGVkLlxyXG4vLyA8L2F1dG8tZ2VuZXJhdGVkPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblxyXG5wYXJ0aWFsIGNsYXNzIEFwcCA6IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkFwcGxpY2F0aW9uXHJcbntcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDE2OSwgNjQ5LCAwNjI4IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTY5ICgnZmllbGQgLi4uIGlzIG5ldmVyIHVzZWQnKSwgQ1MwNjQ5ICgnZmllbGQgLi4uIGlzIG5ldmVyIGFzc2lnbmVkIHRvLCBhbmQgd2lsbCBhbHdheXMgaGF2ZSBpdHMgZGVmYXVsdCB2YWx1ZSBudWxsJyksIGFuZCBDUzA2MjggKCdtZW1iZXIgOiBuZXcgcHJvdGVjdGVkIG1lbWJlciBkZWNsYXJlZCBpbiBzZWFsZWQgY2xhc3MnKVxyXG5cclxuXHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAxNjksIDY0OSwgMDYyOFxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9jb250ZW50TG9hZGVkO1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVDb21wb25lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9jb250ZW50TG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfY29udGVudExvYWRlZCA9IHRydWU7XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAwMTg0IC8vIFByZXZlbnRzIHdhcm5pbmcgQ1MwMTg0ICgnVGhlIGdpdmVuIGV4cHJlc3Npb24gaXMgbmV2ZXIgb2YgdGhlIHByb3ZpZGVkICgndHlwZScpIHR5cGUnKVxyXG4gICAgICAgICAgICBpZiAodGhpcyBpcyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICgoZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KShvYmplY3QpdGhpcykuWGFtbFNvdXJjZVBhdGggPSBAXCJGbGlnaHREYXNoV2ViXFxBcHAueGFtbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDAxODRcclxuXHJcblxyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRSb290UGF0aCA9IEBcIk91dHB1dFxcXCI7XHJcbmdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5TdGFydHVwQXNzZW1ibHlJbmZvLk91dHB1dEFwcEZpbGVzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxhcHBcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRMaWJyYXJpZXNQYXRoID0gQFwiYXBwLWNzaHRtbDVcXGxpYnNcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRSZXNvdXJjZXNQYXRoID0gQFwiYXBwLWNzaHRtbDVcXHJlc1xcXCI7XHJcblxyXG5cclxudmFyIFJlc291cmNlRGljdGlvbmFyeV80NTJlY2I3N2M0NmI0YmUxYjg3YjhiOTkwNDkxYjU3OSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5SZXNvdXJjZURpY3Rpb25hcnkoKTtcclxudGhpcy5SZXNvdXJjZXMgPSBSZXNvdXJjZURpY3Rpb25hcnlfNDUyZWNiNzdjNDZiNGJlMWI4N2I4Yjk5MDQ5MWI1Nzk7XHJcblxyXG50aGlzLlJlc291cmNlcyA9IFJlc291cmNlRGljdGlvbmFyeV80NTJlY2I3N2M0NmI0YmUxYjg3YjhiOTkwNDkxYjU3OTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG57XHJcbiAgICBuZXcgQXBwKCk7XHJcbn1cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiIsIi8vIDxDU0hUTUw1PjxYYW1sSGFzaD4yRTg3RjlDNUNGODFDRTlBREZERjNBMkQ0QjJGMDRCMTwvWGFtbEhhc2g+PFBhc3NOdW1iZXI+MjwvUGFzc051bWJlcj48Q29tcGlsYXRpb25EYXRlPjIvMjMvMjAyMCAxMjoxMzo0NyBQTTwvQ29tcGlsYXRpb25EYXRlPjwvQ1NIVE1MNT5cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyBjbGFzcyDHgMeARmxpZ2h0ZGFzaHdlYseAx4BDb21wb25lbnTHgMeATWFpbnBhZ2XHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5NYWluUGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5UeXBlSW5zdGFudGlhdGlvbkhlbHBlci5JbnN0YW50aWF0ZSh0eXBlKTtcclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDxhdXRvLWdlbmVyYXRlZD5cclxuLy8gICAgIFRoaXMgY29kZSB3YXMgYXV0by1nZW5lcmF0ZWQgYnkgXCJDIy9YQU1MIGZvciBIVE1MNVwiXHJcbi8vXHJcbi8vICAgICBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBtYXkgY2F1c2UgaW5jb3JyZWN0IGJlaGF2aW9yIGFuZCB3aWxsIGJlIGxvc3QgaWZcclxuLy8gICAgIHRoZSBjb2RlIGlzIHJlZ2VuZXJhdGVkLlxyXG4vLyA8L2F1dG8tZ2VuZXJhdGVkPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblxyXG5wYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUGFnZVxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCbG9jayBvdXRwdXQ7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5TY3JvbGxWaWV3ZXIgb3V0cHV0U2Nyb2xsO1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCBwYXN0SW5wdXRMaXN0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJveCBpbnB1dDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkJ1dHRvbiBhY3Rpb25CdXR0b247XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94IGRpcmVjdGlvbkxpc3Q7XHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcTWFpblBhZ2UueGFtbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDAxODRcclxuXHJcblxyXG5cclxudmFyIEdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZCgpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3Lkhvcml6b250YWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Ib3Jpem9udGFsQWxpZ25tZW50LlN0cmV0Y2g7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuVmVydGljYWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5WZXJ0aWNhbEFsaWdubWVudC5TdHJldGNoO1xyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl8zYTk0ZTk0ZTliZmQ0ZGNhYThmZWI5Y2NkMjUwODczNSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fM2E5NGU5NGU5YmZkNGRjYWE4ZmViOWNjZDI1MDg3MzUuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzVmMDEwNTZkNTI2YTQ2NThiYWIzNjQ3NzJhMTJlYmEyID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl81ZjAxMDU2ZDUyNmE0NjU4YmFiMzY0NzcyYTEyZWJhMi5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fMzA5ZjM2YmY2NmIxNDU1Y2FkMjJlYWU0YjA5YWU5ODIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzMwOWYzNmJmNjZiMTQ1NWNhZDIyZWFlNGIwOWFlOTgyLldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl85NjA2MDMzNzUxYWU0ZDVjOTgwZDI4NjZlNTNiN2Y0NSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fOTYwNjAzMzc1MWFlNGQ1Yzk4MGQyODY2ZTUzYjdmNDUuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzg0NDkwNDZlMDZiZTRjMTE4Y2VlNzJhMjZmZDFjZGM0ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl84NDQ5MDQ2ZTA2YmU0YzExOGNlZTcyYTI2ZmQxY2RjNC5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl8zYTk0ZTk0ZTliZmQ0ZGNhYThmZWI5Y2NkMjUwODczNSk7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fNWYwMTA1NmQ1MjZhNDY1OGJhYjM2NDc3MmExMmViYTIpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzMwOWYzNmJmNjZiMTQ1NWNhZDIyZWFlNGIwOWFlOTgyKTtcclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl85NjA2MDMzNzUxYWU0ZDVjOTgwZDI4NjZlNTNiN2Y0NSk7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fODQ0OTA0NmUwNmJlNGMxMThjZWU3MmEyNmZkMWNkYzQpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMDQyNmEwZDIyMDk1NDBjNjg4NzQzM2JmOTcxODMzMWMgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzA0MjZhMGQyMjA5NTQwYzY4ODc0MzNiZjk3MTgzMzFjLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZDVhNTE3MDg3NjM1NDdjNjlkMzhlYzEyMzEzOWE3N2MgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2Q1YTUxNzA4NzYzNTQ3YzY5ZDM4ZWMxMjMxMzlhNzdjLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNzA5Njk1YzY5YzhjNDE2YWE1MDU4NzcxOTE0ODRiYjIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzcwOTY5NWM2OWM4YzQxNmFhNTA1ODc3MTkxNDg0YmIyLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fYjU2OGZhM2UzYzNjNGRlN2IxOTVjNzNlYWUxNWVlZTYgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2I1NjhmYTNlM2MzYzRkZTdiMTk1YzczZWFlMTVlZWU2LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNzBjOGI1OTQ1ZTM3NGJmYWFjOWU0NGVlMGZlZWI0MmYgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzcwYzhiNTk0NWUzNzRiZmFhYzllNDRlZTBmZWViNDJmLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNjhkNWU4ZWJmMmI5NDNlMGFhNWNjNmMyM2E5MmI0ZDcgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzY4ZDVlOGViZjJiOTQzZTBhYTVjYzZjMjNhOTJiNGQ3LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNDBkYWJiYWE1ZjczNDNlZWIxZTM2MTAyYWNmMzE0NzkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzQwZGFiYmFhNWY3MzQzZWViMWUzNjEwMmFjZjMxNDc5LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZWRiY2NjMDY0M2VmNGFlMmI5OTNmMDNhYzgxMGRlY2YgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2VkYmNjYzA2NDNlZjRhZTJiOTkzZjAzYWM4MTBkZWNmLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZjcwOGQ4MWVmYjlhNGJhOGJlZDczNGRmZmY0OWRkYTkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2Y3MDhkODFlZmI5YTRiYThiZWQ3MzRkZmZmNDlkZGE5LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fNTk3YzJjZWU2OTBmNGYxYTllZDBlOTgzMzhkYTQ4OTUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzU5N2MyY2VlNjkwZjRmMWE5ZWQwZTk4MzM4ZGE0ODk1LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl8wNDI2YTBkMjIwOTU0MGM2ODg3NDMzYmY5NzE4MzMxYyk7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fZDVhNTE3MDg3NjM1NDdjNjlkMzhlYzEyMzEzOWE3N2MpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzcwOTY5NWM2OWM4YzQxNmFhNTA1ODc3MTkxNDg0YmIyKTtcclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9iNTY4ZmEzZTNjM2M0ZGU3YjE5NWM3M2VhZTE1ZWVlNik7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNzBjOGI1OTQ1ZTM3NGJmYWFjOWU0NGVlMGZlZWI0MmYpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzY4ZDVlOGViZjJiOTQzZTBhYTVjYzZjMjNhOTJiNGQ3KTtcclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl80MGRhYmJhYTVmNzM0M2VlYjFlMzYxMDJhY2YzMTQ3OSk7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fZWRiY2NjMDY0M2VmNGFlMmI5OTNmMDNhYzgxMGRlY2YpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uX2Y3MDhkODFlZmI5YTRiYThiZWQ3MzRkZmZmNDlkZGE5KTtcclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl81OTdjMmNlZTY5MGY0ZjFhOWVkMGU5ODMzOGRhNDg5NSk7XHJcblxyXG52YXIgU2Nyb2xsVmlld2VyXzg2NWM4NjhkN2RkMDQ4MzdiNGRiMzY3MmRjOWY1YTYxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlNjcm9sbFZpZXdlcigpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcIm91dHB1dFNjcm9sbFwiLCBTY3JvbGxWaWV3ZXJfODY1Yzg2OGQ3ZGQwNDgzN2I0ZGIzNjcyZGM5ZjVhNjEpO1xyXG5TY3JvbGxWaWV3ZXJfODY1Yzg2OGQ3ZGQwNDgzN2I0ZGIzNjcyZGM5ZjVhNjEuTmFtZSA9IFwib3V0cHV0U2Nyb2xsXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKFNjcm9sbFZpZXdlcl84NjVjODY4ZDdkZDA0ODM3YjRkYjM2NzJkYzlmNWE2MSwwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKFNjcm9sbFZpZXdlcl84NjVjODY4ZDdkZDA0ODM3YjRkYjM2NzJkYzlmNWE2MSw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3dTcGFuKFNjcm9sbFZpZXdlcl84NjVjODY4ZDdkZDA0ODM3YjRkYjM2NzJkYzlmNWE2MSw3KTtcclxuU2Nyb2xsVmlld2VyXzg2NWM4NjhkN2RkMDQ4MzdiNGRiMzY3MmRjOWY1YTYxLkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcbnZhciBUZXh0QmxvY2tfYTMxNDZlOTQ4NzAyNDc1YzhkM2U1NDZlYzAxYzkwYmUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJsb2NrKCk7XHJcblRleHRCbG9ja19hMzE0NmU5NDg3MDI0NzVjOGQzZTU0NmVjMDFjOTBiZS5UZXh0ID0gQFwiXCI7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwib3V0cHV0XCIsIFRleHRCbG9ja19hMzE0NmU5NDg3MDI0NzVjOGQzZTU0NmVjMDFjOTBiZSk7XHJcblRleHRCbG9ja19hMzE0NmU5NDg3MDI0NzVjOGQzZTU0NmVjMDFjOTBiZS5OYW1lID0gXCJvdXRwdXRcIjtcclxuVGV4dEJsb2NrX2EzMTQ2ZTk0ODcwMjQ3NWM4ZDNlNTQ2ZWMwMWM5MGJlLkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcblRleHRCbG9ja19hMzE0NmU5NDg3MDI0NzVjOGQzZTU0NmVjMDFjOTBiZS5Gb3JlZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMjU1LCBHID0gKGJ5dGUpMjU1LCBCID0gKGJ5dGUpMjU1IH0pO1xyXG5UZXh0QmxvY2tfYTMxNDZlOTQ4NzAyNDc1YzhkM2U1NDZlYzAxYzkwYmUuVGV4dFdyYXBwaW5nID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVGV4dFdyYXBwaW5nLldyYXA7XHJcblxyXG5TY3JvbGxWaWV3ZXJfODY1Yzg2OGQ3ZGQwNDgzN2I0ZGIzNjcyZGM5ZjVhNjEuQ29udGVudCA9IFRleHRCbG9ja19hMzE0NmU5NDg3MDI0NzVjOGQzZTU0NmVjMDFjOTBiZTtcclxuXHJcblxyXG52YXIgTGlzdEJveF83NjUwNTZhZDRiYzU0NWMyYTFkYzcxYmM3MDdkZDZhMSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5MaXN0Qm94KCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwicGFzdElucHV0TGlzdFwiLCBMaXN0Qm94Xzc2NTA1NmFkNGJjNTQ1YzJhMWRjNzFiYzcwN2RkNmExKTtcclxuTGlzdEJveF83NjUwNTZhZDRiYzU0NWMyYTFkYzcxYmM3MDdkZDZhMS5OYW1lID0gXCJwYXN0SW5wdXRMaXN0XCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKExpc3RCb3hfNzY1MDU2YWQ0YmM1NDVjMmExZGM3MWJjNzA3ZGQ2YTEsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihMaXN0Qm94Xzc2NTA1NmFkNGJjNTQ1YzJhMWRjNzFiYzcwN2RkNmExLDQpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhMaXN0Qm94Xzc2NTA1NmFkNGJjNTQ1YzJhMWRjNzFiYzcwN2RkNmExLDcpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvd1NwYW4oTGlzdEJveF83NjUwNTZhZDRiYzU0NWMyYTFkYzcxYmM3MDdkZDZhMSwyKTtcclxuXHJcbnZhciBUZXh0Qm94XzkxYWE0OWE1ODc0NDQ4MGVhNjA4NzdjNjlmYWFhMzMwID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJpbnB1dFwiLCBUZXh0Qm94XzkxYWE0OWE1ODc0NDQ4MGVhNjA4NzdjNjlmYWFhMzMwKTtcclxuVGV4dEJveF85MWFhNDlhNTg3NDQ0ODBlYTYwODc3YzY5ZmFhYTMzMC5OYW1lID0gXCJpbnB1dFwiO1xyXG5UZXh0Qm94XzkxYWE0OWE1ODc0NDQ4MGVhNjA4NzdjNjlmYWFhMzMwLlRleHQgPSBAXCJcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oVGV4dEJveF85MWFhNDlhNTg3NDQ0ODBlYTYwODc3YzY5ZmFhYTMzMCwwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKFRleHRCb3hfOTFhYTQ5YTU4NzQ0NDgwZWE2MDg3N2M2OWZhYWEzMzAsMyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KFRleHRCb3hfOTFhYTQ5YTU4NzQ0NDgwZWE2MDg3N2M2OWZhYWEzMzAsOSk7XHJcblRleHRCb3hfOTFhYTQ5YTU4NzQ0NDgwZWE2MDg3N2M2OWZhYWEzMzAuS2V5RG93biArPSBpbnB1dF9LZXlEb3duO1xyXG5cclxudmFyIEJ1dHRvbl9lNDdjOTA0ZmRlODU0ZTMyODI3NjhhZjM4YTAyZmFhOSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5CdXR0b24oKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJhY3Rpb25CdXR0b25cIiwgQnV0dG9uX2U0N2M5MDRmZGU4NTRlMzI4Mjc2OGFmMzhhMDJmYWE5KTtcclxuQnV0dG9uX2U0N2M5MDRmZGU4NTRlMzI4Mjc2OGFmMzhhMDJmYWE5Lk5hbWUgPSBcImFjdGlvbkJ1dHRvblwiO1xyXG5CdXR0b25fZTQ3YzkwNGZkZTg1NGUzMjgyNzY4YWYzOGEwMmZhYTkuQ29udGVudCA9IEBcIkFjdGlvblwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihCdXR0b25fZTQ3YzkwNGZkZTg1NGUzMjgyNzY4YWYzOGEwMmZhYTksMyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihCdXR0b25fZTQ3YzkwNGZkZTg1NGUzMjgyNzY4YWYzOGEwMmZhYTksMSk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KEJ1dHRvbl9lNDdjOTA0ZmRlODU0ZTMyODI3NjhhZjM4YTAyZmFhOSw5KTtcclxuQnV0dG9uX2U0N2M5MDRmZGU4NTRlMzI4Mjc2OGFmMzhhMDJmYWE5LkNsaWNrICs9IGFjdGlvbkJ1dHRvbl9DbGljaztcclxuXHJcbnZhciBMaXN0Qm94X2Y4NjY4MGM1MGNhYTQyZWFhM2VjMDZiMWYxMmQwZjAyID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJkaXJlY3Rpb25MaXN0XCIsIExpc3RCb3hfZjg2NjgwYzUwY2FhNDJlYWEzZWMwNmIxZjEyZDBmMDIpO1xyXG5MaXN0Qm94X2Y4NjY4MGM1MGNhYTQyZWFhM2VjMDZiMWYxMmQwZjAyLk5hbWUgPSBcImRpcmVjdGlvbkxpc3RcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oTGlzdEJveF9mODY2ODBjNTBjYWE0MmVhYTNlYzA2YjFmMTJkMGYwMiw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKExpc3RCb3hfZjg2NjgwYzUwY2FhNDJlYWEzZWMwNmIxZjEyZDBmMDIsMSk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KExpc3RCb3hfZjg2NjgwYzUwY2FhNDJlYWEzZWMwNmIxZjEyZDBmMDIsNik7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihMaXN0Qm94X2Y4NjY4MGM1MGNhYTQyZWFhM2VjMDZiMWYxMmQwZjAyLDQpO1xyXG5MaXN0Qm94X2Y4NjY4MGM1MGNhYTQyZWFhM2VjMDZiMWYxMmQwZjAyLlNlbGVjdGlvbkNoYW5nZWQgKz0gZGlyZWN0aW9uTGlzdF9TZWxlY3Rpb25DaGFuZ2VkO1xyXG5cclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5DaGlsZHJlbi5BZGQoU2Nyb2xsVmlld2VyXzg2NWM4NjhkN2RkMDQ4MzdiNGRiMzY3MmRjOWY1YTYxKTtcclxuR3JpZF9iYmNkNzAzYjU0YTg0MmYzOGRlYTdiNTUxOGIxYzkyNy5DaGlsZHJlbi5BZGQoTGlzdEJveF83NjUwNTZhZDRiYzU0NWMyYTFkYzcxYmM3MDdkZDZhMSk7XHJcbkdyaWRfYmJjZDcwM2I1NGE4NDJmMzhkZWE3YjU1MThiMWM5MjcuQ2hpbGRyZW4uQWRkKFRleHRCb3hfOTFhYTQ5YTU4NzQ0NDgwZWE2MDg3N2M2OWZhYWEzMzApO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LkNoaWxkcmVuLkFkZChCdXR0b25fZTQ3YzkwNGZkZTg1NGUzMjgyNzY4YWYzOGEwMmZhYTkpO1xyXG5HcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3LkNoaWxkcmVuLkFkZChMaXN0Qm94X2Y4NjY4MGM1MGNhYTQyZWFhM2VjMDZiMWYxMmQwZjAyKTtcclxuXHJcblxyXG50aGlzLkNvbnRlbnQgPSBHcmlkX2JiY2Q3MDNiNTRhODQyZjM4ZGVhN2I1NTE4YjFjOTI3O1xyXG5cclxuXHJcblxyXG5vdXRwdXQgPSBUZXh0QmxvY2tfYTMxNDZlOTQ4NzAyNDc1YzhkM2U1NDZlYzAxYzkwYmU7XHJcbm91dHB1dFNjcm9sbCA9IFNjcm9sbFZpZXdlcl84NjVjODY4ZDdkZDA0ODM3YjRkYjM2NzJkYzlmNWE2MTtcclxucGFzdElucHV0TGlzdCA9IExpc3RCb3hfNzY1MDU2YWQ0YmM1NDVjMmExZGM3MWJjNzA3ZGQ2YTE7XHJcbmlucHV0ID0gVGV4dEJveF85MWFhNDlhNTg3NDQ0ODBlYTYwODc3YzY5ZmFhYTMzMDtcclxuYWN0aW9uQnV0dG9uID0gQnV0dG9uX2U0N2M5MDRmZGU4NTRlMzI4Mjc2OGFmMzhhMDJmYWE5O1xyXG5kaXJlY3Rpb25MaXN0ID0gTGlzdEJveF9mODY2ODBjNTBjYWE0MmVhYTNlYzA2YjFmMTJkMGYwMjtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgc2VhbGVkIHBhcnRpYWwgY2xhc3MgQXBwIDogQXBwbGljYXRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluUGFnZSA9IG5ldyBNYWluUGFnZSgpO1xyXG4gICAgICAgICAgICBXaW5kb3cuQ3VycmVudC5Db250ZW50ID0gbWFpblBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIGJhc2ljIHJvb21cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUm9vbVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJvb20gbmFtZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSb29tTmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcm9vbSBEZXNjcmlwdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTaG9ydFJvb21EZXNjIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMb25nUm9vbURlc2MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBMaXN0PEV4aXQ+IEV4aXRzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRXhpdCBBdXRvRXhpdCB7IGdldDsgc2V0OyB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgTGlzdDxFeGl0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRXhpdHM9bmV3IExpc3Q8RXhpdD4oKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgYmFzaWMgZXhpdCBmcm9tIG9uZSByb29tIGludG8gYW5vdGhlclxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBFeGl0XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYW1lIG9mIHRoZSBleGl0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEV4aXROYW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0cmluZ1tdIEV4aXROYW1lcyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGVzdGluYXRpb24gcm9vbVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFJvb20gRGVzdGluYXRpb24geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGVzY3JpcHRpb24gdG8gc2hvdyBvZiB0aGUgZXhpdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBFeGl0RGVzYyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXhpdFRleHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBkZWNpbWFsIEV4aXRDb3N0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaW1lIHRha2VuIHRvIHVzZSB0aGUgZXhpdFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBFeGl0VGltZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGdW5jPEdhbWUsIGJvb2w+IEV4aXRMb2NrZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExvY2tUZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IExvY2tUaW1lIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IExvY2tTY29yZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBTY29yZU1vZGlmeSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7MH1cIixFeGl0TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZsaWdodERhc2hXZWIuQ29tbWFuZHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSb29tIEN1cnJlbnRSb29tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgUGxheWVyIFBsYXllciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lVG9GbGlnaHQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGlzdDxJQ29tbWFuZD4gQ29tbWFuZHMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIEdhbWVPdmVyIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2hlY2tlZEluIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEJlbG9uZ2luZ3MgQ3VycmVudEJlbG9uZ2luZ3MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVHYW1lKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBUaW1lVG9GbGlnaHQgPSA2MDtcclxuICAgICAgICAgICAgUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgICAgICBQbGF5ZXIuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICBNYWtlUm9vbXMoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBMb29rKCkpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IEdvKCkpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IENoZWNrSW4oKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgU2VjdXJpdHlDb21tYW5kKCkpO1xyXG4gICAgICAgICAgICBDaGVja2VkSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgQ3VycmVudEJlbG9uZ2luZ3MgPSBCZWxvbmdpbmdzLkVsZWN0cm9uaWNzIHwgQmVsb25naW5ncy5Qb2NrZXRzIHwgQmVsb25naW5ncy5CYWNrcGFjayB8IEJlbG9uZ2luZ3MuQmVsdCB8IEJlbG9uZ2luZ3MuU2hvZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTWFrZVJvb21zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbFJvb20gPSBuZXcgUm9vbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSG90ZWwgUm9vbVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiQSBwcmV0dHkgYmFzaWMgSG90ZWwgcm9vbS4gTm90aGluZyBtdWNoIG91dCBvZiB0aGUgb3JkaW5hcnkgaGVyZVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBiZWQgaXMgdW5tYWRlLCBsZWZ0IGluIGEgbWVzcyBmcm9tIHlvdXIgcnVkZSBhd2FrZW5pbmcsIGFzIHRoZSBhbGFybSBibGlua3MgMTI6MDAgbWVycmlseSBhdCB5b3UsIGlnbm9yYW50IG9mIHlvdXIgZGlzdHJlc3MuXFxyXFxuIFlvdXIgc3VpdGNhc2UgbGF5cyBvbiB0aGUgZmxvb3IgYXQgdGhlIGZvb3Qgb2YgdGhlIGJlZCwgbmVhdGx5IHBhY2tlZC5cXHJcXG5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG91dHNpZGVIb3RlbCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk91dHNpZGUgSG90ZWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIk91dHNpZGUgdGhlIHdlYXRoZXIgaXMgY2FsbSwgYmx1ZSBza2llcy4gWW91ciBjYXIgc2l0cyBpbiB0aGUgYXNzaWduZWQgcGFya2luZyBzcG90IGF3YWl0aW5nIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJJbiB0aGUgZGlzdGFuY2UgeW91IHNlZSBvbiB0aGUgZnJlZSByb2FkIHNvbWUgaGludHMgb2YgYSB0cmFmZmljIGphbS5cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgaG90ZWxFeGl0ID0gbmV3IEV4aXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBvdXRzaWRlSG90ZWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGhvdGVsIGRvb3IgaGFzIGEgc2lnbiBvbiBpdCBzYXlpbmcgXFxcIlBsZWFzZSByZW1lbWJlciB5b3VyIGtleSB3aWxsIG5vdCB3b3JrIG9uY2UgeW91ciBjaGVja291dCB0aW1lIGlzIHBhc3QsIHBsZWFzZSByZW1lbWJlciBhbGwgeW91ciBiZWxvbmdpbmdzXFxcIlxcclxcblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhdmluZyB0aGUgaG90ZWwgeW91IGhlYXIgaXQgbG9jayBiZWhpbmQgeW91LCBkcm9wcGluZyB5b3VyIGtleXMgb2ZmIGF0IHJlY2VwdGlvbiB5b3UgaGVhZCBpbnRvIHRoZSBjYXJwYXJrIHRvIHBpY2sgdXAgeW91ciByZW50YWwuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiT3V0c2lkZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIm91dHNpZGVcIiwgXCJkb29yXCIsIFwiZXhpdFwiLCBcIm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDMsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaG90ZWxSb29tLkV4aXRzLkFkZChob3RlbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhciA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkluIHlvdXIgQ2FyXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJZb3VyIHJlbnRhbCBpcyBhIGJhc2ljIGF1dG9tYXRpYyB0cmFuc21pc3Npb24gY2FyXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJNb2RlcmF0ZSBzaXplLCBhdCBtaW5pbWFsIGNvc3QsIG5vIGZhbmN5IEdQUyBvciBtZWRpYSBjZW50ZXIgZm9yIHlvdSBvbiB0aGlzIHRyaXAuIFxyXG4gSXQgaXMgb2J2aW91cyB0aGUgY2FyIGhhcyBzZWVuIGJldHRlciBkYXlzLCBhbmQgbXVjaCB3b3JzZSBkcml2ZXJzLCB3aXRoIHNvbWUgc3RhaW5zIGRvdHRlZCBvbiB0aGUgZW1wdHkgcGFzc2VuZ2VyIHNlYXQgY3VzaGlvbnMuIFxyXG5Zb3VyIGRhc2hib2FyZCBpcyBhIGJpdCBkaXJ0eSBidXQgbG9va2luZyBjbG9zZXIgeW91IG5vdGljZSB5b3VyIGZ1ZWwgaXMgb25seSBhIHRoaXJkIGZ1bGxcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhckV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gY2FyLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSByZW50YWwgY2FyIGlzIGEgc21hbGwsIGFuZCBzbGlnaHRseSBiYXR0ZXJlZCB0aGluZy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZHVtcCB5b3VyIHN1aXRjYXNlIGludG8gdGhlIHRydW5rLCBmaWxsaW5nIHRoZSBsaW1pdGVkIHNwYWNlIGJlZm9yZSBwbG9wcGluZyB5b3Vyc2VsZiBkb3duIGluIHRoZSBkcml2ZXJzIHNlYXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDYXJcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJjYXJcIiwgXCJpblwiLCBcInJlbnRhbFwiLCBcImRyaXZlcnNcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG91dHNpZGVIb3RlbC5FeGl0cy5BZGQoY2FyRXhpdCk7XHJcbiAgICAgICAgICAgIC8vIHRvZG8gQWRkIHdhbGtcclxuICAgICAgICAgICAgdmFyIG9uRmlyc3RSb2FkID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIFJvYWRcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSByb2FkIG91dCBvZiB0aGUgaG90ZWwgaXMgcHJldHR5IGJhc2ljLCBzdHJhaWdodCwgYW5kIHdlbGwgc2lnbnBvc3RlZCB1cCB0byB0aGUgaGlnaHdheS4gXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJBaGVhZCBvZiB5b3UgaXMgYSBzcGxpdCwgdGhlIHJvYWQgdG8gdGhlIHJpZ2h0IGlzIGZyZWUsIGJ1dCB0aGVyZSBzZWVtcyB0byBiZSBzaWducyBvZiB0cmFmZmljLiBcclxuV2hlcmVhcyB0aGUgcm9hZCB0byB0aGUgbGVmdCBjb3N0cyB5b3UgJDUwIGp1c3QgdG8gZW50ZXIsYnV0IHRha2VzIHlvdSBkaXJlY3QgdG8gdGhlIGFpcnBvcnQuXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRDYXIgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPbiB0aGUgV2F5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJvYWQgdG8gdGhlIGFpcnBvcnQgbG9va3MgcHJldHR5IG9idmlvdXMgZnJvbSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG9uRmlyc3RSb2FkLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImFpcnBvcnRcIiwgXCJhaXJwb3J0XCIsIFwib3V0XCIsIFwicGxhbmVcIiwgXCJmbGlnaHRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIkRyaXZpbmcgb3V0IG9mIHRoZSBob3RlbCwgeW91ICBzb29uIHNwb3QgdGhlIHNpZ24gdG8gdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMTBcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhci5FeGl0cy5BZGQoc3RhcnRDYXIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aE1vdG9yd2F5ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIFRvbGxib290aCByb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGhpZ2h3YXkgbG9va3MgY2xlYXIgdGhyb3VnaCB0aGUgd2hvbGUgcm91dGUuIFRoZSBvY2Nhc2lvbmFsIGNhciBwYXNzZXMsIG9yIGlzIHBhc3NlZCBidXQgb3ZlcmFsbCAgaXQgc3RheXMgY2xlYXIgcmlnaHQgdGhyb3VnaCB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBAXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aEVudHJhbmNlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVG9sbGJvb3RoIFJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRvbGxib290aCBzdGFuZHMgb24gdGhlIHNpZGUgb2YgdGhlIHJvYWQsIGl0J3MgbG9uZyBiYXIgbG93ZXJlZCBibG9ja2luZyB0aGUgcm91dGUgb25cIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdG9sbGJvb3RoTW90b3J3YXksXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IChkZWNpbWFsKTUwLjAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwidG9sbGJvb3RoXCIsIFwicGFpZFwiLCBcImZhc3RcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9uRmlyc3RSb2FkLkV4aXRzLkFkZCh0b2xsYm9vdGhFbnRyYW5jZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJlZVJvYWQgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgZnJlZSByb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGhpZ2h3YXkgaXMgaW4gdGhlIG1pZHN0IG9mIGEgaHVnZSB0cmFmZmljIGphbS4gQ2FyIGhvcm5zIG9mIGFsbCBzb3J0cyAsIGFuZCB0aGUgb2NjYXNpb25hbCB5ZWxsIGZpbGxzIHRoZSBhaXJcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGZyZWVSb2FkRW50cmFuY2UgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGcmVlIFJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJUaGUgZnJlZSByb3V0ZSdzIGVudHJhbmNlIGxpZXMgdW5iYXJyZWQsIGJ1dCB0aGVyZSBpcyBhIGhpbnQgb2YgcmVkIGJyZWFrLWxpZ2h0cyBpbiB0aGUgZGlzdGFuY2UgYWxvbmcgaXRcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gZnJlZVJvYWQsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiZnJlZVwiLCBcInJpZ2h0XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gcmlnaHQsIGludGVuZGluZyB0byBzYXZlIHlvdXIgbW9uZXkgZm9yIGxhdGVyLCBob3dldmVyIGEgc2hvcnQgdGltZSB1cCB0aGUgcm9hZCB5b3UgY3Jhd2wgdG8gYSBoYWx0IGFzIHlvdSBoaXQgYSBodWdlIHRyYWZmaWMgamFtLFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9uRmlyc3RSb2FkLkV4aXRzLkFkZChmcmVlUm9hZEVudHJhbmNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYWlycG9ydEVudHJhbmNlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiQWlycG9ydCBEZXBhcnR1cmVzIEVudHJhbmNlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgZGVwYXJ0dXJlcyBlbnRyYW5jZSB0byB0aGUgYWlycG9ydCBsb29rcyBhIGJpdCBkaW5neSwgYnV0IHdlbGwgdHJhdmVsZWQsIHRoZSBkb29ycyBhcmUgd2lkZSBvcGVuIGFzIHBlb3BsZSBzdHJlYW0gaW5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgcG9zdGVycyBhcmUgb24gdGhlIHdhbGwsIGFkdmVydGlzaW5nIGZsaWdodCBkZWFscyBmb3IgdmFyaW91cyBjb21wYW5pZXMsIGFuZCBhIGNvdXBsZSBzZWN1cml0eSBndWFyZHMgc3RhbmQgbmVhciB0aGUgZW50cmFuY2UuXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib3RoTGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYWlycG9ydEVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImxlYXZlXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggZXhpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHRvbGwgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFJhbmRvbSByYW5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICB2YXIgZnJlZVJvdXRlTGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYWlycG9ydEVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImxlYXZlXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJGcmVlIHJvdXRlIGV4aXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gcmFuZC5OZXh0KDEwKSA+IDUgPyAyNSA6IDM1LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRvbGxib290aE1vdG9yd2F5LkF1dG9FeGl0ID0gdG9sbGJvdGhMZWF2ZTtcclxuXHJcbiAgICAgICAgICAgIGZyZWVSb2FkLkF1dG9FeGl0ID0gZnJlZVJvdXRlTGVhdmU7XHJcbiAgICAgICAgICAgIHZhciB3YWxrID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ3YWxrXCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGVyZSBpcyBhIHdhbGtpbmcgcGF0aCB0byB0aGUgYWlycG9ydCB0aGF0IHNlZW1zIHRvIGdvIHRocm91Z2ggYSBmZXcgZmllbGRzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiVGhlIHdhbGsgdG8gdGhlIGFpcnBvcnQgaXMgbG9uZyBhbmQgYXJkdW91cywgYW5kIHNlZW1zIHRvIHRha2UgYSBsb3QgbG9uZ2VyIHRoZW4gaXQgbG9va2VkIGZyb20gdGhlIG1hcCBhdCB0aGUgaG90ZWxcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMTIwLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIldhbGtpbmcgUGF0aFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG91dHNpZGVIb3RlbC5FeGl0cy5BZGQod2Fsayk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGluc2lkZUFpcnBvcnQgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJJbnNpZGUgdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIkluc2lkZSB0aGUgYWlycG9ydCB0aGluZ3MgYXJlIHF1aXRlIGJ1c3ksIHRvIHRoZSBsZWZ0IGFyZSB0aGUgY2hlY2staW4gZGVza3Mgd2hpbGUgdG8gdGhlIHJpZ2h0IGlzIHRoZSBUU0EgcXVldWUuXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkJ5IHRoZSBUU0EgcXVldWUgZW50cmFuY2UgaXMgYSBzaWduIHNheWluZyBcXFwiQnV5IFRTQSBQcmVDaGVjayB0byB1c2UgdGhpcyBzaG9ydGVyIHF1ZXVlLiBPbmx5ICQ4NVxcXCIgTmV4dCB0byBhIGJhcnJpZXIgIGxlYWRpbmcgdG8gYSBtdWNoIHNob3J0ZXIgcXVldWVcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnb0luc2lkZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBpbnNpZGVBaXJwb3J0LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkluc2lkZSBBaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4sIHRoZSBvbmx5IG9ic3RhY2xlIGJlaW5nIHRoZSBzdHJlYW0gb2YgcGVvcGxlIGdvaW5nIG9uIHRoZWlyIHRyYXZlbCBwbGFuc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyB0aHJvdWdoIHRoZSBkb29ycywgbWFuYWdpbmcgdG8gYXZvaWQgZ2V0dGluZyBqb3N0bGVkIGFib3V0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiaW5cIiwgXCJpbnNpZGVcIiwgXCJpbmRvb3JzXCIsIFwiZW50ZXJcIiwgXCJlbnRyYW5jZVwiLCBcImFpcnBvcnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBhaXJwb3J0RW50cmFuY2UuRXhpdHMuQWRkKGdvSW5zaWRlKTtcclxuICAgICAgICAgICAgdmFyIHRzYUVudHJhbmNlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVFNBIEVudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJZb3UgaGVhZCB0b3dhcmRzIHRoZSBUU0EgU2VjdXJpdHkgQ2hlY2twb2ludCwgaXQgc2VlbXMgdG8gYmUgc3BsaXQgaW50byB0d28sIGEgcXVpY2sgUHJlQ2hlY2sgYXJlYSwgYW5kIGEgc2xvdyBhcmVhXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBAXCJOZWFyIHRoZSBxdWljayB6b25lIGlzIGEgc2lnbiwgc3BlYWsgdG8gYSBUU0EgT2ZmaWNlciB0byBidXkgYSBzaW5nbGUtdXNlIFRTQSBQcmVDaGVjayBhY2Nlc3MsIG9ubHkgJDg1LCBcclxuRG8geW91IGNob29zZSB0byBidXkgVFNBIFByZUNoZWNrLCBvciBkbyB5b3UgdXNlIHRoZSBnZW5lcmFsIHF1ZXVlP1xyXG5cIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ29Ub1RzYSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdExvY2tlZCA9IGdhbWUgPT4gIWdhbWUuQ2hlY2tlZEluLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIlRoZSBndWFyZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlIGxvb2tzIGF0IHlvdSBmbGF0bHkgYXNraW5nIGZvciB5b3VyIGJvYXJkaW5nIHBhc3MsIGxvb2tpbmcgYmFjayBmb3IgYSBzZWNvbmQgeW91IGZhY2UtcGFsbSBiZWZvcmUgbGVhdmluZyB0byBkbyBzb1wiLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RpbWUgPSAyLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0c2FFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUU0EgRW50cmFuY2VcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ0c2FcIiwgXCJyaWdodFwiLCBcInNlY3VyaXR5XCIgfSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgRW50cmFuY2UgdG8gdGhlIFRTQSBhcmVhIGlzIGxhcmdlLCBidXQgZ3VhcmRlZCBieSBhIGNvdXBsZSBtZW4gY2hlY2tpbmcgYm9hcmRpbmcgcGFzc2VzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGdldCBpbiBsaW5lLCBzaG93aW5nIHlvdXIgYm9hcmRpbmcgcGFzcyB0byB0aGUgZ3VhcmRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGVja0luRGVzayA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlRoZSBDaGVjay1pbiBEZXNrXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgY2hlY2staW4gZGVzayBmaW5hbGx5IGluIHZpZXcsIHRoZSB3b21hbiBzYXQgaW4gZnJvbnQgYXNrcyB5b3UgdG8gJ2NoZWNrIGluJyB3aXRoIGEgc21pbGVcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiTmVhciB0aGUgZGVzayBpcyBhIGNvdXBsZSBsZWFmbGV0cyBhYm91dCBjYXJyeSBvbiBzaXplIGFuZCB3aGF0IGlzIGFuZCBpc250IGFsbG93ZWRcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ290b0NoZWNraW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDaGVja2luIGxpbmVcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gY2hlY2tJbkRlc2ssXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwiY2hlY2tpblwiLCBcImNoZWNrXCIsIFwiZGVza1wiLCBcImxlZnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBsaW5lIHRvIHRoZSBjaGVjay1pbiBkZXNrIGlzIHF1aXRlIGxvbmcsIGJ1dCBub3QgdW53aWVsZHlcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJXYWl0aW5nIGluIHRoZSBsaW5lLCBpdCBtb3ZlcyBhdCBhIG1vZGVyYXRlIHBhY2UsIGFuZCBzb29uIGVub3VnaCB5b3UgYXJlIGF0IHRoZSBjaGVjay1pbiBkZXNrXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsZWF2ZUNoZWNraW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJMZWF2ZSBjaGVjay1pblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdExvY2tlZCA9IGdhbWUgPT4gIWdhbWUuQ2hlY2tlZEluLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RleHQgPSBcIkFmdGVyIGZpbmFsbHkgZ2V0dGluZyB0byB0aGUgZW5kIG9mIHRoZSBjaGVjay1pbiBsaW5lIHlvdSByZWFsaXplIHlvdSBmb3Jnb3QgeW91ciBzdWl0Y2FzZSBuZWFyIHRoZSBzdGFydCwgd2l0aCBhbiBhbm5veWVkIHNpZ2ggeW91IGdvIGJhY2sgdG8gZ2V0IGl0XCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDUsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwicmlnaHRcIiwgXCJvdXRcIiwgXCJiYWNrXCIgfSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gaW5zaWRlQWlycG9ydCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgd2F5IG91dCBvZiBjaGVjay1pbiBpcyBhIHNtYWxsIGFsbGV5d2F5IGJldHdlZW4gdGhlIGRlc2tzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIGNoZWNrLWluIGZvbGxvd2luZyB0aGUgbGluZXMsIGFuZCBzb29uIGZpbmQgeW91cnNlbGYgYmFjayB3aGVyZSB5b3Ugc3RhcnRlZCBpbiB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNoZWNrSW5EZXNrLkV4aXRzLkFkZChsZWF2ZUNoZWNraW4pO1xyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb3RvQ2hlY2tpbik7XHJcblxyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb1RvVHNhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVjayA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIFByZUNoZWNrIHpvbmUgaXMgbmljZSBhbmQgcXVpY2ssIHlvdSBkdW1wIHlvdXIgYmFja3BhY2sgb24gdGhlIHhyYXkgYmVsdCBiZWZvcmUgeW91IGdvIHRocm91Z2ggdGhlIHNjYW5uZXIgd2l0aG91dCBuZWVkaW5nIHRvIHRha2Ugb2ZmIHlvdXIgYmVsdCBhbmQgc2hvZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiQXMgeW91IHBpY2sgdXAgeW91ciBiYWNrcGFjayBvZmYgdGhlIHhyYXkgYmVsdCwgeW91IHNtZWxsIGJ1cnJpdG9zIGZyb20gdGhlIE1leGljYW4gZm9vZCBzdGFuZCBvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlByZUNoZWNrXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0V4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJQcmVDaGVja1wiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBwcmVDaGVjayxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgUHJlQ2hlY2sgU2VjdXJpdHkgcXVldWUgd291bGQgYmUgcXVpY2tlciwgYnV0IGl0IHdpbGwgY29zdCB5b3UuIEl0IGxvb2tzIGxpa2UgdGhlcmVzIG9ubHkgb25lIG90aGVyIHBhc3NlbmdlciBoZWFkaW5nIGZvciBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBwYXkgdGhlICQ4NSBmZWUgZnJvbSB5b3VyIGJ1ZGdldCwgYW5kIHRoZSBUU0EgT2ZmaWNlciB3YXZlcyB5b3UgdG8gdGhlIFByZUNoZWNrIFNlY3VyaXR5IFpvbmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gODUsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDMsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7IFwicHJlY2hlY2tcIiwgXCJzaG9ydFwiLCBcInBheVwiIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHNhRW50cmFuY2UuRXhpdHMuQWRkKHByZUNoZWNrRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2VuZXJhbFNlY3VyaXR5ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiR2VuZXJhbCBTZWN1cml0eVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiRXZlbnR1YWxseSB5b3UgZ2V0IHRvIHRoZSBzZWN1cml0eSBkZXNrIGFuZCBhIFRTQSBPZmZpY2VyIGdpdmVzIHlvdSB0d28gdHJheXMgYW5kIHRlbGxzIHlvdSB0byAnZW1wdHkgcG9ja2V0cycgJ3JlbW92ZSBiZWx0JyAncmVtb3ZlIHNob2VzJyBhbmQgJ3BsYWNlIGJhY2twYWNrJyBpbiBvbmUgdHJheSwgYW5kICdyZW1vdmUgZWxlY3Ryb25pY3MnIGludG8gYW5vdGhlciB0cmF5LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJZb3Ugam9zdGxlIHlvdXIgd2F5IGZvcndhcmQgdG8gYSB0YWJsZSwgc28gdGhhdCB5b3UgY2FuIGdldCByZWFkeSB0byBiZSBjbGVhcmVkIHRocm91Z2ggc2VjdXJpdHlcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdlbmVyYWxFeGl0ID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiR2VuZXJhbCBTZWN1cml0eVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBnZW5lcmFsU2VjdXJpdHksXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlcmUncyBhIGxvbmcgcXVldWUgZm9yIHRoZSBHZW5lcmFsIFNlY3VyaXR5LCBldmVyeW9uZSBpcyB0YWtpbmcgdGhlaXIgc2hvZXMgYW5kIGJlbHRzIG9mZiBhbmQgdGFraW5nIHRoZSBlbGVjdHJvbmljcyBvdXQgb2YgdGhlaXIgYmFnc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkZWNpZGUgdG8gc2F2ZSB5b3VyIGNhc2gsIGFuZCBqb2luIHRoZSBob3JkZSBvZiB0cmF2ZWxsZXJzIG1ha2luZyB0aGVpciB3YXkgdG8gdGhlIEdlbmVyYWwgU2VjdXJpdHkgem9uZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA4LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZyZWVcIiwgXCJnZW5lcmFsXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0c2FFbnRyYW5jZS5FeGl0cy5BZGQoZ2VuZXJhbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlcm1pbmFsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVGVybWluYWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmUgdGVybWluYWwgYmV5b25kIFRTQSBpcyBidXN0bGluZyB3aXRoIGFjdGl2aXR5LCBwZW9wbGUsIGFuZCBzbWVsbHMgb2YgYWxsIHNoYXBlcyBhbmQgc2l6ZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgZm9vZCBzaG9wcyBhcmUgZG90dGVkIGFyb3VuZCwgZW5zdXJpbmcgeW91IGFyZSBuZXZlciB0b28gZmFyIGF3YXkgZnJvbSBvbmUuIFwiICsgRW52aXJvbm1lbnQuTmV3TGluZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBCYWtlcnkgYW5kIHRoZSBNZXhpY2FuIHBsYWNlIGxvb2sgZXNwZWNpYWxseSBpbnRlcmVzdGluZy4gVGhlIHNpZ24gb24gdGhlIGNlaWxpbmcgc2hvd3MgTG91bmdlIHRvIHRoZSByaWdodCwgYW5kIHlvdXIgZ2F0ZSBudW1iZXIgYSB0aW55IGJpdCB0byB0aGUgbGVmdFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0xlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZpbmlzaFwiLCBcIm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRlcm1pbmFsLCB3aXRoIHRoZSBzaG9wcywgZm9vZCBzdGFsbHMsIGFuZCB3YWl0aW5nIGFyZWFzLCBhcmUgbGFpZCBvdXQgYmVmb3JlIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSB0aGFuayB0aGUgVFNBIE9mZmljZXIgYXMgeW91IGxlYXZlIGFuZCBoZWFkIGludG8gdGhlIEFpcnBvcnQgRGVwYXJ0dXJlcyBUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByZUNoZWNrLkV4aXRzLkFkZChwcmVDaGVja0xlYXZlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZW5lcmFsRXhpdExlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRmluaXNoIHNlY3VyaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiBnYW1lLkN1cnJlbnRCZWxvbmdpbmdzICE9IEJlbG9uZ2luZ3MuTm9uZSxcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJUaGUgVFNBIE9mZmljZXIgZ3J1bnRzIGF0IHlvdSBhbmQgc3RhcmVzIHlvdSBkb3duLiBcXFwiRW1wdHkgeW91ciBwb2NrZXRzLCB0YWtlIHlvdXIgc2hvZXMgb2ZmLCB0YWtlIHlvdXIgYmVsdCBvZmYsIGVtcHR5IHlvdXIgZWxlY3Ryb25pY3MgYW5kIHBsYWNlIHlvdXIgYmFja3BhY2sgaW50byB0aGUgdHJheSwgQkVGT1JFIGdvaW5nIHRocm91Z2ggc2VjdXJpdHkhXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrU2NvcmUgPSAtMSxcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdGVybWluYWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRlcm1pbmFsLCB3aXRoIHRoZSBzaG9wcywgZm9vZCBzdGFsbHMsIGFuZCB3YWl0aW5nIGFyZWFzLCBhcmUgbGFpZCBvdXQgYmVmb3JlIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSB0aGFuayB0aGUgVFNBIE9mZmljZXIgYXMgeW91IGxlYXZlIGFuZCBoZWFkIGludG8gdGhlIEFpcnBvcnQgRGVwYXJ0dXJlcyBUZXJtaW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA2LFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImZpbmlzaFwiLCBcIm91dFwiIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGdlbmVyYWxTZWN1cml0eS5FeGl0cy5BZGQoZ2VuZXJhbEV4aXRMZWF2ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWV4aWNhbiA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk1leGljYW4gZm9vZFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiWW91IGdvIHRvd2FyZHMgdGhlIG1leGljYW4gZm9vZCBzdGFsbCBhcyBhIHdvcmtlciBsb29rcyB1cCBhbmQgc21pbGVzIGF0IHlvdS4gT24gdGhlIGNvdW50ZXIgaXMgYSBzaWduIHRoYXQgcmVhZHMgXFxcIkRldmVsb3BlcnMnIEZhdm91cml0ZTogQnJlYWtmYXN0IEJ1cnJpdG8gJDEwXFxcIiwgYmVoaW5kIHRoZSB3b3JrZXIgaXMgYSBzb2RhIGZvdW50YWluXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIllvdSBub3RpY2UgYSBob2xkZXIgYXQgdGhlIGVuZCBvZiB0aGUgY291bnRlciwgY29udGFpbmluZyBkaXNwb3NhYmxlIGN1dGxlcnlcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ1eU1leGljYW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJCdXkgQnVycml0b1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImJ1eVwiLCBcImJ1cnJpdG9cIiB9LFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0ZXJtaW5hbCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJTdG9tYWNoIGdydW1ibGluZywgeW91IG9yZGVyIHRoZSBCcmVha2Zhc3QgQnVycml0byBhbmQgYSBzb2EsIHRoZSB3b3JrZXIgZ29lcyBhbmQgbWFrZXMgb25lIGZvciB5b3UsIHJldHVybmluZyBhZnRlciBhIGZldyBtaW51dGVzLCBzaGUgcGFzc2VzIHlvdSBhIGZvaWwtd3JhcHBlZCBnaWZ0LCBhbmQgYSBjdXAgb2YgU3RyYXdiZXJyeSBmbGF2b3JlZCBTb2RhLiBcXFwiJDEzIHBsZWFzZVxcXCJcIixcclxuICAgICAgICAgICAgICAgIFNjb3JlTW9kaWZ5ID0gNTAsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDEzLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1leGljYW4uRXhpdHMuQWRkKGJ1eU1leGljYW4pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvTWV4aWNhbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlZpc2l0IE1leGljYW4gU3RvcmVcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJtZXhpY2FuXCIsIFwiYnVycml0b1wiIH0sXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG1leGljYW4sXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIFN0YWxsIGlzIGRvbmUgdXAgaW4gc3RlcmVvdHlwaWNhbCBtZXhpY2FuIHN0eWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkZWNpZGUgdG8gZ28gbG9vayBvdmVyIHdoYXQga2luZCBvZiBidXJyaXRvcyB0aGUgbWV4aWNhbiBwbGFjZSBzZWxscy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ29NZXhpY2FuKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBiYWtlcnkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJCYWtlcnlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBzbWFsbCBiYWtlcnkgY2F0Y2hlcyB5b3VyIGV5ZSwgYW5kIHlvdSBlbnRlciwgdGhlIHNtZWxsIG9mIHdhcm0gYnJlYWQgZW50aWNpbmcgeW91LlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJUaGUgc29sZSBzdGFmZi1tZW1iZXIgd2VsY29tZXMgeW91LiBZb3UgY2FuIHNlZSBoZXIgbmFtZXRhZyByZWFkcyAnTWlzaHkgLSBIZWFkIEJha2VyJ1wiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXlCYWtlcnkgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPcmRlciBmb29kXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRlcm1pbmFsLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RvbWFjaCBncnVtYmxpbmcsIHlvdSBvcmRlciBhIGJhZ2VsIGFuZCBPcmFuZ2UgSnVpY2UsIE1pc2h5IGdyYWJzIHlvdSBhIGJhZ2VsIGFuZCBwb3VycyB5b3UgYSBjdXAgb2YgZnJlc2ggb3JhbmdlIGp1aWNlLCBwYXNzaW5nIGl0IG92ZXIgdGhlIGNvdW50ZXIgd2l0aCBhIHNtaWxlLiBcXFwiJDYgcGxlYXNlXFxcIlxcclxcblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSA2LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA0LFxyXG4gICAgICAgICAgICAgICAgU2NvcmVNb2RpZnkgPSA1MSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJvcmRlclwiLCBcImJha2VyeVwiLCBcImJyZWFkXCIsIFwiYmFnZWxcIiB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJha2VyeS5FeGl0cy5BZGQoYnV5QmFrZXJ5KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb0Jha2VyeSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlZpc2l0IEJha2VyeVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBCYWtlcnkgbG9va3Mgd2FybSwgYW5kIGludml0aW5nLCB3aXRoIGEgc29mdCBzY2VudCBvZiBmcmVzaCBicmVhZCB3YWZ0aW5nIGZyb20gaXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gaW50byB0aGUgYmFrZXJ5LCBlbmpveWluZyB0aGUgYW1iaWFuY2UgcHJvdmlkZWRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYmFrZXJ5LFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcImJha2VyeVwiLCBcIm1pc2h5XCIsIFwiYnJlYWRcIiB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlcm1pbmFsLkV4aXRzLkFkZChnb0Jha2VyeSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG91bmdlRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRoZSBMb3VuZ2VcIixcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+IHRydWUsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiWW91IHdhbmRlciBvZmYgdG8gdGhlIGxvdW5nZSwgaG9waW5nIHlvdSBtYXkgYmUgYWJsZSB0byB0YWxrIHlvdXIgd2F5IGluIG9uIHRoaXMgZWNvbm9teSB0aWNrZXQsIHNhZGx5IGhvd2V2ZXIgYXMgeW91IHRyeSB0byB0YWxrIHRoZSBhdHRlbmRlbnQgaW50byBpdCwgc2hlIGlzIGhhdmluZyBub25lIG9mIGl0IGFuZCByZWZ1c2VzIHlvdSBlbnRyeS5cIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJsb3VuZ2VcIiwgXCJnb2xkXCIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQobG91bmdlRXhpdCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2F0ZSA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkdhdGUgNDJcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiR2F0ZSA0MyBsb29rcyBsaWtlIHByZXR0eSBtdWNoIGV2ZXJ5IG90aGVyIGdhdGUsIGJ1dCBhIHF1aWNrIGNoZWNrIG9mIHlvdXIgYm9hcmRpbmcgcGFzcyBzaG93cyB0aGlzIG9uZSBpcyB5b3Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBsaW5lIHNlZW1zIHRvIGJlIHF1aXRlIHNob3J0LCBzZWVtcyBub3QgbWFueSBwZW9wbGUgd2FudCB0byBnbyB0aGUgc2FtZSBwbGFjZSBhcyB5b3UgdG9kYXlcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgRW5kU2NyZWVuID0gbmV3IEVuZFNjcmVlblJvb20odGhpcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZmlsbCB0aGlzIGluXHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiRW5kIFNjcmVlblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnYXRlRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkluIHRoZSBBaXJwbGFuZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgR2F0ZSBhbmQgc29vbiB5b3UgYXJlIG9uIHRoZSBhaXJwbGFuZS4gWW91ciBzZWF0IGlzIGFzIGNyYW1wZWQgYXMgdXN1YWwsIGJ1dCBpdCBmZWVscyBsaWtlIGEgdGhyb25lIHRvZGF5XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IEVuZFNjcmVlbixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJ3aW5cIiB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0ZXJtaW5hbC5FeGl0cy5BZGQoZ2F0ZUV4aXQpO1xyXG4gICAgICAgICAgICBnYXRlLkF1dG9FeGl0ID0gZ2F0ZUV4aXQ7XHJcblxyXG4gICAgICAgICAgICBDdXJyZW50Um9vbSA9IGhvdGVsUm9vbTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSb29tVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXkxXCIpLlJvb21OYW1lOihzdHJpbmcpbnVsbCkgPz8gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Um9vbUhlYWRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudFJvb20gaXMgRW5kU2NyZWVuUm9vbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJDb25ncmF0dWxhdGlvbnMsIHlvdSB3b24hIFlvdSBoYWQgezA6RDJ9OnsxOkQyfSByZW1haW5pbmcsIGFuZCB7MjpDfSByZW1haW5pbmdcXHJcXG4gVGhhdCAsYWxvbmdzaWRlIGJvbnVzIGFuZCBwZW5hbHR5IHNjb3JlcywgZ2l2ZXMgeW91IGEgdG90YWwgc2NvcmUgb2YgXCIsVGltZVRvRmxpZ2h0IC8gNjAsVGltZVRvRmxpZ2h0ICUgNjAsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIsUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTJcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApKyAoKFRpbWVUb0ZsaWdodCAvIDYwKSAqIDEwMCkgKyAoKFBsYXllci5Nb25leSAvIDEyNSkgKiAxMDApICsgUGxheWVyLlNjb3JlTW9kaWZpZXJzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvb21OYW1lID0gKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTNcIikuUm9vbU5hbWU6KHN0cmluZyludWxsKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHJvb21OYW1lKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoc3RyaW5nLkZvcm1hdChcIlRpbWUgdG8gRmxpZ2h0OiB7MDpEMn06ezE6RDJ9XCIsVGltZVRvRmxpZ2h0IC8gNjAsVGltZVRvRmxpZ2h0ICUgNjApKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShzdHJpbmcuRm9ybWF0KFwiTW9uZXk6IHswOkN9XCIsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXk0XCIsUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTRcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZSgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTVcIixDdXJyZW50Um9vbSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFJvb20+KFwia2V5NVwiKS5TaG9ydFJvb21EZXNjOihzdHJpbmcpbnVsbCkgPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0U3BlY2lhbEl0ZW1zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IG5ldyBMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgaWYgKEN1cnJlbnRSb29tLlJvb21OYW1lLlRvTG93ZXIoKSA9PSBcInRoZSBjaGVjay1pbiBkZXNrXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLkFkZChcImNoZWNrIGluXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKEN1cnJlbnRSb29tLlJvb21OYW1lLlRvTG93ZXIoKSA9PSBcImdlbmVyYWwgc2VjdXJpdHlcIilcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChDdXJyZW50QmVsb25naW5ncy5IYXNGbGFnKEJlbG9uZ2luZ3MuUG9ja2V0cykpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuQWRkKFwiZW1wdHkgcG9ja2V0c1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChDdXJyZW50QmVsb25naW5ncy5IYXNGbGFnKEJlbG9uZ2luZ3MuQmVsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuQWRkKFwicmVtb3ZlIGJlbHRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3VycmVudEJlbG9uZ2luZ3MuSGFzRmxhZyhCZWxvbmdpbmdzLlNob2VzKSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5BZGQoXCJyZW1vdmUgc2hvZXNcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3VycmVudEJlbG9uZ2luZ3MuSGFzRmxhZyhCZWxvbmdpbmdzLkJhY2twYWNrKSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5BZGQoXCJwbGFjZSBiYWNrcGFja1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChDdXJyZW50QmVsb25naW5ncy5IYXNGbGFnKEJlbG9uZ2luZ3MuRWxlY3Ryb25pY3MpKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLkFkZChcInJlbW92ZSBlbGVjdHJvbmljc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXMuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUlucHV0KHN0cmluZyBpbnB1dCwgb3V0IHN0cmluZyBvdXRwdXRUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJTb3JyeSwgdGhpcyBnYW1lIGlzIG92ZXJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kU3BsaXQgPSBpbnB1dC5TcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY29tbWFuZCBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPElDb21tYW5kPihDb21tYW5kcywoRnVuYzxJQ29tbWFuZCxib29sPikoY29tbWFuZCA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY29tbWFuZC5HZXRDb21tYW5kQWxpYXNlcygpLGNvbW1hbmRTcGxpdFswXS5Ub0xvd2VyKCkpKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLlRyeVBhcnNlQ29tbWFuZChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8c3RyaW5nPihjb21tYW5kU3BsaXQsMSkpLCB0aGlzLCBvdXQgb3V0cHV0VGV4dCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChUaW1lVG9GbGlnaHQgPD0gMCB8fCBQbGF5ZXIuTW9uZXkgPD0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlNvcnJ5LCBpdCBzZWVtcyB5b3UgXCIgKyAoVGltZVRvRmxpZ2h0IDw9IDAgPyBcInJhbiBvdXQgb2YgdGltZVwiIDogXCJyYW4gb3V0IG9mIG1vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgb3V0cHV0VGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGFyc2VJbnB1dChzdHJpbmcgaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ2hhbmdlUm9vbShFeGl0IGV4aXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgb3V0cHV0ID0gZXhpdC5FeGl0VGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgIEN1cnJlbnRSb29tID0gZXhpdC5EZXN0aW5hdGlvbjtcclxuICAgICAgICAgICAgVGltZVRvRmxpZ2h0IC09IGV4aXQuRXhpdFRpbWU7XHJcbiAgICAgICAgICAgIFBsYXllci5Nb25leSAtPSBleGl0LkV4aXRDb3N0O1xyXG4gICAgICAgICAgICBQbGF5ZXIuU2NvcmVNb2RpZmllcnMgKz0gZXhpdC5TY29yZU1vZGlmeTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IEdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBMaXN0PElDb21tYW5kPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29tbWFuZHM9bmV3IExpc3Q8SUNvbW1hbmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuU3lzdGVtO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWw7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbC5Db250cm9scztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEdhbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTWFpblBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIEdhbWUuSW5pdGlhbGl6ZUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gR2FtZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHN0YXR1c1NjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIHN0YXR1c1NjcmVlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25MaXN0Lkl0ZW1zLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gR2FtZS5DdXJyZW50Um9vbS5FeGl0cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uTGlzdC5JdGVtcy5BZGQoY3VycmVudFJvb21FeGl0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHNwZWNpYWxJdGVtIGluIEdhbWUuR2V0U3BlY2lhbEl0ZW1zKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbkxpc3QuSXRlbXMuQWRkKHNwZWNpYWxJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBkaXJlY3Rpb25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBhY3Rpb25CdXR0b25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGlucHV0X0tleURvd24ob2JqZWN0IHNlbmRlciwgV2luZG93cy5VSS5YYW1sLklucHV0LktleVJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGUuS2V5ID09IFZpcnR1YWxLZXkuRW50ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhhbmRsZUlucHV0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXN0SW5wdXRMaXN0Lkl0ZW1zLkFkZChpbnB1dC5UZXh0KTtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5TZWxlY3RlZEluZGV4ID0gcGFzdElucHV0TGlzdC5JdGVtcy5Db3VudCAtIDE7XHJcbnN0cmluZyBvdXRwdXRUZXh0O1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEdhbWUuVHJ5UGFyc2VJbnB1dChpbnB1dC5UZXh0LCBvdXQgb3V0cHV0VGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgICAgIGlucHV0LlRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0U2Nyb2xsLlNjcm9sbFRvVmVydGljYWxPZmZzZXQoOTk5OTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgICAgIG91dHB1dFNjcm9sbC5TY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDk5OTk5OTk5OTk5OSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXR1c1NjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGRpcmVjdGlvbkxpc3RfU2VsZWN0aW9uQ2hhbmdlZChvYmplY3Qgc2VuZGVyLCBTZWxlY3Rpb25DaGFuZ2VkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uTGlzdC5TZWxlY3RlZEl0ZW0gIT0gbnVsbCAmJiBkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSBpcyBFeGl0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRFeGl0ID0gZGlyZWN0aW9uTGlzdC5TZWxlY3RlZEl0ZW0gYXMgRXhpdDtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEV4aXQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5UZXh0ID0gXCJnbyBcIiArIChzZWxlY3RlZEV4aXQuRXhpdE5hbWVzLkxlbmd0aCA+IDAgPyBzZWxlY3RlZEV4aXQuRXhpdE5hbWVzWzBdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uTGlzdC5TZWxlY3RlZEl0ZW0gIT0gbnVsbCAmJiBkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSBkaXJlY3Rpb25MaXN0LlNlbGVjdGVkSXRlbSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRUZXh0ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuVGV4dCA9IHNlbGVjdGVkVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIEdhbWUgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0dhbWU9bmV3IEdhbWUoKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBsYXllclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVjaW1hbCBNb25leSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBTY29yZU1vZGlmaWVycyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1vbmV5ID0gMTI1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoZWNrSW4gOiBJQ29tbWFuZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiY2hlY2staW5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBHZXRDb21tYW5kQWxpYXNlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W10geyBcImNoZWNrXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzWzBdICE9IFwiaW5cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJTdGF0ZS5Sb29tVGl0bGUoKS5Ub0xvd2VyKCkgIT0gXCJ0aGUgY2hlY2staW4gZGVza1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIlNvcnJ5LCB5b3UgY2FuIG5vdCBjaGVjayBpbiBoZXJlXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1clN0YXRlLkNoZWNrZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIllvdSBDaGVjayBpbiBhdCB0aGUgZGVzaywgcHV0dGluZyB5b3VyIGNhcmVmdWxseSBwcmV3ZWlnaGVkIGx1Z2dhZ2Ugb24gdGhlIHNjYWxlLCBhbmQgY29sbGVjdCB5b3VyIGJvYXJkaW5nIHBhc3MuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhpdCA9IGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzWzBdO1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gRW52aXJvbm1lbnQuTmV3TGluZSArIGV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5DdXJyZW50Um9vbSA9IGV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBleGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5QbGF5ZXIuTW9uZXkgLT0gZXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHbyA6IElDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJHb1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7IFwiZ29cIiwgXCJoZWFkXCIsIFwid2Fsa1wiLCBcImRyaXZlXCIsIFwiZ2V0IGluXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJTb3JyeSwgSW52YWxpZCBkZXN0aW5hdGlvbiBvciBjb21tYW5kIGZvcm1hdFwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGN1cnJlbnRSb29tRXhpdCBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPEV4aXQ+KGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzLChGdW5jPEV4aXQsYm9vbD4pKGN1cnJlbnRSb29tRXhpdCA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY3VycmVudFJvb21FeGl0LkV4aXROYW1lcyxjb21tYW5kQXJndW1lbnRzWzBdLlRvTG93ZXIoKSkpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSb29tRXhpdC5FeGl0TG9ja2VkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzTG9ja2VkID0gY3VycmVudFJvb21FeGl0LkV4aXRMb2NrZWQoY3VyU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0xvY2tlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IGN1cnJlbnRSb29tRXhpdC5Mb2NrVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGN1cnJlbnRSb29tRXhpdC5Mb2NrVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuUGxheWVyLlNjb3JlTW9kaWZpZXJzICs9IGN1cnJlbnRSb29tRXhpdC5Mb2NrU2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gY3VyU3RhdGUuQ2hhbmdlUm9vbShjdXJyZW50Um9vbUV4aXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJTdGF0ZS5DdXJyZW50Um9vbS5BdXRvRXhpdCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGl0ID0gY3VyU3RhdGUuQ3VycmVudFJvb20uQXV0b0V4aXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkNoYW5nZVJvb20oZXhpdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiSW52YWxpZCBkZXN0aW5hdGlvblwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMb29rOklDb21tYW5kXHJcbiAgICB7XHJcbnB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG57XHJcbiAgICByZXR1cm4gXCJMb29rXCI7XHJcbn1wdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG57XHJcbiAgICByZXR1cm4gbmV3W117XCJsb29rXCIsIFwibFwiLCBcInBlZXJcIiwgXCJzdGFyZVwiLCBcImV4YW1pbmVcIn07XHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxvb2sgYXQgYW4gaXRlbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9XHJcbnN0cmluZy5Gb3JtYXQoXCJ7MH17MX17Mn1cIixjdXJTdGF0ZS5DdXJyZW50Um9vbS5TaG9ydFJvb21EZXNjLEVudmlyb25tZW50Lk5ld0xpbmUsY3VyU3RhdGUuQ3VycmVudFJvb20uTG9uZ1Jvb21EZXNjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHNbMF0uVG9Mb3dlcigpID09IFwiYXRcIilcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPHN0cmluZz4oY29tbWFuZEFyZ3VtZW50cywxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9Mb29rID0gY29tbWFuZEFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjdXJyZW50Um9vbUV4aXQuRXhpdE5hbWVzLHRvTG9vay5Ub0xvd2VyKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gc3RyaW5nLkZvcm1hdChcInswfXsxfVwiLGN1cnJlbnRSb29tRXhpdC5FeGl0RGVzYyxFbnZpcm9ubWVudC5OZXdMaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTZWN1cml0eUNvbW1hbmQ6SUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlNlY3VyaXR5XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHsgXCJyZW1vdmVcIixcInBsYWNlXCIsXCJlbXB0eVwifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGJlbG9uZ2luZyBpbiBFbnVtLkdldFZhbHVlcyh0eXBlb2YoQmVsb25naW5ncykpLkNhc3Q8QmVsb25naW5ncz4oKSkgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVsb25naW5nLlRvU3RyaW5nKCkuVG9Mb3dlcigpID09IGNvbW1hbmRBcmd1bWVudHNbMF0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudEJlbG9uZ2luZ3MgXj0gYmVsb25naW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYmVsb25naW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLlNob2VzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IHJlbW92ZSB5b3VyIHNob2VzIGFuZCBwdXQgdGhlbSBvbiB0aGUgYmVsdFwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJlbG9uZ2luZ3MuQmVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSByZW1vdmUgeW91ciBiZWx0IGFuZCBwdXQgaXQgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkJhY2twYWNrOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IHRha2Ugb2ZmIHlvdXIgYmFja3BhY2sgYW5kIHB1dCBpdCBvbiB0aGUgYmVsdFwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJlbG9uZ2luZ3MuUG9ja2V0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBcIllvdSBlbXB0eSB5b3VyIHBvY2tldHMgYW5kIHB1dCB0aGUgY29udGVudHMgb24gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCZWxvbmdpbmdzLkVsZWN0cm9uaWNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IFwiWW91IGVtcHR5IHlvdXIgZWxlY3Ryb25pY3Mgb3V0IG9udG8gdGhlIGJlbHRcIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiSSBkbyBub3QgaGF2ZSB0aGF0XCIrRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIGNsYXNzIEVuZFNjcmVlblJvb20gOiBSb29tXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEdhbWUgQ3VyU3RhdGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kU2NyZWVuUm9vbShHYW1lIGdhbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkN1clN0YXRlID0gZ2FtZTtcclxuICAgICAgICB9XHJcbnB1YmxpYyBuZXcgc3RyaW5nIFNob3J0Um9vbURlc2Ncclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJDb25ncmF0dWxhdGlvbnMsIHlvdSB3b24hIFlvdSBoYWQgezA6RDJ9OnsxOkQyfSByZW1haW5pbmcsIGFuZCB7MjpDfSByZW1haW5pbmdcIixDdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLyA2MCxDdXJTdGF0ZS5UaW1lVG9GbGlnaHQgJSA2MCwoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixDdXJTdGF0ZS5QbGF5ZXIpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxQbGF5ZXI+KFwia2V5MVwiKS5Nb25leTooZGVjaW1hbD8pbnVsbCkgPz8gMCk7XHJcbiAgICB9XHJcbn0gICAgfVxyXG59XHJcbiJdCn0K
