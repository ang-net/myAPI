using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using MongoSample2.DbUtil;
using MongoDB.Bson;

namespace MongoSample2
{
    /// <summary>
    /// Summary description for StudentServiceWithUtility
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StudentServiceWithUtility : System.Web.Services.WebService
    {

        //string DBName = "StudentUtility";
        string CollectioName = "Student";

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public void Save(string student)
        {
            try
            {
                new DbUtility().SaveDocument(student, CollectioName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string getAll()
        {
            return new DbUtility().GetAllDocumentsWithObjectId(CollectioName);
        }
        

        [WebMethod]
        public void removeStudent(string id)
        {
            new DbUtility().DeleteDocumentByObjectId(CollectioName, ObjectId.Parse(id));
        }

        [WebMethod]
        public void editStudent(string student)
        {
            try
            {
                new DbUtility().UpdateDocumentByObjectId(student, CollectioName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string fetchStates()
        {
            //return new FetchMasters().fetchAll<StateMaster>(DBName, "StateMaster");
            return new DbUtility().GetAllDocumentsWithObjectId("StateMaster");
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string fetchDistricts()
        {
            //return new FetchMasters().fetchAll<DistrictMaster>(DBName, "DistrictMaster");
            return new DbUtility().GetAllDocumentsWithObjectId("DistrictMaster");

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public string fetchTehsils()
        {
            //return new FetchMasters().fetchAll<TalukaMaster>(DBName, "TalukaMaster");
            return new DbUtility().GetAllDocumentsWithObjectId("TalukaMaster");

        }
    }
}
