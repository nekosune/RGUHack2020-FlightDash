// <CSHTML5><XamlHash>9743B903219DCE3F0533B955583E3B4C</XamlHash><PassNumber>2</PassNumber><CompilationDate>2/23/2020 7:17:36 AM</CompilationDate></CSHTML5>



public static class ǀǀFlightdashwebǀǀComponentǀǀAppǀǀXamlǀǀFactory
{
    public static object Instantiate()
    {
        global::System.Type type = typeof(FlightDashWeb.App);
        return global::CSHTML5.Internal.TypeInstantiationHelper.Instantiate(type);
    }
}

namespace FlightDashWeb
{


//------------------------------------------------------------------------------
// <auto-generated>
//     This code was auto-generated by "C#/XAML for HTML5"
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------



partial class App : global::Windows.UI.Xaml.Application
{

#pragma warning disable 169, 649, 0628 // Prevents warning CS0169 ('field ... is never used'), CS0649 ('field ... is never assigned to, and will always have its default value null'), and CS0628 ('member : new protected member declared in sealed class')



#pragma warning restore 169, 649, 0628


        private bool _contentLoaded;
        public void InitializeComponent()
        {
            if (_contentLoaded)
                return;
            _contentLoaded = true;

#pragma warning disable 0184 // Prevents warning CS0184 ('The given expression is never of the provided ('type') type')
            if (this is global::Windows.UI.Xaml.UIElement)
            {
                ((global::Windows.UI.Xaml.UIElement)(object)this).XamlSourcePath = @"FlightDashWeb\App.xaml";
            }
#pragma warning restore 0184


global::CSHTML5.Internal.StartupAssemblyInfo.OutputRootPath = @"Output\";
global::CSHTML5.Internal.StartupAssemblyInfo.OutputAppFilesPath = @"app-cshtml5\app\";
global::CSHTML5.Internal.StartupAssemblyInfo.OutputLibrariesPath = @"app-cshtml5\libs\";
global::CSHTML5.Internal.StartupAssemblyInfo.OutputResourcesPath = @"app-cshtml5\res\";


var ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a = new global::Windows.UI.Xaml.ResourceDictionary();
this.Resources = ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a;

this.Resources = ResourceDictionary_b1e809ab899c4b948fc659fcf8a9a99a;






    
        }



public static void Main()
{
    new App();
}

}


}
