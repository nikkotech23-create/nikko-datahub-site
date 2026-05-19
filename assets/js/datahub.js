// assets/js/datahub.js
let parsedData = [];
let chartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("csv-file");
  const preview = document.getElementById("data-preview");
  const xSelect = document.getElementById("x-column");
  const ySelect = document.getElementById("y-column");
  const drawBtn = document.getElementById("draw-chart");
  const loadSample = document.getElementById("load-sample");
  const ctx = document.getElementById("chart").getContext("2d");

  function populateColumns(headers) {
    xSelect.innerHTML = "";
    ySelect.innerHTML = "";
    headers.forEach(h => {
      const optX = new Option(h, h);
      const optY = new Option(h, h);
      xSelect.add(optX);
      ySelect.add(optY);
    });
  }

  function renderPreview(rows) {
    const firstRows = rows.slice(0, 5);
    const headers = Object.keys(firstRows[0] || {});
    const table = document.createElement("table");
    table.className = "data-table";

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    firstRows.forEach(row => {
      const tr = document.createElement("tr");
      headers.forEach(h => {
        const td = document.createElement("td");
        td.textContent = row[h];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    preview.innerHTML = "";
    preview.appendChild(table);
  }

  function handleData(rows) {
    parsedData = rows;
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    populateColumns(headers);
    renderPreview(rows);
  }

  fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: result => handleData(result.data.filter(r => Object.keys(r).length)),
    });
  });

  loadSample.addEventListener("click", () => {
    const csv = `year,value
2019,10
2020,25
2021,18
2022,30
2023,45`;
    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      complete: result => handleData(result.data),
    });
  });

  drawBtn.addEventListener("click", () => {
    if (!parsedData.length) return;
    const xKey = xSelect.value;
    const yKey = ySelect.value;
    const labels = parsedData.map(r => r[xKey]);
    const values = parsedData.map(r => r[yKey]);

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: values,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.25)",
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#e5e7eb" } },
        },
        scales: {
          x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(55,65,81,0.4)" } },
          y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(55,65,81,0.4)" } },
        },
      },
    });
  });
});
