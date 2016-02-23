using Jan16Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Bing;
using System.Data.SqlClient;
using System.Web.Http.Cors;
using Newtonsoft.Json;

namespace Jan16Car.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CarsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        
        public class IdParam
        {
            public int id { get; set; }
        }

        public class Selected
        {
            public string year { get; set; }
            public string make { get; set; }
            public string model { get; set; }
            public string trim { get; set; }
        }
        /// <summary>
        /// Get Unique Years
        /// </summary>
        /// <returns> Returns a list of distinct years to search cars</returns>
        public IHttpActionResult GetYears()
        {
            var retval = db.Database.SqlQuery<string>(
            "EXEC GetYears").ToList();
            return Ok(retval);
        }
        /// <summary>
        /// Get Makes for a specific year
        /// </summary>
        /// <param name="selected">selected.year conatins the specific year</param>
        /// <returns>Returns a distinct list of makes</returns>
        
        public IHttpActionResult GetMakes(string year)
        {
            var yearParam = new SqlParameter("@year", year);

            var retval = db.Database.SqlQuery<string>(
            "EXEC GetMakes @year", yearParam).ToList();
            return Ok(retval);
        }
        /// <summary>
        /// Get unique Model names for a specific year and make
        /// </summary>
        /// <param name="selected">selected.year contains the specific yaer and selected.make contains the make.</param>
        /// <returns>Returns a list of Model Names</returns>
        
        public IHttpActionResult GetModels(string year, string make)
        {
            var yearParam = new SqlParameter("@year", year);
            var makeParam = new SqlParameter("@make", make);

            var retval = db.Database.SqlQuery<string>(
            "EXEC GetModels @year, @make", yearParam, makeParam).ToList();
            return Ok(retval);
        }
        /// <summary>
        /// Get Trims for a specific year, make, and model.
        /// </summary>
        /// <param name="selected">selected.year contains year, selected.make contains make and selected.model contains model name.</param>
        /// <returns>Returns a list of trims.</returns>
        
        public IHttpActionResult GetTrims(string year, string make, string model)
        {
           var yearParam = new SqlParameter("@year", year);
            var makeParam = new SqlParameter("@make", make);
            var modelParam = new SqlParameter("@model", model);

            var retval = db.Database.SqlQuery<string>(
            "EXEC GetTrims @year, @make, @model", yearParam, makeParam,modelParam).ToList();
            return Ok(retval);
        }
        /// <summary>
        /// Get all cars that match the specified year, make, model and trim
        /// </summary>
        /// <param name="selected">Optional paramters - selected.year, selected.make, selected.model and selected.trim</param>
        /// <returns>Returns a list of cars</returns>
        
        public IHttpActionResult GetCars(string year, string make, string model, string trim)
        {
            var yearParam = new SqlParameter("@year", year ?? "");
            var makeParam = new SqlParameter("@make", make ?? "");
            var modelParam = new SqlParameter("@model", model ?? "");
            var trimParam = new SqlParameter("@trim", trim ?? "");

            var retval = db.Database.SqlQuery<Car>(
            "EXEC GetsCars @year, @make, @model, @trim", yearParam, makeParam, modelParam, trimParam).ToList();
            return Ok(retval);
        }

        /// <summary>
        /// Returns car details including recall data and an image url for the given id.
        /// </summary>
        /// <param name="Id">Id of the Car</param>
        /// <returns>Returns an object(car,recalls,image) that contains car details, recall info and image url</returns>
        
        public async Task<IHttpActionResult> GetInfo(int id)
        {
            HttpResponseMessage response;
            string content = "";
            var Car = db.Cars.Find(id);
            //var Recalls = "";
            var Image = "";
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov/");
                try
                {
                    response = await client.GetAsync("webapi/api/Recalls/vehicle/modelyear/" + Car.model_year +
                                                                                "/make/" + Car.make +
                                                                                "/model/" + Car.model_name + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
            dynamic Recalls = JsonConvert.DeserializeObject(content);

            var image = new BingSearchContainer(new Uri("https://api.datamarket.azure.com/Bing/search/v1"));

            image.Credentials = new NetworkCredential("accountKey", "qZQohZcFCgVtaM/LA7T+zQyJiQiio4LDnVrIbRl04No=");
            var marketData = image.Composite(
                "image",
                Car.model_year + " " + Car.make + " " + Car.model_name + " " + Car.model_trim,
                //$"{Car.model_year} {Car.make} {Car.model_name} {Car.model_trim}",
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
                ).Execute();

            var ImageList = marketData.FirstOrDefault()?.Image;
            Image =  ImageList.FirstOrDefault()?.MediaUrl;
            return Ok(new { car = Car, recalls = Recalls, image = Image });
        }
    }
}

