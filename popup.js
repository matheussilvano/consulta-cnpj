document.getElementById('buscar').addEventListener('click', function() {
  const cnpj = document.getElementById('cnpj').value.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) {
    alert("Por favor, insira um CNPJ válido.");
    return;
  }

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;

  fetch(proxyUrl + apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === "ERROR" || !data.nome) {
        document.getElementById('resultado').innerHTML = "Erro: " + (data.message || 'Dados inválidos.');
        document.getElementById('resultado').classList.remove('visible');
        document.getElementById('resultado').classList.add('hidden');
        return;
      }

      const resultado = `
        <p><strong>Razão Social:</strong> ${data.nome}</p>
        <p><strong>Nome Fantasia:</strong> ${data.fantasia || 'N/A'}</p>
        <p><strong>E-mail:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Telefone:</strong> ${data.telefone || 'N/A'}</p>
      `;

      document.getElementById('resultado').innerHTML = resultado;
      document.getElementById('resultado').classList.remove('hidden');
      document.getElementById('resultado').classList.add('visible');
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
      document.getElementById('resultado').innerHTML = "Erro ao buscar dados.";
      document.getElementById('resultado').classList.remove('visible');
      document.getElementById('resultado').classList.add('hidden');
    });
});
