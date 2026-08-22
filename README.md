# Machado — Video Editor

Projeto educacional desenvolvido para praticar criação de interfaces, responsividade, animações, reprodução simultânea de vídeos e publicação automatizada com GitHub e Cloudflare.

**[Acessar o projeto publicado](https://machado-editor.edson-m-a-j.workers.dev)**

## Sobre o projeto

O site simula o portfólio profissional de Lucas Machado, editor de vídeo. A experiência foi construída para causar impacto visual, mantendo nove vídeos em reprodução simultânea e liberando o áudio somente no vídeo selecionado pelo visitante.

Este projeto não representa uma plataforma comercial nem um serviço oferecido ao público. Ele foi publicado como demonstração de estudo e desenvolvimento web.

## Funcionalidades

- Reprodução simultânea dos vídeos do portfólio
- Controle exclusivo de áudio no vídeo selecionado
- Silenciamento ao selecionar outro vídeo ou clicar fora
- Layout adaptado para celulares, desktops e telas ultrawide
- Animações, efeitos de movimento e elementos com parallax
- Deploy automático pela Cloudflare a partir da branch `main`

## Tecnologias

- React 19
- Next.js 16 com Vinext
- TypeScript
- Vite
- Cloudflare Workers
- Git e GitHub

## Rodar localmente

É necessário ter Node.js `22.13.0` ou superior.

```bash
git clone https://github.com/EdsonJR22/machado-editor.git
cd machado-editor
npm install
npx vite
```

Depois, abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Arquivos principais

- `app/page.tsx`: estrutura, conteúdo e comportamento da página
- `app/globals.css`: estilos, animações e responsividade
- `public/media/`: vídeos e imagens utilizados na demonstração
- `public/posters/`: capas exibidas durante o carregamento dos vídeos

## Publicação

Alterações enviadas para a branch `main` são compiladas e publicadas pela integração entre GitHub e Cloudflare Workers.

```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

## Uso e direitos autorais

O repositório é público para fins de estudo e demonstração. A publicação pública do código não concede automaticamente licença para copiar, redistribuir ou comercializar o projeto.

Os vídeos, imagens, marcas e trabalhos apresentados pertencem aos seus respectivos autores e clientes. Esses materiais não podem ser reutilizados sem autorização expressa dos detentores dos direitos.
