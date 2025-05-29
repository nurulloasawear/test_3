document.addEventListener('DOMContentLoaded', () => {
    console.log('Loyiha 3 script yuklandi!');

    // Dashboard uchun foydalanuvchi ismini ko'rsatish va chiqish tugmasi logikasi
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('foydalanuvchi_nomi');
        if (username) {
            usernameDisplay.textContent = `Salom, ${username}!`;
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('foydalanuvchi_nomi');
            window.location.href = '../pages/signin.html';
        });
    }

    // crud.html uchun mijozlarni olish va ko'rsatish
    const customerTable = document.getElementById('data-table');
    if (customerTable) {
        loadCustomers();
        const form = document.getElementById('crud-form');
        if (form) {
            form.addEventListener('submit', saveCustomer);
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.addEventListener('click', clearForm);
            }
        }
    }

    function loadCustomers() {
        fetch('/api/api_2/customers/') // Sizning API manzilingizga moslang (Loyiha 3)
            .then(response => response.json())
            .then(data => displayCustomers(data))
            .catch(error => console.error('Mijozlarni olishda xatolik (Loyiha 3):', error));
    }

    function displayCustomers(customers) {
        const tbody = document.getElementById('data-body');
        if (tbody) {
            tbody.innerHTML = '';
            customers.forEach(customer => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>
                        <button onclick="editCustomer(${customer.id})">Tahrirlash</button>
                        <button onclick="deleteCustomer(${customer.id})">O'chirish</button>
                    </td>
                `;
            });
        }
    }

    function saveCustomer(event) {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const idInput = document.getElementById('id');
        if (nameInput && emailInput && idInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const id = idInput.value;

            const customerData = { name: name, email: email };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/api_2/customers/${id}/` : '/api/api_2/customers/'; // Sizning API manzilingizga moslang (Loyiha 3)

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(customerData),
            })
            .then(response => response.json())
            .then(() => {
                loadCustomers();
                clearForm();
            })
            .catch(error => console.error('Mijozni saqlashda xatolik (Loyiha 3):', error));
        }
    }

    function editCustomer(id) {
        fetch(`/api/api_2/customers/${id}/`) // Sizning API manzilingizga moslang (Loyiha 3)
            .then(response => response.json())
            .then(customer => {
                document.getElementById('id').value = customer.id;
                document.getElementById('name').value = customer.name;
                document.getElementById('email').value = customer.email;
                const cancelEditBtn = document.getElementById('cancel-edit');
                if (cancelEditBtn) {
                    cancelEditBtn.style.display = 'inline';
                }
            })
            .catch(error => console.error('Mijozni olishda xatolik (Loyiha 3):', error));
    }

    function deleteCustomer(id) {
        if (confirm('Mijozni o\'chirishga ishonchingiz komilmi?')) {
            fetch(`/api/api_2/customers/${id}/`, { // Sizning API manzilingizga moslang (Loyiha 3)
                method: 'DELETE',
                // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            .then(() => loadCustomers())
            .catch(error => console.error('Mijozni o\'chirishda xatolik (Loyiha 3):', error));
        }
    }

    function clearForm() {
        const form = document.getElementById('crud-form');
        if (form) {
            form.reset();
            document.getElementById('id').value = '';
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.style.display = 'none';
            }
        }
    }

    // Dashboard uchun buyurtmalarni olish va ko'rsatish (dashboard.html)
    const orderTable = document.getElementById('order-table');
    if (orderTable) {
        loadOrders();
    }

    function loadOrders() {
        fetch('/api/api_1/orders/') // Sizning API manzilingizga moslang (Loyiha 3)
            .then(response => response.json())
            .then(data => displayOrders(data))
            .catch(error => console.error('Buyurtmalarni olishda xatolik (Loyiha 3):', error));
    }

    function displayOrders(orders) {
        const tbody = document.getElementById('order-body');
        if (tbody) {
            tbody.innerHTML = '';
            orders.forEach(order => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${order.order_number}</td>
                    <td>${order.order_date}</td>
                `;
            });
        }
    }
});
