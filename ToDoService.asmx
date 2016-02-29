using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Bson.Serialization;
using System.Web.Script.Serialization;

namespace MongoSample2
{
    /// <summary>
    /// Summary description for ToDoService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ToDoService : System.Web.Services.WebService
    {
        string DBName = "StudentDB";
        string CollectioName = "todos"; //Student

        [WebMethod]
        public void SyncAll(string set)
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var server = client.GetServer();
            var database = server.GetDatabase(DBName);
            var collection = database.GetCollection<BsonArray>(CollectioName);

            collection.RemoveAll();
            var netxMessageBatch = BsonSerializer.Deserialize<BsonArray>(set);
            collection.InsertBatch(netxMessageBatch);

            //BsonArray fetchCollections;
            //BsonSerializer.Serialize<BsonArray>(collection.FindAll(), fetchCollections);

            var collection1 = database.GetCollection<BsonDocument>(CollectioName);
            MongoCursor<BsonDocument> cursor = collection1.FindAll();


            List<BsonDocument> entities = cursor.ToList();
            JavaScriptSerializer Json = new JavaScriptSerializer();

            string returnDocs = Json.Serialize(entities);

        }
    }

    //public class ToDo
    //{
    //    [BsonId]
    //    [BsonRepresentation(BsonType.ObjectId)]
    //    public string Id { get; set; }
    //    public string text { get; set; }
    //    public bool done { get; set; }
    //}
}
