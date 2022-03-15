using System;
using System.Collections.Generic;
using System.Text;
using Realms;
using MongoDB.Bson;

namespace FlexFormMobile.Models
{
    class FormDefinition : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("title")]
        [Required]
        public string Title { get; set; }

        [MapTo("section")]
        public IList<QuestionDefinition> Questions { get;  }


    }

    class QuestionDefinition : EmbeddedObject
    {
        [MapTo("type")]
        [Required]
        public string Type { get; set; }

        [MapTo("options")]
        public string Options { get; set; }

        [MapTo("displayText")]
        [Required]
        public string Text { get; set; }

        [MapTo("question")]
        [Required]
        public string Question { get; set; }
    }
}
