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
    public partial class QA : ContentPage
    {
        Models.QuestionDefinition _q;
        private MongoDB.Bson.ObjectId _id;
        private Models.FormDefinition _f;
        private string _question;

        Xamarin.Forms.Entry en = new Xamarin.Forms.Entry();
        Xamarin.Forms.Picker p = new Picker();

        public QA(MongoDB.Bson.ObjectId id, string question)
        {
            InitializeComponent();
            _id = id;
            _question = question;
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
                _q = _f.Questions.Where(q => q.Question == _question).FirstOrDefault();
                txt_q.Text = _q.Question;

                if(_q.Type == "text")
                {
                    Button b = new Button();
                    b.Text = "Save";
                    b.Clicked += B_TextClicked;
                    sl.Children.Add(en);
                    sl.Children.Add(b);
                }
                else if(_q.Type == "DDL")
                {
                    p.ItemsSource = _q.Options.Split(',');
                    Button b = new Button();
                    b.Text = "Save";
                    b.Clicked += B_DDLClicked;
                    sl.Children.Add(p);
                    sl.Children.Add(b);
                } else
                {
                    Label l = new Label();
                    l.Text = "Unknown form type";
                    sl.Children.Add(l);
                }

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Fetching Ticket Details", ex.Message, "OK");

            }
            base.OnAppearing();
        }

        private async void B_DDLClicked(object sender, EventArgs e)
        {
            try
            {
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

                Models.Response r = new Models.Response();
                r.Answer = _q.Options.Split(',')[p.SelectedIndex];
                r.FormDefinitionId = _id;


                App.realm_realm.Write(() =>
                {
                    App.realm_realm.Add(r);
                });

                //await App.realm_realm.GetSession().WaitForUploadAsync();
                await Navigation.PushAsync(new Entry(_id));

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Writing", ex.Message, "OK");

            }
        }

        private async void B_TextClicked(object sender, EventArgs e)
        {
            try
            {
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

                Models.Response r = new Models.Response();
                r.Answer = en.Text;
                r.FormDefinitionId = _id;


                App.realm_realm.Write(() =>
                {
                    App.realm_realm.Add(r);
                });

                //await App.realm_realm.GetSession().WaitForUploadAsync();
                await Navigation.PushAsync(new Entry(_id));

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Writing", ex.Message, "OK");

            }
        }
    }
}