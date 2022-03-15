using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace FlexFormMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Entry : ContentPage
    {
        private MongoDB.Bson.ObjectId _id;
        public Entry(MongoDB.Bson.ObjectId id)
        {
            InitializeComponent();
            _id = id;
        }
    }
}