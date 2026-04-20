// =====================
// Global Variables
// =====================
const people = [];
let totalAmountGlobal = 0;
let expectedPeople = 0;

// Elements
const addPersonBtn = document.getElementById('addPerson');
const peopleList = document.getElementById('peopleList');
const resultList = document.getElementById('resultList');
const themeToggle = document.getElementById('themeToggle');

// =====================
// 🚀 STEP 1: Start Setup
// =====================
document.getElementById('startSplit').addEventListener('click', () => {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const totalPeople = parseInt(document.getElementById('totalPeople').value);

    if (isNaN(totalAmount) || isNaN(totalPeople) || totalPeople <= 0) {
        alert("Enter valid total amount and number of people");
        return;
    }

    totalAmountGlobal = totalAmount;
    expectedPeople = totalPeople;

    document.querySelector('.input-section').style.display = 'block';

    document.getElementById('totalAmount').disabled = true;
    document.getElementById('totalPeople').disabled = true;
});

// =====================
// ➕ Add Person
// =====================
addPersonBtn.addEventListener('click', () => {
    const name = document.getElementById('personName').value.trim();
    const amountPaid = parseFloat(document.getElementById('amountPaid').value);

    const categoryInput = document.getElementById('category').value.trim();
    const category = categoryInput || "Other";

    if (!name || isNaN(amountPaid) || amountPaid < 0) {
        alert("Enter name and valid amount");
        return;
    }

    if (people.length >= expectedPeople) {
        alert("You already added all people!");
        return;
    }

    if (people.some(p => p.name === name)) {
        alert("This person is already added!");
        return;
    }

    people.push({ name, paid: amountPaid, category });

    const li = document.createElement('li');
    li.innerHTML = `
        ${name} paid ₹${amountPaid}
        <span class="category">${category}</span>
    `;
    li.classList.add('fade-in');
    peopleList.appendChild(li);

    document.getElementById('personName').value = '';
    document.getElementById('amountPaid').value = '';
    document.getElementById('category').value = '';
});

// =====================
// 🧮 Calculate Split
// =====================
document.getElementById('calculateSplit').addEventListener('click', () => {
    if (people.length === 0) {
        alert("Please add at least one person.");
        return;
    }

    if (people.length < expectedPeople) {
        alert(`Please add all ${expectedPeople} people first!`);
        return;
    }

    // ✅ FIXED LOGIC (Option 3 Hybrid)
    const actualTotal = people.reduce((sum, p) => sum + p.paid, 0);

    if (Math.abs(actualTotal - totalAmountGlobal) > 1) {
        resultList.innerHTML = `
            <li style="color:red; font-weight:bold;">
            ⚠️ Warning: Total mismatch! Using actual total ₹${actualTotal.toFixed(2)}
            </li>
        `;
    } else {
        resultList.innerHTML = "";
    }

    const total = actualTotal;
    const average = total / expectedPeople;

    resultList.innerHTML += `
        <li><strong>Total:</strong> ₹${total.toFixed(2)}</li>
        <li><strong>Each should pay:</strong> ₹${average.toFixed(2)}</li>
        <hr>
    `;

    // =====================
    // 📊 Category Totals
    // =====================
    const categoryTotals = {};

    people.forEach(p => {
        if (!categoryTotals[p.category]) {
            categoryTotals[p.category] = 0;
        }
        categoryTotals[p.category] += p.paid;
    });

    resultList.innerHTML += "<strong>Category Totals:</strong>";

    for (let cat in categoryTotals) {
        const li = document.createElement('li');
        li.textContent = `${cat}: ₹${categoryTotals[cat].toFixed(2)}`;
        resultList.appendChild(li);
    }

    resultList.innerHTML += "<hr>";

    // =====================
    // 💰 Balance Calculation
    // =====================
    const balances = people.map(p => ({
        name: p.name,
        balance: parseFloat((p.paid - average).toFixed(2))
    }));

    balances.forEach(person => {
        const li = document.createElement('li');

        if (person.balance > 0) {
            li.textContent = `${person.name} should receive ₹${person.balance}`;
            li.classList.add('receive');
        } else if (person.balance < 0) {
            li.textContent = `${person.name} should pay ₹${Math.abs(person.balance)}`;
            li.classList.add('pay');
        } else {
            li.textContent = `${person.name} is settled.`;
            li.classList.add('settled');
        }

        resultList.appendChild(li);
    });

    // =====================
    // 🔄 Settlement Logic
    // =====================
    const debtors = balances.filter(p => p.balance < 0);
    const creditors = balances.filter(p => p.balance > 0);

    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

        settlements.push(`💸 ${debtor.name} → ${creditor.name} : ₹${amount.toFixed(2)}`);

        debtor.balance += amount;
        creditor.balance -= amount;

        if (Math.abs(debtor.balance) < 0.01) i++;
        if (Math.abs(creditor.balance) < 0.01) j++;
    }

    resultList.innerHTML += "<hr><strong>Settlements:</strong>";

    settlements.forEach(settle => {
        const li = document.createElement('li');
        li.textContent = settle;
        li.classList.add('fade-in');
        resultList.appendChild(li);
    });
});

// =====================
// 🧹 Clear All
// =====================
document.getElementById('clearAll').addEventListener('click', () => {
    const allItems = document.querySelectorAll('#peopleList li, #resultList li');

    if (allItems.length === 0) {
        alert("Nothing to clear!");
        return;
    }

    allItems.forEach(li => li.classList.add('fade-out'));

    setTimeout(() => {
        people.length = 0;
        peopleList.innerHTML = '';
        resultList.innerHTML = '';

        totalAmountGlobal = 0;
        expectedPeople = 0;

        document.getElementById('totalAmount').disabled = false;
        document.getElementById('totalPeople').disabled = false;
        document.getElementById('totalAmount').value = '';
        document.getElementById('totalPeople').value = '';

        document.querySelector('.input-section').style.display = 'none';
    }, 400);
});

// =====================
// 🌙 Dark Mode
// =====================
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});