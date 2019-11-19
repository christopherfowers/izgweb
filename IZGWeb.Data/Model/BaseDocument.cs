using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IZGWeb.Data.Model
{
    public abstract class BaseDocument
    {   
        [BsonId]
        public ObjectId Id { get; set; }
        public string __v { get; set; }   
    }
}