// Cancel button functionality
document.querySelector('.btn-cancel').addEventListener('click', function(){
    window.location.href = 'checkout.html';
});
        
// Save address form submission
document.getElementById('addressForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const isDefault = document.getElementById('defaultAddress').checked;

    const address = {
        id: Date.now().toString(),
        addressType,
        fullName: document.getElementById('fullName').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        addressLine1: document.getElementById('addressLine1').value.trim(),
        addressLine2: document.getElementById('addressLine2').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        pincode: document.getElementById('pincode').value.trim(),
        isDefault
    };

    let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

    if (isDefault) {
        addresses = addresses.map(addr => ({
            ...addr,
            isDefault: false
        }));
    }

    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));

    window.location.href = 'checkout.html';
});


const addressType = document.querySelector('input[name="addressType"]:checked')?.value || "home";
