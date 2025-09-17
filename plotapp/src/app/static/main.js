async function fetchMetrics() {
  const response = await fetch("/kek/api/v1/metrics");
  const data = await response.json();
  return data;
}

function prepareChartData(data) {
  const labels = data.map(row => new Date(row.timestamp).toLocaleString());
  const cpu = data.map(row => row.CPU);
  const mem = data.map(row => row.MEM);
  return { labels, cpu, mem };
}

function renderChart(ctxId, labels, values, label, color) {
  const ctx = document.getElementById(ctxId).getContext("2d");

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: values,
        fill: false,
        borderColor: color,
        tension: 0.1,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: label
        }
      },
      scales: {
        x: {
          display: true,
          title: { display: true, text: 'Time' }
        },
        y: {
          display: true,
          title: { display: true, text: label }
        }
      }
    }
  });
}

async function main() {
  try {
    const raw = await fetchMetrics();
    const { labels, cpu, mem } = prepareChartData(raw);

    renderChart("cpuChart", labels, cpu, "CPU Usage (%)", "red");
    renderChart("memChart", labels, mem, "Memory Usage (%)", "blue");
  } catch (err) {
    console.error("Failed to load metrics:", err);
  }
}

window.addEventListener("DOMContentLoaded", main);

