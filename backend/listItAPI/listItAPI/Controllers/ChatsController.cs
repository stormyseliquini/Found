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
    public class ChatsController : ApiController
    {
        private listItDataContext db = new listItDataContext();

        // GET: api/Chats
        public IQueryable<Chat> GetChats()
        {
            return db.Chats;
        }

        // GET: api/Chats/5
        [ResponseType(typeof(Chat))]
        public IHttpActionResult GetChat(int id)
        {
            Chat chat = db.Chats.Find(id);
            if (chat == null)
            {
                return NotFound();
            }

            return Ok(chat);
        }

        // PUT: api/Chats/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutChat(int id, Chat chat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != chat.ChatId)
            {
                return BadRequest();
            }

            db.Entry(chat).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatExists(id))
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

        // POST: api/Chats
        [ResponseType(typeof(Chat))]
        public IHttpActionResult PostChat(Chat chat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Chats.Add(chat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = chat.ChatId }, chat);
        }

        // DELETE: api/Chats/5
        [ResponseType(typeof(Chat))]
        public IHttpActionResult DeleteChat(int id)
        {
            Chat chat = db.Chats.Find(id);
            if (chat == null)
            {
                return NotFound();
            }

            db.Chats.Remove(chat);
            db.SaveChanges();

            return Ok(chat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ChatExists(int id)
        {
            return db.Chats.Count(e => e.ChatId == id) > 0;
        }
    }
}