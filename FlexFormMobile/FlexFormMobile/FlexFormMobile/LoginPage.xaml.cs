using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Realms;
using Realms.Sync;

namespace FlexFormMobile
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private async void btn_login_Clicked(object sender, EventArgs e)
        {
            try
            {
                App.realm_Username = txt_email.Text;

                using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
                {
                    byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(txt_email.Text);
                    byte[] hashBytes = md5.ComputeHash(inputBytes);

                    // Convert the byte array to hexadecimal string
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hashBytes.Length; i++)
                    {
                        sb.Append(hashBytes[i].ToString("X2"));
                    }
                    App.realm_Gravatar = sb.ToString().ToLower();
                }

                App.realm_app = Realms.Sync.App.Create("flexform-ggkwy");
                App.realm_user = await App.realm_app.LogInAsync(Realms.Sync.Credentials.EmailPassword(txt_email.Text, txt_password.Text));
                App.realm_IsLoggedIn = true;
                App.realm_LoginFailed = false;
                await Navigation.PushAsync(new TabbedMenu());
            }
            catch (Exception ex)
            {
                App.realm_IsLoggedIn = false;
                App.realm_LoginFailed = true;
                await DisplayAlert("Login Failed", ex.Message, "OK");
            }
        }
    }
}
