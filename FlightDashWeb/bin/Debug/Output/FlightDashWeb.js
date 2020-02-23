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


                var ResourceDictionary_a2c0545618ee4e0b8bf9fccb15ab8cb1 = new Bridge.global.Windows.UI.Xaml.ResourceDictionary();
                this.Resources = ResourceDictionary_a2c0545618ee4e0b8bf9fccb15ab8cb1;

                this.Resources = ResourceDictionary_a2c0545618ee4e0b8bf9fccb15ab8cb1;







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



                var Grid_96ac63b58f1e440189ac1eb7d8e21370 = new Bridge.global.Windows.UI.Xaml.Controls.Grid();
                Grid_96ac63b58f1e440189ac1eb7d8e21370.HorizontalAlignment = Bridge.global.Windows.UI.Xaml.HorizontalAlignment.Stretch;
                Grid_96ac63b58f1e440189ac1eb7d8e21370.VerticalAlignment = Bridge.global.Windows.UI.Xaml.VerticalAlignment.Stretch;
                var ColumnDefinition_827b39cc9f814ebb8a276e6480c80a80 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_827b39cc9f814ebb8a276e6480c80a80.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_21d7066682964cc1a2dafc38171d809a = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_21d7066682964cc1a2dafc38171d809a.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_993ae0ac4b5e40d88955b621fc509373 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_993ae0ac4b5e40d88955b621fc509373.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_e7e4cfa07ef84e828ca0c0cfeee287c9 = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_e7e4cfa07ef84e828ca0c0cfeee287c9.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var ColumnDefinition_3518311b3edb4ca6bee8245fcf35241f = new Bridge.global.Windows.UI.Xaml.Controls.ColumnDefinition();
                ColumnDefinition_3518311b3edb4ca6bee8245fcf35241f.Width = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_96ac63b58f1e440189ac1eb7d8e21370.ColumnDefinitions.add(ColumnDefinition_827b39cc9f814ebb8a276e6480c80a80);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.ColumnDefinitions.add(ColumnDefinition_21d7066682964cc1a2dafc38171d809a);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.ColumnDefinitions.add(ColumnDefinition_993ae0ac4b5e40d88955b621fc509373);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.ColumnDefinitions.add(ColumnDefinition_e7e4cfa07ef84e828ca0c0cfeee287c9);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.ColumnDefinitions.add(ColumnDefinition_3518311b3edb4ca6bee8245fcf35241f);

                var RowDefinition_eb37e9ca3f4049b48ec5b84529727189 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_eb37e9ca3f4049b48ec5b84529727189.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_a640fa7dc4594aa1894add781f209301 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_a640fa7dc4594aa1894add781f209301.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_38d93cdb50004ebb80f5e1524a0a64e5 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_38d93cdb50004ebb80f5e1524a0a64e5.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_9a61462816064fb9b3b8d3ba645bca9b = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_9a61462816064fb9b3b8d3ba645bca9b.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_9b54ec93642c4b62ab5046c5e26f91fb = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_9b54ec93642c4b62ab5046c5e26f91fb.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_0e3bf3b4132141bf9d0b40764f5e8435 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_0e3bf3b4132141bf9d0b40764f5e8435.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_144ac5c35b864a99b1e25645d33d9cfc = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_144ac5c35b864a99b1e25645d33d9cfc.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_a710272a27004d3a9a12df054b835b46 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_a710272a27004d3a9a12df054b835b46.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_155df23c874440dc9374b94d0ab99cb2 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_155df23c874440dc9374b94d0ab99cb2.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                var RowDefinition_bb70903ab4744f23a071c87d4c9265b0 = new Bridge.global.Windows.UI.Xaml.Controls.RowDefinition();
                RowDefinition_bb70903ab4744f23a071c87d4c9265b0.Height = new Bridge.global.Windows.UI.Xaml.GridLength.$ctor2(1.0, Bridge.global.Windows.UI.Xaml.GridUnitType.Star);

                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_eb37e9ca3f4049b48ec5b84529727189);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_a640fa7dc4594aa1894add781f209301);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_38d93cdb50004ebb80f5e1524a0a64e5);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_9a61462816064fb9b3b8d3ba645bca9b);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_9b54ec93642c4b62ab5046c5e26f91fb);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_0e3bf3b4132141bf9d0b40764f5e8435);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_144ac5c35b864a99b1e25645d33d9cfc);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_a710272a27004d3a9a12df054b835b46);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_155df23c874440dc9374b94d0ab99cb2);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.RowDefinitions.add(RowDefinition_bb70903ab4744f23a071c87d4c9265b0);

                var ScrollViewer_77679d1601414af1ab93029f55fdd4ac = new Bridge.global.Windows.UI.Xaml.Controls.ScrollViewer();
                this.RegisterName$1("outputScroll", ScrollViewer_77679d1601414af1ab93029f55fdd4ac);
                ScrollViewer_77679d1601414af1ab93029f55fdd4ac.Name = "outputScroll";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ScrollViewer_77679d1601414af1ab93029f55fdd4ac, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ScrollViewer_77679d1601414af1ab93029f55fdd4ac, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ScrollViewer_77679d1601414af1ab93029f55fdd4ac, 7);
                ScrollViewer_77679d1601414af1ab93029f55fdd4ac.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                var TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc = new Bridge.global.Windows.UI.Xaml.Controls.TextBlock();
                TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc.Text = "";
                this.RegisterName$1("output", TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc);
                TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc.Name = "output";
                TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc.Background = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 0, $t.G = 0, $t.B = 0, $t));
                TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc.Foreground = new Bridge.global.Windows.UI.Xaml.Media.SolidColorBrush.$ctor1(($t = new Bridge.global.Windows.UI.Color(), $t.A = 255, $t.R = 255, $t.G = 255, $t.B = 255, $t));

                ScrollViewer_77679d1601414af1ab93029f55fdd4ac.Content = TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc;


                var ListBox_511c1f748a5844b78a78d1178fa238c8 = new Bridge.global.Windows.UI.Xaml.Controls.ListBox();
                this.RegisterName$1("pastInputList", ListBox_511c1f748a5844b78a78d1178fa238c8);
                ListBox_511c1f748a5844b78a78d1178fa238c8.Name = "pastInputList";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(ListBox_511c1f748a5844b78a78d1178fa238c8, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(ListBox_511c1f748a5844b78a78d1178fa238c8, 4);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(ListBox_511c1f748a5844b78a78d1178fa238c8, 7);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRowSpan(ListBox_511c1f748a5844b78a78d1178fa238c8, 2);

                var TextBox_cac088f8d1c44d49ae3dcf5ac3353c06 = new Bridge.global.Windows.UI.Xaml.Controls.TextBox();
                this.RegisterName$1("input", TextBox_cac088f8d1c44d49ae3dcf5ac3353c06);
                TextBox_cac088f8d1c44d49ae3dcf5ac3353c06.Name = "input";
                TextBox_cac088f8d1c44d49ae3dcf5ac3353c06.Text = "";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(TextBox_cac088f8d1c44d49ae3dcf5ac3353c06, 0);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(TextBox_cac088f8d1c44d49ae3dcf5ac3353c06, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(TextBox_cac088f8d1c44d49ae3dcf5ac3353c06, 9);
                TextBox_cac088f8d1c44d49ae3dcf5ac3353c06.addKeyDown(Bridge.fn.cacheBind(this, this.input_KeyDown));

                var Button_c3be56546eca414f970e36ab614f78b8 = new Bridge.global.Windows.UI.Xaml.Controls.Button();
                this.RegisterName$1("actionButton", Button_c3be56546eca414f970e36ab614f78b8);
                Button_c3be56546eca414f970e36ab614f78b8.Name = "actionButton";
                Button_c3be56546eca414f970e36ab614f78b8.Content = "Action";
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumn(Button_c3be56546eca414f970e36ab614f78b8, 3);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetColumnSpan(Button_c3be56546eca414f970e36ab614f78b8, 1);
                Bridge.global.Windows.UI.Xaml.Controls.Grid.SetRow(Button_c3be56546eca414f970e36ab614f78b8, 9);
                Button_c3be56546eca414f970e36ab614f78b8.addClick(Bridge.fn.cacheBind(this, this.actionButton_Click));

                Grid_96ac63b58f1e440189ac1eb7d8e21370.Children.add(ScrollViewer_77679d1601414af1ab93029f55fdd4ac);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.Children.add(ListBox_511c1f748a5844b78a78d1178fa238c8);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.Children.add(TextBox_cac088f8d1c44d49ae3dcf5ac3353c06);
                Grid_96ac63b58f1e440189ac1eb7d8e21370.Children.add(Button_c3be56546eca414f970e36ab614f78b8);


                this.Content = Grid_96ac63b58f1e440189ac1eb7d8e21370;



                this.output = TextBlock_c409bbe7c2ff4bbbbe701ae03ace98dc;
                this.outputScroll = ScrollViewer_77679d1601414af1ab93029f55fdd4ac;
                this.pastInputList = ListBox_511c1f748a5844b78a78d1178fa238c8;
                this.input = TextBox_cac088f8d1c44d49ae3dcf5ac3353c06;
                this.actionButton = Button_c3be56546eca414f970e36ab614f78b8;



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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGbGlnaHREYXNoV2ViLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJvYmovRGVidWcvQXBwLnhhbWwuZy5jcyIsIm9iai9EZWJ1Zy9NYWluUGFnZS54YW1sLmcuY3MiLCJBcHAueGFtbC5jcyIsIkdhbWUuY3MiLCJNYWluUGFnZS54YW1sLmNzIiwiUGxheWVyLmNzIiwiUm9vbS5jcyIsIkNvbW1hbmRzL0NoZWNrSW4uY3MiLCJDb21tYW5kcy9Hby5jcyIsIkNvbW1hbmRzL0xvb2suY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztvQkFRUUEsV0FBMkJBLEFBQU9BO29CQUNsQ0EsT0FBT0EsbUVBQTZEQTs7Ozs7Ozs7OztvQkNEcEVBLFdBQTJCQSxBQUFPQTtvQkFDbENBLE9BQU9BLG1FQUE2REE7Ozs7Ozs7OztZRG1FeEVBLElBQUlBOzs7Ozs7Ozs7Z0JFL0RJQTs7O2dCQUlBQSxlQUFlQSxJQUFJQTtnQkFDbkJBLHlDQUF5QkE7Ozs7O2dCRnVCekJBLElBQUlBO29CQUNBQTs7Z0JBQ0pBOzs7Z0JBR0FBLElBQUlBO29CQUVBQSxBQUFDQSxZQUFtQ0EsQUFBUUE7Ozs7Z0JBSzVEQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUdBQSwwREFBMERBLElBQUlBO2dCQUM5REEsaUJBQWlCQTs7Z0JBRWpCQSxpQkFBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0d3UndDQSxLQUFJQTs7Ozs7O2dCQWhVakRBO2dCQUNBQSxjQUFPQSxJQUFJQTtnQkFDWEE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUEsa0JBQWFBLElBQUlBO2dCQUNqQkEsa0JBQWFBLElBQUlBO2dCQUNqQkEsa0JBQWFBLElBQUlBO2dCQUNqQkE7Z0JBQ0FBOzs7O2dCQUtBQSxnQkFBZ0JBLFVBQUlBOztnQkFR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aURBQThCQTs0QkFFOUJBLGVBQWVBLDJCQUEyQkE7NEJBQzFDQSxJQUFJQTtnQ0FFQUEsV0FBU0E7Z0NBQ1RBLGlEQUF5QkE7Z0NBQ3pCQSwrQkFBVUEsaUJBQXNCQTtnQ0FDaENBOzs7d0JBR1JBLFdBQVNBLG9DQUEyQkE7d0JBQ3BDQSx1QkFBdUJBO3dCQUN2QkEsaURBQXlCQTt3QkFDekJBLGtEQUF5QkE7d0JBQ3pCQSwrQkFBVUE7O3dCQUVWQSxPQUFPQSxpQ0FBaUNBOzRCQUVwQ0EsV0FBV0E7NEJBQ1hBLCtCQUFVQSxpQkFBc0JBLHdCQUFnQkE7NEJBQ2hEQSx1QkFBdUJBOzRCQUN2QkEsaURBQXlCQTs0QkFDekJBLGtEQUF5QkE7NEJBQ3pCQSwrQkFBVUE7Ozt3QkFHZEE7Ozs7Ozs7O2dCQUdKQSxXQUFTQSx5QkFBd0JBO2dCQUNqQ0E7Ozs7Ozs7Ozs7Ozs7OztnQkN0RFJBOzs7Z0JBR0FBLE9BQU9BOzs7Z0JBSUNBOzt1Q0FHd0JBLGtCQUEyQkEsVUFBZUE7O2dCQUVsRUEsSUFBSUE7b0JBRUFBLFdBQ2hCQSxrQ0FBMEJBLG9DQUFtQ0EsTUFBb0JBO29CQUNqRUE7O29CQUlBQSxJQUFJQTt3QkFDQUEsbUJBQW1CQSw0QkFBdUNBLDRCQUFvQ0E7O29CQUNsR0EsYUFBYUE7b0JBQ2JBLDBCQUFnQ0E7Ozs7NEJBRTVCQSxJQUFJQSxzQkFBd0NBLDJCQUEwQkEsc0JBQWxDQTtnQ0FFaENBLFdBQVNBLCtCQUF1QkEsMEJBQXlCQTtnQ0FDekRBOzs7Ozs7Ozs7OztnQkFNWkE7Z0JBQ0FBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIDxDU0hUTUw1PjxYYW1sSGFzaD45NzQzQjkwMzIxOURDRTNGMDUzM0I5NTU1ODNFM0I0QzwvWGFtbEhhc2g+PFBhc3NOdW1iZXI+MjwvUGFzc051bWJlcj48Q29tcGlsYXRpb25EYXRlPjIvMjMvMjAyMCAxOjAzOjQyIEFNPC9Db21waWxhdGlvbkRhdGU+PC9DU0hUTUw1PlxyXG5cclxuXHJcblxyXG5wdWJsaWMgc3RhdGljIGNsYXNzIMeAx4BGbGlnaHRkYXNod2Vix4DHgENvbXBvbmVudMeAx4BBcHDHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5BcHApO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuVHlwZUluc3RhbnRpYXRpb25IZWxwZXIuSW5zdGFudGlhdGUodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViXHJcbntcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XHJcbi8vICAgICBUaGlzIGNvZGUgd2FzIGF1dG8tZ2VuZXJhdGVkIGJ5IFwiQyMvWEFNTCBmb3IgSFRNTDVcIlxyXG4vL1xyXG4vLyAgICAgQ2hhbmdlcyB0byB0aGlzIGZpbGUgbWF5IGNhdXNlIGluY29ycmVjdCBiZWhhdmlvciBhbmQgd2lsbCBiZSBsb3N0IGlmXHJcbi8vICAgICB0aGUgY29kZSBpcyByZWdlbmVyYXRlZC5cclxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxucGFydGlhbCBjbGFzcyBBcHAgOiBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5BcHBsaWNhdGlvblxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxuXHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcQXBwLnhhbWxcIjtcclxuICAgICAgICAgICAgfVxyXG4jcHJhZ21hIHdhcm5pbmcgcmVzdG9yZSAwMTg0XHJcblxyXG5cclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0Um9vdFBhdGggPSBAXCJPdXRwdXRcXFwiO1xyXG5nbG9iYWw6OkNTSFRNTDUuSW50ZXJuYWwuU3RhcnR1cEFzc2VtYmx5SW5mby5PdXRwdXRBcHBGaWxlc1BhdGggPSBAXCJhcHAtY3NodG1sNVxcYXBwXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0TGlicmFyaWVzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxsaWJzXFxcIjtcclxuZ2xvYmFsOjpDU0hUTUw1LkludGVybmFsLlN0YXJ0dXBBc3NlbWJseUluZm8uT3V0cHV0UmVzb3VyY2VzUGF0aCA9IEBcImFwcC1jc2h0bWw1XFxyZXNcXFwiO1xyXG5cclxuXHJcbnZhciBSZXNvdXJjZURpY3Rpb25hcnlfYTJjMDU0NTYxOGVlNGUwYjhiZjlmY2NiMTVhYjhjYjEgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuUmVzb3VyY2VEaWN0aW9uYXJ5KCk7XHJcbnRoaXMuUmVzb3VyY2VzID0gUmVzb3VyY2VEaWN0aW9uYXJ5X2EyYzA1NDU2MThlZTRlMGI4YmY5ZmNjYjE1YWI4Y2IxO1xyXG5cclxudGhpcy5SZXNvdXJjZXMgPSBSZXNvdXJjZURpY3Rpb25hcnlfYTJjMDU0NTYxOGVlNGUwYjhiZjlmY2NiMTVhYjhjYjE7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbnB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxue1xyXG4gICAgbmV3IEFwcCgpO1xyXG59XHJcblxyXG59XHJcblxyXG5cclxufVxyXG4iLCIvLyA8Q1NIVE1MNT48WGFtbEhhc2g+QkU5OTJENkIzNUMzREQ4RDhGRDBEM0Q0QTQ2M0JDRDU8L1hhbWxIYXNoPjxQYXNzTnVtYmVyPjI8L1Bhc3NOdW1iZXI+PENvbXBpbGF0aW9uRGF0ZT4yLzIzLzIwMjAgMTowMzo0MiBBTTwvQ29tcGlsYXRpb25EYXRlPjwvQ1NIVE1MNT5cclxuXHJcblxyXG5cclxucHVibGljIHN0YXRpYyBjbGFzcyDHgMeARmxpZ2h0ZGFzaHdlYseAx4BDb21wb25lbnTHgMeATWFpbnBhZ2XHgMeAWGFtbMeAx4BGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0IEluc3RhbnRpYXRlKClcclxuICAgIHtcclxuICAgICAgICBnbG9iYWw6OlN5c3RlbS5UeXBlIHR5cGUgPSB0eXBlb2YoRmxpZ2h0RGFzaFdlYi5NYWluUGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6Q1NIVE1MNS5JbnRlcm5hbC5UeXBlSW5zdGFudGlhdGlvbkhlbHBlci5JbnN0YW50aWF0ZSh0eXBlKTtcclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDxhdXRvLWdlbmVyYXRlZD5cclxuLy8gICAgIFRoaXMgY29kZSB3YXMgYXV0by1nZW5lcmF0ZWQgYnkgXCJDIy9YQU1MIGZvciBIVE1MNVwiXHJcbi8vXHJcbi8vICAgICBDaGFuZ2VzIHRvIHRoaXMgZmlsZSBtYXkgY2F1c2UgaW5jb3JyZWN0IGJlaGF2aW9yIGFuZCB3aWxsIGJlIGxvc3QgaWZcclxuLy8gICAgIHRoZSBjb2RlIGlzIHJlZ2VuZXJhdGVkLlxyXG4vLyA8L2F1dG8tZ2VuZXJhdGVkPlxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcblxyXG5wYXJ0aWFsIGNsYXNzIE1haW5QYWdlIDogZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUGFnZVxyXG57XHJcblxyXG4jcHJhZ21hIHdhcm5pbmcgZGlzYWJsZSAxNjksIDY0OSwgMDYyOCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE2OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciB1c2VkJyksIENTMDY0OSAoJ2ZpZWxkIC4uLiBpcyBuZXZlciBhc3NpZ25lZCB0bywgYW5kIHdpbGwgYWx3YXlzIGhhdmUgaXRzIGRlZmF1bHQgdmFsdWUgbnVsbCcpLCBhbmQgQ1MwNjI4ICgnbWVtYmVyIDogbmV3IHByb3RlY3RlZCBtZW1iZXIgZGVjbGFyZWQgaW4gc2VhbGVkIGNsYXNzJylcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlRleHRCbG9jayBvdXRwdXQ7XHJcbnByb3RlY3RlZCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5TY3JvbGxWaWV3ZXIgb3V0cHV0U2Nyb2xsO1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCBwYXN0SW5wdXRMaXN0O1xyXG5wcm90ZWN0ZWQgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJveCBpbnB1dDtcclxucHJvdGVjdGVkIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkJ1dHRvbiBhY3Rpb25CdXR0b247XHJcblxyXG5cclxuI3ByYWdtYSB3YXJuaW5nIHJlc3RvcmUgMTY5LCA2NDksIDA2MjhcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBfY29udGVudExvYWRlZDtcclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplQ29tcG9uZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfY29udGVudExvYWRlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgX2NvbnRlbnRMb2FkZWQgPSB0cnVlO1xyXG5cclxuI3ByYWdtYSB3YXJuaW5nIGRpc2FibGUgMDE4NCAvLyBQcmV2ZW50cyB3YXJuaW5nIENTMDE4NCAoJ1RoZSBnaXZlbiBleHByZXNzaW9uIGlzIG5ldmVyIG9mIHRoZSBwcm92aWRlZCAoJ3R5cGUnKSB0eXBlJylcclxuICAgICAgICAgICAgaWYgKHRoaXMgaXMgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuVUlFbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAoKGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLlVJRWxlbWVudCkob2JqZWN0KXRoaXMpLlhhbWxTb3VyY2VQYXRoID0gQFwiRmxpZ2h0RGFzaFdlYlxcTWFpblBhZ2UueGFtbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiNwcmFnbWEgd2FybmluZyByZXN0b3JlIDAxODRcclxuXHJcblxyXG5cclxudmFyIEdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZCgpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLkhvcml6b250YWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Ib3Jpem9udGFsQWxpZ25tZW50LlN0cmV0Y2g7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuVmVydGljYWxBbGlnbm1lbnQgPSBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5WZXJ0aWNhbEFsaWdubWVudC5TdHJldGNoO1xyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl84MjdiMzljYzlmODE0ZWJiOGEyNzZlNjQ4MGM4MGE4MCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fODI3YjM5Y2M5ZjgxNGViYjhhMjc2ZTY0ODBjODBhODAuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzIxZDcwNjY2ODI5NjRjYzFhMmRhZmMzODE3MWQ4MDlhID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl8yMWQ3MDY2NjgyOTY0Y2MxYTJkYWZjMzgxNzFkODA5YS5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIENvbHVtbkRlZmluaXRpb25fOTkzYWUwYWM0YjVlNDBkODg5NTViNjIxZmM1MDkzNzMgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQ29sdW1uRGVmaW5pdGlvbigpO1xyXG5Db2x1bW5EZWZpbml0aW9uXzk5M2FlMGFjNGI1ZTQwZDg4OTU1YjYyMWZjNTA5MzczLldpZHRoID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRMZW5ndGgoMS4wLCBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkVW5pdFR5cGUuU3Rhcik7XHJcblxyXG52YXIgQ29sdW1uRGVmaW5pdGlvbl9lN2U0Y2ZhMDdlZjg0ZTgyOGNhMGMwY2ZlZWUyODdjOSA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5Db2x1bW5EZWZpbml0aW9uKCk7XHJcbkNvbHVtbkRlZmluaXRpb25fZTdlNGNmYTA3ZWY4NGU4MjhjYTBjMGNmZWVlMjg3YzkuV2lkdGggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZExlbmd0aCgxLjAsIGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkdyaWRVbml0VHlwZS5TdGFyKTtcclxuXHJcbnZhciBDb2x1bW5EZWZpbml0aW9uXzM1MTgzMTFiM2VkYjRjYTZiZWU4MjQ1ZmNmMzUyNDFmID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkNvbHVtbkRlZmluaXRpb24oKTtcclxuQ29sdW1uRGVmaW5pdGlvbl8zNTE4MzExYjNlZGI0Y2E2YmVlODI0NWZjZjM1MjQxZi5XaWR0aCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl84MjdiMzljYzlmODE0ZWJiOGEyNzZlNjQ4MGM4MGE4MCk7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fMjFkNzA2NjY4Mjk2NGNjMWEyZGFmYzM4MTcxZDgwOWEpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLkNvbHVtbkRlZmluaXRpb25zLkFkZChDb2x1bW5EZWZpbml0aW9uXzk5M2FlMGFjNGI1ZTQwZDg4OTU1YjYyMWZjNTA5MzczKTtcclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Db2x1bW5EZWZpbml0aW9ucy5BZGQoQ29sdW1uRGVmaW5pdGlvbl9lN2U0Y2ZhMDdlZjg0ZTgyOGNhMGMwY2ZlZWUyODdjOSk7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuQ29sdW1uRGVmaW5pdGlvbnMuQWRkKENvbHVtbkRlZmluaXRpb25fMzUxODMxMWIzZWRiNGNhNmJlZTgyNDVmY2YzNTI0MWYpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fZWIzN2U5Y2EzZjQwNDliNDhlYzViODQ1Mjk3MjcxODkgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2ViMzdlOWNhM2Y0MDQ5YjQ4ZWM1Yjg0NTI5NzI3MTg5LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fYTY0MGZhN2RjNDU5NGFhMTg5NGFkZDc4MWYyMDkzMDEgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2E2NDBmYTdkYzQ1OTRhYTE4OTRhZGQ3ODFmMjA5MzAxLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMzhkOTNjZGI1MDAwNGViYjgwZjVlMTUyNGEwYTY0ZTUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzM4ZDkzY2RiNTAwMDRlYmI4MGY1ZTE1MjRhMGE2NGU1LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fOWE2MTQ2MjgxNjA2NGZiOWIzYjhkM2JhNjQ1YmNhOWIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzlhNjE0NjI4MTYwNjRmYjliM2I4ZDNiYTY0NWJjYTliLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fOWI1NGVjOTM2NDJjNGI2MmFiNTA0NmM1ZTI2ZjkxZmIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzliNTRlYzkzNjQyYzRiNjJhYjUwNDZjNWUyNmY5MWZiLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMGUzYmYzYjQxMzIxNDFiZjlkMGI0MDc2NGY1ZTg0MzUgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzBlM2JmM2I0MTMyMTQxYmY5ZDBiNDA3NjRmNWU4NDM1LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMTQ0YWM1YzM1Yjg2NGE5OWIxZTI1NjQ1ZDMzZDljZmMgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzE0NGFjNWMzNWI4NjRhOTliMWUyNTY0NWQzM2Q5Y2ZjLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fYTcxMDI3MmEyNzAwNGQzYTlhMTJkZjA1NGI4MzViNDYgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2E3MTAyNzJhMjcwMDRkM2E5YTEyZGYwNTRiODM1YjQ2LkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fMTU1ZGYyM2M4NzQ0NDBkYzkzNzRiOTRkMGFiOTljYjIgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uXzE1NWRmMjNjODc0NDQwZGM5Mzc0Yjk0ZDBhYjk5Y2IyLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxudmFyIFJvd0RlZmluaXRpb25fYmI3MDkwM2FiNDc0NGYyM2EwNzFjODdkNGM5MjY1YjAgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuUm93RGVmaW5pdGlvbigpO1xyXG5Sb3dEZWZpbml0aW9uX2JiNzA5MDNhYjQ3NDRmMjNhMDcxYzg3ZDRjOTI2NWIwLkhlaWdodCA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5HcmlkTGVuZ3RoKDEuMCwgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuR3JpZFVuaXRUeXBlLlN0YXIpO1xyXG5cclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9lYjM3ZTljYTNmNDA0OWI0OGVjNWI4NDUyOTcyNzE4OSk7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fYTY0MGZhN2RjNDU5NGFhMTg5NGFkZDc4MWYyMDkzMDEpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzM4ZDkzY2RiNTAwMDRlYmI4MGY1ZTE1MjRhMGE2NGU1KTtcclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl85YTYxNDYyODE2MDY0ZmI5YjNiOGQzYmE2NDViY2E5Yik7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fOWI1NGVjOTM2NDJjNGI2MmFiNTA0NmM1ZTI2ZjkxZmIpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzBlM2JmM2I0MTMyMTQxYmY5ZDBiNDA3NjRmNWU4NDM1KTtcclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl8xNDRhYzVjMzViODY0YTk5YjFlMjU2NDVkMzNkOWNmYyk7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuUm93RGVmaW5pdGlvbnMuQWRkKFJvd0RlZmluaXRpb25fYTcxMDI3MmEyNzAwNGQzYTlhMTJkZjA1NGI4MzViNDYpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLlJvd0RlZmluaXRpb25zLkFkZChSb3dEZWZpbml0aW9uXzE1NWRmMjNjODc0NDQwZGM5Mzc0Yjk0ZDBhYjk5Y2IyKTtcclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5Sb3dEZWZpbml0aW9ucy5BZGQoUm93RGVmaW5pdGlvbl9iYjcwOTAzYWI0NzQ0ZjIzYTA3MWM4N2Q0YzkyNjViMCk7XHJcblxyXG52YXIgU2Nyb2xsVmlld2VyXzc3Njc5ZDE2MDE0MTRhZjFhYjkzMDI5ZjU1ZmRkNGFjID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLlNjcm9sbFZpZXdlcigpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcIm91dHB1dFNjcm9sbFwiLCBTY3JvbGxWaWV3ZXJfNzc2NzlkMTYwMTQxNGFmMWFiOTMwMjlmNTVmZGQ0YWMpO1xyXG5TY3JvbGxWaWV3ZXJfNzc2NzlkMTYwMTQxNGFmMWFiOTMwMjlmNTVmZGQ0YWMuTmFtZSA9IFwib3V0cHV0U2Nyb2xsXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKFNjcm9sbFZpZXdlcl83NzY3OWQxNjAxNDE0YWYxYWI5MzAyOWY1NWZkZDRhYywwKTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW5TcGFuKFNjcm9sbFZpZXdlcl83NzY3OWQxNjAxNDE0YWYxYWI5MzAyOWY1NWZkZDRhYyw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3dTcGFuKFNjcm9sbFZpZXdlcl83NzY3OWQxNjAxNDE0YWYxYWI5MzAyOWY1NWZkZDRhYyw3KTtcclxuU2Nyb2xsVmlld2VyXzc3Njc5ZDE2MDE0MTRhZjFhYjkzMDI5ZjU1ZmRkNGFjLkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcbnZhciBUZXh0QmxvY2tfYzQwOWJiZTdjMmZmNGJiYmJlNzAxYWUwM2FjZTk4ZGMgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuVGV4dEJsb2NrKCk7XHJcblRleHRCbG9ja19jNDA5YmJlN2MyZmY0YmJiYmU3MDFhZTAzYWNlOThkYy5UZXh0ID0gQFwiXCI7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwib3V0cHV0XCIsIFRleHRCbG9ja19jNDA5YmJlN2MyZmY0YmJiYmU3MDFhZTAzYWNlOThkYyk7XHJcblRleHRCbG9ja19jNDA5YmJlN2MyZmY0YmJiYmU3MDFhZTAzYWNlOThkYy5OYW1lID0gXCJvdXRwdXRcIjtcclxuVGV4dEJsb2NrX2M0MDliYmU3YzJmZjRiYmJiZTcwMWFlMDNhY2U5OGRjLkJhY2tncm91bmQgPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuTWVkaWEuU29saWRDb2xvckJydXNoKG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuQ29sb3IoKSB7IEEgPSAoYnl0ZSkyNTUsIFIgPSAoYnl0ZSkwLCBHID0gKGJ5dGUpMCwgQiA9IChieXRlKTAgfSk7XHJcblRleHRCbG9ja19jNDA5YmJlN2MyZmY0YmJiYmU3MDFhZTAzYWNlOThkYy5Gb3JlZ3JvdW5kID0gbmV3IGdsb2JhbDo6V2luZG93cy5VSS5YYW1sLk1lZGlhLlNvbGlkQ29sb3JCcnVzaChuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLkNvbG9yKCkgeyBBID0gKGJ5dGUpMjU1LCBSID0gKGJ5dGUpMjU1LCBHID0gKGJ5dGUpMjU1LCBCID0gKGJ5dGUpMjU1IH0pO1xyXG5cclxuU2Nyb2xsVmlld2VyXzc3Njc5ZDE2MDE0MTRhZjFhYjkzMDI5ZjU1ZmRkNGFjLkNvbnRlbnQgPSBUZXh0QmxvY2tfYzQwOWJiZTdjMmZmNGJiYmJlNzAxYWUwM2FjZTk4ZGM7XHJcblxyXG5cclxudmFyIExpc3RCb3hfNTExYzFmNzQ4YTU4NDRiNzhhNzhkMTE3OGZhMjM4YzggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuTGlzdEJveCgpO1xyXG50aGlzLlJlZ2lzdGVyTmFtZShcInBhc3RJbnB1dExpc3RcIiwgTGlzdEJveF81MTFjMWY3NDhhNTg0NGI3OGE3OGQxMTc4ZmEyMzhjOCk7XHJcbkxpc3RCb3hfNTExYzFmNzQ4YTU4NDRiNzhhNzhkMTE3OGZhMjM4YzguTmFtZSA9IFwicGFzdElucHV0TGlzdFwiO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtbihMaXN0Qm94XzUxMWMxZjc0OGE1ODQ0Yjc4YTc4ZDExNzhmYTIzOGM4LDApO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oTGlzdEJveF81MTFjMWY3NDhhNTg0NGI3OGE3OGQxMTc4ZmEyMzhjOCw0KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3coTGlzdEJveF81MTFjMWY3NDhhNTg0NGI3OGE3OGQxMTc4ZmEyMzhjOCw3KTtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRSb3dTcGFuKExpc3RCb3hfNTExYzFmNzQ4YTU4NDRiNzhhNzhkMTE3OGZhMjM4YzgsMik7XHJcblxyXG52YXIgVGV4dEJveF9jYWMwODhmOGQxYzQ0ZDQ5YWUzZGNmNWFjMzM1M2MwNiA9IG5ldyBnbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5UZXh0Qm94KCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwiaW5wdXRcIiwgVGV4dEJveF9jYWMwODhmOGQxYzQ0ZDQ5YWUzZGNmNWFjMzM1M2MwNik7XHJcblRleHRCb3hfY2FjMDg4ZjhkMWM0NGQ0OWFlM2RjZjVhYzMzNTNjMDYuTmFtZSA9IFwiaW5wdXRcIjtcclxuVGV4dEJveF9jYWMwODhmOGQxYzQ0ZDQ5YWUzZGNmNWFjMzM1M2MwNi5UZXh0ID0gQFwiXCI7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uKFRleHRCb3hfY2FjMDg4ZjhkMWM0NGQ0OWFlM2RjZjVhYzMzNTNjMDYsMCk7XHJcbmdsb2JhbDo6V2luZG93cy5VSS5YYW1sLkNvbnRyb2xzLkdyaWQuU2V0Q29sdW1uU3BhbihUZXh0Qm94X2NhYzA4OGY4ZDFjNDRkNDlhZTNkY2Y1YWMzMzUzYzA2LDMpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhUZXh0Qm94X2NhYzA4OGY4ZDFjNDRkNDlhZTNkY2Y1YWMzMzUzYzA2LDkpO1xyXG5UZXh0Qm94X2NhYzA4OGY4ZDFjNDRkNDlhZTNkY2Y1YWMzMzUzYzA2LktleURvd24gKz0gaW5wdXRfS2V5RG93bjtcclxuXHJcbnZhciBCdXR0b25fYzNiZTU2NTQ2ZWNhNDE0Zjk3MGUzNmFiNjE0Zjc4YjggPSBuZXcgZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuQnV0dG9uKCk7XHJcbnRoaXMuUmVnaXN0ZXJOYW1lKFwiYWN0aW9uQnV0dG9uXCIsIEJ1dHRvbl9jM2JlNTY1NDZlY2E0MTRmOTcwZTM2YWI2MTRmNzhiOCk7XHJcbkJ1dHRvbl9jM2JlNTY1NDZlY2E0MTRmOTcwZTM2YWI2MTRmNzhiOC5OYW1lID0gXCJhY3Rpb25CdXR0b25cIjtcclxuQnV0dG9uX2MzYmU1NjU0NmVjYTQxNGY5NzBlMzZhYjYxNGY3OGI4LkNvbnRlbnQgPSBAXCJBY3Rpb25cIjtcclxuZ2xvYmFsOjpXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHMuR3JpZC5TZXRDb2x1bW4oQnV0dG9uX2MzYmU1NjU0NmVjYTQxNGY5NzBlMzZhYjYxNGY3OGI4LDMpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldENvbHVtblNwYW4oQnV0dG9uX2MzYmU1NjU0NmVjYTQxNGY5NzBlMzZhYjYxNGY3OGI4LDEpO1xyXG5nbG9iYWw6OldpbmRvd3MuVUkuWGFtbC5Db250cm9scy5HcmlkLlNldFJvdyhCdXR0b25fYzNiZTU2NTQ2ZWNhNDE0Zjk3MGUzNmFiNjE0Zjc4YjgsOSk7XHJcbkJ1dHRvbl9jM2JlNTY1NDZlY2E0MTRmOTcwZTM2YWI2MTRmNzhiOC5DbGljayArPSBhY3Rpb25CdXR0b25fQ2xpY2s7XHJcblxyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLkNoaWxkcmVuLkFkZChTY3JvbGxWaWV3ZXJfNzc2NzlkMTYwMTQxNGFmMWFiOTMwMjlmNTVmZGQ0YWMpO1xyXG5HcmlkXzk2YWM2M2I1OGYxZTQ0MDE4OWFjMWViN2Q4ZTIxMzcwLkNoaWxkcmVuLkFkZChMaXN0Qm94XzUxMWMxZjc0OGE1ODQ0Yjc4YTc4ZDExNzhmYTIzOGM4KTtcclxuR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MC5DaGlsZHJlbi5BZGQoVGV4dEJveF9jYWMwODhmOGQxYzQ0ZDQ5YWUzZGNmNWFjMzM1M2MwNik7XHJcbkdyaWRfOTZhYzYzYjU4ZjFlNDQwMTg5YWMxZWI3ZDhlMjEzNzAuQ2hpbGRyZW4uQWRkKEJ1dHRvbl9jM2JlNTY1NDZlY2E0MTRmOTcwZTM2YWI2MTRmNzhiOCk7XHJcblxyXG5cclxudGhpcy5Db250ZW50ID0gR3JpZF85NmFjNjNiNThmMWU0NDAxODlhYzFlYjdkOGUyMTM3MDtcclxuXHJcblxyXG5cclxub3V0cHV0ID0gVGV4dEJsb2NrX2M0MDliYmU3YzJmZjRiYmJiZTcwMWFlMDNhY2U5OGRjO1xyXG5vdXRwdXRTY3JvbGwgPSBTY3JvbGxWaWV3ZXJfNzc2NzlkMTYwMTQxNGFmMWFiOTMwMjlmNTVmZGQ0YWM7XHJcbnBhc3RJbnB1dExpc3QgPSBMaXN0Qm94XzUxMWMxZjc0OGE1ODQ0Yjc4YTc4ZDExNzhmYTIzOGM4O1xyXG5pbnB1dCA9IFRleHRCb3hfY2FjMDg4ZjhkMWM0NGQ0OWFlM2RjZjVhYzMzNTNjMDY7XHJcbmFjdGlvbkJ1dHRvbiA9IEJ1dHRvbl9jM2JlNTY1NDZlY2E0MTRmOTcwZTM2YWI2MTRmNzhiODtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sO1xyXG51c2luZyBXaW5kb3dzLlVJLlhhbWwuQ29udHJvbHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgc2VhbGVkIHBhcnRpYWwgY2xhc3MgQXBwIDogQXBwbGljYXRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6ZUNvbXBvbmVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW50ZXIgY29uc3RydWN0aW9uIGxvZ2ljIGhlcmUuLi5cclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluUGFnZSA9IG5ldyBNYWluUGFnZSgpO1xyXG4gICAgICAgICAgICBXaW5kb3cuQ3VycmVudC5Db250ZW50ID0gbWFpblBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIEZsaWdodERhc2hXZWIuQ29tbWFuZHM7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSb29tIEN1cnJlbnRSb29tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgUGxheWVyIFBsYXllciB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBUaW1lVG9GbGlnaHQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGlzdDxJQ29tbWFuZD4gQ29tbWFuZHMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIEdhbWVPdmVyIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgYm9vbCBDaGVja2VkSW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemVHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBUaW1lVG9GbGlnaHQgPSA2MDtcclxuICAgICAgICAgICAgUGxheWVyPW5ldyBQbGF5ZXIoKTtcclxuICAgICAgICAgICAgUGxheWVyLkluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgTWFrZVJvb21zKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzLkFkZChuZXcgTG9vaygpKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBHbygpKTtcclxuICAgICAgICAgICAgQ29tbWFuZHMuQWRkKG5ldyBDaGVja0luKCkpO1xyXG4gICAgICAgICAgICBDaGVja2VkSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBNYWtlUm9vbXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsUm9vbSA9IG5ldyBSb29tXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJIb3RlbCBSb29tXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJBIHByZXR0eSBiYXNpYyBIb3RlbCByb29tLiBOb3RoaW5nIG11Y2ggb3V0IG9mIHRoZSBvcmRpbmFyeSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGhlIGJlZCBpcyB1bm1hZGUsIGxlZnQgaW4gYSBtZXNzIGZyb20geW91ciBydWRlIGF3YWtlbmluZywgYXMgdGhlIGFsYXJtIGJsaW5rcyAxMjowMCBtZXJyaWx5IGF0IHlvdSwgaWdub3JhbnQgb2YgeW91ciBkaXN0cmVzcy5cXHJcXG4gWW91ciBzdWl0Y2FzZSBsYXlzIG9uIHRoZSBmbG9vciBhdCB0aGUgZm9vdCBvZiB0aGUgYmVkLCBuZWF0bHkgcGFja2VkLlxcclxcblwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb3V0c2lkZUhvdGVsID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT3V0c2lkZSBIb3RlbFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiT3V0c2lkZSB0aGUgd2VhdGhlciBpcyBjYWxtLCBibHVlIHNraWVzLiBZb3VyIGNhciBzaXRzIGluIHRoZSBhc3NpZ25lZCBwYXJraW5nIHNwb3QgYXdhaXRpbmcgeW91XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIkluIHRoZSBkaXN0YW5jZSB5b3Ugc2VlIG9uIHRoZSBmcmVlIHJvYWQgc29tZSBoaW50cyBvZiBhIHRyYWZmaWMgamFtLlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBob3RlbEV4aXQgPSBuZXcgRXhpdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG91dHNpZGVIb3RlbCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgaG90ZWwgZG9vciBoYXMgYSBzaWduIG9uIGl0IHNheWluZyBcXFwiUGxlYXNlIHJlbWVtYmVyIHlvdXIga2V5IHdpbGwgbm90IHdvcmsgb25jZSB5b3VyIGNoZWNrb3V0IHRpbWUgaXMgcGFzdCwgcGxlYXNlIHJlbWVtYmVyIGFsbCB5b3VyIGJlbG9uZ2luZ3NcXFwiXFxyXFxuXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJMZWF2aW5nIHRoZSBob3RlbCB5b3UgaGVhciBpdCBsb2NrIGJlaGluZCB5b3UsIGRyb3BwaW5nIHlvdXIga2V5cyBvZmYgYXQgcmVjZXB0aW9uIHlvdSBoZWFkIGludG8gdGhlIGNhcnBhcmsgdG8gcGljayB1cCB5b3VyIHJlbnRhbC5cIixcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPdXRzaWRlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXcgW117XCJvdXRzaWRlXCIsXCJkb29yXCIsXCJleGl0XCIsXCJvdXRcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDUsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaG90ZWxSb29tLkV4aXRzLkFkZChob3RlbEV4aXQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcj1uZXcgUm9vbSgpIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJJbiB5b3VyIENhclwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiWW91ciByZW50YWwgaXMgYSBiYXNpYyBhdXRvbWF0aWMgdHJhbnNtaXNzaW9uIGNhclwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gIEBcIk1vZGVyYXRlIHNpemUsIGF0IG1pbmltYWwgY29zdCwgbm8gZmFuY3kgR1BTIG9yIG1lZGlhIGNlbnRlciBmb3IgeW91IG9uIHRoaXMgdHJpcC4gXHJcbiBJdCBpcyBvYnZpb3VzIHRoZSBjYXIgaGFzIHNlZW4gYmV0dGVyIGRheXMsIGFuZCBtdWNoIHdvcnNlIGRyaXZlcnMsIHdpdGggc29tZSBzdGFpbnMgZG90dGVkIG9uIHRoZSBlbXB0eSBwYXNzZW5nZXIgc2VhdCBjdXNoaW9ucy4gXHJcbllvdXIgZGFzaGJvYXJkIGlzIGEgYml0IGRpcnR5IGJ1dCBsb29raW5nIGNsb3NlciB5b3Ugbm90aWNlIHlvdXIgZnVlbCBpcyBvbmx5IGEgdGhpcmQgZnVsbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyRXhpdCA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBjYXIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJlbnRhbCBjYXIgaXMgYSBzbWFsbCwgYW5kIHNsaWdodGx5IGJhdHRlcmVkIHRoaW5nLlwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBkdW1wIHlvdXIgc3VpdGNhc2UgaW50byB0aGUgdHJ1bmssIGZpbGxpbmcgdGhlIGxpbWl0ZWQgc3BhY2UgYmVmb3JlIHBsb3BwaW5nIHlvdXJzZWxmIGRvd24gaW4gdGhlIGRyaXZlcnMgc2VhdFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkNhclwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtde1wiY2FyXCIsXCJpblwiLFwicmVudGFsXCIsIFwiZHJpdmVycyBzaWRlXCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG91dHNpZGVIb3RlbC5FeGl0cy5BZGQoY2FyRXhpdCk7XHJcbiAgICAgICAgICAgIC8vIHRvZG8gQWRkIHdhbGtcclxuICAgICAgICAgICAgdmFyIG9uRmlyc3RSb2FkID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZT1cIk9uIHRoZSBSb2FkXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgcm9hZCBvdXQgb2YgdGhlIGhvdGVsIGlzIHByZXR0eSBiYXNpYywgc3RyYWlnaHQsIGFuZCB3ZWxsIHNpZ25wb3N0ZWQgdXAgdG8gdGhlIGhpZ2h3YXkuIFwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gIEBcIkFoZWFkIG9mIHlvdSBpcyBhIHNwbGl0LCB0aGUgcm9hZCB0byB0aGUgcmlnaHQgaXMgZnJlZSwgYnV0IHRoZXJlIHNlZW1zIHRvIGJlIHNpZ25zIG9mIHRyYWZmaWMuIFxyXG5XaGVyZWFzIHRoZSByb2FkIHRvIHRoZSBsZWZ0IGNvc3RzIHlvdSAkNTAganVzdCB0byBlbnRlcixidXQgdGFrZXMgeW91IGRpcmVjdCB0byB0aGUgYWlycG9ydC5cIiwgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRDYXIgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJPbiB0aGUgV2F5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIHJvYWQgdG8gdGhlIGFpcnBvcnQgbG9va3MgcHJldHR5IG9idmlvdXMgZnJvbSBoZXJlXCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IG9uRmlyc3RSb2FkLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtdeyBcInRvIHRoZSBhaXJwb3J0XCIgLCBcImFpcnBvcnRcIiwgXCJvdXRcIiwgXCJwbGFuZVwiLCBcImZsaWdodFwifSxcclxuICAgICAgICAgICAgICAgIEV4aXRUZXh0ID0gXCJEcml2aW5nIG91dCBvZiB0aGUgaG90ZWwsIHlvdSAgc29vbiBzcG90IHRoZSBzaWduIHRvIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2FyLkV4aXRzLkFkZChzdGFydENhcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoTW90b3J3YXkgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJPbiB0aGUgVG9sbGJvb3RoIHJvdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9ydFJvb21EZXNjID0gXCJUaGUgaGlnaHdheSBsb29rcyBjbGVhciB0aHJvdWdoIHRoZSB3aG9sZSByb3V0ZS4gVGhlIG9jY2FzaW9uYWwgY2FyIHBhc3Nlcywgb3IgaXMgcGFzc2VkIGJ1dCBvdmVyYWxsICBpdCBzdGF5cyBjbGVhciByaWdodCB0aHJvdWdoIHRvIHRoZSBhaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIEBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvb3RoRW50cmFuY2UgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJUb2xsYm9vdGggUm91dGVcIixcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgdG9sbGJvb3RoIHN0YW5kcyBvbiB0aGUgc2lkZSBvZiB0aGUgcm9hZCwgaXQncyBsb25nIGJhciBsb3dlcmVkIGJsb2NraW5nIHRoZSByb3V0ZSBvblwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSB0b2xsYm9vdGhNb3RvcndheSxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gKGRlY2ltYWwpIDUwLjAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXdbXSB7XCJ0b2xsYm9vdGhcIiwgXCJwYWlkXCIsIFwiZmFzdFwifSxcclxuICAgICAgICAgICAgICAgIEV4aXRUaW1lID0gMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvbkZpcnN0Um9hZC5FeGl0cy5BZGQodG9sbGJvb3RoRW50cmFuY2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyZWVSb2FkID0gbmV3IFJvb20oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb29tTmFtZSA9IFwiT24gdGhlIGZyZWUgcm91dGVcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBoaWdod2F5IGlzIGluIHRoZSBtaWRzdCBvZiBhIGh1Z2UgdHJhZmZpYyBqYW0uIENhciBob3JucyBvZiBhbGwgc29ydHMgLCBhbmQgdGhlIG9jY2FzaW9uYWwgeWVsbCBmaWxscyB0aGUgYWlyXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBmcmVlUm9hZEVudHJhbmNlID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRnJlZSBSb3V0ZVwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdERlc2MgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGhlIGZyZWUgcm91dGUncyBlbnRyYW5jZSBsaWVzIHVuYmFycmVkLCBidXQgdGhlcmUgaXMgYSBoaW50IG9mIHJlZCBicmVhay1saWdodHMgaW4gdGhlIGRpc3RhbmNlIGFsb25nIGl0XCIsXHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGZyZWVSb2FkLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10ge1wiZnJlZVwiLCBcInJpZ2h0XCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyByaWdodCwgaW50ZW5kaW5nIHRvIHNhdmUgeW91ciBtb25leSBmb3IgbGF0ZXIsIGhvd2V2ZXIgYSBzaG9ydCB0aW1lIHVwIHRoZSByb2FkIHlvdSBjcmF3bCB0byBhIGhhbHQgYXMgeW91IGhpdCBhIGh1Z2UgdHJhZmZpYyBqYW0sXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgb25GaXJzdFJvYWQuRXhpdHMuQWRkKGZyZWVSb2FkRW50cmFuY2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhaXJwb3J0RW50cmFuY2UgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJBaXJwb3J0IERlcGFydHVyZXMgRW50cmFuY2VcIixcclxuICAgICAgICAgICAgICAgIFNob3J0Um9vbURlc2MgPSBcIlRoZSBkZXBhcnR1cmVzIGVudHJhbmNlIHRvIHRoZSBhaXJwb3J0IGxvb2tzIGEgYml0IGRpbmd5LCBidXQgd2VsbCB0cmF2ZWxlZCwgdGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4gYXMgcGVvcGxlIHN0cmVhbSBpblwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gXCJIZXJlIGFuZCB0aGVyZSBwb3N0ZXJzIGFyZSBvbiB0aGUgd2FsbCwgYWR2ZXJ0aXNpbmcgZmxpZ2h0IGRlYWxzIGZvciB2YXJpb3VzIGNvbXBhbmllcywgYW5kIGEgY291cGxlIHNlY3VyaXR5IGd1YXJkcyBzdGFuZCBuZWFyIHRoZSBlbnRyYW5jZS5cIixcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9sbGJvdGhMZWF2ZT1uZXcgRXhpdCgpe1xyXG4gICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtdIHtcIlwifSxcclxuICAgICAgICAgICAgRXhpdE5hbWUgPSBcIlRvbGxib290aCBleGl0XCIsXHJcbiAgICAgICAgICAgIEV4aXREZXNjID0gXCJcIixcclxuICAgICAgICAgICAgRXhpdFRpbWUgPSAxMCxcclxuICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgdG9sbCByb3V0ZSBhbmQgZmluZCB5b3Vyc2VsZiBpbW1lZGlhdGVseSBieSB0aGUgYWlycG9ydCByZW50YWwgZHJvcCBvZmYsIHBhcmtpbmcgeW91ciBjYXIgYW5kIGdyYWJiaW5nIHlvdXIgbHVnZ2FnZSB5b3Ugd2FsayB0aGUgZXh0cmVtZWx5IHNob3J0IGRpc3RhbmNlIHRvIGRlcGFydHVyZXNcIixcclxuICAgICAgICAgICAgRXhpdENvc3QgPSA1XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJlZVJvdXRlTGVhdmUgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gYWlycG9ydEVudHJhbmNlLFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3W10geyBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiRnJlZSByb3V0ZSBleGl0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDI1LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBsZWF2ZSB0aGUgcm91dGUgYW5kIGZpbmQgeW91cnNlbGYgaW1tZWRpYXRlbHkgYnkgdGhlIGFpcnBvcnQgcmVudGFsIGRyb3Agb2ZmLCBwYXJraW5nIHlvdXIgY2FyIGFuZCBncmFiYmluZyB5b3VyIGx1Z2dhZ2UgeW91IHdhbGsgdGhlIGV4dHJlbWVseSBzaG9ydCBkaXN0YW5jZSB0byBkZXBhcnR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRvbGxib290aE1vdG9yd2F5LkF1dG9FeGl0ID0gdG9sbGJvdGhMZWF2ZTtcclxuXHJcbiAgICAgICAgICAgIGZyZWVSb2FkLkF1dG9FeGl0ID0gZnJlZVJvdXRlTGVhdmU7XHJcbiAgICAgICAgICAgIHZhciB3YWxrID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEZXN0aW5hdGlvbiA9IGFpcnBvcnRFbnRyYW5jZSxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lcyA9IG5ldyBbXXtcIndhbGtcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlcmUgaXMgYSB3YWxraW5nIHBhdGggdG8gdGhlIGFpcnBvcnQgdGhhdCBzZWVtcyB0byBnbyB0aHJvdWdoIGEgZmV3IGZpZWxkc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIlRoZSB3YWxrIHRvIHRoZSBhaXJwb3J0IGlzIGxvbmcgYW5kIGFyZHVvdXMsIGFuZCBzZWVtcyB0byB0YWtlIGEgbG90IGxvbmdlciB0aGVuIGl0IGxvb2tlZCBmcm9tIHRoZSBtYXAgYXQgdGhlIGhvdGVsXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDEyMCxcclxuICAgICAgICAgICAgICAgIEV4aXRDb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgIEV4aXROYW1lID0gXCJXYWxraW5nIFBhdGhcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvdXRzaWRlSG90ZWwuRXhpdHMuQWRkKHdhbGspO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBpbnNpZGVBaXJwb3J0PW5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIkluc2lkZSB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiSW5zaWRlIHRoZSBhaXJwb3J0IHRoaW5ncyBhcmUgcXVpdGUgYnVzeSwgdG8gdGhlIGxlZnQgYXJlIHRoZSBjaGVjay1pbiBkZXNrcyB3aGlsZSB0byB0aGUgcmlnaHQgaXMgdGhlIFRTQSBxdWV1ZS5cIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiQnkgdGhlIFRTQSBxdWV1ZSBlbnRyYW5jZSBpcyBhIHNpZ24gc2F5aW5nIFxcXCJCdXkgVFNBIFByZUNoZWNrIHRvIHVzZSB0aGlzIHNob3J0ZXIgcXVldWUuIE9ubHkgJDg1XFxcIiBOZXh0IHRvIGEgYmFycmllciAgbGVhZGluZyB0byBhIG11Y2ggc2hvcnRlciBxdWV1ZVwiLFxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdvSW5zaWRlPW5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSBpbnNpZGVBaXJwb3J0LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkluc2lkZSBBaXJwb3J0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIGRvb3JzIGFyZSB3aWRlIG9wZW4sIHRoZSBvbmx5IG9ic3RhY2xlIGJlaW5nIHRoZSBzdHJlYW0gb2YgcGVvcGxlIGdvaW5nIG9uIHRoZWlyIHRyYXZlbCBwbGFuc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnbyB0aHJvdWdoIHRoZSBkb29ycywgbWFuYWdpbmcgdG8gYXZvaWQgZ2V0dGluZyBqb3N0bGVkIGFib3V0XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXM9bmV3IFtde1wiaW5cIixcImluc2lkZVwiLFwiaW5kb29yc1wiLFwiZW50ZXJcIixcImVudHJhbmNlXCIsXCJhaXJwb3J0XCJ9LFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBhaXJwb3J0RW50cmFuY2UuRXhpdHMuQWRkKGdvSW5zaWRlKTtcclxuICAgICAgICAgICAgdmFyIHRzYUVudHJhbmNlPW5ldyBSb29tKCkge1xyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlRTQSBFbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiWW91IGhlYWQgdG93YXJkcyB0aGUgVFNBIFNlY3VyaXR5IENoZWNrcG9pbnQsIGl0IHNlZW1zIHRvIGJlIHNwbGl0IGludG8gdHdvLCBhIHF1aWNrIFByZUNoZWNrIGFyZWEsIGFuZCBhIHNsb3cgYXJlYVwiLFxyXG4gICAgICAgICAgICAgICAgTG9uZ1Jvb21EZXNjID0gQFwiTmVhciB0aGUgcXVpY2sgem9uZSBpcyBhIHNpZ24sIHNwZWFrIHRvIGEgVFNBIE9mZmljZXIgdG8gYnV5IGEgc2luZ2xlLXVzZSBUU0EgUHJlQ2hlY2sgYWNjZXNzLCBvbmx5ICQ4NSwgXHJcbkRvIHlvdSBjaG9vc2UgdG8gYnV5IFRTQSBQcmVDaGVjaywgb3IgZG8geW91IHVzZSB0aGUgZ2VuZXJhbCBxdWV1ZT9cclxuXCIsXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdvVG9Uc2EgPSBuZXcgRXhpdCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+ICFnYW1lLkNoZWNrZWRJbixcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJUaGUgZ3VhcmQgYXQgdGhlIGZyb250IG9mIHRoZSBxdWV1ZSBsb29rcyBhdCB5b3UgZmxhdGx5IGFza2luZyBmb3IgeW91ciBib2FyZGluZyBwYXNzLCBsb29raW5nIGJhY2sgZm9yIGEgc2Vjb25kIHlvdSBmYWNlLXBhbG0gYmVmb3JlIGxlYXZpbmcgdG8gZG8gc29cIixcclxuICAgICAgICAgICAgICAgIExvY2tUaW1lID0gMixcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gdHNhRW50cmFuY2UsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiVFNBIEVudHJhbmNlXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXcgW117XCJUU0FcIiwgXCJyaWdodFwiLFwic2VjdXJpdHlcIn0sXHJcbiAgICAgICAgICAgICAgICBFeGl0RGVzYyA9IFwiVGhlIEVudHJhbmNlIHRvIHRoZSBUU0EgYXJlYSBpcyBsYXJnZSwgYnV0IGd1YXJkZWQgYnkgYSBjb3VwbGUgbWVuIGNoZWNraW5nIGJvYXJkaW5nIHBhc3Nlc1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRleHQgPSBcIllvdSBnZXQgaW4gbGluZSwgc2hvd2luZyB5b3VyIGJvYXJkaW5nIHBhc3MgdG8gdGhlIGd1YXJkXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGltZSA9IDFcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hlY2tJbkRlc2sgPSBuZXcgUm9vbSgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvb21OYW1lID0gXCJUaGUgQ2hlY2staW4gRGVza1wiLFxyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIGNoZWNrLWluIGRlc2sgZmluYWxseSBpbiB2aWV3LCB0aGUgd29tYW4gc2F0IGluIGZyb250IGFza3MgeW91IHRvICdjaGVjayBpbicgd2l0aCBhIHNtaWxlXCIsXHJcbiAgICAgICAgICAgICAgICBMb25nUm9vbURlc2MgPSBcIk5lYXIgdGhlIGRlc2sgaXMgYSBjb3VwbGUgbGVhZmxldHMgYWJvdXQgY2Fycnkgb24gc2l6ZSBhbmQgd2hhdCBpcyBhbmQgaXNudCBhbGxvd2VkXCIsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnb3RvQ2hlY2tpbiA9IG5ldyBFeGl0KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWUgPSBcIkNoZWNraW4gbGluZVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzdGluYXRpb24gPSAgY2hlY2tJbkRlc2ssXHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZXMgPSBuZXcgW117XCJjaGVja2luXCIsIFwiY2hlY2tcIiwgXCJkZXNrXCIsIFwibGVmdFwifSxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgbGluZSB0byB0aGUgY2hlY2staW4gZGVzayBpcyBxdWl0ZSBsb25nLCBidXQgbm90IHVud2llbGR5XCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiV2FpdGluZyBpbiB0aGUgbGluZSwgaXQgbW92ZXMgYXQgYSBtb2RlcmF0ZSBwYWNlLCBhbmQgc29vbiBlbm91Z2ggeW91IGFyZSBhdCB0aGUgY2hlY2staW4gZGVza1wiLFxyXG4gICAgICAgICAgICAgICAgRXhpdENvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSA1XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbGVhdmVDaGVja2luID0gbmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBFeGl0TmFtZSA9IFwiTGVhdmUgY2hlY2staW5cIixcclxuICAgICAgICAgICAgICAgIEV4aXRMb2NrZWQgPSBnYW1lID0+ICFnYW1lLkNoZWNrZWRJbixcclxuICAgICAgICAgICAgICAgIExvY2tUZXh0ID0gXCJBZnRlciBmaW5hbGx5IGdldHRpbmcgdG8gdGhlIGVuZCBvZiB0aGUgY2hlY2staW4gbGluZSB5b3UgcmVhbGl6ZSB5b3UgZm9yZ290IHlvdXIgc3VpdGNhc2UgbmVhciB0aGUgc3RhcnQsIHdpdGggYW4gYW5ub3llZCBzaWdoIHlvdSBnbyBiYWNrIHRvIGdldCBpdFwiLFxyXG4gICAgICAgICAgICAgICAgTG9ja1RpbWUgPSA1LFxyXG4gICAgICAgICAgICAgICAgRXhpdE5hbWVzID0gbmV3IFtde1wicmlnaHRcIixcIm91dFwiLFwiYmFja1wifSxcclxuICAgICAgICAgICAgICAgIERlc3RpbmF0aW9uID0gaW5zaWRlQWlycG9ydCxcclxuICAgICAgICAgICAgICAgIEV4aXREZXNjID0gXCJUaGUgd2F5IG91dCBvZiBjaGVjay1pbiBpcyBhIHNtYWxsIGFsbGV5d2F5IGJldHdlZW4gdGhlIGRlc2tzXCIsXHJcbiAgICAgICAgICAgICAgICBFeGl0Q29zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICBFeGl0VGV4dCA9IFwiWW91IGxlYXZlIGNoZWNrLWluIGZvbGxvd2luZyB0aGUgbGluZXMsIGFuZCBzb29uIGZpbmQgeW91cnNlbGYgYmFjayB3aGVyZSB5b3Ugc3RhcnRlZCBpbiB0aGUgYWlycG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgRXhpdFRpbWUgPSAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNoZWNrSW5EZXNrLkV4aXRzLkFkZChsZWF2ZUNoZWNraW4pO1xyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb3RvQ2hlY2tpbik7XHJcblxyXG4gICAgICAgICAgICBpbnNpZGVBaXJwb3J0LkV4aXRzLkFkZChnb1RvVHNhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVjayA9IG5ldyBSb29tKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2hvcnRSb29tRGVzYyA9IFwiVGhlIFByZUNoZWNrIHpvbmUgaXMgbmljZSBhbmQgcXVpY2ssIHlvdSBkdW1wIHlvdXIgYmFja3BhY2sgb24gdGhlIHhyYXkgYmVsdCBiZWZvcmUgeW91IGdvIHRocm91Z2ggdGhlIHNjYW5uZXIgd2l0aG91dCBuZWVkaW5nIHRvIHRha2Ugb2ZmIHlvdXIgYmVsdCBhbmQgc2hvZXNcIixcclxuICAgICAgICAgICAgICAgIExvbmdSb29tRGVzYyA9IFwiQXMgeW91IHBpY2sgdXAgeW91ciBiYWNrcGFjayBvZmYgdGhlIHhyYXkgYmVsdCwgeW91IHNtZWxsIGJ1cnJpdG9zIGZyb20gdGhlIE1leGljYW4gZm9vZCBzdGFuZCBvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgUm9vbU5hbWUgPSBcIlByZUNoZWNrXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVDaGVja0V4aXQ9bmV3IEV4aXQoKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgQ3VycmVudFJvb20gPSBob3RlbFJvb207XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUm9vbVRpdGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixDdXJyZW50Um9vbSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFJvb20+KFwia2V5MVwiKS5Sb29tTmFtZTooc3RyaW5nKW51bGwpID8/IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFJvb21IZWFkZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBidWlsZGVyPW5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIHN0cmluZyByb29tTmFtZSA9IChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXkyXCIpLlJvb21OYW1lOihzdHJpbmcpbnVsbCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHJvb21OYW1lKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKHN0cmluZy5Gb3JtYXQoXCJUaW1lIHRvIEZsaWdodDogezA6RDJ9OnsxOkQyfVwiLFRpbWVUb0ZsaWdodCAvIDYwLFRpbWVUb0ZsaWdodCAlIDYwKSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kTGluZShzdHJpbmcuRm9ybWF0KFwiTW9uZXk6IHswOkN9XCIsKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIsUGxheWVyKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8UGxheWVyPihcImtleTNcIikuTW9uZXk6KGRlY2ltYWw/KW51bGwpID8/IDApKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRMaW5lKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NFwiLEN1cnJlbnRSb29tKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8Um9vbT4oXCJrZXk0XCIpLlNob3J0Um9vbURlc2M6KHN0cmluZyludWxsKSA/PyBcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuVG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIFRyeVBhcnNlSW5wdXQoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIG91dHB1dFRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlNvcnJ5LCB0aGlzIGdhbWUgaXMgb3ZlclwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbW1hbmRTcGxpdCA9IGlucHV0LlNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjb21tYW5kIGluIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8SUNvbW1hbmQ+KENvbW1hbmRzLChGdW5jPElDb21tYW5kLGJvb2w+KShjb21tYW5kID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjb21tYW5kLkdldENvbW1hbmRBbGlhc2VzKCksY29tbWFuZFNwbGl0WzBdLlRvTG93ZXIoKSkpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuVHJ5UGFyc2VDb21tYW5kKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxzdHJpbmc+KGNvbW1hbmRTcGxpdCwxKSksIHRoaXMsIG91dCBvdXRwdXRUZXh0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVGltZVRvRmxpZ2h0IDw9IDAgfHwgUGxheWVyLk1vbmV5IDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRUZXh0ID0gXCJTb3JyeSwgaXQgc2VlbXMgeW91IFwiICsgKFRpbWVUb0ZsaWdodCA8PSAwID8gXCJyYW4gb3V0IG9mIHRpbWVcIiA6IFwicmFuIG91dCBvZiBtb25leVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG91dHB1dFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFBhcnNlSW5wdXQoc3RyaW5nIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIExpc3Q8SUNvbW1hbmQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Db21tYW5kcz1uZXcgTGlzdDxJQ29tbWFuZD4oKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgV2luZG93cy5TeXN0ZW07XHJcbnVzaW5nIFdpbmRvd3MuVUkuWGFtbDtcclxudXNpbmcgV2luZG93cy5VSS5YYW1sLkNvbnRyb2xzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgTWFpblBhZ2UgOiBQYWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEdhbWUgR2FtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYWluUGFnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgR2FtZS5Jbml0aWFsaXplR2FtZSgpO1xyXG4gICAgICAgICAgICAvLyBFbnRlciBjb25zdHJ1Y3Rpb24gbG9naWMgaGVyZS4uLlxyXG4gICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBHYW1lLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBhY3Rpb25CdXR0b25fQ2xpY2sob2JqZWN0IHNlbmRlciwgUm91dGVkRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kbGVJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGlucHV0X0tleURvd24ob2JqZWN0IHNlbmRlciwgV2luZG93cy5VSS5YYW1sLklucHV0LktleVJvdXRlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZS5LZXk9PVZpcnR1YWxLZXkuRW50ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhhbmRsZUlucHV0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBIYW5kbGVJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXN0SW5wdXRMaXN0Lkl0ZW1zLkFkZChpbnB1dC5UZXh0KTtcclxuICAgICAgICAgICAgcGFzdElucHV0TGlzdC5TZWxlY3RlZEluZGV4ID0gcGFzdElucHV0TGlzdC5JdGVtcy5Db3VudCAtIDE7XHJcbnN0cmluZyBvdXRwdXRUZXh0O1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IEdhbWUuVHJ5UGFyc2VJbnB1dChpbnB1dC5UZXh0LCBvdXQgb3V0cHV0VGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5UZXh0ICs9IFwiPiBcIiArIGlucHV0LlRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gb3V0cHV0VGV4dDtcclxuICAgICAgICAgICAgICAgIGlucHV0LlRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LlRleHQgKz0gXCI+IFwiICsgaW5wdXQuVGV4dCArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuVGV4dCArPSBvdXRwdXRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgR2FtZSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fR2FtZT1uZXcgR2FtZSgpO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUGxheWVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWNpbWFsIE1vbmV5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1vbmV5ID0gMTI1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWJcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEEgYmFzaWMgcm9vbVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBSb29tXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcm9vbSBuYW1lXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJvb21OYW1lIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSByb29tIERlc2NyaXB0aW9uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNob3J0Um9vbURlc2MgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExvbmdSb29tRGVzYyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIExpc3Q8RXhpdD4gRXhpdHMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBFeGl0IEF1dG9FeGl0IHsgZ2V0OyBzZXQ7IH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBMaXN0PEV4aXQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19FeGl0cz1uZXcgTGlzdDxFeGl0PigpO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgRmxpZ2h0RGFzaFdlYi5Db21tYW5kc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2hlY2tJbjpJQ29tbWFuZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZE5hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiY2hlY2staW5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmdbXSBHZXRDb21tYW5kQWxpYXNlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W10ge1wiY2hlY2tcIn07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmRIZWxwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVHJ5UGFyc2VDb21tYW5kKHN0cmluZ1tdIGNvbW1hbmRBcmd1bWVudHMsIEdhbWUgY3VyU3RhdGUsIG91dCBzdHJpbmcgb3V0cHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHMuTGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiSSBoYXZlIG5vdGhpbmcgdG8gY2hlY2suXCIrRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbW1hbmRBcmd1bWVudHNbMF0gIT0gXCJpblwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBcIkkgaGF2ZSBub3RoaW5nIHRvIGNoZWNrLlwiICsgRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN1clN0YXRlLlJvb21UaXRsZSgpLlRvTG93ZXIoKSAhPSBcInRoZSBjaGVjay1pbiBkZXNrXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IFwiU29ycnksIHlvdSBjYW4gbm90IGNoZWNrIGluIGhlcmVcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VyU3RhdGUuQ2hlY2tlZEluID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhpdCA9IGN1clN0YXRlLkN1cnJlbnRSb29tLkV4aXRzWzBdO1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gRW52aXJvbm1lbnQuTmV3TGluZSArIGV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5DdXJyZW50Um9vbSA9IGV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBleGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5QbGF5ZXIuTW9uZXkgLT0gZXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IGN1clN0YXRlLkdldFJvb21IZWFkZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBGbGlnaHREYXNoV2ViLkNvbW1hbmRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHbzogSUNvbW1hbmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldENvbW1hbmROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkdvXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0Q29tbWFuZEFsaWFzZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdIHtcImdvXCIsIFwiaGVhZFwiLCBcIndhbGtcIiwgXCJkcml2ZVwiLCBcImdldCBpblwifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggIT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gXCJTb3JyeSwgSW52YWxpZCBkZXN0aW5hdGlvbiBvciBjb21tYW5kIGZvcm1hdFwiK0Vudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjdXJyZW50Um9vbUV4aXQgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxFeGl0PihjdXJTdGF0ZS5DdXJyZW50Um9vbS5FeGl0cywoRnVuYzxFeGl0LGJvb2w+KShjdXJyZW50Um9vbUV4aXQgPT4gU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Db250YWluczxzdHJpbmc+KGN1cnJlbnRSb29tRXhpdC5FeGl0TmFtZXMsY29tbWFuZEFyZ3VtZW50c1swXS5Ub0xvd2VyKCkpKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Um9vbUV4aXQuRXhpdExvY2tlZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0xvY2tlZCA9IGN1cnJlbnRSb29tRXhpdC5FeGl0TG9ja2VkKGN1clN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNMb2NrZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBjdXJyZW50Um9vbUV4aXQuTG9ja1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLlRpbWVUb0ZsaWdodCAtPSBjdXJyZW50Um9vbUV4aXQuTG9ja1RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBFbnZpcm9ubWVudC5OZXdMaW5lICsgY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBjdXJyZW50Um9vbUV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuQ3VycmVudFJvb20gPSBjdXJyZW50Um9vbUV4aXQuRGVzdGluYXRpb247XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gY3VycmVudFJvb21FeGl0LkV4aXRUaW1lO1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuUGxheWVyLk1vbmV5IC09IGN1cnJlbnRSb29tRXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBjdXJTdGF0ZS5HZXRSb29tSGVhZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1clN0YXRlLkN1cnJlbnRSb29tLkF1dG9FeGl0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXQgPSBjdXJTdGF0ZS5DdXJyZW50Um9vbS5BdXRvRXhpdDtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gRW52aXJvbm1lbnQuTmV3TGluZSArIGV4aXQuRXhpdFRleHQgKyBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clN0YXRlLkN1cnJlbnRSb29tID0gZXhpdC5EZXN0aW5hdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJTdGF0ZS5UaW1lVG9GbGlnaHQgLT0gZXhpdC5FeGl0VGltZTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJTdGF0ZS5QbGF5ZXIuTW9uZXkgLT0gZXhpdC5FeGl0Q29zdDtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gY3VyU3RhdGUuR2V0Um9vbUhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIkludmFsaWQgZGVzdGluYXRpb25cIiArIEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEZsaWdodERhc2hXZWIuQ29tbWFuZHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIExvb2s6SUNvbW1hbmRcclxuICAgIHtcclxucHVibGljIHN0cmluZyBHZXRDb21tYW5kTmFtZSgpXHJcbntcclxuICAgIHJldHVybiBcIkxvb2tcIjtcclxufXB1YmxpYyBzdHJpbmdbXSBHZXRDb21tYW5kQWxpYXNlcygpXHJcbntcclxuICAgIHJldHVybiBuZXdbXXtcImxvb2tcIiwgXCJsXCIsIFwicGVlclwiLCBcInN0YXJlXCIsIFwiZXhhbWluZVwifTtcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0Q29tbWFuZEhlbHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTG9vayBhdCBhbiBpdGVtXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBUcnlQYXJzZUNvbW1hbmQoc3RyaW5nW10gY29tbWFuZEFyZ3VtZW50cywgR2FtZSBjdXJTdGF0ZSwgb3V0IHN0cmluZyBvdXRwdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50cy5MZW5ndGggPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID1cclxuc3RyaW5nLkZvcm1hdChcInswfXsxfXsyfVwiLGN1clN0YXRlLkN1cnJlbnRSb29tLlNob3J0Um9vbURlc2MsRW52aXJvbm1lbnQuTmV3TGluZSxjdXJTdGF0ZS5DdXJyZW50Um9vbS5Mb25nUm9vbURlc2MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZEFyZ3VtZW50c1swXS5Ub0xvd2VyKCkgPT0gXCJhdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRBcmd1bWVudHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8c3RyaW5nPihjb21tYW5kQXJndW1lbnRzLDEpKTtcclxuICAgICAgICAgICAgICAgIHZhciB0b0xvb2sgPSBjb21tYW5kQXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGN1cnJlbnRSb29tRXhpdCBpbiBjdXJTdGF0ZS5DdXJyZW50Um9vbS5FeGl0cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5Db250YWluczxzdHJpbmc+KGN1cnJlbnRSb29tRXhpdC5FeGl0TmFtZXMsdG9Mb29rLlRvTG93ZXIoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBzdHJpbmcuRm9ybWF0KFwiezB9ezF9XCIsY3VycmVudFJvb21FeGl0LkV4aXREZXNjLEVudmlyb25tZW50Lk5ld0xpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
