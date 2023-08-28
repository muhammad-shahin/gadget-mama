const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // step-1: where you want to put your created html?
    const phoneContainer = document.getElementById('phone-container');
    // clear old content before adding new content
    phoneContainer.textContent = '';
    
    // display show all button if total phone is more than 12
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const brandName = phone.brand;
        const phoneName = phone.phone_name;
        const PhoneImage = phone.image;
        // step-2: create the html element
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;

        // step-3: add innerHTML or innerText
        phoneCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl border border-gray-300">
        <figure class="px-10 pt-10 bg-[#0D6EFD0D] p-3 m-5 rounded-lg">
            <img src="${PhoneImage}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phoneName}</h2>
            <p>${brandName}</p>
            <div class="card-actions">
            <button onclick="showDetailsModal('${phone.slug}')" class="btn btn-primary normal-case text-white text-xl bg-rose-500 border-none">Show Details</button>
            </div>
        </div>
        </div>
        `;
        // step-4: append child
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

function handleSearch(){
    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    loadPhone(searchText);

}

function handleSearch2(isShowAll){
    toggleLoadingSpinner(true);
    const inputField2 = document.getElementById('search-field2');
    const searchText2 = inputField2.value;
    loadPhone(searchText2, isShowAll);

}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
const showAllPhones = () => {
    handleSearch2(true);
}
const showDetailsModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showDetails(phone);
}
const showDetails = (phone) => {
     // showing the modal
     const modal = document.getElementById('custom-modal');
     modal.classList.add('flex');
    //  add data to modal
    document.getElementById('phone-name').innerText = phone.name;
    document.getElementById('phone-img').src = phone.image;
    document.getElementById('phone-storage').innerText = phone.mainFeatures.storage;
    document.getElementById('phone-display').innerText = phone.mainFeatures.displaySize;
    document.getElementById('phone-chipset').innerText = phone.mainFeatures.chipSet;
    document.getElementById('phone-memory').innerText = phone.mainFeatures.memory;
    document.getElementById('phone-releaseDate').innerText = phone.releaseDate;
    document.getElementById('phone-brand').innerText = phone.brand;
}
function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.classList.remove('flex');
}

loadPhone('apple');