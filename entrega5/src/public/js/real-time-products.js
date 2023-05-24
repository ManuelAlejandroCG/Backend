const socket = io();

socket.on("newlist", (productList) => {
    render(productList);
});

const btnNew = document.getElementById('new')

btnNew.onclick = e => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    const thumbnail = document.getElementById('thumbnail').value
    if (title == '' || description == '' || code == '' || price == '' || stock == '' || category == '') {
        alert('Se requieren todos los campos menos el ultimo')
    } else {
        socket.emit('addProduct', {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail                    
            })
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('code').value = ''
        document.getElementById('price').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('category').value = ''
        document.getElementById('thumbnail').value = ''
    }
}

