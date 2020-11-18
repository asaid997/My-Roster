const renderer = new Renderer()

$('button').on("click",function(){
    const input = $('input').val()
    $.get(`/teams/${input}`,function(data){
        console.log(data)
        renderer.handleBarHelper(data)
    })
})