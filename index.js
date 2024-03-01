const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aiItems = data.data.tools
    // console.log(aiItems);
    showData(aiItems)

}


const showData = (aiItems) => {
    // console.log(aiItems);
    const cardContainer = document.getElementById('card-container');


    aiItems.forEach(element => {
        console.log(element.id);
        const card = document.createElement('div');
        // console.log(card);
        card.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src="${element.image}"
                alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-2xl font-bold">Features!</h2>
            <ol>
                <li>1 .${element.features[0]} </li>
                <li>2 .${element.features[1]} </li>
                <li>3 .${element.features[2]}</li>
            </ol>
            

            <hr>

            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl my-6 font-bold">${element.name}</h1>
                    <div class="flex">
                        <img src="images/calender.png" alt="">
                        <p class="ml-4">${element.published_in}</p>
                    </div>
                </div>
                <img onclick='my_modal_4.showModal(); loadSingleData("${element.id}")'class="cursor-pointer bg-red-100 p-4 rounded-full" src="images/arrow.png" alt="">
            </div>
        </div>
    </div>
        `
        cardContainer.appendChild(card)
    });

}


const loadSingleData = async (id) => {
    const modalContainer = document.getElementById('my_modal_4');
    modalContainer.innerHTML = ''
    console.log('single item clicked');
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const singleData = data.data
    console.log(singleData);
    const modalBox = document.createElement('div');
    modalBox.innerHTML = `
    <div class="modal-box border w-11/12 max-w-5xl">
        <div class="flex gap-10">
            <div class="border border-red-600 p-8 rounded-lg bg-red-100">
                <h3 class="font-bold text-lg">${singleData.description}!</h3>
                <div class="flex gap-4 mt-10">
                    <div class="bg-white p-4 rounded-lg font-bold text-green-400">
                        <p>${singleData.pricing[0].price}</p>
                        <p>${singleData.pricing[0].plan}</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg font-bold text-yellow-400">
                        <p>${singleData.pricing[1].price}</p>
                        <p>${singleData.pricing[1].plan}</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg font-bold text-red-400">
                        <p>${singleData.pricing[2].price}</p>
                        <p>${singleData.pricing[2].plan}</p>
                    </div>
                </div>
                <div class="flex gap-4 my-5">
                    <div>
                        <h1 class="font-bold my-5 text-2xl">Features</h1>
                        <ul>
                            <li>* ${singleData.features['1'].feature_name}</li>
                            <li>* ${singleData.features['2'].feature_name}</li>
                            <li>* ${singleData.features['3'].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <h1 class="font-bold my-5 text-2xl">Integrations</h1>
                        <ul>
                            <li>* ${singleData.integrations[0]}</li>
                            <li>* ${singleData.integrations[1]}</li>
                            <li>* ${singleData.integrations[2]}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-action">
            
                <form method="dialog">
                <img class="py-4" src="${singleData.image_link[0]}"
                alt="Shoes" />
                <h3 class="font-bold text-lg">${singleData.input_output_examples[0].input}!</h3>
                <p class="py-4">${singleData.input_output_examples[0].output}</p>
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </div>    
    `
    modalContainer.appendChild(modalBox)
}
loadData()