//procurar botão
document.querySelector("#add-time")

//quando clicar no botão
.addEventListener('click', cloneField)

//executar uma ação
function cloneField(){
    
    //duplicar os campos. Qual campo?
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);

    //pegar os campos. Que campos?
    const fields = newFieldContainer.querySelectorAll('input')

    //para cada campo, limpar
    fields.forEach(function(fieldMoment){
        //pegar o field atual e limpa
        fieldMoment.value = ""
    })

    //colocar na página. Onde na página?
    document.querySelector("#schedule-items").appendChild(newFieldContainer)

}