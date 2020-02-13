// http://157.230.17.132:3033/todos
// Todoolean
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.

$(document).ready(function(){
  getAndPrintAllItems();

  $(document).on('click', '#send-new-item', function(){
    var newItem = $('#new-item-input').val();
    addNewItem(newItem);
  });

  $(document).on('click', '.delete', function(){
    var thisItem = $(this);
    var thisItemText = thisItem.prev().text();
    var thisItemId = thisItem.parent().attr('item-id');
    console.log(thisItemId);
    areYouSure(thisItemText);
    deleteOrNot(thisItemId);
    // $(document).on('click', '.choice', function(){
    //   var thisChoice = $(this).attr('id-choice');
    //   console.log(thisChoice);
    //   if (thisChoice == 1){
    //     deleteItem(thisItemId);
    //     $('.rus-text').html('');
    //     $('.are-you-sure').addClass('no-display');
    //   } else if (thisChoice == 2){
    //     $('.rus-text').html('');
    //     $('.are-you-sure').addClass('no-display');
    //   }
    // });
  });

  function deleteOrNot(id){
    $(document).on('click', '.choice', function(){
      var thisChoice = $(this).attr('id-choice');
      console.log(thisChoice);
      if (thisChoice == 1){
        deleteItem(id);
        $('.rus-text').html('');
        $('.are-you-sure').addClass('no-display');
      } else if (thisChoice == 2){
        $('.rus-text').html('');
        $('.are-you-sure').addClass('no-display');
      }
    });
  }

  // funzione finestra alert
  function areYouSure(item){
    $('.are-you-sure').removeClass('no-display');
    var source = $("#rus-template").html();
    var template = Handlebars.compile(source);
    var context = {
      text: 'Sei sicuro di volere eliminare ' +"'"+ item + "'" + '?'
    };
    var html = template(context);
    $('.rus-text').append(html);
  }


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
        $('#new-item-input').val('');
      },
      error: function(request, state, errors){
        alert("C'è stato un errore" + errors);
      }
    });
  }

  // funzione per eliminare un elemento presente sulla lista tramite la chiamata DELETE
  function deleteItem(id){
    $.ajax({
      url: 'http://157.230.17.132:3033/todos/' + id,
      method: 'DELETE',
      success: function(){
        $('.todo-list').html('');
        getAndPrintAllItems();
      },
      error: function(request, state, errors){
        alert("C'è stato un errore" + errors);
      }
    });
  }



});
