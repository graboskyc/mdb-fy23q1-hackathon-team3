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
using System.IO;
using MongoDB.Bson;

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
            sv.IsVisible = true;
        }

        private async void Button_Clicked_1(object sender, EventArgs e)
        {
            App.realm_partition = App.realm_user.Id;
            App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
            App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

            List<Models.SearchResult> sr = await App.realm_user.Functions.CallAsync<List<Models.SearchResult>>("upload_search", txt_search.Text);

            //ObjectId id = ObjectId.Parse(sr.FirstOrDefault()._id);

            Models.EncodedPhoto ep = App.realm_realm.All<Models.EncodedPhoto>().Where(p => p.Id == sr.FirstOrDefault()._id).FirstOrDefault();


            Image i = new Image();
            Label l = new Label();
            sv.IsVisible = false;
            l.Text = ep.EncodedPhotoText;
            byte[] Base64Stream = Convert.FromBase64String(ep.EncodedPhotoText);
            i.Source = ImageSource.FromStream(() => new MemoryStream(Base64Stream));
            sl.Children.Add(i);
            //sl.Children.Add(l);
        }
    }
}