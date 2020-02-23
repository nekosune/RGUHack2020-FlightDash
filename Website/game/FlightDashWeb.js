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


                var ResourceDictionary_8bbc84a20647496f9f90df5ebb9a9956 = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_8bbc84a20647496f9f90df5ebb9a9956;

                this.Resources = ResourceDictionary_8bbc84a20647496f9f90df5ebb9a9956;







            }
        }
    });

    Bridge.define("FlightDashWeb.ICommand", {
        $kind: "interface"
    });

    /** @namespace FlightDashWeb */

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
            CheckedIn: false
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
                this.CheckedIn = false;
                this.GameOver = false;
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

                var preCheckExit = new FlightDashWeb.Exit();

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



                var Grid_d96fc3be564a4df7a43895488344c10d = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_d96fc3be564a4df7a43895488344c10d.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_d96fc3be564a4df7a43895488344c10d.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_2cbdd5ae257a4d1cb224d7a12aa3e984 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_2cbdd5ae257a4d1cb224d7a12aa3e984.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_60d81c9bf15649148cceed4df8cbcfc7 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_60d81c9bf15649148cceed4df8cbcfc7.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_0fbb8897de364725a41a6303e1b1cc0c = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_0fbb8897de364725a41a6303e1b1cc0c.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_2c5273c25b5c492b94da0e65391bda98 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_2c5273c25b5c492b94da0e65391bda98.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_87c9eced59614e4cadb4bc107e310206 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_87c9eced59614e4cadb4bc107e310206.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_d96fc3be564a4df7a43895488344c10d.ColumnDefinitions.add(ColumnDefinition_2cbdd5ae257a4d1cb224d7a12aa3e984);
                Grid_d96fc3be564a4df7a43895488344c10d.ColumnDefinitions.add(ColumnDefinition_60d81c9bf15649148cceed4df8cbcfc7);
                Grid_d96fc3be564a4df7a43895488344c10d.ColumnDefinitions.add(ColumnDefinition_0fbb8897de364725a41a6303e1b1cc0c);
                Grid_d96fc3be564a4df7a43895488344c10d.ColumnDefinitions.add(ColumnDefinition_2c5273c25b5c492b94da0e65391bda98);
                Grid_d96fc3be564a4df7a43895488344c10d.ColumnDefinitions.add(ColumnDefinition_87c9eced59614e4cadb4bc107e310206);

                var RowDefinition_5c928757c25d449d96f53b98661eaed7 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_5c928757c25d449d96f53b98661eaed7.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_8c122640b19c4f20965a23897b8d0bab = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_8c122640b19c4f20965a23897b8d0bab.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_ad5bc18a39d14de8b1c82756f05292ea = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_ad5bc18a39d14de8b1c82756f05292ea.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_845664c0206f420a87ad78cfee4e12b8 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_845664c0206f420a87ad78cfee4e12b8.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_9b012822309a4c56b4efb0143b3bb851 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_9b012822309a4c56b4efb0143b3bb851.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_6dc1b92e1f17400a8f76eb0ef05897d8 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_6dc1b92e1f17400a8f76eb0ef05897d8.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_443da6d538bc4a66865b0c80e26130b8 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_443da6d538bc4a66865b0c80e26130b8.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_0078b2fe3a964ce38fca456dff040d9e = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_0078b2fe3a964ce38fca456dff040d9e.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_5989799b569c41a19ed6a1bf3b86d136 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_5989799b569c41a19ed6a1bf3b86d136.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_3e30b13429c8457bb30b5b4f9d3d8aa3 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_3e30b13429c8457bb30b5b4f9d3d8aa3.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_5c928757c25d449d96f53b98661eaed7);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_8c122640b19c4f20965a23897b8d0bab);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_ad5bc18a39d14de8b1c82756f05292ea);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_845664c0206f420a87ad78cfee4e12b8);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_9b012822309a4c56b4efb0143b3bb851);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_6dc1b92e1f17400a8f76eb0ef05897d8);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_443da6d538bc4a66865b0c80e26130b8);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_0078b2fe3a964ce38fca456dff040d9e);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_5989799b569c41a19ed6a1bf3b86d136);
                Grid_d96fc3be564a4df7a43895488344c10d.RowDefinitions.add(RowDefinition_3e30b13429c8457bb30b5b4f9d3d8aa3);

                var ScrollViewer_b8c243b80e8046a1908172e810d128e7 = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_b8c243b80e8046a1908172e810d128e7);
                ScrollViewer_b8c243b80e8046a1908172e810d128e7.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_b8c243b80e8046a1908172e810d128e7, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_b8c243b80e8046a1908172e810d128e7, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_b8c243b80e8046a1908172e810d128e7, 7);
                ScrollViewer_b8c243b80e8046a1908172e810d128e7.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_965e61314b094beea28b466596f06eea = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_965e61314b094beea28b466596f06eea.Text = "";
                this.RegisterName$1("output", TextBlock_965e61314b094beea28b466596f06eea);
                TextBlock_965e61314b094beea28b466596f06eea.Name = "output";
                TextBlock_965e61314b094beea28b466596f06eea.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_965e61314b094beea28b466596f06eea.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));

                ScrollViewer_b8c243b80e8046a1908172e810d128e7.Content = TextBlock_965e61314b094beea28b466596f06eea;


                var ListBox_d01d2ba3e5924a15a56639fa24cc05b6 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_d01d2ba3e5924a15a56639fa24cc05b6);
                ListBox_d01d2ba3e5924a15a56639fa24cc05b6.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_d01d2ba3e5924a15a56639fa24cc05b6, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_d01d2ba3e5924a15a56639fa24cc05b6, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_d01d2ba3e5924a15a56639fa24cc05b6, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_d01d2ba3e5924a15a56639fa24cc05b6, 2);

                var TextBox_5b0f54bc5ed54420a6c6862c8f327cbe = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_5b0f54bc5ed54420a6c6862c8f327cbe);
                TextBox_5b0f54bc5ed54420a6c6862c8f327cbe.Name = "input";
                TextBox_5b0f54bc5ed54420a6c6862c8f327cbe.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_5b0f54bc5ed54420a6c6862c8f327cbe, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_5b0f54bc5ed54420a6c6862c8f327cbe, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_5b0f54bc5ed54420a6c6862c8f327cbe, 9);
                TextBox_5b0f54bc5ed54420a6c6862c8f327cbe.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_42d861c11af442ae8c1d0f6a1b99548f = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_42d861c11af442ae8c1d0f6a1b99548f);
                Button_42d861c11af442ae8c1d0f6a1b99548f.Name = "actionButton";
                Button_42d861c11af442ae8c1d0f6a1b99548f.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_42d861c11af442ae8c1d0f6a1b99548f, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_42d861c11af442ae8c1d0f6a1b99548f, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_42d861c11af442ae8c1d0f6a1b99548f, 9);
                Button_42d861c11af442ae8c1d0f6a1b99548f.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                Grid_d96fc3be564a4df7a43895488344c10d.Children.add(ScrollViewer_b8c243b80e8046a1908172e810d128e7);
                Grid_d96fc3be564a4df7a43895488344c10d.Children.add(ListBox_d01d2ba3e5924a15a56639fa24cc05b6);
                Grid_d96fc3be564a4df7a43895488344c10d.Children.add(TextBox_5b0f54bc5ed54420a6c6862c8f327cbe);
                Grid_d96fc3be564a4df7a43895488344c10d.Children.add(Button_42d861c11af442ae8c1d0f6a1b99548f);


                this.Content = Grid_d96fc3be564a4df7a43895488344c10d;



                this.output = TextBlock_965e61314b094beea28b466596f06eea;
                this.outputScroll = ScrollViewer_b8c243b80e8046a1908172e810d128e7;
                this.pastInputList = ListBox_d01d2ba3e5924a15a56639fa24cc05b6;
                this.input = TextBox_5b0f54bc5ed54420a6c6862c8f327cbe;
                this.actionButton = Button_42d861c11af442ae8c1d0f6a1b99548f;



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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovUmVsZWFzZS9BcHAueGFtbC5nLmNzIiwib2JqL1JlbGVhc2UvTWFpblBhZ2UueGFtbC5nLmNzIiwiQXBwLnhhbWwuY3MiLCJHYW1lLmNzIiwiTWFpblBhZ2UueGFtbC5jcyIsIlBsYXllci5jcyIsIlJvb20uY3MiLCJDb21tYW5kcy9DaGVja0luLmNzIiwiQ29tbWFuZHMvR28uY3MiLCJDb21tYW5kcy9Mb29rLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7b0JBUVFBLFdBQTJCQSxBQUFPQTtvQkFDbENBLE9BQU9BLG1FQUE2REE7Ozs7Ozs7Ozs7b0JDRHBFQSxXQUEyQkEsQUFBT0E7b0JBQ2xDQSxPQUFPQSxtRUFBNkRBOzs7Ozs7Ozs7WURtRXhFQSxJQUFJQTs7Ozs7Ozs7O2dCRS9ESUE7OztnQkFJQUEsZUFBZUEsSUFBSUE7Z0JBQ25CQSx5Q0FBeUJBOzs7OztnQkZ1QnpCQSxJQUFJQTtvQkFDQUE7O2dCQUNKQTs7O2dCQUdBQSxJQUFJQTtvQkFFQUEsQUFBQ0EsWUFBbUNBLEFBQVFBOzs7O2dCQUs1REE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7OztnQkFHQUEsMERBQTBEQSxJQUFJQTtnQkFDOURBLGlCQUFpQkE7O2dCQUVqQkEsaUJBQWlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NHd1J3Q0EsS0FBSUE7Ozs7OztnQkFoVWpEQTtnQkFDQUEsY0FBT0EsSUFBSUE7Z0JBQ1hBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLGtCQUFhQSxJQUFJQTtnQkFDakJBLGtCQUFhQSxJQUFJQTtnQkFDakJBLGtCQUFhQSxJQUFJQTtnQkFDakJBO2dCQUNBQTs7OztnQkFLQUEsZ0JBQWdCQSxVQUFJQTs7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QUlBLGlEQUE4QkE7NEJBRTlCQSxlQUFlQSwyQkFBMkJBOzRCQUMxQ0EsSUFBSUE7Z0NBRUFBLFdBQVNBO2dDQUNUQSxpREFBeUJBO2dDQUN6QkEsK0JBQVVBLGlCQUFzQkE7Z0NBQ2hDQTs7O3dCQUdSQSxXQUFTQSxvQ0FBMkJBO3dCQUNwQ0EsdUJBQXVCQTt3QkFDdkJBLGlEQUF5QkE7d0JBQ3pCQSxrREFBeUJBO3dCQUN6QkEsK0JBQVVBOzt3QkFFVkEsT0FBT0EsaUNBQWlDQTs0QkFFcENBLFdBQVdBOzRCQUNYQSwrQkFBVUEsaUJBQXNCQSx3QkFBZ0JBOzRCQUNoREEsdUJBQXVCQTs0QkFDdkJBLGlEQUF5QkE7NEJBQ3pCQSxrREFBeUJBOzRCQUN6QkEsK0JBQVVBOzs7d0JBR2RBOzs7Ozs7OztnQkFHSkEsV0FBU0EseUJBQXdCQTtnQkFDakNBOzs7Ozs7Ozs7Ozs7Ozs7Z0JDdERSQTs7O2dCQUdBQSxPQUFPQTs7O2dCQUlDQTs7dUNBR3dCQSxrQkFBMkJBLFVBQWVBOztnQkFFbEVBLElBQUlBO29CQUVBQSxXQUNoQkEsa0NBQTBCQSxvQ0FBbUNBLE1BQW9CQTtvQkFDakVBOztvQkFJQUEsSUFBSUE7d0JBQ0FBLG1CQUFtQkEsNEJBQXVDQSw0QkFBb0NBOztvQkFDbEdBLGFBQWFBO29CQUNiQSwwQkFBZ0NBOzs7OzRCQUU1QkEsSUFBSUEsc0JBQXdDQSwyQkFBMEJBLHNCQUFsQ0E7Z0NBRWhDQSxXQUFTQSwrQkFBdUJBLDBCQUF5QkE7Z0NBQ3pEQTs7Ozs7Ozs7Ozs7Z0JBTVpBO2dCQUNBQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyA8Q1NIVE1MNT48WGFtbEhhc2g+OTc0M0I5MDMyMTlEQ0UzRjA1MzNCOTU1NTgzRTNCNEM8L1hhbWxIYXNoPjxQYXNzTnVtYmVyPjI8L1Bhc3NOdW1iZXI+PENvbXBpbGF0aW9uRGF0ZT4yLzIzLzIwMjAgMToxODoyNyBBTTwvQ29tcGlsYXRpb25EYXRlPjwvQ1NIVE1MNT5cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyBjbGFzcyDHgMeARmxpZ2h0ZGFzaHdlYseAx4BDb21wb25lbnTHgMeAQXBwx4DHgFhhbWzHgMeARmFjdG9yeVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIG9iamVjdCBJbnN0YW50aWF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgZ2xvYmFsOjpTeXN0ZW0uVHlwZSB0eXBlID0gdHlwZW9mKEZsaWdodERhc2hXZWIuQXBwKTtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlR5cGVJbnN0YW50aWF0aW9uSGVscGVyLkluc3RhbnRpYXRlKHR5cGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gPGF1dG8tZ2VuZXJhdGVkPlxyXG4vLyAgICAgVGhpcyBjb2RlIHdhcyBhdXRvLWdlbmVyYXRlZCBieSBcIkMjL1hBTUwgZm9yIEhUTUw1XCJcclxuLy9cclxuLy8gICAgIENoYW5nZXMgdG8gdGhpcyBmaWxlIG1heSBjYXVzZSBpbmNvcnJlY3QgYmVoYXZpb3IgYW5kIHdpbGwgYmUgbG9zdCBpZlxyXG4vLyAgICAgdGhlIGNvZGUgaXMgcmVnZW5lcmF0ZWQuXHJcbi8vIDwvYXV0by1nZW5lcmF0ZWQ+XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuXHJcbnBhcnRpYWwgY2xhc3MgQXBwIDogZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQXBwbGljYXRpb25cclxue1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMTY5LCA2NDksIDA2MjggLy8gUHJldmVudHMgd2FybmluZyBDUzAxNjkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgdXNlZCcpLCBDUzA2NDkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgYXNzaWduZWQgdG8sIGFuZCB3aWxsIGFsd2F5cyBoYXZlIGl0cyBkZWZhdWx0IHZhbHVlIG51bGwnKSwgYW5kIENTMDYyOCAoJ21lbWJlciA6IG5ldyBwcm90ZWN0ZWQgbWVtYmVyIGRlY2xhcmVkIGluIHNlYWxlZCBjbGFzcycpXHJcblxyXG5cclxuXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDE2OSwgNjQ5LCAwNjI4XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2NvbnRlbnRMb2FkZWQ7XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZUNvbXBvbmVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2NvbnRlbnRMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9jb250ZW50TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDAxODQgLy8gUHJldmVudHMgd2FybmluZyBDUzAxODQgKCdUaGUgZ2l2ZW4gZXhwcmVzc2lvbiBpcyBuZXZlciBvZiB0aGUgcHJvdmlkZWQgKCd0eXBlJykgdHlwZScpXHJcbiAgICAgICAgICAgIGlmICh0aGlzIGlzIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKChnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpKG9iamVjdCl0aGlzKS5YYW1sU291cmNlUGF0aCA9IEBcIkZsaWdodERhc2hXZWJcXEFwcC54YW1sXCI7XHJcbiAgICAgICAgICAgIH1cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMDE4NFxyXG5cclxuXHJcbmdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5TdGFydHVwQXNzZW1ibHlJbmZvLk91dHB1dFJvb3RQYXRoID0gQFwiT3V0cHV0XFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0QXBwRmlsZXNQYXRoID0gQFwiYXBwLWNzaHRtbDVcXGFwcFxcXCI7XHJcbmdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5TdGFydHVwQXNzZW1ibHlJbmZvLk91dHB1dExpYnJhcmllc1BhdGggPSBAXCJhcHAtY3NodG1sNVxcbGlic1xcXCI7XHJcbmdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5TdGFydHVwQXNzZW1ibHlJbmZvLk91dHB1dFJlc291cmNlc1BhdGggPSBAXCJhcHAtY3NodG1sNVxccmVzXFxcIjtcclxuXHJcblxyXG52YXIgUmVzb3VyY2VEaWN0aW9uYXJ5XzhiYmM4NGEyMDY0NzQ5NmY5ZjkwZGY1ZWJiOWE5OTU2ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlJlc291cmNlRGljdGlvbmFyeSgpO1xyXG50aGlzLlJlc291cmNlcyA9IFJlc291cmNlRGljdGlvbmFyeV84YmJjODRhMjA2NDc0OTZmOWY5MGRmNWViYjlhOTk1NjtcclxuXHJcbnRoaXMuUmVzb3VyY2VzID0gUmVzb3VyY2VEaWN0aW9uYXJ5XzhiYmM4NGEyMDY0NzQ5NmY5ZjkwZGY1ZWJiOWE5OTU2O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5wdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbntcclxuICAgIG5ldyBBcHAoKTtcclxufVxyXG5cclxufVxyXG5cclxuXHJcbn1cclxuIiwiLy8gPENTSFRNTDU+PFhhbWxIYXNoPkJFOTkyRDZCMzVDM0REOEQ4RkQwRDNENEE0NjNCQ0Q1PC9YYW1sSGFzaD48UGFzc051bWJlcj4yPC9QYXNzTnVtYmVyPjxDb21waWxhdGlvbkRhdGU+Mi8yMy8yMDIwIDE6MTg6MjcgQU08L0NvbXBpbGF0aW9uRGF0ZT48L0NTSFRNTDU+XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgY2xhc3Mgx4DHgEZsaWdodGRhc2h3ZWLHgMeAQ29tcG9uZW50x4DHgE1haW5wYWdlx4DHgFhhbWzHgMeARmFjdG9yeVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIG9iamVjdCBJbnN0YW50aWF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgZ2xvYmFsOjpTeXN0ZW0uVHlwZSB0eXBlID0gdHlwZW9mKEZsaWdodERhc2hXZWIuTWFpblBhZ2UpO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuVHlwZUluc3RhbnRpYXRpb25IZWxwZXIuSW5zdGFudGlhdGUodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XHJcbi8vICAgICBUaGlzIGNvZGUgd2FzIGF1dG8tZ2VuZXJhdGVkIGJ5IFwiQyMvWEFNTCBmb3IgSFRNTDVcIlxyXG4vL1xyXG4vLyAgICAgQ2hhbmdlcyB0byB0aGlzIGZpbGUgbWF5IGNhdXNlIGluY29ycmVjdCBiZWhhdmlvciBhbmQgd2lsbCBiZSBsb3N0IGlmXHJcbi8vICAgICB0aGUgY29kZSBpcyByZWdlbmVyYXRlZC5cclxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxucGFydGlhbCBjbGFzcyBNYWluUGFnZSA6IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlBhZ2Vcclxue1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMTY5LCA2NDksIDA2MjggLy8gUHJldmVudHMgd2FybmluZyBDUzAxNjkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgdXNlZCcpLCBDUzA2NDkgKCdmaWVsZCAuLi4gaXMgbmV2ZXIgYXNzaWduZWQgdG8sIGFuZCB3aWxsIGFsd2F5cyBoYXZlIGl0cyBkZWZhdWx0IHZhbHVlIG51bGwnKSwgYW5kIENTMDYyOCAoJ21lbWJlciA6IG5ldyBwcm90ZWN0ZWQgbWVtYmVyIGRlY2xhcmVkIGluIHNlYWxlZCBjbGFzcycpXHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0QmxvY2sgb3V0cHV0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuU2Nyb2xsVmlld2VyIG91dHB1dFNjcm9sbDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3ggcGFzdElucHV0TGlzdDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCb3ggaW5wdXQ7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5CdXR0b24gYWN0aW9uQnV0dG9uO1xyXG5cclxuXHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDE2OSwgNjQ5LCAwNjI4XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2NvbnRlbnRMb2FkZWQ7XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZUNvbXBvbmVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2NvbnRlbnRMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIF9jb250ZW50TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiNwcmFnbWEgd2FybmluZyBkaXNhYmxlIDAxODQgLy8gUHJldmVudHMgd2FybmluZyBDUzAxODQgKCdUaGUgZ2l2ZW4gZXhwcmVzc2lvbiBpcyBuZXZlciBvZiB0aGUgcHJvdmlkZWQgKCd0eXBlJykgdHlwZScpXHJcbiAgICAgICAgICAgIGlmICh0aGlzIGlzIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKChnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5VSUVsZW1lbnQpKG9iamVjdCl0aGlzKS5YYW1sU291cmNlUGF0aCA9IEBcIkZsaWdodERhc2hXZWJcXE1haW5QYWdlLnhhbWxcIjtcclxuICAgICAgICAgICAgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAwMTg0XHJcblxyXG5cclxuXHJcbnZhciBHcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQoKTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5Ib3Jpem9udGFsQWxpZ25tZW50ID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuSG9yaXpvbnRhbEFsaWdubWVudC5TdHJldGNoO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLlZlcnRpY2FsQWxpZ25tZW50ID0gZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVmVydGljYWxBbGlnbm1lbnQuU3RyZXRjaDtcclxudmFyIENvbHVtbkRlZmluaXRpb25fMmNiZGQ1YWUyNTdhNGQxY2IyMjRkN2ExMmFhM2U5ODQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzJjYmRkNWFlMjU3YTRkMWNiMjI0ZDdhMTJhYTNlOTg0LldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl82MGQ4MWM5YmYxNTY0OTE0OGNjZWVkNGRmOGNiY2ZjNyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fNjBkODFjOWJmMTU2NDkxNDhjY2VlZDRkZjhjYmNmYzcuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzBmYmI4ODk3ZGUzNjQ3MjVhNDFhNjMwM2UxYjFjYzBjID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl8wZmJiODg5N2RlMzY0NzI1YTQxYTYzMDNlMWIxY2MwYy5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fMmM1MjczYzI1YjVjNDkyYjk0ZGEwZTY1MzkxYmRhOTggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzJjNTI3M2MyNWI1YzQ5MmI5NGRhMGU2NTM5MWJkYTk4LldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl84N2M5ZWNlZDU5NjE0ZTRjYWRiNGJjMTA3ZTMxMDIwNiA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fODdjOWVjZWQ1OTYxNGU0Y2FkYjRiYzEwN2UzMTAyMDYuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fMmNiZGQ1YWUyNTdhNGQxY2IyMjRkN2ExMmFhM2U5ODQpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzYwZDgxYzliZjE1NjQ5MTQ4Y2NlZWQ0ZGY4Y2JjZmM3KTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl8wZmJiODg5N2RlMzY0NzI1YTQxYTYzMDNlMWIxY2MwYyk7XHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fMmM1MjczYzI1YjVjNDkyYjk0ZGEwZTY1MzkxYmRhOTgpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzg3YzllY2VkNTk2MTRlNGNhZGI0YmMxMDdlMzEwMjA2KTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzVjOTI4NzU3YzI1ZDQ0OWQ5NmY1M2I5ODY2MWVhZWQ3ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl81YzkyODc1N2MyNWQ0NDlkOTZmNTNiOTg2NjFlYWVkNy5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzhjMTIyNjQwYjE5YzRmMjA5NjVhMjM4OTdiOGQwYmFiID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl84YzEyMjY0MGIxOWM0ZjIwOTY1YTIzODk3YjhkMGJhYi5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uX2FkNWJjMThhMzlkMTRkZThiMWM4Mjc1NmYwNTI5MmVhID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl9hZDViYzE4YTM5ZDE0ZGU4YjFjODI3NTZmMDUyOTJlYS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzg0NTY2NGMwMjA2ZjQyMGE4N2FkNzhjZmVlNGUxMmI4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl84NDU2NjRjMDIwNmY0MjBhODdhZDc4Y2ZlZTRlMTJiOC5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzliMDEyODIyMzA5YTRjNTZiNGVmYjAxNDNiM2JiODUxID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl85YjAxMjgyMjMwOWE0YzU2YjRlZmIwMTQzYjNiYjg1MS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzZkYzFiOTJlMWYxNzQwMGE4Zjc2ZWIwZWYwNTg5N2Q4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl82ZGMxYjkyZTFmMTc0MDBhOGY3NmViMGVmMDU4OTdkOC5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzQ0M2RhNmQ1MzhiYzRhNjY4NjViMGM4MGUyNjEzMGI4ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl80NDNkYTZkNTM4YmM0YTY2ODY1YjBjODBlMjYxMzBiOC5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzAwNzhiMmZlM2E5NjRjZTM4ZmNhNDU2ZGZmMDQwZDllID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl8wMDc4YjJmZTNhOTY0Y2UzOGZjYTQ1NmRmZjA0MGQ5ZS5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzU5ODk3OTliNTY5YzQxYTE5ZWQ2YTFiZjNiODZkMTM2ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl81OTg5Nzk5YjU2OWM0MWExOWVkNmExYmYzYjg2ZDEzNi5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBSb3dEZWZpbml0aW9uXzNlMzBiMTM0MjljODQ1N2JiMzBiNWI0ZjlkM2Q4YWEzID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlJvd0RlZmluaXRpb24oKTtcclxuUm93RGVmaW5pdGlvbl8zZTMwYjEzNDI5Yzg0NTdiYjMwYjViNGY5ZDNkOGFhMy5IZWlnaHQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNWM5Mjg3NTdjMjVkNDQ5ZDk2ZjUzYjk4NjYxZWFlZDcpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzhjMTIyNjQwYjE5YzRmMjA5NjVhMjM4OTdiOGQwYmFiKTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9hZDViYzE4YTM5ZDE0ZGU4YjFjODI3NTZmMDUyOTJlYSk7XHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fODQ1NjY0YzAyMDZmNDIwYTg3YWQ3OGNmZWU0ZTEyYjgpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzliMDEyODIyMzA5YTRjNTZiNGVmYjAxNDNiM2JiODUxKTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl82ZGMxYjkyZTFmMTc0MDBhOGY3NmViMGVmMDU4OTdkOCk7XHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fNDQzZGE2ZDUzOGJjNGE2Njg2NWIwYzgwZTI2MTMwYjgpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzAwNzhiMmZlM2E5NjRjZTM4ZmNhNDU2ZGZmMDQwZDllKTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl81OTg5Nzk5YjU2OWM0MWExOWVkNmExYmYzYjg2ZDEzNik7XHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fM2UzMGIxMzQyOWM4NDU3YmIzMGI1YjRmOWQzZDhhYTMpO1xyXG5cclxudmFyIFNjcm9sbFZpZXdlcl9iOGMyNDNiODBlODA0NmExOTA4MTcyZTgxMGQxMjhlNyA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5TY3JvbGxWaWV3ZXIoKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJvdXRwdXRTY3JvbGxcIiwgU2Nyb2xsVmlld2VyX2I4YzI0M2I4MGU4MDQ2YTE5MDgxNzJlODEwZDEyOGU3KTtcclxuU2Nyb2xsVmlld2VyX2I4YzI0M2I4MGU4MDQ2YTE5MDgxNzJlODEwZDEyOGU3Lk5hbWUgPSBcIm91dHB1dFNjcm9sbFwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihTY3JvbGxWaWV3ZXJfYjhjMjQzYjgwZTgwNDZhMTkwODE3MmU4MTBkMTI4ZTcsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihTY3JvbGxWaWV3ZXJfYjhjMjQzYjgwZTgwNDZhMTkwODE3MmU4MTBkMTI4ZTcsNCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihTY3JvbGxWaWV3ZXJfYjhjMjQzYjgwZTgwNDZhMTkwODE3MmU4MTBkMTI4ZTcsNyk7XHJcblNjcm9sbFZpZXdlcl9iOGMyNDNiODBlODA0NmExOTA4MTcyZTgxMGQxMjhlNy5CYWNrZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMCwgRyA9IChieXRlKTAsIEIgPSAoYnl0ZSkwIH0pO1xyXG52YXIgVGV4dEJsb2NrXzk2NWU2MTMxNGIwOTRiZWVhMjhiNDY2NTk2ZjA2ZWVhID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCbG9jaygpO1xyXG5UZXh0QmxvY2tfOTY1ZTYxMzE0YjA5NGJlZWEyOGI0NjY1OTZmMDZlZWEuVGV4dCA9IEBcIlwiO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcIm91dHB1dFwiLCBUZXh0QmxvY2tfOTY1ZTYxMzE0YjA5NGJlZWEyOGI0NjY1OTZmMDZlZWEpO1xyXG5UZXh0QmxvY2tfOTY1ZTYxMzE0YjA5NGJlZWEyOGI0NjY1OTZmMDZlZWEuTmFtZSA9IFwib3V0cHV0XCI7XHJcblRleHRCbG9ja185NjVlNjEzMTRiMDk0YmVlYTI4YjQ2NjU5NmYwNmVlYS5CYWNrZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMCwgRyA9IChieXRlKTAsIEIgPSAoYnl0ZSkwIH0pO1xyXG5UZXh0QmxvY2tfOTY1ZTYxMzE0YjA5NGJlZWEyOGI0NjY1OTZmMDZlZWEuRm9yZWdyb3VuZCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5NZWRpYS5Tb2xpZENvbG9yQnJ1c2gobmV3IGdsb2JhbDo6V2luZG93cy5VSS5Db2xvcigpIHsgQSA9IChieXRlKTI1NSwgUiA9IChieXRlKTI1NSwgRyA9IChieXRlKTI1NSwgQiA9IChieXRlKTI1NSB9KTtcclxuXHJcblNjcm9sbFZpZXdlcl9iOGMyNDNiODBlODA0NmExOTA4MTcyZTgxMGQxMjhlNy5Db250ZW50ID0gVGV4dEJsb2NrXzk2NWU2MTMxNGIwOTRiZWVhMjhiNDY2NTk2ZjA2ZWVhO1xyXG5cclxuXHJcbnZhciBMaXN0Qm94X2QwMWQyYmEzZTU5MjRhMTVhNTY2MzlmYTI0Y2MwNWI2ID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkxpc3RCb3goKTtcclxudGhpcy5SZWdpc3Rlck5hbWUoXCJwYXN0SW5wdXRMaXN0XCIsIExpc3RCb3hfZDAxZDJiYTNlNTkyNGExNWE1NjYzOWZhMjRjYzA1YjYpO1xyXG5MaXN0Qm94X2QwMWQyYmEzZTU5MjRhMTVhNTY2MzlmYTI0Y2MwNWI2Lk5hbWUgPSBcInBhc3RJbnB1dExpc3RcIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oTGlzdEJveF9kMDFkMmJhM2U1OTI0YTE1YTU2NjM5ZmEyNGNjMDViNiwwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKExpc3RCb3hfZDAxZDJiYTNlNTkyNGExNWE1NjYzOWZhMjRjYzA1YjYsNCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93KExpc3RCb3hfZDAxZDJiYTNlNTkyNGExNWE1NjYzOWZhMjRjYzA1YjYsNyk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Um93U3BhbihMaXN0Qm94X2QwMWQyYmEzZTU5MjRhMTVhNTY2MzlmYTI0Y2MwNWI2LDIpO1xyXG5cclxudmFyIFRleHRCb3hfNWIwZjU0YmM1ZWQ1NDQyMGE2YzY4NjJjOGYzMjdjYmUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJveCgpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcImlucHV0XCIsIFRleHRCb3hfNWIwZjU0YmM1ZWQ1NDQyMGE2YzY4NjJjOGYzMjdjYmUpO1xyXG5UZXh0Qm94XzViMGY1NGJjNWVkNTQ0MjBhNmM2ODYyYzhmMzI3Y2JlLk5hbWUgPSBcImlucHV0XCI7XHJcblRleHRCb3hfNWIwZjU0YmM1ZWQ1NDQyMGE2YzY4NjJjOGYzMjdjYmUuVGV4dCA9IEBcIlwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihUZXh0Qm94XzViMGY1NGJjNWVkNTQ0MjBhNmM2ODYyYzhmMzI3Y2JlLDApO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oVGV4dEJveF81YjBmNTRiYzVlZDU0NDIwYTZjNjg2MmM4ZjMyN2NiZSwzKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coVGV4dEJveF81YjBmNTRiYzVlZDU0NDIwYTZjNjg2MmM4ZjMyN2NiZSw5KTtcclxuVGV4dEJveF81YjBmNTRiYzVlZDU0NDIwYTZjNjg2MmM4ZjMyN2NiZS5LZXlEb3duICs9IGlucHV0X0tleURvd247XHJcblxyXG52YXIgQnV0dG9uXzQyZDg2MWMxMWFmNDQyYWU4YzFkMGY2YTFiOTk1NDhmID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkJ1dHRvbigpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcImFjdGlvbkJ1dHRvblwiLCBCdXR0b25fNDJkODYxYzExYWY0NDJhZThjMWQwZjZhMWI5OTU0OGYpO1xyXG5CdXR0b25fNDJkODYxYzExYWY0NDJhZThjMWQwZjZhMWI5OTU0OGYuTmFtZSA9IFwiYWN0aW9uQnV0dG9uXCI7XHJcbkJ1dHRvbl80MmQ4NjFjMTFhZjQ0MmFlOGMxZDBmNmExYjk5NTQ4Zi5Db250ZW50ID0gQFwiQWN0aW9uXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKEJ1dHRvbl80MmQ4NjFjMTFhZjQ0MmFlOGMxZDBmNmExYjk5NTQ4ZiwzKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKEJ1dHRvbl80MmQ4NjFjMTFhZjQ0MmFlOGMxZDBmNmExYjk5NTQ4ZiwxKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coQnV0dG9uXzQyZDg2MWMxMWFmNDQyYWU4YzFkMGY2YTFiOTk1NDhmLDkpO1xyXG5CdXR0b25fNDJkODYxYzExYWY0NDJhZThjMWQwZjZhMWI5OTU0OGYuQ2xpY2sgKz0gYWN0aW9uQnV0dG9uX0NsaWNrO1xyXG5cclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5DaGlsZHJlbi5BZGQoU2Nyb2xsVmlld2VyX2I4YzI0M2I4MGU4MDQ2YTE5MDgxNzJlODEwZDEyOGU3KTtcclxuR3JpZF9kOTZmYzNiZTU2NGE0ZGY3YTQzODk1NDg4MzQ0YzEwZC5DaGlsZHJlbi5BZGQoTGlzdEJveF9kMDFkMmJhM2U1OTI0YTE1YTU2NjM5ZmEyNGNjMDViNik7XHJcbkdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQuQ2hpbGRyZW4uQWRkKFRleHRCb3hfNWIwZjU0YmM1ZWQ1NDQyMGE2YzY4NjJjOGYzMjdjYmUpO1xyXG5HcmlkX2Q5NmZjM2JlNTY0YTRkZjdhNDM4OTU0ODgzNDRjMTBkLkNoaWxkcmVuLkFkZChCdXR0b25fNDJkODYxYzExYWY0NDJhZThjMWQwZjZhMWI5OTU0OGYpO1xyXG5cclxuXHJcbnRoaXMuQ29udGVudCA9IEdyaWRfZDk2ZmMzYmU1NjRhNGRmN2E0Mzg5NTQ4ODM0NGMxMGQ7XHJcblxyXG5cclxuXHJcbm91dHB1dCA9IFRleHRCbG9ja185NjVlNjEzMTRiMDk0YmVlYTI4YjQ2NjU5NmYwNmVlYTtcclxub3V0cHV0U2Nyb2xsID0gU2Nyb2xsVmlld2VyX2I4YzI0M2I4MGU4MDQ2YTE5MDgxNzJlODEwZDEyOGU3O1xyXG5wYXN0SW5wdXRMaXN0ID0gTGlzdEJveF9kMDFkMmJhM2U1OTI0YTE1YTU2NjM5ZmEyNGNjMDViNjtcclxuaW5wdXQgPSBUZXh0Qm94XzViMGY1NGJjNWVkNTQ0MjBhNmM2ODYyYzhmMzI3Y2JlO1xyXG5hY3Rpb25CdXR0b24gPSBCdXR0b25fNDJkODYxYzExYWY0NDJhZThjMWQwZjZhMWI5OTU0OGY7XHJcblxyXG5cclxuICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbDtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sLkNvbnRyb2xzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIHNlYWxlZCBwYXJ0aWFsIGNsYXNzIEFwcCA6IEFwcGxpY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFwcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVDb21wb25lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVudGVyIGNvbnN0cnVjdGlvbiBsb2dpYyBoZXJlLi4uXHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpblBhZ2UgPSBuZXcgTWFpblBhZ2UoKTtcclxuICAgICAgICAgICAgV2luZG93LkN1cnJlbnQuQ29udGVudCA9IG1haW5QYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBGbGlnaHREYXNoV2ViLkNvbW1hbmRzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUm9vbSBDdXJyZW50Um9vbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIFBsYXllciBQbGF5ZXIgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgVGltZVRvRmxpZ2h0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8SUNvbW1hbmQ+IENvbW1hbmRzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBHYW1lT3ZlciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2hlY2tlZEluIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgVGltZVRvRmxpZ2h0ID0gNjA7XHJcbiAgICAgICAgICAgIFBsYXllcj1uZXcgUGxheWVyKCk7XHJcbiAgICAgICAgICAgIFBsYXllci5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgIE1ha2VSb29tcygpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5DbGVhcigpO1xyXG4gICAgICAgICAgICBDb21tYW5kcy5BZGQobmV3IExvb2soKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgR28oKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgQ2hlY2tJbigpKTtcclxuICAgICAgICAgICAgQ2hlY2tlZEluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTWFrZVJvb21zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBob3RlbFJvb20gPSBuZXcgUm9vbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSG90ZWwgUm9vbVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiQSBwcmV0dHkgYmFzaWMgSG90ZWwgcm9vbS4gTm90aGluZyBtdWNoIG91dCBvZiB0aGUgb3JkaW5hcnkgaGVyZVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBiZWQgaXMgdW5tYWRlLCBsZWZ0IGluIGEgbWVzcyBmcm9tIHlvdXIgcnVkZSBhd2FrZW5pbmcsIGFzIHRoZSBhbGFybSBibGlua3MgMTI6MDAgbWVycmlseSBhdCB5b3UsIGlnbm9yYW50IG9mIHlvdXIgZGlzdHJlc3MuXFxyXFxuIFlvdXIgc3VpdGNhc2UgbGF5cyBvbiB0aGUgZmxvb3IgYXQgdGhlIGZvb3Qgb2YgdGhlIGJlZCwgbmVhdGx5IHBhY2tlZC5cXHJcXG5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG91dHNpZGVIb3RlbCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk91dHNpZGUgSG90ZWxcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIk91dHNpZGUgdGhlIHdlYXRoZXIgaXMgY2FsbSwgYmx1ZSBza2llcy4gWW91ciBjYXIgc2l0cyBpbiB0aGUgYXNzaWduZWQgcGFya2luZyBzcG90IGF3YWl0aW5nIHlvdVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJJbiB0aGUgZGlzdGFuY2UgeW91IHNlZSBvbiB0aGUgZnJlZSByb2FkIHNvbWUgaGludHMgb2YgYSB0cmFmZmljIGphbS5cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgaG90ZWxFeGl0ID0gbmV3IEV4aXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBvdXRzaWRlSG90ZWwsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGhvdGVsIGRvb3IgaGFzIGEgc2lnbiBvbiBpdCBzYXlpbmcgXFxcIlBsZWFzZSByZW1lbWJlciB5b3VyIGtleSB3aWxsIG5vdCB3b3JrIG9uY2UgeW91ciBjaGVja291dCB0aW1lIGlzIHBhc3QsIHBsZWFzZSByZW1lbWJlciBhbGwgeW91ciBiZWxvbmdpbmdzXFxcIlxcclxcblwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhdmluZyB0aGUgaG90ZWwgeW91IGhlYXIgaXQgbG9jayBiZWhpbmQgeW91LCBkcm9wcGluZyB5b3VyIGtleXMgb2ZmIGF0IHJlY2VwdGlvbiB5b3UgaGVhZCBpbnRvIHRoZSBjYXJwYXJrIHRvIHBpY2sgdXAgeW91ciByZW50YWwuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiT3V0c2lkZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtde1wib3V0c2lkZVwiLFwiZG9vclwiLFwiZXhpdFwiLFwib3V0XCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1LFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGhvdGVsUm9vbS5FeGl0cy5BZGQoaG90ZWxFeGl0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXI9bmV3IFJvb20oKSB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiSW4geW91ciBDYXJcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdXIgcmVudGFsIGlzIGEgYmFzaWMgYXV0b21hdGljIHRyYW5zbWlzc2lvbiBjYXJcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9ICBAXCJNb2RlcmF0ZSBzaXplLCBhdCBtaW5pbWFsIGNvc3QsIG5vIGZhbmN5IEdQUyBvciBtZWRpYSBjZW50ZXIgZm9yIHlvdSBvbiB0aGlzIHRyaXAuIFxyXG4gSXQgaXMgb2J2aW91cyB0aGUgY2FyIGhhcyBzZWVuIGJldHRlciBkYXlzLCBhbmQgbXVjaCB3b3JzZSBkcml2ZXJzLCB3aXRoIHNvbWUgc3RhaW5zIGRvdHRlZCBvbiB0aGUgZW1wdHkgcGFzc2VuZ2VyIHNlYXQgY3VzaGlvbnMuIFxyXG5Zb3VyIGRhc2hib2FyZCBpcyBhIGJpdCBkaXJ0eSBidXQgbG9va2luZyBjbG9zZXIgeW91IG5vdGljZSB5b3VyIGZ1ZWwgaXMgb25seSBhIHRoaXJkIGZ1bGxcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhckV4aXQgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gY2FyLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSByZW50YWwgY2FyIGlzIGEgc21hbGwsIGFuZCBzbGlnaHRseSBiYXR0ZXJlZCB0aGluZy5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZHVtcCB5b3VyIHN1aXRjYXNlIGludG8gdGhlIHRydW5rLCBmaWxsaW5nIHRoZSBsaW1pdGVkIHNwYWNlIGJlZm9yZSBwbG9wcGluZyB5b3Vyc2VsZiBkb3duIGluIHRoZSBkcml2ZXJzIHNlYXRcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDYXJcIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ldyBbXXtcImNhclwiLFwiaW5cIixcInJlbnRhbFwiLCBcImRyaXZlcnMgc2lkZVwifSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvdXRzaWRlSG90ZWwuRXhpdHMuQWRkKGNhckV4aXQpO1xyXG4gICAgICAgICAgICAvLyB0b2RvIEFkZCB3YWxrXHJcbiAgICAgICAgICAgIHZhciBvbkZpcnN0Um9hZCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWU9XCJPbiB0aGUgUm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIHJvYWQgb3V0IG9mIHRoZSBob3RlbCBpcyBwcmV0dHkgYmFzaWMsIHN0cmFpZ2h0LCBhbmQgd2VsbCBzaWducG9zdGVkIHVwIHRvIHRoZSBoaWdod2F5LiBcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9ICBAXCJBaGVhZCBvZiB5b3UgaXMgYSBzcGxpdCwgdGhlIHJvYWQgdG8gdGhlIHJpZ2h0IGlzIGZyZWUsIGJ1dCB0aGVyZSBzZWVtcyB0byBiZSBzaWducyBvZiB0cmFmZmljLiBcclxuV2hlcmVhcyB0aGUgcm9hZCB0byB0aGUgbGVmdCBjb3N0cyB5b3UgJDUwIGp1c3QgdG8gZW50ZXIsYnV0IHRha2VzIHlvdSBkaXJlY3QgdG8gdGhlIGFpcnBvcnQuXCIsIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q2FyID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiT24gdGhlIFdheVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSByb2FkIHRvIHRoZSBhaXJwb3J0IGxvb2tzIHByZXR0eSBvYnZpb3VzIGZyb20gaGVyZVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBvbkZpcnN0Um9hZCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ldyBbXXsgXCJ0byB0aGUgYWlycG9ydFwiICwgXCJhaXJwb3J0XCIsIFwib3V0XCIsIFwicGxhbmVcIiwgXCJmbGlnaHRcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiRHJpdmluZyBvdXQgb2YgdGhlIGhvdGVsLCB5b3UgIHNvb24gc3BvdCB0aGUgc2lnbiB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhci5FeGl0cy5BZGQoc3RhcnRDYXIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aE1vdG9yd2F5ID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIFRvbGxib290aCByb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGhpZ2h3YXkgbG9va3MgY2xlYXIgdGhyb3VnaCB0aGUgd2hvbGUgcm91dGUuIFRoZSBvY2Nhc2lvbmFsIGNhciBwYXNzZXMsIG9yIGlzIHBhc3NlZCBidXQgb3ZlcmFsbCAgaXQgc3RheXMgY2xlYXIgcmlnaHQgdGhyb3VnaCB0byB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBAXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib290aEVudHJhbmNlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVG9sbGJvb3RoIFJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHRvbGxib290aCBzdGFuZHMgb24gdGhlIHNpZGUgb2YgdGhlIHJvYWQsIGl0J3MgbG9uZyBiYXIgbG93ZXJlZCBibG9ja2luZyB0aGUgcm91dGUgb25cIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdG9sbGJvb3RoTW90b3J3YXksXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IChkZWNpbWFsKSA1MC4wLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10ge1widG9sbGJvb3RoXCIsIFwicGFpZFwiLCBcImZhc3RcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKHRvbGxib290aEVudHJhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmVlUm9hZCA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIk9uIHRoZSBmcmVlIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBpcyBpbiB0aGUgbWlkc3Qgb2YgYSBodWdlIHRyYWZmaWMgamFtLiBDYXIgaG9ybnMgb2YgYWxsIHNvcnRzICwgYW5kIHRoZSBvY2Nhc2lvbmFsIHllbGwgZmlsbHMgdGhlIGFpclwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZnJlZVJvYWRFbnRyYW5jZSA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkZyZWUgUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID1cclxuICAgICAgICAgICAgICAgICAgICBcIlRoZSBmcmVlIHJvdXRlJ3MgZW50cmFuY2UgbGllcyB1bmJhcnJlZCwgYnV0IHRoZXJlIGlzIGEgaGludCBvZiByZWQgYnJlYWstbGlnaHRzIGluIHRoZSBkaXN0YW5jZSBhbG9uZyBpdFwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBmcmVlUm9hZCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHtcImZyZWVcIiwgXCJyaWdodFwifSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gcmlnaHQsIGludGVuZGluZyB0byBzYXZlIHlvdXIgbW9uZXkgZm9yIGxhdGVyLCBob3dldmVyIGEgc2hvcnQgdGltZSB1cCB0aGUgcm9hZCB5b3UgY3Jhd2wgdG8gYSBoYWx0IGFzIHlvdSBoaXQgYSBodWdlIHRyYWZmaWMgamFtLFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9uRmlyc3RSb2FkLkV4aXRzLkFkZChmcmVlUm9hZEVudHJhbmNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYWlycG9ydEVudHJhbmNlID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiQWlycG9ydCBEZXBhcnR1cmVzIEVudHJhbmNlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgZGVwYXJ0dXJlcyBlbnRyYW5jZSB0byB0aGUgYWlycG9ydCBsb29rcyBhIGJpdCBkaW5neSwgYnV0IHdlbGwgdHJhdmVsZWQsIHRoZSBkb29ycyBhcmUgd2lkZSBvcGVuIGFzIHBlb3BsZSBzdHJlYW0gaW5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiSGVyZSBhbmQgdGhlcmUgcG9zdGVycyBhcmUgb24gdGhlIHdhbGwsIGFkdmVydGlzaW5nIGZsaWdodCBkZWFscyBmb3IgdmFyaW91cyBjb21wYW5pZXMsIGFuZCBhIGNvdXBsZSBzZWN1cml0eSBndWFyZHMgc3RhbmQgbmVhciB0aGUgZW50cmFuY2UuXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvbGxib3RoTGVhdmU9bmV3IEV4aXQoKXtcclxuICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ldyBbXSB7XCJcIn0sXHJcbiAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggZXhpdFwiLFxyXG4gICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgIEV4aXRUaW1lID0gMTAsXHJcbiAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHRvbGwgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgIEV4aXRDb3N0ID0gNVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyZWVSb3V0ZUxlYXZlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ld1tdIHsgXCJcIiB9LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkZyZWUgcm91dGUgZXhpdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAyNSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgbGVhdmUgdGhlIHJvdXRlIGFuZCBmaW5kIHlvdXJzZWxmIGltbWVkaWF0ZWx5IGJ5IHRoZSBhaXJwb3J0IHJlbnRhbCBkcm9wIG9mZiwgcGFya2luZyB5b3VyIGNhciBhbmQgZ3JhYmJpbmcgeW91ciBsdWdnYWdlIHlvdSB3YWxrIHRoZSBleHRyZW1lbHkgc2hvcnQgZGlzdGFuY2UgdG8gZGVwYXJ0dXJlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0b2xsYm9vdGhNb3RvcndheS5BdXRvRXhpdCA9IHRvbGxib3RoTGVhdmU7XHJcblxyXG4gICAgICAgICAgICBmcmVlUm9hZC5BdXRvRXhpdCA9IGZyZWVSb3V0ZUxlYXZlO1xyXG4gICAgICAgICAgICB2YXIgd2FsayA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBhaXJwb3J0RW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXcgW117XCJ3YWxrXCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZXJlIGlzIGEgd2Fsa2luZyBwYXRoIHRvIHRoZSBhaXJwb3J0IHRoYXQgc2VlbXMgdG8gZ28gdGhyb3VnaCBhIGZldyBmaWVsZHNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJUaGUgd2FsayB0byB0aGUgYWlycG9ydCBpcyBsb25nIGFuZCBhcmR1b3VzLCBhbmQgc2VlbXMgdG8gdGFrZSBhIGxvdCBsb25nZXIgdGhlbiBpdCBsb29rZWQgZnJvbSB0aGUgbWFwIGF0IHRoZSBob3RlbFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxMjAsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiV2Fsa2luZyBQYXRoXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb3V0c2lkZUhvdGVsLkV4aXRzLkFkZCh3YWxrKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaW5zaWRlQWlycG9ydD1uZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJJbnNpZGUgdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIkluc2lkZSB0aGUgYWlycG9ydCB0aGluZ3MgYXJlIHF1aXRlIGJ1c3ksIHRvIHRoZSBsZWZ0IGFyZSB0aGUgY2hlY2staW4gZGVza3Mgd2hpbGUgdG8gdGhlIHJpZ2h0IGlzIHRoZSBUU0EgcXVldWUuXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkJ5IHRoZSBUU0EgcXVldWUgZW50cmFuY2UgaXMgYSBzaWduIHNheWluZyBcXFwiQnV5IFRTQSBQcmVDaGVjayB0byB1c2UgdGhpcyBzaG9ydGVyIHF1ZXVlLiBPbmx5ICQ4NVxcXCIgTmV4dCB0byBhIGJhcnJpZXIgIGxlYWRpbmcgdG8gYSBtdWNoIHNob3J0ZXIgcXVldWVcIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBnb0luc2lkZT1uZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gaW5zaWRlQWlycG9ydCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJJbnNpZGUgQWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBkb29ycyBhcmUgd2lkZSBvcGVuLCB0aGUgb25seSBvYnN0YWNsZSBiZWluZyB0aGUgc3RyZWFtIG9mIHBlb3BsZSBnb2luZyBvbiB0aGVpciB0cmF2ZWwgcGxhbnNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ28gdGhyb3VnaCB0aGUgZG9vcnMsIG1hbmFnaW5nIHRvIGF2b2lkIGdldHRpbmcgam9zdGxlZCBhYm91dFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzPW5ldyBbXXtcImluXCIsXCJpbnNpZGVcIixcImluZG9vcnNcIixcImVudGVyXCIsXCJlbnRyYW5jZVwiLFwiYWlycG9ydFwifSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWlycG9ydEVudHJhbmNlLkV4aXRzLkFkZChnb0luc2lkZSk7XHJcbiAgICAgICAgICAgIHZhciB0c2FFbnRyYW5jZT1uZXcgUm9vbSgpIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJUU0EgRW50cnlcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIllvdSBoZWFkIHRvd2FyZHMgdGhlIFRTQSBTZWN1cml0eSBDaGVja3BvaW50LCBpdCBzZWVtcyB0byBiZSBzcGxpdCBpbnRvIHR3bywgYSBxdWljayBQcmVDaGVjayBhcmVhLCBhbmQgYSBzbG93IGFyZWFcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IEBcIk5lYXIgdGhlIHF1aWNrIHpvbmUgaXMgYSBzaWduLCBzcGVhayB0byBhIFRTQSBPZmZpY2VyIHRvIGJ1eSBhIHNpbmdsZS11c2UgVFNBIFByZUNoZWNrIGFjY2Vzcywgb25seSAkODUsIFxyXG5EbyB5b3UgY2hvb3NlIHRvIGJ1eSBUU0EgUHJlQ2hlY2ssIG9yIGRvIHlvdSB1c2UgdGhlIGdlbmVyYWwgcXVldWU/XHJcblwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb1RvVHNhID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiAhZ2FtZS5DaGVja2VkSW4sXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiVGhlIGd1YXJkIGF0IHRoZSBmcm9udCBvZiB0aGUgcXVldWUgbG9va3MgYXQgeW91IGZsYXRseSBhc2tpbmcgZm9yIHlvdXIgYm9hcmRpbmcgcGFzcywgbG9va2luZyBiYWNrIGZvciBhIHNlY29uZCB5b3UgZmFjZS1wYWxtIGJlZm9yZSBsZWF2aW5nIHRvIGRvIHNvXCIsXHJcbiAgICAgICAgICAgICAgICBMb2NrVGltZSA9IDIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IHRzYUVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRTQSBFbnRyYW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtde1wiVFNBXCIsIFwicmlnaHRcIixcInNlY3VyaXR5XCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPSBcIlRoZSBFbnRyYW5jZSB0byB0aGUgVFNBIGFyZWEgaXMgbGFyZ2UsIGJ1dCBndWFyZGVkIGJ5IGEgY291cGxlIG1lbiBjaGVja2luZyBib2FyZGluZyBwYXNzZXNcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJZb3UgZ2V0IGluIGxpbmUsIHNob3dpbmcgeW91ciBib2FyZGluZyBwYXNzIHRvIHRoZSBndWFyZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoZWNrSW5EZXNrID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiVGhlIENoZWNrLWluIERlc2tcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBjaGVjay1pbiBkZXNrIGZpbmFsbHkgaW4gdmlldywgdGhlIHdvbWFuIHNhdCBpbiBmcm9udCBhc2tzIHlvdSB0byAnY2hlY2sgaW4nIHdpdGggYSBzbWlsZVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJOZWFyIHRoZSBkZXNrIGlzIGEgY291cGxlIGxlYWZsZXRzIGFib3V0IGNhcnJ5IG9uIHNpemUgYW5kIHdoYXQgaXMgYW5kIGlzbnQgYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ290b0NoZWNraW4gPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJDaGVja2luIGxpbmVcIixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gIGNoZWNrSW5EZXNrLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtde1wiY2hlY2tpblwiLCBcImNoZWNrXCIsIFwiZGVza1wiLCBcImxlZnRcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGxpbmUgdG8gdGhlIGNoZWNrLWluIGRlc2sgaXMgcXVpdGUgbG9uZywgYnV0IG5vdCB1bndpZWxkeVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIldhaXRpbmcgaW4gdGhlIGxpbmUsIGl0IG1vdmVzIGF0IGEgbW9kZXJhdGUgcGFjZSwgYW5kIHNvb24gZW5vdWdoIHlvdSBhcmUgYXQgdGhlIGNoZWNrLWluIGRlc2tcIixcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gNVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlYXZlQ2hlY2tpbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkxlYXZlIGNoZWNrLWluXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TG9ja2VkID0gZ2FtZSA9PiAhZ2FtZS5DaGVja2VkSW4sXHJcbiAgICAgICAgICAgICAgICBMb2NrVGV4dCA9IFwiQWZ0ZXIgZmluYWxseSBnZXR0aW5nIHRvIHRoZSBlbmQgb2YgdGhlIGNoZWNrLWluIGxpbmUgeW91IHJlYWxpemUgeW91IGZvcmdvdCB5b3VyIHN1aXRjYXNlIG5lYXIgdGhlIHN0YXJ0LCB3aXRoIGFuIGFubm95ZWQgc2lnaCB5b3UgZ28gYmFjayB0byBnZXQgaXRcIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gNSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ldyBbXXtcInJpZ2h0XCIsXCJvdXRcIixcImJhY2tcIn0sXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGluc2lkZUFpcnBvcnQsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHdheSBvdXQgb2YgY2hlY2staW4gaXMgYSBzbWFsbCBhbGxleXdheSBiZXR3ZWVuIHRoZSBkZXNrc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSBjaGVjay1pbiBmb2xsb3dpbmcgdGhlIGxpbmVzLCBhbmQgc29vbiBmaW5kIHlvdXJzZWxmIGJhY2sgd2hlcmUgeW91IHN0YXJ0ZWQgaW4gdGhlIGFpcnBvcnRcIixcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjaGVja0luRGVzay5FeGl0cy5BZGQobGVhdmVDaGVja2luKTtcclxuICAgICAgICAgICAgaW5zaWRlQWlycG9ydC5FeGl0cy5BZGQoZ290b0NoZWNraW4pO1xyXG5cclxuICAgICAgICAgICAgaW5zaWRlQWlycG9ydC5FeGl0cy5BZGQoZ29Ub1RzYSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJlQ2hlY2sgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBQcmVDaGVjayB6b25lIGlzIG5pY2UgYW5kIHF1aWNrLCB5b3UgZHVtcCB5b3VyIGJhY2twYWNrIG9uIHRoZSB4cmF5IGJlbHQgYmVmb3JlIHlvdSBnbyB0aHJvdWdoIHRoZSBzY2FubmVyIHdpdGhvdXQgbmVlZGluZyB0byB0YWtlIG9mZiB5b3VyIGJlbHQgYW5kIHNob2VzXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkFzIHlvdSBwaWNrIHVwIHlvdXIgYmFja3BhY2sgb2ZmIHRoZSB4cmF5IGJlbHQsIHlvdSBzbWVsbCBidXJyaXRvcyBmcm9tIHRoZSBNZXhpY2FuIGZvb2Qgc3RhbmQgb3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJQcmVDaGVja1wiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJlQ2hlY2tFeGl0PW5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEN1cnJlbnRSb29tID0gaG90ZWxSb29tO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJvb21UaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsQ3VycmVudFJvb20pIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxSb29tPihcImtleTFcIikuUm9vbU5hbWU6KHN0cmluZyludWxsKSA/PyBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSb29tSGVhZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgYnVpbGRlcj1uZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICBzdHJpbmcgcm9vbU5hbWUgPSAoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixDdXJyZW50Um9vbSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFJvb20+KFwia2V5MlwiKS5Sb29tTmFtZTooc3RyaW5nKW51bGwpID8/IFwiXCI7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShyb29tTmFtZSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShzdHJpbmcuRm9ybWF0KFwiVGltZSB0byBGbGlnaHQ6IHswOkQyfTp7MTpEMn1cIixUaW1lVG9GbGlnaHQgLyA2MCxUaW1lVG9GbGlnaHQgJSA2MCkpO1xyXG4gICAgICAgICAgICBidWlsZGVyLkFwcGVuZExpbmUoc3RyaW5nLkZvcm1hdChcIk1vbmV5OiB7MDpDfVwiLChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5M1wiLFBsYXllcikhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFBsYXllcj4oXCJrZXkzXCIpLk1vbmV5OihkZWNpbWFsPyludWxsKSA/PyAwKSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZSgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTRcIixDdXJyZW50Um9vbSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFJvb20+KFwia2V5NFwiKS5TaG9ydFJvb21EZXNjOihzdHJpbmcpbnVsbCkgPz8gXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBidWlsZGVyLlRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUlucHV0KHN0cmluZyBpbnB1dCwgb3V0IHN0cmluZyBvdXRwdXRUZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJTb3JyeSwgdGhpcyBnYW1lIGlzIG92ZXJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb21tYW5kU3BsaXQgPSBpbnB1dC5TcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY29tbWFuZCBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPElDb21tYW5kPihDb21tYW5kcywoRnVuYzxJQ29tbWFuZCxib29sPikoY29tbWFuZCA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY29tbWFuZC5HZXRDb21tYW5kQWxpYXNlcygpLGNvbW1hbmRTcGxpdFswXS5Ub0xvd2VyKCkpKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLlRyeVBhcnNlQ29tbWFuZChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8c3RyaW5nPihjb21tYW5kU3BsaXQsMSkpLCB0aGlzLCBvdXQgb3V0cHV0VGV4dCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRpbWVUb0ZsaWdodCA8PSAwIHx8IFBsYXllci5Nb25leSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0VGV4dCA9IFwiU29ycnksIGl0IHNlZW1zIHlvdSBcIiArIChUaW1lVG9GbGlnaHQgPD0gMCA/IFwicmFuIG91dCBvZiB0aW1lXCIgOiBcInJhbiBvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQYXJzZUlucHV0KHN0cmluZyBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBMaXN0PElDb21tYW5kPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29tbWFuZHM9bmV3IExpc3Q8SUNvbW1hbmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5JTztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFdpbmRvd3MuU3lzdGVtO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWw7XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbC5Db250cm9scztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBHYW1lIEdhbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTWFpblBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIEdhbWUuSW5pdGlhbGl6ZUdhbWUoKTtcclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gR2FtZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYWN0aW9uQnV0dG9uX0NsaWNrKG9iamVjdCBzZW5kZXIsIFJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSGFuZGxlSW5wdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBpbnB1dF9LZXlEb3duKG9iamVjdCBzZW5kZXIsIFdpbmRvd3MuVUkuWGFtbC5JbnB1dC5LZXlSb3V0ZWRFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGUuS2V5PT1WaXJ0dWFsS2V5LkVudGVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSGFuZGxlSW5wdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5JdGVtcy5BZGQoaW5wdXQuVGV4dCk7XHJcbiAgICAgICAgICAgIHBhc3RJbnB1dExpc3QuU2VsZWN0ZWRJbmRleCA9IHBhc3RJbnB1dExpc3QuSXRlbXMuQ291bnQgLSAxO1xyXG5zdHJpbmcgb3V0cHV0VGV4dDtcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBHYW1lLlRyeVBhcnNlSW5wdXQoaW5wdXQuVGV4dCwgb3V0IG91dHB1dFRleHQpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBcIj4gXCIgKyBpbnB1dC5UZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IG91dHB1dFRleHQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5UZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIEdhbWUgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0dhbWU9bmV3IEdhbWUoKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBsYXllclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgZGVjaW1hbCBNb25leSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Nb25leSA9IDEyNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBIGJhc2ljIHJvb21cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgUm9vbVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJvb20gbmFtZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSb29tTmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcm9vbSBEZXNjcmlwdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTaG9ydFJvb21EZXNjIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMb25nUm9vbURlc2MgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBMaXN0PEV4aXQ+IEV4aXRzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRXhpdCBBdXRvRXhpdCB7IGdldDsgc2V0OyB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgTGlzdDxFeGl0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRXhpdHM9bmV3IExpc3Q8RXhpdD4oKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoZWNrSW46SUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNoZWNrLWluXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHtcImNoZWNrXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kSGVscCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlQ29tbWFuZChzdHJpbmdbXSBjb21tYW5kQXJndW1lbnRzLCBHYW1lIGN1clN0YXRlLCBvdXQgc3RyaW5nIG91dHB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzLkxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIkkgaGF2ZSBub3RoaW5nIHRvIGNoZWNrLlwiK0Vudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb21tYW5kQXJndW1lbnRzWzBdICE9IFwiaW5cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJJIGhhdmUgbm90aGluZyB0byBjaGVjay5cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJTdGF0ZS5Sb29tVGl0bGUoKS5Ub0xvd2VyKCkgIT0gXCJ0aGUgY2hlY2staW4gZGVza1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIlNvcnJ5LCB5b3UgY2FuIG5vdCBjaGVjayBpbiBoZXJlXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1clN0YXRlLkNoZWNrZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIGV4aXQgPSBjdXJTdGF0ZS5DdXJyZW50Um9vbS5FeGl0c1swXTtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IEVudmlyb25tZW50Lk5ld0xpbmUgKyBleGl0LkV4aXRUZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudFJvb20gPSBleGl0LkRlc3RpbmF0aW9uO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gZXhpdC5FeGl0VGltZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuUGxheWVyLk1vbmV5IC09IGV4aXQuRXhpdENvc3Q7XHJcbiAgICAgICAgICAgIG91dHB1dCArPSBjdXJTdGF0ZS5HZXRSb29tSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR286IElDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJHb1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIEdldENvbW1hbmRBbGlhc2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXSB7XCJnb1wiLCBcImhlYWRcIiwgXCJ3YWxrXCIsIFwiZHJpdmVcIiwgXCJnZXQgaW5cIn07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiU29ycnksIEludmFsaWQgZGVzdGluYXRpb24gb3IgY29tbWFuZCBmb3JtYXRcIitFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY3VycmVudFJvb21FeGl0IGluIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8RXhpdD4oY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHMsKEZ1bmM8RXhpdCxib29sPikoY3VycmVudFJvb21FeGl0ID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjdXJyZW50Um9vbUV4aXQuRXhpdE5hbWVzLGNvbW1hbmRBcmd1bWVudHNbMF0uVG9Mb3dlcigpKSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJvb21FeGl0LkV4aXRMb2NrZWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNMb2NrZWQgPSBjdXJyZW50Um9vbUV4aXQuRXhpdExvY2tlZChjdXJTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gY3VycmVudFJvb21FeGl0LkxvY2tUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gY3VycmVudFJvb21FeGl0LkxvY2tUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gRW52aXJvbm1lbnQuTmV3TGluZSArIGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gY3VycmVudFJvb21FeGl0LkV4aXRUZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRSb29tID0gY3VycmVudFJvb21FeGl0LkRlc3RpbmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGN1cnJlbnRSb29tRXhpdC5FeGl0VGltZTtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlBsYXllci5Nb25leSAtPSBjdXJyZW50Um9vbUV4aXQuRXhpdENvc3Q7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJTdGF0ZS5DdXJyZW50Um9vbS5BdXRvRXhpdCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGl0ID0gY3VyU3RhdGUuQ3VycmVudFJvb20uQXV0b0V4aXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IEVudmlyb25tZW50Lk5ld0xpbmUgKyBleGl0LkV4aXRUZXh0ICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJTdGF0ZS5DdXJyZW50Um9vbSA9IGV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuVGltZVRvRmxpZ2h0IC09IGV4aXQuRXhpdFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhdGUuUGxheWVyLk1vbmV5IC09IGV4aXQuRXhpdENvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJJbnZhbGlkIGRlc3RpbmF0aW9uXCIgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMb29rOklDb21tYW5kXHJcbiAgICB7XHJcbnB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG57XHJcbiAgICByZXR1cm4gXCJMb29rXCI7XHJcbn1wdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG57XHJcbiAgICByZXR1cm4gbmV3W117XCJsb29rXCIsIFwibFwiLCBcInBlZXJcIiwgXCJzdGFyZVwiLCBcImV4YW1pbmVcIn07XHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxvb2sgYXQgYW4gaXRlbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9XHJcbnN0cmluZy5Gb3JtYXQoXCJ7MH17MX17Mn1cIixjdXJTdGF0ZS5DdXJyZW50Um9vbS5TaG9ydFJvb21EZXNjLEVudmlyb25tZW50Lk5ld0xpbmUsY3VyU3RhdGUuQ3VycmVudFJvb20uTG9uZ1Jvb21EZXNjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHNbMF0uVG9Mb3dlcigpID09IFwiYXRcIilcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kQXJndW1lbnRzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPHN0cmluZz4oY29tbWFuZEFyZ3VtZW50cywxKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9Mb29rID0gY29tbWFuZEFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gY3VyU3RhdGUuQ3VycmVudFJvb20uRXhpdHMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjdXJyZW50Um9vbUV4aXQuRXhpdE5hbWVzLHRvTG9vay5Ub0xvd2VyKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gc3RyaW5nLkZvcm1hdChcInswfXsxfVwiLGN1cnJlbnRSb29tRXhpdC5FeGl0RGVzYyxFbnZpcm9ubWVudC5OZXdMaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
