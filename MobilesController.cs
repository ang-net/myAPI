using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using StudentRegistrationApplication.Model;
using MongoDB.Bson;

namespace MobileDatabase.Controllers
{
    public class MobilesController : ApiController
    {
        string CollectionName = "MobileCollection";

        [HttpGet]
        public string getMobiles()
        {
            return new DbUtility().GetAllDocumentsWithObjectId(CollectionName);
        }

        [HttpPost]
        public bool addMobile([FromBody]JToken mobile)
        {
            try
            {
                return new DbUtility().SaveDocument(mobile.ToString(), CollectionName);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [HttpPut]
        public bool updateMobilebyobjectid([FromBody]JToken mobile)
        {
            try
            {
                return new DbUtility().UpdateDocumentByObjectId(mobile.ToString(), CollectionName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        public bool deleteMobile(string id)
        {
            return new DbUtility().DeleteDocumentByObjectId(CollectionName, ObjectId.Parse(id.ToString()));
        }
    }
}
