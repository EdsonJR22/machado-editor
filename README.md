# Machado — Video Editor

Portfolio profissional de Lucas Machado, editor de vídeo. O site apresenta os trabalhos em uma grade de vídeos com reprodução simultânea, controle exclusivo de áudio e uma interface responsiva com animações e efeitos visuais.

## Tecnologias

- React 19
- Next.js 16 com Vinext
- TypeScript
- Vite
- Cloudflare Workers

## Rodar localmente

É necessário ter o Node.js `22.13.0` ou superior.

```bash
npm install
npm run dev
```

Depois, abra o endereço exibido no terminal.

## Arquivos principais

- `app/page.tsx`: estrutura e comportamento da página
- `app/globals.css`: estilos, animações e responsividade
- `public/media/`: vídeos e imagens do portfólio
- `public/posters/`: capas usadas durante o carregamento dos vídeos

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm test
```

## Publicação

O projeto foi preparado para execução na infraestrutura da Cloudflare. A configuração final do domínio e do deploy deve ser feita após conectar este repositório à conta Cloudflare do responsável pelo site.

## Direitos de uso

Os vídeos, imagens e demais materiais deste repositório pertencem aos seus respectivos autores e clientes. Não é permitido reutilizá-los sem autorização.
