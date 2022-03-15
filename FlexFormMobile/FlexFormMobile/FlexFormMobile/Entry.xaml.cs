using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms;
using Realms.Sync;

namespace FlexFormMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Entry : ContentPage
    {
        private MongoDB.Bson.ObjectId _id;
        private Models.FormDefinition _f;
        public Entry(MongoDB.Bson.ObjectId id)
        {
            InitializeComponent();
            _id = id;
        }

        protected override async void OnAppearing()
        {
            try
            {
                // Get ticket raw details yet
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

                _f = App.realm_realm.All<Models.FormDefinition>().Where(fd => fd.Id == _id).FirstOrDefault();

                txt_title.Text = _f.Title;

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Fetching Ticket Details", ex.Message, "OK");

            }
            base.OnAppearing();
        }
    }
}