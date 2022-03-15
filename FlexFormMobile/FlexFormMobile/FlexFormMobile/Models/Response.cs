using System;
using System.Collections.Generic;
using System.Text;
using Realms;
using MongoDB.Bson;

namespace FlexFormMobile.Models
{
    class Response : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("formDefinitionId")]
        public ObjectId FormDefinitionId { get; set; }

        [MapTo("answer")]
        [Required]
        public string Answer { get; set; }
    }
}
