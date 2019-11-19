using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using IZGWeb.Data.Interface;

namespace IZGWeb.Data
{
	public class MongoRepository : IRepository
	{
		private static IMongoDatabase _database;

		public MongoRepository(IOptions<MongoOptions> optionsAccessor)
		{
			var configurationOptions = optionsAccessor.Value;

			IMongoClient client = new MongoClient(configurationOptions.ConnectionString);
			_database = client.GetDatabase(configurationOptions.Database);
		}

		public IQueryable<T> All<T>() where T : class, new()
		{
			return _database.GetCollection<T>(typeof(T).Name).AsQueryable();
		}

		public IQueryable<T> Where<T>(System.Linq.Expressions.Expression<Func<T, bool>> expression) where T : class, new()
		{
			return All<T>().Where(expression);
		}

		public async Task Delete<T>(System.Linq.Expressions.Expression<Func<T, bool>> predicate) where T : class, new()
		{
			if (!(await CollectionExists<T>()))
				return;

			await _database.GetCollection<T>(typeof(T).Name).DeleteManyAsync(predicate);
		}
		public T Single<T>(System.Linq.Expressions.Expression<Func<T, bool>> expression) where T : class, new()
		{
			return All<T>().SingleOrDefault(expression);
		}

		public async Task<bool> CollectionExists<T>() where T : class, new()
		{
			var collection = _database.GetCollection<T>(typeof(T).Name);
			var filter = new BsonDocument();
			var totalCount = await collection.CountDocumentsAsync(filter);
			return totalCount > 0;
		}

		public async Task Add<T>(T item) where T : class, new()
		{
			if (!(await CollectionExists<T>()))
				await CreateCollection<T>();

			await _database.GetCollection<T>(typeof(T).Name).InsertOneAsync(item);
		}

		public async Task Add<T>(IEnumerable<T> items) where T : class, new()
		{
			if (!(await CollectionExists<T>()))
				await CreateCollection<T>();

			await _database.GetCollection<T>(typeof(T).Name).InsertManyAsync(items);
		}

		private async Task CreateCollection<T>() where T : class, new()
		{
			await _database.CreateCollectionAsync(typeof(T).Name);
		}
	}
}