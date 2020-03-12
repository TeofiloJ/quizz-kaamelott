export default function() {

  this.get('/quotes', (schema, request) => {
    return schema.quotes.all();
  });
  this.get('/leaderboards/topTen'),(schema, request) =>{
    return schema.leaderboards.all()
  }

}
