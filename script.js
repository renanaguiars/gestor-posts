let stores = JSON.parse(localStorage.getItem("stores")) || [];

function saveStores() {
  localStorage.setItem("stores", JSON.stringify(stores));
}

function renderStores(filter = "") {
  const list = document.getElementById("storeList");
  list.innerHTML = "";

  // Ordena as lojas: maior número de posts no topo
  stores.sort((a, b) => b.count - a.count);

  let filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredStores.forEach((store, index) => {
    const tr = document.createElement("tr");

    // Se não teve posts, marca como pendente
    tr.className = store.count === 0 ? "pending" : "done";

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${store.name}</td>
      <td>${store.count}</td>
      <td>
        <button onclick="increment(${stores.indexOf(store)})">+1 Post</button>
        <button onclick="removeStore(${stores.indexOf(store)})">Remover</button>
      </td>
    `;

    list.appendChild(tr);
  });

  updateSummary();
  saveStores();
}

function addStore() {
  const name = document.getElementById("storeName").value.trim();
  if (name === "") return alert("Digite o nome da loja!");

  stores.push({ name, count: 0 });
  saveStores();
  renderStores();
  document.getElementById("storeName").value = "";
}

function increment(index) {
  stores[index].count++;
  renderStores();
}

function removeStore(index) {
  if (confirm("Deseja realmente remover esta loja?")) {
    stores.splice(index, 1);
    renderStores();
  }
}

function resetWeek() {
  if (confirm("Tem certeza que deseja resetar a semana?")) {
    stores = stores.map(store => ({ ...store, count: 0 }));
    renderStores();
  }
}

function searchStore() {
  const query = document.getElementById("searchInput").value;
  renderStores(query);
}

function updateSummary() {
  const totalStores = stores.length;
  const totalPosts = stores.reduce((sum, s) => sum + s.count, 0);
  const noPosts = stores.filter(s => s.count === 0).length;

  document.getElementById("summary").textContent =
    `Total de lojas: ${totalStores} | Total de posts: ${totalPosts} | Lojas sem posts: ${noPosts}`;
}

function exportData() {
  const dataStr = JSON.stringify(stores, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "lojas.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        stores = imported;
        saveStores();
        renderStores();
        alert("Dados importados com sucesso!");
      } else {
        alert("Arquivo inválido!");
      }
    } catch {
      alert("Erro ao importar arquivo!");
    }
  };
  reader.readAsText(file);
}

renderStores();
