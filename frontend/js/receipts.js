export async function loadReceipts() {
    try {
        const response = await fetch('receipts'); // Endpoint manzilini tekshiring
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const receipts = await response.json();
        renderReceipts(receipts);
        console.log(receipts);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
  
function renderReceipts(receipts) {
    const receiptsList = document.querySelector('.receipts-list');
    receiptsList.innerHTML = ''; // O'zgaruvchilarni tozalash
    receipts.forEach(receipt => {
        const receiptItem = document.createElement('div');
        receiptItem.className = 'receipt-item';
        receiptItem.innerHTML = `
            <h3>${receipt.product.name}</h3>
            <img src="${receipt.product.image}" alt="${receipt.product.name}" />
            <p>Miqdor: ${receipt.quantity}</p>
        `;
        receiptsList.appendChild(receiptItem);
    });
}