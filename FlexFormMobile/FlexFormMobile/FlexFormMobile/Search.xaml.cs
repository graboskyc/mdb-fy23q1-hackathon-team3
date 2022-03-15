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
    public partial class Search : ContentPage
    {
        private ObservableCollection<Models.SearchResult> _forms = new ObservableCollection<Models.SearchResult>();

        public Search()
        {
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
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

        private async void Button_Clicked(object sender, EventArgs e)
        {
            try
            {
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

                List<Models.SearchResult> sr = await App.realm_user.Functions.CallAsync<List<Models.SearchResult>>("form_search", txt_search.Text);


                _forms = new ObservableCollection<Models.SearchResult>(sr);
                lv.ItemsSource = _forms;

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Fetching Search Results", ex.Message, "OK");

            }
        }
    }
}