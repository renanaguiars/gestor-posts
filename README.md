# Gerenciador de Posts - Vila Gastro Jerusalém

Pequima aplicação web (HTML/CSS/JS) para gerenciar a frequência semanal de posts/stories de lojas do bairro.  
Dados são armazenados no **localStorage** do navegador, com opções para exportar/importar em JSON.

---

## Funcionalidades

- Adicionar / remover lojas.
- Contador de posts semanais por loja (`+1 Post`).
- Ordenação automática (maior número de posts no topo).
- Coluna `ID` (posição atual na lista).
- Busca em tempo real por nome da loja.
- Resumo com total de lojas, total de posts e lojas sem posts.
- Exportar dados para arquivo `lojas.json`.
- Importar dados a partir de um arquivo JSON.
- Reset manual dos contadores da semana.
- Responsivo (tabela com scroll horizontal em telas pequenas).

---

## Estrutura do projeto

## Como usar (local)

1. Clone / baixe o projeto e abra `index.html` no navegador.
2. Alternativa (recomendada para testes): rode um servidor local:
   - Python 3:
     ```bash
     python -m http.server 8000
     # depois abra http://localhost:8000
     ```
   - Node (serve):
     ```bash
     npx serve
     ```
3. Adicione lojas, use `+1 Post` para incrementar, pesquise e faça backups com Exportar/Importar.

---

## Importar/Exportar

- **Exportar**: baixa um arquivo `lojas.json` com o conteúdo do `localStorage`.
- **Importar**: escolha um arquivo JSON válido (array de objetos `{name, count}`) para substituir os dados atuais.

⚠️ Faça backup antes de importar se não quiser perder os dados atuais.

---

## Observações técnicas

- Os dados ficam no `localStorage` do navegador (cerca de ~5MB por origem — suficiente para centenas ou milhares de entradas pequenas).
- A ordenação atua sempre antes da renderização; a coluna `ID` mostra a posição atual na lista (não é um identificador persistente).

---

## Licença

- Recomendado: **MIT** (arquivo `LICENSE` separado).

---

## Contribuições

Pull requests são bem-vindos. Sugestões:
- IDs persistentes (UUID) por loja.
- Reset automático por data (ex.: toda segunda).
- Melhor UI / ícones / testes automatizados.

