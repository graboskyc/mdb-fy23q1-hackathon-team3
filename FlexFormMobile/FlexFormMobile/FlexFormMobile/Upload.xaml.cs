using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms;
using Realms.Sync;

namespace FlexFormMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Upload : ContentPage
    {
        public Upload()
        {
            InitializeComponent();
        }


        private async void CameraButton_Clicked(object sender, EventArgs e)
        {
            await TakePhotoAsync();
        }
        async Task TakePhotoAsync()
        {
            progressbar.IsVisible = true;
            progressbar.Progress = .1;
            try
            {
                var photo = await MediaPicker.CapturePhotoAsync();
                await LoadPhotoAsync(photo);
                //Console.WriteLine($"CapturePhotoAsync COMPLETED: {PhotoPath}");
            }
            catch (FeatureNotSupportedException fnsEx)
            {
                // Feature is not supported on the device
            }
            catch (PermissionException pEx)
            {
                // Permissions not granted
            }
            catch (Exception ex)
            {
                Console.WriteLine($"CapturePhotoAsync THREW: {ex.Message}");
            }
        }

        async Task LoadPhotoAsync(FileResult photo)
        {
            // canceled
            if (photo == null)
            {
                PhotoImage.Source = null;
                //PhotoPath = null;
                return;
            }
            progressbar.Progress = .25;
            // save the file into local storage
            var newFile = Path.Combine(FileSystem.CacheDirectory, photo.FileName);
            using (var stream = await photo.OpenReadAsync())
            using (var newStream = File.OpenWrite(newFile))
                await stream.CopyToAsync(newStream);

            //PhotoPath = newFile;
            PhotoImage.Source = newFile;

            byte[] imageArray = System.IO.File.ReadAllBytes(newFile);
            string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            txt_Encoded.Text = base64ImageRepresentation;

            progressbar.Progress = .5;

            try
            {
                App.realm_partition = App.realm_user.Id;
                App.realm_config = new Realms.Sync.SyncConfiguration(App.realm_partition, App.realm_user);
                App.realm_realm = await Realm.GetInstanceAsync(App.realm_config);

                Models.EncodedPhoto ep = new Models.EncodedPhoto();
                //ep.EncodedPhotoText = base64ImageRepresentation;

                App.realm_realm.Write(() =>
                {
                    App.realm_realm.Add(ep);
                });

                await App.realm_realm.GetSession().WaitForUploadAsync();
                progressbar.Progress = 1.0;

            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Fetching Tickets", ex.Message, "OK");

            }

        }
    }
}