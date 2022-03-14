using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms;

namespace FlexFormMobile
{
    public partial class App : Application
    {

        public static string realm_Username { get; set; }
        public static Realms.Sync.App realm_app { get; set; }
        public static Realms.Sync.User realm_user { get; set; }
        public static Realms.Sync.SyncConfiguration realm_config { get; set; }
        public static Realm realm_realm { get; set; }
        public static string realm_partition { get; set; }
        public static bool realm_IsLoggedIn { get; set; } = false;
        public static bool realm_LoginFailed { get; set; } = false;
        public static string realm_Gravatar { get; set; }

        public App()
        {
            InitializeComponent();

            MainPage = new NavigationPage(new LoginPage());
        }

        protected override void OnStart()
        {
            MainPage = new NavigationPage(new LoginPage());
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
