export default function() {

  this.get('/quotes', (schema, request) => {
    return schema.quotes.all();
  });
  this.get('/leaderboards'),(schema, request) =>{
    return schema.leaderboards.all()
  }

}
