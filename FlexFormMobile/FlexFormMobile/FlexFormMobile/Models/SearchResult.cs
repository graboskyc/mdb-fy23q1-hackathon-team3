using System;
using System.Collections.Generic;
using System.Text;
using Realms;
using MongoDB.Bson;

namespace FlexFormMobile.Models
{
    class SearchResult
    {
          public ObjectId _id { get; set; } = ObjectId.GenerateNewId();

            public string title { get; set; }
    }
}
