const tableRelatorio = document.getElementById('relatorio');

document.getElementById('inputFile').addEventListener('change', function selectedFileChanged() {
  const parser = new DOMParser();

  if (this.files.length === 0) {
    console.log('Nenhum arquivo selecionado!!!!');
    return;
  }

  const setupReader = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const xmlString = reader.result;

      const dom = parser.parseFromString(xmlString, 'application/xml');

      const nomeArquivo = dom.querySelector('infNFe').getAttribute('Id');
      const data = dom.querySelector('dhEmi');
      const qtdLitros = dom.querySelector('qCom');
      const valorUnit = dom.querySelector('vUnCom');
      const valorTotProd = dom.querySelector('vProd');
      const valorTotTrib = dom.querySelector('vTotTrib');

      const row = document.createElement('tr');

      // nome arquivo
      let td = document.createElement('td');
      td.textContent = nomeArquivo;
      // td.innerText = nomeArquivo;
      row.appendChild(td);

      // data
      td = document.createElement('td');
      td.innerText = data.innerHTML;
      row.appendChild(td);

      // qtdLitros
      td = document.createElement('td');
      td.innerText = qtdLitros.innerHTML;
      row.appendChild(td);

      // valorUnit
      td = document.createElement('td');
      td.innerText = `R$ ${valorUnit.innerHTML} `;
      row.appendChild(td);

      // // valorTotProd
      td = document.createElement('td');
      td.innerText = `R$ ${valorTotProd.innerHTML} `;
      row.appendChild(td);

      //  valorTotTrib
      td = document.createElement('td');
      td.innerText = `R$ ${valorTotTrib.innerHTML} `;
      row.appendChild(td);

      // row.appendChild(td);
      tableRelatorio.children[1].appendChild(row);
    };

    reader.readAsText(file);
  };

  for (let index = 0; index < this.files.length; index += 1) {
    setupReader(this.files[index]);
  }
});
