using Jan16Car.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Bing;
using System.Web.Http.Description;

namespace Jan16Car.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ProductController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();



        //public IEnumerable<Car> GetAllProducts()
        //{
        //    return products;
        //}

        public async Task<IHttpActionResult> GetProduct(int? id)
        {

            //var idParam = new SqlParameter("@id", id);

            //var retval = db.Database.SqlQuery<Car>(
            //"EXEC GetCar @id", idParam
            //).ToList();
            if (id == null)
            {
                return BadRequest();
            }
            HttpResponseMessage response;
            string content = "";
            Car car = new Car();
            dynamic Recalls = "";
            string Image = "";

            car = db.Cars.Find(id);
            if (car == null)
            {
                return NotFound();
            }

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://nhtsa.gov/");

                try
                {
                    response = await client.GetAsync("webapi/api/Recalls/vehicle/modelyear/" + car.model_year
                        + "/make/" + car.make + "/model/" + car.model_name + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }
            Recalls = content;
            //Recalls = JsonConvert.DeserializeObject(content);
            var image = new BingSearchContainer(new Uri("https://api.datamarket.azure.com/Bing/search/"));

            image.Credentials = new NetworkCredential("accountKey", "pplLdOGSDWh5iaWBjOnyIIuSxvgSV9yzE4Zz701mWQA");

            var marketData = image.Composite(
                "image", // type of search
                car.model_year + " " + car.make + " " + car.model_name + " " + car.model_trim, // query
                null, null, null, null, null, null, null, null, null, null, null, null, null).Execute();
            Image = marketData.FirstOrDefault()?.Image.FirstOrDefault()?.MediaUrl;

            return Ok(new {Car = car, Recalls = Recalls, Image = Image  });


        }
    }
}
