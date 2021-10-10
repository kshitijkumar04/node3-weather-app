const form = document.querySelector('form');

const place = document.querySelector('input');
const txt1 = document.querySelector('#txt1');
const txt2 = document.querySelector('#txt2');

form.addEventListener('submit', (e) => {
    e.preventDefault();  //this is used to prevent the page from refreshing after clicking on sumit
    txt1.textContent = 'Loading';
    txt2.textContent = ''
    fetch(`/weather?address=${place.value}`).then(res => {
        res.json().then(data => {
            if(data.error){
                txt1.textContent=data.error;
            }
            else{
                txt1.textContent = place.value;
                txt2.textContent=data.weather;
            }
        })
    })
})