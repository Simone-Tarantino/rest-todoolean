// http://157.230.17.132:3033/todos
// Todoolean
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.

$(document).ready(function(){
  getAndPrintAllItems();

  $(document).on('click', '#send-new-item', function(){
    var newItem = $('#new-item-input').val();
    addNewItem(newItem);
  });

  // funzione per ottenere tutti gli elementi della lista tramite una chiamata GET
  function getAndPrintAllItems(){
    $.ajax({
      url: 'http://157.230.17.132:3033/todos',
      method: 'GET',
      success: function(data){
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < data.length; i++){
          var singleItem = data[i];
          console.log(singleItem);
          var context = {
            item: singleItem.text,
            id: singleItem.id
          };
          var html = template(context);
          $('.todo-list').append(html);
        }
      },
      error: function(request, state, errors){
        alert("C'è stato un errore" + errors);
      }
    });
  }

  // funzione per scrivere un nuovo elemento nella lista tramite la chiamata POST
  function addNewItem(newValue){
    $.ajax({
      url: 'http://157.230.17.132:3033/todos',
      method: 'POST',
      data:{
        text: newValue
      },
      success: function(data){
        $('.todo-list').html('');
        getAndPrintAllItems();
      },
      error: function(request, state, errors){
        alert("C'è stato un errore" + errors);
      }
    });
  }

});
