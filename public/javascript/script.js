
var confirmation=document.querySelector('#confirm')
console.log(confirmation)

formatDate=function(date){
    let newDate= new Date(date)
  
    return newDate.toLocaleDateString()
  }


var message=""
var total=0

var basket=JSON.parse(confirmation.dataset.basket)

for(item of basket){
    total+=item.price
    message=message+ basket.indexOf(item)+1+" "+item.departure+" / "+item.arrival+" "+formatDate(item.date)+" "+item.price+" €\n"
}

console.log(message)

confirmation.addEventListener('click',function(){
    
    
    window.alert('Votre panier:\n'+ message+"\n Total: "+total)
       }
    )
