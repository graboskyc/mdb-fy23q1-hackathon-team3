using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
    public partial class MyForms : ContentPage
    {
        private IQueryable<Models.FormDefinition> allForms = null;
        private ObservableCollection<Models.FormDefinition> _forms = new ObservableCollection<Models.FormDefinition>();

        public MyForms()
        {
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
            try
            {
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);
                await App.realm_realm.GetSession().WaitForDownloadAsync();
                allForms = App.realm_realm.All<Models.FormDefinition>().OrderBy(i => i.Title);


                _forms = new ObservableCollection<Models.FormDefinition>(allForms.ToList());
                lv.ItemsSource = _forms;

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Fetching Tickets", ex.Message, "OK");

            }
            base.OnAppearing();
        }

        private async void lv_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            ListView lv = (ListView)sender;

            // this assumes your List is bound to a List<Club>
            Models.FormDefinition f = (Models.FormDefinition)lv.SelectedItem;

            // assuiming Club has an Id property
            await Navigation.PushAsync(new Entry(f.Id));
        }
    }
}