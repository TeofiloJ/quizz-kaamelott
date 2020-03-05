export default function() {

  this.get('/quotes', (schema, request) => {
    return schema.quotes.all();
  });

}
