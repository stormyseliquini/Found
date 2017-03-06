using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using listItAPI.Data;
using listItAPI.Models;

namespace listItAPI.Controllers
{
    public class ProductsController : ApiController
    {
        private listItDataContext db = new listItDataContext();

        // GET: api/Products
        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }

        //GET: api/Products/Search
        [Route("api/Products/Search")]
        [HttpGet]
        public IQueryable<Product> Search([FromUri]Search fieldsObject)
        {
            IQueryable<Product> ResultSet = db.Products;
            if (fieldsObject.CategoryName != null) { ResultSet = ResultSet.Where(p => p.Category.CategoryName == fieldsObject.CategoryName); }
            if (fieldsObject.Keyword != null) { ResultSet = ResultSet.Where(p => p.ProductTitle.Contains(fieldsObject.Keyword) || p.Description.Contains(fieldsObject.Keyword)); }
            if (fieldsObject.Condition != null) { ResultSet = ResultSet.Where(p => p.Condition == fieldsObject.Condition); }
            if (fieldsObject.MaxPrice != 0) { ResultSet = ResultSet.Where(p => p.Price < fieldsObject.MaxPrice); }
            if (fieldsObject.MinPrice != 0) { ResultSet = ResultSet.Where(p => p.Price > fieldsObject.MinPrice); }
          
            return ResultSet;
        }




        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        // GET: api/Products
        [Route("api/products/profile")]
        public IQueryable<Product> GetProfileProducts(int userId)
        {
            var results = db.Products.Where(p => p.UserId == userId);
            return results;
        }
        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductId)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductId == id) > 0;
        }
    }
}