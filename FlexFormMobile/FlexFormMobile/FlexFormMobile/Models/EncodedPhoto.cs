using System;
using System.Collections.Generic;
using System.Text;
using Realms;
using MongoDB.Bson;

namespace FlexFormMobile.Models
{
    class EncodedPhoto : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("encoded")]
        [Required]
        public string EncodedPhotoText { get; set; }
    }
}
