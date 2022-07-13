console.log('test module')

async function testHandler (event) {
    console.log('test button clicked');
    event.preventDefault();

}




document.querySelector('test').addEventListener('click', testHandler);
